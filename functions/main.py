"""Cloud Functions for EASprint (Python runtime).

generate_deck         - Claude writes a deck of SEE questions, each one is checked (shape, a real irs.gov
                        source, and a blind answer check by a separate Claude call), and the deck is saved to
                        Firestore batch by batch so the app can show progress. Plan limits, per-account access
                        codes and suspension are enforced here.
admin_update_account  - The admin changes an account's plan, suspends or restores it, or sets its access code.
"""

from __future__ import annotations

import logging
import os
import random
import re
import secrets as pysecrets
import threading

from firebase_admin import auth, firestore, initialize_app
from firebase_functions import https_fn, options

from access import access_code_ok
from accounts import DEFAULT_PLAN, PLANS, LimitError, check_request, is_admin
from generator import DeckRequest, GenerationError, generate_deck as _generate
from schema import DOMAINS

initialize_app()
options.set_global_options(region="us-central1", max_instances=10)

DIFFICULTIES = {"Easy", "Medium", "Hard", "Mixed"}
PART_TITLES = {
    "part1": "Part 1: Individuals",
    "part2": "Part 2: Businesses",
    "part3": "Part 3: Representation, Practices and Procedures",
}
DECK_ID = re.compile(r"^[A-Za-z0-9]{20}$")
Err = https_fn.FunctionsErrorCode


def _require_user(req: https_fn.CallableRequest) -> str:
    if req.auth is None:
        raise https_fn.HttpsError(Err.UNAUTHENTICATED, "Sign in to create decks.")
    return req.auth.uid


def _clean(text, limit: int) -> str:
    return str(text or "").strip()[:limit]


def _new_account(token: dict) -> dict:
    return {
        "email": token.get("email", ""),
        "displayName": token.get("name", ""),
        "plan": DEFAULT_PLAN,
        "status": "active",
        "decksCreated": 0,
        "createdAt": firestore.SERVER_TIMESTAMP,
    }


@https_fn.on_call(secrets=["ANTHROPIC_API_KEY", "DECK_ACCESS_CODE"], timeout_sec=3600, memory=options.MemoryOption.GB_2)
def generate_deck(req: https_fn.CallableRequest) -> dict:
    uid = _require_user(req)
    token = req.auth.token or {}
    admin = is_admin(token)
    data = req.data or {}

    deck_id = _clean(data.get("deckId"), 40)
    if not DECK_ID.match(deck_id):
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Missing deck id.")
    topic = _clean(data.get("topic"), 200)
    if not topic:
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Tell me what to practice.")
    part = data.get("part") if data.get("part") in DOMAINS else "part1"
    try:
        count = max(3, int(data.get("count", 10)))
    except (TypeError, ValueError):
        count = 10
    difficulty = data.get("difficulty") if data.get("difficulty") in DIFFICULTIES else "Mixed"
    request = DeckRequest(topic=topic, part=part, count=count, difficulty=difficulty, notes=_clean(data.get("notes"), 600))

    db = firestore.client()
    account_ref = db.collection("accounts").document(uid)
    deck_ref = db.collection("decks").document(deck_id)

    # The admin doesn't need a code. Everyone else uses the code the admin gave their account,
    # or the shared DECK_ACCESS_CODE if their account has none.
    if not admin:
        own = db.collection("accessCodes").document(uid).get()
        expected = (own.to_dict() or {}).get("code") if own.exists else None
        if not access_code_ok(data.get("accessCode"), expected or os.environ.get("DECK_ACCESS_CODE")):
            raise https_fn.HttpsError(Err.PERMISSION_DENIED, "That access code isn't right.")

    @firestore.transactional
    def reserve(tx):
        snap = account_ref.get(transaction=tx)
        account = snap.to_dict() if snap.exists else _new_account(token)
        check_request(account, admin, count)
        if deck_ref.get(transaction=tx).exists:
            raise LimitError("That deck already exists.")
        if snap.exists:
            tx.update(account_ref, {"decksCreated": firestore.Increment(1)})
        else:
            tx.set(account_ref, {**account, "decksCreated": 1})
        tx.set(deck_ref, {
            "ownerId": uid,
            "title": topic,
            "part": part,
            "partTitle": PART_TITLES[part],
            "topic": topic,
            "difficulty": difficulty,
            "topics": [],
            "notes": request.notes,
            "questionCount": 0,
            "requested": count,
            "progress": 0,
            "status": "generating",
            "source": "ai",
            "createdAt": firestore.SERVER_TIMESTAMP,
        })

    try:
        reserve(db.transaction())
    except LimitError as e:
        raise https_fn.HttpsError(Err.RESOURCE_EXHAUSTED, str(e))

    lock = threading.Lock()
    order = [0]
    rng = random.Random()

    def on_plan(plan):
        deck_ref.update({"title": plan.title, "topics": plan.topics})

    def on_batch(questions, finished):
        batch = db.batch()
        with lock:
            for q in questions:
                choices = [q.right_answer] + [w.option for w in q.wrong_options]
                rng.shuffle(choices)
                batch.set(deck_ref.collection("questions").document(), {
                    "order": order[0],
                    "part": part,
                    "domain": q.domain,
                    "topic": q.topic,
                    "difficulty": q.difficulty,
                    "prompt": q.prompt,
                    "choices": choices,
                    "answer": q.right_answer,
                    "explanation": q.explanation,
                    "whyNot": {w.option: w.why_not for w in q.wrong_options},
                    "source": {"key": "", "section": q.source.section, "title": q.source.title, "url": q.source.url},
                    "verified": True,
                })
                order[0] += 1
        batch.update(deck_ref, {"progress": firestore.Increment(finished), "questionCount": firestore.Increment(len(questions))})
        batch.commit()

    try:
        result = _generate(request, on_plan=on_plan, on_batch=on_batch)
    except Exception as e:  # noqa: BLE001 - any failure refunds the deck
        logging.exception("deck %s failed", deck_id)
        message = str(e) if isinstance(e, GenerationError) else "Something went wrong while building the deck. Try again."
        deck_ref.update({"status": "failed", "error": message})
        account_ref.update({"decksCreated": firestore.Increment(-1)})
        raise https_fn.HttpsError(Err.FAILED_PRECONDITION, message)

    deck_ref.update({"status": "ready", "dropped": result.dropped, "questionCount": len(result.deck.questions)})
    return {"deckId": deck_id, "questionCount": len(result.deck.questions), "dropped": result.dropped}


@https_fn.on_call()
def admin_update_account(req: https_fn.CallableRequest) -> dict:
    if req.auth is None or not is_admin(req.auth.token):
        raise https_fn.HttpsError(Err.PERMISSION_DENIED, "Only the admin can change accounts.")
    data = req.data or {}
    uid = _clean(data.get("uid"), 128)
    if not uid:
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Which account?")
    db = firestore.client()
    account_ref = db.collection("accounts").document(uid)
    if not account_ref.get().exists:
        raise https_fn.HttpsError(Err.NOT_FOUND, "That account doesn't exist.")

    changes: dict = {}
    if "plan" in data:
        if data["plan"] not in PLANS:
            raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Unknown plan.")
        changes["plan"] = data["plan"]
    if "status" in data:
        if data["status"] not in ("active", "suspended"):
            raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Unknown status.")
        if uid == req.auth.uid and data["status"] == "suspended":
            raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "You can't suspend your own account.")
        changes["status"] = data["status"]
        # Suspension also blocks sign-in, and signs the person out within the hour.
        auth.update_user(uid, disabled=data["status"] == "suspended")
        if data["status"] == "suspended":
            auth.revoke_refresh_tokens(uid)

    code_ref = db.collection("accessCodes").document(uid)
    if data.get("accessCode") == "generate":
        code = "-".join(pysecrets.token_hex(2) for _ in range(3))
        code_ref.set({"code": code, "updatedAt": firestore.SERVER_TIMESTAMP})
        changes["hasAccessCode"] = True
    elif data.get("accessCode") == "clear":
        code_ref.delete()
        changes["hasAccessCode"] = False

    if changes:
        account_ref.update({**changes, "updatedAt": firestore.SERVER_TIMESTAMP})
    return {"ok": True}


@https_fn.on_call()
def delete_deck(req: https_fn.CallableRequest) -> dict:
    """Deletes a Claude-built deck, its questions and every practice session taken on it.

    Deleting doesn't give back a deck on the plan: the limit counts decks built, not decks kept.
    """
    uid = _require_user(req)
    deck_id = _clean((req.data or {}).get("deckId"), 40)
    if not DECK_ID.match(deck_id):
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Which deck?")
    db = firestore.client()
    deck_ref = db.collection("decks").document(deck_id)
    snap = deck_ref.get()
    if not snap.exists:
        raise https_fn.HttpsError(Err.NOT_FOUND, "That deck doesn't exist.")
    deck = snap.to_dict() or {}
    if deck.get("ownerId") != uid and not is_admin(req.auth.token):
        raise https_fn.HttpsError(Err.PERMISSION_DENIED, "You can only delete your own decks.")
    if deck.get("status") == "generating":
        raise https_fn.HttpsError(Err.FAILED_PRECONDITION, "This deck is still being built. Delete it once it finishes.")

    # Includes sessions by people the deck was shared with, since the questions they point to are going.
    sessions = db.collection("sessions").where("deckId", "==", deck_id).stream()
    batch, n = db.batch(), 0
    for s in sessions:
        batch.delete(s.reference)
        n += 1
        if n % 400 == 0:
            batch.commit()
            batch = db.batch()
    batch.commit()
    db.recursive_delete(deck_ref)
    return {"ok": True, "sessionsDeleted": n}


def _owned_deck(req: https_fn.CallableRequest):
    """The deck named in the request, if the caller owns it (or is the admin)."""
    uid = _require_user(req)
    deck_id = _clean((req.data or {}).get("deckId"), 40)
    if not DECK_ID.match(deck_id):
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Which deck?")
    deck_ref = firestore.client().collection("decks").document(deck_id)
    snap = deck_ref.get()
    if not snap.exists:
        raise https_fn.HttpsError(Err.NOT_FOUND, "That deck doesn't exist.")
    deck = snap.to_dict() or {}
    if deck.get("ownerId") != uid and not is_admin(req.auth.token):
        raise https_fn.HttpsError(Err.PERMISSION_DENIED, "Only the person who built this deck can share it.")
    return deck_ref, deck


@https_fn.on_call()
def share_deck(req: https_fn.CallableRequest) -> dict:
    """Shares a deck with another registered user, found by the email they signed up with."""
    deck_ref, deck = _owned_deck(req)
    email = _clean((req.data or {}).get("email"), 254).lower()
    if "@" not in email:
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Enter the email address the person signed up with.")
    try:
        user = auth.get_user_by_email(email)
    except auth.UserNotFoundError:
        raise https_fn.HttpsError(Err.NOT_FOUND, f"No one has signed up to EASprint with {email}. Ask them to sign in once, then share again.")
    if user.uid == deck.get("ownerId"):
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "That's your own account.")
    deck_ref.update({
        "sharedWith": firestore.ArrayUnion([user.uid]),
        f"sharedEmails.{user.uid}": user.email or email,
        "ownerEmail": (req.auth.token or {}).get("email", "") if deck.get("ownerId") == req.auth.uid else deck.get("ownerEmail", ""),
    })
    return {"ok": True, "uid": user.uid, "email": user.email or email}


@https_fn.on_call()
def unshare_deck(req: https_fn.CallableRequest) -> dict:
    """Stops sharing a deck with someone. Their past practice results on it are kept."""
    deck_ref, _ = _owned_deck(req)
    uid = _clean((req.data or {}).get("uid"), 128)
    if not uid:
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Who should lose access?")
    deck_ref.update({"sharedWith": firestore.ArrayRemove([uid]), f"sharedEmails.{uid}": firestore.DELETE_FIELD})
    return {"ok": True}

"""Cloud Functions for EASprint (Python runtime).

generate_deck         - Claude writes a deck of SEE questions, each one is checked (shape, a real irs.gov
                        source, and a blind answer check by a separate Claude call), and the deck is saved to
                        Firestore batch by batch so the app can show progress. Plan limits, per-account access
                        codes and suspension are enforced here.
admin_update_account  - The admin changes an account's plan, suspends or restores it, resets its deck count, or sets
                        its access code.
admin_list_accounts   - Every sign-in with its plan, usage and time on site, for the admin's Accounts page.
admin_engagement      - Everyone ranked by an engagement score, for the admin's Engagement page (see engagement.py).
admin_delete_account  - Deletes an account with its sign-in, decks and practice history.
record_activity       - One heartbeat for each minute someone actively uses the app (time on site).
square_webhook        - Square payment events: upgrades the paying account automatically (see square.py).
daily_reel            - Every morning, makes the day's Instagram reel (reels.py, reel_render.py) for the admin to
                        review, and posts it straight away if the admin turned on auto-post (instagram.py).
admin_reels           - The admin's Instagram page: recent reels and the account connection.
admin_reel_action     - The admin makes, regenerates, edits the caption of, skips or posts a reel.
admin_instagram       - The admin connects the Instagram account (pastes a token), turns auto-post on or off,
                        or disconnects.
"""

from __future__ import annotations

import json
import logging
import os
import random
import re
import secrets as pysecrets
import tempfile
import threading
import time
import urllib.parse
import uuid
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

import anthropic
from firebase_admin import auth, firestore, initialize_app, storage
from firebase_functions import https_fn, options, scheduler_fn

import accounts
import engagement
import reel_render
import reels
import square
from instagram import Instagram, InstagramError
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
            "written": 0,
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

    def on_written(n):
        deck_ref.update({"written": firestore.Increment(n)})

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
        result = _generate(request, on_plan=on_plan, on_batch=on_batch, on_written=on_written)
    except Exception as e:  # noqa: BLE001 - any failure refunds the deck
        logging.exception("deck %s failed", deck_id)
        message = str(e) if isinstance(e, GenerationError) else "Something went wrong while building the deck. Try again."
        deck_ref.update({"status": "failed", "error": message})
        account_ref.update({"decksCreated": firestore.Increment(-1)})
        raise https_fn.HttpsError(Err.FAILED_PRECONDITION, message)

    deck_ref.update({"status": "ready", "dropped": result.dropped, "questionCount": len(result.deck.questions)})
    return {"deckId": deck_id, "questionCount": len(result.deck.questions), "dropped": result.dropped}


def _require_admin(req: https_fn.CallableRequest) -> str:
    if req.auth is None or not is_admin(req.auth.token):
        raise https_fn.HttpsError(Err.PERMISSION_DENIED, "Only the admin can do that.")
    return req.auth.uid


def _now_ms() -> int:
    return int(time.time() * 1000)


def _ms(dt) -> int | None:
    return int(dt.timestamp() * 1000) if dt else None


def _auth_users() -> list:
    """Firebase Auth is the full list of sign-ins, including people who never opened the app after signing up."""
    return list(auth.list_users().iterate_all())


def _user_is_admin(user) -> bool:
    return is_admin({"email": user.email or "", "email_verified": user.email_verified})


@https_fn.on_call()
def admin_update_account(req: https_fn.CallableRequest) -> dict:
    admin_uid = _require_admin(req)
    data = req.data or {}
    uid = _clean(data.get("uid"), 128)
    if not uid:
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Which account?")
    try:
        user = auth.get_user(uid)
    except auth.UserNotFoundError:
        raise https_fn.HttpsError(Err.NOT_FOUND, "That account doesn't exist.")
    try:
        changes = accounts.clean_update(data)
    except ValueError as e:
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, str(e))
    if changes.get("status") == "suspended" and uid == admin_uid:
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "You can't suspend your own account.")

    db = firestore.client()
    account_ref = db.collection("accounts").document(uid)
    if not account_ref.get().exists:
        # Someone who signed up but never opened the app has no account yet.
        account_ref.set(_new_account({"email": user.email or "", "name": user.display_name or ""}))
    if "status" in changes:
        # Suspension also blocks sign-in, and signs the person out within the hour.
        auth.update_user(uid, disabled=changes["status"] == "suspended")
        if changes["status"] == "suspended":
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
def admin_list_accounts(req: https_fn.CallableRequest) -> dict:
    """Every sign-in, the admin first and then the newest, with plan, usage and time on site."""
    _require_admin(req)
    db = firestore.client()
    stored = {d.id: d.to_dict() or {} for d in db.collection("accounts").stream()}
    now = _now_ms()
    rows = []
    for user in _auth_users():
        account = stored.get(user.uid) or {}
        admin = _user_is_admin(user)
        plan = accounts.plan_for(account, admin)
        meta = user.user_metadata
        rows.append({
            "uid": user.uid,
            "email": user.email or account.get("email", ""),
            "displayName": user.display_name or account.get("displayName", ""),
            "isAdmin": admin,
            "plan": account.get("plan") if account.get("plan") in PLANS else DEFAULT_PLAN,
            "status": "suspended" if account.get("status") == "suspended" else "active",
            "decksCreated": int(account.get("decksCreated") or 0),
            "maxDecks": plan.max_decks,
            "maxQuestions": plan.max_questions,
            "hasAccessCode": bool(account.get("hasAccessCode")),
            "createdAt": meta.creation_timestamp if meta else None,
            "lastSignInAt": meta.last_sign_in_timestamp if meta else None,
            **accounts.activity_summary(account, now),
        })
    rows.sort(key=lambda r: (not r["isAdmin"], -(r["createdAt"] or 0)))
    return {"accounts": rows}


def _rows(collection, fields: list[str]) -> list[dict]:
    """Every document in a collection with just the fields asked for, timestamps in milliseconds, and its id."""
    out = []
    for d in collection.select(fields).stream():
        r = {k: (_ms(v) if hasattr(v, "timestamp") else v) for k, v in (d.to_dict() or {}).items()}
        out.append({**r, "id": d.id})
    return out


@https_fn.on_call(timeout_sec=300, memory=options.MemoryOption.GB_1)
def admin_engagement(req: https_fn.CallableRequest) -> dict:
    """Admin only. Without a uid: everyone ranked by score. With one: that person's row with their decks."""
    _require_admin(req)
    db = firestore.client()
    users = []
    for user in _auth_users():
        meta = user.user_metadata
        users.append({
            "uid": user.uid,
            "email": user.email or "",
            "displayName": user.display_name or "",
            "createdAt": meta.creation_timestamp if meta else None,
            "lastSignInAt": meta.last_sign_in_timestamp if meta else None,
            "isAdmin": _user_is_admin(user),
        })
    rows, shared = engagement.build(
        users,
        account_docs={d.id: d.to_dict() or {} for d in db.collection("accounts").select(["activeSeconds", "activeDays", "lastBeatAt", "decksCreated"]).stream()},
        decks={r["id"]: r for r in _rows(db.collection("decks"), ["ownerId", "title", "part", "status", "createdAt", "sharedWith"])},
        sessions=_rows(db.collection("sessions"), ["ownerId", "deckId", "status", "answers"]),
        now_ms=_now_ms(),
    )
    uid = _clean((req.data or {}).get("uid"), 128)
    if uid:
        if uid not in rows:
            raise https_fn.HttpsError(Err.NOT_FOUND, "That account doesn't exist.")
        return {"user": rows[uid], "scoring": engagement.scoring()}
    users_out = [{k: v for k, v in r.items() if k != "decks"} for r in engagement.ranked(rows, include_admin=True)]
    return {"users": users_out, "shared": engagement.top_shared(shared), "scoring": engagement.scoring()}


@https_fn.on_call(timeout_sec=300)
def admin_delete_account(req: https_fn.CallableRequest) -> dict:
    """Deletes a sign-in with its account, access code, upgrade request, decks and practice sessions, and takes the
    person off every deck shared with them. Can't be undone."""
    admin_uid = _require_admin(req)
    uid = _clean((req.data or {}).get("uid"), 128)
    if not uid:
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Which account?")
    if uid == admin_uid:
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "You can't delete your own account.")
    try:
        user = auth.get_user(uid)
    except auth.UserNotFoundError:
        user = None  # Sign-in already gone; still clean up whatever data is left.
    if user is not None and _user_is_admin(user):
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "The admin account can't be deleted.")

    db = firestore.client()
    # Remove the sign-in first so the person can't keep writing while their data is deleted.
    if user is not None:
        auth.delete_user(uid)
    writer = db.bulk_writer()
    decks = list(db.collection("decks").where("ownerId", "==", uid).stream())
    for deck in decks:
        # Sessions others took on the deck point to questions that are going too.
        for s in db.collection("sessions").where("deckId", "==", deck.id).stream():
            if s.get("ownerId") != uid:
                writer.delete(s.reference)
    sessions = list(db.collection("sessions").where("ownerId", "==", uid).stream())
    for s in sessions:
        writer.delete(s.reference)
    for deck in db.collection("decks").where("sharedWith", "array_contains", uid).stream():
        writer.update(deck.reference, {"sharedWith": firestore.ArrayRemove([uid]), f"sharedEmails.{uid}": firestore.DELETE_FIELD})
    for ref in (db.collection("accounts").document(uid), db.collection("accessCodes").document(uid), db.collection("upgradeRequests").document(uid)):
        writer.delete(ref)
    writer.close()
    for deck in decks:
        db.recursive_delete(deck.reference)  # the deck and its questions
    return {"ok": True, "decks": len(decks), "sessions": len(sessions)}


@https_fn.on_call()
def record_activity(req: https_fn.CallableRequest) -> dict:
    """Counts one minute of active use. Extra beats inside the same minute (other tabs) earn nothing."""
    uid = _require_user(req)
    db = firestore.client()
    ref = db.collection("accounts").document(uid)

    @firestore.transactional
    def run(tx) -> bool:
        snap = ref.get(transaction=tx)
        if not snap.exists:
            return False  # the app creates the account on the first visit; the next minute counts
        account = snap.to_dict() or {}
        if account.get("status") == "suspended":
            return False
        changes = accounts.credit_activity(account, _now_ms())
        if changes:
            tx.update(ref, changes)
        return bool(changes)

    return {"counted": run(db.transaction())}


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


# The address Square sends events to. Square signs this exact URL, so it must match the subscription.
SQUARE_WEBHOOK_URL = "https://us-central1-easprint-98625.cloudfunctions.net/square_webhook"


def _set_plan(db, uid: str, plan: str, reason: str) -> None:
    db.collection("accounts").document(uid).set({"plan": plan, "planSource": reason, "updatedAt": firestore.SERVER_TIMESTAMP}, merge=True)


@https_fn.on_request(secrets=["SQUARE_ACCESS_TOKEN", "SQUARE_WEBHOOK_SIGNATURE_KEY"], timeout_sec=60)
def square_webhook(req: https_fn.Request) -> https_fn.Response:
    """Upgrades an account when Square reports a completed payment for Pro or Pro Max, and moves it back to
    Free when its Square subscription is canceled. Payments that can't be matched to an account are kept
    for the admin to approve by hand."""
    body = req.get_data()
    if not square.signature_ok(os.environ.get("SQUARE_WEBHOOK_SIGNATURE_KEY", ""), SQUARE_WEBHOOK_URL, body, req.headers.get("x-square-hmacsha256-signature")):
        return https_fn.Response("bad signature", status=403)
    event = json.loads(body or b"{}")
    kind = event.get("type", "")
    obj = (event.get("data") or {}).get("object") or {}
    db = firestore.client()
    client = square.SquareClient(os.environ.get("SQUARE_ACCESS_TOKEN", ""))

    if kind in ("payment.created", "payment.updated"):
        payment = obj.get("payment") or {}
        if payment.get("status") != "COMPLETED" or not payment.get("id"):
            return https_fn.Response("ignored")
        record = db.collection("squarePayments").document(payment["id"])
        if record.get().exists:
            return https_fn.Response("already handled")
        details = square.payment_details(payment, client)
        uid = ""
        if details["email"]:
            try:
                uid = auth.get_user_by_email(details["email"]).uid
            except auth.UserNotFoundError:
                uid = ""
        account = db.collection("accounts").document(uid).get() if uid else None
        if details["plan"] and account is not None and account.exists:
            current = (account.to_dict() or {}).get("plan", "free")
            rank = {"free": 0, "pro": 1, "promax": 2}
            if rank.get(details["plan"], 0) > rank.get(current, 0):
                _set_plan(db, uid, details["plan"], f"square:{payment['id']}")
            status = "applied"
            # Close any "I paid" request the person sent from the Upgrade page.
            req_ref = db.collection("upgradeRequests").document(uid)
            if req_ref.get().exists:
                req_ref.update({"status": "approved", "closedAt": firestore.SERVER_TIMESTAMP})
        else:
            status = "unmatched"
            logging.warning("Square payment %s not matched: plan=%s email=%s", payment["id"], details["plan"], details["email"])
        record.set({**details, "uid": uid, "status": status, "receivedAt": firestore.SERVER_TIMESTAMP})
        return https_fn.Response(status)

    if kind == "subscription.updated":
        sub = obj.get("subscription") or {}
        if sub.get("status") not in ("CANCELED", "DEACTIVATED") or not sub.get("customer_id"):
            return https_fn.Response("ignored")
        email = (client.customer(sub["customer_id"]).get("email_address") or "").strip().lower()
        try:
            uid = auth.get_user_by_email(email).uid if email else ""
        except auth.UserNotFoundError:
            uid = ""
        if uid and not is_admin({"email": email, "email_verified": True}):
            _set_plan(db, uid, "free", f"square-subscription-{sub['status'].lower()}:{sub.get('id', '')}")
            return https_fn.Response("downgraded")
        logging.warning("Square subscription %s ended but no account matched %s", sub.get("id"), email)
        return https_fn.Response("unmatched")

    return https_fn.Response("ignored")


# ---------- the daily Instagram reel ----------

REEL_TZ = "America/New_York"
REEL_KEEP_DAYS = 90  # videos older than this are deleted from Storage; the record stays
REFRESH_TOKEN_AFTER = timedelta(days=7)
CAPTION_LIMIT = 2200  # Instagram's caption limit
DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _reel_today() -> date:
    return datetime.now(ZoneInfo(REEL_TZ)).date()


def _instagram_ref(db):
    # Holds the access token. No Firestore rule matches it, so only the functions can read it.
    return db.collection("instagram").document("config")


def _reel_ref(db, day: str):
    if not DATE.match(day or ""):
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Which day's reel?")
    return db.collection("reels").document(day)


def _upload(bucket, local: Path, path: str, content_type: str) -> str:
    """Uploads a file and returns a Firebase download URL, which Instagram can fetch without signing in."""
    token = str(uuid.uuid4())
    blob = bucket.blob(path)
    blob.metadata = {"firebaseStorageDownloadTokens": token}
    blob.upload_from_filename(str(local), content_type=content_type)
    return f"https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/{urllib.parse.quote(path, safe='')}?alt=media&token={token}"


def _delete_files(bucket, paths) -> None:
    for path in paths:
        if path:
            try:
                bucket.blob(path).delete()
            except Exception:  # noqa: BLE001 - already gone is fine
                logging.info("couldn't delete %s", path)


def _make_reel(db, day: date, fmt: str | None = None) -> dict:
    """Writes the script, renders the reel, uploads it and saves reels/{day} with status 'ready'."""
    ref = db.collection("reels").document(day.isoformat())
    old = ref.get()
    old_doc = (old.to_dict() or {}) if old.exists else {}
    if old_doc.get("status") in ("posted", "posting"):
        raise https_fn.HttpsError(Err.FAILED_PRECONDITION, "That reel is already on Instagram.")
    recent = [d.get("questionId") for d in db.collection("reels").order_by("date", direction=firestore.Query.DESCENDING).limit(reels.REUSE_AFTER).stream()]
    attempt = int(old_doc.get("attempt") or 0) + 1
    reel = reels.make(anthropic.Anthropic(), day, [r for r in recent if r], fmt, seed=str(attempt))
    bucket = storage.bucket()
    name = f"reels/{day.isoformat()}-{attempt}"
    with tempfile.TemporaryDirectory() as tmp:
        video, cover = Path(tmp) / "reel.mp4", Path(tmp) / "cover.jpg"
        seconds = reel_render.render(reel, video, seed=random.randrange(2**32), cover_path=cover)
        video_url = _upload(bucket, video, f"{name}.mp4", "video/mp4")
        cover_url = _upload(bucket, cover, f"{name}.jpg", "image/jpeg")
    _delete_files(bucket, [old_doc.get("videoPath"), old_doc.get("coverPath")])
    q = reel.question
    doc = {
        "date": day.isoformat(),
        "format": reel.format,
        "formatName": reels.FORMAT_NAMES[reel.format],
        "questionId": q["id"],
        "part": q["part"],
        "topic": q["topic"],
        "hook": reel.script.hook,
        "script": reel.script.model_dump(),
        "caption": reel.caption,
        "seconds": round(seconds, 1),
        "videoUrl": video_url,
        "videoPath": f"{name}.mp4",
        "coverUrl": cover_url,
        "coverPath": f"{name}.jpg",
        "status": "ready",
        "attempt": attempt,
        "error": "",
        "createdAt": firestore.SERVER_TIMESTAMP,
    }
    ref.set(doc)
    return doc


def _post_reel(db, day: str) -> dict:
    """Posts a ready reel to Instagram. Only one post can run at a time for a reel."""
    ref = db.collection("reels").document(day)
    config = _instagram_ref(db).get().to_dict() or {}
    if not config.get("token") or not config.get("userId"):
        raise https_fn.HttpsError(Err.FAILED_PRECONDITION, "Connect the Instagram account first.")

    @firestore.transactional
    def claim(tx) -> dict:
        snap = ref.get(transaction=tx)
        doc = snap.to_dict() if snap.exists else None
        if not doc:
            raise https_fn.HttpsError(Err.NOT_FOUND, "There's no reel for that day.")
        if doc.get("status") != "ready":
            raise https_fn.HttpsError(Err.FAILED_PRECONDITION, f"This reel is {doc.get('status')}, so it can't be posted.")
        tx.update(ref, {"status": "posting", "error": ""})
        return doc

    doc = claim(db.transaction())
    try:
        out = Instagram(config["token"], config["userId"]).publish_reel(doc["videoUrl"], doc["caption"], doc.get("coverUrl", ""))
    except InstagramError as e:
        ref.update({"status": "ready", "error": f"Instagram: {e}"})
        raise https_fn.HttpsError(Err.FAILED_PRECONDITION, f"Instagram said: {e}")
    except Exception:
        ref.update({"status": "ready", "error": "Posting failed. Try again."})
        raise
    ref.update({"status": "posted", "mediaId": out["id"], "permalink": out["permalink"], "postedAt": firestore.SERVER_TIMESTAMP})
    return out


def _refresh_token_if_due(db) -> None:
    ref = _instagram_ref(db)
    config = ref.get().to_dict() or {}
    last = config.get("refreshedAt")
    if not config.get("token") or (last and datetime.now(timezone.utc) - last < REFRESH_TOKEN_AFTER):
        return
    try:
        token, expires_in = Instagram(config["token"]).refresh()
    except InstagramError as e:
        # A brand-new token can't be refreshed for a day; the next run tries again.
        ref.update({"refreshError": str(e)})
        return
    ref.update({
        "token": token,
        "refreshedAt": firestore.SERVER_TIMESTAMP,
        "expiresAt": datetime.now(timezone.utc) + timedelta(seconds=expires_in or 60 * 86400),
        "refreshError": "",
    })


def _cleanup_old_videos(db) -> None:
    cutoff = (_reel_today() - timedelta(days=REEL_KEEP_DAYS)).isoformat()
    bucket = storage.bucket()
    for snap in db.collection("reels").where("date", "<", cutoff).stream():
        doc = snap.to_dict() or {}
        if doc.get("videoPath"):
            _delete_files(bucket, [doc.get("videoPath"), doc.get("coverPath")])
            snap.reference.update({"videoPath": "", "coverPath": "", "videoUrl": "", "coverUrl": ""})


@scheduler_fn.on_schedule(
    schedule="0 7 * * *",
    timezone=scheduler_fn.Timezone(REEL_TZ),
    secrets=["ANTHROPIC_API_KEY"],
    timeout_sec=1200,
    memory=options.MemoryOption.GB_2,
)
def daily_reel(event: scheduler_fn.ScheduledEvent) -> None:
    db = firestore.client()
    day = _reel_today()
    snap = db.collection("reels").document(day.isoformat()).get()
    if not snap.exists or (snap.to_dict() or {}).get("status") == "failed":
        try:
            _make_reel(db, day)
        except Exception as e:  # noqa: BLE001 - show the failure on the admin page instead
            logging.exception("daily reel for %s failed", day)
            message = str(e) if isinstance(e, (reels.ReelError, https_fn.HttpsError)) else "Making the reel failed. Try Regenerate."
            db.collection("reels").document(day.isoformat()).set({"date": day.isoformat(), "status": "failed", "error": message, "createdAt": firestore.SERVER_TIMESTAMP}, merge=True)
    _refresh_token_if_due(db)
    config = _instagram_ref(db).get().to_dict() or {}
    if config.get("autoPost") and (db.collection("reels").document(day.isoformat()).get().to_dict() or {}).get("status") == "ready":
        try:
            _post_reel(db, day.isoformat())
        except Exception:  # noqa: BLE001 - the error is saved on the reel for the admin
            logging.exception("auto-post for %s failed", day)
    _cleanup_old_videos(db)


def _instagram_status(config: dict) -> dict:
    return {
        "connected": bool(config.get("token") and config.get("userId")),
        "username": config.get("username", ""),
        "autoPost": bool(config.get("autoPost")),
        "expiresAt": _ms(config.get("expiresAt")),
        "refreshError": config.get("refreshError", ""),
    }


@https_fn.on_call()
def admin_reels(req: https_fn.CallableRequest) -> dict:
    _require_admin(req)
    db = firestore.client()
    out = []
    for d in db.collection("reels").order_by("date", direction=firestore.Query.DESCENDING).limit(30).stream():
        r = d.to_dict() or {}
        out.append({
            "date": d.id,
            "status": r.get("status", ""),
            "format": r.get("format", ""),
            "formatName": r.get("formatName", ""),
            "part": r.get("part", ""),
            "topic": r.get("topic", ""),
            "questionId": r.get("questionId", ""),
            "hook": r.get("hook", ""),
            "caption": r.get("caption", ""),
            "seconds": r.get("seconds"),
            "videoUrl": r.get("videoUrl", ""),
            "coverUrl": r.get("coverUrl", ""),
            "permalink": r.get("permalink", ""),
            "error": r.get("error", ""),
            "createdAt": _ms(r.get("createdAt")),
            "postedAt": _ms(r.get("postedAt")),
        })
    config = _instagram_ref(db).get().to_dict() or {}
    return {"reels": out, "today": _reel_today().isoformat(), "instagram": _instagram_status(config), "formats": reels.FORMAT_NAMES}


@https_fn.on_call(secrets=["ANTHROPIC_API_KEY"], timeout_sec=900, memory=options.MemoryOption.GB_2)
def admin_reel_action(req: https_fn.CallableRequest) -> dict:
    """action: make (today's reel, optionally in a chosen format), regenerate, caption, skip, unskip or post."""
    _require_admin(req)
    data = req.data or {}
    action = data.get("action")
    db = firestore.client()
    day = _clean(data.get("date"), 10) or _reel_today().isoformat()
    ref = _reel_ref(db, day)
    if action in ("make", "regenerate"):
        fmt = data.get("format") if data.get("format") in reels.FORMATS else None
        existing = ref.get()
        if action == "make" and existing.exists and (existing.to_dict() or {}).get("status") != "failed":
            raise https_fn.HttpsError(Err.ALREADY_EXISTS, "There's already a reel for that day. Use Regenerate.")
        try:
            _make_reel(db, date.fromisoformat(day), fmt)
        except reels.ReelError as e:
            raise https_fn.HttpsError(Err.FAILED_PRECONDITION, str(e))
        return {"ok": True}
    if action == "post":
        return {"ok": True, **_post_reel(db, day)}

    snap = ref.get()
    doc = snap.to_dict() if snap.exists else None
    if not doc:
        raise https_fn.HttpsError(Err.NOT_FOUND, "There's no reel for that day.")
    if doc.get("status") in ("posted", "posting"):
        raise https_fn.HttpsError(Err.FAILED_PRECONDITION, "That reel is already on Instagram.")
    if action == "caption":
        caption = str(data.get("caption") or "").strip()
        if not caption:
            raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "The caption can't be empty.")
        if len(caption) > CAPTION_LIMIT:
            raise https_fn.HttpsError(Err.INVALID_ARGUMENT, f"Instagram captions can be at most {CAPTION_LIMIT} characters.")
        ref.update({"caption": caption})
    elif action == "skip" and doc.get("status") == "ready":
        ref.update({"status": "skipped"})
    elif action == "unskip" and doc.get("status") == "skipped":
        ref.update({"status": "ready"})
    else:
        raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "Unknown action.")
    return {"ok": True}


@https_fn.on_call()
def admin_instagram(req: https_fn.CallableRequest) -> dict:
    """Connects the account with a pasted long-lived token, turns auto-post on or off, or disconnects."""
    _require_admin(req)
    data = req.data or {}
    db = firestore.client()
    ref = _instagram_ref(db)
    if data.get("disconnect"):
        ref.delete()
        return _instagram_status({})
    if data.get("token"):
        token = _clean(data.get("token"), 1000)
        client = Instagram(token)
        try:
            me = client.me()
        except InstagramError as e:
            raise https_fn.HttpsError(Err.INVALID_ARGUMENT, f"Instagram didn't accept that token: {e}")
        if not me.get("user_id"):
            raise https_fn.HttpsError(Err.INVALID_ARGUMENT, "That token didn't come with an Instagram account.")
        config = {
            "token": token,
            "userId": str(me["user_id"]),
            "username": me.get("username", ""),
            "accountType": me.get("account_type", ""),
            "connectedAt": firestore.SERVER_TIMESTAMP,
            "expiresAt": datetime.now(timezone.utc) + timedelta(days=60),
            "refreshError": "",
        }
        try:
            # Gets the exact expiry, and works when the token is over a day old. A newer one refreshes on a later morning.
            token, expires_in = client.refresh()
            config.update({"token": token, "refreshedAt": firestore.SERVER_TIMESTAMP, "expiresAt": datetime.now(timezone.utc) + timedelta(seconds=expires_in or 60 * 86400)})
        except InstagramError:
            pass
        ref.set(config, merge=True)
    if "autoPost" in data:
        if not (ref.get().to_dict() or {}).get("token"):
            raise https_fn.HttpsError(Err.FAILED_PRECONDITION, "Connect the Instagram account first.")
        ref.set({"autoPost": bool(data.get("autoPost"))}, merge=True)
    return _instagram_status(ref.get().to_dict() or {})

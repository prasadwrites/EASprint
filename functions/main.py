"""Cloud Functions for EASprint (Python runtime).

generate_deck - Claude writes a deck of SEE questions, each one is checked (shape, a real irs.gov
                source, and a blind answer check by a separate Claude call), and the deck is saved
                to Firestore.
"""

from __future__ import annotations

import os
import random

from firebase_admin import firestore, initialize_app
from firebase_functions import https_fn, options

from access import access_code_ok
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


def _require_user(req: https_fn.CallableRequest) -> str:
    if req.auth is None:
        raise https_fn.HttpsError(https_fn.FunctionsErrorCode.UNAUTHENTICATED, "Sign in to create decks.")
    return req.auth.uid


def _clean(text, limit: int) -> str:
    return str(text or "").strip()[:limit]


@https_fn.on_call(secrets=["ANTHROPIC_API_KEY", "DECK_ACCESS_CODE"], timeout_sec=540, memory=options.MemoryOption.GB_1)
def generate_deck(req: https_fn.CallableRequest) -> dict:
    uid = _require_user(req)
    data = req.data or {}
    if not access_code_ok(data.get("accessCode"), os.environ.get("DECK_ACCESS_CODE")):
        raise https_fn.HttpsError(https_fn.FunctionsErrorCode.PERMISSION_DENIED, "That access code isn't right.")
    topic = _clean(data.get("topic"), 200)
    if not topic:
        raise https_fn.HttpsError(https_fn.FunctionsErrorCode.INVALID_ARGUMENT, "Tell me what to practice.")
    part = data.get("part") if data.get("part") in DOMAINS else "part1"
    try:
        count = max(3, min(20, int(data.get("count", 10))))
    except (TypeError, ValueError):
        count = 10
    difficulty = data.get("difficulty") if data.get("difficulty") in DIFFICULTIES else "Mixed"
    request = DeckRequest(topic=topic, part=part, count=count, difficulty=difficulty, notes=_clean(data.get("notes"), 600))

    try:
        result = _generate(request)
    except GenerationError as e:
        raise https_fn.HttpsError(https_fn.FunctionsErrorCode.FAILED_PRECONDITION, str(e))

    db = firestore.client()
    deck_ref = db.collection("decks").document()
    batch = db.batch()
    batch.set(deck_ref, {
        "ownerId": uid,
        "title": result.deck.title,
        "part": part,
        "partTitle": PART_TITLES[part],
        "topic": topic,
        "difficulty": difficulty,
        "topics": result.deck.topics,
        "notes": request.notes,
        "questionCount": len(result.deck.questions),
        "source": "ai",
        "createdAt": firestore.SERVER_TIMESTAMP,
    })
    rng = random.Random()
    for i, q in enumerate(result.deck.questions):
        choices = [q.right_answer] + [w.option for w in q.wrong_options]
        rng.shuffle(choices)
        batch.set(deck_ref.collection("questions").document(), {
            "order": i,
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
    batch.commit()

    return {"deckId": deck_ref.id, "questionCount": len(result.deck.questions), "dropped": result.dropped}

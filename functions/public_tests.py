"""Public test links.

The admin can turn any deck (a built-in exam part, a Claude-built deck or a review deck) into a test that
anyone can take from a link, without signing in. Each link is a publicTests/{token} document that only these
functions read and write (Firestore has no client rule for it), so the token is the only way in, and turning
a link off stops it at once.

The link points at the deck rather than copying it, so it always serves the deck's current questions. If
the deck is deleted, the link stops working.
"""

from __future__ import annotations

import re
import secrets

TOKEN = re.compile(r"^[A-Za-z0-9_-]{16}$")
BUILTIN = {"part1", "part2", "part3"}
REVIEW_PREFIX = "rv_"
AI_DECK = re.compile(r"^[A-Za-z0-9]{20}$")
REVIEW_DECK = re.compile(r"^rv_[A-Za-z0-9_-]{1,40}$")

# The fields a test taker needs. Owner ids, ordering and storage fields stay on the server.
QUESTION_FIELDS = ("part", "domain", "topic", "difficulty", "prompt", "choices", "answer", "explanation", "whyNot", "source")


def new_token() -> str:
    """16 URL-safe characters (96 random bits): short enough to paste, far too many to guess."""
    return secrets.token_urlsafe(12)


def valid_token(token) -> bool:
    return isinstance(token, str) and bool(TOKEN.match(token))


def deck_kind(deck_id) -> str | None:
    """Where a deck lives: "builtin", "ai" (decks/), "review" (reviewDecks/), or None for a bad id."""
    if not isinstance(deck_id, str):
        return None
    if deck_id in BUILTIN:
        return "builtin"
    if deck_id.startswith(REVIEW_PREFIX):
        return "review" if REVIEW_DECK.match(deck_id) else None
    return "ai" if AI_DECK.match(deck_id) else None


def public_question(qid: str, data: dict) -> dict:
    """A question as the public test page needs it."""
    q = {k: data[k] for k in QUESTION_FIELDS if k in data}
    q["id"] = qid
    q.setdefault("whyNot", {})
    return q


def summary(token: str, data: dict) -> dict:
    """A link as the admin sees it. Times are milliseconds."""
    created = data.get("createdAt")
    return {
        "token": token,
        "deckId": data.get("deckId", ""),
        "kind": data.get("kind", ""),
        "title": data.get("title", ""),
        "part": data.get("part", ""),
        "active": bool(data.get("active")),
        "createdAt": int(created.timestamp() * 1000) if hasattr(created, "timestamp") else None,
        "opens": int(data.get("opens") or 0),
        "finishes": int(data.get("finishes") or 0),
    }


def finish_counts(score, total) -> tuple[int, int] | None:
    """A finished attempt's score, if it makes sense; otherwise None so nothing is recorded."""
    if isinstance(score, bool) or isinstance(total, bool):
        return None
    if not isinstance(score, int) or not isinstance(total, int):
        return None
    if total < 1 or total > 1000 or score < 0 or score > total:
        return None
    return score, total

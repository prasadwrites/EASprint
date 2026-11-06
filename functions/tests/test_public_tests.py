import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import public_tests as pt  # noqa: E402


def test_new_tokens_are_valid_and_different():
    tokens = {pt.new_token() for _ in range(50)}
    assert len(tokens) == 50
    assert all(pt.valid_token(t) for t in tokens)


def test_bad_tokens_are_rejected():
    for bad in [None, "", "short", "a" * 17, "has space in it!", "../../accounts/x", 12345]:
        assert not pt.valid_token(bad)


def test_deck_kinds():
    assert pt.deck_kind("part1") == "builtin"
    assert pt.deck_kind("A" * 20) == "ai"
    assert pt.deck_kind("rv_abc123") == "review"
    assert pt.deck_kind("rv_") is None
    assert pt.deck_kind("part4") is None
    assert pt.deck_kind("decks/x") is None
    assert pt.deck_kind(None) is None


def test_public_question_drops_storage_fields():
    q = pt.public_question("q1", {"prompt": "P", "choices": ["a", "b"], "answer": "a", "order": 3, "ownerId": "u", "addedAt": 1})
    assert q == {"id": "q1", "prompt": "P", "choices": ["a", "b"], "answer": "a", "whyNot": {}}


def test_summary():
    s = pt.summary("tok", {"deckId": "part2", "kind": "builtin", "title": "T", "active": True, "createdAt": datetime(2026, 1, 1, tzinfo=timezone.utc), "opens": 4})
    assert s["active"] and s["opens"] == 4 and s["finishes"] == 0
    assert s["createdAt"] == 1767225600000


def test_finish_counts():
    assert pt.finish_counts(7, 10) == (7, 10)
    assert pt.finish_counts(0, 1) == (0, 1)
    assert pt.finish_counts(11, 10) is None
    assert pt.finish_counts(-1, 10) is None
    assert pt.finish_counts(1, 0) is None
    assert pt.finish_counts(True, 10) is None
    assert pt.finish_counts("7", 10) is None

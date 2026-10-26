import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import engagement  # noqa: E402
from accounts import day_key  # noqa: E402

NOW = 1_790_000_000_000  # Sep 2026
DAY = 86_400_000


def user(uid, admin=False, created=NOW - 30 * DAY):
    return {"uid": uid, "email": f"{uid}@example.com", "displayName": uid.title(), "createdAt": created, "lastSignInAt": NOW, "isAdmin": admin}


def build(**kw):
    args = {"users": [user("ana"), user("ben"), user("cy"), user("boss", admin=True)], "account_docs": {}, "decks": {}, "sessions": [], "now_ms": NOW}
    args.update(kw)
    return engagement.build(**args)


def test_empty_rows_score_zero():
    rows, shared = build()
    assert set(rows) == {"ana", "ben", "cy", "boss"}
    assert rows["ana"]["score"] == 0 and rows["ana"]["completionRate"] is None
    assert shared == []


def test_time_on_site_and_active_days():
    account = {"activeSeconds": 600, "lastBeatAt": NOW, "activeDays": {day_key(NOW): 120, day_key(NOW - 2 * DAY): 60, day_key(NOW - 20 * DAY): 420}}
    rows, _ = build(account_docs={"ana": account})
    ana = rows["ana"]
    assert ana["activeMinutes"] == 10 and ana["activeDays"] == 3
    assert ana["todaySeconds"] == 120 and ana["weekSeconds"] == 180
    assert ana["points"]["activeMinutes"] == 2 and ana["points"]["activeDays"] == 6


def test_practice_counts_sessions_questions_and_parts():
    sessions = [
        {"ownerId": "ana", "deckId": "part1", "status": "completed", "answers": {"0": "a", "1": "b"}},
        {"ownerId": "ana", "deckId": "part1", "status": "completed", "answers": {"0": "a"}},
        {"ownerId": "ana", "deckId": "part3", "status": "active", "answers": {"0": "a"}},
        {"ownerId": "ana", "deckId": "d1", "status": "completed", "answers": {}},
        {"ownerId": "gone", "deckId": "part1", "status": "completed"},
    ]
    decks = {"d1": {"ownerId": "ana", "title": "Basis", "part": "part1", "createdAt": NOW - DAY}}
    rows, _ = build(sessions=sessions, decks=decks)
    ana = rows["ana"]
    assert ana["sessionsCompleted"] == 3 and ana["questionsAnswered"] == 3
    assert ana["decksPracticed"] == 2 and ana["partsPracticed"] == 1
    assert ana["decksCreated"] == 1
    by_id = {d["deckId"]: d for d in ana["decks"]}
    assert by_id["part1"]["kind"] == "builtin" and by_id["part1"]["sessions"] == 2
    assert by_id["d1"]["kind"] == "own" and by_id["d1"]["sessions"] == 1
    # Built-in parts go after their own decks.
    assert ana["decks"][-1]["deckId"] == "part1"


def test_failed_decks_are_not_kept_and_counter_wins_when_bigger():
    decks = {"d1": {"ownerId": "ana", "title": "A"}, "d2": {"ownerId": "ana", "title": "B", "status": "failed"}}
    rows, _ = build(decks=decks, account_docs={"ana": {"decksCreated": 4}, "ben": {"decksCreated": 0}})
    assert rows["ana"]["decksKept"] == 1 and rows["ana"]["decksCreated"] == 4
    rows, _ = build(decks={"d1": {"ownerId": "ben"}, "d2": {"ownerId": "ben"}}, account_docs={"ben": {"decksCreated": 0}})
    assert rows["ben"]["decksCreated"] == 2  # the admin reset the counter


def test_shares_count_people_and_who_finished():
    decks = {
        "d1": {"ownerId": "ana", "title": "Basis", "part": "part1", "createdAt": NOW - DAY, "sharedWith": ["ben", "cy", "ana"]},
        "d2": {"ownerId": "ana", "title": "Liens", "part": "part3", "createdAt": NOW, "sharedWith": ["cy"]},
    }
    sessions = [
        {"ownerId": "ben", "deckId": "d1", "status": "completed", "answers": {"0": "x"}},
        {"ownerId": "ben", "deckId": "d1", "status": "completed", "answers": {"0": "x"}},  # finishing twice is one person
        {"ownerId": "cy", "deckId": "d2", "status": "active"},
    ]
    rows, shared = build(decks=decks, sessions=sessions)
    ana = rows["ana"]
    assert ana["sharesMade"] == 3 and ana["sharesFinished"] == 1
    assert ana["completionRate"] == round(1 / 3, 3)
    assert rows["cy"]["sharedWithThem"] == 2
    assert {d["deckId"]: d["kind"] for d in rows["ben"]["decks"]} == {"d1": "shared"}
    top = engagement.top_shared(shared)
    assert [d["deckId"] for d in top] == ["d1", "d2"]
    assert top[0]["sharedWith"] == 2 and top[0]["finished"] == 1 and top[0]["ownerName"] == "Ana"
    assert ana["points"]["sharesMade"] == 6 and ana["points"]["sharesFinished"] == 4


def test_ranked_leaves_out_the_admin_and_breaks_ties():
    sessions = [{"ownerId": "boss", "deckId": "part1", "status": "completed"}] * 5 + [{"ownerId": "ben", "deckId": "part1", "status": "completed"}]
    rows, _ = build(sessions=sessions, account_docs={"cy": {"activeSeconds": 60}})
    order = [r["uid"] for r in engagement.ranked(rows)]
    assert "boss" not in order and order[0] == "ben"
    assert engagement.ranked(rows, include_admin=True)[0]["uid"] == "boss"


def test_scoring_lists_every_rule():
    fields = [s["field"] for s in engagement.scoring()]
    assert fields == [f for f, _, _ in engagement.SCORE]

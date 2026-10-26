import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from accounts import LimitError, check_request, is_admin, plan_for  # noqa: E402


def test_plan_limits():
    assert (plan_for({}).max_decks, plan_for({}).max_questions) == (5, 20)
    assert (plan_for({"plan": "pro"}).max_decks, plan_for({"plan": "pro"}).max_questions) == (50, 120)
    assert (plan_for({"plan": "promax"}).max_decks, plan_for({"plan": "promax"}).max_questions) == (100, 200)
    assert plan_for({"plan": "unknown"}).max_decks == 5


def test_free_account_limits():
    check_request({"decksCreated": 4}, False, 20)
    with pytest.raises(LimitError, match="20 questions"):
        check_request({}, False, 21)
    with pytest.raises(LimitError, match="all 5 decks"):
        check_request({"decksCreated": 5}, False, 10)


def test_pro_max_allows_200_questions():
    check_request({"plan": "promax", "decksCreated": 99}, False, 200)
    with pytest.raises(LimitError):
        check_request({"plan": "pro", "decksCreated": 0}, False, 121)


def test_suspended_accounts_cannot_build():
    with pytest.raises(LimitError, match="suspended"):
        check_request({"status": "suspended", "plan": "promax"}, False, 5)


def test_admin_needs_a_verified_email():
    assert is_admin({"email": "prasad.writes@gmail.com", "email_verified": True})
    assert not is_admin({"email": "prasad.writes@gmail.com", "email_verified": False})
    assert not is_admin({"email": "someone@example.com", "email_verified": True})
    assert not is_admin(None)


def test_clean_update():
    from accounts import clean_update

    assert clean_update({"plan": "pro", "resetDecks": True}) == {"plan": "pro", "decksCreated": 0}
    assert clean_update({"status": "suspended"}) == {"status": "suspended"}
    assert clean_update({"accessCode": "generate"}) == {}
    with pytest.raises(ValueError):
        clean_update({"plan": "gold"})
    with pytest.raises(ValueError):
        clean_update({"status": "gone"})


def test_activity_heartbeats():
    from accounts import DAY_MS, activity_summary, credit_activity, day_key

    now = 1_790_000_000_000
    first = credit_activity({}, now)
    assert first["activeSeconds"] == 60 and first["activeDays"] == {day_key(now): 60}
    # Another tab beating inside the same minute earns nothing.
    assert credit_activity(first, now + 10_000) is None
    old = {**first, "activeDays": {**first["activeDays"], day_key(now - 40 * DAY_MS): 300}}
    second = credit_activity(old, now + 60_000)
    assert second["activeSeconds"] == 120
    assert day_key(now - 40 * DAY_MS) not in second["activeDays"]  # older than 35 days is dropped
    summary = activity_summary({**second, "activeDays": {**second["activeDays"], day_key(now - 3 * DAY_MS): 600}}, now + 60_000)
    assert summary["todaySeconds"] == 120 and summary["weekSeconds"] == 720 and summary["lastActiveAt"] == now + 60_000

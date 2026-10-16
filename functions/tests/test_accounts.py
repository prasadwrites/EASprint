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

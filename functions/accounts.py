"""Accounts, plans and the admin.

Every signed-in person has an accounts/{uid} document. The admin (ADMIN_EMAIL, with a verified email)
can see every account, change its plan, suspend it, and give it its own access code for building decks.
Access codes live in accessCodes/{uid}, which only the admin and this function can read, so a person
can't read their own code out of the database.
"""

from __future__ import annotations

from dataclasses import dataclass

ADMIN_EMAIL = "prasad.writes@gmail.com"


@dataclass(frozen=True)
class Plan:
    name: str
    max_decks: int
    max_questions: int


PLANS: dict[str, Plan] = {
    "free": Plan("Free", 5, 20),
    "pro": Plan("Pro", 50, 120),
    "promax": Plan("Pro Max", 100, 200),
}
DEFAULT_PLAN = "free"
ADMIN_PLAN = "promax"


def is_admin(token: dict | None) -> bool:
    token = token or {}
    return token.get("email") == ADMIN_EMAIL and bool(token.get("email_verified"))


def plan_for(account: dict | None, admin: bool = False) -> Plan:
    if admin:
        return PLANS[ADMIN_PLAN]
    return PLANS.get((account or {}).get("plan", DEFAULT_PLAN), PLANS[DEFAULT_PLAN])


class LimitError(ValueError):
    pass


def check_request(account: dict | None, admin: bool, count: int) -> Plan:
    """Raises LimitError if this account may not build a deck of `count` questions right now."""
    account = account or {}
    if account.get("status") == "suspended":
        raise LimitError("Your account is suspended. Contact the person who runs EASprint.")
    plan = plan_for(account, admin)
    if count > plan.max_questions:
        raise LimitError(f"Your {plan.name} plan allows up to {plan.max_questions} questions per deck.")
    if int(account.get("decksCreated", 0)) >= plan.max_decks:
        raise LimitError(f"You've built all {plan.max_decks} decks your {plan.name} plan allows.")
    return plan

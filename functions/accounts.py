"""Accounts, plans and the admin.

Every signed-in person has an accounts/{uid} document. The admin (ADMIN_EMAIL, with a verified email)
can see every account, change its plan, suspend it, and give it its own access code for building decks.
Access codes live in accessCodes/{uid}, which only the admin and this function can read, so a person
can't read their own code out of the database.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone

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


def clean_update(data: dict) -> dict:
    """The plan, status and deck-count changes in an admin's edit to one account. Raises ValueError."""
    out: dict = {}
    if "plan" in data:
        if data["plan"] not in PLANS:
            raise ValueError("Unknown plan.")
        out["plan"] = data["plan"]
    if "status" in data:
        if data["status"] not in ("active", "suspended"):
            raise ValueError("Unknown status.")
        out["status"] = data["status"]
    if data.get("resetDecks"):
        out["decksCreated"] = 0
    return out


# Time on site. The app sends one heartbeat for each minute someone is actively using it.
HEARTBEAT_SECONDS = 60
MIN_BEAT_GAP_MS = 50_000  # extra beats (other tabs, retries) inside a minute earn nothing
KEEP_DAYS = 35
DAY_MS = 86_400_000


def day_key(ms: int) -> str:
    """The UTC date of a time in milliseconds, as YYYY-MM-DD."""
    return datetime.fromtimestamp(ms / 1000, tz=timezone.utc).strftime("%Y-%m-%d")


def credit_activity(account: dict, now_ms: int) -> dict | None:
    """The fields to write for one heartbeat, or None if it came too soon after the last one."""
    last = account.get("lastBeatAt")
    if isinstance(last, (int, float)) and 0 <= now_ms - last < MIN_BEAT_GAP_MS:
        return None
    today = day_key(now_ms)
    oldest = day_key(now_ms - KEEP_DAYS * DAY_MS)
    days = {k: int(v) for k, v in (account.get("activeDays") or {}).items() if k > oldest}
    days[today] = days.get(today, 0) + HEARTBEAT_SECONDS
    return {
        "activeSeconds": int(account.get("activeSeconds", 0)) + HEARTBEAT_SECONDS,
        "activeDays": days,
        "lastBeatAt": now_ms,
    }


def activity_summary(account: dict, now_ms: int) -> dict:
    """What the admin sees about someone's time on site."""
    days = account.get("activeDays") or {}
    week = {day_key(now_ms - i * DAY_MS) for i in range(7)}
    return {
        "activeSeconds": int(account.get("activeSeconds", 0)),
        "todaySeconds": int(days.get(day_key(now_ms), 0)),
        "weekSeconds": sum(int(v) for k, v in days.items() if k in week),
        "lastActiveAt": account.get("lastBeatAt"),
    }

"""Admin engagement panel: how much each person uses EASprint and how far the decks they share travel.

Everything here is plain Python so it can be tested without Firebase; main.py reads the collections, turns timestamps
into milliseconds and passes plain dicts in.

EASprint has one way a deck reaches other people: its owner shares it by email with someone who already has an
account. A share counts as finished once that person finishes a practice session on the deck.
"""

from __future__ import annotations

import accounts

# The three built-in exam parts. Practice on them counts as practice, but they belong to no one.
BUILTIN_DECKS = {
    "part1": "Part 1: Individuals",
    "part2": "Part 2: Businesses",
    "part3": "Part 3: Representation, Practices and Procedures",
}

# The engagement score. Each line is (field, points for each one, what it means). Shown on the admin page as is.
SCORE = (
    ("activeMinutes", 0.2, "minute actively using the site (1 point for 5 minutes)"),
    ("activeDays", 2, "day active in the last 35 days"),
    ("decksCreated", 3, "deck built with Claude"),
    ("sessionsCompleted", 1, "practice session finished"),
    ("questionsAnswered", 0.1, "question answered in a finished session (1 point for 10)"),
    ("sharesMade", 2, "person they shared a deck with"),
    ("sharesFinished", 4, "person who finished practice on a deck they shared"),
)


def score_of(row: dict) -> dict:
    """The score and the points each part adds, rounded to whole points."""
    parts = {field: round(row.get(field, 0) * points, 1) for field, points, _ in SCORE}
    return {"score": round(sum(parts.values())), "points": parts}


def _deck_row(deck_id: str, deck: dict | None, uid: str) -> dict:
    if deck_id in BUILTIN_DECKS:
        return {"deckId": deck_id, "title": BUILTIN_DECKS[deck_id], "part": deck_id, "kind": "builtin", "deleted": False,
                "createdAt": None, "sessions": 0, "sharedWith": 0, "finished": 0}
    deck = deck or {}
    return {
        "deckId": deck_id,
        "title": deck.get("title") or "Deleted deck",
        "part": deck.get("part") or "",
        # A deck someone else shared with them that they practiced.
        "kind": "own" if not deck or deck.get("ownerId") == uid else "shared",
        "deleted": not deck,
        "createdAt": deck.get("createdAt"),
        "sessions": 0,
        "sharedWith": 0,
        "finished": 0,
    }


def build(
    users: list[dict],
    account_docs: dict[str, dict],
    decks: dict[str, dict],
    sessions: list[dict],
    now_ms: int,
) -> tuple[dict[str, dict], list[dict]]:
    """One row per user, keyed by uid, with their own usage, their shares, their decks and the score; and one row per
    shared deck with how many people it went to and how many finished practice on it.

    users: {uid, email, displayName, createdAt, lastSignInAt, isAdmin}, from Firebase Auth.
    decks: Claude-built decks by id, {ownerId, title, part, createdAt, sharedWith}.
    sessions: {ownerId, deckId, status, answers}.
    Every timestamp is in milliseconds. Records for people who are no longer users are skipped.
    """
    rows: dict[str, dict] = {}
    for u in users:
        account = account_docs.get(u["uid"]) or {}
        activity = accounts.activity_summary(account, now_ms)
        rows[u["uid"]] = {
            **{k: u.get(k) for k in ("uid", "email", "displayName", "createdAt", "lastSignInAt")},
            "isAdmin": bool(u.get("isAdmin")),
            **activity,
            "activeMinutes": activity["activeSeconds"] // 60,
            "activeDays": sum(1 for v in (account.get("activeDays") or {}).values() if int(v) > 0),
            # The plan counter can be reset by the admin, and deleting decks lowers the count of decks kept, so take
            # whichever is bigger.
            "decksCreated": int(account.get("decksCreated") or 0),
            "decksKept": 0,
            "sessionsCompleted": 0,
            "questionsAnswered": 0,
            "decksPracticed": 0,
            "partsPracticed": 0,
            "sharedWithThem": 0,
            "sharesMade": 0,
            "sharesFinished": 0,
            "decks": {},
        }

    def deck_of(uid: str, deck_id: object) -> dict | None:
        if uid not in rows or not isinstance(deck_id, str) or not deck_id:
            return None
        found = rows[uid]["decks"]
        if deck_id not in found:
            found[deck_id] = _deck_row(deck_id, decks.get(deck_id), uid)
        return found[deck_id]

    for deck_id, d in decks.items():
        owner = d.get("ownerId")
        if owner in rows and d.get("status") != "failed":
            rows[owner]["decksKept"] += 1
            deck_of(owner, deck_id)

    practiced: dict[str, set] = {uid: set() for uid in rows}
    finished_by: set[tuple] = set()  # (uid, deckId) with a finished session, to tell when a shared deck was practiced
    for s in sessions:
        uid, deck_id = s.get("ownerId"), s.get("deckId")
        if uid not in rows or s.get("status") != "completed":
            continue
        r = rows[uid]
        r["sessionsCompleted"] += 1
        r["questionsAnswered"] += len(s.get("answers") or {})
        practiced[uid].add(deck_id)
        finished_by.add((uid, deck_id))
        d = deck_of(uid, deck_id)
        if d is not None:
            d["sessions"] += 1

    shared: list[dict] = []
    for deck_id, d in decks.items():
        owner = d.get("ownerId")
        people = [p for p in d.get("sharedWith") or [] if p != owner]
        if not people:
            continue
        for p in people:
            if p in rows:
                rows[p]["sharedWithThem"] += 1
        if owner not in rows:
            continue
        finished = sum(1 for p in people if (p, deck_id) in finished_by)
        rows[owner]["sharesMade"] += len(people)
        rows[owner]["sharesFinished"] += finished
        row = deck_of(owner, deck_id)
        row["sharedWith"] += len(people)
        row["finished"] += finished
        o = rows[owner]
        shared.append({
            "deckId": deck_id,
            "title": d.get("title") or "Untitled deck",
            "part": d.get("part") or "",
            "createdAt": d.get("createdAt"),
            "ownerUid": owner,
            "ownerName": o["displayName"] or o["email"],
            "ownerEmail": o["email"],
            "ownerIsAdmin": o["isAdmin"],
            "sharedWith": len(people),
            "finished": finished,
        })

    for uid, r in rows.items():
        r["decksCreated"] = max(r["decksCreated"], r["decksKept"])
        r["decksPracticed"] = len(practiced[uid])
        r["partsPracticed"] = len(practiced[uid] & set(BUILTIN_DECKS))
        r["completionRate"] = round(r["sharesFinished"] / r["sharesMade"], 3) if r["sharesMade"] else None
        r.update(score_of(r))
        r["decks"] = sorted(r["decks"].values(), key=lambda d: (d["kind"] == "builtin", -(d["sessions"] + d["finished"]), -(d["createdAt"] or 0)))
    return rows, shared


TOP_DECKS = 10


def top_shared(shared: list[dict], n: int = TOP_DECKS) -> list[dict]:
    """The shared decks most practiced by the people they went to, then the most widely shared."""
    return sorted(shared, key=lambda d: (-d["finished"], -d["sharedWith"], -(d["createdAt"] or 0)))[:n]


def ranked(rows: dict[str, dict], include_admin: bool = False) -> list[dict]:
    """Highest score first; ties go to more finished sessions, then more time on site."""
    out = [r for r in rows.values() if include_admin or not r["isAdmin"]]
    out.sort(key=lambda r: (-r["score"], -r["sessionsCompleted"], -r["activeSeconds"], r["email"] or ""))
    return out


def scoring() -> list[dict]:
    return [{"field": f, "points": p, "per": per} for f, p, per in SCORE]

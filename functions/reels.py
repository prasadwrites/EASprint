"""The daily Instagram reel: which fun format and question it uses, and the script Claude writes for it.

Every reel is built on one question from the built-in bank (reel_bank.json, exported from web/src/data).
The right answer, the options and the part always come from the bank. Claude only writes the hook, the
wording on screen and the caption, and is told to stay inside the question's own explanation, so a reel
can't teach a rule the app doesn't.
"""

from __future__ import annotations

import json
import random
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Literal

import anthropic
from pydantic import BaseModel, Field

MODEL = "claude-opus-5-5"
BANK_PATH = Path(__file__).with_name("reel_bank.json")

Format = Literal["clock", "mythfact", "whichpart", "term", "countdown"]
FORMATS: tuple[Format, ...] = ("clock", "mythfact", "whichpart", "term", "countdown")
FORMAT_NAMES = {
    "clock": "Beat the clock",
    "mythfact": "Myth or fact",
    "whichpart": "Which part is it?",
    "term": "Tax term of the day",
    "countdown": "Exam countdown",
}
PART_NAMES = {"part1": "Part 1: Individuals", "part2": "Part 2: Businesses", "part3": "Part 3: Representation"}
# A question isn't reused until this many other reels have gone out.
REUSE_AFTER = 60
BASE_TAGS = ["#EnrolledAgent", "#EAexam", "#SEEexam", "#TaxPro"]
SIGN_OFF = "Timed SEE practice with explanations and IRS sources at easprint.com. A study aid, not affiliated with the IRS."


class ReelError(RuntimeError):
    pass


class ReelScript(BaseModel):
    hook: str = Field(description="The opening line on screen, playful and under 45 characters, e.g. 'Think you know filing status?'")
    headline: str = Field(description="The main text on screen. What it holds depends on the format (see the instructions).")
    verdict: str = Field(description="Myth or fact only: exactly 'MYTH' or 'FACT'. Every other format: ''.")
    reveal: str = Field(description="The payoff line after the reveal, under 170 characters (see the instructions).")
    why: str = Field(description="One short sentence on why, under 120 characters, or '' if the format has none.")
    caption: str = Field(description="The Instagram caption: 2 to 4 short lines, conversational, at most one emoji per line, no hashtags.")
    hashtags: list[str] = Field(description="3 to 6 topic hashtags like '#FilingStatus', without the general EA exam ones.")


@dataclass
class Reel:
    format: Format
    question: dict
    script: ReelScript
    days_left: int | None = None

    @property
    def caption(self) -> str:
        return build_caption(self.script)


def load_bank() -> list[dict]:
    return json.loads(BANK_PATH.read_text())


def exam_window(day: date) -> tuple[bool, date]:
    """Whether the SEE testing window is open on `day`, and the day it closes (open) or reopens (closed).

    The window runs from May 1 to the last day of February; March and April are closed for updates.
    """
    if day.month in (3, 4):
        return False, date(day.year, 5, 1)
    end_year = day.year + 1 if day.month >= 5 else day.year
    leap = end_year % 4 == 0 and (end_year % 100 != 0 or end_year % 400 == 0)
    return True, date(end_year, 2, 29 if leap else 28)


def pick(day: date, bank: list[dict], recent_ids: list[str], fmt: str | None = None, seed: str = "") -> tuple[Format, dict]:
    """The format and question for a day. Formats take turns; the question is random but not one used recently,
    and the parts take turns so all three get airtime."""
    if fmt not in FORMATS:
        fmt = FORMATS[day.toordinal() % len(FORMATS)]
    rng = random.Random(f"{day.isoformat()}:{seed}")
    part = ("part1", "part2", "part3")[day.toordinal() % 3]
    avoid = set(recent_ids[:REUSE_AFTER])
    pool = [q for q in bank if q["part"] == part and q["id"] not in avoid] or [q for q in bank if q["id"] not in avoid] or bank
    if fmt == "clock":
        # Short questions read in time on a phone.
        short = [q for q in pool if len(q["prompt"]) <= 260 and max(len(c) for c in q["choices"]) <= 70]
        pool = short or pool
    return fmt, rng.choice(pool)


SYSTEM = """You write the on-screen text for short, fun Instagram reels for EASprint (easprint.com), an app for
timed practice for the IRS Special Enrollment Examination (SEE), the exam to become an Enrolled Agent.
The audience is people studying for the EA exam: tax preparers, accountants and career changers.

Tone: upbeat, a little playful, never silly about the tax law itself. Plain English. No exclamation-mark
pile-ups. Never promise a pass, a score or a job.

Accuracy matters more than wit. Every reel is built on one question from EASprint's bank, which tests federal
tax law through December 31, 2025 (tax year 2025). Use only facts that are in the question, its answer and its
explanation. Don't add figures, dates or rules that aren't there, and never contradict them."""

INSTRUCTIONS = {
    "clock": """Format: Beat the clock. Viewers get 10 seconds to answer the question, then see the answer.
- hook: a teaser such as "10 seconds. Can you get this one?"
- headline: the question, shortened to under 200 characters if needed, keeping every fact needed to answer it and
  the same right answer. If it's already short, use it as is.
- verdict: ''
- reveal: ''  (the app shows the right answer from the bank)
- why: why the answer is right, in one sentence from the explanation.""",
    "mythfact": """Format: Myth or fact. Viewers see a statement, then a MYTH or FACT stamp, then the real rule.
- hook: a teaser such as "Myth or fact? Tax pros get this wrong."
- headline: one statement under 140 characters about the rule this question tests. Make it a common misconception
  (a MYTH, often built on one of the wrong options) or a surprising truth (a FACT). It must be clearly true or
  clearly false under the explanation.
- verdict: MYTH or FACT
- reveal: the correct rule in one or two sentences, under 170 characters.
- why: ''""",
    "whichpart": """Format: Which part is it? Viewers guess which of the three SEE parts tests this topic.
- hook: a teaser such as "Which part of the EA exam tests this?"
- headline: the topic as a short phrase under 60 characters, e.g. "Qualifying surviving spouse status".
- verdict: ''
- reveal: ''  (the app shows the part from the bank)
- why: one sentence on what that part covers that makes this topic belong there.""",
    "term": """Format: Tax term of the day.
- hook: a teaser such as "Tax term of the day" with a fun twist.
- headline: the key term this question tests, under 40 characters.
- verdict: ''
- reveal: a plain-English definition from the explanation, under 170 characters.
- why: a one-line exam tip from the explanation, under 120 characters.""",
    "countdown": """Format: Exam countdown. The app shows how many days are left in the testing window (given below).
- hook: a motivating teaser that mentions the number of days, under 45 characters.
- headline: a short rallying line under 70 characters.
- verdict: ''
- reveal: one study tip taken from this question's explanation (its exam tip is a good source), under 170 characters.
- why: ''""",
}

LIMITS = {"hook": 60, "headline": 240, "reveal": 220, "why": 160, "caption": 600}


def _prompt(fmt: Format, q: dict, days_left: int | None) -> str:
    lines = [
        INSTRUCTIONS[fmt],
        "",
        f"Exam part: {PART_NAMES[q['part']]} (domain: {q['domain']}, topic: {q['topic']})",
        f"Question: {q['prompt']}",
        "Options: " + " | ".join(q["choices"]),
        f"Right answer: {q['answer']}",
        f"Explanation:\n{q['explanation']}",
        f"Source: {q['source']['title']}, {q['source']['section']}",
    ]
    if days_left is not None:
        lines.append(f"Days left in the current testing window: {days_left}")
    lines.append("\nThe caption should invite people to try more questions on EASprint (the link line is added for you).")
    return "\n".join(lines)


def check_script(fmt: Format, s: ReelScript) -> ReelScript:
    """Cleans up a script and refuses one the reel can't show."""
    data = {k: str(getattr(s, k) or "").strip() for k in ("hook", "headline", "verdict", "reveal", "why", "caption")}
    for k in ("hook", "headline", "caption"):
        if not data[k]:
            raise ReelError(f"The script has no {k}.")
    for k, limit in LIMITS.items():
        if len(data[k]) > limit:
            data[k] = data[k][: limit - 1].rsplit(" ", 1)[0] + "…"
    data["verdict"] = data["verdict"].upper()
    if fmt == "mythfact":
        if data["verdict"] not in ("MYTH", "FACT"):
            raise ReelError("A myth or fact reel needs a MYTH or FACT verdict.")
        if not data["reveal"]:
            raise ReelError("A myth or fact reel needs the real rule.")
    else:
        data["verdict"] = ""
    if fmt == "term" and not data["reveal"]:
        raise ReelError("A term reel needs a definition.")
    tags = []
    for t in s.hashtags or []:
        t = "#" + "".join(ch for ch in str(t) if ch.isalnum())
        if len(t) > 1 and t.lower() not in {x.lower() for x in tags + BASE_TAGS}:
            tags.append(t)
    return ReelScript(**data, hashtags=tags[:6])


def build_caption(s: ReelScript) -> str:
    return f"{s.caption.strip()}\n\n{SIGN_OFF}\n\n" + " ".join(BASE_TAGS + list(s.hashtags))


def write_script(client: anthropic.Anthropic, fmt: Format, q: dict, days_left: int | None) -> ReelScript:
    response = client.beta.messages.parse(
        model=MODEL,
        max_tokens=8000,
        system=SYSTEM,
        messages=[{"role": "user", "content": _prompt(fmt, q, days_left)}],
        output_format=ReelScript,
        output_config={"effort": "medium"},
        timeout=300,
        # If a request is declined by a safety classifier, retry on a fallback model.
        betas=["server-side-fallback-2026-07-01"],
        fallbacks="default",
    )
    if response.stop_reason == "refusal" or response.parsed_output is None:
        raise ReelError("Claude didn't write a script for this reel. Try regenerating.")
    return check_script(fmt, response.parsed_output)


def make(client: anthropic.Anthropic, day: date, recent_ids: list[str], fmt: str | None = None, seed: str = "") -> Reel:
    bank = load_bank()
    chosen, q = pick(day, bank, recent_ids, fmt, seed)
    days_left = None
    if chosen == "countdown":
        is_open, edge = exam_window(day)
        if not is_open:
            chosen, q = pick(day, bank, recent_ids, "clock", seed)  # nothing to count down to in March and April
        else:
            days_left = (edge - day).days
    return Reel(chosen, q, write_script(client, chosen, q, days_left), days_left)

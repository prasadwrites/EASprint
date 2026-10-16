"""Checks every generated question before it reaches a deck.

Tax answers can't be solved by a math engine the way MathSprint's are, so a question has to pass
three things instead:
  1. its shape: four distinct options, a full explanation, a domain from the right part;
  2. its source: an irs.gov page that actually exists;
  3. a blind check (in generator.py): a separate Claude call answers it without the key, and must
     pick the keyed option and agree that exactly one option is right.
"""

from __future__ import annotations

import urllib.request
from dataclasses import dataclass
from typing import Callable
from urllib.parse import urlparse

from schema import DOMAINS, GeneratedQuestion

IRS_HOSTS = {"www.irs.gov", "irs.gov"}


@dataclass
class CheckResult:
    ok: bool
    reason: str = ""


def url_exists(url: str, timeout: float = 8.0) -> bool:
    """True if the page answers with HTTP 200 after redirects."""
    req = urllib.request.Request(url, method="GET", headers={"User-Agent": "EASprint source check"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status == 200
    except Exception:
        return False


def check_shape(q: GeneratedQuestion, part: str, difficulty: str) -> CheckResult:
    if q.domain not in DOMAINS[part]:
        return CheckResult(False, f"domain {q.domain!r} is not a domain of {part} ({', '.join(DOMAINS[part])})")
    if len(q.wrong_options) != 3:
        return CheckResult(False, "needs exactly three wrong options")
    options = [q.right_answer.strip()] + [w.option.strip() for w in q.wrong_options]
    if any(not o for o in options) or len({o.lower() for o in options}) != 4:
        return CheckResult(False, "the four options must all be different and non-empty")
    if any(len(w.why_not.strip()) < 15 for w in q.wrong_options):
        return CheckResult(False, "every wrong option needs a reason it is wrong")
    if "all of the above" in " ".join(options).lower() or "none of the above" in " ".join(options).lower():
        return CheckResult(False, "options are shuffled, so 'all/none of the above' can't be used")
    paragraphs = [p for p in q.explanation.split("\n\n") if p.strip()]
    if len(paragraphs) < 2 or len(q.explanation) < 250:
        return CheckResult(False, "the explanation must give the rule, how it applies, and an exam tip")
    if difficulty != "Mixed" and q.difficulty != difficulty:
        return CheckResult(False, f"difficulty should be {difficulty}")
    host = urlparse(q.source.url).hostname or ""
    if urlparse(q.source.url).scheme != "https" or host not in IRS_HOSTS:
        return CheckResult(False, f"the source must be a page on https://www.irs.gov/, not {q.source.url!r}")
    return CheckResult(True)


def check_source(q: GeneratedQuestion, exists: Callable[[str], bool] = url_exists) -> CheckResult:
    if not exists(q.source.url):
        return CheckResult(False, f"the source page {q.source.url} does not exist; cite a real irs.gov page")
    return CheckResult(True)

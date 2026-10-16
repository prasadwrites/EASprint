"""Deck generation pipeline: Claude writes, the questions are checked, Claude fixes what failed.

The check has three parts (see validator.py): shape, a real irs.gov source, and a blind check in which
a separate Claude call answers each question without seeing the key.
"""

from __future__ import annotations

import json
import logging
import random
from dataclasses import dataclass, field
from typing import Callable

import anthropic

from schema import DOMAINS, BlindCheck, GeneratedDeck, GeneratedQuestion
from validator import check_shape, check_source, url_exists

MODEL = "claude-opus-5-5"
MAX_REPAIR_ROUNDS = 2
LETTERS = "ABCD"

log = logging.getLogger(__name__)

SYSTEM = """You write practice questions for the IRS Special Enrollment Examination (SEE), the exam to become
an Enrolled Agent. The current exam tests federal tax law as amended through December 31, 2025: questions
refer to tax year 2025 and must use 2025 figures (for example the $15,750 / $31,500 / $23,625 standard
deduction, the $2,200 child tax credit and the $40,000 state and local tax limit). Never use figures from
later years.

Write each question the way the exam does: four options, exactly one correct, testing a rule a working
Enrolled Agent needs. Include every fact needed to answer it. Wrong options should be tempting mistakes:
last year's figure, a neighboring rule, a common misreading. Keep all four options a similar length and
style. Don't write "all of the above", "none of the above" or "both A and B", because options are shuffled.

The explanation is three paragraphs separated by a blank line: the rule; how it applies to these facts,
with the working shown for any calculation; and one line starting "Exam tip:". Give every wrong option a
short reason it is wrong.

Cite the IRS source that supports the answer: a real page on https://www.irs.gov/ such as a publication
(https://www.irs.gov/publications/p17), form instructions (https://www.irs.gov/instructions/i1040gi) or
Circular 230 (https://www.irs.gov/pub/irs-pdf/pcir230.pdf), plus the section within it. Only cite pages
you are confident exist."""

BLIND_SYSTEM = """You are an experienced Enrolled Agent checking practice questions for the SEE. Apply federal
tax law as amended through December 31, 2025 (tax year 2025). For each question, pick the option you
believe is correct. Mark single_best false if more than one option is defensible, none is correct, the
facts are missing or ambiguous, or the question relies on a figure from the wrong year, and say why."""


class GenerationError(RuntimeError):
    pass


@dataclass
class DeckRequest:
    topic: str
    part: str  # part1 | part2 | part3
    count: int
    difficulty: str  # Easy | Medium | Hard | Mixed
    notes: str = ""


@dataclass
class DeckResult:
    deck: GeneratedDeck
    dropped: int = 0
    repairs: int = 0
    failures: list[str] = field(default_factory=list)


def _parse(client: anthropic.Anthropic, system: str, prompt: str, schema, effort: str):
    response = client.beta.messages.parse(
        model=MODEL,
        max_tokens=32000,
        system=system,
        messages=[{"role": "user", "content": prompt}],
        output_format=schema,
        output_config={"effort": effort},
        # If a request is declined by a safety classifier, retry on a fallback model.
        betas=["server-side-fallback-2026-07-01"],
        fallbacks="default",
    )
    if response.stop_reason == "refusal":
        raise GenerationError("Claude declined to write this deck. Try rewording the topic.")
    if response.stop_reason == "max_tokens" or response.parsed_output is None:
        raise GenerationError("The deck came back incomplete. Try fewer questions.")
    return response.parsed_output


def _domains_text(part: str) -> str:
    return "\n".join(f"  {k}: {v}" for k, v in DOMAINS[part].items())


def _initial_prompt(req: DeckRequest) -> str:
    mix = "a balanced mix of Easy, Medium and Hard" if req.difficulty == "Mixed" else f"all {req.difficulty}"
    lines = [
        f"Write a practice deck of exactly {req.count} questions on: {req.topic}.",
        f"Exam part: {req.part}. Set each question's domain to one of these ids:\n{_domains_text(req.part)}",
        f"Difficulty: {mix}.",
    ]
    if req.notes.strip():
        lines.append(f"Candidate's extra instructions: {req.notes.strip()}")
    return "\n".join(lines)


def _repair_prompt(req: DeckRequest, failed: list[tuple[GeneratedQuestion, str]]) -> str:
    items = [{"question": q.model_dump(), "problem": reason} for q, reason in failed]
    return (
        f"These questions for a {req.part} deck on {req.topic} failed an automatic check. Write "
        f"{len(failed)} corrected or replacement questions, one for each, in the same order, at the same "
        f"difficulty and on the same topic. Domains must be one of:\n{_domains_text(req.part)}\n\n"
        + json.dumps(items, indent=2)
        + "\n\nReturn them as a deck; the title and topics fields can repeat the original deck's."
    )


def _options(q: GeneratedQuestion, rng: random.Random) -> list[str]:
    options = [q.right_answer] + [w.option for w in q.wrong_options]
    rng.shuffle(options)
    return options


def blind_check(
    client: anthropic.Anthropic, questions: list[GeneratedQuestion], rng: random.Random
) -> list[str]:
    """Has Claude answer each question without the key. Returns '' for a pass, or the reason it failed."""
    if not questions:
        return []
    shuffled = [_options(q, rng) for q in questions]
    text = "\n\n".join(
        f"Question {i + 1}: {q.prompt}\n" + "\n".join(f"{LETTERS[k]}. {o}" for k, o in enumerate(opts))
        for i, (q, opts) in enumerate(zip(questions, shuffled))
    )
    result: BlindCheck = _parse(client, BLIND_SYSTEM, text, BlindCheck, "high")
    by_number = {a.number: a for a in result.answers}
    reasons = []
    for i, (q, opts) in enumerate(zip(questions, shuffled)):
        a = by_number.get(i + 1)
        if a is None:
            reasons.append("the independent check did not answer this question")
        elif not a.single_best:
            reasons.append(f"an independent check found it ambiguous or outdated: {a.problem}")
        elif opts[LETTERS.index(a.letter)] != q.right_answer:
            reasons.append(
                f"an independent check chose {opts[LETTERS.index(a.letter)]!r}, not the keyed answer "
                f"{q.right_answer!r}. Fix the key, or rewrite the question so exactly one option is right"
                + (f" ({a.problem})" if a.problem else "")
            )
        else:
            reasons.append("")
    return reasons


def _check_all(
    client: anthropic.Anthropic,
    req: DeckRequest,
    questions: list[GeneratedQuestion],
    exists: Callable[[str], bool],
    rng: random.Random,
) -> tuple[list[GeneratedQuestion], list[tuple[GeneratedQuestion, str]]]:
    good: list[GeneratedQuestion] = []
    failed: list[tuple[GeneratedQuestion, str]] = []
    shaped: list[GeneratedQuestion] = []
    for q in questions:
        result = check_shape(q, req.part, req.difficulty)
        if result.ok:
            result = check_source(q, exists)
        if result.ok:
            shaped.append(q)
        else:
            failed.append((q, result.reason))
    for q, reason in zip(shaped, blind_check(client, shaped, rng)):
        (failed.append((q, reason)) if reason else good.append(q))
    return good, failed


def generate_deck(
    req: DeckRequest,
    client: anthropic.Anthropic | None = None,
    exists: Callable[[str], bool] = url_exists,
    rng: random.Random | None = None,
) -> DeckResult:
    client = client or anthropic.Anthropic()
    rng = rng or random.Random()
    draft: GeneratedDeck = _parse(client, SYSTEM, _initial_prompt(req), GeneratedDeck, "high")
    good, failed = _check_all(client, req, draft.questions[: req.count], exists, rng)

    repairs = 0
    for _ in range(MAX_REPAIR_ROUNDS):
        if not failed:
            break
        log.info("repairing %d questions: %s", len(failed), [r for _, r in failed])
        repairs += len(failed)
        fixed: GeneratedDeck = _parse(client, SYSTEM, _repair_prompt(req, failed), GeneratedDeck, "high")
        replacements = fixed.questions[: len(failed)]
        # Anything Claude didn't return a replacement for stays failed.
        unanswered = failed[len(replacements):]
        more, failed = _check_all(client, req, replacements, exists, rng)
        good += more
        failed += unanswered

    if not good:
        raise GenerationError("None of the generated questions passed the checks. Try a narrower topic.")

    deck = GeneratedDeck(title=draft.title, topics=draft.topics, questions=good)
    return DeckResult(deck=deck, dropped=len(failed), repairs=repairs, failures=[r for _, r in failed])

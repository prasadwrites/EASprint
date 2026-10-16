import random
import re
import sys
import threading
from pathlib import Path
from types import SimpleNamespace

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from generator import DeckRequest, generate_deck  # noqa: E402
from schema import BlindAnswer, BlindCheck, DeckPlan, GeneratedDeck, GeneratedQuestion, Source, WrongOption  # noqa: E402
from validator import check_shape  # noqa: E402

EXPLANATION = (
    "The rule: a taxpayer who meets every test qualifies for this treatment under the law in effect for 2025.\n\n"
    "Applying it: the facts in the question meet each test, so the keyed answer follows directly from the rule.\n\n"
    "Exam tip: read every fact in the question, because one changed detail usually changes the answer."
)
RIGHT, WRONG = "$15,750", ("$15,000", "$14,600", "$23,625")


def make_q(prompt="Q?", right=RIGHT, url="https://www.irs.gov/publications/p17", domain="p1d1"):
    return GeneratedQuestion(
        prompt=prompt, domain=domain, topic="Standard deduction", difficulty="Medium", right_answer=right,
        wrong_options=[WrongOption(option=o, why_not="This is a different year's or status's amount.") for o in WRONG],
        explanation=EXPLANATION,
        source=Source(title="Publication 17", url=url, section="Standard Deduction"),
    )


class FakeClient:
    """Plans `ideas`, writes one question per idea (prompt = idea), and blind-checks them.

    Prompts in `wrong_key` are answered with a different option by the blind check until they have been
    repaired `fix_after` times; prompts in `bad_url` cite a missing page; prompts in `vague` are ambiguous.
    A repaired question keeps its prompt, so repeated failures can be simulated.
    """

    def __init__(self, n, wrong_key=(), bad_url=(), vague=(), fix_after=99):
        self.n, self.wrong_key, self.bad_url, self.vague = n, set(wrong_key), set(bad_url), set(vague)
        self.fix_after, self.repairs, self.prompts, self.lock = fix_after, {}, [], threading.Lock()
        self.beta = SimpleNamespace(messages=SimpleNamespace(parse=self._parse))

    def _q(self, prompt):
        return make_q(prompt, url="https://www.irs.gov/nope" if prompt in self.bad_url else "https://www.irs.gov/publications/p17")

    def _parse(self, **kw):
        prompt, schema = kw["messages"][0]["content"], kw["output_format"]
        with self.lock:
            self.prompts.append(prompt)
        if schema is DeckPlan:
            out = DeckPlan(title="Standard deduction", topics=["Amounts"], ideas=[f"Q{i + 1}?" for i in range(self.n)])
        elif schema is BlindCheck:
            out = self._blind(prompt)
        elif "failed an automatic check" in prompt:
            names = re.findall(r'"prompt": "(Q\d+\?)"', prompt)
            with self.lock:
                for p in names:
                    self.repairs[p] = self.repairs.get(p, 0) + 1
            out = GeneratedDeck(title="", topics=[], questions=[self._q(p) for p in names])
        else:
            ideas = re.findall(r"^\d+\. (Q\d+\?)$", prompt, re.M)
            out = GeneratedDeck(title="", topics=[], questions=[self._q(p) for p in ideas])
        return SimpleNamespace(stop_reason="end_turn", parsed_output=out)

    def _blind(self, prompt):
        answers = []
        for block in prompt.split("\n\n"):
            head, *opts = block.split("\n")
            n, text = re.match(r"Question (\d+): (.*)", head).groups()
            broken = text in self.wrong_key and self.repairs.get(text, 0) < self.fix_after
            want = WRONG[0] if broken else RIGHT
            letter = next(o[0] for o in opts if o[3:] == want)
            answers.append(BlindAnswer(number=int(n), letter=letter, single_best=text not in self.vague, problem=""))
        return BlindCheck(answers=answers)


def run(client, count, **kw):
    saved = []
    result = generate_deck(
        DeckRequest("Standard deduction", "part1", count, "Medium"), client,
        exists=lambda u: not u.endswith("nope"), rng=random.Random(1),
        on_batch=lambda qs, n: saved.append((len(qs), n)), **kw,
    )
    return result, saved


def test_good_questions_pass():
    result, saved = run(FakeClient(4), 4)
    assert len(result.deck.questions) == 4 and result.dropped == 0 and result.repairs == 0
    assert saved == [(4, 4)]


def test_blind_check_disagreement_is_repaired():
    client = FakeClient(3, wrong_key={"Q2?"}, fix_after=1)
    result, _ = run(client, 3)
    assert sorted(q.prompt for q in result.deck.questions) == ["Q1?", "Q2?", "Q3?"]
    assert result.repairs == 1
    assert any("independent check chose" in p for p in client.prompts)


def test_unfixable_questions_are_dropped_after_two_repairs():
    client = FakeClient(3, bad_url={"Q2?"}, vague={"Q3?"})
    result, _ = run(client, 3)
    assert [q.prompt for q in result.deck.questions] == ["Q1?"]
    assert result.dropped == 2
    assert any("does not exist" in f for f in result.failures) and any("ambiguous" in f for f in result.failures)


def test_large_decks_are_built_in_batches():
    result, saved = run(FakeClient(25), 25)
    assert len(result.deck.questions) == 25
    assert sorted(n for _, n in saved) == [5, 10, 10]
    assert len({q.prompt for q in result.deck.questions}) == 25


def test_shape_rules():
    assert check_shape(make_q(), "part1", "Medium").ok
    assert not check_shape(make_q(domain="p2d1"), "part1", "Medium").ok
    assert not check_shape(make_q(url="https://example.com/p17"), "part1", "Medium").ok
    assert not check_shape(make_q(right="$15,000"), "part1", "Medium").ok  # duplicate option
    assert not check_shape(make_q(), "part1", "Hard").ok

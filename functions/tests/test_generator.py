import random
import re
import sys
from pathlib import Path
from types import SimpleNamespace

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from generator import DeckRequest, generate_deck  # noqa: E402
from schema import BlindAnswer, BlindCheck, GeneratedDeck, GeneratedQuestion, Source, WrongOption  # noqa: E402
from validator import check_shape  # noqa: E402

EXPLANATION = (
    "The rule: a taxpayer who meets every test qualifies for this treatment under the law in effect for 2025.\n\n"
    "Applying it: the facts in the question meet each test, so the keyed answer follows directly from the rule.\n\n"
    "Exam tip: read every fact in the question, because one changed detail usually changes the answer."
)


def make_q(prompt="What is the 2025 standard deduction for a single filer?", right="$15,750", url="https://www.irs.gov/publications/p17", domain="p1d1"):
    return GeneratedQuestion(
        prompt=prompt, domain=domain, topic="Standard deduction", difficulty="Medium", right_answer=right,
        wrong_options=[WrongOption(option=o, why_not="This is a different year's or status's amount.") for o in ("$15,000", "$14,600", "$23,625")],
        explanation=EXPLANATION,
        source=Source(title="Publication 17", url=url, section="Standard Deduction"),
    )


class FakeClient:
    """Returns queued decks, and answers blind checks with the option text in `picks` (by prompt)."""

    def __init__(self, decks, picks=None, unsure=()):
        self.decks, self.picks, self.unsure, self.prompts = list(decks), picks or {}, set(unsure), []
        self.beta = SimpleNamespace(messages=SimpleNamespace(parse=self._parse))

    def _parse(self, **kw):
        prompt = kw["messages"][0]["content"]
        self.prompts.append(prompt)
        if kw["output_format"] is BlindCheck:
            return SimpleNamespace(stop_reason="end_turn", parsed_output=self._blind(prompt))
        return SimpleNamespace(stop_reason="end_turn", parsed_output=self.decks.pop(0))

    def _blind(self, prompt):
        answers = []
        for block in prompt.split("\n\n"):
            head, *opts = block.split("\n")
            n, text = re.match(r"Question (\d+): (.*)", head).groups()
            want = self.picks.get(text)
            letter = next((o[0] for o in opts if want and o[3:] == want), opts[0][0])
            answers.append(BlindAnswer(number=int(n), letter=letter, single_best=text not in self.unsure, problem=""))
        return BlindCheck(answers=answers)


def deck(*qs):
    return GeneratedDeck(title="Standard deduction", topics=["Standard deduction"], questions=list(qs))


REQ = DeckRequest("Standard deduction", "part1", 2, "Medium")


def test_good_questions_pass_the_blind_check():
    a, b = make_q("Q one?"), make_q("Q two?")
    client = FakeClient([deck(a, b)], picks={"Q one?": "$15,750", "Q two?": "$15,750"})
    result = generate_deck(REQ, client, exists=lambda u: True, rng=random.Random(1))
    assert len(result.deck.questions) == 2 and result.dropped == 0 and result.repairs == 0


def test_question_the_blind_check_disagrees_with_is_repaired():
    a, b, fix = make_q("Q one?"), make_q("Q two?"), make_q("Q three?")
    client = FakeClient([deck(a, b), deck(fix)], picks={"Q one?": "$15,750", "Q two?": "$14,600", "Q three?": "$15,750"})
    result = generate_deck(REQ, client, exists=lambda u: True, rng=random.Random(2))
    assert [q.prompt for q in result.deck.questions] == ["Q one?", "Q three?"]
    assert result.repairs == 1
    assert "independent check chose" in client.prompts[2]


def test_missing_source_and_ambiguity_are_dropped_after_two_repairs():
    good, bad_url, vague = make_q("Q one?"), make_q("Q two?", url="https://www.irs.gov/nope"), make_q("Q three?")
    picks = {"Q one?": "$15,750", "Q two?": "$15,750", "Q three?": "$15,750"}
    client = FakeClient([deck(good, bad_url, vague), deck(bad_url, vague), deck(bad_url, vague)], picks=picks, unsure={"Q three?"})
    req = DeckRequest("Standard deduction", "part1", 3, "Medium")
    result = generate_deck(req, client, exists=lambda u: not u.endswith("nope"), rng=random.Random(3))
    assert [q.prompt for q in result.deck.questions] == ["Q one?"]
    assert result.dropped == 2
    assert any("does not exist" in f for f in result.failures) and any("ambiguous" in f for f in result.failures)


def test_shape_rules():
    assert check_shape(make_q(), "part1", "Medium").ok
    assert not check_shape(make_q(domain="p2d1"), "part1", "Medium").ok
    assert not check_shape(make_q(url="https://example.com/p17"), "part1", "Medium").ok
    assert not check_shape(make_q(right="$15,000"), "part1", "Medium").ok  # duplicate option
    assert not check_shape(make_q(), "part1", "Hard").ok

import io
import json
import sys
import urllib.error
from datetime import date
from pathlib import Path
from types import SimpleNamespace

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import reel_render  # noqa: E402
import reels  # noqa: E402
from instagram import Instagram, InstagramError  # noqa: E402
from reels import FORMATS, Reel, ReelError, ReelScript, check_script, load_bank, pick, exam_window  # noqa: E402


def script(**kw):
    base = dict(hook="Can you get this one?", headline="Dana's spouse died in 2023. What is Dana's best filing status for 2025?",
                verdict="", reveal="", why="Two years after the year of death.", caption="Quick one for your study break.", hashtags=["#FilingStatus"])
    return ReelScript(**{**base, **kw})


def test_bank_is_exported_with_answers_among_the_choices():
    bank = load_bank()
    assert len(bank) >= 120
    for q in bank:
        assert q["answer"] in q["choices"] and len(q["choices"]) == 4
        assert q["source"]["url"].startswith("https://www.irs.gov/")


def test_formats_take_turns_and_parts_rotate():
    bank = load_bank()
    days = [date(2026, 11, 1 + i) for i in range(15)]
    picks = [pick(d, bank, []) for d in days]
    assert {f for f, _ in picks[:5]} == set(FORMATS)
    assert {q["part"] for _, q in picks[:3]} == {"part1", "part2", "part3"}
    assert pick(days[0], bank, [], "term")[0] == "term"


def test_recent_questions_are_not_reused():
    bank = load_bank()
    day = date(2026, 11, 3)
    _, first = pick(day, bank, [])
    _, again = pick(day, bank, [first["id"]])
    assert again["id"] != first["id"]


def test_exam_window_closes_end_of_february_and_reopens_in_may():
    assert exam_window(date(2026, 10, 30)) == (True, date(2027, 2, 28))
    assert exam_window(date(2027, 1, 10)) == (True, date(2027, 2, 28))
    assert exam_window(date(2027, 11, 1)) == (True, date(2028, 2, 29))
    assert exam_window(date(2027, 3, 15)) == (False, date(2027, 5, 1))


def test_script_check_cleans_hashtags_and_trims():
    s = check_script("clock", script(hashtags=["FilingStatus", "#EnrolledAgent", "#Tax Tips!", "#FilingStatus"], hook="x" * 90))
    assert s.hashtags == ["#FilingStatus", "#TaxTips"]
    assert len(s.hook) <= reels.LIMITS["hook"]
    assert s.verdict == ""


def test_myth_or_fact_needs_a_verdict_and_the_rule():
    with pytest.raises(ReelError):
        check_script("mythfact", script(verdict="maybe", reveal="The rule."))
    with pytest.raises(ReelError):
        check_script("mythfact", script(verdict="myth", reveal=""))
    assert check_script("mythfact", script(verdict="myth", reveal="The rule.")).verdict == "MYTH"


def test_caption_ends_with_the_link_line_and_tags():
    c = reels.build_caption(check_script("clock", script()))
    assert c.startswith("Quick one")
    assert "easprint.com" in c and "not affiliated with the IRS" in c
    assert c.rstrip().endswith("#FilingStatus") and "#EnrolledAgent" in c


def test_make_keeps_the_answer_from_the_bank():
    calls = []

    class FakeMessages:
        def parse(self, **kw):
            calls.append(kw)
            return SimpleNamespace(stop_reason="end_turn", parsed_output=script())

    client = SimpleNamespace(beta=SimpleNamespace(messages=FakeMessages()))
    reel = reels.make(client, date(2026, 11, 1), [], "clock")
    assert reel.format == "clock"
    prompt = calls[0]["messages"][0]["content"]
    assert reel.question["answer"] in prompt and reel.question["explanation"][:60] in prompt


def test_countdown_falls_back_when_the_window_is_closed():
    class FakeMessages:
        def parse(self, **kw):
            return SimpleNamespace(stop_reason="end_turn", parsed_output=script())

    client = SimpleNamespace(beta=SimpleNamespace(messages=FakeMessages()))
    assert reels.make(client, date(2027, 3, 20), [], "countdown").format == "clock"
    r = reels.make(client, date(2026, 10, 30), [], "countdown")
    assert r.format == "countdown" and r.days_left == 121


@pytest.mark.parametrize("fmt", FORMATS)
def test_every_format_draws_frames(fmt):
    q = load_bank()[0]
    s = check_script(fmt, script(verdict="FACT" if fmt == "mythfact" else "", reveal="A plain rule from the explanation."))
    plan = reel_render.PLANS[fmt](Reel(fmt, q, s, 100), seed=1)
    base = reel_render.background(1)
    for t in (0.5, 3.0, plan.total / 2, plan.total - 1):
        img = base.copy()
        plan.draw(img, reel_render.ImageDraw.Draw(img), t)
    audio = reel_render.music(plan.total, plan.cues, 1)
    assert audio.shape == (int(reel_render.SR * plan.total), 2) and abs(audio).max() <= 1


class FakeResponse(io.BytesIO):
    def __enter__(self):
        return self

    def __exit__(self, *a):
        return False


def fake_instagram(replies):
    seen = []

    def opener(req, timeout=0):
        seen.append((req.get_method(), req.full_url, req.data))
        reply = replies.pop(0)
        if isinstance(reply, Exception):
            raise reply
        return FakeResponse(json.dumps(reply).encode())

    return opener, seen


def test_publish_waits_for_processing_then_publishes():
    opener, seen = fake_instagram([{"id": "c1"}, {"status_code": "IN_PROGRESS"}, {"status_code": "FINISHED"}, {"id": "m1"}, {"permalink": "https://www.instagram.com/reel/x/"}])
    out = Instagram("tok", "17841", opener).publish_reel("https://v.mp4", "Hello", sleep=lambda s: None)
    assert out == {"id": "m1", "permalink": "https://www.instagram.com/reel/x/"}
    method, url, body = seen[0]
    assert method == "POST" and url.endswith("/17841/media") and b"media_type=REELS" in body and b"access_token=tok" in body
    assert seen[3][1].endswith("/17841/media_publish") and b"creation_id=c1" in seen[3][2]


def test_publish_reports_a_processing_error():
    opener, _ = fake_instagram([{"id": "c1"}, {"status_code": "ERROR", "status": "Video too short"}])
    with pytest.raises(InstagramError, match="Video too short"):
        Instagram("tok", "1", opener).publish_reel("u", "c", sleep=lambda s: None)


def test_graph_errors_carry_instagrams_message():
    err = urllib.error.HTTPError("u", 400, "Bad", {}, io.BytesIO(b'{"error":{"message":"Invalid OAuth access token"}}'))
    opener, _ = fake_instagram([err])
    with pytest.raises(InstagramError, match="Invalid OAuth"):
        Instagram("bad", opener=opener).me()


def test_refresh_uses_the_unversioned_endpoint():
    opener, seen = fake_instagram([{"access_token": "new", "expires_in": 5184000}])
    assert Instagram("old", opener=opener).refresh() == ("new", 5184000)
    assert seen[0][1].startswith("https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token")

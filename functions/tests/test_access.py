import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from access import access_code_ok  # noqa: E402


def test_matching_code_passes():
    assert access_code_ok("sprint-42", "sprint-42")


def test_surrounding_whitespace_is_ignored():
    assert access_code_ok("  sprint-42 \n", "sprint-42")


def test_wrong_or_missing_code_fails():
    assert not access_code_ok("sprint-41", "sprint-42")
    assert not access_code_ok("", "sprint-42")
    assert not access_code_ok(None, "sprint-42")


def test_fails_closed_without_server_code():
    assert not access_code_ok("anything", "")
    assert not access_code_ok("", None)

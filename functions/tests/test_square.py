import base64
import hashlib
import hmac
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from square import payment_details, plan_from_names, signature_ok  # noqa: E402

URL = "https://us-central1-easprint-98625.cloudfunctions.net/square_webhook"


def sign(key, body):
    return base64.b64encode(hmac.new(key.encode(), URL.encode() + body, hashlib.sha256).digest()).decode()


def test_signature_must_match_key_url_and_body():
    body = b'{"type":"payment.updated"}'
    good = sign("secret", body)
    assert signature_ok("secret", URL, body, good)
    assert not signature_ok("other", URL, body, good)
    assert not signature_ok("secret", URL, body + b" ", good)
    assert not signature_ok("secret", URL + "x", body, good)
    assert not signature_ok("secret", URL, body, None)
    assert not signature_ok("", URL, body, good)


def test_plan_comes_from_the_item_name():
    assert plan_from_names(["EA Sprint Pro Max subscription"]) == "promax"
    assert plan_from_names(["EA Sprint Pro Subscription"]) == "pro"
    assert plan_from_names(["Gift card"]) is None


class FakeSquare:
    def __init__(self, order=None, customer=None):
        self._order, self._customer = order or {}, customer or {}

    def order(self, _):
        return self._order

    def customer(self, _):
        return self._customer


def test_payment_details_prefer_buyer_email_then_customer():
    order = {"line_items": [{"name": "EA Sprint Pro Subscription"}], "customer_id": "C1"}
    p = {"order_id": "O1", "buyer_email_address": " Sam@Example.com ", "amount_money": {"amount": 999, "currency": "USD"}}
    d = payment_details(p, FakeSquare(order, {"email_address": "other@example.com"}))
    assert d["plan"] == "pro" and d["email"] == "sam@example.com" and d["amount"] == 999

    d = payment_details({"order_id": "O1"}, FakeSquare(order, {"email_address": "Kim@Example.com"}))
    assert d["email"] == "kim@example.com"

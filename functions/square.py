"""Square webhooks: turn a payment for a plan into a plan change on the right EASprint account.

Square's payment links don't know which EASprint account is paying, so a payment is matched to an
account by the buyer's email address. Anything that can't be matched is saved for the admin, who can
still approve it by hand.
"""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import urllib.request

API = "https://connect.squareup.com/v2"
API_VERSION = "2025-01-23"

# The plan is read from the item name on the Square order, e.g. "EA Sprint Pro Max subscription".
# Pro Max is checked first because "Pro" is part of it.
PLAN_WORDS = (("promax", ("pro max", "promax", "pro-max")), ("pro", ("pro",)))


def signature_ok(signature_key: str, notification_url: str, body: bytes, header: str | None) -> bool:
    """Square signs notification_url + raw body with HMAC-SHA256 and sends it base64 in x-square-hmacsha256-signature."""
    if not signature_key or not header:
        return False
    digest = hmac.new(signature_key.encode(), notification_url.encode() + body, hashlib.sha256).digest()
    return hmac.compare_digest(base64.b64encode(digest).decode(), header.strip())


def plan_from_names(names: list[str]) -> str | None:
    text = " ".join(names).lower()
    for plan, words in PLAN_WORDS:
        if any(w in text for w in words):
            return plan
    return None


class SquareClient:
    """The few Square API reads the webhook needs."""

    def __init__(self, token: str):
        self.token = token

    def _get(self, path: str) -> dict:
        req = urllib.request.Request(
            f"{API}{path}",
            headers={"Authorization": f"Bearer {self.token}", "Square-Version": API_VERSION, "Accept": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read())

    def order(self, order_id: str) -> dict:
        return self._get(f"/orders/{order_id}").get("order", {})

    def customer(self, customer_id: str) -> dict:
        return self._get(f"/customers/{customer_id}").get("customer", {})

    def subscription(self, subscription_id: str) -> dict:
        return self._get(f"/subscriptions/{subscription_id}").get("subscription", {})


def payment_details(payment: dict, square: SquareClient) -> dict:
    """The plan bought and the buyer's email for a completed payment, as far as Square can tell us."""
    names: list[str] = []
    order = {}
    if payment.get("order_id"):
        order = square.order(payment["order_id"])
        names = [li.get("name", "") for li in order.get("line_items", [])]
    email = (payment.get("buyer_email_address") or "").strip().lower()
    customer_id = payment.get("customer_id") or order.get("customer_id")
    if not email and customer_id:
        email = (square.customer(customer_id).get("email_address") or "").strip().lower()
    return {
        "plan": plan_from_names(names),
        "email": email,
        "items": names,
        "amount": (payment.get("amount_money") or {}).get("amount"),
        "currency": (payment.get("amount_money") or {}).get("currency"),
        "orderId": payment.get("order_id", ""),
        "customerId": customer_id or "",
    }

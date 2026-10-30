"""Posting reels to EASprint's Instagram account through the Instagram API with Instagram Login.

Publishing a reel takes three calls: create a REELS container from a public video URL, wait for Instagram
to finish processing it (status_code FINISHED), then publish the container. The access token is a
long-lived Instagram User token (60 days) with instagram_business_basic and
instagram_business_content_publish; refresh() swaps it for a fresh 60-day token.
"""

from __future__ import annotations

import json
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Callable

HOST = "https://graph.instagram.com"
VERSION = "v26.0"
# Meta suggests checking a container about once a minute for up to five minutes; a short reel is usually
# ready well before that, so check more often.
POLL_EVERY_SEC = 15
POLL_FOR_SEC = 300


class InstagramError(RuntimeError):
    pass


class Instagram:
    def __init__(self, token: str, user_id: str = "", opener: Callable | None = None):
        self.token = token
        self.user_id = user_id
        self._open = opener or urllib.request.urlopen

    def _call(self, method: str, path: str, params: dict | None = None, versioned: bool = True) -> dict:
        params = {**(params or {}), "access_token": self.token}
        url = f"{HOST}/{VERSION}/{path}" if versioned else f"{HOST}/{path}"
        data = None
        if method == "GET":
            url += "?" + urllib.parse.urlencode(params)
        else:
            data = urllib.parse.urlencode(params).encode()
        req = urllib.request.Request(url, data=data, method=method)
        try:
            with self._open(req, timeout=60) as resp:
                return json.loads(resp.read() or b"{}")
        except urllib.error.HTTPError as e:
            try:
                message = (json.loads(e.read() or b"{}").get("error") or {}).get("message") or str(e)
            except ValueError:
                message = str(e)
            raise InstagramError(message) from None
        except urllib.error.URLError as e:
            raise InstagramError(f"Couldn't reach Instagram: {e.reason}") from None

    def me(self) -> dict:
        """The account the token belongs to: {'user_id', 'username', 'account_type'}."""
        return self._call("GET", "me", {"fields": "user_id,username,account_type"})

    def refresh(self) -> tuple[str, int]:
        """A new long-lived token and how many seconds it lasts. The current token must be at least a day old."""
        out = self._call("GET", "refresh_access_token", {"grant_type": "ig_refresh_token"}, versioned=False)
        if not out.get("access_token"):
            raise InstagramError("Instagram didn't return a new token.")
        return out["access_token"], int(out.get("expires_in") or 0)

    def publish_reel(self, video_url: str, caption: str, cover_url: str = "", sleep: Callable[[float], None] = time.sleep) -> dict:
        """Posts a reel and returns {'id', 'permalink'}."""
        if not self.user_id:
            raise InstagramError("Connect the Instagram account first.")
        params = {"media_type": "REELS", "video_url": video_url, "caption": caption, "share_to_feed": "true"}
        if cover_url:
            params["cover_url"] = cover_url
        container = self._call("POST", f"{self.user_id}/media", params).get("id")
        if not container:
            raise InstagramError("Instagram didn't accept the video.")
        waited = 0
        while True:
            status = self._call("GET", container, {"fields": "status_code,status"})
            code = status.get("status_code")
            if code == "FINISHED":
                break
            if code in ("ERROR", "EXPIRED"):
                raise InstagramError(f"Instagram couldn't process the video ({status.get('status') or code}).")
            if waited >= POLL_FOR_SEC:
                raise InstagramError("Instagram is still processing the video. Try posting again in a few minutes.")
            sleep(POLL_EVERY_SEC)
            waited += POLL_EVERY_SEC
        media_id = self._call("POST", f"{self.user_id}/media_publish", {"creation_id": container}).get("id")
        if not media_id:
            raise InstagramError("Instagram didn't publish the reel.")
        try:
            permalink = self._call("GET", media_id, {"fields": "permalink"}).get("permalink", "")
        except InstagramError:
            permalink = ""  # posted; the link is a nice-to-have
        return {"id": media_id, "permalink": permalink}

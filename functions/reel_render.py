"""Draws a daily reel frame by frame with Pillow and encodes it to a 1080x1920 MP4 with music.

Everything here runs inside the Cloud Function: Pillow draws the frames, numpy synthesizes the music and
sound effects, and the ffmpeg binary that ships with the imageio-ffmpeg wheel encodes H.264 + AAC, the
format Instagram Reels wants. Nothing needs a browser or a separate container.

Text stays inside SAFE (clear of the Instagram buttons on the right and the caption at the bottom).
"""

from __future__ import annotations

import math
import random
import subprocess
import wave
from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

from reels import FORMAT_NAMES, PART_NAMES, Reel

W, H, FPS = 1080, 1920, 30
SR = 44100
LEFT, RIGHT, TOP, BOTTOM = 80, 960, 250, 1500  # the safe area for text
FONTS = Path(__file__).with_name("assets") / "fonts"

BG = (15, 20, 27)
SURFACE = (25, 33, 43)
LINE = (44, 57, 72)
INK = (238, 242, 246)
MUTED = (150, 166, 182)
ACCENT = (79, 209, 181)
DEEP = (15, 107, 92)
SUN = (255, 204, 77)
BAD = (255, 107, 107)

HOOK = 2.6  # seconds of hook at the start of every reel
END = 3.6  # seconds of end card
SLOGAN = "Find the topics you're weak in. Drill them until they're not."


# ---------- small helpers ----------

def clamp(x: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, x))


def ease_out(x: float) -> float:
    x = clamp(x)
    return 1 - (1 - x) ** 3


def ease_back(x: float) -> float:
    x = clamp(x)
    c = 1.9
    return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2


def mix(a: tuple, b: tuple, t: float) -> tuple:
    t = clamp(t)
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def fade(color: tuple, t: float) -> tuple:
    """A color faded toward the background: t=1 is fully shown, 0 is gone."""
    return mix(BG, color, t)


def window(t: float, start: float, end: float, ramp: float = 0.35) -> float:
    """1 while start <= t < end, easing in and out over `ramp` seconds."""
    if t < start or t >= end:
        return 0.0
    return ease_out(min((t - start) / ramp, (end - t) / ramp, 1.0))


@lru_cache(maxsize=256)
def font(kind: str, size: int) -> ImageFont.FreeTypeFont:
    size = max(8, int(size))
    if kind == "display":
        f = ImageFont.truetype(str(FONTS / "BricolageGrotesque.ttf"), size)
        f.set_variation_by_axes([96, 800, 100])  # optical size, weight, width
    elif kind == "mono":
        f = ImageFont.truetype(str(FONTS / "JetBrainsMono.ttf"), size)
        f.set_variation_by_axes([700])
    elif kind == "bold":
        f = ImageFont.truetype(str(FONTS / "AtkinsonHyperlegible-Bold.ttf"), size)
    else:
        f = ImageFont.truetype(str(FONTS / "AtkinsonHyperlegible-Regular.ttf"), size)
    return f


def text_w(text: str, f: ImageFont.FreeTypeFont) -> float:
    return f.getlength(text)


def wrap(text: str, f: ImageFont.FreeTypeFont, max_w: float) -> list[str]:
    lines: list[str] = []
    for para in text.split("\n"):
        line = ""
        for word in para.split():
            trial = f"{line} {word}".strip()
            if text_w(trial, f) <= max_w or not line:
                line = trial
            else:
                lines.append(line)
                line = word
        lines.append(line)
    return lines


@dataclass
class Block:
    """Wrapped text at the largest size that fits a box."""
    kind: str
    size: int
    lines: list[str]

    @property
    def font(self):
        return font(self.kind, self.size)

    @property
    def line_h(self) -> int:
        return int(self.size * 1.22)

    @property
    def height(self) -> int:
        return self.line_h * len(self.lines)


def fit(text: str, kind: str, max_w: float, max_h: float, start: int, smallest: int = 30) -> Block:
    size = start
    while True:
        lines = wrap(text, font(kind, size), max_w)
        b = Block(kind, size, lines)
        if b.height <= max_h or size <= smallest:
            return b
        size -= 2


def draw_block(d: ImageDraw.ImageDraw, b: Block, cx: float, y: float, fill: tuple, align: str = "center", scale: float = 1.0) -> None:
    f = font(b.kind, b.size * scale) if scale != 1.0 else b.font
    lh = b.line_h * scale
    for i, line in enumerate(b.lines):
        lw = text_w(line, f)
        x = cx - lw / 2 if align == "center" else cx
        d.text((x, y + i * lh), line, font=f, fill=fill)


def sticker(text: str, color: tuple, ink: tuple, size: int, angle: float, outline: bool = False) -> Image.Image:
    """A rotated label, drawn once and pasted each frame."""
    f = font("display", size)
    tw = int(text_w(text, f))
    pad_x, pad_y = int(size * 0.5), int(size * 0.28)
    img = Image.new("RGBA", (tw + pad_x * 2, int(size * 1.25) + pad_y * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if outline:
        d.rounded_rectangle([4, 4, img.width - 5, img.height - 5], radius=size // 4, outline=color + (255,), width=max(6, size // 10))
        d.text((pad_x, pad_y - size * 0.08), text, font=f, fill=color + (255,))
    else:
        d.rounded_rectangle([0, 0, img.width - 1, img.height - 1], radius=size // 3, fill=color + (255,))
        d.text((pad_x, pad_y - size * 0.08), text, font=f, fill=ink + (255,))
    return img.rotate(angle, resample=Image.BICUBIC, expand=True)


def paste(base: Image.Image, img: Image.Image, cx: float, cy: float, scale: float = 1.0, alpha: float = 1.0) -> None:
    if alpha <= 0 or scale <= 0:
        return
    if scale != 1.0:
        img = img.resize((max(1, int(img.width * scale)), max(1, int(img.height * scale))), Image.BILINEAR)
    if alpha < 1.0:
        img = img.copy()
        img.putalpha(img.getchannel("A").point(lambda a: int(a * alpha)))
    base.paste(img, (int(cx - img.width / 2), int(cy - img.height / 2)), img)


# ---------- background, frame chrome and end card ----------

def background(seed: int) -> Image.Image:
    rng = random.Random(seed)
    img = Image.new("RGB", (W, H), BG)
    glow = Image.new("RGB", (W, H), (0, 0, 0))
    g = ImageDraw.Draw(glow)
    for color, r in ((DEEP, 520), (ACCENT, 300), (SUN, 220)):
        x, y = rng.randint(0, W), rng.randint(200, H - 200)
        g.ellipse([x - r, y - r, x + r, y + r], fill=color)
    glow = glow.filter(ImageFilter.GaussianBlur(220))
    img = Image.blend(img, glow, 0.16)
    d = ImageDraw.Draw(img)
    for x in range(0, W, 60):  # a faint dot grid, like ruled paper
        for y in range(0, H, 60):
            d.point((x, y), fill=(32, 41, 52))
    return img


@dataclass
class Floater:
    glyph: str
    x: float
    y: float
    speed: float
    phase: float
    size: int


def floaters(seed: int) -> list[Floater]:
    rng = random.Random(seed + 7)
    return [Floater(rng.choice("$%+=§¢"), rng.uniform(40, W - 40), rng.uniform(0, H), rng.uniform(18, 40), rng.uniform(0, 6.3), rng.randint(40, 90)) for _ in range(12)]


def chrome(d: ImageDraw.ImageDraw, t: float, total: float, label: str, fl: list[Floater]) -> None:
    for f in fl:
        y = (f.y - f.speed * t) % (H + 100) - 50
        x = f.x + 18 * math.sin(f.phase + t * 0.8)
        d.text((x, y), f.glyph, font=font("mono", f.size), fill=(34, 45, 58))
    # Logo and format label along the top.
    d.text((LEFT, 120), "EA", font=font("display", 58), fill=INK)
    d.text((LEFT + text_w("EA", font("display", 58)), 120), "Sprint", font=font("display", 58), fill=ACCENT)
    lf = font("mono", 30)
    lw = text_w(label.upper(), lf)
    d.rounded_rectangle([RIGHT - lw - 36, 126, RIGHT, 182], radius=28, fill=SURFACE, outline=LINE, width=2)
    d.text((RIGHT - lw - 18, 136), label.upper(), font=lf, fill=SUN)
    # Progress through the reel.
    d.rounded_rectangle([LEFT, 214, RIGHT, 222], radius=4, fill=LINE)
    d.rounded_rectangle([LEFT, 214, LEFT + (RIGHT - LEFT) * clamp(t / total), 222], radius=4, fill=ACCENT)


def end_card(img: Image.Image, d: ImageDraw.ImageDraw, t: float, start: float) -> None:
    a = window(t, start, 1e9, 0.4)
    if a <= 0:
        return
    lt = t - start
    logo = font("display", int(150 * (0.9 + 0.1 * ease_back(lt / 0.5))))
    w1, w2 = text_w("EA", logo), text_w("Sprint", logo)
    x = W / 2 - (w1 + w2) / 2
    d.text((x, 640), "EA", font=logo, fill=fade(INK, a))
    d.text((x + w1, 640), "Sprint", font=logo, fill=fade(ACCENT, a))
    s = fit(SLOGAN, "bold", RIGHT - LEFT - 60, 200, 52)
    draw_block(d, s, W / 2, 860, fade(INK, window(t, start + 0.3, 1e9)))
    a2 = window(t, start + 0.6, 1e9)
    pf = font("display", 64)
    pw = text_w("easprint.com", pf)
    bob = 6 * math.sin(lt * 5)
    d.rounded_rectangle([W / 2 - pw / 2 - 50, 1080 + bob, W / 2 + pw / 2 + 50, 1200 + bob], radius=60, fill=fade(ACCENT, a2))
    d.text((W / 2 - pw / 2, 1092 + bob), "easprint.com", font=pf, fill=fade(BG, a2) if a2 > 0.5 else fade(ACCENT, a2))
    note = "Timed practice for all 3 SEE parts · Not affiliated with the IRS"
    nf = font("regular", 30)
    d.text((W / 2 - text_w(note, nf) / 2, 1250), note, font=nf, fill=fade(MUTED, a2))


def confetti(d: ImageDraw.ImageDraw, t: float, start: float, cx: float, cy: float, seed: int) -> None:
    lt = t - start
    if lt < 0 or lt > 2.2:
        return
    rng = random.Random(seed)
    colors = (ACCENT, SUN, INK, BAD, (120, 170, 255))
    for _ in range(90):
        ang = rng.uniform(-math.pi, 0)
        sp = rng.uniform(500, 1400)
        vx, vy = math.cos(ang) * sp, math.sin(ang) * sp
        x, y = cx + vx * lt, cy + vy * lt + 1300 * lt * lt
        rot = rng.uniform(0, 6.3) + lt * rng.uniform(4, 12)
        s = rng.uniform(8, 16)
        pts = [(x + s * math.cos(rot + k * math.pi / 2) * (1 if k % 2 else 0.5), y + s * math.sin(rot + k * math.pi / 2) * (1 if k % 2 else 0.5)) for k in range(4)]
        d.polygon(pts, fill=fade(rng.choice(colors), clamp(2.2 - lt)))


def ring(d: ImageDraw.ImageDraw, cx: float, cy: float, r: float, left: float, of: float, urgent: bool) -> None:
    color = BAD if urgent else ACCENT
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=LINE, width=14)
    if left > 0:
        d.arc([cx - r, cy - r, cx + r, cy + r], start=-90, end=-90 + 360 * left / of, fill=color, width=14)
    n = str(max(0, math.ceil(left)))
    f = font("mono", int(r * 0.95))
    d.text((cx - text_w(n, f) / 2, cy - r * 0.62), n, font=f, fill=INK)


def hook_scene(img: Image.Image, d: ImageDraw.ImageDraw, t: float, hook: Block, tag: Image.Image) -> None:
    a = window(t, 0, HOOK, 0.3)
    if a <= 0:
        return
    pop = 0.8 + 0.2 * ease_back(t / 0.5)
    y = 760 - hook.height / 2 + (1 - ease_out(t / 0.4)) * 80 - max(0.0, t - HOOK + 0.3) * 300
    draw_block(d, hook, W / 2, y, fade(INK, a), scale=pop)
    wob = math.sin(t * 7) * 0.04
    paste(img, tag, W / 2, y - 120, scale=ease_back((t - 0.25) / 0.4) * (1 + wob), alpha=a)


# ---------- the five formats ----------

@dataclass
class Plan:
    total: float
    draw: object
    cues: list[tuple[str, float]] = field(default_factory=list)


def _card(d, box, label, text_block, fill, outline, ink, label_ink):
    x0, y0, x1, y1 = box
    d.rounded_rectangle(box, radius=26, fill=fill, outline=outline, width=4)
    lf = font("mono", 38)
    d.text((x0 + 30, y0 + (y1 - y0) / 2 - 26), label, font=lf, fill=label_ink)
    draw_block(d, text_block, x0 + 100, y0 + (y1 - y0) / 2 - text_block.height / 2, ink, align="left")


def plan_clock(reel: Reel, seed: int) -> Plan:
    q, s = reel.question, reel.script
    ask_at, count_at, reveal_at = HOOK, HOOK + 1.0, HOOK + 11.0
    end_at = reveal_at + 4.6
    total = end_at + END
    letters = "ABCD"
    opts = [fit(c, "bold", RIGHT - LEFT - 140, 110, 40, 28) for c in q["choices"]]
    heights = [max(110, o.height + 44) for o in opts]
    gap = 22
    opt_top = BOTTOM - sum(heights) - gap * 3
    question = fit(s.headline, "bold", RIGHT - LEFT, opt_top - 480, 56, 32)
    why = fit(f"{q['answer']}. {s.why}".strip(), "bold", RIGHT - LEFT, opt_top - 470, 50, 30)
    hook = fit(s.hook, "display", RIGHT - LEFT, 520, 104, 60)
    tag = sticker("10 SECONDS", SUN, BG, 64, 6)
    right = q["choices"].index(q["answer"])

    def draw(img, d, t):
        hook_scene(img, d, t, hook, tag)
        a = window(t, ask_at, end_at)
        if a > 0:
            left = clamp(10 - (t - count_at), 0, 10) if t >= count_at else 10
            urgent = t >= count_at and left <= 3 and t < reveal_at
            pulse = 1 + (0.06 * math.sin(t * 20) if urgent else 0)
            if t < reveal_at:
                ring(d, W / 2, 360, 80 * pulse, left, 10, urgent)
                draw_block(d, question, W / 2, 480 + (opt_top - 480 - question.height) / 2 - 20, fade(INK, a))
            else:
                ra = window(t, reveal_at, end_at)
                sx, sy = W / 2, 360
                d.ellipse([sx - 80, sy - 80, sx + 80, sy + 80], fill=fade(ACCENT, ra))
                d.line([(sx - 38, sy + 2), (sx - 10, sy + 30), (sx + 40, sy - 30)], fill=fade(BG, ra), width=18, joint="curve")
                draw_block(d, why, W / 2, 480 + (opt_top - 480 - why.height) / 2 - 20, fade(INK, ra))
            y = opt_top
            for i, o in enumerate(opts):
                ia = window(t, ask_at + 0.15 * i, end_at)
                slide = (1 - ease_out((t - ask_at - 0.15 * i) / 0.4)) * 200
                box = [LEFT + slide, y, RIGHT + slide, y + heights[i]]
                if ia <= 0:
                    y += heights[i] + gap
                    continue
                if t >= reveal_at and i == right:
                    pop = ease_back((t - reveal_at) / 0.35)
                    grow = 8 * pop
                    box = [box[0] - grow, box[1] - grow, box[2] + grow, box[3] + grow]
                    _card(d, box, letters[i], o, fade(ACCENT, ia), fade(ACCENT, ia), fade(BG, ia), fade(BG, ia))
                elif t >= reveal_at:
                    dim = ia * 0.4
                    _card(d, box, letters[i], o, fade(SURFACE, dim), fade(LINE, dim), fade(MUTED, dim), fade(MUTED, dim))
                else:
                    _card(d, box, letters[i], o, fade(SURFACE, ia), fade(LINE, ia), fade(INK, ia), fade(SUN, ia))
                y += heights[i] + gap
            ry = opt_top + sum(heights[:right]) + gap * right
            confetti(d, t, reveal_at, W / 2, ry, seed)
        end_card(img, d, t, end_at)

    cues = [("whoosh", 0.0), ("whoosh", ask_at)] + [("tick", count_at + k) for k in range(10)] + [("ding", reveal_at), ("whoosh", end_at)]
    return Plan(total, draw, cues)


def plan_mythfact(reel: Reel, seed: int) -> Plan:
    s = reel.script
    show_at, stamp_at = HOOK, HOOK + 4.2
    end_at = stamp_at + 5.6
    total = end_at + END
    hook = fit(s.hook, "display", RIGHT - LEFT, 520, 104, 60)
    tag = sticker("MYTH OR FACT?", SUN, BG, 60, -5)
    statement = fit(f"“{s.headline}”", "bold", RIGHT - LEFT, 520, 66, 36)
    reveal = fit(s.reveal, "bold", RIGHT - LEFT, 430, 50, 30)
    myth = s.verdict == "MYTH"
    stamp = sticker(s.verdict, BAD if myth else ACCENT, BG, 150, -12 if myth else 10, outline=True)

    def draw(img, d, t):
        hook_scene(img, d, t, hook, tag)
        a = window(t, show_at, end_at)
        if a > 0:
            up = ease_out((t - stamp_at) / 0.6) if t >= stamp_at else 0
            shake = 14 * math.sin(t * 90) * clamp(1 - (t - stamp_at) / 0.3) if t >= stamp_at else 0
            top = 360 + (1040 - 360 - statement.height) / 2 * (1 - up) + 20 * (1 - ease_out((t - show_at) / 0.5))
            dim = 1 - 0.35 * up
            mf = font("mono", 34)
            lbl = "MYTH OR FACT?"
            d.text((W / 2 - text_w(lbl, mf) / 2 + shake, top - 80), lbl, font=mf, fill=fade(SUN, a * dim))
            draw_block(d, statement, W / 2 + shake, top, fade(INK, a * dim))
            if t < stamp_at:
                n = math.ceil(stamp_at - t)
                if n <= 3:
                    nf = font("display", 160)
                    d.text((W / 2 - text_w(str(n), nf) / 2, 1150), str(n), font=nf, fill=fade(SUN, a * (1 - ((stamp_at - t) % 1) * 0.5)))
            else:
                slam = 2.4 - 1.4 * ease_out((t - stamp_at) / 0.22)
                paste(img, stamp, W / 2, top + statement.height + 190, scale=slam * 0.85, alpha=a)
                ra = window(t, stamp_at + 0.9, end_at)
                draw_block(d, reveal, W / 2, top + statement.height + 380, fade(INK, ra))
                if not myth:
                    confetti(d, t, stamp_at, W / 2, top + statement.height + 190, seed)
        end_card(img, d, t, end_at)

    cues = [("whoosh", 0.0), ("whoosh", show_at)] + [("tick", stamp_at - k) for k in (3, 2, 1)] + [("stamp", stamp_at), ("whoosh", end_at)]
    return Plan(total, draw, cues)


def plan_whichpart(reel: Reel, seed: int) -> Plan:
    q, s = reel.question, reel.script
    show_at, reveal_at = HOOK, HOOK + 5.2
    end_at = reveal_at + 4.8
    total = end_at + END
    hook = fit(s.hook, "display", RIGHT - LEFT, 520, 104, 60)
    tag = sticker("GUESS THE PART", SUN, BG, 58, 4)
    topic = fit(s.headline, "display", RIGHT - LEFT, 300, 92, 48)
    why = fit(s.why, "bold", RIGHT - LEFT, 220, 44, 28)
    parts = ["part1", "part2", "part3"]
    names = [fit(PART_NAMES[p].split(": ")[1], "bold", RIGHT - LEFT - 200, 90, 48, 30) for p in parts]
    right = parts.index(q["part"])

    def draw(img, d, t):
        hook_scene(img, d, t, hook, tag)
        a = window(t, show_at, end_at)
        if a > 0:
            draw_block(d, topic, W / 2, 330 + (300 - topic.height) / 2, fade(INK, a), scale=0.92 + 0.08 * ease_back((t - show_at) / 0.4))
            for i, nm in enumerate(names):
                ia = window(t, show_at + 0.5 + 0.15 * i, end_at)
                y0 = 720 + i * 170
                if ia <= 0:
                    continue
                slide = (1 - ease_out((t - show_at - 0.5 - 0.15 * i) / 0.4)) * -220
                box = [LEFT + slide, y0, RIGHT + slide, y0 + 140]
                if t >= reveal_at and i == right:
                    g = 8 * ease_back((t - reveal_at) / 0.35)
                    box = [box[0] - g, box[1] - g, box[2] + g, box[3] + g]
                    fill, ink, lab = ACCENT, BG, BG
                elif t >= reveal_at:
                    fill, ink, lab = mix(BG, SURFACE, 0.5), MUTED, MUTED
                else:
                    fill, ink, lab = SURFACE, INK, SUN
                d.rounded_rectangle(box, radius=28, fill=fade(fill, ia), outline=fade(fill if fill != SURFACE else LINE, ia), width=4)
                d.text((box[0] + 34, y0 + 36), f"PART {i + 1}", font=font("mono", 50), fill=fade(lab, ia))
                draw_block(d, nm, box[0] + 330, y0 + 70 - nm.height / 2, fade(ink, ia), align="left")
            if show_at + 1.5 <= t < reveal_at:
                n = math.ceil(reveal_at - t)
                if n <= 3:
                    nf = font("display", 120)
                    d.text((W / 2 - text_w(str(n), nf) / 2, 1250), str(n), font=nf, fill=fade(SUN, a))
            if t >= reveal_at:
                draw_block(d, why, W / 2, 1250, fade(INK, window(t, reveal_at + 0.6, end_at)))
                confetti(d, t, reveal_at, W / 2, 720 + right * 170 + 70, seed)
        end_card(img, d, t, end_at)

    cues = [("whoosh", 0.0), ("whoosh", show_at)] + [("tick", reveal_at - k) for k in (3, 2, 1)] + [("ding", reveal_at), ("whoosh", end_at)]
    return Plan(total, draw, cues)


def plan_term(reel: Reel, seed: int) -> Plan:
    s = reel.script
    term_at, def_at = HOOK, HOOK + 2.6
    end_at = def_at + 7.2
    total = end_at + END
    hook = fit(s.hook, "display", RIGHT - LEFT, 520, 104, 60)
    tag = sticker("WORD UP", SUN, BG, 64, -6)
    term = fit(s.headline, "display", RIGHT - LEFT, 340, 120, 56)
    definition = fit(s.reveal, "bold", RIGHT - LEFT, 420, 54, 32)
    tip = fit(f"Exam tip: {s.why}" if s.why else "", "regular", RIGHT - LEFT - 60, 200, 40, 26)
    chars = sum(len(line) for line in definition.lines)

    def draw(img, d, t):
        hook_scene(img, d, t, hook, tag)
        a = window(t, term_at, end_at)
        if a > 0:
            mf = font("mono", 34)
            lbl = "TAX TERM OF THE DAY"
            d.text((W / 2 - text_w(lbl, mf) / 2, 330), lbl, font=mf, fill=fade(SUN, a))
            ty = 420
            # A highlighter swipe behind the term.
            sweep = ease_out((t - term_at - 0.3) / 0.6)
            for i, line in enumerate(term.lines):
                lw = text_w(line, term.font)
                x0 = W / 2 - lw / 2 - 16
                y0 = ty + i * term.line_h + term.size * 0.55
                d.rectangle([x0, y0, x0 + (lw + 32) * sweep, y0 + term.size * 0.5], fill=fade(DEEP, a))
            draw_block(d, term, W / 2, ty, fade(INK, a), scale=0.9 + 0.1 * ease_back((t - term_at) / 0.4))
            if t >= def_at:
                shown = int(chars * clamp((t - def_at) / 2.6))
                lines, left = [], shown
                for line in definition.lines:
                    lines.append(line[: max(0, left)])
                    left -= len(line)
                dy = ty + term.height + 90
                draw_block(d, Block(definition.kind, definition.size, lines), W / 2, dy, fade(INK, a))
                ta = window(t, def_at + 3.2, end_at)
                if tip.lines and tip.lines[0] and ta > 0:
                    ty2 = dy + definition.height + 70
                    d.rounded_rectangle([LEFT, ty2, RIGHT, ty2 + tip.height + 50], radius=24, fill=fade(SURFACE, ta), outline=fade(SUN, ta), width=3)
                    draw_block(d, tip, W / 2, ty2 + 25, fade(INK, ta))
        end_card(img, d, t, end_at)

    cues = [("whoosh", 0.0), ("pop", term_at), ("whoosh", def_at), ("ding", def_at + 3.2), ("whoosh", end_at)]
    return Plan(total, draw, cues)


def plan_countdown(reel: Reel, seed: int) -> Plan:
    s = reel.script
    days = reel.days_left or 0
    num_at, tip_at = HOOK, HOOK + 4.6
    end_at = tip_at + 5.4
    total = end_at + END
    hook = fit(s.hook, "display", RIGHT - LEFT, 520, 104, 60)
    tag = sticker("TICK TOCK", SUN, BG, 64, 5)
    rally = fit(s.headline, "display", RIGHT - LEFT, 220, 70, 40)
    tip = fit(s.reveal, "bold", RIGHT - LEFT - 60, 360, 48, 30)

    def draw(img, d, t):
        hook_scene(img, d, t, hook, tag)
        a = window(t, num_at, end_at)
        if a > 0:
            n = int(round(days * ease_out((t - num_at) / 1.8)))
            nf = font("mono", 300)
            d.text((W / 2 - text_w(str(n), nf) / 2, 330), str(n), font=nf, fill=fade(ACCENT, a))
            sub = "days left in this testing window"
            sf = font("bold", 46)
            d.text((W / 2 - text_w(sub, sf) / 2, 720), sub, font=sf, fill=fade(MUTED, a))
            draw_block(d, rally, W / 2, 830, fade(INK, window(t, num_at + 1.2, end_at)))
            ta = window(t, tip_at, end_at)
            if ta > 0:
                y0 = 830 + rally.height + 70
                d.rounded_rectangle([LEFT, y0, RIGHT, y0 + tip.height + 120], radius=26, fill=fade(SURFACE, ta), outline=fade(ACCENT, ta), width=3)
                d.text((LEFT + 30, y0 + 22), "TODAY'S TIP", font=font("mono", 32), fill=fade(SUN, ta))
                draw_block(d, tip, W / 2, y0 + 80, fade(INK, ta))
            if num_at + 1.8 <= t < num_at + 4:
                confetti(d, t, num_at + 1.8, W / 2, 500, seed)
        end_card(img, d, t, end_at)

    cues = [("whoosh", 0.0), ("whoosh", num_at), ("ding", num_at + 1.8), ("whoosh", tip_at), ("whoosh", end_at)]
    return Plan(total, draw, cues)


PLANS = {"clock": plan_clock, "mythfact": plan_mythfact, "whichpart": plan_whichpart, "term": plan_term, "countdown": plan_countdown}


# ---------- music and sound effects ----------

def _hz(n: float) -> float:
    return 440 * 2 ** ((n - 69) / 12)


def music(total: float, cues: list[tuple[str, float]], seed: int) -> np.ndarray:
    """A bright loop at a tempo picked per reel, with sound effects on the cues. Stereo float in -1..1."""
    rng = np.random.default_rng(seed)
    n = int(SR * total)
    out = np.zeros((n, 2))

    def add(sig, start, gain=1.0, pan=0.0):
        i = int(start * SR)
        if i >= n:
            return
        j = min(n, i + len(sig))
        s = sig[: j - i] * gain
        out[i:j, 0] += s * (1 - pan)
        out[i:j, 1] += s * (1 + pan)

    def tone(freq, dur, decay, harmonics=((1, 1),)):
        tt = np.arange(int(dur * SR)) / SR
        s = sum(a * np.sin(2 * np.pi * freq * h * tt) for h, a in harmonics)
        return s * np.exp(-tt * decay)

    progs = [[[48, 52, 55, 60], [43, 47, 50, 55], [45, 48, 52, 57], [41, 45, 48, 53]],
             [[50, 53, 57, 62], [46, 50, 53, 58], [48, 52, 55, 60], [45, 49, 52, 57]],
             [[43, 47, 50, 55], [40, 43, 47, 52], [48, 52, 55, 60], [50, 54, 57, 62]]]
    prog = progs[int(rng.integers(len(progs)))]
    key = int(rng.integers(-2, 3))
    beat = 60 / float(rng.choice([112, 118, 124]))
    bar = beat * 4
    t, k = 0.0, 0
    while t < total:
        chord = [c + key for c in prog[k % 4]]
        L = int(bar * SR)
        tt = np.arange(L) / SR
        pad = sum(np.sin(2 * np.pi * _hz(c) * tt) + 0.3 * np.sin(4 * np.pi * _hz(c) * tt) for c in chord) / len(chord)
        pad *= np.minimum(1, tt / 0.15) * np.minimum(1, (bar - tt) / 0.2)
        add(pad, t, 0.07)
        for b in range(4):
            tb = t + b * beat
            kt = np.arange(int(0.3 * SR)) / SR
            add(np.sin(2 * np.pi * np.cumsum(50 + 100 * np.exp(-kt * 30)) / SR) * np.exp(-kt * 10), tb, 0.30)
            hl = int(0.05 * SR)
            add(np.diff(np.concatenate([[0], rng.standard_normal(hl)])) * np.exp(-np.arange(hl) / SR * 80), tb + beat / 2, 0.035, 0.3)
            add(tone(_hz(chord[0] - 12), beat * 0.9, 4, ((1, 1), (2, 0.3))), tb, 0.12)
            for s2 in range(2):
                note = chord[(b * 2 + s2) % 4] + 24
                add(tone(_hz(note), 0.5, 7, ((1, 1), (2, 0.35), (3, 0.12))), tb + s2 * beat / 2, 0.045, -0.3 if s2 else 0.3)
        t += bar
        k += 1

    for kind, at in cues:
        if kind == "tick":
            add(tone(2200, 0.05, 90) + 0.5 * tone(3300, 0.05, 120), at, 0.28)
        elif kind == "ding":
            add(tone(1318, 1.4, 3, ((1, 1), (2.76, 0.25))) + tone(1661, 1.4, 3), at, 0.22)
        elif kind == "pop":
            add(tone(880, 0.15, 25, ((1, 1), (1.5, 0.5))), at, 0.3)
        elif kind == "stamp":
            st = np.arange(int(0.5 * SR)) / SR
            thump = np.sin(2 * np.pi * np.cumsum(40 + 80 * np.exp(-st * 20)) / SR) * np.exp(-st * 7)
            add(thump + 0.4 * rng.standard_normal(len(st)) * np.exp(-st * 25), at, 0.55)
        elif kind == "whoosh":
            wl = int(0.45 * SR)
            noise = np.convolve(rng.standard_normal(wl), np.ones(24) / 24, "same")
            add(noise * np.sin(np.linspace(0, np.pi, wl)) ** 2, max(0.0, at - 0.15), 0.35)

    fade_in = np.minimum(1, np.arange(n) / (0.2 * SR))
    fade_out = np.minimum(1, (n - np.arange(n)) / (1.2 * SR))
    out *= (fade_in * fade_out)[:, None]
    peak = np.max(np.abs(out)) or 1.0
    return out / peak * 0.85


def write_wav(path: Path, audio: np.ndarray) -> None:
    pcm = (np.clip(audio, -1, 1) * 32767).astype("<i2")
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


# ---------- putting it together ----------

def _ffmpeg() -> str:
    import imageio_ffmpeg

    return imageio_ffmpeg.get_ffmpeg_exe()


def render(reel: Reel, out_path: Path, seed: int, cover_path: Path | None = None) -> float:
    """Writes the reel to out_path (and a cover frame to cover_path). Returns its length in seconds."""
    plan = PLANS[reel.format](reel, seed)
    base = background(seed)
    fl = floaters(seed)
    label = FORMAT_NAMES[reel.format]
    wav = out_path.with_suffix(".wav")
    write_wav(wav, music(plan.total, plan.cues, seed))

    cmd = [_ffmpeg(), "-y", "-loglevel", "error",
           "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
           "-i", str(wav),
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-profile:v", "high",
           "-c:a", "aac", "-b:a", "160k", "-ar", str(SR), "-shortest", "-movflags", "+faststart", str(out_path)]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    frames = int(plan.total * FPS)
    cover_at = int((HOOK + 1.2) * FPS)
    try:
        for i in range(frames):
            img = base.copy()
            d = ImageDraw.Draw(img)
            t = i / FPS
            chrome(d, t, plan.total, label, fl)
            plan.draw(img, d, t)
            if cover_path is not None and i == cover_at:
                img.save(cover_path, quality=90)
            proc.stdin.write(img.tobytes())
        proc.stdin.close()
        if proc.wait() != 0:
            raise RuntimeError("ffmpeg could not encode the reel.")
    finally:
        if proc.poll() is None:
            proc.kill()
        wav.unlink(missing_ok=True)
    return plan.total

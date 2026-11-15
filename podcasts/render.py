"""Render a Ledger Falls Unplugged podcast script to MP3 plus a timed transcript.

Usage: python render.py p1d1 [p1d2 ...]   (or "all")

Needs kokoro-onnx, soundfile, numpy, scipy, num2words and ffmpeg, plus the Kokoro v1.0 model files
(kokoro-v1.0.onnx and voices-v1.0.bin from github.com/thewh1teagle/kokoro-onnx releases) in KOKORO_DIR.

Script format, one entry per line:
  # Title of the episode          first line, the podcast title
  MILO: Spoken line.              a cast member speaks (see VOICES)
  [pop]                           a sound cue (see SFX); shown in the transcript as a cue
  (Hoot climbs out of the oven.)  a stage direction: shown in the transcript, not spoken
Text in {shown|spoken} braces is displayed one way and read another, for odd words.
"""

import json
import os
import re
import subprocess
import sys

import numpy as np
import soundfile as sf
from num2words import num2words
from scipy.signal import butter, resample, sosfilt

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPTS = os.path.join(HERE, "scripts")
OUT = os.path.join(HERE, "..", "web", "public", "podcasts")
KOKORO_DIR = os.environ.get("KOKORO_DIR", "/home/user/tts")
SR = 24000

# Voice, speed, language, pitch factor (>1 raises pitch), and an optional effect.
VOICES = {
    "HOOT": ("bm_george", 0.9, "en-gb", 0.94, None),
    "ACE": ("am_michael", 1.0, "en-us", 1.0, None),
    "MILO": ("am_puck", 1.08, "en-us", 1.0, None),
    "PENNY": ("af_heart", 1.04, "en-us", 1.0, None),
    "ROSA": ("bf_isabella", 0.94, "en-gb", 0.96, None),
    "LULU": ("af_sky", 1.08, "en-us", 1.16, None),
    "DEE": ("af_nova", 1.04, "en-us", 1.0, "phone"),
    "REX": ("am_santa", 1.15, "en-us", 1.0, "phone"),
}
NAMES = {"HOOT": "Hoot", "ACE": "Ace", "MILO": "Milo", "PENNY": "Penny", "ROSA": "Rosa", "LULU": "Lulu", "DEE": "Dee", "REX": "Rex"}

ACRONYMS = {
    "EA": "E A", "EAs": "E A's", "IRS": "I R S", "HOH": "H O H", "MFJ": "M F J", "MFS": "M F S", "QSS": "Q S S", "AGI": "A G I", "MAGI": "magi",
    "QBI": "Q B I", "NIIT": "N I I T", "AMT": "A M T", "EITC": "E I T C", "CTC": "C T C", "ACA": "A C A", "HSA": "H S A", "IRA": "I R A", "IRAs": "I R A's",
    "SEP": "sep", "SIMPLE": "simple", "RMD": "R M D", "RMDs": "R M D's", "FBAR": "F-bar", "FinCEN": "fin-sen", "PTIN": "P-tin", "PTINs": "P-tins",
    "EFIN": "E-fin", "ERO": "E R O", "CAF": "caff", "TFRP": "T F R P", "OIC": "O I C", "CNC": "C N C", "TAS": "T A S", "CP2000": "C P two thousand",
    "LLC": "L L C", "LLCs": "L L C's", "EIN": "E I N", "COGS": "cogs", "MACRS": "makers", "NOL": "N O L", "NOLs": "N O L's", "DNI": "D N I", "UBI": "U B I",
    "UBTI": "U B T I", "K-1": "K one", "K-1s": "K ones", "W-2": "W two", "W-2s": "W twos", "W-4": "W four", "W-9": "W nine", "FICA": "fica", "FUTA": "futa",
    "SSN": "S S N", "ITIN": "I tin", "IP": "I P", "PIN": "pin", "AFSP": "A F S P", "CPA": "C P A", "CPAs": "C P A's", "CE": "C E", "LTC": "L T C",
    "AOTC": "A O T C", "LLC's": "L L C's", "PTC": "P T C", "SALT": "salt", "E&P": "E and P", "TV": "T V", "OK": "okay", "PDF": "P D F", "FTC": "F T C",
    "MFJs": "M F J's", "SEE": "S E E", "SEP-IRAs": "sep I R A's", "SEP-IRA": "sep I R A", "EZ": "E Z", "PF": "P F", "SS-4": "S S four", "SS-8": "S S eight", "QSST": "Q S S T", "QSSTs": "Q S S T's", "ESBT": "E S B T", "ESBTs": "E S B T's", "WOTC": "W O T C", "TMT": "T M T", "OBBBA": "the One Big Beautiful Bill Act", "AFS": "A F S", "LCM": "L C M", "BBA": "B B A", "AAA": "triple A", "PSC": "P S C", "PSCs": "P S C's", "DRD": "D R D", "AET": "A E T", "SMLLC": "single-member L L C", "FTE": "F T E", "FTEs": "F T E's", "ALE": "A L E", "VCSP": "V C S P", "GDS": "G D S", "ADS": "A D S", "DB": "D B", "HVAC": "H vac", "SUV": "S U V", "SUVs": "S U V's", "M-1": "M one", "M-2": "M two", "M-3": "M three", "3D": "three D", "ETF": "E T F", "ETFs": "E T F's", "ATIN": "A tin", "ITINs": "I tins", "ISO": "I S O", "ISOs": "I S O's", "QDRO": "quadro", "QDOT": "Q dot", "DSUE": "D sue", "PFIC": "P-fick", "PFICs": "P-ficks", "QEF": "Q E F", "ESA": "E S A", "PCS": "P C S", "IRD": "I R D", "FRV": "F R V", "FTA": "F T A", "LTCG": "L T C G", "REIT": "reet", "PTP": "P T P", "SSTB": "S S T B", "SSTBs": "S S T B's", "UBIA": "U B I A", "HDHP": "H D H P", "SE": "S E", "SS": "S S", "FMV": "F M V", "SEPP": "S E P P", "TIN": "tin", "TINs": "tins", "DIV": "div", "INT": "I N T", "SSA": "S S A", "PM": "P M", "AM": "A M", "NR": "N R", "LP": "L P", "PTP": "P T P", "PO": "P O", "HR": "H R", "US": "U S", "USA": "U S A", "TV": "T V", "RV": "R V", "UK": "U K", "PhD": "P H D", "ID": "I D", "DIY": "D I Y", "ACH": "A C H", "BBQ": "barbecue", "ASAP": "A sap", "FAQ": "F A Q", "LIFO": "life-oh",
    "FIFO": "fife-oh", "PAL": "pal", "PALs": "pals", "UNICAP": "you-nee-cap", "ESOP": "E sop", "ESOPs": "E sops", "SIMPLEs": "simples",
}

MONTHS = "January|February|March|April|May|June|July|August|September|October|November|December"


def form_number(n: str) -> str:
    """Read a form or code number the way people say it: 8615 -> eighty-six fifteen, 706 -> seven oh six."""
    def pair(p: str) -> str:
        if p == "00":
            return "hundred"
        if p[0] == "0":
            return "oh " + num2words(int(p[1]))
        return num2words(int(p))
    digits = re.sub(r"\D", "", n)
    if len(digits) == 4:
        return f"{pair(digits[:2])} {pair(digits[2:])}"
    if len(digits) == 3:
        return f"{num2words(int(digits[0]))} {pair(digits[1:])}"
    return num2words(int(digits))


def speakable(text: str) -> str:
    text = re.sub(r"\{([^|}]*)\|([^}]*)\}", r"\2", text)
    text = re.sub(r"\b3D\b", "three D", text)
    text = re.sub(r"\bSS-(\d)", r"S S \1", text)
    text = re.sub(r"\b(\d{4})s\b", lambda m: form_number(m.group(1)) + "s", text)
    text = re.sub(r"\b1098s\b", "ten ninety-eights", text)
    text = text.replace("—", ", ").replace("–", " to ").replace("&", " and ").replace("…", "...")
    # Forms, schedules, publications, code sections, Circular 230.
    text = re.sub(r"\b([Ff]orms?|[Pp]ublications?|Pub|[Ss]ections?|Circular|Notice|Letter)\s+(\d{3,4})(-[A-Z]+)?\b",
                  lambda m: f"{m.group(1)} {form_number(m.group(2))}{(' ' + ' '.join(m.group(3)[1:])) if m.group(3) else ''}", text)
    text = re.sub(r"\b(1099|1098|1095|1040|1041|1065|1120|8879|8453|2848|8821|2553|1031|8938)(-([A-Z]+))?\b",
                  lambda m: form_number(m.group(1)) + ((" " + " ".join(m.group(3)) if len(m.group(3)) <= 3 else " " + m.group(3).lower()) if m.group(3) else ""), text)
    text = re.sub(r"\b(990|1023|706|709)-([A-Z]{1,3})\b", lambda m: form_number(m.group(1)) + " " + " ".join(m.group(2)), text)
    text = re.sub(r"\b(401|403|457)\(([a-z])\)", lambda m: f"{form_number(m.group(1))} {m.group(2)}", text)
    text = re.sub(r"\b(\d{3})\(([a-z])\)\((\d)\)", lambda m: f"{form_number(m.group(1))} {m.group(2)} {num2words(int(m.group(3)))}", text)
    text = re.sub(r"\b(\d{3})\(([a-z])\)", lambda m: f"{form_number(m.group(1))} {m.group(2)}", text)
    text = re.sub(r"\b(\d{1,2}):(\d\d)\s?(AM|PM)\b", lambda m: f"{num2words(int(m.group(1)))} {'' if m.group(2) == '00' else ('oh ' + num2words(int(m.group(2)[1]))) if m.group(2)[0] == '0' else num2words(int(m.group(2)))} {' '.join(m.group(3))}", text)
    text = re.sub(r"\bW-(\d+)([A-Z]?)\b", lambda m: f"W {num2words(int(m.group(1)))} {m.group(2)}".strip(), text)
    text = re.sub(r"\bCP(\d+)\b", lambda m: f"C P {form_number(m.group(1)) if len(m.group(1)) > 2 else num2words(int(m.group(1)))}", text)
    text = re.sub(r"\b(\d{4})([A-Z])\b", lambda m: f"{form_number(m.group(1))} {m.group(2)}", text)
    text = re.sub(r"\bPart (I|II|III|IV)\b", lambda m: "Part " + {"I": "one", "II": "two", "III": "three", "IV": "four"}[m.group(1)], text)
    # Dates: April 15 -> April fifteenth.
    text = re.sub(rf"\b({MONTHS}) (\d{{1,2}})\b", lambda m: f"{m.group(1)} {num2words(int(m.group(2)), to='ordinal')}", text)
    # Years.
    text = re.sub(r"\b(19|20)(\d\d)\b", lambda m: f"{num2words(int(m.group(1)))} {'hundred' if m.group(2) == '00' else ('oh ' + num2words(int(m.group(2)[1]))) if m.group(2)[0] == '0' else num2words(int(m.group(2)))}", text)
    # Money.
    def money(m):
        whole = int(m.group(1).replace(",", ""))
        cents = m.group(2)
        scale = m.group(3)
        if scale:
            return f"{num2words(float(m.group(1).replace(',', '') + (('.' + cents) if cents else '')))} {scale} dollars"
        s = f"{num2words(whole)} dollar{'s' if whole != 1 else ''}"
        if cents and int(cents):
            s += f" and {num2words(int(cents))} cents"
        return s
    text = re.sub(r"\$([\d,]+)(?:\.(\d+))?(?:\s(million|billion|thousand))?", money, text)
    text = re.sub(r"(\d+(?:\.\d+)?)%", lambda m: f"{num2words(float(m.group(1)) if '.' in m.group(1) else int(m.group(1)))} percent", text)
    text = re.sub(r"(\d+)(st|nd|rd|th)\b", lambda m: num2words(int(m.group(1)), to="ordinal"), text)
    text = re.sub(r"\b\d[\d,]*(?:\.\d+)?\b", lambda m: num2words(float(m.group(0).replace(",", "")) if "." in m.group(0) else int(m.group(0).replace(",", ""))), text)
    text = re.sub(r"\b[A-Za-z][A-Za-z0-9&'-]*\b", lambda m: ACRONYMS.get(m.group(0), m.group(0)), text)
    # Shouted words read as words, not letters.
    text = re.sub(r"\b[A-Z]{3,}\b", lambda m: m.group(0).lower(), text)
    text = re.sub(r"\b(NO|IS|OR|UP|IT|IN|ON|DO|TO|BE|GO|SO|WE|ME|MY|OF|AT|IF|AN)\b", lambda m: m.group(0).lower(), text)
    return text


# ---------------------------------------------------------------- sound effects
def env(n, attack=0.005, release=0.1):
    t = np.arange(n) / SR
    e = np.minimum(1, t / attack) * np.exp(-t / release)
    return e


def tone(freq, dur, kind="sine", release=0.3, vol=0.3):
    n = int(dur * SR)
    t = np.arange(n) / SR
    if kind == "square":
        w = np.sign(np.sin(2 * np.pi * freq * t))
    else:
        w = np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(4 * np.pi * freq * t) + 0.1 * np.sin(6 * np.pi * freq * t)
    return vol * w * env(n, release=release)


def seq(parts):
    return np.concatenate(parts)


def theme():
    """A short, bouncy marimba-ish jingle."""
    notes = [(523, .16), (659, .16), (784, .16), (1047, .32), (0, .08), (880, .16), (1047, .16), (1319, .5)]
    out = []
    for f, d in notes:
        out.append(np.zeros(int(d * SR)) if f == 0 else tone(f, d, release=0.18, vol=0.28))
    mel = seq(out)
    n = len(mel)
    t = np.arange(n) / SR
    bass = 0.18 * np.sin(2 * np.pi * 130.8 * t) * env(n, release=0.9)
    return mel + bass


def pop():
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    f = 300 + 1500 * t / 0.25
    return 0.4 * np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, release=0.06) + 0.15 * np.random.randn(n) * env(n, release=0.01)


def ding():
    return tone(1568, 0.9, release=0.35, vol=0.3) + tone(2093, 0.9, release=0.25, vol=0.15)


def buzzer():
    return tone(110, 0.6, "square", release=0.5, vol=0.18)


def stamp():
    n = int(0.3 * SR)
    t = np.arange(n) / SR
    return 0.6 * np.sin(2 * np.pi * 70 * t) * env(n, release=0.06) + 0.3 * np.random.randn(n) * env(n, release=0.015)


def drumroll():
    n = int(1.4 * SR)
    t = np.arange(n) / SR
    roll = np.random.randn(n) * (0.5 + 0.5 * np.sin(2 * np.pi * 18 * t)) * np.minimum(1, t / 1.2) * 0.12
    return np.concatenate([roll, 0.5 * np.random.randn(int(0.2 * SR)) * env(int(0.2 * SR), release=0.05) + tone(196, 0.2, vol=0.3)])


def crash():
    n = int(1.0 * SR)
    noise = np.random.randn(n) * env(n, attack=0.002, release=0.25) * 0.35
    clank = sum(tone(f, 1.0, release=0.2, vol=0.08) for f in (410, 667, 913, 1290))
    return noise + clank


def glitch():
    n = int(0.5 * SR)
    g = np.random.randn(n) * 0.15
    g *= (np.random.rand(n // 600 + 1).repeat(600)[:n] > 0.5)
    return g


def rimshot():
    return seq([stamp() * 0.6, np.zeros(int(0.1 * SR)), (np.random.randn(int(0.35 * SR)) * env(int(0.35 * SR), release=0.12) * 0.25)])


def oven():
    return seq([tone(880, 0.25, release=0.2, vol=0.25), np.zeros(int(0.05 * SR)), tone(880, 0.25, release=0.2, vol=0.25), np.zeros(int(0.05 * SR)), tone(880, 0.4, release=0.3, vol=0.25)])


SFX = {"theme": theme, "pop": pop, "ding": ding, "buzzer": buzzer, "stamp": stamp, "drumroll": drumroll, "crash": crash, "glitch": glitch, "rimshot": rimshot, "timer": oven}
SFX_LABEL = {"theme": "Theme music", "pop": "Pop! Hoot appears", "ding": "Ding!", "buzzer": "Wrong-answer buzzer", "stamp": "Hoot stamps something", "drumroll": "Drumroll",
             "crash": "Crash", "glitch": "The video call glitches", "rimshot": "Ba-dum-tss", "timer": "Oven timer", "bark": "Biscuit barks"}


# ---------------------------------------------------------------- voices
def phone(x):
    sos = butter(4, [300, 3400], btype="band", fs=SR, output="sos")
    y = sosfilt(sos, x) * 1.6
    return np.tanh(y * 1.5) / 1.5


def pitch(x, factor):
    """Raise the pitch by `factor` by resampling; the speaker was rendered slower to keep the timing."""
    if abs(factor - 1) < 0.005:
        return x
    return resample(x, int(len(x) / factor))


def main(ids):
    from kokoro_onnx import Kokoro

    k = Kokoro(os.path.join(KOKORO_DIR, "kokoro-v1.0.onnx"), os.path.join(KOKORO_DIR, "voices-v1.0.bin"))
    os.makedirs(OUT, exist_ok=True)

    def bark():
        s, _ = k.create("Rarf! Rarf!", voice="am_fenrir", speed=1.2, lang="en-us")
        return pitch(s, 1.5) * 0.9

    for pid in ids:
        np.random.seed(7)
        lines = [l.rstrip() for l in open(os.path.join(SCRIPTS, f"{pid}.txt"), encoding="utf-8")]
        title = lines[0].lstrip("# ").strip()
        audio = [np.zeros(int(0.3 * SR))]
        pos = 0.3
        transcript = []
        words = 0
        for raw in lines[1:]:
            line = raw.strip()
            if not line:
                continue
            m = re.match(r"^\[(\w+)\]$", line)
            if m:
                cue = m.group(1)
                clip = bark() if cue == "bark" else SFX[cue]()
                transcript.append({"t": round(pos, 2), "cue": SFX_LABEL[cue]})
                audio.append(clip)
                audio.append(np.zeros(int(0.15 * SR)))
                pos += (len(clip) / SR) + 0.15
                continue
            if line.startswith("("):
                transcript.append({"t": round(pos, 2), "stage": line.strip("()")})
                continue
            m = re.match(r"^([A-Z+]+):\s*(.+)$", line)
            if not m:
                raise SystemExit(f"{pid}: can't read line: {line}")
            whos, text = m.group(1).split("+"), m.group(2)
            shown = re.sub(r"\{([^|}]*)\|([^}]*)\}", r"\1", text)
            words += len(shown.split())
            spoken = speakable(text)
            takes = []
            for who in whos:
                voice, speed, lang, pf, fx = VOICES[who]
                s, sr = k.create(spoken, voice=voice, speed=speed / pf, lang=lang)
                s = pitch(s, pf)
                if fx == "phone":
                    s = phone(s)
                takes.append(s)
            s = np.zeros(max(len(t) for t in takes))
            for t in takes:
                s[: len(t)] += t / (len(takes) ** 0.5)
            names = [NAMES[w] for w in whos]
            transcript.append({"t": round(pos, 2), "who": " and ".join([", ".join(names[:-1]), names[-1]]) if len(names) > 1 else names[0], "text": shown})
            gap = 0.22 if shown.endswith(("!", "?")) else 0.3
            audio.append(s)
            audio.append(np.zeros(int(gap * SR)))
            pos += len(s) / SR + gap
        audio.append(np.zeros(int(0.5 * SR)))
        mix = np.concatenate(audio).astype(np.float32)
        mix = mix / max(1e-6, np.max(np.abs(mix))) * 0.9
        wav = os.path.join(KOKORO_DIR, f"{pid}.wav")
        sf.write(wav, mix, SR)
        mp3 = os.path.join(OUT, f"{pid}.mp3")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ac", "1", "-ar", "24000", "-b:a", "48k", "-metadata", f"title={title}",
                        "-metadata", "artist=Ledger Falls Unplugged (EASprint)", mp3], check=True)
        dur = len(mix) / SR
        with open(os.path.join(OUT, f"{pid}.json"), "w", encoding="utf-8") as f:
            json.dump({"id": pid, "title": title, "seconds": round(dur), "lines": transcript}, f, ensure_ascii=False, indent=0)
        print(f"{pid}: {title} — {dur / 60:.1f} min, {words} words")


if __name__ == "__main__":
    args = sys.argv[1:]
    if args == ["all"]:
        args = sorted(f[:-4] for f in os.listdir(SCRIPTS) if f.endswith(".txt"))
    main(args)

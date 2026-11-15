# Ledger Falls Unplugged (Study podcasts)

One podcast per Study unit (13 in all): the Ledger Falls cast talks through the unit's rules. Each script is written
from the facts in that unit's lessons (`web/src/study/lessons/*.tsx`), which cite IRS publications and instructions.
Tax years follow the seasons: Seasons 1 and 2 use 2025 law, Season 3 uses rules in effect for 2026.

- `scripts/<domainId>.txt`: the scripts. `SPEAKER: line`, `[cue]` for a sound effect, `(stage direction)` for the
  transcript only. `MILO+PENNY:` makes both speak at once. See the top of `render.py`.
- `render.py`: renders a script to `web/public/podcasts/<domainId>.mp3` and the timed transcript
  `web/public/podcasts/<domainId>.json` with the open Kokoro TTS model (one voice per character, see `VOICES`).
- `check.py`: lists words in a script that might be read oddly (digits, acronyms), so they can be added to
  `speakable()` or `ACRONYMS` in `render.py`.

Setup (any machine with Python 3.10+ and ffmpeg):

```
python -m venv venv && venv/bin/pip install kokoro-onnx soundfile num2words scipy
curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
KOKORO_DIR=$PWD venv/bin/python podcasts/render.py p1d1      # or: all
```

After a re-render, update `minutes` in `web/src/study/podcasts.ts` (the tests check it against the transcript).
Access follows the unit: free accounts play Season 1, Unit 1 (`p1d1`); Pro and Pro Max play every unit. Like the
lessons, this is a UI gate: the files are served by Firebase Hosting.

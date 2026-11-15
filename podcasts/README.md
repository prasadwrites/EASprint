# Study podcasts: Ledger Falls Unplugged and The Hot Seat

Two podcasts per Study unit (26 in all), both with the Ledger Falls cast:

- **Ledger Falls Unplugged** (`scripts/<domainId>.txt`): the cast talks through the unit's rules.
- **The Hot Seat** (`scripts/<domainId>-hotseat.txt`): a quiz show. Ace and Hoot ask exam-style questions, someone
  else in the cast answers (sometimes right, sometimes wrong), then Ace and Hoot explain the rule and give a memory
  trick or exam tip. Street and game-show sound effects (cars, horns, a question sting, applause) keep it lively.

Each script is written from the facts in that unit's lessons (`web/src/study/lessons/*.tsx`), which cite IRS
publications and instructions. Tax years follow the seasons: Seasons 1 and 2 use 2025 law, Season 3 uses rules in
effect for 2026.

- `scripts/<id>.txt`: the scripts. `SPEAKER: line`, `[cue]` for a sound effect, `(stage direction)` for the
  transcript only. `MILO+PENNY:` makes both speak at once. In The Hot Seat, `[q]` is the numbered question sting, and
  lines starting "Memory trick:", "Exam tip:" or "Trap alert:" are highlighted in the transcript. See the top of
  `render.py`.
- `render.py`: renders a script to `web/public/podcasts/<domainId>.mp3` and the timed transcript
  `web/public/podcasts/<domainId>.json` with the open Kokoro TTS model (one voice per character, see `VOICES`).
- `check.py`: lists words in a script that might be read oddly (digits, acronyms), so they can be added to
  `speakable()` or `ACRONYMS` in `render.py`.

Setup (any machine with Python 3.10+ and ffmpeg):

```
python -m venv venv && venv/bin/pip install kokoro-onnx soundfile num2words scipy
curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
KOKORO_DIR=$PWD venv/bin/python podcasts/render.py p1d1-hotseat      # or: all, unplugged, hotseat
```

After a re-render, update `minutes` in `web/src/study/podcasts.ts` (the tests check it against the transcript).
Access follows the unit: free accounts play both Season 1, Unit 1 podcasts (`p1d1`, `p1d1-hotseat`); Pro and Pro
Max play every unit. Like the
lessons, this is a UI gate: the files are served by Firebase Hosting.

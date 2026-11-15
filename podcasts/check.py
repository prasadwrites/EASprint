"""List words in scripts that may be read oddly: leftover digits and all-caps tokens."""
import re, sys, os
from render import speakable, SCRIPTS
for f in sys.argv[1:]:
    for line in open(os.path.join(SCRIPTS, f + ".txt"), encoding="utf-8"):
        m = re.match(r"^([A-Z+]+):\s*(.+)$", line.strip())
        if not m: continue
        sp = speakable(m.group(2))
        bad = re.findall(r"\b(?:\w*\d\w*|[A-Z]{2,}\w*)\b", sp)
        bad = [b for b in bad if b not in ("HOLD", "NO", "NOT", "AND", "IS", "ALL", "BEFORE", "ARE", "NOW", "OR", "HANG", "UP", "WRONG", "YES")]
        if bad: print(f, bad, "|", sp[:120])

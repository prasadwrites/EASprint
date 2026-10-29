import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAccount } from "../App";
import TopBar, { Icon } from "../components/TopBar";
import { PARTS } from "../data/exam";
import { limitsFor } from "../lib/account";
import { generateDeck } from "../lib/decks";
import type { PartId } from "../lib/types";

const CODE_KEY = "eas.accessCode";
const DIFFICULTIES = ["Easy", "Medium", "Hard", "Mixed"];

function storedCode() {
  try {
    return localStorage.getItem(CODE_KEY) ?? "";
  } catch {
    return "";
  }
}

function storeCode(code: string | null) {
  try {
    if (code) localStorage.setItem(CODE_KEY, code);
    else localStorage.removeItem(CODE_KEY);
  } catch {
    /* storage unavailable */
  }
}

export default function CreateDeck() {
  const navigate = useNavigate();
  const { account, admin } = useAccount();
  const limits = limitsFor(account, admin);
  const used = account?.decksCreated ?? 0;
  const atLimit = !admin && used >= limits.maxDecks;
  const [params] = useSearchParams();
  const [topic, setTopic] = useState(params.get("topic") ?? "");
  const [asked, setAsked] = useState(!!params.get("topic"));
  const [part, setPart] = useState<PartId>((params.get("part") as PartId) || "part1");
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState("Mixed");
  const [notes, setNotes] = useState(params.get("notes") ?? "");
  const [accessCode, setAccessCode] = useState(storedCode);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setBusy(true);
    setError("");
    try {
      const deckId = await generateDeck({ topic, part, count, difficulty, notes, accessCode: accessCode.trim() });
      if (!admin) storeCode(accessCode.trim());
      navigate(`/decks/${deckId}?fresh=1`);
    } catch (e) {
      if ((e as { code?: string }).code === "functions/permission-denied") storeCode(null);
      setError((e as Error).message || "The deck couldn't be generated. Try again.");
      setBusy(false);
    }
  };

  const clamp = (n: number) => Math.max(3, Math.min(limits.maxQuestions, n || 3));

  return (
    <>
      <TopBar back={{ to: "/", label: "Home" }} />
      <main className="page">
        <div className="stack" style={{ gap: 6 }}>
          <h1>Build a practice deck with Claude</h1>
          <p className="muted">
            {admin ? "Admin: no deck limit" : `${limits.name} plan: ${used} of ${limits.maxDecks} decks used`}, up to {limits.maxQuestions} questions per deck.
          </p>
        </div>
        {atLimit && (
          <div className="verdict warn">
            <h3>You've used all {limits.maxDecks} decks on your plan</h3>
            <p>
              <Link to="/upgrade">Upgrade to Pro or Pro Max</Link> to build more. You can keep practicing <Link to="/#decks">the decks you have</Link>.
            </p>
          </div>
        )}
        <div className="two-col">
          <div className="main stack">
            <div className="panel chat">
              <div className="bubble bot">What would you like to practice for the EA exam?</div>
              {asked ? (
                <>
                  <div className="bubble me">{topic}</div>
                  <div className="bubble bot">Good choice. A few quick details and I'll write it.</div>
                </>
              ) : (
                <form
                  className="row"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (topic.trim()) setAsked(true);
                  }}
                >
                  <input
                    id="topic"
                    type="text"
                    autoFocus
                    placeholder="e.g. Depreciation recapture on business property"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{ flex: 1, minWidth: 0 }}
                  />
                  <button className="btn-primary" type="submit">
                    Next
                  </button>
                </form>
              )}
            </div>

            {asked && (
              <form
                className="panel stack"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <div>
                  <label>Exam part</label>
                  <div className="seg">
                    {PARTS.map((p) => (
                      <button key={p.id} type="button" aria-pressed={part === p.id} onClick={() => setPart(p.id)}>
                        {p.short}: {p.title.split(": ")[1].split(",")[0]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid2">
                  <div>
                    <label htmlFor="count">How many questions?</label>
                    <div className="stepper">
                      <button type="button" aria-label="Fewer questions" onClick={() => setCount(clamp(count - 1))}>
                        −
                      </button>
                      <input id="count" type="number" min={3} max={limits.maxQuestions} value={count} onChange={(e) => setCount(Number(e.target.value))} onBlur={() => setCount(clamp(count))} />
                      <button type="button" aria-label="More questions" onClick={() => setCount(clamp(count + 1))}>
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label>Difficulty</label>
                    <div className="seg">
                      {DIFFICULTIES.map((d) => (
                        <button key={d} type="button" aria-pressed={difficulty === d} onClick={() => setDifficulty(d)}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="notes">
                    Anything else? <span className="muted">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Include a few calculation questions and at least two on the related-party rules."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                {!admin && (
                <div>
                  <label htmlFor="access">Access code</label>
                  <input
                    id="access"
                    type="password"
                    autoComplete="off"
                    required={!admin}
                    placeholder="Ask the person who runs EASprint"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    style={{ maxWidth: 320 }}
                  />
                  <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
                    Building decks uses AI credit, so it needs the code you were given. This browser remembers it after the first deck.
                  </p>
                </div>
                )}
                <div className="row">
                  <button className="btn btn-primary btn-big" type="submit" disabled={busy || atLimit}>
                    <Icon name="play" /> {busy ? "Generating…" : "Generate deck"}
                  </button>
                  {busy ? (
                    <span className="muted">
                      <span className="spinner" /> Starting… you'll see progress on the deck page
                    </span>
                  ) : (
                    <button type="button" className="btn-link" onClick={() => setAsked(false)}>
                      Change topic
                    </button>
                  )}
                </div>
                {error && <p className="error">{error}</p>}
              </form>
            )}
          </div>

          <aside className="side panel stack" aria-live="polite">
            <h2>Every question gets checked</h2>
            <p className="muted">
              Claude writes questions to tax law through December 31, 2025, with an explanation and an IRS source for each. A separate Claude check then answers each
              question without seeing the key, and anything it disagrees with, or that cites a page that doesn't exist, is rewritten or left out.
            </p>
            {busy && (
              <div className="verdict warn">
                <h3>Running in the background</h3>
                <p>Building a deck takes a few minutes, longer for big decks. You can leave the page while it runs.</p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}

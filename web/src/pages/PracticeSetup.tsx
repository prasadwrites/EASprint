import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUser } from "../App";
import TopBar, { Icon } from "../components/TopBar";
import { getDeck, getQuestions } from "../data";
import { EXAM } from "../data/exam";
import { listSessions, startSession } from "../lib/db";
import { missedLastTime, practicedIds, selectQuestions, type Selection } from "../lib/insights";
import { formatClock } from "../lib/pace";
import type { Mode, PracticeSession } from "../lib/types";

const MODES: [Mode, string, string][] = [
  ["learn", "Learn", "No clock. Take your time and read every explanation."],
  ["practice", "Practice", "Your own time limit, with pace feedback as you go."],
  ["exam", "Exam pace", `${formatClock(EXAM.secondsPerQuestion)} per question, the same as the real exam.`],
];

export default function PracticeSetup() {
  const user = useUser();
  const navigate = useNavigate();
  const { deckId = "" } = useParams();
  const [params] = useSearchParams();
  const deck = getDeck(deckId);
  const [history, setHistory] = useState<PracticeSession[] | null>(null);
  const [mode, setMode] = useState<Mode>("practice");
  const [n, setN] = useState(10);
  const [minutes, setMinutes] = useState(20);
  const [selection, setSelection] = useState<Selection>((params.get("select") as Selection) || "random");
  const [domains, setDomains] = useState<string[]>(params.get("domain") ? [params.get("domain")!] : []);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    listSessions(user.uid, deckId).then((hs) => {
      setHistory(hs);
      const preset = params.get("select") === "missed" ? missedLastTime(hs).length : 0;
      if (preset) {
        setN(preset);
        setMinutes(Math.max(1, Math.round(preset * 2)));
      }
    });
  }, [deckId, user.uid, params]);

  if (!deck || !history) {
    return (
      <>
        <TopBar back={{ to: "/#parts", label: "Exam parts" }} />
        <main className="page">{deck ? <span className="spinner" /> : <p>That exam part doesn't exist.</p>}</main>
      </>
    );
  }

  const questions = getQuestions(deckId).filter((q) => !domains.length || domains.includes(q.domain));
  const allIds = questions.map((q) => q.id);
  const seen = practicedIds(history);
  const missed = new Set(missedLastTime(history));
  const available: Record<Selection, number> = {
    first: allIds.length,
    random: allIds.length,
    unpracticed: allIds.filter((id) => !seen.has(id)).length,
    missed: allIds.filter((id) => missed.has(id)).length,
  };
  const pool = available[selection];
  const count = Math.max(1, Math.min(pool || 1, n || 1));
  const timeLimitSec = mode === "learn" ? 0 : mode === "exam" ? count * EXAM.secondsPerQuestion : Math.round(Math.max(0.5, minutes || 1) * 60);
  const perQ = timeLimitSec / count;

  const toggleDomain = (id: string) => setDomains(domains.includes(id) ? domains.filter((d) => d !== id) : [...domains, id]);

  const start = async () => {
    setStarting(true);
    const sessionId = await startSession({
      uid: user.uid,
      deck,
      mode,
      questionIds: selectQuestions(allIds, selection, count, history),
      timeLimitSec,
    });
    navigate(`/sessions/${sessionId}`, { replace: true });
  };

  const options: [Selection, string][] = [
    ["random", `Random ${count}`],
    ["first", `First ${count}, in exam outline order`],
    ["unpracticed", "Ones I haven't practiced"],
    ["missed", "Ones I got wrong last time"],
  ];

  return (
    <>
      <TopBar back={{ to: `/decks/${deck.id}`, label: deck.short }} />
      <main className="page narrow">
        <div>
          <div className="eyebrow">{deck.title}</div>
          <h1>Set up your practice</h1>
        </div>
        <form
          className="stack layout-gap"
          onSubmit={(e) => {
            e.preventDefault();
            start();
          }}
        >
          <fieldset className="stack" style={{ border: "none", padding: 0, margin: 0, gap: 10 }}>
            <legend className="eyebrow" style={{ marginBottom: 10 }}>Mode</legend>
            <div className="modes">
              {MODES.map(([m, name, desc]) => (
                <label key={m} className="mode">
                  <span className="name">
                    <input type="radio" name="mode" value={m} checked={mode === m} onChange={() => setMode(m)} />
                    {name}
                  </span>
                  <span className="desc">{desc}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="panel stack" style={{ margin: 0, gap: 10 }}>
            <legend className="sr-only">Exam domains</legend>
            <h2>Exam domains</h2>
            <div className="pills">
              <button type="button" aria-pressed={!domains.length} onClick={() => setDomains([])}>
                All domains
              </button>
              {deck.domains.map((d) => (
                <button key={d.id} type="button" aria-pressed={domains.includes(d.id)} onClick={() => toggleDomain(d.id)}>
                  {d.name}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="panel stack">
            <div className="grid2">
              <div>
                <label htmlFor="n">Number of questions</label>
                <input id="n" type="number" min={1} max={pool || 1} value={n} onChange={(e) => setN(Number(e.target.value))} />
                <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
                  {questions.length} available{domains.length ? " in the domains you picked" : " in this part"}
                </p>
              </div>
              {mode === "practice" && (
                <div>
                  <label htmlFor="minutes">Time available (minutes)</label>
                  <input id="minutes" type="number" min={0.5} max={240} step={0.5} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
                  <div className="quick" style={{ marginTop: 8 }} aria-label="Quick picks">
                    {[10, 20, 30, 60].map((m) => (
                      <button key={m} type="button" aria-pressed={minutes === m} onClick={() => setMinutes(m)}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {mode !== "learn" ? (
              <div className="target-box">
                <Icon name="clock" size={22} />
                <span>
                  Target pace: <b className="mono" style={{ fontSize: 20 }}>{formatClock(perQ)}</b> per question
                </span>
                <span className="muted" style={{ fontSize: 14 }}>
                  {mode === "exam" ? `${formatClock(timeLimitSec)} in total.` : "You'll see whether you're ahead or behind this as you go."}
                </span>
              </div>
            ) : (
              <p className="muted">No clock in Learn mode. Your time per question is still recorded so you can see where you slowed down.</p>
            )}
          </div>

          <fieldset className="panel stack" style={{ margin: 0, gap: 4 }}>
            <legend className="sr-only">Which questions</legend>
            <h2 style={{ marginBottom: 8 }}>Which questions</h2>
            {options.map(([v, label]) => (
              <label key={v} className="radio">
                <input type="radio" name="selection" value={v} checked={selection === v} disabled={!available[v]} onChange={() => setSelection(v)} />
                {label}
                {(v === "unpracticed" || v === "missed") && <span className="count">({available[v]})</span>}
              </label>
            ))}
          </fieldset>

          <div>
            <button className="btn btn-primary btn-big" type="submit" disabled={starting || !pool}>
              <Icon name="play" /> {starting ? "Starting…" : "Start practice"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

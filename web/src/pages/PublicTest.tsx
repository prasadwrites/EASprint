import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Explanation from "../components/Explanation";
import { Brand, Chip, Icon } from "../components/TopBar";
import { domainName } from "../data";
import { EXAM } from "../data/exam";
import { isCorrect } from "../lib/grading";
import { formatClock } from "../lib/pace";
import { canSharePublicly, loadPublicTest, reportFinished, type PublicTest as Test } from "../lib/publicTests";

const LETTERS = ["A", "B", "C", "D"];

/** One attempt, kept in this browser so a refresh doesn't lose it. Indexes point into the test's questions. */
interface Attempt {
  order: number[];
  answers: Record<number, string>;
  current: number;
  startedAt: number;
  /** 0 means no clock. */
  limitSec: number;
  finishedAt?: number;
  endedBy?: "finished" | "timeout" | "quit";
}

const storageKey = (token: string) => `eas.public.${token}`;

function readAttempt(token: string): Attempt | null {
  try {
    return JSON.parse(localStorage.getItem(storageKey(token)) || "null");
  } catch {
    return null;
  }
}

function writeAttempt(token: string, a: Attempt | null) {
  try {
    if (a) localStorage.setItem(storageKey(token), JSON.stringify(a));
    else localStorage.removeItem(storageKey(token));
  } catch {
    /* storage blocked: the attempt still works until the tab closes */
  }
}

function pick(total: number, n: number): number[] {
  const all = Array.from({ length: total }, (_, i) => i);
  if (n >= total) return all;
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, n).sort((a, b) => a - b);
}

function Header({ signedIn }: { signedIn: boolean }) {
  return (
    <header className="appbar">
      <div className="appbar-inner">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} aria-label="EASprint home">
          <Brand small />
        </Link>
        <div style={{ flexGrow: 1 }} />
        {!signedIn && (
          <Link className="btn btn-small" to="/signup">
            Sign up free
          </Link>
        )}
      </div>
    </header>
  );
}

/** A test the admin shared by link. Anyone can take it, signed in or not; nothing about the taker is saved. */
export default function PublicTest({ signedIn }: { signedIn: boolean }) {
  const { token = "" } = useParams();
  const [test, setTest] = useState<Test | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttemptState] = useState<Attempt | null>(() => readAttempt(token));
  const [timed, setTimed] = useState(true);
  const [n, setN] = useState(0);
  const [now, setNow] = useState(Date.now());

  const setAttempt = (a: Attempt | null) => {
    setAttemptState(a);
    writeAttempt(token, a);
  };

  useEffect(() => {
    if (!canSharePublicly) {
      setError("Public tests aren't available here.");
      return;
    }
    loadPublicTest(token).then(
      (t) => {
        setTest(t);
        setN(t.questions.length);
        // A saved attempt from an older version of the deck can't be shown against the new questions.
        const saved = readAttempt(token);
        if (saved && saved.order.some((i) => i >= t.questions.length)) setAttempt(null);
      },
      (e) => setError((e as Error).message || "This test couldn't be loaded."),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const running = !!attempt && !attempt.finishedAt;
  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(t);
  }, [running]);

  const elapsed = attempt ? ((attempt.finishedAt ?? now) - attempt.startedAt) / 1000 : 0;

  const finish = (endedBy: Attempt["endedBy"]) => {
    if (!attempt || !test || attempt.finishedAt) return;
    const done = { ...attempt, finishedAt: Date.now(), endedBy };
    setAttempt(done);
    const score = done.order.filter((qi, k) => isCorrect(test.questions[qi], done.answers[k])).length;
    reportFinished(token, score, done.order.length);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (running && attempt!.limitSec > 0 && elapsed >= attempt!.limitSec) finish("timeout");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, elapsed]);

  const items = useMemo(
    () =>
      test && attempt
        ? attempt.order.map((qi, k) => {
            const q = test.questions[qi];
            const answer = attempt.answers[k] ?? "";
            return { q, k, answer, ok: isCorrect(q, answer) };
          })
        : [],
    [test, attempt],
  );

  if (error) {
    return (
      <>
        <Header signedIn={signedIn} />
        <main className="page narrow">
          <h1>This test isn't available</h1>
          <p className="muted">{error}</p>
          <div>
            <Link className="btn btn-primary" to="/">
              Go to EASprint
            </Link>
          </div>
        </main>
      </>
    );
  }
  if (!test) {
    return (
      <>
        <Header signedIn={signedIn} />
        <main className="page narrow">
          <span className="spinner" />
        </main>
      </>
    );
  }

  const total = test.questions.length;

  // ---- Before starting ----
  if (!attempt) {
    const count = Math.max(1, Math.min(total, n || 1));
    const limitSec = timed ? count * EXAM.secondsPerQuestion : 0;
    return (
      <>
        <Header signedIn={signedIn} />
        <main className="page narrow">
          <div>
            <div className="eyebrow">Enrolled Agent practice test · Tax year {EXAM.taxYear}</div>
            <h1>{test.title}</h1>
          </div>
          <p className="muted">
            {total} multiple-choice question{total === 1 ? "" : "s"} written from IRS publications. You don't need an account. When you finish you'll see your
            score and a full explanation for every question.
          </p>
          {total === 0 ? (
            <p>This test has no questions yet.</p>
          ) : (
            <form
              className="stack layout-gap"
              onSubmit={(e) => {
                e.preventDefault();
                setAttempt({ order: pick(total, count), answers: {}, current: 0, startedAt: Date.now(), limitSec });
                setNow(Date.now());
              }}
            >
              <fieldset className="stack" style={{ border: "none", padding: 0, margin: 0, gap: 10 }}>
                <legend className="eyebrow" style={{ marginBottom: 10 }}>
                  Timing
                </legend>
                <div className="modes">
                  <label className="mode">
                    <span className="name">
                      <input type="radio" name="timing" checked={timed} onChange={() => setTimed(true)} />
                      Exam pace
                    </span>
                    <span className="desc">{formatClock(EXAM.secondsPerQuestion)} per question, the same as the real exam.</span>
                  </label>
                  <label className="mode">
                    <span className="name">
                      <input type="radio" name="timing" checked={!timed} onChange={() => setTimed(false)} />
                      No clock
                    </span>
                    <span className="desc">Take your time on each question.</span>
                  </label>
                </div>
              </fieldset>
              {total > 1 && (
                <div className="panel stack">
                  <div>
                    <label htmlFor="n">Number of questions</label>
                    <input id="n" type="number" min={1} max={total} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ maxWidth: 160 }} />
                    <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
                      {count < total ? `${count} picked at random from ${total}.` : `All ${total}, in order.`}
                      {timed && ` ${formatClock(limitSec)} in total.`}
                    </p>
                  </div>
                </div>
              )}
              <div>
                <button className="btn btn-primary btn-big" type="submit">
                  <Icon name="play" /> Start the test
                </button>
              </div>
            </form>
          )}
        </main>
      </>
    );
  }

  const N = attempt.order.length;

  // ---- Results ----
  if (attempt.finishedAt) {
    const correct = items.filter((x) => x.ok).length;
    const answered = items.filter((x) => x.answer).length;
    const pct = Math.round((correct / N) * 100);
    const heading = attempt.endedBy === "timeout" ? "Time's up" : attempt.endedBy === "quit" ? "Ended early" : "Test complete";
    return (
      <>
        <Header signedIn={signedIn} />
        <main className="page narrow">
          <div className="eyebrow">
            {test.title} · {heading}
          </div>
          <div className="panel stack">
            <div className="score">
              <div className="big mono">
                {correct}
                <span className="muted" style={{ fontSize: 32 }}>/{N}</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 28, fontWeight: 800 }}>{pct}%</div>
                <div className="muted">
                  Time used <b className="mono">{formatClock(Math.min(elapsed, attempt.limitSec || Infinity))}</b>
                  {attempt.limitSec > 0 && <> of {formatClock(attempt.limitSec)}</>}
                </div>
              </div>
            </div>
            <div className={`verdict ${pct >= 70 ? "good" : "warn"}`}>
              <h3>{pct >= 70 ? "Solid work" : "Worth another look"}</h3>
              <p>
                {pct >= 70
                  ? "You're on track for this material. Read the explanations for any you missed."
                  : "Read the explanations below, then try again. Each one cites the IRS source it comes from."}
              </p>
            </div>
            <div className="kv">
              <div><span>Correct</span><b>{correct}</b></div>
              <div><span>Incorrect</span><b>{answered - correct}</b></div>
              {N - answered > 0 && <div><span>Unanswered</span><b>{N - answered}</b></div>}
            </div>
          </div>

          <div className="row">
            <button type="button" className="btn btn-primary" onClick={() => setAttempt(null)}>
              Take it again
            </button>
            {!signedIn && (
              <Link className="btn" to="/signup">
                Practice all three exam parts free
              </Link>
            )}
          </div>

          <section className="panel">
            <h2>Review your answers</h2>
            {items.map((x) => (
              <div className="review-item" key={x.k}>
                <div className="review-head">
                  <h3>Question {x.k + 1}</h3>
                  <span className="row" style={{ gap: 6 }}>
                    <Chip>{x.q.topic || domainName(x.q.domain)}</Chip>
                    {x.ok ? <Chip tone="good">Correct</Chip> : <Chip tone="miss">{x.answer ? "Incorrect" : "Unanswered"}</Chip>}
                  </span>
                </div>
                <div>{x.q.prompt}</div>
                <details open={!x.ok}>
                  <summary>{x.ok ? "Show explanation" : "Explanation"}</summary>
                  <div style={{ marginTop: 10 }}>
                    <Explanation question={x.q} picked={x.answer} />
                  </div>
                </details>
              </div>
            ))}
          </section>
        </main>
      </>
    );
  }

  // ---- Taking the test ----
  const i = attempt.current;
  const q = test.questions[attempt.order[i]];
  const answer = attempt.answers[i] ?? "";
  const last = i === N - 1;
  const done = Object.values(attempt.answers).filter(Boolean).length;
  const left = attempt.limitSec > 0 ? Math.max(0, attempt.limitSec - elapsed) : 0;
  const goTo = (to: number) => to >= 0 && to < N && setAttempt({ ...attempt, current: to });

  return (
    <>
      <Header signedIn={signedIn} />
      <main className="page practice">
        <div className="practice-top">
          <div className="row spread">
            <div>
              <div className="eyebrow">{test.title}</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>
                Question {i + 1} of {N}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              {attempt.limitSec > 0 ? (
                <div className="clock" style={{ color: left < attempt.limitSec * 0.1 ? "var(--bad)" : "var(--ink)" }} role="timer">
                  {formatClock(left)}
                </div>
              ) : (
                <div className="clock muted">{formatClock(elapsed)}</div>
              )}
            </div>
          </div>
          <div className="track" aria-label={`${done} of ${N} answered`}>
            <div className="fill" style={{ width: `${(done / N) * 100}%` }} />
          </div>
        </div>

        <nav className="qpicker" aria-label="Questions">
          {attempt.order.map((_, k) => (
            <button
              key={k}
              type="button"
              className={attempt.answers[k] ? "answered" : ""}
              aria-current={k === i ? "step" : undefined}
              aria-label={`Question ${k + 1}${attempt.answers[k] ? ", answered" : ""}`}
              onClick={() => goTo(k)}
            >
              {k + 1}
            </button>
          ))}
        </nav>

        <div className="panel qcard">
          <div className="eyebrow">{domainName(q.domain)}</div>
          <div className="qtext">{q.prompt}</div>
          <div className="choices" role="group" aria-label="Choices">
            {q.choices.map((c, k) => (
              <button key={c} type="button" aria-pressed={answer === c} onClick={() => setAttempt({ ...attempt, answers: { ...attempt.answers, [i]: c } })}>
                <span className="letter">{LETTERS[k]}</span>
                <span>{c}</span>
              </button>
            ))}
          </div>
          <div className="row practice-nav" style={{ justifyContent: "flex-end" }}>
            <span className="saved">{last && done < N ? `${N - done} unanswered` : ""}</span>
            <button className="btn btn-big" onClick={() => goTo(i - 1)} disabled={i === 0}>
              Previous
            </button>
            <button className="btn btn-primary btn-big practice-next" onClick={() => (last ? finish("finished") : goTo(i + 1))}>
              {last ? (
                <>
                  Finish <Icon name="check" />
                </>
              ) : (
                <>
                  Next <Icon name="next" />
                </>
              )}
            </button>
          </div>
        </div>
        <div className="row spread">
          <button className="btn-link" style={{ color: "var(--muted)" }} onClick={() => finish("quit")}>
            End the test early
          </button>
          <span className="muted" style={{ fontSize: 13 }}>
            Go back to any question with the numbers above
          </span>
        </div>
      </main>
    </>
  );
}

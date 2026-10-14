import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopBar, { Chip } from "../components/TopBar";
import { domainName, getQuestions } from "../data";
import { sourceOf } from "../data/exam";
import { getSession } from "../lib/db";
import { formatClock, verdict, type Verdict } from "../lib/pace";
import { opened, secondsOn } from "../lib/timing";
import type { PracticeSession, Question } from "../lib/types";

const LETTERS = ["A", "B", "C", "D"];

function Explanation({ question, picked }: { question: Question; picked: string }) {
  const source = sourceOf(question);
  return (
    <div className="stack" style={{ gap: 12 }}>
      <ul className="options">
        {question.choices.map((c, k) => {
          const right = c === question.answer;
          const wrongPick = !right && c === picked;
          return (
            <li key={c} className={right ? "right" : wrongPick ? "picked" : ""}>
              <span className="letter">{LETTERS[k]}</span>
              <span className="opt">
                {c}
                {!right && question.whyNot[c] && <span className="whynot">{question.whyNot[c]}</span>}
              </span>
              {right && <span className="tag">Correct answer</span>}
              {wrongPick && <span className="tag">Your answer</span>}
            </li>
          );
        })}
      </ul>
      <div className="why">
        <span className="eyebrow">Why {LETTERS[question.choices.indexOf(question.answer)]} is right</span>
        {question.explanation.split(/\n\n/).map((para, k) => (
          <p key={k}>{para}</p>
        ))}
        <p className="cite">
          IRS source:{" "}
          <a href={source.url} target="_blank" rel="noreferrer">
            {source.title}
          </a>{" "}
          ({question.source.section})
        </p>
      </div>
    </div>
  );
}

export default function Results() {
  const { sessionId = "" } = useParams();
  const [s, setS] = useState<PracticeSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    getSession(sessionId).then((sess) => {
      if (!sess) return;
      const byId = new Map(getQuestions(sess.deckId).map((q) => [q.id, q]));
      setQuestions(sess.questionIds.map((id) => byId.get(id)!).filter(Boolean));
      setS(sess);
    });
  }, [sessionId]);

  if (!s || !questions.length) {
    return (
      <>
        <TopBar back={{ to: "/", label: "Home" }} />
        <main className="page"><span className="spinner" /></main>
      </>
    );
  }

  const N = questions.length;
  const timed = s.timeLimitSec > 0;
  const used = s.usedSec ?? s.timeLimitSec;
  const items = questions.map((q, i) => {
    const reached = opened(s, i);
    const time = secondsOn(s, i, used * 1000);
    return { q, i, answer: s.answers[i] ?? "", ok: !!s.results?.[i], reached, time };
  });
  const answered = items.filter((x) => x.answer).length;
  const correct = items.filter((x) => x.ok).length;
  const missed = N - correct;
  const skipped = items.filter((x) => x.reached && !x.answer).length;
  const notReached = items.filter((x) => !x.reached).length;
  const times = items.map((x) => x.time).filter((t): t is number => t !== null);
  const avg = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  const target = timed ? s.timeLimitSec / N : 0;
  const v: Verdict = timed
    ? verdict({
        endReason: s.endReason ?? "finished",
        answered,
        questions: N,
        accuracy: correct / N,
        usedSec: used,
        totalSec: s.timeLimitSec,
        avgSec: avg,
        slowCount: times.filter((t) => t > target * 1.5).length,
      })
    : {
        tone: correct / N >= 0.7 ? "good" : "warn",
        title: correct / N >= 0.7 ? "Solid understanding" : "Worth another look",
        detail: `Learn mode, so no clock. You averaged ${formatClock(avg)} a question. Try Exam pace next to work on timing.`,
      };

  // Where the time went, by exam domain, and whether any of it was missed.
  const byDomain = new Map<string, { sec: number; n: number; wrong: number }>();
  items.forEach((x) => {
    if (x.time === null) return;
    const c = byDomain.get(x.q.domain) ?? { sec: 0, n: 0, wrong: 0 };
    byDomain.set(x.q.domain, { sec: c.sec + x.time, n: c.n + 1, wrong: c.wrong + (x.ok ? 0 : 1) });
  });
  const top = [...byDomain.entries()].sort((a, b) => b[1].sec - a[1].sec)[0];
  const weakest = [...byDomain.entries()].filter(([, c]) => c.wrong).sort((a, b) => b[1].wrong / b[1].n - a[1].wrong / a[1].n || b[1].sec - a[1].sec)[0];
  const maxT = Math.max(target * 1.6, ...times, 1);
  const heading = s.endReason === "timeout" ? "Time's up" : s.endReason === "quit" ? "Ended early" : "Practice complete";
  const toneVar = v.tone === "neutral" ? "var(--ink)" : `var(--${v.tone})`;

  return (
    <>
      <TopBar back={{ to: "/", label: "Home" }} />
      <main className="page narrow">
        <div className="eyebrow">
          {s.deckTitle} · {heading}
        </div>

        <div className="panel stack">
          <div className="score">
            <div className="big mono">
              {correct}
              <span className="muted" style={{ fontSize: 32 }}>/{N}</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 28, fontWeight: 800 }}>{Math.round((correct / N) * 100)}%</div>
              <div className="muted">
                {timed ? (
                  <>
                    Time used <b className="mono">{formatClock(used)}</b> of {formatClock(s.timeLimitSec)}
                  </>
                ) : (
                  <>
                    Time spent <b className="mono">{formatClock(used)}</b>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={`verdict ${v.tone}`}>
            <h3 style={{ color: toneVar }}>{v.title}</h3>
            <p>{v.detail}</p>
          </div>
          <div className="kv">
            <div><span>Correct</span><b>{correct}</b></div>
            <div><span>Incorrect</span><b>{answered - correct}</b></div>
            {skipped > 0 && <div><span>Skipped</span><b>{skipped}</b></div>}
            {notReached > 0 && <div><span>Not reached</span><b>{notReached}</b></div>}
            <div><span>Average</span><b>{formatClock(avg)}</b></div>
            {timed && <div><span>Target</span><b>{formatClock(target)}</b></div>}
            {times.length > 0 && (
              <>
                <div><span>Fastest</span><b>{formatClock(Math.min(...times))}</b></div>
                <div><span>Slowest</span><b>{formatClock(Math.max(...times))}</b></div>
              </>
            )}
          </div>
        </div>

        <div className="panel stack">
          <div className="row spread">
            <h2>Where your time went</h2>
            <div className="legend">
              <span><i style={{ background: "var(--accent)" }} /> Correct</span>
              <span><i style={{ background: "var(--miss)" }} /> Incorrect</span>
              {timed && <span><i style={{ background: "var(--ink)", width: 2, opacity: 0.6 }} /> {formatClock(target)} target</span>}
            </div>
          </div>
          <div className="tbars">
            {items.map((x) => (
              <div className="tbar" key={x.i}>
                <span className="mono muted">{x.i + 1}</span>
                <div className="b">
                  {x.time !== null && <i style={{ width: `${(x.time / maxT) * 100}%`, background: `var(--${x.ok ? "accent" : "miss"})` }} />}
                  {timed && <span className="t" style={{ left: `${(target / maxT) * 100}%` }} />}
                </div>
                <span className="mono">{x.time !== null ? formatClock(x.time) : "–"}</span>
              </div>
            ))}
          </div>
          {top && (
            <p>
              You spent the most time on <b>{domainName(top[0])}</b>: {formatClock(top[1].sec)} across {top[1].n} question{top[1].n > 1 ? "s" : ""}
              {top[1].wrong ? `, and you missed ${top[1].wrong === top[1].n ? (top[1].n > 1 ? "all of them" : "it") : top[1].wrong === 1 ? "one of them" : `${top[1].wrong} of them`}.` : "."}
            </p>
          )}
        </div>

        <div className="row">
          <Link className="btn btn-primary" to={`/decks/${s.deckId}/practice`}>
            Practice again
          </Link>
          {missed > 0 && (
            <Link className="btn" to={`/decks/${s.deckId}/practice?select=missed`}>
              Retry the {missed === 1 ? "one" : missed} I missed
            </Link>
          )}
          {weakest && (
            <Link className="btn" to={`/decks/${s.deckId}/practice?domain=${weakest[0]}`}>
              More on {domainName(weakest[0])}
            </Link>
          )}
        </div>

        <section className="panel">
          <h2>Review your answers</h2>
          {items.map((x) => (
            <div className="review-item" key={x.i}>
              <div className="review-head">
                <h3>Question {x.i + 1}</h3>
                <span className="row" style={{ gap: 6 }}>
                  <Chip>{x.q.topic}</Chip>
                  {x.ok ? (
                    <Chip tone="good">Correct{x.time !== null && ` · ${formatClock(x.time)}`}</Chip>
                  ) : !x.reached ? (
                    <Chip>Not reached</Chip>
                  ) : !x.answer ? (
                    <Chip tone="miss">Skipped{x.time !== null && ` · ${formatClock(x.time)}`}</Chip>
                  ) : (
                    <Chip tone="miss">Incorrect{x.time !== null && ` · ${formatClock(x.time)}`}</Chip>
                  )}
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

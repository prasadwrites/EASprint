import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chip, Icon } from "../components/TopBar";
import { domainName, getQuestions } from "../data";
import { finishSession, getSession, saveAnswer, saveNavigation } from "../lib/db";
import { formatClock, pace, pressureBackground, stage } from "../lib/pace";
import { moveTo, secondsOn } from "../lib/timing";
import type { EndReason, PracticeSession, Question } from "../lib/types";

const TICK_MS = 250;
const LETTERS = ["A", "B", "C", "D"];

export default function Practice() {
  const { sessionId = "" } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [now, setNow] = useState(Date.now());
  const ending = useRef(false);

  useEffect(() => {
    (async () => {
      const s = await getSession(sessionId);
      if (!s) return navigate("/", { replace: true });
      if (s.status === "completed") return navigate(`/sessions/${s.id}/results`, { replace: true });
      const byId = new Map(getQuestions(s.deckId).map((q) => [q.id, q]));
      setQuestions(s.questionIds.map((id) => byId.get(id)!).filter(Boolean));
      setSession(s);
    })();
  }, [sessionId, navigate]);

  const elapsedSec = session ? (now - session.startedAtMs) / 1000 : 0;
  // Learn mode has no time limit: the clock counts up and nothing ends the session but the candidate.
  const timed = (session?.timeLimitSec ?? 0) > 0;
  const total = timed ? session!.timeLimitSec : Infinity;

  const end = useCallback(
    async (reason: EndReason) => {
      if (!session || ending.current) return;
      ending.current = true;
      const used = Math.min(total, (Date.now() - session.startedAtMs) / 1000);
      await finishSession(session, questions, reason, used);
      navigate(`/sessions/${session.id}/results`, { replace: true });
    },
    [session, questions, total, navigate],
  );

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), TICK_MS);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (session && timed && elapsedSec >= total) end("timeout");
  }, [session, timed, elapsedSec, total, end]);

  const remaining = timed ? Math.max(0, total - elapsedSec) / total : 1;
  const background = useMemo(() => (session && timed ? pressureBackground(remaining) : "none"), [session, timed, remaining]);

  if (!session || !questions.length) return <main className="page practice"><span className="spinner" /></main>;

  const N = questions.length;
  const i = session.currentIndex;
  const q = questions[i];
  const answer = session.answers[i] ?? "";
  const last = i === N - 1;
  const perQ = timed ? total / N : 0;
  const done = questions.filter((_, k) => session.answers[k]).length;
  const p = timed ? pace(elapsedSec, total, N, done) : null;
  const st = stage(remaining);
  const onQuestion = secondsOn(session, i, now - session.startedAtMs) ?? 0;

  const setAnswer = (value: string) => {
    setSession({ ...session, answers: { ...session.answers, [i]: value } });
    saveAnswer(session.id, i, value);
  };

  // Any question can be revisited; time on each one adds up across visits.
  const goTo = (to: number) => {
    if (to === i || to < 0 || to >= N) return;
    const nav = moveTo(session, to, Date.now() - session.startedAtMs);
    setSession({ ...session, ...nav });
    saveNavigation(session.id, nav);
  };

  const next = () => (last ? end("finished") : goTo(i + 1));

  return (
    <>
      <div className="pressure" style={{ background }} aria-hidden />
      <main className="page practice">
        <div className="practice-top">
          <div className="row spread">
            <div>
              <div className="eyebrow">{session.deckTitle}</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>
                Question {i + 1} of {N}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              {timed ? (
                <>
                  <div className="clock" style={{ color: st.tone === "neutral" ? "var(--ink)" : `var(--${st.tone})` }} role="timer">
                    {formatClock(total - elapsedSec)}
                  </div>
                  <div className="muted" style={{ fontSize: 13, fontWeight: 700 }}>
                    {st.label}
                  </div>
                </>
              ) : (
                <>
                  <div className="clock muted">{formatClock(elapsedSec)}</div>
                  <div className="muted" style={{ fontSize: 13, fontWeight: 700 }}>
                    Learn mode · no time limit
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="track" aria-label={p ? `${done} of ${N} answered; target is ${p.expected.toFixed(1)}` : `${done} of ${N} answered`}>
            <div className="fill" style={{ width: `${(done / N) * 100}%` }} />
            {p && <div className="target" style={{ left: `calc(${(p.expected / N) * 100}% - 1px)` }} />}
          </div>
          {p && (
            <div className="pace" aria-live="polite">
              <Chip tone={p.tone}>{p.label}</Chip>
              <span>{p.message}</span>
            </div>
          )}
        </div>

        <nav className="qpicker" aria-label="Questions">
          {questions.map((_, k) => (
            <button
              key={k}
              type="button"
              className={session.answers[k] ? "answered" : ""}
              aria-current={k === i ? "step" : undefined}
              aria-label={`Question ${k + 1}${session.answers[k] ? ", answered" : ""}`}
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
              <button key={c} type="button" aria-pressed={answer === c} onClick={() => setAnswer(c)}>
                <span className="letter">{LETTERS[k]}</span>
                <span>{c}</span>
              </button>
            ))}
          </div>
          <div className="row spread">
            <div className="qtimer">
              This question <b className={`mono ${timed && onQuestion > perQ ? "over" : ""}`}>{formatClock(onQuestion)}</b>
              {timed && <> / target {formatClock(perQ)}</>}
            </div>
            <div className="row practice-nav">
              <span className="saved">{last && done < N ? `${N - done} unanswered` : ""}</span>
              <button className="btn btn-big" onClick={() => goTo(i - 1)} disabled={i === 0}>
                Previous
              </button>
              <button className="btn btn-primary btn-big practice-next" onClick={next}>
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
        </div>
        <div className="row spread">
          <button className="btn-link" style={{ color: "var(--muted)" }} onClick={() => end("quit")}>
            End session early
          </button>
          <span className="muted" style={{ fontSize: 13 }}>
            Go back to any question with the numbers above. Answers save automatically
          </span>
        </div>
      </main>
    </>
  );
}

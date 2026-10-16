import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import TopBar, { Chip, Icon } from "../components/TopBar";
import { EXAM, sourceOf } from "../data/exam";
import { loadDeck, loadQuestions } from "../lib/decks";
import { formatClock } from "../lib/pace";
import type { Deck, Question } from "../lib/types";

const LEVELS = [
  ["Easy", "var(--good)"],
  ["Medium", "var(--accent)"],
  ["Hard", "var(--miss)"],
] as const;

export default function DeckReview() {
  const { deckId = "" } = useParams();
  const [params] = useSearchParams();
  const [deck, setDeck] = useState<Deck | null | undefined>(undefined);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    Promise.all([loadDeck(deckId), loadQuestions(deckId)]).then(([d, qs]) => {
      setQuestions(qs);
      setDeck(d);
    });
  }, [deckId]);

  const back = { to: "/#parts", label: "Home" };
  if (deck === undefined) return <><TopBar back={back} /><main className="page"><span className="spinner" /></main></>;
  if (deck === null) return <><TopBar back={back} /><main className="page"><p>That deck doesn't exist or isn't yours.</p></main></>;

  const ai = deck.source === "ai";
  const dropped = Number(params.get("dropped") || 0);
  const spread = LEVELS.map(([l, c]) => ({ l, c, n: questions.filter((q) => q.difficulty === l).length }));
  const cited = [...new Map(questions.map((q) => sourceOf(q)).map((s) => [s.url, s])).values()].sort((a, b) => a.title.localeCompare(b.title));
  const examTotal = deck.domains.reduce((a, d) => a + d.examQuestions, 0);
  const domains = ai ? deck.domains.filter((d) => questions.some((q) => q.domain === d.id)) : deck.domains;

  return (
    <>
      <TopBar back={back} />
      <main className="page narrow">
        <div className="stack">
          {ai && params.get("fresh") && (
            <div className="row">
              <Chip tone="good">
                <Icon name="check" size={14} /> Deck ready · all {questions.length} questions passed the checks
              </Chip>
              {dropped > 0 && (
                <span className="muted">
                  {dropped} question{dropped > 1 ? "s" : ""} failed the checks and {dropped > 1 ? "were" : "was"} left out.
                </span>
              )}
            </div>
          )}
          <div>
            <div className="eyebrow">
              {ai ? `Built with Claude · ${deck.difficulty} · ` : "Special Enrollment Examination · "}Tax year {EXAM.taxYear}
              {deck.createdAt && ` · Created ${deck.createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`}
            </div>
            <h1>{deck.title}</h1>
          </div>
          <p className="muted">{deck.summary}</p>
          {ai && !!deck.topics?.length && (
            <div className="row">
              {deck.topics.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          )}
          <div className="row">
            <Link className="btn btn-primary btn-big" to={`/decks/${deck.id}/practice`}>
              <Icon name="play" /> Start practice
            </Link>
          </div>
        </div>

        <div className="tiles">
          <div className="tile">
            <span className="label">Practice questions</span>
            <span className="value">{questions.length}</span>
          </div>
          <div className="tile">
            <span className="label">Difficulty spread</span>
            <div className="spread-bar" aria-hidden>
              {spread.map((s) => s.n > 0 && <i key={s.l} style={{ flexGrow: s.n, background: s.c }} />)}
            </div>
            <span style={{ fontSize: 14 }}>{spread.map((s) => `${s.n} ${s.l.toLowerCase()}`).join(" · ")}</span>
          </div>
          <div className="tile">
            <span className="label">Real exam pace</span>
            <span className="value">{formatClock(EXAM.secondsPerQuestion)}</span>
            <span style={{ fontSize: 14 }}>
              per question: {EXAM.questionsPerPart} in {EXAM.minutesPerPart / 60} hours
            </span>
          </div>
        </div>

        <div className="panel stack">
          <div className="row spread">
            <h2>{ai ? "Exam domains in this deck" : "What the exam covers"}</h2>
            {!ai && (
              <span className="muted">
                {examTotal} scored questions, pass at {EXAM.passingScore}
              </span>
            )}
          </div>
          <table className="domains">
            <thead>
              <tr>
                <th>Domain</th>
                {!ai && <th className="num">On the exam</th>}
                <th className="num">Here</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((d) => (
                <tr key={d.id}>
                  <td>
                    <Link to={`/decks/${deck.id}/practice?domain=${d.id}`}>{d.name}</Link>
                  </td>
                  {!ai && <td className="num">{d.examQuestions}</td>}
                  <td className="num">{questions.filter((q) => q.domain === d.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!ai && (
            <p className="muted" style={{ fontSize: 14 }}>
              Domains and question counts are from the IRS content outline for this part. Each part also has {EXAM.questionsPerPart - EXAM.scoredPerPart} unscored
              experimental questions.
            </p>
          )}
        </div>

        <div className="panel">
          <div className="row spread">
            <h2>Questions</h2>
            <span className="muted">Answers stay hidden until after you practice</span>
          </div>
          <ul className="qlist" style={{ marginTop: 12 }}>
            {questions.map((q, i) => (
              <li key={q.id}>
                <span className="n">{i + 1}</span>
                <span className="q">{q.prompt}</span>
                <span className="row" style={{ gap: 6, justifyContent: "flex-end" }}>
                  <Chip>{q.topic}</Chip>
                  <Chip tone={q.difficulty === "Hard" ? "miss" : "neutral"}>{q.difficulty}</Chip>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel stack">
          <h2>IRS sources for this {ai ? "deck" : "part"}</h2>
          <ul className="sources">
            {cited.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
          {ai && (
            <p className="muted" style={{ fontSize: 14 }}>
              Claude wrote these questions, and a separate Claude check answered each one without the key. Every cited page was checked to exist on irs.gov, but check
              the figures against the source before relying on them.
            </p>
          )}
        </div>
      </main>
    </>
  );
}

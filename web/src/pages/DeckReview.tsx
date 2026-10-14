import { Link, useParams } from "react-router-dom";
import TopBar, { Chip, Icon } from "../components/TopBar";
import { getDeck, getQuestions } from "../data";
import { EXAM } from "../data/exam";
import { SOURCES, type SourceKey } from "../data/sources";
import { formatClock } from "../lib/pace";

const LEVELS = [
  ["Easy", "var(--good)"],
  ["Medium", "var(--accent)"],
  ["Hard", "var(--miss)"],
] as const;

export default function DeckReview() {
  const { deckId = "" } = useParams();
  const deck = getDeck(deckId);
  const questions = getQuestions(deckId);

  const back = { to: "/#parts", label: "Exam parts" };
  if (!deck) return <><TopBar back={back} /><main className="page"><p>That exam part doesn't exist.</p></main></>;

  const spread = LEVELS.map(([l, c]) => ({ l, c, n: questions.filter((q) => q.difficulty === l).length }));
  const cited = [...new Set(questions.map((q) => q.source.key as SourceKey))].map((k) => SOURCES[k]).sort((a, b) => a.title.localeCompare(b.title));
  const examTotal = deck.domains.reduce((a, d) => a + d.examQuestions, 0);

  return (
    <>
      <TopBar back={back} />
      <main className="page narrow">
        <div className="stack">
          <div>
            <div className="eyebrow">
              Special Enrollment Examination · Tax year {EXAM.taxYear}
            </div>
            <h1>{deck.title}</h1>
          </div>
          <p className="muted">{deck.summary}</p>
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
            <h2>What the exam covers</h2>
            <span className="muted">
              {examTotal} scored questions, pass at {EXAM.passingScore}
            </span>
          </div>
          <table className="domains">
            <thead>
              <tr>
                <th>Domain</th>
                <th className="num">On the exam</th>
                <th className="num">Here</th>
              </tr>
            </thead>
            <tbody>
              {deck.domains.map((d) => (
                <tr key={d.id}>
                  <td>
                    <Link to={`/decks/${deck.id}/practice?domain=${d.id}`}>{d.name}</Link>
                  </td>
                  <td className="num">{d.examQuestions}</td>
                  <td className="num">{questions.filter((q) => q.domain === d.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted" style={{ fontSize: 14 }}>
            Domains and question counts are from the IRS content outline for this part. Each part also has {EXAM.questionsPerPart - EXAM.scoredPerPart} unscored experimental
            questions.
          </p>
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
          <h2>IRS sources for this part</h2>
          <ul className="sources">
            {cited.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

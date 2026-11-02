import { sourceOf } from "../data/exam";
import type { Question } from "../lib/types";

const LETTERS = ["A", "B", "C", "D"];

/** The four options marked right and wrong, why each wrong one is wrong, and the explanation with its IRS source. */
export default function Explanation({ question, picked }: { question: Question; picked: string }) {
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

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAccount, useUser } from "../App";
import Explanation from "../components/Explanation";
import TopBar, { Chip } from "../components/TopBar";
import { domainName, getQuestions } from "../data";
import { PARTS } from "../data/exam";
import { SOURCES } from "../data/sources";
import { appendLine, downloadText, loadNote, MAX_NOTE, notesToMarkdown, saveNote, type Confidence } from "../lib/studyNotes";
import type { Question } from "../lib/types";
import { canBuildDecks } from "../lib/decks";
import { hasStudyAccess, LESSONS, nextEpisode } from "../study";
import { Ace, CAST, Face, Hoot, Penny, type CastMember } from "../study/cast";
import { SEASONS } from "../study/outline";
import { saveScore } from "../study/progress";
import { quizLink } from "../study/quiz";
import type { Bubble, ConceptCard, Lesson } from "../study/lesson";

const LETTERS = ["A", "B", "C", "D"];

function ComicStrip({ lesson }: { lesson: Lesson }) {
  return (
    <section className="stack" aria-labelledby="comic-h">
      <div className="stack" style={{ gap: 2 }}>
        <span className="eyebrow">
          Ledger Falls · Season {SEASONS[lesson.part].number} · Episode {lesson.number}
        </span>
        <h2 id="comic-h">{lesson.episode}</h2>
        {lesson.previously && (
          <p className="previously">
            <strong>Previously in Ledger Falls:</strong> {lesson.previously}
          </p>
        )}
      </div>
      <div className="comic">
        {lesson.comic.map((p, i) => (
          <figure key={i} className="comic-panel">
            <div role="img" aria-label={p.alt}>
              {p.art}
            </div>
            {p.bubbles.map((b, k) => (
              <SpeechBubble key={k} b={b} />
            ))}
            <span className="comic-num" aria-hidden>
              {i + 1}
            </span>
          </figure>
        ))}
      </div>
    </section>
  );
}

function SpeechBubble({ b }: { b: Bubble }) {
  return (
    <p className={`bubble tail-${b.tail ?? "down"} who-${b.who.toLowerCase()}${b.shout ? " shout" : ""}`} style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%` }}>
      <span className="sr-only">{b.who === "Walt" ? "Grandpa Walt" : b.who}: </span>
      {b.text}
    </p>
  );
}

function Cards({ cards, onNote }: { cards: ConceptCard[]; onNote: (line: string) => void }) {
  const [i, setI] = useState(0);
  const [added, setAdded] = useState<Set<number>>(new Set());
  const card = cards[i];
  const go = (n: number) => setI(Math.max(0, Math.min(cards.length - 1, n)));
  return (
    <section className="stack" aria-labelledby="cards-h">
      <div className="row spread">
        <h2 id="cards-h">The rules, one picture at a time</h2>
        <span className="muted mono">
          {i + 1} / {cards.length}
        </span>
      </div>
      <article
        className="panel concept-card"
        tabIndex={0}
        aria-roledescription="card"
        aria-label={`Card ${i + 1} of ${cards.length}: ${card.title}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(i + 1);
          if (e.key === "ArrowLeft") go(i - 1);
        }}
      >
        <div className="concept-art" role="img" aria-label={card.alt}>
          {card.art}
        </div>
        <div className="stack" style={{ gap: 10 }}>
          <h3 style={{ fontSize: 20 }}>{card.title}</h3>
          {card.body.map((p, k) => (
            <p key={k}>{p}</p>
          ))}
          {card.table && (
            <div className="table-wrap">
              <table className="mini-table">
                <thead>
                  <tr>
                    {card.table.head.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {card.table.rows.map((r) => (
                    <tr key={r[0]}>
                      {r.map((c, k) => (
                        <td key={k} className={k ? "mono" : undefined}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div>
            <button
              className="btn-link"
              disabled={added.has(i)}
              onClick={() => {
                onNote(`• ${card.keyPoint}`);
                setAdded(new Set(added).add(i));
              }}
            >
              {added.has(i) ? "✓ Added to my notes" : "+ Add the key point to my notes"}
            </button>
          </div>
        </div>
      </article>
      <div className="row spread">
        <button onClick={() => go(i - 1)} disabled={i === 0}>
          ← Back
        </button>
        <div className="dots" role="tablist" aria-label="Cards">
          {cards.map((c, k) => (
            <button key={k} role="tab" aria-selected={k === i} aria-label={`Card ${k + 1}: ${c.title}`} className={k === i ? "on" : ""} onClick={() => setI(k)} />
          ))}
        </div>
        <button className={i < cards.length - 1 ? "btn-primary" : ""} onClick={() => go(i + 1)} disabled={i === cards.length - 1}>
          Next →
        </button>
      </div>
    </section>
  );
}

interface Round {
  id: string;
  who: CastMember;
  title: string;
  facts: string;
  question: string;
  choices: string[];
  answer: string;
  why?: string;
  bank?: Question;
}

const NAMES: Record<CastMember, string> = { Penny: "Penny", Ace: "Ace", Hoot: "Hoot", Milo: "Milo", Lulu: "Lulu", Dee: "Dee", Biscuit: "Biscuit", Walt: "Grandpa Walt", Rosa: "Aunt Rosa" };

/**
 * Ace vs. Hoot: the lesson's case files about the cast, then Hoot's bonus round of exam-style bank questions.
 * Every right answer is a point for Ace (the student's side), every miss a point for Hoot.
 */
function CaseGame({ lesson, bank, onNote }: { lesson: Lesson; bank: Question[]; onNote: (line: string) => void }) {
  const rounds = useMemo<Round[]>(
    () => [
      ...lesson.cases.map((c, i) => ({ ...c, id: `case${i}` })),
      ...bank.map((q) => ({ id: q.id, who: "Hoot" as const, title: "Hoot's bonus: exam style", facts: "", question: q.prompt, choices: q.choices, answer: q.answer, bank: q })),
    ],
    [lesson, bank],
  );
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [best, setBest] = useState(false);
  const ace = rounds.filter((r) => picked[r.id] === r.answer).length;
  const hoot = Object.keys(picked).length - ace;
  const done = Object.keys(picked).length === rounds.length && rounds.length > 0;

  const pick = (r: Round, c: string) => {
    const next = { ...picked, [r.id]: c };
    setPicked(next);
    if (Object.keys(next).length === rounds.length) {
      const right = rounds.filter((x) => next[x.id] === x.answer).length;
      setBest(saveScore(lesson.id, { right, total: rounds.length }));
    }
  };

  return (
    <section className="stack" aria-labelledby="game-h">
      <div className="stack" style={{ gap: 4 }}>
        <span className="eyebrow">The game</span>
        <h2 id="game-h">Ace vs. Hoot: case files</h2>
        <p className="muted">Solve each case for the cast. Every right answer is a point for Ace. Every miss, Hoot stamps it. Beat Hoot to close the episode.</p>
      </div>
      <div className="scoreboard" aria-live="polite">
        <span className="row" style={{ gap: 8 }}>
          <Face who="Ace" mood={ace >= hoot ? "excited" : "worried"} size={44} />
          <span className="stack" style={{ gap: 0 }}>
            <span className="eyebrow">Ace (you)</span>
            <strong className="score">{ace}</strong>
          </span>
        </span>
        <span className="muted mono">
          {Object.keys(picked).length} / {rounds.length}
        </span>
        <span className="row" style={{ gap: 8 }}>
          <span className="stack" style={{ gap: 0, textAlign: "right" }}>
            <span className="eyebrow">Hoot</span>
            <strong className="score">{hoot}</strong>
          </span>
          <Face who="Hoot" mood={hoot > ace ? "smug" : "stern"} size={44} />
        </span>
      </div>
      {rounds.map((r, n) => {
        const choice = picked[r.id];
        const right = choice === r.answer;
        return (
          <article key={r.id} className={`panel case-card${choice === undefined ? "" : right ? " won" : " lost"}`}>
            <div className="row" style={{ gap: 10, flexWrap: "nowrap" }}>
              <Face who={r.who} size={48} mood={choice === undefined ? undefined : r.who === "Hoot" ? (right ? "worried" : "smug") : right ? "excited" : "worried"} />
              <div className="stack" style={{ gap: 0 }}>
                <span className="eyebrow">
                  Case {n + 1} · {NAMES[r.who]}
                </span>
                <h3 style={{ fontSize: 17 }}>{r.title}</h3>
              </div>
            </div>
            {r.facts && <p>{r.facts}</p>}
            <p style={{ fontSize: 17, fontWeight: 700 }}>{r.question}</p>
            {choice === undefined ? (
              <div className="choice-list">
                {r.choices.map((c, k) => (
                  <button key={c} className="choice" onClick={() => pick(r, c)}>
                    <span className="letter">{LETTERS[k]}</span> {c}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <p className={right ? "verdict good" : "verdict miss"}>
                  {right ? "✓ APPROVED. Point to Ace!" : `HOO-HOO! Point to Hoot. The answer: ${r.answer}.`}
                </p>
                {r.bank ? <Explanation question={r.bank} picked={choice} /> : <p>{r.why}</p>}
                {!right && (
                  <div>
                    <button className="btn-link" onClick={() => onNote(`• Missed (${r.title}): ${r.answer}.`)}>
                      + Add this to my notes
                    </button>
                  </div>
                )}
              </>
            )}
          </article>
        );
      })}
      {done && (
        <div className={`panel game-end ${ace > hoot ? "won" : "lost"}`} role="status">
          <svg viewBox="0 0 200 110" aria-hidden className="game-end-art">
            <rect width={200} height={110} rx={10} fill={ace > hoot ? "#fff3c4" : "#eaf6ef"} />
            {ace > hoot ? (
              <>
                <Penny x={62} y={52} scale={0.42} mood="excited" pose="up" />
                <Ace x={140} y={52} scale={0.42} mood="excited" pose="wave" />
              </>
            ) : (
              <Hoot x={100} y={48} scale={0.42} mood="smug" clipboard />
            )}
          </svg>
          <div className="stack" style={{ gap: 6 }}>
            <h3 style={{ fontSize: 22 }}>{ace > hoot ? `Case closed! Ace wins ${ace} to ${hoot}.` : ace === hoot ? `A tie, ${ace} all. Hoot demands a rematch.` : `Hoot wins this round, ${hoot} to ${ace}.`}</h3>
            <p className="muted">
              {ace === rounds.length ? "A perfect score. Hoot is filing a complaint about it." : ace > hoot ? "Penny's return is safe. For now." : "Hoo-hoo! Flip back through the cards, then try again."}
              {best ? " New best score for this episode." : ""}
            </p>
            <div>
              <button
                onClick={() => {
                  setPicked({});
                  setBest(false);
                  document.getElementById("game-h")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Play again
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

type SaveState = "idle" | "saving" | "saved" | "error";

function NotesPanel({
  text,
  setText,
  confidence,
  setConfidence,
  state,
  onExport,
  onPrint,
}: {
  text: string;
  setText: (t: string) => void;
  confidence: Confidence;
  setConfidence: (c: Confidence) => void;
  state: SaveState;
  onExport: () => void;
  onPrint: () => void;
}) {
  return (
    <aside className="panel stack notes-panel" aria-labelledby="notes-h">
      <div className="row spread">
        <h2 id="notes-h" style={{ fontSize: 19 }}>
          My notes
        </h2>
        <span className="muted" style={{ fontSize: 13 }} aria-live="polite">
          {state === "saving" ? "Saving…" : state === "saved" ? "Saved" : state === "error" ? "Not saved. Check your connection." : "Private to you"}
        </span>
      </div>
      <textarea
        className="notes-text"
        value={text}
        maxLength={MAX_NOTE}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write anything that helps it stick. Tip: highlight any sentence in the lesson, or tap “Add the key point” on a card."
        aria-label="My notes for this lesson"
      />
      <div className="stack" style={{ gap: 8 }}>
        <span className="eyebrow">How do you feel about this topic?</span>
        <div className="row" style={{ gap: 8 }}>
          <button aria-pressed={confidence === "got"} className={confidence === "got" ? "conf on good" : "conf"} onClick={() => setConfidence(confidence === "got" ? "" : "got")}>
            Got it
          </button>
          <button aria-pressed={confidence === "shaky"} className={confidence === "shaky" ? "conf on miss" : "conf"} onClick={() => setConfidence(confidence === "shaky" ? "" : "shaky")}>
            Shaky
          </button>
        </div>
      </div>
      <div className="row" style={{ gap: 8 }}>
        <button onClick={onExport}>Download (.md)</button>
        <button onClick={onPrint}>Print or save as PDF</button>
      </div>
      <Link to="/study#notes" className="muted" style={{ fontSize: 14 }}>
        All my notes
      </Link>
    </aside>
  );
}

/** The cast who appear in a lesson, by full name, in cast order. */
function starring(lesson: Lesson): string {
  const seen = new Set<string>([...lesson.comic.flatMap((p) => p.bubbles.map((b) => b.who)), ...lesson.cases.map((c) => c.who)]);
  const names: string[] = CAST.filter((c) => seen.has(c.short)).map((c) => c.name);
  if (seen.has("Walt")) names.push("Grandpa Walt Pocket (in his portrait)");
  return names.join(", ");
}

export default function LessonPage() {
  const { lessonId = "" } = useParams();
  const lesson = LESSONS[lessonId];
  const user = useUser();
  const { account, admin } = useAccount();
  const unlocked = hasStudyAccess(account, admin);

  const [text, setTextState] = useState("");
  const [confidence, setConfidenceState] = useState<Confidence>("");
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState<SaveState>("idle");
  const [selection, setSelection] = useState("");
  const dirty = useRef(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lesson || !unlocked) return;
    loadNote(user.uid, lesson.id)
      .then((n) => {
        setTextState(n.text);
        setConfidenceState(n.confidence);
      })
      .catch(() => undefined)
      .finally(() => setLoaded(true));
  }, [lesson, unlocked, user.uid]);

  // Saves a moment after the last change.
  useEffect(() => {
    if (!loaded || !dirty.current || !lesson) return;
    setState("saving");
    const t = setTimeout(() => {
      saveNote(user.uid, lesson.id, text, confidence)
        .then(() => setState("saved"))
        .catch(() => setState("error"));
    }, 700);
    return () => clearTimeout(t);
  }, [text, confidence, loaded, lesson, user.uid]);

  const setText = useCallback((t: string) => {
    dirty.current = true;
    setTextState(t);
  }, []);
  const setConfidence = (c: Confidence) => {
    dirty.current = true;
    setConfidenceState(c);
  };
  const addLine = useCallback((line: string) => setText(appendLine(text, line)), [text, setText]);

  // Highlighting text in the lesson offers to copy it into the notes.
  useEffect(() => {
    const onSel = () => {
      const sel = window.getSelection();
      const s = sel?.toString().replace(/\s+/g, " ").trim() ?? "";
      const inside = !!sel?.anchorNode && !!mainRef.current?.contains(sel.anchorNode);
      setSelection(inside && s.length >= 3 ? s.slice(0, 600) : "");
    };
    document.addEventListener("selectionchange", onSel);
    return () => document.removeEventListener("selectionchange", onSel);
  }, []);

  // "Print or save as PDF" prints only the notes.
  useEffect(() => {
    const done = () => document.documentElement.classList.remove("print-notes");
    window.addEventListener("afterprint", done);
    return () => window.removeEventListener("afterprint", done);
  }, []);

  const questions = useMemo(() => (lesson ? getQuestions(lesson.part).filter((q) => lesson.quizTopics.includes(q.topic)) : []), [lesson]);

  const next = lesson && nextEpisode(lesson);
  const back = lesson ? { to: `/study/${lesson.part}`, label: `Season ${SEASONS[lesson.part].number}` } : { to: "/study", label: "Study" };
  if (!lesson) {
    return (
      <>
        <TopBar back={back} />
        <main className="page narrow">
          <p>That lesson isn't available yet.</p>
        </main>
      </>
    );
  }
  const part = PARTS.find((p) => p.id === lesson.part)!;
  const title = `${part.short} · ${lesson.number} ${lesson.title}`;
  const exportNotes = () => downloadText(`EASprint notes - ${part.short} ${lesson.number} ${lesson.title}.md`, notesToMarkdown([{ title, note: { lessonId: lesson.id, text, confidence, updatedAt: null } }]));
  const printNotes = () => {
    document.documentElement.classList.add("print-notes");
    window.print();
  };

  return (
    <>
      <TopBar back={back} />
      <main className="page lesson-page">
        <header className="stack" style={{ gap: 8 }}>
          <span className="eyebrow">
            {part.short} · {domainName(lesson.domainId)} · Topic {lesson.number}
          </span>
          <h1>{lesson.title}</h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 680 }}>
            {lesson.intro}
          </p>
          <div className="row" style={{ gap: 8 }}>
            <Chip>{lesson.minutes} min</Chip>
            <Chip>{lesson.cards.length} cards</Chip>
            <Chip>{lesson.cases.length + questions.length} cases</Chip>
            <span className="muted" style={{ fontSize: 13 }}>
              Written to {lesson.lawAsOf}
            </span>
            {unlocked && (
              <a className="btn-link notes-jump" href="#notes-h">
                Jump to my notes
              </a>
            )}
          </div>
        </header>

        <div className={unlocked ? "lesson-grid" : "stack"}>
          <div className="stack lesson-main" ref={mainRef} style={{ gap: 32 }}>
            <ComicStrip lesson={lesson} />

            {!unlocked ? (
              <div className="panel stack locked">
                <h2>The rest of this lesson is on Pro</h2>
                <p>
                  Study lessons, with the comic, picture cards, memory hooks, trap alerts and your own notes for every topic, come with the Pro and Pro Max plans.
                </p>
                <div>
                  <Link className="btn btn-primary" to="/upgrade">
                    See plans
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Cards cards={lesson.cards} onNote={addLine} />

                <section className="panel hook" aria-labelledby="hook-h">
                  <div role="img" aria-label={lesson.hook.alt} className="hook-art">
                    {lesson.hook.art}
                  </div>
                  <div className="stack" style={{ gap: 8 }}>
                    <span className="eyebrow" id="hook-h">
                      Memory hook
                    </span>
                    <p className="hook-line">{lesson.hook.line}</p>
                    <p className="muted">{lesson.hook.more}</p>
                    <div>
                      <button className="btn-link" onClick={() => addLine(`• ${lesson.hook.line}`)}>
                        + Add to my notes
                      </button>
                    </div>
                  </div>
                </section>

                <section className="stack" aria-labelledby="traps-h">
                  <h2 id="traps-h">Trap alerts</h2>
                  <p className="muted">The ways the exam tries to trip you up on this topic.</p>
                  <div className="traps">
                    {lesson.traps.map((t) => (
                      <article key={t.title} className="trap">
                        <span className="trap-icon" aria-hidden>
                          🍌
                        </span>
                        <div className="stack" style={{ gap: 4 }}>
                          <h3>{t.title}</h3>
                          <p>{t.text}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <CaseGame lesson={lesson} bank={questions} onNote={addLine} />

                <section className="panel stack" aria-labelledby="next-h">
                  <h2 id="next-h">End of episode {lesson.number}</h2>
                  <p>Want more? Have Claude write a fresh quiz on this topic, with every question a case about the Ledger Falls cast. It tests the rules from this episode, not the cartoons.</p>
                  <div className="row">
                    {canBuildDecks ? (
                      <Link className="btn btn-primary" to={quizLink(lesson.part, lesson.quizBrief)}>
                        Build a quiz on this topic
                      </Link>
                    ) : null}
                    <Link className={canBuildDecks ? "btn" : "btn btn-primary"} to={`/decks/${lesson.part}/practice?domain=${lesson.domainId}`}>
                      Practice {domainName(lesson.domainId)}
                    </Link>
                  </div>
                  {next ? (
                    <Link to={`/study/${next.id}`} className="next-episode">
                      <span className="eyebrow">Next episode · {next.number}</span>
                      <strong>{next.episode} →</strong>
                      <span className="muted">{next.title}</span>
                    </Link>
                  ) : (
                    <Link to={`/study/${lesson.part}`} className="next-episode">
                      <span className="eyebrow">That's the last episode so far</span>
                      <strong>Back to Season {SEASONS[lesson.part].number} →</strong>
                      <span className="muted">Take Hoot's unit exam at the end of the unit.</span>
                    </Link>
                  )}
                </section>

                <section className="stack" aria-labelledby="src-h">
                  <h2 id="src-h" style={{ fontSize: 18 }}>
                    IRS says
                  </h2>
                  <p className="muted" style={{ fontSize: 14 }}>
                    Every rule in this lesson comes from these IRS pages. The jokes are ours.
                  </p>
                  <ul className="sources">
                    {lesson.sources.map((s) => (
                      <li key={s.key}>
                        <a href={SOURCES[s.key].url} target="_blank" rel="noreferrer">
                          {SOURCES[s.key].title}
                        </a>{" "}
                        <span className="muted">({s.section})</span>
                      </li>
                    ))}
                  </ul>
                  <p className="muted" style={{ fontSize: 13 }}>
                    Starring {starring(lesson)}.
                  </p>
                </section>
              </>
            )}
          </div>

          {unlocked && (
            <div className="lesson-side">
              <NotesPanel text={text} setText={setText} confidence={confidence} setConfidence={setConfidence} state={state} onExport={exportNotes} onPrint={printNotes} />
            </div>
          )}
        </div>

        {unlocked && selection && (
          <button
            className="btn-primary selection-add"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              addLine(`• “${selection}”`);
              window.getSelection()?.removeAllRanges();
              setSelection("");
            }}
          >
            + Add highlighted text to my notes
          </button>
        )}

        <div className="notes-print" aria-hidden>
          <h1>My EASprint notes</h1>
          <h2>{title}</h2>
          <p>Confidence: {confidence === "got" ? "Got it" : confidence === "shaky" ? "Shaky" : "Not marked"}</p>
          <pre>{text || "No notes yet."}</pre>
        </div>
      </main>
    </>
  );
}

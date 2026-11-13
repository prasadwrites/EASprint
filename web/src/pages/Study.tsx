import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAccount, useUser } from "../App";
import TopBar, { Chip } from "../components/TopBar";
import { domainName } from "../data";
import { PARTS } from "../data/exam";
import { downloadText, listNotes, notesToMarkdown, type StudyNote } from "../lib/studyNotes";
import type { PartId } from "../lib/types";
import { hasStudyAccess, LESSONS, lessonsInPart, SEASON } from "../study";
import { Ace, Biscuit, CAST, CastPortrait, Hoot, Milo, Penny } from "../study/cast";
import { STUDY_OUTLINE, topicCount } from "../study/outline";
import { Crown, Doc, LemonadeStand, Stamp } from "../study/props";

/** The cover art on each season's block. */
function SeasonArt({ part }: { part: PartId }) {
  return (
    <svg viewBox="0 0 240 120">
      <rect width={240} height={120} fill={part === "part1" ? "#fff1d6" : part === "part2" ? "#dff1ea" : "#eaf6ef"} />
      <rect y={104} width={240} height={16} fill={part === "part1" ? "#efd9b8" : part === "part2" ? "#cde8b8" : "#cfd6df"} />
      {part === "part1" && (
        <>
          <Penny x={80} y={56} scale={0.52} mood="excited" pose="wave" />
          <Crown x={80} y={30} scale={0.4} />
          <Milo x={140} y={66} scale={0.44} mood="smug" />
          <Biscuit x={186} y={92} scale={0.22} mood="happy" />
        </>
      )}
      {part === "part2" && (
        <>
          <LemonadeStand x={160} y={84} scale={0.7} />
          <Ace x={70} y={56} scale={0.52} mood="happy" pose="point" />
        </>
      )}
      {part === "part3" && (
        <>
          <Hoot x={90} y={52} scale={0.5} mood="stern" clipboard />
          <Doc x={170} y={60} scale={0.7} label="2848" band="#1d7a49" />
          <Stamp x={176} y={96} text="APPEAL" w={70} rotate={-8} />
        </>
      )}
    </svg>
  );
}

export default function Study() {
  const [params, setParams] = useSearchParams();
  const open = (PARTS.find((p) => p.id === params.get("part"))?.id ?? null) as PartId | null;
  const user = useUser();
  const { account, admin } = useAccount();
  const unlocked = hasStudyAccess(account, admin);
  const [notes, setNotes] = useState<StudyNote[] | null>(null);

  useEffect(() => {
    if (!unlocked) return;
    listNotes(user.uid)
      .then(setNotes)
      .catch(() => setNotes([]));
  }, [unlocked, user.uid]);

  const noteFor = (lessonId: string) => notes?.find((n) => n.lessonId === lessonId);
  const written = (notes ?? []).filter((n) => n.text.trim() || n.confidence);
  const lessonTitle = (id: string) => {
    const l = LESSONS[id];
    if (!l) return id;
    return `${PARTS.find((p) => p.id === l.part)!.short} · ${l.number} ${l.title}`;
  };
  const exportAll = () =>
    downloadText(
      "EASprint study notes.md",
      notesToMarkdown(written.map((note) => ({ title: lessonTitle(note.lessonId), note }))),
    );

  return (
    <>
      <TopBar back={{ to: "/", label: "Home" }} />
      <main className="page narrow">
        <header className="stack" style={{ gap: 10 }}>
          <span className="eyebrow">Study</span>
          <h1>Learn it once. Laugh. Never forget it.</h1>
          <p className="muted" style={{ fontSize: 17 }}>
            Short cartoon lessons for every topic on the SEE: a comic to set it up, one rule per picture, a memory hook, the traps the exam sets, and a few questions to lock it in. Keep
            your own notes on every lesson and download them any time.
          </p>
          {!unlocked && (
            <div className="panel row spread">
              <span>
                Study lessons are part of <strong>Pro</strong> and <strong>Pro Max</strong>. You can preview the opening comic of each lesson.
              </span>
              <Link className="btn btn-primary" to="/upgrade">
                See plans
              </Link>
            </div>
          )}
        </header>

        <section className="panel cast-card">
          <div className="cast-art">
            <CastPortrait />
          </div>
          <div className="stack" style={{ gap: 8 }}>
            <h2 style={{ fontSize: 19 }}>Meet the cast of Ledger Falls</h2>
            {CAST.map((c) => (
              <p key={c.name}>
                <strong>{c.name}</strong>, {c.role.toLowerCase()}. <span className="muted">{c.line}</span>
              </p>
            ))}
          </div>
        </section>

        <section className="stack" aria-labelledby="seasons-h">
          <h2 id="seasons-h">Pick a season</h2>
          <div className="season-grid">
            {PARTS.map((p) => {
              const live = lessonsInPart(p.id).length;
              const total = STUDY_OUTLINE[p.id].reduce((n, d) => n + d.topics.length, 0);
              const on = open === p.id;
              return (
                <button
                  key={p.id}
                  className={`season${on ? " on" : ""}`}
                  aria-expanded={on}
                  aria-controls={`season-${p.id}`}
                  onClick={() => {
                    setParams(on ? {} : { part: p.id }, { replace: true });
                    if (!on) setTimeout(() => document.getElementById(`season-${p.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                  }}
                >
                  <span className="season-art" aria-hidden>
                    <SeasonArt part={p.id} />
                  </span>
                  <span className="eyebrow">Season {SEASON[p.id]}</span>
                  <span className="season-title">{p.title}</span>
                  <span className="muted" style={{ fontSize: 14 }}>
                    {STUDY_OUTLINE[p.id].length} units · {live ? `${live} of ${total} episodes live` : "coming soon"}
                  </span>
                  <span className="season-open">{on ? "Close ▴" : "Open ▾"}</span>
                </button>
              );
            })}
          </div>
        </section>

        {PARTS.filter((p) => p.id === open).map((p) => (
          <section key={p.id} id={`season-${p.id}`} className="stack season-body" aria-labelledby={`study-${p.id}`}>
            <div className="stack" style={{ gap: 2 }}>
              <span className="eyebrow">Ledger Falls · Season {SEASON[p.id]}</span>
              <h2 id={`study-${p.id}`}>{p.title}</h2>
            </div>
            {STUDY_OUTLINE[p.id].map((d, n) => (
              <div key={d.id} className="stack" style={{ gap: 8 }}>
                <h3>
                  Unit {n + 1}: {domainName(d.id)}
                </h3>
                <ul className="topic-list">
                  {d.topics.map((t) => {
                    const lesson = t.lessonId ? LESSONS[t.lessonId] : undefined;
                    const note = lesson && noteFor(lesson.id);
                    return (
                      <li key={t.number} className={lesson ? "live" : ""}>
                        <span className="mono topic-num">{t.number}</span>
                        <span className="stack" style={{ gap: 2, flexGrow: 1 }}>
                          {lesson ? (
                            <Link to={`/study/${lesson.id}`} className="topic-title">
                              {t.title}
                            </Link>
                          ) : (
                            <span className="topic-title">{t.title}</span>
                          )}
                          {lesson && <span style={{ fontSize: 14, fontStyle: "italic" }}>Episode: {lesson.episode}</span>}
                          <span className="muted" style={{ fontSize: 14 }}>
                            {t.subtopics}
                          </span>
                        </span>
                        {lesson ? (
                          <span className="row" style={{ gap: 6, flex: "none" }}>
                            {note?.confidence === "got" && <Chip tone="good">Got it</Chip>}
                            {note?.confidence === "shaky" && <Chip tone="miss">Shaky</Chip>}
                            <Chip tone="warn">New</Chip>
                          </span>
                        ) : (
                          <span className="muted" style={{ fontSize: 13, flex: "none" }}>
                            Coming soon
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </section>
        ))}

        {unlocked && (
          <section className="panel stack" id="notes" aria-labelledby="notes-h">
            <h2 id="notes-h">All my notes</h2>
            {notes === null ? (
              <span className="spinner" />
            ) : written.length === 0 ? (
              <p className="muted">No notes yet. Open a lesson and start writing; your notes show up here.</p>
            ) : (
              <>
                {written.map((n) => (
                  <article key={n.lessonId} className="stack" style={{ gap: 6 }}>
                    <Link to={`/study/${n.lessonId}`}>
                      <strong>{lessonTitle(n.lessonId)}</strong>
                    </Link>
                    <pre className="note-preview">{n.text.trim() || "(no text, confidence marked)"}</pre>
                  </article>
                ))}
                <div>
                  <button onClick={exportAll}>Download all my notes (.md)</button>
                </div>
              </>
            )}
          </section>
        )}

        <p className="muted" style={{ fontSize: 13 }}>
          {Object.keys(LESSONS).length} of {topicCount()} lessons ready. Topics follow the IRS content outlines for the July 1, 2026 to February 28, 2027 testing window.
        </p>
      </main>
    </>
  );
}

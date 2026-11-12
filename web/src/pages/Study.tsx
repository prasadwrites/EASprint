import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAccount, useUser } from "../App";
import TopBar, { Chip } from "../components/TopBar";
import { domainName } from "../data";
import { PARTS } from "../data/exam";
import { downloadText, listNotes, notesToMarkdown, type StudyNote } from "../lib/studyNotes";
import { hasStudyAccess, LESSONS } from "../study";
import { CAST, CastPortrait } from "../study/cast";
import { STUDY_OUTLINE, topicCount } from "../study/outline";

export default function Study() {
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

        {PARTS.map((p) => (
          <section key={p.id} className="stack" aria-labelledby={`study-${p.id}`}>
            <h2 id={`study-${p.id}`}>{p.title}</h2>
            {STUDY_OUTLINE[p.id].map((d) => (
              <div key={d.id} className="stack" style={{ gap: 8 }}>
                <h3>{domainName(d.id)}</h3>
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

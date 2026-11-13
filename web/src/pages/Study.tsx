import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAccount, useUser } from "../App";
import StudyParts from "../components/StudyParts";
import TopBar from "../components/TopBar";
import { PARTS } from "../data/exam";
import { downloadText, listNotes, notesToMarkdown, type StudyNote } from "../lib/studyNotes";
import { hasStudyAccess, LESSONS } from "../study";
import { CAST, Face, FamilyPortrait } from "../study/cast";
import { topicCount } from "../study/outline";

export default function Study() {
  const user = useUser();
  const { account, admin } = useAccount();
  const unlocked = hasStudyAccess(account, admin);
  const [notes, setNotes] = useState<StudyNote[] | null>(null);

  // Free accounts can keep notes on Season 1, Unit 1, so everyone gets the notes list.
  useEffect(() => {
    listNotes(user.uid)
      .then(setNotes)
      .catch(() => setNotes([]));
  }, [user.uid]);

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
            Ledger Falls is a cartoon series with one episode for every topic on the SEE: a comic to set it up, one rule per picture, a memory hook, the traps the exam sets, and a game of Ace vs. Hoot to lock it in. Each exam part is a season. Keep
            your own notes on every lesson and download them any time.
          </p>
          {!unlocked && (
            <div className="panel row spread">
              <span>
                <strong>Season 1, Unit 1 is free</strong>, all five episodes. Every other unit and season is part of <strong>Pro</strong> and <strong>Pro Max</strong>; you can preview the opening comic of each episode.
              </span>
              <Link className="btn btn-primary" to="/upgrade">
                See plans
              </Link>
            </div>
          )}
        </header>

        <section className="stack" aria-labelledby="seasons-h">
          <h2 id="seasons-h">Pick a part</h2>
          <StudyParts />
        </section>

        <section className="panel cast-card">
          <div className="cast-art">
            <FamilyPortrait />
          </div>
          <div className="stack" style={{ gap: 8 }}>
            <h2 style={{ fontSize: 19 }}>Meet the cast of Ledger Falls</h2>
            {CAST.map((c) => (
              <p key={c.name} className="row" style={{ gap: 10, flexWrap: "nowrap", alignItems: "flex-start" }}>
                <Face who={c.short} size={36} />
                <span>
                  <strong>{c.name}</strong>, {c.role.charAt(0).toLowerCase() + c.role.slice(1)}. <span className="muted">{c.line}</span>
                </span>
              </p>
            ))}
          </div>
        </section>

        {(unlocked || written.length > 0) && (
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

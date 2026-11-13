import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAccount, useUser } from "../App";
import TopBar, { Chip } from "../components/TopBar";
import { domainName } from "../data";
import { PARTS } from "../data/exam";
import { canBuildDecks } from "../lib/decks";
import { listNotes, type StudyNote } from "../lib/studyNotes";
import type { PartId } from "../lib/types";
import { canOpenUnit, episodes, FREE_UNIT, hasStudyAccess, LESSONS } from "../study";
import { Face, FamilyPortrait, Hoot } from "../study/cast";
import { PracticePortrait } from "../study/office";
import { SEASONS, STUDY_OUTLINE } from "../study/outline";
import { bestScore } from "../study/progress";
import { quizLink, UNIT_QUIZ } from "../study/quiz";
import { castCard, SEASON_CAST } from "../study/seasonCast";

/** A season's contents: the part's units (exam domains), each with its episodes and a unit quiz at the end. */
export default function Season({ part }: { part: PartId }) {
  const user = useUser();
  const { account, admin } = useAccount();
  const unlocked = hasStudyAccess(account, admin);
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const meta = PARTS.find((p) => p.id === part)!;
  const season = SEASONS[part];
  const ready = episodes(part);
  const total = STUDY_OUTLINE[part].reduce((n, d) => n + d.topics.length, 0);

  const anyOpen = unlocked || part === FREE_UNIT.part;

  useEffect(() => {
    if (!anyOpen) return;
    listNotes(user.uid)
      .then(setNotes)
      .catch(() => setNotes([]));
  }, [anyOpen, user.uid]);

  return (
    <>
      <TopBar back={{ to: "/study", label: "Study" }} />
      <main className="page">
        <header className="season-head">
          <div className="stack" style={{ gap: 8 }}>
            <span className="eyebrow">
              Ledger Falls · Season {season.number}: {season.name}
            </span>
            <h1>{meta.title}</h1>
            <p className="muted" style={{ fontSize: 17 }}>
              {season.blurb} One episode per exam topic: a comic, the rules one picture at a time, a memory hook, trap alerts, and a game of Ace vs. Hoot to finish.
            </p>
            <div className="row" style={{ gap: 8 }}>
              <Chip tone={ready.length ? "good" : undefined}>
                {ready.length} of {total} episodes ready
              </Chip>
              {ready[0] && (
                <Link className="btn btn-primary" to={`/study/${ready[0].id}`}>
                  Start with episode {ready[0].number}
                </Link>
              )}
            </div>
          </div>
          {(part === "part1" || part === "part3") && (
            <div className="cast-art">{part === "part1" ? <FamilyPortrait /> : <PracticePortrait />}</div>
          )}
        </header>

        {!unlocked && (
          <div className="panel row spread">
            <span>
              {part === FREE_UNIT.part ? (
                <>
                  Unit 1 is free. The other units are part of <strong>Pro</strong> and <strong>Pro Max</strong>; you can watch the opening comic of each episode.
                </>
              ) : (
                <>
                  This season is part of <strong>Pro</strong> and <strong>Pro Max</strong>. You can watch the opening comic of each episode. Season 1, Unit 1 is free.
                </>
              )}
            </span>
            <Link className="btn btn-primary" to="/upgrade">
              See plans
            </Link>
          </div>
        )}

        <MeetTheCast part={part} />

        {STUDY_OUTLINE[part].map((d, ui) => {
          const live = d.topics.filter((t) => t.lessonId && LESSONS[t.lessonId]);
          const open = canOpenUnit(part, d.id, account, admin);
          return (
            <section key={d.id} className="stack" aria-labelledby={`unit-${d.id}`}>
              <div className="stack" style={{ gap: 2 }}>
                <span className="eyebrow">Unit {ui + 1}</span>
                <h2 id={`unit-${d.id}`} className="row" style={{ gap: 8 }}>
                  {domainName(d.id)}
                  {!unlocked && (open ? <Chip tone="good">Free</Chip> : <Chip>Pro</Chip>)}
                </h2>
              </div>
              <div className="episode-grid">
                {d.topics.map((t) => {
                  const l = t.lessonId ? LESSONS[t.lessonId] : undefined;
                  if (!l) {
                    return (
                      <div key={t.number} className="episode soon">
                        <span className="mono episode-num">{t.number}</span>
                        <span className="episode-topic">{t.title}</span>
                        <span className="muted" style={{ fontSize: 13 }}>
                          Coming soon
                        </span>
                      </div>
                    );
                  }
                  const best = bestScore(l.id);
                  const note = notes.find((n) => n.lessonId === l.id);
                  return (
                    <Link key={t.number} to={`/study/${l.id}`} className="episode">
                      <span className="row spread" style={{ gap: 6 }}>
                        <span className="mono episode-num">Episode {t.number}</span>
                        <span className="row" style={{ gap: 4 }}>
                          {[...new Set(l.cases.map((c) => c.who))].slice(0, 3).map((w) => (
                              <Face key={w} who={w} size={30} />
                            ))}
                        </span>
                      </span>
                      <strong className="episode-title">{l.episode}</strong>
                      <span className="episode-topic">{t.title}</span>
                      <span className="muted" style={{ fontSize: 14 }}>
                        {t.subtopics}
                      </span>
                      <span className="row" style={{ gap: 6, marginTop: "auto" }}>
                        <Chip>{l.minutes} min</Chip>
                        {!open && <Chip>🔒 Comic preview</Chip>}
                        {best && (
                          <Chip tone={best.right * 2 > best.total ? "good" : "miss"}>
                            🏆 {best.right}/{best.total} cases
                          </Chip>
                        )}
                        {note?.confidence === "got" && <Chip tone="good">Got it</Chip>}
                        {note?.confidence === "shaky" && <Chip tone="miss">Shaky</Chip>}
                      </span>
                    </Link>
                  );
                })}
              </div>
              {live.length > 0 && (open ? <UnitQuiz part={part} domainId={d.id} unit={ui + 1} complete={live.length === d.topics.length} /> : <LockedUnit unit={ui + 1} />)}
            </section>
          );
        })}
      </main>
    </>
  );
}

/** The end of a unit a free account can't open: what Pro adds, and the way to get it. */
function LockedUnit({ unit }: { unit: number }) {
  return (
    <aside className="panel row spread locked-unit">
      <span>
        🔒 Unit {unit} is on <strong>Pro</strong>: every episode in full, the rule cards, Ace vs. Hoot cases, your notes and Hoot's Unit {unit} exam.
      </span>
      <Link className="btn btn-primary" to="/upgrade">
        Unlock with Pro
      </Link>
    </aside>
  );
}

/** The end of a unit: Hoot's unit exam, built by the deck builder as cast case files, or bank practice. */
function UnitQuiz({ part, domainId, unit, complete }: { part: PartId; domainId: string; unit: number; complete: boolean }) {
  const topic = UNIT_QUIZ[domainId] ?? `${PARTS.find((p) => p.id === part)!.short}, ${domainName(domainId)}`;
  return (
    <aside className="panel unit-quiz" aria-labelledby={`uq-${domainId}`}>
      <svg viewBox="0 0 120 120" aria-hidden className="unit-quiz-art">
        <rect width={120} height={120} rx={14} fill="#eaf6ef" />
        <Hoot x={60} y={52} scale={0.5} mood="smug" clipboard pose="point" />
      </svg>
      <div className="stack" style={{ gap: 8 }}>
        <span className="eyebrow">End of unit {unit}</span>
        <h3 id={`uq-${domainId}`} style={{ fontSize: 20 }}>
          Hoot's Unit {unit} exam
        </h3>
        <p>
          {complete ? "You've seen every episode in this unit." : "Finished the episodes so far?"} Have Claude write a fresh quiz on the rules from this unit, with every question a case about the Ledger Falls cast. It tests the tax
          rules, never the cartoons.
        </p>
        <div className="row">
          {canBuildDecks ? (
            <Link className="btn btn-primary" to={quizLink(part, topic)}>
              Build my Unit {unit} quiz
            </Link>
          ) : (
            <span className="muted" style={{ fontSize: 14 }}>
              Building quizzes needs the online app.
            </span>
          )}
          <Link className="btn" to={`/decks/${part}/practice?domain=${domainId}`}>
            Practice Unit {unit} bank questions
          </Link>
        </div>
      </div>
    </aside>
  );
}

/** "Meet the cast" before a season's first unit: who's who this season, with links to each character's big episodes. */
function MeetTheCast({ part }: { part: PartId }) {
  const sc = SEASON_CAST[part];
  if (!sc) return null;
  const byNumber = new Map(episodes(part).map((l) => [l.number, l]));
  const epLinks = (nums: string[]) =>
    nums.map((n) => {
      const l = byNumber.get(n);
      return l ? (
        <Link key={n} className="cast-ep" to={`/study/${l.id}`} title={l.episode}>
          {n}
        </Link>
      ) : (
        <span key={n} className="cast-ep">
          {n}
        </span>
      );
    });
  return (
    <section className="panel stack meet-cast" aria-labelledby="cast-h">
      <div className="stack" style={{ gap: 4 }}>
        <span className="eyebrow">Before episode 1.1</span>
        <h2 id="cast-h">Meet the cast</h2>
        <p className="muted">{sc.intro}</p>
      </div>
      <div className="cast-grid">
        {sc.cast.map((m) => {
          const c = castCard(m);
          return (
            <div key={c.who} className="cast-member">
              <Face who={c.who} size={64} />
              <div className="stack" style={{ gap: 4 }}>
                <strong>{c.name}</strong>
                <span className="cast-role">{c.role}</span>
                <span className="muted" style={{ fontSize: 14 }}>{c.line}</span>
                <span style={{ fontSize: 14 }}>{c.arc}</span>
                {c.spotlight.length > 0 && (
                  <span className="row" style={{ gap: 4, fontSize: 13 }}>
                    <span className="muted">Big episodes:</span> {epLinks(c.spotlight)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {sc.guests.length > 0 && (
        <div className="stack" style={{ gap: 6 }}>
          <h3 style={{ fontSize: 16 }}>Also in Ledger Falls</h3>
          <ul className="cast-guests">
            {sc.guests.map((g) => (
              <li key={g.name}>
                <strong>{g.name}</strong>: {g.note} <span className="row" style={{ display: "inline-flex", gap: 4 }}>{epLinks(g.episodes)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

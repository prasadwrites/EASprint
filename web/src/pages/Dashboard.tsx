import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAccount, useUser } from "../App";
import TopBar, { Chip, Icon } from "../components/TopBar";
import { DECKS, domainName, partOfDomain } from "../data";
import { EXAM } from "../data/exam";
import { listSessions } from "../lib/db";
import { limitsFor } from "../lib/account";
import { canBuildDecks, deleteDeck, DELETE_WARNING, listMyDecks, listSharedDecks } from "../lib/decks";
import { paceSummary, weakestConcepts } from "../lib/insights";
import { formatClock } from "../lib/pace";
import type { Deck, PracticeSession } from "../lib/types";

const PART_SHORT = { part1: "Part 1", part2: "Part 2", part3: "Part 3" } as const;

const tone = (pct: number) => (pct >= 80 ? "good" : pct >= 60 ? "warn" : "bad");

function formatHours(sec: number) {
  if (sec > 0 && sec < 60) return `${Math.round(sec)}s`;
  const m = Math.round(sec / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
}

export default function Dashboard() {
  const user = useUser();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { account, admin } = useAccount();
  const limits = limitsFor(account, admin);
  const [sessions, setSessions] = useState<PracticeSession[] | null>(null);
  const [myDecks, setMyDecks] = useState<Deck[]>([]);
  const [sharedDecks, setSharedDecks] = useState<Deck[]>([]);
  const [topic, setTopic] = useState("");
  const [deleting, setDeleting] = useState("");

  const remove = async (deck: Deck) => {
    if (!window.confirm(`${deck.title}\n\n${DELETE_WARNING}`)) return;
    setDeleting(deck.id);
    try {
      await deleteDeck(deck.id);
      setMyDecks((all) => all.filter((x) => x.id !== deck.id));
      listSessions(user.uid).then(setSessions);
    } catch (e) {
      window.alert((e as Error).message || "The deck couldn't be deleted. Try again.");
    } finally {
      setDeleting("");
    }
  };

  useEffect(() => {
    listSessions(user.uid).then(setSessions);
    listMyDecks(user.uid).then(setMyDecks);
    listSharedDecks(user.uid).then(setSharedDecks).catch(() => setSharedDecks([]));
  }, [user.uid]);

  useEffect(() => {
    if (hash && sessions) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash, sessions]);

  const done = sessions ?? [];
  const answered = done.reduce((a, s) => a + s.questionIds.length, 0);
  const correct = done.reduce((a, s) => a + (s.score ?? 0), 0);
  const seconds = done.reduce((a, s) => a + (s.usedSec ?? 0), 0);
  const pace = paceSummary(done);
  const weak = weakestConcepts(done);
  const best = (deckId: string) => {
    const scores = done.filter((s) => s.deckId === deckId).map((s) => Math.round((s.accuracy ?? 0) * 100));
    return scores.length ? Math.max(...scores) : null;
  };

  return (
    <>
      <TopBar />
      <main className="page">
        <section className="stack">
          <h1 style={{ fontSize: "clamp(30px, 5vw, 40px)" }}>Which part are you studying?</h1>
          <p className="muted" style={{ maxWidth: 720 }}>
            Practice questions for all three parts of the Special Enrollment Examination, written to tax law through {EXAM.taxLawThrough} (tax year {EXAM.taxYear}), the law
            tested in the {EXAM.window} window. Every answer comes with an explanation and a link to the IRS source.
          </p>
          {canBuildDecks && (
            <form
              className="create-form"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/create${topic.trim() ? `?topic=${encodeURIComponent(topic.trim())}` : ""}`);
              }}
            >
              <div>
                <label htmlFor="topic">Build a practice deck with Claude</label>
                <input id="topic" type="text" placeholder="Try “Head of household rules” or “Circular 230 conflicts of interest”" value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>
              <button className="btn btn-primary btn-big" type="submit">
                <Icon name="play" /> Build my deck
              </button>
            </form>
          )}
        </section>

        <section className="stack" id="parts">
          <h2>Exam parts</h2>
          <div className="decks" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {DECKS.map((d) => {
              const b = best(d.id);
              return (
                <article key={d.id} className="panel deck-card">
                  <div>
                    <h3>{d.title}</h3>
                    <div className="meta">
                      {d.questionCount} questions · {d.domains.length} domains
                    </div>
                  </div>
                  <p style={{ fontSize: 15, flexGrow: 1 }}>{d.summary}</p>
                  <div className="row" style={{ flexWrap: "nowrap" }}>
                    <div className="bar">
                      <i style={{ width: `${b ?? 0}%`, background: `var(--${b === null ? "muted" : tone(b)})` }} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", color: `var(--${b === null ? "muted" : tone(b)})` }}>
                      {b === null ? "New" : `Best ${b}%`}
                    </span>
                  </div>
                  <div className="row">
                    <Link className="btn btn-primary" style={{ flexGrow: 1 }} to={`/decks/${d.id}/practice`}>
                      Practice
                    </Link>
                    <Link className="btn" to={`/decks/${d.id}`}>
                      Review
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {canBuildDecks && (
          <section className="stack" id="decks">
            <div className="row spread">
              <h2>Your decks</h2>
              <span className="muted">
                {admin ? `${myDecks.length} decks · admin` : `${account?.decksCreated ?? 0} of ${limits.maxDecks} decks used on the ${limits.name} plan`}
              </span>
            </div>
            {myDecks.length === 0 ? (
              <div className="panel">
                <p>You haven't built a deck yet. Ask Claude for one on any topic above, and it shows up here.</p>
              </div>
            ) : (
              <div className="decks">
                {myDecks.map((d) => {
                  const b = best(d.id);
                  return (
                    <article key={d.id} className="panel deck-card">
                      <div>
                        <h3>{d.title}</h3>
                        <div className="meta">
                          {PART_SHORT[d.part]} · {d.difficulty} · {d.questionCount} questions
                        </div>
                        {d.status === "generating" && <Chip tone="warn">Building {d.progress ?? 0} / {d.requested}</Chip>}
                        {d.status === "failed" && <Chip tone="bad">Couldn't be built</Chip>}
                        {Object.keys(d.sharedEmails ?? {}).length > 0 && <Chip>Shared with {Object.keys(d.sharedEmails ?? {}).length}</Chip>}
                      </div>
                      <div className="row" style={{ flexWrap: "nowrap" }}>
                        <div className="bar">
                          <i style={{ width: `${b ?? 0}%`, background: `var(--${b === null ? "muted" : tone(b)})` }} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", color: `var(--${b === null ? "muted" : tone(b)})` }}>
                          {b === null ? "New" : `Best ${b}%`}
                        </span>
                      </div>
                      <div className="row">
                        <Link className="btn btn-primary" style={{ flexGrow: 1 }} to={`/decks/${d.id}/practice`}>
                          Practice
                        </Link>
                        <Link className="btn" to={`/decks/${d.id}`}>
                          Review
                        </Link>
                        <button
                          type="button"
                          className="btn"
                          aria-label={`Delete ${d.title}`}
                          disabled={deleting === d.id || d.status === "generating"}
                          title={d.status === "generating" ? "Wait until the deck finishes building" : undefined}
                          style={{ color: "var(--bad)" }}
                          onClick={() => remove(d)}
                        >
                          {deleting === d.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {sharedDecks.length > 0 && (
          <section className="stack" id="shared">
            <h2>Shared with you</h2>
            <div className="decks">
              {sharedDecks.map((d) => {
                const b = best(d.id);
                return (
                  <article key={d.id} className="panel deck-card">
                    <div>
                      <h3>{d.title}</h3>
                      <div className="meta">
                        {PART_SHORT[d.part]} · {d.questionCount} questions{d.ownerEmail ? ` · from ${d.ownerEmail}` : ""}
                      </div>
                    </div>
                    <div className="row" style={{ flexWrap: "nowrap" }}>
                      <div className="bar">
                        <i style={{ width: `${b ?? 0}%`, background: `var(--${b === null ? "muted" : tone(b)})` }} />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", color: `var(--${b === null ? "muted" : tone(b)})` }}>
                        {b === null ? "New" : `Best ${b}%`}
                      </span>
                    </div>
                    <div className="row">
                      <Link className="btn btn-primary" style={{ flexGrow: 1 }} to={`/decks/${d.id}/practice`}>
                        Practice
                      </Link>
                      <Link className="btn" to={`/decks/${d.id}`}>
                        Review
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <section className="tiles" id="progress" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <div className="panel stack">
            <h2>Your progress</h2>
            <div className="stats" style={{ padding: 0, border: "none" }}>
              <div className="stat">
                <b>{answered}</b>
                <span>questions</span>
              </div>
              <div className="stat">
                <b>{answered ? `${Math.round((correct / answered) * 100)}%` : "–"}</b>
                <span>accuracy</span>
              </div>
              <div className="stat">
                <b>{formatHours(seconds)}</b>
                <span>practice time</span>
              </div>
            </div>
            {pace ? (
              <div className="stack" style={{ gap: 8 }}>
                <div className="row spread" style={{ fontSize: 15 }}>
                  <span>Your pace</span>
                  <span className="mono">{formatClock(pace.avg)} / question</span>
                </div>
                <div className="track" style={{ height: 10 }}>
                  <div className="fill" style={{ width: `${Math.min(100, (pace.avg / Math.max(pace.avg, pace.target)) * 100)}%`, background: pace.avg <= pace.target ? "var(--good)" : "var(--warn)" }} />
                  <div className="target" style={{ left: `calc(${Math.min(100, (pace.target / Math.max(pace.avg, pace.target)) * 100)}% - 1px)` }} />
                </div>
                <span className="muted" style={{ fontSize: 14, paddingTop: 14 }}>
                  {pace.avg <= pace.target
                    ? `${Math.round((1 - pace.avg / pace.target) * 100)}% faster than your ${formatClock(pace.target)} target`
                    : `${Math.round((pace.avg / pace.target - 1) * 100)}% slower than your ${formatClock(pace.target)} target`}
                </span>
              </div>
            ) : (
              <p className="muted">
                Finish a timed practice to see your pace here. The real exam allows {formatClock(EXAM.secondsPerQuestion)} per question.
              </p>
            )}
          </div>
          <div className="panel stack">
            <div className="row spread">
              <h2>Practice next</h2>
              <Chip>From your sessions</Chip>
            </div>
            {weak.length ? (
              <ul className="weak" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {weak.map((w) => (
                  <li key={w.concept} style={{ alignItems: "center" }}>
                    <Link to={`/decks/${partOfDomain(w.concept)}/practice?domain=${w.concept}`}>{domainName(w.concept)}</Link>
                    <b style={{ color: `var(--${tone(w.accuracy * 100)})` }}>{Math.round(w.accuracy * 100)}%</b>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">After a few sessions, the exam domains you find hardest will show up here so you can target them.</p>
            )}
          </div>
        </section>

        <p className="note">
          EASprint is a study aid and is not affiliated with the IRS. Check the linked IRS source before relying on any figure, because amounts change from year to year.
        </p>
      </main>
    </>
  );
}

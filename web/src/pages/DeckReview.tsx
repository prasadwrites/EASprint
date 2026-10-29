import { useEffect, useState } from "react";
import { useUser } from "../App";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import TopBar, { Chip, Icon } from "../components/TopBar";
import { EXAM, sourceOf } from "../data/exam";
import { deleteDeck, DELETE_WARNING, loadDeck, loadQuestions, shareDeck, unshareDeck, watchDeck } from "../lib/decks";
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
  const [deleting, setDeleting] = useState(false);
  const user = useUser();
  const [shareEmail, setShareEmail] = useState("");
  const [shareBusy, setShareBusy] = useState(false);
  const [shareMsg, setShareMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [now, setNow] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([loadDeck(deckId), loadQuestions(deckId)]).then(([d, qs]) => {
      setQuestions(qs);
      setDeck(d);
    });
    // A deck Claude is still building updates live, and its questions appear as each batch is saved.
    return watchDeck(deckId, (d) => {
      setDeck(d);
      loadQuestions(deckId).then(setQuestions);
    });
  }, [deckId]);

  // Ticks the elapsed-time readout while the deck builds.
  const building = deck?.status === "generating";
  useEffect(() => {
    if (!building) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [building]);

  const toggle = (id: string) =>
    setOpen((o) => {
      const next = new Set(o);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const back = { to: "/#parts", label: "Home" };
  if (deck === undefined) return <><TopBar back={back} /><main className="page"><span className="spinner" /></main></>;
  if (deck === null) return <><TopBar back={back} /><main className="page"><p>That deck doesn't exist or isn't yours.</p></main></>;

  const ai = deck.source === "ai";
  const mine = ai && deck.ownerId === user.uid;
  const shared = Object.entries(deck.sharedEmails ?? {});

  const share = async () => {
    setShareBusy(true);
    setShareMsg(null);
    try {
      const res = await shareDeck(deck.id, shareEmail.trim());
      setShareEmail("");
      setShareMsg({ ok: true, text: `Shared with ${res.email}. It now appears under "Shared with you" on their home page.` });
    } catch (e) {
      setShareMsg({ ok: false, text: (e as Error).message || "The deck couldn't be shared. Try again." });
    } finally {
      setShareBusy(false);
    }
  };
  const generating = deck.status === "generating";
  const requested = deck.requested || deck.questionCount;
  const dropped = Math.max(0, requested - questions.length);
  const done = Math.min(requested, deck.progress ?? 0);
  const spread = LEVELS.map(([l, c]) => ({ l, c, n: questions.filter((q) => q.difficulty === l).length }));
  const cited = [...new Map(questions.map((q) => sourceOf(q)).map((s) => [s.url, s])).values()].sort((a, b) => a.title.localeCompare(b.title));
  const examTotal = deck.domains.reduce((a, d) => a + d.examQuestions, 0);
  const domains = ai ? deck.domains.filter((d) => questions.some((q) => q.domain === d.id)) : deck.domains;

  return (
    <>
      <TopBar back={back} />
      <main className="page narrow">
        <div className="stack">
          {generating && (
            <div className="panel stack" aria-live="polite">
              <div className="row" style={{ gap: 10, flexWrap: "nowrap" }}>
                <span className="spinner" style={{ flex: "none" }} />
                <h2>Generating your deck in the background</h2>
              </div>
              <p className="muted">
                This takes a few minutes, longer for big decks, because every question is written, then answered blind by a separate check and verified against irs.gov.
                You can leave this page; the deck keeps building.
              </p>
              <div className="row spread">
                <strong>
                  {done} of {requested} questions generated
                </strong>
                {deck.createdAt && <span className="mono muted">{formatClock((now - deck.createdAt.getTime()) / 1000)} elapsed</span>}
              </div>
              <div className="track">
                <div className="fill busy" style={{ width: `${Math.max(3, (100 * done) / Math.max(1, requested))}%` }} />
              </div>
              {questions.length >= 3 && <p className="muted">You can already practice the {questions.length} questions that are ready.</p>}
            </div>
          )}
          {deck.status === "failed" && (
            <div className="verdict bad">
              <h3>This deck couldn't be built</h3>
              <p>{deck.error || "Something went wrong."} It doesn't count toward your plan's deck limit.</p>
            </div>
          )}
          {ai && deck.status === "ready" && params.get("fresh") && (
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
          {ai && !mine && <p>Shared with you{deck.ownerEmail ? ` by ${deck.ownerEmail}` : ""}.</p>}
          {ai && !!deck.topics?.length && (
            <div className="row">
              {deck.topics.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          )}
          <div className="row">
            <Link className="btn btn-primary btn-big" to={`/decks/${deck.id}/practice`} style={questions.length ? undefined : { pointerEvents: "none", opacity: 0.5 }}>
              <Icon name="play" /> Start practice
            </Link>
            {mine && (
              <button
                type="button"
                className="btn btn-big"
                disabled={deleting || generating}
                title={generating ? "Wait until the deck finishes building" : undefined}
                style={{ color: "var(--bad)" }}
                onClick={async () => {
                  if (!window.confirm(DELETE_WARNING)) return;
                  setDeleting(true);
                  try {
                    await deleteDeck(deck.id);
                    navigate("/#decks", { replace: true });
                  } catch (e) {
                    window.alert((e as Error).message || "The deck couldn't be deleted. Try again.");
                    setDeleting(false);
                  }
                }}
              >
                {deleting ? "Deleting…" : "Delete deck"}
              </button>
            )}
          </div>
        </div>

        {mine && deck.status !== "failed" && (
          <div className="panel stack">
            <h2>Share this deck</h2>
            <p className="muted">Anyone who has signed up to EASprint can practice it. Enter the email address they signed up with.</p>
            <form
              className="row"
              onSubmit={(e) => {
                e.preventDefault();
                if (shareEmail.trim()) share();
              }}
            >
              <input
                type="text"
                inputMode="email"
                aria-label="Email address to share with"
                placeholder="name@example.com"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                style={{ flex: "1 1 240px", minWidth: 0, maxWidth: 360 }}
              />
              <button className="btn btn-primary" type="submit" disabled={shareBusy || !shareEmail.trim()}>
                {shareBusy ? "Sharing…" : "Share"}
              </button>
            </form>
            {shareMsg && <p className={shareMsg.ok ? "muted" : "error"}>{shareMsg.text}</p>}
            {shared.length > 0 && (
              <ul className="checks" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {shared.map(([uid, email]) => (
                  <li key={uid} className="row spread">
                    <span>{email}</span>
                    <button
                      type="button"
                      className="btn-link"
                      style={{ color: "var(--bad)" }}
                      onClick={async () => {
                        try {
                          await unshareDeck(deck.id, uid);
                        } catch (e) {
                          setShareMsg({ ok: false, text: (e as Error).message || "Couldn't stop sharing. Try again." });
                        }
                      }}
                    >
                      Stop sharing
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

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
            <span className="muted">Tap a question to read it in full. Answers stay hidden until after you practice</span>
          </div>
          <ul className="qlist" style={{ marginTop: 12 }}>
            {questions.map((q, i) => {
              const expanded = open.has(q.id);
              return (
                <li key={q.id} className={expanded ? "open" : undefined}>
                  <button type="button" className="qrow" aria-expanded={expanded} onClick={() => toggle(q.id)}>
                    <span className="n">{i + 1}</span>
                    <span className="q">{q.prompt}</span>
                    <span className="row" style={{ gap: 6, justifyContent: "flex-end", flexWrap: "nowrap" }}>
                      <Chip>{q.topic}</Chip>
                      <Chip tone={q.difficulty === "Hard" ? "miss" : "neutral"}>{q.difficulty}</Chip>
                      <span className="caret" aria-hidden>
                        ▾
                      </span>
                    </span>
                  </button>
                  {expanded && (
                    <ul className="qchoices">
                      {q.choices.map((c, k) => (
                        <li key={c}>
                          <b>{String.fromCharCode(65 + k)}.</b> {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
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

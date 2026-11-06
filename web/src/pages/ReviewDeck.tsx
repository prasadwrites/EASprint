import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAccount, useUser } from "../App";
import AddToReviewDeck from "../components/AddToReviewDeck";
import Explanation from "../components/Explanation";
import PublicLinkPanel from "../components/PublicLinkPanel";
import TopBar, { Chip, Icon } from "../components/TopBar";
import { domainName } from "../data";
import { deleteReviewDeck, getReviewDeck, loadReviewQuestions, MAX_NAME, removeFromReviewDeck, renameReviewDeck, type ReviewDeck as RD } from "../lib/reviewDecks";
import type { Question } from "../lib/types";

const PART_SHORT = { part1: "Part 1", part2: "Part 2", part3: "Part 3" } as const;

export const REVIEW_DELETE_WARNING = "Delete this review deck? The questions stay in the decks they came from; only this collection is removed.";

/** One of the candidate's review decks: the questions they saved, with answers, ready to practice. */
export default function ReviewDeck() {
  const { deckId = "" } = useParams();
  const user = useUser();
  const { admin } = useAccount();
  const navigate = useNavigate();
  const [deck, setDeck] = useState<RD | null | undefined>(undefined);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  const reload = () =>
    Promise.all([getReviewDeck(deckId), loadReviewQuestions(deckId)]).then(([d, qs]) => {
      setDeck(d && d.ownerId === user.uid ? d : null);
      setQuestions(qs);
    });

  useEffect(() => {
    reload().catch(() => setDeck(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId, user.uid]);

  const back = { to: "/#review", label: "Home" };
  if (deck === undefined) return <><TopBar back={back} /><main className="page"><span className="spinner" /></main></>;
  if (deck === null) return <><TopBar back={back} /><main className="page"><p>That review deck doesn't exist or isn't yours.</p></main></>;

  const run = async (what: string, fn: () => Promise<void>) => {
    setBusy(what);
    setError("");
    try {
      await fn();
    } catch (e) {
      setError((e as Error).message || "That didn't work. Try again.");
    } finally {
      setBusy("");
    }
  };

  const rename = () =>
    run("rename", async () => {
      await renameReviewDeck(deck.id, name);
      setRenaming(false);
      await reload();
    });

  const remove = (q: Question) =>
    run(q.id, async () => {
      await removeFromReviewDeck(deck.id, q.id);
      setQuestions((all) => all.filter((x) => x.id !== q.id));
      setDeck({ ...deck, questionKeys: deck.questionKeys.filter((k) => k !== q.id) });
    });

  const destroy = () => {
    if (!window.confirm(`${deck.name}\n\n${REVIEW_DELETE_WARNING}`)) return;
    run("delete", async () => {
      await deleteReviewDeck(deck.id);
      navigate("/#review", { replace: true });
    });
  };

  return (
    <>
      <TopBar back={back} />
      <main className="page narrow">
        <div className="stack">
          <div>
            <div className="eyebrow">
              Review deck · {questions.length} question{questions.length === 1 ? "" : "s"}
              {deck.createdAt && ` · Created ${deck.createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`}
            </div>
            {renaming ? (
              <form
                className="row"
                style={{ marginTop: 6 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (name.trim()) rename();
                }}
              >
                <input type="text" aria-label="Review deck name" autoFocus maxLength={MAX_NAME} value={name} onChange={(e) => setName(e.target.value)} style={{ flex: "1 1 240px", minWidth: 0, maxWidth: 420 }} />
                <button className="btn btn-primary" type="submit" disabled={!name.trim() || busy === "rename"}>
                  {busy === "rename" ? "Saving…" : "Save"}
                </button>
                <button className="btn" type="button" onClick={() => setRenaming(false)}>
                  Cancel
                </button>
              </form>
            ) : (
              <h1>{deck.name}</h1>
            )}
          </div>
          <p className="muted">Questions you saved to come back to. Practice them like any deck, or read each answer below.</p>
          <div className="row">
            <Link className="btn btn-primary btn-big" to={`/decks/${deck.id}/practice`} style={questions.length ? undefined : { pointerEvents: "none", opacity: 0.5 }} aria-disabled={!questions.length}>
              <Icon name="play" /> Start practice
            </Link>
            {!renaming && (
              <button
                type="button"
                className="btn btn-big"
                onClick={() => {
                  setName(deck.name);
                  setRenaming(true);
                }}
              >
                Rename
              </button>
            )}
            <button type="button" className="btn btn-big" style={{ color: "var(--bad)" }} disabled={busy === "delete"} onClick={destroy}>
              {busy === "delete" ? "Deleting…" : "Delete deck"}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>

        {admin && questions.length > 0 && <PublicLinkPanel deckId={deck.id} />}

        <section className="panel">
          <h2>Questions</h2>
          {questions.length === 0 ? (
            <p className="muted" style={{ marginTop: 8 }}>
              This deck is empty. Use “Add to review deck” on any question, in a deck, during practice or on your results, to save it here.
            </p>
          ) : (
            questions.map((q, i) => (
              <div className="review-item" key={q.id}>
                <div className="review-head">
                  <h3>Question {i + 1}</h3>
                  <span className="row" style={{ gap: 6 }}>
                    <Chip>{PART_SHORT[q.part] ?? q.part}</Chip>
                    <Chip>{q.topic || domainName(q.domain)}</Chip>
                  </span>
                </div>
                <div>{q.prompt}</div>
                <details>
                  <summary>Show answer and explanation</summary>
                  <div style={{ marginTop: 10 }}>
                    <Explanation question={q} picked="" />
                  </div>
                </details>
                <div className="row">
                  <AddToReviewDeck deckId={deck.id} question={q} className="btn btn-small" />
                  <button type="button" className="btn btn-small" style={{ color: "var(--bad)" }} disabled={busy === q.id} onClick={() => remove(q)}>
                    {busy === q.id ? "Removing…" : "Remove"}
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  );
}

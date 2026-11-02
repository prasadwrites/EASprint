import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../App";
import { addToReviewDeck, createReviewDeck, listReviewDecks, MAX_NAME, questionKey, type ReviewDeck } from "../lib/reviewDecks";
import type { Question } from "../lib/types";
import { Icon } from "./TopBar";

type Done = { id: string; name: string; created: boolean };

/**
 * "Add to review deck" for one question. With no review decks yet it asks for a name and creates the first one
 * with this question in it; otherwise it lists the candidate's review decks, with an option to start a new one.
 */
export default function AddToReviewDeck({ deckId, question, className = "btn" }: { deckId: string; question: Question; className?: string }) {
  const user = useUser();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [decks, setDecks] = useState<ReviewDeck[] | null>(null);
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const key = questionKey(deckId, question);
  // The review deck this question is being viewed in is not offered as a place to add it.
  const here = deckId;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal?.();
    if (!open && d.open) d.close?.();
  }, [open]);

  const show = async () => {
    setOpen(true);
    setDone(null);
    setError("");
    setName("");
    setDecks(null);
    try {
      const all = await listReviewDecks(user.uid);
      setDecks(all);
      setNaming(all.filter((d) => d.id !== here).length === 0);
    } catch (e) {
      setDecks([]);
      setError((e as Error).message || "Your review decks couldn't be loaded. Try again.");
    }
  };

  const addTo = async (d: ReviewDeck) => {
    setBusy(d.id);
    setError("");
    try {
      await addToReviewDeck(d.id, deckId, question);
      setDone({ id: d.id, name: d.name, created: false });
    } catch (e) {
      setError((e as Error).message || "The question couldn't be added. Try again.");
    } finally {
      setBusy("");
    }
  };

  const create = async () => {
    setBusy("new");
    setError("");
    try {
      const id = await createReviewDeck(user.uid, name, { deckId, question });
      setDone({ id, name: name.trim(), created: true });
    } catch (e) {
      setError((e as Error).message || "The deck couldn't be created. Try again.");
    } finally {
      setBusy("");
    }
  };

  const others = (decks ?? []).filter((d) => d.id !== here);

  return (
    <>
      <button type="button" className={className} onClick={show}>
        + Add to review deck
      </button>
      <dialog ref={dialog} className="sheet" aria-labelledby="rd-title" onClose={() => setOpen(false)} onCancel={() => setOpen(false)}>
        {open && (
          <div className="stack" style={{ gap: 14 }}>
            {done ? (
              <>
                <h2 id="rd-title">
                  <Icon name="check" /> {done.created ? `Created “${done.name}”` : `Added to “${done.name}”`}
                </h2>
                <p className="muted">{done.created ? "Your new review deck has this question in it." : "You can practice it from your review deck any time."}</p>
                <div className="row">
                  <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>
                    Done
                  </button>
                  <Link className="btn" to={`/decks/${done.id}`}>
                    Open review deck
                  </Link>
                </div>
              </>
            ) : decks === null ? (
              <>
                <h2 id="rd-title">Add to review deck</h2>
                <span className="spinner" />
              </>
            ) : (
              <>
                <h2 id="rd-title">{others.length ? "Add to review deck" : "Create a review deck"}</h2>
                {others.length > 0 && (
                  <ul className="rd-list" aria-label="Your review decks">
                    {others.map((d) => {
                      const has = d.questionKeys.includes(key);
                      return (
                        <li key={d.id}>
                          <button type="button" disabled={has || !!busy} onClick={() => addTo(d)} aria-label={has ? `${d.name}, already has this question` : `Add to ${d.name}`}>
                            <span className="rd-name">{d.name}</span>
                            <span className="muted rd-count">
                              {has ? (
                                <>
                                  <Icon name="check" size={14} /> Added
                                </>
                              ) : busy === d.id ? (
                                "Adding…"
                              ) : (
                                `${d.questionKeys.length} question${d.questionKeys.length === 1 ? "" : "s"}`
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {naming ? (
                  <form
                    className="stack"
                    style={{ gap: 10 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (name.trim()) create();
                    }}
                  >
                    <div>
                      <label htmlFor="rd-name">{others.length ? "New review deck name" : "You don't have a review deck yet. What should this one be called?"}</label>
                      <input
                        id="rd-name"
                        type="text"
                        autoFocus
                        maxLength={MAX_NAME}
                        placeholder="Try “Depreciation to revisit”"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <button type="submit" className="btn btn-primary" disabled={!name.trim() || !!busy}>
                        {busy === "new" ? "Creating…" : "Create and add"}
                      </button>
                      <button type="button" className="btn" onClick={() => (others.length ? setNaming(false) : setOpen(false))}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="row spread">
                    <button type="button" className="btn-link" onClick={() => setNaming(true)}>
                      + New review deck
                    </button>
                    <button type="button" className="btn" onClick={() => setOpen(false)}>
                      Close
                    </button>
                  </div>
                )}
                {error && <p className="error">{error}</p>}
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

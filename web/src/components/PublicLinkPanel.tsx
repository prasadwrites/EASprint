import { useEffect, useState } from "react";
import { canSharePublicly, createPublicLink, disablePublicLink, getPublicLink, publicUrl, type PublicLink } from "../lib/publicTests";

/** Copies text, falling back to selecting it for browsers that block the clipboard. */
export async function copyText(text: string, input?: HTMLInputElement | null): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    input?.select();
    return false;
  }
}

export function LinkStats({ link }: { link: PublicLink }) {
  return (
    <span className="small muted">
      Opened {link.opens} time{link.opens === 1 ? "" : "s"} · finished {link.finishes} time{link.finishes === 1 ? "" : "s"}
    </span>
  );
}

/** Admin only: a public link to take this deck as a test, without signing in. */
export default function PublicLinkPanel({ deckId }: { deckId: string }) {
  const [link, setLink] = useState<PublicLink | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [input, setInput] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!canSharePublicly) return;
    getPublicLink(deckId).then(setLink, () => setLink(null));
  }, [deckId]);

  if (!canSharePublicly) return null;

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setMsg(null);
    try {
      await fn();
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message || "That didn't work. Try again." });
    } finally {
      setBusy(false);
    }
  };

  const url = link ? publicUrl(link.token) : "";

  return (
    <div className="panel stack">
      <h2>Public test link</h2>
      <p className="muted">
        Anyone with the link can take this deck as a test, without signing in, and see their score with explanations. Nothing about them is saved. Turn the
        link off at any time.
      </p>
      {link === undefined ? (
        <span className="spinner" />
      ) : link ? (
        <>
          <div className="row">
            <input
              ref={setInput}
              type="text"
              readOnly
              aria-label="Public test link"
              value={url}
              onFocus={(e) => e.target.select()}
              className="mono"
              style={{ flex: "1 1 280px", minWidth: 0, fontSize: 14 }}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={async () => setMsg((await copyText(url, input)) ? { ok: true, text: "Link copied." } : { ok: true, text: "Press Ctrl+C (or ⌘C) to copy the selected link." })}
            >
              Copy link
            </button>
          </div>
          <div className="row spread">
            <LinkStats link={link} />
            <span className="row" style={{ gap: 12 }}>
              <a href={url} target="_blank" rel="noreferrer" className="small">
                Open it
              </a>
              <button
                type="button"
                className="btn-link"
                style={{ color: "var(--bad)", fontSize: 14 }}
                disabled={busy}
                onClick={() =>
                  window.confirm("Turn off this link? Anyone who opens it after this sees that the test isn't available. You can make a new link later.") &&
                  run(async () => {
                    await disablePublicLink(link.token);
                    setLink(null);
                    setMsg({ ok: true, text: "Link turned off." });
                  })
                }
              >
                Turn off link
              </button>
            </span>
          </div>
        </>
      ) : (
        <div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={busy}
            onClick={() =>
              run(async () => {
                const made = await createPublicLink(deckId);
                setLink(made);
                const copied = await copyText(publicUrl(made.token));
                setMsg({ ok: true, text: copied ? "Link created and copied." : "Link created." });
              })
            }
          >
            {busy ? "Creating…" : "Get a public link"}
          </button>
        </div>
      )}
      {msg && (
        <p className={msg.ok ? "muted" : "error"} role="status">
          {msg.text}
        </p>
      )}
    </div>
  );
}

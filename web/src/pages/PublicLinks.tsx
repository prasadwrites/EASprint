import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LinkStats, copyText } from "../components/PublicLinkPanel";
import TopBar, { Chip } from "../components/TopBar";
import { date } from "../lib/admin";
import { disablePublicLink, listPublicLinks, publicUrl, type PublicLink } from "../lib/publicTests";
import { AdminTabs } from "./Admin";

const KIND = { builtin: "Exam part", ai: "Claude-built deck", review: "Review deck" } as const;

/** Admin: every public test link that is on, with how often each was opened and finished. */
export default function PublicLinks() {
  const [links, setLinks] = useState<PublicLink[] | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    listPublicLinks().then(setLinks, (e) => setError((e as Error).message || "Couldn't load the links."));
  }, []);

  return (
    <>
      <TopBar back={{ to: "/", label: "Home" }} />
      <main className="page">
        <AdminTabs />
        <div className="row spread">
          <h1>Public test links</h1>
          {links && <span className="muted">{links.length} on</span>}
        </div>
        <div className="panel stack">
          <p className="muted">
            Anyone with one of these links can take that deck as a test without signing in. To make a link, open a deck (an exam part, any Claude-built deck or one
            of your review decks) and use <b>Get a public link</b>.
          </p>
          {error && <p className="error">{error}</p>}
          {notice && !error && (
            <p className="muted" role="status">
              {notice}
            </p>
          )}
          {links === null && !error ? (
            <span className="spinner" />
          ) : links && links.length === 0 ? (
            <p className="muted">No public links are on.</p>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {(links ?? []).map((l) => (
                <li key={l.token} className="stack" style={{ borderTop: "1px solid var(--line)", paddingTop: 12, gap: 6 }}>
                  <div className="row spread">
                    <span className="row" style={{ gap: 8 }}>
                      <Link to={`/decks/${l.deckId}`}>
                        <b>{l.title}</b>
                      </Link>
                      <Chip>{KIND[l.kind] ?? l.kind}</Chip>
                    </span>
                    <span className="small muted">Made {date(l.createdAt)}</span>
                  </div>
                  <span className="mono small" style={{ wordBreak: "break-all" }}>
                    {publicUrl(l.token)}
                  </span>
                  <div className="row spread">
                    <LinkStats link={l} />
                    <span className="row" style={{ gap: 12 }}>
                      <button type="button" className="btn btn-small" onClick={async () => setNotice((await copyText(publicUrl(l.token))) ? "Link copied." : "Copy the link above by hand.")}>
                        Copy
                      </button>
                      <button
                        type="button"
                        className="btn btn-small btn-danger"
                        onClick={async () => {
                          if (!window.confirm(`Turn off the public link for ${l.title}?`)) return;
                          try {
                            await disablePublicLink(l.token);
                            setLinks((all) => all?.filter((x) => x.token !== l.token) ?? null);
                            setNotice("Link turned off.");
                          } catch (e) {
                            setError((e as Error).message || "That didn't work. Try again.");
                          }
                        }}
                      >
                        Turn off
                      </button>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

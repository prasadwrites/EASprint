import { useCallback, useEffect, useState } from "react";
import TopBar, { Chip } from "../components/TopBar";
import { when } from "../lib/admin";
import { adminReels, instagramSettings, reelAction, type AdminReel, type InstagramStatus, type ReelFormat, type ReelsPage } from "../lib/reels";
import { AdminTabs } from "./Admin";

const STATUS: Record<string, { label: string; tone?: "good" | "warn" | "bad" }> = {
  ready: { label: "Waiting for you", tone: "warn" },
  posting: { label: "Posting…" },
  posted: { label: "On Instagram", tone: "good" },
  skipped: { label: "Skipped" },
  failed: { label: "Didn't render", tone: "bad" },
};
const PART_LABELS: Record<string, string> = { part1: "Part 1", part2: "Part 2", part3: "Part 3" };

const message = (e: unknown) => (e instanceof Error ? e.message : "Something went wrong.");
const dayLabel = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

function Connection({ ig, onChange }: { ig: InstagramStatus; onChange: (s: InstagramStatus) => void }) {
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const run = async (change: Parameters<typeof instagramSettings>[0]) => {
    setBusy(true);
    setError("");
    try {
      onChange(await instagramSettings(change));
      setToken("");
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  };
  const daysLeft = ig.expiresAt ? Math.round((ig.expiresAt - Date.now()) / 86_400_000) : null;

  if (!ig.connected) {
    return (
      <div className="panel stack">
        <h2>Connect Instagram</h2>
        <p className="muted" style={{ fontSize: 14 }}>
          Paste a long-lived access token for EASprint's Instagram account (a Business or Creator account). You get it from your Meta app: Instagram, then API setup
          with Instagram login, then Generate token, with the instagram_business_basic and instagram_business_content_publish permissions. The token is kept where
          only the server can read it, and it is renewed automatically every week.
        </p>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            if (token.trim()) run({ token: token.trim() });
          }}
        >
          <input type="text" aria-label="Instagram access token" placeholder="IGAA…" value={token} onChange={(e) => setToken(e.target.value)} style={{ flex: "1 1 280px", width: "auto" }} autoComplete="off" />
          <button className="btn btn-primary" disabled={busy || !token.trim()}>
            {busy ? "Checking…" : "Connect"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }
  return (
    <div className="panel stack">
      <div className="row spread">
        <div className="row" style={{ gap: 8 }}>
          <h2>@{ig.username || "instagram"}</h2>
          <Chip tone="good">Connected</Chip>
        </div>
        <button
          type="button"
          className="btn-link"
          style={{ fontSize: 14 }}
          disabled={busy}
          onClick={() => confirm("Disconnect Instagram? Reels keep being made each morning, but nothing can be posted until you connect again.") && run({ disconnect: true })}
        >
          Disconnect
        </button>
      </div>
      <label className="row" style={{ gap: 10, alignItems: "flex-start" }}>
        <input type="checkbox" checked={ig.autoPost} disabled={busy} onChange={(e) => run({ autoPost: e.target.checked })} style={{ marginTop: 4 }} />
        <span>
          <b>Post automatically each morning</b>
          <span className="muted" style={{ display: "block", fontSize: 14 }}>
            {ig.autoPost
              ? "Each day's reel goes to Instagram at about 7am New York time without waiting for you."
              : "Off: each morning's reel waits here until you post it. Turn this on once you trust what it makes."}
          </span>
        </span>
      </label>
      <span className="small">
        {daysLeft !== null && (daysLeft > 7 ? `Access renews automatically. Current token lasts ${daysLeft} more days.` : `The token runs out in ${Math.max(0, daysLeft)} days.`)}
        {ig.refreshError && daysLeft !== null && daysLeft <= 7 && <> Renewing it failed ({ig.refreshError}). Paste a new token if it runs out.</>}
      </span>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

function ReelCard({ r, canPost, formats, onDone }: { r: AdminReel; canPost: boolean; formats: ReelsPage["formats"]; onDone: () => Promise<void> }) {
  const [caption, setCaption] = useState(r.caption);
  const [busy, setBusy] = useState<string>("");
  const [error, setError] = useState(r.error);
  const [format, setFormat] = useState<ReelFormat | "">("");
  useEffect(() => {
    setCaption(r.caption);
    setError(r.error);
  }, [r.caption, r.error]);
  const editable = r.status === "ready" || r.status === "skipped";
  const status = STATUS[r.status] ?? { label: r.status };

  const run = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(label);
    setError("");
    try {
      await fn();
      await onDone();
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy("");
    }
  };

  return (
    <li className="panel reel">
      <div className="reel-video">
        {r.videoUrl ? <video src={r.videoUrl} poster={r.coverUrl || undefined} controls playsInline preload="metadata" /> : <div className="reel-empty muted">{r.status === "failed" ? "No video" : "Video removed after 90 days"}</div>}
      </div>
      <div className="stack" style={{ flex: "1 1 300px", minWidth: 0 }}>
        <div className="row" style={{ gap: 8 }}>
          <b>{dayLabel(r.date)}</b>
          <Chip tone={status.tone}>{status.label}</Chip>
          {r.formatName && <Chip>{r.formatName}</Chip>}
          {r.part && <span className="small">{PART_LABELS[r.part] ?? r.part} · {r.topic}</span>}
        </div>
        {r.hook && <span className="muted">“{r.hook}”</span>}
        {r.status === "posted" ? (
          <>
            <p style={{ whiteSpace: "pre-wrap", margin: 0, fontSize: 14 }}>{r.caption}</p>
            <span className="small">
              Posted {when(r.postedAt)}
              {r.permalink && (
                <>
                  {" · "}
                  <a href={r.permalink} target="_blank" rel="noreferrer">
                    View on Instagram
                  </a>
                </>
              )}
            </span>
          </>
        ) : (
          r.status !== "failed" && (
            <>
              <label className="small" htmlFor={`cap-${r.date}`}>
                Caption ({caption.length}/2200)
              </label>
              <textarea id={`cap-${r.date}`} rows={7} value={caption} disabled={!editable || !!busy} onChange={(e) => setCaption(e.target.value)} />
            </>
          )
        )}
        {error && <p className="error">{error}</p>}
        {r.status !== "posted" && r.status !== "posting" && (
          <div className="row" style={{ gap: 8 }}>
            {r.status === "ready" && (
              <button
                className="btn btn-primary"
                disabled={!!busy || !canPost}
                title={canPost ? undefined : "Connect Instagram first"}
                onClick={() =>
                  confirm("Post this reel to Instagram now? It goes public right away.") &&
                  run("post", async () => {
                    if (caption !== r.caption) await reelAction({ action: "caption", date: r.date, caption });
                    await reelAction({ action: "post", date: r.date });
                  })
                }
              >
                {busy === "post" ? "Posting… (up to 5 min)" : "Post to Instagram"}
              </button>
            )}
            {editable && caption !== r.caption && (
              <button className="btn" disabled={!!busy} onClick={() => run("caption", () => reelAction({ action: "caption", date: r.date, caption }))}>
                Save caption
              </button>
            )}
            <select aria-label="Format for the new version" value={format} disabled={!!busy} onChange={(e) => setFormat(e.target.value as ReelFormat | "")} style={{ width: "auto" }}>
              <option value="">Any format</option>
              {Object.entries(formats).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <button className="btn" disabled={!!busy} onClick={() => run("regen", () => reelAction({ action: "regenerate", date: r.date, format: format || undefined }))}>
              {busy === "regen" ? "Making a new one… (about a minute)" : "Regenerate"}
            </button>
            {r.status === "ready" && (
              <button className="btn-link" disabled={!!busy} onClick={() => run("skip", () => reelAction({ action: "skip", date: r.date }))}>
                Skip
              </button>
            )}
            {r.status === "skipped" && (
              <button className="btn-link" disabled={!!busy} onClick={() => run("unskip", () => reelAction({ action: "unskip", date: r.date }))}>
                Bring back
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default function Instagram() {
  const [page, setPage] = useState<ReelsPage | null>(null);
  const [error, setError] = useState("");
  const [making, setMaking] = useState(false);
  const [format, setFormat] = useState<ReelFormat | "">("");

  const load = useCallback(async () => {
    try {
      setPage(await adminReels());
    } catch (e) {
      setError(message(e));
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const hasToday = !!page?.reels.some((r) => r.date === page.today && r.status !== "failed");
  const posted = page?.reels.filter((r) => r.status === "posted").length ?? 0;

  return (
    <>
      <TopBar back={{ to: "/", label: "Home" }} />
      <main className="page">
        <AdminTabs />
        <div className="row spread">
          <h1>Instagram</h1>
          {page && <span className="muted">{posted} of the last {page.reels.length} reels posted</span>}
        </div>
        <p className="muted">
          A new reel is made every morning at 7am New York time from a question in the EASprint bank, in one of five fun formats. Watch it, tweak the caption, then
          post it, make a new version, or skip the day.
        </p>
        {error && <p className="error">{error}</p>}
        {!page && !error && <span className="spinner" />}
        {page && (
          <>
            <Connection ig={page.instagram} onChange={(instagram) => setPage({ ...page, instagram })} />
            {!hasToday && (
              <div className="panel row spread">
                <span>No reel for today yet{page.reels.length === 0 ? ". The first one is made tomorrow morning, or make one now." : "."}</span>
                <div className="row" style={{ gap: 8 }}>
                  <select aria-label="Format" value={format} disabled={making} onChange={(e) => setFormat(e.target.value as ReelFormat | "")} style={{ width: "auto" }}>
                    <option value="">Today's format</option>
                    {Object.entries(page.formats).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-primary"
                    disabled={making}
                    onClick={async () => {
                      setMaking(true);
                      setError("");
                      try {
                        await reelAction({ action: "make", date: page.today, format: format || undefined });
                        await load();
                      } catch (e) {
                        setError(message(e));
                      } finally {
                        setMaking(false);
                      }
                    }}
                  >
                    {making ? "Making it… (about a minute)" : "Make today's reel"}
                  </button>
                </div>
              </div>
            )}
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {page.reels.map((r) => (
                <ReelCard key={`${r.date}-${r.createdAt}`} r={r} canPost={page.instagram.connected} formats={page.formats} onDone={load} />
              ))}
            </ul>
            <p className="muted" style={{ fontSize: 14 }}>
              Videos older than 90 days are deleted from storage to keep costs down. The record of what was posted stays.
            </p>
          </>
        )}
      </main>
    </>
  );
}

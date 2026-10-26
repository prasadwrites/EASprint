import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TopBar, { Chip } from "../components/TopBar";
import { adminEngagement, adminUserEngagement, date, duration, when, type EngagementUser, type ScoreRule, type SharedDeck } from "../lib/admin";
import { AdminTabs } from "./Admin";

type Sort = "score" | "sessionsCompleted" | "questionsAnswered" | "sharesMade" | "activeSeconds" | "decksCreated";
const SORTS: { id: Sort; label: string }[] = [
  { id: "score", label: "Engagement score" },
  { id: "sessionsCompleted", label: "Sessions finished" },
  { id: "questionsAnswered", label: "Questions answered" },
  { id: "sharesMade", label: "Decks shared" },
  { id: "activeSeconds", label: "Time on site" },
  { id: "decksCreated", label: "Decks built" },
];
const SHOWN = 25;
const PART_LABELS: Record<string, string> = { part1: "Part 1", part2: "Part 2", part3: "Part 3" };

const name = (u: EngagementUser) => u.displayName || u.email || "No name";
const rate = (r: number | null) => (r === null ? "–" : `${Math.round(r * 100)}%`);

function Tile({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="tile">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
      {note && <span className="label">{note}</span>}
    </div>
  );
}

/** One person: their own usage, where their score comes from, and each deck they built, practiced or shared. */
function UserDetail({ uid, scoring, onClose }: { uid: string; scoring: ScoreRule[]; onClose: () => void }) {
  const [u, setU] = useState<EngagementUser | null>(null);
  const [error, setError] = useState("");
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    setU(null);
    setError("");
    adminUserEngagement(uid)
      .then((res) => setU(res.user))
      .catch((e) => setError((e as Error).message || "That account couldn't be loaded."));
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [uid]);

  return (
    <section ref={ref} className="panel stack" id="person" aria-live="polite">
      <div className="row spread">
        <h2>{u ? name(u) : "Loading…"}</h2>
        <button type="button" className="btn-small" onClick={onClose}>
          Close
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {!u && !error && <span className="spinner" />}
      {u && (
        <>
          <span className="muted" style={{ fontSize: 14 }}>
            {u.displayName && `${u.email} · `}Joined {date(u.createdAt)} · last sign-in {date(u.lastSignInAt)}
            {u.lastActiveAt ? ` · last active ${when(u.lastActiveAt)}` : ""} {u.isAdmin && <Chip>Admin</Chip>}
          </span>

          <div className="kv">
            <div>
              <span>Engagement score</span>
              <b>{u.score}</b>
            </div>
            <div>
              <span>Time on site</span>
              <b>{duration(u.activeSeconds)}</b>
            </div>
            <div>
              <span>This week · today</span>
              <b>
                {duration(u.weekSeconds)} · {duration(u.todaySeconds)}
              </b>
            </div>
            <div>
              <span>Active days (35)</span>
              <b>{u.activeDays}</b>
            </div>
            <div>
              <span>Sessions finished</span>
              <b>{u.sessionsCompleted}</b>
            </div>
            <div>
              <span>Questions answered</span>
              <b>{u.questionsAnswered}</b>
            </div>
            <div>
              <span>Exam parts practiced</span>
              <b>{u.partsPracticed} of 3</b>
            </div>
            <div>
              <span>Decks built</span>
              <b>{u.decksCreated}</b>
            </div>
            <div>
              <span>Shared with</span>
              <b>
                {u.sharesMade} {u.sharesMade === 1 ? "person" : "people"}
              </b>
            </div>
            <div>
              <span>Of those, finished</span>
              <b>
                {u.sharesFinished} <span className="small">({rate(u.completionRate)})</span>
              </b>
            </div>
            <div>
              <span>Decks shared with them</span>
              <b>{u.sharedWithThem}</b>
            </div>
          </div>

          <h3>Where the score comes from</h3>
          <ul className="eng-points">
            {scoring
              .filter((s) => u.points[s.field])
              .map((s) => (
                <li key={s.field}>
                  <span>
                    {(u as unknown as Record<string, number>)[s.field]} × {s.points} for each {s.per}
                  </span>
                  <b className="mono">{u.points[s.field]}</b>
                </li>
              ))}
            {!scoring.some((s) => u.points[s.field]) && <li className="muted">Nothing yet.</li>}
          </ul>

          <h3>Decks</h3>
          {u.decks && u.decks.length > 0 ? (
            <div className="table-wrap">
              <table className="eng-table">
                <thead>
                  <tr>
                    <th scope="col">Deck</th>
                    <th scope="col">Their sessions</th>
                    <th scope="col">Shared with</th>
                    <th scope="col">Finished</th>
                  </tr>
                </thead>
                <tbody>
                  {u.decks.map((d) => (
                    <tr key={d.deckId}>
                      <th scope="row">
                        {d.title}
                        <span className="small">
                          {d.kind === "builtin" ? "Built-in exam part" : PART_LABELS[d.part] ?? "Deck"}
                          {d.createdAt ? ` · built ${date(d.createdAt)}` : ""}
                          {d.deleted ? " · deleted" : d.kind === "shared" ? " · shared with them" : ""}
                        </span>
                      </th>
                      <td className="mono">{d.sessions}</td>
                      <td className="mono">{d.kind === "own" ? d.sharedWith : "–"}</td>
                      <td className="mono">{d.kind === "own" ? d.finished : "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="muted">No decks built or practiced yet.</p>
          )}
        </>
      )}
    </section>
  );
}

/** The decks shared with the most people who then practiced them. */
function TopShared({ decks, onOwner }: { decks: SharedDeck[]; onOwner: (uid: string) => void }) {
  return (
    <section className="panel stack">
      <div className="row spread">
        <h2>Most practiced shared decks</h2>
        <span className="muted">Top 10 by people who finished a session</span>
      </div>
      {decks.length === 0 ? (
        <p className="muted">No one has shared a deck yet.</p>
      ) : (
        <div className="table-wrap">
          <table className="eng-table eng-links">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Deck</th>
                <th scope="col">Owner</th>
                <th scope="col">Shared with</th>
                <th scope="col">Finished</th>
              </tr>
            </thead>
            <tbody>
              {decks.map((d, i) => (
                <tr key={d.deckId}>
                  <td className="mono">{i + 1}</td>
                  <th scope="row">
                    {d.title}
                    <span className="small">
                      {PART_LABELS[d.part] ?? "Deck"}
                      {d.createdAt ? ` · built ${date(d.createdAt)}` : ""}
                    </span>
                  </th>
                  <th scope="row">
                    <button type="button" className="btn-link" onClick={() => onOwner(d.ownerUid)}>
                      {d.ownerName}
                    </button>{" "}
                    {d.ownerIsAdmin && <Chip>Admin</Chip>}
                  </th>
                  <td className="mono">{d.sharedWith}</td>
                  <td className="mono">
                    <b>{d.finished}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function Engagement() {
  const [users, setUsers] = useState<EngagementUser[] | null>(null);
  const [scoring, setScoring] = useState<ScoreRule[]>([]);
  const [shared, setShared] = useState<SharedDeck[] | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("score");
  const [withAdmin, setWithAdmin] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [params, setParams] = useSearchParams();
  const selected = params.get("u");
  const select = (uid: string | null) => setParams(uid ? { u: uid } : {}, { replace: false });

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await adminEngagement();
      setUsers(res.users);
      setScoring(res.scoring);
      setShared(res.shared);
    } catch (e) {
      setError((e as Error).message || "Engagement couldn't be loaded.");
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const people = useMemo(() => (users ?? []).filter((u) => withAdmin || !u.isAdmin), [users, withAdmin]);
  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = people.filter((u) => !q || u.email.toLowerCase().includes(q) || u.displayName.toLowerCase().includes(q));
    return [...list].sort((a, b) => b[sort] - a[sort] || b.score - a.score);
  }, [people, search, sort]);
  const total = (k: "sessionsCompleted" | "questionsAnswered" | "decksCreated" | "sharesMade" | "sharesFinished" | "activeSeconds") => people.reduce((n, u) => n + u[k], 0);
  const engaged = people.filter((u) => u.score > 0).length;
  const thisWeek = people.filter((u) => u.weekSeconds > 0).length;

  return (
    <>
      <TopBar back={{ to: "/admin", label: "Accounts" }} />
      <main className="page">
        <AdminTabs />
        <div className="row spread">
          <h1>Engagement</h1>
          <button type="button" className="btn-small" onClick={load}>
            Refresh
          </button>
        </div>

        {error && <p className="error">{error}</p>}
        {users === null && !error && <span className="spinner" />}

        {users && (
          <div className="tiles four">
            <Tile label="Engaged accounts" value={engaged} note={`of ${people.length}`} />
            <Tile label="Active this week" value={thisWeek} />
            <Tile label="Sessions finished" value={total("sessionsCompleted")} note={`${total("questionsAnswered")} questions answered`} />
            <Tile label="Decks built" value={total("decksCreated")} />
            <Tile
              label="Shares"
              value={total("sharesMade")}
              note={total("sharesMade") ? `${total("sharesFinished")} finished (${Math.round((total("sharesFinished") / total("sharesMade")) * 100)}%)` : undefined}
            />
            <Tile label="Time on site" value={duration(total("activeSeconds"))} />
          </div>
        )}

        {selected && scoring.length > 0 && <UserDetail uid={selected} scoring={scoring} onClose={() => select(null)} />}

        {users && (
          <section className="panel stack">
            <div className="row spread">
              <h2>Top users</h2>
              <span className="muted">Pick someone to see their usage</span>
            </div>
            <div className="row">
              <input type="text" aria-label="Search people" placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: "1 1 240px", width: "auto" }} />
              <select aria-label="Rank by" value={sort} onChange={(e) => setSort(e.target.value as Sort)} style={{ width: "auto" }}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    Rank by {s.label.toLowerCase()}
                  </option>
                ))}
              </select>
              <label className="row" style={{ gap: 6, fontSize: 14, margin: 0, fontWeight: 400 }}>
                <input type="checkbox" checked={withAdmin} onChange={(e) => setWithAdmin(e.target.checked)} style={{ width: "auto" }} />
                Include the admin
              </label>
            </div>
            {shown.length === 0 ? (
              <p className="muted">No one matches.</p>
            ) : (
              <div className="table-wrap">
                <table className="eng-table eng-rank">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Person</th>
                      <th scope="col">Score</th>
                      <th scope="col">Sessions</th>
                      <th scope="col">Questions</th>
                      <th scope="col">Decks built</th>
                      <th scope="col">Shared</th>
                      <th scope="col">Time on site</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shown.slice(0, showAll || search ? undefined : SHOWN).map((u, i) => (
                      <tr key={u.uid} aria-selected={u.uid === selected} onClick={() => select(u.uid)}>
                        <td className="mono">{i + 1}</td>
                        <th scope="row">
                          <button type="button" className="btn-link" onClick={(e) => (e.stopPropagation(), select(u.uid))}>
                            {name(u)}
                          </button>{" "}
                          {u.isAdmin && <Chip>Admin</Chip>}
                          {u.displayName && <span className="small">{u.email}</span>}
                        </th>
                        <td className="mono">
                          <b>{u.score}</b>
                        </td>
                        <td className="mono">{u.sessionsCompleted}</td>
                        <td className="mono">{u.questionsAnswered}</td>
                        <td className="mono">{u.decksCreated}</td>
                        <td className="mono">
                          {u.sharesMade}
                          {u.sharesMade > 0 && <span className="small">{u.sharesFinished} finished</span>}
                        </td>
                        <td className="mono">{duration(u.activeSeconds)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!showAll && !search && shown.length > SHOWN && (
              <button type="button" className="btn-link" style={{ alignSelf: "flex-start" }} onClick={() => setShowAll(true)}>
                Show all {shown.length}
              </button>
            )}
          </section>
        )}

        {shared && <TopShared decks={shared} onOwner={select} />}

        {scoring.length > 0 && (
          <section className="panel stack" id="scoring">
            <h2>How the score works</h2>
            <ul className="eng-points">
              {scoring.map((s) => (
                <li key={s.field}>
                  <span>Each {s.per}</span>
                  <b className="mono">
                    {s.points} {s.points === 1 ? "point" : "points"}
                  </b>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ fontSize: 14 }}>
              Sessions count practice finished on the three built-in exam parts and on decks built with Claude. A share counts each person a deck was
              shared with by email, and it counts as finished once that person finishes a practice session on the deck. Time on site has only been
              counted since this page went live, so time before that is missing. <Link to="/admin">Back to Accounts</Link>
            </p>
          </section>
        )}
      </main>
    </>
  );
}

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TopBar, { Chip } from "../components/TopBar";
import { adminUpdate, getAccessCode, PLANS, type PlanId } from "../lib/account";
import { adminDeleteAccount, adminListAccounts, date, duration, when, type AdminAccount } from "../lib/admin";
import { closeRequest, listPendingRequests, listUnmatchedPayments, resolvePayment, type UnmatchedPayment, type UpgradeRequest } from "../lib/upgrades";

const PLAN_ORDER = Object.keys(PLANS) as PlanId[];

function formatDate(d: Date | null) {
  return d ? d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "–";
}

/** The admin pages, as tabs. */
export function AdminTabs() {
  const { pathname } = useLocation();
  return (
    <nav className="admin-tabs" aria-label="Admin">
      <Link to="/admin" aria-current={pathname === "/admin" ? "page" : undefined}>
        Accounts
      </Link>
      <Link to="/admin/engagement" aria-current={pathname === "/admin/engagement" ? "page" : undefined}>
        Engagement
      </Link>
      <Link to="/admin/instagram" aria-current={pathname === "/admin/instagram" ? "page" : undefined}>
        Instagram
      </Link>
    </nav>
  );
}

function AccessCode({ account, onChange }: { account: AdminAccount; onChange: () => void }) {
  const [code, setCode] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <span className="small">Access code</span>
      {code !== null ? <span className="code">{code || "none"}</span> : <span className="small">{account.hasAccessCode ? "Own code set" : "Uses the shared code"}</span>}
      <div className="row" style={{ gap: 8 }}>
        {account.hasAccessCode && code === null && (
          <button type="button" className="btn-small" disabled={busy} onClick={() => run(async () => setCode(await getAccessCode(account.uid)))}>
            Show
          </button>
        )}
        <button
          type="button"
          className="btn-small"
          disabled={busy}
          onClick={() =>
            run(async () => {
              await adminUpdate({ uid: account.uid, accessCode: "generate" });
              setCode(await getAccessCode(account.uid));
              onChange();
            })
          }
        >
          {account.hasAccessCode ? "New code" : "Give own code"}
        </button>
        {account.hasAccessCode && (
          <button
            type="button"
            className="btn-link"
            style={{ fontSize: 14 }}
            disabled={busy}
            onClick={() =>
              run(async () => {
                await adminUpdate({ uid: account.uid, accessCode: "clear" });
                setCode(null);
                onChange();
              })
            }
          >
            Remove
          </button>
        )}
      </div>
    </>
  );
}

type Change = { plan?: PlanId; status?: "active" | "suspended"; resetDecks?: boolean };

function AccountRow({ a, onChange, onDelete, onCodeChange }: { a: AdminAccount; onChange: (c: Change) => Promise<void>; onDelete: () => Promise<void>; onCodeChange: () => void }) {
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [typed, setTyped] = useState("");
  // The admin types the email (or DELETE for accounts without one) so a stray click can't delete anyone.
  const confirmWord = a.email || "DELETE";
  const suspended = a.status === "suspended";
  const used = Math.min(100, (a.decksCreated / Math.max(1, a.maxDecks)) * 100);

  const run = async (c: Change) => {
    setBusy(true);
    try {
      await onChange(c);
    } finally {
      setBusy(false);
    }
  };

  return (
    <li className={`acct ${suspended ? "suspended" : ""}`}>
      <div className="who-col">
        <div className="row" style={{ gap: 8 }}>
          <b>{a.displayName || a.email || "No name"}</b>
          {a.isAdmin && <Chip>Admin</Chip>}
          {suspended && <Chip tone="bad">Suspended</Chip>}
        </div>
        {a.displayName && <span className="small">{a.email}</span>}
        <span className="small">
          Joined {date(a.createdAt)} · last sign-in {date(a.lastSignInAt)}
        </span>
        <span className="small">
          Time on site: <b>{duration(a.activeSeconds)}</b> in all · {duration(a.weekSeconds)} this week · {duration(a.todaySeconds)} today
          {a.lastActiveAt ? ` · last active ${when(a.lastActiveAt)}` : ""}
        </span>
        <span className="small">
          <Link to={`/admin/engagement?u=${encodeURIComponent(a.uid)}`}>See engagement</Link>
        </span>
      </div>

      <div className="usage">
        {a.isAdmin ? (
          <span className="small">No limits on the admin account</span>
        ) : (
          <>
            <div className="seg" role="group" aria-label={`Plan for ${a.email}`}>
              {PLAN_ORDER.map((p) => (
                <button key={p} type="button" className="btn-small" aria-pressed={a.plan === p} disabled={busy} onClick={() => a.plan !== p && run({ plan: p })}>
                  {PLANS[p].name}
                </button>
              ))}
            </div>
            <div className="row" style={{ flexWrap: "nowrap", gap: 8 }}>
              <div className="bar">
                <i style={{ width: `${used}%`, background: `var(--${used >= 100 ? "bad" : used >= 80 ? "warn" : "accent"})` }} />
              </div>
              <span className="small mono" style={{ whiteSpace: "nowrap" }}>
                {a.decksCreated}/{a.maxDecks} decks
              </span>
            </div>
            <span className="small">
              Up to {a.maxQuestions} questions a deck
              {a.decksCreated > 0 && (
                <>
                  {" · "}
                  <button type="button" className="btn-link" style={{ fontSize: 13 }} disabled={busy} onClick={() => confirm(`Reset the deck count for ${a.email}?`) && run({ resetDecks: true })}>
                    Reset count
                  </button>
                </>
              )}
            </span>
          </>
        )}
      </div>

      <div className="usage">{a.isAdmin ? <span className="small">The admin doesn't need a code</span> : <AccessCode account={a} onChange={onCodeChange} />}</div>

      <div className="actions">
        {!a.isAdmin &&
          (suspended ? (
            <button type="button" className="btn-small" disabled={busy} onClick={() => run({ status: "active" })}>
              Reactivate
            </button>
          ) : (
            <button
              type="button"
              className="btn-small btn-danger"
              disabled={busy}
              onClick={() => confirm(`Suspend ${a.email}? They'll be signed out and can't sign in or build decks until you reactivate them.`) && run({ status: "suspended" })}
            >
              Suspend
            </button>
          ))}
        {!a.isAdmin && !deleting && (
          <button type="button" className="btn-small btn-danger" disabled={busy} onClick={() => setDeleting(true)}>
            Delete
          </button>
        )}
      </div>

      {deleting && (
        <form
          className="confirm-delete"
          role="alertdialog"
          aria-label={`Delete ${a.email || "this account"}`}
          onSubmit={async (e) => {
            e.preventDefault();
            if (typed.trim() !== confirmWord) return;
            setBusy(true);
            try {
              await onDelete();
            } finally {
              setBusy(false);
            }
          }}
        >
          <p>
            <b>Delete {a.email || "this account"} permanently?</b> This removes their sign-in, the decks they built, their practice history and access
            code. It can't be undone. To block someone for now, suspend them instead.
          </p>
          <label htmlFor={`confirm-${a.uid}`} className="small" style={{ fontWeight: 400 }}>
            Type <b className="mono">{confirmWord}</b> to confirm
          </label>
          <div className="row" style={{ gap: 8 }}>
            <input id={`confirm-${a.uid}`} type="text" autoComplete="off" autoFocus value={typed} onChange={(e) => setTyped(e.target.value)} style={{ flex: "1 1 220px", width: "auto" }} />
            <button type="submit" className="btn-small btn-danger-solid" disabled={busy || typed.trim() !== confirmWord}>
              {busy ? "Deleting…" : "Delete forever"}
            </button>
            <button
              type="button"
              className="btn-small"
              disabled={busy}
              onClick={() => {
                setDeleting(false);
                setTyped("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </li>
  );
}

export default function Admin() {
  const [accounts, setAccounts] = useState<AdminAccount[] | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | PlanId | "suspended">("all");
  const [sort, setSort] = useState<"newest" | "week" | "total">("newest");
  const [requests, setRequests] = useState<UpgradeRequest[]>([]);
  const [unmatched, setUnmatched] = useState<UnmatchedPayment[]>([]);

  const load = useCallback(async () => {
    try {
      setAccounts(await adminListAccounts());
      setError("");
    } catch (e) {
      setError((e as Error).message || "Couldn't load accounts.");
    }
  }, []);

  const refresh = useCallback(() => {
    listPendingRequests().then(setRequests).catch(() => setRequests([]));
    listUnmatchedPayments().then(setUnmatched).catch(() => setUnmatched([]));
    return load();
  }, [load]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const decide = async (r: UpgradeRequest, approve: boolean) => {
    setBusy(r.uid);
    setError("");
    try {
      if (approve) await adminUpdate({ uid: r.uid, plan: r.plan });
      await closeRequest(r.uid, approve ? "approved" : "dismissed");
      await refresh();
    } catch (e) {
      setError((e as Error).message || "That change didn't go through.");
    } finally {
      setBusy("");
    }
  };

  const change = async (uid: string, c: Change) => {
    setNotice("");
    try {
      await adminUpdate({ uid, ...c });
      await load();
    } catch (e) {
      setError((e as Error).message || "That change didn't go through.");
    }
  };

  const remove = async (a: AdminAccount) => {
    try {
      await adminDeleteAccount(a.uid);
      setAccounts((list) => list?.filter((x) => x.uid !== a.uid) ?? null);
      setNotice(`Deleted ${a.email || "the account"}.`);
      setError("");
    } catch (e) {
      setError((e as Error).message || "The account couldn't be deleted. Try again.");
    }
  };

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = (accounts ?? []).filter(
      (a) =>
        (!q || a.email.toLowerCase().includes(q) || a.displayName.toLowerCase().includes(q)) &&
        (filter === "all" || (filter === "suspended" ? a.status === "suspended" : a.plan === filter && !a.isAdmin)),
    );
    if (sort === "week") return [...list].sort((x, y) => y.weekSeconds - x.weekSeconds);
    if (sort === "total") return [...list].sort((x, y) => y.activeSeconds - x.activeSeconds);
    return list; // the server sends the admin first, then newest sign-ups
  }, [accounts, search, filter, sort]);

  const count = (f: typeof filter) => (accounts ?? []).filter((a) => (f === "suspended" ? a.status === "suspended" : !a.isAdmin && a.plan === f)).length;

  return (
    <>
      <TopBar back={{ to: "/", label: "Home" }} />
      <main className="page">
        <AdminTabs />
        <div className="row spread">
          <h1>Accounts</h1>
          <div className="row">
            {accounts && (
              <span className="muted">
                {accounts.length} {accounts.length === 1 ? "account" : "accounts"}
              </span>
            )}
            <Link className="btn btn-small" to="/admin/engagement">
              Engagement
            </Link>
          </div>
        </div>

        <div className="panel stack">
          <div className="row spread">
            <h2>Upgrade requests</h2>
            <span className="muted">{requests.length} waiting</span>
          </div>
          {requests.length === 0 ? (
            <p className="muted">No one is waiting. When someone pays on the Upgrade page and confirms it, they show up here.</p>
          ) : (
            <>
              <p className="muted" style={{ fontSize: 14 }}>
                Check each one against the payments in your Square dashboard before approving. Approving changes the plan right away.
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {requests.map((r) => (
                  <li key={r.uid} className="row spread" style={{ alignItems: "flex-start", borderTop: "1px solid var(--line)", paddingTop: 12 }}>
                    <div>
                      <b>{r.email}</b> paid for <b>{PLANS[r.plan].name}</b>
                      <div className="muted" style={{ fontSize: 14 }}>
                        {r.displayName || "No name"} · {formatDate(r.requestedAt)}
                        {r.note && <> · “{r.note}”</>}
                      </div>
                    </div>
                    <div className="row" style={{ gap: 8 }}>
                      <button className="btn btn-primary" disabled={busy === r.uid} onClick={() => decide(r, true)}>
                        Approve
                      </button>
                      <button className="btn" disabled={busy === r.uid} onClick={() => decide(r, false)}>
                        Dismiss
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {unmatched.length > 0 && (
          <div className="panel stack">
            <div className="row spread">
              <h2>Square payments to match</h2>
              <span className="muted">{unmatched.length}</span>
            </div>
            <p className="muted" style={{ fontSize: 14 }}>
              These payments came in, but no EASprint account uses the buyer's email (or the item wasn't Pro or Pro Max), so no plan was changed. Find the
              person below, set their plan, then mark the payment done.
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {unmatched.map((p) => (
                <li key={p.id} className="row spread" style={{ alignItems: "flex-start", borderTop: "1px solid var(--line)", paddingTop: 12 }}>
                  <div>
                    <b>{p.email || "No email on the payment"}</b> · {p.items.join(", ") || "Unknown item"}
                    <div className="muted" style={{ fontSize: 14 }}>
                      {p.amount !== null ? `${(p.amount / 100).toFixed(2)} ${p.currency} · ` : ""}
                      {formatDate(p.receivedAt)} · Square payment {p.id}
                    </div>
                  </div>
                  <button
                    className="btn"
                    onClick={async () => {
                      await resolvePayment(p.id);
                      setUnmatched((all) => all.filter((x) => x.id !== p.id));
                    }}
                  >
                    Mark done
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="tiles">
          {PLAN_ORDER.map((p) => (
            <div key={p} className="tile">
              <span className="label">{PLANS[p].name}</span>
              <b className="mono" style={{ fontSize: 20 }}>
                {PLANS[p].maxDecks} decks × {PLANS[p].maxQuestions} questions
              </b>
              <span className="label">
                {count(p)} {count(p) === 1 ? "account" : "accounts"}
              </span>
            </div>
          ))}
        </div>

        <div className="panel stack">
          <div className="row">
            <input type="text" aria-label="Search accounts" placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: "1 1 240px", width: "auto" }} />
            <div className="seg" role="group" aria-label="Filter">
              {(["all", ...PLAN_ORDER, "suspended"] as const).map((f) => (
                <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f === "all" ? "All" : f === "suspended" ? `Suspended (${count("suspended")})` : PLANS[f].name}
                </button>
              ))}
            </div>
            <select aria-label="Sort accounts" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} style={{ width: "auto" }}>
              <option value="newest">Newest first</option>
              <option value="week">Most time this week</option>
              <option value="total">Most time in all</option>
            </select>
          </div>
          {error && <p className="error">{error}</p>}
          {notice && !error && (
            <p className="muted" role="status">
              {notice}
            </p>
          )}
          {accounts === null && !error ? (
            <span className="spinner" />
          ) : shown.length === 0 ? (
            <p className="muted">No accounts match.</p>
          ) : (
            <ul className="acct-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {shown.map((a) => (
                <AccountRow key={a.uid} a={a} onChange={(c) => change(a.uid, c)} onDelete={() => remove(a)} onCodeChange={load} />
              ))}
            </ul>
          )}
          <p className="muted" style={{ fontSize: 14 }}>
            New accounts start on Free. Accounts without their own access code use the shared code set with <code>firebase functions:secrets:set DECK_ACCESS_CODE</code>.
            Suspending an account also blocks it from signing in. Time on site counts minutes of active use, from when this went live.
          </p>
        </div>
      </main>
    </>
  );
}

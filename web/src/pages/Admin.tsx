import { useEffect, useState } from "react";
import TopBar, { Chip } from "../components/TopBar";
import { ADMIN_EMAIL, adminUpdate, getAccessCode, listAccounts, PLANS, type Account, type PlanId } from "../lib/account";
import { closeRequest, listPendingRequests, type UpgradeRequest } from "../lib/upgrades";

function formatDate(d: Date | null) {
  return d ? d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "–";
}

function AccessCode({ account, onChange }: { account: Account; onChange: () => void }) {
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
    <div className="stack" style={{ gap: 6 }}>
      {code !== null ? (
        <span className="mono" style={{ fontSize: 15 }}>{code || "none"}</span>
      ) : (
        <span className="muted" style={{ fontSize: 14 }}>{account.hasAccessCode ? "Own code set" : "Uses the shared code"}</span>
      )}
      <div className="row" style={{ gap: 6 }}>
        {account.hasAccessCode && code === null && (
          <button className="btn-link" disabled={busy} onClick={() => run(async () => setCode(await getAccessCode(account.uid)))}>
            Show
          </button>
        )}
        <button
          className="btn-link"
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
            className="btn-link"
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
    </div>
  );
}

export default function Admin() {
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [filter, setFilter] = useState("");
  const [requests, setRequests] = useState<UpgradeRequest[]>([]);

  const refresh = () => {
    listPendingRequests().then(setRequests).catch(() => setRequests([]));
    return listAccounts()
      .then(setAccounts)
      .catch(() => setError("Couldn't load accounts."));
  };

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
  useEffect(() => {
    refresh();
  }, []);

  const change = async (uid: string, update: { plan?: PlanId; status?: "active" | "suspended" }) => {
    setBusy(uid);
    setError("");
    try {
      await adminUpdate({ uid, ...update });
      await refresh();
    } catch (e) {
      setError((e as Error).message || "That change didn't go through.");
    } finally {
      setBusy("");
    }
  };

  const shown = (accounts ?? []).filter((a) => !filter || `${a.email} ${a.displayName}`.toLowerCase().includes(filter.toLowerCase()));
  const counts = (accounts ?? []).reduce<Record<string, number>>((m, a) => ({ ...m, [a.status === "suspended" ? "suspended" : a.plan]: (m[a.status === "suspended" ? "suspended" : a.plan] ?? 0) + 1 }), {});

  return (
    <>
      <TopBar back={{ to: "/", label: "Home" }} />
      <main className="page">
        <div className="stack" style={{ gap: 6 }}>
          <h1>Accounts</h1>
          <p className="muted">
            {accounts ? `${accounts.length} accounts` : "Loading…"}
            {accounts &&
              ` · ${counts.free ?? 0} Free · ${counts.pro ?? 0} Pro · ${counts.promax ?? 0} Pro Max${counts.suspended ? ` · ${counts.suspended} suspended` : ""}`}
          </p>
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

        <div className="panel stack">
          <h2>Plans</h2>
          <table className="domains">
            <thead>
              <tr>
                <th>Plan</th>
                <th className="num">Decks</th>
                <th className="num">Questions per deck</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(PLANS) as PlanId[]).map((p) => (
                <tr key={p}>
                  <td>{PLANS[p].name}</td>
                  <td className="num">{PLANS[p].maxDecks}</td>
                  <td className="num">{PLANS[p].maxQuestions}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted" style={{ fontSize: 14 }}>
            New accounts start on Free. Accounts without their own access code use the shared code set with <code>firebase functions:secrets:set DECK_ACCESS_CODE</code>.
            Suspending an account also blocks it from signing in.
          </p>
        </div>

        <div className="stack">
          <input type="text" placeholder="Search by email or name" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ maxWidth: 360 }} />
          {error && <p className="error">{error}</p>}
          {accounts === null ? (
            <span className="spinner" />
          ) : (
            <div className="panel" style={{ overflowX: "auto" }}>
              <table className="domains" style={{ minWidth: 820 }}>
                <thead>
                  <tr>
                    <th>Account</th>
                    <th>Plan</th>
                    <th className="num">Decks used</th>
                    <th>Access code</th>
                    <th>Status</th>
                    <th>Last seen</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((a) => {
                    const self = a.email === ADMIN_EMAIL;
                    return (
                      <tr key={a.uid} style={{ verticalAlign: "top" }}>
                        <td>
                          <b>{a.email || a.uid}</b>
                          <div className="muted" style={{ fontSize: 14 }}>
                            {a.displayName || "No name"} · joined {formatDate(a.createdAt)}
                          </div>
                        </td>
                        <td>
                          {self ? (
                            <Chip>Admin</Chip>
                          ) : (
                            <select aria-label={`Plan for ${a.email}`} value={a.plan} disabled={busy === a.uid} onChange={(e) => change(a.uid, { plan: e.target.value as PlanId })} style={{ width: "auto" }}>
                              {(Object.keys(PLANS) as PlanId[]).map((p) => (
                                <option key={p} value={p}>
                                  {PLANS[p].name}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td className="num">
                          {a.decksCreated}
                          {!self && ` / ${PLANS[a.plan].maxDecks}`}
                        </td>
                        <td>{self ? <span className="muted">Not needed</span> : <AccessCode account={a} onChange={refresh} />}</td>
                        <td>
                          {self ? (
                            <Chip tone="good">Active</Chip>
                          ) : (
                            <div className="stack" style={{ gap: 6 }}>
                              <Chip tone={a.status === "suspended" ? "bad" : "good"}>{a.status === "suspended" ? "Suspended" : "Active"}</Chip>
                              <button
                                className="btn-link"
                                disabled={busy === a.uid}
                                style={a.status === "suspended" ? undefined : { color: "var(--bad)" }}
                                onClick={() => change(a.uid, { status: a.status === "suspended" ? "active" : "suspended" })}
                              >
                                {a.status === "suspended" ? "Restore" : "Suspend"}
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="muted">{formatDate(a.lastSeenAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

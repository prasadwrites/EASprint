import { useEffect, useState } from "react";
import { useAccount, useUser } from "../App";
import TopBar, { Chip, Icon } from "../components/TopBar";
import { limitsFor, PLANS, type PlanId } from "../lib/account";
import { CHECKOUT_LINKS, openCheckout, requestUpgrade, watchMyRequest, type UpgradeRequest } from "../lib/upgrades";

const PAID: ("pro" | "promax")[] = ["pro", "promax"];
const RANK: Record<PlanId, number> = { free: 0, pro: 1, promax: 2 };

export default function Upgrade() {
  const user = useUser();
  const { account, admin } = useAccount();
  const current: PlanId = admin ? "promax" : (account?.plan ?? "free");
  const [request, setRequest] = useState<UpgradeRequest | null>(null);
  const [paidFor, setPaidFor] = useState<"pro" | "promax" | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => watchMyRequest(user.uid, setRequest), [user.uid]);

  const send = async () => {
    if (!paidFor) return;
    setBusy(true);
    setError("");
    try {
      await requestUpgrade(user, paidFor, note);
      setPaidFor(null);
      setNote("");
    } catch {
      setError("That didn't go through. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  const pending = request?.status === "pending" ? request : null;

  return (
    <>
      <TopBar back={{ to: "/", label: "Home" }} />
      <main className="page narrow">
        <div className="stack" style={{ gap: 6 }}>
          <h1>Upgrade your plan</h1>
          <p className="muted">
            You're on the <b>{admin ? "Admin" : limitsFor(account, false).name}</b> plan. Bigger plans let you build more decks with Claude, and bigger ones.
          </p>
        </div>

        {pending && (
          <div className="verdict warn" aria-live="polite">
            <h3>Your {PLANS[pending.plan].name} upgrade is waiting for confirmation</h3>
            <p>
              Your plan switches as soon as your payment is confirmed. This page updates on its own when it does.
            </p>
          </div>
        )}
        {request?.status === "approved" && RANK[current] >= RANK[request.plan] && (
          <div className="verdict good">
            <h3>You're on {PLANS[current].name}</h3>
            <p>Thanks for upgrading. Your new limits are already in place.</p>
          </div>
        )}

        <div className="tiles" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {(Object.keys(PLANS) as PlanId[]).map((p) => {
            const plan = PLANS[p];
            const here = p === current;
            const paid = p !== "free";
            const lower = RANK[p] <= RANK[current];
            return (
              <article key={p} className="panel stack" style={{ gap: 14, borderColor: here ? "var(--accent)" : undefined, borderWidth: here ? 2 : undefined }}>
                <div className="row spread">
                  <h2>{plan.name}</h2>
                  {here && <Chip tone="good">Your plan</Chip>}
                </div>
                <ul className="checklist" style={{ gap: 8 }}>
                  <li className="done">
                    <span className="dot"><Icon name="check" size={14} /></span>
                    <span>
                      <b>{plan.maxDecks}</b> decks built with Claude
                    </span>
                  </li>
                  <li className="done">
                    <span className="dot"><Icon name="check" size={14} /></span>
                    <span>
                      Up to <b>{plan.maxQuestions}</b> questions per deck
                    </span>
                  </li>
                  <li className="done">
                    <span className="dot"><Icon name="check" size={14} /></span>
                    <span>All three built-in exam parts</span>
                  </li>
                </ul>
                {paid && !lower && (
                  <div className="stack" style={{ gap: 8 }}>
                    <button className="btn btn-primary btn-big" type="button" onClick={() => openCheckout(CHECKOUT_LINKS[p as "pro" | "promax"])}>
                      Pay now
                    </button>
                    <span className="muted" style={{ fontSize: 13 }}>
                      Secure checkout by Square opens in a new window. The price is shown there before you pay.
                    </span>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {!admin && current !== "promax" && (
          <div className="panel stack">
            <h2>Already paid?</h2>
            <p className="muted">
              If you paid with the email you use for EASprint, your plan switches on its own within a minute or two. If you used a different email, or it hasn't switched, let us know here.
            </p>
            <div className="pills" role="group" aria-label="Plan you paid for">
              {PAID.filter((p) => RANK[p] > RANK[current]).map((p) => (
                <button key={p} type="button" aria-pressed={paidFor === p} onClick={() => setPaidFor(p)}>
                  I paid for {PLANS[p].name}
                </button>
              ))}
            </div>
            {paidFor && (
              <form
                className="stack"
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
              >
                <div>
                  <label htmlFor="note">
                    Note <span className="muted">(optional)</span>
                  </label>
                  <textarea
                    id="note"
                    placeholder="For example: paid with a different email, or the receipt number from Square."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <div>
                  <button className="btn btn-primary" type="submit" disabled={busy}>
                    {busy ? "Sending…" : `Confirm my ${PLANS[paidFor].name} payment`}
                  </button>
                </div>
                {error && <p className="error">{error}</p>}
              </form>
            )}
          </div>
        )}
      </main>
    </>
  );
}

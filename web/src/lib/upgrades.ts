import { collection, doc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import type { PlanId } from "./account";

/** Square payment links for each paid plan. */
export const CHECKOUT_LINKS: Record<Exclude<PlanId, "free">, string> = {
  pro: "https://square.link/u/LVZ6o7kw?src=embed",
  promax: "https://square.link/u/yAooOJUa?src=embed",
};

/**
 * Opens Square checkout in a centered popup window, the way Square's embed code does. Falls back to a
 * new tab when the browser blocks popups.
 */
export function openCheckout(url: string) {
  const top = window.top ?? window;
  const left0 = top.screenLeft ?? top.screenX;
  const top0 = top.screenTop ?? top.screenY;
  const width = top.innerWidth || document.documentElement.clientWidth || screen.width;
  const height = top.innerHeight || document.documentElement.clientHeight || screen.height;
  const h = height * 0.75;
  const w = 500;
  const zoom = width / top.screen.availWidth;
  const left = (width - w) / 2 / zoom + left0;
  const topPos = (height - h) / 2 / zoom + top0;
  const popup = window.open(url, "Square Payment Links", `scrollbars=yes, width=${w / zoom}, height=${h / zoom}, top=${topPos}, left=${left}`);
  if (popup) popup.focus();
  else window.open(url, "_blank", "noopener");
}

/**
 * After paying, a person tells us which plan they paid for. Square's payment link doesn't know
 * which EASprint account paid, so the admin matches the request with the payment in Square and
 * approves it, which changes the plan.
 */
export interface UpgradeRequest {
  uid: string;
  email: string;
  displayName: string;
  plan: Exclude<PlanId, "free">;
  status: "pending" | "approved" | "dismissed";
  note: string;
  requestedAt: Date | null;
}

const toDate = (v: unknown) => (v && typeof (v as { toDate?: () => Date }).toDate === "function" ? (v as { toDate: () => Date }).toDate() : null);

function fromData(uid: string, d: Record<string, unknown>): UpgradeRequest {
  return {
    uid,
    email: String(d.email ?? ""),
    displayName: String(d.displayName ?? ""),
    plan: d.plan === "promax" ? "promax" : "pro",
    status: d.status === "approved" ? "approved" : d.status === "dismissed" ? "dismissed" : "pending",
    note: String(d.note ?? ""),
    requestedAt: toDate(d.requestedAt),
  };
}

export async function requestUpgrade(user: { uid: string; email: string | null; displayName: string | null }, plan: "pro" | "promax", note: string) {
  await setDoc(doc(db!, "upgradeRequests", user.uid), {
    email: user.email ?? "",
    displayName: user.displayName ?? "",
    plan,
    note: note.trim().slice(0, 300),
    status: "pending",
    requestedAt: serverTimestamp(),
  });
}

export function watchMyRequest(uid: string, cb: (r: UpgradeRequest | null) => void): () => void {
  if (!db) return () => undefined;
  return onSnapshot(
    doc(db, "upgradeRequests", uid),
    (s) => cb(s.exists() ? fromData(s.id, s.data()) : null),
    () => cb(null),
  );
}

export async function listPendingRequests(): Promise<UpgradeRequest[]> {
  const snap = await getDocs(query(collection(db!, "upgradeRequests"), where("status", "==", "pending")));
  return snap.docs.map((d) => fromData(d.id, d.data())).sort((a, b) => (a.requestedAt?.getTime() ?? 0) - (b.requestedAt?.getTime() ?? 0));
}

export async function closeRequest(uid: string, status: "approved" | "dismissed") {
  await updateDoc(doc(db!, "upgradeRequests", uid), { status, closedAt: serverTimestamp() });
}

/** A Square payment the webhook couldn't match to an account or a plan, kept for the admin. */
export interface UnmatchedPayment {
  id: string;
  email: string;
  plan: string | null;
  items: string[];
  amount: number | null;
  currency: string;
  receivedAt: Date | null;
}

export async function listUnmatchedPayments(): Promise<UnmatchedPayment[]> {
  const snap = await getDocs(query(collection(db!, "squarePayments"), where("status", "==", "unmatched")));
  return snap.docs
    .map((d) => {
      const x = d.data();
      return {
        id: d.id,
        email: String(x.email ?? ""),
        plan: x.plan ? String(x.plan) : null,
        items: (x.items as string[]) ?? [],
        amount: typeof x.amount === "number" ? x.amount : null,
        currency: String(x.currency ?? ""),
        receivedAt: toDate(x.receivedAt),
      };
    })
    .sort((a, b) => (a.receivedAt?.getTime() ?? 0) - (b.receivedAt?.getTime() ?? 0));
}

export async function resolvePayment(id: string) {
  await updateDoc(doc(db!, "squarePayments", id), { status: "resolved", resolvedAt: serverTimestamp() });
}

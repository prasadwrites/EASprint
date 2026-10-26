import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "./firebase";
import type { AppUser } from "./types";

/** Mirrors functions/accounts.py. The server enforces these; the app only shows them. */
export const ADMIN_EMAIL = "prasad.writes@gmail.com";

export type PlanId = "free" | "pro" | "promax";

export const PLANS: Record<PlanId, { name: string; maxDecks: number; maxQuestions: number }> = {
  free: { name: "Free", maxDecks: 5, maxQuestions: 20 },
  pro: { name: "Pro", maxDecks: 50, maxQuestions: 120 },
  promax: { name: "Pro Max", maxDecks: 100, maxQuestions: 200 },
};

export interface Account {
  uid: string;
  email: string;
  displayName: string;
  plan: PlanId;
  status: "active" | "suspended";
  decksCreated: number;
  hasAccessCode?: boolean;
  createdAt: Date | null;
  lastSeenAt: Date | null;
}

export const isAdmin = (user: AppUser & { emailVerified?: boolean }) => user.email === ADMIN_EMAIL && user.emailVerified !== false;

/** The limits that apply to an account. The admin always gets Pro Max limits. */
export const limitsFor = (account: Account | null, admin: boolean) => PLANS[admin ? "promax" : (account?.plan ?? "free")] ?? PLANS.free;

const toDate = (v: unknown) => (v && typeof (v as { toDate?: () => Date }).toDate === "function" ? (v as { toDate: () => Date }).toDate() : null);

function fromData(uid: string, d: Record<string, unknown>): Account {
  return {
    uid,
    email: String(d.email ?? ""),
    displayName: String(d.displayName ?? ""),
    plan: (d.plan as PlanId) in PLANS ? (d.plan as PlanId) : "free",
    status: d.status === "suspended" ? "suspended" : "active",
    decksCreated: Number(d.decksCreated ?? 0),
    hasAccessCode: !!d.hasAccessCode,
    createdAt: toDate(d.createdAt),
    lastSeenAt: toDate(d.lastSeenAt),
  };
}

/** Creates the account on first sign-in with the default plan, and records the visit after that. */
export async function ensureAccount(user: AppUser): Promise<void> {
  if (!db) return;
  const ref = doc(db, "accounts", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email ?? "",
      displayName: user.displayName ?? "",
      plan: "free",
      status: "active",
      decksCreated: 0,
      createdAt: serverTimestamp(),
      lastSeenAt: serverTimestamp(),
    });
  } else {
    await updateDoc(ref, { lastSeenAt: serverTimestamp(), displayName: user.displayName ?? "" });
  }
}

export function watchAccount(uid: string, cb: (a: Account | null) => void): () => void {
  if (!db) {
    cb(null);
    return () => undefined;
  }
  return onSnapshot(
    doc(db, "accounts", uid),
    (s) => cb(s.exists() ? fromData(s.id, s.data()) : null),
    () => cb(null),
  );
}

export async function getAccessCode(uid: string): Promise<string> {
  const snap = await getDoc(doc(db!, "accessCodes", uid));
  return snap.exists() ? String(snap.data().code ?? "") : "";
}

export async function adminUpdate(change: { uid: string; plan?: PlanId; status?: "active" | "suspended"; resetDecks?: boolean; accessCode?: "generate" | "clear" }) {
  await httpsCallable(functions!, "admin_update_account")(change);
}

import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";
import type { PlanId } from "./account";

/** One sign-in as the admin's Accounts page sees it. Times are milliseconds. */
export interface AdminAccount {
  uid: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  plan: PlanId;
  status: "active" | "suspended";
  decksCreated: number;
  maxDecks: number;
  maxQuestions: number;
  hasAccessCode: boolean;
  createdAt: number | null;
  lastSignInAt: number | null;
  /** Time actively using the app, counted a minute at a time. */
  activeSeconds: number;
  todaySeconds: number;
  /** The last 7 days, today included (UTC days). */
  weekSeconds: number;
  lastActiveAt: number | null;
}

/** A deck in one person's engagement detail: their own, one shared with them, or a built-in exam part. */
export interface EngagementDeck {
  deckId: string;
  title: string;
  part: string;
  kind: "own" | "shared" | "builtin";
  deleted: boolean;
  createdAt: number | null;
  /** Their own finished sessions on it. */
  sessions: number;
  /** People they shared it with, and how many of them finished a session on it. */
  sharedWith: number;
  finished: number;
}

/** What the admin's Engagement page knows about one person. Mirrors functions/engagement.py. */
export interface EngagementUser {
  uid: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  createdAt: number | null;
  lastSignInAt: number | null;
  activeSeconds: number;
  weekSeconds: number;
  todaySeconds: number;
  lastActiveAt: number | null;
  activeMinutes: number;
  /** Days with any activity, out of the last 35. */
  activeDays: number;
  decksCreated: number;
  decksKept: number;
  sessionsCompleted: number;
  questionsAnswered: number;
  decksPracticed: number;
  /** Built-in exam parts practiced, out of 3. */
  partsPracticed: number;
  sharedWithThem: number;
  sharesMade: number;
  sharesFinished: number;
  completionRate: number | null;
  score: number;
  points: Record<string, number>;
  /** Only when one person is asked for. */
  decks?: EngagementDeck[];
}

/** A deck someone shared and how far it went. */
export interface SharedDeck {
  deckId: string;
  title: string;
  part: string;
  createdAt: number | null;
  ownerUid: string;
  ownerName: string;
  ownerEmail: string;
  ownerIsAdmin: boolean;
  sharedWith: number;
  finished: number;
}

export interface ScoreRule {
  field: string;
  points: number;
  per: string;
}

const call = <I, O>(name: string, timeout?: number) => httpsCallable<I, O>(functions!, name, timeout ? { timeout } : undefined);

export async function adminListAccounts(): Promise<AdminAccount[]> {
  return (await call<void, { accounts: AdminAccount[] }>("admin_list_accounts")()).data.accounts;
}

export async function adminEngagement() {
  return (await call<object, { users: EngagementUser[]; shared: SharedDeck[]; scoring: ScoreRule[] }>("admin_engagement", 300_000)({})).data;
}

export async function adminUserEngagement(uid: string) {
  return (await call<{ uid: string }, { user: EngagementUser; scoring: ScoreRule[] }>("admin_engagement", 300_000)({ uid })).data;
}

/** Deletes the sign-in, account, access code, decks and practice history. Can't be undone. */
export async function adminDeleteAccount(uid: string): Promise<void> {
  await call<{ uid: string }, unknown>("admin_delete_account", 300_000)({ uid });
}

/** One minute of active use, for the admin's time-on-site numbers. */
export async function recordActivity(): Promise<void> {
  if (functions) await call<void, unknown>("record_activity")();
}

/** 0 → "0m", 300 → "5m", 7500 → "2h 5m". */
export const duration = (seconds: number) => {
  const m = Math.round(seconds / 60);
  if (m < 1) return "0m";
  return m < 60 ? `${m}m` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}`;
};

export const date = (ms: number | null) => (ms ? new Date(ms).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "never");

export const when = (ms: number | null) =>
  ms ? new Date(ms).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "";

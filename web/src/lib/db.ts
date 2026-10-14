import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import { isCorrect } from "./grading";
import { moveTo, opened, secondsOn } from "./timing";
import type { ConceptStat, Deck, EndReason, Mode, PracticeSession, Question } from "./types";

type NewSession = Omit<PracticeSession, "id">;

/** Where practice sessions live: Firestore when Firebase is configured, otherwise this browser. */
interface SessionStore {
  create(s: NewSession): Promise<string>;
  get(id: string): Promise<PracticeSession | null>;
  listCompleted(uid: string): Promise<PracticeSession[]>;
  /** Keys may be dotted paths into a map, such as "answers.3". */
  update(id: string, patch: Record<string, unknown>): Promise<void>;
}

const LOCAL_KEY = "eas.sessions";

function readLocal(): Record<string, PracticeSession> {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeLocal(all: Record<string, PracticeSession>) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable: the session still works until the tab closes */
  }
}

const localStore: SessionStore = {
  async create(s) {
    const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    writeLocal({ ...readLocal(), [id]: { ...s, id } });
    return id;
  },
  async get(id) {
    return readLocal()[id] ?? null;
  },
  async listCompleted(uid) {
    return Object.values(readLocal()).filter((s) => s.ownerId === uid && s.status === "completed");
  },
  async update(id, patch) {
    const all = readLocal();
    const s = all[id] as unknown as Record<string, unknown> | undefined;
    // Same rule as firestore.rules: a finished session is a record.
    if (!s || s.status === "completed") return;
    for (const [path, value] of Object.entries(patch)) {
      const [field, key] = path.split(".");
      if (key === undefined) s[field] = value;
      else s[field] = { ...(s[field] as object), [key]: value };
    }
    writeLocal(all);
  },
};

const firestoreStore = (): SessionStore => {
  const sessions = collection(db!, "sessions");
  return {
    async create(s) {
      return (await addDoc(sessions, { ...s, startedAt: serverTimestamp() })).id;
    },
    async get(id) {
      const d = await getDoc(doc(sessions, id));
      return d.exists() ? ({ ...d.data(), id: d.id } as PracticeSession) : null;
    },
    async listCompleted(uid) {
      const snap = await getDocs(query(sessions, where("ownerId", "==", uid), where("status", "==", "completed")));
      return snap.docs.map((d) => ({ ...d.data(), id: d.id }) as PracticeSession);
    },
    async update(id, patch) {
      await updateDoc(doc(sessions, id), patch as Record<string, object>);
    },
  };
};

const store: SessionStore = db ? firestoreStore() : localStore;

export function startSession(opts: { uid: string; deck: Deck; mode: Mode; questionIds: string[]; timeLimitSec: number }): Promise<string> {
  return store.create({
    ownerId: opts.uid,
    deckId: opts.deck.id,
    deckTitle: opts.deck.title,
    mode: opts.mode,
    questionIds: opts.questionIds,
    timeLimitSec: opts.timeLimitSec,
    startedAtMs: Date.now(),
    currentIndex: 0,
    answers: {},
    timings: { 0: { startedAt: 0, spentMs: 0 } },
    visitStartedAt: 0,
    status: "active",
  });
}

export const getSession = (id: string) => store.get(id);

export async function listSessions(uid: string, deckId?: string): Promise<PracticeSession[]> {
  const all = await store.listCompleted(uid);
  return deckId ? all.filter((s) => s.deckId === deckId) : all;
}

export function saveAnswer(sessionId: string, index: number, answer: string) {
  return store.update(sessionId, { [`answers.${index}`]: answer });
}

/** Saves a move between questions (forwards, backwards or a jump). */
export function saveNavigation(sessionId: string, nav: Pick<PracticeSession, "timings" | "currentIndex" | "visitStartedAt">) {
  return store.update(sessionId, { ...nav });
}

export async function finishSession(s: PracticeSession, questions: Question[], reason: EndReason, usedSec: number) {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const results: Record<string, boolean> = {};
  s.questionIds.forEach((qid, i) => {
    const q = byId.get(qid);
    results[i] = q ? isCorrect(q, s.answers[i]) : false;
  });
  const score = Object.values(results).filter(Boolean).length;
  // Close the visit in progress so every question's time is final.
  const closed = { ...s, ...moveTo(s, s.currentIndex, Math.round(usedSec * 1000)), status: "completed" as const };
  // Per-domain totals for the questions the candidate opened, used for weak-area suggestions.
  const conceptStats: Record<string, ConceptStat> = {};
  s.questionIds.forEach((qid, i) => {
    const q = byId.get(qid);
    if (!q || !opened(closed, i)) return;
    const c = (conceptStats[q.domain] ??= { attempted: 0, correct: 0, seconds: 0 });
    c.attempted += 1;
    c.correct += results[i] ? 1 : 0;
    c.seconds += secondsOn(closed, i, 0) ?? 0;
  });
  await store.update(s.id, {
    status: "completed",
    endReason: reason,
    usedSec,
    score,
    accuracy: score / s.questionIds.length,
    results,
    conceptStats,
    timings: closed.timings,
    answers: s.answers,
  });
}

import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, Timestamp, where, writeBatch } from "firebase/firestore";
import { PARTS } from "../data/exam";
import { db } from "./firebase";
import type { Deck, PartId, Question } from "./types";

/**
 * Review decks are the candidate's own collections of questions picked from any deck (a built-in part, a
 * Claude-built deck, a shared deck or another review deck), to come back to later. Each one keeps a copy of
 * its questions, so it still works after the deck a question came from is deleted or unshared.
 *
 * Their ids start with this prefix, so the app knows where to load them from without an extra lookup.
 */
export const REVIEW_PREFIX = "rv_";
export const isReviewDeckId = (id: string) => id.startsWith(REVIEW_PREFIX);
export const MAX_NAME = 60;

export interface ReviewDeck {
  id: string;
  ownerId: string;
  name: string;
  /** Keys of the questions in the deck, in the order they were added; see questionKey. */
  questionKeys: string[];
  createdAt: Date | null;
  updatedAt: Date | null;
}

/**
 * The same question always gets the same key, wherever it was added from, so it can't be added to a deck twice.
 * Questions already in a review deck remember where they came from.
 */
export const questionKey = (deckId: string, q: Question) => (q.origin ? `${q.origin.deckId}~${q.origin.questionId}` : `${deckId}~${q.id}`);

/** The copy saved in a review deck: the question as it was, minus its id and any storage fields. */
function snapshot(deckId: string, q: Question, addedAt: unknown) {
  const { id, origin, ...rest } = q as Question & { order?: unknown };
  delete (rest as { order?: unknown }).order;
  // Firestore rejects undefined values.
  const clean = JSON.parse(JSON.stringify(rest)) as Omit<Question, "id">;
  return { ...clean, origin: origin ?? { deckId, questionId: id }, addedAt };
}

export function cleanName(name: string): string {
  return name.replace(/\s+/g, " ").trim().slice(0, MAX_NAME);
}

/** Where review decks live: Firestore when Firebase is configured, otherwise this browser (like practice sessions). */
interface ReviewStore {
  list(uid: string): Promise<ReviewDeck[]>;
  get(id: string): Promise<ReviewDeck | null>;
  questions(id: string): Promise<Question[]>;
  /** Creates a deck, optionally with its first question. */
  create(uid: string, name: string, first?: { deckId: string; question: Question }): Promise<string>;
  add(id: string, deckId: string, q: Question): Promise<void>;
  remove(id: string, key: string): Promise<void>;
  rename(id: string, name: string): Promise<void>;
  delete(id: string): Promise<void>;
}

const newId = () => `${REVIEW_PREFIX}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

// ---- This browser -------------------------------------------------------------------------------------------

const LOCAL_KEY = "eas.reviewDecks";
type LocalDeck = Omit<ReviewDeck, "createdAt" | "updatedAt"> & { createdAt: number; updatedAt: number; questions: Record<string, Question> };

function readLocal(): Record<string, LocalDeck> {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeLocal(all: Record<string, LocalDeck>) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable: nothing to keep it in */
  }
}
const fromLocal = ({ questions: _q, ...d }: LocalDeck): ReviewDeck => ({ ...d, createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt) });

const localStore: ReviewStore = {
  async list(uid) {
    return Object.values(readLocal())
      .filter((d) => d.ownerId === uid)
      .map(fromLocal);
  },
  async get(id) {
    const d = readLocal()[id];
    return d ? fromLocal(d) : null;
  },
  async questions(id) {
    const d = readLocal()[id];
    return d ? d.questionKeys.map((k) => ({ ...d.questions[k], id: k })).filter((q) => q.prompt) : [];
  },
  async create(uid, name, first) {
    const id = newId();
    const now = Date.now();
    const deck: LocalDeck = { id, ownerId: uid, name, questionKeys: [], questions: {}, createdAt: now, updatedAt: now };
    if (first) {
      const key = questionKey(first.deckId, first.question);
      deck.questionKeys.push(key);
      deck.questions[key] = { ...snapshot(first.deckId, first.question, now), id: key } as Question;
    }
    writeLocal({ ...readLocal(), [id]: deck });
    return id;
  },
  async add(id, deckId, q) {
    const all = readLocal();
    const d = all[id];
    if (!d) return;
    const key = questionKey(deckId, q);
    if (!d.questionKeys.includes(key)) d.questionKeys.push(key);
    d.questions[key] = { ...snapshot(deckId, q, Date.now()), id: key } as Question;
    d.updatedAt = Date.now();
    writeLocal(all);
  },
  async remove(id, key) {
    const all = readLocal();
    const d = all[id];
    if (!d) return;
    d.questionKeys = d.questionKeys.filter((k) => k !== key);
    delete d.questions[key];
    d.updatedAt = Date.now();
    writeLocal(all);
  },
  async rename(id, name) {
    const all = readLocal();
    if (!all[id]) return;
    all[id].name = name;
    all[id].updatedAt = Date.now();
    writeLocal(all);
  },
  async delete(id) {
    const all = readLocal();
    delete all[id];
    writeLocal(all);
  },
};

// ---- Firestore ----------------------------------------------------------------------------------------------

const toDate = (v: unknown) => (v instanceof Timestamp ? v.toDate() : null);
const fromDoc = (id: string, data: Record<string, unknown>): ReviewDeck => ({
  id,
  ownerId: String(data.ownerId ?? ""),
  name: String(data.name ?? "Review deck"),
  questionKeys: (data.questionKeys as string[]) ?? [],
  createdAt: toDate(data.createdAt),
  updatedAt: toDate(data.updatedAt),
});

const firestoreStore = (): ReviewStore => {
  const decks = collection(db!, "reviewDecks");
  const qdoc = (id: string, key: string) => doc(db!, "reviewDecks", id, "questions", key);
  return {
    async list(uid) {
      // Sorted here rather than in the query, so it needs no composite index.
      const snap = await getDocs(query(decks, where("ownerId", "==", uid)));
      return snap.docs.map((d) => fromDoc(d.id, d.data()));
    },
    async get(id) {
      const d = await getDoc(doc(decks, id));
      return d.exists() ? fromDoc(d.id, d.data()) : null;
    },
    async questions(id) {
      // The questions can only be read once we know the deck exists (the rules check its owner).
      const deck = await this.get(id);
      if (!deck) return [];
      const snap = await getDocs(collection(db!, "reviewDecks", id, "questions"));
      const byKey = new Map(snap.docs.map((d) => [d.id, { ...d.data(), id: d.id } as Question]));
      return deck.questionKeys.map((k) => byKey.get(k)!).filter(Boolean);
    },
    async create(uid, name, first) {
      const id = newId();
      const batch = writeBatch(db!);
      const keys: string[] = [];
      if (first) {
        const key = questionKey(first.deckId, first.question);
        keys.push(key);
        batch.set(qdoc(id, key), snapshot(first.deckId, first.question, serverTimestamp()));
      }
      batch.set(doc(decks, id), { ownerId: uid, name, questionKeys: keys, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      await batch.commit();
      return id;
    },
    async add(id, deckId, q) {
      const key = questionKey(deckId, q);
      const batch = writeBatch(db!);
      batch.set(qdoc(id, key), snapshot(deckId, q, serverTimestamp()));
      batch.update(doc(decks, id), { questionKeys: arrayUnion(key), updatedAt: serverTimestamp() });
      await batch.commit();
    },
    async remove(id, key) {
      const batch = writeBatch(db!);
      batch.delete(qdoc(id, key));
      batch.update(doc(decks, id), { questionKeys: arrayRemove(key), updatedAt: serverTimestamp() });
      await batch.commit();
    },
    async rename(id, name) {
      const batch = writeBatch(db!);
      batch.update(doc(decks, id), { name, updatedAt: serverTimestamp() });
      await batch.commit();
    },
    async delete(id) {
      const snap = await getDocs(collection(db!, "reviewDecks", id, "questions"));
      // A batch holds up to 500 writes; delete questions in chunks, then the deck.
      for (let i = 0; i < snap.docs.length; i += 450) {
        const batch = writeBatch(db!);
        snap.docs.slice(i, i + 450).forEach((d) => batch.delete(d.ref));
        await batch.commit();
      }
      const batch = writeBatch(db!);
      batch.delete(doc(decks, id));
      await batch.commit();
    },
  };
};

const store: ReviewStore = db ? firestoreStore() : localStore;

/** The candidate's review decks, most recently changed first. */
export async function listReviewDecks(uid: string): Promise<ReviewDeck[]> {
  const all = await store.list(uid);
  return all.sort((a, b) => (b.updatedAt?.getTime() ?? Date.now()) - (a.updatedAt?.getTime() ?? Date.now()));
}

export const getReviewDeck = (id: string) => store.get(id);
export const loadReviewQuestions = (id: string) => store.questions(id);

export function createReviewDeck(uid: string, name: string, first?: { deckId: string; question: Question }): Promise<string> {
  const clean = cleanName(name);
  if (!clean) return Promise.reject(new Error("Give the deck a name."));
  return store.create(uid, clean, first);
}

export const addToReviewDeck = (id: string, fromDeckId: string, q: Question) => store.add(id, fromDeckId, q);
export const removeFromReviewDeck = (id: string, key: string) => store.remove(id, key);
export function renameReviewDeck(id: string, name: string): Promise<void> {
  const clean = cleanName(name);
  if (!clean) return Promise.reject(new Error("Give the deck a name."));
  return store.rename(id, clean);
}
export const deleteReviewDeck = (id: string) => store.delete(id);

const PART_ORDER: PartId[] = ["part1", "part2", "part3"];

/**
 * A review deck shaped like any other deck, so it can be practiced with the same screens. Its questions can come
 * from all three parts, so it carries every domain that appears in it.
 */
export function asDeck(r: ReviewDeck, questions: Question[]): Deck {
  const parts = PART_ORDER.filter((p) => questions.some((q) => q.part === p));
  const part = parts[0] ?? "part1";
  return {
    id: r.id,
    part,
    title: r.name,
    short: r.name,
    summary: "Your review deck: questions you saved to come back to.",
    domains: (parts.length ? parts : [part]).flatMap((p) => PARTS.find((x) => x.id === p)!.domains),
    questionCount: r.questionKeys.length,
    source: "review",
    createdAt: r.createdAt,
    ownerId: r.ownerId,
  };
}

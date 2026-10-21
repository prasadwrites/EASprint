import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { DECKS, getDeck as builtinDeck, getQuestions as builtinQuestions } from "../data";
import { PARTS } from "../data/exam";
import { db, functions } from "./firebase";
import type { Deck, PartId, Question } from "./types";

/** Building decks needs Claude, which runs in a Cloud Function, so it needs Firebase. */
export const canBuildDecks = !!functions;

const toDate = (v: unknown) => (v instanceof Timestamp ? v.toDate() : null);

function fromDoc(id: string, data: Record<string, unknown>): Deck {
  const part = (data.part as PartId) || "part1";
  const meta = PARTS.find((p) => p.id === part)!;
  return {
    id,
    part,
    title: String(data.title ?? "Untitled deck"),
    short: String(data.title ?? "Deck"),
    summary: `Built with Claude from “${String(data.topic ?? "")}”. ${meta.title}.`,
    domains: meta.domains,
    questionCount: Number(data.questionCount ?? 0),
    source: "ai",
    topic: String(data.topic ?? ""),
    difficulty: String(data.difficulty ?? ""),
    topics: (data.topics as string[]) ?? [],
    createdAt: toDate(data.createdAt),
    status: (data.status as Deck["status"]) ?? "ready",
    requested: Number(data.requested ?? data.questionCount ?? 0),
    progress: Number(data.progress ?? 0),
    error: data.error ? String(data.error) : undefined,
  };
}

/** Live updates for a Claude-built deck, so its page can show progress while it generates. */
export function watchDeck(id: string, cb: (d: Deck | null) => void): () => void {
  if (builtinDeck(id) || !db) return () => undefined;
  return onSnapshot(doc(db, "decks", id), (s) => cb(s.exists() ? fromDoc(s.id, s.data()) : null));
}

/** A built-in exam part, or one of the candidate's own decks. */
export async function loadDeck(id: string): Promise<Deck | null> {
  const builtin = builtinDeck(id);
  if (builtin || !db) return builtin;
  const d = await getDoc(doc(db, "decks", id));
  return d.exists() ? fromDoc(d.id, d.data()) : null;
}

export async function loadQuestions(deckId: string): Promise<Question[]> {
  if (builtinDeck(deckId) || !db) return builtinQuestions(deckId);
  const snap = await getDocs(query(collection(db, "decks", deckId, "questions"), orderBy("order")));
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }) as Question);
}

export async function listMyDecks(uid: string): Promise<Deck[]> {
  if (!db) return [];
  const snap = await getDocs(query(collection(db, "decks"), where("ownerId", "==", uid), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => fromDoc(d.id, d.data()));
}

export const BUILTIN_DECKS = DECKS;

export interface GenerateInput {
  deckId?: string;
  topic: string;
  part: PartId;
  count: number;
  difficulty: string;
  notes: string;
  accessCode: string;
}

/**
 * Starts building a deck and resolves with its id as soon as the server has accepted the request and
 * created the deck, so the app can show progress. Problems found up front (a wrong access code, a plan
 * limit) reject. Later failures are recorded on the deck itself.
 */
export function generateDeck(input: GenerateInput): Promise<string> {
  const deckId = doc(collection(db!, "decks")).id;
  const call = httpsCallable<GenerateInput, { deckId: string }>(functions!, "generate_deck", { timeout: 3_600_000 });
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      stop();
      fn();
    };
    // The deck can only be read once it exists and is ours, so errors before then just mean "not yet".
    const stop = onSnapshot(
      doc(db!, "decks", deckId),
      (s) => s.exists() && finish(() => resolve(deckId)),
      () => undefined,
    );
    call({ ...input, deckId }).then(
      () => finish(() => resolve(deckId)),
      (e) => finish(() => reject(e)),
    );
  });
}

/** Deletes a Claude-built deck with its questions and the practice sessions taken on it. */
export async function deleteDeck(deckId: string): Promise<void> {
  await httpsCallable(functions!, "delete_deck")({ deckId });
}

export const DELETE_WARNING =
  "Delete this deck? Its questions and your practice results on it are removed for good. Deleting doesn't give back a deck on your plan.";

import { collection, doc, getDoc, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
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
  };
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
  topic: string;
  part: PartId;
  count: number;
  difficulty: string;
  notes: string;
  accessCode: string;
}

export async function generateDeck(input: GenerateInput) {
  const call = httpsCallable<GenerateInput, { deckId: string; questionCount: number; dropped: number }>(functions!, "generate_deck", {
    timeout: 540_000,
  });
  return (await call(input)).data;
}

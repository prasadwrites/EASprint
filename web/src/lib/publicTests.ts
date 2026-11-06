import { httpsCallable } from "firebase/functions";
import { getDeck, getQuestions } from "../data";
import { functions } from "./firebase";
import type { PartId, Question } from "./types";

/**
 * Public test links: the admin turns a deck into a test anyone can take from a link, without signing in.
 * The functions keep the links (publicTests/{token}); see functions/public_tests.py.
 */
export interface PublicLink {
  token: string;
  deckId: string;
  kind: "builtin" | "ai" | "review";
  title: string;
  part: string;
  active: boolean;
  createdAt: number | null;
  /** Times the test was opened, and attempts finished. */
  opens: number;
  finishes: number;
}

export interface PublicTest {
  title: string;
  part: PartId | "";
  questions: Question[];
}

/** Public links need the Cloud Functions, so they only work with Firebase. */
export const canSharePublicly = !!functions;

const call = <I, O>(name: string) => httpsCallable<I, O>(functions!, name);

export const publicUrl = (token: string) => `${window.location.origin}/t/${token}`;

export async function getPublicLink(deckId: string): Promise<PublicLink | null> {
  return (await call<object, { link: PublicLink | null }>("admin_public_link")({ action: "get", deckId })).data.link;
}

/** Makes the deck's public link, or returns the one it already has. */
export async function createPublicLink(deckId: string): Promise<PublicLink> {
  return (await call<object, { link: PublicLink }>("admin_public_link")({ action: "create", deckId })).data.link!;
}

export async function disablePublicLink(token: string): Promise<void> {
  await call<object, unknown>("admin_public_link")({ action: "disable", token });
}

export async function listPublicLinks(): Promise<PublicLink[]> {
  return (await call<object, { links: PublicLink[] }>("admin_public_link")({ action: "list" })).data.links;
}

export async function loadPublicTest(token: string): Promise<PublicTest> {
  const res = await call<{ token: string }, { deckId: string; kind: string; title: string; part: PartId | ""; questions: Question[] | null }>("get_public_test")({ token });
  const { deckId, title, part, questions } = res.data;
  // Built-in exam parts ship with the app, so the server only names the part.
  return { title: getDeck(deckId)?.title ?? title, part, questions: questions ?? getQuestions(deckId) };
}

/** Counts a finished attempt for the admin. Best effort: the taker's results never depend on it. */
export function reportFinished(token: string, score: number, total: number): void {
  call<object, unknown>("public_test_finished")({ token, score, total }).catch(() => undefined);
}

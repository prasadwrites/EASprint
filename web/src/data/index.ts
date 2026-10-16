import type { Deck, PartId, Question } from "../lib/types";
import { PARTS } from "./exam";
import { PART1 } from "./part1";
import { PART2 } from "./part2";
import { PART3 } from "./part3";

const BANK: Record<PartId, Question[]> = { part1: PART1, part2: PART2, part3: PART3 };

export const DECKS: Deck[] = PARTS.map((p) => ({ ...p, part: p.id, source: "builtin", questionCount: BANK[p.id].length }));

export const getDeck = (id: string): Deck | null => DECKS.find((d) => d.id === id) ?? null;

export const getQuestions = (deckId: string): Question[] => BANK[deckId as PartId] ?? [];

const DOMAIN_NAMES = new Map(PARTS.flatMap((p) => p.domains.map((d) => [d.id, d.name] as const)));

export const domainName = (id: string) => DOMAIN_NAMES.get(id) ?? id;

/** The part a domain belongs to, for linking a weak domain back to practice. */
export const partOfDomain = (id: string) => PARTS.find((p) => p.domains.some((d) => d.id === id))?.id ?? null;

import type { ReactNode } from "react";
import type { SourceKey } from "../data/sources";
import type { PartId } from "../lib/types";
import type { CastMember } from "./cast";

/** A speech bubble laid over a comic panel. Position and width are percentages of the panel. */
export interface Bubble {
  who: CastMember | "Narrator";
  text: string;
  x: number;
  y: number;
  w: number;
  /** Which way the bubble's tail points, toward the speaker. */
  tail?: "down-left" | "down-right" | "down";
  /** Big shouted text. */
  shout?: boolean;
}

export interface ComicPanel {
  art: ReactNode;
  bubbles: Bubble[];
  /** What the panel shows, for screen readers. */
  alt: string;
}

export interface ConceptCard {
  title: string;
  art: ReactNode;
  alt: string;
  body: string[];
  /** A small table under the body, e.g. rate thresholds. */
  table?: { head: string[]; rows: string[][] };
  /** One line that "Add to my notes" copies into the notes. */
  keyPoint: string;
}

/**
 * A case in the "Ace vs. Hoot" game at the end of a lesson. The cast are the taxpayers, but the question
 * tests the rule from the topic, never what happened in the episode: every fact needed is in the case.
 */
export interface CaseFile {
  /** Whose case it is; their face is on the case card. */
  who: CastMember;
  title: string;
  facts: string;
  question: string;
  choices: string[];
  answer: string;
  /** Why the answer is right, in a sentence or two. */
  why: string;
}

export interface Lesson {
  id: string;
  part: PartId;
  domainId: string;
  /** The topic number in the Study outline, e.g. "2.5". */
  number: string;
  /** The episode title in the Ledger Falls series (see the series bible). */
  episode: string;
  title: string;
  minutes: number;
  /** Law the lesson is written to. */
  lawAsOf: string;
  intro: string;
  /** "Previously in Ledger Falls": one line that ties the episode to the last one. */
  previously?: string;
  comic: ComicPanel[];
  cards: ConceptCard[];
  hook: { line: string; more: string; art: ReactNode; alt: string };
  traps: { title: string; text: string }[];
  sources: { key: SourceKey; section: string }[];
  /** The Ace vs. Hoot game: cases about the cast that test this topic's rules. */
  cases: CaseFile[];
  /** Built-in bank questions (by topic chip) added to the game as Hoot's bonus round. */
  quizTopics: string[];
  /** What to ask the deck builder for when the student builds a quiz on this topic. */
  quizBrief: string;
}

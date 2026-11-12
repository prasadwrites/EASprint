import type { ReactNode } from "react";
import type { SourceKey } from "../data/sources";
import type { PartId } from "../lib/types";

/** A speech bubble laid over a comic panel. Position and width are percentages of the panel. */
export interface Bubble {
  who: "Penny" | "Ace" | "Hoot" | "Narrator";
  text: string;
  x: number;
  y: number;
  w: number;
  /** Which way the bubble's tail points, toward the speaker. */
  tail?: "down-left" | "down-right" | "down";
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
  comic: ComicPanel[];
  cards: ConceptCard[];
  hook: { line: string; more: string; art: ReactNode; alt: string };
  traps: { title: string; text: string }[];
  sources: { key: SourceKey; section: string }[];
  /** Built-in bank questions (by topic chip) used for "Check yourself". */
  quizTopics: string[];
}

export type Difficulty = "Easy" | "Medium" | "Hard";

export type PartId = "part1" | "part2" | "part3";

/** Where a question's answer can be checked on irs.gov. */
export interface SourceRef {
  key: string;
  /** Chapter, section or heading inside the source. */
  section: string;
}

export interface Question {
  id: string;
  part: PartId;
  /** Domain id from the IRS content outline, e.g. "p1d2". */
  domain: string;
  topic: string;
  difficulty: Difficulty;
  prompt: string;
  /** Four options in a fixed order that is shuffled once per question, not per visit. */
  choices: string[];
  answer: string;
  /** Paragraphs separated by blank lines: the rule, how it applies here, and a tip. */
  explanation: string;
  /** Why each wrong option is wrong, keyed by the option text. */
  whyNot: Record<string, string>;
  source: SourceRef;
}

export interface Domain {
  id: string;
  name: string;
  /** Scored questions on the real exam, from the IRS content outline. */
  examQuestions: number;
}

/** One exam part. Called a deck so the practice flow reads the same as MathSprint's. */
export interface Deck {
  id: PartId;
  title: string;
  short: string;
  summary: string;
  domains: Domain[];
  questionCount: number;
}

export interface AppUser {
  uid: string;
  displayName: string | null;
  email: string | null;
}

/** Times are milliseconds since the session started, so they survive clock changes and refreshes. */
export interface QuestionTiming {
  startedAt: number;
  answeredAt?: number;
  /** Total time across all visits. */
  spentMs?: number;
}

export type EndReason = "finished" | "timeout" | "quit";

/** learn: no clock. practice: the candidate's own limit. exam: the real exam's pace. */
export type Mode = "learn" | "practice" | "exam";

export interface ConceptStat {
  attempted: number;
  correct: number;
  seconds: number;
}

export interface PracticeSession {
  id: string;
  ownerId: string;
  deckId: string;
  deckTitle: string;
  mode: Mode;
  questionIds: string[];
  timeLimitSec: number;
  startedAtMs: number;
  /** The question on screen. Candidates can move back and forth, so this is not a count of finished questions. */
  currentIndex: number;
  /** When the visit to the current question began. */
  visitStartedAt?: number;
  answers: Record<string, string>;
  timings: Record<string, QuestionTiming>;
  status: "active" | "completed";
  endReason?: EndReason;
  usedSec?: number;
  score?: number;
  accuracy?: number;
  results?: Record<string, boolean>;
  /** Keyed by domain id. */
  conceptStats?: Record<string, ConceptStat>;
}

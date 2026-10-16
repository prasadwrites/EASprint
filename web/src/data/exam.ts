import type { Deck, Difficulty, PartId, Question } from "../lib/types";
import { SOURCES, type SourceKey } from "./sources";

/**
 * Facts about the Special Enrollment Examination (SEE), from the IRS enrolled agent FAQ
 * and the IRS content outlines for each part.
 */
export const EXAM = {
  questionsPerPart: 100,
  scoredPerPart: 85,
  minutesPerPart: 210,
  passingScore: 500,
  /** 3.5 hours for 100 questions. */
  secondsPerQuestion: 126,
  taxLawThrough: "December 31, 2025",
  taxYear: 2025,
  window: "July 1, 2026 to February 28, 2027",
};

type PartMeta = Omit<Deck, "questionCount" | "source" | "part"> & { id: PartId };

export const PARTS: PartMeta[] = [
  {
    id: "part1",
    title: "Part 1: Individuals",
    short: "Part 1",
    summary: "Filing status and dependents, income and assets, deductions and credits, other taxes, planning, and estate, gift and foreign reporting.",
    domains: [
      { id: "p1d1", name: "Preliminary Work and Taxpayer Data", examQuestions: 14 },
      { id: "p1d2", name: "Income and Assets", examQuestions: 17 },
      { id: "p1d3", name: "Deductions and Credits", examQuestions: 17 },
      { id: "p1d4", name: "Taxation", examQuestions: 15 },
      { id: "p1d5", name: "Advising the Individual Taxpayer", examQuestions: 11 },
      { id: "p1d6", name: "Specialized Returns for Individuals", examQuestions: 11 },
    ],
  },
  {
    id: "part2",
    title: "Part 2: Businesses",
    short: "Part 2",
    summary: "Entity types, partnerships, C and S corporations, business income and deductions, assets, and trusts, exempt organizations, retirement plans, farms and rentals.",
    domains: [
      { id: "p2d1", name: "Business Entities and Considerations", examQuestions: 30 },
      { id: "p2d2", name: "Business Tax Preparation", examQuestions: 37 },
      { id: "p2d3", name: "Specialized Returns and Taxpayers", examQuestions: 18 },
    ],
  },
  {
    id: "part3",
    title: "Part 3: Representation, Practices and Procedures",
    short: "Part 3",
    summary: "Circular 230, powers of attorney, examinations and appeals, penalties and collection, and the filing process for preparers.",
    domains: [
      { id: "p3d1", name: "Practices and Procedures", examQuestions: 26 },
      { id: "p3d2", name: "Representation before the IRS", examQuestions: 25 },
      { id: "p3d3", name: "Specific Areas of Representation", examQuestions: 20 },
      { id: "p3d4", name: "Filing Process", examQuestions: 14 },
    ],
  },
];

/** Deterministic shuffle, so a question's options stay in the same order on every visit. */
export function stableShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) + i;
    const j = (h >>> 0) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const LEVELS: Record<string, Difficulty> = { E: "Easy", M: "Medium", H: "Hard" };

type Wrong = [option: string, whyNot: string];

/** Builds the question writer for one domain. The right answer is listed first and shuffled in. */
export function domain(part: PartId, domainId: string) {
  let n = 0;
  return (
    level: "E" | "M" | "H",
    topic: string,
    prompt: string,
    right: string,
    wrong: [Wrong, Wrong, Wrong],
    explanation: string,
    source: SourceKey,
    section: string,
  ): Question => {
    const id = `${domainId}-${String(++n).padStart(2, "0")}`;
    return {
      id,
      part,
      domain: domainId,
      topic,
      difficulty: LEVELS[level],
      prompt,
      choices: stableShuffle([right, ...wrong.map(([w]) => w)], id),
      answer: right,
      explanation,
      whyNot: Object.fromEntries(wrong),
      source: { key: source, section },
    };
  };
}

export const sourceOf = (q: Question): { title: string; url: string } =>
  q.source.url ? { title: q.source.title || q.source.url, url: q.source.url } : SOURCES[q.source.key as SourceKey];

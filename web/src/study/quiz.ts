import type { PartId } from "../lib/types";

/**
 * Building a quiz from a lesson or a unit uses the existing deck builder (/create), prefilled. The topic
 * names the rules to test; the notes turn every question into a Ledger Falls case file. The server keeps
 * at most 200 characters of topic and 600 of notes (functions/main.py), and study.test.ts checks both.
 */
export const CAST_QUIZ_NOTES =
  "Write each question as a short Ledger Falls case about the cartoon cast: Penny Pocket; her husband Milo Marsh, a dog walker; Lulu Pocket, 9, daughter of Penny's cousin Dee, who lives with them; Cousin Dee Pocket, on an oil rig overseas; Aunt Rosa Pocket; Ace Okafor, EA; IRS examiner Hoot. Put every fact needed in the question. Test the tax rules only, never the cartoon story or what a character said in a lesson.";

export function quizLink(part: PartId, topic: string): string {
  const q = new URLSearchParams({ part, topic, notes: CAST_QUIZ_NOTES });
  return `/create?${q.toString()}`;
}

/** The end-of-unit quiz topics, by domain id. */
export const UNIT_QUIZ: Record<string, string> = {
  p1d1: "Part 1 Domain 1, preliminary work and taxpayer data: TINs, residency, filing requirements and status, dependents, kiddie tax, IRS notices, FBAR, Form 8938, ACA",
  p1d2: "Part 1 Domain 2, income and assets: wages, interest, dividends, rental, retirement, foreign income, basis, capital gains, special sales and adjustments",
};

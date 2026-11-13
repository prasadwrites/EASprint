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
  p1d3: "Part 1 Domain 3, deductions and credits: standard vs itemized deductions, QBI, child and other dependent credits, education credits, EITC due diligence, energy and other credits",
  p1d4: "Part 1 Domain 4, taxation: AMT, self-employment and household employment taxes, NIIT and Additional Medicare Tax, decedents, clergy, military, penalties and estimated tax",
  p1d5: "Part 1 Domain 5, advising the individual: divorce, education savings, spousal IRA, tax planning moves, MFJ vs MFS, innocent and injured spouse, amended returns",
  p1d6: "Part 1 Domain 6, specialized returns: estate tax and Form 706, portability, gift tax and Form 709, gift splitting, FBAR, Form 8938, Form 3520 and other foreign forms",
  p2d1: "Part 2 Domain 1, business entities: sole proprietors, partnerships, C and S corporations, LLC classification, partner and shareholder basis, distributions, Form 2553",
  p2d2: "Part 2 Domain 2, business income and deductions: COGS, expenses, travel and meals, depreciation, dispositions, like-kind, payroll and FUTA, 1099s, NOLs, QBI, books",
  p2d3: "Part 2 Domain 3, specialized returns: Form 1041 and trust exemptions, exempt organizations and UBI, SEP and SIMPLE plans, farmers, rental real estate and passive rules",
  p3d1: "Part 3 Domain 1, practice before the IRS: who may practice, limited practice, Circular 230 duties, fees, advertising, conflicts of interest, disreputable conduct, sanctions, CE",
  p3d2: "Part 3 Domain 2, representation: Forms 2848 and 8821, CAF, privilege, assessment and collection statutes, notices of deficiency, Tax Court, Appeals, taxpayer rights",
  p3d3: "Part 3 Domain 3, specific types of representation: installment agreements, offers in compromise, liens, levies, CDP, penalties and abatement, trust fund recovery penalty",
  p3d4: "Part 3 Domain 4, completion of the filing process: PTINs, e-file rules, Forms 8879 and 8948, due diligence, preparer records, disclosure rules and data security",
};

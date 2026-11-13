import type { PartId } from "../lib/types";

/**
 * The Study outline: every SEE domain from the IRS content outlines (see data/exam.ts), split into
 * study-sized lesson topics. A topic with a `lessonId` has a lesson; the rest are listed as coming soon.
 */
export interface StudyTopic {
  /** Shown as "2.5": domain number, then topic number within the domain. */
  number: string;
  title: string;
  subtopics: string;
  lessonId?: string;
}

export interface StudyDomain {
  /** Domain id from data/exam.ts, e.g. "p1d2". */
  id: string;
  topics: StudyTopic[];
}

const t = (number: string, title: string, subtopics: string, lessonId?: string): StudyTopic => ({ number, title, subtopics, lessonId });

export const STUDY_OUTLINE: Record<PartId, StudyDomain[]> = {
  part1: [
    {
      id: "p1d1",
      topics: [
        t("1.1", "Getting started", "Return prep steps, prior-year returns, taxpayer biographical and residency data", "p1-getting-started"),
        t("1.2", "Who must file and how", "Filing requirements, filing status, special filing rules", "p1-filing-status"),
        t("1.3", "Dependents and the family", "Dependency rules, kiddie tax", "p1-dependents"),
        t("1.4", "The taxpayer's paper trail", "Sources of income, adjustments, credits and payments; IRS notices; extra filings", "p1-paper-trail"),
        t("1.5", "Foreign accounts and ACA", "Foreign account reporting triggers, Affordable Care Act requirements", "p1-foreign-aca"),
      ],
    },
    {
      id: "p1d2",
      topics: [
        t("2.1", "Everyday income", "Wages, interest, dividends, gambling, cancellation of debt, other income", "p1-everyday-income"),
        t("2.2", "Rental, royalty and pass-through income", "Rental and royalty income, K-1 income from partnerships, S corporations and trusts", "p1-rental-passthrough"),
        t("2.3", "Retirement and Social Security", "IRA and plan distributions, rollovers, taxable Social Security", "p1-retirement"),
        t("2.4", "Foreign income", "Foreign earned income and exclusions", "p1-foreign-income"),
        t("2.5", "Basis, property sales and capital gains", "Basis (bought, gifted, inherited), sales of property, capital gains and losses, home sale exclusion", "p1-basis"),
        t("2.6", "Special sales", "Installment sales, options, like-kind exchanges, bad debts, investor versus trader", "p1-special-sales"),
        t("2.7", "Adjustments to income", "HSA, student loan interest, educator expenses, alimony, self-employed retirement", "p1-adjustments"),
      ],
    },
    {
      id: "p1d3",
      topics: [
        t("3.1", "Standard versus itemized", "Medical, taxes, interest, charitable, casualty and other itemized deductions", "p1-itemized"),
        t("3.2", "QBI deduction", "Qualified business income deduction for individuals", "p1-qbi"),
        t("3.3", "Family credits", "Child tax credit, child and dependent care credit, adoption credit", "p1-family-credits"),
        t("3.4", "Education credits", "American Opportunity and Lifetime Learning credits", "p1-education-credits"),
        t("3.5", "Earned income credit", "EITC eligibility and due diligence", "p1-eitc"),
        t("3.6", "Other credits", "Foreign tax credit, premium tax credit, energy and other credits", "p1-other-credits"),
      ],
    },
    {
      id: "p1d4",
      topics: [
        t("4.1", "Alternative minimum tax", "AMT calculation and triggers"),
        t("4.2", "Self-employment and household employees", "Self-employment tax, household employee taxes"),
        t("4.3", "Extra Medicare and investment taxes", "Net investment income tax, Additional Medicare Tax, excess Social Security withholding, uncollected taxes"),
        t("4.4", "Special taxpayers", "Clergy, military, income in respect of a decedent"),
        t("4.5", "Penalties and interest", "Underpayment, late filing and late payment penalties for individuals"),
      ],
    },
    {
      id: "p1d5",
      topics: [
        t("5.1", "Life events", "Marriage, divorce, education and estate planning, retirement planning"),
        t("5.2", "Tax planning moves", "Timing of income and deductions, filing status comparison, carryovers, estimated tax"),
        t("5.3", "Spouse relief and refunds", "Injured spouse, innocent spouse, refund claims, penalties of perjury"),
      ],
    },
    {
      id: "p1d6",
      topics: [
        t("6.1", "Estate tax", "Form 706, gross estate, deductions, portability"),
        t("6.2", "Gift tax", "Form 709, annual exclusion, gift splitting"),
        t("6.3", "International information returns", "FBAR (FinCEN 114), Form 8938 and related forms"),
      ],
    },
  ],
  part2: [
    {
      id: "p2d1",
      topics: [
        t("1.1", "Picking an entity", "Entity types, default classifications, EINs, tax years, hobby versus business, information returns"),
        t("1.2", "Partnerships", "Formation, income and deductions, partner basis, dispositions of interests, partnership audits"),
        t("1.3", "C corporations", "Formation, filing, earnings and profits, distributions, liquidations, accumulated earnings tax, controlled groups"),
        t("1.4", "S corporations", "Qualification, election, shareholder basis, distributions, termination"),
      ],
    },
    {
      id: "p2d2",
      topics: [
        t("2.1", "Business income and cost of goods sold", "Gross receipts, inventory, COGS, accounting methods"),
        t("2.2", "Business expenses", "Ordinary and necessary expenses, compensation, taxes, casualties, home office, capitalization"),
        t("2.3", "Travel, meals and vehicles", "Travel, meals and vehicle expense rules"),
        t("2.4", "Depreciation", "MACRS, section 179, bonus depreciation, recapture"),
        t("2.5", "Assets and dispositions", "Asset basis, sales of business property, related-party transactions"),
        t("2.6", "Employment taxes and workers", "Payroll taxes, employee versus contractor, ACA employer compliance"),
        t("2.7", "Credits, losses and QBI", "General business credits, net operating losses, at-risk rules, QBI at the business level"),
        t("2.8", "Reading the books", "Financial statement analysis, book-to-tax reconciliation, pass-through items to owners"),
        t("2.9", "Advising the business", "Entity selection, recordkeeping, tax planning"),
      ],
    },
    {
      id: "p2d3",
      topics: [
        t("3.1", "Trusts and estates", "Form 1041, fiduciary income, distributable net income"),
        t("3.2", "Exempt organizations", "Form 990 series, unrelated business income"),
        t("3.3", "Business retirement plans", "SEP, SIMPLE, 401(k) and other employer plans"),
        t("3.4", "Farmers", "Schedule F and farm rules"),
        t("3.5", "Rental property as a business", "Rental activity rules, passive activity limits"),
      ],
    },
  ],
  part3: [
    {
      id: "p3d1",
      topics: [
        t("1.1", "Who can practice", "Practice before the IRS, EA requirements, PTINs, continuing education"),
        t("1.2", "Circular 230 conduct", "Fees, advertising, conflicts of interest, due diligence"),
        t("1.3", "When things go wrong", "Sanctionable conduct, return preparer penalties, signing returns"),
      ],
    },
    {
      id: "p3d2",
      topics: [
        t("2.1", "Power of attorney", "Forms 2848 and 8821, Centralized Authorization File, Publication 216"),
        t("2.2", "Building the case", "Case preparation, the taxpayer's financial situation, supporting documents, legal authority"),
        t("2.3", "Deadlines and protections", "Statute of limitations, Taxpayer Advocate Service, identity theft"),
      ],
    },
    {
      id: "p3d3",
      topics: [
        t("3.1", "Collections", "Extensions, installment agreements, offers in compromise, levies, liens, currently not collectible, passport revocation"),
        t("3.2", "Audits and appeals", "Exam types, appeal rights and process"),
        t("3.3", "Fixing past returns", "Amended returns, refund claims, penalty abatement"),
        t("3.4", "Trust fund recovery penalty", "Who is responsible and how the penalty is assessed"),
      ],
    },
    {
      id: "p3d4",
      topics: [
        t("4.1", "E-file rules", "EFIN, ERO responsibilities, Forms 8879 and 8453, rejected returns"),
        t("4.2", "Accuracy, records and security", "Return accuracy, record retention, data security"),
      ],
    },
  ],
};

export const topicCount = () => Object.values(STUDY_OUTLINE).reduce((n, ds) => n + ds.reduce((m, d) => m + d.topics.length, 0), 0);

/** Each exam part is a season of Ledger Falls (see the series bible). */
export const SEASONS: Record<PartId, { number: number; name: string; blurb: string }> = {
  part1: { number: 1, name: "Penny's Year", blurb: "Penny marries at 11:59 PM, takes in Lulu, inherits Grandpa Walt's stock and side-hustles through every rule for individuals." },
  part2: { number: 2, name: "Rosa's Rolls", blurb: "Aunt Rosa's bakery grows from a kitchen side gig to a partnership to an S corporation." },
  part3: { number: 3, name: "Ace for the Defense", blurb: "Ace's own practice, Circular 230, and the day Examiner Hoot audits the Pockets." },
};

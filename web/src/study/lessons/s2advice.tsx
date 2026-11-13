import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import { Crate, Gerald } from "../bakery";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Shoebox, Step } from "../props";

// Part 2, topic 2.9: advising the business: choosing an entity, S corporation reasonable compensation,
// recordkeeping and retention periods, business estimated tax, and common planning moves. Written to
// Publication 583, Publication 542, Publication 15 and the Form 1120-W and 2553 instructions for 2025.

const INK = "#2a2f3a";

/** A crystal ball on a little stand. (x, y) is the bottom center. */
function CrystalBall({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-22,0 L-16,-12 H16 L22,0 Z" fill="#7a5fb0" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <circle cx={0} cy={-36} r={26} fill="#d4ebfa" stroke={INK} strokeWidth={3} />
      <path d="M-12,-48 q6,-8 14,-6" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
      <text x={0} y={-30} textAnchor="middle" fontSize={11} fontWeight={900} fill="#7a5fb0" fontFamily="inherit">
        2026
      </text>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Milo gazes into a crystal ball reading 2026. Rosa looks unconvinced.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Milo x={66} y={128} scale={0.76} mood="excited" pose="up" />
        <CrystalBall x={156} y={190} scale={1} />
        <Rosa x={258} y={128} scale={0.76} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "I see... 2026! Rosa's Rolls becomes a cinnamon EMPIRE!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Rosa", text: "I'd settle for a smaller tax bill.", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at a card comparing pass-through entities with a C corporation. Rosa winces.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={88} w={110} h={70} lines={["Pass-through: once", "C corp: 21%", "+ dividends again"]} size={9.5} color="#fff" />
        <Rosa x={262} y={128} scale={0.76} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Pass-throughs are taxed once, on the owners' returns. A C corp pays 21%, then dividends are taxed again.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Rosa", text: "Taxed twice? Like Biscuit begging twice.", x: 62, y: 4, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Penny explains salary and distributions for an S corporation. Milo has an idea.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={92} w={104} h={64} lines={["Salary: payroll tax", "Distributions:", "no SE tax"]} size={9.5} color="#fff" />
        <Milo x={262} y={128} scale={0.76} mood="smug" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "As an S corp, Rosa takes a salary. Profit paid out beyond that skips self-employment tax.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Milo", text: "So she pays herself a salary of $1!", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of a crate of rolls, glaring. Milo backs away.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Hoot x={84} y={92} scale={0.52} mood="stern" pose="up" />
        <Crate x={84} y={206} scale={1.05} label="ROLLS" />
        <Milo x={256} y={128} scale={0.76} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "A REASONABLE salary. Not a dollar. I can recharacterize distributions as wages.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Milo", text: "Does he live in every crate?", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a shoebox of records. Biscuit chews a receipt. Lulu translates.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Penny x={66} y={128} scale={0.76} mood="worried" pose="hold" holding={<Shoebox x={0} y={0} />} />
        <Biscuit x={176} y={190} scale={0.56} mood="happy" />
        <Paper x={200} y={170} label="RCPT" scale={0.5} rotate={20} />
        <Lulu x={276} y={160} scale={0.56} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Keep records at least 3 years, employment tax records 4, and asset records until 3 years after you sell.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Lulu", text: "Biscuit votes for zero years.", x: 66, y: 6, w: 31, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa signs Form 2553 with Gerald the sourdough jar as witness. Ace gives a thumbs up.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f1fb" />
        <Rosa x={66} y={128} scale={0.76} mood="excited" pose="hold" />
        <Paper x={122} y={100} label="2553" sub="S corp 2026" scale={0.85} rotate={-6} />
        <Gerald x={180} y={196} scale={0.9} mood="happy" />
        <Ace x={262} y={128} scale={0.74} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Signed! An S corporation from January 1, 2026. Gerald witnessed it.", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Ace", text: "Due by March 15. You're early! Who ARE you?", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Choosing an entity",
    alt: "A comparison of sole proprietorships, partnerships, S corporations and C corporations by who pays tax, self-employment tax and how losses are used.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={8} y={14} w={72} h={100} color="#fff" label="Sole" sub="Schedule C" />
        <Step x={86} y={14} w={72} h={100} color="#fff3c4" label="Partner" sub="1065 + K-1" />
        <Step x={164} y={14} w={72} h={100} color="#d4ebfa" label="S corp" sub="1120-S + K-1" />
        <Step x={242} y={14} w={70} h={100} color="#fde2e4" label="C corp" sub="1120, 21%" />
        <Label x={160} y={146} size={10} weight={700}>Pass-throughs: taxed once · C corp: twice</Label>
      </svg>
    ),
    body: [
      "A sole proprietor reports profit on Schedule C and pays self-employment tax on all of it. A partnership files Form 1065 and passes items to partners on K-1s; general partners pay SE tax on their share of trade or business income. An S corporation also passes income through, but owner-employees pay payroll tax only on wages, and it's limited to 100 shareholders and one class of stock.",
      "A C corporation pays a flat 21% tax, and shareholders pay tax again on dividends; its losses stay in the corporation. The QBI deduction is available to pass-through owners, not C corporations. Single-member LLCs are disregarded by default but can elect corporate (and then S) status.",
    ],
    table: {
      head: ["Entity", "Who pays", "SE / payroll tax", "Losses"],
      rows: [
        ["Sole prop", "Owner (Sch. C)", "SE tax on all profit", "Owner"],
        ["Partnership", "Partners (K-1)", "General partners", "Partners"],
        ["S corp", "Shareholders (K-1)", "Wages only", "Shareholders"],
        ["C corp", "Corp 21% + dividends", "Wages only", "Stay in corp"],
      ],
    },
    keyPoint: "Sole prop: Schedule C, SE tax on all profit. Partnership: 1065/K-1, general partners pay SE tax. S corp: 1120-S/K-1, payroll tax on wages only, ≤ 100 shareholders, one class of stock. C corp: 21% + tax on dividends, losses stay inside, no QBI. SMLLC: disregarded unless it elects.",
  },
  {
    title: "Reasonable compensation",
    alt: "An S corporation shareholder who works in the business must be paid a reasonable salary before taking distributions. Otherwise the IRS can treat distributions as wages.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={100} color="#fff" label="Salary" sub="FICA, W-2" />
        <Step x={166} y={14} w={140} h={100} color="#d8f0e2" label="Distribution" sub="no FICA, no SE" />
        <Label x={160} y={140} size={10} weight={700}>Salary first, and it must be reasonable</Label>
        <Label x={160} y={158} size={10} weight={700}>Too low: distributions recharacterized as wages</Label>
      </svg>
    ),
    body: [
      "Shareholders who perform services for their S corporation are employees and must receive reasonable compensation (what similar businesses would pay for similar services) before taking non-wage distributions. Wages are subject to FICA, withholding and FUTA and go on a W-2.",
      "Distributions beyond reasonable pay aren't subject to employment tax. If a shareholder-employee takes little or no salary but large distributions, the IRS can recharacterize distributions as wages and assess employment taxes and penalties. Reasonable compensation also reduces QBI, since wages paid to the owner aren't QBI.",
    ],
    keyPoint: "S corp shareholder-employees must get reasonable compensation (market pay for services) before distributions. Wages: FICA, FUTA, withholding, W-2. Distributions: no employment tax. Too little salary → IRS recharacterizes distributions as wages. Owner's wages aren't QBI.",
  },
  {
    title: "How long to keep records",
    alt: "Keep records 3 years generally, 6 years if income was underreported by more than 25%, 7 years for bad debt or worthless securities, 4 years for employment taxes, and property records until the period for the year of sale closes.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={8} y={14} w={56} h={100} color="#fff" label="3" sub="most" />
        <Step x={70} y={14} w={56} h={100} color="#d4ebfa" label="4" sub="payroll" />
        <Step x={132} y={14} w={56} h={100} color="#fff3c4" label="6" sub="25% miss" />
        <Step x={194} y={14} w={56} h={100} color="#fde2e4" label="7" sub="bad debt" />
        <Step x={256} y={14} w={56} h={100} color="#e7e3f3" label="∞" sub="no return" />
        <Label x={160} y={146} size={10} weight={700}>Property: until 3 years after the year you sell</Label>
      </svg>
    ),
    body: [
      "Records must be kept as long as they may be needed for the tax law, which is generally the period of limitations: 3 years from filing. Keep them 6 years if income was underreported by more than 25% of gross income shown, 7 years for a claim for a loss from worthless securities or a bad debt deduction, and indefinitely if no return was filed or a fraudulent return was filed.",
      "Employment tax records must be kept at least 4 years after the tax is due or paid, whichever is later. Records for property (purchase, improvements, depreciation) are kept until the period of limitations expires for the year the property is disposed of. Electronic records are acceptable if they're accurate and accessible.",
    ],
    keyPoint: "Retention: 3 years generally; 6 years if > 25% of gross income omitted; 7 years for bad debt or worthless securities; indefinitely if no return or fraud; employment tax records 4 years after due or paid (later); property records until limitations period closes for the year of disposition. Electronic records OK.",
  },
  {
    title: "Business estimated tax",
    alt: "Corporations expecting $500 or more of tax pay four installments on the 15th of the 4th, 6th, 9th and 12th months. Large corporations can't rely on last year's tax except for the first installment.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f1fb" />
        <Step x={8} y={14} w={72} h={100} color="#fff" label="Apr 15" sub="month 4" />
        <Step x={86} y={14} w={72} h={100} color="#fff" label="Jun 15" sub="month 6" />
        <Step x={164} y={14} w={72} h={100} color="#fff" label="Sep 15" sub="month 9" />
        <Step x={242} y={14} w={70} h={100} color="#fff" label="Dec 15" sub="month 12" />
        <Label x={160} y={140} size={10} weight={700}>Corporation owes $500+ · Form 1120-W</Label>
        <Label x={160} y={158} size={10} weight={700}>Penalty: Form 2220</Label>
      </svg>
    ),
    body: [
      "A corporation that expects to owe $500 or more must pay estimated tax in four installments, due the 15th day of the 4th, 6th, 9th and 12th months of its tax year (April 15, June 15, September 15 and December 15 for a calendar year). It can pay 100% of the current year's tax or 100% of last year's tax (if last year was a full 12-month year with a tax liability). Use Form 1120-W as a worksheet; underpayments are figured on Form 2220.",
      "A large corporation (taxable income of $1 million or more in any of the 3 prior years) can use last year's tax only for its first installment. Partnerships and S corporations generally don't pay estimates; their owners do on Form 1040-ES.",
    ],
    keyPoint: "Corporate estimates if tax ≥ $500: 15th of months 4, 6, 9, 12 (Apr 15, Jun 15, Sep 15, Dec 15 for calendar year). Safe harbor: 100% current year or 100% prior year (12-month year with tax). Large corp ($1M+ taxable income in any of 3 prior years): prior-year only for the 1st installment. Forms 1120-W, 2220. Pass-through owners pay via 1040-ES.",
  },
  {
    title: "Planning moves",
    alt: "Common planning ideas: timing income and deductions, hiring your children, accountable plans for reimbursements, and retirement plans.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Card x={12} y={14} w={146} h={70} lines={["Timing: defer income,", "accelerate deductions"]} size={10} color="#fff" />
        <Card x={164} y={14} w={146} h={70} lines={["Kids under 18 in a", "parent's sole prop:", "no FICA"]} size={10} color="#d8f0e2" />
        <Card x={12} y={92} w={146} h={70} lines={["Accountable plan:", "reimbursements", "aren't wages"]} size={10} color="#fff3c4" />
        <Card x={164} y={92} w={146} h={70} lines={["Retirement plans:", "SEP, SIMPLE, 401(k)"]} size={10} color="#d4ebfa" />
      </svg>
    ),
    body: [
      "Common planning moves include timing (cash-basis businesses can defer income or accelerate deductions within the rules, such as section 179 and bonus depreciation), and hiring family. Wages a sole proprietor or a partnership owned only by the child's parents pays to a child under 18 aren't subject to Social Security and Medicare tax, and aren't subject to FUTA until the child is 21. The work must be real and the pay reasonable.",
      "An accountable plan (business connection, substantiation within a reasonable time, return of excess) makes employee expense reimbursements tax-free and keeps them off the W-2. Retirement plans like a SEP, SIMPLE IRA or 401(k) shift income to tax-deferred savings for owners and employees.",
    ],
    keyPoint: "Planning: timing income and deductions (§179, bonus); child under 18 employed by parent's sole prop (or parents-only partnership): no FICA; no FUTA under 21; work must be real. Accountable plan (business connection, substantiation, return excess): reimbursements not wages. Retirement plans (SEP, SIMPLE, 401(k)).",
  },
];

const lesson: Lesson = {
  id: "p2-advising-the-business",
  part: "part2",
  domainId: "p2d2",
  number: "2.9",
  episode: "Milo Sees the Future",
  title: "Advising the business",
  minutes: 14,
  lawAsOf: "tax year 2025",
  intro: "Choosing between entities, reasonable compensation in an S corporation, how long to keep records, business estimated tax, and a few planning moves worth knowing.",
  previously: "Book club was a hit (Milo cried at the retained earnings). Now Rosa wants a plan for 2026.",
  comic,
  cards,
  hook: {
    line: "Salary first, and make it reasonable.",
    more: "C corp 21% then dividends; pass-throughs once. Records 3 / 4 payroll / 6 / 7 bad debt. Corporate estimates: 15th of months 4, 6, 9, 12. Kids under 18 in a parent's sole prop: no FICA.",
    alt: "A crystal ball reading 2026 next to 21% and Form 2553.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7e3f3" />
        <CrystalBall x={66} y={112} scale={1} />
        <Mark x={180} y={74} text="21%" color="#a8321f" size={32} />
        <Mark x={268} y={74} text="2553" color="#1d7a49" size={26} />
      </svg>
    ),
  },
  traps: [
    { title: "S corp owners can skip salary", text: "Shareholder-employees must take reasonable compensation; the IRS can recharacterize distributions as wages." },
    { title: "Keep everything 3 years", text: "Bad debt and worthless securities records: 7 years. Employment tax records: 4 years. Property: until 3 years after the year of sale." },
    { title: "Every corporation pays estimates on 1040 dates", text: "Corporate installments are the 15th of the 4th, 6th, 9th and 12th months." },
    { title: "C corps get QBI", text: "The QBI deduction is only for pass-through owners." },
  ],
  sources: [
    { key: "p583", section: "Starting a business and keeping records" },
    { key: "p542", section: "Corporations and estimated tax" },
    { key: "p15", section: "Family employees" },
    { key: "i2553", section: "S corporation election" },
  ],
  cases: [
    {
      who: "Hoot",
      title: "The $1 salary",
      facts: "An S corporation's only shareholder works full time in the business, takes no salary, and receives $90,000 of distributions in 2025.",
      question: "What can the IRS do?",
      choices: ["Nothing; distributions avoid payroll tax", "Treat part of the distributions as wages", "Treat the distributions as a loss", "Convert it to a C corporation"],
      answer: "Treat part of the distributions as wages",
      why: "A shareholder-employee must receive reasonable compensation. The IRS can recharacterize distributions as wages and assess employment taxes.",
    },
    {
      who: "Penny",
      title: "The bad debt file",
      facts: "A business deducted a bad debt on its 2025 return.",
      question: "How long should it keep the records for that deduction?",
      choices: ["3 years", "4 years", "6 years", "7 years"],
      answer: "7 years",
      why: "Records supporting a bad debt deduction or a worthless securities loss are kept 7 years.",
    },
    {
      who: "Ace",
      title: "Second installment",
      facts: "A calendar-year C corporation expects to owe $40,000 for 2026.",
      question: "When is its second estimated tax installment due?",
      choices: ["June 15", "April 15", "July 15", "May 15"],
      answer: "June 15",
      why: "Corporate installments are due the 15th day of the 4th, 6th, 9th and 12th months: April 15, June 15, September 15 and December 15.",
    },
    {
      who: "Milo",
      title: "Hiring the kid",
      facts: "A sole proprietor hires her 16-year-old child to do real work in the business at a reasonable wage.",
      question: "Which employment taxes apply to the child's wages?",
      choices: ["Full FICA", "Only Medicare", "No Social Security or Medicare tax", "FICA and FUTA"],
      answer: "No Social Security or Medicare tax",
      why: "Wages a sole proprietor pays a child under 18 aren't subject to Social Security and Medicare tax (or FUTA until age 21). Income tax withholding rules still apply.",
    },
  ],
  quizTopics: [],
  quizBrief: "Advising a business: entity choice (sole prop, partnership, S and C corp), S corp reasonable compensation, record retention periods, corporate estimated tax dates, family employees",
};

export default lesson;

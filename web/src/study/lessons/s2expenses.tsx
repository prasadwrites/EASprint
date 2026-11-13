import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import { Crate, Gerald } from "../bakery";
import type { Lesson } from "../lesson";
import { Laptop } from "../office";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 2.2: business expenses: ordinary and necessary, compensation and taxes, start-up costs,
// bad debts and casualties, the home office deduction, and capitalization (de minimis safe harbor,
// repairs versus improvements). Written to Publications 334 and 587 and the tangible property regulations
// page for tax year 2025.

/** A disco ball hanging on a string. (x, y) is the ball's center. */
function DiscoBall({ x, y, r = 18 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <path d={`M${x},${y - r} V${y - r - 40}`} stroke="#17202c" strokeWidth={2} />
      <circle cx={x} cy={y} r={r} fill="#d9dde3" stroke="#17202c" strokeWidth={2.5} />
      <path d={`M${x - r},${y} H${x + r} M${x},${y - r} V${y + r} M${x - r * 0.7},${y - r * 0.7} Q${x},${y - r * 0.2} ${x + r * 0.7},${y - r * 0.7} M${x - r * 0.7},${y + r * 0.7} Q${x},${y + r * 0.2} ${x + r * 0.7},${y + r * 0.7}`} stroke="#9aa4b2" strokeWidth={1.5} fill="none" />
      {[
        [-30, -6],
        [28, 4],
        [-22, 22],
        [24, -22],
      ].map(([dx, dy]) => (
        <path key={`${dx}`} d={`M${x + dx},${y + dy - 5} l2,5 l5,0 l-4,3 l2,5 l-5,-3 l-5,3 l2,-5 l-4,-3 l5,0 Z`} fill="#fff3c4" stroke="#f5a623" strokeWidth={1} />
      ))}
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "A disco ball hangs over the bakery. Ace frowns. Rosa beams.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <DiscoBall x={160} y={84} />
        <Ace x={84} y={128} scale={0.78} mood="thinking" />
        <Rosa x={240} y={128} scale={0.78} mood="excited" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Is a disco ball ordinary and necessary for a bakery?", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Rosa", text: "It's NECESSARY. For the vibes.", x: 62, y: 4, w: 34, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Ace explains start-up costs. Milo, holding a research report, is shocked. Biscuit looks up.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={70} y={128} scale={0.76} mood="happy" pose="point" />
        <Biscuit x={170} y={192} scale={0.56} mood="happy" />
        <Milo x={252} y={128} scale={0.76} mood="shocked" flip pose="hold" holding={<Paper x={0} y={-8} label="RESEARCH" sub="$6,000" color="#fff" />} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Start-up costs: deduct up to $5,000 the first year, and the rest over 180 months.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Milo", text: "180 MONTHS? Biscuit will be retired.", x: 62, y: 4, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds an unpaid invoice for a birthday cake. Ace shakes his head kindly.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Penny x={84} y={128} scale={0.78} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="UNPAID" sub="Gus, $300" color="#fde2e4" />} />
        <Ace x={240} y={128} scale={0.78} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Gus never paid for his birthday cake. Bad debt deduction?", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "You're on the cash method, so it was never income. No income, no bad debt.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Penny works on a laptop at the kitchen table. Biscuit sleeps on the table. Lulu points.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={60} y={128} scale={0.72} mood="thinking" />
        <rect x={110} y={160} width={110} height={10} rx={3} fill="#c9a26b" stroke="#17202c" strokeWidth={2.5} />
        <path d="M120,170 V206 M210,170 V206" stroke="#17202c" strokeWidth={3} />
        <Laptop x={140} y={160} scale={0.6} screen="BOOKS" size={8} />
        <Biscuit x={192} y={160} scale={0.42} mood="sleepy" />
        <Lulu x={272} y={160} scale={0.52} mood="smug" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I do the bakery's books at the kitchen table. Home office?", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Lulu", text: "It has to be used EXCLUSIVELY for business. Biscuit naps there.", x: 52, y: 2, w: 44, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of a crate labeled new roof. Rosa holds two bills.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Hoot x={84} y={86} scale={0.54} mood="excited" pose="up" />
        <Crate x={84} y={206} scale={1.05} label="NEW ROOF" />
        <Rosa x={240} y={128} scale={0.78} mood="worried" flip pose="hold" holding={<Paper x={0} y={-8} label="BILLS" sub="$40K · $400" color="#fff" />} />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "A new $40,000 roof is an IMPROVEMENT. Capitalize it!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Rosa", text: "And the $400 door fix?", x: 64, y: 4, w: 30, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot dances under the disco ball. Gerald sparkles. Ace covers his face.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <DiscoBall x={170} y={60} />
        <Ace x={70} y={128} scale={0.76} mood="worried" pose="shrug" />
        <Hoot x={180} y={130} scale={0.62} mood="excited" pose="up" />
        <Gerald x={270} y={196} scale={1} mood="happy" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "So the $400 is deductible, the roof is depreciated, and the disco ball...", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Hoot", text: "Personal. But I'll allow the vibes.", x: 60, y: 6, w: 36, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Ordinary and necessary",
    alt: "A business expense is deductible if it's ordinary (common in the trade) and necessary (helpful and appropriate). Personal and capital costs aren't currently deductible.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={14} w={94} h={110} color="#d8f0e2" label="Ordinary" sub="common in trade" />
        <Step x={113} y={14} w={94} h={110} color="#d8f0e2" label="Necessary" sub="helpful, fitting" />
        <Step x={212} y={14} w={94} h={110} color="#fde2e4" label="Not" sub="personal, capital" />
        <Label x={160} y={150} size={10} weight={700}>Pay must be reasonable, for services performed</Label>
      </svg>
    ),
    body: [
      "A business can deduct expenses that are ordinary (common and accepted in its trade) and necessary (helpful and appropriate). Personal, living and family expenses aren't deductible, and costs that create assets lasting beyond the year are generally capitalized.",
      "Pay to employees is deductible if it's reasonable and for services actually performed. Business taxes like real estate, state and local payroll and personal property taxes are deductible; federal income tax isn't. Business casualty and theft losses are deductible (not just disaster losses), and fines paid to a government aren't.",
    ],
    keyPoint: "§162: ordinary (common in the trade) and necessary (helpful and appropriate) expenses are deductible; personal and capital costs aren't. Compensation must be reasonable and for services performed. Deductible: business real estate, payroll, personal property taxes; not federal income tax or government fines.",
  },
  {
    title: "Start-up costs",
    alt: "Up to $5,000 of start-up costs can be deducted in the year the business starts, reduced by start-up costs over $50,000. The rest is amortized over 180 months.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={14} w={94} h={110} color="#d8f0e2" label="$5,000" sub="deduct now" />
        <Step x={113} y={14} w={94} h={110} color="#fde2e4" label="$50,000" sub="phase-out starts" />
        <Step x={212} y={14} w={94} h={110} color="#fff3c4" label="180" sub="months for the rest" />
        <Label x={160} y={150} size={10} weight={700}>Same rule for organizational costs</Label>
      </svg>
    ),
    body: [
      "Start-up costs are amounts paid to investigate creating or acquiring a business and to get it ready before it opens: market surveys, advertising, training employees, travel to find suppliers. They're deductible only once the business begins.",
      "In the year it starts, a business can deduct up to $5,000 of start-up costs, reduced dollar for dollar by the amount by which total start-up costs exceed $50,000. The rest is amortized ratably over 180 months beginning with the month the business starts. Organizational costs of forming a corporation or partnership get the same $5,000 / $50,000 / 180-month treatment, separately.",
    ],
    keyPoint: "Start-up costs (and, separately, organizational costs): deduct up to $5,000 in the year business begins, reduced by costs over $50,000 (zero at $55,000); amortize the rest over 180 months from the start month. Nothing deductible if the business never begins.",
  },
  {
    title: "Bad debts",
    alt: "A business bad debt is deductible when it becomes wholly or partly worthless, but only if the amount was included in income or lent in cash. Cash-method businesses can't deduct unpaid receivables.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="Accrual" sub="was income: deduct" />
        <Step x={166} y={14} w={140} h={100} color="#fde2e4" label="Cash" sub="never income: no" />
        <Label x={160} y={140} size={10} weight={700}>Business bad debts: ordinary, partly worthless OK</Label>
        <Label x={160} y={158} size={10} weight={700}>Specific charge-off method</Label>
      </svg>
    ),
    body: [
      "A business bad debt (one created or acquired in the business, such as a customer's account) is an ordinary deduction when it becomes wholly or partly worthless, using the specific charge-off method. The business must show it took reasonable steps to collect.",
      "A debt is deductible only if the amount was previously included in income or actually lent. A cash-method business never included an unpaid invoice in income, so it has no bad debt deduction for it. Nonbusiness bad debts are short-term capital losses, and only when totally worthless.",
    ],
    keyPoint: "Business bad debt: ordinary deduction when wholly or partly worthless (specific charge-off), if previously included in income or loaned. Cash-method businesses can't deduct unpaid receivables. Nonbusiness bad debts: short-term capital loss, only when totally worthless.",
  },
  {
    title: "The home office",
    alt: "A home office must be used regularly and exclusively as the principal place of business or to meet clients. The simplified method allows $5 per square foot up to 300 square feet.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={14} w={140} h={100} lines={["Regular AND", "exclusive use", "+ principal place", "or client meetings"]} size={10} color="#fff" />
        <Card x={166} y={14} w={140} h={100} lines={["Simplified:", "$5 × up to 300 sq ft", "= max $1,500"]} size={10} color="#d8f0e2" />
        <Label x={160} y={140} size={10} weight={700}>Regular method: Form 8829, actual costs</Label>
        <Label x={160} y={158} size={10} weight={700}>Both limited to business income</Label>
      </svg>
    ),
    body: [
      "Part of a home qualifies if it's used regularly and exclusively for business and is the principal place of business (including for administrative work when there's no other fixed location), a place to meet clients in the normal course of business, or a separate structure used for the business. Exclusive use isn't required for storing inventory or product samples or for a qualifying day care.",
      "The simplified method allows $5 per square foot for up to 300 square feet ($1,500). The regular method (Form 8829) deducts the business share of actual costs (mortgage interest, taxes, utilities, insurance, repairs, depreciation). Both are limited to the business's gross income from the activity, with excess carried forward under the regular method. Employees can't deduct a home office on their federal return.",
    ],
    keyPoint: "Home office: regular + exclusive use as principal place of business, client meeting place, or separate structure (exceptions: inventory storage, day care). Simplified: $5/sq ft, max 300 sq ft ($1,500). Regular: Form 8829 actual costs. Limited to business income. No deduction for employees.",
  },
  {
    title: "Repair or improvement?",
    alt: "Items costing $2,500 or less per invoice or item can be expensed under the de minimis safe harbor. Repairs are deductible; betterments, restorations and adaptations are improvements that must be capitalized.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={14} w={94} h={110} color="#d8f0e2" label="$2,500" sub="de minimis" />
        <Step x={113} y={14} w={94} h={110} color="#d8f0e2" label="Repair" sub="keeps it working" />
        <Step x={212} y={14} w={94} h={110} color="#fde2e4" label="Improve" sub="better, restore, adapt" />
        <Label x={160} y={150} size={10} weight={700}>$5,000 with an audited financial statement</Label>
      </svg>
    ),
    body: [
      "Under the de minimis safe harbor election, a business can deduct amounts paid for tangible property up to $2,500 per invoice or item ($5,000 if it has an applicable financial statement), if it expenses them on its books. The election is made each year with a statement on the return.",
      "Repairs and maintenance that keep property in ordinary operating condition are deductible. Amounts that better the property (fix a pre-existing defect, enlarge or increase capacity), restore it (replace a major component, like a roof), or adapt it to a new use are improvements and must be capitalized and depreciated. Routine maintenance and small-taxpayer building safe harbors can also help.",
    ],
    keyPoint: "De minimis safe harbor: expense items ≤ $2,500 per invoice/item ($5,000 with an AFS), annual election. Repairs/maintenance: deductible. Improvements (betterment, restoration, adaptation, e.g. a new roof): capitalize and depreciate.",
  },
];

const lesson: Lesson = {
  id: "p2-business-expenses",
  part: "part2",
  domainId: "p2d2",
  number: "2.2",
  episode: "The Disco Ball",
  title: "Business expenses",
  minutes: 14,
  lawAsOf: "tax year 2025",
  intro: "Which business costs are deductible: ordinary and necessary expenses, start-up costs, bad debts, the home office, and when to capitalize instead.",
  previously: "The rolls are counted (most of them). Rosa has been shopping with the business card, and something sparkly has arrived.",
  comic,
  cards,
  hook: {
    line: "Ordinary + necessary = deductible. Better, restore, adapt = capitalize.",
    more: "Start-up: $5,000 now (less excess over $50,000), rest over 180 months. Home office: regular + exclusive; $5 × 300 sq ft. Cash method: no bad debt for unpaid sales.",
    alt: "A disco ball and the numbers 5,000 and 180.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7e3f3" />
        <DiscoBall x={66} y={70} r={22} />
        <Mark x={170} y={74} text="$5K" color="#1d7a49" size={32} />
        <Mark x={260} y={74} text="180" color="#a8321f" size={32} />
      </svg>
    ),
  },
  traps: [
    { title: "Unpaid invoices are bad debts", text: "Only if the income was reported first. Cash-method businesses can't deduct them." },
    { title: "Start-up costs are all deductible", text: "Only $5,000 (reduced over $50,000); the rest is spread over 180 months." },
    { title: "A kitchen table is a home office", text: "The space must be used regularly and exclusively for business." },
    { title: "A new roof is a repair", text: "Replacing a major component restores the property: capitalize it." },
  ],
  sources: [
    { key: "p334", section: "Business expenses" },
    { key: "p587", section: "Business use of your home" },
    { key: "tpr", section: "Repairs and improvements" },
  ],
  cases: [
    {
      who: "Milo",
      title: "Getting started",
      facts: "Milo spent $52,000 on start-up costs before opening a new business in July 2025.",
      question: "How much can he deduct immediately in 2025 (before amortization)?",
      choices: ["$5,000", "$52,000", "$0", "$3,000"],
      answer: "$3,000",
      why: "The $5,000 deduction is reduced by the $2,000 by which start-up costs exceed $50,000. The rest is amortized over 180 months.",
    },
    {
      who: "Penny",
      title: "The spare room",
      facts: "Penny uses a 350-square-foot spare room regularly and exclusively as the main office of her bookkeeping business, which earns plenty. She uses the simplified method.",
      question: "What's her home office deduction?",
      choices: ["$1,500", "$1,750", "$350", "$0"],
      answer: "$1,500",
      why: "The simplified method is $5 per square foot for up to 300 square feet: $1,500.",
    },
    {
      who: "Rosa",
      title: "The unpaid cake",
      facts: "A cash-method bakery delivered a $300 cake that the customer never paid for, and the customer can't be found.",
      question: "What can the bakery deduct?",
      choices: ["$300 business bad debt", "$300 casualty loss", "Nothing", "$150"],
      answer: "Nothing",
      why: "A cash-method business never included the $300 in income, so there's no basis for a bad debt deduction.",
    },
    {
      who: "Hoot",
      title: "The new mixer",
      facts: "A bakery that elected the de minimis safe harbor (no applicable financial statement) buys a $2,000 mixer, on its own invoice, and expenses it on its books.",
      question: "How is it treated?",
      choices: ["Deducted in full this year", "Depreciated over 7 years", "Capitalized and never deducted", "Amortized over 180 months"],
      answer: "Deducted in full this year",
      why: "Under the de minimis safe harbor, items costing $2,500 or less per invoice or item can be deducted when the business also expenses them on its books.",
    },
  ],
  quizTopics: ["Start-up costs", "Home office", "Bad debts", "Capitalization"],
  quizBrief: "Business expenses: ordinary and necessary, reasonable pay, deductible taxes, start-up costs ($5,000/$50,000/180 months), bad debts, home office, de minimis safe harbor, repairs vs improvements",
};

export default lesson;

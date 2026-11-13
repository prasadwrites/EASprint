import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import { Crate, Gerald, Oven } from "../bakery";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 1.4: S corporations: eligibility, the Form 2553 election, shareholder stock and debt basis,
// distributions and reasonable compensation, and termination. Written to the Form 2553 and 1120-S
// instructions and the IRS S corporation pages for tax year 2025.

const comic: Lesson["comic"] = [
  {
    alt: "Rosa throws her arms up in the bakery. Ace smiles and raises a finger.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Rosa x={84} y={128} scale={0.78} mood="excited" pose="up" />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I've decided! In 2026 we become an S corporation. S for SPECIAL!", x: 3, y: 2, w: 46, tail: "down-left", shout: true },
      { who: "Ace", text: "S for Subchapter S. But sure. Special.", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds Biscuit up hopefully. Ace shakes his head. Biscuit looks sad.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={70} y={128} scale={0.76} mood="excited" pose="point" />
        <Biscuit x={150} y={190} scale={0.66} mood="sad" />
        <Ace x={252} y={128} scale={0.76} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Can Biscuit own a share? He's a very good boy.", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Ace", text: "Shareholders: people, estates, certain trusts. No partnerships. No corporations. No dogs.", x: 50, y: 2, w: 48, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds Form 2553 next to a calendar showing March 15. Hoot pops out of the oven.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Penny x={60} y={128} scale={0.72} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="2553" sub="all sign" color="#fff" />} />
        <Calendar x={140} y={98} month="MAR" day="15" scale={0.7} color="#e8505b" />
        <Hoot x={250} y={94} scale={0.5} mood="excited" flip pose="up" />
        <Oven x={250} y={208} scale={0.9} glow={false} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "For 2026, we file Form 2553 by March 15, and every shareholder signs?", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Hoot", text: "Late? Then it starts in 2027! Hoo!", x: 56, y: 2, w: 38, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa grins and pushes away a paycheck. Hoot peeks over a flour crate with narrowed eyes.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Rosa x={84} y={128} scale={0.78} mood="smug" pose="hold" holding={<Paper x={0} y={-8} label="SALARY" sub="$0" color="#fde2e4" />} />
        <Hoot x={246} y={90} scale={0.5} mood="stern" flip />
        <Crate x={246} y={206} scale={1.05} label="FLOUR" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I'll take a $0 salary and pull everything out as distributions. No payroll tax!", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Hoot", text: "Shareholder-employees need a REASONABLE salary. I'm watching.", x: 54, y: 2, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Penny asks a question. Ace shows a card with stock basis plus direct loans. Lulu holds a pretend ticket.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" />
        <Penny x={56} y={128} scale={0.72} mood="worried" />
        <Ace x={160} y={128} scale={0.72} mood="happy" pose="point" />
        <Lulu x={268} y={160} scale={0.52} mood="smug" flip pose="hold" holding={<Paper x={0} y={-6} label="TICKET" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "If we lose money, can I deduct it?", x: 3, y: 4, w: 32, tail: "down-left" },
      { who: "Ace", text: "Up to your stock basis plus loans YOU made to the company. Guarantees don't count.", x: 32, y: 2, w: 40, tail: "down" },
      { who: "Lulu", text: "No basis, no deduction. No ticket, no ride.", x: 74, y: 4, w: 24, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds Gerald the sourdough jar close. Gerald looks smug. Ace holds up five fingers.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Rosa x={84} y={128} scale={0.78} mood="worried" pose="hold" holding={<Gerald x={0} y={14} scale={0.8} mood="smug" />} />
        <Mark x={166} y={120} text="5" color="#a8321f" size={40} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "And if I hate it, can I switch back?", x: 3, y: 2, w: 36, tail: "down-left" },
      { who: "Ace", text: "Revoke with a majority's consent. Then you generally wait 5 years to elect again.", x: 48, y: 2, w: 50, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Who can be an S corporation",
    alt: "A domestic corporation with no more than 100 shareholders, all eligible (individuals who are citizens or residents, estates, certain trusts, exempt organizations), and one class of stock.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={94} h={110} color="#d8f0e2" label="≤ 100" sub="shareholders" />
        <Step x={113} y={14} w={94} h={110} color="#fff3c4" label="Eligible" sub="no partnerships" />
        <Step x={212} y={14} w={94} h={110} color="#d4ebfa" label="1 class" sub="of stock" />
        <Label x={160} y={150} size={10} weight={700}>Domestic corporation (or LLC electing it)</Label>
      </svg>
    ),
    body: [
      "An S corporation must be a domestic corporation (or an entity, like an LLC, eligible to elect corporate status) with no more than 100 shareholders. Members of a family can be treated as one shareholder.",
      "Shareholders must be individuals who are U.S. citizens or residents, estates, certain trusts (grantor trusts, qualified subchapter S trusts and electing small business trusts) and certain exempt organizations. Partnerships, C corporations and nonresident aliens can't be shareholders. It can have only one class of stock, though differences in voting rights alone are allowed.",
    ],
    keyPoint: "S corp eligibility: domestic; ≤ 100 shareholders (family = one); shareholders limited to U.S. citizen/resident individuals, estates, certain trusts (grantor, QSST, ESBT), certain exempt orgs (no partnerships, corporations, nonresident aliens); one class of stock (voting differences OK).",
  },
  {
    title: "Making the election",
    alt: "File Form 2553, signed by all shareholders, during the prior year or by the 15th day of the 3rd month of the year it's to take effect. A late election takes effect the following year unless relief applies.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={56} y={84} label="2553" sub="all sign" scale={1.8} color="#fff" />
        <Card x={110} y={14} w={198} h={46} lines={["By the 15th day of month 3", "(March 15 for calendar year)"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["Late: next year, unless", "late election relief"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["Then: Form 1120-S", "by March 15, plus K-1s"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "A corporation elects S status on Form 2553, signed by every shareholder (and anyone who was a shareholder earlier in the year the election takes effect). To be effective for a tax year, it must be filed any time in the prior year or no later than 2 months and 15 days after the year begins (March 15 for a calendar year). An election made later takes effect the next year.",
      "The IRS grants relief for late elections when there was reasonable cause, usually within 3 years and 75 days of the intended date. Once in effect, the S corporation files Form 1120-S by the 15th day of the 3rd month after year end and gives shareholders K-1s.",
    ],
    keyPoint: "Form 2553: all shareholders consent; file during the prior year or by the 15th day of the 3rd month (March 15 for calendar year) to be effective that year; otherwise the next year. Late election relief for reasonable cause (generally within 3 years 75 days). Then Form 1120-S + K-1s by March 15.",
  },
  {
    title: "Shareholder basis and losses",
    alt: "Stock basis goes up with income and contributions and down with distributions and losses. Losses are deductible up to stock basis plus debt basis from direct shareholder loans. Guarantees don't create basis.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Card x={14} y={14} w={140} h={100} lines={["Stock basis", "+ income, contributions", "− distributions, losses"]} size={10} color="#fff" />
        <Card x={166} y={14} w={140} h={100} lines={["Debt basis", "only loans YOU made", "to the company"]} size={10} color="#d8f0e2" />
        <Label x={160} y={138} size={10} weight={700}>Losses beyond both carry forward</Label>
        <Label x={160} y={156} size={10} weight={700}>Guarantees don't count · Form 7203</Label>
      </svg>
    ),
    body: [
      "A shareholder's stock basis starts with what they paid or contributed and goes up each year by their share of income (including tax-exempt income) and down by distributions, nondeductible expenses and losses, in that order. Unlike a partnership, an S corporation's own bank loans don't add to shareholder basis.",
      "Losses pass through only up to the shareholder's stock basis plus debt basis, and debt basis comes only from loans the shareholder personally made directly to the corporation (guaranteeing the corporation's bank loan doesn't count). Disallowed losses carry forward. Shareholders track this on Form 7203.",
    ],
    keyPoint: "S corp stock basis: + contributions, + income (incl. tax-exempt); − distributions, − nondeductible expenses, − losses. Losses limited to stock basis + debt basis (direct shareholder loans only; guarantees and entity-level debt don't count); excess carries forward. Form 7203.",
  },
  {
    title: "Distributions and reasonable pay",
    alt: "Distributions from an S corporation with no old C corporation earnings are tax-free up to basis. A shareholder who works in the business must get reasonable wages first.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="Distribution" sub="tax-free to basis" />
        <Step x={166} y={14} w={140} h={100} color="#fde2e4" label="Wages" sub="reasonable, on a W-2" />
        <Label x={160} y={140} size={10} weight={700}>Too-low pay can be recharacterized as wages</Label>
        <Label x={160} y={158} size={10} weight={700}>(with payroll taxes and penalties)</Label>
      </svg>
    ),
    body: [
      "If an S corporation has no accumulated earnings and profits from C corporation years, distributions are tax-free to the extent of stock basis, and any excess is capital gain. If it does have old E&P, distributions come first from the accumulated adjustments account (AAA), then are dividends to the extent of E&P.",
      "Shareholder-employees must be paid reasonable compensation as wages (subject to payroll taxes) before taking non-wage distributions. If the pay is unreasonably low, the IRS can recharacterize distributions as wages. Health insurance paid for a more-than-2% shareholder-employee is included in their W-2 wages.",
    ],
    keyPoint: "S corp distributions (no C-corp E&P): tax-free up to stock basis, excess = capital gain. With old E&P: AAA first, then dividends from E&P. Shareholder-employees need reasonable W-2 compensation; the IRS can recharacterize distributions. >2% shareholders' health insurance goes in W-2 wages.",
  },
  {
    title: "When S status ends",
    alt: "An S election ends by revocation with consent of more than half the shares, by failing an eligibility test, or after 3 years of too much passive income with old C corporation earnings. A new election generally waits 5 years.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={14} w={94} h={110} color="#fff" label="Revoke" sub="> 50% consent" />
        <Step x={113} y={14} w={94} h={110} color="#fde2e4" label="Fail a test" sub="e.g. 101 owners" />
        <Step x={212} y={14} w={94} h={110} color="#fff3c4" label="Passive" sub="> 25%, 3 years" />
        <Label x={160} y={150} size={10} weight={700}>Then generally 5 years before re-electing</Label>
      </svg>
    ),
    body: [
      "S status ends if shareholders holding more than half the shares consent to revoke it, if the corporation stops qualifying (for example, an ineligible shareholder, more than 100 shareholders or a second class of stock) on the day that happens, or if it has accumulated C corporation E&P and passive investment income over 25% of gross receipts for 3 consecutive years.",
      "After termination or revocation, the corporation generally can't re-elect S status for 5 years without IRS consent. A former C corporation that converts is also subject to the built-in gains tax on appreciated assets sold within 5 years of the conversion.",
    ],
    keyPoint: "S termination: revocation (> 50% of shares consent); ceasing to qualify (effective that day); passive investment income > 25% of gross receipts for 3 straight years with C-corp E&P. Generally 5-year wait to re-elect. Converted C corps: built-in gains tax on sales within 5 years.",
  },
];

const lesson: Lesson = {
  id: "p2-s-corporations",
  part: "part2",
  domainId: "p2d1",
  number: "1.4",
  episode: "S Is for Special",
  title: "S corporations",
  minutes: 14,
  lawAsOf: "tax year 2025",
  intro: "Who can be an S corporation, how and when to elect, shareholder stock and debt basis, distributions and reasonable compensation, and how S status ends.",
  previously: "Milo's corporation lasted one week. Rosa watched closely, took notes, and has made a decision about the bakery's future.",
  comic,
  cards,
  hook: {
    line: "100 people, 1 class, March 15, everybody signs.",
    more: "No partnerships or corporations as owners. Losses: stock basis + YOUR loans. Pay a reasonable salary first. Revoke = 5-year wait.",
    alt: "Gerald next to the numbers 100 and 1.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fde9e4" />
        <Gerald x={60} y={104} scale={1.4} mood="happy" />
        <Mark x={160} y={74} text="100" color="#1d7a49" size={36} />
        <Mark x={256} y={74} text="1" color="#a8321f" size={40} />
      </svg>
    ),
  },
  traps: [
    { title: "Any corporation can own S stock", text: "Partnerships, corporations and nonresident aliens can't be shareholders." },
    { title: "A guarantee gives debt basis", text: "Only loans the shareholder makes directly to the corporation create debt basis." },
    { title: "Late Form 2553 is just late", text: "Filed after the 15th day of the 3rd month, it takes effect the next year unless relief applies." },
    { title: "Owners can skip salary", text: "Shareholder-employees must take reasonable wages before distributions." },
  ],
  sources: [
    { key: "scorp", section: "S corporations" },
    { key: "i2553", section: "Election rules" },
    { key: "scorpbasis", section: "Stock and debt basis" },
    { key: "i1120s", section: "Form 1120-S instructions" },
  ],
  cases: [
    {
      who: "Rosa",
      title: "The partner shareholder",
      facts: "A corporation with 20 individual shareholders sells 5% of its stock to a partnership.",
      question: "What happens to its S election?",
      choices: ["Nothing", "It ends: a partnership is an ineligible shareholder", "It ends only after 3 years", "The partnership's partners count instead"],
      answer: "It ends: a partnership is an ineligible shareholder",
      why: "Partnerships can't own S stock. The election terminates on the day the corporation stops qualifying.",
    },
    {
      who: "Penny",
      title: "Too late for this year",
      facts: "A calendar-year corporation files Form 2553 on April 10, 2026, signed by all shareholders. No late-election relief is requested.",
      question: "When does S status begin?",
      choices: ["January 1, 2026", "April 10, 2026", "January 1, 2027", "Never"],
      answer: "January 1, 2027",
      why: "To be effective for 2026 it had to be filed by March 15, 2026. An election filed later takes effect the next year.",
    },
    {
      who: "Milo",
      title: "The guarantee",
      facts: "A shareholder's stock basis is $5,000. She lent the S corporation $2,000 directly and guaranteed a $20,000 bank loan. Her share of the loss is $30,000.",
      question: "How much loss can she deduct this year (before at-risk and passive limits)?",
      choices: ["$30,000", "$27,000", "$5,000", "$7,000"],
      answer: "$7,000",
      why: "Losses are limited to stock basis ($5,000) plus debt basis from direct loans ($2,000). The guarantee doesn't create basis; the rest carries forward.",
    },
    {
      who: "Hoot",
      title: "The $0 salary",
      facts: "The only shareholder of an S corporation works in it full time, takes no wages and takes $150,000 of distributions.",
      question: "What can the IRS do?",
      choices: ["Nothing; distributions are allowed", "Revoke the S election", "Treat part of the distributions as wages subject to payroll taxes", "Tax all of it at 21%"],
      answer: "Treat part of the distributions as wages subject to payroll taxes",
      why: "Shareholder-employees must receive reasonable compensation. The IRS can recharacterize distributions as wages.",
    },
  ],
  quizTopics: ["S corporation eligibility", "S corporation election", "S corporation shareholder basis"],
  quizBrief: "S corporations: eligibility (100 shareholders, one class, eligible owners), Form 2553 timing, stock and debt basis, loss limits, distributions and AAA, reasonable compensation, termination",
};

export default lesson;

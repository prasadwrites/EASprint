import { Ace, Backdrop, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import { Crate, Gerald } from "../bakery";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 2.8: reading the books: the balance sheet and income statement, book-tax differences,
// Schedules L, M-1, M-2 and M-3, and how pass-through items reach owners on Schedule K-1. Written to the
// Form 1065, 1120 and 1120-S instructions and the Schedule M-3 instructions for tax year 2025.

const INK = "#2a2f3a";

/** A stack of three paperback novels. (x, y) is the bottom center. */
function Novels({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const books = [
    { c: "#e8505b", w: 56, t: "MURDER" },
    { c: "#7a5fb0", w: 50, t: "MORE MURDER" },
    { c: "#1d7a49", w: 54, t: "MURDER 3" },
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {books.map((b, i) => (
        <g key={b.t}>
          <rect x={-b.w / 2 + (i % 2) * 3} y={-16 * (i + 1)} width={b.w} height={16} rx={2} fill={b.c} stroke={INK} strokeWidth={2} />
          <text x={(i % 2) * 3} y={-16 * i - 5} textAnchor="middle" fontSize={6.5} fontWeight={800} fill="#fff" fontFamily="inherit">
            {b.t}
          </text>
        </g>
      ))}
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Rosa proudly carries a stack of murder mystery novels. Ace facepalms.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Rosa x={70} y={128} scale={0.76} mood="excited" pose="hold" />
        <Novels x={122} y={150} scale={1.05} />
        <Ace x={256} y={128} scale={0.76} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "You said bring the books for the return. I brought my best mysteries!", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Ace", text: "The ACCOUNTING books, Rosa.", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Penny points at a card showing assets equal liabilities plus equity. Lulu shrugs.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={92} w={110} h={64} lines={["Assets", "= Liabilities", "+ Equity"]} size={10.5} color="#fff" />
        <Lulu x={270} y={160} scale={0.56} mood="smug" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "The balance sheet always balances: what you own equals what you owe plus what's yours.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Lulu", text: "Mine balances too. Zero and zero.", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Ace shows a card reconciling book income to taxable income. Milo looks betrayed.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={84} w={112} h={76} lines={["Book $100,000", "+ fines", "+ half the meals", "= taxable"]} size={9.5} color="#fff" />
        <Milo x={262} y={128} scale={0.76} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Book income isn't taxable income. Schedule M-1 walks you from one to the other.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Milo", text: "So the books LIE to us?", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of a crate labeled BOOKS waving a parking ticket. Rosa is outraged.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Hoot x={84} y={92} scale={0.52} mood="stern" pose="up" />
        <Crate x={84} y={206} scale={1.05} label="BOOKS" />
        <Rosa x={256} y={128} scale={0.76} mood="shocked" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Fines and penalties go on the books. Never as a tax deduction.", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Rosa", text: "Not even my parking ticket from the Bread Expo?!", x: 58, y: 4, w: 38, tail: "down-right" },
    ],
  },
  {
    alt: "Penny hands out K-1 forms. Rosa holds one. Gerald the sourdough jar sits empty-handed.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f1fb" />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="hold" />
        <Paper x={120} y={102} label="K-1" sub="90%" scale={0.8} rotate={-6} />
        <Gerald x={186} y={196} scale={0.9} mood="smug" />
        <Rosa x={268} y={128} scale={0.72} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Each partner gets a K-1 with their share: 90% for Rosa, 10% for me.", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Rosa", text: "And Gerald? He works harder than anyone.", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Book club night. Lulu holds up a Schedule L like a novel. Milo, absorbed in his copy, begs for no spoilers.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Lulu x={66} y={160} scale={0.56} mood="excited" pose="hold" />
        <Paper x={104} y={124} label="SCH L" scale={0.8} rotate={-8} />
        <Milo x={252} y={128} scale={0.76} mood="thinking" flip pose="hold" />
        <Paper x={206} y={104} label="SCH L" scale={0.8} rotate={8} />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "Welcome to book club! This month: Schedule L.", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Milo", text: "No spoilers! Do retained earnings go UP?", x: 60, y: 4, w: 36, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The financial statements",
    alt: "The balance sheet shows assets, liabilities and equity at a moment. The income statement shows revenue and expenses over a period. Net income flows into equity.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="A = L + E" sub="balance sheet" />
        <Step x={112} y={14} w={96} h={100} color="#fff3c4" label="R − E" sub="income statement" />
        <Step x={214} y={14} w={96} h={100} color="#d8f0e2" label="→ Equity" sub="net income flows" />
        <Label x={160} y={146} size={10} weight={700}>Balance sheet: a snapshot · income: a period</Label>
      </svg>
    ),
    body: [
      "The balance sheet shows what a business owns (assets), what it owes (liabilities), and the owners' stake (equity) on a given date: assets always equal liabilities plus equity. The income statement (profit and loss) shows revenue minus expenses for a period. Net income increases equity (retained earnings for a corporation, capital accounts for a partnership); distributions and dividends decrease it.",
      "Cash-basis books record income when received and expenses when paid; accrual books record them when earned or incurred. A preparer reads the statements to find tax items: new assets to depreciate, loans to and from owners, and expenses that may be nondeductible.",
    ],
    keyPoint: "Balance sheet (a date): assets = liabilities + equity. Income statement (a period): revenue − expenses = net income, which increases equity (retained earnings or capital); distributions and dividends reduce it. Cash vs. accrual bookkeeping. Read the books for new assets, owner loans and nondeductible items.",
  },
  {
    title: "Book income vs. taxable income",
    alt: "Permanent differences never reverse: fines, half of meals, tax-exempt interest, federal income tax expense. Temporary differences reverse over time: depreciation and bad debt reserves.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Card x={12} y={14} w={146} h={110} lines={["PERMANENT", "fines · 50% meals", "tax-exempt interest", "federal income tax"]} size={10} color="#fff" />
        <Card x={164} y={14} w={146} h={110} lines={["TEMPORARY", "depreciation", "bad debt reserve", "prepaid income"]} size={10} color="#fff3c4" />
        <Label x={160} y={152} size={10} weight={700}>Temporary differences reverse later</Label>
      </svg>
    ),
    body: [
      "Book income follows accounting rules; taxable income follows the Code. Permanent differences never reverse: fines and penalties paid to a government, the nondeductible 50% of business meals, life insurance premiums where the business is the beneficiary, tax-exempt interest (book income but not taxable), and, for a C corporation, federal income tax expense.",
      "Temporary (timing) differences reverse over time: tax depreciation that's faster than book depreciation (bonus and section 179), an allowance for bad debts on the books versus the direct write-off method for tax, and prepaid income recognized sooner for tax.",
    ],
    keyPoint: "Permanent differences (never reverse): fines and penalties, 50% of meals, key-person life insurance premiums, tax-exempt interest, federal income tax expense (C corp). Temporary differences (reverse): tax vs. book depreciation (§179, bonus), bad debt allowance vs. direct write-off, prepaid income.",
  },
  {
    title: "Schedules M-1, M-2 and M-3",
    alt: "Schedule M-1 reconciles book income to taxable income. Schedule M-2 tracks retained earnings, capital accounts, or the S corporation's accumulated adjustments account. Large entities file M-3 instead of M-1.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="M-1" sub="book → tax" />
        <Step x={112} y={14} w={96} h={100} color="#d4ebfa" label="M-2" sub="equity roll" />
        <Step x={214} y={14} w={96} h={100} color="#fde2e4" label="M-3" sub="$10M+ assets" />
        <Label x={160} y={146} size={10} weight={700}>1120 · 1120-S · 1065</Label>
      </svg>
    ),
    body: [
      "Schedule M-1 reconciles income per books with income per return, listing items that are on the books but not the return and the reverse. Schedule M-2 analyzes the change in equity during the year: unappropriated retained earnings on Form 1120, partners' capital accounts on Form 1065, and the accumulated adjustments account (AAA) and other accounts on Form 1120-S.",
      "A corporation with total assets of $10 million or more at the end of the year files Schedule M-3 instead of M-1; it reconciles in more detail, separating permanent and temporary differences. Partnerships file M-3 if assets are $10 million or more, receipts are $35 million or more, or certain large partners own an interest.",
    ],
    keyPoint: "M-1: book income → taxable income. M-2: equity rollforward (1120 retained earnings; 1065 partners' capital; 1120-S AAA). M-3 replaces M-1 for corporations with total assets ≥ $10 million (partnerships: assets ≥ $10M, receipts ≥ $35M, or a large reportable partner); separates permanent and temporary differences.",
  },
  {
    title: "Schedule L and the small-entity break",
    alt: "Schedule L is the balance sheet per books. Small entities with receipts and total assets under $250,000 can skip Schedules L, M-1 and M-2.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f1fb" />
        <Mark x={70} y={94} text="$250K" color="#1d7a49" size={30} />
        <Card x={140} y={14} w={168} h={46} lines={["Schedule L: balance", "sheet per books"]} size={10} color="#fff" />
        <Card x={140} y={66} w={168} h={46} lines={["Receipts AND assets", "under $250,000:"]} size={10} color="#d8f0e2" />
        <Card x={140} y={118} w={168} h={46} lines={["skip L, M-1, M-2", "(a yes/no question)"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Schedule L is the balance sheet per books at the beginning and end of the year, on Forms 1120, 1120-S and 1065. It should agree with the entity's books, and its ending equity should tie to Schedule M-2.",
      "A corporation (or S corporation) with total receipts and total assets at year end both under $250,000 doesn't have to complete Schedules L, M-1 and M-2; it answers a yes/no question on the return (Schedule K of Form 1120, Schedule B of Form 1120-S). Partnerships meeting a similar test (receipts under $250,000, assets under $1 million, timely K-1s, no M-3) can skip them too.",
    ],
    keyPoint: "Schedule L = balance sheet per books (beginning and end of year) on 1120, 1120-S, 1065; equity ties to M-2. Corporations with total receipts and year-end assets both < $250,000 can skip L, M-1, M-2 (a yes/no question on the return). Partnerships: receipts < $250,000 and assets < $1M (plus other conditions).",
  },
  {
    title: "K-1s and separately stated items",
    alt: "A pass-through entity reports ordinary business income on one line of the K-1 and separately states items whose character matters to the owner, like capital gains, charitable contributions and section 179.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Card x={12} y={14} w={146} h={100} lines={["ORDINARY", "sales − COGS", "wages, rent", "depreciation"]} size={10} color="#fff" />
        <Card x={164} y={14} w={146} h={100} lines={["SEPARATE", "capital gains · §1231", "charity · §179", "guaranteed payments"]} size={10} color="#fff3c4" />
        <Label x={160} y={140} size={10} weight={700}>Partnership capital on the tax basis method</Label>
        <Label x={160} y={158} size={10} weight={700}>K-1s due with the return (Mar 15 for calendar year)</Label>
      </svg>
    ),
    body: [
      "Partnerships and S corporations don't usually pay income tax. Items that are the same for every owner (sales, cost of goods sold, wages, rent, depreciation other than section 179) are netted into ordinary business income. Items whose tax treatment can differ at the owner level are separately stated on Schedule K and each owner's K-1: capital gains and losses, section 1231 gains, charitable contributions, section 179 expense, interest and dividends, foreign taxes, and (for partnerships) guaranteed payments.",
      "Partnerships must report each partner's capital account on the K-1 using the tax basis method. K-1s go to owners by the return's due date (March 15 for calendar-year partnerships and S corporations).",
    ],
    keyPoint: "Ordinary business income (one line): sales, COGS, wages, rent, regular depreciation. Separately stated: capital gains/losses, §1231, charitable contributions, §179, interest, dividends, foreign taxes, guaranteed payments. Partnership K-1 capital accounts on the tax basis method. K-1s due with the return (Mar 15, calendar year).",
  },
];

const lesson: Lesson = {
  id: "p2-reading-the-books",
  part: "part2",
  domainId: "p2d2",
  number: "2.8",
  episode: "Book Club",
  title: "Reading the books",
  minutes: 13,
  lawAsOf: "tax year 2025",
  intro: "Reading a balance sheet and income statement, permanent and temporary book-tax differences, Schedules L, M-1, M-2 and M-3, and what lands on each owner's K-1.",
  previously: "The 2025 loss is sorted and Milo has returned the bedsheet. Now Ace needs Rosa's books to file the partnership return.",
  comic,
  cards,
  hook: {
    line: "Books say profit. M-1 says taxable.",
    more: "Permanent: fines, 50% meals, tax-exempt interest, federal tax. Temporary: depreciation, bad debts. M-3 at $10M assets. Skip L, M-1, M-2 under $250,000. Character items go on the K-1 separately.",
    alt: "A stack of mystery novels next to M-1 and K-1.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Novels x={66} y={104} scale={1} />
        <Mark x={180} y={74} text="M-1" color="#1d7a49" size={32} />
        <Mark x={268} y={74} text="K-1" color="#a8321f" size={32} />
      </svg>
    ),
  },
  traps: [
    { title: "Deduct the fine", text: "Fines and penalties paid to a government are never deductible, even if the books expense them." },
    { title: "Tax-exempt interest is taxable", text: "It's in book income but subtracted on M-1." },
    { title: "Every entity files M-3", text: "Only corporations with $10 million or more of assets (and some large partnerships)." },
    { title: "Charity reduces ordinary income", text: "A pass-through separately states charitable contributions; owners deduct them on their own returns." },
  ],
  sources: [
    { key: "i1065", section: "Schedules K-1, L, M-1, M-2" },
    { key: "i1120", section: "Schedules L, M-1, M-2" },
    { key: "i1120s", section: "S corporation schedules" },
    { key: "i1120m3", section: "Schedule M-3" },
  ],
  cases: [
    {
      who: "Ace",
      title: "Walking it over",
      facts: "A C corporation's book net income is $100,000. It includes a $2,000 fine, $15,000 of federal income tax expense, and $4,000 of tax-exempt interest income.",
      question: "What is its taxable income?",
      choices: ["$121,000", "$113,000", "$100,000", "$117,000"],
      answer: "$113,000",
      why: "Add back the nondeductible fine and federal income tax ($100,000 + $2,000 + $15,000) and subtract the tax-exempt interest ($4,000): $113,000.",
    },
    {
      who: "Hoot",
      title: "Big company paperwork",
      facts: "A corporation has total assets of $12 million at the end of 2025.",
      question: "Which book-tax reconciliation does it file?",
      choices: ["Schedule M-1", "None; it's optional", "Schedule K-1", "Schedule M-3"],
      answer: "Schedule M-3",
      why: "Corporations with total assets of $10 million or more at year end file Schedule M-3 instead of M-1.",
    },
    {
      who: "Penny",
      title: "Small and simple",
      facts: "A corporation has total receipts of $180,000 for 2025 and total assets of $150,000 at year end.",
      question: "Must it complete Schedules L, M-1 and M-2?",
      choices: ["No", "Yes", "Only Schedule L", "Only if it files M-3"],
      answer: "No",
      why: "When total receipts and total assets are both under $250,000, Schedules L, M-1 and M-2 aren't required.",
    },
    {
      who: "Rosa",
      title: "What goes where",
      facts: "A partnership's 2025 items include wages, rent, cost of goods sold and a donation to a food pantry.",
      question: "Which item is separately stated on the K-1?",
      choices: ["Wages", "Rent", "The donation", "Cost of goods sold"],
      answer: "The donation",
      why: "Charitable contributions are separately stated because each partner deducts them on their own return under their own limits.",
    },
  ],
  quizTopics: [],
  quizBrief: "Reading business books: balance sheet and income statement, permanent vs. temporary book-tax differences, Schedules L, M-1, M-2, M-3 ($10M assets), K-1 separately stated items",
};

export default lesson;

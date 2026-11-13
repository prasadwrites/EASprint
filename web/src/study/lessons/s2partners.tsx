import { Ace, Backdrop, Cash, Hoot, Label, Lulu, Milo, Penny, Rosa, WaltPortrait } from "../cast";
import { Gerald, Oven } from "../bakery";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 1.2: partnerships: formation (§721), Form 1065 and K-1s, guaranteed payments, partner
// basis, distributions, selling an interest, and the centralized partnership audit regime. Written to
// Publication 541 and the Form 1065 instructions for tax year 2025.

const comic: Lesson["comic"] = [
  {
    alt: "Penny waves a Schedule K-1 in outrage. Ace calmly points at it.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Penny x={84} y={128} scale={0.78} mood="shocked" pose="hold" holding={<Paper x={0} y={-8} label="K-1" sub="$8,000" color="#fff" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "My K-1 says I earned $8,000 from the bakery. I got ZERO dollars!", x: 3, y: 2, w: 46, tail: "down-left", shout: true },
      { who: "Ace", text: "Partners are taxed on their share of income, paid out or not.", x: 54, y: 2, w: 44, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa counts cash. Grandpa Walt's portrait grumbles from the wall. Ace explains.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <WaltPortrait x={134} y={96} scale={0.8} mood="smug" />
        <Rosa x={70} y={128} scale={0.76} mood="happy" pose="hold" holding={<Cash x={0} y={-8} />} />
        <Ace x={252} y={128} scale={0.76} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I pay myself $40,000 a year for running the place.", x: 3, y: 2, w: 32, tail: "down-left" },
      { who: "Walt", text: "In my day we were paid in BREAD.", x: 36, y: 2, w: 28, tail: "down" },
      { who: "Ace", text: "A guaranteed payment: deductible for the partnership, ordinary and SE income for you.", x: 66, y: 2, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Penny hands over a paper labeled stand mixer. Ace gives a thumbs up.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="MIXER" sub="basis $1,200" color="#d4ebfa" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "When I joined, I put in my stand mixer. Do I owe tax on that?", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Ace", text: "No. Contributing property for an interest is tax-free, and your basis carries over.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu holds Biscuit's water bowl next to a card about basis going up and down.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={60} y={128} scale={0.72} mood="thinking" />
        <Card x={104} y={92} w={110} h={70} lines={["+ income", "+ money in", "− distributions", "− losses"]} size={9} color="#fff" />
        <Lulu x={262} y={160} scale={0.56} mood="smug" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "So basis goes up with income and money in, and down with losses and payouts?", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Lulu", text: "Like Biscuit's water bowl. And it can't go below empty.", x: 54, y: 4, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of the top of the oven. Milo raises his hand eagerly. Ace looks worried.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Hoot x={64} y={94} scale={0.5} mood="excited" pose="up" />
        <Oven x={64} y={208} scale={0.9} glow={false} />
        <Milo x={170} y={128} scale={0.7} mood="excited" flip pose="up" />
        <Ace x={266} y={128} scale={0.7} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Partnership AUDIT! Who's your representative?", x: 3, y: 2, w: 36, tail: "down-left" },
      { who: "Milo", text: "ME!", x: 44, y: 8, w: 14, tail: "down", shout: true },
      { who: "Ace", text: "It doesn't have to be a partner. That's what scares me.", x: 64, y: 2, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds up Gerald the sourdough jar like a trophy. Gerald looks shocked. Hoot takes notes.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Rosa x={84} y={128} scale={0.78} mood="excited" pose="up" />
        <Gerald x={156} y={150} scale={1.2} mood="shocked" />
        <Hoot x={248} y={130} scale={0.68} mood="smug" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I'm giving Gerald 1% of the bakery for his services!", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Hoot", text: "An interest for services is taxable. Gerald owes tax.", x: 54, y: 2, w: 42, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Forming a partnership",
    alt: "Contributing property for a partnership interest is tax-free. The partner's basis is the cash plus the basis of property contributed. Contributing services is taxable.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="Property in" sub="no gain or loss" />
        <Step x={166} y={14} w={140} h={100} color="#fde2e4" label="Services in" sub="taxable income" />
        <Label x={160} y={140} size={10} weight={700}>Partner's basis = cash + basis of property</Label>
        <Label x={160} y={158} size={10} weight={700}>(+ share of liabilities)</Label>
      </svg>
    ),
    body: [
      "Generally no gain or loss is recognized when a partner contributes money or property in exchange for a partnership interest. The partnership takes the partner's basis in the property, and the partner's basis in the interest (outside basis) equals the money plus the adjusted basis of property contributed, adjusted for liabilities.",
      "A partner who receives a capital interest in exchange for services has ordinary income equal to the interest's fair market value. If a partner contributes property subject to a debt, the other partners' share of that debt is treated as money distributed to the contributor.",
    ],
    keyPoint: "§721: no gain or loss on contributing property for a partnership interest; carryover basis to the partnership; partner's outside basis = money + adjusted basis of property ± liability shifts. Interest received for services = ordinary income at FMV.",
  },
  {
    title: "K-1s and guaranteed payments",
    alt: "Each partner reports their share of income from Schedule K-1, whether or not it was paid out. Guaranteed payments are deductible by the partnership and are ordinary income and self-employment income to the partner.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={56} y={84} label="K-1" sub="your share" scale={1.8} color="#fff" />
        <Card x={110} y={14} w={198} h={46} lines={["Taxed on your share,", "distributed or not"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["Guaranteed payment: deductible,", "ordinary + SE income"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["Separately stated items keep", "their character (e.g. cap gains)"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A partnership files Form 1065 (due the 15th day of the 3rd month after year end, March 15 for calendar years) and pays no income tax itself. Each partner gets a Schedule K-1 and reports their distributive share of ordinary income and separately stated items (like capital gains, section 179 deductions and charitable contributions), whether or not any cash was distributed. Late returns draw a penalty per partner, per month.",
      "Guaranteed payments are payments to a partner for services or the use of capital that are determined without regard to partnership income. The partnership deducts them, and the partner reports them as ordinary income (subject to self-employment tax when for services) for the partnership year in which they're paid.",
    ],
    keyPoint: "Form 1065 due March 15 (calendar year); late penalty per partner per month. Partners are taxed on distributive shares whether distributed or not; separately stated items keep their character. Guaranteed payments: deductible by the partnership; ordinary income (and SE income for services) to the partner.",
  },
  {
    title: "Partner basis",
    alt: "Basis goes up with contributions, income and a share of liabilities, and down with distributions, losses and nondeductible expenses. It can't go below zero, and losses are limited to basis.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Card x={14} y={14} w={140} h={120} lines={["UP:", "contributions", "income (incl. exempt)", "more liabilities"]} size={10} color="#d8f0e2" />
        <Card x={166} y={14} w={140} h={120} lines={["DOWN:", "distributions", "losses", "nondeductible costs"]} size={10} color="#fde2e4" />
        <Label x={160} y={158} size={10} weight={700}>Never below zero; losses beyond basis carry forward</Label>
      </svg>
    ),
    body: [
      "A partner's basis increases by contributions, the partner's share of partnership income (including tax-exempt income), and increases in the partner's share of partnership liabilities. It decreases by distributions, the partner's share of losses and nondeductible expenses, and decreases in the share of liabilities (treated as distributions).",
      "Basis can't go below zero. A partner can deduct losses only up to basis; disallowed losses carry forward until there's basis again. Then the at-risk, passive activity and excess business loss limits apply, in that order.",
    ],
    keyPoint: "Outside basis: + contributions, + share of income (incl. tax-exempt), + share of liabilities; − distributions, − losses, − nondeductible expenses, − liability decreases. Never below zero. Losses limited to basis (excess carried forward), then at-risk, passive and excess business loss limits.",
  },
  {
    title: "Distributions and selling out",
    alt: "Cash distributions are tax-free up to basis; cash beyond basis is gain. Selling an interest is generally capital gain, but the share of unrealized receivables and inventory is ordinary.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="Cash ≤ basis" sub="tax-free" />
        <Step x={166} y={14} w={140} h={100} color="#fde2e4" label="Cash > basis" sub="gain" />
        <Label x={160} y={140} size={10} weight={700}>Selling the interest: capital gain, except</Label>
        <Label x={160} y={158} size={10} weight={700}>"hot assets" (receivables, inventory) = ordinary</Label>
      </svg>
    ),
    body: [
      "A current distribution generally isn't taxable. It reduces basis, and gain is recognized only when money (including marketable securities treated as money) exceeds the partner's basis. Distributed property generally takes the partnership's basis, limited to the partner's remaining outside basis.",
      "A partner who sells their interest has capital gain or loss (amount realized, including relief from partnership debt, minus basis), except the part attributable to unrealized receivables and inventory (section 751 \"hot assets\"), which is ordinary.",
    ],
    keyPoint: "Distributions: tax-free to the extent of basis; money in excess of basis = gain. Property takes carryover basis, limited to outside basis. Sale of an interest: capital gain/loss, except §751 hot assets (unrealized receivables, inventory) = ordinary. Debt relief counts as amount realized.",
  },
  {
    title: "Partnership audits",
    alt: "Under the centralized audit regime the IRS audits the partnership itself, and a partnership representative speaks for it. Partnerships with 100 or fewer eligible partners can elect out each year.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Card x={14} y={14} w={292} h={56} lines={["The IRS audits the partnership; any tax is", "assessed at the partnership level"]} size={10} color="#fff" />
        <Card x={14} y={80} w={140} h={88} lines={["Partnership", "representative:", "binds everyone"]} size={10} color="#fff3c4" />
        <Card x={166} y={80} w={140} h={88} lines={["≤ 100 eligible", "partners: can", "elect out yearly"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "Under the centralized partnership audit regime (from the Bipartisan Budget Act), adjustments are determined at the partnership level, and any imputed underpayment is generally assessed against and paid by the partnership (unless it elects to push the adjustments out to the partners).",
      "Each partnership designates a partnership representative, who needn't be a partner but must have a substantial U.S. presence, and who has sole authority to act for the partnership and binds the partners. A partnership with 100 or fewer partners, all of them eligible (individuals, C and S corporations, estates of deceased partners, foreign entities that would be corporations), can elect out each year on a timely filed return.",
    ],
    keyPoint: "BBA centralized audits: adjustments and imputed underpayment at the partnership level (or push-out to partners). Partnership representative (needn't be a partner, must have substantial U.S. presence) binds everyone. Election out: ≤ 100 eligible partners, made yearly on a timely return.",
  },
];

const lesson: Lesson = {
  id: "p2-partnerships",
  part: "part2",
  domainId: "p2d1",
  number: "1.2",
  episode: "Penny's Ten Percent",
  title: "Partnerships",
  minutes: 14,
  lawAsOf: "tax year 2025",
  intro: "How a partnership is formed and taxed: K-1s, guaranteed payments, the partner's basis, distributions, selling an interest, and partnership audits.",
  previously: "Rosa's Rolls is staying a partnership for now (no yacht). The 2025 K-1s just came out, and Penny has opened hers.",
  comic,
  cards,
  hook: {
    line: "Taxed on your share, paid or not.",
    more: "Guaranteed payment = deductible + SE income. Basis: up with income and money in, down with payouts and losses, never below zero. Cash beyond basis = gain.",
    alt: "A K-1 next to a basis bucket and the word share.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Paper x={70} y={60} label="K-1" sub="your share" scale={1.3} color="#fff" />
        <Mark x={180} y={74} text="≥ 0" color="#1d7a49" size={34} />
        <Gerald x={268} y={108} scale={1.2} mood="happy" />
      </svg>
    ),
  },
  traps: [
    { title: "No cash, no tax", text: "Partners are taxed on their distributive share whether or not it's distributed." },
    { title: "Guaranteed payments aren't SE income", text: "Guaranteed payments for services are subject to self-employment tax." },
    { title: "Distributions are income", text: "They reduce basis; only money beyond basis is taxed as gain." },
    { title: "The representative must be a partner", text: "The partnership representative can be anyone with a substantial U.S. presence." },
  ],
  sources: [
    { key: "p541", section: "Partnerships" },
    { key: "i1065", section: "Form 1065 and Schedule K-1" },
  ],
  cases: [
    {
      who: "Penny",
      title: "Penny's bucket",
      facts: "Penny's basis in the partnership was $10,000 at the start of 2025. Her K-1 shows $8,000 of ordinary income, and she received a $5,000 cash distribution.",
      question: "What's her basis at the end of 2025?",
      choices: ["$13,000", "$18,000", "$15,000", "$5,000"],
      answer: "$13,000",
      why: "Basis goes up by her $8,000 share of income and down by the $5,000 distribution: $10,000 + $8,000 − $5,000 = $13,000.",
    },
    {
      who: "Rosa",
      title: "Rosa's salary",
      facts: "The partnership pays Rosa $40,000 for running the bakery, set without regard to profits. Partnership income before that payment is $90,000.",
      question: "How is the $40,000 treated?",
      choices: ["A nontaxable distribution", "A guaranteed payment: deductible by the partnership, SE income to Rosa", "Wages on a W-2", "Part of her capital account only"],
      answer: "A guaranteed payment: deductible by the partnership, SE income to Rosa",
      why: "Payments for services determined without regard to partnership income are guaranteed payments, deductible by the partnership and ordinary SE income to the partner.",
    },
    {
      who: "Milo",
      title: "Too much cash",
      facts: "A partner with a $3,000 basis in her interest receives a $5,000 cash distribution. No liabilities change.",
      question: "What does she report?",
      choices: ["Nothing", "$5,000 ordinary income", "$3,000 capital gain", "$2,000 gain"],
      answer: "$2,000 gain",
      why: "Cash distributions are tax-free up to basis. The $2,000 beyond her $3,000 basis is recognized as gain.",
    },
    {
      who: "Hoot",
      title: "Opting out",
      facts: "A partnership has 12 partners: 10 individuals and 2 S corporations. It wants out of the centralized audit regime for 2025.",
      question: "Can it elect out?",
      choices: ["No, S corporations block it", "Yes, on its timely filed 2025 return", "Only with IRS approval", "Only partnerships with 2 partners can"],
      answer: "Yes, on its timely filed 2025 return",
      why: "A partnership with 100 or fewer partners, all eligible (individuals, C and S corporations, and certain others), can elect out yearly on a timely filed return.",
    },
  ],
  quizTopics: ["Partnership return", "Partner's basis", "Guaranteed payments", "Partnership distributions"],
  quizBrief: "Partnerships: formation, Form 1065 and K-1s, distributive share, guaranteed payments, partner basis, distributions beyond basis, sale of an interest and hot assets, centralized audits",
};

export default lesson;

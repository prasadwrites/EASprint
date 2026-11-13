import { Ace, Arrow, Backdrop, Hoot, Label, Milo, Penny } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 1, topic 5.2: tax planning moves: timing and constructive receipt, bunching deductions, harvesting
// losses (and wash sales), joint vs separate returns, carryovers and estimated tax dates. Written to the
// rules for tax year 2025 (with the 2026 charitable changes from the 2025 law) from Publications 17, 538,
// 550, 501, 505 and 526.

const INK = "#17202c";

/** A short, sad stock chart. (x, y) is the top-left. */
function DownChart({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={0} y={0} width={70} height={52} rx={4} fill="#fff" stroke={INK} strokeWidth={2.5} />
      <path d="M8,14 L22,20 L32,16 L44,32 L54,28 L64,44" fill="none" stroke="#c0392b" strokeWidth={3} strokeLinejoin="round" />
      <path d="M58,44 L64,44 L64,38" fill="none" stroke="#c0392b" strokeWidth={3} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny unrolls a long list titled tax plan. Milo is shocked. Hoot peers in.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={70} y={128} scale={0.74} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="PLAN" sub="2025" color="#d8f0e2" />} />
        <Milo x={166} y={128} scale={0.74} mood="shocked" />
        <Hoot x={264} y={130} scale={0.64} mood="smug" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "This year I'm planning BEFORE December 31!", x: 3, y: 2, w: 36, tail: "down-left" },
      { who: "Milo", text: "Who are you?", x: 42, y: 8, w: 22, tail: "down" },
      { who: "Hoot", text: "A first time for everything.", x: 68, y: 3, w: 30, tail: "down-right" },
    ],
  },
  {
    alt: "Milo hides a check behind his back. Ace shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="smug" pose="hold" holding={<Paper x={0} y={-8} label="CHECK" sub="Dec 30" color="#fff3c4" />} />
        <Ace x={240} y={128} scale={0.78} mood="stern" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "A client paid me December 30. I'll just cash it in January!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Ace", text: "Constructive receipt, Milo. You had it in 2025, so it's 2025 income.", x: 52, y: 2, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds two donation envelopes. Ace holds a paper reading bunch.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fdf3e1" />
        <Penny x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="GIFTS" sub="x2 years" color="#fde2e4" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="BUNCH" sub="itemize" color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "What if I give two years of church gifts this December?", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "Bunching, Penny. Itemize this year, take the standard deduction next year.", x: 50, y: 2, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot holds up a falling stock chart. Penny points at it with a plan.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Hoot x={84} y={130} scale={0.7} mood="smug" pose="point" />
        <DownChart x={130} y={70} scale={0.9} />
        <Penny x={250} y={128} scale={0.76} mood="excited" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-hoo! Your fund is down $5,000!", x: 3, y: 3, w: 38, tail: "down-left" },
      { who: "Penny", text: "So I sell it, deduct $3,000, carry the rest. And no buying back for 30 days!", x: 46, y: 2, w: 51, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds two separate forms. Ace holds one joint form.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#efe3f7" />
        <Milo x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="MFS" sub="x2" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="MFJ" sub="usually" color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Should we file separately? Sounds independent.", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Ace", text: "Usually it costs more, Milo. Separate filers lose the EITC, education credits and student loan interest.", x: 46, y: 2, w: 51, tail: "down-right" },
    ],
  },
  {
    alt: "Penny proudly shows four calendar pages. Hoot wipes a tear.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Penny x={60} y={128} scale={0.72} mood="happy" pose="up" />
        <Calendar x={120} y={104} month="APR" day="15" scale={0.45} />
        <Calendar x={150} y={104} month="JUN" day="15" scale={0.45} color="#3f7cc4" />
        <Calendar x={180} y={104} month="SEP" day="15" scale={0.45} color="#1d7a49" />
        <Calendar x={210} y={104} month="JAN" day="15" scale={0.45} color="#9c4f8a" />
        <Hoot x={272} y={132} scale={0.6} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "And Milo's estimates: April, June, September and January 15!", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Hoot", text: "She's... organized. *sniff*", x: 62, y: 6, w: 35, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Constructive receipt",
    alt: "A check dated December 30 in Milo's hand: income in 2025, even if cashed in January.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={70} y={84} label="CHECK" sub="Dec 30" scale={1.8} color="#fff3c4" />
        <Card x={130} y={20} w={176} h={60} lines={["Credited, set aside or", "available to you = income"]} size={10} color="#fff" />
        <Card x={130} y={96} w={176} h={60} lines={["Not cashing it", "doesn't delay it"]} size={11} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Under the cash method, income is reported in the year it's actually or constructively received. Income is constructively received when it's credited to your account, set apart, or otherwise made available to you without substantial restriction, such as a check you receive in December, or interest credited to your account.",
      "Choosing not to cash the check, or not to withdraw the interest, doesn't push it into the next year. Income isn't constructively received if your control of it is substantially restricted.",
    ],
    keyPoint: "Cash method: income counts when actually or constructively received (credited, set apart or available without substantial restriction). Holding a check until January doesn't defer it.",
  },
  {
    title: "Timing moves",
    alt: "Two arrows across a year-end line: push income into next year, pull deductions into this year.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <path d="M160,14 V166" stroke={INK} strokeWidth={3} strokeDasharray="8 5" />
        <Label x={90} y={30} size={12}>2025</Label>
        <Label x={230} y={30} size={12}>2026</Label>
        <Card x={20} y={52} w={120} h={34} lines={["Income"]} size={12} color="#fff" />
        <Arrow d="M144,69 H196" />
        <Card x={200} y={52} w={104} h={34} lines={["Bill late"]} size={11} color="#fff" />
        <Card x={20} y={108} w={120} h={34} lines={["Pay early"]} size={12} color="#d8f0e2" />
        <Arrow d="M196,125 H144" />
        <Card x={200} y={108} w={104} h={34} lines={["Bill due"]} size={11} color="#fff" />
      </svg>
    ),
    body: [
      "A cash-method taxpayer expecting the same or a lower rate next year can defer income (billing late in December, taking a year-end bonus in January when the employer allows) and accelerate deductions (paying deductible expenses before December 31).",
      "Run the numbers both ways: moving income into a year with a higher rate, or into a year where it phases out a credit, can cost more than it saves.",
    ],
    keyPoint: "Cash method: defer income and accelerate deductions when rates will be the same or lower next year; reverse it when rates will rise. Check phase-outs both years.",
  },
  {
    title: "Bunching deductions",
    alt: "Two years of gifts stacked into one tall bar above the standard deduction line, then a year with the standard deduction.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M14,92 H306" stroke="#a8321f" strokeWidth={3} strokeDasharray="8 5" />
        <Label x={80} y={84} size={10} color="#a8321f">standard deduction</Label>
        <rect x={140} y={40} width={60} height={124} fill="#d8f0e2" stroke={INK} strokeWidth={2} />
        <Label x={170} y={110} size={10}>itemize</Label>
        <rect x={230} y={92} width={60} height={72} fill="#d4ebfa" stroke={INK} strokeWidth={2} />
        <Label x={260} y={130} size={10}>standard</Label>
        <Label x={170} y={34} size={10}>Year 1</Label>
        <Label x={260} y={86} size={10}>Year 2</Label>
      </svg>
    ),
    body: [
      "Bunching means timing itemized deductions, like two years of charitable gifts or elective medical care, into one year so they exceed the standard deduction ($31,500 married filing jointly for 2025), then taking the standard deduction the next year. A donor-advised fund lets a donor deduct a large gift now and recommend grants later.",
      "Starting in 2026, non-itemizers can deduct cash gifts to charity up to $1,000 ($2,000 joint), and itemizers can deduct charitable gifts only above 0.5% of AGI, which can make giving in 2025 more valuable for itemizers.",
    ],
    keyPoint: "Bunching: stack itemized deductions into one year to beat the standard deduction, then take the standard the next year. 2026: $1,000/$2,000 charitable deduction for non-itemizers; 0.5%-of-AGI floor for itemizers.",
  },
  {
    title: "Harvesting losses (and wash sales)",
    alt: "A falling chart: sell at a loss, offset gains, then up to $3,000 against other income, carry the rest forward. A 61-day window blocks repurchases.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <DownChart x={14} y={20} scale={1.3} />
        <Card x={120} y={10} w={188} h={34} lines={["Offset gains first"]} size={11} color="#fff" />
        <Card x={120} y={50} w={188} h={34} lines={["Then $3,000 of other income"]} size={10} color="#fff" />
        <Card x={120} y={90} w={188} h={34} lines={["Carry the rest forward"]} size={11} color="#d8f0e2" />
        <Card x={14} y={132} w={294} h={36} lines={["Wash sale: rebuy within 30 days before or after = no loss now"]} size={9} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Selling investments at a loss before year-end offsets capital gains. Net capital losses offset up to $3,000 of other income ($1,500 married filing separately), and the rest carries forward indefinitely.",
      "A wash sale (buying substantially identical stock or securities within 30 days before or after the sale) disallows the loss for now. The disallowed loss is added to the basis of the new shares.",
    ],
    keyPoint: "Loss harvesting: capital losses offset gains, then $3,000 of ordinary income ($1,500 MFS); excess carries forward indefinitely. Wash sale (substantially identical purchase within 30 days before/after): loss disallowed and added to the new shares' basis.",
  },
  {
    title: "Joint or separate?",
    alt: "Two columns: married filing separately loses the EITC, education credits, student loan interest and usually the dependent care credit. It can help with high medical costs or to keep liability separate.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Card x={14} y={14} w={140} h={150} color="#fde2e4">
          <Label x={84} y={36} size={11}>MFS loses</Label>
          <Label x={84} y={62} size={10} weight={700}>EITC (mostly)</Label>
          <Label x={84} y={80} size={10} weight={700}>education credits</Label>
          <Label x={84} y={98} size={10} weight={700}>student loan interest</Label>
          <Label x={84} y={116} size={10} weight={700}>dependent care (mostly)</Label>
        </Card>
        <Card x={166} y={14} w={140} h={150} color="#d8f0e2">
          <Label x={236} y={36} size={11}>MFS can help</Label>
          <Label x={236} y={62} size={10} weight={700}>big medical bills</Label>
          <Label x={236} y={80} size={10} weight={700}>(7.5% floor is lower)</Label>
          <Label x={236} y={98} size={10} weight={700}>keeping liability</Label>
          <Label x={236} y={116} size={10} weight={700}>separate</Label>
        </Card>
      </svg>
    ),
    body: [
      "Married filing jointly usually produces the lower tax. Separate filers generally can't take the education credits or the student loan interest deduction, and can take the EITC and the dependent care credit only in narrow cases (spouses living apart). If one spouse itemizes, the other must too.",
      "Filing separately can help when one spouse has large medical expenses (the 7.5% floor is figured on a smaller AGI) or wants to avoid joint and several liability for the other's tax. Compare both ways.",
    ],
    keyPoint: "MFJ usually wins. MFS loses education credits and student loan interest, and the EITC and dependent care credit except in narrow cases; if one itemizes, both must. MFS can help with big medical costs or to avoid joint liability.",
  },
  {
    title: "Carryovers and estimated tax dates",
    alt: "A suitcase of items that carry to next year: capital losses, charitable excess for 5 years, net operating losses. Four calendar pages for estimates.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={14} w={94} h={74} color="#d4ebfa" label="Cap loss" sub="forever" />
        <Step x={113} y={14} w={94} h={74} color="#d8f0e2" label="Charity" sub="5 years" />
        <Step x={212} y={14} w={94} h={74} color="#fff3c4" label="NOL" sub="forever, 80%" />
        <Calendar x={60} y={136} month="APR" day="15" scale={0.55} />
        <Calendar x={127} y={136} month="JUN" day="15" scale={0.55} color="#3f7cc4" />
        <Calendar x={194} y={136} month="SEP" day="15" scale={0.55} color="#1d7a49" />
        <Calendar x={261} y={136} month="JAN" day="15" scale={0.55} color="#9c4f8a" />
      </svg>
    ),
    body: [
      "Plan with carryovers: unused capital losses carry forward indefinitely, charitable contributions over the AGI limits carry forward five years, and net operating losses arising after 2020 carry forward indefinitely, limited to 80% of taxable income.",
      "Estimated tax for 2026 is due April 15, June 15 and September 15, 2026, and January 15, 2027 (the next business day when a date falls on a weekend or holiday). Raising withholding late in the year also works, since withholding is treated as paid evenly.",
    ],
    keyPoint: "Carryovers: capital losses indefinitely; excess charitable gifts 5 years; post-2020 NOLs indefinitely, limited to 80% of taxable income. Estimated tax: April 15, June 15, September 15, January 15.",
  },
];

const lesson: Lesson = {
  id: "p1-tax-planning",
  part: "part1",
  domainId: "p1d5",
  number: "5.2",
  episode: "Penny Plans Ahead (Finally)",
  title: "Tax planning moves",
  minutes: 13,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns, plus 2026 charitable changes)",
  intro: "Constructive receipt and timing, bunching deductions (and the 2026 charitable changes), harvesting losses without a wash sale, joint vs separate returns, carryovers and estimated tax dates.",
  previously: "Ace's year-in-review sorted out Dee's divorce. Now Penny, for the first time in recorded history, wants to plan before December 31.",
  comic,
  cards,
  hook: {
    line: "A December check is December income, cashed or not.",
    more: "Bunch deductions to beat the standard deduction. Harvest losses, but wait 31 days to buy back.",
    alt: "A check dated December 30, then a stock chart with 30 days marked.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Paper x={50} y={60} label="CHECK" sub="Dec 30" scale={1.4} color="#fff3c4" />
        <Mark x={110} y={70} text="=" color={INK} size={24} />
        <Label x={160} y={66} size={13}>2025</Label>
        <DownChart x={214} y={30} scale={1.1} />
      </svg>
    ),
  },
  traps: [
    { title: "Not cashing the check", text: "A check received in December is December income, even if deposited in January." },
    { title: "Buying back too soon", text: "Rebuying the same stock within 30 days before or after a loss sale is a wash sale; the loss moves into the new basis." },
    { title: "Separate returns to save tax", text: "MFS usually costs more and loses several credits. Compare both ways." },
    { title: "$3,000 per spouse", text: "The $3,000 capital loss limit is per return; it's $1,500 each for married filing separately." },
  ],
  sources: [
    { key: "p538", section: "Cash Method; Constructive receipt" },
    { key: "p550", section: "Wash Sales; Capital Losses" },
    { key: "p501", section: "Married Filing Separately" },
    { key: "p505", section: "When To Pay Estimated Tax" },
    { key: "obbb", section: "Charitable deduction for non-itemizers; 0.5% floor (2026)" },
  ],
  cases: [
    {
      who: "Milo",
      title: "The December 30 check",
      facts: "A client handed Milo a $1,200 check on December 30, 2025. He deposited it on January 3, 2026. He uses the cash method.",
      question: "In which year does Milo report the $1,200?",
      choices: ["2026, when deposited", "2025, when received", "Half in each year", "Whichever year he chooses"],
      answer: "2025, when received",
      why: "Income is constructively received when it's available without substantial restriction. Receiving the check in 2025 makes it 2025 income.",
    },
    {
      who: "Penny",
      title: "The loss harvest",
      facts: "In 2025 Penny has a $2,000 capital gain. In December she sells a fund at a $9,000 loss and doesn't buy it back. She files jointly.",
      question: "How much of the loss carries to 2026?",
      choices: ["$7,000", "$6,000", "$4,000", "$0"],
      answer: "$4,000",
      why: "The $9,000 loss offsets the $2,000 gain, leaving $7,000. Up to $3,000 offsets other income, so $4,000 carries forward.",
    },
    {
      who: "Hoot",
      title: "The quick buyback",
      facts: "Penny sells 100 shares at a $1,000 loss on December 10, 2025, then buys 100 shares of the same stock on December 28 for $4,000.",
      question: "What happens to the loss?",
      choices: ["Deductible in 2025", "Lost forever", "Disallowed; her new basis is $5,000", "Deductible in 2026"],
      answer: "Disallowed; her new basis is $5,000",
      why: "She rebought within 30 days, so it's a wash sale. The $1,000 loss is disallowed and added to the new shares' $4,000 cost, for a $5,000 basis.",
    },
    {
      who: "Ace",
      title: "Separately?",
      facts: "Penny and Milo claim the American opportunity credit for Penny's courses and the student loan interest deduction. Milo asks about filing separately.",
      question: "What happens to those benefits on separate returns?",
      choices: ["Both are lost", "Both are split 50/50", "Only the credit is lost", "Nothing changes"],
      answer: "Both are lost",
      why: "Married filing separately bars both the education credits and the student loan interest deduction.",
    },
    {
      who: "Rosa",
      title: "Rosa's quarterly date",
      facts: "Aunt Rosa makes estimated payments for her 2026 bakery income and has paid the first quarter.",
      question: "When is her second 2026 payment due?",
      choices: ["June 15, 2026", "July 15, 2026", "June 30, 2026", "May 15, 2026"],
      answer: "June 15, 2026",
      why: "Individual estimated tax is due April 15, June 15 and September 15 of the year, and January 15 of the next year.",
    },
  ],
  quizTopics: [],
  quizBrief: "Tax planning: constructive receipt, deferring income and accelerating deductions, bunching, capital loss harvesting and wash sales, MFJ vs MFS, carryovers, estimated tax due dates",
};

export default lesson;

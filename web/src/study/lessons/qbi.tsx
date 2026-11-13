import { Ace, Arrow, Backdrop, Biscuit, Cash, Hoot, Label, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 1, topic 3.2: the qualified business income deduction (section 199A). Written to the rules for tax
// year 2025 from the Form 8995 and 8995-A instructions and the IRS QBI deduction page.

const INK = "#17202c";

/** A dog bone treat with a label. (x, y) is its center. */
function Bone({ x, y, label, scale = 1 }: { x: number; y: number; label?: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-36,-8 a10,10 0 1,1 6,-12 h60 a10,10 0 1,1 6,12 a10,10 0 1,1 -6,12 h-60 a10,10 0 1,1 -6,-12 Z" fill="#f4e2c8" stroke={INK} strokeWidth={2.5} />
      {label && (
        <Label x={0} y={4} size={11}>
          {label}
        </Label>
      )}
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Milo fans out cash from dog walking. Biscuit watches the money. Ace holds up a bone-shaped sign reading 20%.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Cash x={130} y={70} rotate={-12} />
        <Milo x={76} y={128} scale={0.76} mood="excited" pose="up" />
        <Biscuit x={150} y={178} scale={0.34} mood="excited" />
        <Ace x={248} y={128} scale={0.76} mood="happy" flip pose="hold" holding={<Bone x={0} y={-10} label="20%" scale={0.8} />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "I made $40,000 walking dogs this year! Do I get a treat?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "You do, Milo: a 20% deduction for qualified business income. Up to $8,000.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Biscuit sits up begging, drooling at the bone sign. Milo laughs. Penny facepalms.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={66} y={128} scale={0.72} mood="happy" />
        <Biscuit x={160} y={150} scale={0.6} mood="excited" />
        <Milo x={256} y={128} scale={0.74} mood="happy" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Biscuit", text: "WOOF? (Treat?)", x: 36, y: 6, w: 28, tail: "down" },
      { who: "Milo", text: "Not that kind of treat, Biscuit.", x: 64, y: 4, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot holds up a measuring tape against a stack labeled taxable income minus capital gains.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Hoot x={80} y={128} scale={0.72} mood="smug" pose="point" />
        <Step x={170} y={100} w={60} h={86} color="#d4ebfa" label="20% QBI" />
        <Step x={240} y={76} w={60} h={110} color="#fff3c4" label="20% TI" sub="– net gain" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-hoo! 20% of QBI, Milo Marsh, but never more than 20% of taxable income minus net capital gain!", x: 3, y: 2, w: 66, tail: "down-left" },
    ],
  },
  {
    alt: "Penny waves her W-2 hopefully. Ace gently shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="W-2" sub="salary" />} />
        <Ace x={240} y={128} scale={0.78} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Then I'll take 20% off my salary too!", x: 3, y: 4, w: 38, tail: "down-left" },
      { who: "Ace", text: "Sorry, Penny. Wages as an employee are never qualified business income.", x: 50, y: 3, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Ace looks at his own office door, labeled Okafor Tax. Hoot leans in grinning.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <rect x={120} y={60} width={70} height={130} rx={4} fill="#8a5a3c" stroke={INK} strokeWidth={2.5} />
        <Card x={126} y={80} w={58} h={30} lines={["OKAFOR", "TAX"]} size={8} color="#fff3c4" />
        <Ace x={66} y={128} scale={0.72} mood="worried" pose="point" />
        <Hoot x={256} y={128} scale={0.7} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "My tax practice is a specified service business. Over the threshold, my deduction fades.", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Hoot", text: "Hoo! Even the EA has limits!", x: 62, y: 6, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa, flour on her apron, proudly holds a card reading W-2 wages. Ace points and nods.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.76} mood="smug" pose="hold" holding={<Card x={-30} y={-20} w={60} h={30} lines={["W-2 wages"]} size={9} color="#fff" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "My bakery makes a lot, but I pay six bakers good wages!", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Then above the threshold, Rosa, those W-2 wages set your cap. Bakeries aren't service businesses.", x: 51, y: 2, w: 46, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The QBI deduction: 20% off business income",
    alt: "A business income pie with a 20 percent slice cut out, labeled deduction. Below: sole proprietor, partnership, S corporation.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <circle cx={90} cy={90} r={62} fill="#f6b73c" stroke={INK} strokeWidth={2.5} />
        <path d="M90,90 L90,28 A62,62 0 0,1 149,71 Z" fill="#9fd8a8" stroke={INK} strokeWidth={2.5} />
        <Label x={110} y={60} size={12}>20%</Label>
        <Card x={170} y={22} w={138} h={34} lines={["Sole proprietors"]} size={11} color="#fff" />
        <Card x={170} y={62} w={138} h={34} lines={["Partners"]} size={11} color="#fff" />
        <Card x={170} y={102} w={138} h={34} lines={["S corp owners"]} size={11} color="#fff" />
        <Label x={238} y={160} size={10} weight={700}>(and trusts, estates)</Label>
      </svg>
    ),
    body: [
      "Individuals, trusts and estates with qualified business income from a sole proprietorship, partnership or S corporation can deduct up to 20% of it. C corporations can't.",
      "It's taken after AGI, whether or not the taxpayer itemizes. It doesn't lower AGI or self-employment tax.",
    ],
    keyPoint: "QBI deduction: up to 20% of qualified business income from sole props, partnerships, S corps (individuals, trusts, estates). Below the line, itemizing or not; doesn't reduce AGI or SE tax.",
  },
  {
    title: "What is and isn't qualified business income",
    alt: "A sieve: business profit falls through into the QBI bowl; wages, capital gains, interest, guaranteed payments and S corp salaries get caught.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={20} w={136} h={140} color="#d8f0e2">
          <Label x={82} y={44} size={12}>QBI</Label>
          <Label x={82} y={72} size={10} weight={700}>Net business profit</Label>
          <Label x={82} y={94} size={10} weight={700}>U.S. trade or business</Label>
          <Label x={82} y={116} size={10} weight={700}>Rentals run as a</Label>
          <Label x={82} y={130} size={10} weight={700}>business</Label>
        </Card>
        <Card x={170} y={20} w={136} h={140} color="#fde2e4">
          <Label x={238} y={44} size={12}>Not QBI</Label>
          <Label x={238} y={70} size={10} weight={700}>Employee wages</Label>
          <Label x={238} y={90} size={10} weight={700}>Capital gains</Label>
          <Label x={238} y={110} size={10} weight={700}>Interest, dividends</Label>
          <Label x={238} y={130} size={10} weight={700}>Guaranteed pay,</Label>
          <Label x={238} y={144} size={10} weight={700}>S corp salary</Label>
        </Card>
      </svg>
    ),
    body: [
      "QBI is the net income from a qualified trade or business conducted in the U.S., after deductions such as half of SE tax, SE health insurance and self-employed retirement contributions attributable to it.",
      "It excludes investment items (capital gains and losses, most interest and dividends), wages earned as an employee, reasonable compensation an S corporation pays its owner, and guaranteed payments to partners. A net QBI loss carries forward and reduces next year's QBI.",
    ],
    keyPoint: "QBI = net U.S. business income (after ½ SE tax, SE health insurance, SE retirement). Not QBI: employee wages, S corp reasonable comp, guaranteed payments, capital gains, interest, dividends. QBI losses carry forward.",
  },
  {
    title: "The overall cap: 20% of taxable income minus net capital gain",
    alt: "Two bars. 20 percent of QBI on the left, and 20 percent of taxable income minus net capital gain on the right. The deduction is the shorter bar.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <rect x={40} y={40} width={70} height={120} fill="#9fd8a8" stroke={INK} strokeWidth={2.5} />
        <rect x={150} y={80} width={70} height={80} fill="#d4ebfa" stroke={INK} strokeWidth={2.5} />
        <Label x={75} y={104} size={10}>20% of QBI</Label>
        <Label x={185} y={116} size={9}>20% of (TI</Label>
        <Label x={185} y={130} size={9}>– net gain)</Label>
        <Arrow d="M240,80 H290" color="#a8321f" />
        <Label x={266} y={104} size={11} color="#a8321f">smaller</Label>
        <Label x={266} y={120} size={11} color="#a8321f">wins</Label>
      </svg>
    ),
    body: [
      "Below the income thresholds, the deduction is the smaller of 20% of QBI (plus 20% of qualified REIT dividends and PTP income) or 20% of taxable income before the QBI deduction, minus net capital gain.",
      "Net capital gain here includes qualified dividends. Someone with little ordinary income can find the cap biting even with plenty of business income.",
    ],
    keyPoint: "Deduction ≤ 20% × (taxable income before QBID − net capital gain, including qualified dividends). Below the threshold: lesser of 20% of QBI (+REIT/PTP) or that cap.",
  },
  {
    title: "The 2025 thresholds",
    alt: "A road with a sign at $197,300 single and $394,600 joint, then a ramp of $50,000 or $100,000 where the extra limits phase in.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <path d="M10,140 H130 L230,60 H310" fill="none" stroke={INK} strokeWidth={5} />
        <Card x={14} y={30} w={116} h={60} lines={["$197,300", "$394,600 MFJ"]} size={12} color="#d8f0e2" />
        <Label x={72} y={162} size={10} weight={700}>simple 20%</Label>
        <Label x={180} y={124} size={10} weight={700}>phase-in</Label>
        <Label x={180} y={140} size={10} weight={700}>$50K / $100K</Label>
        <Label x={270} y={44} size={10} weight={700}>full limits</Label>
      </svg>
    ),
    body: [
      "For 2025, the extra limits don't apply when taxable income before the QBI deduction is at or below $197,300 ($394,600 married filing jointly). Those taxpayers just take the lesser of 20% of QBI or the overall cap, and use the simpler Form 8995.",
      "Above the threshold, the limits phase in over the next $50,000 ($100,000 joint), so they apply fully above $247,300 ($494,600 joint). Those taxpayers use Form 8995-A.",
    ],
    keyPoint: "2025 QBI threshold: $197,300 ($394,600 MFJ), phase-in range $50,000 ($100,000 MFJ). At or below: no wage/SSTB limits, Form 8995. Above: Form 8995-A.",
  },
  {
    title: "Specified service businesses fade out",
    alt: "A row of office doors: health, law, accounting, consulting, financial services, performing arts, athletics. A dimmer switch turns them off above the threshold.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Card x={10} y={16} w={96} h={30} lines={["Health"]} size={10} color="#fff" />
        <Card x={112} y={16} w={96} h={30} lines={["Law"]} size={10} color="#fff" />
        <Card x={214} y={16} w={96} h={30} lines={["Accounting"]} size={10} color="#fff" />
        <Card x={10} y={52} w={96} h={30} lines={["Consulting"]} size={10} color="#fff" />
        <Card x={112} y={52} w={96} h={30} lines={["Finance"]} size={10} color="#fff" />
        <Card x={214} y={52} w={96} h={30} lines={["Performing arts"]} size={10} color="#fff" />
        <Card x={10} y={88} w={96} h={30} lines={["Athletics"]} size={10} color="#fff" />
        <Card x={112} y={88} w={96} h={30} lines={["Brokerage"]} size={10} color="#fff" />
        <Card x={214} y={88} w={96} h={30} lines={["Fame or skill"]} size={10} color="#fff" />
        <Label x={160} y={142} size={11}>Above $247,300 ($494,600 MFJ):</Label>
        <Label x={160} y={160} size={11} color="#a8321f">no QBI deduction at all</Label>
      </svg>
    ),
    body: [
      "A specified service trade or business (SSTB) is one in health, law, accounting, actuarial science, performing arts, consulting, athletics, financial services, brokerage, investment management or trading, or any business whose main asset is the reputation or skill of its owners or employees.",
      "Below the threshold, an SSTB qualifies fully. In the phase-in range, only part of its income counts, and above the top of the range ($247,300, or $494,600 joint, for 2025), it gets no deduction at all.",
    ],
    keyPoint: "SSTBs (health, law, accounting, consulting, finance, performing arts, athletics, brokerage, reputation/skill): full deduction below the threshold, partial in the phase-in, none above $247,300 ($494,600 MFJ).",
  },
  {
    title: "The W-2 wage and property limit",
    alt: "Aunt Rosa next to two gauges: 50 percent of W-2 wages, or 25 percent of wages plus 2.5 percent of property. The higher gauge sets the cap.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#f3e1ef" floorY={162} />
        <Rosa x={50} y={124} scale={0.42} mood="smug" />
        <Card x={100} y={20} w={208} h={44} lines={["50% of W-2 wages"]} size={12} color="#d8f0e2" />
        <Label x={204} y={82} size={13}>or</Label>
        <Card x={100} y={92} w={208} h={50} lines={["25% of W-2 wages +", "2.5% of property (UBIA)"]} size={11} color="#d4ebfa" />
        <Label x={204} y={160} size={10} weight={700}>the greater one caps it, above the threshold</Label>
      </svg>
    ),
    body: [
      "Above the threshold, the deduction for each business is also limited to the greater of 50% of the W-2 wages it paid, or 25% of those wages plus 2.5% of the unadjusted basis of its qualified property (UBIA).",
      "A high-income owner of a business with no employees and little equipment can lose much of the deduction; a business with a big payroll, like a bakery, often keeps it.",
    ],
    keyPoint: "Above the threshold: per business, deduction ≤ greater of 50% of W-2 wages or 25% of W-2 wages + 2.5% of UBIA of qualified property.",
  },
];

const lesson: Lesson = {
  id: "p1-qbi",
  part: "part1",
  domainId: "p1d3",
  number: "3.2",
  episode: "Milo's 20% Treat",
  title: "QBI deduction",
  minutes: 12,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "The qualified business income deduction: who gets it, what counts as QBI, the overall cap, the 2025 thresholds and the limits above them.",
  previously: "Penny and Milo settled the itemizing debate (standard wins). Now Milo has totaled his dog-walking year and wants a reward.",
  comic,
  cards,
  hook: {
    line: "Twenty percent, but the smaller of two twenties.",
    more: "20% of QBI or 20% of taxable income minus net capital gain. Above $197,300 ($394,600 joint), service businesses and wage limits come into play.",
    alt: "A dog bone labeled 20% between two measuring sticks.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Bone x={160} y={58} label="20%" scale={1.6} />
        <Label x={50} y={64} size={14}>of QBI</Label>
        <Label x={276} y={56} size={11}>of TI minus</Label>
        <Label x={276} y={72} size={11}>net gain</Label>
        <Mark x={160} y={108} text="smaller wins" color="#a8321f" size={13} />
      </svg>
    ),
  },
  traps: [
    { title: "Wages are business income", text: "Employee wages (and S corp owner salaries and partner guaranteed payments) are never QBI." },
    { title: "It lowers AGI", text: "The QBI deduction comes after AGI and doesn't reduce self-employment tax." },
    { title: "Service businesses never qualify", text: "Below the threshold, specified service businesses get the full deduction. The phase-out happens only above it." },
    { title: "Forgetting the overall cap", text: "The deduction can't exceed 20% of taxable income minus net capital gain, including qualified dividends." },
  ],
  sources: [
    { key: "i8995", section: "Qualified Business Income; Taxable income limitation" },
    { key: "qbi", section: "Qualified business income deduction" },
  ],
  cases: [
    {
      who: "Milo",
      title: "Milo's treat",
      facts: "Milo's dog walking produced $40,000 of QBI. Penny and Milo's 2025 taxable income before the QBI deduction is $60,000, with no capital gains or qualified dividends.",
      question: "What's their QBI deduction?",
      choices: ["$12,000", "$8,000", "$4,000", "$0"],
      answer: "$8,000",
      why: "They're below the threshold, so it's the lesser of 20% of QBI ($8,000) or 20% of taxable income minus net capital gain ($12,000).",
    },
    {
      who: "Milo",
      title: "When the cap bites",
      facts: "Milo's cousin has $40,000 of QBI and taxable income before the QBI deduction of $30,000, of which $10,000 is net capital gain.",
      question: "What's the QBI deduction?",
      choices: ["$8,000", "$6,000", "$4,000", "$2,000"],
      answer: "$4,000",
      why: "20% of QBI is $8,000, but the cap is 20% of ($30,000 minus $10,000) = $4,000. The smaller amount applies.",
    },
    {
      who: "Penny",
      title: "Penny's salary",
      facts: "Penny earned $70,000 of W-2 wages as an employee of Ledger Falls Gadget Works.",
      question: "How much of her salary is qualified business income?",
      choices: ["$70,000", "$14,000", "$0", "Half, $35,000"],
      answer: "$0",
      why: "Wages earned as an employee aren't income from a trade or business for the QBI deduction.",
    },
    {
      who: "Ace",
      title: "Ace's practice",
      facts: "Ace is single. His tax practice (an accounting SSTB) produced $200,000 of QBI, and his 2025 taxable income before the QBI deduction is $260,000.",
      question: "What QBI deduction does Ace get from his practice?",
      choices: ["$40,000", "$20,000", "$52,000", "$0"],
      answer: "$0",
      why: "His taxable income is above $247,300, the top of the 2025 single phase-in range, so a specified service business gets no QBI deduction.",
    },
    {
      who: "Hoot",
      title: "Hoot checks the SE tax",
      facts: "Milo claims an $8,000 QBI deduction on his dog-walking income.",
      question: "How does the QBI deduction affect Milo's self-employment tax?",
      choices: ["Reduces SE income by $8,000", "Reduces SE tax by 20%", "No effect on SE tax", "Eliminates SE tax below the threshold"],
      answer: "No effect on SE tax",
      why: "The QBI deduction reduces taxable income only. It doesn't reduce net earnings from self-employment or AGI.",
    },
  ],
  quizTopics: [],
  quizBrief: "QBI deduction: 20% of qualified business income, what counts as QBI, cap of 20% of taxable income minus net capital gain, 2025 thresholds $197,300/$394,600, SSTBs, W-2 wage and UBIA limits",
};

export default lesson;

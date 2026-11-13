import { Ace, Backdrop, Hoot, Label, Lulu, Penny, Rosa } from "../cast";
import { Oven } from "../bakery";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 2.7: credits, losses and QBI: the order of loss limits (basis, at-risk, passive, excess
// business loss), net operating losses, the qualified business income deduction, and the general business
// credit. Written to Publication 536, Publication 925, the Form 461, 3800 and 8995 instructions for 2025.

const INK = "#2a2f3a";

/** Milo hiding under a bedsheet, playing the ghost of a net operating loss. (x, y) is the bottom center. */
function Ghost({ x, y, scale = 1, flip }: { x: number; y: number; scale?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M-42,0 Q-46,-60 -34,-96 Q-20,-132 0,-132 Q20,-132 34,-96 Q46,-60 42,0 Q34,-10 26,0 Q18,-10 10,0 Q2,-10 -6,0 Q-14,-10 -22,0 Q-30,-10 -42,0 Z" fill="#fff" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <ellipse cx={-12} cy={-96} rx={6} ry={8} fill={INK} />
      <ellipse cx={12} cy={-96} rx={6} ry={8} fill={INK} />
      <ellipse cx={0} cy={-76} rx={8} ry={10} fill={INK} />
      <path d="M-14,-34 h28" stroke="#9aa4b2" strokeWidth={2} />
      <text x={0} y={-44} textAnchor="middle" fontSize={16} fontWeight={900} fill="#a8321f" fontFamily="inherit">
        NOL
      </text>
      <ellipse cx={-14} cy={2} rx={11} ry={5} fill="#7a4a20" stroke={INK} strokeWidth={2} />
      <ellipse cx={14} cy={2} rx={11} ry={5} fill="#7a4a20" stroke={INK} strokeWidth={2} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny holds a page reading LOSS. Rosa stares at it in shock.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Penny x={70} y={128} scale={0.76} mood="worried" pose="hold" />
        <Paper x={128} y={102} label="LOSS" sub="−$20,000" scale={0.9} rotate={-6} />
        <Rosa x={256} y={128} scale={0.76} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Bertha's 100% bonus depreciation turned our 2025 profit into a $20,000 loss!", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Rosa", text: "Bertha ATE our profit?", x: 64, y: 6, w: 32, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Ace points at a card listing four hurdles: basis, at-risk, passive and excess business loss. Rosa clutches her knee.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={82} w={104} h={78} lines={["1. Basis", "2. At-risk", "3. Passive", "4. Excess loss"]} size={10} color="#fff" />
        <Rosa x={262} y={128} scale={0.76} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Your share of the loss has to clear four hurdles, in this order.", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Rosa", text: "Four hurdles? My knees can do one.", x: 60, y: 6, w: 36, tail: "down-right" },
    ],
  },
  {
    alt: "Milo, under a bedsheet labeled NOL with his shoes sticking out, haunts the bakery. Lulu looks unafraid.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Ghost x={84} y={206} scale={0.9} />
        <Lulu x={262} y={160} scale={0.56} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Woooo! I'm the NOL! I carry forward FOREVER!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Lulu", text: "You only get 80% of the income each year. And I see your shoes, Milo.", x: 56, y: 4, w: 41, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of Bertha the oven holding up a finger. Rosa waves an oven mitt at him.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Hoot x={84} y={122} scale={0.54} mood="stern" pose="up" />
        <Oven x={84} y={224} scale={0.85} glow={false} label="BERTHA" />
        <Rosa x={256} y={128} scale={0.76} mood="shocked" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Business losses over $313,000 ($626,000 joint) wait a year as an NOL. Yours is fine.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Rosa", text: "Hoot! Get out of Bertha!", x: 64, y: 6, w: 32, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Penny shows a big 20% tag. Lulu, holding scissors, wants to clip it like a coupon.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Mark x={160} y={118} text="20%" color="#1d7a49" size={40} />
        <Lulu x={270} y={160} scale={0.56} mood="excited" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "In profit years, owners can deduct up to 20% of qualified business income. That's QBI.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Lulu", text: "Like a coupon? Can I clip it?", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds up Form 3800. The NOL ghost, Milo under a sheet, leans in.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={70} y={128} scale={0.76} mood="happy" pose="hold" />
        <Paper x={128} y={100} label="3800" sub="credits" scale={0.85} rotate={-6} />
        <Ghost x={250} y={206} scale={0.86} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "And unused business credits go back 1 year and forward 20.", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Milo", text: "Twenty years? Great. I'll haunt those too.", x: 58, y: 4, w: 38, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Four hurdles for a loss",
    alt: "A business loss flowing to an owner must clear four limits in order: basis, at-risk, passive activity, and the excess business loss limit.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={8} y={14} w={72} h={100} color="#fff" label="1" sub="basis" />
        <Step x={86} y={14} w={72} h={100} color="#fff3c4" label="2" sub="at-risk" />
        <Step x={164} y={14} w={72} h={100} color="#d4ebfa" label="3" sub="passive" />
        <Step x={242} y={14} w={70} h={100} color="#fde2e4" label="4" sub="excess loss" />
        <Label x={160} y={140} size={10} weight={700}>A loss stopped at one hurdle carries forward there</Label>
        <Label x={160} y={158} size={10} weight={700}>Forms 6198 (at-risk) · 8582 (passive) · 461</Label>
      </svg>
    ),
    body: [
      "A loss from a partnership, S corporation or sole proprietorship has to clear four limits, in order. First, an owner can't deduct more than their basis in the entity. Second, the at-risk rules limit the loss to the amount the owner could actually lose: cash and property contributed plus debt they're personally liable for (and qualified nonrecourse real estate financing). Use Form 6198.",
      "Third, if the owner doesn't materially participate, the passive activity rules allow the loss only against passive income (Form 8582). Fourth, for noncorporate taxpayers, the excess business loss limit applies. A loss that's stopped at a hurdle is suspended and carried forward under that rule.",
    ],
    keyPoint: "Owner-level loss limits, in order: (1) basis, (2) at-risk (§465, Form 6198: money and property contributed + recourse debt + qualified nonrecourse real estate financing), (3) passive activity (§469, Form 8582), (4) excess business loss (§461(l), Form 461). Disallowed amounts carry forward under each rule.",
  },
  {
    title: "Excess business loss",
    alt: "For 2025, a noncorporate taxpayer's net business losses over $313,000, or $626,000 on a joint return, aren't deductible this year and become an NOL carryforward.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={100} color="#fff" label="$313,000" sub="single (2025)" />
        <Step x={166} y={14} w={140} h={100} color="#d8f0e2" label="$626,000" sub="joint (2025)" />
        <Label x={160} y={140} size={10} weight={700}>Excess becomes an NOL next year</Label>
        <Label x={160} y={158} size={10} weight={700}>Noncorporate only · Form 461</Label>
      </svg>
    ),
    body: [
      "Individuals, estates and trusts can't deduct an excess business loss: the amount by which total business deductions exceed total business income and gains plus a threshold. For 2025 the threshold is $313,000 ($626,000 for married filing jointly). The limit is applied after the basis, at-risk and passive rules.",
      "The disallowed excess is treated as a net operating loss carryforward to the next year. The One Big Beautiful Bill Act made the limit permanent. It doesn't apply to C corporations. Use Form 461.",
    ],
    keyPoint: "Excess business loss (§461(l)), noncorporate taxpayers: net business loss over $313,000 single / $626,000 MFJ (2025) is disallowed and becomes an NOL carryforward. Applied after basis, at-risk and passive limits. Made permanent by OBBBA. Not for C corporations. Form 461.",
  },
  {
    title: "Net operating losses",
    alt: "NOLs arising after 2020 carry forward indefinitely with no carryback, except farming losses, and can offset only 80% of taxable income.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={10} y={14} w={96} h={100} color="#fde2e4" label="0" sub="years back" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="∞" sub="years forward" />
        <Step x={214} y={14} w={96} h={100} color="#fff3c4" label="80%" sub="of taxable inc." />
        <Label x={160} y={140} size={10} weight={700}>Farming losses: 2 years back</Label>
        <Label x={160} y={158} size={10} weight={700}>Individuals compute it on Schedule A of Form 172</Label>
      </svg>
    ),
    body: [
      "A net operating loss (NOL) arises when business deductions exceed income; for individuals, only business items (and casualty losses) create it, while nonbusiness deductions like the standard deduction don't. NOLs arising in tax years after 2020 can't be carried back (except farming losses, which go back 2 years) and carry forward indefinitely.",
      "For post-2017 NOLs, the NOL deduction in a carryforward year is limited to 80% of taxable income figured without it. Older (pre-2018) NOLs carried forward aren't subject to the 80% limit. Individuals figure the NOL on Form 172.",
    ],
    keyPoint: "NOL: business deductions over income (individuals exclude nonbusiness deductions). Post-2020 NOLs: no carryback (farming: 2 years back), indefinite carryforward. Post-2017 NOLs: deduction limited to 80% of taxable income computed without the NOL. Pre-2018 NOLs: no 80% limit. Form 172.",
  },
  {
    title: "Qualified business income",
    alt: "Owners of pass-through businesses can deduct up to 20% of qualified business income. Above $197,300 single or $394,600 joint for 2025, wage and property limits phase in, and service businesses phase out.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Mark x={66} y={92} text="20%" color="#1d7a49" size={40} />
        <Card x={130} y={14} w={180} h={46} lines={["Below $197,300 / $394,600:", "20% of QBI, simple"]} size={10} color="#d8f0e2" />
        <Card x={130} y={66} w={180} h={46} lines={["Above: W-2 wage and", "property limits phase in"]} size={10} color="#fff" />
        <Card x={130} y={118} w={180} h={46} lines={["Specified service", "businesses phase out"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Owners of sole proprietorships, partnerships, S corporations, trusts and estates may deduct up to 20% of qualified business income (QBI) from a U.S. trade or business, plus 20% of qualified REIT dividends and PTP income. The deduction can't exceed 20% of taxable income minus net capital gain. QBI excludes wages, guaranteed payments, reasonable compensation from an S corporation, capital gains and interest income not allocable to the business. C corporations don't get it.",
      "For 2025, if taxable income is at or below $197,300 ($394,600 joint), the deduction is simply 20% of QBI. Above that, over a $50,000 ($100,000 joint) phase-in range, it's limited to the greater of 50% of W-2 wages or 25% of W-2 wages plus 2.5% of the unadjusted basis of qualified property, and a specified service trade or business (health, law, accounting, consulting, and similar) phases out entirely. The deduction is taken on Form 8995 or 8995-A and was made permanent by the One Big Beautiful Bill Act.",
    ],
    keyPoint: "QBI (§199A): up to 20% of QBI from pass-throughs (not C corps), limited to 20% of (taxable income − net capital gain). Excludes wages, guaranteed payments, S corp reasonable comp, investment income. 2025 threshold $197,300 / $394,600 MFJ; phase-in $50,000 / $100,000: W-2 wage/UBIA limit (greater of 50% wages or 25% wages + 2.5% UBIA); SSTBs phase out. Forms 8995/8995-A.",
  },
  {
    title: "General business credit",
    alt: "Business credits are combined on Form 3800. Unused credits carry back 1 year and forward 20 years.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Step x={14} y={14} w={140} h={100} color="#fff" label="1" sub="year back" />
        <Step x={166} y={14} w={140} h={100} color="#d8f0e2" label="20" sub="years forward" />
        <Label x={160} y={140} size={10} weight={700}>Form 3800 collects the credits</Label>
        <Label x={160} y={158} size={10} weight={700}>Research · WOTC · pension startup · health</Label>
      </svg>
    ),
    body: [
      "The general business credit is the total of many business credits, such as the research credit, the work opportunity tax credit, the small employer pension plan startup credit, the small employer health insurance credit, and the disabled access credit. Each is figured on its own form and combined on Form 3800.",
      "The credit is limited based on the taxpayer's tax liability (net income tax minus the greater of tentative minimum tax or 25% of net regular tax liability over $25,000). Unused credits carry back 1 year and then forward 20 years.",
    ],
    keyPoint: "General business credit (Form 3800) = research, WOTC, pension plan startup, small employer health insurance, disabled access, and others. Limit: net income tax − greater of TMT or 25% of net regular tax over $25,000. Unused: carry back 1 year, forward 20 years.",
  },
];

const lesson: Lesson = {
  id: "p2-credits-losses-qbi",
  part: "part2",
  domainId: "p2d2",
  number: "2.7",
  episode: "The Ghost of Losses Past",
  title: "Credits, losses and QBI",
  minutes: 15,
  lawAsOf: "tax year 2025, as changed by the One Big Beautiful Bill Act",
  intro: "The four hurdles a business loss must clear, the excess business loss limit, net operating losses, the 20% QBI deduction for 2025, and the general business credit.",
  previously: "Rolly the mascot is officially on payroll. Then Penny closed the books on 2025 and found something scary.",
  comic,
  cards,
  hook: {
    line: "Basis, at-risk, passive, then excess loss.",
    more: "EBL 2025: $313,000 / $626,000. NOL: no carryback, forward forever, 80% of taxable income. QBI: 20%, thresholds $197,300 / $394,600. Credits: back 1, forward 20.",
    alt: "The NOL ghost next to the numbers 80% and 20%.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7e3f3" />
        <Ghost x={66} y={114} scale={0.62} />
        <Mark x={180} y={74} text="80%" color="#a8321f" size={32} />
        <Mark x={268} y={74} text="20%" color="#1d7a49" size={32} />
      </svg>
    ),
  },
  traps: [
    { title: "Carry the NOL back 2 years", text: "Post-2020 NOLs can't be carried back, except farming losses." },
    { title: "The NOL wipes out all income", text: "Post-2017 NOLs offset only 80% of taxable income in a carryforward year." },
    { title: "Wages count as QBI", text: "Wages, guaranteed payments and S corporation reasonable compensation aren't QBI." },
    { title: "Credits carry forward 5 years", text: "General business credits carry back 1 year and forward 20." },
  ],
  sources: [
    { key: "nol", section: "Net operating losses" },
    { key: "p925", section: "At-risk and passive rules" },
    { key: "i461", section: "Excess business losses" },
    { key: "qbi", section: "QBI deduction" },
    { key: "i3800", section: "General business credit" },
  ],
  cases: [
    {
      who: "Rosa",
      title: "The 80% rule",
      facts: "An individual has a $70,000 NOL carryforward from 2022. Her 2025 taxable income before the NOL deduction is $50,000.",
      question: "How much NOL can she deduct in 2025?",
      choices: ["$50,000", "$70,000", "$40,000", "$0"],
      answer: "$40,000",
      why: "A post-2017 NOL is limited to 80% of taxable income figured without it: 80% × $50,000 = $40,000. The other $30,000 carries forward.",
    },
    {
      who: "Hoot",
      title: "Too big a loss",
      facts: "A single taxpayer's sole proprietorship has a 2025 loss of $400,000. She has no other business income and clears the basis, at-risk and passive rules.",
      question: "How is the loss treated?",
      choices: ["$313,000 now; $87,000 NOL carryforward", "$400,000 deducted now", "$313,000 now; $87,000 lost", "$0 now; all carried forward"],
      answer: "$313,000 now; $87,000 NOL carryforward",
      why: "The 2025 excess business loss threshold for a single filer is $313,000. The $87,000 excess becomes an NOL carryforward.",
    },
    {
      who: "Penny",
      title: "Coupon time",
      facts: "A single sole proprietor has 2025 taxable income (before QBI) of $100,000, QBI of $60,000, and no capital gains.",
      question: "What is the QBI deduction?",
      choices: ["$20,000", "$6,000", "$60,000", "$12,000"],
      answer: "$12,000",
      why: "Taxable income is below the $197,300 threshold, so the deduction is the lesser of 20% of QBI ($12,000) or 20% of taxable income ($20,000).",
    },
    {
      who: "Ace",
      title: "Leftover credits",
      facts: "A business can't use all of its 2025 work opportunity credit because of the tax liability limit.",
      question: "What happens to the unused credit?",
      choices: ["Carry forward 5 years only", "Carry back 1 year, then forward 20 years", "Carry back 2 years, then forward 15 years", "It's lost"],
      answer: "Carry back 1 year, then forward 20 years",
      why: "Unused general business credits carry back 1 year and forward 20 years.",
    },
  ],
  quizTopics: ["Net operating losses", "Qualified business income"],
  quizBrief: "Losses and credits: basis, at-risk, passive and excess business loss ($313,000/$626,000 for 2025), NOLs (no carryback, 80%), QBI deduction (2025 thresholds), business credit (1 back, 20 forward)",
};

export default lesson;

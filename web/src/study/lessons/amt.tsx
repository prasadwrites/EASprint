import { Ace, Arrow, Backdrop, Hoot, Label, Lulu, Milo, Penny } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 1, topic 4.1: the alternative minimum tax. Written to the rules for tax year 2025 from the Form 6251
// instructions and Publication 525 (incentive stock options).

const INK = "#17202c";

/** A stage curtain Hoot pops out from. (x, y) is the top-left. */
function Curtain({ x, y, w = 90, h = 150 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={w} height={14} fill="#8a2a2a" stroke={INK} strokeWidth={2} />
      <path d={`M0,14 Q${w * 0.15},${h / 2} 0,${h} H${w * 0.3} Q${w * 0.2},${h / 2} ${w * 0.3},14 Z`} fill="#b3363a" stroke={INK} strokeWidth={2} />
      <path d={`M${w},14 Q${w * 0.85},${h / 2} ${w},${h} H${w * 0.7} Q${w * 0.8},${h / 2} ${w * 0.7},14 Z`} fill="#b3363a" stroke={INK} strokeWidth={2} />
    </g>
  );
}

/** Two side-by-side tax lanes. (x, y) is the top-left; 140 by 120. */
function TwoLanes({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={66} height={120} rx={6} fill="#d4ebfa" stroke={INK} strokeWidth={2} />
      <rect x={74} y={0} width={66} height={120} rx={6} fill="#fde2e4" stroke={INK} strokeWidth={2} />
      <Label x={33} y={20} size={10}>Regular</Label>
      <Label x={107} y={20} size={10}>AMT</Label>
      <Label x={33} y={66} size={20}>$</Label>
      <Label x={107} y={66} size={20}>$$</Label>
      <Label x={70} y={108} size={9} weight={700}>pay the higher</Label>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny waves a stock option certificate from Gadget Works. Milo looks nervous.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="ISO" sub="x 1,000" color="#fff3c4" />} />
        <Milo x={240} y={128} scale={0.78} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Gadget Works gave me stock options! I bought 1,000 shares at $10. They're worth $60!", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Milo", text: "Uh-oh. What do we owe?", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Ace smiles and holds a card reading regular tax: $0.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={84} y={128} scale={0.78} mood="excited" pose="up" />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-30} y={-24} w={60} h={34} lines={["REG: $0"]} size={11} color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Incentive stock options, Penny? No regular tax when you exercise, as long as you hold the shares.", x: 40, y: 2, w: 57, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot bursts out from between red stage curtains with arms wide. Penny and Milo gasp.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#2f2a4a" floor="#5a3b5c" />
        <Curtain x={180} y={30} w={130} h={170} />
        <Hoot x={245} y={130} scale={0.7} mood="smug" pose="up" />
        <Penny x={60} y={134} scale={0.66} mood="shocked" />
        <Milo x={124} y={136} scale={0.64} mood="shocked" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-hoo! But there's ANOTHER tax! The ALTERNATIVE MINIMUM TAX!", x: 30, y: 2, w: 60, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Ace points at two side-by-side lanes labeled regular and AMT, with pay the higher underneath.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={70} y={128} scale={0.74} mood="happy" pose="point" />
        <TwoLanes x={140} y={80} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "The AMT is a second calculation. Add back things like the option spread and state taxes, subtract a big exemption, tax at 26% or 28%.", x: 3, y: 2, w: 66, tail: "down-left" },
    ],
  },
  {
    alt: "Milo holds his head. Ace calmly holds a card reading only the excess.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="worried" pose="shrug" />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-30} y={-24} w={60} h={34} lines={["EXCESS"]} size={11} color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "So we pay BOTH taxes?", x: 3, y: 4, w: 34, tail: "down-left" },
      { who: "Ace", text: "No, Milo. You pay regular tax, plus AMT only if the minimum tax is higher. Just the difference.", x: 42, y: 2, w: 55, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu holds up a coupon labeled 8801. Penny brightens. Ace nods.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde2e4" />
        <Penny x={70} y={128} scale={0.74} mood="thinking" />
        <Lulu x={160} y={160} scale={0.52} mood="smug" pose="hold" holding={<Card x={-24} y={-16} w={48} h={28} lines={["8801"]} size={11} color="#d8f0e2" />} />
        <Ace x={260} y={128} scale={0.74} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Is the AMT on my options gone forever?", x: 3, y: 3, w: 38, tail: "down-left" },
      { who: "Lulu", text: "No! It turns into a minimum tax credit for later years. Like a coupon!", x: 44, y: 2, w: 53, tail: "down-left" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "A second tax system, run in parallel",
    alt: "Two lanes side by side: regular taxable income with regular rates, and alternative minimum taxable income minus an exemption at 26 and 28 percent. AMT is the excess.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={14} y={14} w={140} h={120} color="#d4ebfa">
          <Label x={84} y={38} size={12}>Regular</Label>
          <Label x={84} y={64} size={10} weight={700}>taxable income</Label>
          <Label x={84} y={86} size={10} weight={700}>× regular rates</Label>
          <Label x={84} y={112} size={11}>= regular tax</Label>
        </Card>
        <Card x={166} y={14} w={140} h={120} color="#fde2e4">
          <Label x={236} y={38} size={12}>AMT</Label>
          <Label x={236} y={60} size={10} weight={700}>AMTI – exemption</Label>
          <Label x={236} y={82} size={10} weight={700}>× 26% / 28%</Label>
          <Label x={236} y={112} size={11}>= tentative min.</Label>
        </Card>
        <Label x={160} y={160} size={11}>AMT = tentative minimum tax over regular tax</Label>
      </svg>
    ),
    body: [
      "The alternative minimum tax makes sure people with large deductions and tax preferences pay at least a minimum. Form 6251 starts from taxable income, adds back certain deductions and preferences to get alternative minimum taxable income (AMTI), subtracts an exemption, and applies AMT rates to get the tentative minimum tax.",
      "If the tentative minimum tax is more than the regular tax, the difference is the AMT, added to the regular tax.",
    ],
    keyPoint: "AMT (Form 6251): AMTI = taxable income + adjustments and preferences; minus exemption; × 26%/28% = tentative minimum tax. AMT = excess of tentative minimum tax over regular tax.",
  },
  {
    title: "What gets added back",
    alt: "A list of add-backs: standard deduction, state and local taxes, incentive stock option spread, private activity bond interest, depreciation differences.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={10} y={12} w={146} h={34} lines={["Standard deduction"]} size={10} color="#fff" />
        <Card x={164} y={12} w={146} h={34} lines={["State and local taxes"]} size={10} color="#fff" />
        <Card x={10} y={54} w={146} h={34} lines={["ISO bargain element"]} size={10} color="#fde2e4" />
        <Card x={164} y={54} w={146} h={34} lines={["Private activity bonds"]} size={10} color="#fff" />
        <Card x={10} y={96} w={146} h={34} lines={["Depreciation timing"]} size={10} color="#fff" />
        <Card x={164} y={96} w={146} h={34} lines={["Depletion, NOL changes"]} size={10} color="#fff" />
        <Label x={160} y={158} size={10} weight={700}>Still allowed: mortgage interest on the home, charity, medical</Label>
      </svg>
    ),
    body: [
      "Common adjustments and preferences: the standard deduction isn't allowed; state and local taxes aren't deductible; the bargain element of incentive stock options exercised and held is income; interest on specified private activity bonds is taxable; and depreciation, depletion and NOLs are refigured.",
      "Home mortgage interest on acquisition debt, charitable contributions and medical expenses (over 7.5% of AGI) are still allowed.",
    ],
    keyPoint: "AMT add-backs: standard deduction, SALT, ISO bargain element (exercise and hold), private activity bond interest, depreciation/depletion/NOL differences. Still allowed: acquisition mortgage interest, charity, medical > 7.5%.",
  },
  {
    title: "The 2025 exemption and rates",
    alt: "Exemption blocks: $88,100 single, $137,000 joint, $68,500 separate. A dimmer starts at $626,350 and $1,252,700. Rate steps: 26 percent then 28 percent above $239,100.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={70} w={86} h={96} color="#d4ebfa" label="$88,100" sub="single, HOH" />
        <Step x={106} y={30} w={86} h={136} color="#d8f0e2" label="$137,000" sub="joint" />
        <Step x={198} y={100} w={86} h={66} color="#fde2e4" label="$68,500" sub="separate" />
        <Label x={160} y={16} size={9} weight={700}>exemption shrinks 25¢ per $1 over $626,350 ($1,252,700 MFJ)</Label>
        <Label x={300} y={60} size={9} anchor="end" weight={700}>26% / 28%</Label>
        <Label x={300} y={74} size={8} anchor="end" weight={700}>over $239,100</Label>
      </svg>
    ),
    body: [
      "For 2025, the AMT exemption is $88,100 (single and head of household), $137,000 (married filing jointly and qualifying surviving spouse) and $68,500 (married filing separately). It's reduced by 25% of AMTI over $626,350 ($1,252,700 joint).",
      "The AMT rate is 26% on the first $239,100 of AMTI after the exemption ($119,550 MFS) and 28% above that. Qualified dividends and long-term capital gains keep their lower rates.",
    ],
    keyPoint: "2025 AMT exemption: $88,100 single/HOH, $137,000 MFJ, $68,500 MFS; phase-out 25% of AMTI over $626,350 ($1,252,700 MFJ). Rates 26% up to $239,100 ($119,550 MFS), 28% above; capital gain rates still apply.",
  },
  {
    title: "Incentive stock options and the AMT",
    alt: "A timeline: grant (no tax), exercise and hold (no regular tax, AMT adjustment for the spread), sale. A side path: sold the same year, ordinary income, no AMT adjustment.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde2e4" />
        <path d="M20,60 H300" stroke={INK} strokeWidth={3} />
        <Card x={10} y={24} w={80} h={30} lines={["Grant"]} size={11} color="#fff" />
        <Card x={110} y={24} w={100} h={30} lines={["Exercise, hold"]} size={11} color="#fff" />
        <Card x={230} y={24} w={80} h={30} lines={["Sell"]} size={11} color="#fff" />
        <Label x={50} y={82} size={10} weight={700}>no tax</Label>
        <Label x={160} y={80} size={10} weight={700}>regular: no tax</Label>
        <Label x={160} y={96} size={10} weight={700} color="#a8321f">AMT: + spread</Label>
        <Label x={270} y={82} size={10} weight={700}>gain</Label>
        <Card x={40} y={118} w={240} h={46} lines={["Sold in the same year: ordinary", "income on the W-2, no AMT add-back"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Exercising an incentive stock option isn't a regular tax event. But for the AMT, the spread (fair market value minus the exercise price) is added to AMTI in the year of exercise if the stock is still held at year end, and the stock gets a higher AMT basis.",
      "If the shares are sold in the same year as exercise (a disqualifying disposition), the spread is ordinary income for regular tax and there's no AMT adjustment. Holding at least 2 years from grant and 1 year from exercise makes the regular-tax gain long-term.",
    ],
    keyPoint: "ISO exercise and hold past year-end: no regular tax, but the spread (FMV − exercise price) is an AMT adjustment (and higher AMT basis). Same-year sale: ordinary income, no AMT adjustment. Qualifying sale: 2 yrs from grant, 1 yr from exercise.",
  },
  {
    title: "The minimum tax credit",
    alt: "AMT paid because of timing items like ISOs goes into a piggy bank labeled Form 8801, to be used in later years. AMT from SALT and the standard deduction doesn't.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d8f0e2" />
        <Card x={14} y={20} w={140} h={60} lines={["Timing items", "(ISOs, depreciation)"]} size={10} color="#fff" />
        <Arrow d="M156,50 H200" />
        <Card x={204} y={20} w={104} h={60} lines={["Credit later", "Form 8801"]} size={11} color="#fff3c4" />
        <Card x={14} y={100} w={140} h={60} lines={["Permanent items", "(SALT, std. ded.)"]} size={10} color="#fff" />
        <Arrow d="M156,130 H200" />
        <Card x={204} y={100} w={104} h={60} lines={["No credit"]} size={11} color="#fde2e4" />
      </svg>
    ),
    body: [
      "AMT caused by deferral (timing) items, such as the ISO spread or depreciation differences, creates a minimum tax credit that can reduce regular tax in later years when regular tax exceeds the tentative minimum tax. It's figured on Form 8801 and carries forward indefinitely.",
      "AMT caused by exclusion items, like state and local taxes or the standard deduction, never comes back as a credit.",
    ],
    keyPoint: "Minimum tax credit (Form 8801): AMT from deferral items (ISOs, depreciation) can offset regular tax in later years, carried forward indefinitely. AMT from exclusion items (SALT, standard deduction) creates no credit.",
  },
];

const lesson: Lesson = {
  id: "p1-amt",
  part: "part1",
  domainId: "p1d4",
  number: "4.1",
  episode: "The Other Tax",
  title: "Alternative minimum tax",
  minutes: 11,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "How the alternative minimum tax works, what gets added back, the 2025 exemption and rates, incentive stock options and the minimum tax credit.",
  previously: "Unit 3 is wrapped: deductions and credits are all claimed. Then Penny's employer, Gadget Works, gives her stock options.",
  comic,
  cards,
  hook: {
    line: "Two tax systems. You pay the higher one.",
    more: "Add back SALT, the standard deduction and the ISO spread; subtract the exemption; 26% then 28%. Timing items come back as a credit.",
    alt: "Two lanes labeled regular and AMT, with the AMT lane taller.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <TwoLanes x={20} y={-4} />
        <Label x={236} y={50} size={20}>26% · 28%</Label>
        <Label x={236} y={80} size={12} color="#4f5c6c">exemption $137,000 MFJ</Label>
        <Mark x={300} y={22} text="!" size={22} />
      </svg>
    ),
  },
  traps: [
    { title: "ISO exercise is taxable", text: "Not for regular tax (if held). It's an AMT adjustment in the year of exercise." },
    { title: "Paying both taxes in full", text: "AMT is only the excess of the tentative minimum tax over regular tax." },
    { title: "Every AMT dollar becomes a credit", text: "Only AMT from deferral items (like ISOs) creates the minimum tax credit. SALT and the standard deduction don't." },
    { title: "Mortgage interest is added back", text: "Interest on acquisition debt for the home is still deductible for the AMT." },
  ],
  sources: [
    { key: "i6251", section: "Adjustments and Preferences; Exemption; Line 7 rates" },
    { key: "p525", section: "Incentive Stock Options" },
  ],
  cases: [
    {
      who: "Penny",
      title: "Penny's option spread",
      facts: "In 2025 Penny exercised incentive stock options for 1,000 shares at $10 when the stock was worth $60. She still holds the shares at year end.",
      question: "What's the effect for 2025?",
      choices: ["$50,000 of wages for regular tax", "No regular tax income, but a $50,000 AMT adjustment", "A $50,000 capital gain", "Nothing at all until she sells"],
      answer: "No regular tax income, but a $50,000 AMT adjustment",
      why: "Exercising an ISO isn't a regular tax event, but the $50 spread on 1,000 shares is added to AMTI if the stock is held past year end.",
    },
    {
      who: "Milo",
      title: "Milo's coworker sells fast",
      facts: "Milo's friend exercised ISOs in March 2025 (spread $20,000) and sold the shares in June 2025 for exactly the March value.",
      question: "How is the $20,000 treated?",
      choices: ["AMT adjustment only", "Long-term capital gain", "Ordinary income for regular tax, with no AMT adjustment", "Not taxable"],
      answer: "Ordinary income for regular tax, with no AMT adjustment",
      why: "Selling in the same year as exercise is a disqualifying disposition: the spread is ordinary income, and no AMT adjustment applies because the stock wasn't held at year end.",
    },
    {
      who: "Ace",
      title: "The state tax add-back",
      facts: "Ace's client itemized and deducted $30,000 of state and local taxes for regular tax.",
      question: "How are those taxes treated for the AMT?",
      choices: ["Fully deductible", "Deductible up to $10,000", "Added back; not deductible", "Deductible only if over 7.5% of AGI"],
      answer: "Added back; not deductible",
      why: "State and local taxes aren't deductible in figuring AMTI, so the deduction is added back.",
    },
    {
      who: "Hoot",
      title: "Hoot does the math",
      facts: "A married couple filing jointly has 2025 AMTI of $200,000 (no capital gains) and regular tax of $15,000. AMTI is well under the phase-out.",
      question: "What's their AMT?",
      choices: ["$0", "$1,380", "$16,380", "$37,000"],
      answer: "$1,380",
      why: "AMTI $200,000 minus the $137,000 exemption is $63,000. Times 26% is $16,380 tentative minimum tax. Minus regular tax of $15,000 leaves $1,380 of AMT.",
    },
    {
      who: "Lulu",
      title: "Lulu's coupon",
      facts: "Penny paid AMT for 2025 entirely because of her ISO adjustment. In 2027, her regular tax is higher than her tentative minimum tax.",
      question: "What can she do with the 2025 AMT in 2027?",
      choices: ["Nothing; AMT is never recovered", "Claim a minimum tax credit on Form 8801", "Amend 2025 to remove it", "Deduct it as an itemized deduction"],
      answer: "Claim a minimum tax credit on Form 8801",
      why: "AMT from deferral items like the ISO spread creates a minimum tax credit that can reduce regular tax in later years, figured on Form 8801.",
    },
  ],
  quizTopics: [],
  quizBrief: "Alternative minimum tax for 2025: AMTI adjustments (SALT, standard deduction, ISO spread, private activity bonds), exemption amounts and phase-out, 26%/28% rates, minimum tax credit Form 8801",
};

export default lesson;

import { Ace, Backdrop, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import { Crate, Gerald, RollySuit } from "../bakery";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Step } from "../props";

// Part 2, topic 3.3: business retirement plans: SEP, SIMPLE IRA and 401(k) plans for 2025, contributions
// for the self-employed, setup deadlines, and the startup credits. Written to Publication 560 and the
// IRS COLA announcements for 2025.

const INK = "#2a2f3a";

/** A sun and a palm tree, for dreams of retirement. (x, y) is the bottom of the trunk. */
function Palm({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-4,0 Q-10,-50 6,-96 L14,-94 Q2,-50 8,0 Z" fill="#c58b4e" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M10,-96 Q-20,-120 -48,-96 Q-20,-108 10,-96 Z M10,-96 Q40,-124 66,-96 Q38,-108 10,-96 Z M10,-96 Q-10,-130 -26,-128 Q-6,-118 10,-96 Z M10,-96 Q30,-134 48,-126 Q26,-118 10,-96 Z" fill="#2fa36b" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <circle cx={2} cy={-92} r={5} fill="#7a4a20" stroke={INK} strokeWidth={1.5} />
      <circle cx={16} cy={-90} r={5} fill="#7a4a20" stroke={INK} strokeWidth={1.5} />
    </g>
  );
}

/** Tiny sunglasses to place over a face. (x, y) is the bridge. */
function Shades({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-17} y={-5} width={14} height={10} rx={4} fill={INK} />
      <rect x={3} y={-5} width={14} height={10} rx={4} fill={INK} />
      <path d="M-3,-1 h6" stroke={INK} strokeWidth={2} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Rosa daydreams beside a palm tree poster. Milo, in the Rolly mascot suit, wants in.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff3c4" />
        <Rosa x={66} y={128} scale={0.76} mood="happy" pose="up" />
        <Palm x={160} y={200} scale={0.8} />
        <Milo x={262} y={128} scale={0.74} mood="excited" flip pose="up" />
        <RollySuit x={262} y={128} scale={0.74} />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Someday Gerald and I will retire to Florida.", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Milo", text: "Rolly wants to retire too! He's been a roll for three whole months!", x: 56, y: 2, w: 41, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at a card about SEPs. Rosa looks over at Milo in the roll suit.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={90} w={108} h={66} lines={["SEP: employer only", "up to 25% of pay", "max $70,000"]} size={9.5} color="#fff" />
        <Rosa x={262} y={128} scale={0.76} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "A SEP is easy: the business puts in up to 25% of pay. But every eligible employee gets the same percentage.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Rosa", text: "Even... Rolly?", x: 66, y: 8, w: 28, tail: "down-right" },
    ],
  },
  {
    alt: "Penny points at a card about SIMPLE IRAs. Milo, in the suit, offers a cinnamon roll.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={92} w={104} h={64} lines={["SIMPLE IRA", "you: $16,500", "Rosa: match 3%"]} size={9.5} color="#fff" />
        <Milo x={262} y={128} scale={0.74} mood="smug" flip pose="hold" />
        <RollySuit x={262} y={128} scale={0.74} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "With a SIMPLE IRA, you can defer up to $16,500 of your pay, and Rosa matches up to 3%.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Milo", text: "I'd like to defer my cinnamon roll.", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of a crate labeled NEST EGG. Milo, in the suit, panics.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Hoot x={84} y={92} scale={0.52} mood="stern" pose="up" />
        <Crate x={84} y={206} scale={1.05} label="NEST EGG" />
        <Milo x={256} y={128} scale={0.74} mood="shocked" flip />
        <RollySuit x={256} y={128} scale={0.74} />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Pull money out of a SIMPLE in the first two years and the extra tax is 25%, not 10%.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Milo", text: "Who keeps a nest egg in a crate?!", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Ace shows a card with 401(k) limits. Rosa counts on her fingers, distressed.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f1fb" />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={84} w={110} h={76} lines={["401(k) $23,500", "50+: + $7,500", "60-63: + $11,250"]} size={9.5} color="#fff" />
        <Rosa x={262} y={128} scale={0.76} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "A 401(k) allows $23,500 for 2025, plus a $7,500 catch-up at 50, or $11,250 at ages 60 to 63.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Rosa", text: "I'm 64! I missed my super year by ONE year?!", x: 62, y: 4, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu, Gerald in tiny sunglasses, and Rosa pose by the palm tree.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff3c4" />
        <Lulu x={56} y={160} scale={0.56} mood="excited" pose="up" />
        <Palm x={120} y={200} scale={0.7} />
        <Gerald x={186} y={196} scale={1} mood="smug" />
        <Shades x={186} y={170} scale={0.8} />
        <Rosa x={268} y={128} scale={0.72} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "By the time you retire, Gerald will be 21. He'll qualify for the SEP!", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Rosa", text: "Lulu, sweetie, he's a jar.", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "SEP plans",
    alt: "A SEP is funded only by the employer: up to 25% of each eligible employee's compensation, capped at $70,000 for 2025. It must cover employees who are 21, worked 3 of the last 5 years and earned $750.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff3c4" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="25%" sub="of comp" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="$70,000" sub="2025 cap" />
        <Step x={214} y={14} w={96} h={100} color="#d4ebfa" label="21 · 3/5" sub="· $750" />
        <Label x={160} y={140} size={10} weight={700}>Same % for everyone eligible</Label>
        <Label x={160} y={158} size={10} weight={700}>Set up and fund by the return due date (+ ext.)</Label>
      </svg>
    ),
    body: [
      "A simplified employee pension (SEP) is funded only by employer contributions to each worker's SEP-IRA. For 2025, the employer can contribute up to the lesser of 25% of the employee's compensation (counting no more than $350,000 of pay) or $70,000. Contributions are discretionary year to year, but in any year the employer contributes, it must use the same percentage for all eligible employees.",
      "Eligible employees are those who are at least 21, worked for the employer in at least 3 of the last 5 years, and received at least $750 of compensation for 2025; an employer can use less restrictive rules. A SEP can be set up and funded as late as the employer's return due date, including extensions.",
    ],
    keyPoint: "SEP: employer-only contributions to SEP-IRAs; 2025 limit lesser of 25% of compensation (comp cap $350,000) or $70,000; same % for all eligible; discretionary each year. Eligibility max: age 21, 3 of last 5 years, $750 comp (2025). Set up and fund by return due date incl. extensions.",
  },
  {
    title: "SIMPLE IRA plans",
    alt: "Employers with 100 or fewer employees can offer a SIMPLE IRA. Employees defer up to $16,500 for 2025, plus a $3,500 catch-up at 50. The employer matches up to 3% or contributes 2% for everyone.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="$16,500" sub="deferral (2025)" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="+$3,500" sub="age 50+" />
        <Step x={214} y={14} w={96} h={100} color="#fff3c4" label="3% / 2%" sub="match / flat" />
        <Label x={160} y={140} size={10} weight={700}>100 or fewer employees · set up by October 1</Label>
        <Label x={160} y={158} size={10} weight={700}>Out in the first 2 years: 25% extra tax</Label>
      </svg>
    ),
    body: [
      "A SIMPLE IRA plan is for employers with 100 or fewer employees (who earned $5,000 or more) that don't maintain another plan. For 2025, employees can defer up to $16,500, plus a $3,500 catch-up at 50 or older ($5,250 at ages 60 to 63). The employer must either match deferrals dollar for dollar up to 3% of pay (it can drop to as low as 1% in 2 of 5 years) or make a 2% nonelective contribution for every eligible employee.",
      "A new SIMPLE IRA plan generally must be set up between January 1 and October 1 of the year. Withdrawals within 2 years of first participation are hit with a 25% additional tax instead of the usual 10% (if no exception applies).",
    ],
    keyPoint: "SIMPLE IRA: ≤ 100 employees, no other plan. 2025: deferral $16,500; catch-up $3,500 (50+), $5,250 (ages 60-63). Employer: 3% match (may drop to 1% in 2 of 5 years) or 2% nonelective for all eligible. Set up by October 1. Early withdrawal in first 2 years: 25% additional tax.",
  },
  {
    title: "401(k) limits",
    alt: "For 2025, employees can defer $23,500 to a 401(k), plus $7,500 at age 50, or $11,250 at ages 60 through 63. Total contributions are capped at $70,000.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f1fb" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="$23,500" sub="deferral" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="+$7,500" sub="age 50+" />
        <Step x={214} y={14} w={96} h={100} color="#fff3c4" label="+$11,250" sub="ages 60-63" />
        <Label x={160} y={146} size={10} weight={700}>Total with employer money: $70,000 (+ catch-up)</Label>
      </svg>
    ),
    body: [
      "A 401(k) lets employees defer salary, pre-tax or as Roth contributions. For 2025, the deferral limit is $23,500, plus a $7,500 catch-up for those 50 or older. Under SECURE 2.0, participants who reach age 60, 61, 62 or 63 during the year get a larger catch-up of $11,250 instead.",
      "Total contributions to a participant's account (deferrals plus employer contributions, not counting catch-ups) are limited to the lesser of 100% of compensation or $70,000 for 2025. A one-participant (solo) 401(k) lets a business owner contribute both as employee and as employer. Traditional 401(k) plans must pass nondiscrimination testing unless they use a safe harbor design.",
    ],
    table: {
      head: ["2025 limit", "401(k)", "SIMPLE IRA", "SEP"],
      rows: [
        ["Deferral", "$23,500", "$16,500", "None"],
        ["Catch-up 50+", "$7,500", "$3,500", "None"],
        ["Catch-up 60-63", "$11,250", "$5,250", "None"],
        ["Total cap", "$70,000", "Deferral + match", "$70,000"],
      ],
    },
    keyPoint: "401(k) 2025: deferral $23,500; catch-up $7,500 (50+); $11,250 at ages 60-63 (SECURE 2.0). §415(c) total (excluding catch-up): lesser of 100% of comp or $70,000. Solo 401(k): owner contributes as employee and employer. Nondiscrimination testing unless safe harbor.",
  },
  {
    title: "The self-employed owner",
    alt: "A sole proprietor or partner's SEP or employer contribution is figured on net earnings from self-employment after half of SE tax, which makes 25% work out to 20%.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={100} color="#fff" label="25%" sub="of employee pay" />
        <Step x={166} y={14} w={140} h={100} color="#d8f0e2" label="20%" sub="of owner's net SE" />
        <Label x={160} y={140} size={10} weight={700}>Net SE earnings − ½ SE tax, then × 20%</Label>
        <Label x={160} y={158} size={10} weight={700}>Owner deducts on Schedule 1, not Schedule C</Label>
      </svg>
    ),
    body: [
      "Sole proprietors and partners are treated as their own employers, but their compensation is net earnings from self-employment: net profit minus the deduction for half of self-employment tax, minus the contribution itself. Because of that circularity, a 25% plan rate works out to 20% of net SE earnings (after the half-SE-tax deduction).",
      "The owner's own contributions are deducted on Schedule 1 of Form 1040, not on Schedule C. Contributions for employees are a business expense on Schedule C. An S corporation owner's contributions are based on W-2 wages only, not on distributions.",
    ],
    keyPoint: "Self-employed contribution base: net SE earnings − ½ SE tax − the contribution itself → a 25% rate equals 20% of (net profit − ½ SE tax). Owner's own contributions on Schedule 1 (Form 1040); employees' on Schedule C. S corp owner: based on W-2 wages only.",
  },
  {
    title: "Startup credits",
    alt: "Small employers that start a plan can take a credit for startup costs for three years, plus a $500 credit for automatic enrollment, on Form 8881.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="$5,000" sub="max a year" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="3 yrs" sub="of credit" />
        <Step x={214} y={14} w={96} h={100} color="#fff3c4" label="+$500" sub="auto-enroll" />
        <Label x={160} y={146} size={10} weight={700}>100 or fewer employees · Form 8881</Label>
      </svg>
    ),
    body: [
      "An employer with 100 or fewer employees that starts a new SEP, SIMPLE IRA or qualified plan can claim a credit for its startup costs for the first 3 years: 50% of costs (100% for employers with 50 or fewer employees), up to the greater of $500 or the lesser of $250 per eligible non-highly compensated employee or $5,000.",
      "An extra $500 credit a year for 3 years is available for adding automatic enrollment. Employers with 50 or fewer employees can also get a credit for employer contributions in the first years of a new plan. These credits go on Form 8881 and are part of the general business credit.",
    ],
    keyPoint: "Form 8881 (≤ 100 employees, new plan): startup cost credit for 3 years, 50% of costs (100% if ≤ 50 employees), up to greater of $500 or lesser of $250 × eligible NHCEs or $5,000. Auto-enrollment credit $500/year for 3 years. Employer contribution credit for small employers. Part of the general business credit.",
  },
];

const lesson: Lesson = {
  id: "p2-retirement-plans",
  part: "part2",
  domainId: "p2d3",
  number: "3.3",
  episode: "Rolly Wants to Retire",
  title: "Business retirement plans",
  minutes: 14,
  lawAsOf: "tax year 2025",
  intro: "SEP, SIMPLE IRA and 401(k) plans with their 2025 limits, how a self-employed owner figures contributions, setup deadlines, and the startup credits.",
  previously: "The pantry's coffee cart is legally run by volunteers (Milo, mostly). Now Rolly the mascot has a question about his future.",
  comic,
  cards,
  hook: {
    line: "SEP 25%, SIMPLE $16,500, 401(k) $23,500.",
    more: "2025: SEP up to $70,000, same % for all; SIMPLE match 3% and set up by Oct 1, 25% tax in the first 2 years; 401(k) catch-up $7,500, $11,250 at 60-63. Self-employed: 20%.",
    alt: "A palm tree next to 25% and $70K.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff3c4" />
        <Palm x={66} y={116} scale={0.72} />
        <Mark x={180} y={74} text="25%" color="#1d7a49" size={32} />
        <Mark x={268} y={74} text="$70K" color="#a8321f" size={28} />
      </svg>
    ),
  },
  traps: [
    { title: "Employees fund a SEP", text: "Only the employer contributes to a SEP." },
    { title: "Skip the employees, fund only the owner", text: "SEP contributions must be the same percentage for all eligible employees." },
    { title: "Set up a SIMPLE any time", text: "A new SIMPLE IRA must generally be set up by October 1 of the year." },
    { title: "Self-employed take 25% of profit", text: "For the owner, 25% works out to 20% of net SE earnings after half of SE tax." },
  ],
  sources: [{ key: "p560", section: "Retirement plans for small business" }],
  cases: [
    {
      who: "Rosa",
      title: "Same for everyone",
      facts: "An S corporation contributes 10% of the owner's salary to a SEP. An eligible employee earns $40,000.",
      question: "What must it contribute for the employee?",
      choices: ["$0", "$4,000", "$2,000", "$10,000"],
      answer: "$4,000",
      why: "A SEP must use the same contribution percentage for every eligible employee: 10% × $40,000 = $4,000.",
    },
    {
      who: "Hoot",
      title: "Too soon",
      facts: "An employee withdraws money from a SIMPLE IRA 18 months after first participating. No exception applies.",
      question: "What additional tax applies?",
      choices: ["25%", "10%", "20%", "None"],
      answer: "25%",
      why: "Withdrawals within 2 years of first participating in a SIMPLE IRA face a 25% additional tax instead of 10%.",
    },
    {
      who: "Ace",
      title: "The super catch-up",
      facts: "An employee turns 61 in 2025 and wants to defer as much as possible into her employer's 401(k).",
      question: "What is her maximum 2025 deferral?",
      choices: ["$23,500", "$31,000", "$34,750", "$70,000"],
      answer: "$34,750",
      why: "Ages 60 to 63 get an $11,250 catch-up instead of $7,500: $23,500 + $11,250 = $34,750.",
    },
    {
      who: "Penny",
      title: "Starting in 2026",
      facts: "A small employer with no other plan wants to start a new SIMPLE IRA plan for 2026.",
      question: "By when must it set up the plan?",
      choices: ["January 1, 2026", "April 15, 2026", "December 31, 2026", "October 1, 2026"],
      answer: "October 1, 2026",
      why: "A new SIMPLE IRA plan generally must be set up between January 1 and October 1 of the year it starts.",
    },
  ],
  quizTopics: ["SEP plans", "SIMPLE IRA plans"],
  quizBrief: "Business retirement plans for 2025: SEP (25%, $70,000, eligibility), SIMPLE IRA ($16,500, catch-ups, 3% match, 25% early tax), 401(k) limits, self-employed 20% rule, startup credit",
};

export default lesson;

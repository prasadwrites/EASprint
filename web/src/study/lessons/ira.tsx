import { Ace, Arrow, Backdrop, Biscuit, Hoot, Hourglass, Label, Milo, Penny, Rosa, WaltPortrait } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, Envelope, Heart, HOOK, PANEL, Paper, Step } from "../props";

// Part 1, topic 2.3: retirement distributions and Social Security. Written to the rules for tax year 2025
// from Publications 590-B, 575 and 915.

const INK = "#17202c";

/** A piggy bank labeled with an account name. (x, y) is its center. */
function Piggy({ x, y, label, scale = 1, color = "#f7b6c2" }: { x: number; y: number; label: string; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={0} rx={34} ry={24} fill={color} stroke={INK} strokeWidth={2.5} />
      <circle cx={30} cy={-4} r={9} fill={color} stroke={INK} strokeWidth={2} />
      <circle cx={33} cy={-5} r={1.5} fill={INK} />
      <path d="M-12,-22 l6,-10 l6,10" fill={color} stroke={INK} strokeWidth={2} />
      <path d="M-20,20 v10 M14,20 v10" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <rect x={-8} y={-26} width={16} height={4} rx={2} fill={INK} />
      <Label x={-4} y={6} size={label.length > 5 ? 9 : 12}>
        {label}
      </Label>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Grandpa Walt's portrait speaks from the wall. Penny holds an envelope labeled IRA, beaming.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <WaltPortrait x={40} y={70} scale={1.05} mood="happy" />
        <Penny x={234} y={128} scale={0.78} mood="excited" flip pose="hold" holding={<Envelope x={0} y={-8} label="IRA" />} />
      </svg>
    ),
    bubbles: [
      { who: "Walt", text: "Penny, I left you my IRA. Don't spend it all on comic books.", x: 3, y: 2, w: 45, tail: "down-left" },
      { who: "Penny", text: "Grandpa! I'll roll it right into my own IRA!", x: 55, y: 3, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds a sign with a pipe running from Walt's IRA to an inherited IRA. Penny looks crestfallen.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={80} y={128} scale={0.78} mood="worried" pose="shrug" />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-34} y={-26} w={68} h={38} lines={["Inherited", "IRA"]} size={10} color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Wait, I can't make it mine?", x: 3, y: 4, w: 34, tail: "down-left" },
      { who: "Ace", text: "Only a spouse can, Penny. You get an inherited IRA, moved by direct transfer. No 60-day rollover.", x: 44, y: 2, w: 53, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot holds an hourglass labeled 10 years. A calendar shows 2035.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Hoot x={90} y={128} scale={0.74} mood="smug" pose="point" />
        <Hourglass x={190} y={128} scale={1.2} sand={0.7} />
        <Calendar x={262} y={110} month="DEC 31" day="2035" scale={1} />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-hoo! Empty it within 10 years, Penny Pocket. And Walt had started his RMDs, so take some every year too.", x: 3, y: 2, w: 66, tail: "down-left" },
    ],
  },
  {
    alt: "Milo holds a check for $8,000 and looks confused. Ace explains with a raised finger.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="shocked" pose="hold" holding={<Paper x={0} y={-8} label="$8,000" sub="401(k)" color="#d8f0e2" />} />
        <Ace x={240} y={128} scale={0.78} mood="thinking" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "I cashed out my old $10,000 401(k). Why is the check $8,000?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "20% mandatory withholding, Milo. And you're 34: a 10% extra tax unless you roll it over within 60 days.", x: 51, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa proudly hands a heart-shaped check to the animal shelter. Hoot, surprised, nods with approval.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.76} mood="excited" pose="up" />
        <Heart x={160} y={128} s={1.6} />
        <Biscuit x={160} y={176} scale={0.32} mood="excited" />
        <Hoot x={248} y={128} scale={0.7} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I'm 74! My IRA paid my RMD straight to the animal shelter!", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Hoot", text: "A qualified charitable distribution. Not income at all. Hoo... well done, Rosa Pocket.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds her Social Security letter. Ace shows a gauge from 0 to 85 percent.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.76} mood="thinking" pose="hold" holding={<Envelope x={0} y={-8} label="SSA-1099" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-30} y={-24} w={60} h={34} lines={["0 to 85%"]} size={11} color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "And my Social Security? Is that taxed too?", x: 3, y: 4, w: 40, tail: "down-left" },
      { who: "Ace", text: "Up to 85% of it, Rosa. Add half your benefits to your other income, then compare with $25,000.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Distributions are taxable, plus 10% if you're too young",
    alt: "A piggy bank labeled 401(k) pours coins. A gate at age 59 and a half: younger takers pay a 10 percent toll unless an exception applies.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Piggy x={60} y={70} label="IRA" scale={1.1} />
        <Arrow d="M104,70 H146" />
        <rect x={150} y={20} width={14} height={110} fill="#9aa4b2" stroke={INK} strokeWidth={2} />
        <Label x={157} y={148} size={12}>59½</Label>
        <Card x={176} y={22} w={132} h={46} lines={["Under 59½:", "income + 10%"]} size={12} color="#fde2e4" />
        <Card x={176} y={80} w={132} h={46} lines={["59½ and up:", "income only"]} size={12} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "Distributions from traditional IRAs and employer plans are taxable as ordinary income, except for any after-tax basis (tracked on Form 8606 for IRAs).",
      "Before age 59½, a 10% additional tax applies unless an exception fits: death, disability, substantially equal periodic payments, medical costs over 7.5% of AGI, up to $5,000 for a birth or adoption, a $1,000 emergency distribution, or for IRAs only a first home (up to $10,000 lifetime), higher education or health insurance while unemployed. Leaving an employer in or after the year of turning 55 is an exception for plans, not IRAs.",
    ],
    keyPoint: "Traditional IRA/plan distributions = ordinary income (less basis). Under 59½: +10% unless an exception (death, disability, SEPP, medical > 7.5% AGI, birth/adoption $5K; IRA-only: first home $10K, education; plan-only: separation at 55+).",
  },
  {
    title: "Rollovers: 60 days, 20% withheld, once a year",
    alt: "Two paths from a 401(k). A direct pipe to an IRA with no withholding, and a check path with 20 percent withheld and a 60-day timer.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Piggy x={52} y={90} label="401k" />
        <Arrow d="M90,70 L200,36" color="#1d7a49" width={4} />
        <Label x={150} y={20} size={11} color="#1d7a49">direct: no withholding</Label>
        <Arrow d="M90,110 L200,140" color="#a8321f" width={4} />
        <Label x={130} y={148} size={11} color="#a8321f">check: 20% withheld</Label>
        <Piggy x={256} y={44} label="IRA" color="#d8f0e2" scale={0.9} />
        <Hourglass x={256} y={140} scale={0.9} sand={0.4} />
        <Label x={290} y={176} size={10} weight={700}>60 days</Label>
      </svg>
    ),
    body: [
      "Money paid to the owner can be rolled into another plan or IRA within 60 days and stays untaxed. Eligible plan distributions paid to the participant have 20% income tax withheld, so to roll over the full amount the owner must make up the 20% from other money.",
      "A direct (trustee-to-trustee) rollover has no withholding. Only one IRA-to-IRA 60-day rollover is allowed in any 12-month period across all of a person's IRAs; direct transfers and plan-to-IRA rollovers don't count toward that limit.",
    ],
    keyPoint: "60-day rollover keeps it tax-free. Plan checks paid to the participant: 20% mandatory withholding (make it up to roll the full amount). Direct rollovers: no withholding. One IRA-to-IRA 60-day rollover per 12 months.",
  },
  {
    title: "Required minimum distributions start at 73",
    alt: "A birthday cake with 73 candles and a calendar: first RMD by April 1 of the next year, then December 31 every year.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <rect x={30} y={90} width={100} height={50} rx={6} fill="#f7b6c2" stroke={INK} strokeWidth={2.5} />
        <path d="M40,90 v-14 M60,90 v-14 M80,90 v-14 M100,90 v-14 M120,90 v-14" stroke="#e8505b" strokeWidth={4} />
        <Label x={80} y={122} size={20}>73</Label>
        <Calendar x={196} y={60} month="APR" day="1" scale={0.9} />
        <Calendar x={270} y={60} month="DEC" day="31" scale={0.9} />
        <Label x={196} y={118} size={10} weight={700}>first one</Label>
        <Label x={270} y={118} size={10} weight={700}>then yearly</Label>
        <Label x={200} y={156} size={10} weight={700}>Miss it: 25% excise (10% if fixed)</Label>
      </svg>
    ),
    body: [
      "Owners of traditional IRAs and most employer plans must take required minimum distributions starting the year they reach 73. The first RMD can wait until April 1 of the next year; later ones are due by December 31. Waiting means two RMDs in one year.",
      "Roth IRAs have no RMDs for the owner. A worker still employed can usually delay plan RMDs (not IRA RMDs) until retiring, unless they own more than 5% of the business. Missing an RMD triggers a 25% excise tax on the shortfall, cut to 10% if corrected in time.",
    ],
    keyPoint: "RMDs from age 73: first by April 1 of the following year, then by Dec 31. No owner RMDs for Roth IRAs. Shortfall excise tax 25% (10% if timely corrected).",
  },
  {
    title: "Qualified charitable distributions",
    alt: "Rosa's IRA pipe runs straight to a charity heart, skipping her wallet. Labels: age 70 and a half, counts toward the RMD.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#f3e1ef" floorY={160} />
        <Piggy x={56} y={70} label="IRA" />
        <path d="M94,70 H220" stroke="#1d7a49" strokeWidth={8} />
        <Heart x={250} y={66} s={2.2} />
        <Rosa x={150} y={126} scale={0.34} mood="excited" />
        <Label x={160} y={30} size={11}>Age 70½+, up to $108,000 for 2025</Label>
        <Label x={250} y={124} size={10} weight={700}>counts toward RMD</Label>
      </svg>
    ),
    body: [
      "An IRA owner age 70½ or older can have the IRA trustee pay up to $108,000 (2025) directly to a qualified charity. The amount is excluded from income and counts toward the year's RMD.",
      "Because it never hits AGI, a QCD can help even someone who takes the standard deduction. No charitable deduction is allowed for the same money.",
    ],
    keyPoint: "QCD: age 70½+, IRA trustee pays charity directly, up to $108,000 (2025); excluded from income, counts toward the RMD, no double charitable deduction.",
  },
  {
    title: "Inherited IRAs: who gets what",
    alt: "Three doors: spouse can treat as own; eligible beneficiaries can stretch; everyone else must empty within 10 years.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <Step x={10} y={40} w={96} h={120} color="#fde2e4" label="Spouse" sub="treat as own" />
        <Step x={112} y={40} w={96} h={120} color="#fff3c4" label="Eligible" sub="can stretch" />
        <Step x={214} y={40} w={96} h={120} color="#d4ebfa" label="Others" sub="10-year rule" />
        <Label x={160} y={26} size={11}>No 10% additional tax on death payouts</Label>
      </svg>
    ),
    body: [
      "A surviving spouse can treat an inherited IRA as their own or roll it over. Other beneficiaries can't roll it over or combine it with their own IRAs; they move it to an inherited IRA by direct transfer.",
      "Eligible designated beneficiaries (minor child of the owner, disabled or chronically ill people, and those not more than 10 years younger than the owner) can take distributions over their life expectancy. Other designated beneficiaries must empty the account by the end of the 10th year after death, and if the owner had already started RMDs, they also take annual RMDs in years 1 to 9. Distributions to beneficiaries are never subject to the 10% additional tax.",
    ],
    keyPoint: "Spouse: treat as own. Non-spouse: inherited IRA by direct transfer, no 60-day rollover. Eligible designated beneficiaries can stretch; others empty within 10 years (plus annual RMDs if the owner had begun RMDs). No 10% tax on death distributions.",
  },
  {
    title: "Roth IRAs: tax-free when qualified",
    alt: "A Roth piggy bank with two locks: five years and age 59 and a half (or death, disability, first home). Contributions come out first.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d8f0e2" />
        <Piggy x={70} y={84} label="Roth" color="#9fd8a8" scale={1.3} />
        <Card x={150} y={22} w={158} h={40} lines={["5 years since first", "Roth contribution"]} size={10} color="#fff" />
        <Card x={150} y={72} w={158} h={40} lines={["and 59½, death,", "disability or 1st home"]} size={10} color="#fff" />
        <Label x={229} y={140} size={11}>Contributions come out first,</Label>
        <Label x={229} y={158} size={11}>always tax-free</Label>
      </svg>
    ),
    body: [
      "A qualified Roth IRA distribution is tax-free: it comes at least five years after January 1 of the first year a Roth contribution was made, and after age 59½, death, disability, or for a first home (up to $10,000).",
      "Non-qualified distributions come out in order: regular contributions first (always tax- and penalty-free), then conversions, then earnings, which are taxable and may face the 10% additional tax.",
    ],
    keyPoint: "Qualified Roth distribution (5-year rule + 59½/death/disability/first home) = tax-free. Ordering: contributions first (tax-free), then conversions, then earnings.",
  },
  {
    title: "Social Security: up to 85% taxable",
    alt: "A stack: other income plus tax-exempt interest plus half of benefits equals provisional income, measured against $25,000 and $34,000 lines.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <rect x={30} y={96} width={70} height={60} fill="#d4ebfa" stroke={INK} strokeWidth={2} />
        <rect x={30} y={76} width={70} height={20} fill="#fff3c4" stroke={INK} strokeWidth={2} />
        <rect x={30} y={40} width={70} height={36} fill="#9fd8a8" stroke={INK} strokeWidth={2} />
        <Label x={65} y={130} size={9}>Other income</Label>
        <Label x={65} y={90} size={8}>Tax-exempt int.</Label>
        <Label x={65} y={62} size={9}>½ benefits</Label>
        <path d="M110,70 H170 M110,46 H170" stroke="#a8321f" strokeWidth={2} strokeDasharray="5 3" />
        <Label x={174} y={50} size={10} anchor="start">$34K / $44K: up to 85%</Label>
        <Label x={174} y={74} size={10} anchor="start">$25K / $32K: up to 50%</Label>
        <Label x={174} y={120} size={11} anchor="start">single / joint</Label>
        <Label x={174} y={138} size={11} anchor="start">MFS living together:</Label>
        <Label x={174} y={156} size={11} anchor="start">up to 85% from $0</Label>
      </svg>
    ),
    body: [
      "Provisional income is modified AGI (including tax-exempt interest) plus half of Social Security benefits. Above $25,000 (single, HOH) or $32,000 (joint), up to 50% of benefits are taxable; above $34,000 or $44,000, up to 85%. Married filing separately and living together at any time in the year: up to 85% from the first dollar.",
      "In the 50% range, the taxable part is the lesser of half the benefits or half the provisional income over the base amount. No more than 85% of benefits is ever taxable.",
    ],
    keyPoint: "Provisional income = MAGI + tax-exempt interest + ½ benefits. Base $25K single/$32K MFJ (up to 50%), $34K/$44K (up to 85%). MFS living together: up to 85% from $0. Never more than 85%.",
  },
];

const lesson: Lesson = {
  id: "p1-retirement",
  part: "part1",
  domainId: "p1d2",
  number: "2.3",
  episode: "Grandpa's IRA",
  title: "Retirement and Social Security",
  minutes: 14,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "IRA and plan payouts, the 10% early tax, rollovers, RMDs, inherited IRAs, Roth rules and how much Social Security is taxed.",
  previously: "Milo's condo is now a rental and Penny owns a slice of Rosa's Rolls. Then the lawyer's letter about Grandpa Walt's IRA arrives.",
  comic,
  cards,
  hook: {
    line: "Fifty-nine and a half to skip the toll, seventy-three to start the clock.",
    more: "Sixty days for a rollover, ten years for an inherited IRA, and never more than 85% of Social Security.",
    alt: "A road sign with the numbers 59½, 60, 73 and 85.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Card x={14} y={30} w={66} h={56} lines={["59½"]} size={22} color="#fde2e4" />
        <Card x={90} y={30} w={66} h={56} lines={["60"]} size={22} color="#d4ebfa" />
        <Card x={166} y={30} w={66} h={56} lines={["73"]} size={22} color="#fff3c4" />
        <Card x={242} y={30} w={66} h={56} lines={["85%"]} size={22} color="#d8f0e2" />
        <Label x={160} y={108} size={11}>toll · rollover days · RMD age · Social Security max</Label>
      </svg>
    ),
  },
  traps: [
    { title: "Inheriting means rolling over", text: "Only a spouse can treat an inherited IRA as their own. Everyone else uses an inherited IRA, by direct transfer." },
    { title: "Rolling over the check amount", text: "A $10,000 plan payout arrives as $8,000. Roll over only $8,000 and the other $2,000 is taxable (and maybe hit by the 10%)." },
    { title: "Early tax on beneficiaries", text: "Distributions because of the owner's death are never subject to the 10% additional tax." },
    { title: "85% of everything", text: "At most 85% of benefits is taxable, and only for higher provisional income." },
  ],
  sources: [
    { key: "p590b", section: "Distributions; Additional Tax on Early Distributions; Required Minimum Distributions; Qualified charitable distributions" },
    { key: "p575", section: "Rollovers; Mandatory withholding" },
    { key: "p915", section: "Are Any of Your Benefits Taxable?" },
  ],
  cases: [
    {
      who: "Milo",
      title: "Milo cashes out",
      facts: "Milo, 34, took his old $10,000 401(k) balance in cash in 2025. The plan withheld $2,000 and he spent the $8,000. No exception applies.",
      question: "What does Milo owe because of the distribution?",
      choices: ["Tax on $8,000 only", "Tax on $10,000 plus a $1,000 additional tax", "Tax on $10,000 with no additional tax", "Nothing, the $2,000 withheld covers it"],
      answer: "Tax on $10,000 plus a $1,000 additional tax",
      why: "The whole $10,000 is income, and before 59½ a 10% additional tax applies. The $2,000 withheld is a payment toward the tax, not a reduction of income.",
    },
    {
      who: "Penny",
      title: "Penny's inherited IRA",
      facts: "Penny, 38, inherited Grandpa Walt's IRA. Walt was 80 and taking RMDs. Penny took $5,000 from the inherited IRA in 2025.",
      question: "How is the $5,000 taxed?",
      choices: ["Tax-free, it's an inheritance", "Ordinary income plus the 10% additional tax", "Ordinary income, no additional tax", "Capital gain"],
      answer: "Ordinary income, no additional tax",
      why: "Inherited traditional IRA distributions are taxable income to the beneficiary, but distributions made because of the owner's death are exempt from the 10% additional tax.",
    },
    {
      who: "Penny",
      title: "The 10-year clock",
      facts: "Walt died in 2025. Penny, his granddaughter, is 38 and not disabled or chronically ill.",
      question: "By when must Penny empty the inherited IRA?",
      choices: ["December 31, 2030", "December 31, 2035", "Over her life expectancy", "Never, as long as she takes RMDs"],
      answer: "December 31, 2035",
      why: "A designated beneficiary who isn't an eligible designated beneficiary must empty the account by the end of the 10th year after the year of death: 2035.",
    },
    {
      who: "Rosa",
      title: "Rosa's Social Security",
      facts: "Rosa is single. In 2025 she got $16,000 of Social Security and had $20,000 of other income and no tax-exempt interest.",
      question: "How much of her Social Security is taxable?",
      choices: ["$0", "$1,500", "$8,000", "$13,600"],
      answer: "$1,500",
      why: "Provisional income is $20,000 plus $8,000 (half of benefits) = $28,000, which is $3,000 over $25,000 and under $34,000. Taxable: the lesser of half the excess ($1,500) or half the benefits ($8,000).",
    },
    {
      who: "Rosa",
      title: "Rosa's charitable RMD",
      facts: "Rosa, 74, had her IRA trustee send her $6,000 RMD directly to the Ledger Falls animal shelter. She takes the standard deduction.",
      question: "How is the $6,000 treated?",
      choices: ["Income, with no deduction since she doesn't itemize", "Excluded from income and counted toward her RMD", "Income, plus a $6,000 charitable deduction", "A taxable gift"],
      answer: "Excluded from income and counted toward her RMD",
      why: "A qualified charitable distribution from someone 70½ or older is excluded from income (up to $108,000 for 2025) and satisfies the RMD.",
    },
    {
      who: "Ace",
      title: "Ace's two rollovers",
      facts: "In March 2025, Ace's client took a check from IRA A and redeposited it in IRA B within 60 days. In August 2025 she wants to do the same from IRA C to IRA D.",
      question: "What's the best way to move IRA C in August?",
      choices: ["Another 60-day rollover", "A direct trustee-to-trustee transfer", "Withdraw it and pay the 10%", "Wait until January 2026"],
      answer: "A direct trustee-to-trustee transfer",
      why: "Only one IRA-to-IRA 60-day rollover is allowed in any 12-month period, but direct transfers between trustees aren't limited.",
    },
  ],
  quizTopics: ["Early IRA distributions", "Social Security benefits"],
  quizBrief: "Retirement income: IRA and plan distributions, 10% early tax and exceptions, 60-day rollovers and 20% withholding, RMDs at 73, QCDs, inherited IRAs, Roth rules, taxable Social Security",
};

export default lesson;

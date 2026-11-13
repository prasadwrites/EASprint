import { Ace, Arrow, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Board, Card, CARD, Heart, HOOK, PANEL, Paper, Stamp, Step } from "../props";

// Part 1, topic 2.7: adjustments to income. Written to the rules for tax year 2025 from Publications 17,
// 969, 970, 504 and 560 and Publication 590-A.

const INK = "#17202c";

/** A bright line across a panel, the "line" in "above the line". */
function TheLine({ y, w = 320, label = "AGI" }: { y: number; w?: number; label?: string }) {
  return (
    <g>
      <path d={`M0,${y} H${w}`} stroke="#e8505b" strokeWidth={4} strokeDasharray="10 6" />
      <rect x={w - 52} y={y - 12} width={46} height={24} rx={6} fill="#e8505b" stroke={INK} strokeWidth={2} />
      <Label x={w - 29} y={y + 5} size={12} color="#fff">
        {label}
      </Label>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "A chalkboard reads income minus adjustments equals AGI. Penny reaches up, puzzled, and Ace points at the board.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={62} y={128} scale={0.74} mood="thinking" pose="up" />
        <Board x={112} y={104} w={104} h={70} lines={["Income", "– adjustments", "= AGI"]} size={11} />
        <Ace x={262} y={128} scale={0.74} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace, what's so great about being above the line?", x: 3, y: 3, w: 42, tail: "down-left" },
      { who: "Ace", text: "These deductions lower AGI, Penny, and you get them even with the standard deduction.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Milo shows Ace an insurance card reading deductible $3,300. Ace holds a sign reading HSA $8,550.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="HDHP" sub="$3,300 ded." />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-30} y={-24} w={60} h={34} lines={["HSA", "$8,550"]} size={10} color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Our family plan has a $3,300 deductible. HSA time?", x: 3, y: 3, w: 42, tail: "down-left" },
      { who: "Ace", text: "Yes, Milo! It's a high-deductible plan. Family limit for 2025: $8,550.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa waves her Medicare card. Hoot shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.76} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="MEDICARE" color="#d4ebfa" />} />
        <Hoot x={244} y={128} scale={0.72} mood="stern" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I want an HSA too! Plus the extra $1,000 for over-55s!", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! Once you're on Medicare, no more HSA contributions, Rosa Pocket.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a 1098-E student loan form showing $3,000 of interest. Ace holds up a $2,500 sign.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="1098-E" sub="$3,000" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-30} y={-22} w={60} h={30} lines={["$2,500"]} size={12} color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I paid $3,000 of student loan interest!", x: 3, y: 4, w: 40, tail: "down-left" },
      { who: "Ace", text: "You can deduct up to $2,500, Penny, if your income's under the limit. Never on a separate return.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu holds up a box of crayons for her teacher, Ms. Wren. Ace smiles and nods.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde2e4" />
        <Lulu x={84} y={160} scale={0.56} mood="excited" pose="hold" holding={<Card x={-28} y={-14} w={56} h={26} lines={["CRAYONS"]} size={9} color="#f6d33c" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "Ms. Wren buys crayons for our whole class with her own money!", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Then she can deduct up to $300 of classroom supplies, Lulu. Teachers get that above the line.", x: 51, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Milo, with Biscuit, holds a list: half of SE tax, health insurance, SEP. Hoot points at the health insurance line.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={70} y={128} scale={0.76} mood="smug" pose="point" />
        <Biscuit x={140} y={182} scale={0.3} mood="happy" />
        <Hoot x={250} y={128} scale={0.72} mood="smug" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "And I'm self-employed! I deduct my own health insurance!", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Hoot", text: "Not for months you could join Penny's employer plan, Milo Marsh. Hoo-hoo!", x: 51, y: 3, w: 46, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Above the line: before AGI",
    alt: "A tall ladder: gross income at top, adjustments removed, AGI at the red line, then standard or itemized deductions below it.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={20} y={10} w={180} h={30} lines={["Gross income"]} size={12} color="#d4ebfa" />
        <Card x={20} y={48} w={180} h={30} lines={["– Adjustments (Sch. 1)"]} size={12} color="#d8f0e2" />
        <TheLine y={94} w={320} />
        <Card x={20} y={110} w={180} h={30} lines={["– Standard or itemized"]} size={12} color="#fff3c4" />
        <Card x={20} y={146} w={180} h={28} lines={["= Taxable income"]} size={12} color="#fff" />
        <Label x={262} y={60} size={10} weight={700}>everyone gets these</Label>
      </svg>
    ),
    body: [
      "Adjustments to income are subtracted from gross income on Schedule 1 to reach adjusted gross income. They're available whether the taxpayer itemizes or takes the standard deduction.",
      "A lower AGI also helps with everything figured from AGI, such as the medical expense floor and many credit phase-outs. Common adjustments: educator expenses, HSA contributions, half of self-employment tax, self-employed retirement and health insurance, the early withdrawal penalty on savings, alimony under older agreements, IRA contributions and student loan interest.",
    ],
    keyPoint: "Adjustments (Schedule 1) reduce gross income to AGI and are allowed with the standard deduction. Lower AGI also helps AGI-based limits and phase-outs.",
  },
  {
    title: "HSAs: who can contribute and how much",
    alt: "A health savings jar with 2025 limits: $4,300 self-only, $8,550 family, plus $1,000 at 55. A gate requires a high-deductible plan.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={58} w={92} h={100} color="#d4ebfa" label="$4,300" sub="self-only" />
        <Step x={114} y={38} w={92} h={120} color="#d8f0e2" label="$8,550" sub="family" />
        <Step x={214} y={98} w={92} h={60} color="#fff3c4" label="+$1,000" sub="age 55+" />
        <Label x={160} y={24} size={10} weight={700}>HDHP deductible at least $1,650 / $3,300</Label>
        <Heart x={260} y={70} s={1.2} />
      </svg>
    ),
    body: [
      "An eligible individual is covered by a high-deductible health plan (2025 minimum deductible $1,650 self-only or $3,300 family), has no other disqualifying coverage, isn't enrolled in Medicare and can't be claimed as a dependent.",
      "2025 limits: $4,300 self-only and $8,550 family, plus $1,000 for those 55 or older. Employer contributions count toward the limit and are excluded from wages; the taxpayer's own contributions are an above-the-line deduction, made by April 15, 2026, and reported on Form 8889.",
    ],
    keyPoint: "HSA eligibility: HDHP (min deductible $1,650/$3,300 for 2025), no other coverage, not on Medicare, not a dependent. Limits $4,300 / $8,550, +$1,000 at 55+. Deadline April 15. Form 8889.",
  },
  {
    title: "HSA money out: tax-free for medical, 20% if not",
    alt: "Two pipes from an HSA. Qualified medical expenses come out tax-free; anything else is income plus 20 percent, unless age 65, disabled or deceased.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Card x={20} y={60} w={80} h={60} lines={["HSA"]} size={16} color="#d8f0e2" />
        <Arrow d="M104,76 L170,40" />
        <Arrow d="M104,104 L170,140" />
        <Card x={172} y={18} w={136} h={44} lines={["Medical: tax-free"]} size={11} color="#d8f0e2" />
        <Card x={172} y={118} w={136} h={44} lines={["Other: income + 20%", "(none after 65)"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Distributions used for qualified medical expenses of the account holder, spouse or dependents are tax-free, whenever the expenses were incurred after the HSA was set up.",
      "Other distributions are income and face a 20% additional tax, unless the account holder is 65 or older, disabled, or has died. The balance rolls over every year; there's no use-it-or-lose-it rule.",
    ],
    keyPoint: "HSA distributions for qualified medical expenses: tax-free. Non-medical: income + 20% (no 20% after 65, disability or death). Balances carry over.",
  },
  {
    title: "Self-employed adjustments",
    alt: "Milo with three boxes: half of SE tax, self-employed health insurance, and retirement plans like a SEP.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef0d8" floorY={160} />
        <Milo x={50} y={118} scale={0.4} mood="happy" />
        <Card x={104} y={14} w={204} h={40} lines={["Half of SE tax"]} size={12} color="#d8f0e2" />
        <Card x={104} y={62} w={204} h={44} lines={["Health insurance, if not", "eligible for an employer plan"]} size={10} color="#d4ebfa" />
        <Card x={104} y={114} w={204} h={44} lines={["SEP, SIMPLE or", "solo 401(k) contributions"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Self-employed people deduct half of their self-employment tax. They can also deduct health, dental and qualified long-term care premiums for themselves, their spouse and dependents, but not for any month they were eligible for a subsidized employer plan (their own or their spouse's employer), and not more than the business's net profit.",
      "Contributions to their own SEP, SIMPLE or qualified plan are deductible too. For 2025, a SEP allows up to 25% of compensation (about 20% of net self-employment earnings for the owner), capped at $70,000. A solo 401(k) adds elective deferrals up to $23,500, plus $7,500 at 50 or older ($11,250 at ages 60 to 63).",
    ],
    keyPoint: "Self-employed: deduct ½ SE tax; SE health insurance (not for months eligible for an employer plan, limited to net profit); SEP up to 25% of comp (≈20% of net SE earnings), max $70,000 for 2025; 401(k) deferral $23,500.",
  },
  {
    title: "IRA contributions",
    alt: "An IRA jar with $7,000 and an extra $1,000 at 50. A calendar says April 15. A spouse jar with no job is allowed too.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Step x={20} y={50} w={100} h={110} color="#fff" label="$7,000" sub="2025 limit" />
        <Step x={124} y={100} w={70} h={60} color="#fff3c4" label="+$1,000" sub="50+" />
        <Card x={206} y={30} w={102} h={50} lines={["by April 15", "next year"]} size={11} color="#fff" />
        <Card x={206} y={94} w={102} h={60} lines={["Spousal IRA:", "joint earned", "income"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "For 2025, traditional and Roth IRA contributions combined are limited to $7,000 ($8,000 at 50 or older), but not more than taxable compensation. A spouse with little or no pay can contribute based on the couple's joint compensation if they file jointly.",
      "Traditional IRA contributions are deductible, though the deduction phases out at certain incomes for those covered by a workplace plan. Contributions for 2025 can be made until April 15, 2026.",
    ],
    keyPoint: "2025 IRA limit: $7,000 (+$1,000 at 50+), up to taxable compensation; spousal IRA on a joint return. Deduction may phase out with a workplace plan. Contribute by April 15.",
  },
  {
    title: "Student loan interest: up to $2,500",
    alt: "A graduation cap on a stack of loan papers with a $2,500 tag, and a dimmer that fades out between $170,000 and $200,000 for joint filers.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M40,60 L90,40 L140,60 L90,80 Z" fill={INK} />
        <rect x={60} y={66} width={60} height={14} fill={INK} />
        <Paper x={90} y={120} label="1098-E" scale={1.2} />
        <Card x={170} y={22} w={136} h={36} lines={["Up to $2,500"]} size={13} color="#d8f0e2" />
        <Card x={170} y={66} w={136} h={44} lines={["Phase-out MAGI", "$85K–$100K single"]} size={10} color="#fff3c4" />
        <Card x={170} y={118} w={136} h={44} lines={["$170K–$200K joint", "MFS: not allowed"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Interest paid on a qualified student loan is deductible up to $2,500 a year. The taxpayer must be legally obligated on the loan, can't file married filing separately, and can't be claimed as someone else's dependent.",
      "For 2025 the deduction phases out for modified AGI between $85,000 and $100,000 ($170,000 and $200,000 on a joint return).",
    ],
    keyPoint: "Student loan interest: up to $2,500; must be legally obligated; not MFS; not a dependent. 2025 phase-out $85K–$100K MAGI ($170K–$200K MFJ).",
  },
  {
    title: "Educators, alimony and the early withdrawal penalty",
    alt: "Three small cards: a teacher's apple with $300, a wedding ring split before and after 2019, and a savings certificate with a penalty tag.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Card x={10} y={20} w={96} h={140} color="#fde2e4">
          <circle cx={58} cy={66} r={18} fill="#e8505b" stroke={INK} strokeWidth={2} />
          <Label x={58} y={110} size={14}>$300</Label>
          <Label x={58} y={130} size={9} weight={700}>K-12 educator</Label>
        </Card>
        <Card x={112} y={20} w={96} h={140} color="#fff3c4">
          <Label x={160} y={50} size={11}>Alimony</Label>
          <Label x={160} y={80} size={9} weight={700}>Before 2019:</Label>
          <Label x={160} y={94} size={9} weight={700}>payer deducts</Label>
          <Label x={160} y={118} size={9} weight={700}>After 2018:</Label>
          <Label x={160} y={132} size={9} weight={700}>no deduction</Label>
        </Card>
        <Card x={214} y={20} w={96} h={140} color="#d8f0e2">
          <Label x={262} y={56} size={11}>CD broken</Label>
          <Label x={262} y={90} size={9} weight={700}>penalty is an</Label>
          <Label x={262} y={104} size={9} weight={700}>adjustment</Label>
          <Stamp x={262} y={134} text="1099-INT" color="#3f7cc4" size={9} />
        </Card>
      </svg>
    ),
    body: [
      "Eligible educators (K-12 teachers, counselors, principals and aides with at least 900 hours in a school year) can deduct up to $300 of unreimbursed classroom expenses; up to $600 on a joint return if both are educators, but no more than $300 each.",
      "Alimony is deductible by the payer (and income to the recipient) only under a divorce or separation agreement executed before 2019 and not modified to adopt the new rule. Child support never is. A penalty for withdrawing a certificate of deposit early is also an adjustment.",
    ],
    keyPoint: "Educator expenses: $300 each (900-hour K-12 educators). Alimony: deductible/taxable only for agreements before 2019; child support never. Early withdrawal penalty on savings: adjustment.",
  },
];

const lesson: Lesson = {
  id: "p1-adjustments",
  part: "part1",
  domainId: "p1d2",
  number: "2.7",
  episode: "Above the Line",
  title: "Adjustments to income",
  minutes: 13,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "The deductions everyone gets, itemizing or not: HSAs, self-employed deductions, IRAs, student loan interest, educator expenses and alimony.",
  previously: "Milo learned vans aren't like-kind and Lulu sold Penny an option. Now the family wants to lower their AGI.",
  comic,
  cards,
  hook: {
    line: "Above the line, everybody's invited.",
    more: "Itemize or not, adjustments lower AGI. And a lower AGI makes almost everything else better.",
    alt: "A party banner above a red dashed AGI line.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Label x={150} y={40} size={18}>HSA · IRA · ½ SE tax · $2,500 · $300</Label>
        <TheLine y={70} w={320} />
        <Label x={150} y={102} size={13} color="#4f5c6c">then standard or itemized</Label>
      </svg>
    ),
  },
  traps: [
    { title: "HSA on Medicare", text: "Medicare enrollment ends HSA contributions, even with a high-deductible plan." },
    { title: "Student loan interest when MFS", text: "Married filing separately can never take it. Phase-out for 2025 starts at $85,000 ($170,000 joint)." },
    { title: "SE health insurance with a spouse's plan", text: "No deduction for any month the self-employed person was eligible for a subsidized employer plan, including a spouse's." },
    { title: "Alimony after 2018", text: "For agreements executed after 2018, alimony is neither deductible nor income." },
  ],
  sources: [
    { key: "p969", section: "Health Savings Accounts: Qualifying for an HSA; Contributions; Distributions" },
    { key: "p970", section: "Student Loan Interest Deduction" },
    { key: "p560", section: "SEP Plans; Deduction limit for contributions for participants" },
    { key: "p504", section: "Alimony" },
    { key: "p590a", section: "How Much Can Be Contributed?" },
  ],
  cases: [
    {
      who: "Milo",
      title: "The family HSA",
      facts: "Milo, 34, has family HDHP coverage for all of 2025 with a $3,300 deductible. Penny's employer put $1,000 into the family's HSA.",
      question: "How much more can Milo and Penny contribute for 2025?",
      choices: ["$8,550", "$7,550", "$4,300", "$9,550"],
      answer: "$7,550",
      why: "The 2025 family limit is $8,550, and employer contributions count toward it: $8,550 minus $1,000 = $7,550.",
    },
    {
      who: "Rosa",
      title: "Rosa's HSA wish",
      facts: "Rosa, 74, is enrolled in Medicare Part A and has an HDHP from a part-time job.",
      question: "How much can she contribute to an HSA for 2025?",
      choices: ["$4,300", "$5,300", "$1,000", "$0"],
      answer: "$0",
      why: "Someone enrolled in Medicare isn't an eligible individual for HSA contributions.",
    },
    {
      who: "Penny",
      title: "Penny's loan interest",
      facts: "Penny and Milo file jointly with modified AGI of $140,000. Penny paid $3,000 of interest on her qualified student loan in 2025.",
      question: "How much can they deduct?",
      choices: ["$3,000", "$2,500", "$1,250", "$0"],
      answer: "$2,500",
      why: "The deduction is capped at $2,500, and their MAGI is below the $170,000 start of the joint phase-out.",
    },
    {
      who: "Milo",
      title: "Milo's insurance",
      facts: "Milo is self-employed and paid his own health insurance all year. From July through December 2025, he was eligible for Penny's subsidized employer plan but didn't enroll.",
      question: "For which months can he take the self-employed health insurance deduction?",
      choices: ["All 12 months", "January through June only", "None, since he was married", "July through December only"],
      answer: "January through June only",
      why: "The deduction isn't allowed for any month the person was eligible to participate in a subsidized employer plan, including a spouse's.",
    },
    {
      who: "Ace",
      title: "Ace's divorced client",
      facts: "Ace's client pays $1,500 a month of alimony under a divorce decree signed in 2020.",
      question: "How is the alimony treated?",
      choices: ["Deductible by the payer and income to the recipient", "Not deductible and not income", "Deductible only if the recipient agrees", "Half deductible"],
      answer: "Not deductible and not income",
      why: "For divorce or separation instruments executed after 2018, alimony isn't deductible by the payer or included in the recipient's income.",
    },
    {
      who: "Lulu",
      title: "Ms. Wren's crayons",
      facts: "Lulu's teacher, Ms. Wren, works full-time teaching fourth grade and spent $450 of her own money on classroom supplies in 2025. She's single.",
      question: "How much can she deduct as an educator expense?",
      choices: ["$450", "$300", "$250", "$0, unless she itemizes"],
      answer: "$300",
      why: "Eligible educators can deduct up to $300 of unreimbursed classroom expenses above the line, whether or not they itemize.",
    },
  ],
  quizTopics: ["Health savings accounts"],
  quizBrief: "Adjustments to income: HSA eligibility and 2025 limits, self-employed deductions (half SE tax, health insurance, SEP), IRA limits, student loan interest phase-out, educator expenses, alimony rules",
};

export default lesson;

import { Ace, Arrow, Backdrop, Hoot, House, Label, Lulu, Milo, Penny, VideoCall } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, PANEL, Paper, Step } from "../props";

// Part 1, topic 5.1: life events: divorce (property transfers, alimony, child support, Form 8332, QDROs),
// education savings (529 plans and Coverdell ESAs) and retirement planning for a couple. Written to the
// rules for tax year 2025 from Publications 504, 970, 590-A and 575.

const INK = "#17202c";

/** Lulu's piggy bank, labeled for college. (x, y) is the center. */
function PiggyBank({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={0} rx={24} ry={17} fill="#f6a5b8" stroke={INK} strokeWidth={2.5} />
      <circle cx={22} cy={-2} r={7} fill="#f6a5b8" stroke={INK} strokeWidth={2} />
      <path d="M-6,-17 l6,-7 l4,7" fill="#f6a5b8" stroke={INK} strokeWidth={2} />
      <rect x={-6} y={-19} width={12} height={3} fill={INK} />
      <path d="M-14,15 v6 M10,15 v6" stroke={INK} strokeWidth={3} />
      <text x={-4} y={5} textAnchor="middle" fontSize={9} fontWeight={800} fill={INK}>529</text>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Ace holds a paper reading 2025 review. Penny smiles and Milo throws up his arms.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={60} y={128} scale={0.72} mood="happy" />
        <Milo x={134} y={128} scale={0.72} mood="excited" pose="up" />
        <Ace x={250} y={128} scale={0.72} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="2025" sub="review" color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Year-end review! Any big life events?", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Milo", text: "Cousin Dee got divorced! She's on the tablet!", x: 48, y: 3, w: 40, tail: "down" },
    ],
  },
  {
    alt: "Dee on a video call, worried, with a little house next to the tablet. Ace answers calmly.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <VideoCall x={20} y={92} scale={1} mood="worried" bars={2} />
        <House x={170} y={150} scale={0.7} />
        <Ace x={258} y={128} scale={0.76} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "Vince gave me the house in the divorce. Do I owe tax on it?", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Ace", text: "No, Dee. Transfers between spouses in a divorce are tax-free. You keep his basis.", x: 52, y: 2, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot holds up two papers labeled alimony and child support. Dee on the tablet cheers.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Hoot x={84} y={130} scale={0.7} mood="stern" pose="point" />
        <Paper x={150} y={108} label="ALIMONY" sub="after 2018" color="#fff3c4" />
        <Paper x={150} y={164} label="CHILD" sub="support" color="#d8f0e2" />
        <VideoCall x={190} y={96} scale={0.86} mood="excited" pose="up" bars={2} />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Divorce after 2018? His alimony isn't deductible, and it isn't your income. Child support never is.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Dee", text: "So it's all mine!", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a paper labeled 401(k). Ace holds one labeled QDRO.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef0d8" />
        <Penny x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="401(k)" sub="Vince's" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="QDRO" sub="split" color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "And Dee's half of Vince's 401(k)?", x: 3, y: 4, w: 38, tail: "down-left" },
      { who: "Ace", text: "A QDRO splits it, Penny. If Dee cashes out her share, she pays tax but no 10% penalty.", x: 44, y: 2, w: 53, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu hugs a pink piggy bank labeled 529. Ace kneels to explain.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Lulu x={84} y={160} scale={0.56} mood="excited" />
        <PiggyBank x={140} y={176} scale={1} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "Mom started a 529 for my college! Is it magic?", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Ace", text: "Kind of, Lulu. It grows tax-free if it's spent on school. Even up to $10,000 a year of K-12 tuition.", x: 46, y: 2, w: 51, tail: "down-right" },
    ],
  },
  {
    alt: "Milo points at Penny proudly. Hoot, holding his clipboard, does math on his feathers.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={70} y={128} scale={0.74} mood="excited" pose="point" />
        <Penny x={160} y={128} scale={0.74} mood="happy" />
        <Hoot x={262} y={130} scale={0.64} mood="shocked" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Penny's paycheck can fund MY IRA too. A spousal IRA!", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Hoot", text: "Hoo! $7,000 each, on a joint return. The math checks out.", x: 54, y: 3, w: 43, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Property transfers in a divorce",
    alt: "A house passed from Vince to Dee with a tag reading no gain, no loss, and a basis tag that moves with it.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={30} w={84} h={50} lines={["Vince"]} size={13} color="#d4ebfa" />
        <Card x={222} y={30} w={84} h={50} lines={["Dee"]} size={13} color="#fde2e4" />
        <House x={160} y={74} scale={0.7} />
        <Arrow d="M102,100 H218" />
        <Card x={60} y={118} w={200} h={46} lines={["No gain or loss.", "Dee keeps Vince's basis."]} size={11} color="#fff3c4" />
      </svg>
    ),
    body: [
      "No gain or loss is recognized on a transfer of property to a spouse, or to a former spouse if it's incident to the divorce (within one year after the marriage ends, or within six years under the divorce instrument).",
      "The receiving spouse takes the transferring spouse's adjusted basis, not fair market value. Gain shows up only when they later sell.",
    ],
    keyPoint: "Property transfers between spouses or incident to divorce: no gain or loss; the recipient takes a carryover basis (the transferor's adjusted basis).",
  },
  {
    title: "Alimony and child support",
    alt: "Two columns: divorces before 2019, alimony deductible by the payer and income to the recipient; after 2018, neither. Child support: never deductible, never income.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={14} w={140} h={84} color="#d4ebfa" label="Before 2019" sub="payer deducts, payee taxed" />
        <Step x={166} y={14} w={140} h={84} color="#fde2e4" label="After 2018" sub="neither" />
        <Card x={40} y={114} w={240} h={50} lines={["Child support: never deductible,", "never income"]} size={11} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "For a divorce or separation agreement executed after 2018, alimony isn't deductible by the payer and isn't income to the recipient. Under older agreements, alimony is still deductible by the payer and taxable to the recipient, unless the agreement is modified to adopt the new rules.",
      "Child support is never deductible and never income. If a payment is reduced when a child reaches a certain age or event, that part is treated as child support.",
    ],
    keyPoint: "Alimony: agreements after 2018 → not deductible, not income. Pre-2019 agreements → deductible by payer, income to recipient. Child support: never deductible, never income.",
  },
  {
    title: "Which parent claims the child",
    alt: "A calendar of nights: the parent with more nights is custodial. Form 8332 can release the child tax credit to the other parent, but head of household and EITC stay with the custodial parent.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Card x={14} y={14} w={140} h={150} color="#fff">
          <Label x={84} y={36} size={11}>Custodial parent</Label>
          <Label x={84} y={56} size={10} weight={700}>(more nights)</Label>
          <Label x={84} y={86} size={10} weight={700}>head of household</Label>
          <Label x={84} y={104} size={10} weight={700}>EITC</Label>
          <Label x={84} y={122} size={10} weight={700}>dependent care credit</Label>
        </Card>
        <Card x={166} y={14} w={140} h={150} color="#fff3c4">
          <Label x={236} y={36} size={11}>Other parent</Label>
          <Label x={236} y={56} size={10} weight={700}>with Form 8332</Label>
          <Label x={236} y={86} size={10} weight={700}>dependency</Label>
          <Label x={236} y={104} size={10} weight={700}>child tax credit</Label>
          <Label x={236} y={122} size={10} weight={700}>or $500 credit</Label>
        </Card>
      </svg>
    ),
    body: [
      "The custodial parent is the one the child lived with for more nights during the year. If the parents are divorced or separated and together provide over half the child's support, the custodial parent can release the claim to the noncustodial parent by signing Form 8332, which the noncustodial parent attaches to their return.",
      "The release covers the dependency claim, the child tax credit or credit for other dependents. Head of household status, the EITC and the dependent care credit stay with the custodial parent.",
    ],
    keyPoint: "Custodial parent = more nights. Form 8332 releases the dependency claim and the child tax credit/$500 credit to the noncustodial parent. HOH, EITC and the dependent care credit stay with the custodial parent.",
  },
  {
    title: "Splitting retirement accounts",
    alt: "A 401(k) split by a QDRO: the ex-spouse's share is taxed to them, with no 10% penalty. An IRA moved by the divorce decree is a tax-free transfer.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef0d8" />
        <Paper x={56} y={60} label="QDRO" sub="401(k)" scale={1.6} color="#d8f0e2" />
        <Card x={110} y={20} w={198} h={60} lines={["Ex-spouse's share: taxed", "to them, no 10% penalty"]} size={10} color="#fff" />
        <Paper x={56} y={140} label="IRA" sub="decree" scale={1.1} color="#fff3c4" />
        <Card x={110} y={108} w={198} h={60} lines={["IRA moved by the decree:", "tax-free transfer"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A qualified domestic relations order (QDRO) divides an employer plan. Distributions to a spouse or former spouse under a QDRO are taxed to them, not the employee, and they're exempt from the 10% additional tax on early distributions. They can also be rolled over.",
      "An IRA interest transferred to a spouse or former spouse under a divorce or separation instrument is a tax-free transfer, and the IRA then belongs to the recipient. (The QDRO exception to the 10% tax doesn't apply to IRAs.)",
    ],
    keyPoint: "QDRO (employer plan): payments to the ex-spouse are taxed to them, no 10% early-distribution tax, can be rolled over. IRA transferred under a divorce decree: tax-free; the QDRO 10%-tax exception doesn't apply to IRAs.",
  },
  {
    title: "529 plans",
    alt: "Lulu's piggy bank labeled 529: contributions aren't federally deductible, growth is tax-free for qualified education, K-12 tuition up to $10,000 a year, and up to $35,000 lifetime can roll to a Roth IRA.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <PiggyBank x={56} y={86} scale={1.8} />
        <Card x={110} y={10} w={198} h={36} lines={["No federal deduction"]} size={11} color="#fff" />
        <Card x={110} y={52} w={198} h={36} lines={["Tax-free for qualified education"]} size={10} color="#d8f0e2" />
        <Card x={110} y={94} w={198} h={36} lines={["K-12 tuition: $10,000 a year"]} size={10} color="#fff3c4" />
        <Card x={110} y={136} w={198} h={36} lines={["To Roth: $35,000 lifetime"]} size={10} color="#d4ebfa" />
      </svg>
    ),
    body: [
      "Contributions to a 529 plan aren't deductible on the federal return, but earnings grow tax-free, and distributions are tax-free when used for qualified higher education expenses, up to $10,000 a year of K-12 tuition for 2025, and up to $10,000 lifetime of student loan payments.",
      "The earnings part of a nonqualified distribution is taxable plus a 10% additional tax. A 529 that's been open 15 years or more can roll up to $35,000 (lifetime) to the beneficiary's Roth IRA, within the annual Roth limit.",
    ],
    keyPoint: "529: no federal deduction; tax-free growth and distributions for qualified education (K-12 tuition up to $10,000/yr for 2025). Nonqualified: earnings taxed + 10%. 15-year-old account: up to $35,000 lifetime to the beneficiary's Roth IRA.",
  },
  {
    title: "Coverdell ESAs",
    alt: "A small savings jar labeled Coverdell: $2,000 a year per child, phased out at higher incomes, contributions before 18, used by 30.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={140} h={84} color="#d8f0e2" label="$2,000" sub="per child, per year" />
        <Step x={166} y={14} w={140} h={84} color="#fff3c4" label="Phase-out" sub="by income" />
        <Card x={14} y={110} w={292} h={56} lines={["$95K–$110K MAGI ($190K–$220K joint)", "Contribute before 18; use it by 30"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A Coverdell education savings account takes up to $2,000 a year in total for each beneficiary, from all contributors. The contributor's limit phases out with modified AGI between $95,000 and $110,000 ($190,000 and $220,000 on a joint return).",
      "Contributions must be made before the beneficiary turns 18 (unless special needs), and the account generally must be used or rolled to another family member by age 30. Distributions are tax-free for qualified elementary, secondary and higher education expenses.",
    ],
    keyPoint: "Coverdell ESA: $2,000/yr per beneficiary (all contributors combined); phase-out MAGI $95K–$110K ($190K–$220K MFJ); contribute before 18; use by 30; tax-free for K-12 and college costs.",
  },
  {
    title: "Spousal IRA",
    alt: "Milo and Penny side by side, each with an IRA of $7,000, funded by Penny's pay on a joint return.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fff7dc" floorY={160} />
        <Penny x={60} y={118} scale={0.4} mood="happy" />
        <Milo x={120} y={118} scale={0.4} mood="excited" />
        <Card x={164} y={14} w={144} h={40} lines={["$7,000 each"]} size={13} color="#d8f0e2" />
        <Card x={164} y={62} w={144} h={40} lines={["$8,000 if 50+"]} size={12} color="#fff" />
        <Card x={164} y={110} w={144} h={44} lines={["Joint return, enough", "combined pay"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "A spouse with little or no compensation can still contribute to an IRA if the couple files jointly and their combined taxable compensation covers both contributions. For 2025 the limit is $7,000 each, or $8,000 for someone 50 or older.",
      "Whether the traditional IRA contribution is deductible depends on whether either spouse is covered by a workplace plan, and on modified AGI.",
    ],
    keyPoint: "Spousal IRA: a low- or no-earning spouse can contribute on a joint return if combined compensation covers it; 2025 limit $7,000 each ($8,000 if 50+).",
  },
];

const lesson: Lesson = {
  id: "p1-life-events",
  part: "part1",
  domainId: "p1d5",
  number: "5.1",
  episode: "The Year in Review",
  title: "Life events",
  minutes: 14,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "Divorce (property transfers, alimony, child support, who claims the child, splitting retirement plans), education savings with 529s and Coverdells, and the spousal IRA.",
  previously: "Hoot's penalty calculator crashed. Now it's December, and Ace holds his annual year-in-review with the Pocket-Marsh household.",
  comic,
  cards,
  hook: {
    line: "Divorce transfers: no tax, old basis. New alimony: no deduction, no income.",
    more: "Child support never counts. 529s grow tax-free for school; Coverdells cap at $2,000 a year.",
    alt: "A house with an arrow labeled no tax, and Lulu's 529 piggy bank.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#eef5f1" />
        <House x={60} y={84} scale={0.6} />
        <Arrow d="M100,60 H150" />
        <Label x={125} y={50} size={11}>no tax</Label>
        <Label x={200} y={64} size={12}>old basis</Label>
        <PiggyBank x={278} y={64} scale={1.2} />
      </svg>
    ),
  },
  traps: [
    { title: "Fair market value basis after divorce", text: "The receiving spouse keeps the transferor's basis, not today's value." },
    { title: "Deducting new alimony", text: "For agreements after 2018, alimony is neither deductible nor income." },
    { title: "Form 8332 for head of household", text: "Form 8332 releases the dependency claim and child credits, never HOH, the EITC or the dependent care credit." },
    { title: "The QDRO exception for IRAs", text: "The no-10%-penalty rule for QDROs applies to employer plans, not IRAs." },
  ],
  sources: [
    { key: "p504", section: "Alimony; Property Settlements; Exemptions for Dependents (Form 8332)" },
    { key: "p970", section: "Coverdell Education Savings Account; Qualified Tuition Program (QTP)" },
    { key: "p575", section: "Qualified domestic relations order (QDRO)" },
    { key: "p590a", section: "Kay Bailey Hutchison Spousal IRA Limit" },
  ],
  cases: [
    {
      who: "Dee",
      title: "The house in the divorce",
      facts: "In the 2025 divorce, Vince transferred the house to Dee. His basis was $180,000; it was worth $300,000 that day.",
      question: "What gain does Vince report, and what's Dee's basis?",
      choices: ["$120,000 gain; Dee's basis $300,000", "No gain; Dee's basis $300,000", "No gain; Dee's basis $180,000", "$120,000 gain; Dee's basis $180,000"],
      answer: "No gain; Dee's basis $180,000",
      why: "Transfers incident to divorce are tax-free, and the recipient takes the transferor's adjusted basis ($180,000).",
    },
    {
      who: "Hoot",
      title: "Vince's monthly checks",
      facts: "Under the 2025 decree, Vince pays Dee $1,500 a month alimony and $800 a month child support.",
      question: "How much does Dee include in income for a full year?",
      choices: ["$0", "$18,000", "$27,600", "$9,600"],
      answer: "$0",
      why: "Alimony under an agreement executed after 2018 isn't income to the recipient (or deductible by the payer), and child support never is.",
    },
    {
      who: "Ace",
      title: "Form 8332",
      facts: "A divorced client's son lived with her 250 nights in 2025. She signs Form 8332 for her ex.",
      question: "What can her ex claim?",
      choices: ["Head of household and the EITC", "The dependency claim and the child tax credit", "Everything, including the dependent care credit", "Nothing; only the custodial parent can claim a child"],
      answer: "The dependency claim and the child tax credit",
      why: "Form 8332 releases the dependency claim and the child tax credit (or $500 credit). HOH, the EITC and the dependent care credit stay with the custodial parent.",
    },
    {
      who: "Penny",
      title: "Dee's 401(k) share",
      facts: "Dee, 41, receives $30,000 from Vince's 401(k) under a QDRO and keeps the cash.",
      question: "How is it taxed?",
      choices: ["Taxable to Vince", "Taxable to Dee, with a 10% additional tax", "Taxable to Dee, with no 10% additional tax", "Tax-free as a property settlement"],
      answer: "Taxable to Dee, with no 10% additional tax",
      why: "A QDRO distribution to a spouse or former spouse is taxed to that person and is exempt from the 10% early-distribution tax.",
    },
    {
      who: "Lulu",
      title: "The Coverdell limit",
      facts: "Aunt Rosa puts $2,000 in a Coverdell ESA for Lulu in 2025, and Milo wants to add $1,000 to another Coverdell for her.",
      question: "How much can Milo contribute for Lulu in 2025?",
      choices: ["$1,000", "$2,000", "$0", "$4,000"],
      answer: "$0",
      why: "The $2,000 annual Coverdell limit is per beneficiary across all contributors and accounts. Rosa already used it, so Milo can't add more for 2025.",
    },
  ],
  quizTopics: ["Divorce", "Education planning"],
  quizBrief: "Life events: divorce property transfers (carryover basis), alimony before 2019 vs after 2018, child support, Form 8332, QDROs, 529 plans and Coverdell ESAs, spousal IRA",
};

export default lesson;

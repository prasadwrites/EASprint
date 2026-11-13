import { Ace, Arrow, Backdrop, Biscuit, Hoot, House, Label, Milo, Penny, StockCert } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, Confetti, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 1, topic 4.3: Additional Medicare Tax, net investment income tax, excess Social Security and
// uncollected taxes. Written to the rules for tax year 2025 from the Form 8959 instructions, the IRS net
// investment income tax page and Publication 505.

const INK = "#17202c";

const comic: Lesson["comic"] = [
  {
    alt: "Penny and Milo dance under confetti holding a big paycheck. Hoot peeks in from the side.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Confetti top={10} h={90} />
        <Penny x={70} y={128} scale={0.74} mood="excited" pose="up" />
        <Milo x={150} y={130} scale={0.72} mood="excited" pose="up" />
        <Hoot x={262} y={128} scale={0.66} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Promotion! With my weekend job, I made $230,000 this year!", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! Then welcome to the surtaxes, Penny Pocket!", x: 54, y: 3, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds a sign reading +0.9% over $250,000. Milo scratches his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Milo x={84} y={128} scale={0.78} mood="thinking" />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-32} y={-24} w={64} h={34} lines={["+0.9%", "over $250K"]} size={10} color="#fde2e4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "What's a surtax? Is it like a surfboard?", x: 3, y: 4, w: 40, tail: "down-left" },
      { who: "Ace", text: "Sadly no, Milo. Your wages plus SE income over $250,000 on a joint return: an extra 0.9% Medicare tax.", x: 47, y: 2, w: 50, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds her W-2 showing no Additional Medicare withholding. Ace holds a Form 8959.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="W-2" sub="$200,000" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="8959" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "But Gadget Works didn't withhold any of it!", x: 3, y: 4, w: 40, tail: "down-left" },
      { who: "Ace", text: "Employers start only above $200,000 paid to you, Penny, whatever your status. Form 8959 settles it.", x: 47, y: 2, w: 50, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot juggles a stock certificate, a little house and a dividend check, each labeled 3.8%.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#efe3f7" />
        <Hoot x={84} y={130} scale={0.72} mood="smug" pose="up" />
        <StockCert x={170} y={70} scale={0.8} rotate={-10} />
        <House x={232} y={130} scale={0.6} color="#d4ebfa" />
        <Mark x={280} y={70} text="3.8%" color="#a8321f" size={18} />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "And Grandpa Walt's stock sale, the rental, the dividends? 3.8% net investment income tax!", x: 3, y: 2, w: 54, tail: "down-left" },
    ],
  },
  {
    alt: "Milo, holding Biscuit's leash, asks a question. Ace shakes his head kindly.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={80} y={128} scale={0.76} mood="worried" pose="shrug" />
        <Biscuit x={150} y={178} scale={0.32} mood="sad" />
        <Ace x={244} y={128} scale={0.76} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "On my dog walking money too?", x: 3, y: 4, w: 34, tail: "down-left" },
      { who: "Ace", text: "No, Milo. Wages and self-employment income are never investment income. Neither are IRA payouts.", x: 42, y: 2, w: 55, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds two W-2s side by side. Ace holds a card reading $10,918.20.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<g><Paper x={-12} y={-8} label="W-2" sub="Gadget" rotate={-8} /><Paper x={14} y={-6} label="W-2" sub="weekend" rotate={8} /></g>} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-32} y={-22} w={64} h={30} lines={["$10,918.20"]} size={10} color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "With two jobs, did I pay too much Social Security?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Yes! Over $10,918.20 from two employers, Penny? The excess comes back as a credit.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Additional Medicare Tax: 0.9% over the threshold",
    alt: "A stack of wages and self-employment income with a line at $250,000 joint, $200,000 single and $125,000 separate. Income above the line gets an extra 0.9 percent.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde2e4" />
        <rect x={40} y={20} width={90} height={146} fill="#d4ebfa" stroke={INK} strokeWidth={2.5} />
        <rect x={40} y={20} width={90} height={40} fill="#f6b73c" stroke={INK} strokeWidth={2.5} />
        <Label x={85} y={46} size={12}>+0.9%</Label>
        <Label x={85} y={110} size={10}>wages + SE</Label>
        <Step x={150} y={30} w={156} h={30} color="#fff" label="$250,000 MFJ" />
        <Step x={150} y={68} w={156} h={30} color="#fff" label="$200,000 single, HOH" />
        <Step x={150} y={106} w={156} h={30} color="#fff" label="$125,000 MFS" />
        <Label x={228} y={160} size={10} weight={700}>not indexed · Form 8959</Label>
      </svg>
    ),
    body: [
      "The Additional Medicare Tax is 0.9% of wages, self-employment income and railroad retirement compensation above a threshold: $250,000 married filing jointly, $125,000 married filing separately, and $200,000 for everyone else. The thresholds aren't adjusted for inflation.",
      "For a joint return, the spouses' wages and SE income are combined. The self-employment threshold is reduced (not below zero) by wages. Losses don't reduce wages. It's figured on Form 8959, and there's no employer match.",
    ],
    keyPoint: "Additional Medicare Tax: 0.9% on wages + SE income over $250,000 MFJ / $125,000 MFS / $200,000 others (not indexed). Combined for MFJ. No employer share. Form 8959.",
  },
  {
    title: "Employers withhold only above $200,000",
    alt: "Two employers each paying under $200,000 withhold nothing extra. One employer paying $210,000 withholds 0.9 percent on $10,000, whatever the filing status.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <path d="M20,90 H300" stroke="#a8321f" strokeWidth={3} strokeDasharray="8 5" />
        <Label x={262} y={82} size={11} color="#a8321f">$200,000 from</Label>
        <Label x={262} y={108} size={11} color="#a8321f">one employer</Label>
        <rect x={40} y={110} width={60} height={56} fill="#d4ebfa" stroke={INK} strokeWidth={2} />
        <Label x={70} y={142} size={10}>no 0.9%</Label>
        <rect x={150} y={60} width={60} height={106} fill="#d4ebfa" stroke={INK} strokeWidth={2} />
        <rect x={150} y={60} width={60} height={30} fill="#f6b73c" stroke={INK} strokeWidth={2} />
        <Label x={180} y={80} size={9}>withheld</Label>
        <Label x={160} y={30} size={11}>Then the return settles up on Form 8959</Label>
      </svg>
    ),
    body: [
      "An employer must withhold the 0.9% on wages it pays an employee above $200,000 in the year, regardless of filing status or other income, and can't skip it on request.",
      "Because the employer looks only at its own wages, the tax withheld can be too much (a married employee whose spouse has no income) or too little (two earners each under $200,000). Form 8959 reconciles it on the return; the employee can adjust Form W-4 or make estimated payments.",
    ],
    keyPoint: "Employer withholds 0.9% only on wages it pays over $200,000, regardless of status. Over- or under-withholding is reconciled on Form 8959.",
  },
  {
    title: "Net investment income tax: 3.8%",
    alt: "Two bars: net investment income and MAGI over the threshold. The tax is 3.8 percent of the smaller bar.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <rect x={40} y={50} width={70} height={110} fill="#d8f0e2" stroke={INK} strokeWidth={2.5} />
        <rect x={140} y={90} width={70} height={70} fill="#fff3c4" stroke={INK} strokeWidth={2.5} />
        <Label x={75} y={106} size={10}>NII</Label>
        <Label x={175} y={120} size={9}>MAGI over</Label>
        <Label x={175} y={134} size={9}>threshold</Label>
        <Arrow d="M226,110 H256" color="#a8321f" />
        <Label x={286} y={104} size={11} color="#a8321f">3.8% of</Label>
        <Label x={286} y={120} size={11} color="#a8321f">smaller</Label>
        <Label x={160} y={28} size={10} weight={700}>$250K MFJ · $200K single, HOH · $125K MFS</Label>
      </svg>
    ),
    body: [
      "Individuals pay a 3.8% net investment income tax on the lesser of their net investment income or the amount by which modified AGI exceeds $250,000 (MFJ and qualifying surviving spouse), $125,000 (MFS) or $200,000 (single and HOH). The thresholds aren't indexed.",
      "It's figured on Form 8960. Estates and trusts pay it too, at much lower income levels.",
    ],
    keyPoint: "NIIT: 3.8% × lesser of net investment income or MAGI over $250,000 MFJ / $125,000 MFS / $200,000 others (not indexed). Form 8960.",
  },
  {
    title: "What is net investment income",
    alt: "Counts: interest, dividends, capital gains, rents, royalties, passive business income. Doesn't: wages, SE income, IRA and pension payouts, tax-exempt interest, excluded home-sale gain.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={14} y={14} w={140} h={150} color="#d8f0e2">
          <Label x={84} y={36} size={11}>Counts</Label>
          <Label x={84} y={60} size={10} weight={700}>interest, dividends</Label>
          <Label x={84} y={80} size={10} weight={700}>capital gains</Label>
          <Label x={84} y={100} size={10} weight={700}>rents, royalties</Label>
          <Label x={84} y={120} size={10} weight={700}>passive businesses</Label>
          <Label x={84} y={140} size={10} weight={700}>annuities</Label>
        </Card>
        <Card x={166} y={14} w={140} h={150} color="#fde2e4">
          <Label x={236} y={36} size={11}>Doesn't</Label>
          <Label x={236} y={60} size={10} weight={700}>wages, SE income</Label>
          <Label x={236} y={80} size={10} weight={700}>IRA, 401(k), pension</Label>
          <Label x={236} y={100} size={10} weight={700}>tax-exempt interest</Label>
          <Label x={236} y={120} size={10} weight={700}>excluded home gain</Label>
          <Label x={236} y={140} size={10} weight={700}>Social Security</Label>
        </Card>
      </svg>
    ),
    body: [
      "Net investment income includes interest, dividends, capital gains, rental and royalty income, nonqualified annuities, and income from passive businesses and trading financial instruments, minus related deductions.",
      "It doesn't include wages, self-employment income, distributions from IRAs and qualified retirement plans, tax-exempt interest, Social Security, or gain excluded on the sale of a main home (the taxable part above the exclusion does count).",
    ],
    keyPoint: "NII: interest, dividends, capital gains, rents, royalties, nonqualified annuities, passive business income. Not: wages, SE income, IRA/plan distributions, tax-exempt interest, Social Security, excluded home-sale gain.",
  },
  {
    title: "Excess Social Security from two employers",
    alt: "Two W-2s with Social Security withheld of $9,920 and $1,860 add up to $11,780, over the $10,918.20 maximum. The $861.80 excess becomes a credit.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d8f0e2" />
        <Paper x={44} y={56} label="W-2" sub="$9,920" scale={1.3} />
        <Paper x={104} y={56} label="W-2" sub="$1,860" scale={1.3} />
        <Label x={74} y={118} size={12}>= $11,780</Label>
        <Arrow d="M140,70 H170" />
        <Card x={174} y={24} w={134} h={40} lines={["Max $10,918.20"]} size={11} color="#fff" />
        <Card x={174} y={76} w={134} h={50} lines={["Excess $861.80", "credit, Schedule 3"]} size={11} color="#fff3c4" />
        <Label x={160} y={160} size={10} weight={700}>One employer over-withheld? Ask the employer to fix it.</Label>
      </svg>
    ),
    body: [
      "For 2025, the most Social Security tax any employee owes is 6.2% of $176,100, or $10,918.20. Someone who worked for two or more employers and had more than that withheld in total claims the excess as a refundable credit on Schedule 3.",
      "If a single employer withheld too much, the employee must get it back from that employer, not on the return. On a joint return, each spouse figures their own excess separately.",
    ],
    keyPoint: "2025 max Social Security tax: $10,918.20 (6.2% × $176,100). Excess from 2+ employers = refundable credit (Schedule 3). One employer's over-withholding is fixed by the employer. Each spouse separately.",
  },
  {
    title: "Uncollected Social Security and Medicare",
    alt: "A W-2 box 12 showing codes A and B for uncollected tax on tips and M and N for group-term life insurance of former employees. An arrow goes to Schedule 2.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Paper x={60} y={84} label="W-2" sub="box 12" scale={1.8} />
        <Card x={120} y={20} w={188} h={40} lines={["A, B: tips (not enough pay)"]} size={10} color="#fff" />
        <Card x={120} y={68} w={188} h={40} lines={["M, N: group-term life"]} size={10} color="#fff" />
        <Card x={120} y={116} w={188} h={40} lines={["Unreported tips: Form 4137"]} size={10} color="#fff3c4" />
        <Label x={214} y={172} size={10} weight={700}>all paid on Schedule 2</Label>
      </svg>
    ),
    body: [
      "When an employer can't collect an employee's share of Social Security and Medicare tax, for example on tips when wages are too small, or on taxable group-term life insurance for former employees, it's shown in box 12 of the W-2 (codes A and B for tips, M and N for insurance) and the employee pays it with the return on Schedule 2.",
      "Tips an employee didn't report to the employer are added on Form 4137, which figures the Social Security and Medicare tax on them.",
    ],
    keyPoint: "Uncollected employee SS/Medicare (W-2 box 12 codes A/B on tips, M/N on group-term life of former employees) is paid on Schedule 2. Unreported tips: Form 4137.",
  },
];

const lesson: Lesson = {
  id: "p1-niit-medicare",
  part: "part1",
  domainId: "p1d4",
  number: "4.3",
  episode: "The Surtax Surprise",
  title: "Extra Medicare and investment taxes",
  minutes: 12,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "The 0.9% Additional Medicare Tax, the 3.8% net investment income tax, excess Social Security from two jobs, and uncollected payroll taxes.",
  previously: "Milo learned what being his own boss costs. Then Penny got a big promotion and took a weekend job on top of it.",
  comic,
  cards,
  hook: {
    line: "0.9% on pay, 3.8% on investments, same thresholds.",
    more: "$250,000 joint, $125,000 separate, $200,000 everyone else, never indexed. Two jobs? Anything over $10,918.20 of Social Security comes back.",
    alt: "The numbers 0.9% and 3.8% on two signs over $250,000.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fde2e4" />
        <Label x={80} y={56} size={30} color="#a8321f">0.9%</Label>
        <Label x={210} y={56} size={30} color="#7a3fa8">3.8%</Label>
        <Label x={145} y={96} size={13} color="#4f5c6c">$250K MFJ · $200K · $125K MFS</Label>
      </svg>
    ),
  },
  traps: [
    { title: "Employer withholding at the joint threshold", text: "Employers withhold the 0.9% only on wages they pay over $200,000, whatever the filing status." },
    { title: "IRA payouts are investment income", text: "Distributions from IRAs and qualified plans aren't net investment income (though they raise MAGI)." },
    { title: "Indexed thresholds", text: "The $200,000 / $250,000 / $125,000 thresholds for both taxes have never been adjusted for inflation." },
    { title: "Excess Social Security from one employer", text: "Only over-withholding across two or more employers becomes a credit on the return." },
  ],
  sources: [
    { key: "i8959", section: "Additional Medicare Tax; Withholding; Thresholds" },
    { key: "niit", section: "Net investment income tax: thresholds and what's included" },
    { key: "p505", section: "Excess Social Security or Railroad Retirement Tax Withholding" },
  ],
  cases: [
    {
      who: "Penny",
      title: "The joint Medicare surtax",
      facts: "Penny and Milo file jointly. Penny's 2025 wages are $230,000. Milo has $36,940 of self-employment income (net earnings).",
      question: "How much income is subject to the 0.9% Additional Medicare Tax?",
      choices: ["$0", "$16,940", "$36,940", "$30,000"],
      answer: "$16,940",
      why: "Wages of $230,000 are under the $250,000 joint threshold. The SE threshold is reduced by wages to $20,000, so $36,940 minus $20,000 = $16,940 is subject to 0.9%.",
    },
    {
      who: "Ace",
      title: "Over-withheld",
      facts: "Ace's client earned $210,000 of wages from one employer. She files jointly and her spouse has no income.",
      question: "What happens with the Additional Medicare Tax?",
      choices: ["She owes 0.9% of $10,000 and it was correctly withheld", "Her employer withheld 0.9% on $10,000, but she owes none and gets it back via Form 8959", "Her employer shouldn't have withheld it", "She owes 0.9% of $210,000"],
      answer: "Her employer withheld 0.9% on $10,000, but she owes none and gets it back via Form 8959",
      why: "Employers must withhold on wages over $200,000 regardless of status. The couple's combined wages ($210,000) are under $250,000, so the withholding is credited back on Form 8959.",
    },
    {
      who: "Hoot",
      title: "Hoot's NIIT math",
      facts: "Penny and Milo file jointly with MAGI of $280,000, including $50,000 of net investment income.",
      question: "What's their net investment income tax?",
      choices: ["$1,900", "$1,140", "$10,640", "$0"],
      answer: "$1,140",
      why: "3.8% applies to the lesser of NII ($50,000) or MAGI over $250,000 ($30,000): 3.8% × $30,000 = $1,140.",
    },
    {
      who: "Milo",
      title: "What's investment income?",
      facts: "A single retiree with MAGI of $260,000 had $40,000 of IRA distributions, $15,000 of municipal bond interest and $20,000 of dividends.",
      question: "What's her net investment income?",
      choices: ["$75,000", "$35,000", "$20,000", "$60,000"],
      answer: "$20,000",
      why: "Only the dividends are net investment income. IRA distributions and tax-exempt interest aren't.",
    },
    {
      who: "Penny",
      title: "Penny's two jobs",
      facts: "In 2025 Gadget Works withheld $9,920 of Social Security tax from Penny's wages, and her weekend employer withheld $1,860.",
      question: "What can Penny claim on her return?",
      choices: ["Nothing", "$1,860", "An $861.80 credit for excess Social Security tax", "A $1,860 deduction"],
      answer: "An $861.80 credit for excess Social Security tax",
      why: "Total withheld is $11,780, which is $861.80 over the 2025 maximum of $10,918.20. Because two employers were involved, the excess is a credit on the return.",
    },
  ],
  quizTopics: ["Additional Medicare Tax", "Net investment income tax", "Excess Social Security tax"],
  quizBrief: "Additional Medicare Tax 0.9% (thresholds, $200,000 employer withholding, Form 8959), net investment income tax 3.8%, what NII includes, excess Social Security credit, uncollected FICA",
};

export default lesson;

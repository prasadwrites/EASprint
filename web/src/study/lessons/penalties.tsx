import { Ace, Arrow, Backdrop, Hoot, Label, Milo, Penny } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Stamp, Step } from "../props";

// Part 1, topic 4.5: penalties on individuals: failure to file and pay, extensions, the estimated tax
// penalty and its safe harbors, accuracy and fraud penalties, and penalty relief. Written to the rules for
// tax year 2025 from Publication 17, Publication 505 and the IRS penalty pages.

const INK = "#17202c";

/** Hoot's beloved penalty calculator. (x, y) is the top-left; `screen` is the display text. */
function Calculator({ x, y, scale = 1, screen = "0", error }: { x: number; y: number; scale?: number; screen?: string; error?: boolean }) {
  const keys = [0, 1, 2, 3].flatMap((r) => [0, 1, 2].map((c) => ({ r, c })));
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={0} y={0} width={60} height={86} rx={7} fill="#5b6b8c" stroke={INK} strokeWidth={2.5} />
      <rect x={6} y={6} width={48} height={20} rx={3} fill={error ? "#fde2e4" : "#cfe8c8"} stroke={INK} strokeWidth={1.5} />
      <text x={51} y={21} textAnchor="end" fontSize={screen.length > 6 ? 8 : 11} fontWeight={800} fill={error ? "#c0392b" : INK} fontFamily="ui-monospace, monospace">
        {screen}
      </text>
      {keys.map(({ r, c }) => (
        <rect key={`${r}-${c}`} x={8 + c * 16} y={32 + r * 13} width={12} height={9} rx={2} fill={r === 3 && c === 2 ? "#e8505b" : "#f4f1ea"} stroke={INK} strokeWidth={1} />
      ))}
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Hoot unveils a giant calculator labeled Penalty-Tron. Milo looks alarmed.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Hoot x={70} y={130} scale={0.7} mood="smug" pose="point" />
        <Calculator x={118} y={70} scale={0.95} screen="$$$" />
        <Milo x={250} y={128} scale={0.78} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Behold! The Penalty-Tron 5000! Who filed late this year?", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Milo", text: "...Me. One month late. And I owe $2,000.", x: 56, y: 4, w: 41, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot jabs at the calculator, which reads $110. Ace raises a finger.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Hoot x={70} y={130} scale={0.7} mood="excited" pose="up" />
        <Calculator x={118} y={70} scale={0.95} screen="$110" />
        <Ace x={250} y={128} scale={0.78} mood="thinking" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "5% for not filing! Plus 0.5% for not paying! $110!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Ace", text: "They overlap, Hoot. Together it's 5% a month. $100.", x: 54, y: 3, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Penny waves a paper reading owe $3,000. Ace points to a paper reading 100% of last year.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="OWE" sub="$3,000" color="#fde2e4" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="100%" sub="last year" color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I owe $3,000 at filing. Is there an estimated tax penalty?", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "Your withholding covered 100% of last year's tax, Penny. Safe harbor. No penalty.", x: 50, y: 2, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds up an extension form. Hoot cackles beside a calendar showing April 15.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="4868" sub="extension" />} />
        <Hoot x={230} y={130} scale={0.7} mood="smug" flip />
        <Calendar x={290} y={92} month="APR" day="15" scale={0.55} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Next year I'll file an extension. Then I can pay late!", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! It extends time to FILE. Not to PAY!", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot rubs his wings over a paper reading 20%, then gestures to one reading 75%. Penny frowns.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Penny x={70} y={128} scale={0.74} mood="worried" />
        <Hoot x={196} y={130} scale={0.66} mood="smug" pose="point" flip />
        <Paper x={256} y={100} label="20%" sub="accuracy" color="#fff3c4" />
        <Paper x={292} y={128} label="75%" sub="fraud" color="#fde2e4" rotate={8} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "What if someone just... guesses their numbers?", x: 3, y: 3, w: 38, tail: "down-left" },
      { who: "Hoot", text: "Negligence? 20% accuracy penalty! Fraud? 75%!", x: 46, y: 2, w: 40, tail: "down" },
    ],
  },
  {
    alt: "Ace hands Milo a letter stamped abated. The calculator screen reads ERROR and Hoot sobs.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={60} y={128} scale={0.72} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="FTA" sub="request" color="#d8f0e2" />} />
        <Milo x={150} y={128} scale={0.72} mood="excited" pose="wave" />
        <Calculator x={210} y={74} scale={0.8} screen="ERROR" error />
        <Hoot x={282} y={132} scale={0.6} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Milo has a clean three years. First-time abatement wipes the penalty.", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Hoot", text: "My beautiful $100!", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Failure to file vs. failure to pay",
    alt: "Two columns: failure to file, 5% of the unpaid tax per month up to 25%; failure to pay, 0.5% per month up to 25%.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={20} w={140} h={100} color="#fde2e4" label="Not filing" sub="5% / month" />
        <Step x={166} y={20} w={140} h={100} color="#fff3c4" label="Not paying" sub="0.5% / month" />
        <Label x={84} y={146} size={11}>max 25%</Label>
        <Label x={236} y={146} size={11}>max 25%</Label>
        <Label x={160} y={170} size={10} weight={700}>both on the tax still unpaid</Label>
      </svg>
    ),
    body: [
      "The failure-to-file penalty is 5% of the tax not paid by the due date for each month or part of a month the return is late, up to 25%. A return more than 60 days late also faces a minimum penalty.",
      "The failure-to-pay penalty is 0.5% of the unpaid tax for each month or part of a month, up to 25%. It drops to 0.25% a month while an installment agreement is in effect, if the return was filed on time.",
    ],
    keyPoint: "Failure to file: 5% of unpaid tax per month or part month, max 25%. Failure to pay: 0.5% per month, max 25% (0.25% under an installment agreement on a timely return).",
  },
  {
    title: "When both apply: 5% a month",
    alt: "Milo's $2,000, one month late: failure to file $90 plus failure to pay $10 equals $100, because the filing penalty is reduced by the paying penalty.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fff7dc" floorY={160} />
        <Milo x={50} y={118} scale={0.4} mood="worried" />
        <Card x={100} y={14} w={206} h={34} lines={["Failure to file: 4.5% = $90"]} size={11} color="#fde2e4" />
        <Card x={100} y={54} w={206} h={34} lines={["Failure to pay: 0.5% = $10"]} size={11} color="#fff3c4" />
        <Card x={100} y={100} w={206} h={40} lines={["Total: 5% = $100"]} size={14} color="#d8f0e2" />
        <Label x={203} y={154} size={10} weight={700}>$2,000 owed, one month late</Label>
      </svg>
    ),
    body: [
      "In any month both penalties apply, the failure-to-file penalty is reduced by the failure-to-pay penalty, so the combined rate is 5% a month.",
      "Interest is separate. It runs on unpaid tax from the original due date until paid, and also on most penalties.",
    ],
    keyPoint: "Same month, both penalties: the filing penalty is reduced by the paying penalty, so the combined total is 5% per month. Interest is charged on top.",
  },
  {
    title: "An extension is for filing, not paying",
    alt: "Form 4868 moves the filing date from April 15 to October 15, but an arrow shows payment still due April 15.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Calendar x={60} y={60} month="APR" day="15" scale={0.9} />
        <Calendar x={260} y={60} month="OCT" day="15" scale={0.9} color="#3f7cc4" />
        <Arrow d="M110,60 H206" />
        <Label x={160} y={48} size={11}>Form 4868</Label>
        <Label x={260} y={126} size={11}>file by</Label>
        <Label x={60} y={126} size={11}>pay by</Label>
        <Label x={160} y={164} size={10} weight={700}>Interest and the 0.5% penalty start on April 15</Label>
      </svg>
    ),
    body: [
      "Form 4868 gives an automatic six-month extension to file, to October 15. It doesn't extend the time to pay: interest, and the failure-to-pay penalty, run from April 15 on any unpaid tax.",
      "If at least 90% of the tax is paid by the original due date and the rest is paid with a return filed within the extension, the IRS treats the shortfall as having reasonable cause, so no failure-to-pay penalty applies (interest still does).",
    ],
    keyPoint: "Extension (Form 4868) = more time to FILE (Oct 15), not to PAY. Interest and failure-to-pay run from April 15. Paid 90%+ by April 15 and the rest with the extended return = no failure-to-pay penalty.",
  },
  {
    title: "Estimated tax: the safe harbors",
    alt: "Penny standing next to four ways to avoid the estimated tax penalty: owe under $1,000, paid 90% of this year, 100% of last year, or 110% if last year's AGI was over $150,000.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fdf3e1" floorY={160} />
        <Penny x={50} y={118} scale={0.4} mood="happy" />
        <Card x={100} y={10} w={206} h={34} lines={["Owe under $1,000"]} size={11} color="#d8f0e2" />
        <Card x={100} y={50} w={206} h={34} lines={["Paid 90% of this year's tax"]} size={11} color="#fff" />
        <Card x={100} y={90} w={206} h={34} lines={["Paid 100% of last year's tax"]} size={11} color="#fff" />
        <Card x={100} y={130} w={206} h={40} lines={["110% if last year's AGI", "was over $150,000"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Individuals generally avoid the estimated tax penalty if they owe less than $1,000 after withholding and refundable credits, or if withholding and timely estimated payments cover the smaller of 90% of this year's tax or 100% of last year's tax (the prior year must have been a full 12-month year with a return).",
      "If last year's AGI was over $150,000 ($75,000 married filing separately), the prior-year test is 110%. Withholding counts as paid evenly through the year. The penalty is figured on Form 2210 and can be waived for a casualty or disaster, or for someone who retired after 62 or became disabled.",
    ],
    keyPoint: "No estimated tax penalty if you owe < $1,000, or paid the lesser of 90% of this year's tax or 100% of last year's (110% if last year's AGI > $150,000; $75,000 MFS). Withholding is treated as paid evenly. Form 2210.",
  },
  {
    title: "Accuracy and fraud penalties",
    alt: "Two stamps: 20% for negligence or a substantial understatement, 75% for fraud.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={90} color="#fff3c4" label="20%" sub="accuracy" />
        <Step x={166} y={14} w={140} h={90} color="#fde2e4" label="75%" sub="fraud" />
        <Label x={84} y={126} size={10} weight={700}>negligence, or tax off</Label>
        <Label x={84} y={142} size={10} weight={700}>by more than the larger</Label>
        <Label x={84} y={158} size={10} weight={700}>of 10% or $5,000</Label>
        <Label x={236} y={126} size={10} weight={700}>of the underpayment</Label>
        <Label x={236} y={142} size={10} weight={700}>due to fraud</Label>
      </svg>
    ),
    body: [
      "The accuracy-related penalty is 20% of the underpayment caused by negligence or disregard of rules, or by a substantial understatement of income tax: one that's more than the larger of 10% of the correct tax or $5,000.",
      "The civil fraud penalty is 75% of the underpayment due to fraud, and it replaces the accuracy penalty on that part. Reasonable cause and good faith, or adequate disclosure with a reasonable basis, can avoid the accuracy penalty.",
    ],
    keyPoint: "Accuracy-related penalty: 20% (negligence, or substantial understatement > greater of 10% of correct tax or $5,000). Fraud: 75%. Reasonable cause and good faith can avoid the 20%.",
  },
  {
    title: "Getting penalties removed",
    alt: "A stamp reading abated over a penalty notice. Two paths: reasonable cause, or first-time abatement for a clean three-year history. First-time abatement doesn't cover accuracy or estimated tax penalties.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Paper x={56} y={74} label="CP" sub="penalty" scale={1.6} color="#fde2e4" />
        <Stamp x={56} y={150} text="ABATED" size={14} />
        <Card x={110} y={12} w={198} h={44} lines={["Reasonable cause:", "illness, disaster, bad IRS advice"]} size={10} color="#fff" />
        <Card x={110} y={62} w={198} h={44} lines={["First-time abatement:", "clean 3 years, all filed"]} size={10} color="#d8f0e2" />
        <Card x={110} y={112} w={198} h={52} lines={["FTA covers file, pay, deposit.", "Not accuracy or", "estimated tax penalties"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Penalties can be removed for reasonable cause, such as a serious illness, a disaster, or written advice from the IRS, when the taxpayer used ordinary care and prudence.",
      "First-time abatement (an administrative waiver) removes failure-to-file, failure-to-pay and failure-to-deposit penalties for one period if the taxpayer had no significant penalties in the prior three years, has filed all required returns, and has paid or arranged to pay the tax. It doesn't apply to the accuracy-related or estimated tax penalties.",
    ],
    keyPoint: "Relief: reasonable cause (ordinary care and prudence), or first-time abatement (no penalties in the prior 3 years, all returns filed, tax paid or arranged). FTA covers failure to file, pay and deposit, not accuracy or estimated tax penalties.",
  },
];

const lesson: Lesson = {
  id: "p1-penalties",
  part: "part1",
  domainId: "p1d4",
  number: "4.5",
  episode: "Hoot's Calculator",
  title: "Penalties",
  minutes: 12,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "Failure-to-file and failure-to-pay penalties, what an extension does, the estimated tax safe harbors, accuracy and fraud penalties, and how to get penalties removed.",
  previously: "Penny filed Grandpa Walt's final return. Milo, meanwhile, filed his own return a month late, and Hoot has bought a new toy.",
  comic,
  cards,
  hook: {
    line: "Late filing hurts ten times more than late paying.",
    more: "5% vs 0.5% a month, 5% combined. An extension buys time to file, never to pay.",
    alt: "Hoot's calculator showing 5% next to a paper reading 0.5%.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7e3f3" />
        <Calculator x={30} y={16} scale={1} screen="5%" />
        <Mark x={130} y={70} text="vs" color={INK} size={22} />
        <Calculator x={170} y={16} scale={1} screen="0.5%" />
        <Hoot x={286} y={108} scale={0.42} mood="smug" flip />
      </svg>
    ),
  },
  traps: [
    { title: "Adding 5% + 0.5%", text: "When both penalties hit in the same month, the filing penalty is reduced by the paying penalty: 5% total." },
    { title: "Extension = more time to pay", text: "Form 4868 extends only the filing date. Interest and the failure-to-pay penalty start on April 15." },
    { title: "Forgetting the 110% rule", text: "If last year's AGI was over $150,000, the prior-year safe harbor is 110%, not 100%." },
    { title: "First-time abatement for everything", text: "It doesn't cover the accuracy-related or the estimated tax penalty." },
  ],
  sources: [
    { key: "ftf", section: "Failure to File Penalty; Failure to Pay Penalty" },
    { key: "p505", section: "Chapter 4, Underpayment Penalty for 2025" },
    { key: "accuracy", section: "Accuracy-Related Penalty" },
    { key: "p17", section: "Penalties; Filing Information, Extensions" },
  ],
  cases: [
    {
      who: "Milo",
      title: "One month late",
      facts: "Milo filed his 2025 return on May 10, 2026 with no extension, and paid the $2,000 he owed when he filed.",
      question: "What's his combined failure-to-file and failure-to-pay penalty (before interest)?",
      choices: ["$110", "$100", "$10", "$500"],
      answer: "$100",
      why: "He's one month (part month) late. Failure to pay is 0.5% ($10). Failure to file is 5%, reduced by the 0.5% in the same month ($90). Combined: 5% of $2,000 = $100.",
    },
    {
      who: "Penny",
      title: "Penny's safe harbor",
      facts: "Penny's 2024 tax was $8,000 and her 2024 AGI was $70,000. Her 2025 withholding was $8,000, and her 2025 tax came to $11,000, so she owes $3,000.",
      question: "Does she owe an estimated tax penalty?",
      choices: ["No; withholding covered 100% of last year's tax", "Yes; she paid less than 90% of this year's tax", "Yes; she owes more than $1,000", "Only if she filed late"],
      answer: "No; withholding covered 100% of last year's tax",
      why: "She paid the smaller of 90% of this year's tax ($9,900) or 100% of last year's tax ($8,000). $8,000 meets the prior-year safe harbor, so no penalty.",
    },
    {
      who: "Hoot",
      title: "The high earner",
      facts: "Dee's 2024 AGI was $210,000 and her 2024 tax was $40,000. Her 2025 tax is $60,000.",
      question: "What's the smallest total of 2025 withholding and timely estimates that avoids the penalty?",
      choices: ["$40,000", "$54,000", "$60,000", "$44,000"],
      answer: "$44,000",
      why: "With prior-year AGI over $150,000, the prior-year test is 110%: $44,000. That's less than 90% of this year's tax ($54,000), so $44,000 is enough.",
    },
    {
      who: "Ace",
      title: "The extension",
      facts: "Milo files Form 4868 by April 15, 2026, pays nothing, and files his return with the $2,000 balance on July 1.",
      question: "What penalties and interest apply?",
      choices: ["None; he was on extension", "Failure to file only", "Failure to pay and interest from April 15", "Failure to file and failure to pay"],
      answer: "Failure to pay and interest from April 15",
      why: "The extension makes the July 1 return on time, so no failure-to-file penalty. It doesn't extend the time to pay, and he paid less than 90% by April 15, so failure-to-pay and interest run from April 15.",
    },
    {
      who: "Milo",
      title: "Ask for a waiver",
      facts: "Milo has filed every return on time for the past three years with no penalties. This year's penalties were for filing and paying late, plus an estimated tax penalty.",
      question: "What will first-time abatement remove?",
      choices: ["All three penalties", "The failure-to-file and failure-to-pay penalties", "Only the estimated tax penalty", "Nothing; it needs reasonable cause"],
      answer: "The failure-to-file and failure-to-pay penalties",
      why: "First-time abatement covers failure-to-file, failure-to-pay and failure-to-deposit penalties for a taxpayer with a clean three-year history. It doesn't cover the estimated tax penalty.",
    },
  ],
  quizTopics: ["Estimated tax"],
  quizBrief: "Penalties on individuals: failure to file and failure to pay rates, extensions, estimated tax safe harbors (90/100/110%), accuracy-related and fraud penalties, first-time abatement",
};

export default lesson;

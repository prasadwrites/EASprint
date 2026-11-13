import { Ace, Backdrop, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { TimeMachine } from "../office";
import { Calendar, Card, CARD, Envelope, HOOK, Mark, PANEL, Paper, Stamp, Step } from "../props";

// Part 3, topic 3.3: fixing past returns: amended returns and refund claim deadlines, the
// failure-to-file and failure-to-pay penalties, the accuracy-related and civil fraud penalties,
// and penalty relief (first-time abatement, reasonable cause, Form 843). Written to the IRS penalty
// pages and the Form 843 and 1040-X instructions as in effect for 2026.

const comic: Lesson["comic"] = [
  {
    alt: "Milo proudly stands beside a cardboard box with a dial set to 2023. Penny stares.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Penny x={70} y={128} scale={0.76} mood="worried" />
        <TimeMachine x={190} y={196} scale={0.9} year="2023" />
        <Milo x={270} y={128} scale={0.72} mood="excited" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Milo. What is that.", x: 3, y: 4, w: 30, tail: "down-left" },
      { who: "Milo", text: "A TIME MACHINE. I forgot a deduction on our 2023 return. I'm going back to fix it!", x: 44, y: 2, w: 54, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Ace holds Form 1040-X and a calendar. Milo, deflated, leans on the time machine.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={70} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="1040-X" color="#d4ebfa" />} />
        <Calendar x={150} y={100} month="CLAIM" day="3" scale={0.7} color="#1d7a49" />
        <Milo x={256} y={128} scale={0.78} mood="worried" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Or file a 1040-X. You can claim a refund within 3 years of filing, or 2 years of paying. 2023 still works.", x: 3, y: 2, w: 56, tail: "down-left" },
      { who: "Milo", text: "I spent all weekend on that box.", x: 64, y: 4, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa bursts in waving a penalty notice. Ace reads it.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Rosa x={84} y={128} scale={0.76} mood="shocked" pose="hold" holding={<Envelope x={0} y={-6} label="PENALTY" irs />} />
        <Ace x={240} y={128} scale={0.78} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I filed 3 months late and they want 5% a MONTH! I was in the HOSPITAL!", x: 3, y: 2, w: 48, tail: "down-left", shout: true },
      { who: "Ace", text: "Failure to file: 5% a month, max 25%. But a hospital stay can be reasonable cause.", x: 54, y: 2, w: 44, tail: "down-right" },
    ],
  },
  {
    alt: "Ace counts on his fingers. Rosa beams and polishes a counter with her apron.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="point" />
        <Rosa x={236} y={128} scale={0.76} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Or first-time abatement: no penalties in the prior 3 years and all returns filed.", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Rosa", text: "My record is spotless. Like my counters.", x: 58, y: 6, w: 39, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot's head pops out of the top of the time machine box. Everyone jumps.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Milo x={60} y={128} scale={0.72} mood="shocked" pose="up" />
        <Hoot x={160} y={66} scale={0.5} mood="smug" />
        <TimeMachine x={160} y={196} scale={0.9} year="2023" />
        <Ace x={268} y={128} scale={0.72} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Greetings from 2023! Did someone say FRAUD?", x: 3, y: 2, w: 48, tail: "down-right" },
      { who: "Ace", text: "No fraud here, Hoot. Out of the box.", x: 62, y: 4, w: 36, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds a letter stamped abated. Lulu sits inside the time machine turning the dial. Milo shrugs.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Rosa x={60} y={128} scale={0.72} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="ABATED" color="#d8f0e2" />} />
        <Lulu x={176} y={92} scale={0.46} mood="excited" pose="up" />
        <TimeMachine x={176} y={196} scale={0.9} year="2099" />
        <Milo x={268} y={128} scale={0.72} mood="happy" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Penalty abated! Cinnamon rolls on me!", x: 3, y: 3, w: 36, tail: "down-left" },
      { who: "Lulu", text: "I'm going to the future to see if Hoot EVER leaves.", x: 40, y: 2, w: 34, tail: "down" },
      { who: "Milo", text: "Pack snacks.", x: 78, y: 8, w: 20, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Amended returns and refund claims",
    alt: "Form 1040-X. A refund claim is due within 3 years after the return was filed or 2 years after the tax was paid, whichever is later.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Paper x={56} y={84} label="1040-X" scale={1.8} color="#fff" />
        <Card x={110} y={14} w={198} h={46} lines={["3 years after filing, or", "2 years after paying"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["whichever is later", "(early returns: the due date)"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["Form 843: penalties, interest,", "non-income taxes"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "Individuals fix errors on a filed return with Form 1040-X, which can be e-filed for recent years. A claim for refund must be filed within 3 years after the original return was filed (a return filed early counts as filed on the due date) or within 2 years after the tax was paid, whichever is later.",
      "The refund is limited to the tax paid within the 3 years (plus any extension) before the claim, or within the 2 years before it under the 2-year rule. Withholding and estimated payments count as paid on the return's due date.",
      "Form 843 is used to claim a refund or request abatement of certain taxes, penalties and interest, such as a penalty abatement request that isn't made by phone or letter.",
    ],
    keyPoint: "1040-X to amend. Refund claim: later of 3 years from filing (early = due date) or 2 years from payment; refund limited to tax paid in the lookback period. Form 843 for abating penalties, interest and certain other taxes.",
  },
  {
    title: "Late filing and late payment",
    alt: "Failure to file: 5% of the unpaid tax per month, up to 25%. Failure to pay: 0.5% per month, up to 25%. When both apply in a month, the total is 5%.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={92} color="#fde2e4" label="5% / month" sub="failure to file, max 25%" />
        <Step x={166} y={14} w={140} h={92} color="#fff3c4" label="0.5% / month" sub="failure to pay, max 25%" />
        <Card x={14} y={116} w={292} h={52} lines={["Both in the same month: 4.5% + 0.5% = 5%", "Over 60 days late: a minimum penalty applies"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "The failure-to-file penalty is 5% of the unpaid tax for each month or part of a month the return is late, up to 25%. If the return is more than 60 days late, a minimum penalty applies (the smaller of an inflation-adjusted dollar amount or 100% of the tax due).",
      "The failure-to-pay penalty is 0.5% of the unpaid tax per month, up to 25%. It drops to 0.25% during an approved installment agreement (for a timely filed return) and rises to 1% once the IRS issues a notice of intent to levy and 10 days pass. When both penalties apply in the same month, the failure-to-file penalty is reduced by the failure-to-pay penalty, so the combined rate is 5%.",
      "Interest runs on unpaid tax and on most penalties from the due date until paid.",
    ],
    keyPoint: "FTF: 5%/month, max 25%; minimum penalty if more than 60 days late. FTP: 0.5%/month, max 25% (0.25% during an IA, 1% after a levy notice). Same month: FTF reduced by FTP (5% combined). Interest on top.",
  },
  {
    title: "Accuracy-related penalty",
    alt: "20% of the underpayment for negligence or a substantial understatement, which for individuals means more than the larger of 10% of the correct tax or $5,000.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Mark x={70} y={86} text="20%" color="#a8321f" size={44} />
        <Card x={140} y={14} w={168} h={70} lines={["Negligence or disregard", "of rules"]} size={10} color="#fff" />
        <Card x={140} y={92} w={168} h={76} lines={["Understatement over", "the larger of 10% of", "correct tax or $5,000"]} size={10} color="#fff3c4" />
        <Label x={70} y={140} size={10}>40% for gross</Label>
        <Label x={70} y={156} size={10}>valuation misstatements</Label>
      </svg>
    ),
    body: [
      "The accuracy-related penalty is 20% of the part of an underpayment due to negligence or disregard of rules, a substantial understatement of income tax, or a substantial valuation misstatement, among others. It rises to 40% for gross valuation misstatements.",
      "For individuals, an understatement is substantial if it's more than the larger of 10% of the correct tax or $5,000. The penalty can be reduced by adequate disclosure with a reasonable basis, or avoided by showing reasonable cause and good faith. The accuracy-related penalty doesn't stack with the fraud penalty on the same portion.",
    ],
    keyPoint: "Accuracy-related penalty: 20% of the underpayment (negligence, substantial understatement, valuation misstatement); 40% for gross valuation misstatement. Individual substantial understatement: more than the larger of 10% of correct tax or $5,000. Defenses: reasonable cause and good faith; disclosure with reasonable basis.",
  },
  {
    title: "Civil fraud penalty",
    alt: "75% of the part of the underpayment due to fraud. The IRS must prove fraud by clear and convincing evidence, and there's no time limit to assess.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Mark x={80} y={92} text="75%" color="#a8321f" size={52} />
        <Card x={150} y={14} w={158} h={70} lines={["IRS must prove it:", "clear and convincing"]} size={10} color="#fff" />
        <Card x={150} y={92} w={158} h={76} lines={["No statute of", "limitations"]} size={11} color="#fde2e4" />
      </svg>
    ),
    body: [
      "If any part of an underpayment is due to fraud, the civil fraud penalty is 75% of the portion attributable to fraud. Once the IRS proves some of the underpayment is fraudulent, the whole underpayment is treated as fraud except any part the taxpayer proves isn't.",
      "The IRS bears the burden of proving fraud by clear and convincing evidence. There's no statute of limitations on assessment for a fraudulent return, and on a joint return the penalty applies to a spouse only if that spouse committed fraud. Failure to file that's fraudulent carries up to 15% a month, max 75%.",
    ],
    keyPoint: "Civil fraud penalty: 75% of the underpayment due to fraud; IRS must prove fraud by clear and convincing evidence; no assessment time limit; on a joint return, only the spouse who committed fraud. Fraudulent failure to file: 15%/month up to 75%.",
  },
  {
    title: "Getting penalties removed",
    alt: "First-time abatement for a clean 3-year history, reasonable cause such as serious illness or a disaster, and relief for written IRS advice. Interest falls with the penalty.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={94} h={104} color="#d8f0e2" label="FTA" sub="clean 3 years" />
        <Step x={113} y={14} w={94} h={104} color="#fff3c4" label="Cause" sub="illness, disaster" />
        <Step x={212} y={14} w={94} h={104} color="#e7e3f3" label="843" sub="if by form" />
        <Label x={160} y={142} size={10} weight={700}>Interest on an abated penalty goes too,</Label>
        <Label x={160} y={160} size={10} weight={700}>but interest on tax rarely does</Label>
      </svg>
    ),
    body: [
      "First-time abatement covers the failure-to-file, failure-to-pay and failure-to-deposit penalties for one period if the taxpayer had no significant penalties in the prior 3 years, filed all currently required returns, and paid or arranged to pay the tax due. It doesn't apply to the accuracy-related or fraud penalties.",
      "Reasonable cause relief applies when the taxpayer used ordinary business care and prudence but couldn't comply, for example because of a serious illness, death in the immediate family, a fire or disaster, or inability to get records. Penalties can also be removed when the taxpayer relied on incorrect written advice from the IRS.",
      "Relief can be requested by phone, by letter, or on Form 843. Interest on an abated penalty is removed too. Interest on the tax itself can be abated only in limited cases, such as an unreasonable IRS error or delay in a ministerial or managerial act.",
    ],
    keyPoint: "First-time abatement: FTF, FTP, FTD; no penalties in the prior 3 years, all returns filed, tax paid or arranged. Reasonable cause: ordinary business care and prudence (illness, death, disaster, no records). Ask by phone, letter or Form 843. Interest on tax abated only for IRS ministerial/managerial delay.",
  },
];

const lesson: Lesson = {
  id: "p3-fixing-past-returns",
  part: "part3",
  domainId: "p3d3",
  number: "3.3",
  episode: "Do-Over",
  title: "Fixing past returns",
  minutes: 13,
  lawAsOf: "rules in effect for 2026",
  intro: "Amended returns and refund claim deadlines, the late filing and late payment penalties, the accuracy-related and civil fraud penalties, and how to get penalties removed.",
  previously: "Penny won in Appeals. Inspired, Milo has decided to fix the past too. He has a cardboard box and a plan.",
  comic,
  cards,
  hook: {
    line: "5% to file late. ½% to pay late. 20% if wrong. 75% if fraud.",
    more: "Refund claim: 3 years from filing or 2 from paying. Abatement: first-time (clean 3 years) or reasonable cause, by phone, letter or Form 843.",
    alt: "Milo's time machine with a stamp that says abated.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7e3f3" />
        <TimeMachine x={70} y={112} scale={1.05} year="2023" />
        <Stamp x={210} y={64} text="ABATED" color="#1d7a49" size={22} />
      </svg>
    ),
  },
  traps: [
    { title: "Refund claims: 3 years from the due date, always", text: "It's the later of 3 years from filing or 2 years from paying, and early returns count as filed on the due date." },
    { title: "Late filing and late paying are the same", text: "Filing late costs 5% a month; paying late costs 0.5%. File on time even if you can't pay." },
    { title: "First-time abatement fixes any penalty", text: "It covers failure-to-file, failure-to-pay and failure-to-deposit penalties, not accuracy or fraud penalties." },
    { title: "The taxpayer must prove no fraud", text: "The IRS has to prove fraud, by clear and convincing evidence." },
  ],
  sources: [
    { key: "ftf", section: "Failure to file penalty" },
    { key: "accuracy", section: "Accuracy-related penalty" },
    { key: "i843", section: "Form 843 instructions" },
    { key: "i1040x", section: "Form 1040-X instructions" },
  ],
  cases: [
    {
      who: "Milo",
      title: "The forgotten deduction",
      facts: "Milo and Penny filed their 2023 return on March 1, 2024 and paid in full. It's now December 2026.",
      question: "What's the last day to claim a refund for 2023?",
      choices: ["March 1, 2027", "April 15, 2027", "April 15, 2026", "It's already too late"],
      answer: "April 15, 2027",
      why: "The claim is due 3 years after filing, and an early return counts as filed on the due date (April 15, 2024).",
    },
    {
      who: "Rosa",
      title: "The hospital months",
      facts: "Rosa filed her return exactly 3 months late, with no extension. She owed $2,000 on the due date and paid it all with the late return.",
      question: "Roughly what's the combined late filing and late payment penalty before relief?",
      choices: ["$30", "$300", "$500", "$100"],
      answer: "$300",
      why: "When both penalties apply in the same month, the combined rate is 5% a month: 3 months × 5% × $2,000 = $300.",
    },
    {
      who: "Ace",
      title: "Spotless record",
      facts: "Rosa has filed every return on time for 10 years and had no penalties. She paid the tax due.",
      question: "Which relief can she get without proving a reason?",
      choices: ["First-time abatement", "Interest abatement", "Innocent spouse relief", "None"],
      answer: "First-time abatement",
      why: "First-time abatement removes FTF, FTP and FTD penalties for one period if there were no penalties in the prior 3 years, all returns are filed and the tax is paid or arranged.",
    },
    {
      who: "Hoot",
      title: "Substantial?",
      facts: "A client reported $30,000 of tax. The correct tax was $40,000. No reasonable cause, no disclosure.",
      question: "What's the accuracy-related penalty?",
      choices: ["$0, it isn't substantial", "$4,000", "$7,500", "$2,000"],
      answer: "$2,000",
      why: "The $10,000 understatement is more than the larger of $4,000 (10% of $40,000) or $5,000, so it's substantial: 20% × $10,000 = $2,000.",
    },
    {
      who: "Penny",
      title: "Who has to prove it?",
      facts: "Hoot thinks a taxpayer hid income on purpose and wants to assert the civil fraud penalty.",
      question: "Which is true?",
      choices: ["The taxpayer must prove there was no fraud", "The penalty is 20%", "The IRS must prove fraud by clear and convincing evidence", "Only 3 years are open"],
      answer: "The IRS must prove fraud by clear and convincing evidence",
      why: "The civil fraud penalty is 75% of the fraudulent underpayment, and the IRS bears the burden of proving fraud by clear and convincing evidence.",
    },
  ],
  quizTopics: ["Late filing and payment", "Accuracy-related penalty", "Civil fraud penalty"],
  quizBrief: "Fixing past returns: 1040-X and refund claim deadlines, Form 843, late filing (5%) and late payment (0.5%) penalties, 20% accuracy penalty, 75% civil fraud penalty, first-time abatement",
};

export default lesson;

import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny } from "../cast";
import type { Lesson } from "../lesson";
import { Billboard, FilingCabinet, Laptop } from "../office";
import { Card, CARD, Confetti, HOOK, Mark, PANEL, Paper, Shoebox, Stamp, Step } from "../props";

// Part 3, topic 4.2 (season finale): accuracy, records and security: keeping return copies (§6107),
// due diligence for credits and head of household (Form 8867), written information security plans
// under the FTC Safeguards Rule, reporting data theft, and disclosure rules (§§7216 and 6713).
// Written to Publications 4557 and 5708, the Form 8867 instructions and the IRS §7216 pages as in
// effect for 2026.

const comic: Lesson["comic"] = [
  {
    alt: "Biscuit sits in an empty shoebox with paper scraps in his mouth. Milo clutches his head. Ace is calm.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Milo x={70} y={128} scale={0.76} mood="shocked" pose="up" />
        <Shoebox x={160} y={200} scale={0.9} labels={["", "", ""]} />
        <Biscuit x={160} y={170} scale={0.6} mood="happy" />
        <Paper x={134} y={176} label="2024" rotate={-20} scale={0.6} />
        <Paper x={192} y={178} label="W-2" rotate={18} scale={0.6} />
        <Ace x={256} y={128} scale={0.76} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "BISCUIT ATE THE RECORDS!", x: 3, y: 3, w: 36, tail: "down-left", shout: true },
      { who: "Ace", text: "Relax. A preparer keeps copies for 3 years. It's the law.", x: 54, y: 2, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Ace shows a laptop with a padlock. Milo stares at a thick binder labeled WISP.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" />
        <Ace x={70} y={128} scale={0.76} mood="happy" pose="point" />
        <Laptop x={150} y={172} scale={1} screen="🔒 MFA" />
        <Milo x={256} y={128} scale={0.76} mood="thinking" flip pose="hold" holding={<Paper x={0} y={-8} label="WISP" sub="42 pages" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Encrypted, backed up, two-step login. It's all in my written information security plan.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Milo", text: "You wrote a PLAN... for PAPERS?", x: 60, y: 6, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of the top drawer of Ace's filing cabinet. Ace points at him.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={84} y={128} scale={0.78} mood="stern" pose="point" />
        <Hoot x={246} y={70} scale={0.56} mood="excited" flip pose="up" />
        <FilingCabinet x={212} y={104} scale={0.86} open label="8867" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Form 8867 for Lulu's credits? Filed with the return, records kept 3 years. Top drawer. Which you're IN.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Hoot", text: "It's cozy.", x: 72, y: 4, w: 22, tail: "down-right" },
    ],
  },
  {
    alt: "Across the street, Rex's billboard: now with free hot tub offers! Penny holds a hot tub flyer. Ace is stern.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Billboard x={100} y={78} w={120} h={52} lines={["QUICK REFUND REX", "+ HOT TUB DEALS!"]} size={9} color="#fde2e4" />
        <Penny x={56} y={128} scale={0.72} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="HOT TUB" color="#d4ebfa" />} />
        <Ace x={264} y={128} scale={0.72} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Rex's clients all got hot tub ads. He SOLD their info!", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Ace", text: "Without written consent? That's a crime under section 7216. Plus $250 a disclosure.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu, hands on hips, lectures Biscuit. Biscuit looks guilty.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={70} y={128} scale={0.76} mood="thinking" />
        <Lulu x={190} y={160} scale={0.56} mood="stern" pose="point" />
        <Biscuit x={262} y={176} scale={0.66} mood="sad" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "If data is ever stolen, call the IRS Stakeholder Liaison fast. 500+ people? Tell the FTC too.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Lulu", text: "And Biscuit gets a no-paper diet.", x: 58, y: 4, w: 38, tail: "down-right" },
    ],
  },
  {
    alt: "Confetti. Hoot's file is stamped closed and he waves goodbye. Milo and Penny cheer. Biscuit bounces.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Confetti top={60} h={70} />
        <Hoot x={66} y={130} scale={0.62} mood="happy" pose="wave" />
        <Stamp x={130} y={112} text="CLOSED" color="#1d7a49" size={14} />
        <Penny x={200} y={128} scale={0.66} mood="excited" flip pose="up" />
        <Milo x={270} y={128} scale={0.66} mood="excited" flip pose="up" />
        <Biscuit x={140} y={180} scale={0.5} mood="excited" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "My audit file is CLOSED. Same time next year?", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Milo", text: "NO!!", x: 74, y: 8, w: 18, tail: "down-right", shout: true },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Copies and lists",
    alt: "A preparer gives the taxpayer a copy of the return and keeps a copy, or a list of names, ID numbers, years and return types, for 3 years.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={96} color="#d8f0e2" label="Copy" sub="to the taxpayer" />
        <Step x={166} y={14} w={140} h={96} color="#fff3c4" label="3 years" sub="copy or list, kept" />
        <Card x={14} y={120} w={292} h={48} lines={["List: name, TIN, tax year, type of return", "$50 per failure, up to $25,000 a period"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A paid preparer must give the taxpayer a complete copy of the return no later than when it's presented for signature, and must keep either a copy of each return or a list of each taxpayer's name, taxpayer identification number, tax year and type of return for 3 years after the close of the return period (§6107). A return period is the 12 months from July 1 to June 30.",
      "The penalty is $50 per failure, up to $25,000 per return period. A firm also keeps a record of the preparers it employs for 3 years (§6060). Under Circular 230, a practitioner must promptly return a client's records that are needed to comply with tax obligations when the client asks, even if there's a fee dispute.",
    ],
    keyPoint: "§6107: give the taxpayer a copy; keep a copy or a list (name, TIN, year, return type) for 3 years after the return period. $50 per failure, max $25,000 per period. §6060: list of preparers employed, 3 years. Cir. 230: return client records on request.",
  },
  {
    title: "Due diligence: Form 8867",
    alt: "For EITC, child tax credit and other dependents credit, the American opportunity credit and head of household status, a preparer meets four due diligence requirements and files Form 8867.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={56} y={84} label="8867" sub="checklist" scale={1.8} color="#fff" />
        <Card x={110} y={14} w={198} h={46} lines={["EITC · CTC/ACTC/ODC", "AOTC · head of household"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["Submit 8867 · compute", "· know · keep records"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["Records kept 3 years;", "penalty per failure"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Paid preparers have special due diligence duties for returns claiming the earned income credit, the child tax credit, additional child tax credit or credit for other dependents, the American opportunity tax credit, or head of household filing status.",
      "There are four requirements: complete and submit Form 8867 with the return; compute the credits (keep the worksheets); meet the knowledge requirement by asking follow-up questions when information seems incorrect, inconsistent or incomplete, and documenting the answers; and keep records for 3 years from the latest of the return's due date or filing date. Each failure carries an inflation-adjusted penalty, per credit or status.",
    ],
    keyPoint: "Form 8867 due diligence: EITC, CTC/ACTC/ODC, AOTC, HOH. Four requirements: submit 8867, compute (keep worksheets), knowledge (reasonable inquiries, documented), retain records 3 years. Inflation-adjusted penalty per failure.",
  },
  {
    title: "A written security plan",
    alt: "Tax preparers are financial institutions under the FTC Safeguards Rule, so they need a written information security plan with safeguards like multi-factor authentication and encryption.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Paper x={56} y={84} label="WISP" sub="required" scale={1.8} color="#fff3c4" />
        <Card x={110} y={14} w={198} h={46} lines={["FTC Safeguards Rule", "covers tax preparers"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["MFA, encryption,", "a qualified person in charge"]} size={10} color="#fff" />
        <Card x={110} y={118} w={198} h={46} lines={["Help: Pub 4557,", "Pub 5708 template"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "Under the Gramm-Leach-Bliley Act, tax return preparers are financial institutions, and the FTC Safeguards Rule requires them to have a written information security plan (WISP). The plan names a qualified individual to run it, assesses risks, and puts safeguards in place, including multi-factor authentication, encryption of customer data, access controls and staff training, then tests and updates them.",
      "The e-file application includes a pledge to have a data security plan. Publication 4557, Safeguarding Taxpayer Data, explains the rules, and Publication 5708 gives a template for a small practice.",
    ],
    keyPoint: "FTC Safeguards Rule (GLBA): tax preparers must keep a written information security plan: a qualified individual, risk assessment, MFA, encryption, access controls, training, testing. Guidance: Pub 4557; template: Pub 5708.",
  },
  {
    title: "When data is stolen",
    alt: "Report a data theft to the IRS Stakeholder Liaison right away, plus state agencies and law enforcement. If 500 or more people are affected, notify the FTC within 30 days.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={94} h={104} color="#fde2e4" label="IRS" sub="Stakeholder Liaison" />
        <Step x={113} y={14} w={94} h={104} color="#fff3c4" label="States" sub="and police" />
        <Step x={212} y={14} w={94} h={104} color="#e7e3f3" label="FTC" sub="500+ people" />
        <Label x={160} y={142} size={10} weight={700}>FTC notice within 30 days of discovery</Label>
        <Label x={160} y={160} size={10} weight={700}>when 500+ consumers are affected</Label>
      </svg>
    ),
    body: [
      "A preparer who discovers a data theft should contact the local IRS Stakeholder Liaison right away so the IRS can protect clients' accounts, and report to state tax agencies and law enforcement as needed. State breach notification laws may require telling clients.",
      "Under the FTC Safeguards Rule, a breach involving unencrypted information of 500 or more consumers must be reported to the FTC as soon as possible, and no later than 30 days after discovery.",
    ],
    keyPoint: "Data theft: report quickly to the IRS Stakeholder Liaison, state agencies and law enforcement. FTC notice within 30 days if 500+ consumers' unencrypted data is involved.",
  },
  {
    title: "Using and disclosing return information",
    alt: "Return information may be used or disclosed only with the client's written consent or under an exception. Criminal penalty under section 7216; civil penalty of $250 per disclosure, up to $10,000 a year, under section 6713.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={14} w={140} h={96} color="#fde2e4" label="§7216" sub="crime: $1,000 / 1 year" />
        <Step x={166} y={14} w={140} h={96} color="#fff3c4" label="§6713" sub="$250 each, $10,000/yr" />
        <Card x={14} y={120} w={292} h={48} lines={["Written, signed consent before you use", "or disclose, unless an exception applies"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A preparer may use or disclose a client's tax return information only to prepare the return or under another specific exception (for example, to the IRS, within the firm, or under a court order), or with the client's written, signed consent obtained before the use or disclosure. Consents follow format rules, and taxpayers can't be required to consent to get their return prepared.",
      "Knowingly or recklessly making an unauthorized disclosure or use is a misdemeanor under §7216 (up to $1,000 and one year in prison). The civil penalty under §6713 is $250 per disclosure, up to $10,000 a year (higher amounts apply for disclosures connected with identity theft).",
    ],
    keyPoint: "Return information: use or disclose only to prepare the return, under an exception, or with prior written signed consent. §7216 criminal: up to $1,000 and/or 1 year. §6713 civil: $250 per disclosure, max $10,000 per year.",
  },
];

const lesson: Lesson = {
  id: "p3-records-security",
  part: "part3",
  domainId: "p3d4",
  number: "4.2",
  episode: "Biscuit Ate the Records",
  title: "Accuracy, records and security",
  minutes: 13,
  lawAsOf: "rules in effect for 2026",
  intro: "The season finale: keeping return copies, due diligence for credits and head of household, written information security plans, what to do after a data theft, and when you may share a client's information.",
  previously: "The office laptop works, every return was accepted, and Hoot is finally packing up. But Biscuit has been eyeing the records box all week.",
  comic,
  cards,
  hook: {
    line: "Keep it 3 years. Lock it up. Share it only with consent.",
    more: "§6107 copy or list. Form 8867 for EITC, CTC, AOTC, HOH. A WISP for everyone. §7216 crime; §6713 $250 per disclosure, $10,000 a year.",
    alt: "A shoebox with a padlock and the number 3.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fde9e4" />
        <Shoebox x={80} y={104} scale={0.9} labels={["2023", "2024", "2025"]} />
        <Mark x={180} y={74} text="3" color="#1d7a49" size={44} />
        <Label x={256} y={56} size={13}>WISP</Label>
        <Label x={256} y={78} size={13}>§7216</Label>
      </svg>
    ),
  },
  traps: [
    { title: "Toss copies after the return is accepted", text: "Keep a copy or a list of returns for 3 years after the close of the return period." },
    { title: "Form 8867 is only for EITC", text: "It also covers the CTC/ACTC/ODC, the AOTC and head of household status." },
    { title: "Security plans are for big firms", text: "Every tax preparer needs a written information security plan under the FTC Safeguards Rule." },
    { title: "Selling a client list is just marketing", text: "Using or disclosing return information without written consent can be a crime under §7216." },
  ],
  sources: [
    { key: "i8867", section: "Paid preparer's due diligence" },
    { key: "p4557", section: "Safeguarding taxpayer data" },
    { key: "p5708", section: "Written information security plan" },
    { key: "s7216", section: "Section 7216 information center" },
  ],
  cases: [
    {
      who: "Ace",
      title: "The eaten records",
      facts: "Ace signed a client's 2025 Form 1040 as preparer in March 2026.",
      question: "Under §6107, until when must he keep a copy of the return or a list entry for it?",
      choices: ["Until it's accepted", "April 15, 2027", "June 30, 2029", "One year"],
      answer: "June 30, 2029",
      why: "A return period runs July 1 to June 30. A return signed in March 2026 falls in the period ending June 30, 2026, and the copy or list is kept for 3 years after that.",
    },
    {
      who: "Penny",
      title: "Head of household",
      facts: "Ace prepares a return claiming head of household status but no credits.",
      question: "Does he need to complete Form 8867?",
      choices: ["No, only for the EITC", "Only if the client asks", "Yes, head of household is covered", "Only for refunds over $5,000"],
      answer: "Yes, head of household is covered",
      why: "Form 8867 due diligence applies to the EITC, CTC/ACTC/ODC, AOTC and head of household filing status.",
    },
    {
      who: "Hoot",
      title: "Rex's hot tub deal",
      facts: "Rex shared 60 clients' names and refund amounts with a hot tub dealer, without consent, in one year. Assume only the civil penalty applies.",
      question: "What's the §6713 penalty?",
      choices: ["$15,000", "$10,000", "$250", "$1,000"],
      answer: "$10,000",
      why: "$250 per disclosure × 60 = $15,000, but the §6713 penalty is capped at $10,000 per year.",
    },
    {
      who: "Milo",
      title: "The stolen laptop",
      facts: "A preparer's unencrypted laptop with 800 clients' returns is stolen.",
      question: "What's required under the FTC Safeguards Rule?",
      choices: ["Nothing if the police are told", "Notify the FTC within 30 days of discovery", "Only tell the IRS next filing season", "Notify the FTC within 1 year"],
      answer: "Notify the FTC within 30 days of discovery",
      why: "A breach of 500 or more consumers' unencrypted information must be reported to the FTC within 30 days. The preparer should also contact the IRS Stakeholder Liaison right away.",
    },
    {
      who: "Lulu",
      title: "The security plan",
      facts: "Ace runs a one-person practice from the room above Rosa's Rolls.",
      question: "Does he need a written information security plan?",
      choices: ["No, only big firms", "Only if he e-files over 100 returns", "Only if he has employees", "Yes, the FTC Safeguards Rule applies"],
      answer: "Yes, the FTC Safeguards Rule applies",
      why: "Tax preparers of any size are financial institutions under the Safeguards Rule and must keep a written information security plan.",
    },
  ],
  quizTopics: ["Preparer due diligence", "Preparer records", "Disclosure of return information", "Data security"],
  quizBrief: "Records and security: §6107 copies or lists for 3 years, Form 8867 due diligence (EITC, CTC, AOTC, HOH), WISP under the FTC Safeguards Rule, data theft reporting, §7216 and §6713",
};

export default lesson;

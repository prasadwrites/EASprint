import { Ace, Backdrop, Hoot, Hourglass, Label, Lulu, Milo, Penny, VideoCall } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 3, topic 2.3: deadlines and protections: the assessment and collection statutes of limitations,
// the Taxpayer Bill of Rights, the Taxpayer Advocate Service, and identity theft. Written to the IRS
// statute pages, Publication 1 and Publication 594 as in effect for 2026.

const comic: Lesson["comic"] = [
  {
    alt: "Hoot proudly holds up an hourglass. Penny and Milo look at each other in alarm.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Penny x={60} y={128} scale={0.72} mood="shocked" />
        <Milo x={140} y={128} scale={0.72} mood="shocked" />
        <Hoot x={250} y={130} scale={0.68} mood="smug" flip pose="up" />
        <Hourglass x={210} y={98} scale={0.7} sand={0.2} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "So, um... how long are you staying?", x: 6, y: 6, w: 40, tail: "down" },
      { who: "Hoot", text: "THREE YEARS to assess more tax on your 2025 return!", x: 52, y: 2, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Ace counts on three fingers. Hoot nods with enthusiasm at the last one.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="point" />
        <Card x={130} y={100} w={70} h={60} lines={["3 yrs", "6 yrs", "∞"]} size={10} color="#fff" />
        <Hoot x={250} y={130} scale={0.68} mood="excited" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Three years from filing. Six if income is understated by more than 25%. Forever for fraud or no return.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Hoot", text: "Forever is my favorite number.", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot unrolls a calendar labeled ten years. Milo has fallen to his knees.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Hoot x={80} y={130} scale={0.7} mood="smug" pose="hold" />
        <Calendar x={140} y={110} month="CSED" day="10" scale={0.8} color="#a8321f" />
        <Milo x={250} y={140} scale={0.7} mood="worried" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "And once tax is assessed, I get TEN YEARS to collect it!", x: 3, y: 2, w: 42, tail: "down-left", shout: true },
      { who: "Milo", text: "He's going to be at Lulu's wedding.", x: 58, y: 4, w: 39, tail: "down-right" },
    ],
  },
  {
    alt: "Dee on a video call holds a letter saying someone already filed as her. Ace holds Form 14039.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <VideoCall x={20} y={92} scale={1} mood="shocked" pose="up" bars={2} />
        <Ace x={240} y={128} scale={0.78} mood="stern" flip pose="hold" holding={<Paper x={0} y={-8} label="14039" sub="ID theft" color="#fde2e4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "The IRS says I already filed my return. From... the MOON?", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Ace", text: "Identity theft, Dee. Form 14039, then an IP PIN every year.", x: 56, y: 2, w: 41, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a paper reading Form 911. Hoot, sheepish, holds a box labeled misfiled.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={60} y={128} scale={0.72} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="911" sub="TAS" color="#d8f0e2" />} />
        <Ace x={160} y={128} scale={0.72} mood="happy" />
        <Hoot x={266} y={130} scale={0.62} mood="worried" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "The IRS lost our papers THREE times!", x: 3, y: 3, w: 32, tail: "down-left" },
      { who: "Ace", text: "Then Form 911 to the Taxpayer Advocate. They step in when the system isn't working.", x: 34, y: 2, w: 36, tail: "down" },
      { who: "Hoot", text: "I didn't LOSE them. I misfiled them. Creatively.", x: 72, y: 2, w: 26, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu reads from a long scroll titled Taxpayer Bill of Rights. Hoot raises a wing.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Lulu x={84} y={160} scale={0.56} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="RIGHTS" sub="10 of them" color="#fff3c4" />} />
        <Hoot x={236} y={130} scale={0.7} mood="thinking" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "Ten rights! To be informed, to challenge the IRS, to appeal, to privacy...", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Hoot", text: "Is there a right to cookies?", x: 58, y: 4, w: 30, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "How long the IRS has to assess",
    alt: "Three clocks: 3 years after the return is filed, 6 years if more than 25% of gross income was left off, and no limit for fraud or no return.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={14} w={94} h={100} color="#d8f0e2" label="3 years" sub="normal" />
        <Step x={113} y={14} w={94} h={100} color="#fff3c4" label="6 years" sub="> 25% omitted" />
        <Step x={212} y={14} w={94} h={100} color="#fde2e4" label="No limit" sub="fraud, no return" />
        <Label x={160} y={140} size={10} weight={700}>Early returns count as filed on the due date</Label>
        <Label x={160} y={160} size={10} weight={700}>Extend only by agreement (Form 872)</Label>
      </svg>
    ),
    body: [
      "The IRS generally has 3 years after a return is filed to assess more tax. A return filed before its due date is treated as filed on the due date. The period is 6 years if the taxpayer omitted more than 25% of the gross income shown on the return (or more than $5,000 of income from specified foreign financial assets).",
      "There's no time limit for a false or fraudulent return, a willful attempt to evade tax, or no return at all. The period can be extended only by written agreement (Form 872), which the taxpayer can refuse or limit to certain issues.",
    ],
    keyPoint: "Assessment statute: 3 years after filing (early returns = filed on the due date); 6 years for > 25% omission of gross income; unlimited for fraud, evasion or no return. Extended only by agreement (Form 872), which can be limited or refused.",
  },
  {
    title: "How long the IRS has to collect",
    alt: "A ten-year calendar starting at assessment, the collection statute expiration date. Some events pause it: an offer in compromise pending, a collection due process hearing, bankruptcy, or the taxpayer living abroad.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Calendar x={70} y={70} month="CSED" day="10" scale={1} color="#a8321f" />
        <Label x={70} y={140} size={11}>10 years from</Label>
        <Label x={70} y={156} size={11}>assessment</Label>
        <Card x={140} y={14} w={168} h={150} color="#fff">
          <Label x={224} y={36} size={11}>The clock pauses for:</Label>
          <Label x={224} y={62} size={10} weight={700}>an offer in compromise</Label>
          <Label x={224} y={80} size={10} weight={700}>a CDP hearing</Label>
          <Label x={224} y={98} size={10} weight={700}>bankruptcy</Label>
          <Label x={224} y={116} size={10} weight={700}>6+ months abroad</Label>
          <Label x={224} y={134} size={10} weight={700}>a pending installment</Label>
          <Label x={224} y={150} size={10} weight={700}>agreement request</Label>
        </Card>
      </svg>
    ),
    body: [
      "After tax is assessed, the IRS generally has 10 years to collect it. The end of that period is the collection statute expiration date (CSED).",
      "The 10 years are suspended while certain things are pending, such as an offer in compromise, a request for an installment agreement, a collection due process hearing, a bankruptcy case, or while the taxpayer lives outside the U.S. for 6 months or more.",
    ],
    keyPoint: "Collection statute: 10 years from assessment (the CSED), suspended during a pending offer in compromise or installment agreement request, a CDP hearing, bankruptcy, or 6+ continuous months outside the U.S.",
  },
  {
    title: "The Taxpayer Bill of Rights",
    alt: "Ten rights on a scroll: to be informed, quality service, pay no more than the correct amount, challenge the IRS and be heard, appeal, finality, privacy, confidentiality, retain representation, and a fair and just tax system.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Card x={14} y={10} w={292} h={160} color="#fff">
          <Label x={90} y={32} size={10} weight={700}>1 Be informed</Label>
          <Label x={90} y={54} size={10} weight={700}>2 Quality service</Label>
          <Label x={90} y={76} size={10} weight={700}>3 Pay no more than due</Label>
          <Label x={90} y={98} size={10} weight={700}>4 Challenge, be heard</Label>
          <Label x={90} y={120} size={10} weight={700}>5 Appeal</Label>
          <Label x={232} y={32} size={10} weight={700}>6 Finality</Label>
          <Label x={232} y={54} size={10} weight={700}>7 Privacy</Label>
          <Label x={232} y={76} size={10} weight={700}>8 Confidentiality</Label>
          <Label x={232} y={98} size={10} weight={700}>9 Keep representation</Label>
          <Label x={232} y={120} size={10} weight={700}>10 Fair, just system</Label>
          <Label x={160} y={152} size={10}>Publication 1</Label>
        </Card>
      </svg>
    ),
    body: [
      "The Taxpayer Bill of Rights (Publication 1) lists ten rights: to be informed, to quality service, to pay no more than the correct amount of tax, to challenge the IRS's position and be heard, to appeal an IRS decision in an independent forum, to finality, to privacy, to confidentiality, to retain representation, and to a fair and just tax system.",
      "The IRS gives Publication 1 to taxpayers at the start of an exam and with many collection notices.",
    ],
    keyPoint: "Taxpayer Bill of Rights (Pub 1), 10 rights: informed, quality service, pay no more than correct tax, challenge and be heard, appeal in an independent forum, finality, privacy, confidentiality, retain representation, fair and just tax system.",
  },
  {
    title: "The Taxpayer Advocate Service",
    alt: "TAS, an independent organization inside the IRS, helps for free when a problem causes financial hardship or normal IRS channels haven't worked. Ask with Form 911.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Paper x={56} y={80} label="911" sub="TAS" scale={1.8} color="#d8f0e2" />
        <Card x={110} y={14} w={198} h={46} lines={["Independent, inside", "the IRS; free"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["Financial hardship, or", "the system isn't working"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["Local advocate in", "every state"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "The Taxpayer Advocate Service is an independent organization within the IRS, led by the National Taxpayer Advocate, that helps taxpayers for free. It steps in when a tax problem is causing financial difficulty or significant cost, when the taxpayer faces an immediate threat of adverse action, or when they've tried the normal IRS channels and nothing has worked.",
      "Taxpayers or their representatives ask for help on Form 911 (or by calling). TAS has local advocates in every state. Low Income Taxpayer Clinics, which are independent of the IRS, can also help eligible taxpayers.",
    ],
    keyPoint: "TAS: independent organization within the IRS, free; helps with financial hardship, threatened adverse action, or when normal channels failed. Request with Form 911. LITCs are separate and independent.",
  },
  {
    title: "Identity theft",
    alt: "A fake return filed with a stolen SSN. The victim files Form 14039 (or follows the letter's instructions) and gets an IP PIN, a six-digit number that changes every year.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={84} color="#fde2e4" label="14039" sub="identity theft affidavit" />
        <Step x={166} y={14} w={140} h={84} color="#d8f0e2" label="IP PIN" sub="6 digits, new each year" />
        <Card x={14} y={110} w={292} h={56} lines={["Got a 5071C-type letter? Verify identity as", "it says; then file Form 14039 if needed"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "When someone uses a taxpayer's SSN to file a return, the taxpayer's own e-filed return is often rejected as a duplicate. A victim who hasn't received an IRS identity-verification letter files Form 14039, Identity Theft Affidavit, and keeps filing (on paper if needed). If the IRS sent a letter asking to verify identity, the taxpayer follows the letter's instructions.",
      "Anyone who can verify their identity can get an Identity Protection PIN (IP PIN), a six-digit number that's required on their return and changes every year.",
    ],
    keyPoint: "Identity theft: Form 14039 (unless responding to an IRS identity-verification letter); keep filing, on paper if rejected. IP PIN: six digits, new every year, available to anyone who verifies their identity.",
  },
];

const lesson: Lesson = {
  id: "p3-deadlines-protections",
  part: "part3",
  domainId: "p3d2",
  number: "2.3",
  episode: "Ten Years of Hoot",
  title: "Deadlines and protections",
  minutes: 12,
  lawAsOf: "rules in effect for 2026",
  intro: "How long the IRS has to assess and to collect, what pauses the clock, the Taxpayer Bill of Rights, the Taxpayer Advocate Service, and what to do about identity theft.",
  previously: "Ace has the shoebox sorted by issue. Meanwhile Hoot has found a new toy, and it's an hourglass.",
  comic,
  cards,
  hook: {
    line: "3 years to assess. 10 years to collect.",
    more: "6 years if more than 25% of income is missing. Forever for fraud or no return. TAS: Form 911. ID theft: Form 14039.",
    alt: "Hoot's hourglass beside the numbers 3 and 10.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7e3f3" />
        <Hourglass x={60} y={60} scale={0.9} sand={0.5} />
        <Mark x={150} y={74} text="3" color="#1d7a49" size={40} />
        <Mark x={240} y={74} text="10" color="#a8321f" size={40} />
      </svg>
    ),
  },
  traps: [
    { title: "Filing early starts the clock early", text: "A return filed before its due date is treated as filed on the due date." },
    { title: "The 6-year rule for any error", text: "It applies when more than 25% of the gross income shown on the return was omitted (not to overstated deductions)." },
    { title: "10 years from filing", text: "The 10-year collection period runs from assessment, and pauses for things like a pending offer or bankruptcy." },
    { title: "TAS works for the auditor", text: "TAS is an independent organization within the IRS that advocates for taxpayers." },
  ],
  sources: [
    { key: "assess", section: "Time IRS can assess tax" },
    { key: "collect", section: "Time IRS can collect tax" },
    { key: "p1", section: "The Taxpayer Bill of Rights" },
    { key: "tas", section: "Taxpayer Advocate Service" },
    { key: "idtheft", section: "Identity theft central" },
  ],
  cases: [
    {
      who: "Penny",
      title: "Filed early",
      facts: "Penny and Milo filed their 2025 return on February 20, 2026. The due date was April 15, 2026. No fraud, and no big omissions.",
      question: "When does the IRS's time to assess more tax generally end?",
      choices: ["February 20, 2029", "April 15, 2029", "April 15, 2032", "Never"],
      answer: "April 15, 2029",
      why: "A return filed early is treated as filed on its due date, and the normal assessment period is 3 years from then.",
    },
    {
      who: "Hoot",
      title: "The big omission",
      facts: "A taxpayer reported $60,000 of gross income but left off $20,000 more (33% of what was reported). No fraud.",
      question: "How long does the IRS have to assess?",
      choices: ["3 years", "10 years", "No limit", "6 years"],
      answer: "6 years",
      why: "Omitting more than 25% of the gross income shown on the return extends the assessment period to 6 years.",
    },
    {
      who: "Milo",
      title: "Ten years of what?",
      facts: "The IRS assessed additional tax against Milo on June 1, 2026. Nothing has paused the clock.",
      question: "When does the collection period end?",
      choices: ["June 1, 2036", "June 1, 2029", "April 15, 2036", "Never"],
      answer: "June 1, 2036",
      why: "The IRS generally has 10 years from the date of assessment to collect.",
    },
    {
      who: "Dee",
      title: "The moon return",
      facts: "Dee's e-filed return was rejected because someone already filed using her SSN. She hasn't received any IRS identity-verification letter.",
      question: "What should she do?",
      choices: ["Wait for next year", "File Form 911 only", "File Form 14039 and file her return on paper", "File Form 8821"],
      answer: "File Form 14039 and file her return on paper",
      why: "A victim without an IRS verification letter files Form 14039, Identity Theft Affidavit, and keeps filing, on paper if the e-file is rejected.",
    },
    {
      who: "Ace",
      title: "When the system fails",
      facts: "A client's refund has been stuck for months, the normal channels haven't worked, and she's behind on rent.",
      question: "Where can Ace ask for help, and how?",
      choices: ["The Taxpayer Advocate Service, with Form 911", "Appeals, with Form 12153", "The Office of Professional Responsibility", "Tax Court"],
      answer: "The Taxpayer Advocate Service, with Form 911",
      why: "TAS helps when a tax problem is causing financial hardship or normal channels have failed. Form 911 requests its help.",
    },
  ],
  quizTopics: ["Assessment period", "Collection period", "Taxpayer rights"],
  quizBrief: "Deadlines and protections: assessment statute (3 years, 6 for >25% omission, unlimited for fraud/no return), Form 872, 10-year collection statute, Taxpayer Bill of Rights, TAS (Form 911), ID theft",
};

export default lesson;

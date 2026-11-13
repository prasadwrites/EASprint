import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny, VideoCall } from "../cast";
import type { Lesson } from "../lesson";
import { Laptop } from "../office";
import { Card, CARD, Confetti, HOOK, Mark, PANEL, Paper, Shoebox, Step } from "../props";

// Part 3, topic 4.1: e-file rules: becoming an authorized e-file provider (EFIN), ERO duties,
// Forms 8879 and 8453, the e-file requirement for preparers and Form 8948, rejected returns, and
// PTINs. Written to Publication 1345 and the IRS e-file requirement and PTIN pages as in effect for 2026.

const comic: Lesson["comic"] = [
  {
    alt: "Ace proudly unboxes a laptop. Milo wears a cardboard sign reading e-file mascot.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" />
        <Ace x={70} y={128} scale={0.78} mood="excited" pose="up" />
        <Laptop x={156} y={172} scale={1} screen="HELLO" />
        <Milo x={256} y={128} scale={0.78} mood="excited" flip pose="hold" holding={<Paper x={0} y={-8} label="e-FILE" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Okafor Tax Defense is going ELECTRONIC!", x: 3, y: 3, w: 38, tail: "down-left", shout: true },
      { who: "Milo", text: "And I'm the official e-file mascot. I made a sign.", x: 54, y: 2, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Ace shows his enrolled agent card. Hoot holds an ink pad hopefully.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={84} y={128} scale={0.78} mood="smug" pose="hold" holding={<Paper x={0} y={-8} label="EA" sub="card" color="#d8f0e2" />} />
        <Hoot x={246} y={130} scale={0.7} mood="excited" flip pose="up" />
        <Paper x={190} y={150} label="INK" sub="pad" color="#2a2f3a" ink="#fff" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Step one: an EFIN. Apply online, pass the suitability check. EAs just show their credentials.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Hoot", text: "So... no fingerprints? I brought ink.", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Penny signs Form 8879 at the desk. Milo leans in offering a pen and his best Penny impression.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={70} y={128} scale={0.74} mood="stern" pose="hold" holding={<Paper x={0} y={-8} label="8879" sub="signed" color="#fff" />} />
        <Ace x={170} y={128} scale={0.72} mood="happy" flip pose="point" />
        <Milo x={264} y={128} scale={0.72} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Signed.", x: 3, y: 8, w: 18, tail: "down-left" },
      { who: "Ace", text: "Form 8879, signed BEFORE I transmit. I keep it 3 years.", x: 24, y: 2, w: 40, tail: "down" },
      { who: "Milo", text: "Next time I can sign for you. I do a GREAT Penny.", x: 68, y: 2, w: 30, tail: "down-right" },
    ],
  },
  {
    alt: "The laptop flashes rejected in red. Milo faints dramatically. Ace stays calm.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Ace x={70} y={128} scale={0.78} mood="thinking" />
        <Laptop x={164} y={172} scale={1.1} screen="REJECTED" color="#fde2e4" size={9} />
        <Milo x={266} y={150} scale={0.68} mood="shocked" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Rejected! Tell the client within 24 hours. Fix it within 5 days and it's still on time.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Milo", text: "The mascot is fainting.", x: 64, y: 4, w: 33, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Dee on a video call from the oil rig waves a paper return. Ace holds Form 8948.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <VideoCall x={20} y={92} scale={1} mood="happy" pose="up" bars={2} />
        <Ace x={240} y={128} scale={0.78} mood="thinking" flip pose="hold" holding={<Paper x={0} y={-8} label="8948" sub="paper" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "I want PAPER. Paper smells like freedom.", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "I file 11+ returns, so I must e-file. But if you choose paper, I attach Form 8948.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Confetti! The laptop says accepted. Hoot nods grudgingly. Lulu points at Biscuit, who is sniffing a box of records.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Confetti top={60} h={80} />
        <Laptop x={70} y={172} scale={1} screen="ACCEPTED" color="#d8f0e2" size={9} />
        <Hoot x={140} y={130} scale={0.62} mood="smug" />
        <Lulu x={200} y={160} scale={0.5} mood="worried" pose="point" />
        <Shoebox x={284} y={196} scale={0.85} labels={["2023", "2024", "2025"]} />
        <Biscuit x={250} y={184} scale={0.6} mood="excited" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Accepted. I... accept it.", x: 22, y: 4, w: 30, tail: "down" },
      { who: "Lulu", text: "Um. Biscuit is looking at the RECORDS.", x: 58, y: 2, w: 40, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Becoming an e-file provider",
    alt: "Apply online through IRS e-Services for an EFIN. The IRS runs a suitability check. Enrolled agents, CPAs and attorneys show credentials instead of fingerprints.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Step x={14} y={14} w={94} h={104} color="#fff" label="Apply" sub="IRS e-Services" />
        <Step x={113} y={14} w={94} h={104} color="#fff3c4" label="Check" sub="suitability" />
        <Step x={212} y={14} w={94} h={104} color="#d8f0e2" label="EFIN" sub="you're in" />
        <Label x={160} y={142} size={10} weight={700}>EAs, CPAs and attorneys: credentials,</Label>
        <Label x={160} y={160} size={10} weight={700}>not fingerprints</Label>
      </svg>
    ),
    body: [
      "To e-file returns for others, a firm applies online through IRS e-Services to become an Authorized IRS e-file Provider and receives an electronic filing identification number (EFIN). Each principal and responsible official is checked for suitability: tax compliance, criminal background and prior non-compliance with e-file rules.",
      "Principals and responsible officials submit fingerprints unless they're an enrolled agent, CPA, attorney, or other professional who provides current professional credentials instead.",
      "Provider roles include the electronic return originator (ERO), who starts the electronic submission of a return for a taxpayer; the transmitter; the software developer; and the intermediate service provider. Providers must update their application within 30 days of changes, such as a new address.",
    ],
    keyPoint: "E-file provider: online application in IRS e-Services → suitability check → EFIN. EAs, CPAs and attorneys give credentials instead of fingerprints. Roles: ERO, transmitter, software developer, intermediate service provider. Update the application within 30 days of changes.",
  },
  {
    title: "Signatures: Forms 8879 and 8453",
    alt: "Form 8879 authorizes the ERO to enter the taxpayer's PIN; it's signed before transmission and kept for 3 years. Form 8453 sends required paper documents.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Paper x={56} y={84} label="8879" sub="keep 3 yrs" scale={1.8} color="#fff" />
        <Card x={110} y={14} w={198} h={46} lines={["Signed by the taxpayer", "BEFORE transmission"]} size={10} color="#d8f0e2" />
        <Card x={110} y={66} w={198} h={46} lines={["ERO keeps it 3 years;", "don't send unless asked"]} size={10} color="#fff" />
        <Card x={110} y={118} w={198} h={46} lines={["Form 8453: paper", "documents to the IRS"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "E-filed returns are signed with a PIN. With Form 8879, IRS e-file Signature Authorization, the taxpayer authorizes the ERO to enter or generate the taxpayer's PIN. The taxpayer must review the return and sign Form 8879 before the ERO transmits it.",
      "The ERO keeps Form 8879 for 3 years from the return's due date or the date the IRS received it, whichever is later, and doesn't send it to the IRS unless asked. Form 8453 is used to send certain required paper documents (for example, some appraisals or statements) that can't be attached electronically.",
    ],
    keyPoint: "Form 8879: taxpayer signs before transmission; ERO keeps it 3 years from the later of the due date or IRS receipt; not sent unless requested. Form 8453: transmits required paper documents.",
  },
  {
    title: "Who must e-file",
    alt: "A preparer who reasonably expects to file 11 or more individual or trust returns in a year must e-file them, unless the client chooses paper and Form 8948 is attached.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Mark x={70} y={92} text="11+" color="#1d7a49" size={48} />
        <Card x={140} y={14} w={168} h={70} lines={["Must e-file individual", "and trust returns"]} size={10} color="#fff" />
        <Card x={140} y={92} w={168} h={76} lines={["Client chooses paper:", "attach Form 8948,", "keep the client's choice"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "A specified tax return preparer who reasonably expects to file 11 or more individual income tax returns (Forms 1040 and 1041 count) in a calendar year must e-file them. Members of a firm count the firm's returns together.",
      "Exceptions include a taxpayer who chooses to file on paper (the preparer gets and keeps a signed or dated statement of that choice), returns the IRS can't accept electronically, and an approved hardship waiver (Form 8944). Paper returns prepared by a specified preparer include Form 8948 explaining why.",
    ],
    keyPoint: "Preparers reasonably expecting 11+ individual/trust returns a year must e-file (firm-wide count). Exceptions: taxpayer choice (keep the statement), returns that can't be e-filed, hardship waiver (Form 8944). Paper returns: attach Form 8948.",
  },
  {
    title: "Rejected returns",
    alt: "When a return is rejected, tell the taxpayer within 24 hours. Fix and resend within 5 calendar days (or 10 on paper) and it counts as on time.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={94} h={104} color="#fde2e4" label="24 hrs" sub="tell the client" />
        <Step x={113} y={14} w={94} h={104} color="#fff3c4" label="5 days" sub="fix and resend" />
        <Step x={212} y={14} w={94} h={104} color="#e7e3f3" label="10 days" sub="on paper instead" />
        <Label x={160} y={142} size={10} weight={700}>Resent in the window? It counts as filed</Label>
        <Label x={160} y={160} size={10} weight={700}>when first transmitted</Label>
      </svg>
    ),
    body: [
      "If the IRS rejects an electronic return, the ERO must tell the taxpayer within 24 hours, with the reject code and an explanation. If the problem can be fixed, the ERO corrects and retransmits the return. If the taxpayer chooses not to fix it electronically, the ERO tells them they must file on paper.",
      "A return first transmitted on time is still treated as timely if it's accepted after being retransmitted within the 5-calendar-day perfection period, or if a paper return is filed within 10 calendar days of the rejection with an explanation and the rejection notice. Changes after the taxpayer signed may require a new Form 8879.",
    ],
    keyPoint: "Reject: notify the taxpayer within 24 hours (reject code + explanation). Perfection period: retransmit within 5 calendar days, or file on paper within 10 calendar days with an explanation, and it's treated as timely.",
  },
  {
    title: "PTINs",
    alt: "Anyone paid to prepare federal returns needs a PTIN, renewed every year, and must put it on every return they sign.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Paper x={56} y={84} label="PTIN" sub="P + 8 digits" scale={1.8} color="#fff" />
        <Card x={110} y={14} w={198} h={46} lines={["Anyone paid to prepare", "(EAs too)"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["Renew every year;", "expires December 31"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["On every return", "you sign as preparer"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "Anyone who prepares, or substantially helps prepare, a federal tax return for compensation must have a preparer tax identification number (PTIN), including enrolled agents, CPAs and attorneys. PTINs are obtained online and renewed every year (they expire December 31), with a fee.",
      "The preparer enters the PTIN on every return they sign. A PTIN isn't the same as an EFIN: the PTIN identifies the person preparing, while the EFIN identifies the firm that's authorized to e-file.",
    ],
    keyPoint: "PTIN: required for anyone paid to prepare or substantially help prepare federal returns (EAs, CPAs, attorneys too); renewed annually (expires Dec 31), with a fee; entered on every return signed. PTIN = person; EFIN = e-file firm.",
  },
];

const lesson: Lesson = {
  id: "p3-efile-rules",
  part: "part3",
  domainId: "p3d4",
  number: "4.1",
  episode: "The E-File Gauntlet",
  title: "E-file rules",
  minutes: 12,
  lawAsOf: "rules in effect for 2026",
  intro: "Getting an EFIN, what an electronic return originator must do, Forms 8879 and 8453, who has to e-file, what happens when a return is rejected, and PTINs.",
  previously: "Rosa's payroll is back on track and the oven is fixed. Ace has spent his rolls budget on a laptop.",
  comic,
  cards,
  hook: {
    line: "Sign first. Send second. Reject? 24 hours, then 5 days.",
    more: "EFIN for the firm, PTIN for the person. 8879 kept 3 years. 11+ returns: must e-file, or 8948 if the client picks paper.",
    alt: "A laptop showing accepted, beside the numbers 24 and 5.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#d4ebfa" />
        <Laptop x={70} y={104} scale={1} screen="ACCEPTED" color="#d8f0e2" size={9} />
        <Mark x={170} y={74} text="24h" color="#a8321f" size={32} />
        <Mark x={256} y={74} text="5d" color="#1d7a49" size={32} />
      </svg>
    ),
  },
  traps: [
    { title: "8879 after transmission", text: "The taxpayer signs Form 8879 before the ERO transmits the return." },
    { title: "Send 8879 to the IRS", text: "The ERO keeps it for 3 years and sends it only if the IRS asks." },
    { title: "EAs need fingerprints for an EFIN", text: "EAs, CPAs and attorneys provide professional credentials instead." },
    { title: "Rejected means late", text: "Fixed and retransmitted within 5 calendar days (or on paper within 10), it's still timely." },
  ],
  sources: [
    { key: "p1345", section: "ERO responsibilities, signatures, rejects" },
    { key: "efilemandate", section: "E-file requirement for preparers" },
    { key: "ptin", section: "PTIN requirements" },
  ],
  cases: [
    {
      who: "Penny",
      title: "When to sign",
      facts: "Ace finishes Penny and Milo's return at 9 p.m. and wants to transmit it before they come in to review it.",
      question: "What's required?",
      choices: ["Transmit now, sign later", "Only Ace's PIN", "Penny and Milo sign Form 8879 before he transmits", "Form 8453 for both"],
      answer: "Penny and Milo sign Form 8879 before he transmits",
      why: "Taxpayers must review the return and sign Form 8879 before the ERO transmits it.",
    },
    {
      who: "Ace",
      title: "Keeping the 8879",
      facts: "Ace transmitted a 2025 return on March 10, 2026. It was accepted the same day. The due date was April 15, 2026.",
      question: "How long must he keep Form 8879?",
      choices: ["Until April 15, 2029", "Until March 10, 2029", "1 year", "He mails it to the IRS"],
      answer: "Until April 15, 2029",
      why: "The ERO keeps Form 8879 for 3 years from the later of the return's due date or the date the IRS received it.",
    },
    {
      who: "Milo",
      title: "The reject",
      facts: "A client's timely transmitted return is rejected on April 15 for a mistyped SSN.",
      question: "What must Ace do to keep it timely?",
      choices: ["Nothing, it's already late", "Mail a paper return by May 15", "File for an extension", "Tell the client within 24 hours and retransmit within 5 days"],
      answer: "Tell the client within 24 hours and retransmit within 5 days",
      why: "The ERO notifies the taxpayer within 24 hours. A corrected return retransmitted within the 5-day perfection period is treated as timely.",
    },
    {
      who: "Dee",
      title: "Paper, please",
      facts: "Ace expects to file 300 individual returns this year. Dee insists on a paper return and signs a statement saying so.",
      question: "What does Ace do?",
      choices: ["Refuse: he must e-file", "Paper return with Form 8948 attached", "Paper return, nothing else", "File Form 8944 for Dee"],
      answer: "Paper return with Form 8948 attached",
      why: "A taxpayer can choose paper. The specified preparer keeps the client's statement and attaches Form 8948 to the paper return.",
    },
    {
      who: "Hoot",
      title: "Two numbers",
      facts: "Ace's firm just hired a preparer who has a current PTIN. The firm hasn't applied for an EFIN yet.",
      question: "What can't the firm do yet?",
      choices: ["Prepare returns for pay", "Transmit returns electronically", "Sign returns as preparer", "Renew the PTIN"],
      answer: "Transmit returns electronically",
      why: "A PTIN lets a person prepare returns for pay; e-filing for clients needs an EFIN from the e-file application.",
    },
  ],
  quizTopics: ["E-file requirement", "E-file signature authorization", "PTIN"],
  quizBrief: "E-file rules: EFIN and suitability, ERO duties, Form 8879 signed before transmission and kept 3 years, Form 8453, 11-return e-file rule and Form 8948, rejects (24 hours, 5 days), PTINs",
};

export default lesson;

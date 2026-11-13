import { Ace, Backdrop, Hoot, Label, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Billboard } from "../office";
import { Card, CARD, Envelope, HOOK, Mark, PANEL, Paper, Stamp, Step } from "../props";

// Part 3, topic 1.2: Circular 230 conduct: fees and contingent fees, advertising, conflicts of interest,
// advising clients of errors, returning client records, refund checks and due diligence. Written to
// Circular 230 (subpart B) and Publication 947 as in effect for 2026.

const comic: Lesson["comic"] = [
  {
    alt: "Milo unveils a giant billboard: IRS-certified Ace! We beat Hoot or it's free! Ace looks horrified.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" floor="#bfe3a8" />
        <Billboard x={92} y={82} w={150} h={58} lines={["IRS-CERTIFIED ACE!", "WE BEAT HOOT", "OR IT'S FREE!"]} size={10} />
        <Milo x={50} y={130} scale={0.66} mood="excited" pose="up" />
        <Ace x={282} y={132} scale={0.62} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Marketing! I spent our whole budget. It was $40.", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Ace", text: "Milo, that billboard breaks TWO rules.", x: 62, y: 3, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at the word certified crossed out, replaced with enrolled to practice before the IRS.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" floor="#bfe3a8" />
        <Ace x={70} y={128} scale={0.74} mood="stern" pose="point" />
        <Card x={130} y={84} w={170} h={60} color="#fff3c4">
          <Label x={215} y={106} size={11} color="#a8321f">IRS-CERTIFIED</Label>
          <path d="M150,102 H280" stroke="#a8321f" strokeWidth={3} />
          <Label x={215} y={128} size={9}>Enrolled to practice before the IRS</Label>
        </Card>
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "One: I'm not “certified” by the IRS. I'm “enrolled to practice before the IRS.” Two: no “free if we lose” fees on a regular return.", x: 3, y: 2, w: 70, tail: "down-left" },
    ],
  },
  {
    alt: "Hoot pops up from behind the billboard holding a stopwatch reading 36 months.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" floor="#bfe3a8" />
        <Hoot x={190} y={60} scale={0.56} mood="smug" pose="point" />
        <Billboard x={120} y={96} w={130} h={48} lines={["ENROLLED AGENT", "(FIXED)"]} size={10} />
        <Milo x={60} y={128} scale={0.72} mood="worried" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Fine, I'll fix it. And then throw it away.", x: 3, y: 3, w: 38, tail: "down-left" },
      { who: "Hoot", text: "Hoo! Keep a copy of every ad for 36 MONTHS!", x: 50, y: 2, w: 42, tail: "down" },
    ],
  },
  {
    alt: "Penny and Milo each point at the other. Ace stands between them holding a consent form.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={50} y={128} scale={0.7} mood="stern" pose="point" />
        <Ace x={160} y={128} scale={0.7} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="CONSENT" sub="in writing" color="#d8f0e2" />} />
        <Milo x={270} y={128} scale={0.7} mood="stern" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace, tell Milo the dog-walking loss was HIS idea!", x: 3, y: 2, w: 34, tail: "down-left" },
      { who: "Ace", text: "Conflict of interest! I need you both to consent in writing.", x: 36, y: 2, w: 30, tail: "down" },
      { who: "Milo", text: "Only if it says I'm right.", x: 70, y: 4, w: 28, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa hands Ace a refund check made out to her and tells him to cash it for his fee. Ace backs away.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Envelope x={0} y={-8} label="REFUND" irs />} />
        <Ace x={240} y={128} scale={0.78} mood="shocked" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Just cash my refund check and keep your fee, dear!", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Ace", text: "I can't endorse or cash a client's refund check, Rosa. Not even for rolls.", x: 50, y: 2, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a folder of her records. Ace smiles. Hoot frowns at his clipboard, unable to find anything wrong.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={70} y={128} scale={0.74} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="RECORDS" sub="all yours" />} />
        <Ace x={170} y={128} scale={0.74} mood="happy" />
        <Hoot x={268} y={132} scale={0.6} mood="worried" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "And if I hadn't paid you yet?", x: 3, y: 3, w: 34, tail: "down-left" },
      { who: "Ace", text: "You'd still get your own records back. No hostage files.", x: 36, y: 2, w: 32, tail: "down" },
      { who: "Hoot", text: "This practice is suspiciously ethical.", x: 70, y: 3, w: 28, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Fees and contingent fees",
    alt: "No unconscionable fees. Contingent fees are allowed only in three cases: an IRS exam of an original return, a claim only for interest or penalties, and court proceedings.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Card x={14} y={12} w={292} h={34} lines={["Never an unconscionable fee"]} size={11} color="#fde2e4" />
        <Label x={160} y={64} size={11}>Contingent fees only for:</Label>
        <Step x={14} y={74} w={94} h={92} color="#d8f0e2" label="Exam" sub="original return" />
        <Step x={113} y={74} w={94} h={92} color="#d8f0e2" label="Refund" sub="interest/penalty" />
        <Step x={212} y={74} w={94} h={92} color="#d8f0e2" label="Court" sub="judicial cases" />
      </svg>
    ),
    body: [
      "A practitioner may not charge an unconscionable fee (§10.27). A contingent fee, one based on the result, is allowed only for services connected with an IRS examination or challenge to an original return (or an amended return or refund claim filed within 120 days of receiving written notice of the exam), a claim for refund only of interest and penalties, or a judicial proceeding.",
      "Preparing an original return for a fee based on the size of the refund is not allowed.",
    ],
    keyPoint: "Contingent fees (§10.27): only for an IRS exam/challenge of an original return (or amended return/claim filed within 120 days of the exam notice), a refund claim solely for interest or penalties, or judicial proceedings. Never unconscionable fees.",
  },
  {
    title: "Advertising",
    alt: "Allowed: enrolled to practice before the IRS, enrolled to represent taxpayers. Not allowed: certified by the IRS, or anything false or misleading. Keep radio and TV ads for 36 months.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Card x={14} y={14} w={140} h={100} color="#d8f0e2">
          <Label x={84} y={38} size={11}>OK</Label>
          <Label x={84} y={62} size={10} weight={700}>“enrolled to practice</Label>
          <Label x={84} y={78} size={10} weight={700}>before the IRS”</Label>
        </Card>
        <Card x={166} y={14} w={140} h={100} color="#fde2e4">
          <Label x={236} y={38} size={11}>Not OK</Label>
          <Label x={236} y={62} size={10} weight={700}>“IRS-certified”</Label>
          <Label x={236} y={78} size={10} weight={700}>false or misleading</Label>
        </Card>
        <Card x={14} y={124} w={292} h={42} lines={["Keep a copy of broadcast ads for 36 months"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "Practitioners may not use false, fraudulent, coercive, misleading or deceptive advertising (§10.30). An enrolled agent may describe the status as “enrolled to represent taxpayers before the Internal Revenue Service,” “enrolled to practice before the IRS” or “admitted to practice before the IRS,” but may not say or imply they are certified by or employed by the IRS.",
      "A copy of a radio or TV ad must be kept for 36 months, and a list of those sent direct mail or electronic solicitations for 36 months. Fee information in ads must be honored for at least 30 days.",
    ],
    keyPoint: "Advertising (§10.30): no false or misleading claims; EAs may say “enrolled to practice before the IRS”, never “IRS-certified”. Keep broadcast ads and solicitation lists 36 months; honor published fees at least 30 days.",
  },
  {
    title: "Conflicts of interest",
    alt: "Two clients pointing at each other. The practitioner can continue only if they reasonably believe they can represent both, and each client gives informed consent confirmed in writing within 30 days. Keep the consents 36 months.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fdf3e1" floorY={160} />
        <Penny x={40} y={118} scale={0.4} mood="stern" />
        <Milo x={110} y={118} scale={0.4} mood="stern" flip />
        <Card x={150} y={12} w={158} h={46} lines={["Reasonably believe", "you can serve both"]} size={10} color="#fff" />
        <Card x={150} y={64} w={158} h={46} lines={["Each consents, in", "writing within 30 days"]} size={10} color="#d8f0e2" />
        <Card x={150} y={116} w={158} h={40} lines={["Keep 36 months"]} size={11} color="#fff3c4" />
      </svg>
    ),
    body: [
      "A conflict of interest exists when representing one client will be directly adverse to another, or when there's a significant risk the representation will be materially limited by responsibilities to another client, a former client or the practitioner's own interest (§10.29).",
      "The practitioner may still represent the clients if they reasonably believe they can provide competent and diligent representation to each, the representation isn't prohibited by law, and each affected client waives the conflict with informed consent, confirmed in writing within a reasonable time and no later than 30 days. The written consents are kept for 36 months after the representation ends.",
    ],
    keyPoint: "Conflict of interest (§10.29): continue only if you reasonably believe you can serve each client, it's legal, and each gives informed consent confirmed in writing (within 30 days). Keep consents 36 months after the engagement ends.",
  },
  {
    title: "When a client made a mistake",
    alt: "A practitioner who learns of a client's error or omission must promptly tell the client, and explain the consequences. They don't have to fix it or tell the IRS.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Paper x={56} y={80} label="OOPS" sub="2024" scale={1.7} color="#fde2e4" />
        <Card x={110} y={14} w={198} h={46} lines={["Promptly tell the client", "about the error"]} size={10} color="#d8f0e2" />
        <Card x={110} y={66} w={198} h={46} lines={["Explain the", "consequences"]} size={10} color="#d8f0e2" />
        <Card x={110} y={118} w={198} h={46} lines={["Not required to tell", "the IRS or amend"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A practitioner who knows a client hasn't complied with the tax laws, or made an error or omission on a return or other document, must promptly advise the client of the noncompliance, error or omission and of its consequences (§10.21).",
      "The practitioner isn't required to correct it or to notify the IRS. They must also act with due diligence (§10.22) in preparing returns and in what they tell the IRS and clients.",
    ],
    keyPoint: "Client error (§10.21): promptly advise the client of the noncompliance/error/omission and its consequences. No duty to fix it or tell the IRS. Due diligence (§10.22) on everything prepared or represented.",
  },
  {
    title: "Client records and refund checks",
    alt: "A folder labeled client records, returned on request even during a fee dispute. A refund check with a no sign: practitioners can't endorse or cash a client's refund check.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <Card x={14} y={14} w={140} h={150} color="#fff">
          <Label x={84} y={38} size={11}>Client records</Label>
          <Label x={84} y={66} size={10} weight={700}>return on request,</Label>
          <Label x={84} y={82} size={10} weight={700}>even if the fee</Label>
          <Label x={84} y={98} size={10} weight={700}>is unpaid</Label>
        </Card>
        <Card x={166} y={14} w={140} h={150} color="#fde2e4">
          <Label x={236} y={38} size={11}>Refund checks</Label>
          <Label x={236} y={66} size={10} weight={700}>never endorse</Label>
          <Label x={236} y={82} size={10} weight={700}>or cash a client's</Label>
          <Label x={236} y={98} size={10} weight={700}>refund check</Label>
        </Card>
        <Stamp x={236} y={140} text="NO" color="#a8321f" size={14} />
      </svg>
    ),
    body: [
      "On a client's request, a practitioner must promptly return the client's records needed for the client to comply with their federal tax obligations, even if there's a fee dispute (§10.28). The practitioner may keep copies. The practitioner's own work product, like a return they prepared, may be held until paid only if state law allows.",
      "A practitioner who prepares returns may not endorse or otherwise negotiate any check issued to a client for a federal tax refund (§10.31), or direct a refund into their own account.",
    ],
    keyPoint: "Records (§10.28): return the client's records on request, fee dispute or not. Refund checks (§10.31): a practitioner can't endorse, cash or redirect a client's federal refund.",
  },
];

const lesson: Lesson = {
  id: "p3-circular-230",
  part: "part3",
  domainId: "p3d1",
  number: "1.2",
  episode: "Milo's Billboard",
  title: "Circular 230 conduct",
  minutes: 12,
  lawAsOf: "rules in effect for 2026 (Circular 230)",
  intro: "The everyday Circular 230 duties: fees and contingent fees, advertising, conflicts of interest, telling clients about errors, returning records, and refund checks.",
  previously: "Ace's practice is open and the sign is spelled right. Now Milo, self-appointed head of marketing, has a surprise on the highway.",
  comic,
  cards,
  hook: {
    line: "“Enrolled,” never “certified.” Results-based fees only for exams, penalty refunds and court.",
    more: "Conflicts: consent in writing within 30 days. Records go back even if the bill isn't paid. Never cash a client's refund.",
    alt: "A billboard with certified crossed out and enrolled written in.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#d4ebfa" />
        <Card x={20} y={20} w={180} h={80} color="#fff3c4">
          <Label x={110} y={50} size={13} color="#a8321f">IRS-CERTIFIED</Label>
          <path d="M40,46 H180" stroke="#a8321f" strokeWidth={3} />
          <Label x={110} y={80} size={13}>ENROLLED</Label>
        </Card>
        <Mark x={262} y={72} text="36 mo" color="#3f7cc4" size={20} />
      </svg>
    ),
  },
  traps: [
    { title: "“IRS-certified” sounds fine", text: "EAs may say “enrolled to practice before the IRS,” never that the IRS certified or employs them." },
    { title: "Contingent fee on an original return", text: "Not allowed. Contingent fees are limited to exams of original returns, interest-and-penalty refund claims, and court cases." },
    { title: "Holding records for payment", text: "The client's own records go back on request, even if the bill is unpaid." },
    { title: "Fixing the client's error yourself", text: "The duty is to tell the client about the error and its consequences, not to amend or report it." },
  ],
  sources: [
    { key: "c230", section: "§10.21, §10.22, §10.27, §10.28, §10.29, §10.30, §10.31" },
    { key: "p947", section: "Rules of Practice" },
  ],
  cases: [
    {
      who: "Milo",
      title: "The fixed billboard",
      facts: "Milo redesigns Ace's billboard. Ace is an enrolled agent.",
      question: "Which wording is allowed?",
      choices: ["“IRS-certified tax expert”", "“Former IRS insider”", "“Enrolled to practice before the IRS”", "“Approved by the IRS”"],
      answer: "“Enrolled to practice before the IRS”",
      why: "Circular 230 lets EAs say they're enrolled (to practice or to represent taxpayers) before the IRS, but not imply IRS certification, approval or employment.",
    },
    {
      who: "Hoot",
      title: "The percentage fee",
      facts: "A new client offers Ace 20% of whatever refund he gets on her original 2025 return, which hasn't been filed yet.",
      question: "Can Ace accept?",
      choices: ["Yes, if it's in writing", "No; that's a contingent fee for preparing an original return", "Yes, if the fee is reasonable", "Only if she's a relative"],
      answer: "No; that's a contingent fee for preparing an original return",
      why: "Contingent fees are allowed only for exams of original returns, refund claims solely for interest or penalties, and judicial proceedings, not for preparing an original return.",
    },
    {
      who: "Penny",
      title: "Representing both",
      facts: "Penny and Milo's interests conflict in a matter, and Ace reasonably believes he can still represent both of them competently.",
      question: "What does Ace need to continue?",
      choices: ["Each one's informed consent, confirmed in writing within 30 days", "Nothing more; his belief is enough", "Permission from the IRS", "Only the older client's consent"],
      answer: "Each one's informed consent, confirmed in writing within 30 days",
      why: "Under §10.29, each affected client must give informed consent, confirmed in writing within a reasonable time and no later than 30 days. Ace keeps the consents for 36 months.",
    },
    {
      who: "Rosa",
      title: "The unpaid bill",
      facts: "Rosa and Ace disagree about his fee. She asks for her original bank statements and 1099s back.",
      question: "What must Ace do?",
      choices: ["Keep them until she pays", "Return them only if she pays half", "Return them promptly; he may keep copies", "Send them to the IRS"],
      answer: "Return them promptly; he may keep copies",
      why: "Section 10.28 requires returning a client's records needed to comply with their tax obligations on request, even during a fee dispute.",
    },
    {
      who: "Ace",
      title: "The old mistake",
      facts: "While preparing a client's 2025 return, Ace finds that her 2024 return, which someone else prepared, left out a 1099 income item.",
      question: "What does Circular 230 require of Ace?",
      choices: ["Amend the 2024 return himself", "Report the client to the IRS", "Refuse to prepare the 2025 return", "Promptly tell the client about the omission and its consequences"],
      answer: "Promptly tell the client about the omission and its consequences",
      why: "Section 10.21 requires a practitioner who knows of a client's error or omission to promptly advise the client of it and its consequences. It doesn't require amending or reporting it.",
    },
  ],
  quizTopics: ["Contingent fees", "Advertising", "Conflicts of interest", "Client errors", "Refund checks", "Client records"],
  quizBrief: "Circular 230 conduct: contingent fees, advertising (enrolled, not certified), conflicts of interest and written consent, client errors, returning client records, refund checks",
};

export default lesson;

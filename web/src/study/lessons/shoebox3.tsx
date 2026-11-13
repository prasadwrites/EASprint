import { Ace, Backdrop, Hoot, Label, Lulu, Milo, Penny, Rosa, Window } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Shoebox, Step } from "../props";

// Part 3, topic 2.2: building the case: types of exams and information requests, substantiation,
// collection information statements, the hierarchy of legal authority, the §7525 practitioner privilege,
// and the standards for return positions. Written to Publications 556 and 947, Circular 230 §10.34 and
// the Code as in effect for 2026.

const INK = "#17202c";

/** A tiny stack of books. (x, y) is the bottom center. */
function Books({ x, y, labels }: { x: number; y: number; labels: string[] }) {
  const colors = ["#3f7cc4", "#1d7a49", "#e8505b", "#9c4f8a"];
  return (
    <g>
      {labels.map((l, i) => (
        <g key={l}>
          <rect x={x - 44 + i * 2} y={y - 18 * (i + 1)} width={88 - i * 4} height={16} rx={2} fill={colors[i % 4]} stroke={INK} strokeWidth={2} />
          <Label x={x} y={y - 18 * i - 6} size={8} color="#fff">
            {l}
          </Label>
        </g>
      ))}
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Milo dumps the old shoebox onto Ace's desk. Receipts fly everywhere, some sticky with frosting.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e3eef7" />
        <Milo x={70} y={128} scale={0.74} mood="excited" pose="up" />
        <Shoebox x={160} y={160} scale={1.1} labels={["LUNCH", "1099", "?!"]} />
        <Ace x={256} y={128} scale={0.74} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "The Shoebox is BACK! Every 2025 receipt. Some have frosting.", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "Milo... is that a receipt for a hot dog?", x: 58, y: 3, w: 39, tail: "down-right" },
    ],
  },
  {
    alt: "A tiny Hoot pops out of the shoebox, wearing a receipt like a hat. Milo jumps.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e3eef7" />
        <Milo x={70} y={128} scale={0.74} mood="shocked" />
        <Hoot x={190} y={100} scale={0.36} mood="smug" pose="point" />
        <Shoebox x={190} y={170} scale={1.1} labels={["", "", ""]} />
        <Ace x={276} y={130} scale={0.62} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "It was a BUSINESS hot dog!", x: 3, y: 3, w: 32, tail: "down-left" },
      { who: "Hoot", text: "Then PROVE it! The burden is on YOU! Hoo!", x: 38, y: 2, w: 34, tail: "down" },
      { who: "Ace", text: "How did he get in there?", x: 75, y: 4, w: 23, tail: "down-right" },
    ],
  },
  {
    alt: "Ace sorts receipts into neat piles next to a paper reading IDR, Form 4564. Penny watches.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="4564" sub="IDR" color="#fff3c4" />} />
        <Penny x={240} y={128} scale={0.78} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Hoot's request lists what he wants. We match every deduction to a document. No more, no less.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Penny", text: "Less is my favorite amount.", x: 62, y: 6, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Ace stands beside a stack of books labeled Code, Regs, Rulings and Cases. Lulu holds up a phone labeled blog.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#efe3f7" />
        <Ace x={70} y={128} scale={0.74} mood="happy" pose="point" />
        <Books x={160} y={190} labels={["CODE", "REGS", "RULINGS", "CASES"]} />
        <Lulu x={262} y={160} scale={0.54} mood="smug" flip pose="hold" holding={<Paper x={0} y={-8} label="BLOG" />} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "My argument stands on authority: the Code, regulations, rulings, court cases.", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Lulu", text: "What about this blog called TaxHacks4U?", x: 58, y: 3, w: 39, tail: "down-right" },
    ],
  },
  {
    alt: "Penny whispers to Ace. Through the window behind them, Hoot is listening with a cupped wing.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Window x={196} y={78} w={86} h={62} />
        <Hoot x={240} y={122} scale={0.4} mood="smug" flip />
        <Penny x={70} y={128} scale={0.74} mood="worried" />
        <Ace x={160} y={128} scale={0.74} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Is what I tell you private?", x: 3, y: 3, w: 30, tail: "down-left" },
      { who: "Ace", text: "Tax advice is privileged, like with a lawyer. Not in criminal cases, though.", x: 34, y: 2, w: 36, tail: "down" },
      { who: "Hoot", text: "I can hear you.", x: 74, y: 4, w: 24, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa asks about a creative position. Ace holds Form 8275. Hoot rubs his wings together.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={60} y={128} scale={0.72} mood="smug" />
        <Ace x={160} y={128} scale={0.72} mood="stern" pose="hold" holding={<Paper x={0} y={-8} label="8275" sub="disclose" color="#d8f0e2" />} />
        <Hoot x={266} y={130} scale={0.62} mood="excited" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Can my return be a little... creative?", x: 3, y: 3, w: 30, tail: "down-left" },
      { who: "Ace", text: "Substantial authority: fine. Just a reasonable basis? Then we disclose it.", x: 34, y: 2, w: 36, tail: "down" },
      { who: "Hoot", text: "“Creative” is my FAVORITE word.", x: 73, y: 3, w: 25, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Three kinds of exams",
    alt: "Correspondence exams by mail, office exams at an IRS office, and field exams at the taxpayer's home or business.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e3eef7" />
        <Step x={14} y={20} w={94} h={100} color="#fff" label="Mail" sub="correspondence" />
        <Step x={113} y={20} w={94} h={100} color="#fff3c4" label="Office" sub="at the IRS" />
        <Step x={212} y={20} w={94} h={100} color="#fde2e4" label="Field" sub="home or business" />
        <Label x={160} y={150} size={10} weight={700}>Requests for documents come on Form 4564 (IDR)</Label>
      </svg>
    ),
    body: [
      "A correspondence exam is handled by mail, usually about a few specific items. An office exam takes place at an IRS office with a tax compliance officer. A field exam is done by a revenue agent at the taxpayer's home, business or the representative's office, and is usually broader.",
      "In an office or field exam, the examiner typically asks for records on Form 4564, an Information Document Request (IDR). A representative can usually attend instead of the taxpayer, who can't be required to come unless summoned.",
    ],
    keyPoint: "Exams: correspondence (mail), office (IRS office), field (revenue agent at home/business). Records requested on Form 4564 (IDR). With a 2848, the representative can attend instead of the taxpayer.",
  },
  {
    title: "Proving it: substantiation",
    alt: "A receipt, bank statement and log connected to each deduction. The taxpayer carries the burden of proof for deductions.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Shoebox x={60} y={140} scale={1} labels={["W-2", "1099", "LOG"]} />
        <Card x={130} y={14} w={178} h={46} lines={["Taxpayer proves", "deductions and credits"]} size={10} color="#fde2e4" />
        <Card x={130} y={66} w={178} h={46} lines={["Receipts, statements,", "logs, contracts"]} size={10} color="#fff" />
        <Card x={130} y={118} w={178} h={46} lines={["Answer exactly what", "the IDR asks"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "The taxpayer generally has the burden of proving deductions, credits and basis with adequate records: receipts, canceled checks, bank statements, logs (for vehicles and travel), contracts and the like. Some items, such as travel, gifts and listed property, need specific written records.",
      "A good representative organizes documents by issue, answers exactly what the examiner requested, and keeps copies of everything provided.",
    ],
    keyPoint: "The taxpayer carries the burden of substantiating deductions, credits and basis (receipts, statements, logs). Organize by issue and answer exactly what the IDR asks; keep copies.",
  },
  {
    title: "The taxpayer's financial situation",
    alt: "Collection information statements: Form 433-A for individuals, 433-B for businesses, 433-F the shorter version. They list income, expenses, assets and debts, measured against national and local standards.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={94} h={84} color="#d4ebfa" label="433-A" sub="individuals" />
        <Step x={113} y={14} w={94} h={84} color="#d8f0e2" label="433-F" sub="short form" />
        <Step x={212} y={14} w={94} h={84} color="#fff3c4" label="433-B" sub="businesses" />
        <Card x={14} y={110} w={292} h={56} lines={["Income, expenses, assets, debts:", "allowable expenses use IRS standards"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "When a taxpayer can't pay, the IRS looks at their ability to pay using a collection information statement: Form 433-A (individuals and self-employed), Form 433-B (businesses) or the shorter Form 433-F. It lists income, living expenses, assets, equity and debts.",
      "Allowable living expenses are measured against the IRS's national and local standards (food, housing, transportation, health care). In an exam, the IRS may also look at a taxpayer's financial status when reported income seems too low to support their lifestyle.",
    ],
    keyPoint: "Ability to pay: Form 433-A (individuals), 433-B (businesses), 433-F (short). Income, expenses, assets, equity, debts; allowable expenses use IRS national and local standards.",
  },
  {
    title: "The ladder of authority",
    alt: "A ladder: the Internal Revenue Code at the top, then Treasury regulations, revenue rulings and procedures, and court cases. Private letter rulings bind only the taxpayer who asked. Publications aren't authority.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Card x={14} y={10} w={180} h={30} lines={["1. Internal Revenue Code"]} size={10} color="#d8f0e2" />
        <Card x={14} y={44} w={180} h={30} lines={["2. Treasury regulations"]} size={10} color="#fff" />
        <Card x={14} y={78} w={180} h={30} lines={["3. Rev. rulings, procedures"]} size={10} color="#fff" />
        <Card x={14} y={112} w={180} h={30} lines={["Court decisions"]} size={10} color="#fff" />
        <Card x={204} y={10} w={104} h={64} lines={["PLRs: only", "the taxpayer", "who asked"]} size={9} color="#fff3c4" />
        <Card x={204} y={80} w={104} h={62} lines={["Publications:", "not authority"]} size={9} color="#fde2e4" />
        <Label x={160} y={164} size={10} weight={700}>Supreme Court decisions bind everyone</Label>
      </svg>
    ),
    body: [
      "Legal authority starts with the Internal Revenue Code. Treasury regulations interpret it (final regulations carry the most weight, then temporary, then proposed). Revenue rulings and revenue procedures are the IRS's official positions that taxpayers can rely on. Court decisions interpret the law; Supreme Court decisions bind everyone.",
      "A private letter ruling applies only to the taxpayer who requested it and can't be cited as precedent by others. IRS publications, forms and instructions explain the law but aren't authority.",
    ],
    keyPoint: "Authority: Code → Treasury regs (final > temporary > proposed) → revenue rulings/procedures; court decisions (Supreme Court binds all). PLRs bind only the requester; IRS publications aren't authority.",
  },
  {
    title: "The practitioner privilege (§7525)",
    alt: "A lock on tax advice from a federally authorized practitioner. It doesn't cover criminal matters or written communications promoting tax shelters.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="Privileged" sub="tax advice from a CPA/EA" />
        <Card x={166} y={14} w={140} h={46} lines={["Not criminal", "matters"]} size={10} color="#fde2e4" />
        <Card x={166} y={68} w={140} h={46} lines={["Not tax shelter", "promotion"]} size={10} color="#fde2e4" />
        <Card x={14} y={124} w={292} h={42} lines={["Only in noncriminal IRS and federal court matters"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "Section 7525 extends the attorney-client privilege to tax advice between a taxpayer and a federally authorized tax practitioner (such as a CPA or enrolled agent), to the extent it would be privileged with an attorney.",
      "It applies only in noncriminal tax matters before the IRS and noncriminal tax proceedings in federal court. It doesn't cover written communications promoting participation in a tax shelter, and it doesn't protect return preparation information or documents that exist apart from the advice.",
    ],
    keyPoint: "§7525: attorney-client-style privilege for tax advice from federally authorized practitioners (CPAs, EAs) in noncriminal matters before the IRS or federal court. Not criminal cases, not tax shelter promotion, not return-preparation info.",
  },
  {
    title: "Standards for return positions",
    alt: "Three levels: substantial authority needs no disclosure; a reasonable basis needs disclosure on Form 8275; tax shelters need more-likely-than-not.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={94} h={110} color="#d8f0e2" label="Substantial" sub="no disclosure" />
        <Step x={113} y={14} w={94} h={110} color="#fff3c4" label="Reasonable" sub="disclose: 8275" />
        <Step x={212} y={14} w={94} h={110} color="#fde2e4" label="Shelter" sub="more likely than not" />
        <Label x={160} y={150} size={10} weight={700}>Below a reasonable basis: don't sign it</Label>
        <Label x={160} y={166} size={10} weight={700}>Tell the client about possible penalties</Label>
      </svg>
    ),
    body: [
      "Circular 230 §10.34 bars a practitioner from willfully, recklessly or through gross incompetence signing or advising on a return position that lacks a reasonable basis, is an unreasonable position under §6694, or is a willful attempt to understate tax.",
      "A position with substantial authority needs no disclosure. One with only a reasonable basis must be adequately disclosed (Form 8275, or 8275-R if it's contrary to a regulation) to avoid penalties. Tax shelter positions need a reasonable belief they're more likely than not correct. The practitioner must tell the client about penalties that could apply and how disclosure can avoid them.",
    ],
    keyPoint: "Return positions (§10.34): substantial authority = no disclosure; reasonable basis = disclose (Form 8275, or 8275-R vs a regulation); tax shelters = more likely than not. Advise the client of possible penalties and the disclosure option.",
  },
];

const lesson: Lesson = {
  id: "p3-building-the-case",
  part: "part3",
  domainId: "p3d2",
  number: "2.2",
  episode: "The Shoebox Strikes Back",
  title: "Building the case",
  minutes: 13,
  lawAsOf: "rules in effect for 2026",
  intro: "Kinds of exams and IDRs, substantiation, collection information statements, the hierarchy of legal authority, the §7525 practitioner privilege, and the standards for return positions.",
  previously: "Ace has both Forms 2848 (one slightly chewed) and the audit is on. Hoot wants proof of Milo's business expenses. Milo has a box.",
  comic,
  cards,
  hook: {
    line: "Code first. Then regs, rulings and cases. A blog is never authority.",
    more: "Substantial authority: no disclosure. Reasonable basis: Form 8275. Privilege covers tax advice, never crimes.",
    alt: "The shoebox, with a stack of law books beside it.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#efe3f7" />
        <Shoebox x={70} y={100} scale={0.9} labels={["LUNCH", "?!", "1099"]} />
        <Books x={190} y={110} labels={["CODE", "REGS", "RULINGS", "CASES"]} />
        <Mark x={274} y={74} text="8275" color="#1d7a49" size={18} />
      </svg>
    ),
  },
  traps: [
    { title: "Relying on someone else's PLR", text: "A private letter ruling binds only the taxpayer who requested it." },
    { title: "Publications are authority", text: "IRS publications explain the law but aren't legal authority." },
    { title: "Privilege in a criminal case", text: "The §7525 practitioner privilege applies only in noncriminal tax matters." },
    { title: "Reasonable basis with no disclosure", text: "A position with only a reasonable basis must be disclosed (Form 8275) to avoid penalties." },
  ],
  sources: [
    { key: "p556", section: "Examination of Returns" },
    { key: "p947", section: "Practice Before the IRS" },
    { key: "c230", section: "§10.34 Standards with respect to tax returns" },
    { key: "p594", section: "Collection Information Statement" },
  ],
  cases: [
    {
      who: "Lulu",
      title: "What counts",
      facts: "Ace is building Penny and Milo's case and has several sources that support his position.",
      question: "Which is legal authority he can rely on?",
      choices: ["A Treasury regulation", "An IRS publication", "A private letter ruling issued to another taxpayer", "A popular tax blog"],
      answer: "A Treasury regulation",
      why: "Regulations interpret the Code and are authority. Publications aren't authority, and a PLR binds only the taxpayer who asked for it.",
    },
    {
      who: "Ace",
      title: "Where's the meeting?",
      facts: "The IRS has asked Milo to come to a local IRS office with records for a tax compliance officer to review.",
      question: "What kind of exam is it?",
      choices: ["Correspondence", "Office", "Field", "Compliance check"],
      answer: "Office",
      why: "An office exam takes place at an IRS office, usually with a tax compliance officer. Field exams are at the taxpayer's home or business.",
    },
    {
      who: "Hoot",
      title: "The privilege",
      facts: "Penny's conversations with Ace about tax advice are requested in a criminal tax investigation of someone else.",
      question: "Does §7525 protect them?",
      choices: ["Yes, always", "Yes, if Ace is an EA", "Only if written down", "No; the privilege doesn't apply in criminal matters"],
      answer: "No; the privilege doesn't apply in criminal matters",
      why: "The §7525 privilege covers only noncriminal tax matters before the IRS and noncriminal tax proceedings in federal court.",
    },
    {
      who: "Rosa",
      title: "The creative position",
      facts: "Rosa's return position has a reasonable basis but not substantial authority. It isn't a tax shelter.",
      question: "What must Ace do to sign the return without risking a penalty?",
      choices: ["Nothing; a reasonable basis is enough", "Disclose the position, for example on Form 8275", "Refuse to sign it", "Get a private letter ruling"],
      answer: "Disclose the position, for example on Form 8275",
      why: "A position with only a reasonable basis must be adequately disclosed. With substantial authority, no disclosure is needed.",
    },
    {
      who: "Milo",
      title: "Can't pay",
      facts: "After the audit, Milo owes more than he can pay at once, and the IRS wants to see what he can afford.",
      question: "Which form shows his income, expenses and assets?",
      choices: ["Form 4564", "Form 8275", "Form 433-A", "Form 2848"],
      answer: "Form 433-A",
      why: "Form 433-A is the collection information statement for individuals. Form 4564 is an information request, 8275 a disclosure statement and 2848 a power of attorney.",
    },
  ],
  quizTopics: ["Confidentiality privilege", "Return positions"],
  quizBrief: "Building the case: exam types and IDRs, substantiation, Forms 433-A/B/F, hierarchy of authority (Code, regs, rulings, cases; PLRs, publications), §7525 privilege, return positions and Form 8275",
};

export default lesson;

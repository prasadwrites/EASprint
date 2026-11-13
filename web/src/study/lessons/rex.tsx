import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Billboard } from "../office";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Stamp, Step } from "../props";

// Part 3, topic 1.3: when things go wrong: disreputable conduct and Circular 230 sanctions, preparer
// penalties under sections 6694, 6695 and 6701, and the preparer's duty to sign returns. Written to
// Circular 230 and the IRS preparer penalty guidance as in effect for 2026.

const comic: Lesson["comic"] = [
  {
    alt: "Across the street, a huge billboard: Quick Refund Rex, biggest refunds in town, maybe. Milo and Ace look up at it.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" floor="#bfe3a8" />
        <Billboard x={92} y={70} w={150} h={66} lines={["QUICK REFUND REX", "BIGGEST REFUNDS", "IN TOWN! (MAYBE)"]} size={10} color="#fde2e4" />
        <Milo x={50} y={130} scale={0.66} mood="worried" pose="point" />
        <Ace x={282} y={132} scale={0.62} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "The competition, boss. His billboard is bigger than ours.", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "His refunds are bigger too. Suspiciously.", x: 60, y: 3, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Penny waves a flyer from Rex. Biscuit wags hopefully. Ace looks pained.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={70} y={128} scale={0.74} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="REX" sub="dog = kid" color="#fde2e4" />} />
        <Biscuit x={146} y={178} scale={0.44} mood="excited" />
        <Ace x={250} y={128} scale={0.76} mood="worried" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Rex says Biscuit can be our dependent!", x: 3, y: 3, w: 36, tail: "down-left" },
      { who: "Ace", text: "That's an unreasonable position, Penny. Rex owes a penalty: the greater of $1,000 or 50% of his fee.", x: 46, y: 2, w: 51, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot leaps in excitedly, clipboard held high. Milo leans in.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Hoot x={80} y={130} scale={0.7} mood="excited" pose="up" clipboard />
        <Milo x={240} y={128} scale={0.76} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-HOO! And if it's willful or reckless: $5,000 or 75%!", x: 3, y: 2, w: 42, tail: "down-left", shout: true },
      { who: "Milo", text: "Of what? His billboard?", x: 62, y: 6, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Ace counts on his fingers: censure, suspension, disbarment, money. Lulu raises her hand with a question.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#efe3f7" />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="point" />
        <Card x={130} y={96} w={84} h={68} lines={["censure", "suspend", "disbar", "fine"]} size={9} color="#fff" />
        <Lulu x={260} y={160} scale={0.56} mood="thinking" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "If Rex were an EA, the Office of Professional Responsibility could censure, suspend or disbar him, or fine him.", x: 3, y: 2, w: 56, tail: "down-left" },
      { who: "Lulu", text: "Disbar? Like a candy bar?", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa holds up a return with an empty preparer signature box. Ace points to it.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.78} mood="stern" pose="hold" holding={<Paper x={0} y={-8} label="SIGN?" sub="preparer: ___" />} />
        <Ace x={240} y={128} scale={0.78} mood="stern" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Rex didn't even sign my return. Or give me a copy!", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Ace", text: "Paid preparers must sign, add their PTIN, and give you a copy. Each miss is its own penalty.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot strides off toward Rex's billboard with a stack of files. Milo follows with a bag of snacks.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" floor="#bfe3a8" />
        <Billboard x={196} y={70} w={110} h={50} lines={["QUICK REFUND", "REX"]} size={10} color="#fde2e4" />
        <Hoot x={150} y={130} scale={0.66} mood="smug" pose="hold" />
        <Paper x={186} y={150} label="REX" sub="files" color="#fff3c4" />
        <Milo x={60} y={128} scale={0.72} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="SNACKS" color="#fde2e4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Can I come? I brought snacks.", x: 3, y: 3, w: 32, tail: "down-left" },
      { who: "Hoot", text: "Excuse me. I have a billboard to visit.", x: 40, y: 2, w: 38, tail: "down" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Disreputable conduct",
    alt: "A list of disreputable conduct: tax crimes, false statements to the IRS, not filing your own returns, misusing client funds, and giving false or reckless opinions.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Card x={14} y={12} w={140} h={46} lines={["Tax crimes,", "fraud convictions"]} size={10} color="#fff" />
        <Card x={166} y={12} w={140} h={46} lines={["False information", "to the IRS"]} size={10} color="#fff" />
        <Card x={14} y={64} w={140} h={46} lines={["Not filing your", "own returns"]} size={10} color="#fff" />
        <Card x={166} y={64} w={140} h={46} lines={["Misusing client", "funds or refunds"]} size={10} color="#fff" />
        <Card x={14} y={116} w={292} h={46} lines={["Reckless or false tax opinions; contempt of the IRS"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Circular 230 §10.51 lists disreputable conduct that can lead to sanctions, including: conviction of a tax crime or a felony involving dishonesty, giving false or misleading information to the IRS, willfully failing to file one's own federal returns or to pay one's own tax, misappropriating client funds such as refunds, giving a false opinion knowingly, recklessly or through gross incompetence, and contemptuous conduct toward the IRS.",
      "It also covers willfully signing a return the practitioner knows is false, and willfully disclosing return information improperly.",
    ],
    keyPoint: "Disreputable conduct (§10.51): tax crimes or dishonesty felonies, false info to the IRS, willfully not filing/paying your own taxes, misappropriating client funds, false or reckless opinions, signing a known-false return, improper disclosure.",
  },
  {
    title: "Circular 230 sanctions",
    alt: "Four sanctions in increasing order: censure, suspension of up to five years, disbarment, and a monetary penalty up to the gross income from the conduct.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Step x={10} y={20} w={72} h={100} color="#fff3c4" label="Censure" sub="public" />
        <Step x={87} y={20} w={72} h={100} color="#fde2e4" label="Suspend" sub="≤ 5 years" />
        <Step x={164} y={20} w={72} h={100} color="#fde2e4" label="Disbar" sub="out" />
        <Step x={241} y={20} w={72} h={100} color="#d4ebfa" label="Fine" sub="≤ gross income" />
        <Label x={160} y={150} size={11}>Imposed by OPR, after notice and a hearing</Label>
      </svg>
    ),
    body: [
      "The IRS Office of Professional Responsibility (OPR) can sanction a practitioner who is incompetent or disreputable, or who willfully violates Circular 230. Sanctions are censure (a public reprimand), suspension from practice for up to five years, disbarment, and a monetary penalty up to the gross income derived from the conduct (which can be imposed on top of the others, and on a firm that knew or should have known).",
      "A sanction normally comes after notice and an opportunity for a hearing before an administrative law judge. An expedited suspension is available in limited cases, such as a revoked license or a tax conviction.",
    ],
    keyPoint: "Circular 230 sanctions (OPR): censure, suspension up to 5 years, disbarment, monetary penalty up to the gross income from the conduct (also on the firm). After notice and an ALJ hearing; expedited suspension in limited cases.",
  },
  {
    title: "Understatement penalties on preparers (§6694)",
    alt: "Two tiers: an unreasonable position costs the greater of $1,000 or 50% of the fee; willful or reckless conduct costs the greater of $5,000 or 75%.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={14} w={140} h={100} color="#fff3c4" label="$1,000" sub="or 50% of fee" />
        <Step x={166} y={14} w={140} h={100} color="#fde2e4" label="$5,000" sub="or 75% of fee" />
        <Label x={84} y={136} size={10} weight={700}>unreasonable position</Label>
        <Label x={236} y={136} size={10} weight={700}>willful or reckless</Label>
        <Label x={160} y={164} size={10} weight={700}>whichever is greater, per return</Label>
      </svg>
    ),
    body: [
      "A preparer who prepares a return with an understatement due to an unreasonable position, one they knew or should have known about, owes the greater of $1,000 or 50% of the income derived from that return (§6694(a)). A position is reasonable if it has substantial authority, or a reasonable basis and is properly disclosed.",
      "If the understatement is willful or due to reckless or intentional disregard of rules, the penalty is the greater of $5,000 or 75% of the income derived (§6694(b)).",
    ],
    keyPoint: "§6694: unreasonable position = greater of $1,000 or 50% of the preparer's income from the return; willful or reckless = greater of $5,000 or 75%.",
  },
  {
    title: "Paperwork penalties on preparers (§6695)",
    alt: "A list of preparer failures, each a separate penalty: not giving the client a copy, not signing, no PTIN, not keeping a copy or list, not meeting due diligence on Form 8867, and cashing a client's refund check.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={12} w={140} h={36} lines={["No copy to client"]} size={10} color="#fff" />
        <Card x={166} y={12} w={140} h={36} lines={["No signature"]} size={10} color="#fff" />
        <Card x={14} y={54} w={140} h={36} lines={["No PTIN on return"]} size={10} color="#fff" />
        <Card x={166} y={54} w={140} h={36} lines={["No copy or list kept"]} size={10} color="#fff" />
        <Card x={14} y={96} w={140} h={36} lines={["Due diligence (8867)"]} size={10} color="#fff3c4" />
        <Card x={166} y={96} w={140} h={36} lines={["Cashing a refund check"]} size={10} color="#fde2e4" />
        <Label x={160} y={156} size={10} weight={700}>Each failure: a set, inflation-adjusted amount</Label>
      </svg>
    ),
    body: [
      "Section 6695 charges a per-failure penalty (adjusted for inflation, mostly with an annual cap) when a preparer fails to give the taxpayer a copy of the return, fails to sign it, fails to include their PTIN, fails to keep a copy or a list of returns prepared, or fails to meet the due diligence rules for the EITC, child tax credit, AOTC or head of household status (Form 8867).",
      "Endorsing or negotiating a client's refund check is also a §6695 penalty, with no cap.",
    ],
    keyPoint: "§6695 per-failure penalties: no copy to taxpayer, no signature, no PTIN, no copy/list retained, due diligence failures (Form 8867: EITC, CTC/ODC, AOTC, HOH), and negotiating a client's refund check.",
  },
  {
    title: "Signing the return",
    alt: "A return's paid preparer box: signature, PTIN and firm details, with an arrow to a copy for the client and a copy kept for three years.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Card x={14} y={14} w={292} h={66} color="#fff">
          <Label x={30} y={38} size={10} anchor="start">Paid preparer: Ace Okafor, EA</Label>
          <Label x={30} y={58} size={10} anchor="start" weight={700}>PTIN P01234567 · signed ✓</Label>
        </Card>
        <Step x={14} y={92} w={140} h={74} color="#d8f0e2" label="Copy" sub="to the client" />
        <Step x={166} y={92} w={140} h={74} color="#fff3c4" label="3 years" sub="keep copy or list" />
      </svg>
    ),
    body: [
      "A paid preparer must sign the return (electronic signatures are allowed), enter their PTIN, give the taxpayer a copy no later than when it's presented for signature, and keep a copy of the return or a list of the taxpayers and returns for three years after the close of the return period.",
      "Separately, aiding and abetting an understatement of tax (§6701) carries a $1,000 penalty per return ($10,000 for a corporation's return), and courts can bar repeat offenders from preparing returns (§7407).",
    ],
    keyPoint: "Paid preparers: sign, show PTIN, give the taxpayer a copy, keep a copy or list for 3 years. §6701 aiding and abetting: $1,000 per return ($10,000 for corporate returns); §7407 injunctions.",
  },
];

const lesson: Lesson = {
  id: "p3-sanctions",
  part: "part3",
  domainId: "p3d1",
  number: "1.3",
  episode: "Quick Refund Rex",
  title: "When things go wrong",
  minutes: 12,
  lawAsOf: "rules in effect for 2026 (Circular 230 and the Code)",
  intro: "Disreputable conduct and the four Circular 230 sanctions, the §6694 understatement penalties on preparers, the §6695 paperwork penalties, aiding and abetting, and signing returns.",
  previously: "Ace's billboard now says “enrolled.” But across the street, a much bigger billboard just went up.",
  comic,
  cards,
  hook: {
    line: "Unreasonable: $1,000 or 50%. Willful: $5,000 or 75%. Whichever is greater.",
    more: "OPR sanctions: censure, suspension (up to 5 years), disbarment, or a fine up to the income earned.",
    alt: "Rex's billboard with two penalty stamps.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#d4ebfa" />
        <Card x={20} y={20} w={130} h={80} lines={["QUICK REFUND", "REX"]} size={12} color="#fde2e4" />
        <Stamp x={210} y={44} text="50%" color="#c0392b" size={16} />
        <Stamp x={270} y={84} text="75%" color="#a8321f" size={16} rotate={8} />
        <Mark x={180} y={96} text="!" color="#a8321f" size={22} />
      </svg>
    ),
  },
  traps: [
    { title: "The penalty is a flat $1,000", text: "It's the GREATER of $1,000 or 50% of the preparer's income from the return ($5,000 or 75% if willful or reckless)." },
    { title: "OPR can send you to jail", text: "Circular 230 sanctions are censure, suspension, disbarment and monetary penalties. Prison comes only from criminal prosecution." },
    { title: "Suspension is forever", text: "Suspension lasts up to five years; disbarment is the permanent one." },
    { title: "Your own late return doesn't count", text: "Willfully failing to file your own returns is disreputable conduct." },
  ],
  sources: [
    { key: "c230", section: "§10.50 Sanctions; §10.51 Incompetence and disreputable conduct; §10.52" },
    { key: "preparerpen", section: "Tax preparer penalties" },
    { key: "p947", section: "Rules of Practice; Sanctions" },
  ],
  cases: [
    {
      who: "Penny",
      title: "The dog dependent",
      facts: "Rex charged a client $400 to prepare a return claiming the client's dog as a dependent, a position with no reasonable basis that Rex should have known about. It wasn't willful.",
      question: "What's Rex's §6694 penalty for that return?",
      choices: ["$200", "$1,000", "$5,000", "$300"],
      answer: "$1,000",
      why: "For an unreasonable position, the penalty is the greater of $1,000 or 50% of the income from the return ($200). So $1,000.",
    },
    {
      who: "Hoot",
      title: "The reckless one",
      facts: "Rex earned a $12,000 fee on a return where he recklessly disregarded the rules, causing an understatement.",
      question: "What's the §6694(b) penalty?",
      choices: ["$5,000", "$6,000", "$12,000", "$9,000"],
      answer: "$9,000",
      why: "Willful or reckless conduct costs the greater of $5,000 or 75% of the income from the return. 75% of $12,000 is $9,000.",
    },
    {
      who: "Lulu",
      title: "Pick the sanction",
      facts: "OPR finds an enrolled agent willfully violated Circular 230.",
      question: "Which of these can OPR NOT impose?",
      choices: ["Censure", "Suspension for 3 years", "A prison sentence", "A monetary penalty"],
      answer: "A prison sentence",
      why: "Circular 230 sanctions are censure, suspension (up to 5 years), disbarment and monetary penalties. Prison only comes from a criminal court.",
    },
    {
      who: "Ace",
      title: "The practitioner's own taxes",
      facts: "An enrolled agent willfully didn't file her own federal returns for three years.",
      question: "Under Circular 230, this is:",
      choices: ["Disreputable conduct that can be sanctioned", "A private matter outside Circular 230", "Only a §6695 penalty", "Allowed if she files before an audit"],
      answer: "Disreputable conduct that can be sanctioned",
      why: "Willfully failing to file one's own federal tax returns is listed as disreputable conduct in §10.51.",
    },
    {
      who: "Rosa",
      title: "No signature, no copy",
      facts: "Rex prepared Rosa's return for a fee, didn't sign it and didn't give her a copy.",
      question: "What does Rex face?",
      choices: ["Nothing, if the return is accurate", "§6695 penalties for each failure", "Only an OPR censure", "A §6694 penalty"],
      answer: "§6695 penalties for each failure",
      why: "Failing to sign and failing to furnish a copy are each separate §6695 penalties, whether or not the return is accurate.",
    },
  ],
  quizTopics: ["Disreputable conduct", "Sanctions"],
  quizBrief: "When things go wrong: Circular 230 disreputable conduct, OPR sanctions (censure, suspension, disbarment, monetary), preparer penalties §6694 (50%/75%), §6695, §6701, signing returns",
};

export default lesson;

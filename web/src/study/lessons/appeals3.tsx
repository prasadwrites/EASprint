import { Ace, Backdrop, Hoot, Label, Lulu, Milo, Penny } from "../cast";
import type { Lesson } from "../lesson";
import { Gavel } from "../office";
import { Calendar, Card, CARD, Envelope, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 3, topic 3.2: audits and appeals: types of examinations, the 30-day letter and Appeals
// (formal protest vs. small case request), the notice of deficiency and Tax Court (including small
// tax cases), and refund suits. Written to Publications 5 and 556 as in effect for 2026.

const comic: Lesson["comic"] = [
  {
    alt: "Penny waves a letter covered in highlighter. Ace reads it with interest.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Penny x={84} y={128} scale={0.78} mood="stern" pose="hold" holding={<Envelope x={0} y={-6} label="30-DAY" irs />} />
        <Ace x={240} y={128} scale={0.78} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Hoot disallowed my bakery mileage. $9,000! I have a LOGBOOK!", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Ace", text: "Then we appeal. Under $25,000, a small case request is enough. No formal protest.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot bangs a gavel on a filing box, wearing a very serious expression. Ace facepalms.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Hoot x={90} y={130} scale={0.7} mood="stern" pose="up" />
        <Gavel x={146} y={112} scale={1.1} rotate={-40} />
        <Ace x={240} y={128} scale={0.78} mood="worried" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "ORDER! I have reviewed my own audit and find myself... CORRECT!", x: 3, y: 2, w: 48, tail: "down-left", shout: true },
      { who: "Ace", text: "Hoot. Appeals is independent. You're not invited.", x: 58, y: 4, w: 39, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu asks a question. Ace holds up a calendar showing 90.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Lulu x={70} y={160} scale={0.56} mood="thinking" pose="up" />
        <Calendar x={160} y={104} month="DAYS" day="90" scale={0.8} color="#6b4fbb" />
        <Ace x={250} y={128} scale={0.78} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "What if Appeals says no too?", x: 3, y: 4, w: 34, tail: "down-left" },
      { who: "Ace", text: "Then comes a 90-day letter. Petition Tax Court within 90 days, and you don't pay first.", x: 44, y: 2, w: 54, tail: "down-right" },
    ],
  },
  {
    alt: "Milo leans back relaxed. Ace and Hoot both lunge toward him in horror.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Milo x={60} y={128} scale={0.72} mood="happy" pose="shrug" />
        <Ace x={170} y={128} scale={0.72} mood="shocked" flip pose="up" />
        <Hoot x={262} y={130} scale={0.6} mood="shocked" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Ninety days? Relax. I'll file it on day 91.", x: 3, y: 2, w: 36, tail: "down-left" },
      { who: "Ace", text: "NO!", x: 46, y: 8, w: 16, tail: "down", shout: true },
      { who: "Hoot", text: "Day 91 is my favorite day.", x: 68, y: 4, w: 30, tail: "down-right" },
    ],
  },
  {
    alt: "Penny points at a small sign reading S case, up to $50,000. Ace has confiscated Hoot's gavel.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={50} y={128} scale={0.72} mood="thinking" pose="point" />
        <Card x={86} y={96} w={72} h={50} lines={["S case", "≤ $50,000"]} size={10} color="#fff3c4" />
        <Ace x={200} y={128} scale={0.66} mood="stern" flip pose="up" />
        <Gavel x={170} y={100} scale={0.8} rotate={-50} />
        <Hoot x={274} y={130} scale={0.56} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "And in Tax Court? Ours is small.", x: 3, y: 4, w: 32, tail: "down-left" },
      { who: "Ace", text: "Small tax case: $50,000 or less a year. Simpler, but no appeal after.", x: 36, y: 2, w: 36, tail: "down" },
      { who: "Hoot", text: "I'll allow it.", x: 74, y: 6, w: 24, tail: "down-right" },
    ],
  },
  {
    alt: "Penny cheers holding a letter marked settled. Lulu bangs the gavel on the table. Hoot sulks.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Penny x={60} y={128} scale={0.72} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="SETTLED" color="#d8f0e2" />} />
        <Lulu x={160} y={160} scale={0.52} mood="excited" pose="up" />
        <Gavel x={190} y={116} scale={0.9} rotate={20} />
        <Hoot x={264} y={130} scale={0.6} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Appeals read my logbook. Mileage allowed!", x: 3, y: 2, w: 34, tail: "down-left" },
      { who: "Lulu", text: "CASE CLOSED! Cookies for everyone!", x: 38, y: 2, w: 30, tail: "down", shout: true },
      { who: "Hoot", text: "That was MY gavel.", x: 72, y: 6, w: 26, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Three kinds of exams",
    alt: "A mailbox for a correspondence exam, an IRS office for an office exam, and a house for a field exam.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={14} w={94} h={110} color="#d8f0e2" label="Mail" sub="correspondence" />
        <Step x={113} y={14} w={94} h={110} color="#fff3c4" label="Office" sub="at an IRS office" />
        <Step x={212} y={14} w={94} h={110} color="#fde2e4" label="Field" sub="home or business" />
        <Label x={160} y={150} size={10} weight={700}>The IRS notifies by mail first, never by surprise email</Label>
      </svg>
    ),
    body: [
      "The IRS starts an examination by mail. A correspondence exam is handled entirely by letter and usually covers a few items. An office exam takes place at an IRS office with a tax compliance officer. A field exam is done by a revenue agent at the taxpayer's home, business or the representative's office and usually covers more complex returns.",
      "A taxpayer can be represented throughout, and can ask to move the exam to a different location in some cases. At the end the examiner proposes changes, or issues a no-change report.",
    ],
    keyPoint: "Exams: correspondence (by mail), office (at an IRS office), field (revenue agent at home or business). Contact starts by mail. Ends with proposed changes or a no-change letter.",
  },
  {
    title: "The 30-day letter and Appeals",
    alt: "A 30-day letter leads to Appeals. Over $25,000 for any period needs a formal written protest; $25,000 or less can use a small case request.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Envelope x={56} y={70} label="30-DAY" scale={1.6} irs />
        <Card x={110} y={14} w={198} h={46} lines={["Over $25,000 for a period:", "formal written protest"]} size={10} color="#fde2e4" />
        <Card x={110} y={66} w={198} h={46} lines={["$25,000 or less:", "small case request"]} size={10} color="#d8f0e2" />
        <Card x={110} y={118} w={198} h={46} lines={["Independent Office of Appeals", "(not the examiner)"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "If the taxpayer disagrees with proposed changes, the IRS sends a 30-day letter with the examination report and an explanation of appeal rights. The taxpayer can ask for a conference with the Independent Office of Appeals, which is separate from the examination function.",
      "If the total amount for any tax period is more than $25,000, the taxpayer must file a formal written protest stating the facts, the law and the items in dispute, signed under penalties of perjury (a representative signs a declaration instead). If it's $25,000 or less for each period, a small case request is enough. Publication 5 explains how to prepare a protest.",
    ],
    keyPoint: "30-day letter → request Appeals (independent of Exam). More than $25,000 for any period: formal written protest (Pub 5). $25,000 or less per period: small case request.",
  },
  {
    title: "The notice of deficiency and Tax Court",
    alt: "A 90-day letter. Petition the Tax Court within 90 days, or 150 days if addressed outside the U.S. No payment needed first.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Calendar x={70} y={70} month="DAYS" day="90" scale={1} color="#6b4fbb" />
        <Label x={70} y={140} size={11}>150 if addressed</Label>
        <Label x={70} y={156} size={11}>outside the U.S.</Label>
        <Card x={140} y={14} w={168} h={70} lines={["Petition Tax Court", "without paying first"]} size={11} color="#fff" />
        <Card x={140} y={92} w={168} h={70} lines={["Miss it: the tax", "is assessed"]} size={11} color="#fde2e4" />
      </svg>
    ),
    body: [
      "If the case isn't settled, the IRS issues a statutory notice of deficiency (the 90-day letter). The taxpayer has 90 days from the mailing date (150 days if the notice is addressed to someone outside the U.S.) to petition the U.S. Tax Court. The Tax Court is the only court where the taxpayer can contest the tax without paying it first.",
      "If no petition is filed in time, the IRS assesses the tax and starts collection. Cases docketed in Tax Court are usually sent to Appeals for settlement before trial.",
    ],
    keyPoint: "Notice of deficiency (90-day letter): petition Tax Court within 90 days (150 if addressed outside the U.S.); no prepayment required. Miss the deadline and the tax is assessed.",
  },
  {
    title: "Small tax cases",
    alt: "The S case: $50,000 or less for each year, informal, but the decision can't be appealed.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={140} h={100} color="#fff3c4" label="S case" sub="≤ $50,000 per year" />
        <Step x={166} y={14} w={140} h={100} color="#fde2e4" label="Final" sub="no appeal either way" />
        <Label x={160} y={142} size={10} weight={700}>Informal procedures; regular cases can be</Label>
        <Label x={160} y={160} size={10} weight={700}>appealed to a U.S. Court of Appeals</Label>
      </svg>
    ),
    body: [
      "If the amount in dispute (including penalties) is $50,000 or less for any one year, the taxpayer can elect the small tax case (S case) procedure. Trials are informal and quicker, but the decision can't be appealed by either side and isn't precedent.",
      "In a regular Tax Court case, either side can appeal to the U.S. Court of Appeals for the taxpayer's circuit.",
    ],
    keyPoint: "Small tax case: $50,000 or less per year (including penalties); informal; decision is final, can't be appealed, no precedent. Regular Tax Court decisions can be appealed to a U.S. Court of Appeals.",
  },
  {
    title: "Pay first, then sue for a refund",
    alt: "The other route: pay the tax, file a claim for refund, then sue in a U.S. District Court or the Court of Federal Claims.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={94} h={104} color="#d8f0e2" label="1 Pay" sub="the full tax" />
        <Step x={113} y={14} w={94} h={104} color="#fff3c4" label="2 Claim" sub="for refund" />
        <Step x={212} y={14} w={94} h={104} color="#e7e3f3" label="3 Sue" sub="in a refund suit" />
        <Label x={160} y={142} size={10} weight={700}>Sue after 6 months of IRS silence,</Label>
        <Label x={160} y={160} size={10} weight={700}>within 2 years of a disallowance</Label>
      </svg>
    ),
    body: [
      "Instead of going to Tax Court, a taxpayer can pay the tax, file a claim for refund, and if the IRS denies it (or doesn't act within 6 months), sue for a refund in a U.S. District Court or the U.S. Court of Federal Claims.",
      "The suit must be filed within 2 years after the IRS mails a notice disallowing the claim. A jury trial is available only in District Court.",
    ],
    keyPoint: "Refund route: pay, file a claim, then sue in U.S. District Court or the Court of Federal Claims after a denial or 6 months without action, and within 2 years of the notice of disallowance.",
  },
];

const lesson: Lesson = {
  id: "p3-audits-appeals",
  part: "part3",
  domainId: "p3d3",
  number: "3.2",
  episode: "Penny Takes It to Appeals",
  title: "Audits and appeals",
  minutes: 12,
  lawAsOf: "rules in effect for 2026",
  intro: "The three kinds of exams, the 30-day letter and the Independent Office of Appeals, the 90-day letter and Tax Court, small tax cases, and the pay-first refund route.",
  previously: "Milo is on a payment plan. But Penny has reread Hoot's report with a highlighter, and one adjustment is very, very yellow.",
  comic,
  cards,
  hook: {
    line: "30 days to Appeals. 90 days to Tax Court.",
    more: "Protest if over $25,000 a period. S case if $50,000 or less a year. 150 days if outside the U.S. Pay-first route: refund suit.",
    alt: "Two calendars, 30 and 90, and Hoot's gavel.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7e3f3" />
        <Calendar x={70} y={60} month="APPEALS" day="30" scale={0.8} color="#1d7a49" />
        <Calendar x={170} y={60} month="TAX CT" day="90" scale={0.8} color="#6b4fbb" />
        <Gavel x={260} y={50} scale={1.1} rotate={-30} />
        <Mark x={120} y={70} text="→" color="#2a2f3a" size={26} />
      </svg>
    ),
  },
  traps: [
    { title: "Pay before Tax Court", text: "Tax Court is the one court where the taxpayer doesn't pay first." },
    { title: "Every appeal needs a protest", text: "A formal written protest is needed only above $25,000 for a period; otherwise a small case request works." },
    { title: "Appeal the S case", text: "Small tax case decisions are final and can't be appealed." },
    { title: "Day 91 is fine", text: "The 90-day deadline (150 outside the U.S.) is strict: miss it and the tax is assessed." },
  ],
  sources: [
    { key: "p5", section: "Your appeal rights" },
    { key: "p556", section: "Examination of returns, appeal rights" },
  ],
  cases: [
    {
      who: "Penny",
      title: "The mileage fight",
      facts: "Penny's 30-day letter proposes $9,000 of extra tax and penalties for 2025. She wants an Appeals conference.",
      question: "What does she need to file?",
      choices: ["A formal written protest", "A Tax Court petition", "A small case request", "Form 12153"],
      answer: "A small case request",
      why: "If the total for each period is $25,000 or less, a small case request is enough. Above that, a formal written protest is required.",
    },
    {
      who: "Milo",
      title: "Day 91",
      facts: "A client received a notice of deficiency mailed to his home in Ledger Falls on May 1. He wants to fight it without paying first.",
      question: "What must he do?",
      choices: ["Pay, then sue in District Court", "Petition the Tax Court within 90 days", "Petition within 150 days", "Request a CDP hearing"],
      answer: "Petition the Tax Court within 90 days",
      why: "A taxpayer in the U.S. has 90 days from the mailing of the notice of deficiency to petition the Tax Court, which doesn't require prepayment.",
    },
    {
      who: "Ace",
      title: "The S case",
      facts: "A client disputes a $38,000 deficiency for one year and wants a quick, informal trial.",
      question: "What's true if she elects a small tax case?",
      choices: ["She must pay first", "The decision can't be appealed", "Only the IRS can appeal", "The limit is $25,000"],
      answer: "The decision can't be appealed",
      why: "Small tax cases ($50,000 or less per year) are informal, but neither side can appeal the decision.",
    },
    {
      who: "Hoot",
      title: "The refund route",
      facts: "A taxpayer paid the full deficiency and filed a refund claim. Seven months later the IRS still hasn't acted.",
      question: "Where can she sue for a refund?",
      choices: ["Nowhere until it's denied", "Only the Tax Court", "The Independent Office of Appeals", "A U.S. District Court or the Court of Federal Claims"],
      answer: "A U.S. District Court or the Court of Federal Claims",
      why: "After paying and claiming a refund, a taxpayer can sue in District Court or the Court of Federal Claims once the claim is denied or 6 months pass without action.",
    },
  ],
  quizTopics: [],
  quizBrief: "Audits and appeals: correspondence, office and field exams, 30-day letter, formal protest over $25,000, 90-day letter, Tax Court in 90 days (150 abroad), S cases up to $50,000, refund suits",
};

export default lesson;

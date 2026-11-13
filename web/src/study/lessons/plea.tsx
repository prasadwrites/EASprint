import { Ace, Backdrop, Hoot, Label, Milo, Penny, VideoCall } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, Envelope, HOOK, Mark, PANEL, Paper, Stamp, Step } from "../props";

// Part 1, topic 5.3: spouse relief and refunds: joint and several liability, innocent spouse relief
// (Form 8857), injured spouse allocation (Form 8379), amended returns and refund claims (Form 1040-X), and
// signing under penalties of perjury. Written to the rules for tax year 2025 from the Form 8857, 8379 and
// 1040-X instructions and Publication 17.

const comic: Lesson["comic"] = [
  {
    alt: "Dee on a video call waves an IRS letter in panic. Penny gasps.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <VideoCall x={20} y={92} scale={1} mood="shocked" pose="up" bars={2} />
        <Envelope x={180} y={120} label="IRS" irs />
        <Penny x={256} y={128} scale={0.76} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "The IRS says I owe $9,000! Vince hid a side job on our 2023 joint return!", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Penny", text: "But he's your EX!", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Ace explains calmly. Hoot holds up his clipboard with one wing, very pleased.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={84} y={128} scale={0.78} mood="thinking" pose="point" />
        <Hoot x={236} y={130} scale={0.7} mood="smug" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "A joint return means joint and several liability. Each spouse owes the whole bill.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Hoot", text: "The WHOLE bill. Divorce or no divorce!", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds Form 8857. Dee on the tablet looks hopeful.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="8857" sub="relief" color="#d8f0e2" />} />
        <VideoCall x={176} y={92} scale={1} mood="happy" pose="wave" bars={2} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "But you didn't know, Dee. Ask for innocent spouse relief on Form 8857, within 2 years of collection starting.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Dee", text: "Filing it tonight!", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a letter reading refund offset. Milo looks sheepish.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Penny x={84} y={128} scale={0.78} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="OFFSET" sub="-$2,400" color="#fde2e4" />} />
        <Milo x={240} y={128} scale={0.78} mood="worried" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Our whole refund went to Milo's old student loan!", x: 3, y: 3, w: 38, tail: "down-left" },
      { who: "Milo", text: "Sorry! Is it gone forever?", x: 60, y: 5, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Ace shows two forms: 8379 for Penny's share and 1040-X with a calendar showing 3 years.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="8379" sub="injured" color="#d8f0e2" />} />
        <Paper x={200} y={120} label="1040-X" sub="refund" color="#fff3c4" />
        <Mark x={270} y={140} text="3 yrs" color="#3f7cc4" size={18} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Penny, Form 8379 gets your share back. And that missed credit from 2023? A 1040-X, within 3 years of filing.", x: 3, y: 2, w: 62, tail: "down-left" },
    ],
  },
  {
    alt: "Penny signs a return. Hoot points at the line above her signature. Dee cheers on the tablet.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#efe3f7" />
        <Penny x={60} y={128} scale={0.72} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="SIGN" sub="here" />} />
        <Hoot x={156} y={130} scale={0.64} mood="stern" pose="point" flip />
        <VideoCall x={200} y={100} scale={0.86} mood="excited" pose="up" bars={2} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "And I sign right here!", x: 3, y: 6, w: 30, tail: "down-left" },
      { who: "Hoot", text: "Under penalties of perjury! True, correct and complete!", x: 34, y: 2, w: 34, tail: "down" },
      { who: "Dee", text: "Relief granted, by the way!", x: 70, y: 3, w: 28, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Joint and several liability",
    alt: "Two spouses chained to one tax bill: each owes all of it, even after a divorce.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Paper x={160} y={60} label="$9,000" sub="joint bill" scale={1.6} color="#fde2e4" />
        <Card x={14} y={36} w={90} h={48} lines={["Dee:", "all of it"]} size={11} color="#fff" />
        <Card x={216} y={36} w={90} h={48} lines={["Vince:", "all of it"]} size={11} color="#fff" />
        <Card x={40} y={120} w={240} h={46} lines={["Divorce decrees don't bind the IRS"]} size={11} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Spouses who file a joint return are jointly and severally liable for the tax, interest and penalties on it, even if only one spouse earned the income or made the error. The IRS can collect the whole amount from either spouse.",
      "A divorce decree that says one spouse will pay doesn't change that. The relief provisions below are the way out.",
    ],
    keyPoint: "Joint return = joint and several liability: each spouse owes the full tax, interest and penalties, even after divorce, and even if a decree says otherwise.",
  },
  {
    title: "Three kinds of spouse relief (Form 8857)",
    alt: "Three doors: innocent spouse relief, separation of liability, and equitable relief, all requested on Form 8857.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={94} h={100} color="#d8f0e2" label="Innocent" sub="didn't know" />
        <Step x={113} y={14} w={94} h={100} color="#d4ebfa" label="Separate" sub="split the bill" />
        <Step x={212} y={14} w={94} h={100} color="#fff3c4" label="Equitable" sub="unfair; unpaid" />
        <Label x={160} y={146} size={12}>All on Form 8857</Label>
        <Label x={160} y={166} size={10} weight={700}>innocent and separate: within 2 years of collection</Label>
      </svg>
    ),
    body: [
      "Innocent spouse relief: the joint return has an understatement from the other spouse's erroneous items, and the requesting spouse didn't know and had no reason to know, so holding them liable would be unfair. Separation of liability: for spouses who are divorced, widowed, legally separated or haven't lived together for 12 months, the understatement is allocated between them.",
      "Equitable relief covers what the others can't, including tax that was reported but not paid. All three are requested on Form 8857. Innocent spouse and separation of liability must be requested within 2 years after the IRS's first collection activity against the requesting spouse; equitable relief, generally within the collection or refund period.",
    ],
    keyPoint: "Form 8857. Innocent spouse (understatement, didn't know); separation of liability (divorced, widowed, separated or apart 12 months; allocates the understatement); equitable relief (anything else, including unpaid reported tax). First two: within 2 years of first collection activity.",
  },
  {
    title: "Injured spouse (Form 8379)",
    alt: "A joint refund grabbed by an offset for Milo's student loan; Form 8379 returns Penny's share.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={56} y={70} label="REFUND" sub="joint" scale={1.6} color="#d8f0e2" />
        <Card x={110} y={14} w={198} h={46} lines={["Offset for one spouse's debt:", "student loan, support, state tax"]} size={10} color="#fde2e4" />
        <Card x={110} y={68} w={198} h={46} lines={["Form 8379: the other spouse's", "share comes back"]} size={10} color="#fff" />
        <Card x={14} y={124} w={294} h={42} lines={["Not liable for the debt? You're the injured spouse."]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "If a joint refund is applied (offset) to one spouse's past-due federal tax, state income tax, child or spousal support, federal nontax debt like a student loan, or state unemployment debt, the other spouse may be an injured spouse.",
      "The injured spouse files Form 8379, with the joint return or afterward, to get back their share of the refund. They must not be legally obligated for the debt. Injured spouse is about refunds; innocent spouse is about tax owed.",
    ],
    keyPoint: "Injured spouse (Form 8379): a joint refund was offset for the OTHER spouse's past-due debt (tax, support, student loan, state unemployment); get your share back. Innocent spouse (8857) is relief from tax owed.",
  },
  {
    title: "Amended returns and refund claims",
    alt: "Form 1040-X with two clocks: 3 years from filing or 2 years from paying, whichever is later. A 7-year clock for bad debts and worthless securities.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Paper x={56} y={84} label="1040-X" sub="amended" scale={1.8} color="#fff3c4" />
        <Card x={110} y={14} w={198} h={46} lines={["3 years from filing", "or 2 years from paying"]} size={11} color="#fff" />
        <Card x={110} y={68} w={198} h={36} lines={["whichever is later"]} size={11} color="#d8f0e2" />
        <Card x={110} y={112} w={198} h={52} lines={["7 years: bad debts,", "worthless securities"]} size={11} color="#fff" />
      </svg>
    ),
    body: [
      "Form 1040-X corrects a filed return (income, deductions, credits or filing status) and can be e-filed. To claim a refund, file it within 3 years after the original return was filed or 2 years after the tax was paid, whichever is later. A return filed early counts as filed on the due date.",
      "The refund is limited to tax paid within the 3 years (plus extensions) before the claim, or within the 2 years if that's the later window. Claims for a bad debt or worthless securities get 7 years.",
    ],
    keyPoint: "1040-X refund claim: within 3 years of filing (early returns count as filed on the due date) or 2 years of paying, whichever is later; refund limited to tax paid in that lookback. 7 years for bad debts and worthless securities.",
  },
  {
    title: "Penalties of perjury",
    alt: "A signature line under the declaration: true, correct and complete. Both spouses sign a joint return; a preparer's declaration covers what they know.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={14} y={14} w={292} h={70} lines={["\"Under penalties of perjury, I declare...", "true, correct, and complete.\""]} size={11} color="#fff" />
        <path d="M30,120 H180" stroke="#17202c" strokeWidth={2} />
        <Label x={105} y={138} size={10} weight={700}>taxpayer (both on a joint)</Label>
        <path d="M200,120 H300" stroke="#17202c" strokeWidth={2} />
        <Label x={250} y={138} size={10} weight={700}>paid preparer</Label>
        <Stamp x={160} y={164} text="SIGNED" size={12} rotate={-4} />
      </svg>
    ),
    body: [
      "Every return and claim is signed under penalties of perjury: the signer declares it's true, correct and complete to the best of their knowledge and belief. Both spouses sign a joint return, and an unsigned return isn't a valid return.",
      "A paid preparer's declaration is based on all information the preparer has knowledge of. Knowingly signing a false return is a felony.",
    ],
    keyPoint: "Returns are signed under penalties of perjury (true, correct and complete). Both spouses sign a joint return; unsigned isn't valid. A preparer's declaration is based on all information they know.",
  },
];

const lesson: Lesson = {
  id: "p1-spouse-relief",
  part: "part1",
  domainId: "p1d5",
  number: "5.3",
  episode: "Dee's Plea",
  title: "Spouse relief and refunds",
  minutes: 12,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "Joint and several liability, the three kinds of spouse relief on Form 8857, injured spouse claims on Form 8379, amended returns and refund deadlines, and penalties of perjury.",
  previously: "Penny finally planned ahead. Then Cousin Dee calls from the rig with an IRS letter about her ex-husband Vince.",
  comic,
  cards,
  hook: {
    line: "Innocent spouse: about tax OWED. Injured spouse: about a REFUND taken.",
    more: "8857 for innocent, 8379 for injured. 1040-X refunds: 3 years from filing or 2 from paying.",
    alt: "Two forms side by side: 8857 owed, 8379 refund.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#eef5f1" />
        <Paper x={70} y={60} label="8857" sub="owed" scale={1.5} color="#fde2e4" />
        <Mark x={160} y={70} text="vs" color="#17202c" size={22} />
        <Paper x={250} y={60} label="8379" sub="refund" scale={1.5} color="#d8f0e2" />
      </svg>
    ),
  },
  traps: [
    { title: "Mixing up innocent and injured", text: "Innocent spouse (8857) is relief from tax owed. Injured spouse (8379) recovers a refund offset for the other spouse's debt." },
    { title: "Trusting the divorce decree", text: "A decree assigning the tax to one spouse doesn't bind the IRS. Both stay liable on a joint return." },
    { title: "Separation of liability while together", text: "It's only for spouses who are divorced, widowed, legally separated, or haven't lived together for 12 months." },
    { title: "Counting 3 years from an early filing date", text: "A return filed early counts as filed on the due date." },
  ],
  sources: [
    { key: "i8857", section: "Types of Relief; When To File" },
    { key: "i8379", section: "Purpose of Form; Are You an Injured Spouse?" },
    { key: "i1040x", section: "When To File; Special Situations" },
    { key: "p17", section: "Signing Your Return; Amended Returns and Claims for Refund" },
  ],
  cases: [
    {
      who: "Dee",
      title: "Vince's hidden job",
      facts: "On their 2023 joint return, Vince left out $30,000 from a side job. They divorced in 2025. The decree says Vince pays any tax for 2023.",
      question: "Who can the IRS collect the extra tax from?",
      choices: ["Only Vince, per the decree", "Only the spouse who earned it", "Either Dee or Vince, for the full amount", "Each for half"],
      answer: "Either Dee or Vince, for the full amount",
      why: "Joint filers are jointly and severally liable, and a divorce decree doesn't bind the IRS. Dee needs to request relief.",
    },
    {
      who: "Ace",
      title: "Dee's relief request",
      facts: "Dee didn't know and had no reason to know about Vince's side job. The IRS sent her a collection notice in March 2025.",
      question: "What should she file, and by when?",
      choices: ["Form 8379 by April 15", "Form 8857 within 2 years after the IRS's first collection activity against her", "Form 1040-X within 3 years", "Nothing; divorce ends liability"],
      answer: "Form 8857 within 2 years after the IRS's first collection activity against her",
      why: "Innocent spouse relief (and separation of liability) is requested on Form 8857 within 2 years after the IRS's first collection activity against the requesting spouse.",
    },
    {
      who: "Penny",
      title: "The refund offset",
      facts: "Penny and Milo's 2025 joint refund of $2,400 was offset for Milo's past-due federal student loan, which he took out before they married.",
      question: "What can Penny file to get her share back?",
      choices: ["Form 8857, innocent spouse", "Form 1040-X", "Form 8379, injured spouse", "Nothing; joint refunds belong to both"],
      answer: "Form 8379, injured spouse",
      why: "Penny isn't liable for Milo's debt, so she's an injured spouse. Form 8379 allocates the refund and returns her share.",
    },
    {
      who: "Milo",
      title: "The missed credit",
      facts: "Penny and Milo filed their 2023 return on April 1, 2024 and paid all tax by then. They later find a credit they missed.",
      question: "What's the last day to claim the refund on Form 1040-X?",
      choices: ["April 1, 2027", "April 15, 2026", "April 15, 2027", "December 31, 2026"],
      answer: "April 15, 2027",
      why: "A return filed early counts as filed on the due date, April 15, 2024. The refund claim deadline is 3 years later: April 15, 2027.",
    },
    {
      who: "Hoot",
      title: "Still married",
      facts: "Pastor Gail and her husband still live together. An understatement on their joint return came from his unreported income.",
      question: "Which relief is she NOT eligible for?",
      choices: ["Innocent spouse relief", "Equitable relief", "Separation of liability", "She can't ask for any relief"],
      answer: "Separation of liability",
      why: "Separation of liability requires being divorced, widowed, legally separated, or not living together for 12 months. She can still ask for innocent spouse or equitable relief.",
    },
  ],
  quizTopics: ["Injured spouse", "Claims for refund", "Joint and several liability"],
  quizBrief: "Spouse relief and refunds: joint and several liability, innocent spouse, separation of liability, equitable relief (Form 8857), injured spouse (Form 8379), 1040-X deadlines, perjury",
};

export default lesson;

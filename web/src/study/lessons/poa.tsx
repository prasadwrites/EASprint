import { Ace, Backdrop, Biscuit, Hoot, Label, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, Envelope, HOOK, Mailbox, PANEL, Paper, Step } from "../props";

// Part 3, topic 2.1: power of attorney: Form 2848, Form 8821, the Centralized Authorization File,
// revocation and withdrawal, the third party designee, and conference and practice requirements.
// Written to the Form 2848 and 8821 instructions and Publications 947 and 216 as in effect for 2026.

const comic: Lesson["comic"] = [
  {
    alt: "Penny holds an IRS letter reading audit, 2025 return. Milo clutches his chest. Hoot waves from beside the mailbox.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={60} y={128} scale={0.72} mood="shocked" pose="hold" holding={<Envelope x={0} y={-8} label="AUDIT" irs />} />
        <Milo x={150} y={128} scale={0.72} mood="shocked" />
        <Mailbox x={232} y={150} scale={0.8} flag />
        <Hoot x={286} y={132} scale={0.58} mood="excited" flip pose="wave" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Milo. We're being AUDITED. Our 2025 return!", x: 3, y: 2, w: 34, tail: "down-left" },
      { who: "Milo", text: "I would like to faint now.", x: 36, y: 4, w: 26, tail: "down" },
      { who: "Hoot", text: "Surprise! Hoo-hoo!", x: 68, y: 4, w: 30, tail: "down-right" },
    ],
  },
  {
    alt: "Ace slides two Forms 2848 across the table, one for Penny and one for Milo.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e3eef7" />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="2848" sub="x 2" color="#d8f0e2" />} />
        <Penny x={240} y={128} scale={0.78} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Sign a Form 2848 and I deal with Hoot for you. One each, even on a joint return.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Penny", text: "Can't Milo just sign mine?", x: 62, y: 6, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Biscuit chews happily on a Form 2848. Milo points in horror.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="shocked" pose="point" />
        <Biscuit x={190} y={176} scale={0.6} mood="excited" />
        <Paper x={226} y={150} label="28" sub="chewed" rotate={-20} scale={0.8} />
        <Ace x={276} y={130} scale={0.6} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "BISCUIT ATE MY POWER OF ATTORNEY!", x: 3, y: 2, w: 40, tail: "down-left", shout: true },
      { who: "Ace", text: "I'll print another and send it to the CAF unit. Again.", x: 56, y: 3, w: 41, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa holds a paper reading bookkeeper. Ace holds Form 8821.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="BOOKS" sub="see only" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="8821" sub="look only" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "My bookkeeper just needs to SEE my transcripts.", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Ace", text: "Then Form 8821, Rosa. She can look and ask, but she can't represent you.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Penny points at a checkbox on the 1040 labeled third party designee. Ace shrugs with a small smile.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="1040" sub="☑ designee" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Didn't we already check the “third party designee” box?", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "That only lets me ask about that return's processing, until next year's due date. Not an audit.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "At the audit meeting, Ace arrives with a folder and a box of cinnamon rolls. Hoot eyes the box suspiciously.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Ace x={84} y={128} scale={0.78} mood="smug" pose="hold" holding={<Paper x={0} y={-8} label="ROLLS" sub="+ 2848s" color="#fff3c4" />} />
        <Hoot x={236} y={130} scale={0.7} mood="thinking" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Two Forms 2848, the documents you asked for, and I'm on time.", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Hoot", text: "And... are those Rosa's rolls?! ...Acceptable.", x: 56, y: 3, w: 41, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Form 2848: power of attorney",
    alt: "Form 2848, signed by the taxpayer and the representative, naming specific tax matters, forms and years. Future years can go up to 3 years after the IRS receives it. Each spouse files their own.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e3eef7" />
        <Paper x={56} y={80} label="2848" sub="POA" scale={1.8} color="#d8f0e2" />
        <Card x={110} y={12} w={198} h={36} lines={["Practitioners only (Circ. 230)"]} size={10} color="#fff" />
        <Card x={110} y={54} w={198} h={36} lines={["Specific matters, forms, years"]} size={10} color="#fff" />
        <Card x={110} y={96} w={198} h={36} lines={["Future years: ≤ 3 after received"]} size={10} color="#fff3c4" />
        <Card x={110} y={138} w={198} h={32} lines={["One per spouse"]} size={11} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Form 2848 authorizes an eligible representative (an attorney, CPA, enrolled agent or other person allowed to practice) to represent a taxpayer before the IRS. The taxpayer and the representative both sign it, and it must list the specific tax matters, form numbers and tax periods. Future periods can be listed only up to 3 years after the date the IRS receives the form.",
      "For a joint return, each spouse files their own Form 2848. A general reference like “all years” or “all taxes” isn't accepted.",
    ],
    keyPoint: "Form 2848: taxpayer + eligible representative sign; specific matters, forms and periods (future periods up to 3 years after IRS receives it; no “all years”). Spouses each file their own.",
  },
  {
    title: "What a representative can and can't do",
    alt: "Two columns. Can: receive confidential information, represent, sign agreements, consents and waivers such as statute extensions. Can't: endorse or cash refund checks, sign the return except in narrow cases, add or substitute a representative unless allowed.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={14} w={140} h={150} color="#d8f0e2">
          <Label x={84} y={36} size={11}>Can</Label>
          <Label x={84} y={62} size={10} weight={700}>see confidential info</Label>
          <Label x={84} y={80} size={10} weight={700}>speak for the client</Label>
          <Label x={84} y={98} size={10} weight={700}>sign agreements,</Label>
          <Label x={84} y={114} size={10} weight={700}>consents, waivers</Label>
        </Card>
        <Card x={166} y={14} w={140} h={150} color="#fde2e4">
          <Label x={236} y={36} size={11}>Can't</Label>
          <Label x={236} y={62} size={10} weight={700}>endorse or cash</Label>
          <Label x={236} y={78} size={10} weight={700}>refund checks</Label>
          <Label x={236} y={98} size={10} weight={700}>sign the return</Label>
          <Label x={236} y={114} size={10} weight={700}>(except narrow cases)</Label>
          <Label x={236} y={134} size={10} weight={700}>add a substitute</Label>
        </Card>
      </svg>
    ),
    body: [
      "A representative named on Form 2848 can generally receive and inspect confidential tax information and perform any act the taxpayer can for the listed matters, including signing consents to extend the statute of limitations, closing agreements and waivers.",
      "They can't endorse or negotiate a refund check, sign the return (except in narrow cases such as the taxpayer's illness or a long absence, with permission), or substitute or add another representative unless the form specifically authorizes it.",
    ],
    keyPoint: "A 2848 representative can receive confidential info and act for the taxpayer, including signing agreements, consents and statute extensions. Not: endorse/cash refund checks, sign the return (except narrow cases), or add/substitute representatives unless authorized.",
  },
  {
    title: "Form 8821: look, don't represent",
    alt: "Form 8821 lets any person or firm inspect and receive tax information, but not represent. It must reach the IRS within 120 days of the taxpayer signing to be recorded.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={56} y={80} label="8821" sub="info" scale={1.8} color="#fff3c4" />
        <Card x={110} y={14} w={198} h={46} lines={["Anyone: a person, firm", "or bookkeeper"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["See and receive info.", "No representing"]} size={10} color="#d8f0e2" />
        <Card x={110} y={118} w={198} h={46} lines={["Must reach the IRS within", "120 days of signing"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Form 8821, Tax Information Authorization, lets any individual, firm or organization the taxpayer names inspect or receive their confidential tax information for the listed matters. It doesn't let the designee represent the taxpayer, argue, sign agreements or speak for them.",
      "The designee doesn't have to be a practitioner. For the IRS to record it, Form 8821 must be received within 120 days of the taxpayer's signature.",
    ],
    keyPoint: "Form 8821: any person or organization may inspect/receive tax info; no representation. Must reach the IRS within 120 days of the taxpayer signing.",
  },
  {
    title: "The CAF, revoking and withdrawing",
    alt: "A filing drawer labeled CAF holds Forms 2848 and 8821. A new form for the same matter revokes the old one unless you keep it. Write REVOKE or WITHDRAW across a copy to end one.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Step x={14} y={14} w={140} h={90} color="#d4ebfa" label="CAF" sub="IRS's record of POAs" />
        <Card x={166} y={14} w={140} h={90} lines={["New form for same", "matter replaces old", "(unless you keep it)"]} size={10} color="#fff" />
        <Card x={14} y={114} w={140} h={50} lines={["Taxpayer: “REVOKE”"]} size={10} color="#fde2e4" />
        <Card x={166} y={114} w={140} h={50} lines={["Rep: “WITHDRAW”"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "The Centralized Authorization File (CAF) is the IRS system that records Forms 2848 and 8821 so IRS employees can confirm who may receive information or act for a taxpayer. Representatives get a CAF number. Forms for specific-use matters (like a request for a private letter ruling) aren't recorded on the CAF.",
      "Filing a new Form 2848 for the same matters revokes earlier ones unless the taxpayer checks the box to keep them and attaches copies. A taxpayer revokes by sending a copy with “REVOKE” written across the top and signing; a representative withdraws by writing “WITHDRAW” and signing.",
    ],
    keyPoint: "CAF records 2848s/8821s (reps get a CAF number). A new 2848 for the same matters revokes prior ones unless retained. Revoke: copy marked “REVOKE”, signed by the taxpayer. Withdraw: copy marked “WITHDRAW”, signed by the rep.",
  },
  {
    title: "Third party designee",
    alt: "A checkbox on the return naming a designee, who can talk to the IRS about processing that return only, until the due date of next year's return.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Paper x={56} y={80} label="1040" sub="☑ designee" scale={1.8} />
        <Card x={110} y={14} w={198} h={46} lines={["That return only:", "refund, math errors"]} size={10} color="#d8f0e2" />
        <Card x={110} y={66} w={198} h={46} lines={["Ends at next year's", "due date (no extension)"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["Can't represent", "in an exam"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "The third party designee checkbox on a return lets the named person (often the preparer) talk to the IRS about the processing of that return: refund status, payments, math errors and certain notices. They can ask for copies of notices about that return.",
      "The authority ends automatically on the due date (without extensions) of the next year's return. It doesn't allow representation in an exam or appeal, and doesn't need to be recorded on the CAF.",
    ],
    keyPoint: "Third party designee (checkbox on the return): discuss that return's processing (refunds, math errors, notices); ends at the due date, without extensions, of next year's return; no representation.",
  },
  {
    title: "Conference and practice requirements",
    alt: "A representative arrives at an IRS meeting with a valid power of attorney, prepared and on time. If a representative unreasonably delays, the IRS can bypass them and contact the taxpayer directly.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#e7e3f3" floorY={160} />
        <Ace x={50} y={118} scale={0.4} mood="happy" />
        <Hoot x={110} y={120} scale={0.38} mood="stern" flip />
        <Card x={150} y={12} w={158} h={46} lines={["Valid 2848 on file", "before talking details"]} size={10} color="#d8f0e2" />
        <Card x={150} y={64} w={158} h={46} lines={["Prepared, prompt,", "courteous"]} size={10} color="#fff" />
        <Card x={150} y={116} w={158} h={40} lines={["Stalling? IRS can bypass"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Publication 216 sets out the conference and practice requirements: a representative needs a valid authorization on file before discussing a taxpayer's confidential information, and is expected to be prepared, prompt and courteous with IRS personnel.",
      "If a representative unreasonably delays or hinders an examination or collection (for example, by repeatedly missing meetings or not providing information), the IRS may, with a supervisor's approval, bypass the representative and contact the taxpayer directly.",
    ],
    keyPoint: "Pub 216: valid authorization on file before discussing confidential info; be prepared, prompt and courteous. A representative who unreasonably delays can be bypassed (with supervisor approval) and the IRS contacts the taxpayer directly.",
  },
];

const lesson: Lesson = {
  id: "p3-power-of-attorney",
  part: "part3",
  domainId: "p3d2",
  number: "2.1",
  episode: "Hoot Audits the Pockets",
  title: "Power of attorney",
  minutes: 12,
  lawAsOf: "rules in effect for 2026",
  intro: "Form 2848 and what a representative can and can't do, Form 8821 for information only, the CAF, revoking and withdrawing, the third party designee, and conference and practice requirements.",
  previously: "Hoot has been busy with Quick Refund Rex. Now he's found time for an old favorite: Penny and Milo's first joint return.",
  comic,
  cards,
  hook: {
    line: "2848 speaks for you. 8821 only looks. The checkbox only asks about one return.",
    more: "One 2848 per spouse. Future years: up to 3 years after the IRS gets it. 8821: within 120 days of signing.",
    alt: "Form 2848 with a speech bubble, Form 8821 with an eye.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e3eef7" />
        <Paper x={60} y={60} label="2848" sub="speaks" scale={1.4} color="#d8f0e2" />
        <Paper x={160} y={60} label="8821" sub="looks" scale={1.4} color="#fff3c4" />
        <Paper x={260} y={60} label="☑" sub="1 return" scale={1.4} />
      </svg>
    ),
  },
  traps: [
    { title: "One 2848 for a married couple", text: "Each spouse files their own Form 2848, even for a joint return." },
    { title: "“All years” on a 2848", text: "You must list specific periods, and future periods only up to 3 years after the IRS receives the form." },
    { title: "8821 to represent", text: "Form 8821 only allows seeing and receiving information. Representation takes a Form 2848." },
    { title: "The designee box lasts forever", text: "It ends at the due date (without extensions) of the next year's return, and covers only that return's processing." },
  ],
  sources: [
    { key: "i2848", section: "Purpose of Form; Line 3; Line 5; Revocation" },
    { key: "i8821", section: "Purpose of Form; Where To File" },
    { key: "p947", section: "Power of Attorney; Centralized Authorization File (CAF) System" },
    { key: "p216", section: "Conference and Practice Requirements" },
  ],
  cases: [
    {
      who: "Penny",
      title: "The joint audit",
      facts: "Penny and Milo filed jointly for 2025 and want Ace to represent them both in the exam.",
      question: "What's needed?",
      choices: ["One Form 2848 signed by Penny", "One Form 2848 signed by both", "Each spouse files their own Form 2848", "A Form 8821 for each spouse"],
      answer: "Each spouse files their own Form 2848",
      why: "For a joint return, each spouse must file a separate Form 2848 to authorize a representative.",
    },
    {
      who: "Rosa",
      title: "The bookkeeper",
      facts: "Rosa wants her bookkeeper, who isn't a CPA, attorney or EA, to get copies of her transcripts and notices. The bookkeeper won't talk for Rosa.",
      question: "Which form fits?",
      choices: ["Form 8821", "Form 2848", "The third party designee checkbox", "Form 56"],
      answer: "Form 8821",
      why: "Form 8821 lets anyone the taxpayer names inspect and receive information. Representing requires a 2848 and an eligible practitioner.",
    },
    {
      who: "Hoot",
      title: "How far ahead?",
      facts: "The IRS receives Penny's Form 2848 in March 2026.",
      question: "What's the latest calendar tax year it can cover?",
      choices: ["2026 only", "2028", "Every future year", "2031"],
      answer: "2028",
      why: "Future periods on a 2848 must end no later than 3 years after the IRS receives it (March 2029). Tax year 2028 ends December 31, 2028; 2029 ends too late.",
    },
    {
      who: "Milo",
      title: "The checkbox",
      facts: "On their 2025 return, Penny and Milo checked the box naming Ace as third party designee.",
      question: "What does that allow Ace to do?",
      choices: ["Represent them in the audit", "Sign a statute extension", "Discuss that return's processing until the 2026 return's due date", "Cash their refund"],
      answer: "Discuss that return's processing until the 2026 return's due date",
      why: "The designee can discuss processing issues for that return, and the authority ends on the due date (without extensions) of the next year's return.",
    },
    {
      who: "Ace",
      title: "The refund check",
      facts: "Ace holds a valid Form 2848 for Penny's 2025 income tax. Her refund check arrives at his office.",
      question: "What can Ace do with it?",
      choices: ["Endorse it and deposit it for her", "Deduct his fee and pass on the rest", "Deposit it in his trust account", "Pass it to Penny; he can't endorse or cash it"],
      answer: "Pass it to Penny; he can't endorse or cash it",
      why: "A Form 2848 doesn't let a representative endorse or negotiate a refund check, and Circular 230 bars preparers from it too.",
    },
  ],
  quizTopics: ["Power of attorney", "Centralized Authorization File", "Third party designee"],
  quizBrief: "Power of attorney: Form 2848 (eligible reps, specific periods, one per spouse, what reps can't do), Form 8821, the CAF, revoking and withdrawing, third party designee, Pub 216",
};

export default lesson;

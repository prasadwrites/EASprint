import { Ace, Backdrop, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { FilingCabinet, Sign } from "../office";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 3, topic 1.1: who can practice before the IRS: attorneys, CPAs and enrolled agents, special
// appearances, the Annual Filing Season Program, PTINs, and an EA's enrollment and continuing education.
// Season 3 opener. Written to Circular 230 and Publication 947 as in effect for 2026.

const comic: Lesson["comic"] = [
  {
    alt: "Milo proudly holds up a new office sign reading Okafor Tax Defense, Enrolled Agnet. Ace stares at it.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e3eef7" />
        <Milo x={60} y={128} scale={0.74} mood="excited" pose="up" />
        <Ace x={262} y={128} scale={0.76} mood="stern" flip />
        <Sign x={104} y={74} w={116} h={38} text="OKAFOR TAX DEFENSE" sub="ENROLLED AGNET" size={10} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Ta-da! I made your new office sign myself!", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Ace", text: "Milo. It says “agnet.”", x: 62, y: 4, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa holds a tray of cinnamon rolls in Ace's tiny office above the bakery. Ace raises a hand like taking an oath.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="RENT" sub="2 rolls/wk" color="#fff3c4" />} />
        <Ace x={240} y={128} scale={0.78} mood="excited" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Rent is two cinnamon rolls a week. Don't get frosting on the clients.", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Ace", text: "Deal! An EA can represent anyone, on any tax matter, before any IRS office!", x: 52, y: 2, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Penny asks a question. Hoot bursts out of the top drawer of a filing cabinet, papers flying.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e3eef7" />
        <Penny x={60} y={128} scale={0.72} mood="thinking" />
        <Ace x={150} y={128} scale={0.72} mood="happy" pose="point" />
        <Hoot x={262} y={70} scale={0.56} mood="excited" flip pose="up" />
        <FilingCabinet x={228} y={104} scale={0.86} open label="HOOT" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "So can I represent Milo?", x: 3, y: 4, w: 30, tail: "down-left" },
      { who: "Ace", text: "Yes! He's your immediate family.", x: 34, y: 3, w: 30, tail: "down" },
      { who: "Hoot", text: "HOO! But NOT your coworkers!", x: 67, y: 2, w: 31, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Milo shows a certificate from a weekend course. Ace shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="AFSP" sub="weekend" color="#fff3c4" />} />
        <Ace x={240} y={128} scale={0.78} mood="thinking" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "My cousin Rudy took a weekend course. Can he argue with Appeals?", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Ace", text: "AFSP? Only for returns he prepared and signed, and never in Appeals or Collection. Also, Rudy makes sandwiches.", x: 50, y: 2, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu holds a calendar marked 72 hours. Ace looks tired holding a stack of course certificates.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Lulu x={84} y={160} scale={0.56} mood="smug" pose="point" />
        <Calendar x={140} y={124} month="CE" day="72" scale={0.6} />
        <Ace x={240} y={128} scale={0.78} mood="worried" flip pose="hold" holding={<Paper x={0} y={-8} label="CE" sub="+2 ethics" />} />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "Ace has HOMEWORK! 72 hours every three years!", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Ace", text: "At least 16 a year, Lulu. Including 2 hours of ethics. Every. Year.", x: 50, y: 2, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot waves a PTIN card triumphantly. Ace calmly shows his renewal. Hoot slinks back into the filing cabinet.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e3eef7" />
        <Ace x={84} y={128} scale={0.78} mood="smug" pose="hold" holding={<Paper x={0} y={-8} label="PTIN" sub="2026 ✓" color="#d8f0e2" />} />
        <Hoot x={238} y={76} scale={0.56} mood="worried" flip />
        <FilingCabinet x={204} y={110} scale={0.86} open />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Before you say it, Hoot: I renewed my PTIN in October.", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Hoot", text: "...I'll be in my cabinet.", x: 60, y: 6, w: 37, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Who has unlimited practice rights",
    alt: "Three badges with full rights: attorney, CPA and enrolled agent. Smaller badges with limited rights: enrolled actuaries, retirement plan agents and AFSP preparers.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e3eef7" />
        <Step x={14} y={14} w={94} h={80} color="#d8f0e2" label="Attorney" sub="any state" />
        <Step x={113} y={14} w={94} h={80} color="#d8f0e2" label="CPA" sub="any state" />
        <Step x={212} y={14} w={94} h={80} color="#d8f0e2" label="EA" sub="federal license" />
        <Card x={14} y={106} w={292} h={58} lines={["Limited: enrolled actuaries, retirement", "plan agents, AFSP preparers"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Under Circular 230, attorneys and CPAs in good standing in any state, and enrolled agents, have unlimited rights to practice before the IRS: they can represent any taxpayer on any tax matter, before any IRS office, including Examination, Collection and Appeals.",
      "Enrolled actuaries and enrolled retirement plan agents can practice only in their specialty areas. Annual Filing Season Program participants have limited representation rights (next cards). Everyone else has none, apart from the special appearances below.",
    ],
    keyPoint: "Unlimited practice before the IRS: attorneys, CPAs and enrolled agents. Limited: enrolled actuaries, enrolled retirement plan agents (their areas) and AFSP participants (returns they prepared and signed).",
  },
  {
    title: "Special appearances",
    alt: "People who can appear for someone without a practice license: themselves, an immediate family member, their employer, their corporation as an officer, their partnership, or as a fiduciary.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={14} y={14} w={140} h={44} lines={["Yourself"]} size={11} color="#fff" />
        <Card x={166} y={14} w={140} h={44} lines={["Immediate family"]} size={11} color="#d8f0e2" />
        <Card x={14} y={64} w={140} h={44} lines={["Your employer", "(regular employee)"]} size={10} color="#fff" />
        <Card x={166} y={64} w={140} h={44} lines={["Corp. officer,", "general partner"]} size={10} color="#fff" />
        <Card x={14} y={114} w={140} h={44} lines={["Fiduciary"]} size={11} color="#fff" />
        <Card x={166} y={114} w={140} h={44} lines={["No license needed"]} size={11} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Some people may appear before the IRS without being attorneys, CPAs or EAs (Circular 230 section 10.7): an individual for themselves, a member of their immediate family, a regular full-time employee for their employer, a general partner or regular employee for the partnership, a bona fide officer or regular employee for the corporation, and a trustee, executor or other fiduciary for the estate or trust.",
      "These are limited to that relationship. A neighbor, friend or coworker can't represent someone just because they're helpful.",
    ],
    keyPoint: "Special appearances (no license): self, immediate family, employer (regular full-time employee), partnership (general partner/employee), corporation (officer/employee), fiduciary for the estate or trust.",
  },
  {
    title: "Becoming an enrolled agent",
    alt: "Three steps: get a PTIN, pass all three parts of the Special Enrollment Examination within three years, then apply on Form 23 and pass a tax compliance check.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={30} w={94} h={90} color="#fff" label="PTIN" sub="first" />
        <Step x={113} y={30} w={94} h={90} color="#d4ebfa" label="SEE" sub="3 parts, 3 years" />
        <Step x={212} y={30} w={94} h={90} color="#d8f0e2" label="Form 23" sub="+ tax check" />
        <Label x={160} y={150} size={10} weight={700}>Or: qualifying IRS work experience instead of the exam</Label>
      </svg>
    ),
    body: [
      "To become an enrolled agent, a candidate gets a PTIN, passes all three parts of the Special Enrollment Examination (SEE) within three years of passing the first, then applies for enrollment on Form 23, which includes a check of the applicant's own tax compliance.",
      "Former IRS employees with qualifying technical experience can apply based on that experience instead of taking the exam.",
    ],
    keyPoint: "EA path: PTIN, pass all 3 SEE parts within 3 years, apply on Form 23 (with a tax compliance check). Or qualify through IRS work experience.",
  },
  {
    title: "Keeping the EA license",
    alt: "A three-year cycle: 72 hours of continuing education, at least 16 hours each year, 2 of them ethics each year; renew on Form 8554.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={80} color="#fff3c4" label="72 hours" sub="per 3-year cycle" />
        <Step x={166} y={14} w={140} h={80} color="#d8f0e2" label="16 a year" sub="2 ethics each year" />
        <Card x={14} y={106} w={292} h={58} lines={["Renew every 3 years on Form 8554;", "approved CE providers only"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "Enrolled agents renew their enrollment every three years (Form 8554), on a cycle based on the last digit of their SSN. During each three-year cycle they must complete 72 hours of continuing education, with at least 16 hours each year, including 2 hours of ethics each year, from IRS-approved providers.",
      "Records of completed CE must be kept for four years. An EA who doesn't meet the requirements can be placed in inactive status.",
    ],
    keyPoint: "EA renewal every 3 years (Form 8554). CE: 72 hours per cycle, minimum 16 per year, 2 hours of ethics every year, from IRS-approved providers; keep CE records 4 years.",
  },
  {
    title: "The Annual Filing Season Program",
    alt: "An AFSP record of completion: 18 hours of CE, including the 6-hour filing season refresher with a test. Limited representation: only returns they prepared and signed, before revenue agents, customer service and the Taxpayer Advocate, never Appeals or Collection.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={56} y={80} label="AFSP" sub="18 hours" scale={1.8} color="#fff" />
        <Card x={110} y={14} w={198} h={44} lines={["6-hour refresher + test,", "10 tax law, 2 ethics"]} size={10} color="#fff" />
        <Card x={110} y={64} w={198} h={44} lines={["Only returns they", "prepared and signed"]} size={10} color="#d8f0e2" />
        <Card x={110} y={114} w={198} h={50} lines={["Exams, customer service, TAS.", "Not Appeals or Collection"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "The Annual Filing Season Program is voluntary for unenrolled preparers. Each year they complete 18 hours of CE (a 6-hour Annual Federal Tax Refresher course with a test, 10 hours of federal tax law and 2 hours of ethics; some preparers are exempt from the refresher) and consent to the Circular 230 duties.",
      "They get a Record of Completion and limited representation rights: only for returns they prepared and signed, and only before revenue agents, customer service representatives and the Taxpayer Advocate Service, not Appeals or Collection.",
    ],
    keyPoint: "AFSP: voluntary, 18 hours a year (6-hour AFTR course + test, 10 federal tax law, 2 ethics). Limited representation: returns they prepared and signed, before revenue agents, customer service and TAS only; not Appeals or Collection.",
  },
  {
    title: "PTINs",
    alt: "A PTIN card that expires December 31 every year, needed by anyone paid to prepare or help prepare federal returns.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e3eef7" />
        <Paper x={60} y={80} label="PTIN" sub="P01234567" scale={1.8} color="#d8f0e2" />
        <Card x={120} y={14} w={188} h={50} lines={["Paid to prepare, or help", "prepare, federal returns"]} size={10} color="#fff" />
        <Calendar x={214} y={118} month="DEC" day="31" scale={0.7} />
        <Label x={214} y={170} size={10} weight={700}>renew every year</Label>
      </svg>
    ),
    body: [
      "Anyone who, for compensation, prepares or helps prepare all or substantially all of a federal tax return or claim for refund must have a valid preparer tax identification number (PTIN) and put it on the returns they sign.",
      "PTINs expire on December 31 and must be renewed every year. A PTIN alone gives no right to represent anyone. Volunteers who aren't paid don't need one.",
    ],
    keyPoint: "PTIN: required for anyone paid to prepare or help prepare all or substantially all of a federal return; renew every year (expires Dec 31). A PTIN alone gives no representation rights.",
  },
];

const lesson: Lesson = {
  id: "p3-who-can-practice",
  part: "part3",
  domainId: "p3d1",
  number: "1.1",
  episode: "Ace Hangs His Shingle",
  title: "Who can practice",
  minutes: 12,
  lawAsOf: "rules in effect for 2026 (Circular 230)",
  intro: "Who can practice before the IRS and how far: attorneys, CPAs and EAs, special appearances, the Annual Filing Season Program, PTINs, and what it takes to become and stay an enrolled agent.",
  previously: "Season 3 opens in 2026. Ace has quit his old firm to open his own practice in the tiny room above Rosa's Rolls, and Milo has volunteered to help. Nobody asked him to.",
  comic,
  cards,
  hook: {
    line: "Attorneys, CPAs, EAs: anyone, anything, anywhere in the IRS.",
    more: "AFSP: only their own returns, never Appeals or Collection. EA CE: 72 per 3 years, 16 a year, 2 ethics.",
    alt: "Three badges reading attorney, CPA and EA, next to a 72.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e3eef7" />
        <Paper x={50} y={60} label="ATTY" sub="unlimited" scale={1.3} color="#d8f0e2" />
        <Paper x={120} y={60} label="CPA" sub="unlimited" scale={1.3} color="#d8f0e2" />
        <Paper x={190} y={60} label="EA" sub="unlimited" scale={1.3} color="#d8f0e2" />
        <Mark x={272} y={72} text="72" color="#e8505b" size={30} />
      </svg>
    ),
  },
  traps: [
    { title: "A PTIN lets you represent", text: "A PTIN is only for preparing returns for pay. It gives no representation rights." },
    { title: "AFSP in Appeals", text: "AFSP participants can't represent anyone before Appeals or Collection, even for returns they prepared." },
    { title: "16 hours of anything", text: "The yearly minimum of 16 hours must include 2 hours of ethics." },
    { title: "Helpful neighbors", text: "Special appearances cover yourself, immediate family, employers and similar relationships, not friends or coworkers." },
  ],
  sources: [
    { key: "c230", section: "§10.3 Who may practice; §10.6 Term and renewal of status; §10.7 Representing oneself" },
    { key: "p947", section: "Who Can Practice Before the IRS?" },
    { key: "afsp", section: "Annual Filing Season Program" },
    { key: "ptin", section: "PTIN requirements for tax return preparers" },
    { key: "eafaq", section: "Enrolled agents: FAQs" },
  ],
  cases: [
    {
      who: "Ace",
      title: "Full rights",
      facts: "A taxpayer's case has moved from an audit to Appeals and might go to Collection.",
      question: "Who can represent the taxpayer at every stage?",
      choices: ["Any preparer with a PTIN", "An AFSP participant who prepared the return", "An attorney, CPA or enrolled agent", "Only an attorney"],
      answer: "An attorney, CPA or enrolled agent",
      why: "Attorneys, CPAs and enrolled agents have unlimited practice rights, including Appeals and Collection. A PTIN gives none, and AFSP rights stop short of Appeals and Collection.",
    },
    {
      who: "Penny",
      title: "Penny for Milo",
      facts: "Penny, who has no professional license, wants to talk to the IRS for her husband Milo about his audit.",
      question: "Can she?",
      choices: ["Yes, as a member of his immediate family", "No, only licensed practitioners can", "Only with an AFSP record", "Only if she has a PTIN"],
      answer: "Yes, as a member of his immediate family",
      why: "Circular 230 lets an individual represent a member of their immediate family without being a practitioner.",
    },
    {
      who: "Milo",
      title: "Cousin Rudy's rights",
      facts: "Rudy, an unenrolled preparer with an AFSP Record of Completion, prepared and signed a client's return. The client's case is now with Appeals.",
      question: "Can Rudy represent the client in Appeals?",
      choices: ["Yes, because he prepared and signed the return", "Yes, if the client signs a Form 2848", "No; AFSP rights don't extend to Appeals", "Only for the first 30 days"],
      answer: "No; AFSP rights don't extend to Appeals",
      why: "AFSP participants can represent only for returns they prepared and signed, and only before revenue agents, customer service and TAS, not Appeals or Collection.",
    },
    {
      who: "Lulu",
      title: "Ace's CE year",
      facts: "In the first year of his cycle, Ace took 20 hours of tax law CE and no ethics. He plans 52 more hours, with ethics, over the next two years.",
      question: "Did his first year meet the rules?",
      choices: ["Yes; 20 is over the 16-hour minimum", "Yes; only the 72-hour total matters", "No; he needed at least 2 hours of ethics that year", "No; he needed 24 hours that year"],
      answer: "No; he needed at least 2 hours of ethics that year",
      why: "EAs need 72 hours per three-year cycle and at least 16 hours each year, and every year's 16 must include 2 hours of ethics.",
    },
    {
      who: "Hoot",
      title: "Free help",
      facts: "Milo helps his neighbor fill out her return for free, as a favor.",
      question: "Does Milo need a PTIN?",
      choices: ["Yes, everyone who prepares a return does", "Only if he signs it", "Yes, and an AFSP record", "No; PTINs are for people paid to prepare returns"],
      answer: "No; PTINs are for people paid to prepare returns",
      why: "A PTIN is required for anyone who prepares, or helps prepare, all or substantially all of a federal return for compensation. Unpaid help doesn't need one.",
    },
  ],
  quizTopics: ["Who may practice", "Limited practice", "Continuing education"],
  quizBrief: "Who can practice before the IRS: attorneys, CPAs and EAs, special appearances, AFSP limited rights, PTINs, becoming an EA (SEE, Form 23), renewal and CE (72/16/2 ethics)",
};

export default lesson;

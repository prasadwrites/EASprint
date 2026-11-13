import { Ace, Backdrop, Hoot, Label, Lulu, Penny, VideoCall } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, Desk, HOOK, Mark, PANEL, Paper, Step, Tick } from "../props";

// Part 1, topic 3.5: the earned income credit and preparer due diligence. Written to the rules for tax year
// 2025 from Publication 596 and the Form 8867 instructions.

const INK = "#17202c";

/** A long checklist on a clipboard. (x, y) is the top-left of the board. */
function Checklist({ x, y, scale = 1, ticks = 4 }: { x: number; y: number; scale?: number; ticks?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={0} y={0} width={70} height={96} rx={6} fill="#8a5a3c" stroke={INK} strokeWidth={2.5} />
      <rect x={6} y={10} width={58} height={80} fill="#fff" stroke={INK} strokeWidth={1.5} />
      <rect x={22} y={-4} width={26} height={10} rx={3} fill="#9aa4b2" stroke={INK} strokeWidth={1.5} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={12} y={20 + i * 17} width={9} height={9} fill="#fff" stroke={INK} strokeWidth={1.5} />
          {i < ticks && <path d={`M13,${24 + i * 17} l3,4 l6,-8`} fill="none" stroke="#1d7a49" strokeWidth={2} />}
          <path d={`M26,${25 + i * 17} h32`} stroke="#9aa4b2" strokeWidth={2} />
        </g>
      ))}
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Ace at his desk holds up a long checklist on a clipboard. Hoot peers over the top of it.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Desk y={180} />
        <Ace x={90} y={128} scale={0.76} mood="happy" pose="up" />
        <Checklist x={140} y={92} scale={0.8} />
        <Hoot x={256} y={128} scale={0.7} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Earned income credit season. Every claim gets my due diligence checklist.", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! And I'll be checking your checklist, Ace Okafor.", x: 55, y: 3, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Dee on a tablet waves a paper reading EITC. Ace holds up two fingers.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <VideoCall x={24} y={92} scale={1} mood="excited" pose="up" bars={2} />
        <Ace x={240} y={128} scale={0.78} mood="thinking" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "Can I get the earned income credit? I have Lulu!", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Two problems, Dee: you file Form 2555, and Lulu didn't live with you in the U.S.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Penny excitedly points at Lulu. Ace shakes his head and holds a card reading qualifying child only.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde2e4" />
        <Penny x={70} y={128} scale={0.74} mood="excited" pose="point" />
        <Lulu x={150} y={160} scale={0.52} mood="happy" />
        <Ace x={256} y={128} scale={0.74} mood="happy" flip pose="hold" holding={<Card x={-32} y={-22} w={64} h={32} lines={["Child", "only"]} size={10} color="#fde2e4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Then Milo and I claim the EITC for Lulu!", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Ace", text: "Penny, it takes a qualifying child, and a cousin's child isn't one. No qualifying-relative option.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot points and explains. Lulu, holding a snack bag, looks shocked.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde2e4" />
        <Hoot x={80} y={128} scale={0.72} mood="smug" pose="point" />
        <Lulu x={240} y={160} scale={0.56} mood="shocked" flip pose="hold" holding={<Card x={-18} y={-14} w={36} h={24} lines={["SNACK"]} size={8} color="#f6d33c" />} />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "For the EITC, a qualifying child needs relationship, age, residency and joint return tests. No support test!", x: 3, y: 2, w: 57, tail: "down-left" },
      { who: "Lulu", text: "So who buys my snacks doesn't matter?!", x: 64, y: 4, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Ace on the phone with a client, taking notes. Hoot nods approvingly.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="NOTES" sub="questions" />} />
        <Hoot x={244} y={128} scale={0.72} mood="happy" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "A client, 22, says four kids live with her. I'll ask whose kids they are and where they live, and write down her answers.", x: 3, y: 2, w: 56, tail: "down-left" },
      { who: "Hoot", text: "The knowledge requirement. Hoo, correct.", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Ace hands Hoot a neat stack: Form 8867, worksheets, notes. Hoot looks disappointed there's nothing to catch.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={84} y={128} scale={0.78} mood="smug" pose="hold" holding={<Paper x={0} y={-8} label="8867" sub="+ records" />} />
        <Hoot x={244} y={128} scale={0.72} mood="worried" flip clipboard />
        <Tick x={164} y={84} ok s={1.2} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Form 8867 filed, worksheets done, questions written down, records kept three years.", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Hoot", text: "Hoo... flawless. How disappointing.", x: 60, y: 6, w: 37, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The EITC for 2025",
    alt: "Four rising steps of maximum credits: $649 with no children, $4,328 with one, $7,152 with two, $8,046 with three or more.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={10} y={136} w={70} h={32} color="#d4ebfa" label="$649" sub="no child" />
        <Step x={86} y={92} w={70} h={76} color="#fff3c4" label="$4,328" sub="one" />
        <Step x={162} y={54} w={70} h={114} color="#d8f0e2" label="$7,152" sub="two" />
        <Step x={238} y={24} w={72} h={144} color="#fde2e4" label="$8,046" sub="three or more" />
        <Label x={86} y={40} size={10} weight={700}>refundable · earned income only</Label>
      </svg>
    ),
    body: [
      "The earned income tax credit is a refundable credit for workers with low to moderate earned income. For 2025 the maximum is $649 with no qualifying children, $4,328 with one, $7,152 with two and $8,046 with three or more.",
      "The credit rises with earned income, plateaus, then phases out as earned income or AGI (whichever gives the smaller credit) rises. Investment income over $11,950 disqualifies the taxpayer for 2025.",
    ],
    keyPoint: "2025 EITC max: $649 (0 children), $4,328 (1), $7,152 (2), $8,046 (3+). Refundable. Investment income limit $11,950.",
  },
  {
    title: "Rules for everyone",
    alt: "A gate with six locks: SSN, earned income, investment income under $11,950, not married filing separately unless separated, citizen or resident all year, no Form 2555.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={10} y={14} w={146} h={34} lines={["Valid SSNs"]} size={11} color="#fff" />
        <Card x={164} y={14} w={146} h={34} lines={["Earned income"]} size={11} color="#fff" />
        <Card x={10} y={56} w={146} h={34} lines={["Investment ≤ $11,950"]} size={11} color="#fff" />
        <Card x={164} y={56} w={146} h={34} lines={["MFS only if separated"]} size={11} color="#fff" />
        <Card x={10} y={98} w={146} h={34} lines={["Citizen/resident all year"]} size={10} color="#fff" />
        <Card x={164} y={98} w={146} h={34} lines={["No Form 2555"]} size={11} color="#fde2e4" />
        <Label x={160} y={160} size={10} weight={700}>And not anyone else's qualifying child</Label>
      </svg>
    ),
    body: [
      "Every claimant needs earned income, AGI and earned income under the limits, and an SSN valid for employment (for the taxpayer, spouse and each qualifying child), issued by the return's due date. They must be a U.S. citizen or resident alien all year and can't file Form 2555.",
      "Married filing separately qualifies only for a spouse who has a qualifying child living with them more than half the year and who either lived apart from the other spouse for the last six months of the year or is legally separated under an agreement or decree. A claimant can't be someone else's qualifying child.",
    ],
    keyPoint: "Everyone: valid SSNs, earned income, investment income ≤ $11,950 (2025), citizen/resident all year, no Form 2555, not another's qualifying child; MFS only if separated (with a qualifying child, lived apart last 6 months or legally separated).",
  },
  {
    title: "The EITC qualifying child: four tests, no support test",
    alt: "Four boxes: relationship, age, residency in the U.S. over half the year, joint return. A crossed-out fifth box reads support.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde2e4" />
        <Card x={10} y={14} w={146} h={60} lines={["Relationship", "child, sibling or", "their descendants"]} size={9} color="#fff" />
        <Card x={164} y={14} w={146} h={60} lines={["Age", "under 19, student < 24,", "or disabled"]} size={9} color="#fff" />
        <Card x={10} y={82} w={146} h={60} lines={["Residency", "with you in the U.S.", "over half the year"]} size={9} color="#fff" />
        <Card x={164} y={82} w={146} h={60} lines={["Joint return", "child didn't file one", "(except for refund)"]} size={9} color="#fff" />
        <Label x={160} y={166} size={12} color="#a8321f">No support test</Label>
      </svg>
    ),
    body: [
      "A qualifying child for the EITC must pass four tests: relationship (son, daughter, stepchild, foster child, brother, sister, half or step sibling, or a descendant of any of them); age (under 19, under 24 and a full-time student, or any age if permanently and totally disabled, and younger than the taxpayer or spouse unless disabled); residency (lived with the taxpayer in the U.S. more than half the year); and joint return.",
      "There's no support test, and the child doesn't have to be the taxpayer's dependent. A cousin's child, like Lulu for Penny, fails the relationship test.",
    ],
    keyPoint: "EITC qualifying child: relationship, age (< 19, student < 24, or disabled; younger than you), residency (with you in the U.S. > half the year), joint return. No support test; needn't be a dependent.",
  },
  {
    title: "No qualifying child? Narrower rules",
    alt: "A worker without children next to three rules: age 25 to 64, main home in the U.S. over half the year, not anyone's dependent.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <Step x={14} y={30} w={92} h={130} color="#fff3c4" label="25–64" sub="at year end" />
        <Step x={114} y={30} w={92} h={130} color="#d8f0e2" label="U.S. home" sub="over half the year" />
        <Step x={214} y={30} w={92} h={130} color="#d4ebfa" label="Not a" sub="dependent" />
      </svg>
    ),
    body: [
      "Without a qualifying child, the taxpayer (or at least one spouse on a joint return) must be at least 25 but under 65 at the end of the year, must have had a main home in the U.S. for more than half the year, and can't be claimed as a dependent or qualifying child of anyone else.",
      "The credit is much smaller ($649 maximum for 2025) and phases out at lower incomes.",
    ],
    keyPoint: "EITC without a qualifying child: age 25–64 at year end (one spouse if MFJ), main home in the U.S. > half the year, not a dependent or qualifying child of another. Max $649 (2025).",
  },
  {
    title: "Paid preparers: the four due diligence requirements",
    alt: "Ace's clipboard with four boxes: complete Form 8867, compute the credit with worksheets, knowledge (ask and document), keep records 3 years.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={162} />
        <Ace x={50} y={124} scale={0.42} mood="happy" />
        <Card x={100} y={10} w={208} h={34} lines={["1. Complete and file Form 8867"]} size={10} color="#fff" />
        <Card x={100} y={50} w={208} h={34} lines={["2. Compute it (keep worksheets)"]} size={10} color="#fff" />
        <Card x={100} y={90} w={208} h={34} lines={["3. Knowledge: ask and document"]} size={10} color="#fff" />
        <Card x={100} y={130} w={208} h={34} lines={["4. Keep records 3 years"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "Paid preparers must meet due diligence requirements for returns claiming the EITC, the child tax credit, additional child tax credit or credit for other dependents, the American opportunity credit, or head of household filing status.",
      "The four requirements: complete Form 8867 and submit it with the return; compute the credits (keeping the worksheets); meet the knowledge requirement; and keep records for three years. A penalty, adjusted for inflation, applies for each failure on each return.",
    ],
    keyPoint: "Due diligence (EITC, CTC/ACTC/ODC, AOTC, HOH): (1) Form 8867 with the return, (2) computation worksheets, (3) knowledge, (4) keep records 3 years. Penalty per failure per credit.",
  },
  {
    title: "The knowledge requirement",
    alt: "A magnifying glass over client facts that seem incorrect, inconsistent or incomplete, with a notepad recording the questions asked and the answers.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <circle cx={80} cy={80} r={44} fill="#d4ebfa" stroke={INK} strokeWidth={4} />
        <path d="M112,112 L150,150" stroke={INK} strokeWidth={9} strokeLinecap="round" />
        <Label x={80} y={76} size={11}>incorrect?</Label>
        <Label x={80} y={92} size={11}>inconsistent?</Label>
        <Label x={80} y={108} size={11}>incomplete?</Label>
        <Paper x={234} y={84} label="ASK" sub="and write it down" scale={2} color="#fff" />
      </svg>
    ),
    body: [
      "A preparer can't ignore the implications of information they know, and must make reasonable inquiries when the information appears incorrect, inconsistent or incomplete, documenting the questions and the client's answers at the time.",
      "Examples: a young client claiming several children, a child's relationship that's unclear, or self-employment income with no expenses or records. A preparer generally may rely in good faith on the client's information without auditing it, once those questions are answered.",
    ],
    keyPoint: "Knowledge requirement: don't ignore what you know; ask when info seems incorrect, inconsistent or incomplete; document questions and answers contemporaneously. Good-faith reliance is OK otherwise.",
  },
  {
    title: "After a denial: Form 8862 and the bans",
    alt: "A stop sign reading EITC denied, then three paths: Form 8862 to claim again, a 2-year ban for reckless disregard, a 10-year ban for fraud.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M60,30 l20,0 l14,14 v20 l-14,14 h-20 l-14,-14 v-20 Z" fill="#e8505b" stroke={INK} strokeWidth={2.5} />
        <Label x={70} y={58} size={9} color="#fff">DENIED</Label>
        <Step x={14} y={100} w={92} h={66} color="#d8f0e2" label="Form 8862" sub="to claim again" />
        <Step x={114} y={100} w={92} h={66} color="#fff3c4" label="2 years" sub="reckless" />
        <Step x={214} y={100} w={92} h={66} color="#fde2e4" label="10 years" sub="fraud" />
      </svg>
    ),
    body: [
      "If the EITC is reduced or disallowed for any reason other than a math or clerical error, the taxpayer generally must attach Form 8862 the next time they claim it.",
      "If the IRS finds the claim was due to reckless or intentional disregard of the rules, the taxpayer can't claim the EITC for 2 years; if due to fraud, for 10 years.",
    ],
    keyPoint: "After an EITC denial (not math error): file Form 8862 to claim again. Reckless/intentional disregard: 2-year ban. Fraud: 10-year ban.",
  },
];

const lesson: Lesson = {
  id: "p1-eitc",
  part: "part1",
  domainId: "p1d3",
  number: "3.5",
  episode: "The Due Diligence Checklist",
  title: "Earned income credit",
  minutes: 13,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "Who can claim the earned income credit, what makes a qualifying child for it, and the due diligence every paid preparer owes.",
  previously: "Penny and Milo went back to school. Meanwhile, it's busy season at Ace's office, and Hoot has come to watch him work.",
  comic,
  cards,
  hook: {
    line: "Four tests for the child, four duties for the preparer.",
    more: "Relationship, age, residency, joint return (no support test). Form 8867, worksheets, knowledge, three years of records.",
    alt: "A checklist with four ticks next to a child silhouette with four ticks.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#eef5f1" />
        <Checklist x={40} y={14} scale={0.95} />
        <Label x={200} y={52} size={20}>4 + 4</Label>
        <Label x={200} y={80} size={12} color="#4f5c6c">tests · duties</Label>
        <Mark x={290} y={40} text="✓" color="#1d7a49" size={30} />
      </svg>
    ),
  },
  traps: [
    { title: "Qualifying relatives for the EITC", text: "Only a qualifying child counts. Qualifying relatives never make someone eligible for the larger EITC." },
    { title: "A support test", text: "There isn't one for the EITC qualifying child." },
    { title: "Abroad with Form 2555", text: "Anyone who files Form 2555 can't claim the EITC, and the child must have lived with the taxpayer in the U.S." },
    { title: "Trusting everything", text: "Preparers must ask follow-up questions when facts seem incorrect, inconsistent or incomplete, and document them." },
  ],
  sources: [
    { key: "p596", section: "Rules for Everyone; Rules If You Have a Qualifying Child; Rules If You Don't Have a Qualifying Child" },
    { key: "i8867", section: "Due Diligence Requirements; Knowledge; Record retention" },
  ],
  cases: [
    {
      who: "Dee",
      title: "Dee's claim",
      facts: "Dee claims the foreign earned income exclusion on Form 2555. Lulu lived with Penny in the U.S. all of 2025.",
      question: "Can Dee claim the EITC for 2025?",
      choices: ["Yes, with Lulu as her qualifying child", "Yes, but only the no-child credit", "No", "Only if she provided Lulu's support"],
      answer: "No",
      why: "Anyone filing Form 2555 can't claim the EITC. Lulu also didn't live with Dee in the U.S. for more than half the year.",
    },
    {
      who: "Penny",
      title: "Penny and Lulu",
      facts: "Lulu, Penny's cousin's daughter, lived with Penny and Milo all year and they provided all her support.",
      question: "Is Lulu a qualifying child for Penny and Milo's EITC?",
      choices: ["Yes, she meets the residency and support tests", "No, she fails the relationship test", "Yes, as a qualifying relative", "No, because she has dividend income"],
      answer: "No, she fails the relationship test",
      why: "The EITC relationship test covers children, siblings and their descendants. A cousin's child isn't included, and qualifying relatives don't count for the EITC.",
    },
    {
      who: "Ace",
      title: "The 23-year-old worker",
      facts: "Ace's client is single, 23, not a student or a dependent, has no qualifying child, lived in the U.S. all year and earned $9,000.",
      question: "Can he claim the EITC?",
      choices: ["Yes, up to $649", "No, he's under 25", "Yes, the full $4,328", "No, his income is too low"],
      answer: "No, he's under 25",
      why: "Without a qualifying child, the taxpayer must be at least 25 and under 65 at the end of the year.",
    },
    {
      who: "Hoot",
      title: "The investment income",
      facts: "A family with two qualifying children had $20,000 of wages and $12,500 of interest and dividends in 2025.",
      question: "Can they claim the EITC?",
      choices: ["Yes, the full $7,152", "Yes, reduced for the investment income", "No, investment income is over $11,950", "No, because interest isn't earned income"],
      answer: "No, investment income is over $11,950",
      why: "For 2025, a taxpayer with investment income over $11,950 can't claim the EITC.",
    },
    {
      who: "Ace",
      title: "Ace's four kids question",
      facts: "A 22-year-old client tells Ace that four children, ages 1 to 8, live with her, and wants the EITC. Nothing else is known.",
      question: "What does the knowledge requirement call for?",
      choices: ["Prepare the return; preparers may rely on clients", "Refuse the client", "Ask how each child is related and where they lived, and document the answers", "Require birth certificates for every child before preparing any return"],
      answer: "Ask how each child is related and where they lived, and document the answers",
      why: "When information seems incorrect, inconsistent or incomplete, the preparer must make reasonable inquiries and document them at the time. Documents aren't required in every case.",
    },
    {
      who: "Lulu",
      title: "The support question",
      facts: "A grandmother's grandson, 10, lived with her all year in the U.S., but his father (who lived elsewhere) paid over half his support. The father doesn't claim the EITC.",
      question: "Can the boy be the grandmother's qualifying child for the EITC?",
      choices: ["No, she didn't provide over half his support", "Yes, there's no support test for the EITC", "Only if the father signs Form 8332", "No, grandchildren don't qualify"],
      answer: "Yes, there's no support test for the EITC",
      why: "The EITC qualifying child tests are relationship, age, residency and joint return. A grandchild is a descendant of the taxpayer's child, and support doesn't matter.",
    },
  ],
  quizTopics: ["Earned income credit"],
  quizBrief: "Earned income credit for 2025: maximum credits, rules for everyone, investment income limit $11,950, qualifying child tests (no support test), no-child rules, Form 8867 due diligence, Form 8862",
};

export default lesson;

import { Ace, Arrow, Backdrop, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 1, topic 3.4: education credits. Written to the rules for tax year 2025 from Publication 970,
// chapters 2 (American opportunity credit) and 3 (lifetime learning credit), and the Form 8863 rules there.

const INK = "#17202c";

/** A graduation cap. (x, y) is the center of the board. */
function GradCap({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-30,0 L0,-12 L30,0 L0,12 Z" fill={INK} />
      <path d="M-16,6 V16 Q0,24 16,16 V6" fill={INK} />
      <path d="M22,3 V20" stroke="#f6d33c" strokeWidth={2} />
      <circle cx={22} cy={22} r={3} fill="#f6d33c" />
    </g>
  );
}

/** A pizza slice, for the expenses that don't count. */
function Pizza({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0,-24 L22,18 Q0,26 -22,18 Z" fill="#f6d33c" stroke={INK} strokeWidth={2} />
      <path d="M-22,18 Q0,26 22,18" fill="none" stroke="#c98d4a" strokeWidth={5} />
      <circle cx={-4} cy={2} r={4} fill="#e8505b" />
      <circle cx={6} cy={10} r={3.5} fill="#e8505b" />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny and Milo both wear graduation caps and hold backpacks, grinning.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f4fb" />
        <Penny x={86} y={128} scale={0.76} mood="excited" pose="up" />
        <GradCap x={86} y={88} scale={0.9} />
        <Milo x={236} y={128} scale={0.76} mood="excited" flip pose="up" />
        <GradCap x={236} y={92} scale={0.9} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I'm back in school! Night classes in bookkeeping!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Milo", text: "Me too! I'm finally finishing my degree. Junior year, baby!", x: 53, y: 2, w: 44, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds a sign reading AOTC $2,500 and points at Milo.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Milo x={84} y={128} scale={0.78} mood="happy" />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-30} y={-24} w={60} h={34} lines={["AOTC", "$2,500"]} size={10} color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Is there a credit for this?", x: 3, y: 4, w: 32, tail: "down-left" },
      { who: "Ace", text: "Milo, a degree program, at least half-time, in your first four years: the American opportunity credit. Up to $2,500.", x: 40, y: 2, w: 57, tail: "down-right" },
    ],
  },
  {
    alt: "Penny with a certificate course flyer. Ace holds a sign reading LLC 20% of $10,000.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="CERT" sub="bookkeeping" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-32} y={-24} w={64} h={34} lines={["LLC: 20%", "of $10,000"]} size={9} color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "And my certificate class? It's not a degree.", x: 3, y: 4, w: 40, tail: "down-left" },
      { who: "Ace", text: "That's the lifetime learning credit, Penny: 20% of up to $10,000. Any course that builds job skills.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds a pizza slice and a parking pass. Hoot crosses them off on his clipboard.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Pizza x={0} y={-6} scale={1} />} />
        <Hoot x={244} y={128} scale={0.72} mood="stern" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Great! I'll add my dorm, parking and pizza!", x: 3, y: 4, w: 40, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! Tuition, fees and required books, Milo Marsh. Not room, board, parking or pizza.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot holds up a sign reading MFS: zero. Penny and Milo look at each other.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={60} y={130} scale={0.7} mood="worried" />
        <Milo x={130} y={132} scale={0.68} mood="worried" />
        <Hoot x={250} y={128} scale={0.72} mood="smug" flip pose="point" />
        <Mark x={180} y={206} text="MFS: $0" color="#a8321f" size={13} />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "And if you two ever file separately? No education credits at all. Hoo.", x: 40, y: 2, w: 57, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu tugs Aunt Rosa's apron. Rosa holds a piggy bank labeled 529.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Lulu x={84} y={160} scale={0.56} mood="excited" pose="point" />
        <Rosa x={236} y={128} scale={0.76} mood="happy" flip pose="hold" holding={<Card x={-24} y={-18} w={48} h={28} lines={["529"]} size={12} color="#fde2e4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "Aunt Rosa, can my 529 and a credit pay for the same class?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Rosa", text: "Not the same dollars, sweetie. Ace says no double dipping. Like with my cookies.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Two credits, side by side",
    alt: "Two report cards. AOTC: $2,500 per student, 40 percent refundable, first 4 years, half-time degree program. LLC: $2,000 per return, nonrefundable, any year, any course.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <Card x={14} y={14} w={140} h={152} color="#d8f0e2">
          <Label x={84} y={36} size={14}>AOTC</Label>
          <Label x={84} y={62} size={10} weight={700}>$2,500 per student</Label>
          <Label x={84} y={84} size={10} weight={700}>40% refundable</Label>
          <Label x={84} y={106} size={10} weight={700}>first 4 years only</Label>
          <Label x={84} y={128} size={10} weight={700}>degree, half-time+</Label>
        </Card>
        <Card x={166} y={14} w={140} h={152} color="#fff3c4">
          <Label x={236} y={36} size={14}>LLC</Label>
          <Label x={236} y={62} size={10} weight={700}>$2,000 per return</Label>
          <Label x={236} y={84} size={10} weight={700}>nonrefundable</Label>
          <Label x={236} y={106} size={10} weight={700}>unlimited years</Label>
          <Label x={236} y={128} size={10} weight={700}>even one course</Label>
        </Card>
      </svg>
    ),
    body: [
      "The American opportunity tax credit (AOTC) and the lifetime learning credit (LLC) both help pay for higher education for the taxpayer, spouse or a dependent, and both are claimed on Form 8863.",
      "Only one of the two can be claimed for the same student in the same year, but a family can claim the AOTC for one student and the LLC for another.",
    ],
    keyPoint: "AOTC: up to $2,500 per student, 40% refundable, first 4 years, degree program at least half-time. LLC: up to $2,000 per return, nonrefundable, unlimited years. One credit per student per year. Form 8863.",
  },
  {
    title: "AOTC: 100% of the first $2,000, 25% of the next $2,000",
    alt: "Two stacked blocks: $2,000 at 100 percent equals $2,000, plus $2,000 at 25 percent equals $500. Total $2,500, with $1,000 refundable.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d8f0e2" />
        <rect x={30} y={90} width={110} height={70} fill="#9fd8a8" stroke={INK} strokeWidth={2.5} />
        <rect x={30} y={60} width={110} height={30} fill="#fff3c4" stroke={INK} strokeWidth={2.5} />
        <Label x={85} y={130} size={11}>$2,000 × 100%</Label>
        <Label x={85} y={80} size={11}>$2,000 × 25%</Label>
        <Arrow d="M150,110 H180" />
        <Card x={186} y={40} w={122} h={50} lines={["= $2,500", "max per student"]} size={11} color="#fff" />
        <Card x={186} y={100} w={122} h={50} lines={["40% refundable", "(up to $1,000)"]} size={11} color="#fff" />
      </svg>
    ),
    body: [
      "The AOTC equals 100% of the first $2,000 of qualified expenses plus 25% of the next $2,000, for a maximum of $2,500 per eligible student. Up to 40% (as much as $1,000) is refundable, unless the student is a child subject to the kiddie tax rules.",
      "The student must be enrolled at least half-time for at least one academic period in a program leading to a degree or credential, must not have finished the first four years of postsecondary education at the start of the year, can't have had the AOTC claimed for four earlier years, and can't have a felony drug conviction.",
    ],
    keyPoint: "AOTC = 100% of first $2,000 + 25% of next $2,000 (max $2,500), 40% refundable. Student: degree program, at least half-time one period, first 4 years not completed, AOTC claimed ≤ 4 years, no felony drug conviction.",
  },
  {
    title: "LLC: 20% of up to $10,000, per return",
    alt: "A big $10,000 bar with a 20 percent slice of $2,000 for the whole return. Penny's single night class qualifies.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fff7dc" floorY={162} />
        <rect x={110} y={30} width={196} height={46} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <rect x={110} y={30} width={40} height={46} fill="#f6b73c" stroke={INK} strokeWidth={2.5} />
        <Label x={130} y={58} size={10}>20%</Label>
        <Label x={228} y={58} size={12}>$10,000 of expenses</Label>
        <Card x={110} y={92} w={196} h={50} lines={["Max $2,000 per return,", "however many students"]} size={11} color="#fff3c4" />
        <Penny x={52} y={124} scale={0.4} mood="happy" />
      </svg>
    ),
    body: [
      "The LLC is 20% of up to $10,000 of qualified expenses, a maximum of $2,000 per tax return no matter how many students. It's nonrefundable.",
      "There's no limit on the number of years, no degree or workload requirement, and a single course to acquire or improve job skills qualifies. Felony drug convictions don't matter.",
    ],
    keyPoint: "LLC = 20% of up to $10,000 per return (max $2,000), nonrefundable. Any number of years, no half-time or degree requirement; one job-skills course counts.",
  },
  {
    title: "Qualified expenses: tuition yes, pizza no",
    alt: "A shopping cart sorted into two bins: tuition, required fees and course books go in; room, board, parking, insurance and pizza stay out.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={14} y={14} w={140} h={120} color="#d8f0e2">
          <Label x={84} y={36} size={11}>Counts</Label>
          <Label x={84} y={60} size={10} weight={700}>Tuition</Label>
          <Label x={84} y={80} size={10} weight={700}>Required fees</Label>
          <Label x={84} y={100} size={10} weight={700}>Books (AOTC: from</Label>
          <Label x={84} y={114} size={10} weight={700}>anywhere)</Label>
        </Card>
        <Card x={166} y={14} w={140} h={120} color="#fde2e4">
          <Label x={236} y={36} size={11}>Doesn't</Label>
          <Label x={236} y={60} size={10} weight={700}>Room and board</Label>
          <Label x={236} y={80} size={10} weight={700}>Parking, transport</Label>
          <Label x={236} y={100} size={10} weight={700}>Insurance</Label>
        </Card>
        <Pizza x={290} y={112} scale={0.7} />
        <Label x={160} y={160} size={11}>Minus tax-free scholarships and grants</Label>
      </svg>
    ),
    body: [
      "Qualified expenses are tuition and fees required for enrollment. For the AOTC, books, supplies and equipment needed for the course count even if bought elsewhere; for the LLC, they count only if they must be paid to the school.",
      "Room and board, insurance, medical fees, transportation and personal expenses never count, even if paid to the school. Expenses are reduced by tax-free scholarships, Pell grants, employer-provided assistance and other tax-free educational assistance.",
    ],
    keyPoint: "Qualified: tuition and required fees; AOTC adds required books/supplies from anywhere (LLC only if paid to the school). Not room, board, insurance, transport. Reduce by tax-free scholarships/grants.",
  },
  {
    title: "Income limits and who claims",
    alt: "A dimmer from $80,000 to $90,000 single and $160,000 to $180,000 joint, a red MFS stop sign, and a parent claiming a dependent student.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <path d="M14,60 H90 L150,130 H190" fill="none" stroke={INK} strokeWidth={4} />
        <Label x={60} y={44} size={10}>$80K–$90K single</Label>
        <Label x={130} y={148} size={10}>$160K–$180K MFJ</Label>
        <Card x={204} y={18} w={104} h={50} lines={["MFS:", "no credit"]} size={12} color="#fde2e4" />
        <Card x={204} y={80} w={104} h={84} lines={["Dependent", "student? The", "parent claims"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Both credits phase out for modified AGI between $80,000 and $90,000 ($160,000 and $180,000 on a joint return) and aren't allowed for married filing separately.",
      "If the student is claimed as someone's dependent, only that person can claim the credit, and expenses the student paid are treated as paid by them. If no one claims the student, the student can claim it. Schools report on Form 1098-T.",
    ],
    keyPoint: "AOTC and LLC phase out at $80K–$90K MAGI ($160K–$180K MFJ); none for MFS. Dependent student: only the claiming taxpayer takes the credit (student-paid expenses count as theirs). Form 1098-T.",
  },
  {
    title: "No double dipping",
    alt: "One tuition bill split between a 529 plan and the AOTC. The same dollars can't be used twice.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <Paper x={70} y={84} label="TUITION" sub="$10,000" scale={1.6} color="#fff3c4" />
        <Arrow d="M110,60 L170,40" />
        <Arrow d="M110,108 L170,130" />
        <Card x={176} y={18} w={132} h={44} lines={["$4,000 → AOTC"]} size={12} color="#d8f0e2" />
        <Card x={176} y={110} w={132} h={44} lines={["$6,000 → 529"]} size={12} color="#d4ebfa" />
        <Step x={176} y={70} w={132} h={30} color="#fde2e4" label="never the same $" />
      </svg>
    ),
    body: [
      "The same expenses can't be used for both an education credit and another tax benefit, such as a tax-free 529 or Coverdell distribution, or the tuition and fees covered by tax-free scholarships.",
      "Families often pay $4,000 of tuition with other money to get the full AOTC and use the 529 for the rest. If 529 earnings are paid out for expenses also used for a credit, those earnings can become taxable.",
    ],
    keyPoint: "No double benefit: expenses used for an education credit can't also be paid by a tax-free 529/Coverdell distribution or scholarship. Common move: $4,000 from other funds for the AOTC, 529 for the rest.",
  },
];

const lesson: Lesson = {
  id: "p1-education-credits",
  part: "part1",
  domainId: "p1d3",
  number: "3.4",
  episode: "Penny Goes Back to School",
  title: "Education credits",
  minutes: 12,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "The American opportunity and lifetime learning credits: who qualifies, how much, which expenses count and the income limits.",
  previously: "Lulu learned she's worth $500 on a tax return (and priceless at home). Now Penny and Milo both enroll in classes.",
  comic,
  cards,
  hook: {
    line: "AOTC per student, LLC per return.",
    more: "AOTC: $2,500 a student, $1,000 refundable, four years. LLC: $2,000 a return, forever. Tuition yes, pizza no, separate returns never.",
    alt: "Two graduation caps labeled $2,500 and $2,000.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7f4fb" />
        <GradCap x={70} y={44} scale={1.4} />
        <Label x={70} y={100} size={18} color="#1d7a49">$2,500</Label>
        <GradCap x={200} y={44} scale={1.4} />
        <Label x={200} y={100} size={18} color="#8a6d1d">$2,000</Label>
        <Pizza x={288} y={60} scale={0.8} />
      </svg>
    ),
  },
  traps: [
    { title: "LLC per student", text: "The AOTC is per student; the LLC is $2,000 per return, however many students." },
    { title: "Room and board", text: "Housing and meals never count, even when paid to the school." },
    { title: "Fifth year AOTC", text: "After four years of AOTC (or once the first four years of college are done), only the LLC remains." },
    { title: "Married filing separately", text: "No education credits at all on a separate return." },
  ],
  sources: [
    { key: "p970", section: "Chapter 2, American Opportunity Credit; Chapter 3, Lifetime Learning Credit; Coordination with 529 plans" },
  ],
  cases: [
    {
      who: "Milo",
      title: "Milo's junior year",
      facts: "Milo is a half-time junior in a degree program. He hasn't claimed the AOTC before and paid $3,000 of tuition in 2025. Penny and Milo file jointly with MAGI of $110,000.",
      question: "What's his American opportunity credit?",
      choices: ["$3,000", "$2,500", "$2,250", "$600"],
      answer: "$2,250",
      why: "100% of the first $2,000 ($2,000) plus 25% of the next $1,000 ($250) = $2,250. Their MAGI is under the $160,000 joint phase-out.",
    },
    {
      who: "Penny",
      title: "Penny's night class",
      facts: "Penny paid $6,000 of tuition for a non-degree bookkeeping certificate in 2025. Penny and Milo file jointly with MAGI of $110,000.",
      question: "Which credit, and how much?",
      choices: ["AOTC, $2,500", "LLC, $1,200", "LLC, $2,000", "No credit for non-degree programs"],
      answer: "LLC, $1,200",
      why: "A non-degree course to improve job skills qualifies for the lifetime learning credit: 20% of $6,000 = $1,200.",
    },
    {
      who: "Hoot",
      title: "The dorm bill",
      facts: "A student in her second year paid $5,000 of tuition and $6,000 for a dorm room and meal plan to the school. She qualifies for the AOTC.",
      question: "What's the maximum AOTC?",
      choices: ["$2,500", "$2,750", "$1,250", "$0"],
      answer: "$2,500",
      why: "Only the $5,000 of tuition counts; room and board never do. $5,000 of tuition is more than the $4,000 needed for the maximum $2,500.",
    },
    {
      who: "Milo",
      title: "Milo's refund",
      facts: "Milo qualifies for the full $2,500 AOTC, but Penny and Milo owe no tax after other credits.",
      question: "How much of the AOTC can they get as a refund?",
      choices: ["$0", "$1,000", "$1,500", "$2,500"],
      answer: "$1,000",
      why: "Up to 40% of the AOTC is refundable: 40% of $2,500 = $1,000.",
    },
    {
      who: "Ace",
      title: "Ace's fifth-year client",
      facts: "Ace's client is in her fifth year of college. Her parents claimed the AOTC for her for the past four years and still claim her as a dependent.",
      question: "What can her parents claim for her 2025 tuition?",
      choices: ["The AOTC again", "The lifetime learning credit", "Both credits", "Nothing"],
      answer: "The lifetime learning credit",
      why: "The AOTC can be claimed for a student for only four tax years. The LLC has no limit on years.",
    },
    {
      who: "Penny",
      title: "The separate return",
      facts: "Suppose Penny and Milo filed separately for 2025. Penny paid $6,000 for her course.",
      question: "What education credit can Penny claim?",
      choices: ["LLC of $1,200", "Half the LLC, $600", "AOTC of $2,500", "None"],
      answer: "None",
      why: "Neither education credit is allowed for married taxpayers filing separately.",
    },
  ],
  quizTopics: ["Education credits"],
  quizBrief: "Education credits: American opportunity credit ($2,500, 40% refundable, first 4 years, half-time) versus lifetime learning credit ($2,000 per return), qualified expenses, MAGI phase-outs, no MFS",
};

export default lesson;

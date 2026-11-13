import { Ace, Arrow, Backdrop, Biscuit, Cash, Hoot, House, Label, Lulu, Penny, StockCert, VideoCall, Window } from "../cast";
import type { Lesson } from "../lesson";
import { Board, Calendar, Card, CARD, Heart, HOOK, Mark, PANEL, Tick } from "../props";

// Part 1, topic 1.3: dependents and the kiddie tax. Written to tax law for 2025 from Publication 501 and
// the Form 8615 instructions. Lulu is Penny's cousin Dee's daughter (see the series bible), which is
// exactly why she isn't Penny's qualifying child.

const INK = "#17202c";

function Suitcase({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-8,-22 v-6 h16 v6" fill="none" stroke={INK} strokeWidth={3} />
      <rect x={-20} y={-22} width={40} height={30} rx={4} fill="#e8505b" stroke={INK} strokeWidth={2.5} />
      <path d="M-20,-10 h40" stroke="#fff" strokeWidth={2} opacity={0.6} />
      <circle cx={-10} cy={-2} r={4} fill="#f6d33c" stroke={INK} strokeWidth={1} />
    </g>
  );
}

function Doorway({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y={40} width={92} height={154} fill="#8a5a3c" stroke={INK} strokeWidth={3} />
      <rect x={x + 8} y={48} width={76} height={146} fill="#cfe9f7" />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "January 1, 2025. Lulu stands at Penny's door with a suitcase. Dee waves from a tablet in Penny's hand.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Doorway x={196} />
        <Lulu x={244} y={150} scale={0.56} mood="excited" pose="wave" />
        <Suitcase x={282} y={192} />
        <Penny x={86} y={128} scale={0.78} mood="excited" pose="hold" holding={<VideoCall x={-28} y={-34} scale={0.46} mood="happy" pose="wave" bars={1} />} />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "Can you hear me now? Take good care of my girl, Penny!", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Lulu", text: "Hi, Aunt Penny! I brought my stock portfolio.", x: 54, y: 3, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Penny beams with her arm around Lulu. Ace looks up from a sheet titled Relationship test, eyebrows raised.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={70} y={128} scale={0.78} mood="excited" pose="wave" />
        <Lulu x={134} y={154} scale={0.52} mood="happy" />
        <Ace x={250} y={128} scale={0.78} mood="thinking" flip pose="hold" holding={<Board x={-30} y={-22} w={60} h={34} lines={["RELATIONSHIP", "TEST"]} size={7} chalk={false} />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace! My niece Lulu lives with us now. She's my qualifying child!", x: 3, y: 3, w: 50, tail: "down-left" },
      { who: "Ace", text: "Penny, Lulu is your COUSIN's daughter.", x: 60, y: 10, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops up in the window holding a list. Penny's jaw drops.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Window x={196} y={84} w={100} h={86} />
        <Hoot x={246} y={140} scale={0.6} mood="smug" pose="point" />
        <rect x={196} y={84} width={100} height={86} fill="none" stroke={INK} strokeWidth={3} />
        <Penny x={88} y={128} scale={0.78} mood="shocked" pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Hoot?! What's wrong with my niece?", x: 3, y: 3, w: 38, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! She's your cousin's child, Penny Pocket. Cousins aren't on the qualifying child list.", x: 46, y: 3, w: 51, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at a board with a calendar showing January to December and a support pie chart. Penny hugs Lulu with relief.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={70} y={128} scale={0.78} mood="happy" pose="point" />
        <Board x={140} y={84} w={84} h={58} lines={["ALL YEAR", "+ YOU PAY"]} size={10} />
        <Penny x={256} y={130} scale={0.72} mood="happy" flip pose="hold" />
        <Lulu x={256} y={168} scale={0.44} mood="excited" />
        <Heart x={232} y={92} s={1.2} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Relax, Penny. Lulu lived here ALL year and you two pay her way. That makes her your qualifying relative.", x: 3, y: 2, w: 66, tail: "down-left" },
    ],
  },
  {
    alt: "Penny holds Biscuit up hopefully. Hoot shakes his head. Biscuit looks sad.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={86} y={128} scale={0.78} mood="excited" pose="hold" holding={<Biscuit x={0} y={-30} scale={0.5} mood="excited" />} />
        <Hoot x={244} y={126} scale={0.7} mood="stern" clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Then Biscuit too, Hoot! He lived here all year!", x: 3, y: 3, w: 42, tail: "down-left" },
      { who: "Hoot", text: "A dependent must be a PERSON, Penny Pocket. Biscuit is a beagle.", x: 50, y: 3, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu holds up a stock certificate and a dividend check. Ace answers. Dee on the tablet looks startled.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Lulu x={78} y={154} scale={0.56} mood="smug" pose="hold" holding={<StockCert x={0} y={-6} scale={0.9} />} />
        <Cash x={130} y={178} rotate={-14} />
        <Ace x={244} y={128} scale={0.78} mood="happy" flip />
        <VideoCall x={152} y={96} scale={0.36} mood="shocked" bars={2} />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "Ace, my stocks paid $4,000 of dividends. Do I pay at Aunt Penny's rate?", x: 3, y: 3, w: 49, tail: "down-left" },
      { who: "Ace", text: "No, Lulu. Over $2,700, it's a PARENT's rate. Penny isn't your parent.", x: 56, y: 6, w: 41, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Two kinds of dependent",
    alt: "Two clubhouses: Qualifying Child with five tests on the door, and Qualifying Relative with four tests.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={160} />
        <House x={86} y={124} scale={1.2} color="#fde2e4" />
        <House x={234} y={124} scale={1.2} color="#d4ebfa" />
        <Label x={86} y={24} size={12}>
          QUALIFYING CHILD
        </Label>
        <Label x={234} y={24} size={12}>
          QUALIFYING RELATIVE
        </Label>
        <Label x={86} y={176} size={10} weight={700}>
          5 tests · no income limit
        </Label>
        <Label x={234} y={176} size={10} weight={700}>
          4 tests · income under $5,200
        </Label>
      </svg>
    ),
    body: [
      "A dependent is either a qualifying child or a qualifying relative. They're two separate clubs with separate tests, and a person only needs to get into one.",
      "Qualifying child: relationship, age, residency, support and joint return. Qualifying relative: not anyone's qualifying child, lives with you all year or is related to you, gross income under $5,200 for 2025, and you provide more than half their support.",
    ],
    keyPoint: "Dependent = qualifying child (relationship, age, residency, support, joint return) OR qualifying relative (not anyone's QC, household or relationship, gross income < $5,200, you provide > half support).",
  },
  {
    title: "Qualifying child: who counts as family",
    alt: "A family tree. Child, stepchild, foster child, siblings and their descendants have green checks. A cousin's daughter, Lulu, has a red X.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M160,170 V100 M160,100 L70,58 M160,100 L250,58 M160,100 V40" stroke="#8a5a3c" strokeWidth={8} strokeLinecap="round" fill="none" />
        <Card x={20} y={28} w={104} h={42} lines={["Your child, step,", "foster child"]} size={10} color="#d8f0e2" />
        <Card x={112} y={6} w={96} h={36} lines={["Grandchild"]} size={11} color="#d8f0e2" />
        <Card x={196} y={28} w={110} h={42} lines={["Sibling, niece,", "nephew"]} size={10} color="#d8f0e2" />
        <Card x={196} y={112} w={110} h={46} lines={["Cousin's child", "(Lulu)"]} size={11} color="#fde2e4" />
        <Tick x={30} y={78} ok />
        <Tick x={292} y={78} ok />
        <Tick x={296} y={170} ok={false} />
      </svg>
    ),
    body: [
      "To be a qualifying child, the child must be the taxpayer's son, daughter, stepchild or eligible foster child, or brother, sister, half-sibling or step-sibling, or a descendant of any of them, such as a grandchild, niece or nephew.",
      "Cousins aren't on the list, and neither are their children. Lulu is Penny's cousin's daughter, so she can never be Penny's qualifying child, however much Penny calls her a niece.",
    ],
    keyPoint: "QC relationship: your child, stepchild, foster child, sibling (half/step too) or a descendant of any of them. Cousins and their kids are not on the list.",
  },
  {
    title: "Qualifying child: age, home, support, joint return",
    alt: "Four badges: under 19 or student under 24, lived with you over half the year, didn't pay over half their own way, no joint return.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        {[
          ["AGE", "under 19, or", "student < 24", "#fde2e4"],
          ["HOME", "with you", "> half year", "#d8f0e2"],
          ["SUPPORT", "paid ≤ half", "own way", "#d4ebfa"],
          ["JOINT", "no joint", "return", "#eef0d8"],
        ].map(([t, a, b, c], i) => (
          <g key={t} transform={`translate(${42 + i * 79} 90)`}>
            <circle r={36} fill={c} stroke={INK} strokeWidth={2.5} />
            <Label x={0} y={-10} size={12}>
              {t}
            </Label>
            <Label x={0} y={7} size={9} weight={700}>
              {a}
            </Label>
            <Label x={0} y={19} size={9} weight={700}>
              {b}
            </Label>
          </g>
        ))}
        <Label x={160} y={162} size={11}>
          … and younger than you (or your spouse)
        </Label>
      </svg>
    ),
    body: [
      "Age: under 19 at the end of the year, or under 24 and a full-time student, or any age if permanently and totally disabled. The child must also be younger than the taxpayer or spouse, unless disabled.",
      "Residency: lived with the taxpayer more than half the year, with temporary absences such as school counting as time at home. Support: the child didn't provide more than half of their own support. Joint return: the child didn't file a joint return, except one filed only to claim a refund.",
    ],
    keyPoint: "QC: under 19 (or under 24 student, or disabled) and younger than you; lived with you > half the year (temporary absences count); didn't provide > half own support; no joint return except for a refund only.",
  },
  {
    title: "Qualifying relative: Lulu's way in",
    alt: "Lulu at Penny's house on a calendar marked January to December, a measuring line at $5,200 with Lulu's $4,000 under it, and a pie chart mostly paid by Penny and Milo.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Calendar x={46} y={46} month="JAN–DEC" day="🏠" scale={1.2} color="#2f9e6a" />
        <Label x={46} y={100} size={10} weight={700}>
          lived here all year
        </Label>
        <rect x={110} y={30} width={16} height={110} fill="#fff" stroke={INK} strokeWidth={2} />
        <rect x={110} y={64} width={16} height={76} fill="#9fd8a8" stroke={INK} strokeWidth={2} />
        <path d="M100,46 h36" stroke="#a8321f" strokeWidth={3} />
        <Label x={140} y={50} size={10} color="#a8321f" anchor="start">
          $5,200
        </Label>
        <Label x={140} y={100} size={10} anchor="start">
          Lulu: $4,000
        </Label>
        <g transform="translate(256 70)">
          <circle r={38} fill="#f6b73c" stroke={INK} strokeWidth={2.5} />
          <path d="M0,0 L0,-38 A38,38 0 0 0 -30,-23 Z" fill="#7b5cd6" stroke={INK} strokeWidth={2} />
          <Label x={8} y={10} size={8}>
            Penny
          </Label>
          <Label x={8} y={20} size={8}>
            & Milo
          </Label>
        </g>
        <Label x={256} y={130} size={10} weight={700}>
          pay over half
        </Label>
        <Lulu x={46} y={150} scale={0.26} mood="happy" />
      </svg>
    ),
    body: [
      "A qualifying relative must (1) not be anyone's qualifying child; (2) either live with the taxpayer all year as a member of the household or be a relative on the list (parents, grandparents, siblings, aunts, uncles, nieces, nephews, in-laws, and others); (3) have gross income under $5,200 for 2025; and (4) get more than half their support from the taxpayer.",
      "Lulu lived with Penny and Milo all year, so she isn't Dee's qualifying child (she didn't live with Dee) and she passes the household test. Her $4,000 is under $5,200, and they pay most of her costs. She's their qualifying relative.",
    ],
    keyPoint: "Qualifying relative: not anyone's QC; lived with you all year OR is on the relative list (cousins aren't); gross income < $5,200 (2025); you provide > half support.",
  },
  {
    title: "Nobody claims Biscuit",
    alt: "Biscuit sits sadly under a sign reading Persons only: citizens, nationals, residents, or residents of Canada or Mexico.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fdf3e1" floorY={160} />
        <Card x={130} y={20} w={176} h={92} lines={["PERSONS ONLY", "U.S. citizen, national", "or resident, or resident", "of Canada or Mexico"]} size={11} color="#fff" />
        <Biscuit x={70} y={104} scale={0.7} mood="sad" />
        <Mark x={112} y={70} text="?" color="#7b5cd6" />
      </svg>
    ),
    body: [
      "A dependent must be a person who is a U.S. citizen, U.S. national or U.S. resident alien, or a resident of Canada or Mexico. Pets never qualify, no matter how much they cost.",
      "A few more rules apply to every dependent: someone who can be claimed as a dependent can't claim dependents of their own, and a married person who files a joint return generally can't be anyone's dependent.",
    ],
    keyPoint: "Every dependent: a person who is a U.S. citizen, national or resident, or resident of Canada or Mexico; not filing jointly (except for a refund); and the claimer can't be someone else's dependent.",
  },
  {
    title: "Tie-breakers: when two people can claim one child",
    alt: "Ace in a referee's whistle holds up a card: parent wins; two parents, longer at home wins; then higher AGI.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={160} />
        <Ace x={56} y={90} scale={0.6} mood="stern" pose="point" />
        <Card x={120} y={18} w={186} h={34} lines={["1. A parent beats a non-parent"]} size={11} color="#d8f0e2" />
        <Card x={120} y={60} w={186} h={34} lines={["2. Two parents: longer at home"]} size={11} color="#fff3c4" />
        <Card x={120} y={102} w={186} h={34} lines={["3. Still tied: higher AGI"]} size={11} color="#fde2e4" />
      </svg>
    ),
    body: [
      "If a child is the qualifying child of more than one person, only one can claim them. A parent wins over anyone who isn't a parent. Between two parents who don't file jointly, the one the child lived with longer wins, and if the time was equal, the parent with the higher AGI.",
      "If no parent can claim the child, the person with the highest AGI wins. A non-parent can claim the child when a parent doesn't, but only if their AGI is higher than any parent who could.",
    ],
    keyPoint: "Tie-breakers: parent beats non-parent; between parents, longer residence, then higher AGI; non-parent can claim only if their AGI is higher than any eligible parent's.",
  },
  {
    title: "Lulu files her own return",
    alt: "Lulu at a tiny desk filling in her own Form 1040, with a sign: dependent standard deduction $1,350.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fdf3e1" floorY={160} />
        <Lulu x={90} y={110} scale={0.5} mood="thinking" pose="hold" holding={<rect x={-14} y={-14} width={28} height={30} fill="#fff" stroke={INK} strokeWidth={2} />} />
        <Board x={160} y={24} w={146} h={84} lines={["DEPENDENT'S STD DED", "greater of $1,350", "or earned + $450"]} size={11} />
        <Label x={232} y={140} size={11}>
          Unearned over $1,350?
        </Label>
        <Label x={232} y={156} size={11} color="#a8321f">
          She must file.
        </Label>
      </svg>
    ),
    body: [
      "A dependent's standard deduction for 2025 is the greater of $1,350 or their earned income plus $450, but not more than the regular amount for their status.",
      "A single dependent under 65 must file if unearned income (like Lulu's dividends) is more than $1,350, earned income is more than $15,750, or gross income is more than the greater of $1,350 or earned income plus $450.",
    ],
    keyPoint: "Dependent's 2025 standard deduction: greater of $1,350 or earned income + $450 (capped). A dependent must file if unearned income > $1,350.",
  },
  {
    title: "The kiddie tax: Lulu's $4,000",
    alt: "Lulu's $4,000 in three stacked blocks: $1,350 tax-free, $1,350 at Lulu's rate, $1,300 at a parent's rate, with Dee on the tablet looking shocked at the top block.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <rect x={50} y={124} width={156} height={40} fill="#d8f0e2" stroke={INK} strokeWidth={2.5} />
        <rect x={50} y={84} width={156} height={40} fill="#fff3c4" stroke={INK} strokeWidth={2.5} />
        <rect x={50} y={46} width={156} height={38} fill="#fde2e4" stroke={INK} strokeWidth={2.5} />
        <Label x={128} y={148} size={12}>
          $1,350 · tax-free
        </Label>
        <Label x={128} y={108} size={12}>
          $1,350 · Lulu's rate
        </Label>
        <Label x={128} y={70} size={12}>
          $1,300 · a parent's rate
        </Label>
        <VideoCall x={234} y={40} scale={0.58} mood="shocked" bars={1} />
        <Arrow d="M226,64 H212" />
        <Label x={268} y={118} size={10} weight={700}>
          Form 8615
        </Label>
        <Lulu x={24} y={142} scale={0.28} mood="worried" />
      </svg>
    ),
    body: [
      "The kiddie tax stops families from parking investment income with children. For 2025 it applies when a child's unearned income is more than $2,700, the child is under 18 at year end (or 18, or a full-time student under 24, whose earned income doesn't cover half their support), at least one parent is alive, and the child doesn't file a joint return.",
      "The first $1,350 is covered by the child's standard deduction, the next $1,350 is taxed at the child's rate, and the rest at a parent's rate on Form 8615. It's always a parent's rate, never a guardian's or an aunt's, even when the child lives elsewhere.",
    ],
    table: {
      head: ["Lulu's $4,000", "Taxed at"],
      rows: [
        ["First $1,350", "Nothing"],
        ["Next $1,350", "Lulu's rate"],
        ["Remaining $1,300", "A parent's rate"],
      ],
    },
    keyPoint: "Kiddie tax 2025: unearned income over $2,700 is taxed at a PARENT's rate (Form 8615). First $1,350 free, next $1,350 at the child's rate.",
  },
];

const lesson: Lesson = {
  id: "p1-dependents",
  part: "part1",
  domainId: "p1d1",
  number: "1.3",
  episode: "Lulu Moves In",
  title: "Dependents and the family",
  minutes: 15,
  lawAsOf: "tax year 2025 (law through December 31, 2025)",
  intro: "Who can be claimed as a dependent, and what happens when that dependent has investment income of their own. The exam's favorite twist is a relationship that sounds close but isn't on the list.",
  previously: "On New Year's Day 2025, Cousin Dee started a three-year contract on an oil rig overseas, and her daughter Lulu, 9, moved in with Penny and Milo.",
  comic,
  cards,
  hook: {
    line: "Really Annoying Relatives Steal Juice.",
    more: "Relationship, Age, Residency, Support, Joint return: the five qualifying child tests. Fail one, like Lulu fails relationship, and check the qualifying relative tests instead.",
    alt: "Five juice boxes labeled R, A, R, S, J, with Lulu sipping one.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        {["R", "A", "R", "S", "J"].map((l, i) => (
          <g key={i} transform={`translate(${40 + i * 50} 62)`}>
            <rect x={-16} y={-24} width={32} height={46} rx={4} fill={["#f28fb0", "#f6b73c", "#5aa9e6", "#9fd8a8", "#b9a6ee"][i]} stroke={INK} strokeWidth={2.5} />
            <path d="M6,-24 l6,-14" stroke={INK} strokeWidth={3} />
            <Label x={0} y={6} size={18}>
              {l}
            </Label>
          </g>
        ))}
        <Lulu x={288} y={58} scale={0.36} mood="smug" />
      </svg>
    ),
  },
  traps: [
    {
      title: "The “niece” who's a cousin's child",
      text: "Families say niece loosely. The tax code doesn't. A cousin or a cousin's child is never a qualifying child, and can only be a qualifying relative by living with the taxpayer all year.",
    },
    {
      title: "Income tests that don't exist",
      text: "A qualifying child can earn any amount. The $5,200 gross income test is only for qualifying relatives.",
    },
    {
      title: "The guardian's tax rate",
      text: "The kiddie tax uses a parent's rate, even when the child lives with a grandparent or an aunt. And only a parent can choose Form 8814 to report the child's interest and dividends on their own return.",
    },
    {
      title: "Support points both ways",
      text: "Qualifying child: did the child pay more than half their own support? Qualifying relative: did the taxpayer pay more than half? Read which way the question asks.",
    },
  ],
  sources: [
    { key: "p501", section: "Dependents; Qualifying Child; Qualifying Relative; Tiebreaker Rules; Table 1, Filing Requirements for Dependents" },
    { key: "i8615", section: "Who Must File; Parent's Information" },
    { key: "p17", section: "Chapter 3: Dependents" },
  ],
  cases: [
    {
      who: "Lulu",
      title: "Whose dependent is Lulu?",
      facts: "Lulu, 9, is the daughter of Penny's cousin Dee. She lived with Penny and Milo all of 2025 while Dee worked overseas. Lulu's only income was $4,000 of dividends, and Penny and Milo paid over 70% of her support.",
      question: "How can Penny and Milo claim Lulu on their 2025 joint return?",
      choices: ["As their qualifying child", "As their qualifying relative", "They can't: she's Dee's qualifying child", "They can't: her income is too high"],
      answer: "As their qualifying relative",
      why: "A cousin's child fails the qualifying child relationship test. She isn't Dee's qualifying child either, since she didn't live with Dee. She lived with Penny and Milo all year, earned under $5,200 and they paid over half her support, so she's their qualifying relative.",
    },
    {
      who: "Biscuit",
      title: "Biscuit's big year",
      facts: "Milo spent $3,000 on Biscuit in 2025: food, vet bills and a very small sweater. Biscuit lived in the household all year.",
      question: "Which is true?",
      choices: ["Biscuit is Milo's qualifying relative", "Biscuit can't be anyone's dependent", "Biscuit is a qualifying person for head of household", "Biscuit is a dependent if Milo pays over half his costs"],
      answer: "Biscuit can't be anyone's dependent",
      why: "A dependent must be a person who is a U.S. citizen, national or resident, or a resident of Canada or Mexico. A beagle is none of those.",
    },
    {
      who: "Ace",
      title: "Mrs. Robin's grandson",
      facts: "Ace's client Mrs. Robin is 70. Her grandson Theo turned 22 in 2025 and was a full-time college student. He lived with her except while at school, and he didn't pay over half his own support.",
      question: "Is Theo her qualifying child?",
      choices: ["No, he's over 18", "No, he lived at school most of the year", "Yes: a grandchild under 24 who's a full-time student", "Only as a qualifying relative"],
      answer: "Yes: a grandchild under 24 who's a full-time student",
      why: "A grandchild passes the relationship test, a full-time student under 24 who's younger than her passes the age test, and time away at school is a temporary absence that counts as living at home.",
    },
    {
      who: "Milo",
      title: "Milo's mom's interest",
      facts: "Milo's mother lives in her own apartment. Milo pays 60% of her support. Her only income in 2025 was $5,500 of taxable interest.",
      question: "Can Milo claim his mother as a dependent?",
      choices: ["Yes, as a qualifying relative", "No, because she doesn't live with him", "No, because her gross income is $5,200 or more", "Yes, as a qualifying child"],
      answer: "No, because her gross income is $5,200 or more",
      why: "A parent doesn't have to live with you to be a qualifying relative, and Milo pays over half her support. But her $5,500 gross income fails the 2025 test of under $5,200.",
    },
    {
      who: "Lulu",
      title: "Lulu's dividend math",
      facts: "Lulu, 9, has $4,000 of dividends in 2025 and no other income. A parent is alive, and she doesn't file a joint return.",
      question: "How much of her income is taxed at a parent's rate on Form 8615?",
      choices: ["$4,000", "$2,650", "$1,300", "$0: she's under 18"],
      answer: "$1,300",
      why: "Unearned income above $2,700 is taxed at a parent's rate: $4,000 minus $2,700 is $1,300. The first $1,350 is covered by her standard deduction and the next $1,350 is taxed at her own rate.",
    },
    {
      who: "Hoot",
      title: "Mom versus Grandma",
      facts: "Sam, 8, lived all year with his mom and his grandma in Grandma's house. Mom's AGI is $30,000 and Grandma's is $50,000. Both want to claim Sam.",
      question: "If they can't agree, who gets to claim him?",
      choices: ["Grandma, because her AGI is higher", "Mom, because a parent wins", "Whoever paid more of the rent", "Both can claim him"],
      answer: "Mom, because a parent wins",
      why: "When a parent and a non-parent can both claim a qualifying child and both try, the parent wins. Grandma could claim Sam only if Mom didn't and Grandma's AGI was higher than Mom's.",
    },
  ],
  quizTopics: ["Dependents", "Kiddie tax"],
  quizBrief: "Dependents and kiddie tax: qualifying child tests, qualifying relative tests and the $5,200 limit, tie-breakers, dependent filing rules and standard deduction, Form 8615, Form 8814",
};

export default lesson;

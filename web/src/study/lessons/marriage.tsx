import { Ace, Arrow, Backdrop, Biscuit, Hoot, Hourglass, House, Label, Milo, Penny, VideoCall, Window } from "../cast";
import type { Lesson } from "../lesson";
import { Board, BowTie, Bouquet, Burst, Calendar, Card, CARD, Clock, Confetti, Flowers, HOOK, Mark, PANEL, Paper, PartyHat, Step, Veil } from "../props";

// Part 1, topic 1.2: who must file and filing status. Written to tax law for 2025 from Publications 501
// and 17. The 2025 standard deduction amounts include the July 2025 law change.

const INK = "#17202c";

const comic: Lesson["comic"] = [
  {
    alt: "11:58 PM on December 31. Penny in a veil holds a bouquet next to Milo in a bow tie. Ace stands by a clock that says Dec 31.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Veil x={66} y={130} s={0.74} />
        <Penny x={66} y={130} scale={0.74} mood="excited" pose="hold" holding={<Bouquet x={0} y={-2} />} />
        <Flowers x={66} y={130} s={0.74} />
        <Milo x={142} y={130} scale={0.74} mood="happy" />
        <BowTie x={142} y={159} s={0.8} />
        <Clock x={206} y={108} minute={58} scale={0.75} />
        <Ace x={268} y={130} scale={0.74} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace! Milo and I are getting married at 11:59 PM, right before the ball drops!", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Ace", text: "Congrats, Penny! Then you're married for ALL of 2025.", x: 58, y: 4, w: 39, tail: "down-right" },
    ],
  },
  {
    alt: "Penny throws her arms up in shock. Hoot, wearing a party hat, looks smug.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Veil x={96} y={128} s={0.78} />
        <Penny x={96} y={128} scale={0.78} mood="shocked" pose="up" />
        <Flowers x={96} y={128} s={0.78} />
        <Hoot x={240} y={126} scale={0.7} mood="smug" />
        <PartyHat x={248} y={102} s={0.8} rot={12} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "ALL of 2025, Ace?! We'll be married for one minute!", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo, Penny Pocket! We only check December 31.", x: 54, y: 3, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Cousin Dee waves from a tablet on her oil rig. Ace answers her.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <VideoCall x={30} y={92} scale={0.86} mood="excited" pose="wave" bars={1} />
        <Ace x={250} y={128} scale={0.78} mood="smug" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "Can you hear me now? Congrats, cuz! My divorce was final today too!", x: 3, y: 3, w: 50, tail: "down-left" },
      { who: "Ace", text: "Then you're unmarried for the whole year, Dee.", x: 60, y: 10, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Midnight fireworks. Penny, Milo, Ace and Hoot in a party hat celebrate with confetti. Biscuit howls.",
    art: (
      <svg {...PANEL}>
        <rect width={320} height={220} fill="#1f2a44" />
        <Burst x={40} y={90} r={24} color="#f6b73c" />
        <Burst x={292} y={84} r={20} color="#f28fb0" />
        <Burst x={168} y={84} r={16} color="#5aa9e6" />
        <rect x={0} y={194} width={320} height={26} fill="#2c3a5c" />
        <Confetti />
        <Penny x={58} y={134} scale={0.66} mood="excited" pose="up" />
        <Milo x={124} y={136} scale={0.64} mood="excited" pose="wave" />
        <Ace x={190} y={138} scale={0.6} mood="excited" />
        <Hoot x={262} y={134} scale={0.56} mood="happy" />
        <PartyHat x={266} y={112} s={0.62} rot={-10} />
        <Biscuit x={302} y={182} scale={0.36} mood="excited" flip />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "HAPPY NEW TAX YEAR, PENNY POCKET!", x: 44, y: 3, w: 53, tail: "down-right", shout: true },
      { who: "Milo", text: "Hoot, wait. Is the wedding cake deductible?", x: 3, y: 15, w: 38, tail: "down-right" },
    ],
  },
  {
    alt: "January 1. Milo holds a slice of cake and looks hopeful. Ace shakes his head kindly.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo
          x={92}
          y={128}
          scale={0.78}
          mood="thinking"
          pose="hold"
          holding={
            <g>
              <path d="M-18,4 L18,4 L12,-14 Z" fill="#fff3c4" stroke={INK} strokeWidth={2} />
              <path d="M-18,4 L18,4" stroke="#f28fb0" strokeWidth={4} />
            </g>
          }
        />
        <Ace x={236} y={128} scale={0.78} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Ace, is the cake deductible? And do we HAVE to file together?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "No and no, Milo. You can file jointly or separately.", x: 56, y: 12, w: 41, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds Biscuit up hopefully. Hoot glares in through the window.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Window x={200} y={86} w={96} h={84} />
        <Hoot x={248} y={140} scale={0.6} mood="stern" />
        <rect x={200} y={86} width={96} height={84} fill="none" stroke={INK} strokeWidth={3} />
        <Penny x={90} y={128} scale={0.78} mood="excited" pose="hold" holding={<Biscuit x={0} y={-30} scale={0.5} mood="excited" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace, can Biscuit make me head of household?", x: 3, y: 3, w: 42, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! Biscuit is a dog, Penny Pocket. And YOU are married.", x: 50, y: 3, w: 47, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Filing status is a December 31 snapshot",
    alt: "A camera flash goes off at a clock reading 11:59 on December 31, catching Penny and Milo just married and Dee just divorced.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Clock x={58} y={64} minute={59} scale={1.2} />
        <g transform="translate(46 22)">
          <path d="M-8,-10 l6,8 l-10,2 l12,4 l-6,10" fill="#f6d33c" stroke={INK} strokeWidth={1.2} />
        </g>
        <Penny x={150} y={74} scale={0.5} mood="excited" />
        <Milo x={200} y={74} scale={0.5} mood="happy" />
        <Label x={175} y={150} size={11}>
          Married → married all year
        </Label>
        <VideoCall x={246} y={46} scale={0.5} mood="excited" bars={1} />
        <Label x={276} y={120} size={10} weight={700}>
          Divorce final
        </Label>
        <Label x={276} y={134} size={10} weight={700}>
          → unmarried
        </Label>
      </svg>
    ),
    body: [
      "Marital status is decided on the last day of the year. Married on December 31, even at 11:59 PM, means married for the whole year.",
      "A final decree of divorce or separate maintenance by December 31 means unmarried for the whole year. If a spouse died during the year, the survivor is considered married for that year and can file a joint return.",
    ],
    keyPoint: "Marital status is fixed on December 31: married that day = married all year; final divorce decree by then = unmarried all year; spouse died during the year = still married for that year.",
  },
  {
    title: "Five statuses, five standard deductions",
    alt: "A staircase: married filing separately and single on the bottom step, head of household in the middle, married filing jointly and qualifying surviving spouse on top.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Step x={14} y={120} w={96} h={48} color="#fde2e4" label="$15,750" sub="Single · MFS" />
        <Step x={112} y={86} w={96} h={82} color="#fff3c4" label="$23,625" sub="Head of household" />
        <Step x={210} y={50} w={96} h={118} color="#d8f0e2" label="$31,500" sub="MFJ · QSS" />
        <Penny x={258} y={28} scale={0.3} mood="excited" pose="up" />
        <Milo x={286} y={30} scale={0.3} mood="happy" />
      </svg>
    ),
    body: [
      "The five filing statuses are single, married filing jointly (MFJ), married filing separately (MFS), head of household (HOH) and qualifying surviving spouse (QSS). If more than one fits, a taxpayer can choose the one that gives the lowest tax.",
      "Each comes with its own 2025 standard deduction, increased by the July 2025 law change.",
    ],
    table: {
      head: ["Status", "2025 standard deduction"],
      rows: [
        ["Single or MFS", "$15,750"],
        ["Head of household", "$23,625"],
        ["MFJ or QSS", "$31,500"],
      ],
    },
    keyPoint: "2025 standard deduction: $15,750 single/MFS, $23,625 HOH, $31,500 MFJ/QSS. If more than one status fits, pick the lowest tax.",
  },
  {
    title: "Married: together or apart?",
    alt: "Penny and Milo signing one big joint return, next to two small separate returns with a note: if one itemizes, both itemize.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={160} />
        <Paper x={90} y={86} label="MFJ" scale={1.9} color="#d8f0e2" />
        <Penny x={36} y={112} scale={0.4} mood="happy" />
        <Milo x={146} y={112} scale={0.4} mood="happy" />
        <Paper x={220} y={70} label="MFS" scale={1} color="#fde2e4" rotate={-6} />
        <Paper x={270} y={74} label="MFS" scale={1} color="#fde2e4" rotate={6} />
        <Card x={196} y={110} w={112} h={40} lines={["One itemizes?", "Both must."]} size={11} color="#fff3c4" />
      </svg>
    ),
    body: [
      "A married couple can file one joint return or two separate ones. On a joint return both spouses sign and each is responsible for the whole tax, even if only one earned the income.",
      "Filing separately usually costs more. If one spouse itemizes, the other must itemize too (their standard deduction is zero), and separate filers can't take the education credits or the student loan interest deduction.",
    ],
    keyPoint: "MFJ: both sign, both liable for all of it. MFS usually costs more: if one itemizes the other must, and no education credits or student loan interest deduction.",
  },
  {
    title: "Head of household: three keys",
    alt: "A front door with three locks. Keys: unmarried on Dec 31, paid over half the home costs, a qualifying person lived there over half the year.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <House x={58} y={118} scale={1.2} />
        {[
          ["Unmarried on Dec 31", 40],
          ["Paid > ½ home costs", 90],
          ["Person there > ½ year", 140],
        ].map(([l, y], i) => (
          <g key={i} transform={`translate(114 ${y as number})`}>
            <circle cx={10} cy={0} r={9} fill="#f2c230" stroke={INK} strokeWidth={2} />
            <path d="M19,0 h22 m-6,0 v6 m-6,-6 v5" stroke={INK} strokeWidth={3} strokeLinecap="round" />
            <Label x={48} y={4} size={12} anchor="start">
              {l as string}
            </Label>
          </g>
        ))}
      </svg>
    ),
    body: [
      "Head of household needs all three: the taxpayer is unmarried or considered unmarried on the last day of the year; paid more than half the cost of keeping up a home for the year; and a qualifying person lived in that home for more than half the year.",
      "One exception: a parent the taxpayer can claim as a dependent doesn't have to live with them, as long as the taxpayer pays more than half the cost of the parent's home.",
    ],
    keyPoint: "HOH = unmarried (or considered unmarried) on Dec 31 + paid more than half the home's costs + qualifying person lived there more than half the year (dependent parent can live elsewhere).",
  },
  {
    title: "Married, but “considered unmarried”",
    alt: "A calendar from July to December with an empty chair at the table. A child's drawing is on the fridge.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        {["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map((m, i) => (
          <g key={m}>
            <Calendar x={36 + i * 50} y={44} month={m} day="✗" scale={0.72} color="#7b5cd6" />
          </g>
        ))}
        <Label x={160} y={96} size={12}>
          Spouse didn't live in the home for the last 6 months
        </Label>
        <g transform="translate(160 136)">
          <rect x={-16} y={-14} width={32} height={8} fill="#a8774f" stroke={INK} strokeWidth={2} />
          <path d="M-12,-6 v24 M12,-6 v24 M-16,-30 v18" stroke={INK} strokeWidth={3} />
        </g>
        <Mark x={190} y={140} text="?" color="#7b5cd6" size={22} />
      </svg>
    ),
    body: [
      "A married taxpayer is considered unmarried, and can use head of household, if they file a separate return, paid more than half the cost of the home for the year, their spouse didn't live in the home during the last 6 months of the year, and the home was the main home of their child, stepchild or foster child for more than half the year.",
      "They must also be able to claim that child as a dependent (or could, except that they released the claim to the other parent).",
    ],
    keyPoint: "Considered unmarried: separate return, paid > half the home's costs, spouse out of the home the last 6 months, and the home was a dependent child's main home > half the year.",
  },
  {
    title: "Qualifying surviving spouse: two more years",
    alt: "A timeline: year of death is a joint return, the next two years are qualifying surviving spouse, then head of household or single.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={10} y={60} w={70} h={60} color="#d8f0e2" label="2023" sub="death: MFJ" />
        <Step x={84} y={60} w={70} h={60} color="#d4ebfa" label="2024" sub="QSS" />
        <Step x={158} y={60} w={70} h={60} color="#d4ebfa" label="2025" sub="QSS" />
        <Step x={232} y={60} w={78} h={60} color="#fde2e4" label="2026" sub="HOH or single" />
        <Label x={160} y={40} size={13}>
          Spouse died in 2023
        </Label>
        <Label x={160} y={150} size={11} weight={700}>
          QSS needs a dependent child at home all year
        </Label>
      </svg>
    ),
    body: [
      "In the year a spouse dies, the survivor can usually file a joint return. For the next two years they can use qualifying surviving spouse if they haven't remarried, could have filed jointly in the year of death, and paid more than half the cost of a home where their dependent child or stepchild lived all year.",
      "QSS uses the joint return rates and the $31,500 standard deduction. After the two years, it's head of household or single.",
    ],
    keyPoint: "Spouse dies: that year MFJ; the next 2 years QSS if not remarried and keeping up a home for a dependent child all year; after that HOH or single.",
  },
  {
    title: "Who must file: the 2025 lines",
    alt: "Hoot holds a measuring stick with marks for each filing status. Penny measures her income against it.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={160} />
        <rect x={150} y={18} width={22} height={142} fill="#f6d33c" stroke={INK} strokeWidth={2} />
        {[
          [30, "$31,500 MFJ"],
          [62, "$23,625 HOH"],
          [94, "$15,750 single"],
          [148, "$5 MFS"],
        ].map(([y, l]) => (
          <g key={l as string}>
            <path d={`M150,${y} h22`} stroke={INK} strokeWidth={2.5} />
            <Label x={178} y={(y as number) + 4} size={11} anchor="start">
              {l as string}
            </Label>
          </g>
        ))}
        <Hoot x={60} y={84} scale={0.5} mood="stern" pose="point" />
        <Mark x={262} y={150} text="$5?!" size={20} />
      </svg>
    ),
    body: [
      "For 2025, a taxpayer under 65 generally must file if gross income is at least the standard deduction for their status. Being 65 or older raises the line by the additional standard deduction ($2,000 if unmarried, $1,600 for each spouse 65 or older).",
      "Married filing separately is the odd one: just $5 of gross income means a return is required.",
    ],
    table: {
      head: ["Status (under 65)", "Must file at"],
      rows: [
        ["Single", "$15,750"],
        ["Head of household", "$23,625"],
        ["MFJ, both under 65", "$31,500"],
        ["QSS", "$31,500"],
        ["MFS, any age", "$5"],
      ],
    },
    keyPoint: "2025 gross income filing lines (under 65): single $15,750, HOH $23,625, MFJ $31,500, QSS $31,500, MFS $5. Add $2,000 (unmarried) or $1,600 per spouse for 65+.",
  },
  {
    title: "Must file even under the line",
    alt: "Milo with five dog leashes and a sign reading $400. Next to him, a health insurance card and a note: advance credit paid.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fdf3e1" floorY={160} />
        <Milo x={70} y={86} scale={0.6} mood="excited" pose="point" />
        <g stroke="#e8505b" strokeWidth={2} fill="none">
          <path d="M28,145 q-8,8 -20,10 M30,147 q-2,10 -12,18" />
        </g>
        <Biscuit x={20} y={150} scale={0.26} mood="happy" />
        <Card x={124} y={22} w={90} h={50} lines={["Self-employed", "net ≥ $400"]} size={11} color="#fff3c4" />
        <Card x={220} y={22} w={90} h={50} lines={["Advance PTC", "was paid"]} size={11} color="#d4ebfa" />
        <Card x={124} y={90} w={90} h={50} lines={["Special taxes", "(IRA, HSA…)"]} size={11} color="#fde2e4" />
        <Card x={220} y={90} w={90} h={50} lines={["Church job", "≥ $108.28"]} size={11} color="#eef0d8" />
      </svg>
    ),
    body: [
      "Some people must file whatever their gross income: net earnings from self-employment of $400 or more; advance payments of the premium tax credit made for them or a family member; owing a special tax such as additional tax on an IRA or HSA or household employment taxes; or church employee income of $108.28 or more.",
      "And anyone due a refund of withholding or a refundable credit should file to get it, even if they don't have to.",
    ],
    keyPoint: "Must file regardless of income: self-employment net earnings ≥ $400, advance premium tax credit paid, special taxes owed (IRA, HSA, household employment), church employee income ≥ $108.28.",
  },
  {
    title: "Due dates: file late, pay on time",
    alt: "Two calendars, April 15 and October 15, joined by an arrow labeled Form 4868. A money bag stays pinned to April 15.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Calendar x={70} y={70} month="APR" day="15" scale={1.4} />
        <Calendar x={250} y={70} month="OCT" day="15" scale={1.4} color="#2f9e6a" />
        <Arrow d="M110,62 Q160,24 208,62" color="#2f9e6a" />
        <Label x={160} y={30} size={12} color="#1d7a49">
          Form 4868: file by Oct 15
        </Label>
        <Hourglass x={160} y={92} scale={0.6} sand={0.3} />
        <Label x={70} y={136} size={11} color="#a8321f">
          pay by Apr 15!
        </Label>
        <Label x={160} y={164} size={11} weight={700}>
          Abroad on April 15? Automatic to June 15.
        </Label>
      </svg>
    ),
    body: [
      "A 2025 return is due April 15, 2026. Form 4868, filed by then, gives an automatic six-month extension to October 15, 2026.",
      "It's an extension of time to file, not to pay. Interest runs on any tax not paid by April 15, and a late payment penalty can apply. U.S. citizens and residents living abroad get an automatic two months, to June 15.",
    ],
    keyPoint: "2025 return due April 15, 2026; Form 4868 extends filing (not payment) to October 15, 2026. Living abroad: automatic 2 months to June 15.",
  },
];

const lesson: Lesson = {
  id: "p1-filing-status",
  part: "part1",
  domainId: "p1d1",
  number: "1.2",
  episode: "The One-Minute Marriage",
  title: "Who must file and how",
  minutes: 14,
  lawAsOf: "tax year 2025 (law through December 31, 2025)",
  intro: "Two questions come before every return: does this person have to file, and with what filing status? The answers depend on one date and a handful of dollar lines.",
  previously: "Penny's shoebox is sorted, Ace knows who's who, and Penny has one more surprise: she and Milo are getting married. On New Year's Eve.",
  comic,
  cards,
  hook: {
    line: "Married at 11:59? Married all year.",
    more: "Filing status is a December 31 snapshot. Whoever you're married to, divorced from or widowed by when the year ends decides the whole year.",
    alt: "A clock at 11:59 on December 31 with a wedding ring around its hand.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Clock x={70} y={50} minute={59} scale={1.2} />
        <circle cx={70} cy={50} r={8} fill="none" stroke="#f2c230" strokeWidth={4} />
        <Arrow d="M120,56 H160" />
        <Board x={170} y={18} w={136} h={74} lines={["MARRIED", "JAN 1 – DEC 31"]} size={13} />
      </svg>
    ),
  },
  traps: [
    {
      title: "Separated isn't divorced",
      text: "Living apart, or a divorce that's filed but not final, still leaves you married on December 31. Only the “considered unmarried” rules can get a married person to head of household.",
    },
    {
      title: "The $5 filing line",
      text: "Married filing separately has a filing requirement of just $5 of gross income. Don't apply the single $15,750 line to a separate filer.",
    },
    {
      title: "Counting the surviving spouse years",
      text: "The year of death is a joint return. QSS covers only the two years after, and only with a dependent child at home. Year three is head of household or single.",
    },
    {
      title: "The pet as qualifying person",
      text: "A qualifying person for head of household is a person, usually a dependent. A dog, however beloved, never makes anyone head of household.",
    },
  ],
  sources: [
    { key: "p501", section: "Who Must File; Filing Status; Head of Household; Qualifying Surviving Spouse; Standard Deduction" },
    { key: "p17", section: "Chapter 1: When Do I Have To File?; Extensions of Time To File; Chapter 2: Filing Status" },
    { key: "obbb", section: "Standard deduction increase for 2025" },
  ],
  cases: [
    {
      who: "Penny",
      title: "The 11:59 PM wedding",
      facts: "Penny and Milo got married at 11:59 PM on December 31, 2025. Neither has a dependent.",
      question: "Which filing statuses can they use for 2025?",
      choices: ["Single, both of them", "Married filing jointly or married filing separately", "Married filing jointly only", "Head of household for whoever earns more"],
      answer: "Married filing jointly or married filing separately",
      why: "Marital status is decided on December 31. They were married that day, so they're married for all of 2025 and can file jointly or separately.",
    },
    {
      who: "Dee",
      title: "Dee's divorce",
      facts: "Cousin Dee's divorce decree became final on December 30, 2025. No one lived with her in 2025, and she has no dependents.",
      question: "What is Dee's filing status for 2025?",
      choices: ["Married filing separately", "Married filing jointly with her ex", "Single", "Head of household"],
      answer: "Single",
      why: "A final decree of divorce by December 31 makes her unmarried for the whole year. With no qualifying person, single is her only status.",
    },
    {
      who: "Milo",
      title: "Milo walks nine hundred dollars' worth of dogs",
      facts: "Imagine Milo were single, and his only 2025 income were $900 of net profit from walking dogs.",
      question: "Must he file a 2025 return?",
      choices: ["No, because $900 is far below the $15,750 line", "Yes, because his net self-employment earnings are $400 or more", "Only if he wants a refund", "No, because dog walking is a hobby"],
      answer: "Yes, because his net self-employment earnings are $400 or more",
      why: "Self-employment net earnings of $400 or more create a filing requirement whatever the person's gross income, because self-employment tax may be due.",
    },
    {
      who: "Hoot",
      title: "Mrs. Featherby, three years on",
      facts: "Hoot's neighbor Mrs. Featherby's husband died in 2022. She hasn't remarried, and her dependent son lived with her all of 2025 in a home she paid for.",
      question: "What is her best filing status for 2025?",
      choices: ["Qualifying surviving spouse", "Married filing jointly", "Head of household", "Single"],
      answer: "Head of household",
      why: "QSS lasts only the two years after the year of death, 2023 and 2024. For 2025 she's unmarried, paid the home's costs and had a qualifying person living with her, so head of household is best.",
    },
    {
      who: "Ace",
      title: "The Quills split up the paperwork",
      facts: "Ace's clients, the Quills, file married filing separately for 2025. Mrs. Quill itemizes her deductions.",
      question: "What is Mr. Quill's standard deduction?",
      choices: ["$15,750", "$31,500", "$7,875", "$0: he must itemize too"],
      answer: "$0: he must itemize too",
      why: "When one spouse filing separately itemizes, the other can't take the standard deduction. His standard deduction is zero, so he itemizes.",
    },
    {
      who: "Penny",
      title: "Penny's extension",
      facts: "Penny files Form 4868 on April 10, 2026, but doesn't pay the $800 she owes until she files in June.",
      question: "What's true about her 2025 return?",
      choices: [
        "It's due October 15, but interest runs on the $800 from April 15",
        "It's due October 15, and nothing is owed until then",
        "The extension was too early to count",
        "She has until June 15 to pay because she extended",
      ],
      answer: "It's due October 15, but interest runs on the $800 from April 15",
      why: "Form 4868 extends the time to file to October 15. It doesn't extend the time to pay, so interest, and possibly a late payment penalty, runs from April 15.",
    },
  ],
  quizTopics: ["Filing status", "Standard deduction", "Due dates and extensions"],
  quizBrief: "Filing requirements and filing status: 2025 filing lines, $400 self-employment rule, Dec 31 marital status, MFJ vs MFS, head of household, surviving spouse, due dates, Form 4868",
};

export default lesson;

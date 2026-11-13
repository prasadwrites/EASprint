import { Ace, Arrow, Backdrop, Hoot, Label, Lulu, Penny, VideoCall } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, Globe, HOOK, Mark, PANEL, Paper, Stamp, Step, Tick } from "../props";

// Part 1, topic 2.4: foreign earned income. Written to the rules for tax year 2025 from Publication 54 and
// the Form 2555 instructions as summarized there.

const INK = "#17202c";

/** An oil rig standing in the sea. (x, y) is the waterline at its center. */
function Rig({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-40,0 L-30,-40 M40,0 L30,-40 M-35,-20 L35,-20" stroke="#9aa4b2" strokeWidth={5} />
      <rect x={-44} y={-58} width={88} height={20} fill="#e8762c" stroke={INK} strokeWidth={2.5} />
      <path d="M10,-58 L18,-100 L26,-58" fill="none" stroke={INK} strokeWidth={3} />
      <path d="M18,-100 v-6" stroke="#e8505b" strokeWidth={4} />
      <rect x={-34} y={-76} width={30} height={18} fill="#f2c230" stroke={INK} strokeWidth={2} />
    </g>
  );
}

function Sea({ y = 170, w = 320, h = 50 }: { y?: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={0} y={y} width={w} height={h} fill="#5aa9e6" />
      <path d={`M0,${y} q10,-6 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0`} fill="none" stroke="#d4ebfa" strokeWidth={3} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Dee on a video call from her oil rig, cheering. Penny watches the tablet.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <VideoCall x={24} y={92} scale={1.1} mood="excited" pose="up" bars={2} />
        <Penny x={250} y={128} scale={0.76} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "My rig pays $150,000 now! And it's all tax-free, because I work abroad!", x: 3, y: 2, w: 56, tail: "down-left" },
      { who: "Penny", text: "Ace? ACE!", x: 70, y: 6, w: 27, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Ace holds up a Form 2555. Dee, on the tablet, gives a thumbs up with one bar of signal.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="2555" sub="$130,000" />} />
        <VideoCall x={176} y={92} scale={1} mood="happy" pose="wave" bars={1} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Dee, citizens are taxed on worldwide income. But Form 2555 can exclude up to $130,000 of your pay.", x: 3, y: 2, w: 56, tail: "down-left" },
      { who: "Dee", text: "I'll take it!", x: 70, y: 8, w: 27, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot in a little rowboat beside the rig at sea, pointing. Ace stands on the deck with a map of Norway's continental shelf.",
    art: (
      <svg {...PANEL}>
        <rect width={320} height={220} fill="#e7f4fb" />
        <Sea y={176} />
        <Rig x={230} y={176} scale={1.1} />
        <path d="M30,176 q30,22 60,0 Z" fill="#8a5a3c" stroke={INK} strokeWidth={2} />
        <Hoot x={60} y={120} scale={0.56} mood="smug" pose="point" />
        <Ace x={196} y={92} scale={0.3} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-hoo! A rig at sea is in international waters, Dee Pocket. That's no foreign country!", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Ace", text: "Her rig is on Norway's continental shelf, Hoot. That counts as Norway.", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Penny marks days on a big calendar: 330. Dee on the tablet looks sheepish.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Calendar x={80} y={96} month="DAYS" day="330" scale={1.5} />
        <Penny x={170} y={130} scale={0.72} mood="thinking" pose="point" flip />
        <VideoCall x={196} y={36} scale={0.8} mood="worried" bars={1} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "330 full days abroad in 12 months in a row. Dee, you came home for Lulu's birthday!", x: 3, y: 2, w: 54, tail: "down-right" },
      { who: "Dee", text: "Only 20 days!", x: 66, y: 66, w: 31, tail: "up" },
    ],
  },
  {
    alt: "Dee on the tablet holds up a sign reading EITC? Hoot, arms crossed, stamps NO.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <VideoCall x={24} y={92} scale={1} mood="excited" pose="up" bars={2} />
        <Hoot x={240} y={128} scale={0.72} mood="stern" flip clipboard />
        <Stamp x={170} y={180} text="NO EITC" color="#a8321f" size={13} />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "Then I'll also claim the earned income credit and a foreign tax credit!", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Hoot", text: "Not with Form 2555. No EITC, and no foreign tax credit on pay you excluded.", x: 55, y: 2, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu points at a jar labeled Norway bank interest. Ace shakes his head kindly.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde2e4" />
        <Lulu x={80} y={158} scale={0.56} mood="smug" pose="point" />
        <Card x={124} y={110} w={74} h={40} lines={["Bank", "interest"]} size={11} color="#fff3c4" />
        <Ace x={250} y={128} scale={0.78} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "Can Mom exclude her Norway bank interest too?", x: 3, y: 3, w: 42, tail: "down-left" },
      { who: "Ace", text: "Sharp question, Lulu. No: only earned income. Wages yes, interest and dividends no.", x: 50, y: 3, w: 47, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Citizens are taxed on worldwide income",
    alt: "A globe with a U.S. passport tag. Arrows from every continent lead to one Form 1040.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <Globe x={80} y={90} r={50} />
        <Arrow d="M136,90 H200" width={4} />
        <Paper x={240} y={90} label="1040" sub="all income" scale={1.6} color="#fff3c4" />
        <Label x={80} y={164} size={11}>Living abroad doesn't change that</Label>
      </svg>
    ),
    body: [
      "U.S. citizens and resident aliens are taxed on income from all sources, wherever they live. Living or working abroad doesn't remove the filing requirement.",
      "The filing requirement is based on gross income before any foreign earned income exclusion, so someone who excludes everything may still have to file, and must file to claim the exclusion.",
    ],
    keyPoint: "Citizens and residents: worldwide income, wherever they live. Filing requirement uses gross income before the exclusion; you must file to claim it.",
  },
  {
    title: "Two ways in: bona fide residence or 330 days",
    alt: "Two doors under a sign reading tax home abroad. Door 1: bona fide resident for a full tax year. Door 2: 330 full days in any 12 months.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={60} y={10} w={200} h={30} lines={["First: tax home abroad"]} size={12} color="#fff3c4" />
        <Step x={20} y={56} w={130} h={110} color="#d4ebfa" label="Bona fide" sub="full tax year" />
        <Step x={170} y={56} w={130} h={110} color="#d8f0e2" label="330 days" sub="any 12 months" />
      </svg>
    ),
    body: [
      "The exclusion needs a tax home in a foreign country plus one of two tests. Bona fide residence: a U.S. citizen (or resident from a treaty country) who is a resident of a foreign country for an uninterrupted period that includes a full tax year.",
      "Physical presence: any U.S. citizen or resident present in foreign countries for at least 330 full days during any 12 consecutive months. The days don't have to be consecutive, and the reason for being abroad doesn't matter.",
    ],
    keyPoint: "FEIE needs a foreign tax home + bona fide residence (full tax year) or physical presence (330 full days in any 12 consecutive months).",
  },
  {
    title: "What counts as a foreign country",
    alt: "A sea map: Norway's coast and continental shelf shaded as foreign country, and open international waters beyond marked not a foreign country.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#5aa9e6" />
        <path d="M0,0 H120 Q100,60 120,120 Q110,160 130,180 H0 Z" fill="#9fd8a8" stroke={INK} strokeWidth={2} />
        <path d="M120,0 H200 Q180,90 200,180 H130 Q110,160 120,120 Q100,60 120,0 Z" fill="#7cc4e8" stroke={INK} strokeWidth={2} strokeDasharray="6 4" />
        <Label x={56} y={90} size={13}>NORWAY</Label>
        <Label x={158} y={84} size={9}>shelf:</Label>
        <Label x={158} y={98} size={9}>counts</Label>
        <Rig x={160} y={150} scale={0.4} />
        <Label x={260} y={84} size={11} color="#fff">International</Label>
        <Label x={260} y={100} size={11} color="#fff">waters: no</Label>
      </svg>
    ),
    body: [
      "A foreign country includes its airspace and territorial waters, and the seabed and subsoil of adjacent continental shelf areas where it has exclusive rights to explore natural resources. Work on a rig on a foreign continental shelf can qualify.",
      "International waters and the airspace above them aren't in any foreign country, and neither is Antarctica. Days spent there don't count toward the 330.",
    ],
    keyPoint: "Foreign country = its land, territorial waters, airspace and continental shelf (for natural-resource work). International waters and Antarctica don't count.",
  },
  {
    title: "Up to $130,000 for 2025, per person",
    alt: "A bucket labeled $130,000 catching Dee's pay. Extra pay spills over into a taxable pile. Each spouse gets a bucket.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <path d="M40,40 L140,40 L128,150 L52,150 Z" fill="#d8f0e2" stroke={INK} strokeWidth={2.5} />
        <Label x={90} y={100} size={14}>$130,000</Label>
        <Label x={90} y={118} size={10} weight={700}>excluded</Label>
        <Arrow d="M144,60 L190,90" />
        <Card x={192} y={70} w={116} h={50} lines={["Over the cap:", "taxable"]} size={12} color="#fde2e4" />
        <Label x={160} y={172} size={10} weight={700}>Prorated for part-year qualifying days</Label>
      </svg>
    ),
    body: [
      "For 2025, a qualifying individual can exclude up to $130,000 of foreign earned income. If the tests are met for only part of the year, the limit is prorated by qualifying days.",
      "Spouses who both work abroad and both qualify can each exclude up to $130,000 of their own earnings; one spouse can't use the other's unused limit.",
    ],
    keyPoint: "2025 FEIE: up to $130,000 per qualifying person, prorated by qualifying days. Spouses each get their own limit (not shareable).",
  },
  {
    title: "The housing exclusion or deduction",
    alt: "A small apartment abroad with rent bills. A line at $20,800 marks the base amount; costs above it, up to a cap, are excluded.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <rect x={30} y={30} width={90} height={130} fill="#d4ebfa" stroke={INK} strokeWidth={2.5} />
        <rect x={30} y={30} width={90} height={60} fill="#9fd8a8" stroke={INK} strokeWidth={2.5} />
        <Label x={75} y={64} size={10}>excludable</Label>
        <Label x={75} y={130} size={10}>base $20,800</Label>
        <Label x={220} y={50} size={11}>Employer-paid housing:</Label>
        <Label x={220} y={68} size={11}>housing exclusion</Label>
        <Label x={220} y={104} size={11}>Self-employed:</Label>
        <Label x={220} y={122} size={11}>housing deduction</Label>
        <Label x={220} y={158} size={10} weight={700}>cap usually 30% of $130,000</Label>
      </svg>
    ),
    body: [
      "Reasonable foreign housing costs (rent, utilities, insurance, but not mortgage principal or lavish costs) above a base amount of $20,800 for 2025 can also be excluded, up to a limit that's generally $39,000 but higher in costly locations.",
      "Housing paid for with employer-provided amounts is excluded; self-employed people take a housing deduction instead. Either way, it's claimed on Form 2555.",
    ],
    keyPoint: "Housing: costs over the $20,800 base (2025), capped at generally $39,000 (more in high-cost cities). Employees: exclusion; self-employed: deduction. Form 2555.",
  },
  {
    title: "Only earned income qualifies",
    alt: "A sorting machine: wages and self-employment pay go to the exclusion bin; interest, dividends, pensions and U.S. government pay go to the taxable bin.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={14} y={20} w={140} h={140} color="#d8f0e2">
          <Label x={84} y={44} size={12}>Can exclude</Label>
          <Label x={84} y={74} size={10} weight={700}>Foreign wages</Label>
          <Label x={84} y={96} size={10} weight={700}>Self-employment</Label>
          <Label x={84} y={118} size={10} weight={700}>Foreign allowances</Label>
        </Card>
        <Card x={166} y={20} w={140} h={140} color="#fde2e4">
          <Label x={236} y={44} size={12}>Can't</Label>
          <Label x={236} y={74} size={10} weight={700}>Interest, dividends</Label>
          <Label x={236} y={96} size={10} weight={700}>Pensions, annuities</Label>
          <Label x={236} y={118} size={10} weight={700}>U.S. government pay</Label>
          <Label x={236} y={140} size={10} weight={700}>Capital gains</Label>
        </Card>
      </svg>
    ),
    body: [
      "Foreign earned income is pay for personal services performed in a foreign country: wages, salaries, professional fees and self-employment income.",
      "Unearned income such as interest, dividends, capital gains, pensions, annuities and Social Security never qualifies. Neither does pay from the U.S. government or its agencies, even for work done abroad.",
    ],
    keyPoint: "Only foreign earned income (wages, fees, SE income) can be excluded. Not interest, dividends, gains, pensions, Social Security or U.S. government pay.",
  },
  {
    title: "The trade-offs of excluding",
    alt: "A balance: on one side the $130,000 exclusion; on the other, no EITC, no foreign tax credit on excluded pay, stacking rates, and a 5-year lock if revoked.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Card x={14} y={20} w={292} h={30} lines={["No earned income credit at all"]} size={11} color="#fde2e4" />
        <Card x={14} y={56} w={292} h={30} lines={["No foreign tax credit on excluded pay"]} size={11} color="#fde2e4" />
        <Card x={14} y={92} w={292} h={30} lines={["Other income taxed at higher (stacked) rates"]} size={11} color="#fde2e4" />
        <Card x={14} y={128} w={292} h={30} lines={["Revoke it? 5 years before using it again"]} size={11} color="#fde2e4" />
        <Tick x={300} y={18} ok={false} s={0.6} />
      </svg>
    ),
    body: [
      "Anyone who claims the foreign earned income or housing exclusion can't claim the earned income credit. No foreign tax credit or deduction is allowed for foreign taxes on the excluded income. Remaining income is taxed at the rates that would apply if the excluded income were included (the stacking rule).",
      "The exclusion is an election. Once revoked, it can't be chosen again for five years without IRS approval. Self-employment tax still applies to excluded self-employment income.",
    ],
    keyPoint: "FEIE trade-offs: no EITC; no FTC on excluded income; stacking rule; revoking blocks it for 5 years; SE tax still applies.",
  },
  {
    title: "Filing from abroad: June 15",
    alt: "A calendar with April 15 crossed out and June 15 circled, with a Form 2350 waiting to stretch further.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fff7dc" floorY={160} />
        <Calendar x={70} y={70} month="APR" day="15" scale={1.2} />
        <path d="M40,40 L100,100 M100,40 L40,100" stroke="#a8321f" strokeWidth={5} />
        <Arrow d="M110,70 H150" />
        <Calendar x={190} y={70} month="JUN" day="15" scale={1.2} color="#1d7a49" />
        <Paper x={276} y={70} label="2350" sub="time to qualify" scale={1.1} />
        <Label x={160} y={150} size={11}>Interest still runs from April 15</Label>
      </svg>
    ),
    body: [
      "Citizens and residents whose tax home and abode are outside the U.S. and Puerto Rico on the regular due date get an automatic two-month extension to June 15 to file and pay, though interest runs from April 15.",
      "Someone who needs more time to meet the bona fide residence or physical presence test can request an extension on Form 2350. The exclusions are claimed on Form 2555 attached to Form 1040.",
    ],
    keyPoint: "Living abroad on April 15: automatic extension to June 15 (interest still from April 15). Form 2350 extends time to meet the tests. Claim on Form 2555.",
  },
];

const lesson: Lesson = {
  id: "p1-foreign-income",
  part: "part1",
  domainId: "p1d2",
  number: "2.4",
  episode: "Dee Works Offshore",
  title: "Foreign income",
  minutes: 13,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "The foreign earned income and housing exclusions: who qualifies, how much, what income counts and what it costs you.",
  previously: "Penny inherited Grandpa Walt's IRA and learned the 10-year rule. Now Dee calls from the rig with news about a raise.",
  comic,
  cards,
  hook: {
    line: "330 days, $130,000, and only what you earned.",
    more: "Tax home abroad plus bona fide residence or physical presence. Claim it on Form 2555, and give up the EITC.",
    alt: "The number 330 on a calendar beside the number 130,000 on a money bag, on an oil rig.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7f4fb" />
        <Sea y={98} h={22} />
        <Rig x={260} y={98} scale={0.7} />
        <Label x={70} y={66} size={36} color="#3f7cc4">330</Label>
        <Label x={170} y={66} size={26} color="#1d7a49">$130K</Label>
        <Mark x={300} y={30} text="!" size={24} />
      </svg>
    ),
  },
  traps: [
    { title: "Excluding investment income", text: "Interest, dividends, gains and pensions are never foreign earned income." },
    { title: "Counting days at sea", text: "International waters aren't a foreign country, but a foreign continental shelf (for resource work) is." },
    { title: "Double benefits", text: "No foreign tax credit on income you excluded, and no EITC at all with Form 2555." },
    { title: "Not filing because it's all excluded", text: "The filing requirement uses gross income before the exclusion, and the exclusion has to be claimed on a return." },
  ],
  sources: [
    { key: "p54", section: "Foreign Earned Income Exclusion; Foreign Housing Exclusion and Deduction; Bona Fide Residence Test; Physical Presence Test" },
    { key: "p596", section: "Rule 4: You can't file Form 2555" },
  ],
  cases: [
    {
      who: "Dee",
      title: "Dee's raise",
      facts: "Dee qualified for the foreign earned income exclusion for all of 2025. Her rig wages were $150,000 and she had no housing costs.",
      question: "How much of her wages can she exclude?",
      choices: ["$150,000", "$130,000", "$120,000", "$0, rigs don't count"],
      answer: "$130,000",
      why: "The 2025 exclusion limit is $130,000. The other $20,000 is taxable, at rates figured as if the excluded amount were included.",
    },
    {
      who: "Dee",
      title: "Counting Dee's days",
      facts: "In the 12 months Dee chose, she spent 320 full days in Norway (including its continental shelf) and 45 days in the U.S. She isn't a bona fide resident of Norway.",
      question: "Does she meet the physical presence test for that period?",
      choices: ["Yes, she was abroad most of the year", "No, she needs 330 full days in a 12-month period", "Yes, because the rig is in international waters", "No, rig workers can never qualify"],
      answer: "No, she needs 330 full days in a 12-month period",
      why: "The physical presence test requires 330 full days in foreign countries in any 12 consecutive months. She might pick a different 12-month period that works.",
    },
    {
      who: "Dee",
      title: "The Norway interest",
      facts: "Dee qualifies for the exclusion. Her Norwegian savings account earned $400 of interest in 2025.",
      question: "Can she exclude the $400?",
      choices: ["Yes, it's foreign income", "Yes, but only half", "No, interest isn't earned income", "No, because it's under $10,000"],
      answer: "No, interest isn't earned income",
      why: "The exclusion applies only to foreign earned income (pay for personal services). Interest is unearned income and is fully taxable.",
    },
    {
      who: "Hoot",
      title: "Hoot checks the credits",
      facts: "Dee claims the foreign earned income exclusion on Form 2555. She paid Norwegian tax on all her wages.",
      question: "Which is true?",
      choices: ["She can also claim the earned income credit", "She can claim a foreign tax credit for the tax on the excluded wages", "She can't claim the EITC, and no foreign tax credit is allowed for tax on the excluded wages", "She must choose between the exclusion and filing a return"],
      answer: "She can't claim the EITC, and no foreign tax credit is allowed for tax on the excluded wages",
      why: "Form 2555 filers can't claim the EITC, and foreign taxes on excluded income can't be credited or deducted. Taxes on the taxable part can still be credited.",
    },
    {
      who: "Ace",
      title: "Ace's calendar",
      facts: "Dee's tax home and home are in Norway on April 15, 2026. She hasn't filed Form 4868.",
      question: "When is her 2025 return due without any request?",
      choices: ["April 15, 2026", "June 15, 2026", "October 15, 2026", "December 15, 2026"],
      answer: "June 15, 2026",
      why: "Citizens living abroad with a tax home outside the U.S. and Puerto Rico get an automatic two-month extension to June 15, though interest runs from April 15.",
    },
  ],
  quizTopics: [],
  quizBrief: "Foreign earned income: worldwide taxation, tax home, bona fide residence and 330-day tests, $130,000 exclusion, housing base $20,800, earned income only, no EITC or FTC on excluded pay, June 15",
};

export default lesson;

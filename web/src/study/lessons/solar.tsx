import { Ace, Arrow, Backdrop, Hoot, House, Label, Milo, Penny, Rosa, VideoCall } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, Globe, HOOK, Mark, PANEL, Paper, Stamp, Step } from "../props";

// Part 1, topic 3.6: other credits. Written to the rules for tax year 2025 (as changed by the One Big
// Beautiful Bill Act) from the Form 5695 instructions, Publication 514 and the saver's credit rules in
// Publication 590-A. The premium tax credit is covered in episode 1.5.

const INK = "#17202c";

/** A rooftop solar panel. (x, y) is its top-left. */
function SolarPanel({ x, y, w = 80, h = 40, tilt = -12 }: { x: number; y: number; w?: number; h?: number; tilt?: number }) {
  return (
    <g transform={`translate(${x} ${y}) skewX(${tilt})`}>
      <rect x={0} y={0} width={w} height={h} fill="#2e5b9a" stroke={INK} strokeWidth={2.5} />
      {[1, 2, 3].map((i) => (
        <path key={`v${i}`} d={`M${(w / 4) * i},0 V${h}`} stroke="#9ec3f0" strokeWidth={1.5} />
      ))}
      <path d={`M0,${h / 2} H${w}`} stroke="#9ec3f0" strokeWidth={1.5} />
    </g>
  );
}

/** A small electric car. (x, y) is the middle of its bottom. */
function EVCar({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-50,-10 V-26 Q-46,-34 -30,-36 L-16,-52 H22 L38,-36 Q50,-34 52,-24 V-10 Z" fill="#9fd8a8" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M-12,-48 H18 L30,-36 H-22 Z" fill="#d4ebfa" stroke={INK} strokeWidth={2} />
      <circle cx={-30} cy={-8} r={10} fill="#3a3a3a" stroke={INK} strokeWidth={2} />
      <circle cx={30} cy={-8} r={10} fill="#3a3a3a" stroke={INK} strokeWidth={2} />
      <path d="M-4,-30 l-6,10 h8 l-6,10" fill="none" stroke="#f6d33c" strokeWidth={2.5} />
    </g>
  );
}

/** The sun. */
function Sun({ x, y, r = 18 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path key={a} d={`M0,${-r - 4} V${-r - 12}`} stroke="#f6b73c" strokeWidth={3} strokeLinecap="round" transform={`rotate(${a})`} />
      ))}
      <circle cx={0} cy={0} r={r} fill="#f6d33c" stroke={INK} strokeWidth={2} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny stands on the roof next to new solar panels, arms up. Milo holds the ladder nervously below. The sun beams.",
    art: (
      <svg {...PANEL}>
        <rect width={320} height={220} fill="#e7f4fb" />
        <Sun x={290} y={100} />
        <path d="M30,150 L160,110 L290,150 Z" fill="#d2553a" stroke={INK} strokeWidth={3} />
        <rect x={50} y={150} width={220} height={70} fill="#f4d9b0" stroke={INK} strokeWidth={3} />
        <SolarPanel x={150} y={118} w={70} h={22} />
        <Penny x={100} y={104} scale={0.5} mood="excited" pose="up" />
        <Milo x={240} y={190} scale={0.4} mood="worried" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Solar panels, done in December 2025! 30% back!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Milo", text: "Penny, please come down from the roof first.", x: 52, y: 2, w: 40, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds a calendar page reading December 31, 2025, labeled last day. Penny cheers.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={84} y={128} scale={0.78} mood="excited" pose="up" />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Calendar x={0} y={-10} month="DEC 31" day="2025" scale={0.7} />} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "The residential clean energy credit, Penny: 30%, no dollar cap. It ends for anything installed after 2025, so you just made it.", x: 40, y: 2, w: 57, tail: "down-right" },
    ],
  },
  {
    alt: "Milo shows off a heat pump and new windows. Ace holds a sign reading $2,000 plus $1,200.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <rect x={130} y={140} width={60} height={50} rx={4} fill="#d4ebfa" stroke={INK} strokeWidth={2.5} />
        <circle cx={160} cy={165} r={16} fill="#fff" stroke={INK} strokeWidth={2} />
        <path d="M160,151 V179 M146,165 H174" stroke="#9aa4b2" strokeWidth={2} />
        <Milo x={74} y={128} scale={0.76} mood="excited" pose="point" />
        <Ace x={250} y={128} scale={0.76} mood="happy" flip pose="hold" holding={<Card x={-32} y={-24} w={64} h={34} lines={["$2,000", "+ $1,200"]} size={10} color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "And I put in a heat pump and new windows!", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Ace", text: "Home improvement credit, Milo: up to $2,000 for the heat pump, plus up to $1,200 for the rest. Windows max $600.", x: 47, y: 2, w: 50, tail: "down-right" },
    ],
  },
  {
    alt: "Penny dangles keys next to a new electric car. Hoot stamps a calendar reading September 30.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f4fb" floor="#cfe8c4" />
        <EVCar x={150} y={200} scale={1} />
        <Penny x={60} y={128} scale={0.72} mood="excited" pose="up" />
        <Hoot x={262} y={128} scale={0.66} mood="smug" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "And the electric car I bought in October?", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! Clean vehicle credits ended for cars acquired after September 30, 2025.", x: 48, y: 3, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Dee on the tablet holds a Norwegian tax slip. Ace holds up a sign reading $300.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <VideoCall x={24} y={92} scale={1} mood="worried" pose="hold" bars={2} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-28} y={-22} w={56} h={30} lines={["≤ $300"]} size={12} color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "Norway took $80 of tax from my fund dividends! Do I pay twice?", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Ace", text: "Take a foreign tax credit, Dee. Under $300, all on a 1099: no Form 1116 needed.", x: 53, y: 3, w: 44, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa proudly presents a young baker's IRA statement. Ace shows a 50 percent sign.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.76} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="IRA" sub="$2,000" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-28} y={-22} w={56} h={30} lines={["50%"]} size={13} color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "My youngest baker earns $30,000 and put $2,000 in an IRA!", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Then she may get the saver's credit, Rosa: 50% of $2,000 at her income. That's $1,000.", x: 51, y: 3, w: 46, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Residential clean energy credit: 30%, ends after 2025",
    alt: "A house with solar panels, a battery and a geothermal loop, all labeled 30 percent, no dollar cap. A calendar marks December 31, 2025 as the last day.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <House x={90} y={160} scale={1.5} color="#f4d9b0" />
        <SolarPanel x={56} y={66} w={50} h={16} />
        <Sun x={30} y={30} r={12} />
        <Card x={170} y={20} w={138} h={60} lines={["30% of cost", "no dollar cap"]} size={12} color="#d8f0e2" />
        <Calendar x={238} y={130} month="LAST DAY" day="12/31/25" scale={0.9} />
      </svg>
    ),
    body: [
      "The residential clean energy credit (Form 5695, Part I) is 30% of the cost, including installation, of solar electric and solar water heating, small wind, geothermal heat pumps, battery storage of at least 3 kWh and fuel cells, for a U.S. home (new or existing; fuel cells only for a main home). There's no annual dollar limit (except fuel cells), and unused credit carries forward.",
      "Under the 2025 law, no credit is allowed for expenditures made after December 31, 2025. An expenditure is made when installation is complete.",
    ],
    keyPoint: "Residential clean energy credit: 30% (solar, wind, geothermal, batteries ≥ 3 kWh, fuel cells), no dollar cap, carryforward; not for expenditures made (installed) after 12/31/2025. Form 5695 Part I.",
  },
  {
    title: "Energy efficient home improvement credit: $1,200 + $2,000",
    alt: "Two buckets: a $1,200 bucket for windows ($600 max), doors, insulation, AC and an energy audit, and a separate $2,000 bucket for heat pumps.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={14} y={14} w={150} h={150} color="#fff3c4">
          <Label x={89} y={38} size={14}>$1,200 a year</Label>
          <Label x={89} y={64} size={10} weight={700}>windows (max $600)</Label>
          <Label x={89} y={84} size={10} weight={700}>doors ($250 each)</Label>
          <Label x={89} y={104} size={10} weight={700}>insulation, AC</Label>
          <Label x={89} y={124} size={10} weight={700}>energy audit ($150)</Label>
        </Card>
        <Card x={176} y={14} w={132} h={100} color="#d8f0e2">
          <Label x={242} y={40} size={14}>+ $2,000</Label>
          <Label x={242} y={66} size={10} weight={700}>heat pumps,</Label>
          <Label x={242} y={84} size={10} weight={700}>biomass stoves</Label>
        </Card>
        <Label x={242} y={140} size={10} weight={700}>30% · existing main</Label>
        <Label x={242} y={156} size={10} weight={700}>home · through 2025</Label>
      </svg>
    ),
    body: [
      "The energy efficient home improvement credit (Form 5695, Part II) is 30% of qualified improvements to an existing main home in the U.S. It's capped at $1,200 a year for items like insulation, exterior windows (up to $600 total), exterior doors ($250 each, $500 total), central air, efficient water heaters and furnaces, and a home energy audit ($150), plus a separate $2,000 a year for heat pumps, heat pump water heaters and biomass stoves.",
      "That's up to $3,200 a year, nonrefundable with no carryforward. It doesn't apply to new construction or rentals, and it ends for property placed in service after December 31, 2025.",
    ],
    keyPoint: "Home improvement credit: 30%, existing main home; $1,200/yr cap (windows $600, doors $250/$500, audit $150) + separate $2,000 for heat pumps/biomass; no carryforward; ends for property placed in service after 2025. Form 5695 Part II.",
  },
  {
    title: "Clean vehicle credits: over for cars acquired after September 30, 2025",
    alt: "An electric car parked beside a calendar with September 30, 2025 circled and a stop sign after it.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d8f0e2" />
        <EVCar x={80} y={140} scale={1.1} />
        <Calendar x={200} y={70} month="SEP 30" day="2025" scale={1.1} />
        <Stamp x={260} y={140} text="AFTER: $0" color="#a8321f" size={14} />
      </svg>
    ),
    body: [
      "The new clean vehicle credit (up to $7,500), the used clean vehicle credit (up to $4,000) and the commercial clean vehicle credit don't apply to vehicles acquired after September 30, 2025.",
      "A vehicle acquired by that date (a written binding contract and a payment made) can still qualify if it meets the other rules, including the seller's report and the income limits.",
    ],
    keyPoint: "Clean vehicle credits (new up to $7,500, used up to $4,000) end for vehicles acquired after September 30, 2025.",
  },
  {
    title: "Foreign taxes: credit or deduction",
    alt: "A globe with a foreign tax receipt choosing between two doors: credit (dollar for dollar, usually better) or itemized deduction.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <Globe x={60} y={90} r={40} />
        <Arrow d="M104,70 L160,44" />
        <Arrow d="M104,110 L160,136" />
        <Card x={164} y={18} w={144} h={54} lines={["Credit: dollar for", "dollar (Form 1116)"]} size={11} color="#d8f0e2" />
        <Card x={164} y={110} w={144} h={54} lines={["Or itemized", "deduction"]} size={11} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Income taxes paid to a foreign country can be taken as a credit (usually better) or as an itemized deduction, but all qualifying foreign taxes for the year must be treated the same way. The credit is limited to the U.S. tax on the foreign income, figured on Form 1116 by category.",
      "No credit or deduction is allowed for foreign taxes on income excluded under the foreign earned income exclusion. Unused credit can be carried back 1 year and forward 10.",
    ],
    keyPoint: "Foreign income taxes: credit (Form 1116, limited to U.S. tax on foreign income; carry back 1, forward 10) or itemized deduction, all one way each year. None on FEIE-excluded income.",
  },
  {
    title: "The $300 / $600 shortcut",
    alt: "A 1099-DIV showing foreign tax paid of $80, with a shortcut arrow skipping Form 1116 because it's $300 or less.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={60} y={84} label="1099-DIV" sub="foreign tax $80" scale={1.7} />
        <path d="M110,60 Q180,0 250,60" fill="none" stroke="#1d7a49" strokeWidth={4} />
        <Paper x={180} y={120} label="1116" scale={1.2} color="#fde2e4" />
        <path d="M156,96 L204,144 M204,96 L156,144" stroke="#a8321f" strokeWidth={4} />
        <Card x={234} y={60} w={76} h={50} lines={["$300", "$600 MFJ"]} size={11} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "A taxpayer can claim the foreign tax credit without Form 1116 if all foreign income is passive (like dividends and interest), all of it and the tax are reported on a payee statement such as Form 1099-DIV or 1099-INT, and total creditable foreign taxes are $300 or less ($600 married filing jointly).",
      "Choosing the shortcut means no carryback or carryforward of excess credit for that year.",
    ],
    keyPoint: "Skip Form 1116 if all foreign income is passive, reported on 1099s, and foreign tax ≤ $300 ($600 MFJ). No carryover that year.",
  },
  {
    title: "The saver's credit",
    alt: "Three tiers of matching: 50, 20 and 10 percent of up to $2,000 contributed, with 2025 AGI limits of $39,500 single, $59,250 HOH and $79,000 joint.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <Step x={14} y={40} w={80} h={120} color="#d8f0e2" label="50%" />
        <Step x={100} y={80} w={80} h={80} color="#fff3c4" label="20%" />
        <Step x={186} y={110} w={80} h={50} color="#d4ebfa" label="10%" />
        <Label x={160} y={24} size={11}>of up to $2,000 ($4,000 joint)</Label>
        <Label x={292} y={60} size={9} weight={700}>max AGI:</Label>
        <Label x={292} y={76} size={9} weight={700}>$39,500</Label>
        <Label x={292} y={90} size={9} weight={700}>$59,250 HOH</Label>
        <Label x={292} y={104} size={9} weight={700}>$79,000 MFJ</Label>
      </svg>
    ),
    body: [
      "The retirement savings contributions credit (saver's credit, Form 8880) is 50%, 20% or 10% of up to $2,000 of contributions to IRAs, 401(k)s and similar plans ($4,000 on a joint return), depending on AGI. For 2025, it isn't available above $39,500 of AGI ($59,250 HOH, $79,000 joint).",
      "The saver must be at least 18, not a full-time student and not someone else's dependent. Recent retirement distributions reduce the contributions counted. It's nonrefundable.",
    ],
    keyPoint: "Saver's credit: 50/20/10% of up to $2,000 ($4,000 MFJ) of retirement contributions; 2025 AGI caps $39,500 / $59,250 HOH / $79,000 MFJ; 18+, not a full-time student or dependent; nonrefundable. Form 8880.",
  },
];

const lesson: Lesson = {
  id: "p1-other-credits",
  part: "part1",
  domainId: "p1d3",
  number: "3.6",
  episode: "Penny Goes Solar",
  title: "Other credits",
  minutes: 12,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns, including the 2025 law changes)",
  intro: "Energy credits for the home, the end of clean vehicle credits, the foreign tax credit and the saver's credit.",
  previously: "Ace survived EITC season with a perfect checklist. Back home, Penny has climbed onto the roof.",
  comic,
  cards,
  hook: {
    line: "2025 was the last sunny year.",
    more: "Solar and home improvement credits end after 2025; clean car credits ended September 30. Foreign tax: credit beats deduction.",
    alt: "A sun setting behind a solar panel with a calendar reading 2025.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Sun x={70} y={60} r={24} />
        <SolarPanel x={120} y={44} w={70} h={30} />
        <Calendar x={262} y={56} month="LAST" day="2025" scale={0.9} />
        <Mark x={220} y={106} text="30%" color="#1d7a49" size={16} />
      </svg>
    ),
  },
  traps: [
    { title: "Clean energy credit caps", text: "The residential clean energy credit (solar) has no dollar cap. The home improvement credit is the one with the $1,200 and $2,000 limits." },
    { title: "Cars bought in the fall", text: "Clean vehicle credits are gone for vehicles acquired after September 30, 2025." },
    { title: "Credit on excluded income", text: "No foreign tax credit for tax on income excluded under Form 2555." },
    { title: "Saver's credit for students", text: "Full-time students and dependents can't claim it." },
  ],
  sources: [
    { key: "i5695", section: "Residential Clean Energy Credit; Energy Efficient Home Improvement Credit" },
    { key: "p514", section: "Choosing To Take Credit or Deduction; Exemption from foreign tax credit limit" },
    { key: "p590a", section: "Retirement Savings Contributions Credit (Saver's Credit)" },
    { key: "obbb", section: "Clean energy and vehicle credit terminations" },
  ],
  cases: [
    {
      who: "Penny",
      title: "Penny's panels",
      facts: "Penny and Milo paid $20,000 for solar panels on their main home, installed and working in December 2025. They have enough tax to use any credit.",
      question: "What credit do they get?",
      choices: ["$1,200", "$2,000", "$6,000", "$0, solar credits ended in 2024"],
      answer: "$6,000",
      why: "The residential clean energy credit is 30% of the cost with no dollar cap: $6,000. It's available for expenditures made (installed) by December 31, 2025.",
    },
    {
      who: "Milo",
      title: "Milo's upgrades",
      facts: "In 2025, Milo spent $8,000 on a heat pump and $3,000 on new exterior windows for their existing main home.",
      question: "What's the energy efficient home improvement credit?",
      choices: ["$3,300", "$2,600", "$3,200", "$2,000"],
      answer: "$2,600",
      why: "Heat pump: 30% of $8,000 is $2,400, capped at $2,000. Windows: 30% of $3,000 is $900, capped at $600. Total $2,600.",
    },
    {
      who: "Penny",
      title: "The October car",
      facts: "Penny signed the contract and paid for a new electric car on October 15, 2025.",
      question: "What clean vehicle credit can she claim?",
      choices: ["$7,500", "$4,000", "$3,750", "$0"],
      answer: "$0",
      why: "Clean vehicle credits don't apply to vehicles acquired after September 30, 2025.",
    },
    {
      who: "Dee",
      title: "Dee's small foreign tax",
      facts: "Dee's only foreign income is fund dividends reported on a Form 1099-DIV showing $80 of foreign tax paid. She's single.",
      question: "How can she claim it?",
      choices: ["Only as an itemized deduction", "As a credit without Form 1116", "She must file Form 1116", "It can't be claimed"],
      answer: "As a credit without Form 1116",
      why: "With only passive income reported on a payee statement and foreign taxes of $300 or less ($600 MFJ), the credit can be claimed without Form 1116.",
    },
    {
      who: "Rosa",
      title: "The young baker",
      facts: "Rosa's baker, 24, single, not a student or dependent, has AGI of $20,000 and contributed $2,000 to an IRA in 2025.",
      question: "What's the maximum saver's credit she can claim (before the tax limit)?",
      choices: ["$1,000", "$400", "$200", "$0"],
      answer: "$1,000",
      why: "At her low AGI she gets the 50% rate: 50% of $2,000 is $1,000. The credit is nonrefundable, so it can't exceed her tax.",
    },
  ],
  quizTopics: [],
  quizBrief: "Other credits for 2025: residential clean energy credit (30%, ends after 2025), home improvement credit limits, end of clean vehicle credits, foreign tax credit and Form 1116, saver's credit",
};

export default lesson;

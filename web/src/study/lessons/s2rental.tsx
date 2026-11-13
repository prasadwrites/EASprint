import { Ace, Backdrop, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import { Crate } from "../bakery";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Step } from "../props";

// Part 2, topic 3.5 (season finale): rental property as a business: rental income (including rent paid in
// property or services), Schedule E, the passive activity rules, the $25,000 allowance, real estate
// professionals, and the personal-use and 15-day rules. Written to Publication 527, Publication 925 and
// the Form 8582 instructions for tax year 2025.

const INK = "#2a2f3a";

/** A plate piled with cinnamon rolls. (x, y) is the bottom center. */
function Rolls({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const spots = [
    [-18, -10],
    [0, -10],
    [18, -10],
    [-9, -24],
    [9, -24],
    [0, -38],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={0} rx={32} ry={6} fill="#fff" stroke={INK} strokeWidth={2} />
      {spots.map(([cx, cy]) => (
        <g key={`${cx}_${cy}`}>
          <circle cx={cx} cy={cy} r={9} fill="#d9a066" stroke={INK} strokeWidth={2} />
          <path d={`M${cx - 4},${cy} a4,4 0 1 1 4,4 a2,2 0 1 1 -2,-2`} fill="none" stroke="#7a4a20" strokeWidth={1.6} />
        </g>
      ))}
    </g>
  );
}

/** Ace's new office sign. (x, y) is the top left. */
function OfficeSign({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M20,0 V-12 M80,0 V-12" stroke={INK} strokeWidth={2} />
      <rect x={0} y={0} width={100} height={40} rx={6} fill="#0f6e64" stroke={INK} strokeWidth={2.5} />
      <text x={50} y={17} textAnchor="middle" fontSize={11} fontWeight={900} fill="#fff" fontFamily="inherit">
        OKAFOR
      </text>
      <text x={50} y={31} textAnchor="middle" fontSize={9} fontWeight={800} fill="#fff3c4" fontFamily="inherit">
        TAX DEFENSE
      </text>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Ace, holding a box of office supplies, asks Rosa about the empty room upstairs. Rosa grins.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Ace x={70} y={128} scale={0.76} mood="happy" pose="hold" holding={<Crate x={0} y={14} scale={0.5} label="OFFICE" />} />
        <Rosa x={256} y={128} scale={0.76} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "I'm opening my own practice. Could I rent the room above the bakery?", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Rosa", text: "Only if you pay the rent in cinnamon rolls!", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Ace looks at a plate of cinnamon rolls, confused. Rosa beams.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Ace x={70} y={128} scale={0.76} mood="thinking" />
        <Rolls x={160} y={160} scale={1.1} />
        <Rosa x={256} y={128} scale={0.76} mood="excited" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "But I'd have to buy the rolls... from you.", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Rosa", text: "Exactly! Everybody wins. Mostly me.", x: 62, y: 6, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of a crate labeled FOR RENT. Rosa shoos him.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Hoot x={84} y={92} scale={0.52} mood="stern" pose="up" />
        <Crate x={84} y={206} scale={1.05} label="FOR RENT" />
        <Rosa x={256} y={128} scale={0.76} mood="stern" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Rent paid in goods or services is rental income at fair market value. Rolls included.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Rosa", text: "Hoot, that crate is NOT for rent.", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Penny explains the $25,000 rental loss allowance. Milo has a terrible idea.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={88} w={108} h={70} lines={["Rental = passive", "Loss? up to $25,000", "if MAGI ≤ $100K"]} size={9.5} color="#fff" />
        <Milo x={262} y={128} scale={0.76} mood="excited" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Rentals are passive. But if you actively manage one, up to $25,000 of loss can offset other income.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Milo", text: "Passive income! I'll rent out Biscuit!", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at a card about real estate professionals. Lulu raises a correction.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={92} w={104} h={64} lines={["Real estate pro:", "750+ hours AND", "over half your work"]} size={9.5} color="#fff" />
        <Lulu x={270} y={160} scale={0.56} mood="smug" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Rosa isn't a real estate professional. That takes 750 hours and more than half of her working time.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Lulu", text: "Rosa's a BREAD professional.", x: 66, y: 6, w: 31, tail: "down-right" },
    ],
  },
  {
    alt: "Ace proudly hangs his new office sign. Hoot appears in the doorway with his clipboard. Ace's smile freezes.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f1fb" />
        <Ace x={66} y={128} scale={0.76} mood="excited" pose="up" />
        <OfficeSign x={110} y={84} scale={0.95} />
        <Hoot x={256} y={128} scale={0.62} mood="smug" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Okafor Tax Defense is OPEN! What could possibly go wrong?", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Hoot", text: "Lovely office. About Penny and Milo's 2025 return... See you in Season 3.", x: 54, y: 2, w: 43, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Rental income and expenses",
    alt: "Rental income includes regular and advance rent, nonrefundable deposits, expenses the tenant pays for you, and the fair market value of property or services received as rent. Expenses and depreciation go on Schedule E.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Card x={12} y={14} w={146} h={110} lines={["INCOME", "rent + advance rent", "kept deposits", "FMV of goods or", "services as rent"]} size={9.5} color="#fff" />
        <Card x={164} y={14} w={146} h={110} lines={["EXPENSES", "interest · taxes", "repairs · insurance", "depreciation", "27.5 or 39 years"]} size={9.5} color="#d8f0e2" />
        <Label x={160} y={152} size={10} weight={700}>Reported on Schedule E</Label>
      </svg>
    ),
    body: [
      "Rental income includes regular rent, advance rent (taxable when received, whatever period it covers), security deposits the landlord keeps or that are really final rent, expenses a tenant pays on the landlord's behalf, and the fair market value of property or services received instead of rent. A refundable security deposit isn't income when received.",
      "Rental expenses include mortgage interest, property taxes, insurance, repairs, management fees and depreciation: 27.5 years for residential rental property and 39 years for nonresidential property, straight line with the mid-month convention. Improvements are capitalized. Individuals report rentals on Schedule E.",
    ],
    keyPoint: "Rental income: rent, advance rent (when received), kept or final-rent deposits, tenant-paid expenses, FMV of property/services received as rent. Refundable deposits aren't income. Expenses: interest, taxes, insurance, repairs, depreciation (27.5 yr residential, 39 yr nonresidential, SL mid-month). Improvements capitalized. Schedule E.",
  },
  {
    title: "The passive activity rules",
    alt: "A rental activity is generally passive no matter how much you participate. Passive losses offset only passive income; the rest carries forward until you have passive income or sell the property.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="Rental" sub="passive by default" />
        <Step x={112} y={14} w={96} h={100} color="#fff3c4" label="Losses" sub="vs. passive income" />
        <Step x={214} y={14} w={96} h={100} color="#d8f0e2" label="Sell it" sub="frees all losses" />
        <Label x={160} y={146} size={10} weight={700}>Suspended losses carry forward · Form 8582</Label>
      </svg>
    ),
    body: [
      "A passive activity is a trade or business in which the taxpayer doesn't materially participate, or a rental activity, which is passive regardless of participation (unless an exception applies). Passive losses can offset only passive income; they can't offset wages, portfolio income or active business income.",
      "Disallowed passive losses are suspended and carried forward indefinitely. They're freed when the activity produces passive income, or in full when the taxpayer disposes of the entire interest in a fully taxable transaction to an unrelated party. Short-term rentals with an average stay of 7 days or less aren't treated as rental activities.",
    ],
    keyPoint: "Passive = business without material participation, or any rental activity (regardless of participation, absent an exception). Passive losses offset only passive income; suspended losses carry forward indefinitely; all released on a fully taxable disposition of the entire interest to an unrelated party. Average stay ≤ 7 days: not a rental activity. Form 8582.",
  },
  {
    title: "The $25,000 allowance",
    alt: "An individual who actively participates in a rental can deduct up to $25,000 of rental losses against other income. The allowance is reduced by half of MAGI over $100,000 and is gone at $150,000.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={10} y={14} w={96} h={100} color="#d8f0e2" label="$25,000" sub="max allowance" />
        <Step x={112} y={14} w={96} h={100} color="#fff3c4" label="$100K" sub="phase-out starts" />
        <Step x={214} y={14} w={96} h={100} color="#fde2e4" label="$150K" sub="allowance gone" />
        <Label x={160} y={140} size={10} weight={700}>Reduce by 50% of MAGI over $100,000</Label>
        <Label x={160} y={158} size={10} weight={700}>Active participation · own 10%+</Label>
      </svg>
    ),
    body: [
      "An individual who actively participates in a rental real estate activity can deduct up to $25,000 of losses from it against nonpassive income. Active participation is a lower bar than material participation: owning at least 10% and making management decisions, like approving tenants and setting rent, is enough.",
      "The $25,000 is reduced by 50% of modified adjusted gross income over $100,000, so it disappears at $150,000. Married people filing separately who lived together at any time during the year get no allowance; those who lived apart all year get $12,500, phased out between $50,000 and $75,000.",
    ],
    keyPoint: "Special allowance: up to $25,000 of rental real estate losses against nonpassive income with active participation (≥ 10% ownership, management decisions). Reduced by 50% of MAGI over $100,000; zero at $150,000. MFS living together: $0; MFS living apart all year: $12,500, phase-out $50,000-$75,000.",
  },
  {
    title: "Real estate professionals",
    alt: "A real estate professional who spends more than half of their working time and more than 750 hours in real property businesses, and materially participates in a rental, can treat it as nonpassive.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f1fb" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="> 50%" sub="of work time" />
        <Step x={112} y={14} w={96} h={100} color="#fff3c4" label="> 750" sub="hours a year" />
        <Step x={214} y={14} w={96} h={100} color="#d8f0e2" label="+ MP" sub="in the rental" />
        <Label x={160} y={140} size={10} weight={700}>Then the rental isn't automatically passive</Label>
        <Label x={160} y={158} size={10} weight={700}>Employee hours count only with 5%+ ownership</Label>
      </svg>
    ),
    body: [
      "A taxpayer qualifies as a real estate professional for the year if more than half of the personal services they perform in all trades or businesses are in real property trades or businesses in which they materially participate, and they perform more than 750 hours of services in those real property businesses. On a joint return, one spouse must meet both tests alone.",
      "For a real estate professional, rental real estate isn't automatically passive; if they also materially participate in the rental (they can elect to treat all rentals as one activity), losses are nonpassive. Hours worked as an employee in real estate count only if the employee owns more than 5% of the employer.",
    ],
    keyPoint: "Real estate professional: > 50% of personal services in real property trades/businesses with material participation AND > 750 hours there. On a joint return, one spouse must meet both alone. Then rentals with material participation (election to aggregate allowed) are nonpassive. Employee hours count only if > 5% owner.",
  },
  {
    title: "Personal use and the 15-day rule",
    alt: "A home rented for fewer than 15 days in the year: the rent isn't taxable and rental expenses aren't deducted. A home used personally more than 14 days or 10% of rental days is a residence, and rental deductions are limited to rental income.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="< 15 days" sub="rent tax-free" />
        <Step x={166} y={14} w={140} h={100} color="#fff3c4" label="> 14 or 10%" sub="personal use: residence" />
        <Label x={160} y={140} size={10} weight={700}>Residence: deductions limited to rental income</Label>
        <Label x={160} y={158} size={10} weight={700}>Split expenses by rental and personal days</Label>
      </svg>
    ),
    body: [
      "If a dwelling unit is used as a home and rented for fewer than 15 days during the year, the rental income isn't reported and no rental expenses are deducted (mortgage interest and taxes are still deductible as usual on Schedule A).",
      "A dwelling unit is used as a home if personal use exceeds the greater of 14 days or 10% of the days it's rented at fair rental. Expenses are divided between rental and personal days. If the unit is used as a home and rented 15 days or more, rental deductions are limited to rental income; the excess carries forward. Days a family member uses it (unless paying fair rent as a main home) count as personal use.",
    ],
    keyPoint: "Home rented < 15 days: rent excluded, no rental deductions. Used as a home if personal days > greater of 14 days or 10% of fair-rental days. Allocate expenses by days. Home + rented ≥ 15 days: rental deductions limited to rental income (excess carries forward). Family use counts as personal unless fair rent for a main home.",
  },
];

const lesson: Lesson = {
  id: "p2-rental-property",
  part: "part2",
  domainId: "p2d3",
  number: "3.5",
  episode: "The Room Above the Bakery",
  title: "Rental property as a business",
  minutes: 15,
  lawAsOf: "tax year 2025",
  intro: "Season finale. What counts as rental income (including rent paid in rolls), the passive activity rules, the $25,000 allowance, real estate professionals, and the 15-day rule.",
  previously: "Deduction the hen is laying an egg a day (above the line, Milo insists). Meanwhile, Ace has news.",
  comic,
  cards,
  hook: {
    line: "Rent is passive. $25,000 if you manage it.",
    more: "Barter rent = income at FMV. Allowance phases out $100K-$150K MAGI. Real estate pro: > 750 hours and > half your work. Rented < 15 days: tax-free. Personal use > 14 days or 10%: a residence.",
    alt: "A plate of cinnamon rolls next to $25K and 750.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fde9e4" />
        <Rolls x={66} y={100} scale={1.3} />
        <Mark x={180} y={74} text="$25K" color="#1d7a49" size={30} />
        <Mark x={268} y={74} text="750" color="#a8321f" size={32} />
      </svg>
    ),
  },
  traps: [
    { title: "Rent in kind isn't income", text: "Property or services received as rent are income at fair market value." },
    { title: "Active participation means 750 hours", text: "Active participation (for the $25,000 allowance) just needs 10% ownership and management decisions. 750 hours is the real estate professional test." },
    { title: "The allowance works at any income", text: "It phases out between $100,000 and $150,000 of MAGI." },
    { title: "A refundable deposit is rent", text: "It isn't income unless the landlord keeps it or it's applied as final rent." },
  ],
  sources: [
    { key: "p527", section: "Residential rental property" },
    { key: "p925", section: "Passive activity rules" },
    { key: "i8582", section: "Passive activity loss limits" },
  ],
  cases: [
    {
      who: "Rosa",
      title: "Paid in pastry",
      facts: "A landlord lets a tenant pay a year's rent by providing $6,000 worth of baked goods.",
      question: "How much rental income does the landlord report?",
      choices: ["$0", "$6,000", "$3,000", "Only what she resells"],
      answer: "$6,000",
      why: "Property or services received instead of rent are rental income at their fair market value.",
    },
    {
      who: "Penny",
      title: "Over the line",
      facts: "A single landlord actively participates in a rental that has a $30,000 loss in 2025. Her MAGI is $120,000, and she has no passive income.",
      question: "How much of the loss can she deduct in 2025?",
      choices: ["$25,000", "$30,000", "$0", "$15,000"],
      answer: "$15,000",
      why: "The $25,000 allowance is reduced by 50% of MAGI over $100,000: $25,000 − $10,000 = $15,000. The other $15,000 carries forward.",
    },
    {
      who: "Milo",
      title: "Festival weekend",
      facts: "A family rents out their home for 12 days during a festival for $4,000 and lives there the rest of the year.",
      question: "How is the $4,000 treated?",
      choices: ["None of it is taxable", "All $4,000 is taxable", "Half is taxable", "Taxable after depreciation"],
      answer: "None of it is taxable",
      why: "A home rented for fewer than 15 days in the year: the rent isn't reported and rental expenses aren't deducted.",
    },
    {
      who: "Ace",
      title: "Busy, but not enough",
      facts: "A taxpayer spends 800 hours a year managing her rentals and 1,800 hours as a bakery manager.",
      question: "Is she a real estate professional?",
      choices: ["Yes; she has over 750 hours", "No; real estate isn't more than half her work", "Yes, if she owns 10%", "Only with a real estate license"],
      answer: "No; real estate isn't more than half her work",
      why: "Both tests must be met: more than 750 hours AND more than half of all personal services in real property businesses. 800 of 2,600 hours isn't more than half.",
    },
  ],
  quizTopics: ["Rental real estate"],
  quizBrief: "Rental real estate: rental income (advance rent, deposits, rent in kind), Schedule E, passive activity rules, $25,000 allowance (MAGI $100K-$150K), real estate professional, 15-day rule",
};

export default lesson;

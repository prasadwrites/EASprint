import { Ace, Arrow, Backdrop, Biscuit, Cash, Hoot, House, Label, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Stamp, Step } from "../props";

// Part 1, topic 2.2: rental, royalty and pass-through income. Written to the rules for tax year 2025 from
// Publications 527 and 925 and the Schedule E and K-1 instructions as summarized in Publication 17.

const INK = "#17202c";

/** A "For Rent" sign on a post. (x, y) is the bottom of the post. */
function RentSign({ x, y, text = "FOR RENT" }: { x: number; y: number; text?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0,0 V-60" stroke="#8a5a3c" strokeWidth={5} />
      <rect x={-34} y={-86} width={68} height={30} rx={4} fill="#fff" stroke={INK} strokeWidth={2.5} />
      <Label x={0} y={-66} size={11} color="#a8321f">
        {text}
      </Label>
    </g>
  );
}

/** A big letter "A" font specimen, for Penny's font royalties. */
function FontSpecimen({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-30} y={-34} width={60} height={68} rx={4} fill="#fff" stroke={INK} strokeWidth={2.5} />
      <text x={0} y={16} fontSize={44} fontFamily="Georgia, serif" fontWeight={700} textAnchor="middle" fill="#d2553a">
        Aa
      </text>
      <Label x={0} y={28} size={6}>
        PENNY SERIF
      </Label>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Milo stands outside his old condo holding a FOR RENT sign. Penny waves a set of keys.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f4fb" floor="#cfe8c4" />
        <House x={250} y={190} scale={1.1} color="#d4ebfa" />
        <Milo x={80} y={128} scale={0.78} mood="excited" pose="up" />
        <RentSign x={160} y={198} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "My old condo is a rental now! Free money every month!", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Penny", text: "Milo, nothing in this town is free. Ask Ace.", x: 54, y: 3, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds up a long list of rental expenses: mortgage interest, taxes, repairs, insurance, depreciation. Milo's jaw drops.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Milo x={80} y={128} scale={0.78} mood="shocked" pose="shrug" />
        <Ace x={236} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-34} y={-30} w={68} h={44} lines={["Rent in", "minus costs"]} size={9} color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Rent is income, Milo. Then you deduct interest, taxes, repairs, insurance and depreciation on Schedule E.", x: 30, y: 2, w: 67, tail: "down-right" },
    ],
  },
  {
    alt: "Penny hands keys to a tourist family during the Ledger Falls Fair. A calendar shows 10 days.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={80} y={128} scale={0.78} mood="smug" pose="point" />
        <Calendar x={170} y={112} month="FAIR" day="10" scale={1.1} />
        <Hoot x={262} y={128} scale={0.7} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "We rented our house for the 10-day fair. $3,000! Tax-free, right, Hoot?", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Hoot", text: "Under 15 days... it's true. Not reported. It pains me.", x: 58, y: 4, w: 39, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a font specimen card showing Aa in her own typeface. Royalty checks rain down.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fdf3e1" />
        <Cash x={150} y={50} rotate={-14} />
        <Cash x={200} y={74} rotate={10} />
        <Penny x={86} y={128} scale={0.78} mood="excited" pose="hold" holding={<FontSpecimen x={0} y={-6} scale={0.7} />} />
        <Ace x={244} y={128} scale={0.76} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "And my font, Penny Serif, earns royalties!", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Ace", text: "Royalties go on Schedule E too, Penny, unless you're in the business of making fonts.", x: 50, y: 2, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa hands Penny a paper labeled K-1 from Rosa's Rolls. Penny looks at her empty hands.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.76} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="K-1" sub="Rosa's Rolls" />} />
        <Penny x={238} y={128} scale={0.78} mood="worried" flip pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Your 10% of the bakery made $8,000 this year, dear! We kept it all in the oven fund.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Penny", text: "So I owe tax on $8,000 I never got?", x: 60, y: 6, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot stamps PASSIVE on Milo's rental loss. Ace holds up a sign reading $25,000. Biscuit snoozes.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Hoot x={70} y={128} scale={0.7} mood="smug" pose="point" />
        <Stamp x={150} y={84} text="PASSIVE" color="#a8321f" size={14} />
        <Biscuit x={170} y={176} scale={0.32} mood="sleepy" />
        <Ace x={250} y={128} scale={0.76} mood="happy" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-hoo! Your rental lost money, Milo Marsh. Passive losses offset only passive income!", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Ace", text: "Except the $25,000 allowance, Hoot. Milo actively manages it.", x: 57, y: 4, w: 40, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Rental income: more than the monthly rent",
    alt: "Four envelopes going into a rental house: monthly rent, advance rent, a lease-cancel fee and a security deposit with a question mark.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <House x={250} y={150} scale={1.2} color="#fdf3e1" />
        <Card x={10} y={14} w={150} h={28} lines={["Monthly rent: income"]} size={10} color="#d8f0e2" />
        <Card x={10} y={50} w={150} h={28} lines={["Advance rent: now"]} size={10} color="#d8f0e2" />
        <Card x={10} y={86} w={150} h={28} lines={["Cancel fee: income"]} size={10} color="#d8f0e2" />
        <Card x={10} y={122} w={150} h={40} lines={["Deposit to return:", "not income"]} size={10} color="#fde2e4" />
        <Arrow d="M164,90 H196" />
      </svg>
    ),
    body: [
      "Rental income is any payment received for the use of property: regular rent, advance rent (income when received, whatever period it covers), lease cancellation payments, and expenses a tenant pays for the owner.",
      "A security deposit the owner plans to return isn't income when received. If it's kept because the tenant breaks the lease, or it's really the last month's rent, it is income.",
    ],
    keyPoint: "Rental income includes rent, advance rent (when received), lease-cancellation fees and owner expenses paid by tenants. A refundable security deposit isn't income unless kept or applied as rent.",
  },
  {
    title: "Expenses and depreciation: 27.5 years, building only",
    alt: "A house split into a building and a patch of land. The building has a ruler marked 27.5 years; the land says never.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <House x={90} y={130} scale={1.4} color="#d4ebfa" />
        <rect x={20} y={130} width={140} height={30} fill="#9fd8a8" stroke={INK} strokeWidth={2} />
        <Label x={90} y={150} size={11}>Land: never</Label>
        <Card x={180} y={24} w={128} h={46} lines={["Building:", "27.5 years"]} size={12} color="#fff3c4" />
        <Card x={180} y={84} w={128} h={70} lines={["Interest, taxes,", "repairs, insurance,", "management"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "Ordinary and necessary rental expenses are deductible on Schedule E: mortgage interest, property taxes, insurance, repairs, utilities the owner pays, management fees and travel to the property. Improvements that better, restore or adapt the property are capitalized, not deducted.",
      "Residential rental buildings are depreciated straight-line over 27.5 years using the mid-month convention, starting when the property is placed in service (ready and available to rent). Land is never depreciated, so the cost must be split between land and building.",
    ],
    keyPoint: "Schedule E: deduct interest, taxes, repairs, insurance, fees. Capitalize improvements. Residential building: 27.5-year straight-line, mid-month; land isn't depreciable.",
  },
  {
    title: "Rented fewer than 15 days: invisible",
    alt: "A calendar with 14 days circled and the words not reported, no rental deductions.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fff7dc" floorY={160} />
        <Calendar x={80} y={74} month="RENTED" day="14" scale={1.6} />
        <Card x={160} y={36} w={148} h={74} lines={["Rent: not reported", "Rent expenses:", "not deducted"]} size={11} color="#d8f0e2" />
        <Penny x={230} y={140} scale={0.28} mood="smug" />
      </svg>
    ),
    body: [
      "If a dwelling unit is used as a home and rented fewer than 15 days in the year, none of the rent is reported and no rental expenses are deducted.",
      "Mortgage interest and property taxes are still deductible as itemized deductions, as they would be for any home.",
    ],
    keyPoint: "Home rented < 15 days a year: rent isn't reported and rental expenses aren't deductible (mortgage interest and taxes stay itemized).",
  },
  {
    title: "The vacation home: personal days change everything",
    alt: "A beach cottage with a seesaw: rental days on one side, personal days on the other. A note says personal use over 14 days or 10 percent of rental days.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <House x={64} y={140} scale={1.1} color="#fff3c4" />
        <Step x={126} y={30} w={86} h={120} color="#d8f0e2" label="Rental" sub="days" />
        <Step x={222} y={70} w={86} h={80} color="#fde2e4" label="Personal" sub="days" />
        <Label x={216} y={170} size={10} weight={700}>personal over 14 days or 10% → a residence</Label>
      </svg>
    ),
    body: [
      "A dwelling is used as a residence if personal use is more than the greater of 14 days or 10% of the days it's rented at fair rental. Personal use includes use by family members (unless they pay fair rent as a main home) and days donated or swapped.",
      "Expenses are divided between rental and personal days. When the home counts as a residence, rental expenses can't exceed rental income, so there's no rental loss; the extra carries forward.",
    ],
    keyPoint: "Residence test: personal use > greater of 14 days or 10% of fair-rental days. Allocate expenses by days; if a residence, rental deductions are limited to rental income (no loss).",
  },
  {
    title: "Passive losses and the $25,000 allowance",
    alt: "A wall labeled passive keeps a rental loss away from wages, except for a $25,000 door that narrows between $100,000 and $150,000 of income.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={10} y={60} w={86} h={50} lines={["Rental", "loss"]} size={12} color="#fde2e4" />
        <rect x={130} y={14} width={20} height={150} fill="#9aa4b2" stroke={INK} strokeWidth={2} />
        <rect x={130} y={68} width={20} height={34} fill="#d8f0e2" stroke={INK} strokeWidth={2} />
        <Label x={140} y={60} size={9}>$25K</Label>
        <Arrow d="M98,85 H126" />
        <Arrow d="M154,85 H190" />
        <Card x={194} y={60} w={116} h={50} lines={["Wages and", "other income"]} size={12} color="#d4ebfa" />
        <Label x={160} y={140} size={10} weight={700}>Phases out from $100K to $150K MAGI</Label>
        <Label x={160} y={156} size={10} weight={700}>(50 cents per dollar over $100K)</Label>
      </svg>
    ),
    body: [
      "Rental activities are generally passive, and passive losses can offset only passive income. Disallowed losses carry forward and are released when the activity is fully disposed of.",
      "An individual who actively participates (owns at least 10% and takes part in management decisions, like approving tenants and setting rent) can deduct up to $25,000 of rental loss against other income. The allowance drops by 50% of modified AGI over $100,000 and is gone at $150,000. Real estate professionals who materially participate can treat rentals as nonpassive.",
    ],
    keyPoint: "Rentals are passive; losses offset only passive income and carry forward. Active participation: up to $25,000 against other income, reduced by 50% of MAGI over $100K (zero at $150K).",
  },
  {
    title: "Royalties: Schedule E or Schedule C",
    alt: "Penny's font card points two ways: Schedule E for an investor or occasional creator, Schedule C for someone in the business of creating.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <FontSpecimen x={60} y={86} scale={1.2} />
        <Arrow d="M104,70 L150,46" />
        <Arrow d="M104,104 L150,128" />
        <Card x={154} y={22} w={154} h={50} lines={["Schedule E", "no SE tax"]} size={12} color="#d8f0e2" />
        <Card x={154} y={104} w={154} h={50} lines={["Schedule C if it's", "your business: SE tax"]} size={11} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Royalties from copyrights, patents, and oil, gas and mineral properties are taxable. They're reported on Schedule E, where expenses such as depletion are deducted, and they aren't subject to self-employment tax.",
      "A self-employed writer, inventor or artist who creates the work as a business reports the royalties on Schedule C, where self-employment tax applies.",
    ],
    keyPoint: "Royalties: Schedule E (no SE tax) for most owners; Schedule C (SE tax) for self-employed creators in the business.",
  },
  {
    title: "K-1 income: taxed whether or not it's paid out",
    alt: "A bakery oven with $8,000 inside labeled Penny's 10 percent share, kept in the business. Penny still gets a K-1 and pays tax on it.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <rect x={20} y={40} width={110} height={100} rx={10} fill="#9aa4b2" stroke={INK} strokeWidth={2.5} />
        <rect x={34} y={60} width={82} height={50} rx={6} fill="#f6b73c" stroke={INK} strokeWidth={2} />
        <Label x={75} y={90} size={14}>$8,000</Label>
        <Label x={75} y={158} size={10} weight={700}>kept in the business</Label>
        <Paper x={182} y={84} label="K-1" sub="Penny 10%" scale={1.5} color="#fff3c4" />
        <Card x={224} y={58} w={88} h={52} lines={["Taxed now", "on 1040"]} size={11} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "Partners, S corporation shareholders and beneficiaries of trusts and estates get a Schedule K-1 showing their share of income, deductions and credits. Partners and S corporation shareholders are taxed on their share in the year it's earned, whether or not any cash is distributed.",
      "Distributions themselves generally aren't taxed again to the extent of the owner's basis. Trust and estate beneficiaries are taxed on income that is distributed or required to be distributed, up to distributable net income.",
    ],
    keyPoint: "Partnership/S corp K-1 income is taxed when earned, distributed or not. Distributions reduce basis (taxable only beyond basis). Trust/estate beneficiaries: taxed on distributed or required-to-be-distributed income (up to DNI).",
  },
];

const lesson: Lesson = {
  id: "p1-rental-passthrough",
  part: "part1",
  domainId: "p1d2",
  number: "2.2",
  episode: "The Spare Room",
  title: "Rental, royalty and pass-through income",
  minutes: 14,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "Rental houses, vacation homes, royalties and K-1s: income that arrives on Schedule E, and the losses that can't always leave it.",
  previously: "Penny won the raffle and learned that prizes are income. Now Milo has moved in for good, and his old condo sits empty.",
  comic,
  cards,
  hook: {
    line: "Fourteen days or fewer? The rent is invisible.",
    more: "Rent more and it's Schedule E. Use it yourself too much and it's a residence with no loss. Lose money and the passive rules step in.",
    alt: "A calendar page reading 14 with a little ghost holding dollar bills.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Calendar x={70} y={56} month="RENTED" day="14" scale={1.2} />
        <Label x={200} y={52} size={22}>No report.</Label>
        <Label x={200} y={84} size={22} color="#1d7a49">No deduction.</Label>
        <Mark x={296} y={34} text="!" color="#e8505b" size={30} />
      </svg>
    ),
  },
  traps: [
    { title: "Security deposits", text: "A deposit to be returned isn't income. A deposit kept, or one that's really the last month's rent, is." },
    { title: "Depreciating the land", text: "Only the building is depreciated (27.5 years for residential). Split the cost first." },
    { title: "No distribution, no tax", text: "Partners and S corporation shareholders are taxed on their K-1 share whether or not any cash comes out." },
    { title: "The $25,000 for everyone", text: "It needs active participation and shrinks by half of MAGI over $100,000, vanishing at $150,000." },
  ],
  sources: [
    { key: "p527", section: "Rental Income; Rental Expenses; Depreciation; Personal Use of Dwelling Unit" },
    { key: "p925", section: "Passive Activities; Special $25,000 allowance" },
    { key: "p17", section: "Rental Income and Expenses; Royalties; Partnerships, S corporations and trusts" },
  ],
  cases: [
    {
      who: "Penny",
      title: "The fair rental",
      facts: "Penny and Milo rented their home to visitors for 10 days during the fair for $3,000. They lived there the rest of 2025.",
      question: "How do they treat the $3,000?",
      choices: ["Report it on Schedule E and deduct 10 days of expenses", "Don't report it; no rental expenses are deducted", "Report it as other income with no deductions", "Report half of it"],
      answer: "Don't report it; no rental expenses are deducted",
      why: "A home used as a residence and rented fewer than 15 days in the year: the rent isn't reported and no rental expenses are deducted.",
    },
    {
      who: "Milo",
      title: "The deposit and last month",
      facts: "Milo's tenant paid January rent of $1,200, a $1,200 refundable security deposit, and $1,200 labeled last month's rent, all in January 2025.",
      question: "How much is rental income for 2025?",
      choices: ["$1,200", "$2,400", "$3,600", "$0 until the lease ends"],
      answer: "$2,400",
      why: "January rent and the advance last month's rent are income when received. The refundable security deposit isn't income unless kept.",
    },
    {
      who: "Milo",
      title: "Milo's rental loss",
      facts: "Milo actively manages his rental and owns all of it. It lost $12,000 in 2025. Penny and Milo's modified AGI is $120,000 on their joint return, and they have no other passive income.",
      question: "How much of the loss can they deduct in 2025?",
      choices: ["$0", "$10,000", "$12,000", "$25,000"],
      answer: "$12,000",
      why: "The $25,000 allowance is reduced by 50% of MAGI over $100,000: $25,000 minus $10,000 is $15,000. The whole $12,000 loss fits.",
    },
    {
      who: "Penny",
      title: "Penny's K-1",
      facts: "Penny owns 10% of Rosa's Rolls, a partnership. Her share of 2025 income is $8,000. The bakery kept all the cash for a new oven.",
      question: "How much does Penny report for 2025?",
      choices: ["$0, since nothing was distributed", "$8,000", "$800", "Only what is paid out in 2026"],
      answer: "$8,000",
      why: "A partner is taxed on their distributive share of partnership income whether or not it's distributed.",
    },
    {
      who: "Ace",
      title: "Ace's client's land",
      facts: "Ace's client bought a rental house for $300,000, of which $60,000 is the value of the land.",
      question: "What is the depreciable basis and recovery period?",
      choices: ["$300,000 over 27.5 years", "$240,000 over 27.5 years", "$240,000 over 39 years", "$300,000 over 39 years"],
      answer: "$240,000 over 27.5 years",
      why: "Land isn't depreciated, so only the $240,000 building is. Residential rental property is recovered over 27.5 years.",
    },
    {
      who: "Rosa",
      title: "Rosa's lake cottage",
      facts: "Aunt Rosa rented her lake cottage at fair rent for 150 days in 2025 and stayed there herself for 20 days.",
      question: "Is the cottage treated as a residence?",
      choices: ["No, because it was rented far more days than used", "No, because 20 days is under 10% of the year", "Yes, because 20 days is more than the greater of 14 days or 15 days", "No, cottages are never residences"],
      answer: "Yes, because 20 days is more than the greater of 14 days or 15 days",
      why: "The test is personal use over the greater of 14 days or 10% of fair-rental days (15 here). Twenty days is more, so it's a residence and rental deductions can't create a loss.",
    },
  ],
  quizTopics: [],
  quizBrief: "Rental, royalty and K-1 income: rental income and deposits, 27.5-year depreciation, under-15-day rule, vacation home use, passive losses and the $25,000 allowance, royalties, pass-through income",
};

export default lesson;

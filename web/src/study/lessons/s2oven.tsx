import { Ace, Backdrop, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import { Gerald, Oven } from "../bakery";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Step } from "../props";

// Part 2, topic 2.4: depreciation: MACRS recovery periods and conventions, the section 179 deduction,
// bonus depreciation after the One Big Beautiful Bill Act, the order they apply in, listed property, and
// depreciation recapture. Written to Publication 946 and the Form 4562 instructions for tax year 2025.

const comic: Lesson["comic"] = [
  {
    alt: "A huge new oven named Bertha glows in the bakery. Rosa presents it proudly. Milo gapes.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Rosa x={56} y={128} scale={0.7} mood="excited" pose="up" />
        <Oven x={160} y={206} scale={1.05} label="BERTHA" />
        <Milo x={270} y={128} scale={0.7} mood="shocked" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Meet BERTHA! $80,000 of oven!", x: 3, y: 2, w: 34, tail: "down-left", shout: true },
      { who: "Milo", text: "Can we deduct all of her? Right now?", x: 62, y: 4, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Ace explains section 179 with a card. Rosa holds up a small number.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={70} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={110} y={96} w={100} h={56} lines={["§179", "≤ business income"]} size={10} color="#fff" />
        <Rosa x={258} y={128} scale={0.76} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Section 179 allows up to $2.5 million for 2025, but no more than your business income.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Rosa", text: "Our income is $60,000. Bertha is bigger than our income.", x: 58, y: 2, w: 40, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot, covered in soot, pops out of Bertha the oven, looking reluctant.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Hoot x={84} y={122} scale={0.54} mood="worried" pose="up" />
        <Oven x={84} y={224} scale={0.85} glow={false} label="BERTHA" />
        <Calendar x={180} y={96} month="BOUGHT" day="MAR" scale={0.7} color="#1d7a49" />
        <Penny x={262} y={128} scale={0.74} mood="excited" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Bonus depreciation is 100% for property acquired after January 19, 2025. No income limit...", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Penny", text: "We bought her in March!", x: 62, y: 6, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Penny shows a seven-year chart. Lulu looks skeptical.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={70} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={112} y={92} w={98} h={64} lines={["MACRS", "7 years", "half-year start"]} size={10} color="#fff" />
        <Lulu x={260} y={160} scale={0.56} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Without those, it's MACRS: most equipment over 7 years, half a year's worth to start.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Lulu", text: "Bertha has a 7-year plan? I don't have a plan for Tuesday.", x: 58, y: 4, w: 38, tail: "down-right" },
    ],
  },
  {
    alt: "Milo points at a December calendar. Ace shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Milo x={70} y={128} scale={0.76} mood="excited" pose="point" />
        <Calendar x={150} y={100} month="DEC" day="31" scale={0.75} color="#e8505b" />
        <Ace x={256} y={128} scale={0.76} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Let's buy all the other equipment in December!", x: 3, y: 2, w: 38, tail: "down-left" },
      { who: "Ace", text: "Over 40% in the last quarter and the mid-quarter convention shrinks the first year.", x: 50, y: 2, w: 48, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa introduces Gerald the sourdough jar to Bertha the oven. Gerald looks alarmed. Hoot shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Rosa x={56} y={128} scale={0.7} mood="happy" />
        <Gerald x={118} y={196} scale={1.1} mood="shocked" />
        <Oven x={194} y={206} scale={0.8} label="BERTHA" />
        <Hoot x={282} y={130} scale={0.56} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Bertha, meet Gerald. Gerald, don't be scared.", x: 3, y: 2, w: 38, tail: "down-left" },
      { who: "Hoot", text: "For the record: Gerald is NOT depreciable.", x: 58, y: 4, w: 38, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "MACRS basics",
    alt: "Property is depreciated over its recovery period: 5 years for cars and computers, 7 for most equipment and furniture, 27.5 for residential rental, 39 for nonresidential buildings. Land never depreciates.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={10} y={14} w={72} h={110} color="#fff" label="5" sub="cars, PCs" />
        <Step x={88} y={14} w={72} h={110} color="#fff3c4" label="7" sub="equipment" />
        <Step x={166} y={14} w={72} h={110} color="#d4ebfa" label="27.5" sub="rental homes" />
        <Step x={244} y={14} w={66} h={110} color="#fde2e4" label="39" sub="buildings" />
        <Label x={160} y={150} size={10} weight={700}>Land: never depreciated</Label>
      </svg>
    ),
    body: [
      "Under the general depreciation system of MACRS, tangible property used in a business or for income is recovered over set periods: 5 years for cars, light trucks and computers; 7 years for office furniture and most machinery and equipment (including property with no class life); 15 years for land improvements; 27.5 years for residential rental property; and 39 years for nonresidential real property. Land isn't depreciable.",
      "Personal property uses 200% declining balance (150% for 15- and 20-year property) switching to straight line, with the half-year convention: half a year's depreciation in the first year, whatever the month. If more than 40% of the year's depreciable personal property (excluding real property and section 179 amounts) is placed in service in the last 3 months, the mid-quarter convention applies instead. Real property uses straight line and the mid-month convention.",
    ],
    table: {
      head: ["Year", "5-year (HY)", "7-year (HY)"],
      rows: [
        ["1", "20.00%", "14.29%"],
        ["2", "32.00%", "24.49%"],
        ["3", "19.20%", "17.49%"],
      ],
    },
    keyPoint: "MACRS GDS: 5-yr (cars, computers), 7-yr (furniture, most equipment, no class life), 15-yr (land improvements), 27.5-yr residential rental, 39-yr nonresidential; land never. Personal property: 200% DB, half-year convention; mid-quarter if > 40% placed in service in Q4. Real property: straight line, mid-month.",
  },
  {
    title: "Section 179",
    alt: "For 2025, a business can elect to expense up to $2,500,000 of qualifying property, reduced dollar for dollar once purchases exceed $4,000,000, and no more than its business taxable income.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={14} w={94} h={110} color="#d8f0e2" label="$2.5M" sub="2025 limit" />
        <Step x={113} y={14} w={94} h={110} color="#fde2e4" label="$4M" sub="phase-out starts" />
        <Step x={212} y={14} w={94} h={110} color="#fff3c4" label="Income" sub="cap; rest carries" />
        <Label x={160} y={150} size={10} weight={700}>Elected on Form 4562 · heavy SUVs: $31,300</Label>
      </svg>
    ),
    body: [
      "Section 179 lets a business elect to deduct the cost of qualifying property (tangible personal property, off-the-shelf software, and certain building improvements like roofs, HVAC and security systems on nonresidential property) in the year it's placed in service. For 2025, after the One Big Beautiful Bill Act, the limit is $2,500,000, reduced dollar for dollar when qualifying purchases exceed $4,000,000.",
      "The deduction can't exceed the taxable income from the active conduct of any trade or business; the excess carries forward. The property must be used more than 50% for business. The limit for heavy SUVs is $31,300 for 2025. It's elected on Form 4562.",
    ],
    keyPoint: "§179 (2025): elect up to $2,500,000, phase-out dollar for dollar over $4,000,000 of purchases; limited to business taxable income (excess carries forward); > 50% business use; heavy SUV cap $31,300. Covers equipment, off-the-shelf software, some nonresidential improvements (roof, HVAC, security). Form 4562.",
  },
  {
    title: "Bonus depreciation",
    alt: "For property acquired after January 19, 2025, bonus depreciation is 100%. Property acquired earlier and placed in service in 2025 gets 40%. There's no income limit and a business can elect out by class.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="100%" sub="acquired after 1/19/25" />
        <Step x={166} y={14} w={140} h={100} color="#fff3c4" label="40%" sub="acquired before 1/20/25" />
        <Label x={160} y={140} size={10} weight={700}>No income limit · can create a loss</Label>
        <Label x={160} y={158} size={10} weight={700}>Automatic unless you elect out (by class)</Label>
      </svg>
    ),
    body: [
      "Bonus (special) depreciation applies to new and used qualified property with a recovery period of 20 years or less. Under the One Big Beautiful Bill Act, property acquired after January 19, 2025 qualifies for a permanent 100% bonus. Property acquired before January 20, 2025 and placed in service in 2025 gets 40%.",
      "Bonus depreciation is automatic unless the business elects out for a class of property. Unlike section 179, it isn't limited by business income and can create or increase a net operating loss. The order is section 179 first, then bonus on what's left, then regular MACRS on any remaining basis.",
    ],
    keyPoint: "Bonus depreciation (2025): 100% for qualified property acquired after Jan 19, 2025 (permanent); 40% if acquired before Jan 20, 2025 and placed in service in 2025. New or used, ≤ 20-year property. Automatic unless elected out by class; no income limit (can create an NOL). Order: §179 → bonus → MACRS.",
  },
  {
    title: "Listed property",
    alt: "Cars and other listed property must be used more than 50% for business to get section 179, bonus or accelerated depreciation. If business use drops to 50% or less later, the excess is recaptured.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Mark x={70} y={92} text=">50%" color="#1d7a49" size={36} />
        <Card x={140} y={14} w={168} h={46} lines={["Over 50%: §179, bonus,", "accelerated MACRS"]} size={10} color="#d8f0e2" />
        <Card x={140} y={66} w={168} h={46} lines={["50% or less: straight", "line (ADS) only"]} size={10} color="#fde2e4" />
        <Card x={140} y={118} w={168} h={46} lines={["Drops later:", "recapture the excess"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Listed property, mainly passenger automobiles and other property used for transportation (and property used for entertainment or recreation), must be used more than 50% in a qualified business use to claim section 179, bonus depreciation or accelerated MACRS. Otherwise it's depreciated straight line under the alternative depreciation system.",
      "If business use falls to 50% or less in a later year, the excess depreciation taken over straight line is recaptured as ordinary income. Passenger cars are also subject to annual luxury auto limits on depreciation.",
    ],
    keyPoint: "Listed property (cars, transportation property): > 50% qualified business use needed for §179, bonus and accelerated MACRS; otherwise ADS straight line. Business use later ≤ 50%: excess over straight line recaptured as ordinary income. Passenger cars also face luxury auto caps.",
  },
  {
    title: "Recapture",
    alt: "When depreciated equipment is sold at a gain, the gain up to the depreciation taken is ordinary income under section 1245. For buildings, individuals pay up to 25% on unrecaptured section 1250 gain.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Step x={14} y={14} w={140} h={100} color="#fde2e4" label="§1245" sub="equipment: ordinary" />
        <Step x={166} y={14} w={140} h={100} color="#fff3c4" label="§1250" sub="buildings: up to 25%" />
        <Label x={160} y={140} size={10} weight={700}>Gain up to depreciation taken (§179 and bonus too)</Label>
        <Label x={160} y={158} size={10} weight={700}>Reported on Form 4797</Label>
      </svg>
    ),
    body: [
      "Depreciation (including section 179 and bonus) lowers basis, so selling the property can produce a gain. For section 1245 property (equipment, vehicles, furniture), gain up to the total depreciation taken is ordinary income; any gain beyond that is section 1231 gain.",
      "For real property depreciated straight line, there's generally no ordinary recapture, but for individuals the gain attributable to depreciation (unrecaptured section 1250 gain) is taxed at a maximum 25% rate. Sales are reported on Form 4797.",
    ],
    keyPoint: "Depreciation (incl. §179 and bonus) reduces basis. §1245 property: gain up to depreciation taken = ordinary income; remainder §1231. Real property (straight line): unrecaptured §1250 gain taxed at max 25% for individuals. Form 4797.",
  },
];

const lesson: Lesson = {
  id: "p2-depreciation",
  part: "part2",
  domainId: "p2d2",
  number: "2.4",
  episode: "Bertha the Oven",
  title: "Depreciation",
  minutes: 14,
  lawAsOf: "tax year 2025, as changed by the One Big Beautiful Bill Act",
  intro: "How MACRS spreads the cost of business property, section 179 and bonus depreciation for 2025, the mid-quarter trap, listed property, and recapture when you sell.",
  previously: "Back from the Bread Expo, Rosa didn't just bring home a trophy. She bought something enormous.",
  comic,
  cards,
  hook: {
    line: "179 first, bonus next, MACRS last.",
    more: "2025: §179 up to $2.5M (phase-out over $4M, income cap). Bonus 100% if acquired after Jan 19, 2025. Equipment 7 years, half-year. Over 40% in Q4 = mid-quarter.",
    alt: "Bertha the oven with the numbers 179 and 100%.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fde9e4" />
        <Oven x={66} y={112} scale={0.8} label="BERTHA" />
        <Mark x={180} y={74} text="179" color="#1d7a49" size={34} />
        <Mark x={266} y={74} text="100%" color="#a8321f" size={28} />
      </svg>
    ),
  },
  traps: [
    { title: "§179 can create a loss", text: "Section 179 is limited to business taxable income. Bonus depreciation can create a loss." },
    { title: "All 2025 purchases get 100% bonus", text: "Only property acquired after January 19, 2025. Earlier acquisitions placed in service in 2025 get 40%." },
    { title: "Depreciate the land", text: "Land is never depreciated; only the building and improvements." },
    { title: "Half-year always applies", text: "If more than 40% of the year's personal property is placed in service in Q4, the mid-quarter convention applies." },
  ],
  sources: [
    { key: "p946", section: "How to depreciate property" },
    { key: "i4562", section: "Form 4562 instructions" },
    { key: "obbb", section: "2025 law changes" },
  ],
  cases: [
    {
      who: "Rosa",
      title: "Bigger than income",
      facts: "In 2025 a business places in service $80,000 of equipment and elects section 179 for all of it. Its business taxable income before the deduction is $60,000. It elects out of bonus depreciation.",
      question: "How much section 179 can it deduct in 2025?",
      choices: ["$80,000", "$60,000", "$2,500,000", "$0"],
      answer: "$60,000",
      why: "Section 179 is limited to business taxable income. The other $20,000 carries forward.",
    },
    {
      who: "Penny",
      title: "The January order",
      facts: "A bakery signed a binding contract for a mixer on January 10, 2025 and placed it in service in March 2025.",
      question: "What bonus depreciation rate applies?",
      choices: ["100%", "60%", "40%", "0%"],
      answer: "40%",
      why: "Property acquired before January 20, 2025 and placed in service in 2025 gets 40% bonus. 100% applies to property acquired after January 19, 2025.",
    },
    {
      who: "Milo",
      title: "December shopping",
      facts: "A calendar-year business places $100,000 of equipment in service in 2025: $45,000 in December and the rest in May.",
      question: "Which convention applies?",
      choices: ["Mid-month", "Half-year", "Full-year", "Mid-quarter"],
      answer: "Mid-quarter",
      why: "More than 40% of the year's depreciable personal property (45%) was placed in service in the last quarter, so the mid-quarter convention applies.",
    },
    {
      who: "Ace",
      title: "The new desk",
      facts: "A business places a $10,000 office desk (7-year property) in service in June 2025 and elects out of bonus and section 179.",
      question: "What's the 2025 MACRS depreciation?",
      choices: ["$1,429", "$2,000", "$714", "$10,000"],
      answer: "$1,429",
      why: "7-year property under the half-year convention takes 14.29% in year one: $10,000 × 14.29% = $1,429.",
    },
  ],
  quizTopics: ["Section 179", "Bonus depreciation"],
  quizBrief: "Depreciation: MACRS periods and conventions (half-year, mid-quarter), section 179 for 2025 ($2.5M/$4M, income limit), bonus depreciation (100% after Jan 19, 2025, else 40%), listed property, recapture",
};

export default lesson;

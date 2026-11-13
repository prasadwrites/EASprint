import { Ace, Arrow, Backdrop, Hoot, House, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Stamp, Whoosh } from "../props";

// Part 1, topic 2.6: special sales. Written to the rules for tax year 2025 from Publications 544, 537 and
// 550 (like-kind exchanges, installment sales, bad debts, options, wash sales and traders).

const INK = "#17202c";

/** A boxy van. (x, y) is the middle of its bottom edge. */
function Van({ x, y, scale = 1, color = "#9fd8a8" }: { x: number; y: number; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-60,-10 V-56 H24 L50,-34 H60 V-10 Z" fill={color} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M28,-52 L46,-36 H28 Z" fill="#d4ebfa" stroke={INK} strokeWidth={2} />
      <rect x={-52} y={-48} width={30} height={18} rx={2} fill="#d4ebfa" stroke={INK} strokeWidth={2} />
      <circle cx={-36} cy={-8} r={11} fill="#3a3a3a" stroke={INK} strokeWidth={2} />
      <circle cx={36} cy={-8} r={11} fill="#3a3a3a" stroke={INK} strokeWidth={2} />
      <Label x={-6} y={-24} size={8}>
        MILO WALKS
      </Label>
    </g>
  );
}

/** A laptop with a zigzag stock chart. (x, y) is the bottom center. */
function Laptop({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-40} y={-56} width={80} height={50} rx={4} fill="#2e4a3f" stroke={INK} strokeWidth={2.5} />
      <path d="M-32,-16 L-18,-30 L-6,-22 L8,-44 L20,-34 L32,-48" fill="none" stroke="#9fd8a8" strokeWidth={3} />
      <path d="M-50,-6 H50 L44,0 H-44 Z" fill="#9aa4b2" stroke={INK} strokeWidth={2} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "At the Ledger Falls swap meet, Milo stands beside his old van with a SWAP sign. Ace shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f4fb" floor="#cfe8c4" />
        <Van x={150} y={200} scale={1.05} />
        <Milo x={60} y={128} scale={0.74} mood="excited" pose="point" />
        <Ace x={262} y={128} scale={0.74} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "I'll swap my old van for Gus's newer one. A like-kind exchange, so no tax!", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Ace", text: "Milo, since 2018 like-kind is for real estate only. Trading a van is a sale.", x: 55, y: 2, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Penny points at a small condo trading for a bigger duplex, with $20,000 cash on top. Hoot holds his clipboard.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={58} y={128} scale={0.72} mood="smug" pose="point" />
        <House x={132} y={198} scale={0.6} color="#d4ebfa" />
        <Arrow d="M156,184 H176" />
        <House x={208} y={198} scale={0.72} color="#fff3c4" />
        <Card x={140} y={108} w={64} h={26} lines={["+$20,000"]} size={11} color="#d8f0e2" />
        <Hoot x={276} y={140} scale={0.56} mood="smug" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Fine. Swap the condo for a duplex, plus $20,000 cash to us!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Hoot", text: "The $20,000 is boot: taxable gain. And 45 days to name it, 180 to close!", x: 52, y: 2, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa holds a Form 6252 marked installment. Ace points out how the gain is spread.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" floor="#cfe8c4" />
        <Rosa x={84} y={128} scale={0.76} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="6252" sub="installment" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I sold my old lot! The buyer pays me $10,000 a year for five years.", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Ace", text: "An installment sale, Rosa. You report the gain a slice at a time, as payments arrive.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds an empty wallet; a dust cloud shows where his friend Gus sped away. Hoot points at him.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f4fb" floor="#cfe8c4" />
        <Whoosh x={140} y={150} dir={-1} />
        <Milo x={84} y={128} scale={0.78} mood="worried" pose="shrug" />
        <Hoot x={244} y={128} scale={0.72} mood="stern" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Gus skipped town with the $2,000 I lent him!", x: 3, y: 3, w: 42, tail: "down-left" },
      { who: "Hoot", text: "A nonbusiness bad debt, Milo Marsh. A short-term capital loss, once it's totally worthless.", x: 49, y: 2, w: 48, tail: "down-right" },
    ],
  },
  {
    alt: "Penny looks sadly at an expired option ticket. Lulu, grinning, holds the cash premium.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="CALL" sub="expired" color="#fde2e4" />} />
        <Lulu x={236} y={160} scale={0.56} mood="smug" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "My call option expired worthless. Who even sold me that?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Lulu", text: "I did, Aunt Penny! Your $200 is my short-term capital gain.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Milo at a laptop showing a zigzag chart, wearing a visor. Hoot leans in with a clipboard.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Milo x={80} y={128} scale={0.78} mood="smug" pose="up" />
        <Laptop x={160} y={196} scale={0.9} />
        <Hoot x={256} y={128} scale={0.7} mood="stern" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "I'm a trader now! Three trades a month! My laptop's deductible!", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Hoot", text: "Traders trade substantially, regularly and continuously. You, Milo Marsh, are an investor.", x: 52, y: 2, w: 45, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Like-kind exchanges: real estate for real estate",
    alt: "A condo and a duplex trade places with a green check. A van and a van trade places with a red X.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <House x={50} y={80} scale={0.6} color="#d4ebfa" />
        <Arrow d="M84,60 H124" />
        <House x={160} y={80} scale={0.7} color="#fff3c4" />
        <Stamp x={260} y={50} text="LIKE-KIND" color="#1d7a49" rotate={-8} size={12} />
        <Van x={60} y={170} scale={0.5} />
        <Arrow d="M100,152 H130" />
        <Van x={170} y={170} scale={0.5} color="#f7b6c2" />
        <Stamp x={262} y={140} text="TAXABLE SALE" color="#a8321f" rotate={-8} size={12} />
      </svg>
    ),
    body: [
      "Gain or loss isn't recognized when real property held for business or investment is exchanged for other real property held for business or investment. Since 2018, only real property qualifies; vehicles, equipment and art don't.",
      "A main home, land held mainly for sale (a dealer's inventory), and U.S. real property traded for foreign real property don't qualify. Exchanges are reported on Form 8824.",
    ],
    keyPoint: "Section 1031: business/investment real property ↔ business/investment real property only (since 2018). Not personal property, a main home, dealer property, or U.S. ↔ foreign real property. Form 8824.",
  },
  {
    title: "Boot, deadlines and basis",
    alt: "A timeline from the sale: day 45 identify, day 180 receive. Below, a duplex with a $20,000 cash bundle labeled boot taxed now.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M20,50 H300" stroke={INK} strokeWidth={3} />
        <circle cx={20} cy={50} r={6} fill={INK} />
        <Calendar x={120} y={40} month="IDENTIFY" day="45" scale={0.8} />
        <Calendar x={260} y={40} month="RECEIVE" day="180" scale={0.8} />
        <Card x={20} y={104} w={136} h={56} lines={["Boot (cash, debt", "relief): gain taxed"]} size={10} color="#fde2e4" />
        <Card x={170} y={104} w={136} h={56} lines={["Up to the gain;", "basis carries over"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "In a deferred exchange, the replacement property must be identified within 45 days after the transfer and received within 180 days (or by the return due date, with extensions, if earlier).",
      "Cash, other property or net debt relief received (boot) makes gain taxable up to the amount of boot, never more than the realized gain. Losses are never recognized. The new property's basis is the old basis, plus boot paid and gain recognized, minus boot received.",
    ],
    keyPoint: "Identify within 45 days, receive within 180 (or return due date if earlier). Boot received → gain recognized up to boot (no losses). New basis = old basis + boot paid + gain recognized − boot received.",
  },
  {
    title: "Installment sales: the gross profit percentage",
    alt: "A pie of the sale price: basis slice and gross profit slice. Each payment of $10,000 is split by the same 60 percent.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <circle cx={80} cy={90} r={58} fill="#d4ebfa" stroke={INK} strokeWidth={2.5} />
        <path d="M80,90 L80,32 A58,58 0 1,1 24.8,107.9 Z" fill="#f6b73c" stroke={INK} strokeWidth={2.5} />
        <Label x={98} y={110} size={12}>60% gain</Label>
        <Label x={46} y={74} size={10}>basis</Label>
        <Card x={160} y={24} w={150} h={46} lines={["Payment $10,000", "→ $6,000 gain"]} size={12} color="#fff" />
        <Card x={160} y={84} w={150} h={70} lines={["Interest: separate", "Recapture: year 1", "Form 6252"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "An installment sale is a sale where at least one payment comes after the year of sale. Gain is reported as payments are received: each principal payment times the gross profit percentage (gross profit divided by the contract price). Interest is reported separately.",
      "Depreciation recapture is taxed in full in the year of sale, even if no payment arrives that year. The method isn't available for inventory, dealer sales or publicly traded stock, and sellers can elect out. It's reported on Form 6252.",
    ],
    keyPoint: "Installment gain per payment = principal received × (gross profit ÷ contract price). Interest is separate. Recapture is taxed in the year of sale. Not for inventory, dealers, or traded stock. Form 6252.",
  },
  {
    title: "Bad debts: nonbusiness means short-term capital loss",
    alt: "An IOU from Gus torn in half: nonbusiness, totally worthless, short-term capital loss. A business IOU beside it: ordinary loss, partly worthless OK.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={18} w={140} h={142} color="#fde2e4">
          <Label x={84} y={42} size={12}>Nonbusiness</Label>
          <Label x={84} y={70} size={10} weight={700}>totally worthless only</Label>
          <Label x={84} y={92} size={10} weight={700}>short-term capital loss</Label>
          <Label x={84} y={114} size={10} weight={700}>Form 8949 + statement</Label>
          <Label x={84} y={140} size={10} weight={700}>(any holding period)</Label>
        </Card>
        <Card x={166} y={18} w={140} h={142} color="#d8f0e2">
          <Label x={236} y={42} size={12}>Business</Label>
          <Label x={236} y={70} size={10} weight={700}>totally or partly</Label>
          <Label x={236} y={92} size={10} weight={700}>ordinary deduction</Label>
          <Label x={236} y={114} size={10} weight={700}>needs basis in it</Label>
        </Card>
      </svg>
    ),
    body: [
      "A nonbusiness bad debt (like a personal loan to a friend) is deductible only when it's totally worthless, and only as a short-term capital loss on Form 8949, with a statement describing the debt. It must be a genuine loan with an expectation of repayment, not a gift.",
      "Business bad debts are ordinary deductions and can be taken for partial worthlessness. Either way there must be basis in the debt: a cash-method taxpayer can't deduct unpaid wages, fees or rent never included in income.",
    ],
    keyPoint: "Nonbusiness bad debt: bona fide loan, totally worthless, short-term capital loss (Form 8949 + statement). Business bad debt: ordinary, partial OK. Need basis (no deduction for unpaid services).",
  },
  {
    title: "Options: buyer and writer",
    alt: "Two sides of an expired call option. Buyer Penny: capital loss of the premium. Writer Lulu: short-term capital gain of the premium.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fff7dc" floorY={160} />
        <Penny x={60} y={70} scale={0.36} mood="worried" />
        <Lulu x={260} y={84} scale={0.3} mood="smug" />
        <Paper x={160} y={60} label="CALL" sub="lapsed" scale={1.2} color="#fde2e4" />
        <Card x={10} y={104} w={140} h={50} lines={["Buyer: capital", "loss (premium)"]} size={11} color="#fde2e4" />
        <Card x={170} y={104} w={140} h={50} lines={["Writer: short-term", "capital gain"]} size={11} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "The buyer of an option that lapses has a capital loss equal to the premium, long- or short-term based on how long the option was held. If the buyer exercises a call, the premium is added to the basis of the stock.",
      "The writer doesn't report the premium when received. If the option lapses, the premium is a short-term capital gain. If a call is exercised, the premium is added to the writer's amount realized on the stock sold.",
    ],
    keyPoint: "Lapsed option: buyer has capital loss (holding period of the option); writer has short-term capital gain. Exercised call: buyer adds premium to basis; writer adds it to amount realized.",
  },
  {
    title: "Wash sales and the $3,000 limit",
    alt: "A 61-day window, 30 days before and after a loss sale. A loss caught inside the window moves into the new shares' basis.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <rect x={30} y={30} width={260} height={50} rx={8} fill="#fde2e4" stroke={INK} strokeWidth={2} />
        <path d="M160,26 V86" stroke={INK} strokeWidth={3} />
        <Label x={95} y={60} size={11}>30 days before</Label>
        <Label x={225} y={60} size={11}>30 days after</Label>
        <Label x={160} y={100} size={10} weight={700}>loss sale</Label>
        <Card x={20} y={116} w={136} h={48} lines={["Loss → added to", "new shares' basis"]} size={10} color="#fff" />
        <Card x={164} y={116} w={136} h={48} lines={["Net capital loss:", "$3,000 / $1,500 MFS"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "A loss on the sale of stock or securities is disallowed if substantially identical stock is bought within 30 days before or after the sale. The disallowed loss is added to the basis of the new shares, and the holding period carries over.",
      "Net capital losses offset ordinary income only up to $3,000 a year ($1,500 married filing separately). The rest carries forward indefinitely, keeping its short- or long-term character.",
    ],
    keyPoint: "Wash sale: substantially identical stock bought within 30 days before/after a loss sale → loss disallowed, added to new basis. Net capital loss limit $3,000 ($1,500 MFS); carry forward indefinitely.",
  },
  {
    title: "Investor or trader?",
    alt: "Two report cards. Investor: capital gains, no expense deduction, wash sales apply. Trader: Schedule C expenses, gains still capital, ordinary with a 475(f) election.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={20} w={140} h={140} color="#d4ebfa">
          <Label x={84} y={46} size={14}>Investor</Label>
          <Label x={84} y={76} size={10} weight={700}>capital gains/losses</Label>
          <Label x={84} y={98} size={10} weight={700}>expenses: no deduction</Label>
          <Label x={84} y={120} size={10} weight={700}>wash sales apply</Label>
        </Card>
        <Card x={166} y={20} w={140} h={140} color="#fff3c4">
          <Label x={236} y={46} size={14}>Trader</Label>
          <Label x={236} y={76} size={10} weight={700}>expenses: Schedule C</Label>
          <Label x={236} y={98} size={10} weight={700}>gains still capital</Label>
          <Label x={236} y={120} size={10} weight={700}>475(f) election: ordinary</Label>
          <Laptop x={236} y={156} scale={0.36} />
        </Card>
      </svg>
    ),
    body: [
      "Investors buy and hold for dividends, interest and long-term appreciation. Gains and losses are capital, and investment expenses aren't deductible (investment interest can be, as an itemized deduction).",
      "Traders seek profit from daily market swings, and their activity must be substantial, regular and continuous. Their expenses go on Schedule C, but gains and losses stay capital unless they make a timely section 475(f) mark-to-market election, which makes them ordinary and frees them from the wash sale rule and the $3,000 limit.",
    ],
    keyPoint: "Investor: capital gains/losses, no expense deduction. Trader: substantial, regular, continuous trading; expenses on Schedule C; gains still capital unless a 475(f) mark-to-market election (ordinary, no wash sale or $3,000 limit).",
  },
];

const lesson: Lesson = {
  id: "p1-special-sales",
  part: "part1",
  domainId: "p1d2",
  number: "2.6",
  episode: "Milo's Swap Meet",
  title: "Special sales",
  minutes: 14,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "Like-kind exchanges, installment sales, bad debts, options, wash sales and the investor versus trader question.",
  previously: "Dee learned the 330-day rule the hard way. Back in Ledger Falls, the summer swap meet is open and Milo has ideas.",
  comic,
  cards,
  hook: {
    line: "Swap land for land, not vans for vans.",
    more: "Forty-five days to name it, 180 to close it, and boot is always taxed. Everything else here has its own clock too.",
    alt: "A swap sign with a house on each side and a crossed-out van below.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7f4fb" />
        <House x={60} y={84} scale={0.6} color="#d4ebfa" />
        <Label x={130} y={64} size={24}>⇄</Label>
        <House x={200} y={84} scale={0.6} color="#fff3c4" />
        <Mark x={290} y={60} text="45/180" color="#a8321f" size={16} />
      </svg>
    ),
  },
  traps: [
    { title: "Personal property swaps", text: "Since 2018, only real property qualifies for like-kind treatment. Vehicles and equipment are taxable sales." },
    { title: "A partly worthless loan to a friend", text: "Nonbusiness bad debts are deductible only when totally worthless, and only as short-term capital losses." },
    { title: "Spreading recapture", text: "Depreciation recapture in an installment sale is income in the year of sale, not as payments arrive." },
    { title: "Trader means ordinary", text: "Trader gains and losses stay capital unless the 475(f) election is made on time." },
  ],
  sources: [
    { key: "p544", section: "Like-Kind Exchanges; Options" },
    { key: "p537", section: "Installment Sales: General Rules; Gross profit percentage; Depreciation recapture" },
    { key: "p550", section: "Nonbusiness Bad Debts; Wash Sales; Special Rules for Traders in Securities; Capital Losses" },
  ],
  cases: [
    {
      who: "Milo",
      title: "The van swap",
      facts: "Milo traded his business van (adjusted basis $8,000, value $15,000) for Gus's van worth $15,000. No cash changed hands.",
      question: "What's the result for Milo?",
      choices: ["No gain, a like-kind exchange", "A $7,000 taxable gain", "A $7,000 gain deferred to the new van", "No gain because no cash was received"],
      answer: "A $7,000 taxable gain",
      why: "Like-kind treatment applies only to real property after 2017. Trading a vehicle is a taxable exchange: $15,000 received minus $8,000 basis.",
    },
    {
      who: "Penny",
      title: "Condo for duplex, with cash",
      facts: "Penny and Milo traded their rental condo (adjusted basis $150,000, value $300,000) for a rental duplex worth $280,000 plus $20,000 cash.",
      question: "How much gain is recognized?",
      choices: ["$0", "$20,000", "$150,000", "$130,000"],
      answer: "$20,000",
      why: "Realized gain is $150,000 ($300,000 minus $150,000). Gain is recognized only up to the boot received, $20,000.",
    },
    {
      who: "Rosa",
      title: "Rosa's installment lot",
      facts: "Rosa sold investment land with a $20,000 basis for $50,000: $10,000 a year for five years plus interest, first payment in 2025. No debt was assumed.",
      question: "How much gain does she report for 2025?",
      choices: ["$30,000", "$10,000", "$6,000", "$4,000"],
      answer: "$6,000",
      why: "Gross profit is $30,000 on a $50,000 contract price, so 60%. The 2025 principal payment of $10,000 times 60% is $6,000 of gain. Interest is reported separately.",
    },
    {
      who: "Milo",
      title: "Gus's loan",
      facts: "Milo lent his friend Gus $2,000 in 2023 with a written note. In 2025, Gus vanished with no assets, and the debt became totally worthless.",
      question: "How does Milo treat the $2,000 on his 2025 return?",
      choices: ["An itemized deduction", "A long-term capital loss", "A short-term capital loss", "Nothing; personal loans are never deductible"],
      answer: "A short-term capital loss",
      why: "A nonbusiness bad debt is a short-term capital loss in the year it becomes totally worthless, regardless of how long the loan was outstanding.",
    },
    {
      who: "Lulu",
      title: "Lulu writes a call",
      facts: "In Lulu's custodial account, she wrote (sold) a call option for a $200 premium in 2025. It expired unexercised in 2025.",
      question: "How is the $200 treated?",
      choices: ["Short-term capital gain", "Ordinary income", "Long-term capital gain", "Not taxable until she sells the stock"],
      answer: "Short-term capital gain",
      why: "For the writer, a premium on an option that lapses is a short-term capital gain, regardless of how long the option was open.",
    },
    {
      who: "Penny",
      title: "Penny's wash sale",
      facts: "Penny sold 100 shares at a $1,000 loss on December 10, 2025, and bought 100 shares of the same stock on December 28, 2025, for $5,000.",
      question: "What happens to the loss?",
      choices: ["Deducted in 2025", "Disallowed and added to the basis of the new shares, making it $6,000", "Lost forever", "Deducted in 2026"],
      answer: "Disallowed and added to the basis of the new shares, making it $6,000",
      why: "Buying substantially identical stock within 30 days after a loss sale makes it a wash sale. The disallowed loss increases the new shares' basis.",
    },
  ],
  quizTopics: ["Capital losses"],
  quizBrief: "Special sales: like-kind exchanges of real property, 45/180-day rules and boot, installment sales and gross profit percentage, nonbusiness bad debts, options, wash sales, investor versus trader",
};

export default lesson;

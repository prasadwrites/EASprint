import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import { Crate, Van } from "../bakery";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 2.5: assets and dispositions: adjusted basis, gain on sales of business property, section
// 1231 and recapture, like-kind exchanges (real property only), installment sales, and related-party rules
// (sections 267 and 1239). Written to Publication 544, Publication 537 and the Form 8824 and 4797 instructions.

const comic: Lesson["comic"] = [
  {
    alt: "Milo stands beside the Rosa's Rolls van holding a food truck brochure. Rosa looks doubtful.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f1fb" />
        <Milo x={54} y={128} scale={0.7} mood="excited" pose="up" />
        <Van x={168} y={204} scale={0.8} />
        <Rosa x={276} y={128} scale={0.68} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Trade the van for a FOOD TRUCK! Both have wheels. That's like-kind!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Rosa", text: "Is it? Gerald gets carsick.", x: 66, y: 6, w: 31, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of a crate labeled PARTS. Milo is shocked.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Hoot x={84} y={92} scale={0.52} mood="stern" pose="up" />
        <Crate x={84} y={206} scale={1.05} label="PARTS" />
        <Milo x={252} y={128} scale={0.76} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Since 2018, like-kind exchanges are for REAL PROPERTY only. Trading a van is a sale.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Milo", text: "Why are you in the truck parts?", x: 62, y: 6, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Ace shows the van's math on a card. Penny is puzzled.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={84} w={112} h={76} lines={["Cost $40,000", "− depr. $30,000", "Basis $10,000", "Trade-in $18,000"]} size={9.5} color="#fff" />
        <Penny x={262} y={128} scale={0.76} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Depreciation cut the van's basis to $10,000. An $18,000 trade-in is an $8,000 gain, all ordinary.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Penny", text: "So the van made money by getting old?", x: 62, y: 4, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Penny points at calendars reading 45 and 180 days. Lulu looks guilty.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Calendar x={142} y={96} month="IDENTIFY" day="45" scale={0.62} color="#1d7a49" />
        <Calendar x={196} y={96} month="CLOSE" day="180" scale={0.62} color="#e8505b" />
        <Lulu x={274} y={160} scale={0.56} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "A building swap works: 45 days to name the new one, 180 days to close.", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Lulu", text: "I had 45 days to name my science project. It's day 46.", x: 58, y: 4, w: 39, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds out a deed. A big 90% hangs in the air. Hoot shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Rosa x={66} y={128} scale={0.76} mood="happy" pose="hold" />
        <Paper x={116} y={104} label="DEED" scale={0.8} rotate={-8} />
        <Mark x={172} y={132} text="90%" color="#a8321f" size={30} />
        <Hoot x={256} y={128} scale={0.62} mood="stern" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I'll sell my empty lot to the bakery at a loss!", x: 3, y: 2, w: 38, tail: "down-left" },
      { who: "Hoot", text: "You own 90% of the bakery. A loss sale to it is disallowed.", x: 52, y: 2, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "The van now has FOOD TRUCK painted on it. Milo beams. Biscuit sits on the roof eating a roll.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f1fb" />
        <Milo x={54} y={128} scale={0.7} mood="smug" pose="up" />
        <Van x={180} y={204} scale={0.8} text="FOOD TRUCK" />
        <Biscuit x={214} y={144} scale={0.46} mood="excited" />
        <Penny x={284} y={128} scale={0.64} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "New plan: I painted the van. No sale, no gain!", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Penny", text: "Biscuit is already eating the inventory.", x: 62, y: 4, w: 35, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Basis and gain",
    alt: "Adjusted basis is cost plus improvements minus depreciation. Gain or loss is the amount realized minus adjusted basis.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f1fb" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="Cost" sub="+ improvements" />
        <Step x={112} y={14} w={96} h={100} color="#fde2e4" label="− Depr." sub="taken" />
        <Step x={214} y={14} w={96} h={100} color="#d8f0e2" label="= Basis" sub="adjusted" />
        <Label x={160} y={146} size={10} weight={700}>Gain = amount realized − adjusted basis</Label>
      </svg>
    ),
    body: [
      "Basis usually starts as cost, including sales tax, freight and installation. It goes up for capital improvements and down for depreciation, section 179, bonus depreciation and casualty losses. Basis is reduced by depreciation that was allowed or allowable, even if the business forgot to claim it.",
      "Gain or loss is the amount realized (cash plus the fair market value of property received plus liabilities the buyer takes over, less selling expenses) minus adjusted basis. A trade-in of personal property is a sale: the trade-in value is the amount realized.",
    ],
    keyPoint: "Adjusted basis = cost (incl. sales tax, freight, installation) + improvements − depreciation allowed or allowable (incl. §179, bonus) − casualty losses. Gain = amount realized (cash + FMV of property + liabilities assumed − selling costs) − adjusted basis.",
  },
  {
    title: "Section 1231 and recapture",
    alt: "Business property held more than a year is section 1231 property. Depreciation recapture is ordinary first. Net 1231 gains are capital; net 1231 losses are ordinary.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={14} w={140} h={100} color="#fde2e4" label="Recapture" sub="ordinary first" />
        <Step x={166} y={14} w={140} h={100} color="#d8f0e2" label="§1231" sub="net gain: capital" />
        <Label x={160} y={140} size={10} weight={700}>Net §1231 loss: fully ordinary</Label>
        <Label x={160} y={158} size={10} weight={700}>5-year look-back on past net losses</Label>
      </svg>
    ),
    body: [
      "Section 1231 property is depreciable property and land used in a trade or business and held more than one year. After depreciation recapture is taken out as ordinary income (section 1245 for equipment and vehicles), the remaining gains and losses are netted.",
      "A net section 1231 gain is treated as long-term capital gain, but it's recharacterized as ordinary income to the extent of net section 1231 losses deducted in the previous 5 years. A net section 1231 loss is fully ordinary. Property held one year or less produces ordinary gain or loss. All of this is reported on Form 4797.",
    ],
    keyPoint: "§1231 = business depreciable property and land held > 1 year. Recapture (§1245) is ordinary first. Net §1231 gain = LTCG, except ordinary to the extent of unrecaptured net §1231 losses from the prior 5 years. Net §1231 loss = ordinary. Held ≤ 1 year = ordinary. Form 4797.",
  },
  {
    title: "Like-kind exchanges",
    alt: "Only real property held for business or investment qualifies. The replacement must be identified within 45 days and received within 180 days. Boot is taxable.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={10} y={14} w={96} h={100} color="#d8f0e2" label="Real" sub="property only" />
        <Step x={112} y={14} w={96} h={100} color="#fff3c4" label="45" sub="days: identify" />
        <Step x={214} y={14} w={96} h={100} color="#fde2e4" label="180" sub="days: receive" />
        <Label x={160} y={140} size={10} weight={700}>Gain taxed up to boot received</Label>
        <Label x={160} y={158} size={10} weight={700}>Form 8824 · U.S. and foreign aren't like-kind</Label>
      </svg>
    ),
    body: [
      "Since 2018, section 1031 applies only to real property held for productive use in a business or for investment, exchanged for real property of a like kind. Vehicles, equipment and other personal property don't qualify. U.S. and foreign real property aren't like-kind, and property held mainly for sale (a dealer's inventory) is excluded.",
      "In a deferred exchange, the replacement property must be identified within 45 days after transferring the old property and received within 180 days (or the due date of the return, with extensions, if earlier). Realized gain is recognized up to the boot received (cash or other property, including net debt relief). The new property's basis is generally the old basis, plus gain recognized, minus boot received. Report it on Form 8824.",
    ],
    keyPoint: "§1031: real property only (business or investment), not inventory; U.S. ≠ foreign. Deferred exchange: identify in 45 days, receive in 180 days (or return due date if earlier). Gain recognized = lesser of realized gain or boot (cash, other property, net liability relief). Basis carries over. Form 8824.",
  },
  {
    title: "Related parties",
    alt: "Losses on sales to family members or to an entity you own more than 50% of are disallowed. Gain on depreciable property sold to a controlled entity is ordinary income.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Card x={12} y={14} w={146} h={70} lines={["§267: no loss", "family or > 50%", "controlled entity"]} size={10} color="#fff" />
        <Card x={164} y={14} w={146} h={70} lines={["§1239: gain on", "depreciable property", "is ordinary"]} size={10} color="#fff3c4" />
        <Label x={160} y={112} size={10} weight={700}>Family: spouse, siblings, parents, grandparents, kids</Label>
        <Label x={160} y={130} size={10} weight={700}>Not family: aunts, uncles, cousins, in-laws</Label>
        <Label x={160} y={150} size={10} weight={700}>Related-party 1031: both keep it 2 years</Label>
      </svg>
    ),
    body: [
      "Under section 267, a loss on a sale or exchange between related persons isn't deductible. Related persons include family members (spouse, brothers and sisters, ancestors and lineal descendants, but not aunts, uncles, cousins or in-laws), and an individual and a corporation or partnership in which the individual owns, directly or indirectly, more than 50%. The buyer can use the disallowed loss to reduce a later gain when they sell.",
      "Under section 1239, gain on a sale of depreciable property between related persons (including a more-than-50% controlled entity) is ordinary income. In a like-kind exchange between related persons, the deferred gain becomes taxable if either party disposes of the property within 2 years.",
    ],
    keyPoint: "§267: loss between related persons disallowed (spouse, siblings, ancestors, descendants; NOT aunts, uncles, cousins, in-laws; entity > 50% owned directly or indirectly). Buyer may offset later gain. §1239: gain on depreciable property to related person = ordinary. Related-party §1031: 2-year holding requirement.",
  },
  {
    title: "Installment sales",
    alt: "When payments come in later years, gain is reported as payments are received, but depreciation recapture is taxed in the year of sale.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="Year 1" sub="all recapture" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="Year 2" sub="gain % × payment" />
        <Step x={214} y={14} w={96} h={100} color="#d8f0e2" label="Year 3" sub="gain % × payment" />
        <Label x={160} y={146} size={10} weight={700}>Form 6252 · no inventory or dealer sales</Label>
      </svg>
    ),
    body: [
      "An installment sale is a sale where at least one payment is received after the year of sale. Gain is reported as payments come in: each payment times the gross profit percentage (gross profit divided by contract price). Interest is reported separately as ordinary income.",
      "All depreciation recapture is taxed in the year of sale, even if no payment is received that year. The installment method can't be used for inventory, dealer sales, or losses, and a taxpayer can elect out and report the whole gain at once. Use Form 6252.",
    ],
    keyPoint: "Installment sale: ≥ 1 payment after the year of sale. Gain recognized = payment × gross profit % (gross profit ÷ contract price). Depreciation recapture all taxed in the year of sale. Not for inventory, dealer sales or losses; can elect out. Form 6252.",
  },
];

const lesson: Lesson = {
  id: "p2-assets-dispositions",
  part: "part2",
  domainId: "p2d2",
  number: "2.5",
  episode: "Trading Up the Van",
  title: "Assets and dispositions",
  minutes: 14,
  lawAsOf: "tax year 2025",
  intro: "Adjusted basis, gains on business property, section 1231 and recapture, like-kind exchanges (real property only), installment sales, and the related-party traps.",
  previously: "Bertha the oven is baking around the clock. Milo, meanwhile, has fallen in love with a food truck.",
  comic,
  cards,
  hook: {
    line: "Wheels aren't like-kind. Only land and buildings are.",
    more: "1031: real property only, 45 days to identify, 180 to close, boot is taxed. Trade-in of a van = sale. Recapture is ordinary. No loss to family or a > 50% entity.",
    alt: "The van with a red X and the numbers 45 and 180.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7f1fb" />
        <Van x={74} y={108} scale={0.6} />
        <Mark x={74} y={70} text="✗" color="#e8505b" size={44} />
        <Mark x={190} y={74} text="45" color="#1d7a49" size={34} />
        <Mark x={268} y={74} text="180" color="#a8321f" size={30} />
      </svg>
    ),
  },
  traps: [
    { title: "Trade the van tax-free", text: "Vehicles and equipment aren't eligible for like-kind treatment after 2017. A trade-in is a sale." },
    { title: "Aunts are related", text: "Section 267 family is spouse, siblings, ancestors and lineal descendants. Aunts, uncles, cousins and in-laws aren't." },
    { title: "Recapture waits for the payments", text: "In an installment sale, all depreciation recapture is taxed in the year of sale." },
    { title: "Unclaimed depreciation keeps basis high", text: "Basis drops by depreciation allowed or allowable, even if it was never claimed." },
  ],
  sources: [
    { key: "p544", section: "Sales and other dispositions of assets" },
    { key: "i8824", section: "Like-kind exchanges" },
    { key: "i4797", section: "Sales of business property" },
    { key: "p537", section: "Installment sales" },
  ],
  cases: [
    {
      who: "Milo",
      title: "The van trade",
      facts: "A business bought a van for $40,000 and has taken $30,000 of depreciation. It trades the van to a dealer for a food truck and gets an $18,000 trade-in allowance.",
      question: "How is the result treated?",
      choices: ["$8,000 capital gain", "$8,000 ordinary income", "No gain; it's like-kind", "$18,000 ordinary income"],
      answer: "$8,000 ordinary income",
      why: "Personal property doesn't qualify for like-kind treatment, so the trade-in is a sale. Gain is $18,000 − $10,000 = $8,000, all section 1245 recapture (ordinary) because it's less than the depreciation taken.",
    },
    {
      who: "Penny",
      title: "The clock starts",
      facts: "An investor transfers a rental building to a buyer on March 1 and wants a deferred like-kind exchange.",
      question: "By when must the replacement property be identified?",
      choices: ["April 15", "March 31", "August 28", "December 31"],
      answer: "April 15",
      why: "Replacement property must be identified within 45 days of the transfer: March 1 + 45 days is April 15. It must be received within 180 days.",
    },
    {
      who: "Ace",
      title: "A little cash on the side",
      facts: "A business exchanges a building (adjusted basis $300,000, value $500,000) for another building worth $450,000 plus $50,000 cash.",
      question: "How much gain is recognized?",
      choices: ["$0", "$200,000", "$50,000", "$250,000"],
      answer: "$50,000",
      why: "Realized gain is $200,000, but only the boot ($50,000 cash) is recognized. The rest is deferred.",
    },
    {
      who: "Rosa",
      title: "Selling to her own bakery",
      facts: "Rosa owns 90% of a partnership. She sells an empty lot she held as an investment to the partnership for $5,000 less than her basis.",
      question: "How much loss can Rosa deduct?",
      choices: ["$5,000 capital loss", "$3,000 capital loss", "$5,000 ordinary loss", "$0"],
      answer: "$0",
      why: "A loss on a sale between a partner and a partnership she owns more than 50% of is disallowed under the related-party rules. If the partnership later sells the lot at a gain, it can use the disallowed loss to reduce that gain.",
    },
  ],
  quizTopics: ["Like-kind exchanges", "Depreciation recapture"],
  quizBrief: "Asset dispositions: adjusted basis, section 1231 and 1245 recapture, like-kind exchanges (real property only, 45/180 days, boot), installment sales, related-party losses (section 267)",
};

export default lesson;

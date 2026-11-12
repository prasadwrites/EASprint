import { Ace, Arrow, Backdrop, Banana, Cash, ComicBook, GiftBox, Hoot, Hourglass, House, Label, Penny, PriceTag, StockCert, Window } from "../cast";
import type { Lesson } from "../lesson";

// Part 1, topic 2.5: basis, property sales and capital gains. Written to tax law through December 31, 2025
// from Publications 551, 544, 550 and 523 and Topic 409.

const INK = "#17202c";
const PANEL = { viewBox: "0 0 320 220", preserveAspectRatio: "xMidYMax meet" } as const;
const CARD = { viewBox: "0 0 320 180" } as const;

function Shoebox() {
  return (
    <g>
      <StockCert x={-10} y={-14} scale={0.6} rotate={-12} />
      <ComicBook x={12} y={-16} scale={0.6} rotate={10} />
      <rect x={-26} y={-8} width={52} height={22} fill="#c58b4e" stroke={INK} strokeWidth={2} />
      <rect x={-28} y={-10} width={56} height={6} fill="#d9a066" stroke={INK} strokeWidth={2} />
    </g>
  );
}

function Chalkboard({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={130} height={78} rx={4} fill="#2e4a3f" stroke="#8a5a3c" strokeWidth={6} />
      <text x={65} y={30} fontSize={14} fontWeight={700} textAnchor="middle" fill="#f4f1e8" fontFamily="Bricolage Grotesque, system-ui, sans-serif">
        GAIN =
      </text>
      <text x={65} y={52} fontSize={13} fontWeight={700} textAnchor="middle" fill="#f4f1e8" fontFamily="Bricolage Grotesque, system-ui, sans-serif">
        Price − Basis
      </text>
      <path d="M30,62 h70" stroke="#f2c230" strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny bursts in holding a shoebox with a stock certificate and a comic book. Ace looks up.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={92} y={128} scale={0.78} mood="excited" pose="hold" holding={<Shoebox />} />
        <Ace x={238} y={128} scale={0.78} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I sold everything! Grandpa's stock, Aunt Rosa's gift and my comic books. What do I owe?", x: 3, y: 3, w: 56, tail: "down-left" },
      { who: "Ace", text: "Great. What did each one cost you?", x: 60, y: 22, w: 38, tail: "down-right" },
    ],
  },
  {
    alt: "Penny shrugs happily. Hoot the owl peeks through the window behind her.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Window x={206} y={88} w={92} h={80} />
        <g clipPath="url(#win)">
          <defs>
            <clipPath id="win">
              <rect x={206} y={88} width={92} height={80} />
            </clipPath>
          </defs>
          <Hoot x={252} y={140} scale={0.62} mood="smug" />
        </g>
        <rect x={206} y={88} width={92} height={80} fill="none" stroke={INK} strokeWidth={3} />
        <Penny x={96} y={128} scale={0.78} mood="excited" pose="shrug" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Cost me? Nothing! Two of them were free!", x: 3, y: 4, w: 50, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo. Nothing is free.", x: 56, y: 6, w: 40, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at a chalkboard that says Gain equals Price minus Basis.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Chalkboard x={172} y={90} />
        <Ace x={86} y={128} scale={0.78} mood="happy" pose="point" />
      </svg>
    ),
    bubbles: [{ who: "Ace", text: "Everything you own wears an invisible price tag called basis. Your gain is what you sold it for, minus that tag.", x: 3, y: 3, w: 70, tail: "down-left" }],
  },
  {
    alt: "Penny is covered in price tags and looks shocked. Ace looks pleased.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={98} y={128} scale={0.78} mood="shocked" pose="up" />
        <PriceTag x={40} y={182} label="$4,000" rotate={-18} width={54} />
        <PriceTag x={104} y={186} label="$50,000" rotate={8} width={60} color="#d8f0e2" />
        <PriceTag x={140} y={128} label="$1" rotate={50} width={34} color="#fde2d6" />
        <Ace x={238} y={128} scale={0.78} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "So all my stuff has secret price tags?!", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Ace", text: "Yes. And how you got it decides what's written on the tag.", x: 54, y: 10, w: 44, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Basis is the price tag",
    alt: "A stock certificate with a price tag reading $1,000 plus a $10 fee equals $1,010.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <StockCert x={90} y={92} scale={2} rotate={-6} />
        <path d="M140,72 Q160,64 172,70" stroke={INK} strokeWidth={2} fill="none" />
        <PriceTag x={172} y={70} label="$1,000" width={86} />
        <PriceTag x={172} y={110} label="+ $10 fee" width={96} color="#fde2d6" />
        <Label x={226} y={156} size={18}>
          = $1,010
        </Label>
      </svg>
    ),
    body: [
      "Basis is usually what you paid: the cash, any debt you took on, and the costs of buying it, such as commissions, sales tax, freight and installation.",
      "Penny buys 100 shares for $1,000 and pays a $10 commission. Her basis is $1,010.",
    ],
    keyPoint: "Basis = what I paid + costs of buying (commission, sales tax, freight, installation).",
  },
  {
    title: "Adjusted basis: the tag moves",
    alt: "A price tag in an elevator. Improvements push it up; depreciation and casualty losses pull it down.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <rect x={120} y={18} width={80} height={146} rx={6} fill="#dfe6ee" stroke={INK} strokeWidth={2.5} />
        <path d="M160,18 V164" stroke={INK} strokeWidth={1.5} strokeDasharray="4 4" />
        <PriceTag x={128} y={92} label="Basis" width={60} />
        <Arrow d="M88,120 V48" color="#1d7a49" width={5} />
        <Label x={66} y={40} size={12} color="#1d7a49">
          + Improvements
        </Label>
        <Label x={66} y={140} size={11} color="#1d7a49" weight={700}>
          new roof, addition
        </Label>
        <Arrow d="M232,52 V126" color="#a8321f" width={5} />
        <Label x={262} y={40} size={12} color="#a8321f">
          − Depreciation
        </Label>
        <Label x={262} y={146} size={11} color="#a8321f" weight={700}>
          casualty losses,
        </Label>
        <Label x={262} y={160} size={11} color="#a8321f" weight={700}>
          insurance money
        </Label>
      </svg>
    ),
    body: [
      "Basis isn't frozen. Improvements that last more than a year, like a new roof or an addition, push it up. Depreciation (allowed or allowable), deductible casualty losses and insurance reimbursements pull it down.",
      "Penny's house cost $300,000 and she adds a $40,000 kitchen. Her adjusted basis is $340,000. Repainting a bedroom is upkeep, so it doesn't count.",
    ],
    keyPoint: "Adjusted basis: + improvements; − depreciation (allowed or allowable), casualty losses, insurance reimbursements.",
  },
  {
    title: "Gain or loss: what you got minus the tag",
    alt: "A seesaw with Amount realized on one side and Adjusted basis on the other.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M160,140 L146,166 L174,166 Z" fill="#8a5a3c" stroke={INK} strokeWidth={2} />
        <path d="M40,118 L280,152" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <Cash x={70} y={98} scale={1.3} rotate={8} />
        <Cash x={78} y={78} scale={1.3} rotate={8} />
        <PriceTag x={226} y={132} label="Basis" width={56} rotate={8} />
        <Label x={74} y={44} size={13}>
          Amount realized
        </Label>
        <Label x={250} y={100} size={13}>
          Adjusted basis
        </Label>
        <Label x={160} y={28} size={15} color="#1d7a49">
          Heavier side wins: gain!
        </Label>
      </svg>
    ),
    body: [
      "Amount realized is the cash you get, plus the value of any property you get, plus any of your debt the buyer takes over, minus selling costs like commissions.",
      "Penny sells her shares for $1,500 and pays a $15 commission. $1,485 realized − $1,010 basis = $475 gain.",
    ],
    keyPoint: "Gain or loss = amount realized (cash + property + debt relief − selling costs) − adjusted basis.",
  },
  {
    title: "Short or long: the one-year finish line",
    alt: "A race track with a finish line at one year. Crossing it makes a gain long-term.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <rect x={0} y={96} width={320} height={50} fill="#e0b48a" />
        <path d="M0,121 H320" stroke="#fff" strokeWidth={2} strokeDasharray="10 8" />
        <g>
          {[0, 1, 2, 3, 4].map((r) =>
            [0, 1].map((c) => <rect key={`${r}${c}`} x={206 + c * 8} y={96 + r * 10} width={8} height={10} fill={(r + c) % 2 ? "#fff" : INK} />),
          )}
        </g>
        <Label x={214} y={86} size={13}>
          1 year
        </Label>
        <Label x={100} y={166} size={12} color="#a8321f">
          Short-term: taxed like wages
        </Label>
        <Label x={272} y={166} size={12} color="#1d7a49">
          Long-term
        </Label>
        <StockCert x={150} y={112} scale={0.9} />
        <Arrow d="M110,112 H128" width={3} />
        <Hourglass x={42} y={56} scale={0.9} sand={0.7} />
      </svg>
    ),
    body: [
      "Held more than one year? Long-term. One year or less? Short-term, taxed at the same rates as wages.",
      "Start counting the day after you buy, and count the day you sell. Bought March 3, 2024? The sale is long-term on March 4, 2025 or later.",
    ],
    keyPoint: "Long-term = held MORE than 1 year. Count from the day after purchase; the sale day counts.",
  },
  {
    title: "Inherited: the tag resets",
    alt: "Grandpa's old $20,000 tag is crossed out and replaced by a new $50,000 tag, the value at his death.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3eefb" />
        <PriceTag x={34} y={60} label="$20,000" width={84} color="#e8e2d6" />
        <path d="M44,46 L118,74" stroke="#a8321f" strokeWidth={4} strokeLinecap="round" />
        <Label x={78} y={96} size={11} weight={700}>
          what Grandpa paid
        </Label>
        <Arrow d="M130,60 H178" width={4} />
        <PriceTag x={186} y={60} label="$50,000" width={92} color="#d8f0e2" />
        <Label x={236} y={96} size={11} weight={700}>
          value on date of death
        </Label>
        <path d="M290,40 l6,-10 l2,12 l10,2 l-10,4 l-2,12 l-4,-10 l-10,-2 Z" fill="#f2c230" stroke={INK} strokeWidth={1.5} />
        <Label x={160} y={140} size={13}>
          Grandpa's $30,000 of growth? Never taxed.
        </Label>
      </svg>
    ),
    body: [
      "Inherited property gets a new basis: its fair market value on the date of death. If the executor elects the alternate valuation date on the estate tax return, it's the value on that date instead, generally six months later.",
      "It's always long-term, however briefly you held it. Grandpa paid $20,000; the stock was worth $50,000 when he died; Penny sells for $53,000 two months later. She has a $3,000 long-term gain.",
    ],
    keyPoint: "Inherited: basis = FMV at date of death (or alternate valuation date). Always long-term.",
  },
  {
    title: "Gifted: the tag travels",
    alt: "A gift box with Aunt Rosa's $4,000 price tag still tied to it.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <GiftBox x={92} y={100} scale={2} />
        <path d="M120,58 Q150,40 168,52" stroke={INK} strokeWidth={2} fill="none" />
        <PriceTag x={168} y={52} label="$4,000" width={78} />
        <Label x={168} y={86} size={11} weight={700} anchor="start">
          Aunt Rosa's basis rides along
        </Label>
        <Label x={168} y={124} size={13} anchor="start">
          Worth $9,000 at the gift.
        </Label>
        <Label x={168} y={144} size={13} anchor="start">
          Sold for $12,000.
        </Label>
        <Label x={168} y={166} size={14} color="#1d7a49" anchor="start">
          Gain: $8,000
        </Label>
      </svg>
    ),
    body: [
      "A gift keeps the donor's adjusted basis. This is called carryover basis. It goes up by any gift tax paid on the gift's growth in value, and the donor's holding period carries over too.",
      "Aunt Rosa paid $4,000. The stock was worth $9,000 when she gave it. Penny sells it for $12,000, so her gain is $12,000 − $4,000 = $8,000, not $3,000.",
    ],
    keyPoint: "Gift: basis = donor's adjusted basis (carryover) + gift tax on appreciation. Donor's holding period tacks on.",
  },
  {
    title: "The gift twist: the no-gain, no-loss zone",
    alt: "A number line from $5,000 to $12,000. Below $6,000 is a loss zone, above $10,000 a gain zone, and between them a zone with no gain or loss.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <rect x={20} y={70} width={80} height={30} fill="#fbe5e1" stroke={INK} strokeWidth={2} />
        <rect x={100} y={70} width={120} height={30} fill="#e8edf5" stroke={INK} strokeWidth={2} />
        <rect x={220} y={70} width={80} height={30} fill="#e3f4ea" stroke={INK} strokeWidth={2} />
        <Label x={60} y={90} size={12} color="#a8321f">
          Loss
        </Label>
        <Label x={160} y={90} size={12}>
          No gain, no loss
        </Label>
        <Label x={260} y={90} size={12} color="#1d7a49">
          Gain
        </Label>
        <path d="M100,64 V106 M220,64 V106" stroke={INK} strokeWidth={3} />
        <Label x={100} y={56} size={12}>
          $6,000
        </Label>
        <Label x={100} y={122} size={10} weight={700}>
          value at gift
        </Label>
        <Label x={220} y={56} size={12}>
          $10,000
        </Label>
        <Label x={220} y={122} size={10} weight={700}>
          donor's basis
        </Label>
        <Banana x={160} y={150} scale={0.9} />
        <Label x={160} y={30} size={12}>
          Only when the gift is worth less than the donor's basis
        </Label>
      </svg>
    ),
    body: [
      "When the gift is worth less than the donor's basis at the time of the gift, Penny gets two bases. For a gain, she uses the donor's basis. For a loss, she uses the value at the time of the gift. If she sells somewhere in between, there is no gain and no loss.",
      "Donor's basis $10,000, value at the gift $6,000. Penny sells for $12,000: $2,000 gain. Sells for $5,000: $1,000 loss. Sells for $8,000: nothing to report as gain or loss.",
    ],
    keyPoint: "Gift worth less than donor's basis: gain uses donor's basis, loss uses FMV at gift, sale in between = no gain or loss.",
  },
  {
    title: "Netting and the $3,000 loss limit",
    alt: "Two buckets, short-term and long-term, pour into one net result. A net loss lets $3,000 through and saves the rest for next year.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M30,30 L46,86 L94,86 L110,30 Z" fill="#fde2d6" stroke={INK} strokeWidth={2.5} />
        <path d="M210,30 L226,86 L274,86 L290,30 Z" fill="#d8f0e2" stroke={INK} strokeWidth={2.5} />
        <Label x={70} y={52} size={12}>
          Short-term
        </Label>
        <Label x={70} y={68} size={10} weight={700}>
          gains vs losses
        </Label>
        <Label x={250} y={52} size={12}>
          Long-term
        </Label>
        <Label x={250} y={68} size={10} weight={700}>
          gains vs losses
        </Label>
        <Arrow d="M84,92 L140,118" width={3} />
        <Arrow d="M236,92 L180,118" width={3} />
        <rect x={120} y={120} width={80} height={30} rx={6} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <Label x={160} y={140} size={12}>
          Net result
        </Label>
        <Label x={78} y={168} size={11} color="#a8321f">
          Net loss: $3,000 a year
        </Label>
        <Label x={246} y={168} size={11} color="#1d7a49">
          Rest carries forward
        </Label>
      </svg>
    ),
    body: [
      "Net short-term gains and losses against each other, then long-term against long-term, then the two results against each other.",
      "A net capital loss can offset up to $3,000 of other income a year ($1,500 if married filing separately). The rest carries forward with no time limit and keeps its short-term or long-term character.",
      "Losses on things you use personally, like your car or your own home, never count. A gain on them is still taxable.",
    ],
    keyPoint: "Net ST vs ST, LT vs LT, then combine. Net loss: $3,000/yr vs other income ($1,500 MFS), rest carries forward forever. Personal-use losses don't count.",
  },
  {
    title: "What rate? The 2025 long-term staircase",
    alt: "Three stairs labeled 0%, 15% and 20%, with a separate box for collectibles at 28%.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <rect x={20} y={130} width={70} height={36} fill="#e3f4ea" stroke={INK} strokeWidth={2} />
        <rect x={90} y={98} width={70} height={68} fill="#fbf0d9" stroke={INK} strokeWidth={2} />
        <rect x={160} y={66} width={70} height={100} fill="#fbe5e1" stroke={INK} strokeWidth={2} />
        <Label x={55} y={154} size={18}>
          0%
        </Label>
        <Label x={125} y={138} size={18}>
          15%
        </Label>
        <Label x={195} y={122} size={18}>
          20%
        </Label>
        <ComicBook x={276} y={78} scale={1.1} rotate={8} />
        <Label x={276} y={128} size={13} color="#a8321f">
          Collectibles
        </Label>
        <Label x={276} y={146} size={13} color="#a8321f">
          up to 28%
        </Label>
        <Penny x={55} y={84} scale={0.32} mood="thinking" />
      </svg>
    ),
    body: [
      "Short-term gains are taxed at ordinary rates. Long-term gains get 0%, 15% or 20%, depending on taxable income (the table shows where each rate stops). Collectibles, like Penny's comic books, can be taxed at up to 28%, and unrecaptured section 1250 gain on real estate at up to 25%.",
    ],
    table: {
      head: ["2025 filing status", "0% up to", "15% up to (20% above)"],
      rows: [
        ["Single", "$48,350", "$533,400"],
        ["Married filing jointly", "$96,700", "$600,050"],
        ["Head of household", "$64,750", "$566,700"],
        ["Married filing separately", "$48,350", "$300,000"],
      ],
    },
    keyPoint: "LTCG 0/15/20% (2025 single: 0% to $48,350, 20% over $533,400; MFJ: $96,700 / $600,050). Collectibles 28%, unrecaptured §1250 25%.",
  },
  {
    title: "Selling your main home: the 2-of-5 rule",
    alt: "Penny in front of her house holding a calendar showing two of five years.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <rect x={0} y={150} width={320} height={30} fill="#cde8b8" />
        <House x={210} y={118} scale={1.3} />
        <Penny x={70} y={70} scale={0.55} mood="happy" pose="hold" />
        <g transform="translate(70 110)">
          <rect x={-30} y={-14} width={60} height={30} rx={3} fill="#fff" stroke={INK} strokeWidth={2} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={-26 + i * 11} y={-6} width={9} height={16} fill={i >= 3 ? "#1d7a49" : "#e8edf5"} stroke={INK} strokeWidth={1} />
          ))}
        </g>
        <Label x={210} y={30} size={14} color="#1d7a49">
          Exclude up to $250,000
        </Label>
        <Label x={210} y={48} size={12}>
          ($500,000 married filing jointly)
        </Label>
      </svg>
    ),
    body: [
      "Up to $250,000 of gain on the sale of your main home is tax free, or $500,000 for most married couples filing jointly. You must have owned it and lived in it as your main home for at least two of the five years before the sale, and not used the exclusion on another home in the last two years.",
      "A loss on your main home isn't deductible. Gain from depreciation taken after May 6, 1997, such as for a home office, can't be excluded.",
    ],
    keyPoint: "Home sale: exclude $250,000 ($500,000 MFJ) if owned AND used 2 of last 5 years; once every 2 years. Loss not deductible.",
  },
];

const lesson: Lesson = {
  id: "p1-basis",
  part: "part1",
  domainId: "p1d2",
  number: "2.5",
  title: "Basis, property sales and capital gains",
  minutes: 12,
  lawAsOf: "tax year 2025 (law through December 31, 2025)",
  intro: "Every question about selling something comes down to two numbers: what you got and what it cost you. This lesson is about the second one.",
  comic,
  cards,
  hook: {
    line: "Gift? The tag travels. Inherit? The tag resets.",
    more: "And inherited property sold in a week is still long-term. Grandpa already did the waiting.",
    alt: "Left: a gift box dragging its old price tag on a string. Right: a price tag coming out of a reset machine shiny and new.",
    art: (
      <svg viewBox="0 0 320 120">
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <GiftBox x={60} y={70} scale={1.2} />
        <path d="M86,64 Q110,40 120,58" stroke={INK} strokeWidth={2} fill="none" />
        <PriceTag x={120} y={58} label="old" width={38} rotate={18} />
        <rect x={190} y={40} width={58} height={50} rx={6} fill="#5aa9e6" stroke={INK} strokeWidth={2.5} />
        <Label x={219} y={70} size={11} color="#fff">
          RESET
        </Label>
        <Arrow d="M176,65 H188" width={3} />
        <PriceTag x={252} y={65} label="new" width={42} color="#d8f0e2" />
        <path d="M296,40 l4,-8 l2,9 l8,2 l-8,3 l-2,9 l-3,-8 l-8,-2 Z" fill="#f2c230" stroke={INK} strokeWidth={1.2} />
      </svg>
    ),
  },
  traps: [
    {
      title: "Inherited, then sold two months later",
      text: "The answer choice that says short-term is the banana peel. Inherited property is always treated as held more than one year.",
    },
    {
      title: "The gift sold in the gap",
      text: "If the gift was worth less than the donor's basis and it sells for a price between the two, there's no gain and no loss. Don't pick a small gain or a small loss.",
    },
    {
      title: "A loss on your own car or home",
      text: "Personal-use property losses aren't deductible. The exam loves a question where the taxpayer sells the family car at a loss. The answer is nothing to deduct.",
    },
    {
      title: "The wash sale",
      text: "Sell stock at a loss and buy substantially identical stock within 30 days before or after, and the loss is disallowed. It isn't gone forever: it's added to the basis of the new shares.",
    },
  ],
  sources: [
    { key: "p551", section: "Cost Basis; Adjusted Basis; Property Received as a Gift; Inherited Property" },
    { key: "p544", section: "Chapter 4: Capital Gains and Losses; Holding Period" },
    { key: "p550", section: "Wash Sales; Capital Losses" },
    { key: "p523", section: "Does Your Home Sale Qualify for the Exclusion of Gain?" },
    { key: "tc409", section: "Capital gain tax rates for 2025" },
  ],
  quizTopics: ["Basis of gifted property", "Basis of inherited property", "Capital losses", "Sale of a home"],
};

export default lesson;

/** Seen on the Study home page and in a Hoot cameo on the lesson page. */
export const HootStamp = () => (
  <svg viewBox="0 0 120 120" aria-hidden>
    <Hoot x={60} y={52} scale={0.5} mood="happy" clipboard />
  </svg>
);

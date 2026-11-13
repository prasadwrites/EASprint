import { Ace, Backdrop, GiftBox, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, Envelope, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 1, topic 6.2: the gift tax: the annual exclusion, Form 709, who pays, gift splitting, unlimited
// exclusions (tuition, medical, spouse, charity), the noncitizen spouse limit and the 529 five-year
// election. Written to the rules for 2025 gifts from the Form 709 instructions and the IRS gift tax FAQs.

const comic: Lesson["comic"] = [
  {
    alt: "Aunt Rosa hands out envelopes to Penny and Milo. Hoot pops up behind with his clipboard.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={70} y={128} scale={0.74} mood="excited" pose="hold" holding={<Envelope x={0} y={-8} label="$25K" />} />
        <Penny x={164} y={128} scale={0.72} mood="excited" pose="up" />
        <Hoot x={266} y={130} scale={0.64} mood="smug" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I'm feeling generous! $25,000 for Penny, Milo AND Lulu!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Hoot", text: "Hoo! Did someone say Form 709?", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds a paper reading $19,000 per person. Rosa listens.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="$19,000" sub="per person" color="#d8f0e2" />} />
        <Rosa x={240} y={128} scale={0.78} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Rosa, the annual exclusion is $19,000 per person. Gifts over that go on Form 709, due April 15.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Rosa", text: "Do they pay tax on it?", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot points at Rosa. Penny and Milo cheer, holding their envelopes.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Hoot x={70} y={130} scale={0.68} mood="stern" pose="point" />
        <Penny x={170} y={128} scale={0.72} mood="excited" pose="hold" holding={<Envelope x={0} y={-8} label="$25K" />} />
        <Milo x={262} y={128} scale={0.72} mood="excited" flip pose="wave" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "No! The DONOR files and pays. And Rosa's $13,990,000 lifetime exemption covers it.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Milo", text: "Best. Aunt. Ever.", x: 66, y: 6, w: 31, tail: "down-right" },
    ],
  },
  {
    alt: "Penny and Milo together hold a big gift for Lulu. Rosa looks left out.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={60} y={128} scale={0.72} mood="happy" />
        <Milo x={138} y={128} scale={0.72} mood="happy" />
        <GiftBox x={190} y={146} scale={0.9} />
        <Rosa x={270} y={128} scale={0.7} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "If Milo and I split gifts, we can give Lulu $38,000 tax-free!", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Rosa", text: "And I can't split, because I'm a widow? Hmph.", x: 56, y: 3, w: 41, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa hands a check to a sign reading Ledger Falls Academy. Lulu cheers. Ace gives a thumbs up.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Rosa x={70} y={128} scale={0.74} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="TUITION" sub="to school" color="#d8f0e2" />} />
        <Lulu x={160} y={160} scale={0.54} mood="excited" pose="up" />
        <Ace x={256} y={128} scale={0.74} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Then I'll pay Lulu's tuition instead!", x: 3, y: 3, w: 36, tail: "down-left" },
      { who: "Ace", text: "Pay the school directly, Rosa, and it's unlimited. Same for medical bills paid to the provider.", x: 46, y: 2, w: 51, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds a paper reading 529, $95,000. Hoot faints backward.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Rosa x={84} y={128} scale={0.78} mood="smug" pose="hold" holding={<Paper x={0} y={-8} label="529" sub="$95,000" color="#fff3c4" />} />
        <Hoot x={236} y={132} scale={0.66} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "And $95,000 into Lulu's 529, spread over 5 years on my 709!", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Hoot", text: "Five years of exclusions... at ONCE?! *faints*", x: 56, y: 3, w: 41, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The annual exclusion",
    alt: "Rosa's three gifts of $25,000 each: $19,000 of each is excluded; $6,000 each is a taxable gift that goes on Form 709.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <Step x={14} y={14} w={140} h={90} color="#d8f0e2" label="$19,000" sub="per donee, 2025" />
        <Step x={166} y={14} w={140} h={90} color="#fff3c4" label="$6,000" sub="over: on Form 709" />
        <Label x={160} y={132} size={11}>$25,000 gift = $19,000 excluded + $6,000 taxable gift</Label>
        <Label x={160} y={156} size={10} weight={700}>Present interests only</Label>
      </svg>
    ),
    body: [
      "For 2025, a donor can give up to $19,000 to each of any number of people with no gift tax and no return. The gift must be a present interest (the recipient can use it now); gifts of future interests, like most gifts in trust, don't qualify for the exclusion.",
      "The amount over $19,000 to any one person is a taxable gift that goes on Form 709.",
    ],
    keyPoint: "2025 annual exclusion: $19,000 per donee, unlimited donees; present interests only. The excess to any one donee is a taxable gift reported on Form 709.",
  },
  {
    title: "Form 709: who files, when, who pays",
    alt: "Form 709 due April 15 of the next year, filed and paid by the donor; tax only after the lifetime exemption is used up.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={56} y={80} label="709" sub="donor" scale={1.8} color="#fff" />
        <Card x={110} y={14} w={198} h={36} lines={["Donor files and pays"]} size={11} color="#fde2e4" />
        <Card x={110} y={56} w={198} h={46} lines={["Due April 15; a 1040", "extension extends it"]} size={10} color="#fff" />
        <Card x={110} y={108} w={198} h={56} lines={["No tax until lifetime", "taxable gifts top $13.99M"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "The donor, not the recipient, files Form 709 and pays any gift tax. It's due April 15 of the year after the gift, and an extension of the donor's income tax return (Form 4868) also extends the 709; Form 8892 extends a 709 alone.",
      "Taxable gifts use up the donor's unified lifetime exemption, the same $13,990,000 basic exclusion as the estate tax for 2025. Tax is owed only after lifetime taxable gifts exceed it. Recipients don't report gifts as income.",
    ],
    keyPoint: "Form 709: donor files and pays; due April 15 of the following year (a 1040 extension also extends it). Taxable gifts reduce the unified $13,990,000 exemption; tax only after it's used up. Gifts aren't income to the recipient.",
  },
  {
    title: "Gift splitting",
    alt: "Penny and Milo together give Lulu $38,000, half treated as from each. Both must consent, and Rosa, a widow, can't split.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={160} />
        <Penny x={50} y={118} scale={0.4} mood="happy" />
        <Milo x={100} y={118} scale={0.4} mood="happy" />
        <Card x={140} y={14} w={168} h={44} lines={["$38,000 per donee", "for a married couple"]} size={10} color="#d8f0e2" />
        <Card x={140} y={64} w={168} h={44} lines={["Both consent;", "Form 709 still filed"]} size={10} color="#fff" />
        <Card x={140} y={114} w={168} h={40} lines={["Must be married"]} size={11} color="#fde2e4" />
      </svg>
    ),
    body: [
      "A married couple can elect gift splitting: a gift by either spouse to a third party is treated as made half by each. That lets them give $38,000 per donee in 2025 without a taxable gift.",
      "Both spouses must be U.S. citizens or residents and married at the time of the gift, and both must consent on Form 709. A Form 709 is generally required to elect splitting even when no tax is due. A widowed or single donor can't split.",
    ],
    keyPoint: "Gift splitting: spouses treat each gift to others as half from each ($38,000 per donee in 2025). Both must consent on Form 709 (filed even when no tax is due); must be married and U.S. citizens/residents.",
  },
  {
    title: "Gifts that never count",
    alt: "Tuition paid directly to a school, medical bills paid directly to the provider, gifts to a U.S. citizen spouse, gifts to charity, and political gifts: all unlimited. A noncitizen spouse: $190,000.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={14} y={12} w={140} h={44} lines={["Tuition paid", "to the school"]} size={10} color="#d8f0e2" />
        <Card x={166} y={12} w={140} h={44} lines={["Medical paid", "to the provider"]} size={10} color="#d8f0e2" />
        <Card x={14} y={62} w={140} h={44} lines={["Citizen spouse"]} size={11} color="#d8f0e2" />
        <Card x={166} y={62} w={140} h={44} lines={["Charity, politics"]} size={11} color="#d8f0e2" />
        <Card x={40} y={118} w={240} h={46} lines={["Noncitizen spouse: $190,000 a year"]} size={11} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Tuition paid directly to an educational organization and medical expenses paid directly to the provider are excluded without limit, on top of the annual exclusion. Paying the student or patient instead doesn't qualify. The tuition exclusion covers tuition only, not books or room and board.",
      "Gifts to a spouse who is a U.S. citizen are unlimited (marital deduction), as are gifts to charities and political organizations. Gifts to a spouse who isn't a U.S. citizen get a higher annual exclusion: $190,000 for 2025.",
    ],
    keyPoint: "Unlimited and not counted: tuition paid directly to the school (tuition only), medical paid directly to the provider, gifts to a citizen spouse, charity, political organizations. Noncitizen spouse: $190,000 annual exclusion for 2025.",
  },
  {
    title: "Superfunding a 529",
    alt: "A $95,000 gift to Lulu's 529 spread as $19,000 a year over five years, elected on Form 709.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Paper x={56} y={70} label="529" sub="$95,000" scale={1.6} color="#fff3c4" />
        {[0, 1, 2, 3, 4].map((i) => (
          <Card key={i} x={112 + i * 40} y={40} w={36} h={60} lines={["$19K"]} size={9} color="#d8f0e2" />
        ))}
        <Label x={210} y={30} size={10} weight={700}>5 years of exclusions</Label>
        <Label x={160} y={140} size={11}>Elect on Form 709</Label>
        <Label x={160} y={160} size={10} weight={700}>($190,000 for a couple who split)</Label>
      </svg>
    ),
    body: [
      "A donor can elect to treat a contribution to a 529 plan of up to five times the annual exclusion ($95,000 in 2025) as made evenly over five years, using five years of annual exclusions at once. The election is made on Form 709.",
      "A married couple who split gifts can contribute $190,000 per beneficiary. Other gifts to the same beneficiary in those five years would go over the exclusion, and if the donor dies during the period, the portion for the remaining years is added back to their estate.",
    ],
    keyPoint: "529 five-year election: contribute up to 5 × the annual exclusion ($95,000 in 2025; $190,000 split) and spread it over 5 years on Form 709. Death within the 5 years pulls the unused years back into the estate.",
  },
];

const lesson: Lesson = {
  id: "p1-gift-tax",
  part: "part1",
  domainId: "p1d6",
  number: "6.2",
  episode: "Aunt Rosa's Generosity Problem",
  title: "Gift tax",
  minutes: 12,
  lawAsOf: "2025 gifts (rules in effect for 2025)",
  intro: "The $19,000 annual exclusion, who files Form 709 and when, gift splitting, the unlimited tuition, medical, spouse and charity exclusions, and the 529 five-year election.",
  previously: "Rosa found out Bert's unused exclusion could still be saved. Feeling rich, she decides to give some money away. A lot of money.",
  comic,
  cards,
  hook: {
    line: "The DONOR files the 709 and pays. Gifts aren't the recipient's income.",
    more: "$19,000 per person for 2025, $38,000 split. Tuition and medical paid directly: unlimited.",
    alt: "A gift box with $19,000 on it, and an arrow to Form 709.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#f3e1ef" />
        <GiftBox x={60} y={60} scale={1} />
        <Mark x={150} y={70} text="$19K" color="#1d7a49" size={22} />
        <Paper x={250} y={60} label="709" sub="donor" scale={1.4} color="#fff3c4" />
      </svg>
    ),
  },
  traps: [
    { title: "The recipient pays the gift tax", text: "The donor files Form 709 and pays. Gifts aren't income to the recipient." },
    { title: "Splitting for a single donor", text: "Only married couples can split gifts, and both must consent on Form 709." },
    { title: "Paying tuition to the student", text: "The unlimited tuition exclusion applies only when paid directly to the school, and only for tuition." },
    { title: "No 709 when no tax is due", text: "A gift over $19,000 to one person needs a 709 even though the lifetime exemption means no tax." },
  ],
  sources: [
    { key: "i709", section: "Who Must File; Gift Splitting; Annual Exclusion; Qualified Tuition Programs" },
    { key: "giftfaq", section: "Frequently asked questions on gift taxes" },
  ],
  cases: [
    {
      who: "Rosa",
      title: "Three $25,000 gifts",
      facts: "In 2025, widowed Aunt Rosa gives $25,000 cash each to Penny, Milo and Lulu. She has made no other taxable gifts.",
      question: "What does Rosa report, and does she owe gift tax?",
      choices: ["Nothing; she has a lifetime exemption", "Form 709 with $18,000 of taxable gifts; no tax due", "Form 709 with $75,000 of taxable gifts; tax due", "Each recipient reports $6,000 as income"],
      answer: "Form 709 with $18,000 of taxable gifts; no tax due",
      why: "Each $25,000 gift is $6,000 over the $19,000 exclusion, so $18,000 of taxable gifts go on Form 709. Her $13,990,000 lifetime exemption absorbs them.",
    },
    {
      who: "Penny",
      title: "Split for Lulu",
      facts: "Penny gives Lulu $38,000 from her own account in 2025. Milo agrees to split gifts.",
      question: "What's the result?",
      choices: ["$19,000 taxable gift from Penny", "No taxable gift, and no 709 needed", "No taxable gift, but a 709 is needed to elect splitting", "$38,000 taxable gift"],
      answer: "No taxable gift, but a 709 is needed to elect splitting",
      why: "With splitting, each spouse is treated as giving $19,000, within the exclusion. Electing gift splitting generally requires filing Form 709 with both spouses' consent.",
    },
    {
      who: "Lulu",
      title: "Tuition and a birthday check",
      facts: "Rosa pays Lulu's $30,000 private school tuition directly to the school and also gives Lulu $19,000 for her birthday in 2025.",
      question: "How much is a taxable gift?",
      choices: ["$0", "$30,000", "$11,000", "$49,000"],
      answer: "$0",
      why: "Tuition paid directly to the school is excluded without limit, and the $19,000 birthday gift is within the annual exclusion.",
    },
    {
      who: "Hoot",
      title: "Who files?",
      facts: "Rosa's $25,000 gift to Penny exceeds the annual exclusion.",
      question: "Who files Form 709, and when?",
      choices: ["Penny, by April 15, 2026", "Rosa, by December 31, 2025", "Both of them", "Rosa, by April 15, 2026"],
      answer: "Rosa, by April 15, 2026",
      why: "The donor files Form 709, due April 15 of the year after the gift. The recipient has nothing to report.",
    },
    {
      who: "Ace",
      title: "The 529 superfund",
      facts: "Rosa puts $95,000 into Lulu's 529 plan in 2025 and makes the five-year election. She makes no other gifts to Lulu through 2029.",
      question: "How much is a taxable gift in 2025?",
      choices: ["$76,000", "$95,000", "$19,000", "$0"],
      answer: "$0",
      why: "The election spreads the $95,000 as $19,000 a year over 2025 through 2029, each within the annual exclusion. It's reported on Form 709.",
    },
  ],
  quizTopics: ["Gift splitting", "Gift tax exclusions"],
  quizBrief: "Gift tax: $19,000 annual exclusion (2025), present interests, Form 709 filed and paid by the donor, gift splitting, tuition and medical exclusions, $190,000 noncitizen spouse, 529 five-year election",
};

export default lesson;

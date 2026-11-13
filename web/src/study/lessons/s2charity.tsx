import { Ace, Backdrop, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import { Crate } from "../bakery";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 3.2: exempt organizations: getting 501(c)(3) status, the Form 990 series, automatic
// revocation, unrelated business income and Form 990-T, and donor substantiation rules. Written to
// Publication 557, Publication 1771 and the Form 990 and 990-T instructions for tax year 2025.

const INK = "#2a2f3a";

/** A little coffee cart with a striped awning. (x, y) is the bottom center. */
function CoffeeCart({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-46,-92 H46 L40,-76 H-40 Z" fill="#e8505b" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M-28,-92 L-24,-76 M-8,-92 L-8,-76 M12,-92 L8,-76 M30,-92 L24,-76" stroke="#fff" strokeWidth={5} />
      <path d="M-36,-76 V-56 M36,-76 V-56" stroke={INK} strokeWidth={2.5} />
      <rect x={-42} y={-56} width={84} height={40} rx={4} fill="#d9b382" stroke={INK} strokeWidth={2.5} />
      <text x={0} y={-31} textAnchor="middle" fontSize={11} fontWeight={900} fill={INK} fontFamily="inherit">
        COFFEE
      </text>
      <circle cx={-26} cy={-8} r={8} fill="#2a2f3a" />
      <circle cx={26} cy={-8} r={8} fill="#2a2f3a" />
      <path d="M-12,-56 v-8 h10 v8 M4,-56 v-6 h9 v6" fill="#fff" stroke={INK} strokeWidth={2} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Milo proudly holds a sign reading THE MILO FOUNDATION. Rosa, carrying a crate of day-old bread for the pantry, sighs.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Milo x={66} y={128} scale={0.76} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="MILO" sub="FOUNDATION" color="#fff3c4" />} />
        <Crate x={170} y={206} scale={0.8} label="DAY-OLD" />
        <Rosa x={262} y={128} scale={0.76} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "I'm starting a charity too! The Milo Foundation. It helps... Milo.", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Rosa", text: "That's not how charity works, dear.", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at a card reading 501(c)(3): public purpose, no private benefit. Milo raises a hopeful finger.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={92} w={108} h={64} lines={["501(c)(3)", "public purpose", "no insider benefit"]} size={9.5} color="#fff" />
        <Milo x={262} y={128} scale={0.76} mood="thinking" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "A 501(c)(3) must serve the public. Its earnings can't benefit insiders like its founder.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Milo", text: "What if I'm a VERY public person?", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a postcard labeled 990-N. Lulu wants to decorate it.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="990-N" sub="e-Postcard" />} />
        <Mark x={168} y={120} text="$50K" color="#1d7a49" size={28} />
        <Lulu x={270} y={160} scale={0.56} mood="excited" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Pastor Gail's pantry normally takes in under $50,000 a year, so it just files the 990-N e-Postcard.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Lulu", text: "A postcard! Can I draw a horse on it?", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of a crate labeled GIFTS. Rosa is horrified.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Hoot x={84} y={92} scale={0.52} mood="stern" pose="up" />
        <Crate x={84} y={206} scale={1.05} label="GIFTS" />
        <Rosa x={256} y={128} scale={0.76} mood="shocked" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Miss filing for three years in a row and the exemption is revoked. Automatically.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Rosa", text: "Even for a FOOD PANTRY?!", x: 64, y: 6, w: 32, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Ace stands by the pantry's new coffee cart. Milo, in an apron, raises his hand eagerly.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f1fb" />
        <Ace x={60} y={128} scale={0.74} mood="thinking" pose="point" />
        <CoffeeCart x={160} y={206} scale={0.95} />
        <Milo x={266} y={128} scale={0.74} mood="excited" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "A coffee cart open to the public all year is unrelated business income. Form 990-T at $1,000.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Milo", text: "Not if volunteers run it! Like ME!", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Milo happily waves from beside the coffee cart. Penny and Rosa watch in disbelief.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f1fb" />
        <Penny x={50} y={128} scale={0.68} mood="shocked" />
        <CoffeeCart x={138} y={206} scale={0.85} />
        <Milo x={212} y={128} scale={0.64} mood="happy" pose="wave" />
        <Rosa x={286} y={128} scale={0.6} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "He's actually RIGHT. The volunteer exception is real.", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Rosa", text: "Somebody write down the date.", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Becoming a 501(c)(3)",
    alt: "A charity applies on Form 1023 or 1023-EZ. It must be organized and operated for exempt purposes, with no private inurement and no political campaigning.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="1023" sub="or 1023-EZ" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="27 mo." sub="to be retroactive" />
        <Step x={214} y={14} w={96} h={100} color="#fde2e4" label="No" sub="inurement" />
        <Label x={160} y={140} size={10} weight={700}>No campaigning for candidates</Label>
        <Label x={160} y={158} size={10} weight={700}>Churches are exempt without applying</Label>
      </svg>
    ),
    body: [
      "A 501(c)(3) organization must be organized and operated exclusively for exempt purposes (charitable, religious, educational, scientific and similar). None of its net earnings may inure to the benefit of insiders, it may not participate in political campaigns for or against candidates, and lobbying can't be a substantial part of its activities.",
      "Most organizations apply on Form 1023 (filed electronically). Small organizations (projected annual gross receipts of $50,000 or less and assets of $250,000 or less) may use the streamlined Form 1023-EZ. If the application is filed within 27 months after formation, exemption is recognized back to the formation date. Churches are treated as exempt without applying.",
    ],
    keyPoint: "501(c)(3): organized and operated exclusively for exempt purposes; no private inurement; no political campaign activity; lobbying not substantial. Apply on Form 1023 (1023-EZ if gross receipts ≤ $50,000 and assets ≤ $250,000). File within 27 months of formation for retroactive exemption. Churches exempt without applying.",
  },
  {
    title: "The Form 990 series",
    alt: "Small organizations file the 990-N e-Postcard. Medium ones may file 990-EZ. Larger ones file Form 990. Private foundations file 990-PF. Churches don't file.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={8} y={14} w={72} h={100} color="#d8f0e2" label="990-N" sub="≤ $50,000" />
        <Step x={86} y={14} w={72} h={100} color="#fff3c4" label="990-EZ" sub="< $200K" />
        <Step x={164} y={14} w={72} h={100} color="#d4ebfa" label="990" sub="larger" />
        <Step x={242} y={14} w={70} h={100} color="#fde2e4" label="990-PF" sub="foundations" />
        <Label x={160} y={146} size={10} weight={700}>Due 15th day of 5th month (May 15)</Label>
      </svg>
    ),
    body: [
      "Most exempt organizations file an annual information return. Those with gross receipts normally $50,000 or less may file the Form 990-N e-Postcard. Those with gross receipts under $200,000 and total assets under $500,000 may file Form 990-EZ. Larger organizations file Form 990, and every private foundation files Form 990-PF regardless of size.",
      "Churches, their integrated auxiliaries and conventions of churches, along with certain government units, aren't required to file. The return is due the 15th day of the 5th month after the year ends (May 15 for a calendar year); Form 8868 gives an automatic 6-month extension (not available for the 990-N).",
    ],
    table: {
      head: ["Return", "Who can file it"],
      rows: [
        ["990-N", "Gross receipts normally ≤ $50,000"],
        ["990-EZ", "Gross receipts < $200,000 and assets < $500,000"],
        ["990", "Everyone else"],
        ["990-PF", "Private foundations, any size"],
      ],
    },
    keyPoint: "990-N: gross receipts normally ≤ $50,000. 990-EZ: gross receipts < $200,000 AND total assets < $500,000. 990: others. 990-PF: all private foundations. Churches exempt from filing. Due 15th day of the 5th month (May 15); Form 8868 extends 6 months (not 990-N).",
  },
  {
    title: "Automatic revocation",
    alt: "An organization that doesn't file a required Form 990, 990-EZ, 990-PF or 990-N for three consecutive years automatically loses its exemption.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="Year 1" sub="no return" />
        <Step x={112} y={14} w={96} h={100} color="#fff" label="Year 2" sub="no return" />
        <Step x={214} y={14} w={96} h={100} color="#fde2e4" label="Year 3" sub="revoked" />
        <Label x={160} y={140} size={10} weight={700}>Effective on the 3rd return's due date</Label>
        <Label x={160} y={158} size={10} weight={700}>Must reapply to get exemption back</Label>
      </svg>
    ),
    body: [
      "An organization that is required to file and fails to file a Form 990, 990-EZ, 990-PF or 990-N for three consecutive years automatically loses its tax-exempt status, effective on the due date of the third return. The IRS publishes the list of revoked organizations.",
      "After revocation, the organization may have to file income tax returns and pay tax, and contributions made after the revocation date generally aren't deductible. To regain exemption, it must reapply (Form 1023 or 1023-EZ), and it can ask for retroactive reinstatement in some cases.",
    ],
    keyPoint: "Fail to file a required 990/990-EZ/990-PF/990-N for 3 consecutive years → automatic revocation, effective on the third return's due date. Organization may owe income tax; later donations generally not deductible. Must reapply; retroactive reinstatement possible in some cases.",
  },
  {
    title: "Unrelated business income",
    alt: "Income from a trade or business that's regularly carried on and not substantially related to the exempt purpose is UBI. File Form 990-T with gross UBI of $1,000 or more. Volunteer-run and donated-goods sales are excepted.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f1fb" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="Trade" sub="or business" />
        <Step x={112} y={14} w={96} h={100} color="#fff3c4" label="Regular" sub="carried on" />
        <Step x={214} y={14} w={96} h={100} color="#fde2e4" label="Unrelated" sub="to the mission" />
        <Label x={160} y={140} size={10} weight={700}>Form 990-T at $1,000+ gross UBI</Label>
        <Label x={160} y={158} size={10} weight={700}>Exceptions: volunteers · donated goods · convenience</Label>
      </svg>
    ),
    body: [
      "Unrelated business taxable income comes from a trade or business that is regularly carried on and not substantially related to the organization's exempt purpose (other than needing the money). An exempt organization with gross income of $1,000 or more from an unrelated trade or business must file Form 990-T, and gets a $1,000 specific deduction. Exempt corporations pay tax at the 21% corporate rate.",
      "Exceptions include businesses where substantially all the work is done by unpaid volunteers, sales of donated merchandise (like a thrift shop), and businesses run mainly for the convenience of members, students, patients or employees. Most passive income (dividends, interest, royalties, most rent from real property) is excluded unless it's debt-financed.",
    ],
    keyPoint: "UBI = trade or business + regularly carried on + not substantially related. Form 990-T if gross UBI ≥ $1,000; $1,000 specific deduction; corporations taxed at 21%. Exceptions: volunteer labor, donated merchandise, convenience of members/students/patients/employees. Passive income (dividends, interest, royalties, most real property rent) excluded unless debt-financed.",
  },
  {
    title: "Donor receipts",
    alt: "A donor needs a written acknowledgment for any single gift of $250 or more. A charity must give a disclosure when a donor pays more than $75 and gets something back.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={14} w={140} h={100} color="#fff" label="$250+" sub="written ack" />
        <Step x={166} y={14} w={140} h={100} color="#fff3c4" label="$75+" sub="quid pro quo note" />
        <Label x={160} y={140} size={10} weight={700}>Deductible = payment − value received</Label>
        <Label x={160} y={158} size={10} weight={700}>Get the receipt before filing</Label>
      </svg>
    ),
    body: [
      "A donor can't deduct a single contribution of $250 or more without a contemporaneous written acknowledgment from the charity, received by the earlier of the date the return is filed or its due date (with extensions). It must state the amount of cash (or describe property), and whether the charity gave any goods or services in return, with a good-faith estimate of their value.",
      "When a donor makes a payment of more than $75 that's partly a gift and partly for goods or services (a quid pro quo contribution, like a fundraising dinner), the charity must give a written statement telling the donor the deductible amount is the payment minus the value received. A charity can be penalized $10 per contribution (up to $5,000 per event) for missing it.",
    ],
    keyPoint: "Single gift ≥ $250: donor needs a contemporaneous written acknowledgment (amount; goods or services received and their value) by the earlier of filing or the due date. Quid pro quo payment > $75: charity must disclose that only the excess over the value received is deductible; penalty $10 per contribution, max $5,000 per event.",
  },
];

const lesson: Lesson = {
  id: "p2-exempt-organizations",
  part: "part2",
  domainId: "p2d3",
  number: "3.2",
  episode: "The Milo Foundation",
  title: "Exempt organizations",
  minutes: 14,
  lawAsOf: "tax year 2025",
  intro: "How an organization becomes a 501(c)(3), which Form 990 it files, automatic revocation, unrelated business income and Form 990-T, and the donor receipt rules.",
  previously: "Grandpa Walt's estate is filed (he's still watching). Rosa has started giving day-old bread to Pastor Gail's food pantry, and Milo has noticed.",
  comic,
  cards,
  hook: {
    line: "Skip three years and the exemption's gone.",
    more: "990-N ≤ $50,000; 990-EZ < $200,000 receipts and < $500,000 assets; due May 15. UBI: regular, unrelated trade, 990-T at $1,000. Donor receipts at $250; quid pro quo at $75.",
    alt: "A coffee cart next to 990 and 3.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7f1fb" />
        <CoffeeCart x={66} y={112} scale={0.95} />
        <Mark x={180} y={74} text="990" color="#1d7a49" size={32} />
        <Mark x={268} y={74} text="3 yrs" color="#a8321f" size={26} />
      </svg>
    ),
  },
  traps: [
    { title: "All charities file nothing", text: "Most exempt organizations file a 990, 990-EZ or 990-N every year. Churches are the main exception." },
    { title: "Any income is UBI", text: "UBI must be from a trade or business that's regularly carried on and unrelated. Volunteer-run and donated-goods sales are excepted." },
    { title: "990-T at $1", text: "Form 990-T is required at $1,000 or more of gross UBI." },
    { title: "A canceled check is enough at $250", text: "A single gift of $250 or more needs a written acknowledgment from the charity." },
  ],
  sources: [
    { key: "p557", section: "Tax-exempt status" },
    { key: "eofiling", section: "Who must file" },
    { key: "i990", section: "Form 990 instructions" },
    { key: "eorevoke", section: "Automatic revocation" },
    { key: "i990t", section: "Unrelated business income" },
    { key: "p1771", section: "Donor substantiation" },
  ],
  cases: [
    {
      who: "Penny",
      title: "The little pantry",
      facts: "A 501(c)(3) food pantry (not a church) normally has about $40,000 of gross receipts a year.",
      question: "What annual return may it file?",
      choices: ["Form 990", "Form 990-EZ", "Form 990-N", "None"],
      answer: "Form 990-N",
      why: "Organizations with gross receipts normally $50,000 or less may file the Form 990-N e-Postcard.",
    },
    {
      who: "Ace",
      title: "The coffee shop",
      facts: "A charity runs a coffee shop open to the public year-round, staffed by paid employees. It brings in $25,000 of gross income unrelated to the charity's mission.",
      question: "What must it file for that income?",
      choices: ["Form 990-T", "Nothing; it's a charity", "Form 1120", "Form 990-N only"],
      answer: "Form 990-T",
      why: "It's a regularly carried on trade or business not substantially related to the exempt purpose, with gross UBI of $1,000 or more.",
    },
    {
      who: "Hoot",
      title: "Three quiet years",
      facts: "A small exempt organization that was required to file didn't file any return for 2022, 2023 or 2024.",
      question: "What happens?",
      choices: ["A penalty only", "Nothing until it's audited", "A warning letter", "Its exemption is automatically revoked"],
      answer: "Its exemption is automatically revoked",
      why: "Failing to file a required 990-series return for three consecutive years automatically revokes exemption.",
    },
    {
      who: "Rosa",
      title: "Dinner for a cause",
      facts: "Rosa pays $100 for a ticket to the pantry's fundraising dinner. The meal is worth $40.",
      question: "How much can she deduct if she itemizes?",
      choices: ["$100", "$60", "$40", "$0"],
      answer: "$60",
      why: "Only the excess over the value received is deductible: $100 − $40 = $60. Because she paid more than $75, the charity must tell her this in writing.",
    },
  ],
  quizTopics: ["Exempt organization filing", "Unrelated business income"],
  quizBrief: "Exempt organizations: 501(c)(3) rules and Form 1023, Form 990 series (990-N, 990-EZ, 990, 990-PF), automatic revocation after 3 years, UBI and Form 990-T ($1,000), donor receipts",
};

export default lesson;

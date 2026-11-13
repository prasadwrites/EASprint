import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny } from "../cast";
import type { Lesson } from "../lesson";
import { Doghouse, Magnet } from "../office";
import { Card, CARD, Envelope, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 3, topic 3.1: collections: installment agreements, offers in compromise, currently not
// collectible status, liens and levies, collection due process, extensions of time to pay and
// passport certification. Written to the IRS payment plan, OIC, lien and levy pages and
// Publications 594 and 1660 as in effect for 2026.

const comic: Lesson["comic"] = [
  {
    alt: "Milo holds an IRS bill and screams. Penny reads over his shoulder, calm.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Penny x={84} y={128} scale={0.78} mood="thinking" />
        <Milo x={230} y={128} scale={0.78} mood="shocked" flip pose="hold" holding={<Envelope x={0} y={-6} label="$14,000" irs />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Hoot's audit is done. We owe $14,000.", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Milo", text: "I'm moving in with Biscuit. The IRS will never find me.", x: 50, y: 2, w: 47, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Milo tries to squeeze into Biscuit's doghouse. Biscuit sits outside, unimpressed. Ace watches.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={70} y={128} scale={0.78} mood="stern" pose="shrug" />
        <Doghouse x={200} y={196} scale={0.9} />
        <Milo x={262} y={128} scale={0.72} mood="worried" flip pose="up" />
        <Biscuit x={146} y={190} scale={0.75} mood="sad" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Milo, hiding doesn't stop the interest. Let's set up a payment plan.", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Milo", text: "Biscuit said I could stay.", x: 64, y: 4, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Ace shows a chart of plans: short-term up to 180 days, and a long-term plan for up to 72 months. Milo looks relieved.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={70} y={128} scale={0.78} mood="happy" pose="point" />
        <Card x={112} y={92} w={96} h={70} lines={["180 days", "72 months", "≤ $50,000"]} size={10} color="#fff" />
        <Milo x={256} y={128} scale={0.78} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Owe $50,000 or less? Pay over up to 72 months. Need 180 days or less? Short-term plan.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Milo", text: "So taxes are like a gym membership now?", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot staggers in carrying a giant red magnet labeled levy. Ace holds up a hand.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Ace x={70} y={128} scale={0.78} mood="stern" pose="up" />
        <Hoot x={230} y={130} scale={0.68} mood="excited" flip pose="up" />
        <Magnet x={176} y={108} scale={1.1} rotate={-20} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "No levy without a Final Notice of Intent to Levy, 30 days ahead. And he gets a hearing.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Hoot", text: "Fine. But it's SO shiny.", x: 62, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds Form 656. Milo holds out a single cinnamon roll on a plate toward Hoot.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={56} y={128} scale={0.72} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="656" sub="OIC" color="#fff3c4" />} />
        <Milo x={156} y={128} scale={0.72} mood="happy" pose="hold" holding={
          <g transform="translate(0 -8)">
            <ellipse cx={0} cy={8} rx={18} ry={5} fill="#fff" stroke="#2a2f3a" strokeWidth={2} />
            <circle cx={0} cy={0} r={11} fill="#d9a066" stroke="#2a2f3a" strokeWidth={2} />
            <path d="M-5,0 A5,5 0 1 1 5,0 A2.5,2.5 0 1 1 0,0" fill="none" stroke="#7a4a20" strokeWidth={1.8} />
          </g>
        } />
        <Hoot x={266} y={130} scale={0.62} mood="stern" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Could we just offer less? I read about Form 656.", x: 3, y: 2, w: 34, tail: "down-left" },
      { who: "Milo", text: "We offer... ONE cinnamon roll.", x: 36, y: 4, w: 32, tail: "down" },
      { who: "Hoot", text: "An offer must be what you can really pay. And $205.", x: 70, y: 2, w: 28, tail: "down-right" },
    ],
  },
  {
    alt: "Milo, plan signed, waves Biscuit home. Hoot sits on top of the doghouse. Lulu points.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Milo x={70} y={128} scale={0.78} mood="happy" pose="wave" />
        <Lulu x={140} y={160} scale={0.5} mood="excited" pose="point" />
        <Doghouse x={236} y={200} scale={0.9} />
        <Hoot x={236} y={76} scale={0.5} mood="smug" />
        <Biscuit x={186} y={196} scale={0.7} mood="sad" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Plan signed! Biscuit, your house is yours again!", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Hoot", text: "Occupied.", x: 74, y: 6, w: 22, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Payment plans",
    alt: "Three plans: short-term up to 180 days; a guaranteed plan for $10,000 or less; a streamlined long-term plan for $50,000 or less over up to 72 months.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={94} h={104} color="#d8f0e2" label="180 days" sub="short-term" />
        <Step x={113} y={14} w={94} h={104} color="#fff3c4" label="≤ $10,000" sub="guaranteed" />
        <Step x={212} y={14} w={94} h={104} color="#e7e3f3" label="≤ $50,000" sub="up to 72 months" />
        <Label x={160} y={142} size={10} weight={700}>Penalties and interest keep running</Label>
        <Label x={160} y={160} size={10} weight={700}>Apply online, or Form 9465</Label>
      </svg>
    ),
    body: [
      "A short-term payment plan gives up to 180 days to pay in full. An installment agreement spreads the balance over monthly payments. Individuals who owe $50,000 or less in combined tax, penalties and interest can usually get a streamlined agreement online, paying over up to 72 months, without a full financial statement.",
      "If an individual owes $10,000 or less in tax (not counting penalties and interest), filed and paid on time for the past 5 years, can pay within 3 years, and agrees to file and pay on time, the IRS must accept the plan (a guaranteed installment agreement).",
      "Penalties and interest continue to accrue until the balance is paid, though the failure-to-pay penalty drops to 0.25% a month while an installment agreement is in effect for a timely filed return. Taxpayers apply online or with Form 9465. Missed payments or new balances can default the agreement.",
    ],
    keyPoint: "Short-term plan: up to 180 days. Guaranteed IA: $10,000 or less of tax, clean 5-year history, paid within 3 years. Streamlined IA: $50,000 or less, up to 72 months, no financial statement. Interest and penalties continue (FTP penalty 0.25%/month during an IA).",
  },
  {
    title: "Offer in compromise",
    alt: "Form 656 with a $205 fee and either 20% of a lump-sum offer or the first monthly payment. Low-income taxpayers skip both. The IRS compares the offer with what it could collect.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={56} y={84} label="656" sub="OIC" scale={1.8} color="#fff3c4" />
        <Card x={110} y={14} w={198} h={46} lines={["$205 fee + 20% of a lump sum", "(or the 1st periodic payment)"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["Low income? Fee and", "payment waived"]} size={10} color="#d8f0e2" />
        <Card x={110} y={118} w={198} h={46} lines={["Offer ≥ what the IRS", "could actually collect"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "An offer in compromise settles a tax debt for less than the full amount. The usual basis is doubt as to collectibility: the IRS accepts when the offer equals or exceeds the reasonable collection potential (the taxpayer's equity in assets plus future disposable income). Offers can also rest on doubt as to liability or effective tax administration.",
      "The taxpayer submits Form 656 with a financial statement (Form 433-A (OIC) or 433-B (OIC)), a $205 application fee and an initial payment: 20% of a lump-sum offer, or the first proposed payment of a periodic offer. Taxpayers who meet the low-income certification skip the fee and the initial payment.",
      "The taxpayer must have filed all required returns and made required estimated payments. While an offer is pending, the IRS generally won't levy, and the collection statute is suspended. Refunds for the year the offer is accepted, and earlier years, are kept by the IRS.",
    ],
    keyPoint: "OIC: Form 656 + Form 433-A/B (OIC), $205 fee, 20% of a lump-sum offer or the first periodic payment (both waived for low income). Accepted if it meets reasonable collection potential. No levy while pending; CSED suspended; all returns must be filed.",
  },
  {
    title: "Lien vs. levy",
    alt: "A lien is a claim on property, like a sticky note on the house. A levy actually takes property, like the magnet pulling money from a bank account.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={96} color="#fff3c4" label="LIEN" sub="a claim on property" />
        <Step x={166} y={14} w={140} h={96} color="#fde2e4" label="LEVY" sub="takes the property" />
        <Card x={14} y={120} w={292} h={48} lines={["Levy needs a Final Notice of Intent to Levy", "at least 30 days ahead"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A federal tax lien is the government's legal claim against all of the taxpayer's property when a tax is assessed and goes unpaid after a notice and demand for payment. The IRS may file a public Notice of Federal Tax Lien to alert creditors. The lien is released within 30 days after the debt is paid or becomes legally unenforceable.",
      "A levy actually seizes property: wages, bank accounts, Social Security benefits, a car. Before most levies, the IRS must assess the tax, send a notice and demand, and send a Final Notice of Intent to Levy and Notice of Your Right to a Hearing at least 30 days before the levy. A bank holds levied funds for 21 days before sending them to the IRS.",
    ],
    keyPoint: "Lien = legal claim against property (NFTL is public notice; released within 30 days of payment). Levy = seizure of property; requires notice and demand plus a Final Notice of Intent to Levy at least 30 days before. Banks hold levied funds 21 days.",
  },
  {
    title: "Collection due process",
    alt: "A clock showing 30 days: request a hearing on Form 12153 after a lien filing or a final levy notice. Miss it and an equivalent hearing is available for a year, without Tax Court review.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Paper x={56} y={84} label="12153" sub="CDP" scale={1.8} color="#e7e3f3" />
        <Card x={110} y={14} w={198} h={46} lines={["Within 30 days:", "CDP hearing + Tax Court"]} size={10} color="#d8f0e2" />
        <Card x={110} y={66} w={198} h={46} lines={["Within 1 year:", "equivalent hearing only"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["Levy generally paused", "while CDP is pending"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A taxpayer gets collection due process rights after the IRS files a Notice of Federal Tax Lien (the IRS must notify the taxpayer within 5 business days) and before most levies (with the final notice of intent to levy). To get a CDP hearing with the Independent Office of Appeals, the taxpayer files Form 12153 within 30 days (for a lien, within 30 days after the 5-business-day period ends).",
      "At the hearing the taxpayer can propose alternatives such as an installment agreement or an offer, ask for lien withdrawal, and raise spousal defenses. Levy action is generally suspended while the hearing is pending, and the taxpayer can petition the Tax Court about Appeals' determination.",
      "A taxpayer who misses the 30 days can still ask for an equivalent hearing within one year, but there's no right to go to Tax Court afterward and collection isn't automatically paused.",
    ],
    keyPoint: "CDP: Form 12153 within 30 days of the final levy notice (or of the lien notice's 5-business-day window). Hearing with Appeals, levy generally suspended, Tax Court review available. Late? Equivalent hearing within 1 year, no Tax Court review.",
  },
  {
    title: "When paying isn't possible",
    alt: "Currently not collectible status pauses collection while debt and interest remain. Extensions of time to pay use Form 1127 for undue hardship. Seriously delinquent debt can lead to passport denial or revocation.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={94} h={104} color="#d8f0e2" label="CNC" sub="collection paused" />
        <Step x={113} y={14} w={94} h={104} color="#fff3c4" label="1127" sub="undue hardship" />
        <Step x={212} y={14} w={94} h={104} color="#fde2e4" label="Passport" sub="serious debt" />
        <Label x={160} y={142} size={10} weight={700}>CNC: interest runs, lien may stay,</Label>
        <Label x={160} y={160} size={10} weight={700}>refunds still offset</Label>
      </svg>
    ),
    body: [
      "If a taxpayer can't pay basic living expenses, the IRS can mark the account currently not collectible (CNC). Collection stops, but the debt remains, penalties and interest keep growing, a lien may still be filed, and future refunds are applied to the debt. The IRS reviews income periodically, and the 10-year collection statute keeps running.",
      "Form 1127 requests an extension of time to pay (generally up to 6 months) when paying on time would cause undue hardship, more than an inconvenience.",
      "For seriously delinquent tax debt (assessed debt above an inflation-adjusted threshold, now over $60,000, with a lien filed or levy issued), the IRS certifies the debt to the State Department, which can deny or revoke a passport. Debts in an installment agreement, accepted offer, pending CDP hearing or innocent spouse claim aren't certified.",
    ],
    keyPoint: "CNC: collection paused, debt/interest/penalties continue, refunds offset, CSED keeps running. Form 1127: extension to pay for undue hardship. Seriously delinquent debt (inflation-adjusted, over $60,000) can lead to passport denial or revocation, unless in an IA, OIC, CDP or innocent spouse claim.",
  },
];

const lesson: Lesson = {
  id: "p3-collections",
  part: "part3",
  domainId: "p3d3",
  number: "3.1",
  episode: "Milo Can't Pay",
  title: "Collections",
  minutes: 13,
  lawAsOf: "rules in effect for 2026",
  intro: "What to do when a client can't pay: payment plans, offers in compromise, currently not collectible status, liens and levies, collection due process hearings, and passports.",
  previously: "Hoot finished auditing the 2025 return. The good news: it's over. The bad news is the bill.",
  comic,
  cards,
  hook: {
    line: "Lien = a claim. Levy = a grab.",
    more: "Levies need a final notice 30 days ahead. CDP: Form 12153 within 30 days. Plans: 180 days, $10,000 guaranteed, $50,000 over 72 months. OIC: Form 656 + $205.",
    alt: "Hoot's levy magnet next to the word lien on a sticky note.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fde9e4" />
        <Paper x={70} y={58} label="LIEN" sub="claim" scale={1.2} color="#fff3c4" />
        <Mark x={160} y={70} text="≠" color="#2a2f3a" size={40} />
        <Magnet x={250} y={56} scale={1} rotate={-15} />
      </svg>
    ),
  },
  traps: [
    { title: "A lien takes your stuff", text: "A lien is a claim against property. A levy is what actually seizes it." },
    { title: "Interest stops during a plan", text: "Penalties and interest keep accruing under an installment agreement (the failure-to-pay rate is just lower)." },
    { title: "CNC wipes the debt", text: "Currently not collectible only pauses collection. The debt, interest and refund offsets remain." },
    { title: "Any offer is fine", text: "An offer generally has to match the reasonable collection potential, with all returns filed." },
  ],
  sources: [
    { key: "payplan", section: "Payment plans; installment agreements" },
    { key: "oic", section: "Offer in compromise" },
    { key: "lien", section: "Understanding a federal tax lien" },
    { key: "levy", section: "What is a levy?" },
    { key: "p594", section: "The collection process" },
  ],
  cases: [
    {
      who: "Milo",
      title: "The $14,000 bill",
      facts: "Milo and Penny owe $14,000 in tax, penalties and interest. They've always filed on time and can pay $400 a month.",
      question: "Which plan fits best without a full financial statement?",
      choices: ["An offer in compromise", "Currently not collectible", "A streamlined installment agreement", "A Form 1127 extension"],
      answer: "A streamlined installment agreement",
      why: "Individuals who owe $50,000 or less combined can usually get a streamlined agreement, paying over up to 72 months, without a full financial statement.",
    },
    {
      who: "Hoot",
      title: "The magnet",
      facts: "Hoot wants to levy a taxpayer's bank account. The tax is assessed and a notice and demand went out, but no other notice has been sent.",
      question: "What must happen first?",
      choices: ["A Final Notice of Intent to Levy, at least 30 days before", "A Notice of Federal Tax Lien", "A Tax Court decision", "Nothing more"],
      answer: "A Final Notice of Intent to Levy, at least 30 days before",
      why: "Before most levies the IRS must send a Final Notice of Intent to Levy and Notice of Your Right to a Hearing at least 30 days ahead.",
    },
    {
      who: "Ace",
      title: "The hearing window",
      facts: "A client got a Final Notice of Intent to Levy 12 days ago and wants an independent review, with the right to go to Tax Court.",
      question: "What should Ace file?",
      choices: ["Form 656", "Form 911", "Form 9465", "Form 12153, within 30 days of the notice"],
      answer: "Form 12153, within 30 days of the notice",
      why: "A collection due process hearing is requested on Form 12153 within 30 days. It gives an Appeals hearing and Tax Court review.",
    },
    {
      who: "Penny",
      title: "The cinnamon roll offer",
      facts: "A client wants to offer $10,000 to settle a $40,000 debt in a lump sum. She doesn't qualify as low income.",
      question: "What does she send with Form 656?",
      choices: ["Nothing until it's accepted", "$205 and $2,000 (20% of the offer)", "$10,000", "$205 only"],
      answer: "$205 and $2,000 (20% of the offer)",
      why: "A lump-sum offer goes in with the $205 application fee and 20% of the offered amount.",
    },
    {
      who: "Lulu",
      title: "Not collectible",
      facts: "A client's account is in currently not collectible status. Next spring she's due a $600 refund.",
      question: "What happens to the refund?",
      choices: ["It's applied to the old debt", "She gets it in full", "It's held until the debt expires", "It's split in half"],
      answer: "It's applied to the old debt",
      why: "CNC pauses active collection, but the debt remains and refunds are offset against it.",
    },
  ],
  quizTopics: ["Installment agreements", "Offer in compromise", "Liens and levies", "Collection due process"],
  quizBrief: "Collections: short-term plans, guaranteed and streamlined installment agreements, offers in compromise (Form 656, $205, 20%), CNC, liens vs levies, final levy notice, CDP (Form 12153)",
};

export default lesson;

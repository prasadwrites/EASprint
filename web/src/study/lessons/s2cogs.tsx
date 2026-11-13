import { Ace, Backdrop, Biscuit, Cash, Hoot, Label, Milo, Penny, Rosa } from "../cast";
import { Crate, Gerald } from "../bakery";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 2.1: business income and cost of goods sold: gross receipts and Form 1099-K, the COGS
// formula, inventories and the small business taxpayer exceptions, cash and accrual methods, changing
// methods, and Form 8300 cash reporting. Written to Publications 334 and 538 and the IRS Form 8300 page
// for tax year 2025.

const tray = (
  <g transform="translate(0 -6)">
    <rect x={-22} y={-4} width={44} height={8} rx={2} fill="#b8c1cc" stroke="#17202c" strokeWidth={2} />
    {[-12, 0, 12].map((cx) => (
      <circle key={cx} cx={cx} cy={-9} r={6} fill="#d9a066" stroke="#17202c" strokeWidth={1.5} />
    ))}
  </g>
);

const comic: Lesson["comic"] = [
  {
    alt: "Milo counts rolls on a tray, eating one with each count. Rosa is horrified.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Milo x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={tray} />
        <Rosa x={240} y={128} scale={0.78} mood="shocked" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Year-end count! One for the books, one for me. One for the books...", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Rosa", text: "MILO! That's INVENTORY!", x: 60, y: 6, w: 34, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Ace holds a card with the cost of goods sold formula. Biscuit, covered in crumbs, sits beside Penny.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={70} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={110} y={88} w={104} h={68} lines={["start inventory", "+ purchases", "− end inventory"]} size={9} color="#fff" />
        <Penny x={262} y={128} scale={0.72} mood="smug" flip />
        <Biscuit x={220} y={194} scale={0.5} mood="happy" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Cost of goods sold: starting inventory, plus what you bought, minus what's left.", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Penny", text: "And what Biscuit ate?", x: 64, y: 6, w: 30, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa asks about catering money. Ace explains. Milo holds up a sign reading $31 million.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Rosa x={56} y={128} scale={0.72} mood="thinking" />
        <Ace x={160} y={128} scale={0.72} mood="happy" pose="point" />
        <Milo x={266} y={128} scale={0.68} mood="smug" flip pose="hold" holding={<Paper x={0} y={-8} label="$31M" sub="limit" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Is catering income when they PAY or when I DELIVER?", x: 3, y: 2, w: 32, tail: "down-left" },
      { who: "Ace", text: "On the cash method, when you're paid. Under $31 million in average receipts, you can use it.", x: 34, y: 2, w: 38, tail: "down" },
      { who: "Milo", text: "We're under. By about $30.8 million.", x: 74, y: 4, w: 24, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a stack of cash. Hoot pops out of a crate labeled cake.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Penny x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Cash x={0} y={-8} scale={1.2} />} />
        <Hoot x={236} y={86} scale={0.54} mood="excited" flip pose="up" />
        <Crate x={236} y={206} scale={1.05} label="CAKE" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "A bride just paid $12,000 CASH for a wedding cake!", x: 3, y: 2, w: 42, tail: "down-left", shout: true },
      { who: "Hoot", text: "Over $10,000 in cash? Form 8300 within 15 days!", x: 52, y: 2, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds a Form 1099-K and a tip jar. Ace nods.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" />
        <Rosa x={84} y={128} scale={0.78} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="1099-K" sub="card sales" color="#fff" />} />
        <Ace x={240} y={128} scale={0.78} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "The card app sent a 1099-K. But the cash sales had no form. Those don't count, right?", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Ace", text: "Every sale counts. Form or no form.", x: 62, y: 6, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds an empty tray. Rosa stares. Hoot and Gerald both look unimpressed.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Milo x={60} y={128} scale={0.72} mood="smug" pose="hold" holding={<rect x={-22} y={-10} width={44} height={8} rx={2} fill="#b8c1cc" stroke="#17202c" strokeWidth={2} />} />
        <Rosa x={160} y={128} scale={0.72} mood="stern" />
        <Gerald x={214} y={196} scale={0.9} mood="shocked" />
        <Hoot x={272} y={130} scale={0.56} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Ending inventory: ZERO. Cost of goods... eaten.", x: 3, y: 2, w: 36, tail: "down-left" },
      { who: "Rosa", text: "We had 200 rolls.", x: 38, y: 6, w: 26, tail: "down" },
      { who: "Hoot", text: "That is not an accounting method.", x: 70, y: 2, w: 28, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Gross receipts",
    alt: "All business income is reported, whether or not a form reports it. Card and app payments may come on Form 1099-K.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Paper x={56} y={84} label="1099-K" sub="card, app sales" scale={1.7} color="#fff" />
        <Card x={110} y={14} w={198} h={46} lines={["All income counts:", "cash, checks, cards, barter"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["1099-K for 2025: over $20,000", "and 200 transactions"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["No form? Still report it.", "Reconcile forms to books."]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "Gross receipts include all income the business takes in: cash, checks, card and app payments, and the fair market value of property or services received in barter. Income is reportable even if no information return was issued.",
      "Payment card companies and third-party settlement organizations report payments on Form 1099-K. For 2025, a third-party network reports only when payments exceed $20,000 and 200 transactions (card payments are reported regardless). A business should reconcile 1099-K totals to its books, since they include sales tax, tips and refunds that may need adjusting.",
    ],
    keyPoint: "Gross receipts: all income (cash, checks, cards, barter at FMV), reported with or without a form. 1099-K (2025): third-party networks report over $20,000 and 200 transactions; card payments always. Reconcile 1099-K to the books.",
  },
  {
    title: "Cost of goods sold",
    alt: "Beginning inventory plus purchases, labor, materials and other costs, minus ending inventory, equals cost of goods sold.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Card x={14} y={14} w={292} h={112} lines={["Beginning inventory", "+ purchases (less personal use)", "+ labor, materials, other costs", "− ending inventory", "= cost of goods sold"]} size={11} color="#fff" />
        <Label x={160} y={152} size={10} weight={700}>Gross receipts − COGS = gross profit</Label>
      </svg>
    ),
    body: [
      "A business that makes or buys goods to sell figures cost of goods sold (Schedule C Part III, Form 1125-A for other returns): beginning inventory, plus purchases (minus items withdrawn for personal use), plus cost of labor, materials and supplies, and other costs, minus ending inventory.",
      "Gross receipts minus returns and allowances, minus COGS, is gross profit. Ending inventory this year is next year's beginning inventory, so an error in the count shifts income between years.",
    ],
    keyPoint: "COGS = beginning inventory + purchases (− personal withdrawals) + labor + materials and supplies + other costs − ending inventory. Gross profit = net receipts − COGS. Ending inventory becomes next year's beginning inventory.",
  },
  {
    title: "Inventories, big and small",
    alt: "Small business taxpayers with average gross receipts of $31 million or less for 2025 can skip formal inventories and the uniform capitalization rules. Others value inventory at cost or lower of cost or market, using FIFO or LIFO.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Mark x={70} y={92} text="$31M" color="#1d7a49" size={36} />
        <Card x={140} y={14} w={168} h={46} lines={["Small business: skip", "inventories and UNICAP"]} size={10} color="#d8f0e2" />
        <Card x={140} y={66} w={168} h={46} lines={["Others: cost, or lower", "of cost or market"]} size={10} color="#fff" />
        <Card x={140} y={118} w={168} h={46} lines={["FIFO or LIFO", "(LIFO: Form 970)"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "A small business taxpayer, one whose average annual gross receipts for the prior 3 years are $31 million or less for 2025 (and isn't a tax shelter), can use the cash method, can treat inventory as non-incidental materials and supplies (deducted when used or consumed) or follow its books, and is exempt from the uniform capitalization (UNICAP) rules.",
      "Other businesses must keep inventories and value them at cost or the lower of cost or market. They identify which items were sold using specific identification, first-in first-out (FIFO), or last-in first-out (LIFO, adopted with Form 970).",
    ],
    keyPoint: "Small business taxpayer (avg gross receipts ≤ $31 million for 2025, not a tax shelter): cash method OK, may skip formal inventories (treat as non-incidental materials and supplies or follow books), exempt from UNICAP. Others: value at cost or LCM; FIFO, LIFO (Form 970) or specific ID.",
  },
  {
    title: "Cash or accrual",
    alt: "Cash method: income when received, expenses when paid. Accrual: income when earned and expenses when all events have occurred and economic performance happens. Changing methods takes Form 3115.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="Cash" sub="when paid" />
        <Step x={166} y={14} w={140} h={100} color="#fff3c4" label="Accrual" sub="when earned / owed" />
        <Label x={160} y={140} size={10} weight={700}>Change methods with Form 3115</Label>
        <Label x={160} y={158} size={10} weight={700}>(many changes are automatic)</Label>
      </svg>
    ),
    body: [
      "Under the cash method, income is reported when actually or constructively received and expenses are deducted when paid (prepaid expenses generally only if the benefit doesn't extend beyond 12 months or the end of the next year). Under the accrual method, income is reported when all events fix the right to receive it and the amount is reasonably determinable, and expenses when all events fix the liability and economic performance has occurred.",
      "C corporations and partnerships with a C corporation partner generally must use accrual unless they meet the small business gross receipts test; tax shelters can never use cash. A business may use different methods for separate businesses. To change methods, it generally files Form 3115; many changes get automatic consent.",
    ],
    keyPoint: "Cash: income when actually/constructively received; expenses when paid (12-month rule for prepaids). Accrual: all-events test + economic performance. C corps and partnerships with C-corp partners need accrual unless small business ($31M, 2025); tax shelters can't use cash. Change via Form 3115.",
  },
  {
    title: "Big cash: Form 8300",
    alt: "A business that receives more than $10,000 in cash in one transaction or related transactions files Form 8300 within 15 days and notifies the payer by January 31.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Mark x={70} y={92} text="$10K+" color="#a8321f" size={34} />
        <Card x={140} y={14} w={168} h={46} lines={["One payment, or related", "payments, over $10,000"]} size={10} color="#fff" />
        <Card x={140} y={66} w={168} h={46} lines={["Form 8300 within", "15 days"]} size={10} color="#fff3c4" />
        <Card x={140} y={118} w={168} h={46} lines={["Tell the payer in writing", "by January 31"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A business that receives more than $10,000 in cash in one transaction, or in two or more related transactions, must file Form 8300 within 15 days. Cash includes currency and, in some sales, cashier's checks, bank drafts and money orders of $10,000 or less. Related transactions are those within 24 hours, or connected ones over a longer period.",
      "The business must give the payer a written statement by January 31 of the following year and keep a copy of the form for 5 years. Businesses required to e-file other information returns must e-file Form 8300. Structuring payments to avoid the report is illegal.",
    ],
    keyPoint: "Form 8300: cash over $10,000 in one or related transactions (within 24 hours, or connected) → file within 15 days; written notice to payer by Jan 31; keep 5 years. Cash can include cashier's checks/money orders of $10,000 or less in designated sales. E-file if required for other info returns.",
  },
];

const lesson: Lesson = {
  id: "p2-business-income",
  part: "part2",
  domainId: "p2d2",
  number: "2.1",
  episode: "Cost of Goods Eaten",
  title: "Business income and cost of goods sold",
  minutes: 13,
  lawAsOf: "tax year 2025",
  intro: "What counts as gross receipts, Form 1099-K, the cost of goods sold formula, inventories and the small business exceptions, cash and accrual methods, and reporting big cash payments on Form 8300.",
  previously: "Rosa's Rolls is a partnership for 2025, with S status coming in 2026. Now it's year end, and somebody has to count the rolls.",
  comic,
  cards,
  hook: {
    line: "Start + bought − left = sold. Over $10,000 cash? 15 days.",
    more: "Cash method if average receipts are $31 million or less (2025). All income counts, form or no form. Form 3115 to change methods.",
    alt: "A crate of rolls and the numbers 15 and $10K.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Crate x={70} y={108} scale={0.9} label="ROLLS" />
        <Mark x={180} y={74} text="$10K" color="#a8321f" size={30} />
        <Mark x={266} y={74} text="15d" color="#1d7a49" size={30} />
      </svg>
    ),
  },
  traps: [
    { title: "No 1099, no income", text: "All business income is taxable, whether or not a form reports it." },
    { title: "Form 8300 is for single payments only", text: "Related payments that together exceed $10,000 count too." },
    { title: "Every business keeps inventories", text: "Small business taxpayers ($31 million average receipts for 2025) can skip formal inventories and UNICAP." },
    { title: "Switch methods anytime", text: "Changing an accounting method generally needs Form 3115." },
  ],
  sources: [
    { key: "p334", section: "Gross receipts and cost of goods sold" },
    { key: "p538", section: "Accounting methods and inventories" },
    { key: "f8300", section: "Form 8300" },
  ],
  cases: [
    {
      who: "Rosa",
      title: "The year-end count",
      facts: "Rosa's Rolls started 2025 with $4,000 of inventory, bought $60,000 of ingredients and supplies for resale, and ended the year with $3,000 of inventory.",
      question: "What's the cost of goods sold?",
      choices: ["$60,000", "$61,000", "$67,000", "$59,000"],
      answer: "$61,000",
      why: "COGS = $4,000 + $60,000 − $3,000 = $61,000.",
    },
    {
      who: "Penny",
      title: "The cake money",
      facts: "A customer pays a bakery $6,000 cash on Monday and $6,000 cash on Tuesday for one wedding order.",
      question: "What must the bakery do?",
      choices: ["Nothing: each payment is under $10,000", "File Form 8300 within 15 days", "File Form 8300 by January 31", "Report it on Form 1099-K"],
      answer: "File Form 8300 within 15 days",
      why: "Related cash payments that total more than $10,000 trigger Form 8300, due within 15 days of the payment that pushes the total over $10,000.",
    },
    {
      who: "Ace",
      title: "Can we use cash?",
      facts: "A bakery partnership (all individual partners) had average annual gross receipts of $2 million over the past 3 years and isn't a tax shelter.",
      question: "Which is true for 2025?",
      choices: ["It must use accrual", "It can use the cash method and skip formal inventories", "It must use LIFO", "It must apply UNICAP"],
      answer: "It can use the cash method and skip formal inventories",
      why: "As a small business taxpayer (average receipts of $31 million or less for 2025), it can use the cash method, skip formal inventories and avoid UNICAP.",
    },
    {
      who: "Milo",
      title: "The app sales",
      facts: "Milo's dog walking brought in $9,000 through a payment app (no 1099-K issued) and $2,000 in cash.",
      question: "How much gross income does he report?",
      choices: ["$0", "$2,000", "$11,000", "$9,000"],
      answer: "$11,000",
      why: "All business income is reported, whether or not an information return was issued.",
    },
  ],
  quizTopics: ["Accounting methods", "Cash reporting"],
  quizBrief: "Business income and COGS: gross receipts, Form 1099-K, the COGS formula, inventories, the small business taxpayer test ($31 million for 2025), cash vs accrual, Form 3115, Form 8300",
};

export default lesson;

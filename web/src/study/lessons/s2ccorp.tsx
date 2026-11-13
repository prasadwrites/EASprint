import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny, StockCert } from "../cast";
import { Van } from "../bakery";
import type { Lesson } from "../lesson";
import { Doghouse } from "../office";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 1.3: C corporations: forming under §351, the 21% tax and Form 1120, the dividends-received
// deduction, earnings and profits and distributions, the accumulated earnings tax, controlled groups and
// liquidations. Written to Publication 542 and the Form 1120 instructions for tax year 2025.

const comic: Lesson["comic"] = [
  {
    alt: "Milo proudly holds a stock certificate. Penny looks at Biscuit, who wags.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Milo x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<StockCert x={0} y={-8} scale={0.7} />} />
        <Penny x={236} y={128} scale={0.76} mood="smug" flip />
        <Biscuit x={170} y={192} scale={0.6} mood="happy" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Milo's Mutts is now a CORPORATION! I'm CEO, CFO and Chief Walker.", x: 3, y: 2, w: 46, tail: "down-left", shout: true },
      { who: "Penny", text: "You have one client. It's our dog.", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at Milo's dog-walking van. Milo hugs a stack of leashes.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={60} y={128} scale={0.72} mood="happy" pose="point" />
        <Van x={170} y={204} scale={0.7} text="MILO'S MUTTS" />
        <Milo x={274} y={128} scale={0.7} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "You put in your van for 100% of the stock. Tax-free under section 351: you have 80% control.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Milo", text: "I love Section 351. Who is he?", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu waves a stock certificate. Hoot pops his head out of Biscuit's doghouse.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Lulu x={84} y={160} scale={0.56} mood="excited" pose="hold" holding={<StockCert x={0} y={-6} scale={0.55} />} />
        <Hoot x={236} y={94} scale={0.46} mood="stern" flip />
        <Doghouse x={236} y={200} scale={1} />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "Milo gave me 10 shares for being Vice President of Treats!", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Hoot", text: "Stock for services is taxable income, young lady.", x: 52, y: 2, w: 40, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds a sign reading 21% and then a second arrow labeled dividends. Milo clutches his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Ace x={70} y={128} scale={0.76} mood="stern" pose="point" />
        <Card x={112} y={92} w={96} h={60} lines={["corp: 21%", "then you:", "dividends"]} size={10} color="#fff" />
        <Milo x={258} y={128} scale={0.76} mood="shocked" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "The corporation pays a flat 21%. Then you pay tax again on dividends.", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Milo", text: "DOUBLE taxation?! I was told there'd be a yacht.", x: 56, y: 2, w: 40, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Milo hugs a piggy bank. Hoot points at it sternly, then looks at a tiny number.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Milo x={60} y={128} scale={0.72} mood="smug" pose="hold" holding={<Paper x={0} y={-8} label="SAVINGS" sub="$340" color="#fde2e4" />} />
        <Hoot x={170} y={130} scale={0.6} mood="stern" flip pose="point" />
        <Penny x={268} y={128} scale={0.7} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "I'll keep ALL the profits in the company. Forever!", x: 3, y: 2, w: 34, tail: "down-left" },
      { who: "Hoot", text: "Accumulated earnings tax! 20% on hoarding past $250,000!", x: 36, y: 2, w: 34, tail: "down" },
      { who: "Penny", text: "He's saved $340.", x: 74, y: 6, w: 24, tail: "down-right" },
    ],
  },
  {
    alt: "Milo hugs the van. Ace holds a liquidation notice. Penny holds up one finger. Biscuit sits on the van's roof.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Van x={100} y={204} scale={0.74} text="MILO'S MUTTS" />
        <Biscuit x={86} y={134} scale={0.42} mood="sleepy" />
        <Ace x={208} y={128} scale={0.68} mood="thinking" flip pose="hold" holding={<Paper x={0} y={-8} label="LIQUIDATE" color="#fff" />} />
        <Penny x={282} y={128} scale={0.62} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Liquidating? The corporation is treated as selling the van at its fair market value.", x: 24, y: 2, w: 44, tail: "down-right" },
      { who: "Penny", text: "Shortest corporation in Ledger Falls history.", x: 72, y: 4, w: 26, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Forming a corporation",
    alt: "Transferring property for stock is tax-free if the transferors own at least 80% right after. Boot is taxable. Stock received for services is income.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Mark x={70} y={92} text="80%" color="#1d7a49" size={44} />
        <Card x={140} y={14} w={168} h={46} lines={["Property for stock:", "no gain if in control"]} size={10} color="#d8f0e2" />
        <Card x={140} y={66} w={168} h={46} lines={["Boot (cash, other", "property): gain up to it"]} size={10} color="#fff3c4" />
        <Card x={140} y={118} w={168} h={46} lines={["Stock for services:", "ordinary income"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Under section 351, no gain or loss is recognized when people transfer property to a corporation solely for its stock and, immediately afterward, the transferors together control the corporation: at least 80% of the total voting power and 80% of each other class of stock.",
      "If the transferor also receives money or other property (boot), gain is recognized up to the boot. The shareholder's basis in the stock equals the basis of the property transferred, plus gain recognized, minus boot received; the corporation takes the transferor's basis plus gain recognized. Someone who receives stock for services has ordinary income equal to its fair market value.",
    ],
    keyPoint: "§351: property for stock, transferors with ≥ 80% control right after → no gain or loss. Boot triggers gain up to the boot. Stock basis = property basis + gain − boot. Stock for services = ordinary income at FMV.",
  },
  {
    title: "The corporate tax",
    alt: "A C corporation files Form 1120 and pays a flat 21% tax. Capital losses only offset capital gains. Charitable deductions are limited to 10% of taxable income.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Mark x={70} y={92} text="21%" color="#a8321f" size={48} />
        <Card x={140} y={14} w={168} h={46} lines={["Form 1120: 15th day of", "the 4th month"]} size={10} color="#fff" />
        <Card x={140} y={66} w={168} h={46} lines={["Capital losses: only vs", "gains; back 3, ahead 5"]} size={10} color="#fff3c4" />
        <Card x={140} y={118} w={168} h={46} lines={["Charity: up to 10%", "of taxable income"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A C corporation files Form 1120, due the 15th day of the 4th month after year end (April 15 for a calendar year), with a 6-month extension on Form 7004. It pays a flat 21% tax and makes estimated payments if it expects to owe $500 or more.",
      "A corporation's capital losses can only offset capital gains; net capital losses are carried back 3 years and forward 5 years as short-term losses. For 2025, its charitable contribution deduction is limited to 10% of taxable income (computed before certain items), with a 5-year carryforward. Dividends paid to shareholders aren't deductible, which is why corporate income is taxed twice.",
    ],
    keyPoint: "C corp: Form 1120 due the 15th day of the 4th month (Form 7004 for 6 more months); flat 21%; estimated tax if $500+. Capital losses offset only capital gains (back 3, forward 5). Charitable deduction capped at 10% of taxable income for 2025, 5-year carryforward. Dividends paid aren't deductible.",
  },
  {
    title: "Dividends-received deduction",
    alt: "A corporation that receives dividends from another domestic corporation deducts 50%, 65% or 100%, depending on how much it owns.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={94} h={110} color="#fff" label="50%" sub="own < 20%" />
        <Step x={113} y={14} w={94} h={110} color="#fff3c4" label="65%" sub="own 20% to < 80%" />
        <Step x={212} y={14} w={94} h={110} color="#d8f0e2" label="100%" sub="affiliated, 80%+" />
        <Label x={160} y={150} size={10} weight={700}>For corporate shareholders only</Label>
      </svg>
    ),
    body: [
      "To ease triple taxation, a C corporation that receives dividends from a domestic corporation can deduct a percentage of them: 50% if it owns less than 20% of the payer, 65% if it owns 20% or more but less than 80%, and 100% for dividends from members of its affiliated group (generally 80% or more).",
      "The 50% and 65% deductions can be limited to that percentage of taxable income (computed without the deduction) unless the deduction creates or increases a net operating loss. The stock must be held more than 45 days. Individuals and S corporations don't get this deduction.",
    ],
    keyPoint: "DRD (corporate shareholders only): 50% if < 20% owned; 65% if 20% to < 80%; 100% for affiliated (80%+). 50%/65% limited to that % of taxable income unless an NOL results. 45-day holding period.",
  },
  {
    title: "Earnings and profits and distributions",
    alt: "A distribution is a dividend to the extent of earnings and profits, then a tax-free return of stock basis, then capital gain.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={14} w={94} h={110} color="#fde2e4" label="1 Dividend" sub="up to E&P" />
        <Step x={113} y={14} w={94} h={110} color="#d8f0e2" label="2 Basis" sub="tax-free" />
        <Step x={212} y={14} w={94} h={110} color="#fff3c4" label="3 Gain" sub="capital" />
        <Label x={160} y={150} size={10} weight={700}>Current E&P first, then accumulated</Label>
      </svg>
    ),
    body: [
      "Earnings and profits (E&P) measure a corporation's ability to pay dividends. A distribution is a dividend to the extent of current-year E&P, then accumulated E&P. Any excess is a tax-free return of the shareholder's stock basis, and anything beyond basis is capital gain.",
      "When a corporation distributes appreciated property, it recognizes gain as if it sold the property at fair market value; the shareholder's distribution is the property's fair market value, and that becomes the shareholder's basis. Qualified dividends are taxed to individuals at 0%, 15% or 20%.",
    ],
    keyPoint: "Distributions: dividend to the extent of current then accumulated E&P → return of stock basis → capital gain. Appreciated property distributed: corporation recognizes gain at FMV; shareholder's basis = FMV. Qualified dividends: 0/15/20% to individuals.",
  },
  {
    title: "Hoarding, groups and endings",
    alt: "The accumulated earnings tax is 20% of accumulated taxable income beyond reasonable needs, after a $250,000 credit. Controlled groups share certain limits. In a liquidation, the corporation and shareholders both recognize gain.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={14} w={94} h={110} color="#fde2e4" label="AET 20%" sub="over $250,000" />
        <Step x={113} y={14} w={94} h={110} color="#fff3c4" label="Group" sub="shared limits" />
        <Step x={212} y={14} w={94} h={110} color="#d4ebfa" label="Liquidate" sub="gain twice" />
        <Label x={160} y={150} size={10} weight={700}>$150,000 credit for service corporations</Label>
      </svg>
    ),
    body: [
      "The accumulated earnings tax is a 20% penalty tax on a corporation's accumulated taxable income when it keeps earnings beyond the reasonable needs of the business to avoid shareholder tax. A minimum credit lets most corporations accumulate $250,000 ($150,000 for personal service corporations such as accounting or health firms) without question.",
      "Corporations in a controlled group (parent-subsidiary at 80%, or brother-sister groups with common owners) share certain limits, such as the accumulated earnings credit and the section 179 limit. In a complete liquidation, the corporation recognizes gain or loss as if it sold its assets at fair market value, and shareholders have capital gain or loss on their stock; an 80% parent liquidating a subsidiary generally recognizes no gain.",
    ],
    keyPoint: "AET: 20% on accumulated taxable income beyond reasonable needs; credit $250,000 ($150,000 for PSCs). Controlled groups share limits (AET credit, §179). Liquidation: corporation taxed as if it sold assets at FMV; shareholders capital gain/loss; 80% parent–subsidiary liquidation generally tax-free.",
  },
];

const lesson: Lesson = {
  id: "p2-c-corporations",
  part: "part2",
  domainId: "p2d1",
  number: "1.3",
  episode: "Milo's Mutts, Incorporated",
  title: "C corporations",
  minutes: 14,
  lawAsOf: "tax year 2025",
  intro: "Forming a corporation tax-free, the flat 21% tax and Form 1120, the dividends-received deduction, earnings and profits, the accumulated earnings tax, controlled groups and liquidations.",
  previously: "Rosa decided against a yacht, but Milo heard the word \"corporation\" and hasn't stopped saying it.",
  comic,
  cards,
  hook: {
    line: "80% to form. 21% to pay. Dividends taxed twice.",
    more: "DRD 50/65/100. Distributions: E&P, then basis, then gain. AET 20% past $250,000. Liquidation: corporation and shareholders both recognize gain.",
    alt: "Milo's van beside the numbers 80 and 21.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e7e3f3" />
        <Van x={80} y={110} scale={0.62} text="MUTTS INC" />
        <Mark x={190} y={74} text="80" color="#1d7a49" size={36} />
        <Mark x={262} y={74} text="21%" color="#a8321f" size={32} />
      </svg>
    ),
  },
  traps: [
    { title: "Stock for services is tax-free", text: "Section 351 covers property. Stock received for services is ordinary income." },
    { title: "Individuals get the DRD", text: "Only corporate shareholders get the dividends-received deduction." },
    { title: "Every distribution is a dividend", text: "Only up to earnings and profits; then it's a return of basis, then capital gain." },
    { title: "Corporations net capital losses against ordinary income", text: "A C corporation's capital losses only offset capital gains (back 3, forward 5)." },
  ],
  sources: [
    { key: "p542", section: "Corporations" },
    { key: "i1120", section: "Form 1120 instructions" },
  ],
  cases: [
    {
      who: "Milo",
      title: "The van for stock",
      facts: "Milo transfers his van (basis $8,000, value $15,000) to a new corporation for 100% of its stock. He receives nothing else.",
      question: "What's Milo's basis in the stock?",
      choices: ["$15,000", "$8,000", "$7,000", "$0"],
      answer: "$8,000",
      why: "Under §351 no gain is recognized, so the stock's basis equals the van's basis: $8,000.",
    },
    {
      who: "Penny",
      title: "The corporate shareholder",
      facts: "A C corporation owns 30% of another domestic corporation and receives $10,000 of dividends from it. The taxable income limit doesn't apply.",
      question: "What's the dividends-received deduction?",
      choices: ["$5,000", "$10,000", "$0", "$6,500"],
      answer: "$6,500",
      why: "Owning 20% to less than 80% gives a 65% deduction: 65% × $10,000 = $6,500.",
    },
    {
      who: "Ace",
      title: "Three layers",
      facts: "A corporation with $10,000 of E&P (current and accumulated) distributes $15,000 cash to its sole shareholder, whose stock basis is $3,000.",
      question: "How is the $15,000 treated?",
      choices: ["$10,000 dividend, $3,000 return of basis, $2,000 capital gain", "$15,000 dividend", "$10,000 dividend, $5,000 return of basis", "$12,000 capital gain"],
      answer: "$10,000 dividend, $3,000 return of basis, $2,000 capital gain",
      why: "A distribution is a dividend up to E&P ($10,000), then a tax-free return of basis ($3,000), and the rest ($2,000) is capital gain.",
    },
    {
      who: "Lulu",
      title: "Vice President of Treats",
      facts: "A corporation gives a person 10 shares worth $500 for consulting services. She contributes no property.",
      question: "What does she report?",
      choices: ["Nothing until she sells", "$500 of ordinary income", "$500 of capital gain", "A $500 loss"],
      answer: "$500 of ordinary income",
      why: "Stock received for services is ordinary income at its fair market value. Section 351 covers transfers of property, not services.",
    },
    {
      who: "Hoot",
      title: "The hoarder",
      facts: "A manufacturing C corporation (not a service corporation) has accumulated earnings well beyond its business needs.",
      question: "What's the accumulated earnings tax rate, and the minimum credit?",
      choices: ["21% and $250,000", "20% and $250,000", "20% and $150,000", "37% and none"],
      answer: "20% and $250,000",
      why: "The accumulated earnings tax is 20%, and most corporations get a $250,000 minimum credit ($150,000 for personal service corporations).",
    },
  ],
  quizTopics: ["Corporate tax", "Dividends-received deduction", "Forming a corporation", "Stock for services", "Accumulated earnings tax"],
  quizBrief: "C corporations: section 351, boot, stock for services, 21% rate and Form 1120, capital losses, DRD (50/65/100%), E&P and distributions, accumulated earnings tax, controlled groups, liquidation",
};

export default lesson;

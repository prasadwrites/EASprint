import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Penny, Rosa, WaltPortrait } from "../cast";
import { Crate } from "../bakery";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, Envelope, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 3.1: trusts and estates: who files Form 1041, exemptions and the compressed 2025 brackets,
// simple, complex and grantor trusts, distributable net income and the K-1, income in respect of a
// decedent, and the 65-day election. Written to the Form 1041 instructions and Publication 559 for 2025.

const comic: Lesson["comic"] = [
  {
    alt: "Grandpa Walt's portrait glares at a pile of envelopes. Penny holds one up.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <WaltPortrait x={30} y={70} scale={1.05} mood="shocked" />
        <Envelope x={128} y={186} label="1099" rotate={-10} />
        <Envelope x={160} y={196} label="1099" rotate={8} />
        <Penny x={256} y={128} scale={0.76} mood="worried" flip pose="hold" holding={<Paper x={0} y={-8} label="DIV" sub="Walt's estate" />} />
      </svg>
    ),
    bubbles: [
      { who: "Walt", text: "I've been gone four months and I'm STILL getting tax forms?", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Penny", text: "Your estate is its own taxpayer now, Grandpa. It even has an EIN.", x: 56, y: 2, w: 41, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds up Form 1041. Rosa looks impressed.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="1041" sub="$600+ gross" color="#fff3c4" />} />
        <Rosa x={248} y={128} scale={0.76} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "An estate with $600 or more of gross income files Form 1041. It gets a $600 exemption.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Rosa", text: "My brother, a taxpayer forever. He'd be thrilled.", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of a crate labeled ESTATE. Walt's portrait is outraged.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Hoot x={84} y={92} scale={0.52} mood="smug" pose="up" />
        <Crate x={84} y={206} scale={1.05} label="ESTATE" />
        <WaltPortrait x={196} y={70} scale={1.05} mood="shocked" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Estate and trust brackets are compressed: 37% on income over $15,650.", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Walt", text: "Fifteen THOUSAND? I didn't hit 37% once in my LIFE!", x: 58, y: 4, w: 39, tail: "down-right" },
    ],
  },
  {
    alt: "Penny points at a card showing income flowing from the estate to Rosa on a K-1. Rosa smiles.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={90} w={108} h={66} lines={["Estate pays out", "→ deduction (DNI)", "→ Rosa's K-1"]} size={9.5} color="#fff" />
        <Rosa x={262} y={128} scale={0.76} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "If the estate pays the income to you, it deducts it and you report it from a K-1. At YOUR rate.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Rosa", text: "My bracket is cheaper than Walt's? Pay me!", x: 64, y: 6, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at a calendar showing 65 days. Lulu nods solemnly.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Calendar x={160} y={96} month="DAYS" day="65" scale={0.72} color="#1d7a49" />
        <Lulu x={270} y={160} scale={0.56} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Distributions in the first 65 days of 2026 can be treated as paid in 2025, by election.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Lulu", text: "Science project, day 65. I relate.", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Walt's portrait points sternly at Penny. Biscuit howls along.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <WaltPortrait x={30} y={70} scale={1.05} mood="stern" />
        <Biscuit x={160} y={190} scale={0.56} mood="excited" />
        <Penny x={256} y={128} scale={0.76} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Walt", text: "File it by April 15, Penny. I'm watching you.", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Penny", text: "Grandpa, you're a painting.", x: 62, y: 6, w: 34, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Who files Form 1041",
    alt: "An estate files Form 1041 with $600 or more of gross income. A trust files with any taxable income or $600 or more of gross income. The return is due the 15th day of the 4th month after year end.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <Step x={14} y={14} w={140} h={100} color="#fff" label="Estate" sub="$600+ gross income" />
        <Step x={166} y={14} w={140} h={100} color="#fff3c4" label="Trust" sub="any taxable or $600+" />
        <Label x={160} y={140} size={10} weight={700}>Due 15th day of 4th month after year end</Label>
        <Label x={160} y={158} size={10} weight={700}>Estates may pick a fiscal year · trusts: calendar</Label>
      </svg>
    ),
    body: [
      "A decedent's estate files Form 1041 if it has gross income of $600 or more for the year, or a beneficiary is a nonresident alien. A trust files if it has any taxable income, gross income of $600 or more, or a nonresident alien beneficiary. The fiduciary gets an EIN for the estate or trust and can notify the IRS of the relationship on Form 56.",
      "The return is due the 15th day of the 4th month after the tax year ends (April 15 for a calendar year). An estate can choose a fiscal year ending on the last day of any month, as long as the first year isn't longer than 12 months; most trusts must use a calendar year. Estates and trusts generally pay estimated tax, but an estate is exempt for its first 2 years.",
    ],
    keyPoint: "Form 1041: estate with gross income ≥ $600 (or NRA beneficiary); trust with any taxable income, gross income ≥ $600, or NRA beneficiary. EIN; Form 56. Due 15th day of 4th month (Apr 15, calendar). Estates may choose a fiscal year; trusts generally calendar. Estimated tax required, except an estate's first 2 years.",
  },
  {
    title: "Exemptions and brackets",
    alt: "The exemption is $600 for an estate, $300 for a simple trust and $100 for a complex trust. The 2025 brackets reach 37% at $15,650.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="$600" sub="estate" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="$300" sub="simple trust" />
        <Step x={214} y={14} w={96} h={100} color="#fff3c4" label="$100" sub="complex trust" />
        <Label x={160} y={146} size={10} weight={700}>37% over $15,650 (2025) · NIIT starts there too</Label>
      </svg>
    ),
    body: [
      "Estates and trusts don't get a standard deduction. Instead, an estate deducts a $600 exemption, a simple trust (one required to distribute all its income) $300, and a complex trust $100 (qualified disability trusts get more).",
      "The brackets are compressed. For 2025, the 37% rate applies to taxable income over $15,650, and the 3.8% net investment income tax applies to undistributed net investment income over that same amount. Long-term capital gains and qualified dividends get 0% up to $3,250, 15% up to $15,900, and 20% above.",
    ],
    table: {
      head: ["2025 taxable income", "Rate"],
      rows: [
        ["$0 to $3,150", "10%"],
        ["$3,150 to $11,450", "24%"],
        ["$11,450 to $15,650", "35%"],
        ["Over $15,650", "37%"],
      ],
    },
    keyPoint: "Exemptions: estate $600; simple trust $300; complex trust $100. No standard deduction. 2025 brackets: 10% to $3,150, 24% to $11,450, 35% to $15,650, 37% above. NIIT 3.8% on undistributed NII over $15,650. LTCG 0% to $3,250, 15% to $15,900, 20% above.",
  },
  {
    title: "Simple, complex and grantor trusts",
    alt: "A simple trust must distribute all income, makes no charitable gifts and distributes no principal. Any other trust is complex. A grantor trust's income is taxed to the grantor.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={10} y={14} w={96} h={110} lines={["SIMPLE", "pays out all", "income; no", "charity or", "principal"]} size={9.5} color="#d8f0e2" />
        <Card x={112} y={14} w={96} h={110} lines={["COMPLEX", "can keep", "income, give", "to charity or", "pay principal"]} size={9.5} color="#fff3c4" />
        <Card x={214} y={14} w={96} h={110} lines={["GRANTOR", "grantor keeps", "control; taxed", "to grantor"]} size={9.5} color="#fde2e4" />
        <Label x={160} y={152} size={10} weight={700}>Revocable living trust = grantor trust</Label>
      </svg>
    ),
    body: [
      "A simple trust must distribute all of its income currently, makes no charitable contributions, and doesn't distribute principal in the year. Any trust that doesn't meet all three tests for a year is a complex trust for that year.",
      "A grantor trust is one where the grantor keeps certain powers or interests (a revocable living trust is the common example). Its income is taxed to the grantor as if the trust didn't exist. After the grantor dies, a revocable trust becomes irrevocable, and the trustee and executor can elect under section 645 to treat it as part of the estate.",
    ],
    keyPoint: "Simple trust: must distribute all income currently, no charitable contributions, no principal distributions ($300 exemption). Otherwise complex ($100). Grantor trust (e.g., revocable living trust): income taxed to the grantor. After death: §645 election lets a qualified revocable trust be treated as part of the estate.",
  },
  {
    title: "DNI and the K-1",
    alt: "Distributable net income caps the distribution deduction and the amount beneficiaries report. Beneficiaries receive a Schedule K-1 and keep the income's character.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f1fb" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="Income" sub="estate or trust" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="DNI" sub="the cap" />
        <Step x={214} y={14} w={96} h={100} color="#fff3c4" label="K-1" sub="beneficiary pays" />
        <Label x={160} y={140} size={10} weight={700}>Deduction = lesser of distributions or DNI</Label>
        <Label x={160} y={158} size={10} weight={700}>Character carries out: interest stays interest</Label>
      </svg>
    ),
    body: [
      "Estates and trusts are taxed only on income they keep. Income distributed (or required to be distributed) to beneficiaries is deducted by the entity and reported by the beneficiaries. Distributable net income (DNI) caps both: the distribution deduction is the lesser of the amount distributed or DNI, and beneficiaries report no more than DNI in total. Capital gains are usually allocated to principal and stay out of DNI.",
      "Each beneficiary gets a Schedule K-1 (Form 1041) showing their share, and the income keeps its character: interest stays interest, qualified dividends stay qualified dividends. In the final year, excess deductions and unused capital loss and NOL carryovers pass to the beneficiaries.",
    ],
    keyPoint: "Estates and trusts are conduits: taxed on retained income; distributions deducted (lesser of amount distributed or DNI) and taxed to beneficiaries via K-1 (Form 1041). Character retained. Capital gains usually allocated to corpus (not in DNI). Final year: excess deductions and carryovers pass to beneficiaries.",
  },
  {
    title: "IRD and the 65-day election",
    alt: "Income the decedent earned but didn't receive before death is income in respect of a decedent, taxed to whoever receives it. Trusts and estates can elect to treat distributions in the first 65 days of a year as made in the prior year.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={14} w={140} h={100} color="#fde2e4" label="IRD" sub="no step-up" />
        <Step x={166} y={14} w={140} h={100} color="#d8f0e2" label="65 days" sub="count last year" />
        <Label x={160} y={140} size={10} weight={700}>IRD: last paycheck, IRA, unpaid sales</Label>
        <Label x={160} y={158} size={10} weight={700}>Recipient may deduct estate tax paid on IRD</Label>
      </svg>
    ),
    body: [
      "Income in respect of a decedent (IRD) is income the decedent earned or had a right to but hadn't received at death: a final paycheck paid after death, IRA and retirement plan balances, accrued interest, and installment payments. It's taxed to whoever receives it (the estate or a beneficiary) with the same character it would have had for the decedent, and it doesn't get a stepped-up basis. If estate tax was paid on it, the recipient can take a deduction for that estate tax.",
      "Under section 663(b), the fiduciary of a trust or an estate can elect to treat distributions made in the first 65 days of a tax year as made on the last day of the prior year. That lets the fiduciary decide how much income to push out to beneficiaries after seeing the year's numbers.",
    ],
    keyPoint: "IRD: income earned but not received before death (final wages, IRA/retirement balances, accrued interest, installment payments); taxed to the recipient with the decedent's character; no step-up; §691(c) deduction for estate tax on IRD. §663(b) 65-day election: distributions in the first 65 days treated as made in the prior year.",
  },
];

const lesson: Lesson = {
  id: "p2-trusts-estates",
  part: "part2",
  domainId: "p2d3",
  number: "3.1",
  episode: "Grandpa Walt Gets Mail",
  title: "Trusts and estates",
  minutes: 15,
  lawAsOf: "tax year 2025",
  intro: "When an estate or trust files Form 1041, the exemptions and compressed 2025 brackets, simple, complex and grantor trusts, DNI and the K-1, IRD, and the 65-day election.",
  previously: "Rosa's Rolls is an S corporation as of January 1, 2026. Meanwhile, Penny, as Grandpa Walt's executor, has a pile of mail addressed to a man who isn't here.",
  comic,
  cards,
  hook: {
    line: "Distribute it, deduct it, K-1 it.",
    more: "1041 at $600 gross (estate). Exemptions $600 / $300 / $100. 37% over $15,650 for 2025. Deduction = lesser of distributions or DNI. 65-day election. IRD gets no step-up.",
    alt: "Walt's portrait next to 1041 and $600.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#f3e1ef" />
        <WaltPortrait x={28} y={14} scale={1} mood="happy" />
        <Mark x={180} y={74} text="1041" color="#a8321f" size={32} />
        <Mark x={268} y={74} text="$600" color="#1d7a49" size={30} />
      </svg>
    ),
  },
  traps: [
    { title: "Estates take a standard deduction", text: "No standard deduction: estates get a $600 exemption, simple trusts $300, complex trusts $100." },
    { title: "Every trust uses $600", text: "$600 is the estate exemption and the filing trigger, not the trust exemption." },
    { title: "IRD gets a stepped-up basis", text: "IRD keeps the decedent's character and gets no step-up." },
    { title: "The beneficiary owes nothing on a distribution", text: "Distributions carry out DNI; the beneficiary reports it from the K-1." },
  ],
  sources: [
    { key: "i1041", section: "Form 1041 instructions" },
    { key: "p559", section: "Survivors, executors and administrators" },
  ],
  cases: [
    {
      who: "Penny",
      title: "A small estate",
      facts: "An estate has $450 of interest income and no other income for its first tax year. All beneficiaries are U.S. citizens.",
      question: "Must the executor file Form 1041?",
      choices: ["Yes", "No", "Only if it distributes income", "Only if it has a fiscal year"],
      answer: "No",
      why: "An estate files Form 1041 if its gross income is $600 or more (or a beneficiary is a nonresident alien). $450 is under the threshold.",
    },
    {
      who: "Hoot",
      title: "Keeping the money",
      facts: "A trust can accumulate income and made a charitable gift this year.",
      question: "What is its exemption?",
      choices: ["$600", "$300", "$100", "$0"],
      answer: "$100",
      why: "A trust that can accumulate income or makes charitable contributions is a complex trust, with a $100 exemption.",
    },
    {
      who: "Rosa",
      title: "Passing it out",
      facts: "An estate earns $10,000 of interest in 2025 and distributes $10,000 to its beneficiary. DNI is $10,000.",
      question: "Who pays tax on the interest?",
      choices: ["The estate", "Nobody; estates are exempt", "Split 50/50", "The beneficiary, from a K-1"],
      answer: "The beneficiary, from a K-1",
      why: "The estate deducts the distribution (up to DNI), and the beneficiary reports the $10,000 as interest from Schedule K-1.",
    },
    {
      who: "Ace",
      title: "Late in February",
      facts: "A calendar-year complex trust distributes cash to a beneficiary on February 20, 2026.",
      question: "Can the distribution be treated as made in 2025?",
      choices: ["Yes, if the trustee elects", "No, never", "Only for estates", "Only if it's under $600"],
      answer: "Yes, if the trustee elects",
      why: "Under the 65-day rule, a trust or estate can elect to treat distributions in the first 65 days of the year as made in the prior year.",
    },
  ],
  quizTopics: ["Trust exemption", "Estate income tax"],
  quizBrief: "Trusts and estates: Form 1041 filing ($600), exemptions ($600, $300, $100), 2025 compressed brackets, simple, complex and grantor trusts, DNI and K-1, IRD, 65-day election",
};

export default lesson;

import { Ace, Arrow, Backdrop, Hoot, Label, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Bank, Burst, Card, CARD, Confetti, Envelope, HOOK, Mark, PANEL, Paper, Stamp, Step } from "../props";

// Part 1, topic 2.1: everyday income. Written to the rules for tax year 2025 from Publications 17, 525,
// 550 and 4681 and the IRS page on the 2025 deductions for tips and overtime.

const INK = "#17202c";

/** A shiny electric bike, the raffle prize. (x, y) is the middle of the frame. */
function EBike({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx={-30} cy={14} r={18} fill="none" stroke={INK} strokeWidth={4} />
      <circle cx={30} cy={14} r={18} fill="none" stroke={INK} strokeWidth={4} />
      <path d="M-30,14 L-8,-10 L22,-10 L30,14 M-8,-10 L0,14 L22,-10 M22,-10 L18,-24 L28,-26" fill="none" stroke="#e8505b" strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
      <rect x={-16} y={-4} width={18} height={10} rx={2} fill="#3f7cc4" stroke={INK} strokeWidth={2} />
      <path d="M-14,-16 h14" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d="M-6,2 l4,-6 l0,4 l4,-6" fill="none" stroke="#f6d33c" strokeWidth={1.6} />
    </g>
  );
}

/** A slot machine for the casino panel. (x, y) is its top-left. */
function Slots({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={70} height={96} rx={8} fill="#e8505b" stroke={INK} strokeWidth={2.5} />
      <rect x={8} y={14} width={54} height={30} rx={4} fill="#fff" stroke={INK} strokeWidth={2} />
      <Label x={20} y={35} size={13} color="#d4a017">7</Label>
      <Label x={35} y={35} size={13} color="#1d7a49">$</Label>
      <Label x={50} y={35} size={13} color="#3f7cc4">7</Label>
      <path d="M70,30 h10 v-18" stroke={INK} strokeWidth={3} fill="none" />
      <circle cx={80} cy={10} r={6} fill="#f6d33c" stroke={INK} strokeWidth={2} />
      <rect x={14} y={60} width={42} height={20} rx={3} fill="#2a2a2a" />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny, wearing a raffle ticket, hugs a shiny electric bike under confetti at the Ledger Falls Fair. Aunt Rosa cheers.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f4fb" floor="#cfe8c4" />
        <Confetti top={10} h={80} />
        <Penny x={84} y={128} scale={0.78} mood="excited" pose="up" />
        <EBike x={170} y={176} scale={0.9} />
        <Rosa x={256} y={128} scale={0.74} mood="excited" pose="wave" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I WON! A $4,000 e-bike! And it was free!", x: 3, y: 3, w: 42, tail: "down-left", shout: true },
      { who: "Rosa", text: "Free like my rolls, dear. Somebody always pays.", x: 54, y: 4, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot rolls up on a tiny scooter next to the e-bike holding a form labeled W-2G. Penny's smile fades.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f4fb" floor="#cfe8c4" />
        <Penny x={80} y={128} scale={0.78} mood="worried" pose="shrug" />
        <EBike x={160} y={176} scale={0.8} />
        <Hoot x={256} y={128} scale={0.72} mood="smug" pose="point" flip />
        <Paper x={206} y={150} label="W-2G" sub="$4,000" rotate={-10} scale={1.1} color="#fff3c4" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Hoot? At the county fair?", x: 3, y: 4, w: 36, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! A prize is income at its fair market value, Penny Pocket. All $4,000 of it.", x: 46, y: 2, w: 51, tail: "down-right" },
    ],
  },
  {
    alt: "Milo, holding a letter labeled 1099-C, dances happily. Ace raises a finger.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={86} y={128} scale={0.78} mood="excited" pose="hold" holding={<Envelope x={0} y={-8} label="1099-C" />} />
        <Ace x={240} y={128} scale={0.78} mood="thinking" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "The card company forgave my $3,000 balance! Best letter ever!", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Ace", text: "Milo, forgiven debt is income too, unless an exclusion applies. Were you insolvent?", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a paycheck stamped OVERTIME. Ace holds a sign with the new deduction amounts.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={86} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="W-2" sub="overtime" color="#fff3c4" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-30} y={-24} w={60} h={34} lines={["$12,500", "single"]} size={9} color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I heard overtime is tax-free now! Is it?", x: 3, y: 4, w: 40, tail: "down-left" },
      { who: "Ace", text: "Not tax-free, Penny. It's still wages. For 2025 to 2028 you may deduct the extra half-time pay.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Milo in front of a slot machine, waving two tickets: winnings of $1,200 and losses of $1,500.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#2f2a4a" floor="#5a3b5c" />
        <Slots x={20} y={92} />
        <Milo x={170} y={128} scale={0.78} mood="smug" pose="up" />
        <Card x={232} y={112} w={78} h={30} lines={["Won $1,200"]} size={11} color="#d8f0e2" />
        <Card x={232} y={148} w={78} h={30} lines={["Lost $1,500"]} size={11} color="#fde2e4" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Won $1,200, lost $1,500. So I report... nothing! Net loss!", x: 26, y: 3, w: 50, tail: "down" },
    ],
  },
  {
    alt: "Hoot stamps a ledger REPORT IT ALL. Penny and Milo look at each other. Dee on the tablet laughs.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={60} y={130} scale={0.7} mood="worried" />
        <Penny x={128} y={132} scale={0.68} mood="shocked" />
        <Hoot x={250} y={128} scale={0.72} mood="stern" flip pose="point" />
        <Stamp x={72} y={36} text="REPORT IT ALL" color="#a8321f" size={12} />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-hoo! Winnings go in full, Milo Marsh. Losses only as an itemized deduction, up to the winnings.", x: 42, y: 2, w: 55, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Income from whatever source",
    alt: "A funnel catching wages, cash, a prize bike, a bartered pie and a tip jar, all pouring into one box labeled gross income.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Card x={8} y={12} w={56} h={26} lines={["Wages"]} size={10} color="#d4ebfa" />
        <Card x={70} y={12} w={56} h={26} lines={["Cash"]} size={10} color="#d8f0e2" />
        <Card x={132} y={12} w={56} h={26} lines={["Prizes"]} size={10} color="#fde2e4" />
        <Card x={194} y={12} w={56} h={26} lines={["Barter"]} size={10} color="#fff3c4" />
        <Card x={256} y={12} w={56} h={26} lines={["Tips"]} size={10} color="#efe3f7" />
        <path d="M40,52 L280,52 L184,112 L136,112 Z" fill="#f6b73c" stroke={INK} strokeWidth={2.5} />
        <Card x={96} y={122} w={128} h={40} lines={["Gross income"]} size={14} color="#fff" />
        <Label x={160} y={176} size={10} weight={700}>unless a law says it's excluded</Label>
      </svg>
    ),
    body: [
      "Gross income is all income from whatever source, in money, property or services, unless a specific law excludes it. Cash with no paperwork, tips, bartering and prizes all count.",
      "Property and services are income at their fair market value. Bartering a pie for a haircut is income to both sides, at the value of what each received.",
    ],
    keyPoint: "Gross income = all income from whatever source unless specifically excluded. Noncash income (prizes, barter) counts at fair market value. Unreported cash is still income.",
  },
  {
    title: "Wages, tips and the new overtime and tips deductions",
    alt: "A paycheck flows into the W-2 box 1. Two side doors labeled tips deduction and overtime deduction come after AGI, and a FICA meter keeps running.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Paper x={46} y={70} label="W-2" sub="box 1" scale={1.4} color="#fff3c4" />
        <Arrow d="M82,70 H122" />
        <Card x={124} y={46} w={78} h={48} lines={["In AGI", "in full"]} size={11} color="#d4ebfa" />
        <Arrow d="M202,70 H232" />
        <Card x={234} y={22} w={78} h={44} lines={["Tips: up", "to $25,000"]} size={10} color="#d8f0e2" />
        <Card x={234} y={76} w={78} h={44} lines={["Overtime:", "$12,500/$25K"]} size={10} color="#d8f0e2" />
        <Label x={160} y={146} size={11}>Deductions for 2025 to 2028, not exclusions</Label>
        <Label x={160} y={166} size={10} weight={700} color="#a8321f">Social Security and Medicare still apply</Label>
      </svg>
    ),
    body: [
      "Wages, salaries, bonuses and tips are taxable when received. Tips must be reported to the employer, and cash tips under $20 a month from one job are the only ones that needn't be.",
      "For 2025 through 2028, workers can deduct qualified tips (up to $25,000) in occupations that customarily got tips, and the extra half-time part of required overtime pay (up to $12,500, or $25,000 on a joint return). Both phase out above $150,000 of modified AGI ($300,000 joint), need a valid SSN, and are taken whether or not the taxpayer itemizes. The income stays in wages, so payroll taxes still apply.",
    ],
    keyPoint: "Tips and overtime are still wages. 2025–2028: deduct qualified tips up to $25,000 and the overtime premium up to $12,500 ($25,000 MFJ); phase-out over $150K MAGI ($300K MFJ); FICA still applies.",
  },
  {
    title: "Interest: taxable, and the kind that's only reported",
    alt: "Two piggy banks. A bank savings account labeled taxable on Schedule B over $1,500, and a city bond labeled reported but not taxed.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Bank x={80} y={110} label="BANK" scale={1} />
        <Bank x={240} y={110} label="CITY" scale={1} color="#d4ebfa" />
        <Label x={80} y={136} size={12}>Taxable</Label>
        <Label x={240} y={136} size={12}>Tax-exempt</Label>
        <Label x={80} y={156} size={10} weight={700}>1099-INT, Schedule B</Label>
        <Label x={240} y={156} size={10} weight={700}>still shown on the 1040</Label>
        <Label x={160} y={22} size={11}>Schedule B when interest or dividends top $1,500</Label>
      </svg>
    ),
    body: [
      "Interest from banks, credit unions, corporate bonds and U.S. Treasury obligations is taxable (Treasury interest is exempt from state tax, not federal). Interest on most state and local government bonds is exempt from federal tax but is still reported on the return.",
      "Taxable interest is reported whether or not a 1099-INT arrives. Schedule B lists interest and ordinary dividends when either total is over $1,500.",
    ],
    keyPoint: "Bank, corporate and Treasury interest is taxable; municipal bond interest is federally exempt but still reported. Schedule B over $1,500 of interest or ordinary dividends.",
  },
  {
    title: "Dividends: ordinary, qualified, and the ones that aren't income",
    alt: "Three jars of dividends: ordinary taxed like wages, qualified taxed at 0, 15 or 20 percent, and return of capital that lowers basis.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={40} w={92} h={110} color="#fde2e4" label="Ordinary" sub="regular rates" />
        <Step x={114} y={40} w={92} h={110} color="#d8f0e2" label="Qualified" sub="0, 15 or 20%" />
        <Step x={214} y={40} w={92} h={110} color="#d4ebfa" label="Return of" sub="capital: basis" />
        <Label x={160} y={24} size={11}>Qualified: held more than 60 days</Label>
        <Label x={160} y={170} size={10} weight={700}>of the 121 days around the ex-dividend date</Label>
      </svg>
    ),
    body: [
      "Ordinary dividends are taxed at regular rates. Qualified dividends, from U.S. or qualified foreign corporations on stock held more than 60 days during the 121-day period that starts 60 days before the ex-dividend date, get the capital gain rates.",
      "A nondividend distribution (return of capital) isn't income: it lowers the stock's basis, and anything beyond basis is capital gain. Capital gain distributions from mutual funds are long-term regardless of how long the fund shares were held.",
    ],
    keyPoint: "Qualified dividends (held > 60 days of the 121-day period) get 0/15/20% rates. Return of capital reduces basis (excess = capital gain). Mutual fund capital gain distributions are always long-term.",
  },
  {
    title: "Prizes and gambling: report it all, deduct losses only if itemizing",
    alt: "A scale: winnings of $1,200 on one side as income. Losses of $1,500 on the other, capped at $1,200, go only to Schedule A.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Card x={14} y={30} w={130} h={60} lines={["Winnings", "$1,200 → income"]} size={12} color="#d8f0e2" />
        <Card x={176} y={30} w={130} h={60} lines={["Losses $1,500", "cap at $1,200"]} size={12} color="#fde2e4" />
        <Arrow d="M241,92 V122" />
        <Card x={176} y={124} w={130} h={40} lines={["Schedule A only"]} size={12} color="#fff" />
        <Label x={79} y={116} size={10} weight={700}>W-2G for many</Label>
        <Label x={79} y={132} size={10} weight={700}>larger wins</Label>
      </svg>
    ),
    body: [
      "Raffle, lottery, contest and gambling winnings are fully taxable, and prizes of property count at fair market value. Payers issue Form W-2G for many larger wins, but all winnings are reportable.",
      "For 2025, gambling losses are deductible only as an itemized deduction and only up to the amount of winnings. They can't be netted against winnings, and someone who takes the standard deduction gets no deduction for them. (For 2026 on, the loss deduction is limited to 90%.)",
    ],
    keyPoint: "Winnings and prizes are fully taxable (prizes at FMV). Gambling losses: itemized deduction only, limited to winnings (2025). No netting.",
  },
  {
    title: "Canceled debt: income, unless an exclusion applies",
    alt: "A credit card bill with $3,000 crossed out becomes a 1099-C. Exit doors labeled bankruptcy, insolvency and others lead to Form 982.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Envelope x={56} y={60} label="1099-C" scale={1.5} />
        <Label x={56} y={112} size={12}>$3,000 forgiven</Label>
        <Arrow d="M104,60 H138" />
        <Card x={142} y={16} w={168} h={28} lines={["Bankruptcy"]} size={11} color="#d4ebfa" />
        <Card x={142} y={50} w={168} h={28} lines={["Insolvency (to that extent)"]} size={11} color="#d8f0e2" />
        <Card x={142} y={84} w={168} h={28} lines={["Main home debt (to 2025)"]} size={11} color="#fff3c4" />
        <Card x={142} y={118} w={168} h={28} lines={["Farm or business realty"]} size={11} color="#fde2e4" />
        <Label x={226} y={168} size={11}>Excluded? File Form 982</Label>
      </svg>
    ),
    body: [
      "When a lender forgives a debt, the canceled amount is generally income, usually shown on Form 1099-C. Exclusions include debt canceled in bankruptcy, debt canceled while insolvent (only up to the amount of insolvency), qualified principal residence debt discharged by the end of 2025, and qualified farm and real property business debt.",
      "Insolvency means liabilities exceeded the fair market value of assets just before the cancellation. Excluded amounts are claimed on Form 982 and usually reduce tax attributes such as basis. Gifts and certain student loan discharges aren't income at all.",
    ],
    keyPoint: "Canceled debt = income (1099-C) unless excluded: bankruptcy, insolvency (up to the insolvent amount), qualified principal residence debt (through 2025), farm/real property business debt. Form 982.",
  },
  {
    title: "Refunds, unemployment and other 1099-G money",
    alt: "A Form 1099-G with two lines: unemployment marked always taxable, and state refund marked taxable only if you itemized and got a benefit.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Paper x={52} y={66} label="1099-G" scale={1.4} color="#fde2e4" />
        <Card x={110} y={30} w={196} h={46} lines={["Unemployment:", "taxable"]} size={12} color="#fde2e4" />
        <Card x={110} y={92} w={196} h={58} lines={["State tax refund: taxable", "only if you itemized and", "deducted it last year"]} size={11} color="#d8f0e2" />
        <Penny x={52} y={150} scale={0.3} mood="thinking" />
      </svg>
    ),
    body: [
      "Unemployment compensation is fully taxable. Recipients can choose to have 10% withheld.",
      "Under the tax benefit rule, a state or local income tax refund is income only to the extent the tax was deducted in an earlier year and that deduction lowered tax. Someone who took the standard deduction that year doesn't report the refund at all.",
    ],
    keyPoint: "Unemployment: fully taxable. State tax refund: taxable only to the extent a prior-year itemized deduction gave a tax benefit (standard deduction last year → not taxable).",
  },
];

const lesson: Lesson = {
  id: "p1-everyday-income",
  part: "part1",
  domainId: "p1d2",
  number: "2.1",
  episode: "Penny Wins the Raffle",
  title: "Everyday income",
  minutes: 13,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "Wages, interest, dividends, prizes, gambling and forgiven debt: what counts as income, and how much of it.",
  previously: "Season 1 rolls on. Penny and Milo are married, Lulu is settled in, and Penny just bought a raffle ticket at the Ledger Falls Fair.",
  comic,
  cards,
  hook: {
    line: "If it came in, it counts, unless a law says it doesn't.",
    more: "Prizes at fair market value, winnings in full, forgiven debt unless excluded. Losses and refunds have their own rules.",
    alt: "A big net catching dollar bills, a bike and a pie.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Burst x={70} y={60} r={42} color="#f6d33c" />
        <Label x={70} y={66} size={18}>INCOME</Label>
        <EBike x={190} y={60} scale={0.9} />
        <Mark x={286} y={58} text="!" color="#e8505b" size={40} />
      </svg>
    ),
  },
  traps: [
    { title: "Netting gambling", text: "Winnings go on the return in full. Losses are a separate itemized deduction, capped at winnings." },
    { title: "Every state refund is income", text: "Only if it was deducted and gave a benefit. Standard deduction last year means it isn't income." },
    { title: "Insolvency wipes it all out", text: "The exclusion goes only as far as the taxpayer was insolvent. The rest of the canceled debt is income." },
    { title: "Overtime is tax-free", text: "The overtime premium is a deduction, not an exclusion, and Social Security and Medicare still apply." },
  ],
  sources: [
    { key: "p525", section: "Prizes and Awards; Gambling Winnings; Recoveries; Canceled Debts" },
    { key: "p550", section: "Interest Income; Dividends and Other Distributions" },
    { key: "p4681", section: "Canceled Debts; Insolvency" },
    { key: "obbb", section: "No tax on tips; No tax on overtime" },
  ],
  cases: [
    {
      who: "Penny",
      title: "The raffle bike",
      facts: "Penny won an e-bike with a fair market value of $4,000 in a raffle. Her ticket cost $20.",
      question: "How much income does Penny have from the raffle?",
      choices: ["$0, prizes of property aren't income", "$4,000 of income; the $20 ticket is a gambling loss she can deduct only if she itemizes", "$3,980, because the ticket is subtracted first", "Only the sales tax value of the bike"],
      answer: "$4,000 of income; the $20 ticket is a gambling loss she can deduct only if she itemizes",
      why: "Prizes are income at fair market value. The ticket cost is a wagering loss, deductible only as an itemized deduction up to winnings, not netted against the prize.",
    },
    {
      who: "Milo",
      title: "Milo's forgiven card",
      facts: "A card company canceled $3,000 of Milo's debt. Just before, Milo's liabilities were $10,000 and his assets were worth $9,000. He isn't in bankruptcy.",
      question: "How much of the canceled debt is income?",
      choices: ["$0", "$1,000", "$2,000", "$3,000"],
      answer: "$2,000",
      why: "Milo was insolvent by $1,000 ($10,000 minus $9,000), so he can exclude $1,000 on Form 982. The other $2,000 is income.",
    },
    {
      who: "Penny",
      title: "Last year's state refund",
      facts: "Penny took the standard deduction on her 2024 return. In 2025 she got a $600 state income tax refund for 2024.",
      question: "How much of the refund is income on her 2025 return?",
      choices: ["$0", "$300", "$600", "It depends on whether she itemizes in 2025"],
      answer: "$0",
      why: "Under the tax benefit rule, a state tax refund is income only to the extent the tax was deducted and gave a benefit. She didn't itemize in 2024, so none of it is income.",
    },
    {
      who: "Milo",
      title: "The casino night",
      facts: "Milo won $1,200 and lost $1,500 gambling in 2025. Penny and Milo file jointly and take the standard deduction.",
      question: "How is the gambling reported?",
      choices: ["Nothing is reported, since he had a net loss", "A $300 loss deducted on Schedule 1", "$1,200 of income and no deduction for the losses", "$1,200 of income offset by $1,200 of losses on Schedule 1"],
      answer: "$1,200 of income and no deduction for the losses",
      why: "Winnings are income in full. For 2025, losses are deductible only as an itemized deduction, up to winnings. With the standard deduction, there's no deduction at all.",
    },
    {
      who: "Dee",
      title: "Dee's dividends",
      facts: "Dee bought shares of a U.S. company 20 days before the ex-dividend date and sold them 10 days after it, collecting a $300 dividend.",
      question: "How is the $300 taxed?",
      choices: ["As a qualified dividend at capital gain rates", "As an ordinary dividend at regular rates", "As a return of capital", "It isn't taxable because she sold the stock"],
      answer: "As an ordinary dividend at regular rates",
      why: "To be qualified, stock must be held more than 60 days during the 121-day period beginning 60 days before the ex-dividend date. Dee held it about 30 days.",
    },
    {
      who: "Rosa",
      title: "Rosa's barter",
      facts: "Aunt Rosa traded $500 worth of bakery catering for a new roof patch worth $500 from a roofer.",
      question: "What does Rosa report?",
      choices: ["Nothing, no cash changed hands", "$500 of income, the fair market value of what she received", "Only the cost of the ingredients", "$250, half of the trade"],
      answer: "$500 of income, the fair market value of what she received",
      why: "Bartering is taxable: each side reports the fair market value of the goods or services received.",
    },
  ],
  quizTopics: ["Canceled debt"],
  quizBrief: "Everyday income: gross income from all sources, prizes at FMV, gambling winnings and losses, interest and dividends, canceled debt and insolvency, state refunds, tips and overtime deductions",
};

export default lesson;

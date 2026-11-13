import { Ace, Arrow, Backdrop, Biscuit, Hoot, Label, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, Desk, Heart, HOOK, Mark, PANEL, Paper, Shoebox, Step } from "../props";

// Part 1, topic 3.1: standard versus itemized deductions. Written to the rules for tax year 2025 (as
// changed by the One Big Beautiful Bill Act) from Publication 17, Publications 502, 526, 547 and 936,
// and the IRS page on the new 2025 deductions.

const INK = "#17202c";

/** A two-pan balance scale. (x, y) is the top of the post. */
function Scale({ x, y, left, right, tilt = 0 }: { x: number; y: number; left: string; right: string; tilt?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0,0 V90 M-26,90 H26" stroke={INK} strokeWidth={4} />
      <g transform={`rotate(${tilt})`}>
        <path d="M-80,0 H80" stroke={INK} strokeWidth={4} />
        <path d="M-80,0 L-104,40 H-56 Z M80,0 L56,40 H104 Z" fill="#f6d33c" stroke={INK} strokeWidth={2} />
        <Label x={-80} y={56} size={11}>
          {left}
        </Label>
        <Label x={80} y={56} size={11}>
          {right}
        </Label>
      </g>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny hugs an overflowing shoebox of receipts. Milo, across the table, yawns.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Desk y={176} />
        <Penny x={76} y={128} scale={0.76} mood="excited" pose="up" />
        <Shoebox x={160} y={160} scale={0.9} labels={["1098", "$$", "rcpt"]} />
        <Milo x={250} y={128} scale={0.76} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "We ITEMIZE this year! I kept every receipt!", x: 3, y: 3, w: 42, tail: "down-left", shout: true },
      { who: "Milo", text: "Or we take the standard deduction and I nap.", x: 54, y: 4, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Ace stands beside a big balance scale: itemized on one side, $31,500 standard on the other.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Scale x={160} y={96} left="Itemized" right="$31,500" tilt={-6} />
        <Ace x={50} y={128} scale={0.64} mood="happy" pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Itemize only if the total beats $31,500, the 2025 standard deduction for a married couple.", x: 26, y: 2, w: 60, tail: "down-left" },
    ],
  },
  {
    alt: "Penny holds a $4,000 medical bill for Milo's stitches. Biscuit looks sorry for him. Hoot holds up a 7.5% sign.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={80} y={128} scale={0.76} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="$4,000" sub="stitches" />} />
        <Biscuit x={150} y={178} scale={0.34} mood="sad" />
        <Hoot x={248} y={128} scale={0.7} mood="smug" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "A client's poodle bit Milo! $4,000 of stitches!", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Hoot", text: "Medical counts only above 7.5% of AGI, Penny Pocket. Hoo.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds a property tax bill. Ace holds a sign reading $40,000 cap.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="TAXES" sub="$14,000" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-30} y={-24} w={60} h={34} lines={["SALT", "$40,000"]} size={10} color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "State and property taxes: $14,000. Isn't there a $10,000 cap?", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Ace", text: "For 2025 the cap is $40,000, Milo. It shrinks only above $500,000 of income.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Penny drags her old couch to the thrift store with a heart. Hoot follows with a clipboard reading 8283.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fdf3e1" />
        <rect x={110} y={150} width={90} height={36} rx={8} fill="#7cc4a0" stroke={INK} strokeWidth={2.5} />
        <rect x={104} y={136} width={102} height={18} rx={8} fill="#5aa982" stroke={INK} strokeWidth={2.5} />
        <Heart x={155} y={110} s={1.2} />
        <Penny x={60} y={128} scale={0.72} mood="happy" pose="point" />
        <Hoot x={260} y={128} scale={0.68} mood="stern" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "We gave the shelter our old couch, worth $700, plus $300 cash!", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Hoot", text: "Couch over $500: Form 8283. Cash of $250 or more: a written receipt.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa dances with a card reading $6,000 senior. Ace gives a thumbs up.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.76} mood="excited" pose="hold" holding={<Card x={-28} y={-20} w={56} h={30} lines={["$6,000"]} size={11} color="#fff3c4" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "And I'm 74! Is it true seniors get a new $6,000 deduction?", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Ace", text: "Yes, Rosa, for 2025 to 2028, itemizing or not, if your income's under the limit.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The 2025 standard deduction",
    alt: "Three stacks of coins: $15,750 single, $23,625 head of household and $31,500 married filing jointly, with a small add-on for 65 or blind.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={96} w={90} h={70} color="#d4ebfa" label="$15,750" sub="single, MFS" />
        <Step x={112} y={70} w={90} h={96} color="#fff3c4" label="$23,625" sub="HOH" />
        <Step x={210} y={30} w={96} h={136} color="#d8f0e2" label="$31,500" sub="joint" />
        <Label x={110} y={30} size={10} weight={700}>65 or blind, each: +$1,600 married,</Label>
        <Label x={110} y={46} size={10} weight={700}>+$2,000 single or HOH</Label>
      </svg>
    ),
    body: [
      "For 2025, the standard deduction is $15,750 for single and married filing separately, $23,625 for head of household and $31,500 for married filing jointly and qualifying surviving spouses. Each taxpayer 65 or older or blind adds $1,600 if married ($2,000 if single or HOH).",
      "Taxpayers itemize on Schedule A only when it's bigger. If one spouse filing separately itemizes, the other must itemize too (standard deduction of zero). A dependent's standard deduction is limited to the greater of $1,350 or earned income plus $450.",
    ],
    keyPoint: "2025 standard deduction: $15,750 single/MFS, $23,625 HOH, $31,500 MFJ; +$1,600 (married) or +$2,000 (single/HOH) for 65+ or blind. MFS: if one itemizes, both must.",
  },
  {
    title: "Medical: only the part over 7.5% of AGI",
    alt: "A tall stack of medical bills with a waterline at 7.5 percent of AGI. Only the part sticking above the water is deductible.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <rect x={40} y={30} width={80} height={130} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <rect x={20} y={80} width={120} height={80} fill="#5aa9e6" opacity={0.6} />
        <Label x={80} y={58} size={11} color="#1d7a49">deductible</Label>
        <Label x={80} y={124} size={11} color="#fff">7.5% of AGI</Label>
        <Card x={160} y={24} w={148} h={64} lines={["Counts: doctors, drugs,", "premiums, Medicare,", "21¢ a mile"]} size={10} color="#d8f0e2" />
        <Card x={160} y={98} w={148} h={64} lines={["Doesn't: cosmetic,", "OTC drugs, gym,", "reimbursed costs"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Unreimbursed medical and dental expenses for the taxpayer, spouse and dependents are deductible to the extent they exceed 7.5% of AGI. They include payments to doctors and hospitals, prescription drugs and insulin, health insurance and Medicare premiums paid with after-tax money, and medical travel (21 cents a mile for 2025).",
      "Cosmetic surgery, nonprescription drugs, general health items like gym memberships, and anything reimbursed or paid with pre-tax money (HSA, FSA, pre-tax premiums) don't count.",
    ],
    keyPoint: "Medical: unreimbursed expenses over 7.5% of AGI. Includes after-tax premiums, prescriptions, 21¢/mile (2025). Excludes cosmetic, OTC drugs (except insulin), reimbursed or pre-tax-paid costs.",
  },
  {
    title: "State and local taxes: the $40,000 cap",
    alt: "A bucket labeled SALT with a $40,000 rim, catching state income or sales tax, property tax and car tax. A shrink ray points at incomes over $500,000.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M30,50 L150,50 L136,160 L44,160 Z" fill="#d4ebfa" stroke={INK} strokeWidth={2.5} />
        <path d="M24,50 H156" stroke="#a8321f" strokeWidth={5} />
        <Label x={90} y={42} size={12} color="#a8321f">$40,000</Label>
        <Label x={90} y={86} size={9}>income OR sales tax</Label>
        <Label x={90} y={108} size={9}>real estate tax</Label>
        <Label x={90} y={130} size={9}>personal property</Label>
        <Card x={170} y={30} w={138} h={50} lines={["MFS: $20,000"]} size={12} color="#fff3c4" />
        <Card x={170} y={92} w={138} h={66} lines={["MAGI > $500K:", "cap shrinks, but", "not below $10,000"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "State and local income taxes (or general sales taxes instead), real estate taxes and personal property taxes are deductible up to a combined $40,000 for 2025 ($20,000 married filing separately).",
      "The cap is reduced by 30% of modified AGI over $500,000 ($250,000 MFS), but never below $10,000 ($5,000 MFS). Federal taxes, foreign real property taxes and fees for services (like trash pickup) aren't deductible.",
    ],
    keyPoint: "SALT 2025: income or sales tax + real estate + personal property, capped at $40,000 ($20,000 MFS); cap cut by 30% of MAGI over $500,000 ($250K MFS), not below $10,000 ($5,000 MFS).",
  },
  {
    title: "Home mortgage and investment interest",
    alt: "A house with a mortgage tag of $750,000 marking how much debt's interest counts, and a side tag for home equity loans used to improve the home.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <path d="M40,90 L100,40 L160,90 V160 H40 Z" fill="#f4d9b0" stroke={INK} strokeWidth={2.5} />
        <path d="M30,92 L100,32 L170,92" fill="none" stroke="#d2553a" strokeWidth={7} strokeLinecap="round" />
        <Label x={100} y={124} size={14}>$750,000</Label>
        <Label x={100} y={142} size={9} weight={700}>of acquisition debt</Label>
        <Card x={180} y={20} w={128} h={54} lines={["Home equity:", "only if used to", "buy or improve"]} size={9} color="#fff3c4" />
        <Card x={180} y={86} w={128} h={70} lines={["Investment", "interest: up to net", "investment income"]} size={9} color="#d4ebfa" />
      </svg>
    ),
    body: [
      "Mortgage interest on a main home and one second home is deductible on up to $750,000 of acquisition debt ($375,000 MFS), or $1 million for debt taken out before December 16, 2017. Interest on a home equity loan counts only if the money was used to buy, build or substantially improve the home that secures it. Points to buy a main home can usually be deducted in the year paid.",
      "Investment interest is deductible up to net investment income, with the rest carried forward. Personal interest, like credit cards and personal car loans, isn't an itemized deduction.",
    ],
    keyPoint: "Mortgage interest on up to $750,000 of acquisition debt ($375K MFS; $1M pre-12/16/2017), main + one second home. Home equity interest only if used to buy/build/improve. Investment interest up to net investment income.",
  },
  {
    title: "Charitable gifts and their paperwork",
    alt: "A ladder of donation sizes. $250 or more: written acknowledgment. Over $500 of property: Form 8283. Over $5,000 of property: a qualified appraisal.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde2e4" />
        <Step x={14} y={110} w={92} h={56} color="#fff" label="$250+" sub="written receipt" />
        <Step x={114} y={76} w={92} h={90} color="#fff3c4" label="$500+" sub="property: 8283" />
        <Step x={214} y={36} w={92} h={130} color="#d8f0e2" label="$5,000+" sub="appraisal" />
        <Heart x={50} y={60} s={1.6} />
        <Label x={160} y={22} size={10} weight={700}>Cash up to 60% of AGI · carryover 5 years</Label>
      </svg>
    ),
    body: [
      "Gifts to qualified organizations are deductible if itemizing. Cash gifts are generally limited to 60% of AGI, and gifts of appreciated long-term capital gain property (at fair market value) to 30%. Excess carries over for five years. Time and services aren't deductible, and any benefit received (like a dinner) reduces the gift.",
      "Any single gift of $250 or more needs a contemporaneous written acknowledgment, and every cash gift needs a bank record or receipt. Noncash gifts over $500 need Form 8283, and items over $5,000 generally need a qualified appraisal. Used clothing and household items must be in good used condition or better.",
    ],
    keyPoint: "Charity (itemizers): cash ≤ 60% of AGI, appreciated LTCG property ≤ 30% (at FMV); 5-year carryover. $250+ gift: written acknowledgment. Noncash > $500: Form 8283; > $5,000: qualified appraisal. No deduction for services.",
  },
  {
    title: "Casualty losses and the leftovers",
    alt: "A storm cloud over a house with a federal disaster tag. Losses count after $100 and 10 percent of AGI. A crossed-out list of old miscellaneous deductions.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <ellipse cx={80} cy={40} rx={50} ry={22} fill="#9aa4b2" stroke={INK} strokeWidth={2} />
        <path d="M70,62 l-10,20 h12 l-8,20" fill="none" stroke="#f6d33c" strokeWidth={4} />
        <Card x={20} y={110} w={130} h={54} lines={["Federal disaster", "only: $100 + 10%"]} size={10} color="#fff" />
        <Card x={170} y={20} w={138} h={60} lines={["Still allowed:", "gambling losses", "(up to winnings)"]} size={10} color="#d8f0e2" />
        <Card x={170} y={92} w={138} h={70} lines={["Gone: tax prep fees,", "unreimbursed job", "expenses (2% items)"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "Personal casualty and theft losses are deductible only if caused by a federally declared disaster. Each loss is reduced by $100, and the total by 10% of AGI.",
      "Other itemized deductions still allowed include gambling losses up to winnings. Miscellaneous deductions that used to be subject to the 2% floor, like unreimbursed employee expenses, investment fees and tax preparation fees, are no longer deductible.",
    ],
    keyPoint: "Personal casualty losses: federally declared disasters only, minus $100 per event and 10% of AGI. Gambling losses up to winnings still allowed. 2%-floor miscellaneous deductions are gone.",
  },
  {
    title: "New for 2025: deductions without itemizing",
    alt: "Rosa holds a $6,000 senior card, beside cards for car loan interest up to $10,000, tips and overtime, all labeled itemize or not.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#f3e1ef" floorY={162} />
        <Rosa x={50} y={120} scale={0.42} mood="excited" />
        <Card x={100} y={14} w={208} h={40} lines={["Seniors 65+: $6,000 each"]} size={11} color="#fff3c4" />
        <Card x={100} y={62} w={208} h={40} lines={["New U.S.-built car loan: $10,000"]} size={10} color="#d8f0e2" />
        <Card x={100} y={110} w={208} h={40} lines={["Tips and overtime (episode 2.1)"]} size={10} color="#d4ebfa" />
        <Label x={204} y={172} size={10} weight={700}>2025–2028, itemize or not, income limits</Label>
      </svg>
    ),
    body: [
      "For 2025 through 2028, each taxpayer 65 or older can deduct $6,000 on top of the standard or itemized deduction. It phases out by 6% of modified AGI over $75,000 ($150,000 joint), needs a valid SSN, and married couples must file jointly.",
      "Interest on a loan for a new personal-use vehicle assembled in the U.S. (bought after 2024) is deductible up to $10,000 a year, phasing out over $100,000 of MAGI ($200,000 joint). These, like the tips and overtime deductions, are taken whether or not the taxpayer itemizes.",
    ],
    keyPoint: "2025–2028, itemizing or not: senior deduction $6,000 per person 65+ (phase-out over $75K/$150K MAGI, MFJ if married); new U.S.-assembled car loan interest up to $10,000 (phase-out over $100K/$200K); tips and overtime.",
  },
];

const lesson: Lesson = {
  id: "p1-itemized",
  part: "part1",
  domainId: "p1d3",
  number: "3.1",
  episode: "The Great Itemizing Debate",
  title: "Standard versus itemized",
  minutes: 14,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns, including the 2025 law changes)",
  intro: "The 2025 standard deduction, what goes on Schedule A (medical, taxes, interest, gifts, casualties) and the new deductions everyone can take.",
  previously: "Unit 2 is done: every kind of income is on the table. Now the couple's first big fight as a married pair: to itemize or not.",
  comic,
  cards,
  hook: {
    line: "Add up Schedule A. Beat $31,500 or don't bother.",
    more: "Medical over 7.5%, SALT up to $40,000, mortgage interest on $750,000, gifts with receipts. Seniors get $6,000 either way.",
    alt: "A balance scale with Schedule A on one side and $31,500 on the other.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Label x={80} y={60} size={26}>Sch. A</Label>
        <Label x={160} y={60} size={26} color="#a8321f">vs</Label>
        <Label x={240} y={60} size={26} color="#1d7a49">$31,500</Label>
        <Arrow d="M110,90 H210" />
        <Mark x={300} y={40} text="?" size={28} />
      </svg>
    ),
  },
  traps: [
    { title: "The old $10,000 SALT cap", text: "For 2025 the cap is $40,000 ($20,000 MFS), reduced only for MAGI over $500,000 and never below $10,000." },
    { title: "Medical from the first dollar", text: "Only the part over 7.5% of AGI is deductible." },
    { title: "Home equity for a car", text: "Home equity interest is deductible only if the money bought, built or improved the home." },
    { title: "Senior deduction means itemizing", text: "The $6,000 senior deduction is taken whether or not the taxpayer itemizes." },
  ],
  sources: [
    { key: "p17", section: "Standard Deduction; Itemized Deductions" },
    { key: "p502", section: "What Medical Expenses Are Includible?" },
    { key: "p936", section: "Home Mortgage Interest; Limits on Home Mortgage Interest Deduction" },
    { key: "p526", section: "Limits on Deductions; Records To Keep" },
    { key: "p547", section: "Casualties; Federally declared disasters" },
    { key: "obbb", section: "Enhanced deduction for seniors; No tax on car loan interest" },
  ],
  cases: [
    {
      who: "Penny",
      title: "Itemize or not?",
      facts: "Penny and Milo file jointly for 2025. Their itemized deductions total $28,000. Both are under 65 and not blind.",
      question: "Which deduction should they take?",
      choices: ["Itemized, $28,000", "Standard, $31,500", "Standard, $30,000", "Both, since the standard deduction is per person"],
      answer: "Standard, $31,500",
      why: "The 2025 standard deduction for married filing jointly is $31,500, more than their $28,000 of itemized deductions.",
    },
    {
      who: "Milo",
      title: "Milo's stitches",
      facts: "Penny and Milo's AGI is $80,000. They paid $9,000 of unreimbursed medical expenses in 2025, including Milo's stitches.",
      question: "How much is the medical deduction if they itemize?",
      choices: ["$9,000", "$6,000", "$3,000", "$1,000"],
      answer: "$3,000",
      why: "Only expenses over 7.5% of AGI count: 7.5% of $80,000 is $6,000, so $9,000 minus $6,000 is $3,000.",
    },
    {
      who: "Ace",
      title: "Ace's separate filers",
      facts: "Ace's client is married filing separately for 2025 with $26,000 of state income tax and property tax and MAGI of $120,000.",
      question: "What is the maximum SALT deduction?",
      choices: ["$10,000", "$5,000", "$20,000", "$26,000"],
      answer: "$20,000",
      why: "For 2025 the SALT cap is $20,000 for married filing separately (half of $40,000). Her MAGI is far below the $250,000 MFS phase-down.",
    },
    {
      who: "Penny",
      title: "The couch and the check",
      facts: "Penny and Milo itemize. They gave the animal shelter their used couch (fair market value $700, good condition) and a $300 check.",
      question: "What paperwork do they need?",
      choices: ["Nothing; the shelter is a charity", "Only a bank record for the check", "A written acknowledgment for the $300 gift and Form 8283 for the couch", "A qualified appraisal for the couch"],
      answer: "A written acknowledgment for the $300 gift and Form 8283 for the couch",
      why: "A single gift of $250 or more needs a contemporaneous written acknowledgment. Noncash gifts over $500 need Form 8283; an appraisal is needed only over $5,000.",
    },
    {
      who: "Rosa",
      title: "Rosa's senior deduction",
      facts: "Rosa, 74, is single, not blind, takes the standard deduction and has MAGI of $60,000 for 2025.",
      question: "What's her total deduction before any other deductions?",
      choices: ["$15,750", "$17,750", "$23,750", "$21,750"],
      answer: "$23,750",
      why: "Standard deduction $15,750 plus $2,000 for being single and 65+, plus the $6,000 senior deduction (MAGI under $75,000): $23,750.",
    },
    {
      who: "Milo",
      title: "Milo's new truck loan",
      facts: "Milo bought a new U.S.-assembled pickup for personal use in March 2025 with a secured loan, paying $2,400 of interest in 2025. Their MAGI is $150,000 on a joint return, and they take the standard deduction.",
      question: "Can they deduct the interest?",
      choices: ["No, personal interest is never deductible", "Only if they itemize", "Yes, $2,400, even with the standard deduction", "Yes, but only $1,200"],
      answer: "Yes, $2,400, even with the standard deduction",
      why: "For 2025 to 2028, interest on a loan for a new U.S.-assembled personal vehicle is deductible up to $10,000, whether or not the taxpayer itemizes. Their MAGI is below the $200,000 joint phase-out.",
    },
  ],
  quizTopics: ["Medical expenses", "State and local taxes", "Charitable contributions", "New deductions for 2025"],
  quizBrief: "Standard vs itemized for 2025: standard amounts, medical over 7.5% of AGI, $40,000 SALT cap, mortgage interest limits, charitable limits and substantiation, casualty losses, senior deduction",
};

export default lesson;

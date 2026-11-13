import { Ace, Backdrop, Hoot, House, Label, Penny, Rosa, StockCert, WaltPortrait } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 1, topic 6.1: the estate tax: gross estate, valuation, deductions, the basic exclusion, Form 706
// deadlines, portability, and the estate's own income tax return. Written to the rules for 2025 deaths
// from the Form 706 instructions, the IRS estate tax pages and the Form 1041 instructions.

const INK = "#17202c";

/** Walt's prized stamp album. (x, y) is the center. */
function StampAlbum({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-26} y={-18} width={52} height={36} rx={3} fill="#3f7cc4" stroke={INK} strokeWidth={2.5} />
      <rect x={-18} y={-11} width={14} height={11} fill="#f6d33c" stroke={INK} strokeWidth={1.2} strokeDasharray="2 1" />
      <rect x={2} y={-11} width={14} height={11} fill="#e8505b" stroke={INK} strokeWidth={1.2} strokeDasharray="2 1" />
      <rect x={-8} y={3} width={14} height={11} fill="#7fc8a9" stroke={INK} strokeWidth={1.2} strokeDasharray="2 1" />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Grandpa Walt's portrait, proud, next to his stamp album. Penny holds a paper reading $900,000.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <WaltPortrait x={30} y={70} scale={1.05} mood="smug" />
        <StampAlbum x={138} y={150} scale={1.1} />
        <Penny x={244} y={128} scale={0.78} mood="thinking" flip pose="hold" holding={<Paper x={0} y={-8} label="ESTATE" sub="$900,000" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Walt", text: "Tell the estate tax people about my stamp collection! It's priceless!", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Penny", text: "Grandpa, your whole estate is $900,000.", x: 56, y: 4, w: 41, tail: "down-right" },
    ],
  },
  {
    alt: "Ace lists the house, stock and stamps. Hoot holds his clipboard with a price tag.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={70} y={128} scale={0.76} mood="happy" pose="point" />
        <House x={140} y={170} scale={0.55} />
        <StockCert x={180} y={146} scale={0.7} />
        <Hoot x={262} y={130} scale={0.66} mood="smug" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "The gross estate is everything Walt owned at death: house, stock, IRA, even the stamps.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Hoot", text: "At FAIR MARKET VALUE. Not 'priceless.'", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds a paper reading $13,990,000. Walt's portrait looks shocked.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="$13.99M" sub="exclusion" color="#d8f0e2" />} />
        <WaltPortrait x={200} y={70} scale={1.05} mood="shocked" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Good news: the 2025 exclusion is $13,990,000. No Form 706 needed for Walt.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Walt", text: "So I'm... not rich enough to be taxed?!", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a bank statement reading $1,200 interest. Ace holds Forms 1041 and 56.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="worried" pose="hold" holding={<Paper x={0} y={-8} label="$1,200" sub="interest" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="1041" sub="+ Form 56" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "His savings earned $1,200 after he died. Who reports that?", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "The estate, Penny: Form 1041 at $600 of income. And Form 56 tells the IRS you're executor.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Aunt Rosa looks sad holding a photo. Hoot gleefully waves a paper reading lost.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Rosa x={84} y={128} scale={0.78} mood="worried" />
        <Hoot x={220} y={130} scale={0.7} mood="excited" pose="up" flip />
        <Paper x={278} y={108} label="LOST" sub="DSUE" color="#fde2e4" rotate={10} />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "When my Bert died in 2023, nobody filed a 706.", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Hoot", text: "Then his unused exclusion is LOST! Hoo-hoo!", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Ace hands Rosa a Form 706 marked portability. Rosa beams. Hoot droops.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={70} y={128} scale={0.74} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="706" sub="portability" color="#d8f0e2" />} />
        <Rosa x={170} y={128} scale={0.74} mood="excited" />
        <Hoot x={270} y={132} scale={0.6} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Not yet! Rosa can still file a 706 just to elect portability, up to 5 years after Bert's death.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Rosa", text: "Bert, you sweetheart!", x: 62, y: 6, w: 35, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The gross estate",
    alt: "A big box holding the house, stock, IRA, life insurance Walt owned, half of joint property with a spouse, and the stamp album.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <WaltPortrait x={22} y={30} scale={0.9} mood="happy" />
        <Card x={110} y={12} w={198} h={30} lines={["Home, stock, cash, collectibles"]} size={10} color="#fff" />
        <Card x={110} y={48} w={198} h={30} lines={["IRAs, 401(k)s, annuities"]} size={10} color="#fff" />
        <Card x={110} y={84} w={198} h={30} lines={["Life insurance he owned"]} size={10} color="#fff" />
        <Card x={110} y={120} w={198} h={30} lines={["Half of joint property with spouse"]} size={10} color="#fff" />
        <Label x={60} y={160} size={10} weight={700}>at fair market value</Label>
      </svg>
    ),
    body: [
      "The gross estate is the fair market value of everything the decedent owned or had certain interests in at death: real estate, cash, securities, business interests, collectibles, retirement accounts and annuities, and life insurance on their life if they owned the policy (incidents of ownership) or it's payable to the estate.",
      "Property held jointly with a spouse is generally half included; jointly held with others, it's included except to the extent the other owner contributed. Certain transfers within 3 years of death, like giving away a life insurance policy, are pulled back in.",
    ],
    keyPoint: "Gross estate = FMV of everything owned at death, including retirement accounts, life insurance the decedent owned or payable to the estate, half of spousal joint property; life insurance given away within 3 years is pulled back in.",
  },
  {
    title: "Valuation date",
    alt: "Two calendars: date of death, or the alternate valuation date six months later, allowed only if it lowers both the gross estate and the tax.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Calendar x={70} y={60} month="AUG" day="10" scale={0.9} />
        <Calendar x={250} y={60} month="FEB" day="10" scale={0.9} color="#3f7cc4" />
        <Label x={70} y={126} size={11}>date of death</Label>
        <Label x={250} y={126} size={11}>+6 months</Label>
        <Label x={160} y={156} size={10} weight={700}>Alternate date only if gross estate AND tax go down</Label>
        <Label x={160} y={172} size={10} weight={700}>Sold before then? Value on the sale date</Label>
      </svg>
    ),
    body: [
      "Estate property is valued at fair market value on the date of death. The executor can elect alternate valuation, six months after death, only if it reduces both the gross estate and the estate tax (plus GST tax).",
      "Under alternate valuation, property sold or distributed within the six months is valued on that date. The election applies to all the property, and the beneficiaries' basis follows the value used.",
    ],
    keyPoint: "Value at date of death, or elect alternate valuation (6 months later) only if it reduces BOTH the gross estate and the tax; property sold/distributed earlier is valued at that date; heirs' basis follows.",
  },
  {
    title: "Deductions from the gross estate",
    alt: "A list of deductions: unlimited marital (citizen spouse) and charitable deductions, plus debts, mortgages, funeral and administration expenses, and state death taxes.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={140} h={70} color="#fde2e4" label="Spouse" sub="unlimited (citizen)" />
        <Step x={166} y={14} w={140} h={70} color="#d8f0e2" label="Charity" sub="unlimited" />
        <Card x={14} y={96} w={292} h={70} lines={["Debts and mortgages, funeral costs,", "administration expenses, state death taxes"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "The taxable estate is the gross estate minus deductions: the unlimited marital deduction for property passing to a surviving spouse who is a U.S. citizen (a noncitizen spouse needs a qualified domestic trust), the unlimited charitable deduction, debts and mortgages, funeral expenses, administration expenses, and state estate or inheritance taxes.",
      "Adjusted taxable gifts made after 1976 are then added back before figuring the tentative tax.",
    ],
    keyPoint: "Taxable estate = gross estate − marital (unlimited, citizen spouse; QDOT for noncitizen) − charitable (unlimited) − debts, mortgages, funeral and administration expenses − state death taxes. Then add adjusted taxable gifts.",
  },
  {
    title: "The exclusion and the 706",
    alt: "A tall bar reading $13,990,000 for 2025 deaths, then a calendar: Form 706 due 9 months after death, with a 6-month extension on Form 4768.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="$13.99M" sub="2025 deaths" />
        <Card x={166} y={14} w={140} h={48} lines={["Due 9 months", "after death"]} size={11} color="#fff" />
        <Card x={166} y={68} w={140} h={46} lines={["+6 months:", "Form 4768"]} size={11} color="#fff3c4" />
        <Label x={160} y={142} size={10} weight={700}>File if gross estate + adjusted taxable gifts</Label>
        <Label x={160} y={158} size={10} weight={700}>exceed the exclusion. Top rate 40%.</Label>
      </svg>
    ),
    body: [
      "For people who die in 2025, the basic exclusion amount is $13,990,000 ($15,000,000 for 2026). Form 706 is required when the gross estate plus adjusted taxable gifts exceeds that amount, and the top rate is 40%.",
      "Form 706 is due 9 months after the date of death. Form 4768 gets an automatic 6-month extension to file; an extension of time to pay must be requested separately and needs a reason.",
    ],
    keyPoint: "2025 deaths: $13,990,000 exclusion (2026: $15,000,000); top rate 40%. Form 706 required if gross estate + adjusted taxable gifts > exclusion; due 9 months after death; Form 4768 = 6-month extension to file (paying is separate).",
  },
  {
    title: "Portability (DSUE)",
    alt: "Bert's unused exclusion passing to Rosa through a Form 706, even years later.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#f3e1ef" floorY={160} />
        <Card x={14} y={20} w={110} h={60} lines={["Bert's", "unused"]} size={12} color="#fff" />
        <Paper x={160} y={50} label="706" sub="elect" scale={1.2} color="#d8f0e2" />
        <Rosa x={256} y={118} scale={0.42} mood="happy" flip />
        <Card x={14} y={96} w={180} h={56} lines={["Timely 706, or up to", "5 years if not required"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Portability lets a surviving spouse use the deceased spouse's unused exclusion amount (DSUE). The executor elects it on a complete, timely filed Form 706, even when no 706 is otherwise required.",
      "If no 706 was required, the estate can still elect portability up to 5 years after the date of death under Rev. Proc. 2022-32. The surviving spouse then adds the DSUE to their own exclusion for lifetime gifts and their estate.",
    ],
    keyPoint: "Portability: the surviving spouse gets the deceased spouse's unused exclusion (DSUE), elected on a timely 706 even if not otherwise required; up to 5 years after death if no 706 was required (Rev. Proc. 2022-32).",
  },
  {
    title: "The estate's own income tax return",
    alt: "Form 1041 for the estate's income after death, required at $600 of gross income, plus Form 56 to notify the IRS of the executor.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef0d8" />
        <Paper x={60} y={80} label="1041" sub="estate" scale={1.8} color="#fff3c4" />
        <Card x={120} y={14} w={188} h={42} lines={["$600+ of gross income"]} size={11} color="#fff" />
        <Card x={120} y={64} w={188} h={42} lines={["Fiscal year allowed"]} size={11} color="#fff" />
        <Card x={120} y={114} w={188} h={52} lines={["Form 56: who's", "the fiduciary"]} size={11} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "After death, income on the estate's assets (interest, dividends, rent) belongs to the estate. The executor files Form 1041 if the estate has gross income of $600 or more for the year (or a beneficiary is a nonresident alien). An estate can choose a calendar or fiscal year.",
      "Income distributed to beneficiaries is generally taxed to them (reported on Schedule K-1), and the estate deducts it. Form 56 notifies the IRS that a fiduciary is acting for the decedent or estate.",
    ],
    keyPoint: "Estate income after death → Form 1041 if gross income ≥ $600; estates can use a fiscal year; distributions taxed to beneficiaries via K-1. Form 56 notifies the IRS of the fiduciary.",
  },
];

const lesson: Lesson = {
  id: "p1-estate-tax",
  part: "part1",
  domainId: "p1d6",
  number: "6.1",
  episode: "Grandpa's Estate",
  title: "Estate tax",
  minutes: 13,
  lawAsOf: "2025 deaths (rules in effect for 2025)",
  intro: "What's in the gross estate, date-of-death and alternate valuation, deductions, the $13,990,000 exclusion and Form 706 deadlines, portability, and the estate's Form 1041.",
  previously: "Dee won her innocent spouse relief. Back at Rosa's Rolls, Grandpa Walt's portrait is worried the tax world has overlooked his stamps.",
  comic,
  cards,
  hook: {
    line: "706: 9 months after death, plus 6 with Form 4768.",
    more: "$13,990,000 exclusion for 2025 deaths. Portability needs a 706, even when none is required.",
    alt: "Walt's portrait next to a calendar reading 9 months.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#f3e1ef" />
        <WaltPortrait x={20} y={16} scale={0.95} mood="happy" />
        <Paper x={150} y={60} label="706" sub="9 months" scale={1.4} color="#fff3c4" />
        <Mark x={250} y={68} text="+6" color="#3f7cc4" size={26} />
      </svg>
    ),
  },
  traps: [
    { title: "Alternate valuation to save income tax", text: "It's allowed only if it lowers both the gross estate and the estate tax." },
    { title: "Skipping the 706 for a small estate", text: "No 706 is required, but without one the surviving spouse loses portability (unless filed within 5 years under the relief procedure)." },
    { title: "The extension covers payment", text: "Form 4768's automatic 6 months is to file. More time to pay is a separate request." },
    { title: "Leaving out life insurance", text: "A policy the decedent owned, or one payable to the estate, is in the gross estate." },
  ],
  sources: [
    { key: "i706", section: "Who Must File; When To File; Alternate Valuation; Portability" },
    { key: "estate", section: "Estate tax; Basic exclusion amount" },
    { key: "i1041", section: "Who Must File" },
  ],
  cases: [
    {
      who: "Penny",
      title: "Does Walt need a 706?",
      facts: "Grandpa Walt died in August 2025, a widower, with a $900,000 gross estate and no taxable gifts.",
      question: "Must his executor file Form 706?",
      choices: ["Yes, every estate files", "No; it's under the $13,990,000 exclusion", "Yes, because there's an IRA", "Only if the heirs want stepped-up basis"],
      answer: "No; it's under the $13,990,000 exclusion",
      why: "Form 706 is required only when the gross estate plus adjusted taxable gifts exceeds the basic exclusion amount ($13,990,000 for 2025). With no surviving spouse, there's no portability to elect.",
    },
    {
      who: "Ace",
      title: "The due date",
      facts: "A client died on March 10, 2025 with a $16 million estate.",
      question: "When is Form 706 due without an extension, and how long can Form 4768 extend it?",
      choices: ["April 15, 2026; 6 months", "December 10, 2025; 6 months", "March 10, 2026; 1 year", "December 10, 2025; to pay as well"],
      answer: "December 10, 2025; 6 months",
      why: "Form 706 is due 9 months after death (December 10, 2025). Form 4768 gives an automatic 6-month extension to file, not to pay.",
    },
    {
      who: "Hoot",
      title: "The life insurance policy",
      facts: "Walt owned a $50,000 policy on his own life, payable to Penny.",
      question: "Is it in his gross estate?",
      choices: ["No; it's paid to Penny", "Yes; he owned the policy", "Only half", "Only if the estate is taxable"],
      answer: "Yes; he owned the policy",
      why: "Life insurance on the decedent's life is in the gross estate if the decedent held incidents of ownership or it's payable to the estate, whoever the beneficiary is.",
    },
    {
      who: "Rosa",
      title: "Bert's unused exclusion",
      facts: "Uncle Bert died in 2023 (exclusion $12,920,000), leaving his $2 million estate entirely to Rosa. No 706 was filed. It's now 2025.",
      question: "Can Rosa still get Bert's unused exclusion?",
      choices: ["No; the 706 was due in 2024", "Yes: file a 706 for Bert within 5 years of his death to elect portability of $12,920,000", "Yes, but only $2 million of DSUE", "Yes, by electing it on her own 1040"],
      answer: "Yes: file a 706 for Bert within 5 years of his death to elect portability of $12,920,000",
      why: "Bert's estate wasn't required to file, so Rev. Proc. 2022-32 allows a portability election up to 5 years after death. All his estate passed to Rosa (marital deduction), so his whole exclusion is unused.",
    },
    {
      who: "Milo",
      title: "Sell before six months",
      facts: "An estate elects alternate valuation. The executor sold stock worth $100,000 at death for $80,000 three months later. Six months after death it would have been worth $70,000.",
      question: "What value is used for the stock?",
      choices: ["$100,000", "$70,000", "$85,000", "$80,000"],
      answer: "$80,000",
      why: "Under alternate valuation, property sold or distributed within six months of death is valued on the date it was sold: $80,000.",
    },
  ],
  quizTopics: ["Estate tax return", "Portability"],
  quizBrief: "Estate tax: gross estate, date of death vs alternate valuation, deductions, $13,990,000 exclusion (2025), Form 706 due 9 months + 6-month extension, portability (DSUE), Form 1041 and Form 56",
};

export default lesson;

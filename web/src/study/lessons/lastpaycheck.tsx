import { Ace, Arrow, Backdrop, Hoot, Label, Milo, Penny, Rosa, WaltPortrait } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, Envelope, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 1, topic 4.4: special taxpayers: income in respect of a decedent and final returns, clergy, and
// military. Written to the rules for tax year 2025 from Publications 559, 517 and 3.

const INK = "#17202c";

/** A framed photo of Ace's sister, Sergeant Nia Okafor, in uniform. (x, y) is the top-left. */
function NiaPhoto({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={0} y={0} width={56} height={66} rx={3} fill="#c9a24a" stroke={INK} strokeWidth={2.5} />
      <rect x={6} y={6} width={44} height={54} fill="#d4ebfa" stroke={INK} strokeWidth={1.5} />
      <path d="M12,60 Q12,42 28,40 Q44,42 44,60 Z" fill="#6b7a4a" stroke={INK} strokeWidth={1.5} />
      <circle cx={28} cy={30} r={10} fill="#9a6646" stroke={INK} strokeWidth={1.5} />
      <path d="M17,24 Q28,12 39,24 Z" fill="#6b7a4a" stroke={INK} strokeWidth={1.5} />
      <path d="M24,48 l4,4 l4,-4" fill="none" stroke="#f6d33c" strokeWidth={2} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Grandpa Walt's portrait on the bakery wall speaks. Aunt Rosa, holding an envelope, answers him.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <WaltPortrait x={36} y={70} scale={1.05} mood="stern" />
        <Rosa x={236} y={128} scale={0.76} mood="happy" flip pose="hold" holding={<Envelope x={0} y={-8} label="PAY" />} />
      </svg>
    ),
    bubbles: [
      { who: "Walt", text: "Rosa! You still owe me my last paycheck from the bakery!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Rosa", text: "Hush, Walter. I'm paying it to Penny, like your will says.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a $2,000 check labeled Walt's last pay. Ace holds a card reading IRD.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="$2,000" sub="Walt's pay" color="#d8f0e2" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-26} y={-22} w={52} h={30} lines={["IRD"]} size={13} color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Grandpa's last paycheck. Is it his income, or mine?", x: 3, y: 3, w: 42, tail: "down-left" },
      { who: "Ace", text: "Income in respect of a decedent, Penny. It's yours, taxed when you receive it, just as it would have been to Walt.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot wags a feather at a basis tag. Walt's portrait looks shocked.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Hoot x={84} y={128} scale={0.72} mood="smug" pose="point" />
        <WaltPortrait x={200} y={66} scale={1.05} mood="shocked" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-hoo! And IRD gets NO step-up in basis. Not like your stock, Walt Pocket.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Walt", text: "Not even for a paycheck?!", x: 62, y: 6, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Penny signs a Form 1040 marked final return. Ace holds a calendar reading April 15.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="1040" sub="FINAL" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Calendar x={0} y={-10} month="APR" day="15" scale={0.6} />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "And Grandpa's own 2025 return?", x: 3, y: 4, w: 36, tail: "down-left" },
      { who: "Ace", text: "His final 1040 covers January 1 to the day he died, Penny. Due April 15, and you sign it as executor.", x: 44, y: 2, w: 53, tail: "down-right" },
    ],
  },
  {
    alt: "Penny asks about her friend Pastor Gail. Ace and Hoot answer together.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={60} y={128} scale={0.72} mood="thinking" />
        <Ace x={170} y={128} scale={0.72} mood="happy" pose="point" flip />
        <Hoot x={268} y={130} scale={0.64} mood="stern" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Pastor Gail's church gives her a housing allowance. Tax-free?", x: 3, y: 2, w: 36, tail: "down-left" },
      { who: "Ace", text: "Free of income tax, Penny. But ministers pay SE tax on it...", x: 40, y: 2, w: 30, tail: "down" },
      { who: "Hoot", text: "...unless she has an approved Form 4361!", x: 72, y: 2, w: 26, tail: "down-right" },
    ],
  },
  {
    alt: "Ace proudly holds a framed photo of his sister, Sergeant Nia, in uniform. Milo salutes.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<NiaPhoto x={-28} y={-34} scale={1} />} />
        <Milo x={240} y={128} scale={0.78} mood="excited" flip pose="wave" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "My sister Nia's pay in a combat zone is excluded, and she gets at least 180 extra days to file.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Milo", text: "Thank you for your service, Sergeant Nia!", x: 58, y: 4, w: 39, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Income in respect of a decedent",
    alt: "Walt's portrait above a basket of items he'd earned but not received: final paycheck, IRA, accrued interest, installment payments. All flow to whoever receives them.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <WaltPortrait x={22} y={24} scale={0.9} mood="happy" />
        <Card x={110} y={14} w={198} h={30} lines={["Final wages paid after death"]} size={10} color="#fff" />
        <Card x={110} y={50} w={198} h={30} lines={["IRA and 401(k) balances"]} size={10} color="#fff" />
        <Card x={110} y={86} w={198} h={30} lines={["Installment payments still due"]} size={10} color="#fff" />
        <Card x={110} y={122} w={198} h={30} lines={["Interest and fees earned, unpaid"]} size={10} color="#fff" />
        <Label x={60} y={150} size={10} weight={700}>taxed to whoever</Label>
        <Label x={60} y={164} size={10} weight={700}>receives it</Label>
      </svg>
    ),
    body: [
      "Income in respect of a decedent (IRD) is income the person had a right to but didn't receive before death, and that wasn't included on their final return: final wages and bonuses paid after death, traditional IRA and retirement plan balances, accrued interest, and payments still due on an installment sale.",
      "IRD is taxed to whoever receives it (the estate or a beneficiary), in the year received, with the same character it would have had for the decedent.",
    ],
    keyPoint: "IRD = income the decedent earned or had a right to but hadn't received (final pay, IRAs/401(k)s, accrued interest, installment payments). Taxed to the recipient when received, same character.",
  },
  {
    title: "No step-up, but a deduction for estate tax",
    alt: "Two items inherited: stock gets a stepped-up basis; an IRA (IRD) gets none. A small coupon shows the section 691(c) deduction for estate tax paid on IRD.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={40} w={140} h={90} color="#d8f0e2" label="Stock" sub="basis steps up" />
        <Step x={166} y={40} w={140} h={90} color="#fde2e4" label="IRD" sub="no step-up" />
        <Label x={160} y={156} size={11}>Estate tax on IRD? An itemized deduction for it</Label>
        <Label x={160} y={172} size={10} weight={700}>(section 691(c))</Label>
      </svg>
    ),
    body: [
      "Property inherited from a decedent usually gets a basis equal to fair market value at death. IRD items don't: they're taxed in full as income when received.",
      "If the estate paid federal estate tax that's attributable to IRD, the recipient can take an itemized deduction for that estate tax (section 691(c)), which isn't subject to the old 2% floor.",
    ],
    keyPoint: "IRD gets no stepped-up basis. If estate tax was paid on IRD, the recipient gets an itemized deduction for that estate tax (§691(c)).",
  },
  {
    title: "The final paycheck: who reports what",
    alt: "A calendar split: wages paid after death but in the same year go on the W-2 for Social Security and Medicare only, plus a 1099-MISC to the recipient. Paid in a later year: 1099-MISC only.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={14} w={140} h={150} color="#fff">
          <Label x={84} y={36} size={11}>Paid same year</Label>
          <Label x={84} y={62} size={10} weight={700}>W-2: Social Security</Label>
          <Label x={84} y={78} size={10} weight={700}>and Medicare only</Label>
          <Label x={84} y={104} size={10} weight={700}>1099-MISC to the</Label>
          <Label x={84} y={120} size={10} weight={700}>person paid</Label>
        </Card>
        <Card x={166} y={14} w={140} h={150} color="#fff3c4">
          <Label x={236} y={36} size={11}>Paid next year</Label>
          <Label x={236} y={62} size={10} weight={700}>no Social Security</Label>
          <Label x={236} y={78} size={10} weight={700}>or Medicare</Label>
          <Label x={236} y={104} size={10} weight={700}>1099-MISC to the</Label>
          <Label x={236} y={120} size={10} weight={700}>person paid</Label>
        </Card>
      </svg>
    ),
    body: [
      "Wages paid after an employee's death in the same calendar year are subject to Social Security and Medicare (shown on the decedent's W-2) but not income tax withholding, and they're reported on Form 1099-MISC to the estate or beneficiary who receives them.",
      "If paid in a later year, they aren't subject to Social Security and Medicare at all and go only on the 1099-MISC. Either way, they're IRD to the recipient, not income on the decedent's final return.",
    ],
    keyPoint: "Wages paid after death: same year → Social Security/Medicare on the decedent's W-2, no income tax withholding, 1099-MISC to the recipient. Later year → 1099-MISC only. Taxed to the recipient as IRD.",
  },
  {
    title: "The decedent's final return",
    alt: "A Form 1040 marked final covering January 1 to the date of death, due April 15 of next year, signed by the executor. A surviving spouse can file jointly; Form 1310 claims a refund.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Paper x={56} y={80} label="1040" sub="FINAL" scale={1.8} />
        <Card x={110} y={14} w={198} h={34} lines={["Jan 1 → date of death"]} size={11} color="#fff" />
        <Card x={110} y={54} w={198} h={34} lines={["Due April 15 next year"]} size={11} color="#fff" />
        <Card x={110} y={94} w={198} h={34} lines={["Executor signs; spouse may file joint"]} size={10} color="#fff" />
        <Card x={110} y={134} w={198} h={34} lines={["Refund to others: Form 1310"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "The personal representative files the decedent's final Form 1040 for the year of death, reporting income received through the date of death. It's due on the normal date, April 15 of the next year, and the full standard deduction is allowed.",
      "A surviving spouse can file a joint return for the year of death. A refund claimed by anyone other than a surviving spouse on a joint return or a court-appointed representative needs Form 1310. Form 56 notifies the IRS of the fiduciary relationship.",
    ],
    keyPoint: "Final 1040: income through date of death, due April 15 of next year, signed by the personal representative; surviving spouse may file jointly. Form 1310 to claim a refund (unless surviving spouse joint or court-appointed rep). Form 56 for the fiduciary.",
  },
  {
    title: "Clergy: two tax systems at once",
    alt: "A minister split in two: an employee for income tax, and self-employed for Social Security and Medicare. The housing allowance is excluded from income tax but included for SE tax.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#efe3f7" />
        <Card x={14} y={14} w={140} h={110} color="#d4ebfa">
          <Label x={84} y={36} size={11}>Income tax</Label>
          <Label x={84} y={62} size={10} weight={700}>usually an employee</Label>
          <Label x={84} y={82} size={10} weight={700}>housing allowance</Label>
          <Label x={84} y={98} size={10} weight={700}>excluded (limits)</Label>
        </Card>
        <Card x={166} y={14} w={140} h={110} color="#fde2e4">
          <Label x={236} y={36} size={11}>SE tax</Label>
          <Label x={236} y={62} size={10} weight={700}>always self-employed</Label>
          <Label x={236} y={82} size={10} weight={700}>housing allowance</Label>
          <Label x={236} y={98} size={10} weight={700}>included</Label>
        </Card>
        <Label x={160} y={148} size={10} weight={700}>Housing exclusion: least of amount designated,</Label>
        <Label x={160} y={164} size={10} weight={700}>actual costs, or fair rental value (+ utilities)</Label>
      </svg>
    ),
    body: [
      "Ministers have dual status. For income tax they're usually employees of the church, but for Social Security and Medicare they're always self-employed for their ministerial services and pay SE tax. Churches don't withhold income tax unless the minister asks, so ministers usually pay estimated tax.",
      "A housing (parsonage) allowance designated in advance is excluded from income tax up to the least of the amount designated, the actual housing costs, or the fair rental value of the home (furnished, plus utilities). It's still included in net earnings for SE tax.",
    ],
    keyPoint: "Ministers: employee for income tax, self-employed for SE tax on ministerial pay. Housing allowance excluded from income tax (least of designated amount, actual costs, FRV + utilities) but included for SE tax.",
  },
  {
    title: "Opting out of SE tax: Form 4361",
    alt: "A Form 4361 with a stamp reading irrevocable, and a calendar showing the due date of the return for the second year with $400 of ministry earnings.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Paper x={70} y={84} label="4361" sub="exemption" scale={2} color="#fff" />
        <Card x={140} y={20} w={168} h={44} lines={["Opposed on religious", "grounds to public insurance"]} size={9} color="#fff" />
        <Card x={140} y={72} w={168} h={44} lines={["File by the due date for the 2nd", "year with $400+ ministry SE"]} size={9} color="#fff" />
        <Card x={140} y={124} w={168} h={40} lines={["Approved = irrevocable"]} size={11} color="#fde2e4" />
      </svg>
    ),
    body: [
      "A minister who is conscientiously opposed, on religious principles, to accepting public insurance for ministerial services can apply for exemption from SE tax on those earnings with Form 4361. It must be filed by the due date (including extensions) of the return for the second year with $400 or more of net ministerial self-employment earnings.",
      "Once approved, it's irrevocable and covers only ministerial earnings. Disagreeing with Social Security for economic reasons doesn't qualify.",
    ],
    keyPoint: "Form 4361: SE-tax exemption for ministers conscientiously opposed (religious grounds) to public insurance; file by the due date of the 2nd year with $400+ ministerial SE earnings; irrevocable; ministerial earnings only.",
  },
  {
    title: "Military: combat pay and more time",
    alt: "Sergeant Nia's photo next to three cards: combat zone pay excluded (officers capped), 180 extra days to file and pay, moving expenses deductible for permanent change of station.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef0d8" />
        <NiaPhoto x={20} y={50} scale={1.1} />
        <Card x={100} y={12} w={208} h={44} lines={["Combat zone pay: excluded", "(officers up to a cap)"]} size={10} color="#d8f0e2" />
        <Card x={100} y={64} w={208} h={44} lines={["180 days after leaving the", "zone (+ days there) to file"]} size={10} color="#fff3c4" />
        <Card x={100} y={116} w={208} h={44} lines={["Moving costs: active duty", "PCS only (Form 3903)"]} size={10} color="#d4ebfa" />
      </svg>
    ),
    body: [
      "Pay for active service in a combat zone is excluded from income: all of it for enlisted members and warrant officers, and up to the highest enlisted pay plus imminent danger pay for commissioned officers. Members can elect to include nontaxable combat pay in earned income for the EITC.",
      "Those serving in a combat zone get at least 180 days after leaving it, plus the days they were there, to file and pay. Members of the Armed Forces on active duty who move because of a permanent change of station can still deduct unreimbursed moving expenses (Form 3903), and reservists who travel more than 100 miles from home for duty can deduct travel costs as an adjustment.",
    ],
    keyPoint: "Military: combat zone pay excluded (enlisted fully; officers capped); can elect to count it for the EITC. Combat zone: 180 days after leaving + days served to file/pay. Moving expenses: active duty PCS only (Form 3903). Reservists > 100 miles: travel adjustment.",
  },
];

const lesson: Lesson = {
  id: "p1-special-taxpayers",
  part: "part1",
  domainId: "p1d4",
  number: "4.4",
  episode: "Grandpa's Last Paycheck",
  title: "Special taxpayers",
  minutes: 13,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "Income in respect of a decedent and the final return, ministers' dual tax status and housing allowance, and military pay and deadlines.",
  previously: "Penny met the surtaxes. At Rosa's Rolls, Grandpa Walt's portrait has a complaint about his old part-time job.",
  comic,
  cards,
  hook: {
    line: "IRD: taxed to whoever gets it, never stepped up.",
    more: "Ministers: employee for income tax, self-employed for SE tax. Combat zone: pay excluded, 180 extra days.",
    alt: "Walt's portrait next to a paycheck stamped no step-up.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#f3e1ef" />
        <WaltPortrait x={20} y={16} scale={0.95} mood="worried" />
        <Arrow d="M100,60 H140" />
        <Paper x={170} y={60} label="IRD" sub="no step-up" scale={1.4} color="#fde2e4" />
        <Mark x={260} y={66} text="180 days" color="#3f7cc4" size={16} />
      </svg>
    ),
  },
  traps: [
    { title: "Final pay on the final return", text: "Wages paid after death are IRD to the person who receives them, not income on the decedent's final 1040." },
    { title: "Stepping up an IRA", text: "IRD items like IRAs and final wages get no stepped-up basis." },
    { title: "Housing allowance is tax-free", text: "It's excluded from income tax only. Ministers include it in SE earnings." },
    { title: "Moving expenses for everyone", text: "Only active-duty military moving under a permanent change of station can deduct moving expenses." },
  ],
  sources: [
    { key: "p559", section: "Final Return for Decedent; Income in Respect of a Decedent" },
    { key: "p517", section: "Social Security Coverage; Exemption From Self-Employment Tax; Housing allowance" },
    { key: "p3", section: "Combat Zone Exclusion; Extension of Deadlines; Moving Expenses" },
  ],
  cases: [
    {
      who: "Penny",
      title: "Walt's last paycheck",
      facts: "Grandpa Walt died in August 2025. In September 2025, Rosa's Rolls paid his final $2,000 paycheck to Penny, his beneficiary.",
      question: "Who reports the $2,000 as income?",
      choices: ["Walt, on his final 1040", "Penny, as income in respect of a decedent", "No one; it's an inheritance", "Rosa's Rolls"],
      answer: "Penny, as income in respect of a decedent",
      why: "Wages a decedent earned but didn't receive before death are IRD, taxed to the person who receives them. They aren't on the final return.",
    },
    {
      who: "Rosa",
      title: "Rosa's payroll forms",
      facts: "Rosa's Rolls paid Walt's final wages to Penny in 2025, the same year he died.",
      question: "How does the bakery report the payment?",
      choices: ["On Walt's W-2 with full income tax withholding", "On Walt's W-2 for Social Security and Medicare only, and on a 1099-MISC to Penny", "On a W-2 to Penny", "It doesn't need to report it"],
      answer: "On Walt's W-2 for Social Security and Medicare only, and on a 1099-MISC to Penny",
      why: "Wages paid after death in the same year are subject to Social Security and Medicare (on the decedent's W-2), not income tax withholding, and are reported to the recipient on Form 1099-MISC.",
    },
    {
      who: "Hoot",
      title: "The inherited IRA's basis",
      facts: "Penny inherited Walt's traditional IRA, worth $80,000 at his death. Walt had no basis in it.",
      question: "What basis does Penny have in the IRA?",
      choices: ["$80,000, stepped up", "$0; distributions are fully taxable as IRD", "$40,000", "Walt's contributions"],
      answer: "$0; distributions are fully taxable as IRD",
      why: "A traditional IRA is income in respect of a decedent. IRD gets no step-up in basis, so distributions are taxable to the beneficiary.",
    },
    {
      who: "Ace",
      title: "Pastor Gail's allowance",
      facts: "Pastor Gail's church designated a $24,000 housing allowance for 2025. Her actual housing costs were $20,000; the fair rental value of her home with utilities is $22,000.",
      question: "How much is excluded from her income tax, and what about SE tax?",
      choices: ["$24,000 excluded from both", "$20,000 excluded from income tax; all $24,000 included for SE tax", "$22,000 excluded from income tax only", "Nothing; ministers can't exclude housing"],
      answer: "$20,000 excluded from income tax; all $24,000 included for SE tax",
      why: "The exclusion is the least of the designated amount, actual costs and fair rental value: $20,000. The excess $4,000 is taxable. For SE tax, the whole allowance is included.",
    },
    {
      who: "Milo",
      title: "Sergeant Nia's pay",
      facts: "Ace's sister Nia, an enlisted sergeant, served in a combat zone for six months of 2025 and earned $24,000 of basic pay there.",
      question: "How much of that pay is taxable?",
      choices: ["$24,000", "$12,000", "$0", "Only the imminent danger pay"],
      answer: "$0",
      why: "All pay an enlisted member receives for active service in a combat zone is excluded. (Officers' exclusions are capped.)",
    },
  ],
  quizTopics: [],
  quizBrief: "Special taxpayers: income in respect of a decedent (no step-up, 691(c) deduction), final wages after death, final Form 1040, clergy dual status and housing allowance, Form 4361, military combat pay",
};

export default lesson;

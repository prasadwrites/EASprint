import { Ace, Arrow, Backdrop, Biscuit, Cash, Hoot, Label, Lulu, Milo, Penny } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 1, topic 4.2: self-employment tax and household employees. Written to the rules for tax year 2025
// from the Schedule SE rules in Publication 334 and Publication 926.

const INK = "#17202c";

/** A worker wearing two hats at once: employee and employer. (x, y) is the center of the head. */
function TwoHats({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-34,-24 L-8,-30 L-6,-14 L-32,-8 Z" fill="#3f7cc4" stroke={INK} strokeWidth={2} />
      <path d="M6,-30 Q22,-44 34,-28 L36,-16 H4 Z" fill="#1d1d22" stroke={INK} strokeWidth={2} />
      <path d="M0,-16 H40" stroke={INK} strokeWidth={3} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Milo throws dollar bills in the air, Biscuit leaping beside him. Hoot appears with a clipboard.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Cash x={100} y={60} rotate={-20} />
        <Cash x={150} y={40} rotate={14} />
        <Milo x={84} y={128} scale={0.78} mood="excited" pose="up" />
        <Biscuit x={156} y={176} scale={0.34} mood="excited" />
        <Hoot x={248} y={128} scale={0.72} mood="smug" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "$40,000 profit and no boss taking taxes out! I'm FREE!", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Hoot", text: "Free? Hoo-hoo! Self-employment tax: 15.3%, Milo Marsh.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Milo wears two hats at once, a worker's cap and a boss's top hat. Ace explains.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef0d8" />
        <Milo x={84} y={128} scale={0.78} mood="thinking" />
        <TwoHats x={84} y={100} scale={0.9} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "You're the worker AND the boss now, Milo. 12.4% Social Security plus 2.9% Medicare, on 92.35% of your profit.", x: 36, y: 2, w: 61, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds a Schedule SE showing $5,652. Ace holds a card reading half is deductible.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="shocked" pose="hold" holding={<Paper x={0} y={-8} label="SCH SE" sub="$5,652" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-30} y={-24} w={60} h={34} lines={["HALF OFF"]} size={10} color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Five thousand six hundred fifty-two dollars?!", x: 3, y: 4, w: 40, tail: "down-left", shout: true },
      { who: "Ace", text: "And half of it, Milo, is an above-the-line deduction. Bosses deduct their share.", x: 50, y: 3, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Penny introduces a nanny badge reading JOY, $15,000 a year. Hoot leans in with his clipboard.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde2e4" />
        <Penny x={84} y={128} scale={0.78} mood="happy" pose="hold" holding={<Card x={-30} y={-22} w={60} h={34} lines={["NANNY", "JOY"]} size={10} color="#fff" />} />
        <Hoot x={244} y={128} scale={0.72} mood="smug" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "We hired Joy, a nanny for Lulu after school. $15,000 a year.", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Hoot", text: "A household employee! Cash wages of $2,800 or more: Social Security and Medicare. Schedule H, Penny Pocket.", x: 50, y: 2, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu holds up a babysitter card reading TESS, 16. Ace gives a thumbs up.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde2e4" />
        <Lulu x={84} y={160} scale={0.56} mood="smug" pose="hold" holding={<Card x={-26} y={-16} w={52} h={28} lines={["TESS, 16"]} size={9} color="#fff3c4" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "What about Tess, my weekend babysitter? She's 16 and in school.", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Workers under 18 who are students are exempt, Lulu. No Social Security or Medicare on Tess's pay.", x: 51, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a W-2 for Joy and a Schedule H. Ace holds a FUTA card.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="SCH H" sub="+ W-2" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-28} y={-22} w={56} h={30} lines={["FUTA"]} size={12} color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "So Joy gets a W-2, and Schedule H goes with our 1040?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Exactly, Penny. And federal unemployment tax too, since you paid over $1,000 in a quarter.", x: 51, y: 3, w: 46, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Self-employment tax: $400 and up",
    alt: "Milo's Schedule C profit flows into Schedule SE. A gate at $400 decides whether SE tax applies.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef0d8" />
        <Paper x={50} y={80} label="SCH C" sub="profit" scale={1.5} />
        <Arrow d="M86,80 H130" />
        <rect x={134} y={40} width={18} height={80} fill="#9aa4b2" stroke={INK} strokeWidth={2} />
        <Label x={143} y={140} size={12}>$400</Label>
        <Arrow d="M156,80 H200" />
        <Paper x={240} y={80} label="SCH SE" sub="15.3%" scale={1.5} color="#fff3c4" />
      </svg>
    ),
    body: [
      "Self-employed people pay self-employment tax (Social Security and Medicare) on Schedule SE when net earnings from self-employment are $400 or more. It applies to sole proprietors, independent contractors and general partners' share of partnership income, including guaranteed payments.",
      "It applies even if no income tax is owed, and even if the person also has a job with wages.",
    ],
    keyPoint: "SE tax (Schedule SE) applies when net earnings from self-employment are $400+: sole proprietors, contractors, general partners (incl. guaranteed payments), even with no income tax due.",
  },
  {
    title: "How it's figured",
    alt: "A calculator path: $40,000 profit times 92.35 percent equals $36,940, times 15.3 percent equals $5,652. Social Security part stops at $176,100.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Card x={10} y={20} w={92} h={44} lines={["$40,000", "profit"]} size={11} color="#fff" />
        <Arrow d="M104,42 H118" />
        <Card x={120} y={20} w={92} h={44} lines={["× 92.35%", "= $36,940"]} size={11} color="#fff" />
        <Arrow d="M214,42 H228" />
        <Card x={230} y={20} w={80} h={44} lines={["× 15.3%", "= $5,652"]} size={11} color="#d8f0e2" />
        <Step x={30} y={90} w={120} h={76} color="#d4ebfa" label="12.4% SS" sub="up to $176,100" />
        <Step x={170} y={90} w={120} h={76} color="#fde2e4" label="2.9% Medicare" sub="no limit" />
      </svg>
    ),
    body: [
      "Net earnings from self-employment are 92.35% of net profit. The SE tax rate is 15.3%: 12.4% Social Security on earnings up to the 2025 wage base of $176,100, and 2.9% Medicare on all of it (plus the 0.9% Additional Medicare Tax at higher incomes, episode 4.3).",
      "Wages from a job count first toward the $176,100 Social Security base, so someone with high wages pays only the Medicare part on self-employment income.",
    ],
    keyPoint: "SE tax = net profit × 92.35% × 15.3% (12.4% SS up to $176,100 for 2025, reduced by W-2 SS wages; 2.9% Medicare unlimited).",
  },
  {
    title: "Half of it is deductible",
    alt: "The $5,652 of SE tax split in two: $2,826 goes above the line on Schedule 1. The QBI deduction doesn't touch SE tax.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d8f0e2" />
        <circle cx={90} cy={90} r={60} fill="#fff3c4" stroke={INK} strokeWidth={2.5} />
        <path d="M90,30 V150" stroke={INK} strokeWidth={2.5} />
        <Label x={62} y={94} size={12}>$2,826</Label>
        <Label x={118} y={94} size={12}>$2,826</Label>
        <Arrow d="M150,90 H190" />
        <Card x={194} y={50} w={114} h={80} lines={["Adjustment", "to income", "(Schedule 1)"]} size={11} color="#fff" />
      </svg>
    ),
    body: [
      "The employer-equivalent half of SE tax is deductible as an adjustment to income on Schedule 1. It lowers income tax but not the SE tax itself (that's why net earnings use 92.35%).",
      "The QBI deduction, itemized deductions and the standard deduction don't reduce net earnings from self-employment.",
    ],
    keyPoint: "Deduct ½ of SE tax as an adjustment (Schedule 1). QBI, standard and itemized deductions don't reduce SE earnings.",
  },
  {
    title: "Who's a household employee",
    alt: "A nanny, a housekeeper and a gardener whom the family controls, labeled employees. A worker from an agency and a self-employed handyman with his own tools, labeled not your employees.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde2e4" />
        <Card x={14} y={20} w={140} h={110} color="#d8f0e2">
          <Label x={84} y={42} size={11}>Your employee</Label>
          <Label x={84} y={66} size={10} weight={700}>nanny, housekeeper</Label>
          <Label x={84} y={86} size={10} weight={700}>you control what</Label>
          <Label x={84} y={100} size={10} weight={700}>and how</Label>
        </Card>
        <Card x={166} y={20} w={140} h={110} color="#fff">
          <Label x={236} y={42} size={11}>Not yours</Label>
          <Label x={236} y={66} size={10} weight={700}>agency worker</Label>
          <Label x={236} y={86} size={10} weight={700}>own business,</Label>
          <Label x={236} y={100} size={10} weight={700}>own tools, others too</Label>
        </Card>
        <Label x={160} y={156} size={11}>Control decides, not the job title</Label>
      </svg>
    ),
    body: [
      "A worker is a household employee if the family controls not only what work is done but how it's done, such as a nanny, babysitter, housekeeper, cook or private caretaker. It doesn't matter whether they work full or part time or are paid hourly.",
      "Someone provided by an agency that controls the work, or a self-employed worker who offers services to the public and uses their own tools, isn't the family's employee.",
    ],
    keyPoint: "Household employee: the family controls what work is done and how (nanny, housekeeper, caretaker). Agency workers and independent self-employed workers aren't.",
  },
  {
    title: "The 2025 household thresholds",
    alt: "Two gauges: $2,800 of cash wages to one worker triggers Social Security and Medicare; $1,000 of total cash wages in any quarter triggers FUTA. Income tax withholding is optional.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={14} y={40} w={140} h={90} color="#d4ebfa" label="$2,800" sub="cash wages: SS + Medicare" />
        <Step x={166} y={40} w={140} h={90} color="#fff3c4" label="$1,000" sub="in any quarter: FUTA" />
        <Label x={160} y={150} size={11}>Income tax withholding: only if both agree</Label>
        <Label x={160} y={168} size={10} weight={700}>FUTA: 6% of the first $7,000 (less the state credit)</Label>
      </svg>
    ),
    body: [
      "For 2025, a household employer withholds and pays Social Security and Medicare (7.65% each side) if they pay one household employee cash wages of $2,800 or more in the year. Federal unemployment tax (FUTA) applies if total cash wages to household employees are $1,000 or more in any calendar quarter of this year or last year.",
      "Federal income tax withholding isn't required unless the employee asks and the employer agrees.",
    ],
    keyPoint: "2025: cash wages ≥ $2,800 to one household employee → Social Security and Medicare. ≥ $1,000 total in any quarter (this year or last) → FUTA. Income tax withholding only by agreement.",
  },
  {
    title: "Exempt workers and the paperwork",
    alt: "Exempt from Social Security and Medicare: your spouse, your child under 21, most parents, and workers under 18 who are students. Paperwork: EIN, W-2, Schedule H.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={14} w={140} h={150} color="#fff">
          <Label x={84} y={36} size={11}>Exempt from SS/Med</Label>
          <Label x={84} y={62} size={10} weight={700}>your spouse</Label>
          <Label x={84} y={82} size={10} weight={700}>your child under 21</Label>
          <Label x={84} y={102} size={10} weight={700}>most parents</Label>
          <Label x={84} y={122} size={10} weight={700}>under 18 (students)</Label>
        </Card>
        <Card x={166} y={14} w={140} h={150} color="#d8f0e2">
          <Label x={236} y={36} size={11}>Paperwork</Label>
          <Label x={236} y={62} size={10} weight={700}>an EIN</Label>
          <Label x={236} y={82} size={10} weight={700}>W-2 by Jan 31</Label>
          <Label x={236} y={102} size={10} weight={700}>Schedule H with 1040</Label>
          <Label x={236} y={122} size={10} weight={700}>pay via W-4 or 1040-ES</Label>
        </Card>
      </svg>
    ),
    body: [
      "Wages paid to the employer's spouse, child under 21, parent (with limited exceptions) or any employee under 18 at any time in the year (unless household work is their principal occupation; being a student means it isn't) aren't subject to Social Security and Medicare.",
      "A household employer needs an EIN, gives the employee a W-2 (and files it with Form W-3) by January 31, and reports the taxes on Schedule H with Form 1040. To avoid an underpayment penalty, they can increase their own withholding or make estimated payments.",
    ],
    keyPoint: "Not subject to SS/Medicare: spouse, child under 21, parent (mostly), workers under 18 whose main job isn't household work (students). Employer needs an EIN, files W-2/W-3 by Jan 31, Schedule H with the 1040.",
  },
];

const lesson: Lesson = {
  id: "p1-se-household",
  part: "part1",
  domainId: "p1d4",
  number: "4.2",
  episode: "Milo Pays Himself",
  title: "Self-employment and household employees",
  minutes: 12,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "Self-employment tax on Schedule SE, and the taxes a family owes when it hires a nanny or other household worker.",
  previously: "Penny met the alternative minimum tax. Now it's Milo's turn: his dog-walking business had its best year ever.",
  comic,
  cards,
  hook: {
    line: "Be your own boss, pay both halves.",
    more: "15.3% on 92.35% of profit, half deductible. Hire a nanny for $2,800 or more and you're an employer too: Schedule H.",
    alt: "Milo wearing two hats, next to the numbers 15.3% and $2,800.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#eef0d8" />
        <Milo x={60} y={58} scale={0.5} mood="smug" />
        <TwoHats x={60} y={40} scale={0.6} />
        <Label x={180} y={56} size={26} color="#a8321f">15.3%</Label>
        <Label x={180} y={92} size={18} color="#3f7cc4">$2,800 · Sch. H</Label>
        <Mark x={296} y={30} text="!" size={22} />
      </svg>
    ),
  },
  traps: [
    { title: "SE tax on 100% of profit", text: "It's figured on 92.35% of net profit." },
    { title: "No income tax means no SE tax", text: "SE tax applies at $400 of net earnings, whatever the income tax." },
    { title: "Every babysitter triggers FICA", text: "Workers under 18 whose main job isn't household work (like students) are exempt, as are your spouse and your child under 21." },
    { title: "Withholding income tax is required", text: "For household employees it's optional, only if both agree." },
  ],
  sources: [
    { key: "p334", section: "Self-Employment Tax" },
    { key: "p926", section: "Do You Need To Pay Employment Taxes?; Social Security and Medicare Taxes; FUTA Tax; Schedule H" },
  ],
  cases: [
    {
      who: "Milo",
      title: "Milo's SE tax",
      facts: "Milo's 2025 Schedule C net profit is $40,000. He has no wages.",
      question: "About how much is his self-employment tax?",
      choices: ["$6,120", "$5,652", "$3,060", "$2,826"],
      answer: "$5,652",
      why: "$40,000 × 92.35% = $36,940 of net earnings; × 15.3% = about $5,652. Half of it (about $2,826) is deductible.",
    },
    {
      who: "Hoot",
      title: "The tiny side gig",
      facts: "Hoot's nephew earned $380 of net profit walking dogs in 2025, his only income.",
      question: "Does he owe self-employment tax?",
      choices: ["Yes, 15.3% of $380", "No, net earnings are under $400", "Yes, because all income is taxable", "Only if he files a return"],
      answer: "No, net earnings are under $400",
      why: "SE tax applies only when net earnings from self-employment ($380 × 92.35%) are $400 or more.",
    },
    {
      who: "Ace",
      title: "Wages first",
      facts: "Ace's client earned $180,000 of W-2 wages in 2025 (Social Security withheld on $176,100) and $20,000 of net profit from consulting.",
      question: "What SE tax applies to the consulting income?",
      choices: ["15.3% of $18,470", "2.9% Medicare only on $18,470", "Nothing", "12.4% only"],
      answer: "2.9% Medicare only on $18,470",
      why: "Wages already reached the $176,100 Social Security wage base, so only the 2.9% Medicare part applies to net earnings ($20,000 × 92.35% = $18,470).",
    },
    {
      who: "Penny",
      title: "Nanny Joy",
      facts: "Penny and Milo paid their nanny, Joy, $15,000 in cash wages in 2025, about $3,750 each quarter. Joy is 30.",
      question: "What employment taxes apply?",
      choices: ["None; household workers are contractors", "Social Security and Medicare only", "Social Security, Medicare and FUTA, reported on Schedule H", "Only income tax withholding"],
      answer: "Social Security, Medicare and FUTA, reported on Schedule H",
      why: "Cash wages of $2,800 or more trigger Social Security and Medicare, and $1,000 or more in a quarter triggers FUTA. Both go on Schedule H.",
    },
    {
      who: "Lulu",
      title: "Tess the sitter",
      facts: "Penny and Milo paid Tess, a 16-year-old high school student, $3,000 for babysitting Lulu in 2025.",
      question: "Do they owe Social Security and Medicare on Tess's wages?",
      choices: ["Yes, she earned over $2,800", "No, she's under 18 and babysitting isn't her principal occupation", "Yes, but only Medicare", "Only if she asks"],
      answer: "No, she's under 18 and babysitting isn't her principal occupation",
      why: "Wages paid to a household worker under 18 at any time in the year aren't subject to Social Security and Medicare unless household work is their principal occupation. Being a student means it isn't.",
    },
  ],
  quizTopics: ["Self-employment tax", "Household employees"],
  quizBrief: "Self-employment tax: $400 threshold, 92.35%, 15.3%, $176,100 wage base, half deductible. Household employees: $2,800 and $1,000-per-quarter FUTA thresholds, exempt workers, Schedule H, W-2",
};

export default lesson;

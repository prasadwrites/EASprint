import { Ace, Backdrop, Hoot, Label, Lulu, Milo, Penny, Rosa } from "../cast";
import { Crate, RollySuit } from "../bakery";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 2.6: employment taxes and workers: employee versus independent contractor, FICA and income
// tax withholding (Form 941), FUTA (Form 940), Forms W-2 and 1099-NEC (with the 2026 threshold change),
// and the ACA employer rules. Written to Publication 15, Publication 15-A and the Form 940 and 941
// instructions for 2025.

const comic: Lesson["comic"] = [
  {
    alt: "Milo, dressed as Rolly the giant cinnamon roll, salutes. Rosa holds out a single cinnamon roll as pay.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Milo x={70} y={128} scale={0.76} mood="excited" pose="wave" />
        <RollySuit x={70} y={128} scale={0.76} />
        <Rosa x={252} y={128} scale={0.76} mood="happy" flip pose="hold" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Rolly reporting for duty! Do I get a W-2 or a 1099?", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Rosa", text: "You get a cinnamon roll.", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of a crate of napkins. Rosa proudly shows a page of dance steps.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Hoot x={84} y={92} scale={0.52} mood="thinking" pose="up" />
        <Crate x={84} y={206} scale={1.05} label="NAPKINS" />
        <Rosa x={254} y={128} scale={0.76} mood="smug" flip pose="hold" />
        <Paper x={210} y={104} label="STEPS" scale={0.8} rotate={8} />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Who decides when, where and HOW Rolly dances?", x: 3, y: 2, w: 46, tail: "down-left" },
      { who: "Rosa", text: "Me! I wrote all 40 steps of the choreography.", x: 58, y: 4, w: 39, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at a card listing behavioral, financial and relationship control. Milo, still in the suit, looks thrilled.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={104} y={92} w={104} h={64} lines={["Behavioral", "Financial", "Relationship"]} size={10} color="#fff" />
        <Milo x={262} y={128} scale={0.72} mood="excited" flip pose="up" />
        <RollySuit x={262} y={128} scale={0.72} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "She controls the work, so Rolly is an employee: withhold, match 7.65% FICA, file Form 941.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Milo", text: "I'm an EMPLOYEE! Do I get a corner office?", x: 62, y: 4, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Penny points at a card: FUTA 0.6% times $7,000 is $42. Lulu throws her arms up.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Card x={112} y={96} w={96} h={56} lines={["FUTA 0.6%", "× $7,000 = $42"]} size={10} color="#fff" />
        <Lulu x={268} y={160} scale={0.56} mood="excited" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "FUTA is 6% of the first $7,000, but the state credit cuts it to 0.6%. $42 per worker.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Lulu", text: "Rolly only costs $42? I'll pay $43!", x: 62, y: 6, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds a Form 1099-NEC for the window washer. Ace nods and holds up a January 31 calendar.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f1fb" />
        <Rosa x={66} y={128} scale={0.76} mood="thinking" pose="hold" />
        <Paper x={116} y={104} label="1099" sub="NEC" scale={0.8} rotate={-6} />
        <Calendar x={196} y={96} month="JAN" day="31" scale={0.62} color="#e8505b" />
        <Ace x={266} y={128} scale={0.74} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "The window washer brings his own squeegee and picks his own hours.", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Ace", text: "Contractor. Paid $600 or more in 2025? A 1099-NEC by January 31.", x: 54, y: 2, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Milo, in the Rolly suit, waves a Form SS-8. Hoot, holding his clipboard, looks unimpressed.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Milo x={70} y={128} scale={0.76} mood="smug" pose="hold" />
        <RollySuit x={70} y={128} scale={0.76} />
        <Paper x={136} y={92} label="SS-8" scale={0.8} rotate={-10} />
        <Hoot x={256} y={128} scale={0.62} mood="stern" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "I'm filing a Form SS-8 so the IRS can tell me what I am.", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Hoot", text: "That takes six months or more. Keep dancing.", x: 56, y: 4, w: 40, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Employee or contractor?",
    alt: "The common-law test looks at behavioral control, financial control and the relationship. If the business can control what is done and how, the worker is an employee.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="How" sub="behavioral" />
        <Step x={112} y={14} w={96} h={100} color="#fff3c4" label="Money" sub="financial" />
        <Step x={214} y={14} w={96} h={100} color="#d4ebfa" label="Bond" sub="relationship" />
        <Label x={160} y={140} size={10} weight={700}>Unsure? Form SS-8 asks the IRS</Label>
        <Label x={160} y={158} size={10} weight={700}>Section 530 and VCSP can limit back taxes</Label>
      </svg>
    ),
    body: [
      "Under the common-law rules, a worker is an employee if the business has the right to control what will be done and how it will be done, even if it doesn't use that right. The IRS groups the evidence into behavioral control (instructions, training), financial control (who invests in tools, can the worker make a profit or loss, how they're paid) and the type of relationship (contracts, benefits, permanence, whether the work is a key part of the business).",
      "Either party can file Form SS-8 to ask the IRS for a determination. A business that treated workers as contractors in good faith may qualify for Section 530 relief, and the Voluntary Classification Settlement Program (VCSP) lets a business reclassify workers going forward and pay a reduced amount for the past. Some workers are statutory employees (certain drivers, salespeople, home workers) or statutory nonemployees (direct sellers, licensed real estate agents).",
    ],
    keyPoint: "Common-law test: right to control what and how. Evidence: behavioral (instructions, training), financial (investment, profit or loss, method of pay), relationship (contracts, benefits, permanence, key activity). Form SS-8 for a determination. Relief: Section 530, VCSP. Statutory employees and nonemployees exist.",
  },
  {
    title: "FICA and Form 941",
    alt: "Employer and employee each pay 6.2% Social Security up to $176,100 and 1.45% Medicare. Withheld taxes go on Form 941 each quarter.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={10} y={14} w={96} h={100} color="#d8f0e2" label="6.2%" sub="SS to $176,100" />
        <Step x={112} y={14} w={96} h={100} color="#d4ebfa" label="1.45%" sub="Medicare, no cap" />
        <Step x={214} y={14} w={96} h={100} color="#fde2e4" label="×2" sub="employer matches" />
        <Label x={160} y={140} size={10} weight={700}>+0.9% employee Medicare over $200,000</Label>
        <Label x={160} y={158} size={10} weight={700}>Form 941 quarterly · deposits monthly or semiweekly</Label>
      </svg>
    ),
    body: [
      "For 2025, the employee and the employer each pay 6.2% Social Security tax on wages up to $176,100 and 1.45% Medicare tax on all wages (7.65% each). The employer also withholds the 0.9% Additional Medicare Tax on an employee's wages over $200,000; there's no employer match for it.",
      "Withheld income tax and both shares of FICA are reported on Form 941, due the last day of the month after each quarter (April 30, July 31, October 31, January 31). Deposits are made electronically on a monthly or semiweekly schedule based on the lookback period ($50,000 or less: monthly). A $100,000 liability on any day must be deposited the next business day. Very small employers may file Form 944 annually.",
    ],
    keyPoint: "2025 FICA: 6.2% SS (wage base $176,100) + 1.45% Medicare, each side (7.65%). Additional Medicare 0.9% withheld over $200,000, employee only. Form 941 quarterly (Apr 30, Jul 31, Oct 31, Jan 31). Deposits: monthly if lookback ≤ $50,000, else semiweekly; $100,000 next-day rule. Form 944 for tiny employers.",
  },
  {
    title: "FUTA and Form 940",
    alt: "FUTA is 6% of the first $7,000 of each employee's wages. A credit of up to 5.4% for state unemployment tax brings it to 0.6%, or $42 per employee.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="6.0%" sub="first $7,000" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="−5.4%" sub="state credit" />
        <Step x={214} y={14} w={96} h={100} color="#fff3c4" label="0.6%" sub="= $42 each" />
        <Label x={160} y={140} size={10} weight={700}>Employer only · Form 940 by January 31</Label>
        <Label x={160} y={158} size={10} weight={700}>Deposit once the liability tops $500</Label>
      </svg>
    ),
    body: [
      "Federal unemployment (FUTA) tax is paid only by the employer, never withheld from wages. The rate is 6.0% of the first $7,000 paid to each employee in the year. Employers that pay their state unemployment tax on time get a credit of up to 5.4%, so the net rate is usually 0.6%, or $42 per employee. Employers in a credit reduction state get a smaller credit.",
      "An employer generally owes FUTA if it paid $1,500 or more in wages in any calendar quarter, or had an employee for some part of a day in 20 or more weeks. Form 940 is filed annually by January 31 (February 10 if all deposits were made on time). Deposits are due quarterly once the undeposited liability is more than $500.",
    ],
    keyPoint: "FUTA: employer only; 6.0% of first $7,000 per employee; state credit up to 5.4% → 0.6% ($42 per employee); smaller credit in credit reduction states. Applies if $1,500+ wages in a quarter or an employee in 20+ weeks. Form 940 annually by Jan 31 (Feb 10 if fully deposited); deposit when liability > $500.",
  },
  {
    title: "W-2s and 1099-NECs",
    alt: "Employees get a Form W-2 by January 31. Contractors paid $600 or more in 2025 get a Form 1099-NEC by January 31; the threshold rises to $2,000 for payments made in 2026.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f1fb" />
        <Card x={12} y={14} w={146} h={70} lines={["W-2: employees", "to them and SSA", "by January 31"]} size={10} color="#fff" />
        <Card x={164} y={14} w={146} h={70} lines={["1099-NEC: $600+", "(2025) · $2,000+", "from 2026"]} size={10} color="#fff3c4" />
        <Label x={160} y={112} size={10} weight={700}>Get a Form W-9 before you pay</Label>
        <Label x={160} y={130} size={10} weight={700}>No TIN: backup withholding at 24%</Label>
        <Label x={160} y={150} size={10} weight={700}>Corporations usually don't get a 1099-NEC</Label>
      </svg>
    ),
    body: [
      "Employers give each employee a Form W-2 and file copies with the Social Security Administration by January 31. A business that pays an independent contractor (not a corporation, in most cases) $600 or more for services in 2025 files Form 1099-NEC, giving it to the contractor and filing it with the IRS by January 31, 2026. Attorneys' fees are reported even if the law firm is a corporation.",
      "The One Big Beautiful Bill Act raises the 1099-NEC and 1099-MISC threshold to $2,000 for payments made after December 31, 2025, indexed for inflation after 2026. Businesses should get a Form W-9 before paying; if the payee doesn't provide a correct TIN, the payer must apply backup withholding at 24%.",
    ],
    keyPoint: "W-2 to employees and SSA by Jan 31. 1099-NEC to contractors (generally not corporations; attorneys always) by Jan 31: threshold $600 for 2025 payments, $2,000 for payments after Dec 31, 2025 (indexed after 2026). Get Form W-9; no correct TIN → 24% backup withholding.",
  },
  {
    title: "ACA employer rules",
    alt: "An employer with 50 or more full-time employees, counting full-time equivalents, is an applicable large employer and must offer coverage or risk a penalty, and file Forms 1094-C and 1095-C.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Mark x={70} y={92} text="50" color="#1d7a49" size={44} />
        <Card x={140} y={14} w={168} h={46} lines={["Full-time: 30 hours", "a week (130 a month)"]} size={10} color="#fff" />
        <Card x={140} y={66} w={168} h={46} lines={["Part-timers count as", "full-time equivalents"]} size={10} color="#d8f0e2" />
        <Card x={140} y={118} w={168} h={46} lines={["ALE: offer coverage,", "file 1094-C and 1095-C"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "An applicable large employer (ALE) is one that averaged at least 50 full-time employees, including full-time equivalents, in the prior calendar year. A full-time employee averages at least 30 hours of service a week, or 130 hours a month. Part-timers' hours are combined into full-time equivalents (total monthly hours ÷ 120).",
      "An ALE must offer affordable, minimum value coverage to at least 95% of full-time employees and their dependents or may owe the employer shared responsibility payment, and it must file Forms 1094-C and 1095-C. Smaller employers aren't subject to the mandate.",
    ],
    keyPoint: "ALE = averaged ≥ 50 full-time employees incl. FTEs in the prior year. Full-time = 30 hrs/week or 130 hrs/month; FTEs = part-timer monthly hours ÷ 120. ALE must offer affordable, minimum value coverage to 95% of full-timers or risk the shared responsibility payment; files 1094-C/1095-C.",
  },
];

const lesson: Lesson = {
  id: "p2-employment-taxes",
  part: "part2",
  domainId: "p2d2",
  number: "2.6",
  episode: "Employee or Not?",
  title: "Employment taxes and workers",
  minutes: 15,
  lawAsOf: "tax year 2025, with the 2026 information return threshold",
  intro: "Employee versus contractor, FICA and Form 941, FUTA and Form 940, Forms W-2 and 1099-NEC, and when the ACA employer rules kick in.",
  previously: "The van is now a 'food truck' and Bertha is baking nonstop. Rosa needs help, and Milo has a costume.",
  comic,
  cards,
  hook: {
    line: "Control the how, and they're your employee.",
    more: "FICA 7.65% each side (SS to $176,100). FUTA 0.6% of $7,000 = $42. W-2 and 1099-NEC by Jan 31; NEC $600 in 2025, $2,000 from 2026. ALE = 50.",
    alt: "Rolly the cinnamon roll mascot with the numbers 7.65% and $42.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fde9e4" />
        <Milo x={66} y={64} scale={0.4} mood="excited" pose="wave" />
        <RollySuit x={66} y={64} scale={0.4} />
        <Mark x={186} y={74} text="7.65%" color="#1d7a49" size={28} />
        <Mark x={272} y={74} text="$42" color="#a8321f" size={30} />
      </svg>
    ),
  },
  traps: [
    { title: "A contract makes them a contractor", text: "Labels don't decide it. The right to control how the work is done does." },
    { title: "FUTA is withheld from pay", text: "FUTA is paid only by the employer." },
    { title: "$2,000 applies to 2025 1099s", text: "The $2,000 threshold applies to payments made after December 31, 2025. 2025 payments use $600." },
    { title: "Employers match Additional Medicare", text: "The 0.9% Additional Medicare Tax is employee only; there's no employer match." },
  ],
  sources: [
    { key: "workers", section: "Employee or contractor" },
    { key: "p15", section: "Employer's tax guide" },
    { key: "i940", section: "FUTA" },
    { key: "i941", section: "Quarterly return" },
    { key: "i1099mec", section: "Forms 1099-NEC and 1099-MISC" },
    { key: "aca", section: "Applicable large employers" },
  ],
  cases: [
    {
      who: "Penny",
      title: "Two new hires",
      facts: "A business in a state with no credit reduction paid two employees $20,000 each in 2025 and paid its state unemployment tax on time.",
      question: "What is its FUTA tax for 2025?",
      choices: ["$2,400", "$84", "$840", "$42"],
      answer: "$84",
      why: "FUTA applies to the first $7,000 per employee at a net 0.6% after the 5.4% credit: $42 × 2 = $84.",
    },
    {
      who: "Ace",
      title: "The employer's share",
      facts: "An employee earns $30,000 of wages in 2025.",
      question: "How much FICA does the employer pay on those wages?",
      choices: ["$1,860", "$4,590", "$2,295", "$435"],
      answer: "$2,295",
      why: "The employer matches 6.2% Social Security and 1.45% Medicare: 7.65% × $30,000 = $2,295.",
    },
    {
      who: "Rosa",
      title: "The window washer",
      facts: "A bakery paid a self-employed window washer (a sole proprietor) $750 for services during 2025.",
      question: "What must the bakery file?",
      choices: ["Nothing; it's under $2,000", "Form W-2", "Form 1099-MISC", "Form 1099-NEC by January 31, 2026"],
      answer: "Form 1099-NEC by January 31, 2026",
      why: "Payments of $600 or more for services to a non-corporate contractor in 2025 go on Form 1099-NEC, due January 31, 2026. The $2,000 threshold starts with payments made in 2026.",
    },
    {
      who: "Milo",
      title: "Counting heads",
      facts: "In 2025 a company averaged 40 full-time employees, plus part-timers whose combined hours equal 12 full-time equivalents each month.",
      question: "Is it an applicable large employer for 2026?",
      choices: ["Yes", "No; only full-time employees count", "No; it has fewer than 50 full-time", "Only if it already offers coverage"],
      answer: "Yes",
      why: "Full-time equivalents count toward the 50 test: 40 + 12 = 52, so it's an ALE for 2026.",
    },
  ],
  quizTopics: ["Federal unemployment tax", "Information returns"],
  quizBrief: "Employment taxes: employee vs. contractor (common-law test, SS-8), FICA and Form 941, FUTA ($7,000, 0.6%) and Form 940, W-2 and 1099-NEC ($600 for 2025, $2,000 from 2026), ACA ALE",
};

export default lesson;

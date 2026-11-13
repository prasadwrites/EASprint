import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny } from "../cast";
import { Crate, Hen } from "../bakery";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Step } from "../props";

// Part 2, topic 3.4: farmers: Schedule F, hobby versus business, the farmer's estimated tax rule, income
// averaging and the farming NOL carryback, sales of livestock, and farm employment taxes (Form 943).
// Written to Publication 225 and Publication 15 for tax year 2025.

const comic: Lesson["comic"] = [
  {
    alt: "Milo proudly holds up a white hen. Penny stares.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" floor="#d8c38f" />
        <Milo x={70} y={128} scale={0.76} mood="excited" pose="hold" holding={<Hen x={0} y={-2} scale={0.8} />} />
        <Penny x={256} y={128} scale={0.76} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Meet Deduction! She's the start of my egg farm.", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Penny", text: "You named the chicken DEDUCTION?", x: 62, y: 6, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at a card reading Schedule F or hobby. Milo protectively hugs the hen.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" floor="#d8c38f" />
        <Ace x={66} y={128} scale={0.76} mood="thinking" pose="point" />
        <Card x={104} y={92} w={104} h={64} lines={["Profit motive?", "Yes: Schedule F", "No: hobby"]} size={9.5} color="#fff" />
        <Milo x={262} y={128} scale={0.76} mood="worried" flip pose="hold" holding={<Hen x={0} y={-2} scale={0.8} />} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "A real farm goes on Schedule F. A hobby farm reports the income but can't deduct the expenses.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Milo", text: "Deduction is NOT a hobby. She has goals.", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot pops out of a crate labeled EGGS. The hen glares at him. Milo is startled.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" floor="#d8c38f" />
        <Hoot x={84} y={92} scale={0.52} mood="smug" pose="up" />
        <Crate x={84} y={206} scale={1.05} label="EGGS" />
        <Hen x={170} y={204} scale={0.9} />
        <Milo x={262} y={128} scale={0.76} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Make a profit in 3 of 5 years and we presume it's a business. Otherwise, prove it.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Milo", text: "Why are you in my EGG crate?!", x: 64, y: 6, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Penny points at calendars for January 15 and March 1. Lulu holds an egg.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" floor="#d8c38f" />
        <Penny x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Calendar x={142} y={96} month="JAN" day="15" scale={0.62} color="#1d7a49" />
        <Calendar x={196} y={96} month="MAR" day="1" scale={0.62} color="#e8505b" />
        <Lulu x={274} y={160} scale={0.56} mood="excited" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Real farmers get a break: one estimated payment by January 15, or file and pay it all by March 1.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Lulu", text: "Deduction makes one egg a day. Does she get a break?", x: 62, y: 4, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Ace explains farm payroll to Lulu, who holds out her hand for payment.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7f1fb" floor="#d8c38f" />
        <Ace x={66} y={128} scale={0.76} mood="happy" pose="point" />
        <Mark x={160} y={118} text="943" color="#1d7a49" size={34} />
        <Lulu x={270} y={160} scale={0.56} mood="smug" flip pose="hold" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Hire a farmworker and farm wages go on Form 943, filed once a year, not 941.", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Lulu", text: "I collect eggs. My rate is $1 an egg.", x: 62, y: 6, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "The hen sits on top of Milo's head. Biscuit eyes her hungrily. Penny covers her face.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" floor="#d8c38f" />
        <Milo x={80} y={128} scale={0.76} mood="excited" pose="up" />
        <Hen x={80} y={100} scale={0.7} />
        <Biscuit x={170} y={192} scale={0.56} mood="excited" />
        <Penny x={262} y={128} scale={0.76} mood="worried" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Look! A deduction ABOVE THE LINE!", x: 3, y: 2, w: 36, tail: "down-left" },
      { who: "Penny", text: "I married this man. On purpose.", x: 60, y: 2, w: 37, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Schedule F and hobby farms",
    alt: "A farm run to make a profit reports on Schedule F. A hobby reports its income, but its expenses aren't deductible. A profit in 3 of 5 years creates a presumption of profit motive (2 of 7 for horses).",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="Sch. F" sub="profit motive" />
        <Step x={166} y={14} w={140} h={100} color="#fde2e4" label="Hobby" sub="income, no deductions" />
        <Label x={160} y={140} size={10} weight={700}>Presumed for profit: 3 of 5 years (horses: 2 of 7)</Label>
        <Label x={160} y={158} size={10} weight={700}>Farm profit is subject to SE tax</Label>
      </svg>
    ),
    body: [
      "A farmer who operates for profit reports farm income and expenses on Schedule F; the net profit is subject to self-employment tax. Most farmers can use the cash method. Farmers who raise animals have no basis in them (the costs were already deducted), so the whole sale price is gain.",
      "If an activity isn't engaged in for profit, it's a hobby under section 183: the income is reported, but the expenses aren't deductible. An activity is presumed to be for profit if it shows a profit in at least 3 of the last 5 years (2 of 7 for breeding, training, showing or racing horses). Otherwise the IRS weighs factors like businesslike operation, expertise, time spent, and history of income or losses.",
    ],
    keyPoint: "Schedule F for farms run for profit; SE tax on net profit; cash method generally allowed; raised animals have zero basis. §183 hobby: income reported, expenses not deductible. Presumption of profit: profit in 3 of 5 years (horses: 2 of 7). Factors: businesslike manner, expertise, time, history.",
  },
  {
    title: "The farmer's estimated tax rule",
    alt: "If at least two-thirds of gross income is from farming, a farmer can make one estimated payment by January 15, or skip estimates by filing and paying in full by March 1.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="⅔" sub="gross from farming" />
        <Step x={112} y={14} w={96} h={100} color="#d8f0e2" label="Jan 15" sub="one payment" />
        <Step x={214} y={14} w={96} h={100} color="#fff3c4" label="Mar 1" sub="or file and pay" />
        <Label x={160} y={140} size={10} weight={700}>Required payment: 66⅔% of this year</Label>
        <Label x={160} y={158} size={10} weight={700}>or 100% of last year's tax</Label>
      </svg>
    ),
    body: [
      "A taxpayer qualifies as a farmer for estimated tax purposes if at least two-thirds of their gross income for the current or prior year is from farming. A qualified farmer makes just one estimated payment, due January 15 of the following year, and the required amount is the smaller of 66⅔% of the current year's tax or 100% of the prior year's tax.",
      "Alternatively, a qualified farmer who files the return and pays all the tax due by March 1 owes no estimated tax penalty at all. (Fishermen get the same rule.)",
    ],
    keyPoint: "Farmer (≥ ⅔ of gross income from farming, current or prior year): one estimated payment by Jan 15; required amount = lesser of 66⅔% of current-year tax or 100% of prior-year tax. Or file and pay in full by March 1: no penalty. Same for fishermen.",
  },
  {
    title: "Averaging and farm losses",
    alt: "Farmers can spread farm income over the prior three years' brackets on Schedule J. A farming loss can be carried back 2 years.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f1fb" />
        <Step x={14} y={14} w={140} h={100} color="#fff" label="Sch. J" sub="avg over 3 prior yrs" />
        <Step x={166} y={14} w={140} h={100} color="#d8f0e2" label="2 years" sub="farm NOL carryback" />
        <Label x={160} y={140} size={10} weight={700}>Other NOLs: no carryback</Label>
        <Label x={160} y={158} size={10} weight={700}>Can waive the carryback and go forward only</Label>
      </svg>
    ),
    body: [
      "Farm income averaging lets an individual farmer elect to tax part or all of this year's farm income (elected farm income) at the rates of the 3 prior years, using Schedule J (Form 1040). It helps in a big year that follows lean ones. It doesn't reduce self-employment tax.",
      "A farming loss (the part of an NOL from farming) can be carried back 2 years, unlike most post-2020 NOLs. The farmer can elect to waive the carryback and carry the loss forward only. Like other NOLs, carryforwards are limited to 80% of taxable income.",
    ],
    keyPoint: "Schedule J: farm income averaging taxes elected farm income at the prior 3 years' rates (income tax only, not SE tax). Farming loss: 2-year carryback (election to waive), otherwise forward indefinitely, 80% limit on post-2017 NOLs.",
  },
  {
    title: "Selling livestock",
    alt: "Livestock held for draft, breeding, dairy or sporting purposes is section 1231 property if held 24 months for cattle and horses, or 12 months for other livestock. Animals held for sale are ordinary income.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="24 mo." sub="cattle, horses" />
        <Step x={112} y={14} w={96} h={100} color="#fff3c4" label="12 mo." sub="other livestock" />
        <Step x={214} y={14} w={96} h={100} color="#fde2e4" label="Ordinary" sub="held for sale" />
        <Label x={160} y={140} size={10} weight={700}>Draft, breeding, dairy, sporting → §1231</Label>
        <Label x={160} y={158} size={10} weight={700}>Poultry isn't "livestock" for §1231</Label>
      </svg>
    ),
    body: [
      "Livestock held for draft, breeding, dairy or sporting purposes is section 1231 property if held 24 months or more for cattle and horses, or 12 months or more for other livestock (like hogs, sheep and goats). Poultry isn't livestock for this rule. Animals bought or raised for sale are inventory, and selling them produces ordinary income.",
      "Farmers who sell more livestock than usual because of drought, flood or other weather-related conditions can elect to report the extra income in the following year (or defer gain by replacing the animals). Crop insurance and disaster payments can be deferred to the next year if the crop would normally have been sold then.",
    ],
    keyPoint: "Livestock held for draft, breeding, dairy or sporting: §1231 if held ≥ 24 months (cattle, horses) or ≥ 12 months (other livestock); poultry excluded. Held for sale = ordinary. Weather-related excess sales: elect to report next year or replace. Crop insurance/disaster payments: may defer one year if crop normally sold next year.",
  },
  {
    title: "Farm employees",
    alt: "Farm wages are subject to FICA if a worker gets $150 or more in cash or total farm labor costs reach $2,500. Farm employers file Form 943 annually.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={10} y={14} w={96} h={100} color="#fff" label="$150" sub="cash to one worker" />
        <Step x={112} y={14} w={96} h={100} color="#fff3c4" label="$2,500" sub="all farm labor" />
        <Step x={214} y={14} w={96} h={100} color="#d8f0e2" label="943" sub="by January 31" />
        <Label x={160} y={140} size={10} weight={700}>FUTA: $20,000 in a quarter or 10 workers</Label>
        <Label x={160} y={158} size={10} weight={700}>in 20 weeks · Form 940</Label>
      </svg>
    ),
    body: [
      "Cash wages paid to a farmworker are subject to Social Security and Medicare tax if the employer pays that worker $150 or more in cash wages during the year, or the employer's total expenditures for farm labor are $2,500 or more (some hand-harvest workers are excepted). Noncash wages, like food or lodging, aren't subject to FICA for farmwork.",
      "Agricultural employers report withheld income tax and FICA on Form 943, an annual return due January 31, instead of Form 941. FUTA applies to farm employers that paid $20,000 or more in cash wages to farmworkers in any calendar quarter, or employed 10 or more farmworkers during some part of a day in 20 or more different weeks.",
    ],
    keyPoint: "Farmworker FICA: applies if $150+ cash wages to that worker in the year OR total farm labor expenses $2,500+. Noncash farm wages not subject to FICA. Form 943 annual (due Jan 31), not 941. Farm FUTA: $20,000+ cash wages in a quarter or 10+ farmworkers in 20+ weeks; Form 940.",
  },
];

const lesson: Lesson = {
  id: "p2-farmers",
  part: "part2",
  domainId: "p2d3",
  number: "3.4",
  episode: "A Hen Named Deduction",
  title: "Farmers",
  minutes: 13,
  lawAsOf: "tax year 2025",
  intro: "Schedule F and the hobby rules, the farmer's estimated tax deal, income averaging and farm NOLs, selling livestock, and payroll for farmworkers.",
  previously: "Rosa has a retirement plan and Gerald has sunglasses. Milo, inspired by the word 'nest egg,' bought a chicken.",
  comic,
  cards,
  hook: {
    line: "Two-thirds farming? Pay by Jan 15 or file by Mar 1.",
    more: "Hobby: 3 of 5 years (horses 2 of 7). Schedule J averaging. Farm NOL back 2 years. Livestock §1231: 24 months cattle and horses, 12 others. Form 943; FICA at $150 or $2,500.",
    alt: "A hen next to the dates Jan 15 and Mar 1.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#eef5f1" />
        <Hen x={66} y={104} scale={1.4} />
        <Mark x={180} y={74} text="1/15" color="#1d7a49" size={30} />
        <Mark x={268} y={74} text="3/1" color="#a8321f" size={30} />
      </svg>
    ),
  },
  traps: [
    { title: "Farmers pay four estimates", text: "A qualified farmer pays once by January 15, or files and pays in full by March 1." },
    { title: "No carryback for any NOL", text: "Farming losses can be carried back 2 years." },
    { title: "A 12-month cow is §1231", text: "Cattle and horses need 24 months; other livestock 12 months." },
    { title: "Farm payroll goes on Form 941", text: "Agricultural employers file the annual Form 943." },
  ],
  sources: [
    { key: "p225", section: "Farmer's tax guide" },
    { key: "p15", section: "Agricultural employers" },
  ],
  cases: [
    {
      who: "Hoot",
      title: "Is it a business?",
      facts: "A taxpayer runs a small egg operation that isn't horse-related.",
      question: "In how many of 5 consecutive years must it show a profit to be presumed engaged in for profit?",
      choices: ["1", "2", "3", "4"],
      answer: "3",
      why: "The section 183 presumption applies if the activity is profitable in 3 of 5 consecutive years (2 of 7 for horse activities).",
    },
    {
      who: "Penny",
      title: "Skipping estimates",
      facts: "A farmer gets 80% of her gross income from farming and made no estimated tax payments for 2025.",
      question: "By what date can she file and pay in full to avoid an estimated tax penalty?",
      choices: ["March 1, 2026", "April 15, 2026", "January 15, 2026", "March 15, 2026"],
      answer: "March 1, 2026",
      why: "A qualified farmer (at least two-thirds of gross income from farming) avoids the penalty by filing and paying all tax by March 1.",
    },
    {
      who: "Milo",
      title: "Young breeding hogs",
      facts: "A farmer sells breeding hogs she raised and held for 10 months.",
      question: "How is the gain treated?",
      choices: ["Section 1231 gain", "Short-term capital gain", "28% capital gain", "Ordinary income"],
      answer: "Ordinary income",
      why: "Livestock other than cattle and horses needs a 12-month holding period for section 1231. Raised animals have zero basis, and held less than 12 months the gain is ordinary.",
    },
    {
      who: "Ace",
      title: "A little help",
      facts: "A farmer pays one worker $120 cash for the year. Total farm labor costs for the year are $1,800.",
      question: "Are the wages subject to Social Security and Medicare tax?",
      choices: ["Yes, full FICA", "No", "Only Medicare", "Only FUTA"],
      answer: "No",
      why: "Farm wages are subject to FICA only if the worker gets $150 or more in cash or total farm labor costs reach $2,500. Neither test is met.",
    },
  ],
  quizTopics: ["Farmers"],
  quizBrief: "Farmers: Schedule F and hobby rules (3 of 5), estimated tax (Jan 15 or file by Mar 1), Schedule J averaging, 2-year farm NOL carryback, livestock section 1231, Form 943 and farm FICA tests",
};

export default lesson;

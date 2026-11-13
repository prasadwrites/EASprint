import { Ace, Backdrop, Biscuit, Hoot, Label, Milo, Penny, Rosa } from "../cast";
import { Crate, Gerald, RollySuit } from "../bakery";
import type { Lesson } from "../lesson";
import { Laptop } from "../office";
import { Calendar, Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 1.1: picking an entity: business entity types and default classifications, LLC elections
// (Forms 8832 and 2553), qualified joint ventures, EINs, required tax years, and hobby versus business.
// Written to Publications 334, 538 and 583 and the IRS LLC and EIN pages for tax year 2025.

const comic: Lesson["comic"] = [
  {
    alt: "In Rosa's Rolls, Aunt Rosa holds a drawing of a yacht. Gerald the sourdough jar sits on a flour crate. Ace looks patient.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Rosa x={70} y={128} scale={0.76} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="YACHT" sub="logo here" color="#d4ebfa" />} />
        <Crate x={160} y={206} scale={0.62} label="FLOUR" />
        <Gerald x={160} y={170} scale={0.9} mood="smug" />
        <Ace x={252} y={128} scale={0.76} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I want Rosa's Rolls to be a CORPORATION. With a logo. And a yacht.", x: 3, y: 2, w: 46, tail: "down-left", shout: true },
      { who: "Ace", text: "Step one: you and Penny own it together, so right now you're a partnership.", x: 54, y: 2, w: 44, tail: "down-right" },
    ],
  },
  {
    alt: "Milo points at Gerald the sourdough starter. Rosa hugs the jar. Ace holds a card of entity types.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={60} y={128} scale={0.72} mood="excited" pose="point" />
        <Rosa x={160} y={128} scale={0.72} mood="happy" pose="hold" holding={<Gerald x={0} y={14} scale={0.7} />} />
        <Ace x={264} y={128} scale={0.72} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Can Gerald be a partner? He does most of the rising.", x: 3, y: 2, w: 34, tail: "down-left" },
      { who: "Rosa", text: "He's family!", x: 38, y: 6, w: 24, tail: "down" },
      { who: "Ace", text: "He's yeast.", x: 72, y: 8, w: 24, tail: "down-right" },
    ],
  },
  {
    alt: "Milo with Biscuit on a leash announces his dog-walking business. Hoot pops out of a flour crate.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Milo x={70} y={128} scale={0.76} mood="excited" pose="up" />
        <Biscuit x={140} y={190} scale={0.62} mood="excited" />
        <Hoot x={246} y={84} scale={0.56} mood="smug" flip pose="up" />
        <Crate x={246} y={206} scale={1.05} label="FLOUR" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Milo's Mutts is now a BUSINESS! Biscuit is my first client.", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Hoot", text: "Business... or HOBBY? Does Biscuit pay?", x: 54, y: 2, w: 40, tail: "down-right" },
    ],
  },
  {
    alt: "Penny at a laptop applying for an EIN. Hoot holds a tiny price tag. Ace shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" />
        <Penny x={60} y={128} scale={0.72} mood="thinking" />
        <Laptop x={136} y={172} scale={0.9} screen="EIN?" />
        <Ace x={210} y={128} scale={0.7} mood="happy" flip pose="point" />
        <Hoot x={282} y={130} scale={0.56} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "This website wants $249 for an EIN.", x: 3, y: 2, w: 34, tail: "down-left" },
      { who: "Ace", text: "An EIN is FREE from the IRS, online, in minutes.", x: 36, y: 2, w: 34, tail: "down" },
      { who: "Hoot", text: "I'd have charged $250.", x: 74, y: 4, w: 24, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds a birthday calendar showing June 3. Ace holds a calendar showing December 31.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Rosa x={70} y={128} scale={0.76} mood="excited" />
        <Calendar x={130} y={100} month="JUN" day="3" scale={0.7} color="#e8505b" />
        <Calendar x={196} y={100} month="DEC" day="31" scale={0.7} color="#1d7a49" />
        <Ace x={262} y={128} scale={0.76} mood="happy" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Our tax year ends on my birthday. June 3rd!", x: 3, y: 2, w: 38, tail: "down-left" },
      { who: "Ace", text: "A partnership uses its majority partners' year. You're both calendar year: December 31.", x: 48, y: 2, w: 50, tail: "down-right" },
    ],
  },
  {
    alt: "Milo, in a giant cinnamon roll costume, waves. Rosa stares. Hoot takes notes.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Milo x={70} y={128} scale={0.76} mood="excited" pose="wave" />
        <RollySuit x={70} y={128} scale={0.76} />
        <Rosa x={170} y={128} scale={0.72} mood="shocked" flip />
        <Hoot x={268} y={130} scale={0.6} mood="thinking" flip clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Meet ROLLY, the official mascot!", x: 3, y: 2, w: 32, tail: "down-left", shout: true },
      { who: "Rosa", text: "We don't HAVE a mascot.", x: 36, y: 4, w: 28, tail: "down" },
      { who: "Hoot", text: "Hobby.", x: 76, y: 8, w: 18, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The entity menu",
    alt: "Sole proprietorship on Schedule C, partnership on Form 1065, C corporation on Form 1120, S corporation on Form 1120-S.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={10} y={14} w={72} h={110} color="#fff" label="Sch C" sub="sole prop" />
        <Step x={88} y={14} w={72} h={110} color="#fff3c4" label="1065" sub="partnership" />
        <Step x={166} y={14} w={72} h={110} color="#d4ebfa" label="1120" sub="C corp" />
        <Step x={244} y={14} w={66} h={110} color="#d8f0e2" label="1120-S" sub="S corp" />
        <Label x={160} y={150} size={10} weight={700}>Pass-throughs: owners pay; C corp: the company pays</Label>
      </svg>
    ),
    body: [
      "A sole proprietor reports business income on Schedule C and pays self-employment tax. A partnership (two or more owners) files Form 1065 and gives each partner a Schedule K-1; the partners pay the tax. A C corporation files Form 1120 and pays tax itself at a flat 21%, and shareholders are taxed again on dividends. An S corporation files Form 1120-S and passes its income through to shareholders on K-1s.",
    ],
    table: {
      head: ["Entity", "Return", "Calendar-year due date"],
      rows: [
        ["Sole proprietor", "Schedule C (Form 1040)", "April 15"],
        ["Partnership", "Form 1065", "March 15"],
        ["S corporation", "Form 1120-S", "March 15"],
        ["C corporation", "Form 1120", "April 15"],
      ],
    },
    keyPoint: "Sole prop: Schedule C. Partnership: Form 1065 + K-1s (due March 15). S corp: Form 1120-S + K-1s (March 15). C corp: Form 1120, 21% flat tax (April 15 for calendar year).",
  },
  {
    title: "LLCs pick their tax costume",
    alt: "An LLC with one owner is disregarded by default; with two or more it's a partnership. Form 8832 elects corporation status; Form 2553 elects S status.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={14} w={140} h={70} lines={["1 owner:", "disregarded"]} size={11} color="#fff" />
        <Card x={166} y={14} w={140} h={70} lines={["2+ owners:", "partnership"]} size={11} color="#fff3c4" />
        <Card x={14} y={96} w={140} h={70} lines={["Form 8832:", "taxed as a corp"]} size={11} color="#d4ebfa" />
        <Card x={166} y={96} w={140} h={70} lines={["Form 2553:", "S corporation"]} size={11} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "An LLC is a state-law entity, not a tax category. By default, a single-member LLC is disregarded (a sole proprietorship if its owner is an individual), and a multi-member LLC is a partnership. An LLC can elect to be taxed as a corporation on Form 8832, or as an S corporation on Form 2553 (which counts as electing corporation status too). After a change by election, it generally can't change again for 60 months.",
      "A married couple who jointly own an unincorporated business (not an LLC or other state-law entity), both materially participate, and file a joint return can elect to be a qualified joint venture: instead of a partnership return, each spouse files a Schedule C for their share and gets self-employment credit.",
    ],
    keyPoint: "LLC defaults: one member = disregarded; two or more = partnership. Form 8832 to be taxed as a corporation; Form 2553 for S status. 60-month wait after an elective change. Qualified joint venture: spouses, joint return, both materially participate, not a state-law entity: two Schedules C, no Form 1065.",
  },
  {
    title: "Getting an EIN",
    alt: "An employer identification number is free from the IRS online. Needed for partnerships, corporations, employers and some others.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Paper x={56} y={84} label="EIN" sub="free" scale={1.8} color="#fff" />
        <Card x={110} y={14} w={198} h={46} lines={["Apply online (or Form SS-4)", "at IRS.gov: no fee"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["Needed: employees, partnerships,", "corps, excise or pension returns"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["Sole prop, no employees:", "can use an SSN"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "An employer identification number (EIN) identifies a business. The IRS issues it free, online in one session, or by fax or mail on Form SS-4. Websites that charge for an EIN aren't the IRS.",
      "A business needs an EIN if it has employees, operates as a partnership or corporation, files employment, excise or alcohol, tobacco and firearms returns, or has a Keogh plan, among other cases. A sole proprietor with no employees and none of those returns can use their SSN. A new EIN is generally needed when the ownership or structure changes, such as a sole proprietorship incorporating.",
    ],
    keyPoint: "EIN: free from the IRS (online or Form SS-4). Required for partnerships, corporations, employers, and excise/employment filers; a sole proprietor without employees can use an SSN. New structure (e.g., incorporating) = new EIN.",
  },
  {
    title: "Which tax year?",
    alt: "Individuals and most sole proprietors use the calendar year. A partnership uses its majority partners' year. S corporations use the calendar year unless they show a business purpose or make a section 444 election.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Calendar x={70} y={74} month="DEC" day="31" scale={1.1} color="#1d7a49" />
        <Card x={140} y={14} w={168} h={46} lines={["Partnership: majority", "partners' year first"]} size={10} color="#fff" />
        <Card x={140} y={66} w={168} h={46} lines={["S corp and PSC: calendar,", "unless business purpose"]} size={10} color="#fff3c4" />
        <Card x={140} y={118} w={168} h={46} lines={["or a §444 election", "(Form 8716)"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "A partnership must use its required tax year: first, the tax year of partners owning more than 50% of profits and capital (majority interest); if none, the year of all principal partners (5% or more); otherwise, the year that gives the least aggregate deferral.",
      "S corporations and personal service corporations must use a calendar year unless they establish a business purpose (such as a natural business year) or make a §444 election (Form 8716) for a year that defers no more than 3 months. A C corporation that isn't a personal service corporation can generally pick any year.",
    ],
    keyPoint: "Required tax years: partnership = majority-interest partners' year, then principal partners', then least aggregate deferral. S corp/PSC = calendar year unless business purpose or §444 election (Form 8716, max 3 months' deferral).",
  },
  {
    title: "Business or hobby?",
    alt: "A business is run to make a profit. If it made a profit in 3 of the last 5 years, it's presumed to be a business. Hobby income is taxable, but hobby expenses aren't deductible.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Step x={14} y={14} w={140} h={100} color="#d8f0e2" label="3 of 5" sub="profit years" />
        <Step x={166} y={14} w={140} h={100} color="#fde2e4" label="Hobby" sub="costs not deductible" />
        <Label x={160} y={140} size={10} weight={700}>Factors: businesslike records, time, expertise,</Label>
        <Label x={160} y={158} size={10} weight={700}>history of profits, reliance on the income</Label>
      </svg>
    ),
    body: [
      "A business is carried on to make a profit. The IRS weighs factors such as whether it's run in a businesslike way with good records, the time and effort put in, the owner's expertise, whether the owner depends on the income, the history of income and losses, changes made to improve profitability, and how much of it is personal pleasure.",
      "An activity is presumed to be for profit if it made a profit in at least 3 of the last 5 years (2 of 7 for breeding, training, showing or racing horses). Income from a hobby is still taxable (reported as other income), but hobby expenses can't be deducted.",
    ],
    keyPoint: "For-profit test: facts and circumstances (businesslike manner, time, expertise, dependence on income, history, pleasure). Presumed for profit: profit in 3 of 5 years (2 of 7 for horses). Hobby: income taxable, expenses not deductible.",
  },
];

const lesson: Lesson = {
  id: "p2-picking-an-entity",
  part: "part2",
  domainId: "p2d1",
  number: "1.1",
  episode: "Rosa Wants a Yacht",
  title: "Picking an entity",
  minutes: 12,
  lawAsOf: "tax year 2025",
  intro: "Sole proprietorships, partnerships, C and S corporations, how an LLC is taxed, qualified joint ventures, getting an EIN, which tax year to use, and hobby versus business.",
  previously: "Season 2 opens at Rosa's Rolls on Main Street, which Aunt Rosa owns with Penny (10%). Business is booming, Gerald the sourdough starter is thriving, and Rosa has big ideas.",
  comic,
  cards,
  hook: {
    line: "One owner: Schedule C. Two: Form 1065. Corp: 1120. S: 1120-S.",
    more: "LLC default: 1 member disregarded, 2+ partnership; elect with Form 8832 or 2553. EIN is free. Profit 3 of 5 years = presumed business.",
    alt: "Gerald the sourdough jar next to the numbers 1065 and 1120.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fde9e4" />
        <Gerald x={60} y={104} scale={1.4} mood="smug" />
        <Mark x={160} y={74} text="1065" color="#a8321f" size={30} />
        <Mark x={258} y={74} text="1120" color="#1d7a49" size={30} />
      </svg>
    ),
  },
  traps: [
    { title: "An LLC is its own tax type", text: "An LLC is taxed as a disregarded entity, partnership or corporation, depending on owners and elections." },
    { title: "Spouses always need Form 1065", text: "A qualified joint venture (joint return, both materially participate, no state-law entity) files two Schedules C instead." },
    { title: "Pay for an EIN", text: "The IRS issues EINs free." },
    { title: "Hobby losses offset wages", text: "Hobby income is taxable, but hobby expenses aren't deductible at all." },
  ],
  sources: [
    { key: "llc", section: "LLC classification" },
    { key: "qjv", section: "Qualified joint ventures" },
    { key: "ein", section: "Getting an EIN" },
    { key: "p538", section: "Tax years" },
    { key: "p583", section: "Starting a business" },
  ],
  cases: [
    {
      who: "Milo",
      title: "Milo's Mutts, LLC",
      facts: "Milo forms a single-member LLC for his dog-walking business and files no elections.",
      question: "How is the LLC taxed?",
      choices: ["As a partnership", "As a C corporation", "As an S corporation", "Disregarded: Milo reports it on Schedule C"],
      answer: "Disregarded: Milo reports it on Schedule C",
      why: "A single-member LLC owned by an individual is disregarded by default, so its income goes on the owner's Schedule C.",
    },
    {
      who: "Penny",
      title: "The married bakers",
      facts: "A married couple runs a bakery stand they own together, with no LLC. Both work in it full time and they file jointly.",
      question: "What can they elect to avoid filing a partnership return?",
      choices: ["Qualified joint venture: a Schedule C each", "Form 8832", "Form 2553", "Nothing: they must file Form 1065"],
      answer: "Qualified joint venture: a Schedule C each",
      why: "Spouses who co-own an unincorporated business, both materially participate and file jointly can elect qualified joint venture status and file two Schedules C.",
    },
    {
      who: "Rosa",
      title: "The birthday year",
      facts: "Rosa (90%) and Penny (10%) are partners in Rosa's Rolls. Both are calendar-year taxpayers. Rosa wants a June 30 year end.",
      question: "What's the partnership's required tax year?",
      choices: ["June 30", "Any year it chooses", "The calendar year", "September 30"],
      answer: "The calendar year",
      why: "A partnership uses the tax year of its majority-interest partners, here the calendar year, unless it shows a business purpose or elects under §444.",
    },
    {
      who: "Hoot",
      title: "The quilting question",
      facts: "A taxpayer has sold quilts for 5 years and made a profit in 2021, 2023 and 2025, with losses in 2022 and 2024.",
      question: "What's true?",
      choices: ["It's automatically a hobby", "It's presumed to be engaged in for profit", "Losses can never be deducted", "It must be a corporation"],
      answer: "It's presumed to be engaged in for profit",
      why: "A profit in at least 3 of the last 5 years creates a presumption that the activity is engaged in for profit.",
    },
  ],
  quizTopics: ["LLC classification", "Qualified joint venture"],
  quizBrief: "Picking an entity: sole proprietorship, partnership, C and S corporation returns, LLC default classification, Forms 8832 and 2553, qualified joint ventures, EINs, required tax years, hobby rules",
};

export default lesson;

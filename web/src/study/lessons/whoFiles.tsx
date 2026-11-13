import { Ace, Backdrop, Biscuit, Cash, Hoot, House, Label, Milo, Penny, Window } from "../cast";
import type { Lesson } from "../lesson";
import { CalendarPage, Crown, Doc, Heart, LemonadeStand, Plane, Pop, Sign, Whoosh } from "../props";

// Part 1, topic 1.2: who must file and how. Filing requirements, filing status and special filing rules.
// Written to tax law through December 31, 2025 (including the 2025 standard deduction and the senior
// deduction) from Publications 17 and 501 and the IRS extension pages.

const INK = "#17202c";
const PANEL = { viewBox: "0 0 320 220", preserveAspectRatio: "xMidYMax meet" } as const;
const CARD = { viewBox: "0 0 320 180" } as const;

function Pamphlet() {
  return <Doc x={0} y={0} scale={0.55} label="STATUS" band="#a8321f" sub="Head of Household" />;
}

function Hammock({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-70,-40 V40 M70,-40 V40" stroke="#8a5a3c" strokeWidth={6} />
      <path d="M-70,-26 Q0,30 70,-26" fill="none" stroke="#e8505b" strokeWidth={8} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny reads a pamphlet titled Head of Household and imagines a crown. Ace sips coffee.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={86} y={128} scale={0.78} mood="excited" pose="hold" holding={<Pamphlet />} />
        <g opacity={0.5}>
          <Crown x={86} y={64} scale={0.9} />
        </g>
        <Ace x={240} y={128} scale={0.78} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace! There's a filing status called HEAD of household. Do I get a crown?", x: 2, y: 2, w: 50, tail: "down-left" },
      { who: "Ace", text: "You get better tax brackets and a bigger standard deduction. So, basically yes.", x: 54, y: 4, w: 44, tail: "down-right" },
    ],
  },
  {
    alt: "Penny wears a paper crown and points a spatula like a scepter. Milo rolls his eyes. Biscuit bows.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3eefb" />
        <Penny x={92} y={128} scale={0.78} mood="smug" pose="point" />
        <Crown x={92} y={92} scale={0.8} />
        <Milo x={226} y={142} scale={0.66} mood="smug" flip />
        <Biscuit x={164} y={180} scale={0.28} mood="happy" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Kneel, Milo! Your queen has spoken!", x: 2, y: 2, w: 42, tail: "down-left" },
      { who: "Milo", text: "You're head of laundry, at best.", x: 60, y: 10, w: 38, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot leans in through the window and lists three requirements on his clipboard.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Window x={140} y={70} w={120} h={100} />
        <g clipPath="url(#win12)">
          <defs>
            <clipPath id="win12">
              <rect x={140} y={70} width={120} height={100} />
            </clipPath>
          </defs>
          <Hoot x={200} y={136} scale={0.7} mood="stern" clipboard />
        </g>
        <rect x={140} y={70} width={120} height={100} fill="none" stroke={INK} strokeWidth={3} />
        <Penny x={60} y={140} scale={0.66} mood="worried" />
        <Crown x={60} y={110} scale={0.6} rotate={-12} />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo. A crown needs a castle and a subject. Unmarried on December 31, pay over half the home's costs, and a qualifying person living there over half the year.", x: 16, y: 2, w: 82, tail: "down" },
    ],
  },
  {
    alt: "Penny holds a W-2 showing $14,000 of wages. Ace points to the withholding box.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={88} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Doc x={0} y={0} scale={0.6} label="W-2" sub="Wages $14,000" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" pose="point" flip />
        <Cash x={170} y={176} scale={0.8} rotate={-10} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I only made $14,000. Do I even have to file?", x: 2, y: 2, w: 44, tail: "down-left" },
      { who: "Ace", text: "You don't have to. But your employer withheld tax. File, and it comes back to you.", x: 50, y: 4, w: 48, tail: "down-right" },
    ],
  },
  {
    alt: "Penny relaxes by her hammock, waving an extension form. Ace holds up a calendar page for April 15.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#dff1fb" floor="#cde8b8" />
        <Hammock x={100} y={150} />
        <Penny x={100} y={130} scale={0.6} mood="smug" pose="wave" />
        <Doc x={150} y={110} scale={0.42} rotate={14} label="4868" band="#1d7a49" />
        <Ace x={250} y={128} scale={0.76} mood="shocked" pose="hold" flip holding={<CalendarPage x={0} y={0} top="APR" big="15" scale={0.8} />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I'll file an extension and pay in October. Relaxing!", x: 2, y: 2, w: 46, tail: "down-left" },
      { who: "Ace", text: "Penny, an extension is more time to FILE, not to pay. Interest starts April 15.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Milo stands at his lemonade stand with a jar of $500. Ace points at a sign that says $400.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#dff1fb" floor="#cde8b8" />
        <LemonadeStand x={90} y={160} scale={0.9} />
        <Milo x={90} y={120} scale={0.55} mood="smug" />
        <Sign x={180} y={132} text="SE ≥ $400" w={76} />
        <Ace x={258} y={128} scale={0.74} mood="happy" pose="point" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Lemonade profit: $500. I'm 15, so I'm exempt, right?", x: 2, y: 2, w: 46, tail: "down-left" },
      { who: "Ace", text: "Milo, $400 or more of self-employment earnings means you file. Age doesn't matter.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Do I have to file? The 2025 thresholds",
    alt: "A limbo bar labeled gross income. Penny dances under it: income below the bar means no filing requirement.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M40,40 V160 M280,40 V160" stroke="#8a5a3c" strokeWidth={6} />
        <path d="M40,80 H280" stroke="#e8505b" strokeWidth={6} strokeLinecap="round" />
        <Label x={160} y={70} size={12}>
          Single under 65: $15,750
        </Label>
        <Penny x={150} y={126} scale={0.38} mood="excited" pose="shrug" />
        <Label x={160} y={176} size={12} color="#1d7a49">
          Gross income under the bar? No requirement to file.
        </Label>
      </svg>
    ),
    body: [
      "Most people must file if their gross income is at least the amount for their filing status and age. For 2025 those amounts match the standard deduction, plus the extra amount for being 65 or older (blindness doesn't raise the filing threshold).",
      "Gross income here means income that isn't tax-exempt, before any deductions. Social Security benefits are left out unless half of them plus your other income is more than $25,000 ($32,000 married filing jointly), or you're married filing separately and lived with your spouse at any time during the year.",
    ],
    table: {
      head: ["2025 status", "Under 65", "65 or older"],
      rows: [
        ["Single", "$15,750", "$17,750"],
        ["Head of household", "$23,625", "$25,625"],
        ["Married filing jointly", "$31,500", "$33,100 (one) / $34,700 (both)"],
        ["Married filing separately", "$5", "$5"],
        ["Qualifying surviving spouse", "$31,500", "$33,100"],
      ],
    },
    keyPoint: "2025 must-file gross income: Single $15,750 (65+: $17,750); HOH $23,625 ($25,625); MFJ $31,500 ($33,100 / $34,700); QSS $31,500; MFS $5.",
  },
  {
    title: "Must file anyway: the special cases",
    alt: "A list on a clipboard of situations that require a return even at low income, each with a red check.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <rect x={40} y={14} width={240} height={156} rx={6} fill="#c58b4e" stroke={INK} strokeWidth={2.5} />
        <rect x={50} y={28} width={220} height={134} fill="#fff" stroke={INK} strokeWidth={2} />
        {["Self-employment ≥ $400", "Advance premium credit", "Owe special taxes", "HSA distributions", "Church wages ≥ $108.28"].map((t, i) => (
          <g key={t}>
            <path d={`M62,${50 + i * 24} l5,6 l10,-12`} fill="none" stroke="#a8321f" strokeWidth={3} />
            <Label x={84} y={56 + i * 24} size={12} anchor="start">
              {t}
            </Label>
          </g>
        ))}
      </svg>
    ),
    body: [
      "Some people must file whatever their income: net self-employment earnings of $400 or more, advance payments of the premium tax credit for anyone in the household, special taxes owed (like self-employment tax, Social Security and Medicare tax on unreported tips, household employment taxes, or additional tax on an IRA or HSA), distributions from an HSA or Archer MSA, or church employee wages of $108.28 or more.",
    ],
    keyPoint: "Must file regardless of income: SE earnings ≥ $400, APTC received, special taxes owed (SE, IRA/HSA additional tax, household employment), HSA/MSA distributions, church employee wages ≥ $108.28.",
  },
  {
    title: "Should file anyway: money on the table",
    alt: "Penny under the filing threshold pulls cash out of a mailbox labeled Refund.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <rect x={190} y={70} width={70} height={46} rx={20} fill="#5aa9e6" stroke={INK} strokeWidth={2.5} />
        <path d="M225,116 V164" stroke="#8a5a3c" strokeWidth={6} />
        <Label x={225} y={98} size={12} color="#fff">
          REFUND
        </Label>
        <Cash x={170} y={60} scale={1.1} rotate={-16} />
        <Cash x={150} y={40} scale={1} rotate={12} />
        <Penny x={80} y={74} scale={0.5} mood="excited" pose="up" />
        <Label x={160} y={170} size={12}>
          Withholding · EITC · refundable credits
        </Label>
      </svg>
    ),
    body: [
      "Below the threshold, a return can still be worth filing. Tax withheld from wages comes back only if you file. So do refundable credits, like the earned income credit, the additional child tax credit and the refundable part of the American opportunity credit.",
    ],
    keyPoint: "Not required to file? File anyway to recover withholding and claim refundable credits (EITC, ACTC, refundable AOTC).",
  },
  {
    title: "Five statuses, one pick",
    alt: "Five doors labeled Single, Married filing jointly, Married filing separately, Head of household and Qualifying surviving spouse.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3eefb" />
        {["Single", "MFJ", "MFS", "HOH", "QSS"].map((t, i) => (
          <g key={t}>
            <rect x={14 + i * 61} y={40} width={50} height={96} rx={4} fill={["#fff", "#d8f0e2", "#fde2d6", "#fff3c4", "#dfeaf6"][i]} stroke={INK} strokeWidth={2.5} />
            <circle cx={54 + i * 61} cy={92} r={3} fill={INK} />
            <Label x={39 + i * 61} y={74} size={13}>
              {t}
            </Label>
          </g>
        ))}
        <Crown x={222} y={30} scale={0.45} />
        <Label x={160} y={166} size={12}>
          More than one fits? Pick the lowest tax.
        </Label>
      </svg>
    ),
    body: [
      "There are five filing statuses: single, married filing jointly, married filing separately, head of household and qualifying surviving spouse. Status is based on your situation on December 31.",
      "If more than one fits, choose the one that gives the lowest tax. Joint filing is usually lowest for married couples, but not always.",
    ],
    keyPoint: "Five statuses: Single, MFJ, MFS, HOH, QSS. Decided as of Dec 31. If several apply, pick the lowest tax.",
  },
  {
    title: "Joint or separate: what MFS gives up",
    alt: "Two spouses tied together with a rope labeled joint and several liability. A pair of scissors marked MFS cuts the rope but drops several benefits.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Heart x={60} y={60} scale={2.2} />
        <Label x={60} y={112} size={12}>
          MFJ
        </Label>
        <Label x={60} y={128} size={10} weight={700}>
          both owe it all
        </Label>
        <Label x={60} y={142} size={10} weight={700}>
          (joint and several)
        </Label>
        <Label x={220} y={30} size={13} color="#a8321f">
          MFS usually loses:
        </Label>
        {["Education credits", "Student loan interest", "Std deduction (if spouse itemizes)", "Capital loss: only $1,500", "Senior deduction"].map((t, i) => (
          <Label key={t} x={124} y={56 + i * 22} size={10.5} anchor="start" weight={700}>
            {`✗ ${t}`}
          </Label>
        ))}
      </svg>
    ),
    body: [
      "On a joint return, both spouses report all their income and deductions, and each is responsible for the whole tax, plus any interest and penalties (joint and several liability).",
      "Married filing separately keeps each spouse responsible only for their own return, but it costs a lot: no education credits or student loan interest deduction, the standard deduction is $0 if the other spouse itemizes, the capital loss limit drops to $1,500, the dependent care credit and the new senior deduction are generally off the table, and more Social Security can become taxable.",
    ],
    keyPoint: "MFJ = joint and several liability. MFS loses: education credits, student loan interest, std deduction if spouse itemizes, $1,500 capital loss limit, senior deduction, usually dependent care credit.",
  },
  {
    title: "Head of household: the crown needs a castle",
    alt: "Penny in a crown in front of a castle-shaped house with Milo in the window. Three flags: Unmarried, Over half the costs, Qualifying person.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#dff1fb" />
        <rect x={0} y={150} width={320} height={30} fill="#cde8b8" />
        <House x={226} y={122} scale={1.4} color="#f4d9b0" />
        <Milo x={226} y={112} scale={0.18} mood="happy" />
        <Penny x={76} y={58} scale={0.42} mood="smug" />
        <Crown x={76} y={38} scale={0.45} />
        {["Unmarried on Dec 31", "Paid > half the home's costs", "Qualifying person > half the year"].map((t, i) => (
          <Label key={t} x={10} y={130 + i * 16} size={11} anchor="start" color="#1d7a49">
            {`✓ ${t}`}
          </Label>
        ))}
      </svg>
    ),
    body: [
      "To file as head of household you must be unmarried or “considered unmarried” on December 31, pay more than half the cost of keeping up a home for the year, and have a qualifying person live with you in that home for more than half the year. Temporary absences, like school, count as time lived at home.",
      "A qualifying person is usually your qualifying child, or a relative you can claim as a dependent. The big exception: a parent you can claim doesn't have to live with you, as long as you pay more than half the cost of the parent's home.",
      "“Considered unmarried”: you file separately, pay more than half the home's costs, your spouse didn't live in the home during the last six months of the year, and your child lived with you more than half the year.",
    ],
    keyPoint: "HOH: unmarried/considered unmarried on Dec 31 + paid > half the home's costs + qualifying person lived there > half the year. Dependent parent can live elsewhere.",
  },
  {
    title: "Qualifying surviving spouse: two more years",
    alt: "A calendar with three years. The year of death is joint; the next two years can be qualifying surviving spouse.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        {[
          [60, "2023", "Death: MFJ", "#e8edf5"],
          [160, "2024", "QSS", "#d8f0e2"],
          [260, "2025", "QSS", "#d8f0e2"],
        ].map(([x, y, t, c]) => (
          <g key={y as string}>
            <rect x={(x as number) - 44} y={40} width={88} height={76} rx={6} fill={c as string} stroke={INK} strokeWidth={2.5} />
            <Label x={x as number} y={70} size={16}>
              {y}
            </Label>
            <Label x={x as number} y={96} size={12} color={t === "QSS" ? "#1d7a49" : INK}>
              {t}
            </Label>
          </g>
        ))}
        <Label x={160} y={146} size={12}>
          Dependent child at home all year
        </Label>
        <Label x={160} y={164} size={11} weight={700}>
          and no remarriage
        </Label>
      </svg>
    ),
    body: [
      "In the year a spouse dies, the survivor can file jointly. For the next two years, the survivor may use qualifying surviving spouse status, which keeps the joint return tax rates and standard deduction.",
      "For 2025, the spouse must have died in 2023 or 2024. The survivor must not have remarried before the end of 2025, must have a child or stepchild (not a foster child) they can claim who lived in the home all year, must pay more than half the cost of the home, and must have been able to file jointly in the year of death.",
    ],
    keyPoint: "QSS: spouse died in either of the 2 prior years (2023 or 2024 for 2025), no remarriage, dependent child/stepchild lived with you all year, paid > half the home costs. Year of death itself = MFJ.",
  },
  {
    title: "The 2025 standard deduction, plus the senior bonus",
    alt: "Stacks of coins of different heights for each filing status, with an extra stack for age 65 and a gold coin labeled senior deduction.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        {[
          [40, "Single", 50],
          [100, "HOH", 75],
          [160, "MFJ", 100],
        ].map(([x, t, h]) => (
          <g key={t as string}>
            <rect x={(x as number) - 20} y={140 - (h as number)} width={40} height={h as number} fill="#f2c230" stroke={INK} strokeWidth={2} />
            <Label x={x as number} y={158} size={11}>
              {t}
            </Label>
          </g>
        ))}
        <circle cx={248} cy={80} r={34} fill="#f2c230" stroke={INK} strokeWidth={3} />
        <Label x={248} y={76} size={14}>
          $6,000
        </Label>
        <Label x={248} y={92} size={10}>
          65+ bonus
        </Label>
        <Label x={248} y={140} size={11} weight={700}>
          2025 to 2028
        </Label>
      </svg>
    ),
    body: [
      "Most taxpayers take the standard deduction instead of itemizing. Being 65 or older or blind adds $2,000 each if unmarried, or $1,600 each if married or a surviving spouse.",
      "New for 2025 through 2028: a deduction of up to $6,000 for each taxpayer age 65 or older ($12,000 if both spouses qualify on a joint return), allowed whether or not you itemize. It phases out by 6% of modified AGI over $75,000 ($150,000 joint), needs a valid SSN, and isn't available to married couples filing separately.",
    ],
    table: {
      head: ["2025", "Standard deduction", "Extra per 65+/blind"],
      rows: [
        ["Single", "$15,750", "$2,000"],
        ["Head of household", "$23,625", "$2,000"],
        ["Married filing jointly", "$31,500", "$1,600"],
        ["Married filing separately", "$15,750", "$1,600"],
        ["Qualifying surviving spouse", "$31,500", "$1,600"],
      ],
    },
    keyPoint: "2025 std deduction: $15,750 S/MFS, $23,625 HOH, $31,500 MFJ/QSS; +$2,000 (unmarried) or +$1,600 (married) per 65+/blind. Senior deduction up to $6,000 each (2025–2028), phase-out over $75k/$150k MAGI, not for MFS.",
  },
  {
    title: "Deadlines: more time to file, not to pay",
    alt: "Calendar pages: April 15 due date, June 15 for taxpayers abroad, October 15 with an extension. A sign says interest starts April 15.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#dff1fb" />
        <CalendarPage x={60} y={72} top="APR" big="15" scale={1.3} />
        <CalendarPage x={160} y={72} top="JUN" big="15" scale={1.3} color="#5aa9e6" />
        <CalendarPage x={260} y={72} top="OCT" big="15" scale={1.3} color="#1d7a49" />
        <Label x={60} y={130} size={11}>
          Due date
        </Label>
        <Label x={160} y={130} size={11}>
          Abroad: auto 2 months
        </Label>
        <Label x={260} y={130} size={11}>
          Form 4868
        </Label>
        <Plane x={160} y={22} scale={0.4} />
        <Label x={160} y={164} size={13} color="#a8321f">
          Tax is still due April 15. Interest runs from then.
        </Label>
      </svg>
    ),
    body: [
      "2025 returns are due April 15, 2026. Form 4868 gives an automatic six-month extension to October 15, 2026, but only to file. Tax not paid by April 15 accrues interest and the failure-to-pay penalty.",
      "U.S. citizens and residents living and working outside the U.S. and Puerto Rico on the due date get an automatic two months, to June 15, 2026, to file and pay (interest still runs from April 15). They attach a statement explaining that they qualify.",
      "When a taxpayer dies, the personal representative files the final return, due on the usual date for that year.",
    ],
    keyPoint: "Due April 15, 2026. Form 4868 → Oct 15 to FILE, not to pay (interest + failure-to-pay from Apr 15). Living abroad → automatic 2 months (June 15), attach a statement.",
  },
];

const lesson: Lesson = {
  id: "p1-who-files",
  part: "part1",
  domainId: "p1d1",
  number: "1.2",
  episode: "Heavy Is the Crown",
  title: "Who must file and how",
  minutes: 14,
  lawAsOf: "tax year 2025 (law through December 31, 2025)",
  intro: "Two questions start every return: does this person have to file, and with which status? Penny wants a crown. Hoot wants the rules followed.",
  comic,
  cards,
  hook: {
    line: "No crown without a castle and a subject.",
    more: "Head of household = unmarried + you pay over half the castle + a qualifying subject lives there over half the year. Mom gets a pass on living in the castle.",
    alt: "Penny wearing a crown, a small castle, and Milo waving from a tower window.",
    art: (
      <svg viewBox="0 0 320 120">
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Crown x={70} y={60} scale={1.1} />
        <path d="M160,100 V50 h14 v10 h12 V50 h14 v10 h12 V50 h14 v50 Z" fill="#e9c38f" stroke={INK} strokeWidth={2.5} />
        <rect x={190} y={70} width={16} height={30} fill="#8a5a3c" stroke={INK} strokeWidth={2} />
        <Milo x={270} y={60} scale={0.3} mood="happy" pose="wave" />
      </svg>
    ),
  },
  traps: [
    {
      title: "The extension that “covers” payment",
      text: "Form 4868 extends the time to file only. Interest and the failure-to-pay penalty start April 15 on anything unpaid.",
    },
    {
      title: "Head of household, living alone",
      text: "A single person with no qualifying person isn't head of household, however much of the home they pay for. No subject, no crown.",
    },
    {
      title: "Qualifying surviving spouse in the year of death",
      text: "The year the spouse dies is a married year (joint return allowed). QSS starts the year after and lasts two years.",
    },
    {
      title: "MFS and the itemizing spouse",
      text: "If one spouse filing separately itemizes, the other's standard deduction is zero. They must itemize too.",
    },
    {
      title: "Low income, no return, no refund",
      text: "Not required to file doesn't mean shouldn't. Withholding and refundable credits come back only on a filed return.",
    },
  ],
  sources: [
    { key: "p501", section: "Who Must File (Table 1, Table 2, Table 3); Filing Status; Standard Deduction" },
    { key: "p17", section: "Chapter 1, Filing Information; Chapter 2, Filing Status" },
    { key: "obbb", section: "Enhanced deduction for seniors" },
    { key: "extension", section: "Form 4868, extension to file is not an extension to pay" },
    { key: "abroad", section: "Automatic 2-month extension for taxpayers abroad" },
  ],
  quizTopics: ["Filing status", "Standard deduction", "Due dates and extensions"],
  game: {
    title: "Crown or Clown?",
    setup: "The Ledger Falls Status Pageant. Each contestant wants a filing status. Answer as Ace: a right call earns an EA stamp, a wrong one goes in Hoot's notebook.",
    rounds: [
      {
        who: "Penny",
        prompt: "I'm single, 32, and my only 2025 income is $14,000 of wages with tax withheld. Do I have to file?",
        answer: "Not required, but she should file to get the withholding back",
        wrong: [
          ["Yes, everyone with a W-2 must file", "Filing depends on gross income. $14,000 is below the $15,750 threshold for a single filer under 65."],
          ["No, and she can't get the withholding back without income over the threshold", "Anyone can file to claim a refund of withholding, whatever their income."],
          ["Yes, because any wages over $400 require a return", "The $400 rule is for self-employment earnings, not wages."],
        ],
        rule: "Single under 65 must file at $15,750 of gross income for 2025. Below that, file anyway to recover withholding and refundable credits.",
      },
      {
        who: "Milo",
        prompt: "I'm 15. I made $600 of net profit from my lemonade stand and have no other income. Penny claims me as a dependent. Do I have to file?",
        answer: "Yes, because net self-employment earnings are $400 or more",
        wrong: [
          ["No, because a dependent's income is below the standard deduction", "The self-employment rule applies to everyone, dependents included."],
          ["No, because minors don't owe self-employment tax", "There's no age exemption from self-employment tax for a self-employed business like Milo's stand."],
          ["Only if Penny doesn't claim him", "Being someone's dependent doesn't remove the $400 self-employment filing rule."],
        ],
        rule: "Net self-employment earnings of $400 or more require a return, whatever your age or dependency status.",
      },
      {
        who: "Penny",
        prompt: "I'm unmarried, I pay all the costs of my home, and Milo (my nephew and qualifying child) has lived with me all year. What's my best filing status?",
        answer: "Head of household",
        wrong: [
          ["Single, because a nephew can't be a qualifying person", "A nephew is a descendant of a sibling, which meets the qualifying child relationship test."],
          ["Qualifying surviving spouse", "That status is only for someone whose spouse died in one of the two prior years."],
          ["Married filing separately", "Penny isn't married."],
        ],
        rule: "HOH: unmarried on Dec 31, paid more than half the home's costs, and a qualifying person lived there more than half the year.",
      },
      {
        who: "Hoot",
        prompt: "Hoo. Taxpayer's spouse died in 2024. Taxpayer hasn't remarried, pays all the home's costs, and their dependent son lived with them all of 2025. Best status for 2025?",
        answer: "Qualifying surviving spouse",
        wrong: [
          ["Married filing jointly", "A joint return is available only for the year of death, 2024."],
          ["Head of household", "HOH would work, but QSS gives the joint brackets and standard deduction, which is better."],
          ["Single", "Single ignores the better statuses the taxpayer qualifies for."],
        ],
        rule: "QSS applies for the two years after the year of death if the survivor has a dependent child at home all year and hasn't remarried.",
      },
      {
        who: "Penny",
        prompt: "I filed Form 4868 on April 10 and paid nothing. I file in August and owe $2,000. What happens?",
        answer: "No late-filing penalty, but she owes interest and the failure-to-pay penalty from April 15",
        wrong: [
          ["Nothing, because the extension covered everything until October 15", "The extension is to file. Tax is still due April 15."],
          ["She owes the failure-to-file penalty from April 15", "The extension makes an August filing on time, so there's no failure-to-file penalty."],
          ["The extension is invalid because she didn't pay", "Form 4868 is valid without a payment, though paying an estimate reduces interest and penalties."],
        ],
        rule: "Form 4868 extends the filing deadline to October 15, not the payment deadline.",
      },
      {
        who: "Ace",
        prompt: "My unmarried client pays more than half the cost of her mother's apartment across town. Her mother is her dependent. Can the client file as head of household?",
        answer: "Yes, a dependent parent doesn't have to live with you",
        wrong: [
          ["No, the qualifying person must live with the taxpayer more than half the year", "That's the rule for most qualifying persons, but a parent is the exception."],
          ["Only if the mother moves in by December 31", "No move is needed. Paying more than half of the parent's home costs is enough."],
          ["Only if the client also has a child at home", "A dependent parent alone can be the qualifying person."],
        ],
        rule: "For HOH, a dependent parent can live in a separate home if you pay more than half its cost.",
      },
    ],
  },
  stinger: {
    alt: "At the grocery store checkout, Penny still wears her crown. The cashier, who is Hoot, stares.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef0f4" floor="#d7dbe2" />
        <rect x={160} y={150} width={150} height={44} fill="#9aa4b2" stroke={INK} strokeWidth={2.5} />
        <Hoot x={240} y={120} scale={0.6} mood="stern" />
        <Penny x={86} y={128} scale={0.76} mood="smug" pose="wave" />
        <Crown x={86} y={92} scale={0.75} />
        <Pop x={190} y={70} kind="question" />
        <Whoosh x={36} y={160} />
        <Sign x={270} y={40} text="AISLE 1040" w={76} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "The Head of Household will take two bananas.", x: 2, y: 2, w: 44, tail: "down-left" },
      { who: "Hoot", text: "…Hoo.", x: 66, y: 10, w: 20, tail: "down-right" },
    ],
  },
  deck: {
    topic: "Filing requirements, filing status and filing deadlines for individuals",
    rules:
      "2025 gross income filing thresholds, must-file situations (self-employment of $400 or more, advance premium tax credit, special taxes), the five filing statuses, head of household and qualifying surviving spouse tests, married filing separately limits, the 2025 standard deduction and senior deduction, and extensions and due dates",
  },
};

export default lesson;

import { Ace, Arrow, Backdrop, Biscuit, Hoot, Label, Milo, Penny, WaltPortrait, Window } from "../cast";
import type { Lesson } from "../lesson";
import { Calendar, Card, CARD, Desk, Globe, HOOK, Mark, PANEL, Paper, Shoebox, Step, Tick, Whoosh } from "../props";

// Part 1, topic 1.1: getting started on a return. Written to tax law for 2025 from Publications 17, 501
// and 519, the Form W-7 instructions and the IRS IP PIN page.

const INK = "#17202c";

/** A plastic ID card with a label, about 56 by 34. */
function IdCard({ x, y, label, sub, color, rotate = 0 }: { x: number; y: number; label: string; sub: string; color: string; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect x={-40} y={-23} width={80} height={46} rx={5} fill={color} stroke={INK} strokeWidth={2} />
      <circle cx={-25} cy={-6} r={8} fill="#fff" stroke={INK} strokeWidth={1.5} />
      <Label x={-12} y={-1} size={13} anchor="start">
        {label}
      </Label>
      <Label x={0} y={16} size={7} weight={700}>
        {sub}
      </Label>
    </g>
  );
}

function Kitchen({ wall = "#fdf3e1", walt }: { wall?: string; walt?: boolean }) {
  return (
    <g>
      <Backdrop wall={wall} />
      {walt && <WaltPortrait x={252} y={18} scale={0.6} mood="happy" />}
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny's kitchen. Penny holds up an overflowing shoebox of papers. Ace, at the table, raises an eyebrow. Biscuit the beagle sniffs the box.",
    art: (
      <svg {...PANEL}>
        <Kitchen />
        <Penny x={96} y={128} scale={0.78} mood="excited" pose="hold" holding={<Shoebox x={0} y={-4} scale={0.95} />} />
        <Ace x={230} y={132} scale={0.74} mood="thinking" flip />
        <Desk x={180} y={176} w={140} />
        <Biscuit x={34} y={176} scale={0.42} mood="excited" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace! Happy Shoebox Day! My whole 2025 is in here. Probably.", x: 3, y: 3, w: 50, tail: "down-left" },
      { who: "Ace", text: "Morning, Penny. We start with who you are, not what you earned.", x: 55, y: 14, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds an intake sheet. Penny looks sheepish.",
    art: (
      <svg {...PANEL}>
        <Kitchen />
        <Ace x={86} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-6} label="INTAKE" scale={0.9} />} />
        <Penny x={232} y={128} scale={0.78} mood="worried" pose="shrug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Penny, your name exactly as it is on your Social Security card?", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Penny", text: "Penny Pocket! …Fine, Ace. Penelope Marigold Pocket.", x: 52, y: 6, w: 38, tail: "down-right" },
    ],
  },
  {
    alt: "Under the table, Biscuit chews a W-2. Milo lunges for it, shocked.",
    art: (
      <svg {...PANEL}>
        <Kitchen />
        <Milo x={96} y={128} scale={0.78} mood="shocked" pose="point" />
        <Biscuit x={232} y={168} scale={0.6} mood="excited" />
        <Paper x={256} y={180} label="W-2" rotate={30} scale={0.8} />
        <Whoosh x={286} y={150} dir={-1} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Biscuit! Drop Penny's W-2!", x: 3, y: 4, w: 40, tail: "down-left" },
      { who: "Ace", text: "Relax, Milo. Her employer can send another copy.", x: 50, y: 4, w: 40, tail: "down" },
    ],
  },
  {
    alt: "Grandpa Walt's portrait on the wall talks. Penny holds up last year's return, puzzled.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <WaltPortrait x={210} y={62} scale={1.05} mood="excited" />
        <Penny x={90} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Paper x={0} y={-6} label="2024" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Why does Ace want LAST year's return, Grandpa? 2024 is over!", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Walt", text: "Back in my day, Penny, a 1040 fit on a napkin!", x: 54, y: 3, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Ace unrolls last year's return like a treasure map with an X on it.",
    art: (
      <svg {...PANEL}>
        <Kitchen wall="#eef5f1" walt />
        <Ace x={84} y={128} scale={0.78} mood="excited" pose="point" />
        <g transform="translate(170 104)">
          <path d="M0,0 L120,-6 L124,70 L4,76 Z" fill="#f4e2b8" stroke={INK} strokeWidth={2.5} />
          <path d="M14,52 Q40,20 64,40 T110,20" fill="none" stroke="#a8321f" strokeWidth={2.5} strokeDasharray="5 4" />
          <path d="M100,12 l12,12 M112,12 l-12,12" stroke="#a8321f" strokeWidth={4} strokeLinecap="round" />
          <Label x={40} y={70} size={10}>
            2024 RETURN
          </Label>
        </g>
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Penny, last year's return is a treasure map: carryovers, refunds you applied forward, and what you need to sign the e-file.", x: 3, y: 3, w: 62, tail: "down-left" },
    ],
  },
  {
    alt: "Hoot pops up at the kitchen window. Penny jumps.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Window x={200} y={86} w={96} h={84} />
        <Hoot x={248} y={140} scale={0.6} mood="stern" />
        <rect x={200} y={86} width={96} height={84} fill="none" stroke={INK} strokeWidth={3} />
        <Penny x={92} y={128} scale={0.78} mood="shocked" pose="up" />
        <Mark x={150} y={92} text="!" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Hoot?! Why are you at my window?", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! Where did Penny Pocket LIVE in 2025? Residency comes first.", x: 50, y: 3, w: 47, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Step 1: Who is on this return?",
    alt: "Ace holds a clipboard next to three ID cards for Penny, Milo and Lulu, each with a green check.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" />
        <Ace x={64} y={92} scale={0.62} mood="happy" pose="hold" holding={<Paper x={0} y={-6} label="INTAKE" scale={0.8} />} />
        <IdCard x={170} y={48} label="Penny" sub="NAME · SSN · BIRTH" color="#fff3c4" rotate={-4} />
        <IdCard x={262} y={60} label="Milo" sub="NAME · SSN · BIRTH" color="#eef0d8" rotate={4} />
        <IdCard x={216} y={126} label="Lulu" sub="NAME · SSN · BIRTH" color="#fde2e4" />
        <Tick x={204} y={28} ok />
        <Tick x={298} y={40} ok />
        <Tick x={250} y={106} ok />
      </svg>
    ),
    body: [
      "Before a single number, Ace collects the people: the taxpayer, the spouse and every dependent, each with a full name, taxpayer ID number and date of birth.",
      "The IRS matches each name and number against Social Security records. A name that doesn't match, such as a married name never reported to the Social Security Administration, can get an e-filed return rejected. The fix is to update the name with the SSA.",
    ],
    keyPoint: "Intake starts with people: name, TIN and birth date for taxpayer, spouse and each dependent, matching Social Security records.",
  },
  {
    title: "Every person needs a number",
    alt: "Three ID cards side by side: SSN from Social Security, ITIN from the IRS on Form W-7, and ATIN for a child being adopted.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <IdCard x={58} y={70} label="SSN" sub="SOCIAL SECURITY" color="#d8f0e2" />
        <IdCard x={160} y={70} label="ITIN" sub="IRS · FORM W-7" color="#fff3c4" />
        <IdCard x={262} y={70} label="ATIN" sub="IRS · ADOPTION" color="#fde2e4" />
        <Label x={58} y={120} size={11} weight={700}>
          Can work in U.S.
        </Label>
        <Label x={160} y={120} size={11} weight={700}>
          Can't get an SSN
        </Label>
        <Label x={262} y={120} size={11} weight={700}>
          Adoption pending
        </Label>
        <Biscuit x={290} y={142} scale={0.34} mood="sad" />
        <Label x={266} y={166} size={10} weight={700} color="#a8321f" anchor="end">
          Biscuit: no number. Not a person.
        </Label>
      </svg>
    ),
    body: [
      "Most people use a Social Security number. Someone who must file or be listed on a return but can't get an SSN applies to the IRS for an Individual Taxpayer Identification Number (ITIN) on Form W-7.",
      "An ITIN is for tax filing only. It doesn't give the right to work in the U.S. or to Social Security benefits. An Adoption Taxpayer Identification Number (ATIN) is a temporary number for a child in a pending U.S. adoption who can't get an SSN yet.",
    ],
    table: {
      head: ["Number", "Issued by", "For"],
      rows: [
        ["SSN", "SSA", "Most people"],
        ["ITIN", "IRS, Form W-7", "No SSN possible"],
        ["ATIN", "IRS, Form W-7A", "Adoption pending"],
      ],
    },
    keyPoint: "SSN from Social Security; ITIN (Form W-7) if you can't get an SSN, tax use only; ATIN (W-7A) for a child in a pending adoption.",
  },
  {
    title: "Birthdays count the day before",
    alt: "Aunt Rosa's birthday cake on a calendar page for January 1, with an arrow back to December 31 labeled already 65.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Calendar x={80} y={74} month="DEC" day="31" scale={1.4} />
        <Calendar x={236} y={74} month="JAN" day="1" scale={1.4} color="#7b5cd6" />
        <g transform="translate(236 130)">
          <rect x={-22} y={-8} width={44} height={20} rx={3} fill="#f28fb0" stroke={INK} strokeWidth={2} />
          <path d="M-12,-8 v-10 M0,-8 v-12 M12,-8 v-10" stroke={INK} strokeWidth={2.5} />
          <path d="M-12,-20 l0,-4 M0,-22 l0,-4 M12,-20 l0,-4" stroke="#f6b73c" strokeWidth={3} strokeLinecap="round" />
        </g>
        <Arrow d="M196,60 Q160,30 122,58" color="#a8321f" />
        <Label x={160} y={26} size={12} color="#a8321f">
          already 65 here!
        </Label>
        <Label x={160} y={170} size={11} weight={700}>
          Born Jan 1, 1961 → 65 for all of 2025
        </Label>
      </svg>
    ),
    body: [
      "For tax purposes you reach an age on the day before your birthday. So someone born on January 1, 1961 turned 65 on December 31, 2025 and counts as 65 or older for 2025.",
      "Age and blindness, both checked at the end of the year, add an extra standard deduction for 2025: $2,000 for a single or head of household filer, or $1,600 for each married spouse who qualifies.",
    ],
    keyPoint: "You reach an age the day before your birthday: born Jan 1, 1961 = 65 for 2025. Extra standard deduction: $2,000 unmarried, $1,600 per married spouse.",
  },
  {
    title: "Last year's return is a treasure map",
    alt: "A treasure map labeled 2024 return with a dotted trail passing items: loss carryover, refund applied, prior-year AGI, ending at an X.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M14,16 L306,8 L312,166 L8,172 Z" fill="#f4e2b8" stroke={INK} strokeWidth={2.5} />
        <path d="M40,140 Q80,60 130,110 T230,70 T286,40" fill="none" stroke="#a8321f" strokeWidth={2.5} strokeDasharray="6 5" />
        <path d="M278,30 l14,14 M292,30 l-14,14" stroke="#a8321f" strokeWidth={4} strokeLinecap="round" />
        <Card x={22} y={30} w={96} h={34} lines={["Loss & charity", "carryovers"]} size={10} color="#fff" />
        <Card x={130} y={118} w={96} h={34} lines={["2024 refund", "applied to 2025"]} size={10} color="#fff" />
        <Card x={196} y={26} w={74} h={34} lines={["Prior-year", "AGI to e-file"]} size={10} color="#fff" />
        <Label x={260} y={156} size={11}>
          2024 RETURN
        </Label>
      </svg>
    ),
    body: [
      "The prior-year return shows what carries into this year: unused capital losses, charitable contribution carryovers, an overpayment the taxpayer applied to this year's estimated tax, and depreciation schedules for business or rental property.",
      "It also flags things to ask about, like a state tax refund that may be taxable if the taxpayer itemized last year, and it holds the prior-year AGI the taxpayer can use to verify their identity when signing an e-filed return.",
    ],
    keyPoint: "Review the prior-year return for carryovers (capital loss, charitable), overpayments applied forward, depreciation, state refunds and prior-year AGI for e-file signing.",
  },
  {
    title: "Where do they live? Three kinds of taxpayer",
    alt: "Hoot holds a globe beside three doors: U.S. citizen, resident alien and nonresident alien.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={160} />
        <Hoot x={52} y={86} scale={0.52} mood="thinking" pose="point" />
        <Globe x={86} y={36} r={16} />
        {[
          ["CITIZEN", "#d8f0e2", 140],
          ["RESIDENT", "#fff3c4", 202],
          ["NON-RES.", "#fde2e4", 264],
        ].map(([l, c, x]) => (
          <g key={l as string}>
            <rect x={(x as number) - 26} y={60} width={52} height={100} rx={3} fill={c as string} stroke={INK} strokeWidth={2.5} />
            <circle cx={(x as number) + 16} cy={112} r={3} fill={INK} />
            <Label x={x as number} y={52} size={10}>
              {l as string}
            </Label>
          </g>
        ))}
        <Label x={140} y={84} size={9} weight={700}>
          worldwide
        </Label>
        <Label x={140} y={96} size={8} weight={700}>
          Form 1040
        </Label>
        <Label x={202} y={84} size={9} weight={700}>
          worldwide
        </Label>
        <Label x={202} y={96} size={8} weight={700}>
          Form 1040
        </Label>
        <Label x={264} y={84} size={9} weight={700}>
          U.S. only
        </Label>
        <Label x={264} y={96} size={8} weight={700}>
          1040-NR
        </Label>
      </svg>
    ),
    body: [
      "U.S. citizens and resident aliens are taxed on their worldwide income and file Form 1040. Nonresident aliens are generally taxed only on U.S.-source income and income connected with a U.S. business, and file Form 1040-NR.",
      "A non-citizen is a resident alien for the year if they meet either the green card test (a lawful permanent resident at any time in the year) or the substantial presence test. Otherwise they're a nonresident alien.",
    ],
    keyPoint: "Citizens and resident aliens: worldwide income, Form 1040. Nonresident aliens: mostly U.S. income, Form 1040-NR. Resident = green card test or substantial presence test.",
  },
  {
    title: "The substantial presence test",
    alt: "A staircase of three blocks: all of 2025's days, a third of 2024's, a sixth of 2023's, adding up to at least 183.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={20} y={100} w={80} h={60} color="#5aa9e6" label="2025" sub="all the days" />
        <Step x={110} y={120} w={80} h={40} color="#9fd0f2" label="2024" sub="× 1/3" />
        <Step x={200} y={136} w={80} h={24} color="#d4ebfa" label="2023 × 1/6" />
        <Label x={160} y={38} size={18}>
          ≥ 31 days in 2025
        </Label>
        <Label x={160} y={66} size={18} color="#1d7a49">
          + total ≥ 183 → resident
        </Label>
      </svg>
    ),
    body: [
      "A non-citizen without a green card meets the substantial presence test for 2025 if they were in the U.S. at least 31 days in 2025 and at least 183 days counting all the days in 2025, one-third of the days in 2024 and one-sixth of the days in 2023.",
      "Some days don't count, such as days as an exempt individual (for example a student on an F or J visa or a teacher on a J visa, within the time limits).",
    ],
    table: {
      head: ["Year", "Counts as", "120 days each year"],
      rows: [
        ["2025", "every day", "120"],
        ["2024", "one-third", "40"],
        ["2023", "one-sixth", "20"],
        ["Total", "need 183", "180: not resident"],
      ],
    },
    keyPoint: "Substantial presence: ≥31 days this year AND this year + 1/3 last year + 1/6 the year before ≥ 183. Exempt individuals' days (e.g. F/J students) don't count.",
  },
  {
    title: "The shoebox sort",
    alt: "Four bins labeled Who, Money in, Money out and Already paid, with papers flying from Penny's shoebox into them.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Shoebox x={44} y={40} scale={0.9} />
        {[
          ["WHO", "IDs, kids", 92, "#fde2e4"],
          ["IN", "W-2, 1099", 150, "#d8f0e2"],
          ["OUT", "1098, bills", 208, "#fff3c4"],
          ["PAID", "withheld", 266, "#d4ebfa"],
        ].map(([l, s, x, c]) => (
          <g key={l as string}>
            <path d={`M${(x as number) - 26},110 L${(x as number) + 26},110 L${(x as number) + 22},166 L${(x as number) - 22},166 Z`} fill={c as string} stroke={INK} strokeWidth={2.5} />
            <Label x={x as number} y={134} size={12}>
              {l as string}
            </Label>
            <Label x={x as number} y={148} size={8} weight={700}>
              {s as string}
            </Label>
          </g>
        ))}
        <Paper x={120} y={74} label="W-2" rotate={20} scale={0.6} />
        <Paper x={196} y={66} label="1098" rotate={-16} scale={0.6} />
        <Paper x={258} y={80} label="1040-ES" rotate={10} scale={0.6} />
        <Arrow d="M70,40 Q110,20 140,60" />
      </svg>
    ),
    body: [
      "Ace sorts every paper into four piles: who (IDs, birth dates, dependents and where they lived), money in (W-2s, 1099s, K-1s), money out (records for adjustments, deductions and credits, like Form 1098 or child care receipts) and already paid (withholding and estimated tax payments).",
      "A missing pile is a question to ask, not a zero. Episode 1.4 opens every envelope in detail.",
    ],
    keyPoint: "Sort the shoebox: who, money in, money out, already paid. A missing pile is a question, not a zero.",
  },
  {
    title: "The six-digit lock: IP PIN",
    alt: "A padlock with six dials on Penny's return. Hoot nods approvingly.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={160} />
        <Paper x={110} y={96} label="1040" scale={2.2} />
        <g transform="translate(140 120)">
          <path d="M-14,-10 v-12 a14,14 0 0 1 28,0 v12" fill="none" stroke={INK} strokeWidth={5} />
          <rect x={-26} y={-12} width={52} height={36} rx={5} fill="#f2c230" stroke={INK} strokeWidth={2.5} />
          <Label x={0} y={12} size={12}>
            ••••••
          </Label>
        </g>
        <Hoot x={250} y={92} scale={0.5} mood="happy" clipboard />
      </svg>
    ),
    body: [
      "An Identity Protection PIN is a six-digit number that stops anyone else from filing a return with the taxpayer's SSN or ITIN. Anyone who can verify their identity can request one, and the IRS issues a new one every year.",
      "If a taxpayer has an IP PIN, it goes on the return. An e-filed return with a missing or wrong IP PIN is rejected.",
    ],
    keyPoint: "IP PIN: six digits, new every year, anyone can opt in. If issued, it must be on the return or the e-file is rejected.",
  },
];

const lesson: Lesson = {
  id: "p1-getting-started",
  part: "part1",
  domainId: "p1d1",
  number: "1.1",
  episode: "Shoebox Day",
  title: "Getting started",
  minutes: 12,
  lawAsOf: "tax year 2025 (law through December 31, 2025)",
  intro: "Before any income or deduction, a return starts with the people on it: who they are, how old, and where they lived. Get this part wrong and nothing after it can be right.",
  previously: "Season premiere. It's January 2026 in Ledger Falls, Penny's 2025 return is due April 15, and she has prepared. Sort of.",
  comic,
  cards,
  hook: {
    line: "People first, papers second, numbers last.",
    more: "Names that match Social Security, birthdays that count the day before, and where everyone lived. Then open the shoebox.",
    alt: "Three steps: a person icon, a stack of papers, then a calculator.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Penny x={56} y={50} scale={0.42} mood="happy" />
        <Label x={56} y={110} size={12}>
          1. People
        </Label>
        <Arrow d="M92,60 H118" />
        <Shoebox x={160} y={64} scale={0.75} />
        <Label x={160} y={110} size={12}>
          2. Papers
        </Label>
        <Arrow d="M202,60 H228" />
        <g transform="translate(266 58)">
          <rect x={-22} y={-30} width={44} height={56} rx={5} fill="#2a2f3a" stroke={INK} strokeWidth={2} />
          <rect x={-16} y={-24} width={32} height={12} fill="#cfe9f7" />
          {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-16 + c * 11} y={-6 + r * 10} width={8} height={7} rx={1} fill="#f4f1e8" />))}
        </g>
        <Label x={266} y={110} size={12}>
          3. Numbers
        </Label>
      </svg>
    ),
  },
  traps: [
    {
      title: "Born on January 1",
      text: "Someone born January 1, 1961 is 65 for 2025, not 2026, because you reach an age on the day before your birthday. The exam loves this one.",
    },
    {
      title: "A green card and a short visit",
      text: "A green card holder is a resident alien for the year even if they spent only a few days in the U.S. Don't run the day count when the green card test already answers it.",
    },
    {
      title: "Adding the three years at full weight",
      text: "The substantial presence test counts prior years at one-third and one-sixth. A distractor that adds all the days at full weight is a banana peel.",
    },
    {
      title: "The ITIN that means you can work",
      text: "An ITIN is only for tax filing. It doesn't authorize work in the U.S. or make anyone eligible for Social Security benefits.",
    },
  ],
  sources: [
    { key: "p17", section: "Chapter 1: Filing Information; Social Security Number (SSN); Individual Taxpayer Identification Number (ITIN)" },
    { key: "p501", section: "Standard Deduction: Age 65 or older" },
    { key: "p519", section: "Chapter 1: Green Card Test; Substantial Presence Test; Exempt Individual" },
    { key: "iw7", section: "Purpose of Form" },
    { key: "ippin", section: "Get an identity protection PIN" },
  ],
  cases: [
    {
      who: "Penny",
      title: "Aunt Rosa's birthday",
      facts: "Penny's Aunt Rosa was born on January 1, 1961. She is single, not blind, and takes the standard deduction on her 2025 return.",
      question: "What is Rosa's 2025 standard deduction?",
      choices: ["$15,750", "$17,350", "$17,750", "$19,750"],
      answer: "$17,750",
      why: "Rosa turned 65 on December 31, 2025, the day before her birthday, so she's 65 for 2025. Single base $15,750 plus the $2,000 additional amount for an unmarried taxpayer 65 or older is $17,750.",
    },
    {
      who: "Milo",
      title: "Milo's bandmate Sven",
      facts: "Sven, a citizen of Sweden with no green card and no exempt status, was in the U.S. 120 days in 2025, 150 days in 2024 and 180 days in 2023.",
      question: "What is Sven's residency status for 2025?",
      choices: [
        "Nonresident alien, because he was here fewer than 183 days in 2025",
        "Resident alien, because 120 + 50 + 30 = 200 weighted days",
        "Resident alien, because he was here 450 days over three years",
        "Nonresident alien, because he has no green card",
      ],
      answer: "Resident alien, because 120 + 50 + 30 = 200 weighted days",
      why: "He has at least 31 days in 2025, and all of 2025 (120) plus a third of 2024 (50) plus a sixth of 2023 (30) is 200, at least 183. He meets the substantial presence test.",
    },
    {
      who: "Hoot",
      title: "Hoot's cousin Olwen",
      facts: "Hoot's cousin Olwen has held a green card since 2019. She spent only 20 days in the U.S. in 2025 and the rest of the year traveling abroad.",
      question: "How is Olwen treated for 2025?",
      choices: ["Resident alien under the green card test", "Nonresident alien, because she was here fewer than 31 days", "Dual-status alien for 2025", "Nonresident, unless she chooses to be treated as resident"],
      answer: "Resident alien under the green card test",
      why: "A lawful permanent resident at any time during the year is a resident alien under the green card test, however few days they spent in the U.S. The 31-day count is part of the other test.",
    },
    {
      who: "Ace",
      title: "Ace and the friend with no SSN",
      facts: "Ace's new client Marco owns a rental house in Ledger Falls and must file a U.S. return. He isn't eligible for a Social Security number.",
      question: "What number does Marco need, and how does he get it?",
      choices: ["An ITIN, by applying on Form W-7", "An ATIN, by applying on Form W-7A", "An EIN, by applying on Form SS-4", "A PTIN, by registering online"],
      answer: "An ITIN, by applying on Form W-7",
      why: "An Individual Taxpayer Identification Number is for people who need a TIN for tax purposes but can't get an SSN. The application is Form W-7. An ATIN is only for a child in a pending adoption, and a PTIN is for paid preparers.",
    },
    {
      who: "Milo",
      title: "Milo's leftover loss",
      facts: "Milo's 2024 return shows a capital loss carryover of $4,500 to 2025. He forgot about it until Ace opened the 2024 return.",
      question: "What happens to the $4,500?",
      choices: ["It expired at the end of 2024", "Milo carries it forward and uses it on his 2025 return", "Milo must amend 2024 to use it", "It can only offset 2025 wages, not gains"],
      answer: "Milo carries it forward and uses it on his 2025 return",
      why: "Unused capital losses carry forward to later years until used. That's exactly why the prior-year return is part of intake: the carryover only shows up there.",
    },
    {
      who: "Penny",
      title: "Penny's lock",
      facts: "The IRS issued Penny an Identity Protection PIN last year. She's about to e-file her 2025 return.",
      question: "Which is true?",
      choices: [
        "She keeps using last year's IP PIN forever",
        "The IP PIN is optional once it's issued",
        "She enters this year's new IP PIN, or the e-filed return is rejected",
        "IP PINs are only needed on paper returns",
      ],
      answer: "She enters this year's new IP PIN, or the e-filed return is rejected",
      why: "The IRS issues a new IP PIN each year. Once a taxpayer has one, the current PIN must be on the return, and an e-filed return with a missing or wrong IP PIN is rejected.",
    },
  ],
  quizTopics: ["Residency status"],
  quizBrief: "Getting started on a 1040: SSN, ITIN and ATIN; using the prior-year return; age 65 and blindness; green card and substantial presence tests; IP PINs",
};

export default lesson;

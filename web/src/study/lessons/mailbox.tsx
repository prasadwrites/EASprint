import { Ace, Arrow, Backdrop, Biscuit, Cash, Hoot, Label, Milo, Penny, Window } from "../cast";
import type { Lesson } from "../lesson";
import { Board, Card, CARD, Desk, Envelope, HOOK, Mailbox, PANEL, Paper, Shoebox, Stamp, Tick, Whoosh } from "../props";

// Part 1, topic 1.4: the taxpayer's paper trail: income documents, records for adjustments, credits and
// payments, IRS notices and extra filings. Written to tax law for 2025 from Publications 17 and 552 and
// the IRS page on understanding notices and letters.

const INK = "#17202c";

function Phone({ x, y, scale = 1, text }: { x: number; y: number; scale?: number; text: string[] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-26} y={-46} width={52} height={92} rx={8} fill="#2a2f3a" stroke={INK} strokeWidth={2.5} />
      <rect x={-21} y={-38} width={42} height={74} rx={3} fill="#fff" />
      <rect x={-18} y={-30} width={36} height={8 + text.length * 9} rx={5} fill="#d4ebfa" />
      {text.map((t, i) => (
        <Label key={i} x={0} y={-21 + i * 9} size={6.5} weight={700}>
          {t}
        </Label>
      ))}
    </g>
  );
}

function Street() {
  return (
    <g>
      <rect width={320} height={220} fill="#d8eef8" />
      <rect y={180} width={320} height={40} fill="#9fd8a8" />
      <path d="M0,180 h320" stroke={INK} strokeWidth={2} opacity={0.4} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Outside the house, the mailbox overflows with envelopes. Milo, walking Biscuit, stares at it. Penny waves from the porch.",
    art: (
      <svg {...PANEL}>
        <Street />
        <Mailbox x={170} y={196} scale={1.1} stuffed />
        <Milo x={68} y={130} scale={0.76} mood="shocked" pose="point" />
        <Biscuit x={124} y={186} scale={0.36} mood="excited" />
        <Penny x={268} y={134} scale={0.7} mood="happy" flip pose="wave" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Penny! The mailbox is EATING envelopes!", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Penny", text: "It's tax form season, Milo. They come in waves.", x: 56, y: 6, w: 41, tail: "down-right" },
    ],
  },
  {
    alt: "Penny at the table, buried in forms labeled W-2, 1099-INT, 1099-DIV and 1098. Ace calmly holds one up.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={90} y={128} scale={0.78} mood="worried" pose="shrug" />
        <Desk y={176} />
        <Paper x={40} y={186} label="W-2" rotate={-14} scale={0.8} />
        <Paper x={84} y={190} label="1099-INT" rotate={8} scale={0.8} />
        <Paper x={130} y={186} label="1099-DIV" rotate={-6} scale={0.8} />
        <Paper x={176} y={192} label="1098" rotate={12} scale={0.8} />
        <Ace x={250} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="1099" scale={0.9} />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace, 1099-THIS, 1099-THAT! Who ARE these people?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Penny, each one has a twin. The IRS got a copy too.", x: 54, y: 8, w: 43, tail: "down-right" },
    ],
  },
  {
    alt: "Milo fans himself with cash, grinning. Hoot appears at the window with a stern look.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Window x={204} y={86} w={92} h={84} />
        <Hoot x={250} y={140} scale={0.6} mood="stern" />
        <rect x={204} y={86} width={92} height={84} fill="none" stroke={INK} strokeWidth={3} />
        <Milo x={92} y={128} scale={0.78} mood="smug" pose="hold" holding={<Cash x={0} y={-4} rotate={-10} />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "My dog-walking clients paid cash. No form, so it's tax-free!", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! Income is taxable with or without a form, Milo Marsh.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds a letter marked CP2000, terrified. Biscuit hides under the table. Ace raises a calming hand.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={86} y={128} scale={0.78} mood="shocked" pose="hold" holding={<Envelope x={0} y={-6} label="CP2000" irs />} />
        <Desk x={140} y={180} w={80} />
        <Biscuit x={180} y={196} scale={0.3} mood="sad" />
        <Ace x={256} y={128} scale={0.78} mood="happy" flip pose="wave" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Ace! A letter about my 2024 return! Am I going to JAIL?!", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Breathe, Milo. A CP2000 isn't a bill. It's a question.", x: 55, y: 6, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points to a whiteboard: Match? Agree or explain. Answer by the date. Milo nods, relieved.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={70} y={128} scale={0.78} mood="happy" pose="point" />
        <Board x={140} y={86} w={110} h={70} lines={["AGREE or EXPLAIN", "by the date", "on the letter"]} size={10} chalk={false} />
        <Milo x={278} y={132} scale={0.66} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Milo, they matched a 1099 you left off. You agree or explain, by the date on the letter. Never ignore it.", x: 3, y: 2, w: 66, tail: "down-left" },
    ],
  },
  {
    alt: "Penny excitedly shows her phone with a text: IRS, click to claim refund now. Hoot shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={88} y={128} scale={0.78} mood="excited" pose="hold" holding={<Phone x={0} y={-20} scale={0.7} text={["IRS: CLAIM", "REFUND NOW!!", "click.here"]} />} />
        <Hoot x={242} y={126} scale={0.7} mood="stern" clipboard />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Hoot, you texted me a refund link!", x: 3, y: 3, w: 38, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! Not me, Penny Pocket. The IRS starts with a LETTER. That text is a scam.", x: 46, y: 3, w: 51, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Money in: the income forms",
    alt: "A mailbox spilling envelopes labeled W-2, 1099-INT, 1099-DIV, 1099-B, 1099-NEC, 1099-R, SSA-1099 and K-1.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d8eef8" />
        <rect y={160} width={320} height={20} fill="#9fd8a8" />
        <Mailbox x={60} y={170} scale={1.1} />
        {[
          ["W-2", 140, 40, -8],
          ["1099-INT", 196, 34, 6],
          ["1099-DIV", 252, 44, -4],
          ["1099-B", 138, 100, 4],
          ["1099-NEC", 196, 96, -6],
          ["1099-R", 254, 104, 8],
          ["SSA-1099", 168, 148, 0],
          ["K-1", 236, 150, -6],
        ].map(([l, x, y, r]) => (
          <Paper key={l as string} x={x as number} y={y as number} label={l as string} rotate={r as number} scale={0.9} />
        ))}
      </svg>
    ),
    body: [
      "Income documents tell Ace what came in, and every one has a copy at the IRS. The exam expects you to know which form reports what.",
      "When a form is wrong, the taxpayer asks the payer for a corrected one rather than just reporting a different number.",
    ],
    table: {
      head: ["Form", "Reports"],
      rows: [
        ["W-2", "Wages and withholding"],
        ["1099-INT / -DIV", "Interest / dividends"],
        ["1099-B", "Broker sales"],
        ["1099-NEC", "Nonemployee pay"],
        ["1099-MISC", "Rents, royalties, prizes"],
        ["1099-R", "Pensions, IRAs"],
        ["SSA-1099", "Social Security"],
        ["1099-G", "Unemployment, state refunds"],
        ["W-2G", "Gambling winnings"],
        ["Schedule K-1", "Share of partnership, S corp, trust"],
      ],
    },
    keyPoint: "Income forms: W-2 wages; 1099-INT/DIV/B investment; 1099-NEC nonemployee pay; 1099-MISC rents/royalties; 1099-R retirement; SSA-1099; 1099-G; W-2G; K-1. The IRS gets a copy of each.",
  },
  {
    title: "No form? Still income.",
    alt: "Milo fans out cash with no form in sight. Hoot holds up a sign: all income, from whatever source.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fdf3e1" floorY={160} />
        <Milo x={74} y={90} scale={0.6} mood="smug" pose="hold" holding={<Cash x={0} y={-4} rotate={-10} />} />
        <Paper x={150} y={60} label="no 1099" rotate={-8} scale={0.9} color="#eee" />
        <Tick x={150} y={60} ok={false} s={2.2} />
        <Hoot x={256} y={88} scale={0.5} mood="stern" pose="point" />
        <Label x={150} y={122} size={13} color="#a8321f">
          Taxable anyway
        </Label>
      </svg>
    ),
    body: [
      "Gross income means all income from whatever source, unless the law excludes it. Cash from side jobs, tips, payment through apps and bartered services are all taxable, with or without a 1099.",
      "A missing form changes what the IRS can match, not what the taxpayer owes. Ace asks about every income source, not just the envelopes.",
    ],
    keyPoint: "Income is taxable whether or not a form is issued: cash, tips, app payments, barter. Ask about every source, not just the forms.",
  },
  {
    title: "Money out: proof for deductions and credits",
    alt: "The Out pile from Penny's shoebox: Form 1098 mortgage interest, 1098-E student loan interest, 1098-T tuition, a charity receipt and a daycare receipt.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Shoebox x={52} y={124} scale={1.1} labels={["OUT"]} />
        {[
          ["1098", "mortgage int.", 136, 52],
          ["1098-E", "student loan", 196, 50],
          ["1098-T", "tuition", 256, 54],
          ["CHARITY", "receipt", 166, 124],
          ["DAYCARE", "name + TIN", 232, 126],
        ].map(([l, s, x, y]) => (
          <Paper key={l as string} x={x as number} y={y as number} label={l as string} sub={s as string} scale={1.05} />
        ))}
      </svg>
    ),
    body: [
      "Adjustments, deductions and credits need proof. Common documents are Form 1098 (mortgage interest), 1098-E (student loan interest) and 1098-T (tuition), plus receipts and acknowledgments for charitable gifts and the care provider's name, address and taxpayer ID for the child and dependent care credit.",
      "Form 5498 reports IRA contributions but often arrives in May, after the return is filed, so Ace asks about contributions directly.",
    ],
    keyPoint: "Proof for adjustments, deductions and credits: 1098, 1098-E, 1098-T, charity receipts, care provider's name/address/TIN. Form 5498 (IRA) often arrives after filing.",
  },
  {
    title: "Already paid: don't leave money on the table",
    alt: "A piggy bank labeled Already paid, filled with coins labeled withholding, estimated payments, last year's overpayment and extension payment.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <g transform="translate(90 98)">
          <ellipse rx={66} ry={48} fill="#f28fb0" stroke={INK} strokeWidth={2.5} />
          <circle cx={46} cy={-10} r={4} fill={INK} />
          <ellipse cx={66} cy={6} rx={10} ry={12} fill="#f7a8c3" stroke={INK} strokeWidth={2} />
          <path d="M-20,-48 h30" stroke={INK} strokeWidth={4} />
          <path d="M-40,44 v14 M30,44 v14" stroke={INK} strokeWidth={8} strokeLinecap="round" />
          <Label x={-4} y={6} size={11}>
            ALREADY PAID
          </Label>
        </g>
        {[
          ["Withholding", 62],
          ["Estimated payments", 96],
          ["Prior overpayment", 130],
          ["Extension payment", 164],
        ].map(([l, y]) => (
          <g key={l as string}>
            <circle cx={180} cy={(y as number) - 22} r={9} fill="#f6d33c" stroke={INK} strokeWidth={2} />
            <Label x={196} y={(y as number) - 18} size={11} anchor="start">
              {l as string}
            </Label>
          </g>
        ))}
      </svg>
    ),
    body: [
      "Payments reduce the balance due: federal withholding from W-2s and 1099s, each estimated tax payment (with its date and amount), any overpayment from last year applied to this year, and any payment made with an extension.",
      "Ace confirms estimated payments against the IRS online account or records, because a missed payment is a missed credit and a wrong one is a notice waiting to happen.",
    ],
    keyPoint: "Payments: withholding (W-2, 1099), each estimated payment (date + amount), prior-year overpayment applied, extension payment. Verify against records.",
  },
  {
    title: "Hoot's letters: the notice decoder",
    alt: "Four envelopes from the IRS with labels: CP2000 question, CP14 bill, CP12 we fixed a math error, 5071C prove it's you.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Envelope x={70} y={42} label="CP2000" irs scale={1.3} />
        <Envelope x={230} y={42} label="CP14" irs scale={1.3} />
        <Envelope x={70} y={124} label="CP12" irs scale={1.3} />
        <Envelope x={230} y={124} label="5071C" irs scale={1.3} />
        <Label x={70} y={84} size={10} weight={700}>
          “Income doesn't match”
        </Label>
        <Label x={230} y={84} size={10} weight={700}>
          “You owe: a bill”
        </Label>
        <Label x={70} y={166} size={10} weight={700}>
          “We fixed your math”
        </Label>
        <Label x={230} y={166} size={10} weight={700}>
          “Prove it's you”
        </Label>
      </svg>
    ),
    body: [
      "IRS notices have a number in the corner that tells you what kind they are. Four the exam likes:",
    ],
    table: {
      head: ["Notice", "What it means"],
      rows: [
        ["CP2000", "Income on file doesn't match the return; proposed change, not a bill"],
        ["CP14", "Balance due: a bill"],
        ["CP12", "IRS corrected an error; refund or balance changed"],
        ["Letter 5071C", "Verify identity before the return is processed"],
      ],
    },
    keyPoint: "CP2000 = income mismatch, proposed change (respond, not a bill). CP14 = balance due bill. CP12 = IRS corrected an error, refund changed. 5071C = verify identity.",
  },
  {
    title: "How to answer Hoot",
    alt: "Ace's checklist: read it, compare to the return, agree or explain in writing, by the date, keep a copy. Hoot nods.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={160} />
        <Card x={20} y={16} w={180} h={136} color="#fff">
          {["Read the whole letter", "Compare it to the return", "Agree, or explain in writing", "Answer by the date", "Keep a copy"].map((l, i) => (
            <g key={l}>
              <Tick x={38} y={38 + i * 24} ok s={0.7} />
              <Label x={52} y={42 + i * 24} size={11} anchor="start">
                {l}
              </Label>
            </g>
          ))}
        </Card>
        <Hoot x={258} y={88} scale={0.5} mood="happy" clipboard />
      </svg>
    ),
    body: [
      "Read the notice, then compare it with the return and the taxpayer's records. If the taxpayer agrees, they follow the notice's instructions (often signing a response form and paying). If not, they explain in writing and include documents.",
      "Either way, respond by the date on the notice and keep a copy. Ignoring it lets the proposed change become a bill and can cost appeal rights.",
    ],
    keyPoint: "Answering a notice: read it, compare to the return, agree or explain in writing with documents, respond by the deadline, keep a copy. Never ignore it.",
  },
  {
    title: "The IRS writes first",
    alt: "A phone with a scam text demanding gift cards, crossed out. Next to it, a real letter in a mailbox with a check mark.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Phone x={86} y={90} scale={1.4} text={["PAY IN GIFT", "CARDS NOW", "OR ARREST!"]} />
        <Tick x={120} y={140} ok={false} s={1.8} />
        <Mailbox x={232} y={170} scale={0.9} flag={false} />
        <Envelope x={262} y={56} label="IRS" irs />
        <Tick x={290} y={30} ok s={1.4} />
      </svg>
    ),
    body: [
      "The IRS usually makes first contact by regular mail. It doesn't start contact by email, text or social media to ask for personal or financial information.",
      "It also never demands immediate payment by gift card, prepaid card or wire transfer, or threatens to have the police arrest someone for not paying. Those are scams, and preparers should warn clients about them.",
    ],
    keyPoint: "The IRS starts with mail. It never demands gift cards or wire transfers, threatens arrest, or asks for personal info by text, email or social media.",
  },
  {
    title: "Extra filings that ride along",
    alt: "A little train: the Form 1040 engine pulling cars labeled FBAR, 8938, Schedule H, 8606, 8615 and 709.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <path d="M0,150 H320" stroke={INK} strokeWidth={3} />
        <path d="M0,156 H320" stroke="#8a5a3c" strokeWidth={4} strokeDasharray="10 8" />
        <g>
          <rect x={232} y={88} width={74} height={56} rx={6} fill="#e8505b" stroke={INK} strokeWidth={2.5} />
          <rect x={282} y={70} width={14} height={20} fill="#2a2f3a" stroke={INK} strokeWidth={2} />
          <Label x={260} y={122} size={14} color="#fff">
            1040
          </Label>
          <circle cx={248} cy={146} r={8} fill="#2a2f3a" stroke={INK} strokeWidth={2} />
          <circle cx={290} cy={146} r={8} fill="#2a2f3a" stroke={INK} strokeWidth={2} />
        </g>
        {["8938", "Sch. H", "8606", "8615"].map((l, i) => (
          <g key={l}>
            <rect x={174 - i * 56} y={104} width={50} height={40} rx={4} fill={["#fff3c4", "#d4ebfa", "#fde2e4", "#eef0d8"][i]} stroke={INK} strokeWidth={2} />
            <Label x={199 - i * 56} y={128} size={11}>
              {l}
            </Label>
            <circle cx={186 - i * 56} cy={146} r={6} fill="#2a2f3a" />
            <circle cx={212 - i * 56} cy={146} r={6} fill="#2a2f3a" />
          </g>
        ))}
        <Card x={14} y={20} w={126} h={44} lines={["FBAR goes to FinCEN,", "on its own track"]} size={10} color="#fff" />
        <Arrow d="M140,42 Q190,30 220,60" />
      </svg>
    ),
    body: [
      "Intake also asks: does anything else need to be filed? Examples are Form 8938 for foreign assets, Schedule H for a household employee, Form 8606 for nondeductible IRA contributions, Form 8615 for a child's investment income, a gift tax return (Form 709), and state returns.",
      "Some ride with the 1040 and some travel alone: the FBAR goes to FinCEN, not the IRS, and Form 709 is filed separately.",
    ],
    keyPoint: "Ask about extra filings: 8938, Schedule H, 8606, 8615, 709 (separate), state returns, and the FBAR (filed with FinCEN, not with the 1040).",
  },
  {
    title: "How long to keep the shoebox",
    alt: "A filing cabinet with drawers labeled 3 years, 4 years for payroll, 6 years, 7 years, and forever.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fdf3e1" floorY={164} />
        <rect x={14} y={16} width={104} height={148} rx={4} fill="#9aa4b2" stroke={INK} strokeWidth={2.5} />
        {[
          ["3 yrs: most returns", 22],
          ["6 yrs: income off > 25%", 50],
          ["7 yrs: bad debt, worthless stock", 78],
          ["4 yrs: payroll records", 106],
          ["Forever: no return filed", 134],
        ].map(([l, y]) => (
          <g key={l as string}>
            <rect x={20} y={y as number} width={92} height={24} rx={2} fill="#cfd6df" stroke={INK} strokeWidth={1.5} />
            <rect x={56} y={(y as number) + 9} width={20} height={5} rx={2} fill={INK} />
            <Label x={126} y={(y as number) + 16} size={10} anchor="start">
              {l as string}
            </Label>
          </g>
        ))}
      </svg>
    ),
    body: [
      "Keep records that support a return until the period of limitations for that return runs out: generally 3 years after filing (or 2 years after paying the tax, if later). It's 6 years if more than 25% of gross income was left off, and 7 years for a loss from worthless securities or a bad debt deduction.",
      "With no return filed, or a fraudulent one, keep them indefinitely. Employment tax records are kept at least 4 years, and records for property until the limitations period ends for the year it's sold.",
    ],
    keyPoint: "Keep records 3 years after filing (2 after paying, if later); 6 years if income understated > 25%; 7 for bad debt or worthless securities; 4 for employment tax; forever if no return or fraud.",
  },
];

const lesson: Lesson = {
  id: "p1-paper-trail",
  part: "part1",
  domainId: "p1d1",
  number: "1.4",
  episode: "The Mailbox of Doom",
  title: "The taxpayer's paper trail",
  minutes: 14,
  lawAsOf: "tax year 2025 (law through December 31, 2025)",
  intro: "What every form in the mailbox means, what to ask for when there isn't one, and what to do when the IRS writes back.",
  previously: "Penny and Milo are married, Lulu is settled in, and it's late January. The forms have started to arrive.",
  comic,
  cards,
  hook: {
    line: "No form? Still income. A letter? Still answer.",
    more: "Every 1099 has a twin at the IRS. When the twins don't match, Hoot sends a CP2000: a question with a deadline, not a bill.",
    alt: "Two identical 1099 forms, one in Penny's hand and one in Hoot's clipboard, linked by a dotted line.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Penny x={50} y={44} scale={0.36} mood="happy" />
        <Paper x={100} y={60} label="1099" />
        <path d="M124,60 Q160,30 196,60" fill="none" stroke="#a8321f" strokeWidth={2.5} strokeDasharray="5 4" />
        <Paper x={220} y={60} label="1099" />
        <Hoot x={276} y={44} scale={0.32} mood="smug" />
        <Label x={160} y={110} size={12}>
          The IRS has the twin
        </Label>
        <Whoosh x={156} y={22} />
        <Stamp x={160} y={64} text="MATCH?" color="#a8321f" size={9} rotate={0} />
      </svg>
    ),
  },
  traps: [
    {
      title: "No 1099, no income",
      text: "Wrong every time. Income is taxable whether or not anyone sends a form.",
    },
    {
      title: "The CP2000 as a bill or an audit",
      text: "A CP2000 proposes a change because income on file doesn't match the return. It's not a bill and not an audit, but it does need an answer by its deadline.",
    },
    {
      title: "The urgent call from “the IRS”",
      text: "Demands for gift cards, wire transfers or immediate payment with threats of arrest are scams. The IRS starts with mail.",
    },
    {
      title: "Attaching the FBAR to the 1040",
      text: "The FBAR is filed separately with FinCEN. Form 8938, by contrast, is attached to the return. Episode 1.5 has the whole story.",
    },
  ],
  sources: [
    { key: "p17", section: "Chapter 1: What Records Should I Keep?; Chapter 5: Wages, Salaries, and Other Earnings" },
    { key: "p552", section: "How Long To Keep Records" },
    { key: "notices", section: "Understanding your IRS notice or letter; CP2000, CP14, CP12, Letter 5071C" },
  ],
  cases: [
    {
      who: "Milo",
      title: "Milo's cash clients",
      facts: "In 2025, Milo's neighbors paid him $2,300 in cash for dog walking. Nobody sent him a 1099.",
      question: "How much of it must Milo report as income?",
      choices: ["$0, because no 1099 was issued", "Only amounts over $600 from one client", "All $2,300", "Only what he deposited in the bank"],
      answer: "All $2,300",
      why: "Gross income includes all income from whatever source. Whether a payer sends a 1099 doesn't change what's taxable.",
    },
    {
      who: "Milo",
      title: "The CP2000 arrives",
      facts: "Milo receives a CP2000 about his 2024 return. It lists a 1099-NEC that wasn't on the return and shows extra tax.",
      question: "What is a CP2000?",
      choices: ["A bill that must be paid within 10 days", "A notice of audit at an IRS office", "A proposed change based on income reported to the IRS; he should agree or explain by the deadline", "A notice that his refund was seized"],
      answer: "A proposed change based on income reported to the IRS; he should agree or explain by the deadline",
      why: "The CP2000 is an underreporter notice. It proposes changes when information returns don't match the tax return, and asks the taxpayer to agree or disagree by the response date.",
    },
    {
      who: "Penny",
      title: "Penny's refund shrank",
      facts: "Penny expected a $900 refund. Instead she got a CP12 saying the IRS corrected an error and her refund is $600.",
      question: "What does a CP12 mean?",
      choices: ["She's being audited", "The IRS made changes to correct an error on her return, which changed her refund", "She owes a penalty for filing late", "Someone else filed using her SSN"],
      answer: "The IRS made changes to correct an error on her return, which changed her refund",
      why: "A CP12 tells the taxpayer the IRS corrected one or more errors, such as a math mistake, and that the refund or balance changed as a result.",
    },
    {
      who: "Dee",
      title: "Dee's identity check",
      facts: "Dee filed her return from the rig and then received Letter 5071C.",
      question: "What does the IRS want?",
      choices: ["For Dee to verify her identity before the return is processed", "A copy of her FBAR", "Payment of a balance due", "Proof of her foreign address"],
      answer: "For Dee to verify her identity before the return is processed",
      why: "Letter 5071C asks the taxpayer to verify their identity, usually online or by phone, so the IRS can be sure the return is really theirs before processing it.",
    },
    {
      who: "Ace",
      title: "The client's old receipts",
      facts: "Ace's client filed her 2022 return on time on April 15, 2023, reported all her income, and had no bad debts or worthless securities.",
      question: "Generally, how long should she keep the records that support that return?",
      choices: ["1 year", "3 years from filing", "7 years from filing", "Forever"],
      answer: "3 years from filing",
      why: "Records are kept until the period of limitations runs out, generally 3 years from the filing date. Longer periods apply only to special cases like large omitted income (6 years) or bad debts and worthless securities (7 years).",
    },
    {
      who: "Hoot",
      title: "The call that isn't Hoot",
      facts: "Penny gets a call from someone claiming to be the IRS. They say she owes $500 and must pay today with gift cards or be arrested.",
      question: "What should Penny do?",
      choices: ["Pay right away to avoid arrest", "Pay half and ask for an installment plan", "Hang up: the IRS doesn't demand gift cards or threaten arrest", "Give them her bank details instead of gift cards"],
      answer: "Hang up: the IRS doesn't demand gift cards or threaten arrest",
      why: "The IRS doesn't demand immediate payment by gift card or threaten arrest. That's a scam, and it can be reported to the Treasury Inspector General for Tax Administration.",
    },
  ],
  quizTopics: [],
  quizBrief: "The taxpayer's paper trail: W-2, 1099 and K-1 income forms, records for deductions, credits and payments, IRS notices CP2000, CP14, CP12 and 5071C, scams, record keeping",
};

export default lesson;

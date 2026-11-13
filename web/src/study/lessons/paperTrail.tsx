import { Ace, Arrow, Backdrop, Biscuit, Cash, Hoot, Label, Penny } from "../cast";
import type { Lesson } from "../lesson";
import { CalendarPage, Doc, Envelope, MailPile, Magnifier, Pop, Stamp, Whoosh } from "../props";

// Part 1, topic 1.4: the taxpayer's paper trail. Sources of income, adjustments, credits and payments, IRS
// notices and extra filings. Written to tax law through December 31, 2025 from Publication 17, the Form 1099-K
// page, the IRS notice pages and the recordkeeping page.

const INK = "#17202c";
const PANEL = { viewBox: "0 0 320 220", preserveAspectRatio: "xMidYMax meet" } as const;
const CARD = { viewBox: "0 0 320 180" } as const;

function Mailbox({ x, y, burst }: { x: number; y: number; burst?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0,0 V70" stroke="#8a5a3c" strokeWidth={8} />
      <path d="M-30,-30 h46 a14,14 0 0 1 14,14 v16 h-60 Z" fill="#5aa9e6" stroke={INK} strokeWidth={2.5} />
      <path d="M30,-24 V-46 h14 v8 h-10" fill="#e8505b" stroke={INK} strokeWidth={2} />
      {burst && (
        <g>
          <Envelope x={-38} y={-52} rotate={-30} scale={0.5} />
          <Envelope x={4} y={-66} rotate={10} scale={0.5} irs />
          <Envelope x={-60} y={-14} rotate={-60} scale={0.45} />
          <Envelope x={52} y={-62} rotate={34} scale={0.45} />
        </g>
      )}
    </g>
  );
}

function PhoneScam() {
  return (
    <g>
      <rect x={-22} y={-38} width={44} height={76} rx={6} fill="#2b3550" stroke={INK} strokeWidth={2.5} />
      <rect x={-18} y={-32} width={36} height={60} fill="#fbe5e1" />
      <Label x={0} y={-18} size={7} color="#a8321f">
        “IRS AGENT”
      </Label>
      <Label x={0} y={-6} size={6.5}>
        PAY NOW IN
      </Label>
      <Label x={0} y={4} size={6.5}>
        GIFT CARDS!!!
      </Label>
      <Label x={0} y={18} size={11} color="#a8321f">
        ⚠
      </Label>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny's mailbox bursts open, shooting envelopes into the air. Penny jumps back.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#dff1fb" floor="#cde8b8" />
        <Mailbox x={210} y={130} burst />
        <Penny x={80} y={128} scale={0.78} mood="shocked" pose="up" />
        <Pop x={130} y={70} kind="bang" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Why is my mailbox throwing up forms?!", x: 2, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "(from next door) It's late January, Penny. Information return season.", x: 52, y: 2, w: 46, tail: "down" },
    ],
  },
  {
    alt: "Penny sorts a W-2 and three 1099s on the table. Behind her, Hoot holds up an identical stack.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <rect x={20} y={150} width={180} height={10} fill="#a8774f" stroke={INK} strokeWidth={2} />
        <Doc x={40} y={130} scale={0.4} rotate={-8} label="W-2" />
        <Doc x={176} y={130} scale={0.4} rotate={10} label="1099-K" band="#b98ae0" />
        <Penny x={108} y={128} scale={0.74} mood="happy" pose="hold" holding={<Doc x={0} y={0} scale={0.4} label="1099-INT" band="#1d7a49" />} />
        <Hoot x={256} y={120} scale={0.62} mood="smug" />
        <Doc x={226} y={168} scale={0.34} rotate={-6} label="W-2" />
        <Doc x={286} y={170} scale={0.34} rotate={8} label="1099" band="#1d7a49" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo. I received copies of all of those.", x: 56, y: 2, w: 42, tail: "down-right" },
      { who: "Penny", text: "…Of ALL of them?", x: 2, y: 6, w: 34, tail: "down-left" },
    ],
  },
  {
    alt: "Penny fans out cash from pet-sitting and winks. Ace shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={86} y={128} scale={0.78} mood="smug" pose="up" />
        <Cash x={40} y={90} scale={0.8} rotate={-30} />
        <Cash x={130} y={84} scale={0.8} rotate={24} />
        <Biscuit x={150} y={182} scale={0.28} mood="happy" />
        <Ace x={246} y={128} scale={0.76} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "My pet-sitting cash didn't come with a form. So it's invisible!", x: 2, y: 2, w: 48, tail: "down-left" },
      { who: "Ace", text: "Income is income, Penny. Form or no form. And over $400 of it brings self-employment tax.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds an IRS envelope labeled CP2000 and panics. Biscuit hides under a cushion. Ace stays calm.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={86} y={128} scale={0.78} mood="shocked" pose="hold" holding={<Envelope x={0} y={0} scale={0.6} irs />} />
        <Label x={86} y={210} size={10}>
          CP2000
        </Label>
        <ellipse cx={170} cy={190} rx={30} ry={10} fill="#e8505b" stroke={INK} strokeWidth={2} />
        <Biscuit x={170} y={176} scale={0.22} mood="worried" />
        <Ace x={250} y={128} scale={0.76} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "A CP2000! Am I being audited?! Do I flee the country?!", x: 2, y: 2, w: 46, tail: "down-left" },
      { who: "Ace", text: "It's a proposal, not a bill. We check it against your records and answer by the date on the letter.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Penny's phone shows a message from an IRS agent demanding gift cards. Hoot bursts in, furious.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fbe5e1" />
        <Penny x={84} y={128} scale={0.78} mood="worried" pose="hold" holding={<PhoneScam />} />
        <Hoot x={236} y={120} scale={0.7} mood="shocked" pose="point" />
        <Whoosh x={290} y={150} flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "The IRS texted! I have to pay in gift cards in one hour!", x: 2, y: 2, w: 46, tail: "down-left" },
      { who: "Hoot", text: "HOO! Scam! We start with a letter in the mail, and we never demand gift cards.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Penny sits on a fortress of receipt boxes. Biscuit chews one receipt. Ace holds up three fingers.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        {[
          [60, 170],
          [110, 170],
          [85, 140],
        ].map(([x, y]) => (
          <rect key={`${x}${y}`} x={x - 24} y={y - 14} width={48} height={30} fill="#d9a066" stroke={INK} strokeWidth={2} />
        ))}
        <Penny x={86} y={84} scale={0.56} mood="smug" pose="up" />
        <Biscuit x={170} y={182} scale={0.26} mood="excited" />
        <path d="M184,188 l10,-4 l2,6 Z" fill="#fff" stroke={INK} strokeWidth={1.4} />
        <Ace x={250} y={128} scale={0.76} mood="happy" pose="wave" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Keep records three years after filing. Longer in a few special cases.", x: 52, y: 2, w: 46, tail: "down-right" },
      { who: "Penny", text: "How about forever? Forever sounds safe.", x: 2, y: 2, w: 42, tail: "down-left" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The form zoo",
    alt: "A zoo of tax forms in cages: W-2, 1099-INT, 1099-DIV, 1099-B, 1099-R, SSA-1099, 1099-G, 1099-NEC, 1099-K and K-1.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#cde8b8" />
        {["W-2", "1099-INT", "1099-DIV", "1099-B", "1099-R", "SSA-1099", "1099-NEC", "1099-K", "W-2G", "K-1"].map((t, i) => (
          <g key={t}>
            <Doc x={34 + (i % 5) * 63} y={i < 5 ? 52 : 130} scale={0.62} label={t.length > 6 ? t.replace("1099-", "") : t} band={["#5aa9e6", "#1d7a49", "#1d7a49", "#1d7a49", "#e0a920", "#7a6a58", "#a8321f", "#b98ae0", "#e8505b", "#2b3550"][i]} />
            <Label x={34 + (i % 5) * 63} y={i < 5 ? 88 : 166} size={9}>
              {t}
            </Label>
          </g>
        ))}
        <path d="M0,10 H320 M0,100 H320" stroke="#8a5a3c" strokeWidth={3} />
      </svg>
    ),
    body: [
      "Every information return has a twin at the IRS, which matches them against the return. Know which form reports what.",
    ],
    table: {
      head: ["Form", "Reports"],
      rows: [
        ["W-2", "Wages, tips and withholding"],
        ["1099-INT / 1099-DIV", "Interest / dividends and capital gain distributions"],
        ["1099-B", "Sales of stocks and other securities"],
        ["1099-R", "Pensions, annuities, IRA and plan distributions"],
        ["SSA-1099", "Social Security benefits"],
        ["1099-G", "Unemployment and state tax refunds"],
        ["1099-NEC / 1099-MISC", "Nonemployee pay / rents, royalties, prizes"],
        ["1099-K", "Card and payment app receipts"],
        ["W-2G", "Gambling winnings"],
        ["Schedule K-1", "Share of partnership, S corporation, estate or trust items"],
      ],
    },
    keyPoint: "Form zoo: W-2 wages; 1099-INT/DIV/B investments; 1099-R retirement; SSA-1099 Social Security; 1099-G unemployment/state refund; 1099-NEC/MISC; 1099-K payment apps; W-2G gambling; K-1 pass-throughs.",
  },
  {
    title: "No form? Still income",
    alt: "A magnifying glass over cash with no form attached. The caption says all income from whatever source.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Cash x={110} y={90} scale={2.2} rotate={-8} />
        <Magnifier x={150} y={80} scale={1.6} />
        <Label x={250} y={60} size={13}>
          Cash tips
        </Label>
        <Label x={250} y={82} size={13}>
          Side gigs
        </Label>
        <Label x={250} y={104} size={13}>
          Barter
        </Label>
        <Label x={250} y={126} size={13}>
          Digital assets
        </Label>
        <Label x={160} y={168} size={13} color="#a8321f">
          “All income from whatever source derived”
        </Label>
      </svg>
    ),
    body: [
      "Gross income includes all income from whatever source unless the law excludes it. Cash from a side job, tips, bartered services and gains on digital assets are taxable even when no form arrives.",
      "Net self-employment earnings of $400 or more also bring self-employment tax on Schedule SE.",
    ],
    keyPoint: "Income is taxable with or without an information return (cash, tips, barter, digital assets). SE earnings ≥ $400 → Schedule SE.",
  },
  {
    title: "Form 1099-K: payment apps and card sales",
    alt: "A phone with a payment app sends a 1099-K. Two counters show over $20,000 and over 200 transactions.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3eefb" />
        <rect x={40} y={30} width={70} height={124} rx={10} fill="#2b3550" stroke={INK} strokeWidth={2.5} />
        <rect x={46} y={40} width={58} height={100} fill="#e3f0fb" />
        <Label x={75} y={92} size={20}>
          $
        </Label>
        <Arrow d="M118,92 H160" width={3} />
        <Doc x={196} y={92} scale={1} label="1099-K" band="#b98ae0" />
        <Label x={276} y={70} size={12}>
          {"> $20,000"}
        </Label>
        <Label x={276} y={88} size={11}>
          and
        </Label>
        <Label x={276} y={106} size={12}>
          {"> 200 sales"}
        </Label>
        <Label x={160} y={172} size={11} weight={700}>
          Your old couch sold at a loss? Not income.
        </Label>
      </svg>
    ),
    body: [
      "Payment card companies and third-party payment networks report payments for goods and services on Form 1099-K. For 2025, a payment app or online marketplace must send one when payments total more than $20,000 across more than 200 transactions, though they can send one for less.",
      "The form reports gross receipts, not profit. Selling personal items, like a used couch, for less than you paid isn't taxable, and the loss isn't deductible. A gain on a personal item is taxable.",
    ],
    keyPoint: "1099-K (2025): third-party networks report if > $20,000 AND > 200 transactions (may report less). Gross, not profit. Personal items sold at a loss: not income, loss not deductible.",
  },
  {
    title: "Adjustments: the paperwork above the line",
    alt: "A line across the page. Above it, adjustments like educator expenses, HSA, half of SE tax and student loan interest lower AGI.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <path d="M10,96 H310" stroke={INK} strokeWidth={4} strokeDasharray="10 6" />
        <Label x={306} y={112} size={12} anchor="end">
          AGI line
        </Label>
        {["Educator $300", "HSA", "½ SE tax", "SE health ins.", "IRA", "Student loan"].map((t, i) => (
          <g key={t}>
            <rect x={14 + (i % 3) * 102} y={i < 3 ? 18 : 52} width={96} height={26} rx={13} fill="#fff" stroke={INK} strokeWidth={2} />
            <Label x={62 + (i % 3) * 102} y={(i < 3 ? 18 : 52) + 17} size={10.5}>
              {t}
            </Label>
          </g>
        ))}
        <Label x={150} y={132} size={13}>
          Subtracted before AGI, itemizing or not.
        </Label>
        <Label x={160} y={156} size={11} weight={700}>
          Proof: 1098-E, 5498, 5498-SA, receipts
        </Label>
      </svg>
    ),
    body: [
      "Adjustments to income come off before AGI, whether or not you itemize. Common ones: educator expenses (up to $300), HSA contributions, the deductible half of self-employment tax, self-employed health insurance, SEP and other self-employed retirement contributions, traditional IRA contributions, student loan interest (up to $2,500, shown on Form 1098-E), and alimony under divorce agreements made before 2019.",
    ],
    keyPoint: "Adjustments (above the line): educator $300, HSA, ½ SE tax, SE health insurance, SE retirement, IRA, student loan interest ≤ $2,500 (1098-E), pre-2019 alimony.",
  },
  {
    title: "Credits and payments: what's already paid in",
    alt: "A piggy bank labeled Already paid fills from four pipes: withholding, estimated payments, last year's overpayment and refundable credits.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        {["Withheld", "Estimates", "Last refund", "Credits"].map((t, i) => (
          <g key={t}>
            <rect x={14 + i * 76} y={20} width={68} height={26} rx={4} fill="#fff" stroke={INK} strokeWidth={2} />
            <Label x={48 + i * 76} y={37} size={10.5}>
              {t}
            </Label>
            <Arrow d={`M${48 + i * 76},48 L${150 + i * 7},104`} width={2.5} />
          </g>
        ))}
        <ellipse cx={160} cy={132} rx={56} ry={32} fill="#f4a7b9" stroke={INK} strokeWidth={2.5} />
        <Label x={160} y={137} size={13}>
          Already paid
        </Label>
        <CalendarPage x={292} y={140} top="EST" big="4×" scale={0.7} />
      </svg>
    ),
    body: [
      "Payments come from tax withheld (W-2 box 2, 1099 box 4 backup withholding, W-2G), estimated tax payments (due in April, June and September of the year and January of the next), and any prior-year overpayment applied to this year.",
      "Credit paperwork: Form 1098-T for education credits, Form 1095-A for the premium tax credit, and care provider details for the dependent care credit.",
    ],
    keyPoint: "Payments: withholding (W-2 box 2, 1099 box 4), 4 estimated payments (Apr, Jun, Sep, Jan), prior overpayment applied. Credit docs: 1098-T, 1095-A, care provider info.",
  },
  {
    title: "IRS notices: read the number, then the date",
    alt: "A wall of IRS envelopes, each with its notice number and meaning.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fbf7ee" />
        {[
          ["CP2000", "Proposal"],
          ["CP14", "Bill"],
          ["CP504", "Levy warning"],
          ["5071C", "Prove it's you"],
        ].map(([n, t], i) => (
          <g key={n}>
            <Envelope x={46 + i * 76} y={70} scale={0.95} irs />
            <Label x={46 + i * 76} y={116} size={13}>
              {n}
            </Label>
            <Label x={46 + i * 76} y={134} size={10} weight={700}>
              {t}
            </Label>
          </g>
        ))}
        <Label x={160} y={166} size={12} color="#a8321f">
          The real IRS starts by mail. Never by text or gift card.
        </Label>
      </svg>
    ),
    body: [
      "The IRS first contacts taxpayers by mail. Every notice has a number in the corner and a response date. A CP2000 proposes changes because income reported to the IRS doesn't match the return: it's not a bill or an audit, and you agree or disagree by the date. A CP14 says there's a balance due. CP501 and CP503 are reminders; a CP504 warns of intent to levy. Letter 5071C asks the taxpayer to verify their identity before a return is processed.",
      "The IRS doesn't demand payment by gift card, wire or cryptocurrency, and doesn't start contact by text, email or social media. Those are scams.",
    ],
    table: {
      head: ["Notice", "Meaning"],
      rows: [
        ["CP2000", "Underreported income: proposed changes"],
        ["CP14", "Balance due"],
        ["CP501 / CP503", "Balance due reminders"],
        ["CP504", "Notice of intent to levy"],
        ["Letter 5071C", "Verify your identity"],
      ],
    },
    keyPoint: "IRS starts by mail. CP2000 = proposed changes from info mismatch (not a bill; respond by date). CP14 balance due → CP501/503 reminders → CP504 intent to levy. 5071C = verify identity. Gift cards/texts = scam.",
  },
  {
    title: "Extra filings that ride along",
    alt: "A Form 1040 towing a train of schedules: B, D, SE, H, and Forms 8962, 8889, 8606.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#dff1fb" />
        <path d="M10,140 H310" stroke="#8a5a3c" strokeWidth={4} />
        <Doc x={40} y={100} scale={0.8} label="1040" />
        {["Sch B", "Sch D", "Sch SE", "8962", "8889"].map((t, i) => (
          <g key={t}>
            <path d={`M${66 + i * 52},104 h10`} stroke={INK} strokeWidth={3} />
            <Doc x={98 + i * 52} y={104} scale={0.62} label={t} band={["#1d7a49", "#e0a920", "#a8321f", "#5aa9e6", "#b98ae0"][i]} />
            <Label x={98 + i * 52} y={154} size={11}>
              {t}
            </Label>
          </g>
        ))}
        <Label x={160} y={174} size={11} weight={700}>
          Interest or dividends over $1,500 → Schedule B
        </Label>
        <Label x={40} y={154} size={11}>
          1040
        </Label>
      </svg>
    ),
    body: [
      "Some items need their own form or schedule. Schedule B for taxable interest or ordinary dividends over $1,500, or any foreign account. Form 8949 and Schedule D for sales of capital assets. Schedule SE for self-employment tax. Schedule H for household employees. Form 8962 when advance premium tax credit was paid. Form 8889 for HSA activity. Form 8606 for nondeductible IRA contributions and Roth conversions. Form 5329 for additional tax on retirement accounts.",
    ],
    keyPoint: "Sch B (interest or ordinary dividends > $1,500, or foreign accounts); 8949/Sch D (sales); Sch SE (SE ≥ $400); Sch H (household employee); 8962 (APTC); 8889 (HSA); 8606 (nondeductible IRA); 5329 (extra retirement taxes).",
  },
  {
    title: "Keep the receipts: how long",
    alt: "Three filing boxes labeled 3 years, 6 years and 7 years, and a vault labeled forever.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        {[
          [46, "3 yrs", "Usually", "#e3f4ea"],
          [122, "6 yrs", "Big omission", "#fbf0d9"],
          [198, "7 yrs", "Bad debt", "#fbe5e1"],
        ].map(([x, t, s, c]) => (
          <g key={t as string}>
            <rect x={(x as number) - 34} y={50} width={68} height={60} fill={c as string} stroke={INK} strokeWidth={2.5} />
            <Label x={x as number} y={86} size={16}>
              {t}
            </Label>
            <Label x={x as number} y={128} size={10} weight={700}>
              {s}
            </Label>
          </g>
        ))}
        <rect x={250} y={44} width={60} height={70} rx={8} fill="#9aa4b2" stroke={INK} strokeWidth={2.5} />
        <circle cx={280} cy={79} r={14} fill="#d7dbe2" stroke={INK} strokeWidth={2} />
        <Label x={280} y={128} size={10} weight={700}>
          Forever
        </Label>
        <Label x={160} y={164} size={11} weight={700}>
          No return or fraud: forever · Payroll records: 4 years
        </Label>
      </svg>
    ),
    body: [
      "Keep records that support a return for three years from when you filed it (or two years from when you paid the tax, if later). Keep them six years if you left out income of more than 25% of the gross income shown on the return, and seven years if you claim a loss from worthless securities or a bad debt.",
      "If no return was filed or a return was fraudulent, there's no time limit. Employers keep employment tax records at least four years. Keep property records until the limitation period runs out for the year you sell the property.",
    ],
    keyPoint: "Record retention: 3 yrs (or 2 yrs after paying, if later); 6 yrs if income left out > 25% of gross; 7 yrs for worthless securities/bad debt; no return or fraud = indefinitely; employment tax 4 yrs.",
  },
];

const lesson: Lesson = {
  id: "p1-paper-trail",
  part: "part1",
  domainId: "p1d1",
  number: "1.4",
  episode: "You've Got Mail (and So Does Hoot)",
  title: "The taxpayer's paper trail",
  minutes: 14,
  lawAsOf: "tax year 2025 (law through December 31, 2025)",
  intro: "Every number on a return comes from a piece of paper, and the IRS usually has a copy. Learn the forms, what the letters mean, and how long to keep it all.",
  comic,
  cards,
  hook: {
    line: "If a form was mailed to you, a copy was mailed to Hoot.",
    more: "And if no form was mailed to you, it's still income. Hoot is patient.",
    alt: "Two identical envelopes: one goes to Penny's mailbox, one to Hoot's desk.",
    art: (
      <svg viewBox="0 0 320 120">
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Envelope x={70} y={56} />
        <Envelope x={250} y={56} irs />
        <Arrow d="M110,56 H200" width={3} />
        <Label x={155} y={44} size={11}>
          same copy
        </Label>
        <Label x={70} y={100} size={12}>
          Penny
        </Label>
        <Label x={250} y={100} size={12}>
          Hoot
        </Label>
      </svg>
    ),
  },
  traps: [
    {
      title: "Treating a CP2000 as a bill",
      text: "A CP2000 proposes changes. The taxpayer can agree, partly agree or disagree with documentation by the response date.",
    },
    {
      title: "No 1099, no income",
      text: "Income is taxable whether or not an information return was issued. The exam likes cash jobs and barter.",
    },
    {
      title: "Schedule B at exactly $1,500",
      text: "Schedule B is required when taxable interest or ordinary dividends are over $1,500, or there's a foreign account. $1,500 exactly doesn't trigger it on its own.",
    },
    {
      title: "Three years for everything",
      text: "Three years is the general rule, not the only one: six years for big omissions, seven for worthless securities and bad debts, and forever for no return or fraud.",
    },
  ],
  sources: [
    { key: "p17", section: "Chapter 1, Filing Information: What Records Should I Keep?; Part Two, Income" },
    { key: "f1099k", section: "Reporting thresholds for 2025; personal items sold at a loss" },
    { key: "notices", section: "Understanding your IRS notice or letter" },
    { key: "cp2000", section: "What the CP2000 means and how to respond" },
    { key: "i1040sb", section: "Who must file Schedule B" },
    { key: "records", section: "Period of limitations that apply to income tax returns" },
  ],
  quizTopics: [],
  game: {
    title: "Hoot's Mailbag",
    setup: "Hoot dumps a sack of mail on the table, and each letter is a puzzle. Answer as Ace. Right answers earn EA stamps; misses go in Hoot's notebook.",
    rounds: [
      {
        who: "Penny",
        prompt: "I earned $900 cash pet-sitting in 2025 and nobody sent me a 1099. What do I do with it?",
        answer: "Report it as self-employment income; with $400 or more of net earnings, she also owes self-employment tax",
        wrong: [
          ["Nothing, because no information return was issued", "Income is taxable with or without a form."],
          ["Report it only if it's over $600", "$600 is a reporting threshold for payers on some 1099s, not a threshold for taxable income."],
          ["Report it as a gift", "Payment for services is income, not a gift."],
        ],
        rule: "All income is taxable unless excluded, form or no form. Net self-employment earnings of $400 or more also bring SE tax.",
      },
      {
        who: "Hoot",
        prompt: "Hoo. I sent Penny a CP2000. What is it?",
        answer: "A proposal to change her return because income reported to the IRS doesn't match it",
        wrong: [
          ["A bill that must be paid within 10 days", "It proposes changes. She can agree or disagree by the response date."],
          ["A notice that her return was selected for a field audit", "A CP2000 comes from automated matching, not a field examination."],
          ["A final notice of intent to levy", "That's a later collection notice, like a CP504 or Letter 1058."],
        ],
        rule: "CP2000: underreported income proposal from information matching. Respond by the date, agreeing or disagreeing with documents.",
      },
      {
        who: "Milo",
        prompt: "Penny earned $1,700 of interest on her savings in 2025. Does she need Schedule B?",
        answer: "Yes, because taxable interest is over $1,500",
        wrong: [
          ["No, interest goes straight onto Form 1040 at any amount", "Over $1,500 of taxable interest requires Schedule B."],
          ["Only if the interest came from a foreign bank", "A foreign account also triggers Schedule B, but $1,700 of interest does on its own."],
          ["Only if she also has dividends", "Interest and dividends each have their own $1,500 test."],
        ],
        rule: "Schedule B is required for taxable interest or ordinary dividends over $1,500, or for foreign accounts.",
      },
      {
        who: "Penny",
        prompt: "I sold my old couch on a marketplace app for $300. I paid $1,200 for it. The app sent me a 1099-K. Do I owe tax on the $300?",
        answer: "No. Personal items sold for less than they cost aren't income, and the loss isn't deductible",
        wrong: [
          ["Yes, the 1099-K amount is taxable income", "The form reports gross receipts. A personal item sold at a loss produces no income."],
          ["No, and she can deduct the $900 loss", "Losses on personal-use property aren't deductible."],
          ["Yes, unless the amount is under $600", "There's no gain to tax, whatever the amount."],
        ],
        rule: "A 1099-K shows gross payments. Selling personal items at a loss is not income, and the loss isn't deductible.",
      },
      {
        who: "Ace",
        prompt: "Penny left out income equal to 30% of the gross income on her return. How long should she keep the records for that year?",
        answer: "6 years",
        wrong: [
          ["3 years", "Three years is the general rule. Omitting more than 25% of gross income extends it to six."],
          ["7 years", "Seven years is for worthless securities and bad debts."],
          ["4 years", "Four years is for employment tax records."],
        ],
        rule: "Leaving out income of more than 25% of the gross income shown on the return extends the period to six years.",
      },
      {
        who: "Biscuit",
        prompt: "Woof! A text says it's from the IRS and wants $500 in gift cards today. What should Penny do?",
        answer: "Ignore it. The IRS starts contact by mail and never demands gift cards",
        wrong: [
          ["Pay it to avoid penalties", "The IRS doesn't take gift cards or start contact by text. It's a scam."],
          ["Reply with her SSN to confirm her identity", "Never send personal details in reply to an unexpected text."],
          ["Pay half and dispute the rest", "There's nothing to pay. The IRS didn't send it."],
        ],
        rule: "The IRS first contacts taxpayers by mail and never demands immediate payment by gift card, wire or crypto.",
      },
    ],
  },
  stinger: {
    alt: "Hoot at his desk opens a thank-you card from Penny with a drawing of Biscuit. He smiles.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eaf6ef" />
        <rect x={120} y={150} width={180} height={10} fill="#a8774f" stroke={INK} strokeWidth={2} />
        <Hoot x={220} y={118} scale={0.66} mood="happy" />
        <g transform="translate(110 110) rotate(-6)">
          <rect x={-40} y={-28} width={80} height={56} rx={3} fill="#fff" stroke={INK} strokeWidth={2} />
          <Label x={0} y={-8} size={10}>
            THANK YOU
          </Label>
          <Label x={0} y={6} size={9}>
            FOR NOT
          </Label>
          <Label x={0} y={20} size={9}>
            BEING A SCAM
          </Label>
        </g>
        <MailPile x={280} y={176} scale={0.6} />
        <Stamp x={60} y={186} text="RECEIVED" w={84} />
      </svg>
    ),
    bubbles: [{ who: "Hoot", text: "Hoo… nobody ever sends me cards.", x: 52, y: 4, w: 44, tail: "down-right" }],
  },
  deck: {
    topic: "Tax documents for individuals: information returns, adjustments, payments, IRS notices and record retention",
    rules:
      "which information return reports which income (W-2, 1099 series, 1099-K 2025 thresholds, W-2G, K-1), income that is taxable without a form, adjustments to income and their documents, withholding and estimated payments, IRS notices (CP2000, CP14, CP504, Letter 5071C) and scams, extra schedules and forms, and how long to keep records",
  },
};

export default lesson;

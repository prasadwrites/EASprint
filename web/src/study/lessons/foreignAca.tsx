import { Ace, Arrow, Backdrop, Hoot, Label, Milo, Penny, Window } from "../cast";
import type { Lesson } from "../lesson";
import { Bank, CalendarPage, Doc, Globe, HealthCard, Magnifier, Plane, Pop, Sign, Stamp, Star } from "../props";

// Part 1, topic 1.5: foreign accounts and the Affordable Care Act. Foreign account reporting triggers (Schedule B,
// FBAR and Form 8938) and ACA requirements for individuals. Written to tax law through December 31, 2025 from
// the FBAR page, the Instructions for Form 8938, Schedule B and Form 8962, and the premium tax credit page.

const INK = "#17202c";
const PANEL = { viewBox: "0 0 320 220", preserveAspectRatio: "xMidYMax meet" } as const;
const CARD = { viewBox: "0 0 320 180" } as const;

function Suitcase() {
  return (
    <g>
      <rect x={-22} y={-14} width={44} height={30} rx={4} fill="#c8553d" stroke={INK} strokeWidth={2} />
      <path d="M-8,-14 v-6 h16 v6" fill="none" stroke={INK} strokeWidth={2} />
      <circle cx={-10} cy={2} r={4} fill="#f2c230" stroke={INK} strokeWidth={1} />
      <rect x={4} y={-4} width={12} height={8} fill="#fff" stroke={INK} strokeWidth={1} />
    </g>
  );
}

function Pastry({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={12} ry={7} fill="#e0a920" stroke={INK} strokeWidth={1.8} />
      <ellipse cx={0} cy={-2} rx={7} ry={3.5} fill="#f8e08e" />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny steps off a plane with a suitcase and a box of pastries. Ace waits with a coffee.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#dff1fb" floor="#cfd6df" />
        <Plane x={240} y={60} scale={1.1} />
        <Penny x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Suitcase />} />
        <Pastry x={130} y={92} />
        <Ace x={246} y={140} scale={0.7} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I'm back! I opened a bank account abroad so I could buy pastries faster.", x: 2, y: 2, w: 50, tail: "down-left" },
      { who: "Ace", text: "Of course you did.", x: 64, y: 30, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Penny points to two foreign banks. Hoot peers through a magnifying glass at the window.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Bank x={60} y={150} scale={0.7} name="BANCO 1" />
        <Bank x={140} y={150} scale={0.7} name="BANCO 2" color="#f3eefb" />
        <Label x={60} y={196} size={11}>
          Peak $7,000
        </Label>
        <Label x={140} y={196} size={11}>
          Peak $4,000
        </Label>
        <Window x={210} y={70} w={96} h={90} />
        <g clipPath="url(#win15)">
          <defs>
            <clipPath id="win15">
              <rect x={210} y={70} width={96} height={90} />
            </clipPath>
          </defs>
          <Hoot x={258} y={130} scale={0.62} mood="thinking" />
        </g>
        <rect x={210} y={70} width={96} height={90} fill="none" stroke={INK} strokeWidth={3} />
        <Magnifier x={232} y={118} scale={0.8} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Account one peaked at $7,000, account two at $4,000. Each is under $10,000, so I'm fine!", x: 2, y: 2, w: 60, tail: "down-left" },
      { who: "Hoot", text: "Hoo. Add them up.", x: 70, y: 8, w: 28, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points at a sign: 7,000 plus 4,000 equals 11,000, more than 10,000, so file an FBAR. Penny asks if FBAR is a pastry.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Sign x={164} y={100} text="$7K + $4K = $11K > $10K" w={150} />
        <Ace x={64} y={128} scale={0.76} mood="happy" pose="point" />
        <Penny x={262} y={128} scale={0.76} mood="thinking" flip />
        <Pastry x={232} y={170} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Add the highest balance of every foreign account. Over $10,000 at any time? File an FBAR.", x: 2, y: 2, w: 54, tail: "down-left" },
      { who: "Penny", text: "Is an F-bar a pastry?", x: 62, y: 8, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Two mailboxes: one labeled IRS for Form 1040 and Form 8938, one labeled FinCEN for the FBAR. Milo points at the FinCEN one.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#dff1fb" floor="#cde8b8" />
        <g transform="translate(110 128)">
          <path d="M0,0 V60" stroke="#8a5a3c" strokeWidth={7} />
          <rect x={-30} y={-34} width={60} height={34} rx={8} fill="#5aa9e6" stroke={INK} strokeWidth={2.5} />
          <Label x={0} y={-12} size={12} color="#fff">
            IRS
          </Label>
        </g>
        <g transform="translate(220 128)">
          <path d="M0,0 V60" stroke="#8a5a3c" strokeWidth={7} />
          <rect x={-34} y={-34} width={68} height={34} rx={8} fill="#1d7a49" stroke={INK} strokeWidth={2.5} />
          <Label x={0} y={-12} size={12} color="#fff">
            FinCEN
          </Label>
        </g>
        <Doc x={110} y={176} scale={0.36} label="8938" />
        <Doc x={220} y={176} scale={0.36} label="FBAR" band="#1d7a49" />
        <Milo x={290} y={148} scale={0.5} mood="happy" pose="point" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "And the FBAR doesn't go with your 1040. It's filed online with FinCEN, a different agency.", x: 2, y: 2, w: 56, tail: "down-left" },
      { who: "Milo", text: "So it's a side quest.", x: 64, y: 10, w: 32, tail: "down-right" },
    ],
  },
  {
    alt: "Penny waves a Marketplace health insurance card. Ace hands her a Form 1095-A.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={86} y={128} scale={0.78} mood="excited" pose="hold" holding={<HealthCard x={0} y={0} scale={0.6} />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" pose="hold" flip holding={<Doc x={0} y={0} scale={0.5} label="1095-A" band="#1d7a49" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "I also got Marketplace health insurance, with a discount paid in advance!", x: 2, y: 2, w: 48, tail: "down-left" },
      { who: "Ace", text: "Then you'll get a 1095-A, and you must file and settle up on Form 8962. Even with low income.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot holds an empty money bag labeled Federal penalty, looking wistful.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eaf6ef" />
        <Penny x={74} y={128} scale={0.76} mood="thinking" />
        <Hoot x={232} y={120} scale={0.7} mood="worried" />
        <g transform="translate(170 172)">
          <path d="M-18,20 Q-26,-6 -8,-14 h16 Q26,-6 18,20 Z" fill="#e9d9b8" stroke={INK} strokeWidth={2} />
          <Label x={0} y={10} size={11}>
            $0
          </Label>
        </g>
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "And if I skip health insurance, is there still a penalty?", x: 2, y: 2, w: 44, tail: "down-left" },
      { who: "Hoot", text: "The federal penalty has been $0 since 2019. Hoo… I miss it.", x: 50, y: 4, w: 48, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The question on Schedule B",
    alt: "Schedule B Part III with a big Yes box checked: at any time during the year, did you have a financial interest in or signature authority over a foreign account?",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <rect x={30} y={20} width={260} height={140} rx={6} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <rect x={30} y={20} width={260} height={28} rx={6} fill="#1d7a49" stroke={INK} strokeWidth={2.5} />
        <Label x={160} y={39} size={13} color="#fff">
          Schedule B, Part III
        </Label>
        <Label x={160} y={74} size={11.5} weight={700}>
          Financial interest in, or signature authority
        </Label>
        <Label x={160} y={92} size={11.5} weight={700}>
          over, a foreign account?
        </Label>
        <rect x={110} y={108} width={24} height={24} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <path d="M114,120 l6,7 l12,-14" fill="none" stroke="#a8321f" strokeWidth={4} />
        <Label x={152} y={126} size={14} anchor="start">
          Yes
        </Label>
        <Globe x={264} y={124} scale={0.5} />
      </svg>
    ),
    body: [
      "Part III of Schedule B asks whether, at any time during the year, you had a financial interest in or signature authority over a financial account in a foreign country. Answer yes, and file Schedule B, even if the account earned nothing.",
      "A yes answer is the first clue that an FBAR or Form 8938 may be required.",
    ],
    keyPoint: "Schedule B Part III: any financial interest in OR signature authority over a foreign account → check Yes and file Schedule B, even with $0 interest.",
  },
  {
    title: "The FBAR trigger: add them all up",
    alt: "Two jars of money, $7,000 and $4,000, pour into one jar of $11,000 that crosses a line at $10,000.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <rect x={30} y={70} width={50} height={80} rx={6} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <rect x={33} y={100} width={44} height={47} rx={3} fill="#7bc47f" />
        <Label x={55} y={62} size={12}>
          $7,000
        </Label>
        <rect x={100} y={70} width={50} height={80} rx={6} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <rect x={103} y={120} width={44} height={27} rx={3} fill="#7bc47f" />
        <Label x={125} y={62} size={12}>
          $4,000
        </Label>
        <Arrow d="M160,110 H196" width={3} />
        <rect x={210} y={30} width={70} height={120} rx={6} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <rect x={213} y={50} width={64} height={97} rx={3} fill="#7bc47f" />
        <path d="M200,62 H290" stroke="#a8321f" strokeWidth={3} strokeDasharray="6 4" />
        <Label x={245} y={24} size={12}>
          $11,000
        </Label>
        <Label x={204} y={58} size={10} color="#a8321f" anchor="end">
          $10K
        </Label>
        <Label x={160} y={172} size={11}>
          Each account's highest balance, added together
        </Label>
      </svg>
    ),
    body: [
      "A U.S. person (citizens, residents, and U.S. companies, trusts and estates) must file an FBAR if they had a financial interest in, or signature authority over, foreign financial accounts whose aggregate value was more than $10,000 at any time during the year.",
      "Aggregate means adding the maximum value of each account during the year, even if the highs happened on different days. Two accounts that each stayed under $10,000 can still trigger it.",
    ],
    keyPoint: "FBAR trigger: U.S. person + financial interest or signature authority + AGGREGATE of each foreign account's max value > $10,000 at any time in the year.",
  },
  {
    title: "Filing the FBAR: a different mailbox",
    alt: "A laptop sends FinCEN Form 114 to a FinCEN mailbox, with calendar pages April 15 and October 15.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#dff1fb" />
        <rect x={20} y={50} width={90} height={60} rx={4} fill="#2b3550" stroke={INK} strokeWidth={2.5} />
        <rect x={26} y={56} width={78} height={48} fill="#e3f0fb" />
        <Label x={65} y={84} size={11}>
          FinCEN 114
        </Label>
        <path d="M10,112 h110 l-8,8 h-94 Z" fill="#9aa4b2" stroke={INK} strokeWidth={2} />
        <Arrow d="M124,80 H160" width={3} />
        <rect x={166} y={60} width={66} height={36} rx={8} fill="#1d7a49" stroke={INK} strokeWidth={2.5} />
        <Label x={199} y={83} size={12} color="#fff">
          FinCEN
        </Label>
        <CalendarPage x={268} y={56} top="APR" big="15" scale={0.8} />
        <CalendarPage x={268} y={130} top="OCT" big="15" scale={0.8} color="#1d7a49" />
        <Label x={100} y={160} size={11} weight={700}>
          Not attached to the 1040
        </Label>
      </svg>
    ),
    body: [
      "The FBAR is FinCEN Form 114. It's filed electronically through FinCEN's BSA E-Filing System, separately from the income tax return.",
      "It's due April 15 of the following year, with an automatic extension to October 15. No request is needed. Penalties for not filing can be steep, especially for willful violations.",
    ],
    keyPoint: "FBAR = FinCEN Form 114, filed electronically with FinCEN (BSA E-Filing), not with the 1040. Due April 15; automatic extension to October 15.",
  },
  {
    title: "Form 8938: the bigger-number twin",
    alt: "A ladder of thresholds for Form 8938: $50,000 at year end for a single filer in the U.S., up to $600,000 at any time for a married couple abroad.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3eefb" />
        <Doc x={60} y={92} scale={1.3} label="8938" sub="Attach to 1040" />
        {[
          ["Single, U.S.", "$50K / $75K"],
          ["MFJ, U.S.", "$100K / $150K"],
          ["Single, abroad", "$200K / $300K"],
          ["MFJ, abroad", "$400K / $600K"],
        ].map(([w, t], i) => (
          <g key={w}>
            <Label x={130} y={44 + i * 30} size={11} anchor="start" weight={700}>
              {w}
            </Label>
            <Label x={310} y={44 + i * 30} size={11} anchor="end" color="#1d7a49">
              {t}
            </Label>
          </g>
        ))}
        <Label x={220} y={168} size={10} weight={700}>
          (last day of year / any time during year)
        </Label>
      </svg>
    ),
    body: [
      "Form 8938, Statement of Specified Foreign Financial Assets, is attached to the income tax return. It's required only if you must file a return and your foreign financial assets are over the threshold.",
      "For a single filer (or married filing separately) living in the U.S., that's more than $50,000 on the last day of the year or more than $75,000 at any time. Married filing jointly in the U.S.: $100,000 or $150,000. Living abroad, the thresholds are $200,000 or $300,000 for single filers and $400,000 or $600,000 for joint filers.",
    ],
    table: {
      head: ["Taxpayer", "Last day over", "Any time over"],
      rows: [
        ["Single or MFS, in U.S.", "$50,000", "$75,000"],
        ["MFJ, in U.S.", "$100,000", "$150,000"],
        ["Single or MFS, abroad", "$200,000", "$300,000"],
        ["MFJ, abroad", "$400,000", "$600,000"],
      ],
    },
    keyPoint: "Form 8938 (with the 1040): single in U.S. > $50K year-end or > $75K any time; MFJ in U.S. $100K/$150K; abroad $200K/$300K single, $400K/$600K MFJ.",
  },
  {
    title: "FBAR or 8938? Often both",
    alt: "A Venn diagram: FBAR on the left, Form 8938 on the right, foreign bank accounts in the overlap.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <circle cx={120} cy={90} r={66} fill="rgba(29,122,73,0.18)" stroke={INK} strokeWidth={2.5} />
        <circle cx={200} cy={90} r={66} fill="rgba(90,169,230,0.25)" stroke={INK} strokeWidth={2.5} />
        <Label x={88} y={70} size={13}>
          FBAR
        </Label>
        <Label x={86} y={92} size={10} weight={700}>
          signature
        </Label>
        <Label x={86} y={106} size={10} weight={700}>
          authority
        </Label>
        <Label x={232} y={70} size={13}>
          8938
        </Label>
        <Label x={234} y={92} size={10} weight={700}>
          foreign stock,
        </Label>
        <Label x={234} y={106} size={10} weight={700}>
          partnerships
        </Label>
        <Label x={160} y={88} size={10}>
          Bank
        </Label>
        <Label x={160} y={102} size={10}>
          accounts
        </Label>
        <Label x={160} y={172} size={11} weight={700}>
          Filing one doesn't excuse the other
        </Label>
      </svg>
    ),
    body: [
      "The two filings overlap but aren't the same. The FBAR goes to FinCEN, starts at $10,000 in aggregate and covers accounts you only have signature authority over. Form 8938 goes to the IRS with the return, starts at $50,000 or more, and also covers assets held directly, like foreign stock or an interest in a foreign partnership.",
      "If both thresholds are met, file both.",
    ],
    table: {
      head: ["", "FBAR (FinCEN 114)", "Form 8938"],
      rows: [
        ["Filed with", "FinCEN, online", "IRS, with the 1040"],
        ["Threshold", "> $10,000 aggregate", "$50,000+ (varies)"],
        ["Signature authority only", "Yes, counts", "No"],
        ["Due", "April 15 (auto Oct 15)", "With the return"],
      ],
    },
    keyPoint: "FBAR vs 8938: FinCEN vs IRS; $10K aggregate vs $50K+; FBAR counts signature-only accounts, 8938 doesn't; 8938 also covers directly held foreign stock/partnership interests. Can owe both.",
  },
  {
    title: "ACA for individuals: the $0 penalty and the forms",
    alt: "A balloon labeled shared responsibility payment has deflated to $0. Three forms: 1095-A, 1095-B and 1095-C.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eaf6ef" />
        <path d="M60,40 q30,-20 50,10 q10,30 -20,40 q-30,4 -36,-24 Z" fill="#e8505b" stroke={INK} strokeWidth={2.5} opacity={0.5} />
        <path d="M84,90 q4,30 -10,60" stroke={INK} strokeWidth={2} fill="none" />
        <Label x={84} y={64} size={16} color="#fff">
          $0
        </Label>
        <Label x={84} y={164} size={11}>
          Federal mandate penalty
        </Label>
        <Doc x={180} y={84} scale={0.7} label="1095-A" band="#1d7a49" sub="Needed" />
        <Doc x={232} y={84} scale={0.7} label="1095-B" band="#9aa4b2" sub="FYI" />
        <Doc x={284} y={84} scale={0.7} label="1095-C" band="#9aa4b2" sub="FYI" />
        <Label x={226} y={150} size={10.5} weight={700}>
          Only the 1095-A is needed
        </Label>
      </svg>
    ),
    body: [
      "The federal individual shared responsibility payment for not having health coverage has been $0 since 2019, so there's nothing to report or pay on the federal return. Some states have their own coverage requirements.",
      "Form 1095-A comes from the Marketplace and is needed to figure the premium tax credit. Forms 1095-B and 1095-C (from insurers and large employers) are for your records; you don't need them to file.",
    ],
    keyPoint: "Federal no-coverage penalty = $0 since 2019 (some states have their own). 1095-A (Marketplace) needed for Form 8962; 1095-B/1095-C are informational.",
  },
  {
    title: "The premium tax credit: who gets it",
    alt: "A Marketplace health card with a discount tag. Checkmarks for Marketplace coverage, income, not eligible for other coverage, not a dependent, file jointly if married.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <HealthCard x={70} y={70} scale={1.3} />
        <Star x={112} y={36} />
        {["Marketplace plan", "Income ≥ 100% poverty line", "No affordable other plan", "Not a dependent", "Married? File jointly"].map((t, i) => (
          <Label key={t} x={142} y={36 + i * 26} size={11} anchor="start" color="#1d7a49">
            {`✓ ${t}`}
          </Label>
        ))}
      </svg>
    ),
    body: [
      "The premium tax credit helps pay for health insurance bought through the Marketplace. To qualify, household income must be at least 100% of the federal poverty line (for 2025 there's no upper income limit), the person can't be eligible for affordable employer coverage or government coverage like Medicare or Medicaid, can't be claimed as someone's dependent, and, if married, generally must file jointly.",
      "The credit can be paid in advance to the insurer each month (advance payments, or APTC) or claimed on the return.",
    ],
    keyPoint: "PTC: Marketplace coverage; household income ≥ 100% FPL (no upper limit for 2025); not eligible for affordable employer/government coverage; not a dependent; married → generally MFJ.",
  },
  {
    title: "Settle up on Form 8962",
    alt: "A seesaw: advance payments on one side, actual credit on the other. Too much advance means paying some back; too little means a bigger refund.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <path d="M160,130 L146,156 L174,156 Z" fill="#8a5a3c" stroke={INK} strokeWidth={2} />
        <path d="M40,108 L280,140" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <Doc x={70} y={84} scale={0.55} label="APTC" band="#5aa9e6" />
        <Doc x={250} y={112} scale={0.55} label="8962" band="#1d7a49" />
        <Label x={70} y={58} size={12}>
          Paid in advance
        </Label>
        <Label x={250} y={86} size={12}>
          Actual credit
        </Label>
        <Label x={160} y={176} size={11} weight={700}>
          Too much advance → repay. Too little → refund.
        </Label>
        <Stamp x={160} y={24} text="MUST FILE" color="#a8321f" w={100} />
      </svg>
    ),
    body: [
      "If advance payments were made for anyone in the household, the taxpayer must file a return and attach Form 8962, even if their income is below the filing threshold. The form compares the advance payments with the credit actually allowed for the year's income.",
      "Got more in advance than allowed? The excess is added to tax, though for 2025 the amount paid back may be capped based on income (the caps end starting in 2026). Got less? The difference is a refundable credit. Married filing separately generally can't claim the credit, except for victims of domestic abuse or spousal abandonment. Not reconciling can stop future advance payments.",
    ],
    keyPoint: "APTC paid → MUST file + Form 8962, any income. Excess APTC repaid (2025 repayment caps by income; caps end in 2026). Shortfall → refundable credit. MFS generally ineligible (abuse/abandonment exception).",
  },
];

const lesson: Lesson = {
  id: "p1-foreign-aca",
  part: "part1",
  domainId: "p1d1",
  number: "1.5",
  episode: "The Account Across the Ocean",
  title: "Foreign accounts and ACA",
  minutes: 13,
  lawAsOf: "tax year 2025 (law through December 31, 2025)",
  intro: "Two things that live outside the 1040 but can still sink it: foreign accounts that need reporting, and Marketplace health insurance that needs settling up.",
  comic,
  cards,
  hook: {
    line: "Ten grand, all accounts, any day: FBAR. And it goes to FinCEN, not Hoot.",
    more: "Got a 1095-A? Form 8962 rides along, whatever your income.",
    alt: "Two piggy banks, $7,000 and $4,000, tied together with a ribbon labeled $11,000. An arrow points to a mailbox labeled FinCEN.",
    art: (
      <svg viewBox="0 0 320 120">
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Bank x={60} y={70} scale={0.6} name="$7K" />
        <Bank x={130} y={70} scale={0.6} name="$4K" color="#f3eefb" />
        <Arrow d="M170,64 H220" width={3} />
        <rect x={230} y={46} width={70} height={34} rx={8} fill="#1d7a49" stroke={INK} strokeWidth={2.5} />
        <Label x={265} y={68} size={12} color="#fff">
          FinCEN
        </Label>
        <Label x={95} y={110} size={12}>
          = $11,000
        </Label>
      </svg>
    ),
  },
  traps: [
    {
      title: "Each account under $10,000",
      text: "The FBAR test adds the maximum values of all foreign accounts. Two accounts of $6,000 each are $12,000: file.",
    },
    {
      title: "Attaching the FBAR to the return",
      text: "The FBAR is filed electronically with FinCEN, not with Form 1040. Form 8938 is the one that's attached.",
    },
    {
      title: "Signature authority with no money of your own",
      text: "Signature authority over someone else's foreign account (like an employer's) can still require an FBAR and a Yes on Schedule B. Form 8938 doesn't count signature-only accounts.",
    },
    {
      title: "“My income is too low to file”",
      text: "Not if advance premium tax credit was paid. Form 8962 has to be filed whatever the income.",
    },
  ],
  sources: [
    { key: "fbar", section: "Who must file; aggregate value over $10,000; due date and automatic extension" },
    { key: "i8938", section: "Who Must File; specified foreign financial assets thresholds" },
    { key: "i1040sb", section: "Part III, Foreign Accounts and Trusts" },
    { key: "ptc", section: "Eligibility; reconciling advance payments" },
    { key: "i8962", section: "Who must file; Table 5, Repayment Limitation; married filing separately" },
  ],
  quizTopics: ["Foreign account reporting"],
  game: {
    title: "Passport Control",
    setup: "Hoot has set up a checkpoint at the Ledger Falls airport, and every traveler has a reporting question. Answer as Ace. Right answers earn EA stamps; misses go in Hoot's notebook.",
    rounds: [
      {
        who: "Penny",
        prompt: "I had two foreign accounts in 2025. One peaked at $7,000 in March, the other at $4,000 in October. Never more than $7,000 in one place. Do I file an FBAR?",
        answer: "Yes. The maximum values add up to $11,000, over $10,000",
        wrong: [
          ["No, because neither account was over $10,000", "The test is aggregate: add each account's maximum value."],
          ["No, because the highs were in different months", "It doesn't matter when each account peaked. Add the maximums."],
          ["Only if the accounts earned interest", "Income doesn't matter. Value does."],
        ],
        rule: "FBAR: file when the aggregate of each foreign account's maximum value is over $10,000 at any time during the year.",
      },
      {
        who: "Milo",
        prompt: "Where does Penny send her FBAR?",
        answer: "Electronically to FinCEN through the BSA E-Filing System",
        wrong: [
          ["Attached to her Form 1040", "Form 8938 is attached to the return. The FBAR goes to FinCEN separately."],
          ["Mailed to the IRS service center with a paper return", "The FBAR is filed electronically with FinCEN, not mailed to the IRS."],
          ["To the foreign bank, which forwards it", "The U.S. person files it themselves with FinCEN."],
        ],
        rule: "The FBAR is FinCEN Form 114, filed electronically through FinCEN's BSA E-Filing System.",
      },
      {
        who: "Hoot",
        prompt: "Hoo. When is the FBAR for 2025 due?",
        answer: "April 15, 2026, with an automatic extension to October 15, 2026",
        wrong: [
          ["June 30, 2026, with no extension", "That was the old deadline. It now matches the April 15 tax deadline."],
          ["April 15, 2026, extended only by filing Form 4868", "The FBAR extension to October 15 is automatic; Form 4868 is for the income tax return."],
          ["With the 2025 income tax return, whenever it's filed", "The FBAR has its own due date and is filed separately."],
        ],
        rule: "The FBAR is due April 15 with an automatic extension to October 15. No request needed.",
      },
      {
        who: "Penny",
        prompt: "Suppose I'm single, living in the U.S., and my foreign financial assets were worth $60,000 all year. Do I need Form 8938 (as long as I file a return)?",
        answer: "Yes. The value was over $50,000 on the last day of the year",
        wrong: [
          ["No, because it never went over $75,000", "$75,000 is the any-time test. Over $50,000 on the last day also triggers it."],
          ["No, because she files an FBAR instead", "Filing an FBAR doesn't replace Form 8938. She may owe both."],
          ["Only if she lives abroad", "Living abroad raises the thresholds. In the U.S. they're $50,000 / $75,000 for single filers."],
        ],
        rule: "Form 8938 for a single filer in the U.S.: more than $50,000 on the last day of the year or more than $75,000 at any time.",
      },
      {
        who: "Ace",
        prompt: "Penny's income is under the filing threshold, but advance premium tax credit was paid for her Marketplace plan. Does she have to file?",
        answer: "Yes, and she must attach Form 8962 to reconcile the advance payments",
        wrong: [
          ["No, because her income is below the threshold", "Advance PTC creates a filing requirement whatever the income."],
          ["Only if she owes some of it back", "She must file to reconcile either way. She might even get more credit."],
          ["No, the Marketplace reconciles it for her", "Reconciling happens on her return, on Form 8962."],
        ],
        rule: "Anyone in a household that received advance premium tax credit must file and attach Form 8962.",
      },
      {
        who: "Biscuit",
        prompt: "Woof. Penny had no health insurance at all for 2025. How much is the federal penalty?",
        answer: "$0. The federal shared responsibility payment has been zero since 2019",
        wrong: [
          ["$695", "That was the old flat amount, before the payment was reduced to $0 starting in 2019."],
          ["2.5% of household income", "That was the old percentage method, also reduced to $0 starting in 2019."],
          ["It depends on her state of residence", "Some states have their own penalties, but the federal one is $0."],
        ],
        rule: "The federal individual shared responsibility payment is $0 for 2019 and later. Some states impose their own.",
      },
    ],
  },
  stinger: {
    alt: "Hoot at a passport desk stamps Penny's pastry box. Penny looks offended.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef0f4" floor="#cfd6df" />
        <rect x={170} y={140} width={140} height={54} fill="#9aa4b2" stroke={INK} strokeWidth={2.5} />
        <Hoot x={240} y={108} scale={0.6} mood="stern" />
        <Penny x={82} y={128} scale={0.76} mood="shocked" pose="hold" holding={<Pastry x={0} y={0} />} />
        <Stamp x={150} y={88} text="DECLARED" color="#1d7a49" rotate={-12} w={92} />
        <Pop x={140} y={60} kind="bang" />
      </svg>
    ),
    bubbles: [{ who: "Hoot", text: "Hoo. Pastries under $10,000. You may proceed.", x: 50, y: 2, w: 48, tail: "down-right" }],
  },
  deck: {
    topic: "Foreign account reporting (Schedule B, FBAR, Form 8938) and Affordable Care Act rules for individuals",
    rules:
      "the Schedule B Part III foreign account question, the FBAR $10,000 aggregate test, signature authority, FinCEN filing and due dates, Form 8938 thresholds, how FBAR and Form 8938 differ, the $0 federal shared responsibility payment, Forms 1095-A/B/C, premium tax credit eligibility, and reconciling advance payments on Form 8962",
  },
};

export default lesson;

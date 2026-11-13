import { Ace, Arrow, Backdrop, Biscuit, Hoot, Label, Milo, Penny, VideoCall, Window } from "../cast";
import type { Lesson } from "../lesson";
import { Bank, Card, CARD, Envelope, Globe, HOOK, Mark, PANEL, Paper, Step, Tick } from "../props";

// Part 1, topic 1.5: foreign account reporting and the Affordable Care Act. Written to the rules for tax
// year 2025 from the IRS FBAR page and the Form 8938 and Form 8962 instructions.

const INK = "#17202c";

function Pen({ x, y, rotate = 30 }: { x: number; y: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect x={-4} y={-30} width={8} height={40} rx={2} fill="#3f7cc4" stroke={INK} strokeWidth={2} />
      <path d="M-4,10 L0,20 L4,10 Z" fill="#f4f1e8" stroke={INK} strokeWidth={1.5} />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Penny and Milo crowd around a tablet. Dee, on the rig, has one bar of signal.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={60} y={130} scale={0.72} mood="excited" />
        <Milo x={126} y={132} scale={0.7} mood="thinking" />
        <VideoCall x={188} y={98} scale={0.9} mood="excited" pose="wave" bars={1} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Dee? You're breaking up! Say that again!", x: 3, y: 4, w: 40, tail: "down-left" },
      { who: "Dee", text: "Can you hear me now? I opened a bank account in Norway! $14,000 in it!", x: 47, y: 2, w: 50, tail: "down-right" },
    ],
  },
  {
    alt: "Ace holds up a form labeled FinCEN 114. Dee on the tablet looks puzzled.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={86} y={128} scale={0.78} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="FBAR" sub="FinCEN 114" />} />
        <VideoCall x={182} y={98} scale={0.9} mood="thinking" bars={2} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Dee, over $10,000 in foreign accounts means an FBAR. It goes to FinCEN, not with your 1040.", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Dee", text: "FIN-WHAT? Can you hear ME now?", x: 60, y: 8, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Penny proudly signs a bank card. Hoot pops up at the window pointing at her.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Window x={200} y={86} w={96} h={84} />
        <Hoot x={248} y={140} scale={0.6} mood="smug" pose="point" />
        <rect x={200} y={86} width={96} height={84} fill="none" stroke={INK} strokeWidth={3} />
        <Penny x={90} y={128} scale={0.78} mood="happy" pose="hold" holding={<Pen x={0} y={-10} />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Not my problem! Dee just made me a signer so I can pay Lulu's bills.", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Hoot", text: "Hoo-hoo! Signature authority counts, Penny Pocket. You file an FBAR too.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Milo, worried, asks Ace a question. Ace holds up a sign reading $100,000.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="worried" pose="shrug" />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Card x={-28} y={-20} w={56} h={30} lines={["8938"]} size={13} color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "Ace, do Penny and I need that Form 8938 thing too?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Not at $14,000, Milo. For a couple living here, it starts over $100,000.", x: 52, y: 4, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Penny holds a letter marked 1095-A from the health insurance marketplace. Ace points to a Form 8962.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={86} y={128} scale={0.78} mood="thinking" pose="hold" holding={<Envelope x={0} y={-8} label="1095-A" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="8962" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace, my marketplace health plan sent a 1095-A. Can I just toss it?", x: 3, y: 3, w: 46, tail: "down-left" },
      { who: "Ace", text: "No, Penny! You got advance credit, so Form 8962 settles it up.", x: 53, y: 6, w: 44, tail: "down-right" },
    ],
  },
  {
    alt: "Milo, holding Biscuit's leash, asks Hoot about the penalty. Hoot looks wistful, holding an empty clipboard.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="thinking" pose="point" />
        <Biscuit x={150} y={188} scale={0.34} mood="happy" />
        <Hoot x={244} y={126} scale={0.7} mood="worried" clipboard />
        <Mark x={290} y={86} text="$0" color="#1d7a49" size={22} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "And Hoot, what's the penalty for having NO health insurance?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Hoot", text: "Zero dollars, Milo Marsh. Since 2019. I miss it terribly.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The FBAR trigger: $10,000, all added up",
    alt: "Two foreign bank buildings with top balances of $6,000 and $5,500 stacked on a scale that tips past a $10,000 line.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Bank x={64} y={92} label="NORWAY" scale={0.9} />
        <Bank x={64} y={168} label="UK" scale={0.9} color="#f4e2c8" />
        <rect x={150} y={96} width={40} height={64} fill="#9fd8a8" stroke={INK} strokeWidth={2} />
        <rect x={150} y={42} width={40} height={54} fill="#5aa9e6" stroke={INK} strokeWidth={2} />
        <Label x={170} y={132} size={10}>
          $6,000
        </Label>
        <Label x={170} y={74} size={10}>
          $5,500
        </Label>
        <path d="M136,62 h70" stroke="#a8321f" strokeWidth={3} strokeDasharray="6 4" />
        <Label x={212} y={58} size={11} color="#a8321f" anchor="start">
          $10,000 line
        </Label>
        <Label x={212} y={100} size={12} anchor="start">
          Total $11,500
        </Label>
        <Label x={212} y={118} size={12} color="#a8321f" anchor="start">
          → FBAR
        </Label>
        <Arrow d="M110,60 H140" />
        <Arrow d="M110,130 H140" />
      </svg>
    ),
    body: [
      "A U.S. person (citizen, resident or domestic entity) files an FBAR when they have a financial interest in, or signature authority over, foreign financial accounts whose combined highest values were more than $10,000 at any time during the year.",
      "The test adds the maximum value of every account. Two accounts that each stayed under $10,000 can still trigger it together.",
    ],
    keyPoint: "FBAR: U.S. person with financial interest in or signature authority over foreign accounts whose combined maximum values exceeded $10,000 at any time in the year.",
  },
  {
    title: "FBAR: a different track, a different office",
    alt: "Two railway tracks. The 1040 train heads to the IRS. A separate FBAR train heads to FinCEN, with dates April 15 and October 15.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <path d="M10,64 H230 M10,134 H230" stroke={INK} strokeWidth={3} />
        <rect x={40} y={34} width={70} height={30} rx={5} fill="#e8505b" stroke={INK} strokeWidth={2} />
        <Label x={75} y={54} size={12} color="#fff">
          1040
        </Label>
        <rect x={40} y={104} width={70} height={30} rx={5} fill="#3f7cc4" stroke={INK} strokeWidth={2} />
        <Label x={75} y={124} size={12} color="#fff">
          FBAR
        </Label>
        <Card x={234} y={40} w={76} h={30} lines={["IRS"]} size={13} color="#d8f0e2" />
        <Card x={234} y={110} w={76} h={30} lines={["FinCEN"]} size={13} color="#d4ebfa" />
        <Label x={150} y={160} size={11}>
          Due April 15, automatic extension to October 15
        </Label>
        <Label x={150} y={92} size={10} weight={700}>
          Schedule B, Part III asks about foreign accounts
        </Label>
      </svg>
    ),
    body: [
      "The FBAR is FinCEN Form 114. It's filed electronically through FinCEN's BSA E-Filing System, separately from the tax return, never attached to it.",
      "For 2025 accounts it's due April 15, 2026, with an automatic extension to October 15, 2026; no request is needed. On the tax return, Schedule B, Part III asks whether the taxpayer had a foreign account.",
    ],
    keyPoint: "FBAR = FinCEN Form 114, e-filed with FinCEN (not with the 1040). Due April 15, automatic extension to October 15. Schedule B Part III asks about foreign accounts.",
  },
  {
    title: "Signature authority counts",
    alt: "Penny signs her name on a card for Dee's Norwegian bank. A thought bubble shows the FBAR form with her name.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={160} />
        <Penny x={70} y={90} scale={0.6} mood="shocked" pose="hold" holding={<Pen x={0} y={-6} />} />
        <Bank x={196} y={150} label="NORWAY" scale={1.1} />
        <Paper x={272} y={60} label="FBAR" sub="Penny too" scale={1.2} />
        <Globe x={140} y={38} r={14} />
      </svg>
    ),
    body: [
      "Signature authority is the power to control an account by direct communication with the bank, like being a signer. It triggers an FBAR even if none of the money belongs to the signer.",
      "Penny can sign on Dee's $14,000 Norwegian account to pay Lulu's bills, so Penny files an FBAR for it, and so does Dee as the owner.",
    ],
    keyPoint: "Signature authority over a foreign account counts for the FBAR even with no ownership: the signer and the owner both report it.",
  },
  {
    title: "Form 8938: higher lines, attached to the return",
    alt: "Four staircase steps for Form 8938 thresholds: single in the U.S. $50,000, married in the U.S. $100,000, single abroad $200,000, married abroad $400,000.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={10} y={124} w={72} h={44} color="#fde2e4" label="$50K" sub="single, U.S." />
        <Step x={86} y={96} w={72} h={72} color="#fff3c4" label="$100K" sub="joint, U.S." />
        <Step x={162} y={66} w={72} h={102} color="#d4ebfa" label="$200K" sub="single, abroad" />
        <Step x={238} y={34} w={72} h={134} color="#d8f0e2" label="$400K" sub="joint, abroad" />
        <Label x={86} y={36} size={11}>
          on the last day of the year
        </Label>
        <Label x={86} y={52} size={10} weight={700}>
          (higher “any time” lines too)
        </Label>
      </svg>
    ),
    body: [
      "Form 8938 reports specified foreign financial assets, such as foreign bank and brokerage accounts, foreign stock held outside a U.S. account and interests in foreign entities. It's attached to Form 1040 and filed with the IRS.",
      "It's required only above these values. Signature authority alone doesn't count, because the taxpayer must have an interest in the asset.",
    ],
    table: {
      head: ["Taxpayer", "Last day over", "Or any time over"],
      rows: [
        ["Single or MFS, in U.S.", "$50,000", "$75,000"],
        ["MFJ, in U.S.", "$100,000", "$150,000"],
        ["Single or MFS, abroad", "$200,000", "$300,000"],
        ["MFJ, abroad", "$400,000", "$600,000"],
      ],
    },
    keyPoint: "Form 8938 (with the 1040): single/MFS in U.S. > $50K last day or $75K any time; MFJ in U.S. $100K/$150K; abroad single $200K/$300K; abroad MFJ $400K/$600K. Signature authority alone doesn't count.",
  },
  {
    title: "FBAR versus 8938",
    alt: "Two side-by-side report cards comparing the FBAR and Form 8938.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={14} w={140} h={152} color="#d4ebfa">
          <Label x={84} y={38} size={15}>
            FBAR
          </Label>
          <Label x={84} y={64} size={10} weight={700}>
            to FinCEN, separate
          </Label>
          <Label x={84} y={86} size={10} weight={700}>
            over $10,000 total
          </Label>
          <Label x={84} y={108} size={10} weight={700}>
            signature authority: yes
          </Label>
          <Label x={84} y={130} size={10} weight={700}>
            Apr 15 → auto Oct 15
          </Label>
        </Card>
        <Card x={166} y={14} w={140} h={152} color="#fff3c4">
          <Label x={236} y={38} size={15}>
            Form 8938
          </Label>
          <Label x={236} y={64} size={10} weight={700}>
            to IRS, with 1040
          </Label>
          <Label x={236} y={86} size={10} weight={700}>
            from $50,000 up
          </Label>
          <Label x={236} y={108} size={10} weight={700}>
            signature authority: no
          </Label>
          <Label x={236} y={130} size={10} weight={700}>
            due with the return
          </Label>
        </Card>
      </svg>
    ),
    body: [
      "The two forms overlap but don't replace each other. Someone over both lines files both, even when they list the same account.",
      "The FBAR has the lower threshold, counts signature authority and goes to FinCEN on its own. Form 8938 has higher thresholds, counts only assets the taxpayer has an interest in, and rides with the tax return, including its extension.",
    ],
    keyPoint: "FBAR and 8938 don't replace each other: file both when both apply. FBAR: FinCEN, $10K total, signature authority counts. 8938: IRS with 1040, $50K+, interest only.",
  },
  {
    title: "Marketplace coverage means a 1095-A",
    alt: "Three health forms: 1095-A from the Marketplace with a big arrow to Form 8962; 1095-B and 1095-C labeled just for your records.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Paper x={70} y={70} label="1095-A" sub="Marketplace" scale={1.5} color="#fde2e4" />
        <Arrow d="M110,70 H170" color="#a8321f" width={4} />
        <Paper x={210} y={70} label="8962" sub="PTC" scale={1.5} color="#d8f0e2" />
        <Paper x={90} y={148} label="1095-B" scale={0.8} />
        <Paper x={140} y={148} label="1095-C" scale={0.8} />
        <Label x={232} y={152} size={11}>
          just for your records
        </Label>
      </svg>
    ),
    body: [
      "Someone who buys health coverage through a Health Insurance Marketplace gets Form 1095-A, which shows the premiums, the benchmark plan cost and any advance payments of the premium tax credit. It's used to complete Form 8962.",
      "Forms 1095-B (from insurers) and 1095-C (from large employers) are for the taxpayer's records. The return doesn't need them and there's no need to wait for them to file.",
    ],
    keyPoint: "1095-A (Marketplace) feeds Form 8962. 1095-B and 1095-C are records only: don't attach them or wait for them.",
  },
  {
    title: "Form 8962: settle up the premium tax credit",
    alt: "A seesaw balancing advance credit paid during the year against the credit actually earned. Penny stands in the middle.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#eef5f1" floorY={160} />
        <path d="M60,96 L260,124" stroke="#8a5a3c" strokeWidth={8} strokeLinecap="round" />
        <path d="M160,110 L146,160 L174,160 Z" fill="#9aa4b2" stroke={INK} strokeWidth={2} />
        <Card x={20} y={44} w={96} h={40} lines={["Advance PTC", "paid to insurer"]} size={10} color="#fde2e4" />
        <Card x={210} y={72} w={96} h={40} lines={["Actual PTC", "on real income"]} size={10} color="#d8f0e2" />
        <Penny x={160} y={50} scale={0.36} mood="thinking" />
        <Label x={160} y={176} size={10} weight={700}>
          Got too much? Repay. Too little? Claim the rest.
        </Label>
      </svg>
    ),
    body: [
      "Advance payments of the premium tax credit go straight to the insurer during the year, based on estimated income. On the return, Form 8962 figures the credit the taxpayer actually qualifies for and compares the two: extra credit is added to the refund, and excess advance payments are repaid (limits can apply).",
      "Anyone who had advance payments must file a return with Form 8962, even if their income is below the filing requirement. A married couple generally must file jointly to claim the credit.",
    ],
    keyPoint: "Form 8962 reconciles advance PTC with the actual credit: excess is repaid (limits may apply), shortfall is claimed. Advance PTC = must file. Married generally must file jointly.",
  },
  {
    title: "Uninsured? Federal penalty: $0",
    alt: "Hoot holds a penalty stamp reading $0 and looks sad. A small note says some states have their own.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#fdf3e1" floorY={160} />
        <Hoot x={90} y={88} scale={0.56} mood="worried" />
        <g transform="translate(210 84) rotate(-8)">
          <rect x={-56} y={-34} width={112} height={68} rx={8} fill="none" stroke="#1d7a49" strokeWidth={4} />
          <Label x={0} y={14} size={40} color="#1d7a49">
            $0
          </Label>
        </g>
        <Label x={210} y={150} size={11}>
          Some states have their own
        </Label>
        <Tick x={290} y={40} ok s={1.2} />
      </svg>
    ),
    body: [
      "The federal individual shared responsibility payment for not having health coverage was reduced to $0 starting in 2019. There's nothing to figure or report on the federal return for going uninsured.",
      "A few states and the District of Columbia have their own coverage requirements and penalties, which show up on the state return, not the federal one.",
    ],
    keyPoint: "Federal penalty for no health coverage: $0 since 2019. Some states have their own mandates (state return only).",
  },
];

const lesson: Lesson = {
  id: "p1-foreign-aca",
  part: "part1",
  domainId: "p1d1",
  number: "1.5",
  episode: "Can You Hear Me Now?",
  title: "Foreign accounts and ACA",
  minutes: 13,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "Two kinds of extra reporting the exam loves: money held in other countries, and health coverage bought through the Marketplace.",
  previously: "The mailbox is finally empty. Then Dee calls from the rig, with one bar of signal and big news about a bank account.",
  comic,
  cards,
  hook: {
    line: "Ten grand, all added up, even if you just sign.",
    more: "That's the FBAR. Form 8938 starts much higher and rides with the return. And a 1095-A always means Form 8962.",
    alt: "A big 10K made of stacked coins with a pen leaning on it.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <Label x={110} y={78} size={52} color="#3f7cc4">
          $10K
        </Label>
        <Pen x={196} y={66} rotate={24} />
        <Label x={110} y={106} size={12}>
          all accounts, added up
        </Label>
        <VideoCall x={226} y={26} scale={0.6} mood="excited" pose="wave" bars={1} />
      </svg>
    ),
  },
  traps: [
    {
      title: "Each account under $10,000",
      text: "The FBAR test adds every foreign account's highest value. Three accounts at $4,000 each are $12,000: file.",
    },
    {
      title: "Attaching the FBAR to the return",
      text: "The FBAR goes to FinCEN on its own. Form 8938 is the one attached to the 1040.",
    },
    {
      title: "Signature authority and Form 8938",
      text: "Signature authority counts for the FBAR but not for Form 8938, which covers only assets the taxpayer has an interest in.",
    },
    {
      title: "Too little income to bother filing",
      text: "Anyone who had advance premium tax credit payments must file and attach Form 8962, whatever their income.",
    },
  ],
  sources: [
    { key: "fbar", section: "Who must file; When and how to file" },
    { key: "i8938", section: "Who Must File; Specified Foreign Financial Assets; Reporting Thresholds" },
    { key: "i8962", section: "Who Must File; Married taxpayers" },
  ],
  cases: [
    {
      who: "Dee",
      title: "Dee's two accounts",
      facts: "Dee, a U.S. citizen, had a Norwegian account with a top balance of $6,000 in 2025 and a U.K. account with a top balance of $5,500.",
      question: "Must Dee file an FBAR for 2025?",
      choices: ["No, neither account went over $10,000", "Yes, because the combined maximum values are over $10,000", "Only if the accounts earned interest", "No, because she lives abroad"],
      answer: "Yes, because the combined maximum values are over $10,000",
      why: "The FBAR threshold looks at the total of the highest values of all foreign accounts during the year: $6,000 plus $5,500 is $11,500.",
    },
    {
      who: "Penny",
      title: "Penny the signer",
      facts: "Penny is a signer on Dee's Norwegian account, which held $14,000. None of the money is Penny's. Penny has no other foreign accounts.",
      question: "Does Penny have an FBAR filing requirement?",
      choices: ["No, she doesn't own the money", "Yes, signature authority over foreign accounts over $10,000 counts", "Only Form 8938, not the FBAR", "Only if she withdrew money"],
      answer: "Yes, signature authority over foreign accounts over $10,000 counts",
      why: "The FBAR covers financial interest or signature authority. As a signer on an account worth more than $10,000, Penny must file.",
    },
    {
      who: "Milo",
      title: "The couple's foreign stock",
      facts: "Penny and Milo file jointly and live in the U.S. Their foreign brokerage account (their own) was worth $120,000 on December 31, 2025, and never more than $130,000.",
      question: "Must they file Form 8938?",
      choices: ["No, because they're under $150,000 at all times", "Yes, because they're over $100,000 on the last day of the year", "No, Form 8938 is only for people living abroad", "Only an FBAR is needed"],
      answer: "Yes, because they're over $100,000 on the last day of the year",
      why: "For married filing jointly in the U.S., Form 8938 is required if specified foreign assets are over $100,000 on the last day of the year or over $150,000 at any time. Either test is enough.",
    },
    {
      who: "Dee",
      title: "Dee abroad",
      facts: "Dee is single, qualifies as living abroad, and her foreign accounts were worth $180,000 on December 31, 2025, and $250,000 at their highest.",
      question: "Must Dee file Form 8938?",
      choices: ["Yes, she's over $50,000", "Yes, she's over $75,000 at some time", "No, she's under $200,000 at year end and $300,000 at all times", "No, people abroad never file it"],
      answer: "No, she's under $200,000 at year end and $300,000 at all times",
      why: "A single taxpayer living abroad files Form 8938 only above $200,000 on the last day of the year or $300,000 at any time. (She still files an FBAR.)",
    },
    {
      who: "Ace",
      title: "Ace's FBAR calendar",
      facts: "Ace is preparing a client's FBAR for accounts held in 2025. The client didn't request any extension.",
      question: "When is the FBAR due?",
      choices: ["June 30, 2026, with no extension", "April 15, 2026, automatically extended to October 15, 2026", "With the 2025 Form 1040, including its extension only if Form 4868 is filed", "December 31, 2026"],
      answer: "April 15, 2026, automatically extended to October 15, 2026",
      why: "The FBAR is due April 15 following the calendar year, with an automatic extension to October 15. No request is needed.",
    },
    {
      who: "Milo",
      title: "Milo's sister and the 1095-A",
      facts: "Milo's sister Kit had Marketplace coverage in 2025 with advance premium tax credit payments. Her income is below the amount that would otherwise require her to file.",
      question: "What must Kit do?",
      choices: ["Nothing: she's under the filing requirement", "File a return with Form 8962", "Mail her 1095-A to the IRS", "Pay the shared responsibility payment"],
      answer: "File a return with Form 8962",
      why: "Anyone who received advance payments of the premium tax credit must file a return and reconcile them on Form 8962, regardless of income.",
    },
    {
      who: "Hoot",
      title: "Mr. Crane, uninsured",
      facts: "Hoot's neighbor Mr. Crane had no health coverage at all in 2025, and his state has no coverage requirement.",
      question: "What does he owe on his federal return for being uninsured?",
      choices: ["$0", "$695", "2.5% of household income", "The cost of the lowest Marketplace plan"],
      answer: "$0",
      why: "The federal individual shared responsibility payment has been $0 since 2019.",
    },
  ],
  quizTopics: ["Foreign account reporting"],
  quizBrief: "Foreign accounts and ACA: FBAR (FinCEN 114), $10,000 total and signature authority, Form 8938 thresholds, Schedule B Part III, Form 1095-A and Form 8962, the $0 mandate penalty",
};

export default lesson;

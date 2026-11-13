import { Ace, Backdrop, Biscuit, Dee, Hoot, Label, Lulu, Milo, Penny } from "../cast";
import type { Lesson } from "../lesson";
import { Bank, Card, CARD, Confetti, Envelope, Globe, HOOK, PANEL, Paper, Stamp, Step } from "../props";

// Part 1, topic 6.3: international information returns: the FBAR (FinCEN Form 114), Form 8938, Form 3520
// for large foreign gifts and bequests, Forms 5471, 8865 and 8621, and the open statute of limitations
// for missing forms. Season 1 finale. Written to the rules for 2025 from FinCEN and IRS guidance and the
// Form 8938, 3520, 5471 and 8621 instructions.

const INK = "#17202c";

/** A teetering stack of paperwork. (x, y) is the bottom center. */
function PaperStack({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const sheets = [0, 1, 2, 3, 4, 5, 6];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {sheets.map((i) => (
        <rect key={i} x={-24 + (i % 2 ? 3 : -3)} y={-10 - i * 10} width={48} height={9} rx={1} fill={i % 3 === 0 ? "#fff3c4" : "#fff"} stroke={INK} strokeWidth={1.5} transform={`rotate(${i % 2 ? 4 : -4} 0 ${-6 - i * 10})`} />
      ))}
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Cousin Dee, home at last in her hard hat, drops a teetering stack of paperwork. Penny and Lulu run to hug her.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={60} y={128} scale={0.72} mood="excited" pose="up" />
        <Lulu x={128} y={160} scale={0.54} mood="excited" pose="up" />
        <Dee x={210} y={128} scale={0.76} mood="excited" flip pose="wave" />
        <PaperStack x={280} y={192} scale={1} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Dee's home!", x: 3, y: 6, w: 26, tail: "down-left" },
      { who: "Dee", text: "And I brought paperwork! Norway bank, an inheritance, a fund...", x: 40, y: 2, w: 50, tail: "down" },
    ],
  },
  {
    alt: "Ace points to a bank labeled Norway with a tag reading $40,000. Dee listens.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e3eef7" />
        <Ace x={70} y={128} scale={0.76} mood="happy" pose="point" />
        <Bank x={160} y={146} label="NORWAY" scale={0.7} />
        <Dee x={256} y={128} scale={0.76} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Your Norway account topped $10,000, Dee. So: an FBAR, FinCEN Form 114, filed with FinCEN, not the IRS.", x: 3, y: 2, w: 58, tail: "down-left" },
      { who: "Dee", text: "Due when?", x: 72, y: 8, w: 25, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot waves Form 8938 eagerly. Ace holds up a hand. A globe sits between them.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Hoot x={70} y={130} scale={0.68} mood="excited" pose="up" />
        <Paper x={120} y={110} label="8938" sub="FATCA" color="#fff3c4" />
        <Globe x={170} y={150} r={20} />
        <Ace x={256} y={128} scale={0.76} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "April 15, auto-extended to October! And Form 8938 too!", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "Not for Dee. Single and living abroad, her threshold is $200,000 at year end.", x: 50, y: 2, w: 47, tail: "down-right" },
    ],
  },
  {
    alt: "Dee holds a letter from Norway reading $150,000. Ace holds Form 3520.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3e1ef" />
        <Dee x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Envelope x={0} y={-8} label="$150K" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="3520" sub="report" color="#d8f0e2" />} />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "My godmother Astrid in Oslo left me $150,000!", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Ace", text: "Not income, Dee. But it's over $100,000 from a foreign person, so you report it on Form 3520.", x: 48, y: 2, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Dee holds a paper reading Oslo index fund. Hoot points with glee. Ace holds Form 8621.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Dee x={60} y={128} scale={0.72} mood="thinking" pose="hold" holding={<Paper x={0} y={-8} label="FUND" sub="Oslo" />} />
        <Hoot x={160} y={130} scale={0.64} mood="smug" pose="point" />
        <Ace x={262} y={128} scale={0.72} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="8621" sub="PFIC" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "And my Oslo index fund?", x: 3, y: 4, w: 30, tail: "down-left" },
      { who: "Hoot", text: "A PFIC! Hoo-hoo!", x: 36, y: 4, w: 26, tail: "down" },
      { who: "Ace", text: "Form 8621. Skip one of these and the whole return stays open.", x: 65, y: 2, w: 33, tail: "down-right" },
    ],
  },
  {
    alt: "Confetti falls as Ace shows a return stamped accepted. Penny and Milo cheer, Biscuit bounces, and Hoot looks almost pleased.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Confetti />
        <Penny x={44} y={128} scale={0.6} mood="excited" pose="up" />
        <Milo x={100} y={128} scale={0.6} mood="excited" pose="up" />
        <Ace x={170} y={128} scale={0.62} mood="happy" pose="hold" holding={<Paper x={0} y={-8} label="2025" sub="MFJ" color="#d8f0e2" />} />
        <Stamp x={222} y={110} text="ACCEPTED" size={11} />
        <Biscuit x={226} y={176} scale={0.36} mood="excited" />
        <Hoot x={276} y={132} scale={0.56} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Penny and Milo's first joint return: ACCEPTED!", x: 3, y: 2, w: 44, tail: "down" },
      { who: "Hoot", text: "Fine. See you all in Season 2.", x: 60, y: 3, w: 37, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "The FBAR",
    alt: "Two Norway accounts adding up to more than $10,000 at any time in the year trigger FinCEN Form 114, e-filed with FinCEN, due April 15 with an automatic extension to October 15.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e3eef7" />
        <Bank x={56} y={80} label="NORWAY" scale={0.8} />
        <Card x={110} y={12} w={198} h={40} lines={["All foreign accounts over", "$10,000 combined, any day"]} size={10} color="#fff" />
        <Card x={110} y={58} w={198} h={40} lines={["FinCEN Form 114,", "e-filed with FinCEN"]} size={10} color="#fff3c4" />
        <Card x={110} y={104} w={198} h={40} lines={["April 15, auto-extended", "to October 15"]} size={10} color="#d8f0e2" />
        <Label x={209} y={164} size={10} weight={700}>signature authority counts too</Label>
      </svg>
    ),
    body: [
      "A U.S. person with a financial interest in, or signature authority over, foreign financial accounts must file an FBAR (FinCEN Form 114) if the combined maximum values exceeded $10,000 at any time during the year. It's filed electronically with FinCEN through the BSA E-Filing System, not with the tax return.",
      "It's due April 15 with an automatic extension to October 15; no request is needed. Willful failures carry much heavier penalties than non-willful ones.",
    ],
    keyPoint: "FBAR (FinCEN 114): U.S. person with interest in or signature authority over foreign accounts whose combined max value > $10,000 at any time. E-filed with FinCEN (not the IRS); due April 15, automatic extension to October 15.",
  },
  {
    title: "Form 8938 thresholds",
    alt: "A grid of Form 8938 thresholds: living in the U.S., $50,000 at year end or $75,000 at any time if single, $100,000 or $150,000 joint; living abroad, $200,000 or $300,000 single, $400,000 or $600,000 joint.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Label x={130} y={26} size={11}>Single</Label>
        <Label x={250} y={26} size={11}>Joint</Label>
        <Label x={40} y={66} size={10}>In the U.S.</Label>
        <Label x={40} y={126} size={10}>Abroad</Label>
        <Card x={80} y={38} w={100} h={50} lines={["$50K end", "$75K any time"]} size={10} color="#fff" />
        <Card x={196} y={38} w={110} h={50} lines={["$100K end", "$150K any time"]} size={10} color="#fff" />
        <Card x={80} y={98} w={100} h={50} lines={["$200K end", "$300K any time"]} size={10} color="#d8f0e2" />
        <Card x={196} y={98} w={110} h={50} lines={["$400K end", "$600K any time"]} size={10} color="#d8f0e2" />
        <Label x={160} y={170} size={10} weight={700}>Attached to the 1040 · $10,000 penalty</Label>
      </svg>
    ),
    body: [
      "Form 8938 (FATCA) reports specified foreign financial assets: foreign accounts plus foreign stock, securities and interests not held in an account. It's attached to the income tax return and filed only by those who must file a return.",
      "Thresholds for 2025: unmarried living in the U.S., more than $50,000 on the last day of the year or $75,000 at any time; joint filers in the U.S., $100,000 or $150,000. Living abroad: $200,000 or $300,000 unmarried, $400,000 or $600,000 joint. The failure-to-file penalty is $10,000.",
    ],
    keyPoint: "Form 8938: specified foreign financial assets, attached to the 1040. Thresholds (year-end / any time): U.S. single $50K/$75K, MFJ $100K/$150K; abroad single $200K/$300K, MFJ $400K/$600K. $10,000 penalty.",
  },
  {
    title: "FBAR vs. Form 8938",
    alt: "Two columns: FBAR goes to FinCEN at over $10,000 and covers accounts; Form 8938 goes to the IRS with the 1040 at higher thresholds and covers accounts plus foreign stock. Many people file both.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={14} w={140} h={150} color="#fff">
          <Label x={84} y={36} size={11}>FBAR</Label>
          <Label x={84} y={62} size={10} weight={700}>to FinCEN</Label>
          <Label x={84} y={80} size={10} weight={700}>over $10,000</Label>
          <Label x={84} y={98} size={10} weight={700}>accounts only</Label>
          <Label x={84} y={116} size={10} weight={700}>signature authority</Label>
          <Label x={84} y={134} size={10} weight={700}>counts</Label>
        </Card>
        <Card x={166} y={14} w={140} h={150} color="#fff3c4">
          <Label x={236} y={36} size={11}>Form 8938</Label>
          <Label x={236} y={62} size={10} weight={700}>to the IRS, with 1040</Label>
          <Label x={236} y={80} size={10} weight={700}>$50,000 and up</Label>
          <Label x={236} y={98} size={10} weight={700}>accounts + foreign</Label>
          <Label x={236} y={116} size={10} weight={700}>stock and interests</Label>
          <Label x={236} y={134} size={10} weight={700}>owners only</Label>
        </Card>
      </svg>
    ),
    body: [
      "The FBAR and Form 8938 overlap but don't replace each other. The FBAR goes to FinCEN, has a lower threshold, and also covers accounts the person only has signature authority over.",
      "Form 8938 goes to the IRS with the tax return, has higher thresholds that depend on filing status and residence, and also covers foreign financial assets held outside an account, like foreign stock or a partnership interest. Filing one doesn't satisfy the other.",
    ],
    keyPoint: "FBAR: FinCEN, > $10,000 aggregate, accounts incl. signature authority. Form 8938: IRS with the return, higher thresholds, accounts plus other foreign financial assets. Filing one never satisfies the other.",
  },
  {
    title: "Form 3520: big foreign gifts",
    alt: "A $150,000 bequest from a nonresident alien: not income, but reported on Form 3520 because it's over $100,000. Gifts from foreign corporations or partnerships have a lower threshold.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3e1ef" />
        <Envelope x={56} y={70} label="$150K" scale={1.5} />
        <Card x={110} y={14} w={198} h={40} lines={["Not taxable income"]} size={11} color="#d8f0e2" />
        <Card x={110} y={60} w={198} h={50} lines={["Over $100,000 from a", "nonresident alien or estate"]} size={10} color="#fff" />
        <Card x={110} y={116} w={198} h={50} lines={["Form 3520, due with", "the return; foreign trusts too"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "A U.S. person who receives gifts or bequests totaling more than $100,000 in a year from a nonresident alien individual or a foreign estate must report them on Form 3520. Gifts from foreign corporations or partnerships are reported at a much lower, inflation-adjusted threshold. Form 3520 also reports transactions with foreign trusts.",
      "The gift itself isn't taxable income. Form 3520 is due on the due date of the income tax return, including extensions, and the penalty for not filing is 5% of the gift per month, up to 25%.",
    ],
    keyPoint: "Form 3520: gifts/bequests > $100,000 in a year from a nonresident alien or foreign estate (lower threshold for foreign corporations/partnerships), plus foreign trust transactions. Not income. Due with the return; penalty 5% per month up to 25%.",
  },
  {
    title: "Foreign companies, partnerships and funds",
    alt: "Three forms: 5471 for certain owners and officers of foreign corporations, 8865 for foreign partnerships, and 8621 for shares of passive foreign investment companies such as foreign mutual funds.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Step x={14} y={14} w={94} h={110} color="#d4ebfa" label="5471" sub="foreign corp" />
        <Step x={113} y={14} w={94} h={110} color="#d8f0e2" label="8865" sub="foreign partnership" />
        <Step x={212} y={14} w={94} h={110} color="#fde2e4" label="8621" sub="PFIC (funds)" />
        <Label x={160} y={150} size={10} weight={700}>All attached to the return</Label>
        <Label x={160} y={166} size={10} weight={700}>5471 and 8865 penalties start at $10,000</Label>
      </svg>
    ),
    body: [
      "Form 5471 is filed by certain U.S. officers, directors and shareholders of foreign corporations, such as someone who acquires 10% or more of the stock or controls the company. Form 8865 is the counterpart for U.S. persons with interests in foreign partnerships.",
      "Form 8621 is filed by shareholders of a passive foreign investment company (PFIC), which includes most foreign mutual funds and ETFs. PFIC income is subject to special, often harsh, tax rules unless an election like a qualified electing fund (QEF) or mark-to-market is made.",
    ],
    keyPoint: "Form 5471: U.S. officers/directors/10%+ shareholders of foreign corporations. Form 8865: foreign partnerships. Form 8621: PFICs (most foreign mutual funds/ETFs), special tax unless a QEF or mark-to-market election. All with the return.",
  },
  {
    title: "Missing forms keep the statute open",
    alt: "A door held open by a missing Form 8938: the assessment period doesn't close until 3 years after the form is filed.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <rect x={30} y={24} width={80} height={136} fill="#c9a26b" stroke={INK} strokeWidth={2.5} />
        <path d="M110,24 L150,40 L150,170 L110,160 Z" fill="#a8804b" stroke={INK} strokeWidth={2.5} />
        <Paper x={150} y={150} label="8938" sub="missing" scale={0.8} rotate={-14} color="#fde2e4" />
        <Card x={180} y={20} w={128} h={62} lines={["Return stays", "open until 3 years", "after it's filed"]} size={10} color="#fff" />
        <Card x={180} y={92} w={128} h={60} lines={["Omitted foreign", "income > $5,000:", "6 years"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "If a taxpayer doesn't file a required international information return (such as Form 8938, 3520, 5471, 8865 or 8621), the statute of limitations for assessing tax on the entire return stays open until 3 years after the information is furnished. If the failure is due to reasonable cause, it stays open only for items related to the missing information.",
      "Omitting more than $5,000 of income from specified foreign financial assets extends the assessment period to 6 years.",
    ],
    keyPoint: "Missing international information return (8938, 3520, 5471, 8865, 8621): the statute for the whole return stays open until 3 years after it's filed (only related items with reasonable cause). Omitted foreign-asset income > $5,000: 6 years.",
  },
];

const lesson: Lesson = {
  id: "p1-international",
  part: "part1",
  domainId: "p1d6",
  number: "6.3",
  episode: "Dee's Paperwork Avalanche",
  title: "International information returns",
  minutes: 14,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns)",
  intro: "The FBAR and Form 8938 (and how they differ), Form 3520 for large foreign gifts and bequests, Forms 5471, 8865 and 8621, and how a missing form keeps the statute open. The Season 1 finale.",
  previously: "Rosa's generosity kept Hoot busy. Now Cousin Dee is finally home from the rig, and she didn't come empty-handed.",
  comic,
  cards,
  hook: {
    line: "FBAR: over $10,000, to FinCEN. 8938: higher thresholds, to the IRS.",
    more: "Over $100,000 from a foreign person: Form 3520. Miss a form and the return stays open.",
    alt: "A globe between FinCEN 114 and Form 8938.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#e3eef7" />
        <Paper x={70} y={60} label="114" sub="FinCEN" scale={1.4} color="#fff3c4" />
        <Globe x={160} y={62} r={26} />
        <Paper x={250} y={60} label="8938" sub="IRS" scale={1.4} color="#d8f0e2" />
      </svg>
    ),
  },
  traps: [
    { title: "FBAR goes with the 1040", text: "The FBAR is filed separately with FinCEN. Form 8938 is the one attached to the return." },
    { title: "Filing one covers both", text: "FBAR and Form 8938 are separate requirements; many people must file both." },
    { title: "A foreign inheritance is taxable", text: "It isn't income, but over $100,000 from a nonresident alien or foreign estate must be reported on Form 3520." },
    { title: "Checking only the year-end balance", text: "The FBAR uses the highest combined balance at any time in the year." },
  ],
  sources: [
    { key: "fbar", section: "Report of Foreign Bank and Financial Accounts (FBAR)" },
    { key: "i8938", section: "Who Must File; Specified foreign financial assets; Reporting thresholds" },
    { key: "i3520", section: "Part IV, Gifts or Bequests From Foreign Persons" },
    { key: "i5471", section: "Categories of Filers" },
    { key: "i8621", section: "Who Must File" },
  ],
  cases: [
    {
      who: "Dee",
      title: "Two small accounts",
      facts: "Dee had two accounts in Norway in 2025. One peaked at $6,000 and the other at $5,000. Both were under $10,000 at every point.",
      question: "Does she file an FBAR?",
      choices: ["No; neither account was over $10,000", "Yes; the combined maximums exceed $10,000", "Only if she has income from them", "Only Form 8938"],
      answer: "Yes; the combined maximums exceed $10,000",
      why: "The FBAR test uses the aggregate maximum value of all foreign accounts. $6,000 + $5,000 = $11,000, over $10,000.",
    },
    {
      who: "Hoot",
      title: "Where does it go?",
      facts: "Ace is preparing Dee's 2025 FBAR.",
      question: "Where and when is it filed?",
      choices: ["With FinCEN electronically; April 15, auto-extended to October 15", "Attached to Form 1040; April 15", "Mailed to the IRS; June 15", "With FinCEN; only by request for an extension"],
      answer: "With FinCEN electronically; April 15, auto-extended to October 15",
      why: "FinCEN Form 114 is e-filed with FinCEN through the BSA E-Filing System, due April 15 with an automatic extension to October 15.",
    },
    {
      who: "Penny",
      title: "The Larsens' Form 8938",
      facts: "Ace's clients the Larsens live in Ledger Falls and file jointly. Their foreign account balances were $120,000 on December 31, 2025 (and never more than $130,000).",
      question: "Must they attach Form 8938?",
      choices: ["No; they're under $150,000", "Yes; they're over $100,000 at year end", "No; only the FBAR applies", "Only if they live abroad"],
      answer: "Yes; they're over $100,000 at year end",
      why: "For joint filers living in the U.S., Form 8938 is required if specified foreign assets exceed $100,000 on the last day of the year or $150,000 at any time.",
    },
    {
      who: "Ace",
      title: "Godmother Astrid's bequest",
      facts: "Dee received a $150,000 bequest from her godmother, a Norwegian citizen who never lived in the U.S.",
      question: "How is it treated on Dee's 2025 filings?",
      choices: ["Taxable income on Form 1040", "Reported on Form 3520; not taxable income", "Reported on Form 709", "Nothing to report"],
      answer: "Reported on Form 3520; not taxable income",
      why: "Gifts and bequests over $100,000 from a nonresident alien or foreign estate aren't income but must be reported on Form 3520.",
    },
    {
      who: "Milo",
      title: "The forgotten 8938",
      facts: "A client was required to file Form 8938 for 2021 but didn't, with no reasonable cause. It's now 2026.",
      question: "When does the statute of limitations for the 2021 return close?",
      choices: ["Already closed, 3 years after filing", "3 years after the Form 8938 information is furnished", "6 years after filing, no matter what", "Never"],
      answer: "3 years after the Form 8938 information is furnished",
      why: "Failing to file a required international information return keeps the assessment period for the whole return open until 3 years after the information is furnished.",
    },
  ],
  quizTopics: ["FBAR and Form 8938"],
  quizBrief: "International information returns: FBAR (FinCEN 114), Form 8938 thresholds, FBAR vs 8938, Form 3520 for foreign gifts over $100,000, Forms 5471, 8865 and 8621, statute kept open",
};

export default lesson;

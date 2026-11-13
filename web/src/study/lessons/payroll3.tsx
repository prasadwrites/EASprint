import { Ace, Backdrop, Hoot, Label, Milo, Penny, Rosa } from "../cast";
import type { Lesson } from "../lesson";
import { Sign } from "../office";
import { Card, CARD, Envelope, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 3, topic 3.4: the trust fund recovery penalty: which taxes are trust fund taxes, who is a
// responsible person, willfulness, the Form 4180 interview, Letter 1153 and appeal rights, and joint
// and several liability. Written to the IRS TFRP page and Publication 5 as in effect for 2026.

/** A flour sack. (x, y) is the bottom center. Draw it after Hoot to have him pop out. */
function FlourSack({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-34,0 Q-40,-40 -28,-70 L-34,-80 H34 L28,-70 Q40,-40 34,0 Z" fill="#f6efe2" stroke="#2a2f3a" strokeWidth={3} strokeLinejoin="round" />
      <Label x={0} y={-34} size={11}>
        FLOUR
      </Label>
    </g>
  );
}

const roll = (
  <g transform="translate(0 -8)">
    <circle cx={0} cy={0} r={10} fill="#d9a066" stroke="#2a2f3a" strokeWidth={2} />
    <path d="M-4.5,0 A4.5,4.5 0 1 1 4.5,0 A2.2,2.2 0 1 1 0,0" fill="none" stroke="#7a4a20" strokeWidth={1.6} />
  </g>
);

const comic: Lesson["comic"] = [
  {
    alt: "In Rosa's Rolls, Aunt Rosa shrugs under the shop sign. Ace looks alarmed.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Sign x={118} y={104} w={86} h={24} text="ROSA'S ROLLS" color="#f4c7b8" size={9} />
        <Rosa x={84} y={128} scale={0.76} mood="worried" pose="shrug" />
        <Ace x={240} y={128} scale={0.78} mood="shocked" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "The oven broke, so I paid the oven man instead of the payroll deposits. For four quarters.", x: 3, y: 2, w: 50, tail: "down-left" },
      { who: "Ace", text: "Rosa! That's your workers' withheld tax. It's TRUST FUND money!", x: 56, y: 2, w: 42, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Hoot bursts out of a flour sack, dusted white. Rosa drops her rolling pin.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Rosa x={84} y={128} scale={0.76} mood="shocked" pose="up" />
        <Hoot x={236} y={86} scale={0.56} mood="excited" pose="up" />
        <FlourSack x={236} y={198} scale={1.05} />
        <g fill="#fff" opacity={0.85}>
          <circle cx={206} cy={70} r={5} />
          <circle cx={270} cy={76} r={4} />
          <circle cx={222} cy={58} r={3} />
          <circle cx={258} cy={56} r={3.5} />
        </g>
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "How long have you been in my FLOUR?", x: 3, y: 4, w: 36, tail: "down-left" },
      { who: "Hoot", text: "Long enough! Trust fund recovery penalty: 100% of it.", x: 52, y: 2, w: 44, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa protests, hands on hips. Ace explains, pointing to a card that says responsible and willful.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Rosa x={70} y={128} scale={0.76} mood="stern" />
        <Card x={112} y={96} w={96} h={56} lines={["responsible", "+ willful"]} size={11} color="#fff3c4" />
        <Ace x={256} y={128} scale={0.78} mood="stern" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "But the BAKERY owes it. Not me!", x: 3, y: 4, w: 36, tail: "down-left" },
      { who: "Ace", text: "It's assessed against people. You decided who got paid, and you knew. That's responsible and willful.", x: 44, y: 2, w: 54, tail: "down-right" },
    ],
  },
  {
    alt: "Milo raises his hand eagerly. Penny pats his shoulder.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Milo x={70} y={128} scale={0.76} mood="excited" pose="up" />
        <Ace x={170} y={128} scale={0.72} mood="thinking" flip />
        <Penny x={264} y={128} scale={0.72} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "I signed checks too! Am I responsible?", x: 3, y: 2, w: 36, tail: "down-left" },
      { who: "Ace", text: "Only when Rosa told you to. No real authority, so probably not.", x: 36, y: 2, w: 34, tail: "down" },
      { who: "Penny", text: "First time he's been called that.", x: 72, y: 4, w: 26, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot, still floury, holds Form 4180 and an envelope labeled Letter 1153. Ace holds up a calendar finger.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Hoot x={74} y={130} scale={0.7} mood="smug" pose="up" />
        <Paper x={136} y={150} label="4180" sub="interview" color="#fff" />
        <Envelope x={158} y={104} label="L1153" irs />
        <Ace x={250} y={128} scale={0.78} mood="happy" flip pose="up" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "First, an interview on Form 4180. Then Letter 1153 proposes the penalty!", x: 3, y: 2, w: 48, tail: "down-left" },
      { who: "Ace", text: "And then we get 60 days to appeal.", x: 60, y: 6, w: 38, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa hands Hoot a cinnamon roll while writing a deposit check. Hoot eyes the roll suspiciously.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Rosa x={84} y={128} scale={0.76} mood="happy" pose="hold" holding={roll} />
        <Hoot x={236} y={130} scale={0.7} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "New rule: deposits first, ovens second. Roll, Hoot?", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Hoot", text: "Is this a bribe? ...I'll report it to myself. After I eat it.", x: 52, y: 2, w: 45, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "What trust fund taxes are",
    alt: "Withheld income tax and the employees' share of Social Security and Medicare are held in trust. The employer's own share isn't.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Step x={14} y={14} w={94} h={104} color="#d8f0e2" label="Income" sub="tax withheld" />
        <Step x={113} y={14} w={94} h={104} color="#d8f0e2" label="FICA" sub="employee share" />
        <Step x={212} y={14} w={94} h={104} color="#fde2e4" label="Not" sub="employer share" />
        <Label x={160} y={142} size={10} weight={700}>The business holds the employees' money</Label>
        <Label x={160} y={160} size={10} weight={700}>in trust for the government</Label>
      </svg>
    ),
    body: [
      "When an employer withholds federal income tax and the employees' share of Social Security and Medicare from wages, it holds that money in trust for the U.S. These are trust fund taxes. Collected excise taxes (such as some taxes on air travel) are trust fund taxes too.",
      "The employer's own matching share of Social Security and Medicare, and FUTA, aren't trust fund taxes and aren't part of the penalty.",
    ],
    keyPoint: "Trust fund taxes: withheld income tax + employee share of Social Security and Medicare (+ collected excise taxes). Not the employer's matching FICA share or FUTA.",
  },
  {
    title: "Who's on the hook",
    alt: "The penalty equals 100% of the unpaid trust fund taxes and hits any person who was both responsible and willful.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Mark x={70} y={92} text="100%" color="#a8321f" size={42} />
        <Card x={140} y={14} w={168} h={74} lines={["Responsible: duty and", "power to collect,", "account for and pay"]} size={10} color="#fff" />
        <Card x={140} y={96} w={168} h={72} lines={["Willful: knew, and paid", "others anyway (or was", "recklessly indifferent)"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "The trust fund recovery penalty (TFRP) equals 100% of the unpaid trust fund taxes. It's assessed personally against any person who was required to collect, account for and pay the taxes (a responsible person) and willfully failed to do so.",
      "A responsible person can be an officer or employee of a corporation, a partner, a director or shareholder, a payroll service provider, or anyone else with authority over which bills get paid. Willful means the person knew (or recklessly disregarded) that the taxes were unpaid and chose to pay other creditors. No evil motive is needed. Signing checks only at someone else's direction, without real authority, usually isn't enough.",
    ],
    keyPoint: "TFRP = 100% of unpaid trust fund taxes, assessed personally against each responsible person (status, duty and authority over payments) who acted willfully (knew of the debt and paid others instead, or recklessly disregarded it). No bad motive required.",
  },
  {
    title: "How it's assessed and appealed",
    alt: "A Form 4180 interview, then Letter 1153 proposing the penalty. The person has 60 days (75 if outside the U.S.) to appeal.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={14} w={94} h={104} color="#fff" label="4180" sub="interview" />
        <Step x={113} y={14} w={94} h={104} color="#fff3c4" label="L1153" sub="proposed penalty" />
        <Step x={212} y={14} w={94} h={104} color="#d8f0e2" label="60 days" sub="to appeal" />
        <Label x={160} y={142} size={10} weight={700}>75 days if addressed outside the U.S.</Label>
        <Label x={160} y={160} size={10} weight={700}>Agree? Sign Form 2751</Label>
      </svg>
    ),
    body: [
      "A revenue officer investigates, usually interviewing each potentially responsible person using Form 4180. The IRS then mails or delivers Letter 1153, which proposes the penalty and explains appeal rights.",
      "The person has 60 days from the letter (75 days if it's addressed outside the U.S.) to file a protest with the Independent Office of Appeals. A person who agrees signs Form 2751. If there's no protest, the penalty is assessed and collected like any tax.",
    ],
    keyPoint: "TFRP process: Form 4180 interview → Letter 1153 (proposed assessment) → 60 days to appeal (75 if outside the U.S.); Form 2751 to agree. No response: assessed.",
  },
  {
    title: "Joint and several, collected once",
    alt: "If several people are responsible, the IRS can collect from any of them, but the total is collected only once.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Card x={14} y={14} w={292} h={70} lines={["Each responsible person can owe all of it,", "but the IRS collects the total only once"]} size={11} color="#fff" />
        <Card x={14} y={96} w={140} h={72} lines={["Payer can sue", "others for their share"]} size={10} color="#fff3c4" />
        <Card x={166} y={96} w={140} h={72} lines={["Business can designate", "payments to trust fund"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "Liability is joint and several: the IRS can collect the full penalty from any responsible person, but it collects the total trust fund amount only once. A person who pays more than their share can sue the other responsible persons for contribution.",
      "When a business makes a voluntary payment, it can designate it to the trust fund portion of its employment tax debt, which reduces the potential TFRP. The IRS can also pursue the business itself for the full employment tax.",
    ],
    keyPoint: "TFRP is joint and several among responsible persons, but the total is collected once; payers may seek contribution from others. Voluntary business payments can be designated to the trust fund portion.",
  },
  {
    title: "Timing and defenses",
    alt: "Quarterly payroll returns for a year count as filed on April 15 of the next year, which starts the 3-year clock. Defenses focus on authority and knowledge.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Paper x={56} y={84} label="941" sub="x 4 quarters" scale={1.8} color="#fff" />
        <Card x={110} y={14} w={198} h={46} lines={["Treated as filed April 15", "of the next year"]} size={10} color="#fff" />
        <Card x={110} y={66} w={198} h={46} lines={["Then 3 years to assess", "the TFRP"]} size={10} color="#fff3c4" />
        <Card x={110} y={118} w={198} h={46} lines={["Defense: no authority,", "or didn't know"]} size={10} color="#d8f0e2" />
      </svg>
    ),
    body: [
      "For the assessment statute, quarterly Forms 941 filed for a year are treated as filed on April 15 of the following year, so the IRS generally has 3 years from then to assess the TFRP.",
      "A representative defending a client usually argues the client wasn't responsible (no real authority over which bills got paid) or wasn't willful (didn't know the taxes were unpaid, and paid them once they found out). Records like bank signature cards, corporate minutes and who actually chose which bills to pay matter most, and they come up in the Form 4180 interview.",
    ],
    keyPoint: "Forms 941 for a year are deemed filed April 15 of the next year; the TFRP generally must be assessed within 3 years after that. Defenses: lack of authority (not responsible) or lack of knowledge (not willful).",
  },
];

const lesson: Lesson = {
  id: "p3-trust-fund-penalty",
  part: "part3",
  domainId: "p3d3",
  number: "3.4",
  episode: "Rosa's Payroll Panic",
  title: "Trust fund recovery penalty",
  minutes: 11,
  lawAsOf: "rules in effect for 2026",
  intro: "Which payroll taxes are held in trust, who counts as a responsible and willful person, how the 100% penalty is proposed and appealed, and why it's collected only once.",
  previously: "Rosa's penalty got abated, and she celebrated with free rolls. Then the oven at Rosa's Rolls exploded. Mostly.",
  comic,
  cards,
  hook: {
    line: "Their money, held in trust. Spend it and it's 100% on you.",
    more: "Withheld income tax + employee FICA. Responsible + willful. Form 4180 → Letter 1153 → 60 days to appeal. Collected once.",
    alt: "A flour sack labeled trust fund next to 100%.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fde9e4" />
        <FlourSack x={70} y={108} scale={1.1} />
        <Mark x={210} y={74} text="100%" color="#a8321f" size={40} />
      </svg>
    ),
  },
  traps: [
    { title: "The employer's FICA is included", text: "Only withheld income tax and the employees' share of FICA are trust fund taxes." },
    { title: "Only the business can owe it", text: "The TFRP is assessed personally against responsible persons who acted willfully." },
    { title: "Willful means fraud", text: "Knowing the taxes were unpaid and paying other creditors is enough. No bad motive is needed." },
    { title: "30 days to appeal", text: "After Letter 1153 the person has 60 days (75 if outside the U.S.)." },
  ],
  sources: [
    { key: "tfrp", section: "Employment taxes and the trust fund recovery penalty" },
    { key: "p5", section: "Your appeal rights" },
    { key: "p15", section: "Trust fund recovery penalty" },
  ],
  cases: [
    {
      who: "Rosa",
      title: "What's in the trust?",
      facts: "For a quarter, Rosa's Rolls withheld $8,000 of income tax and $3,000 of employee Social Security and Medicare. Its matching employer share was $3,000. Nothing was deposited.",
      question: "What's the most the TFRP can be?",
      choices: ["$14,000", "$8,000", "$11,000", "$3,000"],
      answer: "$11,000",
      why: "Trust fund taxes are the withheld income tax and the employees' share of FICA: $8,000 + $3,000. The employer's share isn't included.",
    },
    {
      who: "Milo",
      title: "The check signer",
      facts: "Milo signed bakery checks only when Rosa told him which bills to pay. He had no say over which creditors got paid.",
      question: "Is Milo likely a responsible person?",
      choices: ["Yes, any check signer is", "No, he lacked real authority over payments", "Yes, but only for 50%", "Only if he's an officer"],
      answer: "No, he lacked real authority over payments",
      why: "Responsibility turns on duty and authority over which creditors are paid. Signing at someone else's direction usually isn't enough.",
    },
    {
      who: "Ace",
      title: "The letter",
      facts: "Rosa receives Letter 1153 at the bakery in Ledger Falls proposing the TFRP. She disagrees.",
      question: "How long does she have to appeal?",
      choices: ["30 days", "90 days", "75 days", "60 days"],
      answer: "60 days",
      why: "Letter 1153 gives 60 days to appeal (75 days if addressed outside the U.S.).",
    },
    {
      who: "Hoot",
      title: "Two responsible people",
      facts: "The IRS assesses a $20,000 TFRP against both a bakery's owner and its bookkeeper, who are each responsible and willful.",
      question: "How much can the IRS collect in total?",
      choices: ["$20,000", "$40,000", "$10,000 from each, no more", "Nothing until the business is closed"],
      answer: "$20,000",
      why: "Liability is joint and several, so the IRS can collect from either one, but it collects the total only once.",
    },
  ],
  quizTopics: ["Trust fund recovery penalty"],
  quizBrief: "Trust fund recovery penalty: trust fund taxes (withheld income tax, employee FICA), 100% penalty, responsible and willful persons, Form 4180, Letter 1153 and 60 days to appeal, joint and several",
};

export default lesson;

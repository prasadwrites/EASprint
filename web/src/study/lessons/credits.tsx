import { Ace, Backdrop, Biscuit, Hoot, Label, Lulu, Milo, Penny, VideoCall } from "../cast";
import type { Lesson } from "../lesson";
import { Card, CARD, Heart, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 1, topic 3.3: family credits. Written to the rules for tax year 2025 (as changed by the One Big
// Beautiful Bill Act) from the Schedule 8812 instructions, Publication 503 and the Form 8839 instructions.
// Lulu is Penny's cousin's daughter, so she's Penny's qualifying relative (episode 1.3), not a qualifying child.

const INK = "#17202c";

/** A price tag on a string. (x, y) is the hole. */
function Tag({ x, y, text, color = "#fff3c4", rotate = -10 }: { x: number; y: number; text: string; color?: string; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d="M0,0 L14,-14 H74 V14 H14 Z" fill={color} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <circle cx={10} cy={0} r={3} fill="#fff" stroke={INK} strokeWidth={1.5} />
      <Label x={46} y={5} size={13}>
        {text}
      </Label>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Dee on a tablet shouts with excitement. Lulu, with a price tag reading $2,200 hanging from her overalls, looks offended.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde2e4" />
        <VideoCall x={20} y={92} scale={1} mood="excited" pose="up" bars={2} />
        <Lulu x={210} y={160} scale={0.56} mood="stern" flip />
        <Tag x={232} y={170} text="$2,200?" rotate={-14} />
      </svg>
    ),
    bubbles: [
      { who: "Dee", text: "The child credit went up to $2,200! Lulu's worth $2,200 to you, Penny!", x: 3, y: 2, w: 52, tail: "down-left" },
      { who: "Lulu", text: "Excuse me. I'm PRICELESS.", x: 62, y: 6, w: 35, tail: "down-right" },
    ],
  },
  {
    alt: "Ace shows Penny a family tree: Penny and cousin Dee side by side, Lulu under Dee.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Penny x={66} y={128} scale={0.74} mood="thinking" />
        <Card x={120} y={92} w={90} h={90} color="#fff">
          <Label x={142} y={112} size={9}>Penny</Label>
          <Label x={188} y={112} size={9}>Dee</Label>
          <path d="M156,108 H174 M188,118 V140" stroke={INK} strokeWidth={2} />
          <Label x={188} y={156} size={9}>Lulu</Label>
          <Label x={165} y={128} size={7} weight={700}>cousins</Label>
        </Card>
        <Ace x={262} y={128} scale={0.74} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace, is Lulu worth $2,200?", x: 3, y: 4, w: 32, tail: "down-left" },
      { who: "Ace", text: "Penny, a cousin's daughter isn't a qualifying child relationship. So no $2,200 child tax credit.", x: 40, y: 2, w: 57, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot hands Lulu a small tag reading $500. Lulu stares at it in disbelief.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Hoot x={84} y={128} scale={0.72} mood="happy" pose="point" />
        <Tag x={140} y={110} text="$500" color="#d8f0e2" rotate={6} />
        <Lulu x={250} y={160} scale={0.56} mood="shocked" flip />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-hoo! But she's your qualifying relative, Penny Pocket. That's the $500 credit for other dependents.", x: 3, y: 2, w: 54, tail: "down-left" },
      { who: "Lulu", text: "FIVE HUNDRED?!", x: 64, y: 8, w: 33, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Penny holds a day camp receipt for $3,000. Ace holds up a sign reading under 13 and a qualifying child.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Penny x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="CAMP" sub="$3,000" />} />
        <Ace x={240} y={128} scale={0.78} mood="thinking" flip pose="hold" holding={<Card x={-32} y={-24} w={64} h={36} lines={["Qualifying", "child < 13"]} size={9} color="#fde2e4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Then Lulu's day camp gets the dependent care credit!", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "That needs a qualifying child under 13, Penny. Lulu's a qualifying relative, so no.", x: 52, y: 3, w: 45, tail: "down-right" },
    ],
  },
  {
    alt: "Milo hugs Biscuit hopefully. Hoot, horrified, holds an adoption form.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={80} y={128} scale={0.76} mood="excited" />
        <Biscuit x={150} y={170} scale={0.42} mood="excited" />
        <Hoot x={250} y={128} scale={0.7} mood="shocked" flip pose="hold" />
        <Paper x={250} y={190} label="8839" sub="adoption" rotate={8} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "What if we adopt Biscuit? Adoption credit!", x: 3, y: 3, w: 40, tail: "down-left" },
      { who: "Hoot", text: "Hoo! It's for adopting a CHILD, Milo Marsh. Up to $17,280. Not beagles!", x: 48, y: 3, w: 49, tail: "down-right" },
    ],
  },
  {
    alt: "Lulu, recovered, holds her $500 tag proudly. Ace laughs.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde2e4" />
        <Lulu x={84} y={160} scale={0.56} mood="smug" pose="up" />
        <Heart x={150} y={110} s={1.2} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip />
      </svg>
    ),
    bubbles: [
      { who: "Lulu", text: "Fine. But when I'm 17, I'm still worth $500, right?", x: 3, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Right, Lulu. Dependents 17 and older get the $500 credit too. And to us, you're priceless.", x: 51, y: 2, w: 46, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Child tax credit: $2,200 for 2025",
    alt: "A child under 17 with an SSN card stands on a $2,200 pedestal. Checklist: qualifying child, under 17 at year end, SSN, claimed as dependent.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Lulu x={60} y={86} scale={0.42} mood="happy" />
        <Step x={20} y={130} w={84} h={40} color="#f6b73c" label="$2,200" />
        <Card x={124} y={14} w={184} h={34} lines={["Qualifying child, a dependent"]} size={10} color="#fff" />
        <Card x={124} y={54} w={184} h={34} lines={["Under 17 on December 31"]} size={10} color="#fff" />
        <Card x={124} y={94} w={184} h={34} lines={["Child's SSN valid for work"]} size={10} color="#fff" />
        <Card x={124} y={134} w={184} h={34} lines={["Taxpayer (or a spouse) SSN"]} size={10} color="#fff" />
      </svg>
    ),
    body: [
      "For 2025, the child tax credit is $2,200 for each qualifying child who is under 17 at the end of the year, is claimed as a dependent, is a U.S. citizen, national or resident, and has an SSN valid for employment issued by the return's due date.",
      "The child must be the taxpayer's qualifying child under the dependent rules (relationship, age, residency, support, joint return). Starting in 2025, the taxpayer, or at least one spouse on a joint return, must also have an SSN. It's figured on Schedule 8812.",
    ],
    keyPoint: "2025 CTC: $2,200 per qualifying child under 17 at year-end, claimed as a dependent, with a work-valid SSN; taxpayer (or one spouse if MFJ) needs an SSN. Schedule 8812.",
  },
  {
    title: "The refundable part and the phase-out",
    alt: "A $2,200 coin with a $1,700 refundable slice. A slide starting at $200,000 single or $400,000 joint takes off $50 per $1,000.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <circle cx={70} cy={80} r={56} fill="#f6b73c" stroke={INK} strokeWidth={2.5} />
        <path d="M70,80 L70,24 A56,56 0 1,1 17,98 Z" fill="#9fd8a8" stroke={INK} strokeWidth={2.5} />
        <Label x={84} y={96} size={11}>$1,700</Label>
        <Label x={84} y={110} size={8} weight={700}>refundable</Label>
        <Label x={70} y={156} size={9} weight={700}>15% of earned income over $2,500</Label>
        <path d="M150,50 H210 L300,140" fill="none" stroke={INK} strokeWidth={4} />
        <Label x={190} y={40} size={10}>$200K / $400K MFJ</Label>
        <Label x={250} y={80} size={10} anchor="start">–$50 per</Label>
        <Label x={250} y={94} size={10} anchor="start">$1,000</Label>
      </svg>
    ),
    body: [
      "Up to $1,700 per child is refundable as the additional child tax credit for 2025, limited to 15% of earned income over $2,500.",
      "The child tax credit and the credit for other dependents together are reduced by $50 for each $1,000 (or part) of modified AGI over $200,000, or $400,000 on a joint return.",
    ],
    keyPoint: "ACTC: refundable up to $1,700 per child (2025), = 15% of earned income over $2,500. CTC + ODC reduced $50 per $1,000 of MAGI over $200,000 ($400,000 MFJ).",
  },
  {
    title: "Credit for other dependents: $500",
    alt: "Three people with $500 tags: Lulu as a qualifying relative, a 17-year-old, and a grandparent. Labeled nonrefundable.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde2e4" />
        <Card x={14} y={30} w={92} h={110} lines={["Qualifying", "relatives", "(Lulu!)"]} size={11} color="#fff" />
        <Card x={114} y={30} w={92} h={110} lines={["Children", "17 and", "older"]} size={11} color="#fff" />
        <Card x={214} y={30} w={92} h={110} lines={["Dependents", "with an", "ITIN"]} size={11} color="#fff" />
        <Label x={160} y={164} size={12}>$500 each · nonrefundable</Label>
      </svg>
    ),
    body: [
      "The $500 credit for other dependents covers dependents who don't qualify for the child tax credit: qualifying relatives (like Lulu, or a parent the taxpayer supports), qualifying children 17 or older, and children with an ITIN instead of an SSN.",
      "The dependent must be a U.S. citizen, national or resident. The credit isn't refundable and shares the CTC phase-out.",
    ],
    keyPoint: "ODC: $500 nonrefundable per dependent who doesn't qualify for the CTC (qualifying relatives, children 17+, ITIN children); must be a U.S. citizen, national or resident.",
  },
  {
    title: "Child and dependent care credit: who and how much",
    alt: "A daycare door marked under 13. Expense limits $3,000 for one, $6,000 for two or more, times 20 to 35 percent.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7f4fb" />
        <Card x={14} y={18} w={140} h={66} lines={["Qualifying child", "under 13, or", "incapable dependent"]} size={10} color="#fff" />
        <Step x={170} y={60} w={64} h={100} color="#fff3c4" label="$3,000" sub="one" />
        <Step x={240} y={30} w={68} h={130} color="#d8f0e2" label="$6,000" sub="two or more" />
        <Card x={14} y={98} w={140} h={60} lines={["× 35% (AGI ≤ $15K)", "down to 20%", "(AGI > $43K)"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "The credit (Form 2441) covers care so the taxpayer (and spouse) can work or look for work. A qualifying person is a qualifying child under 13 claimed as a dependent, or a spouse or dependent who can't care for themselves and lived with the taxpayer more than half the year.",
      "For 2025, up to $3,000 of expenses for one qualifying person or $6,000 for two or more count, times 35% for AGI of $15,000 or less, falling to 20% for AGI over $43,000. Expenses can't exceed the earned income of the lower-earning spouse.",
    ],
    keyPoint: "Dependent care credit (2025): qualifying child < 13 or incapable spouse/dependent; expenses up to $3,000 (one) / $6,000 (two+), limited to lower spouse's earned income; 35% down to 20% (AGI > $43,000). Form 2441.",
  },
  {
    title: "What counts as care, and what reduces it",
    alt: "Allowed: daycare, day camp, babysitter, before and after school care. Not allowed: overnight camp, school tuition, paying your own teen. An FSA bucket of $5,000 subtracts from the limit.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Card x={14} y={14} w={140} h={110} color="#d8f0e2">
          <Label x={84} y={36} size={11}>Counts</Label>
          <Label x={84} y={60} size={10} weight={700}>Daycare, nanny</Label>
          <Label x={84} y={80} size={10} weight={700}>Day camp</Label>
          <Label x={84} y={100} size={10} weight={700}>After-school care</Label>
        </Card>
        <Card x={166} y={14} w={140} h={110} color="#fde2e4">
          <Label x={236} y={36} size={11}>Doesn't</Label>
          <Label x={236} y={60} size={10} weight={700}>Overnight camp</Label>
          <Label x={236} y={80} size={10} weight={700}>Kindergarten+ tuition</Label>
          <Label x={236} y={100} size={10} weight={700}>Your child under 19</Label>
        </Card>
        <Label x={160} y={148} size={11}>Employer FSA (up to $5,000) comes off the limit</Label>
        <Label x={160} y={166} size={10} weight={700}>Provider's name and TIN required · MFS generally can't claim</Label>
      </svg>
    ),
    body: [
      "Qualifying expenses include daycare, a babysitter or nanny, day camp and before- or after-school care. Overnight camp, tuition for kindergarten and up, and payments to the taxpayer's spouse, dependent or own child under 19 don't count.",
      "Dependent care benefits excluded through an employer plan (up to $5,000 for 2025) reduce the expense limit dollar for dollar. The provider's name, address and TIN must be reported, and married taxpayers generally must file jointly to claim the credit.",
    ],
    keyPoint: "Counts: daycare, nanny, day camp, before/after-school care. Not: overnight camp, K+ tuition, paying your spouse/dependent/child under 19. Excluded employer benefits (≤ $5,000) reduce the limit. Provider TIN required; MFS generally can't claim.",
  },
  {
    title: "The adoption credit",
    alt: "A family door with a $17,280 sign and a $5,000 refundable slice for 2025. Biscuit, outside, is not eligible.",
    art: (
      <svg {...CARD}>
        <Backdrop w={320} h={180} wall="#efe3f7" floorY={160} />
        <Card x={16} y={20} w={150} h={60} lines={["Up to $17,280", "per child (2025)"]} size={12} color="#fff3c4" />
        <Card x={16} y={90} w={150} h={50} lines={["Up to $5,000", "refundable"]} size={11} color="#d8f0e2" />
        <Card x={180} y={20} w={128} h={70} lines={["Special needs:", "full credit", "regardless of cost"]} size={10} color="#d4ebfa" />
        <Biscuit x={250} y={130} scale={0.36} mood="sad" />
        <Label x={250} y={174} size={9} weight={700}>(beagles not eligible)</Label>
      </svg>
    ),
    body: [
      "For 2025, the adoption credit covers up to $17,280 of qualified adoption expenses per eligible child (under 18, or unable to care for themselves), with up to $5,000 refundable. It phases out for modified AGI from $259,190 to $299,190 and is claimed on Form 8839.",
      "For a domestic adoption, expenses paid before the adoption is final are claimed the year after they're paid; for a foreign adoption, only once it's final. For a child with special needs, the full credit is allowed in the year the adoption becomes final, whatever was spent.",
    ],
    keyPoint: "2025 adoption credit: up to $17,280 per child, up to $5,000 refundable; phase-out $259,190–$299,190 MAGI; Form 8839. Special-needs child: full credit regardless of expenses.",
  },
];

const lesson: Lesson = {
  id: "p1-family-credits",
  part: "part1",
  domainId: "p1d3",
  number: "3.3",
  episode: "Lulu Is Worth… $500?",
  title: "Family credits",
  minutes: 13,
  lawAsOf: "tax year 2025 (rules in effect for 2025 returns, including the 2025 law changes)",
  intro: "The child tax credit, the credit for other dependents, the child and dependent care credit and the adoption credit.",
  previously: "Milo got his 20% treat. Then Dee heard the child tax credit went up, and she's sure Lulu is worth a fortune to Penny.",
  comic,
  cards,
  hook: {
    line: "Qualifying child: $2,200. Everyone else you claim: $500.",
    more: "Care costs count only for a qualifying child under 13 (or someone who can't care for themselves). Adoption: up to $17,280.",
    alt: "Two price tags: $2,200 and $500, hanging from a family tree.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#fde2e4" />
        <Tag x={30} y={50} text="$2,200" rotate={-6} />
        <Tag x={140} y={60} text="$500" color="#d8f0e2" rotate={8} />
        <Lulu x={268} y={60} scale={0.36} mood="smug" />
        <Mark x={240} y={30} text="!" size={22} />
      </svg>
    ),
  },
  traps: [
    { title: "Any child in the house gets $2,200", text: "Only a qualifying child under 17 with a work-valid SSN. A qualifying relative (like a cousin's child) gets the $500 credit." },
    { title: "Turning 17 in December", text: "Age is tested on December 31. A child who is 17 by then gets the $500 credit, not the CTC." },
    { title: "Care credit for any dependent", text: "The care credit needs a qualifying child under 13 or a dependent or spouse who can't care for themselves." },
    { title: "Overnight camp", text: "Day camp counts; overnight camp doesn't." },
  ],
  sources: [
    { key: "i1040s8", section: "Qualifying child for the CTC; Credit for other dependents; Additional child tax credit" },
    { key: "p503", section: "Qualifying Person Test; Work-Related Expense Test; How To Figure the Credit" },
    { key: "i8839", section: "Qualified Adoption Expenses; Special needs child" },
    { key: "obbb", section: "Child tax credit changes" },
  ],
  cases: [
    {
      who: "Lulu",
      title: "What Lulu's worth",
      facts: "Lulu, 9, is the daughter of Penny's cousin Dee. She lived with Penny and Milo all of 2025, they provided all her support, and her only income was $4,000 of dividends. They claim her as a dependent on their joint return.",
      question: "Which credit can Penny and Milo claim for Lulu?",
      choices: ["$2,200 child tax credit", "$500 credit for other dependents", "Both", "Neither"],
      answer: "$500 credit for other dependents",
      why: "A cousin's child isn't in the qualifying-child relationship list, so Lulu is their qualifying relative. Dependents who aren't CTC-qualifying children get the $500 credit for other dependents.",
    },
    {
      who: "Penny",
      title: "Lulu's day camp",
      facts: "Penny and Milo both work and paid $3,000 for Lulu's summer day camp in 2025. Lulu is their qualifying relative and is able to care for herself.",
      question: "How much dependent care credit can they claim for it?",
      choices: ["$600", "$1,050", "$0", "$3,000"],
      answer: "$0",
      why: "A qualifying person must be a qualifying child under 13 (or a spouse or dependent unable to care for themselves). Lulu is a qualifying relative, so her camp doesn't qualify.",
    },
    {
      who: "Ace",
      title: "The Herons' daycare",
      facts: "Ace's clients, a married couple filing jointly with AGI of $90,000, both work and paid $8,000 of daycare for their children, ages 5 and 8. No employer care benefits.",
      question: "What's their dependent care credit?",
      choices: ["$1,200", "$1,600", "$2,100", "$600"],
      answer: "$1,200",
      why: "With two qualifying children, expenses count up to $6,000. At AGI over $43,000, the rate is 20%: $6,000 times 20% = $1,200.",
    },
    {
      who: "Hoot",
      title: "The December birthday",
      facts: "A family's son turned 17 on December 20, 2025. He has an SSN and is their qualifying child and dependent.",
      question: "What credit does he bring for 2025?",
      choices: ["$2,200 child tax credit", "$1,700 additional child tax credit only", "$500 credit for other dependents", "Nothing"],
      answer: "$500 credit for other dependents",
      why: "The CTC requires the child to be under 17 at the end of the year. At 17, he qualifies for the $500 credit for other dependents.",
    },
    {
      who: "Milo",
      title: "The high earners",
      facts: "Milo's college friend and spouse file jointly with modified AGI of $410,000 and two qualifying children under 17.",
      question: "What's their child tax credit for 2025?",
      choices: ["$4,400", "$3,900", "$4,000", "$0"],
      answer: "$3,900",
      why: "$2,200 times 2 is $4,400. MAGI is $10,000 over $400,000, so the credit drops $50 per $1,000: $500. $4,400 minus $500 is $3,900.",
    },
    {
      who: "Penny",
      title: "The FSA and the credit",
      facts: "Penny's coworker excluded $5,000 from wages through her employer's dependent care FSA and paid $7,000 of daycare for her two children under 13.",
      question: "How much of the daycare can she still use for the credit?",
      choices: ["$7,000", "$6,000", "$2,000", "$1,000"],
      answer: "$1,000",
      why: "The $6,000 limit for two or more children is reduced by the $5,000 of excluded employer benefits, leaving $1,000.",
    },
  ],
  quizTopics: ["Child tax credit", "Child and dependent care credit"],
  quizBrief: "Family credits for 2025: child tax credit $2,200, ACTC $1,700, phase-out, $500 credit for other dependents, child and dependent care credit rules and limits, adoption credit $17,280",
};

export default lesson;

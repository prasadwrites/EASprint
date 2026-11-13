import { Ace, Arrow, Backdrop, Biscuit, Cash, Hoot, House, Label, Milo, Penny, StockCert, Window } from "../cast";
import type { Lesson } from "../lesson";
import { Bowl, Doc, Heart, IdCard, Piggy, Pop, Stamp, Star } from "../props";

// Part 1, topic 1.3: dependents and the family. Dependency rules and the kiddie tax. Written to tax law through
// December 31, 2025 from Publication 501 and the 2025 Instructions for Forms 8615 and 8814.

const INK = "#17202c";
const PANEL = { viewBox: "0 0 320 220", preserveAspectRatio: "xMidYMax meet" } as const;
const CARD = { viewBox: "0 0 320 180" } as const;

function Chalkboard({ x, y, lines }: { x: number; y: number; lines: string[] }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={150} height={84} rx={4} fill="#2e4a3f" stroke="#8a5a3c" strokeWidth={6} />
      {lines.map((l, i) => (
        <text key={l} x={75} y={30 + i * 24} fontSize={i ? 11 : 16} fontWeight={700} textAnchor="middle" fill="#f4f1e8" fontFamily="Bricolage Grotesque, system-ui, sans-serif">
          {l}
        </text>
      ))}
    </g>
  );
}

function Phone() {
  return (
    <g>
      <rect x={-8} y={-14} width={16} height={28} rx={3} fill="#2b3550" stroke={INK} strokeWidth={2} />
      <rect x={-5} y={-10} width={10} height={18} fill="#7cc0f2" />
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Biscuit sits on Ace's desk with a paw on a tax form. Penny presents him proudly.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <rect x={110} y={150} width={140} height={10} fill="#a8774f" stroke={INK} strokeWidth={2} />
        <Biscuit x={180} y={110} scale={0.42} mood="excited" />
        <Doc x={214} y={140} scale={0.34} rotate={8} label="1040" />
        <Penny x={66} y={128} scale={0.76} mood="excited" pose="point" />
        <Ace x={268} y={128} scale={0.72} mood="thinking" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Ace, can I claim Biscuit? He eats more than Milo.", x: 2, y: 2, w: 44, tail: "down-left" },
      { who: "Ace", text: "Penny, dependents have to be people. With taxpayer ID numbers. Biscuit has neither.", x: 50, y: 2, w: 48, tail: "down-right" },
    ],
  },
  {
    alt: "Milo leans on the doorframe, hopeful. Ace counts on his fingers.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Milo x={80} y={140} scale={0.68} mood="excited" pose="up" />
        <Ace x={232} y={128} scale={0.78} mood="happy" pose="point" flip />
        <Star x={130} y={74} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "So I'm the dependent? Do I get a salary?", x: 2, y: 2, w: 42, tail: "down-left" },
      { who: "Ace", text: "Milo, you're Penny's qualifying child: her nephew, under 19, living here, and you don't pay for yourself.", x: 48, y: 2, w: 50, tail: "down-right" },
    ],
  },
  {
    alt: "Ace points to a chalkboard reading R A R S J: Rabbits And Raccoons Share Jellybeans. Penny is confused.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Chalkboard x={150} y={84} lines={["R · A · R · S · J", "Rabbits And Raccoons", "Share Jellybeans"]} />
        <Ace x={84} y={128} scale={0.76} mood="happy" pose="point" />
        <Pop x={286} y={70} kind="question" />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Relationship, Age, Residency, Support, Joint return. Rabbits And Raccoons Share Jellybeans.", x: 2, y: 2, w: 56, tail: "down-left" },
      { who: "Penny", text: "(offstage) Are there raccoons in tax law?", x: 60, y: 4, w: 38, tail: "down-right" },
    ],
  },
  {
    alt: "Penny on the phone with her dad. Hoot leans in the window with a stamp.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Window x={196} y={80} w={104} h={90} />
        <g clipPath="url(#win13)">
          <defs>
            <clipPath id="win13">
              <rect x={196} y={80} width={104} height={90} />
            </clipPath>
          </defs>
          <Hoot x={248} y={140} scale={0.66} mood="stern" />
        </g>
        <rect x={196} y={80} width={104} height={90} fill="none" stroke={INK} strokeWidth={3} />
        <Penny x={90} y={128} scale={0.78} mood="happy" pose="hold" holding={<Phone />} />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Dad earned $6,000 at the hardware store, and I pay most of his bills. He's my dependent!", x: 2, y: 2, w: 50, tail: "down-left" },
      { who: "Hoot", text: "Hoo. Gross income must be under $5,200. Denied.", x: 56, y: 8, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Milo dances with a stock certificate and a piggy bank. Ace delivers bad news.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={88} y={136} scale={0.7} mood="excited" pose="up" />
        <StockCert x={50} y={88} scale={0.8} rotate={-18} />
        <Piggy x={150} y={186} scale={0.7} />
        <Ace x={246} y={128} scale={0.76} mood="smug" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "My dividends were $4,000 this year! I'm basically a hedge fund!", x: 2, y: 2, w: 46, tail: "down-left" },
      { who: "Ace", text: "Then the kiddie tax says: everything over $2,700 is taxed at your parent's rate.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Biscuit sits sadly by his bowl under a DENIED stamp. Penny comforts him.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#f3eefb" />
        <Penny x={110} y={128} scale={0.78} mood="worried" pose="hold" />
        <Biscuit x={186} y={150} scale={0.42} mood="worried" />
        <Bowl x={248} y={190} scale={1.1} />
        <Stamp x={248} y={110} text="DENIED" color="#a8321f" rotate={-10} />
        <Heart x={150} y={86} scale={0.9} />
      </svg>
    ),
    bubbles: [
      { who: "Biscuit", text: "Woof. (Translation: I'd like to speak to the manager.)", x: 40, y: 2, w: 48, tail: "down-right" },
      { who: "Penny", text: "You're my dependent in my heart, Biscuit.", x: 2, y: 22, w: 36, tail: "down-left" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Two doors to dependency",
    alt: "Two doors: Qualifying child and Qualifying relative. Above them a sign lists the tests everyone must pass.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <rect x={40} y={60} width={90} height={110} rx={4} fill="#d8f0e2" stroke={INK} strokeWidth={2.5} />
        <rect x={190} y={60} width={90} height={110} rx={4} fill="#dfeaf6" stroke={INK} strokeWidth={2.5} />
        <Label x={85} y={96} size={13}>
          Qualifying
        </Label>
        <Label x={85} y={114} size={13}>
          child
        </Label>
        <Label x={235} y={96} size={13}>
          Qualifying
        </Label>
        <Label x={235} y={114} size={13}>
          relative
        </Label>
        <circle cx={120} cy={120} r={4} fill={INK} />
        <circle cx={270} cy={120} r={4} fill={INK} />
        <Label x={160} y={24} size={12}>
          First, everyone: not a dependent yourself,
        </Label>
        <Label x={160} y={42} size={12}>
          no joint return, citizen or resident
        </Label>
      </svg>
    ),
    body: [
      "A dependent is either a qualifying child or a qualifying relative. Three tests apply to both: you can't claim anyone if you can be claimed as someone else's dependent; a married dependent can't file a joint return (unless it's only to claim a refund); and the dependent must be a U.S. citizen, national or resident, or a resident of Canada or Mexico.",
      "Every dependent needs a taxpayer ID number (SSN, ITIN or ATIN). There's no dollar exemption for dependents, but they unlock head of household status and credits.",
    ],
    keyPoint: "Dependent = qualifying child OR qualifying relative. All dependents: taxpayer isn't a dependent; no joint return (except refund-only); citizen/national/resident or resident of Canada/Mexico; needs a TIN.",
  },
  {
    title: "Qualifying child: Rabbits And Raccoons Share Jellybeans",
    alt: "Five jellybeans labeled Relationship, Age, Residency, Support and Joint return, with a rabbit and a raccoon.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        {["Relationship", "Age", "Residency", "Support", "Joint"].map((t, i) => (
          <g key={t}>
            <ellipse cx={40 + i * 60} cy={80} rx={26} ry={16} fill={["#e8505b", "#f2c230", "#7bc47f", "#5aa9e6", "#b98ae0"][i]} stroke={INK} strokeWidth={2.5} />
            <Label x={40 + i * 60} y={85} size={16} color="#fff">
              {t[0]}
            </Label>
            <Label x={40 + i * 60} y={118} size={10}>
              {t}
            </Label>
          </g>
        ))}
        <Label x={160} y={40} size={14}>
          Rabbits And Raccoons Share Jellybeans
        </Label>
        <Label x={160} y={148} size={11} weight={700}>
          Under 19, or under 24 if a full-time student,
        </Label>
        <Label x={160} y={164} size={11} weight={700}>
          or any age if permanently disabled
        </Label>
      </svg>
    ),
    body: [
      "Relationship: your child, stepchild, foster child, sibling, half or step sibling, or a descendant of any of them (a grandchild, niece or nephew).",
      "Age: under 19 at the end of the year, or under 24 and a full-time student for some part of five months, and younger than you (and your spouse, if filing jointly). Any age if permanently and totally disabled.",
      "Residency: lived with you more than half the year. Temporary absences (school, illness, military) count as time at home. Support: the child didn't provide more than half of their own support. Joint return: the child doesn't file jointly, except only to claim a refund.",
    ],
    keyPoint: "QC (RARSJ): Relationship (incl. sibling, niece/nephew); Age (< 19, < 24 FT student, any age disabled; younger than you); Residency > half year; child didn't provide > half own support; no joint return.",
  },
  {
    title: "Qualifying relative: not just relatives",
    alt: "A friend living in the household all year and a parent living elsewhere both qualify on the relationship test. A scale shows gross income under $5,200.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#dfeaf6" />
        <House x={80} y={92} scale={1.2} />
        <Label x={80} y={140} size={11}>
          Household member all year
        </Label>
        <Label x={80} y={156} size={11}>
          OR a listed relative
        </Label>
        <rect x={190} y={50} width={100} height={60} rx={6} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <Label x={240} y={76} size={12}>
          Gross income
        </Label>
        <Label x={240} y={96} size={16} color="#1d7a49">
          {"< $5,200"}
        </Label>
        <Label x={240} y={136} size={12}>
          You pay
        </Label>
        <Label x={240} y={154} size={14} color="#1d7a49">
          {"> half support"}
        </Label>
      </svg>
    ),
    body: [
      "A qualifying relative isn't anyone's qualifying child, and either lives with you all year as a member of your household or is a listed relative (parent, grandparent, sibling, aunt, uncle, niece, nephew, child or descendant, step-relatives and in-laws) who doesn't need to live with you.",
      "Their gross income for 2025 must be less than $5,200, and you must provide more than half of their total support for the year.",
    ],
    keyPoint: "QR: not anyone's QC; household member all year OR listed relative (parents and in-laws needn't live with you); gross income < $5,200 (2025); you provide > half support.",
  },
  {
    title: "The support test and the support agreement",
    alt: "A pie of support costs split among four siblings: 40%, 30%, 20% and 10%. Together they pass 50%.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <circle cx={90} cy={92} r={60} fill="#e8edf5" stroke={INK} strokeWidth={2.5} />
        <path d="M90,92 L90,32 A60,60 0 0 1 147,111 Z" fill="#7cc0f2" stroke={INK} strokeWidth={2} />
        <path d="M90,92 L147,111 A60,60 0 0 1 72,149 Z" fill="#f2c230" stroke={INK} strokeWidth={2} />
        <path d="M90,92 L72,149 A60,60 0 0 1 33,73 Z" fill="#7bc47f" stroke={INK} strokeWidth={2} />
        <Label x={230} y={52} size={13}>
          Form 2120
        </Label>
        <Label x={230} y={76} size={11} weight={700}>
          Group gives over 50%
        </Label>
        <Label x={230} y={96} size={11} weight={700}>
          Claimer gave over 10%
        </Label>
        <Label x={230} y={116} size={11} weight={700}>
          Others over 10% sign
        </Label>
        <Label x={230} y={136} size={11} weight={700}>
          statements not to claim
        </Label>
      </svg>
    ),
    body: [
      "Support is everything spent on the person: food, lodging (at its fair rental value), clothing, education, medical care, travel and recreation. Compare what you provided with the total from all sources, including the person's own money spent on themselves.",
      "When no one provides more than half but a group does, a multiple support agreement lets one member claim the person. The group must provide over half; the claimer must provide over 10%; and every other member who provided over 10% signs a statement agreeing not to claim. The claimer files Form 2120.",
    ],
    keyPoint: "Support counts lodging at fair rental value. Multiple support agreement (Form 2120): group > 50%, claimer > 10%, other > 10% contributors sign waivers.",
  },
  {
    title: "Tie-breakers: when two people can claim the same child",
    alt: "A tug of war over a child. Parent beats non-parent; between parents, more nights wins; then higher AGI.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <path d="M50,70 H270" stroke="#8a5a3c" strokeWidth={5} />
        <Milo x={160} y={40} scale={0.3} mood="worried" />
        <rect x={6} y={52} width={66} height={36} rx={6} fill="#d8f0e2" stroke={INK} strokeWidth={2.5} />
        <Label x={39} y={75} size={13} color="#1d7a49">
          Parent
        </Label>
        <Star x={39} y={42} />
        <rect x={248} y={52} width={66} height={36} rx={6} fill="#e8edf5" stroke={INK} strokeWidth={2.5} />
        <Label x={281} y={68} size={11}>
          Non-
        </Label>
        <Label x={281} y={82} size={11}>
          parent
        </Label>
        {["1. Parent beats non-parent", "2. Two parents: more nights wins", "3. Still tied: higher AGI wins", "4. No parent claims: non-parent needs higher AGI"].map((t, i) => (
          <Label key={t} x={14} y={112 + i * 17} size={11} anchor="start" weight={700}>
            {t}
          </Label>
        ))}
      </svg>
    ),
    body: [
      "If a child is the qualifying child of more than one person, only one can claim the child. A parent wins over a non-parent. Between two parents who don't file jointly, the parent the child lived with longer wins; if the time is equal, the parent with the higher AGI.",
      "If no parent can claim the child, the person with the highest AGI wins. If a parent could claim but doesn't, a non-parent can claim only if their AGI is higher than that of any parent who could.",
    ],
    keyPoint: "Tie-breaker: parent > non-parent; parents → more nights, then higher AGI; no parent eligible → highest AGI; parent doesn't claim → non-parent needs higher AGI than any eligible parent.",
  },
  {
    title: "Divorced parents: Form 8332 moves the claim, not the crown",
    alt: "Form 8332 hands the child's dependency claim to the noncustodial parent. The custodial parent keeps head of household, the earned income credit and the dependent care credit.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3eefb" />
        <Doc x={160} y={72} scale={0.85} label="8332" band="#b98ae0" />
        <Label x={56} y={36} size={12}>
          Custodial keeps
        </Label>
        {["HOH", "EITC", "Dependent care"].map((t, i) => (
          <Label key={t} x={56} y={60 + i * 18} size={11} color="#1d7a49">
            {`✓ ${t}`}
          </Label>
        ))}
        <Label x={264} y={36} size={12}>
          Noncustodial gets
        </Label>
        {["The dependent", "Child tax credit", "Other dep. credit"].map((t, i) => (
          <Label key={t} x={264} y={60 + i * 18} size={11} color="#1d7a49">
            {`✓ ${t}`}
          </Label>
        ))}
        <Arrow d="M190,120 Q220,134 246,118" width={3} />
        <Label x={160} y={166} size={11} weight={700}>
          Custodial parent = more nights during the year
        </Label>
      </svg>
    ),
    body: [
      "For divorced or separated parents (or parents who lived apart the last six months of the year), the custodial parent, the one the child lived with for more nights, normally claims the child.",
      "The custodial parent can release the claim to the noncustodial parent on Form 8332, which the noncustodial parent attaches to their return. That moves the dependency claim and the child tax credit or credit for other dependents. It does not move head of household status, the earned income credit or the child and dependent care credit, which stay with the custodial parent.",
    ],
    keyPoint: "Form 8332: custodial (more nights) releases dependency + CTC/ODC to the noncustodial parent. HOH, EITC and dependent care credit stay with the custodial parent.",
  },
  {
    title: "When the dependent files: a smaller standard deduction",
    alt: "Milo's standard deduction: the bigger of $1,350 or his earned income plus $450.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Milo x={70} y={70} scale={0.5} mood="thinking" />
        <rect x={140} y={36} width={160} height={100} rx={8} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <Label x={220} y={62} size={13}>
          The bigger of
        </Label>
        <Label x={220} y={86} size={16} color="#1d7a49">
          $1,350
        </Label>
        <Label x={220} y={104} size={12}>
          or
        </Label>
        <Label x={220} y={124} size={13} color="#1d7a49">
          earned income + $450
        </Label>
        <Label x={160} y={164} size={11} weight={700}>
          (never more than the regular $15,750)
        </Label>
      </svg>
    ),
    body: [
      "Someone who can be claimed as a dependent gets a limited standard deduction for 2025: the larger of $1,350 or their earned income plus $450, but not more than the regular amount for their status.",
      "A single dependent under 65 must file if unearned income was over $1,350, earned income was over $15,750, or gross income was over the larger of $1,350 or earned income (up to $15,300) plus $450.",
    ],
    keyPoint: "Dependent's 2025 std deduction = greater of $1,350 or earned income + $450 (max $15,750). Must file if unearned > $1,350, earned > $15,750, or gross > greater of $1,350 or earned (≤ $15,300) + $450.",
  },
  {
    title: "The kiddie tax ladder",
    alt: "A three-step ladder of unearned income: the first $1,350 is tax free, the next $1,350 is taxed at the child's rate, and everything over $2,700 at the parent's rate.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <path d="M60,170 L100,20 M140,170 L180,20" stroke="#8a5a3c" strokeWidth={6} />
        {[
          [150, "$0 to $1,350: free", "#e3f4ea"],
          [104, "Next $1,350: child's rate", "#fbf0d9"],
          [58, "Over $2,700: parent's rate", "#fbe5e1"],
        ].map(([y, t, c]) => (
          <g key={t as string}>
            <path d={`M${68 + (170 - (y as number)) * 0.26},${y} H${148 + (170 - (y as number)) * 0.26}`} stroke="#8a5a3c" strokeWidth={5} />
            <rect x={168} y={(y as number) - 16} width={148} height={26} rx={4} fill={c as string} stroke={INK} strokeWidth={1.8} />
            <Label x={242} y={(y as number) + 2} size={10.5}>
              {t}
            </Label>
          </g>
        ))}
        <Milo x={118} y={40} scale={0.26} mood="shocked" pose="up" />
      </svg>
    ),
    body: [
      "The kiddie tax (Form 8615) taxes a child's unearned income over $2,700 for 2025 (interest, dividends, capital gains and the like) at the parent's rate, if that's higher. Earned income, like Milo's lemonade profit, is always taxed at the child's own rate.",
      "It applies if the child had more than $2,700 of unearned income, must file, doesn't file jointly, has at least one living parent, and was under 18 at the end of 2025, or 18, or a full-time student aged 19 to 23, whose earned income wasn't more than half of their support.",
    ],
    keyPoint: "Kiddie tax (Form 8615), 2025: unearned income over $2,700 taxed at parent's rate. Applies to under 18; age 18 or FT student 19–23 if earned income ≤ half of support. Earned income never kiddie-taxed.",
  },
  {
    title: "Or put it on the parent's return: Form 8814",
    alt: "Milo's small envelope of interest and dividends slides onto Penny's bigger return. A sign says under $13,500, interest and dividends only.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <Doc x={240} y={92} scale={1.5} label="1040" sub="Parent's return" />
        <Doc x={90} y={92} scale={0.9} label="8814" band="#1d7a49" />
        <Arrow d="M130,92 H190" width={4} />
        <Cash x={90} y={150} scale={0.9} />
        <Label x={90} y={30} size={11}>
          Interest + dividends only
        </Label>
        <Label x={90} y={46} size={11} color="#1d7a49">
          {"Child's gross < $13,500"}
        </Label>
      </svg>
    ),
    body: [
      "A parent can elect to report a child's income on the parent's own return with Form 8814, so the child doesn't file. For 2025 the child must be under 19 (or under 24 if a full-time student), have income only from interest and dividends (including capital gain distributions and Alaska Permanent Fund dividends), have gross income under $13,500, and have no estimated tax payments or backup withholding.",
      "The election can cost more than a separate return, because the child's income raises the parent's AGI.",
    ],
    keyPoint: "Form 8814 (2025): parent reports child's interest/dividends if child < 19 (or FT student < 24), gross income < $13,500, only interest/dividends, no estimates or withholding. Raises parent's AGI.",
  },
];

const lesson: Lesson = {
  id: "p1-dependents",
  part: "part1",
  domainId: "p1d1",
  number: "1.3",
  episode: "Biscuit for Dependent",
  title: "Dependents and the family",
  minutes: 15,
  lawAsOf: "tax year 2025 (law through December 31, 2025)",
  intro: "Who counts as a dependent decides filing status, credits and even how a child's investment income is taxed. Biscuit has filed an appeal.",
  comic,
  cards,
  hook: {
    line: "Rabbits And Raccoons Share Jellybeans. Relatives earn under $5,200. Kids' unearned over $2,700 rides on Mom's rate.",
    more: "Two doors: qualifying child (RARSJ) or qualifying relative (not a QC, related or household all year, under $5,200, you pay over half). Pets: no door.",
    alt: "A rabbit and a raccoon sharing a bag of jellybeans.",
    art: (
      <svg viewBox="0 0 320 120">
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <g transform="translate(90 64)">
          <ellipse cx={0} cy={18} rx={26} ry={22} fill="#eceae4" stroke={INK} strokeWidth={2.5} />
          <circle cx={0} cy={-10} r={18} fill="#eceae4" stroke={INK} strokeWidth={2.5} />
          <ellipse cx={-8} cy={-38} rx={6} ry={18} fill="#eceae4" stroke={INK} strokeWidth={2.5} />
          <ellipse cx={8} cy={-38} rx={6} ry={18} fill="#eceae4" stroke={INK} strokeWidth={2.5} />
          <circle cx={-6} cy={-12} r={2.5} fill={INK} />
          <circle cx={6} cy={-12} r={2.5} fill={INK} />
        </g>
        <g transform="translate(230 64)">
          <ellipse cx={0} cy={18} rx={26} ry={22} fill="#8f8f96" stroke={INK} strokeWidth={2.5} />
          <circle cx={0} cy={-10} r={18} fill="#8f8f96" stroke={INK} strokeWidth={2.5} />
          <path d="M-16,-14 Q0,-2 16,-14 L16,-6 Q0,6 -16,-6 Z" fill={INK} />
          <circle cx={-7} cy={-10} r={2.5} fill="#fff" />
          <circle cx={7} cy={-10} r={2.5} fill="#fff" />
        </g>
        {["#e8505b", "#f2c230", "#7bc47f", "#5aa9e6", "#b98ae0"].map((c, i) => (
          <ellipse key={c} cx={136 + i * 12} cy={96 - (i % 2) * 6} rx={6} ry={4} fill={c} stroke={INK} strokeWidth={1.2} />
        ))}
      </svg>
    ),
  },
  traps: [
    {
      title: "The nephew isn't “just a relative”",
      text: "A niece, nephew or grandchild meets the qualifying child relationship test. Don't send them through the qualifying relative door.",
    },
    {
      title: "Gross income, not taxable income",
      text: "The $5,200 qualifying relative limit counts gross income (wages, rents, taxable interest), not what's left after deductions. Nontaxable Social Security usually doesn't count.",
    },
    {
      title: "Form 8332 hands over the dependent, not the status",
      text: "The noncustodial parent with a signed Form 8332 gets the child tax credit, but not head of household or the earned income credit.",
    },
    {
      title: "Kiddie-taxing the lemonade money",
      text: "Earned income from a job or business is taxed at the child's own rate. Only unearned income over $2,700 hits the parent's rate.",
    },
  ],
  sources: [
    { key: "p501", section: "Dependents; Qualifying Child; Qualifying Relative; Tiebreaker rules; Multiple Support Agreement; Standard Deduction for Dependents" },
    { key: "i8615", section: "Who Must File; Line 2 ($2,700 for 2025)" },
    { key: "i8814", section: "Who May Make the Election ($13,500 for 2025)" },
    { key: "i1040s8", section: "Children of divorced or separated parents; Form 8332" },
  ],
  quizTopics: ["Dependents", "Kiddie tax"],
  game: {
    title: "Who's Your Dependent?",
    setup: "Hypothetical Hour in Ledger Falls: the cast pitch “what if” family situations. Answer as Ace. Right answers earn EA stamps; misses go in Hoot's notebook. Biscuit will keep trying.",
    rounds: [
      {
        who: "Biscuit",
        prompt: "Woof. Penny pays 100% of my food, vet bills and housing, and I've lived with her all year. Am I her qualifying relative?",
        answer: "No. A dependent must be a person with a taxpayer ID number",
        wrong: [
          ["Yes, because he lived in the household all year and Penny paid all his support", "Those tests only apply to people. A pet can't be a dependent."],
          ["Yes, if his income is under $5,200", "Biscuit has no income and isn't a person, so the tests never start."],
          ["Only if Penny files as head of household", "Filing status doesn't make a pet a dependent."],
        ],
        rule: "Dependents are individuals: a qualifying child or qualifying relative, each with an SSN, ITIN or ATIN.",
      },
      {
        who: "Milo",
        prompt: "Say I'm 20, a full-time student, and I live with Aunt Penny except when I'm at college. I don't pay more than half my own support. Am I her qualifying child?",
        answer: "Yes: nephew, under 24 and a student, school is a temporary absence, and support passes",
        wrong: [
          ["No, because he's over 19", "Full-time students qualify until they turn 24."],
          ["No, because he lives at college", "Time away at school is a temporary absence and counts as living at home."],
          ["No, because only sons and daughters can be qualifying children", "Siblings and their descendants (nieces and nephews) count too."],
        ],
        rule: "Qualifying child: relationship includes nieces and nephews; under 24 if a full-time student; temporary absences count as time at home.",
      },
      {
        who: "Penny",
        prompt: "My dad earned $6,000 in wages in 2025 and I provided 70% of his support. Can I claim him as my qualifying relative?",
        answer: "No. His gross income is $5,200 or more",
        wrong: [
          ["Yes, because she provided more than half his support", "Support is one test. He also has to have gross income under $5,200."],
          ["Yes, because a parent doesn't have to live with you", "True, but the gross income test still applies."],
          ["Only if he moves in with her", "Living together isn't required for a parent. The income test is what fails."],
        ],
        rule: "A qualifying relative's gross income must be under $5,200 for 2025, and you must provide more than half their support.",
      },
      {
        who: "Milo",
        prompt: "Suppose I'm 15 with $4,000 of dividends and no other income. How much is taxed at my parent's rate under the kiddie tax?",
        answer: "$1,300",
        wrong: [
          ["$4,000", "The first $2,700 isn't taxed at the parent's rate: $1,350 is free and the next $1,350 is at the child's rate."],
          ["$2,650", "That subtracts only $1,350. The parent's rate applies above $2,700."],
          ["$0, because dividends are taxed at capital gains rates", "Qualified dividends get lower rates, but they're still unearned income for the kiddie tax."],
        ],
        rule: "For 2025, a child's unearned income over $2,700 is taxed at the parent's rate (Form 8615).",
      },
      {
        who: "Hoot",
        prompt: "Hoo. Divorced parents. The child lived with Mom 220 nights and with Dad the rest. Mom signs Form 8332 for Dad. Who may file as head of household based on the child?",
        answer: "Mom, the custodial parent",
        wrong: [
          ["Dad, because Form 8332 gives him the child", "Form 8332 releases the dependency claim and the child tax credit, not head of household."],
          ["Both of them", "Only one person can use a child as the HOH qualifying person, and it's the parent the child lived with."],
          ["Neither, once Form 8332 is signed", "The custodial parent keeps HOH eligibility."],
        ],
        rule: "Form 8332 moves the dependency claim and CTC/ODC to the noncustodial parent. HOH, EITC and the dependent care credit stay with the custodial parent.",
      },
      {
        who: "Ace",
        prompt: "Milo lives all year with his mom and Aunt Penny in one house. Both could claim him and both try to. Who wins?",
        answer: "His mom, because a parent beats a non-parent",
        wrong: [
          ["Penny, if her AGI is higher", "AGI decides only between parents, or when no parent claims the child."],
          ["Whoever files first", "The IRS uses the tie-breaker rules, not filing order."],
          ["They split him and each claims half", "A child can be claimed by only one person."],
        ],
        rule: "Tie-breaker: a parent wins over a non-parent. A non-parent can claim only if no parent does and the non-parent's AGI is higher than any eligible parent's.",
      },
    ],
  },
  stinger: {
    alt: "Biscuit wears a tiny tie and holds a sign that says Will Fetch For Dependency. Hoot shakes his head.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#dff1fb" floor="#cde8b8" />
        <Biscuit x={110} y={120} scale={0.6} mood="excited" />
        <path d="M104,140 l6,-4 l6,4 l-3,16 h-6 Z" fill="#e8505b" stroke={INK} strokeWidth={1.6} />
        <rect x={150} y={128} width={78} height={38} rx={3} fill="#fff" stroke={INK} strokeWidth={2} />
        <Label x={189} y={144} size={9}>
          WILL FETCH FOR
        </Label>
        <Label x={189} y={158} size={9}>
          DEPENDENCY
        </Label>
        <Hoot x={272} y={128} scale={0.56} mood="smug" />
        <IdCard x={44} y={176} scale={0.8} title="DOG LICENSE" line="NOT A TIN" color="#fbe5d6" />
      </svg>
    ),
    bubbles: [{ who: "Hoot", text: "Hoo. A dog license is not a taxpayer ID, Biscuit.", x: 46, y: 2, w: 52, tail: "down-right" }],
  },
  deck: {
    topic: "Dependents, the qualifying child and qualifying relative tests, and the kiddie tax",
    rules:
      "qualifying child tests, qualifying relative tests ($5,200 gross income for 2025), support and multiple support agreements, tie-breaker rules, divorced parents and Form 8332, the dependent's standard deduction and filing requirement, the kiddie tax ($2,700 for 2025) and the Form 8814 election",
  },
};

export default lesson;

import { Ace, Arrow, Backdrop, Biscuit, Hoot, House, Label, Milo, Penny, Window } from "../cast";
import type { Lesson } from "../lesson";
import { CalendarPage,Doc, Globe, IdCard, Magnifier, Plane, Pop, Sign, Star, Whoosh } from "../props";

// Part 1, topic 1.1: getting started. Return prep steps, prior-year returns, and the taxpayer's biographical and
// residency data. Written to tax law through December 31, 2025 from Publications 17, 501 and 519, the
// substantial presence test page and the ITIN page.

const INK = "#17202c";
const PANEL = { viewBox: "0 0 320 220", preserveAspectRatio: "xMidYMax meet" } as const;
const CARD = { viewBox: "0 0 320 180" } as const;

function MovingBox({ label }: { label: string }) {
  return (
    <g>
      <rect x={-26} y={-18} width={52} height={36} fill="#d9a066" stroke={INK} strokeWidth={2} />
      <path d="M-26,-18 L0,-8 L26,-18" fill="none" stroke={INK} strokeWidth={1.5} />
      <Label x={0} y={10} size={8}>
        {label}
      </Label>
    </g>
  );
}

function TreasureMap() {
  return (
    <g>
      <path d="M-30,-22 L30,-22 L26,22 L-34,22 Z" fill="#f4e2b8" stroke={INK} strokeWidth={2} />
      <path d="M-24,12 q10,-14 20,-4 q10,10 22,-10" fill="none" stroke="#a8321f" strokeWidth={2} strokeDasharray="4 3" />
      <path d="M12,-12 l8,8 M20,-12 l-8,8" stroke="#a8321f" strokeWidth={3} strokeLinecap="round" />
      <Label x={-6} y={-8} size={8}>
        2024 1040
      </Label>
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Moving day. Penny carries a box labeled TAX STUFF, Milo carries a box, and Biscuit the beagle trots behind. Ace waves from next door.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#dff1fb" floor="#cde8b8" />
        <House x={272} y={150} scale={0.9} />
        <Whoosh x={28} y={150} />
        <Penny x={78} y={128} scale={0.74} mood="excited" pose="hold" holding={<MovingBox label="TAX STUFF?" />} />
        <Milo x={140} y={140} scale={0.6} mood="smug" pose="hold" holding={<MovingBox label="MY STOCKS" />} />
        <Biscuit x={176} y={178} scale={0.3} mood="excited" />
        <Ace x={236} y={130} scale={0.7} mood="happy" pose="wave" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Hi neighbor! I'm Penny Pocket. That's my nephew Milo, and that's Biscuit. Are you the tax guy?", x: 2, y: 2, w: 56, tail: "down-left" },
      { who: "Ace", text: "Ace Okafor, enrolled agent. “Tax guy” is fine.", x: 61, y: 6, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Penny dumps the box on Ace's desk: receipts, a sock, a lemon and a W-2 fly out. Biscuit has a form in his mouth.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <rect x={150} y={150} width={150} height={10} fill="#a8774f" stroke={INK} strokeWidth={2} />
        <Doc x={190} y={124} scale={0.5} rotate={-14} label="W-2" />
        <Doc x={232} y={118} scale={0.5} rotate={12} label="1099" band="#1d7a49" />
        <ellipse cx={270} cy={142} rx={12} ry={8} fill="#fff7a8" stroke={INK} strokeWidth={2} />
        <path d="M150,104 q8,-10 16,0 l-2,14 h-12 Z" fill="#e8505b" stroke={INK} strokeWidth={2} />
        <Pop x={238} y={92} kind="bang" />
        <Penny x={84} y={128} scale={0.76} mood="excited" pose="up" />
        <Biscuit x={140} y={182} scale={0.3} mood="happy" />
        <Doc x={150} y={184} scale={0.22} rotate={-30} label="W-2" />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Here's everything! Can you just… do it?", x: 2, y: 3, w: 44, tail: "down-left" },
      { who: "Ace", text: "Penny, we do this in order: interview, gather, then prepare. Also, is that a sock?", x: 50, y: 3, w: 48, tail: "down" },
    ],
  },
  {
    alt: "Ace holds last year's tax return like a treasure map with an X on it. Penny wears a paper pirate hat.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Ace x={92} y={128} scale={0.78} mood="happy" pose="hold" holding={<TreasureMap />} />
        <Penny x={232} y={128} scale={0.78} mood="excited" flip />
        <path d="M204,94 L232,66 L260,94 Z" fill="#fff" stroke={INK} strokeWidth={2} />
        <path d="M222,84 l20,0" stroke={INK} strokeWidth={2} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Step one: last year's return. It's a treasure map. Carryovers, last year's AGI, refunds applied…", x: 2, y: 2, w: 56, tail: "down-left" },
      { who: "Penny", text: "X marks the refund?!", x: 62, y: 10, w: 34, tail: "down-right" },
    ],
  },
  {
    alt: "Penny shows off an engagement ring next to a calendar page for December 31. Ace raises a finger.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <CalendarPage x={160} y={118} top="DEC" big="31" scale={1.1} />
        <Pop x={152} y={78} kind="stars" />
        <Penny x={78} y={128} scale={0.78} mood="excited" pose="wave" />
        <Ace x={244} y={128} scale={0.78} mood="thinking" pose="point" flip />
      </svg>
    ),
    bubbles: [
      { who: "Penny", text: "Big news: I got engaged on New Year's Eve!", x: 2, y: 2, w: 44, tail: "down-left" },
      { who: "Ace", text: "Congratulations! Engaged isn't married. On December 31 you were single, so you're single all year.", x: 50, y: 2, w: 48, tail: "down-right" },
    ],
  },
  {
    alt: "Hoot appears at the window with a magnifying glass. Milo points at Biscuit.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Window x={200} y={84} w={100} h={84} />
        <g clipPath="url(#win11)">
          <defs>
            <clipPath id="win11">
              <rect x={200} y={84} width={100} height={84} />
            </clipPath>
          </defs>
          <Hoot x={250} y={140} scale={0.62} mood="smug" />
        </g>
        <rect x={200} y={84} width={100} height={84} fill="none" stroke={INK} strokeWidth={3} />
        <Magnifier x={208} y={128} scale={0.9} rotate={0} />
        <Milo x={74} y={140} scale={0.64} mood="happy" pose="point" />
        <Biscuit x={148} y={178} scale={0.3} mood="shocked" />
      </svg>
    ),
    bubbles: [
      { who: "Hoot", text: "Hoo-hoo. And is everyone on this return a U.S. citizen or resident?", x: 50, y: 2, w: 48, tail: "down-right" },
      { who: "Milo", text: "Biscuit was born in Ohio. He's very resident.", x: 2, y: 6, w: 44, tail: "down-left" },
    ],
  },
  {
    alt: "Ace points to a sign: Name plus number must match Social Security. Penny holds a card and looks shocked.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Sign x={160} y={110} text="NAME + SSN = MATCH" w={130} />
        <Ace x={64} y={128} scale={0.76} mood="happy" pose="point" />
        <Penny x={258} y={128} scale={0.76} mood="shocked" pose="hold" flip holding={<IdCard x={0} y={0} scale={0.6} title="SOCIAL SECURITY" line="PENNY P." />} />
      </svg>
    ),
    bubbles: [
      { who: "Ace", text: "Every name and number has to match Social Security's records exactly, or e-file bounces it.", x: 2, y: 2, w: 54, tail: "down-left" },
      { who: "Penny", text: "Even Milo's? He signs everything “Milo the Magnificent.”", x: 58, y: 6, w: 40, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Interview, gather, then prepare",
    alt: "Three stepping stones: Interview, Gather, Prepare. Penny hops from one to the next.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#dff1fb" />
        <rect x={0} y={130} width={320} height={50} fill="#7cc0f2" />
        {[
          [60, "1 Interview"],
          [160, "2 Gather"],
          [260, "3 Prepare"],
        ].map(([cx, t]) => (
          <g key={t as string}>
            <ellipse cx={cx as number} cy={140} rx={42} ry={12} fill="#c9c2b4" stroke={INK} strokeWidth={2} />
            <Label x={cx as number} y={166} size={12}>
              {t}
            </Label>
          </g>
        ))}
        <Penny x={160} y={78} scale={0.4} mood="excited" pose="up" />
        <Arrow d="M84,104 Q110,70 138,96" width={3} />
        <Arrow d="M184,96 Q210,70 236,104" width={3} />
      </svg>
    ),
    body: [
      "A good return starts with questions, not forms. Interview the taxpayer about the year: moves, marriage or divorce, births and deaths, new jobs, side income, home purchases, health coverage, and letters from the IRS.",
      "Then gather the documents (prior-year return, IDs, W-2s, 1099s, receipts) and only then prepare the return.",
    ],
    keyPoint: "Order of work: interview (what changed this year?) → gather documents → prepare.",
  },
  {
    title: "Last year's return is a treasure map",
    alt: "A treasure map labeled 2024 1040 with dotted paths to chests labeled Carryovers, Prior AGI and Refund applied.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f4e2b8" />
        <path d="M14,14 L306,14 L298,166 L22,166 Z" fill="#f8ecd0" stroke={INK} strokeWidth={2.5} />
        <Label x={160} y={36} size={15}>
          2024 Form 1040
        </Label>
        <path d="M50,140 q40,-60 90,-20 q50,40 110,-50" fill="none" stroke="#a8321f" strokeWidth={3} strokeDasharray="6 5" />
        {[
          [70, 112, "Carryovers"],
          [160, 132, "Prior-year AGI"],
          [252, 72, "Refund applied"],
        ].map(([x, y, t]) => (
          <g key={t as string}>
            <rect x={(x as number) - 14} y={(y as number) - 10} width={28} height={18} rx={3} fill="#c58b4e" stroke={INK} strokeWidth={2} />
            <Label x={x as number} y={(y as number) + 24} size={11}>
              {t}
            </Label>
          </g>
        ))}
        <path d="M244,44 l12,12 M256,44 l-12,12" stroke="#a8321f" strokeWidth={3.5} strokeLinecap="round" />
      </svg>
    ),
    body: [
      "The prior-year return shows what carries into this year: capital loss and charitable contribution carryovers, an overpayment applied to this year's tax, depreciation schedules, and basis records.",
      "It also holds the prior-year AGI, which taxpayers use to verify their identity when they sign an e-filed return, and it flags changes worth asking about, like a dependent who has aged out or a new address.",
    ],
    keyPoint: "Prior-year return: carryovers (capital loss, charitable), overpayment applied, depreciation and basis records, prior-year AGI for e-file signing.",
  },
  {
    title: "Every person needs a taxpayer ID",
    alt: "Three ID cards: SSN for people who can work in the U.S., ITIN for those who can't get an SSN, ATIN for a child in a pending adoption.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        <IdCard x={60} y={74} scale={1.2} title="SSN" line="Social Security" />
        <IdCard x={160} y={74} scale={1.2} title="ITIN" line="9XX-XX-XXXX" color="#fbe5d6" />
        <IdCard x={260} y={74} scale={1.2} title="ATIN" line="Adoption" color="#e3f4ea" />
        <Label x={60} y={124} size={10} weight={700}>
          Eligible? Use it.
        </Label>
        <Label x={160} y={124} size={10} weight={700}>
          No SSN possible
        </Label>
        <Label x={260} y={124} size={10} weight={700}>
          Adoption pending
        </Label>
        <Label x={160} y={156} size={12} color="#a8321f">
          Names must match Social Security's records
        </Label>
      </svg>
    ),
    body: [
      "The taxpayer, spouse and every dependent on the return need a taxpayer identification number: a Social Security number if they can get one, an ITIN (apply on Form W-7) if they need a number but can't get an SSN, or an ATIN for a child placed for adoption who doesn't have an SSN yet.",
      "Names must match the Social Security Administration's records. Someone who changed their name after marriage should update it with SSA before filing, or the e-filed return will be rejected. An ITIN that isn't used on a federal return for three consecutive years expires and must be renewed.",
    ],
    keyPoint: "Everyone on the return needs a TIN: SSN, ITIN (W-7, for those who can't get an SSN; expires if unused 3 years in a row) or ATIN (pending adoption). Names must match SSA.",
  },
  {
    title: "December 31 decides marital status",
    alt: "A judge's gavel over a calendar page for December 31. Married that day? Married all year.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3eefb" />
        <CalendarPage x={84} y={92} top="DEC" big="31" scale={1.8} />
        <g transform="translate(150 40) rotate(-30)">
          <rect x={-8} y={-30} width={16} height={60} rx={3} fill="#8a5a3c" stroke={INK} strokeWidth={2} />
          <rect x={-22} y={-40} width={44} height={20} rx={4} fill="#a8774f" stroke={INK} strokeWidth={2} />
        </g>
        <Label x={238} y={58} size={13} anchor="middle">
          Married on Dec 31?
        </Label>
        <Label x={238} y={78} size={13} color="#1d7a49">
          Married all year.
        </Label>
        <Label x={238} y={108} size={13}>
          Divorce final by Dec 31?
        </Label>
        <Label x={238} y={128} size={13} color="#1d7a49">
          Unmarried all year.
        </Label>
        <Label x={238} y={152} size={11} weight={700}>
          Spouse died in the year?
        </Label>
        <Label x={238} y={168} size={11} color="#1d7a49">
          Still married that year.
        </Label>
      </svg>
    ),
    body: [
      "Marital status is set on the last day of the tax year. Married on December 31? You're treated as married for the whole year. Divorced or legally separated under a final decree by December 31? Unmarried for the whole year.",
      "If a spouse died during the year, the survivor is considered married for that year and can file a joint return with the deceased spouse.",
    ],
    keyPoint: "Marital status = status on Dec 31 (whole year). Final divorce/separate maintenance decree by Dec 31 = unmarried. Spouse died during the year = still married for that year.",
  },
  {
    title: "Age and sight: the birthday-eve rule",
    alt: "A birthday cake with 65 candles on December 31, the day before a January 1 birthday.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <rect x={60} y={96} width={110} height={50} rx={6} fill="#f4a7b9" stroke={INK} strokeWidth={2.5} />
        <rect x={60} y={96} width={110} height={14} rx={6} fill="#fff" stroke={INK} strokeWidth={2} />
        {[72, 88, 104, 120, 136, 152].map((cx) => (
          <g key={cx}>
            <rect x={cx - 2} y={78} width={4} height={18} fill="#5aa9e6" stroke={INK} strokeWidth={1} />
            <path d={`M${cx},70 q-4,6 0,8 q4,-2 0,-8 Z`} fill="#f2c230" stroke={INK} strokeWidth={1} />
          </g>
        ))}
        <Label x={115} y={134} size={18} color="#fff">
          65
        </Label>
        <CalendarPage x={240} y={70} top="DEC" big="31" scale={0.9} />
        <Arrow d="M240,104 V126" width={3} />
        <Label x={240} y={150} size={12}>
          Birthday Jan 1?
        </Label>
        <Label x={240} y={166} size={12} color="#1d7a49">
          You're 65 a day early.
        </Label>
      </svg>
    ),
    body: [
      "Age matters for the filing threshold and the extra standard deduction. You're considered 65 on the day before your 65th birthday, so someone born on January 1, 1961 is 65 at the end of 2025.",
      "Blindness counts if you're blind on the last day of the year: you can't see better than 20/200 in your better eye with glasses or contacts, or your field of vision is 20 degrees or less. Get a certified statement from an eye doctor.",
    ],
    keyPoint: "You turn an age the day BEFORE your birthday (born Jan 1, 1961 = 65 for 2025). Blind = 20/200 or worse corrected, or field ≤ 20°, on Dec 31.",
  },
  {
    title: "Citizen, resident alien or nonresident alien?",
    alt: "Three doors. Citizens and resident aliens report worldwide income on Form 1040. Nonresident aliens report U.S. income on Form 1040-NR.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Globe x={80} y={84} scale={1.6} />
        <Label x={80} y={160} size={11} color="#1d7a49">
          Worldwide income: 1040
        </Label>
        <rect x={178} y={40} width={108} height={86} rx={4} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <path d="M232,52 l-24,24 h16 v30 h16 v-30 h16 Z" fill="#c8553d" stroke={INK} strokeWidth={2} />
        <Label x={232} y={160} size={11} color="#a8321f">
          U.S. income only: 1040-NR
        </Label>
        <Label x={80} y={22} size={12}>
          Citizen or resident alien
        </Label>
        <Label x={232} y={22} size={12}>
          Nonresident alien
        </Label>
      </svg>
    ),
    body: [
      "U.S. citizens and resident aliens are taxed on their worldwide income and file Form 1040. Nonresident aliens are generally taxed only on U.S.-source income and file Form 1040-NR.",
      "A noncitizen is a resident alien for the year if they pass either test: the green card test (a lawful permanent resident at any time during the year) or the substantial presence test (next card). Someone who is both in one year has a dual-status year.",
    ],
    keyPoint: "Citizens and resident aliens: worldwide income, 1040. Nonresident aliens: U.S.-source income, 1040-NR. Resident = green card test OR substantial presence test.",
  },
  {
    title: "The substantial presence test: 31 and 183",
    alt: "Three jars of days. This year's days count in full, last year's count one third, and the year before counts one sixth.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fdf3e1" />
        {[
          [60, "2025", "all", 90],
          [160, "2024", "× 1/3", 60],
          [260, "2023", "× 1/6", 36],
        ].map(([x, yr, f, h]) => (
          <g key={yr as string}>
            <rect x={(x as number) - 30} y={40} width={60} height={96} rx={8} fill="#fff" stroke={INK} strokeWidth={2.5} />
            <rect x={(x as number) - 27} y={133 - (h as number)} width={54} height={h as number} rx={4} fill="#7cc0f2" />
            <Label x={x as number} y={32} size={13}>
              {yr}
            </Label>
            <Label x={x as number} y={156} size={14} color="#1d7a49">
              {f}
            </Label>
          </g>
        ))}
        <Label x={160} y={176} size={12}>
          At least 31 days in 2025, and a total of 183 or more
        </Label>
        <Plane x={300} y={18} scale={0.35} />
      </svg>
    ),
    body: [
      "A noncitizen meets the substantial presence test for 2025 if they were in the U.S. at least 31 days in 2025 and at least 183 days counting all days in 2025, one third of the days in 2024 and one sixth of the days in 2023.",
      "Days don't count for exempt individuals, such as students on F or J visas, certain teachers and trainees, and diplomats. Someone in the U.S. fewer than 183 days in 2025 who keeps a tax home abroad and has a closer connection there can still be treated as a nonresident (Form 8840).",
    ],
    table: {
      head: ["Year", "Days in U.S.", "Counts as"],
      rows: [
        ["2025", "120", "120"],
        ["2024", "150", "50 (⅓)"],
        ["2023", "180", "30 (⅙)"],
        ["Total", "", "200: resident"],
      ],
    },
    keyPoint: "Substantial presence: ≥ 31 days this year AND ≥ 183 = this year + ⅓ last year + ⅙ year before. Exempt individuals (F/J students, teachers, diplomats) don't count days.",
  },
  {
    title: "Mixed couples: the nonresident spouse choice",
    alt: "Two puzzle pieces, a U.S. citizen and a nonresident alien spouse, clicking together into a joint return.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#f3eefb" />
        <path d="M40,50 h80 v24 a12,12 0 1 1 0,24 v24 h-80 Z" fill="#7cc0f2" stroke={INK} strokeWidth={2.5} />
        <path d="M200,50 h80 v72 h-80 v-24 a12,12 0 1 0 0,-24 Z" fill="#f6b73c" stroke={INK} strokeWidth={2.5} />
        <Label x={78} y={92} size={12}>
          U.S. citizen
        </Label>
        <Label x={246} y={84} size={11}>
          Nonresident
        </Label>
        <Label x={246} y={100} size={11}>
          spouse
        </Label>
        <Arrow d="M150,86 h40" width={3} />
        <Label x={160} y={150} size={13} color="#1d7a49">
          Choose to treat as resident → file jointly
        </Label>
        <Label x={160} y={168} size={11} weight={700}>
          (then worldwide income for both)
        </Label>
        <Star x={160} y={40} />
      </svg>
    ),
    body: [
      "A married couple where one spouse is a nonresident alien at the end of the year can choose to treat that spouse as a U.S. resident for the whole year and file a joint return. The price: both spouses' worldwide income is taxed by the U.S.",
      "Without the choice, the U.S. spouse generally files married filing separately (or head of household, if they qualify, because a nonresident alien spouse is treated as not married for that purpose).",
    ],
    keyPoint: "Nonresident alien spouse: can elect to be treated as resident → MFJ, but worldwide income of both is taxed. Otherwise usually MFS (or HOH if qualifying).",
  },
];

const lesson: Lesson = {
  id: "p1-getting-started",
  part: "part1",
  domainId: "p1d1",
  number: "1.1",
  episode: "Pilot: The New Neighbor",
  title: "Getting started",
  minutes: 12,
  lawAsOf: "tax year 2025 (law through December 31, 2025)",
  intro: "Before a single number goes on a return, you need to know who the taxpayer is: their status on December 31, their age, their ID numbers and whether the U.S. taxes them on everything or just on U.S. income.",
  comic,
  cards,
  hook: {
    line: "December 31 decides. The birthday eve counts. 31 and 183 make you a resident.",
    more: "Ace's version: “Check the calendar, check the cake, count the days.”",
    alt: "A calendar page for December 31, a birthday cake and a jar of days in a row.",
    art: (
      <svg viewBox="0 0 320 120">
        <rect width={320} height={120} rx={10} fill="#fff7dc" />
        <CalendarPage x={60} y={60} top="DEC" big="31" />
        <rect x={130} y={58} width={60} height={30} rx={4} fill="#f4a7b9" stroke={INK} strokeWidth={2} />
        <rect x={140} y={44} width={4} height={14} fill="#5aa9e6" />
        <rect x={158} y={44} width={4} height={14} fill="#5aa9e6" />
        <rect x={176} y={44} width={4} height={14} fill="#5aa9e6" />
        <rect x={232} y={28} width={50} height={66} rx={8} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <rect x={235} y={46} width={44} height={45} rx={4} fill="#7cc0f2" />
        <Label x={257} y={76} size={14}>
          183
        </Label>
      </svg>
    ),
  },
  traps: [
    {
      title: "The New Year's Eve wedding",
      text: "Married at 11:58 p.m. on December 31? Married for the whole year. Single is not an option, no matter how few minutes were left.",
    },
    {
      title: "The January 1 birthday",
      text: "Born January 1, 1961? You're 65 for 2025, because you're treated as reaching an age the day before your birthday. The exam loves this one.",
    },
    {
      title: "Counting old days at full value",
      text: "In the substantial presence test, only the current year's days count in full. Last year counts one third and the year before one sixth. And the current year needs at least 31 days on its own.",
    },
    {
      title: "The widow who files single",
      text: "If a spouse died during the year, the survivor is still married for that year and can file jointly. Single isn't right for the year of death.",
    },
  ],
  sources: [
    { key: "p17", section: "Chapter 1, Filing Information; Chapter 2, Filing Status" },
    { key: "p501", section: "Who Must File; Age 65 or older; Blindness; Marital status" },
    { key: "p519", section: "Chapter 1, Nonresident Alien or Resident Alien?; Nonresident Spouse Treated as a Resident" },
    { key: "spt", section: "Substantial presence test, exempt individuals" },
    { key: "itin", section: "Who needs an ITIN; renewing an expired ITIN" },
  ],
  quizTopics: ["Residency status"],
  game: {
    title: "Hoot's Intake Interview",
    setup: "Hoot is reviewing new client files, and every file has a question in it. Answer as Ace. Each right answer earns an EA stamp; each miss goes in Hoot's notebook. Five stamps and Hoot closes the file.",
    rounds: [
      {
        who: "Penny",
        prompt: "My friend Gina got married at 11:58 p.m. on December 31, 2025. She was single for 364 days and 23 hours. What can she file for 2025?",
        answer: "Married filing jointly or married filing separately",
        wrong: [
          ["Single, because she was unmarried for almost all of the year", "Status is decided on December 31. If you're married that day, you're married for the whole year."],
          ["Head of household, because she wasn't married until the last minute", "Head of household requires being unmarried (or considered unmarried) on December 31."],
          ["Single for 2025, and she can choose to file jointly from 2026", "A December 31 marriage counts for 2025. There's no choice to file single."],
        ],
        rule: "Marital status is determined on the last day of the tax year and applies to the whole year.",
      },
      {
        who: "Hoot",
        prompt: "Hoo. Taxpayer born January 1, 1961. For 2025, is the taxpayer age 65 or older for the extra standard deduction?",
        answer: "Yes, the taxpayer is treated as 65 at the end of 2025",
        wrong: [
          ["No, the taxpayer doesn't turn 65 until 2026", "You're considered to reach an age on the day before the birthday, so a January 1, 2026 birthday makes you 65 on December 31, 2025."],
          ["Only if the taxpayer was also blind", "Age and blindness are separate tests. Each one adds its own amount."],
          ["Only if the taxpayer files a joint return", "The age test works the same for every filing status."],
        ],
        rule: "You're treated as reaching an age the day before your birthday.",
      },
      {
        who: "Milo",
        prompt: "My pen pal Ingrid isn't a citizen and has no green card. She was in the U.S. 120 days in 2025, 150 days in 2024 and 180 days in 2023. How many days count toward the substantial presence test for 2025?",
        answer: "200 days",
        wrong: [
          ["450 days", "Only the current year counts in full. 2024 counts one third and 2023 one sixth."],
          ["120 days", "Days from the two earlier years count too, at one third and one sixth."],
          ["170 days", "That uses one third for both earlier years. 2023 days count one sixth: 120 + 50 + 30 = 200."],
        ],
        rule: "Substantial presence: all current-year days + one third of last year's + one sixth of the year before's, needing 183, with at least 31 this year.",
      },
      {
        who: "Ace",
        prompt: "A new client hands me nothing but a shoebox. Which document is the best first thing to ask for?",
        answer: "Last year's tax return",
        wrong: [
          ["This year's bank statements", "Useful later, but they won't show carryovers, prior AGI or what changed since last year."],
          ["A copy of the client's birth certificate", "Identity matters, but the prior-year return answers far more preparation questions."],
          ["The client's state driver's license", "That helps with ID verification, not with carryovers or prior-year amounts."],
        ],
        rule: "The prior-year return shows carryovers, overpayments applied, depreciation and basis records, and the prior-year AGI used to sign an e-filed return.",
      },
      {
        who: "Biscuit",
        prompt: "Woof. Penny's neighbor needs a taxpayer number but can't get a Social Security number. Which number does he apply for?",
        answer: "An ITIN, using Form W-7",
        wrong: [
          ["An EIN, using Form SS-4", "An EIN identifies businesses and other entities, not an individual on Form 1040."],
          ["A PTIN", "A PTIN is for paid tax return preparers."],
          ["An ATIN", "An ATIN is only for a child in a pending adoption who doesn't have an SSN yet."],
        ],
        rule: "An ITIN (Form W-7) is for individuals who need a taxpayer number but aren't eligible for an SSN. It expires if not used on a federal return for three consecutive years.",
      },
      {
        who: "Hoot",
        prompt: "Taxpayer's spouse died in March 2025. The taxpayer has not remarried. Can the taxpayer file a joint return for 2025?",
        answer: "Yes. The survivor is considered married for 2025 and can file jointly",
        wrong: [
          ["No. The taxpayer must file single for 2025", "In the year of death, the surviving spouse is still treated as married."],
          ["No. The taxpayer must file as a qualifying surviving spouse for 2025", "Qualifying surviving spouse is for the two years after the year of death, and it requires a dependent child."],
          ["Only if the spouse died in December", "The month doesn't matter. Any death during the year leaves the survivor married for that year."],
        ],
        rule: "If a spouse dies during the year, the survivor is considered married for that whole year and may file jointly.",
      },
    ],
  },
  stinger: {
    alt: "Late at night, Biscuit sits in the empty moving box wearing Ace's reading glasses, holding a pen.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#2b3550" floor="#3d4a6a" />
        <circle cx={270} cy={40} r={18} fill="#fff3c4" />
        <rect x={110} y={130} width={100} height={66} fill="#d9a066" stroke={INK} strokeWidth={2.5} />
        <Label x={160} y={176} size={11}>
          TAX STUFF?
        </Label>
        <Biscuit x={160} y={104} scale={0.5} mood="smug" />
        <g fill="rgba(255,255,255,0.2)" stroke={INK} strokeWidth={2}>
          <circle cx={150} cy={102} r={7} />
          <circle cx={170} cy={102} r={7} />
        </g>
        <Doc x={226} y={150} scale={0.6} rotate={10} label="W-7" sub="Applicant: Biscuit" />
      </svg>
    ),
    bubbles: [{ who: "Biscuit", text: "Applicant: Biscuit. Reason for ITIN: I would like to be claimed. Signed: 🐾", x: 2, y: 4, w: 60, tail: "down-right" }],
  },
  deck: {
    topic: "Getting started on a return: prior-year returns, taxpayer IDs, marital status, age and blindness, and residency",
    rules:
      "the order of return preparation, what the prior-year return provides, SSN/ITIN/ATIN rules, marital status on December 31, the age and blindness tests, resident versus nonresident alien status, the green card and substantial presence tests, and the nonresident spouse election",
  },
};

export default lesson;

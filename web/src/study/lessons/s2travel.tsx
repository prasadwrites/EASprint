import { Ace, Backdrop, Biscuit, Hoot, Label, Milo, Rosa } from "../cast";
import { Crate, Van } from "../bakery";
import type { Lesson } from "../lesson";
import { Card, CARD, HOOK, Mark, PANEL, Paper, Step } from "../props";

// Part 2, topic 2.3: travel, meals and vehicles: business travel away from home, the 50% meal limit and
// no deduction for entertainment, the standard mileage rate and actual expenses, commuting, business gifts
// and substantiation. Written to Publication 463 for tax year 2025.

/** A huge souvenir bagel. (x, y) is the center. */
function Bagel({ x, y, r = 18 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#d9a066" stroke="#17202c" strokeWidth={2.5} />
      <circle cx={x} cy={y} r={r * 0.35} fill="#fdf3e1" stroke="#17202c" strokeWidth={2} />
      {[
        [-0.6, -0.4],
        [0.5, -0.55],
        [0.6, 0.35],
        [-0.45, 0.6],
      ].map(([dx, dy]) => (
        <ellipse key={`${dx}`} cx={x + dx * r} cy={y + dy * r} rx={1.6} ry={1} fill="#fff" />
      ))}
    </g>
  );
}

const comic: Lesson["comic"] = [
  {
    alt: "Rosa and Milo stand by the bakery van, packed for a trip. Milo holds a map.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#d4ebfa" floor="#cfd6de" />
        <Rosa x={56} y={128} scale={0.7} mood="excited" pose="up" />
        <Van x={170} y={206} scale={0.8} />
        <Milo x={282} y={128} scale={0.64} mood="excited" flip pose="hold" holding={<Paper x={0} y={-8} label="MAP" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "Road trip! The Big Bread Expo, 300 miles away, three nights!", x: 3, y: 2, w: 44, tail: "down-left", shout: true },
      { who: "Milo", text: "Can we stop at the World's Largest Bagel?", x: 60, y: 4, w: 37, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds a ticket to the bagel. Ace holds a hotel receipt.",
    art: (
      <svg {...PANEL}>
        <Backdrop />
        <Milo x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="BAGEL" sub="ticket" color="#fde2e4" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="hold" holding={<Paper x={0} y={-8} label="HOTEL" sub="+ meals" color="#fff" />} />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "So it's all deductible? Including the Bagel?", x: 3, y: 2, w: 36, tail: "down-left" },
      { who: "Ace", text: "Fares and hotel: 100%. Meals: 50%. The Bagel's a personal side trip. That's on you.", x: 46, y: 2, w: 52, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds a dinner receipt and concert tickets. Hoot pops out of a bread crate.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#e7e3f3" />
        <Rosa x={84} y={128} scale={0.78} mood="smug" pose="hold" holding={<Paper x={0} y={-8} label="DINNER" sub="+ concert" color="#fff" />} />
        <Hoot x={240} y={86} scale={0.54} mood="excited" flip pose="up" />
        <Crate x={240} y={206} scale={1.05} label="BREAD" />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "I took our flour supplier to dinner AND a concert!", x: 3, y: 2, w: 42, tail: "down-left" },
      { who: "Hoot", text: "Dinner: 50%. Concert: ZERO! Entertainment isn't deductible!", x: 52, y: 2, w: 44, tail: "down-right", shout: true },
    ],
  },
  {
    alt: "Milo proudly shows a mileage log. Ace points at it, then shakes his head at a second page.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#eef5f1" />
        <Milo x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="LOG" sub="600 mi" color="#fff3c4" />} />
        <Ace x={240} y={128} scale={0.78} mood="happy" flip pose="point" />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "600 business miles, all logged! Plus my drive to the bakery every day.", x: 3, y: 2, w: 44, tail: "down-left" },
      { who: "Ace", text: "70 cents a mile for 2025, plus parking and tolls. The daily drive is commuting: never.", x: 52, y: 2, w: 46, tail: "down-right" },
    ],
  },
  {
    alt: "Rosa holds a gift basket. Hoot holds up a sign reading 25 dollars.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fde9e4" />
        <Rosa x={84} y={128} scale={0.78} mood="excited" pose="hold" holding={<Paper x={0} y={-8} label="GIFT" sub="$60 basket" color="#d8f0e2" />} />
        <Hoot x={236} y={130} scale={0.7} mood="stern" flip pose="hold" holding={<Paper x={0} y={-8} label="$25" sub="each" color="#fff3c4" />} />
      </svg>
    ),
    bubbles: [
      { who: "Rosa", text: "$60 gift baskets for my 20 best customers!", x: 3, y: 2, w: 40, tail: "down-left" },
      { who: "Hoot", text: "$25 per person, per year. The wrapping doesn't count.", x: 52, y: 2, w: 42, tail: "down-right" },
    ],
  },
  {
    alt: "Milo holds a giant souvenir bagel. Hoot shakes his head. Biscuit leaps toward the bagel.",
    art: (
      <svg {...PANEL}>
        <Backdrop wall="#fff7dc" />
        <Milo x={70} y={128} scale={0.76} mood="smug" pose="up" />
        <Bagel x={118} y={92} r={22} />
        <Biscuit x={170} y={176} scale={0.62} mood="excited" />
        <Hoot x={262} y={130} scale={0.66} mood="stern" flip />
      </svg>
    ),
    bubbles: [
      { who: "Milo", text: "I bought the Bagel as a business gift. For me.", x: 3, y: 2, w: 36, tail: "down-left" },
      { who: "Hoot", text: "You can't gift yourself. Personal.", x: 62, y: 4, w: 34, tail: "down-right" },
    ],
  },
];

const cards: Lesson["cards"] = [
  {
    title: "Business travel",
    alt: "Travel away from your tax home overnight for business: transportation and lodging are deductible, meals 50%. Personal side trips aren't.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#d4ebfa" />
        <Step x={14} y={14} w={94} h={110} color="#d8f0e2" label="Travel" sub="100%" />
        <Step x={113} y={14} w={94} h={110} color="#d8f0e2" label="Hotel" sub="100%" />
        <Step x={212} y={14} w={94} h={110} color="#fff3c4" label="Meals" sub="50%" />
        <Label x={160} y={150} size={10} weight={700}>Away from your tax home, overnight (or needing rest)</Label>
      </svg>
    ),
    body: [
      "Travel expenses are deductible when a taxpayer is away from their tax home (the general area of their main place of business) substantially longer than an ordinary day's work and needs sleep or rest. Deductible costs include transportation, lodging, 50% of meals, baggage, laundry and business calls. Travel costs for a spouse or friend aren't deductible unless they're an employee with a bona fide business purpose.",
      "On a domestic trip that's primarily for business, the round-trip transportation is fully deductible, but costs of personal side trips aren't. A temporary work assignment expected to last a year or less keeps travel deductible; one expected to last longer moves the tax home. Self-employed people may use the federal per diem rate for meals and incidentals (not lodging).",
    ],
    keyPoint: "Travel: away from tax home overnight (sleep/rest) for business → transportation and lodging 100%, meals 50%. Domestic trip primarily business: full round-trip fare; personal side trips not deductible. Temporary assignment ≤ 1 year. Companions not deductible unless a bona fide employee.",
  },
  {
    title: "Meals and entertainment",
    alt: "Business meals are 50% deductible if the taxpayer or an employee is present and the meal isn't lavish. Entertainment like concerts or golf is not deductible. Some meals, like a holiday party for employees, are 100%.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#e7e3f3" />
        <Step x={14} y={14} w={94} h={110} color="#fff3c4" label="50%" sub="business meals" />
        <Step x={113} y={14} w={94} h={110} color="#fde2e4" label="0%" sub="entertainment" />
        <Step x={212} y={14} w={94} h={110} color="#d8f0e2" label="100%" sub="staff party, sold" />
        <Label x={160} y={150} size={10} weight={700}>Food at an event: 50% if billed separately</Label>
      </svg>
    ),
    body: [
      "Business meals are 50% deductible if they aren't lavish, the taxpayer or an employee is present, and the food is provided to a current or potential business contact. Entertainment, amusement and recreation (concerts, sporting events, golf) isn't deductible at all; food bought at an entertainment event is 50% deductible only if bought separately or stated separately on the bill.",
      "Some meals are fully deductible: recreational or social events primarily for employees (like a holiday party), meals sold to customers, and meals treated as compensation to employees. Meals provided on premises for the employer's convenience are 50% deductible through 2025 and not deductible after 2025.",
    ],
    keyPoint: "Meals: 50% if not lavish, taxpayer/employee present, with a business contact. Entertainment: 0% (food at events 50% if separately stated). 100%: employee recreational/social events, meals sold to customers, meals reported as compensation. Convenience-of-employer meals: 50% through 2025, 0% after.",
  },
  {
    title: "Cars and mileage",
    alt: "Standard mileage rate for 2025 is 70 cents per business mile, plus parking and tolls. Or deduct the business share of actual costs. Commuting is never deductible.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#eef5f1" />
        <Mark x={70} y={92} text="70¢" color="#1d7a49" size={46} />
        <Card x={140} y={14} w={168} h={46} lines={["Standard rate (2025)", "+ parking and tolls"]} size={10} color="#fff" />
        <Card x={140} y={66} w={168} h={46} lines={["Or actual costs ×", "business-use %"]} size={10} color="#fff3c4" />
        <Card x={140} y={118} w={168} h={46} lines={["Commuting: never", "deductible"]} size={10} color="#fde2e4" />
      </svg>
    ),
    body: [
      "For 2025, the standard mileage rate is 70 cents per business mile, plus business parking and tolls (and the business share of car loan interest and personal property tax for self-employed people). To use it for a car the taxpayer owns, it must be chosen in the first year the car is used for business. It can't be used for five or more cars used at the same time, or after claiming MACRS, section 179 or bonus depreciation on the car.",
      "The alternative is the business-use percentage of actual costs: gas, oil, repairs, insurance, registration, lease payments and depreciation (subject to listed property and luxury auto limits; more than 50% business use is needed for section 179 and bonus depreciation). Commuting between home and a regular place of business is never deductible. Taxpayers need a log of date, miles, destination and purpose.",
    ],
    keyPoint: "2025 standard mileage: 70¢/business mile + parking and tolls; choose it in the car's first business year; not for 5+ cars at once or after MACRS/§179/bonus. Actual method: business-use % of costs + depreciation (> 50% business use needed for §179/bonus). Commuting never deductible. Keep a mileage log.",
  },
  {
    title: "Business gifts",
    alt: "Gifts to customers are deductible up to $25 per recipient per year. Incidental costs like wrapping don't count toward the limit. Cheap branded items of $4 or less aren't gifts.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fde9e4" />
        <Mark x={70} y={92} text="$25" color="#a8321f" size={46} />
        <Card x={140} y={14} w={168} h={46} lines={["per recipient,", "per year"]} size={10} color="#fff" />
        <Card x={140} y={66} w={168} h={46} lines={["Wrapping, shipping,", "engraving: extra"]} size={10} color="#d8f0e2" />
        <Card x={140} y={118} w={168} h={46} lines={["Branded items ≤ $4:", "not counted as gifts"]} size={10} color="#fff3c4" />
      </svg>
    ),
    body: [
      "A business can deduct no more than $25 for business gifts to each person per year. Incidental costs, such as engraving, packaging, insurance and mailing, aren't counted toward the $25. Items costing $4 or less with the business's name permanently imprinted (pens, calendars) and signs or display racks given for use on the recipient's business premises aren't treated as gifts.",
      "A gift to a business contact's spouse or family member generally counts as a gift to the contact. A gift to a company meant for an individual's personal use counts as a gift to that individual. Tickets to an event given without the giver attending can be treated as a gift or as entertainment, whichever applies.",
    ],
    keyPoint: "Business gifts: $25 per recipient per year; incidental costs (wrapping, engraving, mailing) excluded from the limit; branded items ≤ $4 and display materials aren't gifts. Gifts to a contact's family count as gifts to the contact.",
  },
  {
    title: "Keeping proof",
    alt: "For travel, gifts and vehicle use, records must show the amount, time, place and business purpose. Receipts are needed for lodging and expenses of $75 or more.",
    art: (
      <svg {...CARD}>
        <rect width={320} height={180} fill="#fff7dc" />
        <Step x={10} y={14} w={72} h={110} color="#fff" label="Amount" sub="how much" />
        <Step x={88} y={14} w={72} h={110} color="#fff" label="Time" sub="when" />
        <Step x={166} y={14} w={72} h={110} color="#fff" label="Place" sub="where" />
        <Step x={244} y={14} w={66} h={110} color="#fff3c4" label="Why" sub="purpose" />
        <Label x={160} y={150} size={10} weight={700}>Receipts for lodging and anything $75+</Label>
      </svg>
    ),
    body: [
      "Travel, gift and car expenses need adequate records made at or near the time: the amount, the time and place (or date and description of a gift), the business purpose and, for meals and gifts, the business relationship of the people involved. A log, diary or app plus documentary evidence works.",
      "Receipts are required for all lodging and for any other expense of $75 or more. Without records, estimates aren't accepted for these expenses.",
    ],
    keyPoint: "Substantiation for travel, meals, gifts, vehicles: amount, time, place, business purpose (and business relationship). Records made at or near the time. Receipts for all lodging and any expense of $75 or more.",
  },
];

const lesson: Lesson = {
  id: "p2-travel-meals-vehicles",
  part: "part2",
  domainId: "p2d2",
  number: "2.3",
  episode: "Road Trip to the Bread Expo",
  title: "Travel, meals and vehicles",
  minutes: 13,
  lawAsOf: "tax year 2025",
  intro: "Deducting business travel, the 50% meal rule and no deduction for entertainment, the 2025 standard mileage rate, commuting, the $25 gift limit, and the records you need.",
  previously: "The disco ball is personal and the roof is capitalized. Now the van is packed: Rosa's Rolls is going to the Big Bread Expo.",
  comic,
  cards,
  hook: {
    line: "Sleep away = travel. Meals half. Fun zero. 70¢ a mile.",
    more: "Hotel and fares 100%. Entertainment 0%. Gifts $25 each per year. Commuting never. Receipts for lodging and anything $75+.",
    alt: "The bakery van with the numbers 50% and 70 cents.",
    art: (
      <svg {...HOOK}>
        <rect width={320} height={120} rx={10} fill="#d4ebfa" />
        <Van x={80} y={110} scale={0.62} />
        <Mark x={190} y={74} text="50%" color="#a8321f" size={30} />
        <Mark x={268} y={74} text="70¢" color="#1d7a49" size={30} />
      </svg>
    ),
  },
  traps: [
    { title: "Entertaining a client is 50%", text: "Entertainment isn't deductible at all. Only the meal, separately stated, is 50%." },
    { title: "Driving to work is business mileage", text: "Commuting between home and a regular workplace is never deductible." },
    { title: "Wrapping counts toward $25", text: "Incidental costs like wrapping and shipping don't count toward the $25 gift limit." },
    { title: "All meals are 50%", text: "Employee holiday parties and meals sold to customers are 100% deductible." },
  ],
  sources: [{ key: "p463", section: "Travel, gift and car expenses" }],
  cases: [
    {
      who: "Rosa",
      title: "Dinner and a show",
      facts: "Rosa spends $200 on dinner with her flour supplier (both attend, not lavish) and $300 on concert tickets for both of them afterward.",
      question: "How much can the business deduct?",
      choices: ["$500", "$250", "$100", "$200"],
      answer: "$100",
      why: "The business meal is 50% deductible ($100). The concert is entertainment and isn't deductible at all.",
    },
    {
      who: "Milo",
      title: "The mileage log",
      facts: "In 2025, Milo drove his own car 600 business miles (using the standard rate since the car's first year) and paid $30 for business parking. He also commuted 2,000 miles.",
      question: "What's his car deduction?",
      choices: ["$450", "$420", "$1,850", "$1,820"],
      answer: "$450",
      why: "600 miles × 70¢ = $420, plus $30 of parking = $450. Commuting miles aren't deductible.",
    },
    {
      who: "Hoot",
      title: "The gift baskets",
      facts: "A bakery gives a $60 basket to each of 20 customers and pays $5 each to ship them.",
      question: "How much can it deduct?",
      choices: ["$1,300", "$600", "$500", "$1,200"],
      answer: "$600",
      why: "Gifts are limited to $25 per recipient (20 × $25 = $500), but shipping is an incidental cost outside the limit (20 × $5 = $100): $600.",
    },
    {
      who: "Ace",
      title: "The holiday party",
      facts: "Rosa's Rolls throws a $1,000 holiday party for all its employees.",
      question: "How much is deductible?",
      choices: ["$1,000", "$500", "$0", "$25 per employee"],
      answer: "$1,000",
      why: "Recreational and social events primarily for employees are an exception to the 50% limit: fully deductible.",
    },
  ],
  quizTopics: ["Meals and entertainment", "Business gifts", "Vehicle expenses"],
  quizBrief: "Travel, meals and vehicles: travel away from the tax home, 50% meals, no entertainment, 100% exceptions, 70-cent 2025 mileage rate, commuting, $25 business gifts, substantiation",
};

export default lesson;

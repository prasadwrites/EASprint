import { Ace, Biscuit, Hoot, Label, Lulu, Milo, Penny, Rosa } from "./cast";
import { Sign } from "./office";

// Props for Season 2, "Rosa's Rolls": the bakery's oven, Gerald the sourdough starter, the Rolly mascot suit,
// the delivery van and a few farm friends. Same ink and line weight as props.tsx.

const INK = "#17202c";
const OUT = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** The bakery's big oven. (x, y) is the bottom center; 110 wide and 100 tall at scale 1. */
export function Oven({ x, y, scale = 1, glow = true, label }: { x: number; y: number; scale?: number; glow?: boolean; label?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-55} y={-100} width={110} height={100} rx={6} fill="#b8c1cc" {...OUT} />
      <rect x={-44} y={-70} width={88} height={52} rx={4} fill={glow ? "#f6a04d" : "#2a2f3a"} {...OUT} strokeWidth={2} />
      {glow && <path d="M-30,-30 q8,-14 16,0 q8,-14 16,0 q8,-14 16,0 q8,-14 16,0" fill="none" stroke="#e8505b" strokeWidth={2.5} />}
      <rect x={-34} y={-82} width={68} height={6} rx={3} fill={INK} />
      {[-36, -18, 18, 36].map((cx) => (
        <circle key={cx} cx={cx} cy={-90} r={3.5} fill="#fff" stroke={INK} strokeWidth={1.5} />
      ))}
      {label && (
        <Label x={0} y={-6} size={8}>
          {label}
        </Label>
      )}
    </g>
  );
}

/** Gerald, Rosa's beloved sourdough starter: a bubbly jar with googly eyes. (x, y) is the bottom center. */
export function Gerald({ x, y, scale = 1, mood = "happy" }: { x: number; y: number; scale?: number; mood?: "happy" | "shocked" | "smug" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-16,0 V-34 Q-16,-40 -10,-40 H10 Q16,-40 16,-34 V0 Z" fill="#eef5f1" {...OUT} />
      <path d="M-15,-6 V-24 Q-8,-32 0,-26 Q8,-34 15,-26 V-6 Z" fill="#f2e3c6" />
      <path d="M-18,-46 H18 V-40 H-18 Z" fill="#c9a26b" {...OUT} strokeWidth={2} />
      {[
        [-7, -14, 2.4],
        [6, -10, 1.8],
        [2, -20, 1.5],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}`} cx={cx} cy={cy} r={r} fill="#fff" stroke="#c9a26b" strokeWidth={1} />
      ))}
      <circle cx={-6} cy={-30} r={5} fill="#fff" stroke={INK} strokeWidth={1.5} />
      <circle cx={6} cy={-30} r={5} fill="#fff" stroke={INK} strokeWidth={1.5} />
      <circle cx={mood === "smug" ? -4 : -6} cy={mood === "shocked" ? -31 : -29} r={2.2} fill={INK} />
      <circle cx={mood === "smug" ? 8 : 6} cy={mood === "shocked" ? -31 : -29} r={2.2} fill={INK} />
      {mood === "shocked" ? <circle cx={0} cy={-20} r={2.5} fill={INK} /> : <path d="M-4,-21 Q0,-17 4,-21" fill="none" stroke={INK} strokeWidth={1.5} />}
    </g>
  );
}

/** The Rolly mascot suit: a giant cinnamon roll. Draw it AFTER a character at (x, y) to dress them; their head stays out. */
export function RollySuit({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx={0} cy={66} r={44} fill="#d9a066" {...OUT} />
      <path d="M-22,66 A22,22 0 1 1 22,66 A16,16 0 1 1 -10,66 A10,10 0 1 1 8,66 A5,5 0 1 1 -2,66" fill="none" stroke="#7a4a20" strokeWidth={4} strokeLinecap="round" />
      <path d="M-30,40 q6,-8 12,0 q6,-8 12,0 q6,-8 12,0 q6,-8 12,0 q6,-8 12,0" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
    </g>
  );
}

/** The Rosa's Rolls delivery van, facing right. (x, y) is the bottom center; 150 wide at scale 1. */
export function Van({ x, y, scale = 1, text = "ROSA'S ROLLS" }: { x: number; y: number; scale?: number; text?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-75,-14 V-70 Q-75,-76 -69,-76 H34 L64,-46 Q75,-40 75,-30 V-14 Z" fill="#f4c7b8" {...OUT} />
      <path d="M38,-70 L60,-46 H38 Z" fill="#cfe9f7" {...OUT} strokeWidth={2} />
      <Label x={-18} y={-40} size={11}>
        {text}
      </Label>
      <circle cx={-44} cy={-12} r={13} fill="#2a2f3a" {...OUT} />
      <circle cx={-44} cy={-12} r={5} fill="#b8c1cc" />
      <circle cx={46} cy={-12} r={13} fill="#2a2f3a" {...OUT} />
      <circle cx={46} cy={-12} r={5} fill="#b8c1cc" />
    </g>
  );
}

/** A hen. (x, y) is the bottom center. */
export function Hen({ x, y, scale = 1, flip }: { x: number; y: number; scale?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M-4,0 V-8 M6,0 V-8" stroke="#f5a623" strokeWidth={3} strokeLinecap="round" />
      <path d="M-22,-24 Q-24,-8 -4,-8 H10 Q24,-10 18,-30 Q22,-46 10,-48 Q0,-50 2,-36 Q-10,-40 -22,-24 Z" fill="#fff" {...OUT} />
      <path d="M8,-50 q2,-8 6,-2 q2,-6 5,1" fill="#e8505b" stroke={INK} strokeWidth={1.5} />
      <path d="M18,-42 l8,3 l-8,3 Z" fill="#f5a623" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={13} cy={-42} r={1.8} fill={INK} />
      <path d="M-14,-22 Q-6,-14 4,-22" fill="none" stroke={INK} strokeWidth={1.8} />
    </g>
  );
}

/** A wooden crate of goods with a label. (x, y) is the bottom center. Draw it after a character to hide them. */
export function Crate({ x, y, scale = 1, label = "FLOUR" }: { x: number; y: number; scale?: number; label?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-42} y={-60} width={84} height={60} fill="#d9b382" {...OUT} />
      <path d="M-42,-40 H42 M-42,-20 H42" stroke="#a8804b" strokeWidth={2} />
      <rect x={-26} y={-38} width={52} height={16} rx={2} fill="#fff3c4" stroke={INK} strokeWidth={1.5} />
      <Label x={0} y={-26} size={9}>
        {label}
      </Label>
    </g>
  );
}

/** Season 2 title art: the whole cast at Rosa's Rolls, with Bertha, Gerald, Rolly and Hoot in a flour crate. */
export function BakeryPortrait() {
  return (
    <svg viewBox="0 0 520 190" role="img" aria-label="The cast at Rosa's Rolls: Rosa, Penny, Milo in the Rolly suit, Lulu, Biscuit and Ace, with Bertha the oven, Gerald the sourdough jar, and Hoot popping out of a flour crate">
      <rect x={0} y={0} width={520} height={190} rx={12} fill="#fde9e4" />
      <rect x={0} y={166} width={520} height={24} fill="#efd9b8" />
      <Sign x={160} y={18} w={200} h={30} text="ROSA'S ROLLS" color="#fff3c4" size={13} />
      <Oven x={52} y={172} scale={0.82} label="BERTHA" />
      <Rosa x={140} y={88} scale={0.72} mood="excited" pose="up" />
      <Penny x={208} y={88} scale={0.72} mood="happy" />
      <Milo x={276} y={88} scale={0.72} mood="excited" pose="wave" />
      <RollySuit x={276} y={88} scale={0.72} />
      <Lulu x={334} y={118} scale={0.5} mood="smug" />
      <Gerald x={366} y={170} scale={0.7} mood="happy" />
      <Biscuit x={396} y={150} scale={0.4} mood="happy" />
      <Ace x={426} y={88} scale={0.7} mood="smug" pose="point" />
      <Hoot x={486} y={112} scale={0.4} mood="excited" flip pose="up" />
      <Crate x={486} y={176} scale={0.7} label="FLOUR" />
    </svg>
  );
}

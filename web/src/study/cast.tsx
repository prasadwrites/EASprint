import { useId, type ReactNode } from "react";

/**
 * The Study cast. Every lesson uses the same three characters, drawn once here as SVG so panels can be
 * assembled from poses and props instead of new artwork for each lesson.
 *
 * - Penny Pocket: the taxpayer. Curious, impulsive, always buying, selling or inheriting something.
 * - Ace Okafor, EA: the enrolled agent next door. Calm, a little dry, always has the rule ready.
 * - Examiner Horace "Hoot" Hootington: the IRS examiner, an owl in a green eyeshade. Strict but fair.
 *
 * Each character is drawn waist-up around (0, 0), the center of the head, about 150 units tall
 * (hair top near -45, waist at 100). Place them with x, y and scale.
 */

export type Mood = "happy" | "excited" | "shocked" | "thinking" | "worried" | "smug" | "stern";
export type Pose = "down" | "up" | "point" | "hold" | "wave" | "shrug";

const INK = "#17202c";
const OUT = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

interface CharacterProps {
  x: number;
  y: number;
  scale?: number;
  mood?: Mood;
  pose?: Pose;
  /** Faces left instead of right. */
  flip?: boolean;
  /** Drawn in front of the body, between the hands (use with pose "hold"), centered on (0, 62). */
  holding?: ReactNode;
}

function place({ x, y, scale = 1, flip }: CharacterProps) {
  return `translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`;
}

function Eyes({ mood, glasses }: { mood: Mood; glasses?: boolean }) {
  const L = -10;
  const R = 10;
  const Y = -2;
  let eyes: ReactNode;
  switch (mood) {
    case "excited":
      eyes = (
        <g fill="none" {...OUT} strokeWidth={3}>
          <path d={`M${L - 5},${Y + 2} Q${L},${Y - 5} ${L + 5},${Y + 2}`} />
          <path d={`M${R - 5},${Y + 2} Q${R},${Y - 5} ${R + 5},${Y + 2}`} />
        </g>
      );
      break;
    case "shocked":
      eyes = (
        <g>
          <circle cx={L} cy={Y} r={6.5} fill="#fff" {...OUT} strokeWidth={2} />
          <circle cx={R} cy={Y} r={6.5} fill="#fff" {...OUT} strokeWidth={2} />
          <circle cx={L} cy={Y} r={2.4} fill={INK} />
          <circle cx={R} cy={Y} r={2.4} fill={INK} />
        </g>
      );
      break;
    case "smug":
      eyes = (
        <g fill="none" {...OUT} strokeWidth={3}>
          <path d={`M${L - 5},${Y} L${L + 5},${Y}`} />
          <path d={`M${R - 5},${Y} L${R + 5},${Y}`} />
          <path d={`M${L - 3},${Y} Q${L},${Y + 4} ${L + 3},${Y}`} fill={INK} />
          <path d={`M${R - 3},${Y} Q${R},${Y + 4} ${R + 3},${Y}`} fill={INK} />
        </g>
      );
      break;
    case "thinking":
      eyes = (
        <g fill={INK}>
          <ellipse cx={L + 1.5} cy={Y - 2} rx={3.2} ry={4} />
          <ellipse cx={R + 1.5} cy={Y - 2} rx={3.2} ry={4} />
        </g>
      );
      break;
    default:
      eyes = (
        <g fill={INK}>
          <ellipse cx={L} cy={Y} rx={3.2} ry={4.2} />
          <ellipse cx={R} cy={Y} rx={3.2} ry={4.2} />
          <circle cx={L + 1} cy={Y - 1.5} r={1.1} fill="#fff" />
          <circle cx={R + 1} cy={Y - 1.5} r={1.1} fill="#fff" />
        </g>
      );
  }
  const brows: Record<Mood, string> = {
    happy: "M-15,-12 Q-10,-15 -5,-12 M5,-12 Q10,-15 15,-12",
    excited: "M-15,-14 Q-10,-18 -5,-14 M5,-14 Q10,-18 15,-14",
    shocked: "M-15,-16 Q-10,-20 -5,-16 M5,-16 Q10,-20 15,-16",
    thinking: "M-15,-12 L-5,-12 M5,-15 Q10,-19 15,-14",
    worried: "M-15,-11 L-5,-15 M5,-15 L15,-11",
    smug: "M-15,-10 Q-10,-13 -5,-10 M5,-12 Q10,-16 15,-12",
    stern: "M-15,-15 L-5,-10 M5,-10 L15,-15",
  };
  return (
    <g>
      {eyes}
      <path d={brows[mood]} fill="none" {...OUT} strokeWidth={2.6} />
      {glasses && (
        <g fill="rgba(255,255,255,0.25)" stroke={INK} strokeWidth={2}>
          <circle cx={L} cy={Y} r={8.5} />
          <circle cx={R} cy={Y} r={8.5} />
          <path d={`M${L + 8.5},${Y} L${R - 8.5},${Y}`} />
        </g>
      )}
    </g>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  switch (mood) {
    case "excited":
      return <path d="M-11,8 Q0,25 11,8 Z" fill="#7a2e2e" {...OUT} strokeWidth={2.2} />;
    case "shocked":
      return <ellipse cx={0} cy={14} rx={4.5} ry={6.5} fill="#7a2e2e" {...OUT} strokeWidth={2.2} />;
    case "worried":
      return <path d="M-8,16 Q0,9 8,16" fill="none" {...OUT} />;
    case "thinking":
      return <path d="M-4,13 L7,11" fill="none" {...OUT} />;
    case "smug":
      return <path d="M-7,12 Q3,17 10,8" fill="none" {...OUT} />;
    case "stern":
      return <path d="M-7,13 L7,13" fill="none" {...OUT} />;
    default:
      return <path d="M-9,9 Q0,18 9,9" fill="none" {...OUT} />;
  }
}

/** Two arms from the shoulders, outlined, ending in a hand. Returns [back layer, front layer]. */
function Arms({ pose, sleeve, skin }: { pose: Pose; sleeve: string; skin: string }) {
  const arms: Record<Pose, [string, string, [number, number], [number, number]]> = {
    down: ["M-30,50 L-40,96", "M30,50 L40,96", [-40, 96], [40, 96]],
    up: ["M-30,50 L-52,8", "M30,50 L52,8", [-52, 8], [52, 8]],
    point: ["M-30,50 L-40,96", "M30,50 L66,38", [-40, 96], [68, 37]],
    hold: ["M-30,50 L-16,72", "M30,50 L16,72", [-14, 70], [14, 70]],
    wave: ["M-30,50 L-40,96", "M30,50 L50,6", [-40, 96], [50, 6]],
    shrug: ["M-30,50 L-52,64 L-60,44", "M30,50 L52,64 L60,44", [-60, 44], [60, 44]],
  };
  const [l, r, hl, hr] = arms[pose];
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={l} stroke={INK} strokeWidth={15} />
      <path d={r} stroke={INK} strokeWidth={15} />
      <path d={l} stroke={sleeve} strokeWidth={10} />
      <path d={r} stroke={sleeve} strokeWidth={10} />
      <circle cx={hl[0]} cy={hl[1]} r={6.5} fill={skin} {...OUT} strokeWidth={2.2} />
      <circle cx={hr[0]} cy={hr[1]} r={6.5} fill={skin} {...OUT} strokeWidth={2.2} />
    </g>
  );
}

const PENNY = { skin: "#f6c9a5", hair: "#d2553a", top: "#f6b73c", cheek: "#ef9a85" };

/** Penny Pocket, the taxpayer. */
export function Penny(props: CharacterProps) {
  const { mood = "happy", pose = "down", holding } = props;
  const p = PENNY;
  return (
    <g transform={place(props)}>
      {/* hair behind */}
      <g fill={p.hair} {...OUT}>
        <circle cx={-30} cy={-14} r={15} />
        <circle cx={30} cy={-14} r={15} />
        <circle cx={-34} cy={8} r={12} />
        <circle cx={34} cy={8} r={12} />
        <circle cx={-18} cy={-34} r={16} />
        <circle cx={18} cy={-34} r={16} />
        <circle cx={0} cy={-40} r={17} />
      </g>
      {/* body */}
      <path d="M-36,100 Q-38,42 0,36 Q38,42 36,100 Z" fill={p.top} {...OUT} />
      <path d="M-10,38 Q0,48 10,38" fill="none" {...OUT} strokeWidth={2} />
      <rect x={-6} y={24} width={12} height={14} fill={p.skin} {...OUT} strokeWidth={2} />
      {/* head */}
      <circle cx={0} cy={0} r={28} fill={p.skin} {...OUT} />
      <path d="M-27,-6 Q-27,-30 0,-31 Q27,-30 27,-6 Q20,-19 8,-15 Q0,-24 -9,-15 Q-19,-20 -27,-6 Z" fill={p.hair} {...OUT} />
      <circle cx={-17} cy={9} r={5} fill={p.cheek} opacity={0.6} />
      <circle cx={17} cy={9} r={5} fill={p.cheek} opacity={0.6} />
      <g fill="#b9734f">
        <circle cx={-19} cy={5} r={1} />
        <circle cx={-15} cy={7} r={1} />
        <circle cx={15} cy={7} r={1} />
        <circle cx={19} cy={5} r={1} />
      </g>
      <Eyes mood={mood} />
      <Mouth mood={mood} />
      <Arms pose={pose} sleeve={p.top} skin={p.skin} />
      {holding && <g transform={`translate(0 62)${props.flip ? " scale(-1 1)" : ""}`}>{holding}</g>}
      {pose === "hold" && (
        <g fill={p.skin} {...OUT} strokeWidth={2.2}>
          <circle cx={-14} cy={70} r={6.5} />
          <circle cx={14} cy={70} r={6.5} />
        </g>
      )}
    </g>
  );
}

const ACE = { skin: "#9a6646", hair: "#1d1d22", jacket: "#0f6b5c", tie: "#f6b73c" };

/** Ace, the enrolled agent. */
export function Ace(props: CharacterProps) {
  const { mood = "happy", pose = "down", holding, flip } = props;
  const a = ACE;
  return (
    <g transform={place(props)}>
      <path d="M-38,100 Q-40,42 0,36 Q40,42 38,100 Z" fill={a.jacket} {...OUT} />
      <path d="M-12,38 L0,66 L12,38 Z" fill="#fff" {...OUT} strokeWidth={2} />
      <path d="M-4,42 L4,42 L6,64 L0,72 L-6,64 Z" fill={a.tie} {...OUT} strokeWidth={2} />
      <path d="M-12,38 L-6,60 M12,38 L6,60" fill="none" {...OUT} strokeWidth={2} />
      {/* The badge is flipped back so "EA" always reads the right way. */}
      <g transform={`translate(-21 71.5) scale(${flip ? -1 : 1} 1) translate(-9 -5.5)`}>
        <rect x={0} y={0} width={18} height={11} rx={2} fill="#f6d36b" {...OUT} strokeWidth={1.6} />
        <text x={9} y={8.6} fontSize={8} fontWeight={800} textAnchor="middle" fill={INK} fontFamily="system-ui, sans-serif">
          EA
        </text>
      </g>
      <rect x={-6} y={24} width={12} height={14} fill={a.skin} {...OUT} strokeWidth={2} />
      <circle cx={-27} cy={2} r={6} fill={a.skin} {...OUT} strokeWidth={2} />
      <circle cx={27} cy={2} r={6} fill={a.skin} {...OUT} strokeWidth={2} />
      <circle cx={0} cy={0} r={28} fill={a.skin} {...OUT} />
      <path d="M-28,-4 Q-31,-36 0,-35 Q31,-36 28,-4 Q26,-20 12,-22 Q0,-17 -14,-22 Q-26,-20 -28,-4 Z" fill={a.hair} {...OUT} />
      <Eyes mood={mood} glasses />
      <Mouth mood={mood} />
      <Arms pose={pose} sleeve={a.jacket} skin={a.skin} />
      {holding && <g transform={`translate(0 62)${props.flip ? " scale(-1 1)" : ""}`}>{holding}</g>}
      {pose === "hold" && (
        <g fill={a.skin} {...OUT} strokeWidth={2.2}>
          <circle cx={-14} cy={70} r={6.5} />
          <circle cx={14} cy={70} r={6.5} />
        </g>
      )}
    </g>
  );
}

const HOOT = { body: "#7a6a58", belly: "#d9c8a9", disc: "#f1e7d3", ring: "#f2c230", beak: "#e8892c", visor: "#2f9e6a" };

/** Hoot, the IRS examiner: an owl in a green eyeshade. Pose "hold" holds a clipboard; "point" raises a wing. */
export function Hoot(props: CharacterProps & { clipboard?: boolean }) {
  const { mood = "stern", pose = "down", clipboard } = props;
  const h = HOOT;
  const lids = mood === "stern" || mood === "smug";
  const wide = mood === "shocked" || mood === "excited";
  return (
    <g transform={place(props)}>
      <path d="M-26,-30 L-34,-50 L-12,-36 Z M26,-30 L34,-50 L12,-36 Z" fill={h.body} {...OUT} />
      <ellipse cx={0} cy={44} rx={44} ry={58} fill={h.body} {...OUT} />
      <circle cx={0} cy={0} r={38} fill={h.body} {...OUT} />
      <ellipse cx={0} cy={60} rx={28} ry={36} fill={h.belly} {...OUT} strokeWidth={2} />
      <path d="M-14,44 l6,6 l6,-6 l6,6 l6,-6 M-14,62 l6,6 l6,-6 l6,6 l6,-6 M-10,80 l6,6 l6,-6 l6,6" fill="none" stroke={h.body} strokeWidth={2} />
      {/* wings */}
      {pose === "point" ? (
        <path d="M34,30 Q70,10 80,-4 Q66,30 40,56 Z" fill={h.body} {...OUT} />
      ) : (
        <path d="M38,24 Q56,56 40,92 Q30,60 32,30 Z" fill={h.body} {...OUT} />
      )}
      <path d="M-38,24 Q-56,56 -40,92 Q-30,60 -32,30 Z" fill={h.body} {...OUT} />
      {/* face */}
      <circle cx={-15} cy={0} r={17} fill={h.disc} {...OUT} strokeWidth={2} />
      <circle cx={15} cy={0} r={17} fill={h.disc} {...OUT} strokeWidth={2} />
      {mood === "happy" ? (
        <g fill="none" {...OUT} strokeWidth={3}>
          <path d="M-22,2 Q-15,-7 -8,2" />
          <path d="M8,2 Q15,-7 22,2" />
        </g>
      ) : (
        <g>
          <circle cx={-15} cy={0} r={wide ? 12 : 10} fill={h.ring} {...OUT} strokeWidth={2} />
          <circle cx={15} cy={0} r={wide ? 12 : 10} fill={h.ring} {...OUT} strokeWidth={2} />
          <circle cx={mood === "thinking" ? -13 : -15} cy={mood === "thinking" ? -3 : 0} r={wide ? 7 : 5} fill={INK} />
          <circle cx={mood === "thinking" ? 17 : 15} cy={mood === "thinking" ? -3 : 0} r={wide ? 7 : 5} fill={INK} />
          {lids && (
            <g fill={h.body} {...OUT} strokeWidth={2}>
              <path d={mood === "stern" ? "M-27,-4 L-3,2 L-3,-12 L-27,-12 Z" : "M-27,-1 L-3,-1 L-3,-12 L-27,-12 Z"} />
              <path d={mood === "stern" ? "M27,-4 L3,2 L3,-12 L27,-12 Z" : "M27,-1 L3,-1 L3,-12 L27,-12 Z"} />
            </g>
          )}
        </g>
      )}
      <path d="M-6,12 L6,12 L0,24 Z" fill={h.beak} {...OUT} strokeWidth={2} />
      {/* eyeshade */}
      <path d="M-34,-24 Q0,-54 34,-24 L28,-18 Q0,-40 -28,-18 Z" fill={h.visor} {...OUT} strokeWidth={2} />
      <path d="M-30,-20 Q0,-12 30,-20 L40,-14 Q0,-2 -40,-14 Z" fill={h.visor} opacity={0.85} {...OUT} strokeWidth={2} />
      {/* feet */}
      <path d="M-18,100 l-6,6 M-18,100 l0,8 M-18,100 l6,6 M18,100 l-6,6 M18,100 l0,8 M18,100 l6,6" stroke={h.beak} strokeWidth={3.5} strokeLinecap="round" />
      {clipboard && (
        <g transform="translate(-58 40) rotate(-8)">
          <rect x={0} y={0} width={34} height={44} rx={3} fill="#c58b4e" {...OUT} strokeWidth={2} />
          <rect x={4} y={7} width={26} height={33} fill="#fff" {...OUT} strokeWidth={1.5} />
          <rect x={11} y={-3} width={12} height={7} rx={2} fill="#9aa4b2" {...OUT} strokeWidth={1.5} />
          <path d="M8,15 h18 M8,22 h18 M8,29 h12" stroke="#9aa4b2" strokeWidth={2} />
          <path d="M22,30 l3,4 l6,-9" stroke="#1d7a49" strokeWidth={2.5} fill="none" />
        </g>
      )}
    </g>
  );
}

// ---- Props -----------------------------------------------------------------------------------------------

const FONT = "Bricolage Grotesque, Segoe UI, system-ui, sans-serif";

export function Label({ x, y, children, size = 13, color = INK, anchor = "middle", weight = 800 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: "start" | "middle" | "end"; weight?: number }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} textAnchor={anchor} fill={color} fontFamily={FONT}>
      {children}
    </text>
  );
}

/** A price tag on a string. The tag's hole sits at (x, y). */
export function PriceTag({ x, y, label, rotate = 0, color = "#fff3c4", width = 64 }: { x: number; y: number; label: string; rotate?: number; color?: string; width?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d={`M0,0 L14,-14 L${width},-14 L${width},14 L14,14 Z`} fill={color} {...OUT} strokeWidth={2} />
      <circle cx={10} cy={0} r={3} fill="#fff" {...OUT} strokeWidth={1.5} />
      <Label x={(width + 16) / 2} y={5} size={13}>
        {label}
      </Label>
    </g>
  );
}

export function StockCert({ x, y, scale = 1, rotate = 0 }: { x: number; y: number; scale?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <rect x={-26} y={-18} width={52} height={36} rx={2} fill="#e9f4ee" {...OUT} strokeWidth={2} />
      <rect x={-21} y={-13} width={42} height={26} fill="none" stroke="#1d7a49" strokeWidth={1.5} strokeDasharray="3 2" />
      <path d="M-15,8 L-6,0 L1,4 L14,-9" fill="none" stroke="#1d7a49" strokeWidth={2.5} strokeLinecap="round" />
      <Label x={0} y={-4} size={7} color="#1d7a49">
        STOCK
      </Label>
    </g>
  );
}

export function GiftBox({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-22} y={-14} width={44} height={32} fill="#5aa9e6" {...OUT} strokeWidth={2} />
      <rect x={-25} y={-22} width={50} height={10} fill="#7cc0f2" {...OUT} strokeWidth={2} />
      <rect x={-4} y={-22} width={8} height={40} fill="#e8505b" {...OUT} strokeWidth={1.6} />
      <path d="M0,-22 Q-14,-36 -16,-26 Q-14,-20 0,-22 Q14,-36 16,-26 Q14,-20 0,-22" fill="#e8505b" {...OUT} strokeWidth={1.6} />
    </g>
  );
}

export function House({ x, y, scale = 1, color = "#f4d9b0" }: { x: number; y: number; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-30} y={-20} width={60} height={42} fill={color} {...OUT} strokeWidth={2} />
      <path d="M-38,-18 L0,-50 L38,-18 Z" fill="#c8553d" {...OUT} strokeWidth={2} />
      <rect x={-8} y={0} width={16} height={22} fill="#8a5a3c" {...OUT} strokeWidth={2} />
      <rect x={-24} y={-10} width={12} height={12} fill="#bfe3f5" {...OUT} strokeWidth={1.6} />
      <rect x={12} y={-10} width={12} height={12} fill="#bfe3f5" {...OUT} strokeWidth={1.6} />
    </g>
  );
}

export function ComicBook({ x, y, scale = 1, rotate = 0 }: { x: number; y: number; scale?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <rect x={-18} y={-24} width={36} height={48} rx={2} fill="#ffe14d" {...OUT} strokeWidth={2} />
      <path d="M-10,-8 L-4,-14 L0,-6 L8,-14 L6,-4 L14,0 L4,2 L6,12 L-2,4 L-10,10 L-8,0 L-14,-4 Z" fill="#e8505b" {...OUT} strokeWidth={1.4} />
      <Label x={0} y={-15} size={7}>
        POW!
      </Label>
    </g>
  );
}

export function Hourglass({ x, y, scale = 1, sand = 0.5 }: { x: number; y: number; scale?: number; sand?: number }) {
  const top = 20 * (1 - sand);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-18} y={-30} width={36} height={6} rx={2} fill="#8a5a3c" {...OUT} strokeWidth={2} />
      <rect x={-18} y={24} width={36} height={6} rx={2} fill="#8a5a3c" {...OUT} strokeWidth={2} />
      <path d="M-14,-24 L14,-24 L2,0 L14,24 L-14,24 L-2,0 Z" fill="#eaf6ff" {...OUT} strokeWidth={2} />
      {top > 1 && <path d={`M${-14 + (24 - top) * 0.5},${-24 + (24 - top)} L${14 - (24 - top) * 0.5},${-24 + (24 - top)} L1,-1 L-1,-1 Z`} fill="#f2c230" />}
      <path d={`M-14,24 L14,24 L${14 - sand * 10},${24 - sand * 16} L${-14 + sand * 10},${24 - sand * 16} Z`} fill="#f2c230" />
    </g>
  );
}

export function Banana({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0,0 Q-20,-4 -26,8 Q-12,4 -4,6 Z" fill="#ffd84d" {...OUT} strokeWidth={2} />
      <path d="M0,0 Q20,-4 26,8 Q12,4 4,6 Z" fill="#ffd84d" {...OUT} strokeWidth={2} />
      <path d="M0,0 Q-2,-14 4,-20 Q8,-12 4,6 Z" fill="#ffd84d" {...OUT} strokeWidth={2} />
      <path d="M2,-20 l2,-5" stroke="#6b4b2a" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

export function Cash({ x, y, scale = 1, rotate = 0 }: { x: number; y: number; scale?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <rect x={-24} y={-12} width={48} height={24} rx={2} fill="#9fd8a8" {...OUT} strokeWidth={2} />
      <circle cx={0} cy={0} r={7} fill="#cdeed2" stroke="#1d7a49" strokeWidth={1.5} />
      <Label x={0} y={4.5} size={11} color="#1d7a49">
        $
      </Label>
    </g>
  );
}

/** A window frame for Hoot to pop up in. */
export function Window({ x, y, w = 70, h = 60 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#cfe9f7" {...OUT} strokeWidth={3} />
      <path d={`M${x + w / 2},${y} L${x + w / 2},${y + h} M${x},${y + h / 2} L${x + w},${y + h / 2}`} stroke={INK} strokeWidth={2} />
    </g>
  );
}

/** The panel's backdrop: a wall and a floor. */
export function Backdrop({ w = 320, h = 220, wall = "#fdf3e1", floor = "#efd9b8", floorY }: { w?: number; h?: number; wall?: string; floor?: string; floorY?: number }) {
  const fy = floorY ?? h - 26;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} fill={wall} />
      <rect x={0} y={fy} width={w} height={h - fy} fill={floor} />
      <path d={`M0,${fy} L${w},${fy}`} stroke={INK} strokeWidth={2} opacity={0.4} />
    </g>
  );
}

export function Arrow({ d, color = INK, width = 3 }: { d: string; color?: string; width?: number }) {
  const id = `ah-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <g>
      <defs>
        <marker id={id} viewBox="0 0 10 10" refX={6} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill={color} />
        </marker>
      </defs>
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" markerEnd={`url(#${id})`} />
    </g>
  );
}


const MILO = { skin: "#eab38a", hair: "#c99a4e", hoodie: "#6f7f3c", hood: "#56632d" };

/** Milo Marsh, Penny's husband (as of 11:59 PM, December 31) and a freelance dog walker. Olive hoodie, shaggy hair. */
export function Milo(props: CharacterProps) {
  const { mood = "happy", pose = "down", holding } = props;
  const m = MILO;
  return (
    <g transform={place(props)}>
      <path d="M-30,40 Q-42,14 -20,8 L20,8 Q42,14 30,40 Z" fill={m.hood} {...OUT} />
      <path d="M-38,100 Q-40,42 0,36 Q40,42 38,100 Z" fill={m.hoodie} {...OUT} />
      <path d="M-20,90 L-14,74 L14,74 L20,90 Z" fill={m.hood} {...OUT} strokeWidth={2} />
      <path d="M-6,42 L-8,60 M6,42 L8,60" stroke="#f1ead2" strokeWidth={2.5} strokeLinecap="round" />
      <rect x={-6} y={24} width={12} height={14} fill={m.skin} {...OUT} strokeWidth={2} />
      <circle cx={0} cy={0} r={28} fill={m.skin} {...OUT} />
      <g fill="#8a6a4a" opacity={0.5}>
        {[
          [-20, 12],
          [-17, 17],
          [-12, 21],
          [-6, 24],
          [0, 25],
          [6, 24],
          [12, 21],
          [17, 17],
          [20, 12],
        ].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r={1.3} />
        ))}
      </g>
      <path d="M-30,2 Q-36,-26 -14,-33 Q0,-41 14,-33 Q36,-26 30,2 L25,-11 L19,-3 L13,-16 L5,-7 L-3,-17 L-11,-7 L-18,-16 L-24,-3 Z" fill={m.hair} {...OUT} />
      <Eyes mood={mood} />
      <Mouth mood={mood} />
      <Arms pose={pose} sleeve={m.hoodie} skin={m.skin} />
      {holding && <g transform={`translate(0 62)${props.flip ? " scale(-1 1)" : ""}`}>{holding}</g>}
      {pose === "hold" && (
        <g fill={m.skin} {...OUT} strokeWidth={2.2}>
          <circle cx={-14} cy={70} r={6.5} />
          <circle cx={14} cy={70} r={6.5} />
        </g>
      )}
    </g>
  );
}

const LULU = { skin: "#c98d64", hair: "#4a2c1d", shirt: "#e8505b", overalls: "#3f7cc4", tie: "#f6d33c" };

/** Lulu Pocket, 9, Dee's daughter, who lives with Penny and Milo. Pigtails, overalls. Draw her at about 70% of an adult's scale. */
export function Lulu(props: CharacterProps) {
  const { mood = "happy", pose = "down", holding } = props;
  const l = LULU;
  return (
    <g transform={place(props)}>
      <g fill={l.hair} {...OUT}>
        <ellipse cx={-38} cy={4} rx={10} ry={15} />
        <ellipse cx={38} cy={4} rx={10} ry={15} />
      </g>
      <g fill={l.tie} {...OUT} strokeWidth={2}>
        <circle cx={-30} cy={-8} r={5} />
        <circle cx={30} cy={-8} r={5} />
      </g>
      <path d="M-34,100 Q-36,44 0,38 Q36,44 34,100 Z" fill={l.shirt} {...OUT} />
      <path d="M-33,62 L33,62 M-34,78 L34,78" stroke="#fff" strokeWidth={4} opacity={0.7} />
      <path d="M-20,58 L20,58 L24,100 L-24,100 Z" fill={l.overalls} {...OUT} strokeWidth={2} />
      <path d="M-18,58 L-24,42 M18,58 L24,42" stroke={l.overalls} strokeWidth={5} strokeLinecap="round" />
      <circle cx={-14} cy={63} r={2.5} fill={l.tie} stroke={INK} strokeWidth={1} />
      <circle cx={14} cy={63} r={2.5} fill={l.tie} stroke={INK} strokeWidth={1} />
      <rect x={-8} y={70} width={16} height={12} rx={2} fill="none" stroke={INK} strokeWidth={1.6} />
      <rect x={-6} y={26} width={12} height={14} fill={l.skin} {...OUT} strokeWidth={2} />
      <circle cx={0} cy={0} r={28} fill={l.skin} {...OUT} />
      <path d="M-28,-2 Q-29,-31 0,-32 Q29,-31 28,-2 Q24,-16 12,-17 L8,-11 L2,-18 Q-14,-20 -28,-2 Z" fill={l.hair} {...OUT} />
      <Eyes mood={mood} />
      <Mouth mood={mood} />
      <Arms pose={pose} sleeve={l.shirt} skin={l.skin} />
      {holding && <g transform={`translate(0 62)${props.flip ? " scale(-1 1)" : ""}`}>{holding}</g>}
      {pose === "hold" && (
        <g fill={l.skin} {...OUT} strokeWidth={2.2}>
          <circle cx={-14} cy={70} r={6.5} />
          <circle cx={14} cy={70} r={6.5} />
        </g>
      )}
    </g>
  );
}

const DEE = { skin: "#c98d64", hair: "#2b1a12", coverall: "#e8762c", hat: "#f2c230" };

/** Cousin Dee Pocket, Lulu's mom, who works on an oil rig overseas: hard hat and orange coveralls. Usually seen in a VideoCall. */
export function Dee(props: CharacterProps) {
  const { mood = "happy", pose = "down", holding } = props;
  const d = DEE;
  return (
    <g transform={place(props)}>
      <path d="M-38,100 Q-40,42 0,36 Q40,42 38,100 Z" fill={d.coverall} {...OUT} />
      <path d="M-14,38 L0,56 L14,38" fill="none" {...OUT} strokeWidth={2} />
      <path d="M-38,74 L38,74" stroke="#d8f0ff" strokeWidth={5} />
      <path d="M-38,74 L38,74" stroke="#9fb6c6" strokeWidth={1.5} strokeDasharray="4 3" />
      <rect x={-6} y={24} width={12} height={14} fill={d.skin} {...OUT} strokeWidth={2} />
      <path d="M-26,-6 Q-34,18 -24,26 L-20,4 Z M26,-6 Q34,18 24,26 L20,4 Z" fill={d.hair} {...OUT} strokeWidth={2} />
      <circle cx={0} cy={0} r={28} fill={d.skin} {...OUT} />
      <Eyes mood={mood} />
      <Mouth mood={mood} />
      <path d="M-33,-12 Q-32,-44 0,-44 Q32,-44 33,-12 Z" fill={d.hat} {...OUT} />
      <path d="M-40,-12 L40,-12 L38,-6 L-38,-6 Z" fill={d.hat} {...OUT} strokeWidth={2} />
      <path d="M0,-44 L0,-14 M-14,-40 L-10,-14 M14,-40 L10,-14" stroke={INK} strokeWidth={1.5} opacity={0.5} />
      <Arms pose={pose} sleeve={d.coverall} skin={d.skin} />
      {holding && <g transform={`translate(0 62)${props.flip ? " scale(-1 1)" : ""}`}>{holding}</g>}
    </g>
  );
}

const ROSA = { skin: "#e9b896", hair: "#c9c6c2", dress: "#9c4f8a", apron: "#fdf6ea", chain: "#c9a24a" };

/** Aunt Rosa Pocket, Walt's sister, who runs Rosa's Rolls bakery. Grey bun, glasses on a chain, flour-dusted apron. */
export function Rosa(props: CharacterProps) {
  const { mood = "happy", pose = "down", holding } = props;
  const r = ROSA;
  return (
    <g transform={place(props)}>
      <path d="M-38,100 Q-40,42 0,36 Q40,42 38,100 Z" fill={r.dress} {...OUT} />
      <path d="M-24,100 L-22,52 L22,52 L24,100 Z" fill={r.apron} {...OUT} strokeWidth={2} />
      <path d="M-22,52 L-12,40 M22,52 L12,40" stroke={r.apron} strokeWidth={4} strokeLinecap="round" />
      <path d="M-14,70 h28" stroke="#e8505b" strokeWidth={2} />
      <g fill="#fff" opacity={0.9}>
        <circle cx={-10} cy={84} r={2} />
        <circle cx={6} cy={78} r={1.6} />
        <circle cx={12} cy={90} r={2.2} />
      </g>
      <rect x={-6} y={24} width={12} height={14} fill={r.skin} {...OUT} strokeWidth={2} />
      <circle cx={0} cy={-38} r={15} fill={r.hair} {...OUT} />
      <circle cx={0} cy={0} r={28} fill={r.skin} {...OUT} />
      <path d="M-28,-2 Q-31,-32 0,-31 Q31,-32 28,-2 Q24,-18 10,-20 Q0,-14 -10,-20 Q-24,-18 -28,-2 Z" fill={r.hair} {...OUT} />
      <path d="M-25,4 Q-30,22 -16,32 M25,4 Q30,22 16,32" fill="none" stroke={r.chain} strokeWidth={1.6} />
      <circle cx={-15} cy={11} r={4.5} fill="#ef9a85" opacity={0.55} />
      <circle cx={15} cy={11} r={4.5} fill="#ef9a85" opacity={0.55} />
      <Eyes mood={mood} glasses />
      <Mouth mood={mood} />
      <Arms pose={pose} sleeve={r.dress} skin={r.skin} />
      {holding && <g transform={`translate(0 62)${props.flip ? " scale(-1 1)" : ""}`}>{holding}</g>}
      {pose === "hold" && (
        <g fill={r.skin} {...OUT} strokeWidth={2.2}>
          <circle cx={-14} cy={70} r={6.5} />
          <circle cx={14} cy={70} r={6.5} />
        </g>
      )}
    </g>
  );
}

/**
 * A tablet on a video call with Dee on her oil rig. (x, y) is the screen's top-left corner; the screen is
 * 120 by 90 at scale 1. Signal bars and a "can you hear me?" wobble are part of the joke.
 */
export function VideoCall({ x, y, scale = 1, mood = "happy", pose = "down", bars = 1 }: { x: number; y: number; scale?: number; mood?: Mood; pose?: Pose; bars?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-8} y={-8} width={136} height={106} rx={10} fill="#2a2f3a" {...OUT} />
      <rect x={0} y={0} width={120} height={90} fill="#bfe3f5" />
      <rect x={0} y={62} width={120} height={28} fill="#3a7bb0" />
      <g stroke={INK} strokeWidth={1.5} fill="#8a96a6" opacity={0.8}>
        <path d="M86,62 L92,30 L100,30 L106,62 Z" />
        <path d="M92,30 L96,18 L100,30" fill="none" />
        <rect x={82} y={56} width={30} height={6} />
      </g>
      <Dee x={46} y={40} scale={0.56} mood={mood} pose={pose} />
      <rect x={-8} y={90} width={136} height={14} rx={0} fill="#2a2f3a" />
      <rect x={-8} y={90} width={136} height={8} fill="#2a2f3a" stroke={INK} strokeWidth={0} />
      <path d="M-8,98 L128,98" stroke={INK} strokeWidth={2.5} />
      <g fill="#fff">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={98 + i * 5} y={14 - i * 3} width={3} height={4 + i * 3} opacity={i < bars ? 1 : 0.3} />
        ))}
      </g>
      <circle cx={8} cy={8} r={3.5} fill="#e8505b" />
    </g>
  );
}

/** Biscuit, Milo's beagle. Sits facing right around (0, 0), the middle of the head; about 80 units tall. */
export function Biscuit({ x, y, scale = 1, flip, mood = "happy" }: { x: number; y: number; scale?: number; flip?: boolean; mood?: "happy" | "sad" | "excited" | "sleepy" }) {
  const tan = "#c98a4b";
  const brown = "#7a4a24";
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M-20,58 Q-38,44 -34,22" fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" />
      <path d="M-20,58 Q-38,44 -34,22" fill="none" stroke={tan} strokeWidth={5} strokeLinecap="round" />
      <circle cx={-34} cy={21} r={3.5} fill="#fff" {...OUT} strokeWidth={1.5} />
      <path d="M-24,74 Q-32,32 -6,16 L14,16 Q32,34 26,74 Z" fill={tan} {...OUT} />
      <path d="M-24,70 Q-28,40 -8,26 Q-2,44 -10,72 Z" fill="#2b2420" opacity={0.85} />
      <path d="M4,22 Q18,32 16,72 L0,72 Q-2,42 4,22 Z" fill="#fff" stroke={INK} strokeWidth={1.5} />
      <ellipse cx={4} cy={76} rx={8} ry={5} fill="#fff" {...OUT} strokeWidth={2} />
      <ellipse cx={20} cy={76} rx={8} ry={5} fill="#fff" {...OUT} strokeWidth={2} />
      <ellipse cx={2} cy={0} rx={20} ry={18} fill={tan} {...OUT} />
      <path d="M8,-18 Q12,-4 12,6 L18,6 Q16,-6 12,-18 Z" fill="#fff" />
      <ellipse cx={18} cy={9} rx={13} ry={9} fill="#fff" {...OUT} strokeWidth={2} />
      <circle cx={30} cy={5} r={4} fill={INK} />
      {mood === "happy" || mood === "excited" ? (
        <path d="M18,14 Q20,26 26,24 Q28,18 26,14 Z" fill="#f28fb0" {...OUT} strokeWidth={1.5} />
      ) : (
        <path d="M14,15 Q20,12 26,15" fill="none" {...OUT} strokeWidth={2} />
      )}
      {mood === "sleepy" ? (
        <path d="M6,-4 Q10,-1 14,-4" fill="none" {...OUT} strokeWidth={2} />
      ) : mood === "sad" ? (
        <g>
          <circle cx={10} cy={-3} r={3} fill={INK} />
          <path d="M5,-10 L14,-7" {...OUT} strokeWidth={2} />
        </g>
      ) : (
        <g>
          <circle cx={10} cy={-4} r={mood === "excited" ? 4 : 3.2} fill={INK} />
          <circle cx={11} cy={-5.5} r={1} fill="#fff" />
        </g>
      )}
      <path d="M-6,-14 Q-24,-10 -20,22 Q-8,26 -4,2 Z" fill={brown} {...OUT} />
      <path d="M-10,72 L-18,68" stroke="#f2c230" strokeWidth={0} />
      <path d="M-4,30 Q6,36 18,30" fill="none" stroke="#e8505b" strokeWidth={4} strokeLinecap="round" />
      <circle cx={8} cy={36} r={3} fill="#f2c230" {...OUT} strokeWidth={1.2} />
    </g>
  );
}

/**
 * Grandpa Walt Pocket's portrait, which comments from the wall. (x, y) is the frame's top-left; 64 by 78 at scale 1.
 */
export function WaltPortrait({ x, y, scale = 1, mood = "happy" }: { x: number; y: number; scale?: number; mood?: Mood }) {
  const skin = "#f1c8a6";
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-6} y={-6} width={76} height={90} rx={4} fill="#c9a24a" {...OUT} />
      <rect x={0} y={0} width={64} height={78} fill="#5b7a6a" stroke={INK} strokeWidth={1.5} />
      <g transform="translate(32 34) scale(0.72)">
        <path d="M-38,64 Q-40,40 0,36 Q40,40 38,64 Z" fill="#4a3a5c" {...OUT} />
        <path d="M-8,38 L0,52 L8,38" fill="#fff" {...OUT} strokeWidth={2} />
        <circle cx={0} cy={0} r={28} fill={skin} {...OUT} />
        <g fill="#f4f4f0" {...OUT} strokeWidth={2}>
          <ellipse cx={-27} cy={-6} rx={8} ry={11} />
          <ellipse cx={27} cy={-6} rx={8} ry={11} />
        </g>
        <Eyes mood={mood} glasses />
        <path d="M-14,10 Q-7,4 0,8 Q7,4 14,10 Q8,16 0,12 Q-8,16 -14,10 Z" fill="#f4f4f0" {...OUT} strokeWidth={2} />
        <Mouth mood={mood === "happy" ? "excited" : mood} />
      </g>
    </g>
  );
}

export type CastMember = "Penny" | "Ace" | "Hoot" | "Milo" | "Lulu" | "Dee" | "Biscuit" | "Walt" | "Rosa";

/** A head-and-shoulders badge for a cast member, for game cards and lists. */
export function Face({ who, mood, size = 56 }: { who: CastMember; mood?: Mood; size?: number }) {
  const clip = `face${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const bg: Record<CastMember, string> = { Penny: "#fff3c4", Ace: "#d8f0e2", Hoot: "#eaf6ef", Milo: "#eef0d8", Lulu: "#fde2e4", Dee: "#ffe4cc", Biscuit: "#f5e6d3", Walt: "#e6eef0", Rosa: "#f3e1ef" };
  const art: Record<CastMember, ReactNode> = {
    Penny: <Penny x={0} y={6} mood={mood ?? "happy"} />,
    Ace: <Ace x={0} y={6} mood={mood ?? "happy"} />,
    Hoot: <Hoot x={0} y={10} scale={0.85} mood={mood ?? "stern"} />,
    Milo: <Milo x={0} y={6} mood={mood ?? "happy"} />,
    Lulu: <Lulu x={0} y={6} mood={mood ?? "happy"} />,
    Dee: <Dee x={0} y={10} scale={0.9} mood={mood ?? "happy"} />,
    Biscuit: <Biscuit x={-6} y={4} scale={1.05} mood="happy" />,
    Walt: <WaltPortrait x={-32} y={-36} scale={1} mood={mood ?? "happy"} />,
    Rosa: <Rosa x={0} y={8} mood={mood ?? "happy"} />,
  };
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} aria-hidden className="cast-face">
      <defs>
        <clipPath id={clip}>
          <circle cx={0} cy={0} r={48} />
        </clipPath>
      </defs>
      <circle cx={0} cy={0} r={49} fill={bg[who]} />
      <g clipPath={`url(#${clip})`}>{art[who]}</g>
      <circle cx={0} cy={0} r={48} fill="none" stroke={INK} strokeWidth={3} />
    </svg>
  );
}

/**
 * The Ledger Falls cast. Characters call each other by name in dialogue, and Hoot uses full names.
 * See the series bible for who's who: Dee and Penny are cousins, so Lulu is Penny's cousin's daughter
 * (she calls Penny "Aunt Penny"), which matters for the dependent rules in episode 1.3.
 */
export const CAST = [
  { name: "Penny Pocket", short: "Penny", role: "The taxpayer", line: "Buys, sells, inherits and asks “so what do I owe?” at the worst moment." },
  { name: "Ace Okafor, EA", short: "Ace", role: "The enrolled agent", line: "Penny's neighbor. Calm, a little dry, and always says “Penny, let's check the rule.”" },
  { name: "Examiner Horace “Hoot” Hootington", short: "Hoot", role: "The IRS examiner", line: "An owl in a green eyeshade. Strict but fair, terrible at parties. “Hoo-hoo! Nothing is free.”" },
  { name: "Milo Marsh", short: "Milo", role: "Penny's husband", line: "Freelance dog walker, keeper of the shoebox. “Wait, is that deductible?”" },
  { name: "Lulu Pocket", short: "Lulu", role: "Age 9, lives with Penny and Milo", line: "Dee's daughter, too smart for her age, owns stock. “I'm a dependent, not a dependable!”" },
  { name: "Cousin Dee Pocket", short: "Dee", role: "Lulu's mom, on an oil rig overseas", line: "Always on a video call with one bar of signal. “Can you hear me now?”" },
  { name: "Aunt Rosa Pocket", short: "Rosa", role: "Grandpa Walt's sister, the baker", line: "Runs Rosa's Rolls on Main Street and gives everyone everything. “Take a roll. Take two. Take my car.”" },
  { name: "Biscuit", short: "Biscuit", role: "Milo's beagle", line: "The only resident of Ledger Falls with no tax problems. “Woof.”" },
] as const;

/** The three leads together, for the Study home page. */
export function CastPortrait() {
  return (
    <svg viewBox="0 0 360 170" role="img" aria-label="Penny Pocket, Ace and Hoot">
      <rect x={0} y={0} width={360} height={170} rx={12} fill="#fdf3e1" />
      <rect x={0} y={150} width={360} height={20} fill="#efd9b8" />
      <Penny x={70} y={70} scale={0.78} mood="excited" pose="wave" />
      <Ace x={180} y={70} scale={0.78} mood="happy" pose="down" />
      <Hoot x={290} y={64} scale={0.74} mood="stern" clipboard />
      <Label x={70} y={163} size={12}>
        Penny
      </Label>
      <Label x={180} y={163} size={12}>
        Ace
      </Label>
      <Label x={290} y={163} size={12}>
        Hoot
      </Label>
    </svg>
  );
}

/** The whole Season 1 household plus Ace and Hoot, for the season page. */
export function FamilyPortrait() {
  return (
    <svg viewBox="0 0 520 190" role="img" aria-label="The cast of Ledger Falls: Dee on a video call, Milo, Penny, Lulu, Biscuit, Ace and Hoot">
      <rect x={0} y={0} width={520} height={190} rx={12} fill="#fdf3e1" />
      <rect x={0} y={166} width={520} height={24} fill="#efd9b8" />
      <WaltPortrait x={18} y={18} scale={0.62} mood="happy" />
      <VideoCall x={78} y={22} scale={0.5} mood="excited" pose="wave" bars={1} />
      <Milo x={170} y={88} scale={0.74} mood="happy" />
      <Penny x={248} y={88} scale={0.74} mood="excited" pose="wave" />
      <Lulu x={312} y={118} scale={0.5} mood="smug" />
      <Biscuit x={124} y={128} scale={0.48} mood="happy" />
      <Ace x={384} y={88} scale={0.72} mood="happy" />
      <Hoot x={466} y={84} scale={0.66} mood="stern" clipboard />
    </svg>
  );
}

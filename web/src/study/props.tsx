import type { ReactNode } from "react";
import { Label } from "./cast";

/**
 * Shared props for Ledger Falls panels and cards: paperwork, the mailbox, the wedding clock and party
 * gear. Each is drawn around (x, y) unless its comment says otherwise.
 */

const INK = "#17202c";
const OUT = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** The viewBoxes every lesson uses: comic panels are 320 by 220, concept cards 320 by 180, hooks 320 by 120. */
export const PANEL = { viewBox: "0 0 320 220", preserveAspectRatio: "xMidYMax meet" } as const;
export const CARD = { viewBox: "0 0 320 180" } as const;
export const HOOK = { viewBox: "0 0 320 120" } as const;

/** A form or document with a big label, e.g. "W-2". About 40 by 52 at scale 1. */
export function Paper({ x, y, label, sub, rotate = 0, scale = 1, color = "#fff", ink = INK }: { x: number; y: number; label: string; sub?: string; rotate?: number; scale?: number; color?: string; ink?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M-20,-26 L12,-26 L20,-18 L20,26 L-20,26 Z" fill={color} {...OUT} />
      <path d="M12,-26 L12,-18 L20,-18" fill="none" {...OUT} strokeWidth={1.5} />
      <Label x={0} y={-4} size={label.length > 7 ? 7.5 : label.length > 5 ? 9 : 12} color={ink}>
        {label}
      </Label>
      {sub && (
        <Label x={0} y={8} size={sub.length > 9 ? 5.5 : 7} color="#4f5c6c" weight={700}>
          {sub}
        </Label>
      )}
      <path d="M-13,14 h26 M-13,20 h18" stroke="#9aa4b2" strokeWidth={2} />
    </g>
  );
}

/** A cardboard shoebox overflowing with papers. */
export function Shoebox({ x, y, scale = 1, labels = ["W-2", "1099", "?!"] }: { x: number; y: number; scale?: number; labels?: string[] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {labels.map((l, i) => (
        <Paper key={l + i} x={-18 + i * 18} y={-18 - (i % 2) * 6} label={l} rotate={-14 + i * 14} scale={0.7} />
      ))}
      <rect x={-32} y={-6} width={64} height={30} fill="#c58b4e" {...OUT} />
      <rect x={-34} y={-10} width={68} height={7} fill="#d9a066" {...OUT} />
      <Label x={0} y={14} size={8} color="#5a3a1c">
        SHOES
      </Label>
    </g>
  );
}

/** An envelope. "irs" gives it the official look Hoot's letters have. About 56 by 36. */
export function Envelope({ x, y, label, rotate = 0, scale = 1, irs }: { x: number; y: number; label?: string; rotate?: number; scale?: number; irs?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <rect x={-28} y={-18} width={56} height={36} rx={2} fill={irs ? "#f4f1e8" : "#fff"} {...OUT} />
      <path d="M-28,-18 L0,4 L28,-18" fill="none" {...OUT} strokeWidth={1.6} />
      {irs && <rect x={14} y={-14} width={10} height={12} fill="#2f9e6a" stroke={INK} strokeWidth={1} />}
      {label && (
        <Label x={0} y={14} size={label.length > 6 ? 8 : 10} color={irs ? "#a8321f" : INK}>
          {label}
        </Label>
      )}
    </g>
  );
}

/** A curbside mailbox on a post. (x, y) is the bottom of the post. */
export function Mailbox({ x, y, scale = 1, flag = true, stuffed = false }: { x: number; y: number; scale?: number; flag?: boolean; stuffed?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-5} y={-70} width={10} height={70} fill="#8a5a3c" {...OUT} />
      {stuffed && (
        <g>
          <Envelope x={-34} y={-98} rotate={-30} scale={0.55} />
          <Envelope x={-40} y={-82} rotate={10} scale={0.55} label="1099" />
          <Envelope x={-30} y={-108} rotate={-60} scale={0.5} />
        </g>
      )}
      <path d="M-30,-70 L-30,-96 Q-30,-112 -14,-112 L26,-112 Q30,-112 30,-104 L30,-70 Z" fill="#5aa9e6" {...OUT} />
      <path d="M-30,-96 Q-30,-112 -14,-112 Q2,-112 2,-96 L2,-70 L-30,-70 Z" fill="#3f8fcc" {...OUT} />
      {flag && (
        <g>
          <rect x={30} y={-108} width={4} height={30} fill="#e8505b" {...OUT} strokeWidth={1.5} />
          <rect x={30} y={-108} width={16} height={10} fill="#e8505b" {...OUT} strokeWidth={1.5} />
        </g>
      )}
    </g>
  );
}

/** A wall clock with a "DEC 31" plate, at 11:58 or 11:59. */
export function Clock({ x, y, minute = 59, scale = 1 }: { x: number; y: number; minute?: number; scale?: number }) {
  const ma = (minute / 60) * 2 * Math.PI;
  const ha = ((11 + minute / 60) / 12) * 2 * Math.PI;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle r={22} fill="#fff" stroke={INK} strokeWidth={3} />
      {[0, 3, 6, 9].map((h) => (
        <circle key={h} cx={17 * Math.sin((h / 12) * 2 * Math.PI)} cy={-17 * Math.cos((h / 12) * 2 * Math.PI)} r={1.6} fill={INK} />
      ))}
      <path d={`M0,0 L${11 * Math.sin(ha)},${-11 * Math.cos(ha)}`} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path d={`M0,0 L${17 * Math.sin(ma)},${-17 * Math.cos(ma)}`} stroke="#a8321f" strokeWidth={2} strokeLinecap="round" />
      <rect x={-22} y={26} width={44} height={14} rx={3} fill="#a8321f" stroke={INK} strokeWidth={1.5} />
      <Label x={0} y={37} size={9} color="#fff">
        DEC 31
      </Label>
    </g>
  );
}

/** A bridal veil, drawn behind a character placed at the same x, y and scale. */
export function Veil({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-34,-34 Q0,-62 34,-34 L50,52 Q0,66 -50,52 Z" fill="#ffffff" opacity={0.75} stroke={INK} strokeWidth={2} />
    </g>
  );
}

/** A flower crown, drawn in front of a character placed at the same x, y and scale. */
export function Flowers({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-24, -12, 0, 12, 24].map((dx, i) => (
        <circle key={i} cx={dx} cy={-52 + Math.abs(dx) * 0.35} r={6} fill={i % 2 ? "#f6b73c" : "#f28fb0"} stroke={INK} strokeWidth={1.6} />
      ))}
    </g>
  );
}

export function Bouquet({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-4,4 L0,22 L4,4 Z" fill="#3f8f5a" stroke={INK} strokeWidth={1.5} />
      <circle cx={-6} cy={0} r={6} fill="#f28fb0" stroke={INK} strokeWidth={1.5} />
      <circle cx={6} cy={0} r={6} fill="#ffffff" stroke={INK} strokeWidth={1.5} />
      <circle cx={0} cy={-7} r={6} fill="#f6b73c" stroke={INK} strokeWidth={1.5} />
    </g>
  );
}

export function BowTie({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0,0 L-12,-7 L-12,7 Z M0,0 L12,-7 L12,7 Z" fill="#17202c" stroke={INK} strokeWidth={1.5} />
      <circle r={3} fill="#17202c" />
    </g>
  );
}

export function PartyHat({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
      <path d="M-16,0 L0,-40 L16,0 Z" fill="#7b5cd6" stroke={INK} strokeWidth={2} />
      <path d="M-10,-14 L10,-14 M-5,-27 L5,-27" stroke="#f6b73c" strokeWidth={3} />
      <circle cx={0} cy={-42} r={5} fill="#f6b73c" stroke={INK} strokeWidth={1.5} />
    </g>
  );
}

/** Firework or "pow" burst lines. */
export function Burst({ x, y, r, color }: { x: number; y: number; r: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * 2 * Math.PI;
        return <path key={i} d={`M${0.35 * r * Math.cos(a)},${0.35 * r * Math.sin(a)} L${r * Math.cos(a)},${r * Math.sin(a)}`} stroke={color} strokeWidth={3} strokeLinecap="round" />;
      })}
      <circle r={3} fill={color} />
    </g>
  );
}

export function Confetti({ w = 320, top = 70, h = 110 }: { w?: number; top?: number; h?: number }) {
  return (
    <g>
      {Array.from({ length: 26 }, (_, i) => {
        const x = (i * 53) % w;
        const y = top + ((i * 37) % h);
        const c = ["#e8505b", "#f6b73c", "#5aa9e6", "#2f9e6a", "#7b5cd6"][i % 5];
        return <rect key={i} x={x} y={y} width={5} height={9} fill={c} transform={`rotate(${(i * 47) % 90} ${x} ${y})`} />;
      })}
    </g>
  );
}

/** A tear-off calendar page. About 48 by 54. */
export function Calendar({ x, y, month, day, scale = 1, rotate = 0, color = "#e8505b" }: { x: number; y: number; month: string; day: string; scale?: number; rotate?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <rect x={-24} y={-27} width={48} height={54} rx={4} fill="#fff" {...OUT} />
      <path d="M-24,-27 h48 v16 h-48 Z" fill={color} {...OUT} />
      <Label x={0} y={-15} size={10} color="#fff">
        {month}
      </Label>
      <Label x={0} y={16} size={day.length > 2 ? 15 : 22}>
        {day}
      </Label>
    </g>
  );
}

/** A rubber-stamp mark, like APPROVED or HOO-HOO. */
export function Stamp({ x, y, text, color = "#1d7a49", rotate = -12, size = 14 }: { x: number; y: number; text: string; color?: string; rotate?: number; size?: number }) {
  const w = text.length * size * 0.72 + 16;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} opacity={0.9}>
      <rect x={-w / 2} y={-size} width={w} height={size * 2} rx={4} fill="none" stroke={color} strokeWidth={3} />
      <Label x={0} y={size * 0.36} size={size} color={color}>
        {text}
      </Label>
    </g>
  );
}

/** A desk top running across the panel at height y. */
export function Desk({ x = 0, y, w = 320 }: { x?: number; y: number; w?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={12} fill="#a8774f" {...OUT} />
      <rect x={x} y={y + 12} width={w} height={60} fill="#8a5a3c" opacity={0.85} />
    </g>
  );
}

/** A green chalkboard or whiteboard. (x, y) is the top-left. Lines are written centered. */
export function Board({ x, y, w = 130, h = 80, lines, chalk = true, size = 13 }: { x: number; y: number; w?: number; h?: number; lines: string[]; chalk?: boolean; size?: number }) {
  const gap = size + 7;
  const top = y + h / 2 - ((lines.length - 1) * gap) / 2 + size * 0.36;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={chalk ? "#2e4a3f" : "#fff"} stroke={chalk ? "#8a5a3c" : INK} strokeWidth={chalk ? 6 : 2.5} />
      {lines.map((l, i) => (
        <Label key={i} x={x + w / 2} y={top + i * gap} size={size} color={chalk ? "#f4f1e8" : INK}>
          {l}
        </Label>
      ))}
    </g>
  );
}

/** A small globe. */
export function Globe({ x, y, r = 22 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#5aa9e6" {...OUT} />
      <path d={`M${-r * 0.6},${-r * 0.5} q${r * 0.4},${-r * 0.2} ${r * 0.6},${r * 0.2} q${-r * 0.1},${r * 0.4} ${-r * 0.5},${r * 0.3} Z M${r * 0.1},${r * 0.1} q${r * 0.5},${-r * 0.1} ${r * 0.6},${r * 0.3} q${-r * 0.2},${r * 0.5} ${-r * 0.5},${r * 0.3} Z`} fill="#3f8f5a" stroke={INK} strokeWidth={1.2} />
      <ellipse rx={r} ry={r * 0.35} fill="none" stroke={INK} strokeWidth={1} opacity={0.4} />
    </g>
  );
}

/** A bank building with a name on the pediment. (x, y) is the bottom center. */
export function Bank({ x, y, label, scale = 1, color = "#e9e2d0" }: { x: number; y: number; label: string; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-40,-50 L0,-74 L40,-50 Z" fill={color} {...OUT} />
      <Label x={0} y={-55} size={9}>
        {label}
      </Label>
      <rect x={-38} y={-50} width={76} height={6} fill={color} {...OUT} />
      {[-28, -10, 8, 26].map((cx) => (
        <rect key={cx} x={cx - 3} y={-44} width={6} height={36} fill="#fff" {...OUT} strokeWidth={1.5} />
      ))}
      <rect x={-42} y={-8} width={84} height={8} fill={color} {...OUT} />
    </g>
  );
}

/** A heart, for warm moments. */
export function Heart({ x, y, s = 1, color = "#e8505b" }: { x: number; y: number; s?: number; color?: string }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M0,6 C-14,-4 -10,-14 -4,-14 C-1,-14 0,-11 0,-9 C0,-11 1,-14 4,-14 C10,-14 14,-4 0,6 Z" fill={color} stroke={INK} strokeWidth={1.5} />;
}

/** A question mark or exclamation mark floating over a head. */
export function Mark({ x, y, text = "?", color = "#e8505b", size = 26 }: { x: number; y: number; text?: string; color?: string; size?: number }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={900} textAnchor="middle" fill={color} stroke={INK} strokeWidth={1.2} fontFamily="Bricolage Grotesque, system-ui, sans-serif">
      {text}
    </text>
  );
}

/** Motion lines, e.g. behind something flying past. */
export function Whoosh({ x, y, dir = 1 }: { x: number; y: number; dir?: 1 | -1 }) {
  return (
    <g stroke={INK} strokeWidth={2} strokeLinecap="round" opacity={0.6}>
      <path d={`M${x},${y} h${-24 * dir}`} />
      <path d={`M${x - 4 * dir},${y + 8} h${-18 * dir}`} />
      <path d={`M${x - 2 * dir},${y - 8} h${-14 * dir}`} />
    </g>
  );
}

/** A labeled step for staircase or ladder pictures. (x, y) is the top-left. */
export function Step({ x, y, w, h, color, label, sub }: { x: number; y: number; w: number; h: number; color: string; label: string; sub?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={color} {...OUT} />
      <Label x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 5)} size={13}>
        {label}
      </Label>
      {sub && (
        <Label x={x + w / 2} y={y + h / 2 + 12} size={9} weight={700}>
          {sub}
        </Label>
      )}
    </g>
  );
}

/** A rounded sign on a post or a plain card, with lines of text. (x, y) is the top-left. */
export function Card({ x, y, w, h, lines, color = "#fff", size = 12, children }: { x: number; y: number; w: number; h: number; lines?: string[]; color?: string; size?: number; children?: ReactNode }) {
  const gap = size + 5;
  const top = y + h / 2 - (((lines?.length ?? 1) - 1) * gap) / 2 + size * 0.36;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={color} {...OUT} />
      {lines?.map((l, i) => (
        <Label key={i} x={x + w / 2} y={top + i * gap} size={size}>
          {l}
        </Label>
      ))}
      {children}
    </g>
  );
}

/** A big green check or red cross. */
export function Tick({ x, y, ok, s = 1 }: { x: number; y: number; ok: boolean; s?: number }) {
  return ok ? (
    <path transform={`translate(${x} ${y}) scale(${s})`} d="M-10,0 L-3,8 L11,-9" fill="none" stroke="#1d7a49" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
  ) : (
    <path transform={`translate(${x} ${y}) scale(${s})`} d="M-8,-8 L8,8 M8,-8 L-8,8" fill="none" stroke="#c0392b" strokeWidth={5} strokeLinecap="round" />
  );
}

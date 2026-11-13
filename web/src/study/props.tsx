import type { ReactNode } from "react";
import { Label } from "./cast";

/**
 * Props for the Season 1 episodes: paperwork, calendars, crowns and the rest of Ledger Falls. Like the cast,
 * each is drawn around its own (x, y) so panels and cards can place it with a translate and a scale.
 */

const INK = "#17202c";
const OUT = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

type At = { x: number; y: number; scale?: number; rotate?: number };
const at = ({ x, y, scale = 1, rotate = 0 }: At) => `translate(${x} ${y}) rotate(${rotate}) scale(${scale})`;

/** A tax form: a sheet of paper with its name across the top. About 56 by 72 at scale 1. */
export function Doc({ label, sub, color = "#fff", band = "#5aa9e6", ...p }: At & { label: string; sub?: string; color?: string; band?: string }) {
  return (
    <g transform={at(p)}>
      <path d="M-28,-36 L18,-36 L28,-26 L28,36 L-28,36 Z" fill={color} {...OUT} />
      <path d="M18,-36 L18,-26 L28,-26" fill="#e8edf5" {...OUT} strokeWidth={1.5} />
      <rect x={-24} y={-30} width={38} height={14} fill={band} stroke={INK} strokeWidth={1.2} />
      <Label x={-5} y={-19} size={10} color="#fff">
        {label}
      </Label>
      {sub && (
        <Label x={0} y={30} size={7} weight={700}>
          {sub}
        </Label>
      )}
      <path d="M-22,-6 h44 M-22,4 h44 M-22,14 h30" stroke="#9aa4b2" strokeWidth={2} />
    </g>
  );
}

/** An envelope. With `irs`, it carries the eagle-free IRS window and a red "OFFICIAL" stamp. */
export function Envelope({ irs, label, ...p }: At & { irs?: boolean; label?: string }) {
  return (
    <g transform={at(p)}>
      <rect x={-34} y={-22} width={68} height={44} rx={3} fill={irs ? "#fbf7ee" : "#fff"} {...OUT} />
      <path d="M-34,-22 L0,4 L34,-22" fill="none" {...OUT} />
      {irs && (
        <g>
          <rect x={-28} y={6} width={30} height={11} fill="#dfeaf6" stroke={INK} strokeWidth={1.2} />
          <Label x={-13} y={15} size={8}>
            IRS
          </Label>
          <rect x={10} y={-17} width={20} height={14} fill="none" stroke="#a8321f" strokeWidth={1.6} transform="rotate(8 20 -10)" />
        </g>
      )}
      {label && (
        <Label x={0} y={36} size={10}>
          {label}
        </Label>
      )}
    </g>
  );
}

/** A tear-off calendar page: month on top, day underneath. About 50 by 56. */
export function CalendarPage({ top, big, ring = true, color = "#e8505b", ...p }: At & { top: string; big: string; ring?: boolean; color?: string }) {
  return (
    <g transform={at(p)}>
      <rect x={-25} y={-26} width={50} height={54} rx={4} fill="#fff" {...OUT} />
      <rect x={-25} y={-26} width={50} height={16} rx={4} fill={color} {...OUT} />
      <Label x={0} y={-14} size={10} color="#fff">
        {top}
      </Label>
      <Label x={0} y={18} size={22}>
        {big}
      </Label>
      {ring && (
        <g fill="#9aa4b2" stroke={INK} strokeWidth={1.2}>
          <circle cx={-12} cy={-28} r={3} />
          <circle cx={12} cy={-28} r={3} />
        </g>
      )}
    </g>
  );
}

/** A crown, for Head of Household. About 60 wide. */
export function Crown(p: At) {
  return (
    <g transform={at(p)}>
      <path d="M-28,10 L-30,-16 L-14,-2 L0,-22 L14,-2 L30,-16 L28,10 Z" fill="#f2c230" {...OUT} strokeWidth={2.4} />
      <rect x={-28} y={8} width={56} height={9} rx={2} fill="#e0a920" {...OUT} />
      <circle cx={0} cy={-22} r={4} fill="#e8505b" {...OUT} strokeWidth={1.5} />
      <circle cx={-30} cy={-16} r={3.5} fill="#5aa9e6" {...OUT} strokeWidth={1.5} />
      <circle cx={30} cy={-16} r={3.5} fill="#5aa9e6" {...OUT} strokeWidth={1.5} />
    </g>
  );
}

/** A globe on a stand. About 50 across. */
export function Globe(p: At) {
  return (
    <g transform={at(p)}>
      <path d="M-14,34 h28 M0,24 v10" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <circle cx={0} cy={0} r={24} fill="#7cc0f2" {...OUT} strokeWidth={2.4} />
      <path d="M-16,-12 q8,-6 14,0 q4,8 -4,12 q-8,2 -10,-4 Z M4,6 q10,-4 14,4 q-2,10 -10,8 Z M6,-18 q6,-2 10,4 q-4,2 -10,-4 Z" fill="#7bc47f" stroke={INK} strokeWidth={1.4} />
      <path d="M-30,6 A32,32 0 0 0 28,10" fill="none" stroke="#8a5a3c" strokeWidth={3} />
    </g>
  );
}

/** A bank building with a name over the door. About 80 wide. */
export function Bank({ name = "BANK", color = "#eef0f4", ...p }: At & { name?: string; color?: string }) {
  return (
    <g transform={at(p)}>
      <path d="M-42,-14 L0,-40 L42,-14 Z" fill={color} {...OUT} strokeWidth={2.4} />
      <rect x={-40} y={-14} width={80} height={8} fill={color} {...OUT} />
      <Label x={0} y={-20} size={9}>
        {name}
      </Label>
      {[-28, -10, 8, 26].map((cx) => (
        <rect key={cx} x={cx} y={-6} width={6} height={36} fill="#fff" {...OUT} strokeWidth={1.6} />
      ))}
      <rect x={-44} y={30} width={88} height={8} fill={color} {...OUT} />
    </g>
  );
}

/** An airplane, flying right. About 70 long. */
export function Plane(p: At) {
  return (
    <g transform={at(p)}>
      <path d="M-34,0 Q-30,-8 20,-6 Q34,-4 36,0 Q34,4 20,6 Q-30,8 -34,0 Z" fill="#fff" {...OUT} strokeWidth={2.2} />
      <path d="M-4,-4 L-14,-24 L-6,-24 L12,-4 Z M-4,4 L-14,22 L-6,22 L12,4 Z M-30,-2 L-36,-14 L-30,-14 L-22,-4 Z" fill="#5aa9e6" {...OUT} strokeWidth={1.6} />
      <g fill="#7cc0f2" stroke={INK} strokeWidth={1}>
        <circle cx={0} cy={-1} r={2} />
        <circle cx={8} cy={-1} r={2} />
        <circle cx={16} cy={-1} r={2} />
      </g>
    </g>
  );
}

/** A heart. */
export function Heart({ fill = "#e8505b", ...p }: At & { fill?: string }) {
  return (
    <g transform={at(p)}>
      <path d="M0,10 C-22,-4 -12,-20 0,-9 C12,-20 22,-4 0,10 Z" fill={fill} {...OUT} />
    </g>
  );
}

/** A five-point star. */
export function Star({ fill = "#f2c230", ...p }: At & { fill?: string }) {
  return (
    <g transform={at(p)}>
      <path d="M0,-12 L3.5,-4 L12,-3.7 L5.5,2 L7.4,10.5 L0,6 L-7.4,10.5 L-5.5,2 L-12,-3.7 L-3.5,-4 Z" fill={fill} {...OUT} strokeWidth={1.6} />
    </g>
  );
}

/** A rubber-stamp mark, like APPROVED or DENIED. */
export function Stamp({ text, color = "#1d7a49", w = 96, ...p }: At & { text: string; color?: string; w?: number }) {
  return (
    <g transform={at(p)} opacity={0.9}>
      <rect x={-w / 2} y={-14} width={w} height={28} rx={4} fill="none" stroke={color} strokeWidth={3.5} />
      <Label x={0} y={6} size={15} color={color}>
        {text}
      </Label>
    </g>
  );
}

/** A magnifying glass, lens at (0, 0). */
export function Magnifier(p: At) {
  return (
    <g transform={at(p)}>
      <path d="M14,14 L32,32" stroke="#8a5a3c" strokeWidth={8} strokeLinecap="round" />
      <path d="M14,14 L32,32" stroke={INK} strokeWidth={2} strokeLinecap="round" opacity={0.3} />
      <circle cx={0} cy={0} r={18} fill="rgba(191,227,245,0.55)" stroke={INK} strokeWidth={4} />
    </g>
  );
}

/** An ID card, like a Social Security card or an ITIN letter. About 72 by 44. */
export function IdCard({ title, line, color = "#dfeaf6", ...p }: At & { title: string; line: string; color?: string }) {
  return (
    <g transform={at(p)}>
      <rect x={-36} y={-22} width={72} height={44} rx={5} fill={color} {...OUT} />
      <Label x={0} y={-8} size={9}>
        {title}
      </Label>
      <Label x={0} y={8} size={10} weight={700}>
        {line}
      </Label>
      <path d="M-26,15 h52" stroke="#9aa4b2" strokeWidth={1.5} />
    </g>
  );
}

/** A wooden sign on a post. */
export function Sign({ text, w = 90, ...p }: At & { text: string; w?: number }) {
  return (
    <g transform={at(p)}>
      <path d="M0,10 V48" stroke="#8a5a3c" strokeWidth={6} />
      <rect x={-w / 2} y={-14} width={w} height={26} rx={3} fill="#e9c38f" {...OUT} />
      <Label x={0} y={4} size={11}>
        {text}
      </Label>
    </g>
  );
}

/** A piggy bank, facing right. About 60 long. */
export function Piggy({ color = "#f4a7b9", ...p }: At & { color?: string }) {
  return (
    <g transform={at(p)}>
      <ellipse cx={0} cy={0} rx={28} ry={20} fill={color} {...OUT} strokeWidth={2.2} />
      <circle cx={26} cy={-2} r={8} fill={color} {...OUT} />
      <circle cx={24} cy={-3} r={1.4} fill={INK} />
      <circle cx={28} cy={-3} r={1.4} fill={INK} />
      <path d="M6,-18 L12,-28 L16,-16 Z" fill={color} {...OUT} />
      <path d="M-12,18 v8 M10,18 v8" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <rect x={-8} y={-22} width={14} height={3} rx={1} fill={INK} />
      <circle cx={12} cy={-6} r={2} fill={INK} />
      <path d="M-28,-2 q-8,-6 -4,-12" fill="none" stroke={INK} strokeWidth={2} />
    </g>
  );
}

/** A lemonade stand, Milo's business. About 90 wide. */
export function LemonadeStand(p: At) {
  return (
    <g transform={at(p)}>
      <path d="M-44,-44 L44,-44 L40,-30 L-40,-30 Z" fill="#f2c230" {...OUT} />
      <path d="M-40,-30 V30 M40,-30 V30" stroke="#8a5a3c" strokeWidth={4} />
      <rect x={-44} y={0} width={88} height={30} fill="#fff3c4" {...OUT} />
      <Label x={0} y={20} size={11}>
        LEMONADE 50¢
      </Label>
      <path d="M-14,-12 h12 l-2,12 h-8 Z M6,-12 h12 l-2,12 h-8 Z" fill="#fff7a8" {...OUT} strokeWidth={1.5} />
    </g>
  );
}

/** A dog bowl that says what's in it. */
export function Bowl({ text = "BISCUIT", ...p }: At & { text?: string }) {
  return (
    <g transform={at(p)}>
      <path d="M-24,-6 h48 l-6,14 h-36 Z" fill="#e8505b" {...OUT} />
      <Label x={0} y={5} size={7} color="#fff">
        {text}
      </Label>
    </g>
  );
}

/** A stack of mail, spilling. */
export function MailPile(p: At) {
  return (
    <g transform={at(p)}>
      <Envelope x={-18} y={10} rotate={-12} scale={0.7} />
      <Envelope x={16} y={14} rotate={10} scale={0.7} irs />
      <Envelope x={0} y={-6} rotate={-3} scale={0.7} />
    </g>
  );
}

/** A health insurance card. */
export function HealthCard(p: At & { label?: string }) {
  return <IdCard {...p} title="HEALTH PLAN" line={p.label ?? "MARKETPLACE"} color="#e3f4ea" />;
}

/** A desk with a lamp, for Ace's office. Top surface at y. */
export function Desk({ x, y, w = 140 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y} width={w} height={10} fill="#a8774f" {...OUT} />
      <path d={`M${x - w / 2 + 10},${y + 10} V${y + 60} M${x + w / 2 - 10},${y + 10} V${y + 60}`} stroke="#8a5a3c" strokeWidth={6} />
    </g>
  );
}

/** A thought or caption box drawn inside the art, for numbers that belong to the picture. */
export function Box({ x, y, w, h, fill = "#fff", children }: { x: number; y: number; w: number; h: number; fill?: string; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={fill} {...OUT} />
      {children}
    </g>
  );
}

/** Wavy motion lines, for things flying in or Penny running in. */
export function Whoosh({ x, y, flip }: { x: number; y: number; flip?: boolean }) {
  const s = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s} 1)`} stroke={INK} strokeWidth={2.4} strokeLinecap="round" fill="none" opacity={0.6}>
      <path d="M0,-10 q-10,-4 -22,0" />
      <path d="M2,0 q-12,-4 -28,0" />
      <path d="M0,10 q-10,-4 -22,0" />
    </g>
  );
}

/** Little stars or sweat drops that pop around a head. */
export function Pop({ x, y, kind = "stars" }: { x: number; y: number; kind?: "stars" | "sweat" | "question" | "bang" }) {
  if (kind === "sweat")
    return (
      <g transform={`translate(${x} ${y})`} fill="#7cc0f2" stroke={INK} strokeWidth={1.4}>
        <path d="M0,0 q-5,8 0,10 q5,-2 0,-10 Z" />
        <path d="M10,-8 q-4,6 0,8 q4,-2 0,-8 Z" />
      </g>
    );
  if (kind === "question" || kind === "bang")
    return (
      <g transform={`translate(${x} ${y})`}>
        <Label x={0} y={0} size={26} color={kind === "bang" ? "#e8505b" : INK}>
          {kind === "bang" ? "!" : "?"}
        </Label>
        <Label x={16} y={-10} size={18} color={kind === "bang" ? "#e8505b" : INK}>
          {kind === "bang" ? "!" : "?"}
        </Label>
      </g>
    );
  return (
    <g transform={`translate(${x} ${y})`}>
      <Star x={0} y={0} scale={0.6} />
      <Star x={16} y={-10} scale={0.45} />
      <Star x={-12} y={-12} scale={0.4} />
    </g>
  );
}

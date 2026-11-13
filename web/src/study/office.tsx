import { Label } from "./cast";

// Props for Season 3, "Ace for the Defense": Ace's office above Rosa's Rolls, Hoot's hiding places, and
// Quick Refund Rex's billboards. Same ink and line weight as props.tsx.

const INK = "#17202c";
const OUT = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** A hanging wooden sign. (x, y) is the top-left; text is centered. */
export function Sign({ x, y, w = 150, h = 36, text, sub, color = "#c9a26b", size = 12 }: { x: number; y: number; w?: number; h?: number; text: string; sub?: string; color?: string; size?: number }) {
  return (
    <g>
      <path d={`M${x + 18},${y} V${y - 10} M${x + w - 18},${y} V${y - 10}`} {...OUT} strokeWidth={2} />
      <rect x={x} y={y} width={w} height={h} rx={5} fill={color} {...OUT} />
      <Label x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + size * 0.36)} size={size}>
        {text}
      </Label>
      {sub && (
        <Label x={x + w / 2} y={y + h / 2 + 11} size={8} weight={700}>
          {sub}
        </Label>
      )}
    </g>
  );
}

/**
 * A filing cabinet front. Draw it AFTER a character to have them pop out of the top drawer.
 * (x, y) is the top-left of the cabinet; it's 70 wide and 110 tall at scale 1.
 */
export function FilingCabinet({ x, y, scale = 1, open = false, label }: { x: number; y: number; scale?: number; open?: boolean; label?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={0} y={0} width={70} height={110} rx={3} fill="#9aa4b2" {...OUT} />
      {open && <rect x={-6} y={-6} width={82} height={34} rx={3} fill="#b8c1cc" {...OUT} />}
      {[open ? 34 : 6, 40, 74].map((dy) => (
        <g key={dy}>
          <rect x={6} y={dy} width={58} height={30} rx={2} fill="#b8c1cc" stroke={INK} strokeWidth={1.5} />
          <rect x={27} y={dy + 12} width={16} height={5} rx={2} fill={INK} />
        </g>
      ))}
      {label && (
        <Label x={35} y={open ? 18 : 18} size={9}>
          {label}
        </Label>
      )}
    </g>
  );
}

/** A roadside billboard on two posts. (x, y) is the top-left of the board. */
export function Billboard({ x, y, w = 150, h = 70, lines, color = "#fff3c4", size = 12 }: { x: number; y: number; w?: number; h?: number; lines: string[]; color?: string; size?: number }) {
  const gap = size + 5;
  const top = y + h / 2 - ((lines.length - 1) * gap) / 2 + size * 0.36;
  return (
    <g>
      <path d={`M${x + 24},${y + h} V${y + h + 60} M${x + w - 24},${y + h} V${y + h + 60}`} stroke="#7a5a35" strokeWidth={6} />
      <rect x={x} y={y} width={w} height={h} rx={4} fill={color} {...OUT} />
      {lines.map((l, i) => (
        <Label key={i} x={x + w / 2} y={top + i * gap} size={size}>
          {l}
        </Label>
      ))}
    </g>
  );
}

/** Biscuit's doghouse. Draw it after a character to hide them inside. (x, y) is the bottom center. */
export function Doghouse({ x, y, scale = 1, name = "BISCUIT" }: { x: number; y: number; scale?: number; name?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-46,0 V-50 L0,-86 L46,-50 V0 Z" fill="#c0603e" {...OUT} />
      <path d="M-52,-46 L0,-92 L52,-46" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d="M-20,0 V-26 A20,20 0 0 1 20,-26 V0 Z" fill="#2a2f3a" />
      <rect x={-26} y={-66} width={52} height={12} rx={2} fill="#fff3c4" stroke={INK} strokeWidth={1.5} />
      <Label x={0} y={-57} size={7}>
        {name}
      </Label>
    </g>
  );
}

/** A big horseshoe magnet, for levies. (x, y) is the center of the bend. */
export function Magnet({ x, y, scale = 1, rotate = 0, label = "LEVY" }: { x: number; y: number; scale?: number; rotate?: number; label?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M-24,-30 V0 A24,24 0 0 0 24,0 V-30 H12 V0 A12,12 0 0 1 -12,0 V-30 Z" fill="#e8505b" {...OUT} />
      <rect x={-24} y={-40} width={12} height={10} fill="#d9dde3" {...OUT} strokeWidth={2} />
      <rect x={12} y={-40} width={12} height={10} fill="#d9dde3" {...OUT} strokeWidth={2} />
      <Label x={0} y={20} size={8} color="#fff">
        {label}
      </Label>
    </g>
  );
}

/** A judge's gavel. (x, y) is the head's center. */
export function Gavel({ x, y, scale = 1, rotate = -30 }: { x: number; y: number; scale?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <rect x={-3} y={0} width={6} height={36} rx={2} fill="#a8804b" {...OUT} strokeWidth={2} />
      <rect x={-16} y={-10} width={32} height={16} rx={4} fill="#7a5a35" {...OUT} />
    </g>
  );
}

/** A laptop. (x, y) is the bottom center of the base; the screen shows `screen`. */
export function Laptop({ x, y, scale = 1, screen, color = "#d4ebfa", size = 10 }: { x: number; y: number; scale?: number; screen?: string; color?: string; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-34} y={-50} width={68} height={44} rx={4} fill="#2a2f3a" {...OUT} />
      <rect x={-29} y={-45} width={58} height={34} fill={color} />
      {screen && (
        <Label x={0} y={-24} size={size}>
          {screen}
        </Label>
      )}
      <path d="M-42,0 L-34,-6 H34 L42,0 Z" fill="#9aa4b2" {...OUT} />
    </g>
  );
}

/** A cardboard "time machine": a box with a dial and a lever. (x, y) is the bottom center. */
export function TimeMachine({ x, y, scale = 1, year = "2023" }: { x: number; y: number; scale?: number; year?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-40} y={-80} width={80} height={80} fill="#d9b382" {...OUT} />
      <path d="M-40,-80 L-30,-92 H50 L40,-80 M40,0 L50,-12 V-92" fill="#c9a26b" {...OUT} />
      <circle cx={0} cy={-52} r={16} fill="#fff" {...OUT} strokeWidth={2} />
      <Label x={0} y={-49} size={9}>
        {year}
      </Label>
      <path d="M22,-20 L32,-38" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <circle cx={32} cy={-38} r={4} fill="#e8505b" {...OUT} strokeWidth={1.5} />
      <Label x={0} y={-10} size={7}>
        DO NOT RECYCLE
      </Label>
    </g>
  );
}

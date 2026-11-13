import type { Bubble, ComicPanel } from "./lesson";

/** One speech bubble laid over a comic panel. */
export function SpeechBubble({ b }: { b: Bubble }) {
  return (
    <p className={`bubble tail-${b.tail ?? "down"} who-${b.who.toLowerCase()}${b.shout ? " shout" : ""}`} style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%` }}>
      <span className="sr-only">{b.who === "Walt" ? "Grandpa Walt" : b.who}: </span>
      {b.text}
    </p>
  );
}

/** The panels of a Ledger Falls comic, two to a row on wider screens. Used by lessons and the pitch page. */
export function ComicPanels({ panels }: { panels: ComicPanel[] }) {
  return (
    <div className="comic">
      {panels.map((p, i) => (
        <figure key={i} className="comic-panel">
          <div role="img" aria-label={p.alt}>
            {p.art}
          </div>
          {p.bubbles.map((b, k) => (
            <SpeechBubble key={k} b={b} />
          ))}
          <span className="comic-num" aria-hidden>
            {i + 1}
          </span>
        </figure>
      ))}
    </div>
  );
}

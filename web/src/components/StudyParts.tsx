import { Link } from "react-router-dom";
import { PARTS } from "../data/exam";
import type { PartId } from "../lib/types";
import { episodes } from "../study";
import { Face, type CastMember } from "../study/cast";
import { SEASONS, STUDY_OUTLINE } from "../study/outline";
import { Chip } from "./TopBar";

const STARS: Record<PartId, CastMember[]> = {
  part1: ["Penny", "Milo", "Lulu", "Dee"],
  part2: ["Milo", "Biscuit", "Walt"],
  part3: ["Ace", "Hoot"],
};

/** The three exam parts as Study blocks. Each opens its season's contents. */
export default function StudyParts() {
  return (
    <div className="season-grid">
      {PARTS.map((p) => {
        const ready = episodes(p.id).length;
        const total = STUDY_OUTLINE[p.id].reduce((n, d) => n + d.topics.length, 0);
        const s = SEASONS[p.id];
        return (
          <Link key={p.id} to={`/study/${p.id}`} className={`season-block${ready ? " live" : ""}`}>
            <span className="faces" aria-hidden>
              {STARS[p.id].map((w) => (
                <Face key={w} who={w} size={44} />
              ))}
            </span>
            <span className="eyebrow">
              Season {s.number} · {s.name}
            </span>
            <strong className="season-title">{p.title}</strong>
            <span className="muted" style={{ fontSize: 15 }}>
              {s.blurb}
            </span>
            <span className="row spread" style={{ marginTop: "auto" }}>
              <Chip tone={ready ? "good" : undefined}>
                {ready} of {total} episodes ready
              </Chip>
              <span className="season-open">Open →</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

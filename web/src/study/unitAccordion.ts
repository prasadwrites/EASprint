/**
 * Which units are expanded on a season page. The learner's choice is kept per season in this
 * browser; until they make one, the unit holding their next episode starts open and the rest closed.
 */
const KEY = "eas.openUnits.";

interface UnitLike {
  id: string;
  topics: { lessonId?: string }[];
}

export function initialOpenUnits(
  part: string,
  units: UnitLike[],
  played: (lessonId: string) => boolean,
  canOpen: (unitId: string) => boolean,
  hash = "",
  ready: (lessonId: string) => boolean = () => true,
): Set<string> {
  const ids = new Set(units.map((u) => u.id));
  let open: Set<string> | null = null;
  try {
    const saved = localStorage.getItem(KEY + part);
    if (saved) open = new Set((JSON.parse(saved) as string[]).filter((id) => ids.has(id)));
  } catch {
    /* storage unavailable */
  }
  if (!open) {
    const next =
      units.find((u) => canOpen(u.id) && u.topics.some((t) => t.lessonId && ready(t.lessonId) && !played(t.lessonId))) ?? units[0];
    open = new Set(next ? [next.id] : []);
  }
  // A link straight to a unit (#unit-<id>) always opens it.
  const linked = hash.startsWith("#unit-") ? hash.slice("#unit-".length) : "";
  if (ids.has(linked)) open.add(linked);
  return open;
}

export function saveOpenUnits(part: string, open: Set<string>): void {
  try {
    localStorage.setItem(KEY + part, JSON.stringify([...open]));
  } catch {
    /* storage unavailable */
  }
}

/**
 * Which sections (units, and "Meet the cast") are expanded on a season page. Everything starts
 * collapsed. What the learner opens is kept for this browser tab only, so coming back from an
 * episode shows the same view, and a fresh visit starts collapsed again.
 */
const KEY = "eas.openUnits.";
export const CAST_SECTION = "cast";

export function initialOpenUnits(part: string, ids: string[], hash = ""): Set<string> {
  const known = new Set(ids);
  let open = new Set<string>();
  try {
    const saved = sessionStorage.getItem(KEY + part);
    if (saved) open = new Set((JSON.parse(saved) as string[]).filter((id) => known.has(id)));
  } catch {
    /* storage unavailable */
  }
  // A link straight to a section (#unit-<id>) always opens it.
  const linked = hash.startsWith("#unit-") ? hash.slice("#unit-".length) : "";
  if (known.has(linked)) open.add(linked);
  return open;
}

export function saveOpenUnits(part: string, open: Set<string>): void {
  try {
    sessionStorage.setItem(KEY + part, JSON.stringify([...open]));
  } catch {
    /* storage unavailable */
  }
}

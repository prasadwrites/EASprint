/**
 * Best Ace vs. Hoot game scores, per lesson, kept in this browser only. They're a small reward on the
 * season page, so losing them (private window, cleared storage) costs nothing.
 */
const KEY = "eas.studyGame";

export interface Score {
  right: number;
  total: number;
}

function read(): Record<string, Score> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<string, Score>;
  } catch {
    return {};
  }
}

export function bestScore(lessonId: string): Score | null {
  return read()[lessonId] ?? null;
}

/** Keeps the score if it beats the best so far. Returns true when it's a new best. */
export function saveScore(lessonId: string, s: Score): boolean {
  const all = read();
  const old = all[lessonId];
  if (old && old.right / old.total >= s.right / s.total) return false;
  all[lessonId] = s;
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable */
  }
  return true;
}

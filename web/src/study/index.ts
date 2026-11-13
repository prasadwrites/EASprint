import type { Account } from "../lib/account";
import { db } from "../lib/firebase";
import type { PartId } from "../lib/types";
import type { Lesson } from "./lesson";
import basis from "./lessons/basis";
import dependents from "./lessons/dependents";
import foreignAca from "./lessons/foreignAca";
import gettingStarted from "./lessons/gettingStarted";
import paperTrail from "./lessons/paperTrail";
import whoFiles from "./lessons/whoFiles";
import { STUDY_OUTLINE, type StudyTopic } from "./outline";

export const LESSONS: Record<string, Lesson> = Object.fromEntries([gettingStarted, whoFiles, dependents, paperTrail, foreignAca, basis].map((l) => [l.id, l]));

/**
 * Study lessons are part of the paid plans (Pro and Pro Max). The admin always has them, and so does the app
 * when it runs without Firebase, where there are no accounts. The Firestore rules enforce the same for notes.
 */
export const hasStudyAccess = (account: Account | null, admin: boolean) => !db || admin || account?.plan === "pro" || account?.plan === "promax";

/** The outline topic a lesson belongs to, for its "Part 1 · 2.5" label. */
export function topicOf(lesson: Lesson): StudyTopic | undefined {
  return STUDY_OUTLINE[lesson.part].find((d) => d.id === lesson.domainId)?.topics.find((t) => t.lessonId === lesson.id);
}

/** Each exam part is a season of Ledger Falls, and each domain a unit: Part 1 is Season 1, its first domain Unit 1. */
export const SEASON: Record<PartId, number> = { part1: 1, part2: 2, part3: 3 };

export const unitOf = (lesson: Lesson) => STUDY_OUTLINE[lesson.part].findIndex((d) => d.id === lesson.domainId) + 1;

/** The live lessons of a part, in outline order. */
export function lessonsInPart(part: PartId): Lesson[] {
  return STUDY_OUTLINE[part].flatMap((d) => d.topics.flatMap((t) => (t.lessonId && LESSONS[t.lessonId] ? [LESSONS[t.lessonId]] : [])));
}

/** The next live episode in the same part, for "Next episode". */
export function nextLesson(lesson: Lesson): Lesson | undefined {
  const all = lessonsInPart(lesson.part);
  return all[all.findIndex((l) => l.id === lesson.id) + 1];
}

/**
 * The "Generate a questionnaire" link: the deck builder, filled in with the lesson's topic and instructions that
 * keep the questions on the tax rules (never the comic's story) and cast the Ledger Falls characters in them.
 */
export function questionnaireLink(lesson: Lesson): string {
  const topic = lesson.deck?.topic ?? lesson.title;
  const rules = lesson.deck?.rules ?? lesson.title.toLowerCase();
  const notes =
    `Test only these rules: ${rules}. Write each question as a short scenario starring the Ledger Falls cast (Penny Pocket the taxpayer, her nephew Milo, Ace the enrolled agent, examiner Hoot). ` +
    "Never ask about the cartoon's story or the characters themselves.";
  const q = new URLSearchParams({ topic: topic.slice(0, 200), part: lesson.part, notes: notes.slice(0, 600) });
  return `/create?${q}`;
}

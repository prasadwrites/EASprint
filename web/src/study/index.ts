import type { Account } from "../lib/account";
import { db } from "../lib/firebase";
import type { Lesson } from "./lesson";
import basis from "./lessons/basis";
import { STUDY_OUTLINE, type StudyTopic } from "./outline";

export const LESSONS: Record<string, Lesson> = { [basis.id]: basis };

/**
 * Study lessons are part of the paid plans (Pro and Pro Max). The admin always has them, and so does the app
 * when it runs without Firebase, where there are no accounts. The Firestore rules enforce the same for notes.
 */
export const hasStudyAccess = (account: Account | null, admin: boolean) => !db || admin || account?.plan === "pro" || account?.plan === "promax";

/** The outline topic a lesson belongs to, for its "Part 1 · 2.5" label. */
export function topicOf(lesson: Lesson): StudyTopic | undefined {
  return STUDY_OUTLINE[lesson.part].find((d) => d.id === lesson.domainId)?.topics.find((t) => t.lessonId === lesson.id);
}

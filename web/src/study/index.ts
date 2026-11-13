import type { Account } from "../lib/account";
import { db } from "../lib/firebase";
import type { PartId } from "../lib/types";
import type { Lesson } from "./lesson";
import basis from "./lessons/basis";
import hearme from "./lessons/hearme";
import lulu from "./lessons/lulu";
import mailbox from "./lessons/mailbox";
import marriage from "./lessons/marriage";
import shoebox from "./lessons/shoebox";
import raffle from "./lessons/raffle";
import spareroom from "./lessons/spareroom";
import ira from "./lessons/ira";
import offshore from "./lessons/offshore";
import swapmeet from "./lessons/swapmeet";
import aboveline from "./lessons/aboveline";
import itemizing from "./lessons/itemizing";
import qbi from "./lessons/qbi";
import credits from "./lessons/credits";
import school from "./lessons/school";
import eitc from "./lessons/eitc";
import solar from "./lessons/solar";
import amt from "./lessons/amt";
import selfemployed from "./lessons/selfemployed";
import surtax from "./lessons/surtax";
import lastpaycheck from "./lessons/lastpaycheck";
import penalties from "./lessons/penalties";
import yearreview from "./lessons/yearreview";
import planning from "./lessons/planning";
import plea from "./lessons/plea";
import estate from "./lessons/estate";
import gifts from "./lessons/gifts";
import avalanche from "./lessons/avalanche";
import shingle from "./lessons/shingle";
import billboard from "./lessons/billboard";
import rex from "./lessons/rex";
import poa from "./lessons/poa";
import shoebox3 from "./lessons/shoebox3";
import statute3 from "./lessons/statute3";
import { STUDY_OUTLINE, type StudyTopic } from "./outline";

export const LESSONS: Record<string, Lesson> = Object.fromEntries([shoebox, marriage, lulu, mailbox, hearme, basis, raffle, spareroom, ira, offshore, swapmeet, aboveline, itemizing, qbi, credits, school, eitc, solar, amt, selfemployed, surtax, lastpaycheck, penalties, yearreview, planning, plea, estate, gifts, avalanche, shingle, billboard, rex, poa, shoebox3, statute3].map((l) => [l.id, l]));

/**
 * Study lessons are part of the paid plans (Pro and Pro Max). The admin always has them, and so does the app
 * when it runs without Firebase, where there are no accounts. The Firestore rules enforce the same for notes.
 */
export const hasStudyAccess = (account: Account | null, admin: boolean) => !db || admin || account?.plan === "pro" || account?.plan === "promax";

/** The outline topic a lesson belongs to, for its "Part 1 · 2.5" label. */
export function topicOf(lesson: Lesson): StudyTopic | undefined {
  return STUDY_OUTLINE[lesson.part].find((d) => d.id === lesson.domainId)?.topics.find((t) => t.lessonId === lesson.id);
}

/** The lessons of a part that are ready, in outline order: the season's episodes so far. */
export function episodes(part: PartId): Lesson[] {
  return STUDY_OUTLINE[part].flatMap((d) => d.topics.flatMap((t) => (t.lessonId && LESSONS[t.lessonId] ? [LESSONS[t.lessonId]] : [])));
}

/** The next ready episode after this one in the same part, if any. */
export function nextEpisode(lesson: Lesson): Lesson | undefined {
  const list = episodes(lesson.part);
  return list[list.findIndex((l) => l.id === lesson.id) + 1];
}

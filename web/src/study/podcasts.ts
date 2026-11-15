import type { Account } from "../lib/account";
import type { PartId } from "../lib/types";
import type { CastMember } from "./cast";
import { canOpenUnit } from ".";

/**
 * Two podcasts per Study unit, each a funny cast conversation:
 * - Ledger Falls Unplugged: the cast talks through the unit's rules.
 * - The Hot Seat: a quiz show. Ace and Hoot ask exam-style questions, the rest of the cast answers (sometimes
 *   wrong), then Ace and Hoot explain the rule and give a memory trick or exam tip.
 * Scripts live in podcasts/scripts/<id>.txt at the repo root and are rendered by podcasts/render.py into
 * web/public/podcasts/<id>.mp3 plus <id>.json (the timed transcript the player reads).
 * Access follows the unit: free accounts get Season 1, Unit 1; Pro and Pro Max get every unit.
 */
export type ShowId = "unplugged" | "hotseat";

export const SHOWS: Record<ShowId, { name: string; icon: string; tagline: string }> = {
  unplugged: { name: "Ledger Falls Unplugged", icon: "🎧", tagline: "The cast talks through the unit's rules." },
  hotseat: {
    name: "The Hot Seat",
    icon: "🔥",
    tagline: "Ace and Hoot quiz the cast with exam-style questions, explain every answer and give a memory trick for exam day.",
  },
};

export interface Podcast {
  /** The audio and transcript file name, and the player URL: the unit id, plus "-hotseat" for The Hot Seat. */
  id: string;
  show: ShowId;
  /** The unit (exam domain id). */
  domainId: string;
  part: PartId;
  title: string;
  blurb: string;
  /** Who's on the mic, for the faces on the card. */
  cast: CastMember[];
  /** Rounded length of the audio, from the rendered transcript. */
  minutes: number;
}

/** One line of the timed transcript: a cast member speaking, a sound cue, or a stage direction. */
export interface TranscriptLine {
  /** Seconds from the start of the audio. */
  t: number;
  who?: string;
  text?: string;
  cue?: string;
  stage?: string;
  /** The Hot Seat: a question sting, numbered from 1. */
  q?: number;
  /** The Hot Seat: a line that starts "Memory trick:", "Exam tip:" or "Trap alert:". */
  tip?: boolean;
}

export interface Transcript {
  id: string;
  title: string;
  seconds: number;
  lines: TranscriptLine[];
}

const p = (part: PartId, domainId: string, minutes: number, title: string, cast: CastMember[], blurb: string): Podcast => ({
  id: domainId,
  show: "unplugged",
  part,
  domainId,
  minutes,
  title,
  cast,
  blurb,
});
const h = (part: PartId, domainId: string, minutes: number, title: string, cast: CastMember[], blurb: string): Podcast => ({
  id: `${domainId}-hotseat`,
  show: "hotseat",
  part,
  domainId,
  minutes,
  title,
  cast,
  blurb,
});

export const PODCASTS: Podcast[] = [
  p("part1", "p1d1", 23, "Shoebox Day and the One-Minute Marriage", ["Milo", "Penny", "Ace", "Hoot", "Lulu", "Dee"],
    "Milo launches a tax podcast in the hall closet, Hoot climbs out of the laundry hamper, and Lulu insists, again, that she is a qualifying relative."),
  p("part1", "p1d2", 24, "The Raffle, the Rental and Grandpa's IRA", ["Milo", "Penny", "Ace", "Hoot", "Dee", "Lulu"],
    "Penny's raffle mower is income, Milo becomes a landlord in a fedora, and Hoot steps out of the vegetable drawer to talk rollovers."),
  p("part1", "p1d3", 23, "The Great Itemizing Debate and Other Credits", ["Milo", "Penny", "Ace", "Hoot", "Lulu", "Dee"],
    "Penny makes slides for nothing, Lulu demands her $500 credit, and Hoot audits Ace's alphabetized snacks."),
  p("part1", "p1d4", 19, "The Other Tax, the Surtaxes and Hoot's Calculator", ["Milo", "Penny", "Ace", "Hoot", "Rosa"],
    "Hoot rises out of Biscuit's beanbag for the AMT, Aunt Rosa brings scones, and the penalty calculator catches fire."),
  p("part1", "p1d5", 14, "The Year in Review, Penny Plans Ahead and Dee's Plea", ["Milo", "Penny", "Ace", "Hoot", "Dee", "Lulu"],
    "A December check in a drawer, a spreadsheet romance, and Dee's innocent spouse plea, from a tree made of old W-2s."),
  p("part1", "p1d6", 15, "Grandpa's Estate, Rosa's Generosity and Dee's Avalanche", ["Milo", "Penny", "Ace", "Hoot", "Rosa", "Dee"],
    "The Season 1 finale at Rosa's Rolls: Hoot bursts out of a flour sack, Rosa gives money to everyone, and Dee brings a van full of foreign forms."),
  p("part2", "p2d1", 17, "Rosa Wants a Yacht", ["Milo", "Rosa", "Penny", "Ace", "Hoot"],
    "Rosa wants the bakery to buy a yacht, Milo's corporation lasts a week, and Gerald is not allowed to be the partnership representative."),
  p("part2", "p2d2", 31, "Bertha, the Disco Ball and the Ghost of Losses Past", ["Milo", "Rosa", "Penny", "Ace", "Hoot", "Lulu"],
    "Nine episodes in one sitting: Hoot lives in Bertha the oven, Milo is an employed cinnamon roll, and the NOL ghost is wearing Hoot's good bedsheet."),
  p("part2", "p2d3", 21, "Grandpa Walt Gets Mail, Rolly Retires and a Hen Named Deduction", ["Milo", "Rosa", "Penny", "Ace", "Hoot", "Lulu"],
    "Hoot hides behind Grandpa Walt's portrait, the Milo Foundation pours lattes, and Deduction the hen is sadly not section 1231 property."),
  p("part3", "p3d1", 14, "Ace Hangs His Shingle", ["Milo", "Ace", "Penny", "Rosa", "Hoot"],
    "Ace opens his practice above the bakery, Milo buys a billboard that breaks Circular 230 twice, and Quick Refund Rex takes over the radio."),
  p("part3", "p3d2", 13, "Hoot Audits the Pockets", ["Milo", "Penny", "Ace", "Rosa", "Hoot", "Dee"],
    "A chewed Form 2848, a mileage log written on a napkin, and Hoot's new hourglass. The audit is going. It is just going."),
  p("part3", "p3d3", 15, "Milo Can't Pay, Penny Takes It to Appeals", ["Milo", "Penny", "Ace", "Rosa", "Hoot"],
    "Milo becomes a Payment Plan Pal, Penny wins in Appeals, Hoot comes out of the shredder and Rosa learns what trust fund money is."),
  p("part3", "p3d4", 12, "The E-File Gauntlet and Biscuit Ate the Records", ["Milo", "Penny", "Ace", "Rosa", "Hoot", "Lulu"],
    "The series finale: every return is accepted, Biscuit eats a folder, and Hoot finally closes his file on the Pockets. Or does he?"),

  h("part1", "p1d1", 24, "Birthdays, Juice Boxes and the Ten-Grand Rule", ["Ace", "Hoot", "Penny", "Milo", "Lulu", "Rosa", "Dee"],
    "Hoot climbs out of the mailbox to keep score on the front porch. Rosa ages a year early, Dee's signal cuts out on the FBAR, and Milo learns to file at $400."),
  h("part1", "p1d2", 24, "Raffles, Rollovers and the Wash Sale Trap", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "A yard-sale quiz: Penny's prize mower is income, Rosa confesses to a bartered goat, and Milo starts on negative Hoot points."),
  h("part1", "p1d3", 22, "Schedule A, the Juice Box Credit and the Last Sunny Year", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "Hoot steps out of a snowman to quiz the cast on deductions and credits, and Lulu learns she's worth exactly $500 to the IRS."),
  h("part1", "p1d4", 24, "The AMT, Both Halves and the Five Percent Month", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "Live from the church car wash: the AMT, self-employment tax, the pastor's housing allowance, and the penalty question that breaks Penny's flashcard."),
  h("part1", "p1d5", 19, "Old Basis, December Checks and Injured Versus Innocent", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "At the bus stop where the bus never comes: divorce, 529s, a December check in a drawer, and Dee finally knows she's innocent."),
  h("part1", "p1d6", 20, "Grandpa's Estate, Rosa's Gifts and the Foreign Form Avalanche", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "The Season 1 finale at Rosa's Rolls: estates, gifts and foreign forms, with Hoot covered in flour."),
  h("part2", "p2d1", 20, "Costumes, K-1s and Who Gets to Be an S Corporation", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu"],
    "From the side of the FOOD TRUCK: entity choice, partner basis and S corporation rules, and Gerald the sourdough jar is not a partnership representative."),
  h("part2", "p2d2", 27, "Bertha, the Mileage Log and the Mid-Quarter Monster", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "Sixteen questions in front of Bertha the oven: COGS, expenses, meals, mileage, depreciation, recapture, workers, losses and the books."),
  h("part2", "p2d3", 21, "Simple Trusts, the Coffee Cart and a Hen Named Deduction", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "The Season 2 finale at the farmers market: trusts, charities, retirement plans, farm rules and rentals, judged by a hen."),
  h("part3", "p3d1", 17, "Enrolled, Not Certified", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "Hoot is delivered with Ace's new filing cabinet. Who can practice, Circular 230, preparer penalties, and Quick Refund Rex on the radio."),
  h("part3", "p3d2", 17, "The 2848, the Code and the Three-Year Clock", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "A rainy-day quiz with a beagle who ate a power of attorney: 2848s and 8821s, legal authority, privilege and the statute clocks."),
  h("part3", "p3d3", 19, "Liens, Levies, Appeals and Other People's Money", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "Milo models his Payment Plan Pal sweater while the cast takes on collections, Appeals, penalty relief and the trust fund recovery penalty."),
  h("part3", "p3d4", 16, "The E-File Gauntlet and the Locked Filing Cabinet", ["Ace", "Hoot", "Penny", "Milo", "Rosa", "Lulu", "Dee"],
    "The series finale: Hoot mails himself to the party, the cast runs the e-file and data security gauntlet, and an all-time champion is crowned."),
];

/** A podcast by its id ("p1d1" or "p1d1-hotseat"). */
export const podcastFor = (id: string) => PODCASTS.find((x) => x.id === id);
/** A unit's podcasts: Ledger Falls Unplugged first, then The Hot Seat. */
export const podcastsFor = (domainId: string) => PODCASTS.filter((x) => x.domainId === domainId);

export const audioUrl = (pc: Podcast) => `/podcasts/${pc.id}.mp3`;
export const transcriptUrl = (pc: Podcast) => `/podcasts/${pc.id}.json`;

/** Podcasts follow their unit's access: the free unit for everyone, the rest on Pro and Pro Max. */
export const canPlayPodcast = (pc: Podcast, account: Account | null, admin: boolean) => canOpenUnit(pc.part, pc.domainId, account, admin);

/** The transcript line playing at time `t`: the last line that started at or before it. */
export function lineAt(lines: TranscriptLine[], t: number): number {
  let lo = 0;
  let hi = lines.length - 1;
  let found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (lines[mid].t <= t) {
      found = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  return found;
}

export const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

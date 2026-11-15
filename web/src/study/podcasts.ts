import type { Account } from "../lib/account";
import type { PartId } from "../lib/types";
import type { CastMember } from "./cast";
import { canOpenUnit } from ".";

/**
 * Ledger Falls Unplugged: one podcast per Study unit, a funny cast conversation that walks through the unit's
 * rules. Scripts live in podcasts/scripts/<domainId>.txt at the repo root and are rendered by podcasts/render.py
 * into web/public/podcasts/<domainId>.mp3 plus <domainId>.json (the timed transcript the player reads).
 * Access follows the unit: free accounts get Season 1, Unit 1; Pro and Pro Max get every unit.
 */
export interface Podcast {
  /** The unit (exam domain id), also the file name of the audio and transcript. */
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
}

export interface Transcript {
  id: string;
  title: string;
  seconds: number;
  lines: TranscriptLine[];
}

const p = (part: PartId, domainId: string, minutes: number, title: string, cast: CastMember[], blurb: string): Podcast => ({ part, domainId, minutes, title, cast, blurb });

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
];

export const podcastFor = (domainId: string) => PODCASTS.find((x) => x.domainId === domainId);

export const audioUrl = (pc: Podcast) => `/podcasts/${pc.domainId}.mp3`;
export const transcriptUrl = (pc: Podcast) => `/podcasts/${pc.domainId}.json`;

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

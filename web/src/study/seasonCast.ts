import type { PartId } from "../lib/types";
import { CAST, type CastMember } from "./cast";

/** One drawn character in a season's "Meet the cast" section. Name, role and line default to CAST. */
export interface SeasonCastMember {
  who: CastMember;
  name?: string;
  role?: string;
  line?: string;
  /** What this character is up to this season. */
  arc: string;
  /** Episode numbers (like "2.5") where this character is in the spotlight. */
  spotlight: string[];
}

/** A minor character who isn't drawn, listed under "Also in Ledger Falls". */
export interface SeasonGuest {
  name: string;
  note: string;
  episodes: string[];
}

export interface SeasonCast {
  /** One or two sentences that set up the season's household. */
  intro: string;
  cast: SeasonCastMember[];
  guests: SeasonGuest[];
}

/**
 * Who's who before each season starts. Add an entry here for a new season and the season page shows the section;
 * a season without an entry shows nothing. Keep it to characters and facts the episodes actually use.
 */
export const SEASON_CAST: Partial<Record<PartId, SeasonCast>> = {
  part1: {
    intro:
      "Season 1 follows one household through one tax year. Penny and Milo marry at 11:59 PM on December 31, Penny's cousin Dee is away on an oil rig, so her daughter Lulu moves in, and Grandpa Walt leaves Penny his stock, his IRA and a lot of opinions.",
    cast: [
      { who: "Penny", arc: "Marries Milo, takes in Lulu, goes back to school, goes solar, and finally plans ahead.", spotlight: ["1.1", "2.5", "3.4", "5.2"] },
      { who: "Milo", arc: "Marries Penny at 11:59 PM, sells at the swap meet, takes the 20% QBI deduction, and meets self-employment tax.", spotlight: ["1.4", "2.6", "3.2", "4.2"] },
      { who: "Lulu", arc: "Moves in with Penny and Milo, which makes her a qualifying relative and worth a $500 credit.", spotlight: ["1.3", "3.3"] },
      { who: "Dee", arc: "Works offshore, divorces Vince, asks for innocent spouse relief, and comes home with a box of foreign forms.", spotlight: ["1.5", "2.4", "5.3", "6.3"] },
      { who: "Ace", arc: "Answers every “so what do I owe?” and runs the family's year-in-review.", spotlight: ["3.5", "5.1"] },
      { who: "Hoot", arc: "Shows up whenever there's a penalty to compute, and gets a new calculator.", spotlight: ["4.5"] },
      { who: "Rosa", arc: "Penny owns 10% of the bakery. Widow of Uncle Bert, and gives away far too much money.", spotlight: ["2.3", "6.2"] },
      {
        who: "Walt",
        name: "Grandpa Walt Pocket",
        role: "Penny's late grandfather",
        line: "Speaks from his portrait on the bakery wall, mostly to complain.",
        arc: "Died in August 2025. His stock, IRA, last paycheck and estate drive half the season.",
        spotlight: ["2.5", "4.4", "6.1"],
      },
      { who: "Biscuit", arc: "Supervises. Is not a dependent, whatever Milo says.", spotlight: ["1.3", "3.2"] },
    ],
    guests: [
      { name: "Gus", note: "Milo's friend who vanished owing him money", episodes: ["2.6"] },
      { name: "Ms. Wren", note: "Lulu's fourth-grade teacher, who buys the class crayons", episodes: ["2.7"] },
      { name: "Joy and Tess", note: "Lulu's nanny, and her 16-year-old weekend sitter", episodes: ["4.2"] },
      { name: "Pastor Gail", note: "Penny's friend, with a housing allowance", episodes: ["4.4", "5.3"] },
      { name: "Sgt. Nia Okafor", note: "Ace's sister, serving in a combat zone", episodes: ["4.4"] },
      { name: "Vince", note: "Dee's ex-husband, who hid a side job on their joint return", episodes: ["5.1", "5.3"] },
      { name: "Uncle Bert", note: "Rosa's late husband, whose unused exclusion isn't lost yet", episodes: ["6.1", "6.2"] },
      { name: "Astrid", note: "Dee's godmother in Oslo", episodes: ["6.3"] },
    ],
  },
};

/** A season cast member with CAST's name, role and line filled in. */
export function castCard(m: SeasonCastMember): Required<SeasonCastMember> {
  const base = CAST.find((c) => c.short === m.who);
  return {
    ...m,
    name: m.name ?? base?.name ?? m.who,
    role: m.role ?? base?.role ?? "",
    line: m.line ?? base?.line ?? "",
  };
}

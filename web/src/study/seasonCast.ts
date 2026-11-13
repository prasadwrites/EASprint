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
  part2: {
    intro:
      "Season 2 moves into Rosa's Rolls, the bakery Aunt Rosa owns with Penny (90% and 10%). Over tax year 2025 the partnership counts its rolls, buys an $80,000 oven named Bertha, hires a mascot, and decides to become an S corporation for 2026, while Milo tries to turn everything into a business.",
    cast: [
      { who: "Rosa", arc: "Wants a yacht, buys Bertha the oven, signs Form 2553, plans her retirement and rents the room upstairs to Ace.", spotlight: ["1.1", "1.4", "2.4", "2.9", "3.5"] },
      { who: "Penny", arc: "Rosa's 10% partner and the bakery's bookkeeper. Opens her K-1, counts the rolls, and files Grandpa Walt's estate return as executor.", spotlight: ["1.2", "2.1", "2.8", "3.1"] },
      { who: "Milo", arc: "Incorporates his dog-walking business for one week, becomes Rolly the cinnamon roll mascot, haunts the books as the NOL ghost, starts a foundation and a one-hen egg farm.", spotlight: ["1.3", "2.5", "2.6", "2.7", "3.2", "3.4"] },
      { who: "Ace", arc: "The bakery's EA. Explains every form, then opens Okafor Tax Defense in the room above the bakery.", spotlight: ["2.9", "3.5"] },
      { who: "Hoot", arc: "Pops out of crates, ovens and egg boxes with the rule nobody wanted to hear. Leaves a note about Season 3.", spotlight: ["2.5", "3.5"] },
      { who: "Lulu", arc: "Hosts a book club about Schedule L and keeps missing her science project deadline.", spotlight: ["2.8"] },
      {
        who: "Walt",
        name: "Grandpa Walt Pocket",
        role: "Penny's late grandfather",
        line: "Still on the bakery wall. Still getting mail.",
        arc: "His estate files its own Form 1041, and he's furious about the 37% bracket.",
        spotlight: ["3.1"],
      },
      { who: "Biscuit", arc: "Eats the inventory, rides on the van roof and votes to keep zero years of records.", spotlight: ["2.1", "2.9"] },
    ],
    guests: [
      { name: "Gerald", note: "Rosa's sourdough starter, a jar with googly eyes. Family, not depreciable", episodes: ["1.1", "2.4", "2.8", "3.3"] },
      { name: "Bertha", note: "The $80,000 oven. Hoot likes it in there", episodes: ["2.4", "2.7"] },
      { name: "Deduction", note: "Milo's hen. Lays one egg a day, sometimes above the line", episodes: ["3.4"] },
      { name: "Gus", note: "Still hasn't paid for his birthday cake", episodes: ["2.2"] },
      { name: "Pastor Gail", note: "Runs the food pantry that gets Rosa's day-old bread", episodes: ["3.2"] },
    ],
  },
  part3: {
    intro:
      "Season 3 moves into Ace's new office: one tiny room above Rosa's Rolls, rent paid in cinnamon rolls. His first big case is close to home, because Examiner Hoot has picked Penny and Milo's 2025 return for audit, and he keeps turning up in the strangest places.",
    cast: [
      { who: "Ace", arc: "Opens Okafor Tax Defense, signs up his first clients, files his first Form 2848 and takes the office electronic.", spotlight: ["1.1", "2.1", "4.1"] },
      { who: "Hoot", arc: "Audits the Pockets and pops out of filing cabinets, shoeboxes, time machines and flour sacks. Thinks he's the judge.", spotlight: ["2.1", "2.3", "3.2", "4.2"] },
      { who: "Milo", arc: "Self-appointed head of marketing. Buys a billboard, hides in the doghouse, builds a time machine and becomes the e-file mascot.", spotlight: ["1.2", "2.2", "3.1", "3.3"] },
      { who: "Penny", arc: "Reads Hoot's report with a highlighter and takes her bakery mileage all the way to Appeals.", spotlight: ["2.1", "3.2"] },
      { who: "Rosa", arc: "Ace's landlord. Files late from a hospital bed, then pays the oven repair man instead of her payroll deposits.", spotlight: ["3.3", "3.4"] },
      { who: "Lulu", arc: "Reads the Taxpayer Bill of Rights for fun and gets the last word, usually.", spotlight: ["2.3", "3.2"] },
      { who: "Dee", arc: "Calls in from the oil rig: someone filed a return as her, from the moon. Also, she likes paper.", spotlight: ["2.3", "4.1"] },
      { who: "Biscuit", arc: "Eats documents. Loses his doghouse to Milo, then to Hoot. Saves his appetite for the finale.", spotlight: ["3.1", "4.2"] },
    ],
    guests: [
      { name: "Quick Refund Rex", note: "The rival preparer across the street, never seen, only his billboards", episodes: ["1.3", "4.2"] },
      { name: "Cousin Rudy", note: "Milo's cousin with an AFSP Record of Completion. Makes sandwiches", episodes: ["1.1"] },
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

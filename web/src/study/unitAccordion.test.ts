import { beforeEach, describe, expect, it } from "vitest";
import { initialOpenUnits, saveOpenUnits } from "./unitAccordion";

const store: Record<string, string> = {};
beforeEach(() => {
  for (const k of Object.keys(store)) delete store[k];
  (globalThis as { localStorage?: unknown }).localStorage = {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => void (store[k] = v),
  };
});

const units = [
  { id: "a", topics: [{ lessonId: "a1" }, { lessonId: "a2" }] },
  { id: "b", topics: [{ lessonId: "b1" }] },
  { id: "c", topics: [{ lessonId: "c1" }] },
];
const all = () => true;
const none = () => false;

describe("initialOpenUnits", () => {
  it("opens only the first unit for a new learner", () => {
    expect([...initialOpenUnits("part1", units, none, all)]).toEqual(["a"]);
  });
  it("opens the unit holding the next unplayed episode", () => {
    const played = (id: string) => id.startsWith("a");
    expect([...initialOpenUnits("part1", units, played, all)]).toEqual(["b"]);
  });
  it("skips units the learner can't open", () => {
    const played = (id: string) => id.startsWith("a");
    expect([...initialOpenUnits("part1", units, played, (u) => u === "a")]).toEqual(["a"]);
  });
  it("keeps the learner's own choice, and a #unit- link adds its unit", () => {
    saveOpenUnits("part1", new Set(["c"]));
    expect([...initialOpenUnits("part1", units, none, all)]).toEqual(["c"]);
    expect([...initialOpenUnits("part1", units, none, all, "#unit-b")].sort()).toEqual(["b", "c"]);
    saveOpenUnits("part1", new Set());
    expect([...initialOpenUnits("part1", units, none, all)]).toEqual([]);
  });
});

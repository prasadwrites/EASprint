import { beforeEach, describe, expect, it } from "vitest";
import { initialOpenUnits, saveOpenUnits } from "./unitAccordion";

const store: Record<string, string> = {};
beforeEach(() => {
  for (const k of Object.keys(store)) delete store[k];
  (globalThis as { sessionStorage?: unknown }).sessionStorage = {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => void (store[k] = v),
  };
});

const ids = ["cast", "a", "b", "c"];

describe("initialOpenUnits", () => {
  it("starts with every section collapsed", () => {
    expect([...initialOpenUnits("part1", ids)]).toEqual([]);
  });
  it("keeps what the learner opened in this tab, per season", () => {
    saveOpenUnits("part1", new Set(["cast", "c"]));
    expect([...initialOpenUnits("part1", ids)].sort()).toEqual(["c", "cast"]);
    expect([...initialOpenUnits("part2", ids)]).toEqual([]);
  });
  it("opens the section a #unit- link points to", () => {
    expect([...initialOpenUnits("part1", ids, "#unit-b")]).toEqual(["b"]);
    expect([...initialOpenUnits("part1", ids, "#unit-zzz")]).toEqual([]);
  });
});

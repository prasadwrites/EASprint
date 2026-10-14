import { describe, expect, it } from "vitest";
import { stableShuffle } from "./exam";
import { DECKS, getQuestions } from "./index";
import { SOURCES } from "./sources";

const all = DECKS.flatMap((d) => getQuestions(d.id));

describe("question bank", () => {
  it("has questions for every domain of every part", () => {
    for (const deck of DECKS) {
      const qs = getQuestions(deck.id);
      expect(qs.length).toBe(deck.questionCount);
      for (const d of deck.domains) expect(qs.some((q) => q.domain === d.id), d.id).toBe(true);
      expect(qs.every((q) => q.part === deck.id && deck.domains.some((d) => d.id === q.domain))).toBe(true);
    }
  });

  it("gives every question a unique id and four distinct options that include the answer", () => {
    expect(new Set(all.map((q) => q.id)).size).toBe(all.length);
    for (const q of all) {
      expect(new Set(q.choices).size, q.id).toBe(4);
      expect(q.choices, q.id).toContain(q.answer);
    }
  });

  it("cites an irs.gov source and explains every answer", () => {
    for (const q of all) {
      const source = SOURCES[q.source.key as keyof typeof SOURCES];
      expect(source, q.id).toBeDefined();
      expect(source.url.startsWith("https://www.irs.gov/"), q.id).toBe(true);
      expect(q.source.section.length, q.id).toBeGreaterThan(0);
      expect(q.explanation.length, q.id).toBeGreaterThan(40);
    }
  });

  it("does not leave the right answer in one position", () => {
    const first = all.filter((q) => q.choices[0] === q.answer).length;
    expect(first).toBeGreaterThan(all.length * 0.1);
    expect(first).toBeLessThan(all.length * 0.45);
  });
});

describe("stableShuffle", () => {
  it("keeps the same order for the same seed and loses nothing", () => {
    const items = ["a", "b", "c", "d"];
    expect(stableShuffle(items, "p1d1-01")).toEqual(stableShuffle(items, "p1d1-01"));
    expect([...stableShuffle(items, "p1d1-02")].sort()).toEqual(items);
  });
});

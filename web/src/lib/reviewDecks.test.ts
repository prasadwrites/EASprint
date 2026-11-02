import { describe, expect, it } from "vitest";
import { getQuestions } from "../data";
import { asDeck, cleanName, createReviewDeck, addToReviewDeck, isReviewDeckId, listReviewDecks, loadReviewQuestions, questionKey, removeFromReviewDeck } from "./reviewDecks";

// Without Firebase config, review decks are kept in localStorage; give the test a small in-memory one.
const mem: Record<string, string> = {};
globalThis.localStorage = {
  getItem: (k: string) => mem[k] ?? null,
  setItem: (k: string, v: string) => void (mem[k] = v),
  removeItem: (k: string) => void delete mem[k],
  clear: () => Object.keys(mem).forEach((k) => delete mem[k]),
  key: () => null,
  length: 0,
} as Storage;

describe("review decks", () => {
  const [a, b] = getQuestions("part1");
  const [c] = getQuestions("part3");

  it("names are trimmed and capped", () => {
    expect(cleanName("  Tricky   depreciation  ")).toBe("Tricky depreciation");
    expect(cleanName("x".repeat(80))).toHaveLength(60);
  });

  it("creates a deck with its first question, then adds more without duplicates", async () => {
    await expect(createReviewDeck("u1", "   ")).rejects.toThrow();
    const id = await createReviewDeck("u1", "Revisit", { deckId: "part1", question: a });
    expect(isReviewDeckId(id)).toBe(true);
    await addToReviewDeck(id, "part1", b);
    await addToReviewDeck(id, "part1", a);
    await addToReviewDeck(id, "part3", c);
    const qs = await loadReviewQuestions(id);
    expect(qs.map((q) => q.prompt)).toEqual([a.prompt, b.prompt, c.prompt]);
    expect(qs[0].origin).toEqual({ deckId: "part1", questionId: a.id });

    // A question added from a review deck keeps its original key.
    expect(questionKey(id, qs[0])).toBe(questionKey("part1", a));

    const [deck] = await listReviewDecks("u1");
    expect(deck.questionKeys).toHaveLength(3);
    expect(await listReviewDecks("u2")).toEqual([]);
    const asPractice = asDeck(deck, qs);
    expect(asPractice.source).toBe("review");
    expect(asPractice.domains.some((d) => d.id === c.domain)).toBe(true);

    await removeFromReviewDeck(id, qs[1].id);
    expect((await loadReviewQuestions(id)).map((q) => q.prompt)).toEqual([a.prompt, c.prompt]);
  });
});

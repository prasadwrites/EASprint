import { describe, expect, it } from "vitest";
import { isCorrect } from "./grading";

describe("isCorrect", () => {
  const q = { answer: "$15,750" };
  it("accepts only the keyed option", () => {
    expect(isCorrect(q, "$15,750")).toBe(true);
    expect(isCorrect(q, "$15,000")).toBe(false);
  });
  it("treats a skipped question as wrong", () => {
    expect(isCorrect(q, undefined)).toBe(false);
    expect(isCorrect(q, "")).toBe(false);
  });
});

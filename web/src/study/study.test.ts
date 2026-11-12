import { describe, expect, it } from "vitest";
import { getQuestions } from "../data";
import { PARTS } from "../data/exam";
import { SOURCES } from "../data/sources";
import { appendLine, notesToMarkdown } from "../lib/studyNotes";
import { LESSONS } from ".";
import { STUDY_OUTLINE, topicCount } from "./outline";

describe("study outline", () => {
  it("covers every exam domain, in order, with 59 topics", () => {
    for (const p of PARTS) expect(STUDY_OUTLINE[p.id].map((d) => d.id)).toEqual(p.domains.map((d) => d.id));
    expect(topicCount()).toBe(59);
  });

  it("links each lesson from exactly one topic in its own domain", () => {
    for (const l of Object.values(LESSONS)) {
      const hits = Object.values(STUDY_OUTLINE).flat().flatMap((d) => d.topics.filter((t) => t.lessonId === l.id).map((t) => ({ d, t })));
      expect(hits).toHaveLength(1);
      expect(hits[0].d.id).toBe(l.domainId);
      expect(hits[0].t.number).toBe(l.number);
    }
  });
});

describe("lessons", () => {
  for (const l of Object.values(LESSONS)) {
    it(`${l.id} has a full lesson`, () => {
      expect(l.comic.length).toBeGreaterThanOrEqual(3);
      expect(l.cards.length).toBeGreaterThanOrEqual(5);
      for (const c of l.cards) {
        expect(c.body.length).toBeGreaterThan(0);
        expect(c.keyPoint.length).toBeGreaterThan(10);
        expect(c.alt.length).toBeGreaterThan(10);
      }
      for (const p of l.comic) for (const b of p.bubbles) expect(b.x + b.w).toBeLessThanOrEqual(100);
      expect(l.traps.length).toBeGreaterThan(0);
      for (const s of l.sources) expect(SOURCES[s.key]).toBeTruthy();
    });

    it(`${l.id} checks itself with bank questions on each quiz topic`, () => {
      const qs = getQuestions(l.part);
      for (const topic of l.quizTopics) expect(qs.some((q) => q.topic === topic && q.domain === l.domainId)).toBe(true);
    });
  }
});

describe("study notes", () => {
  it("appends a line on its own line", () => {
    expect(appendLine("", "• one")).toBe("• one");
    expect(appendLine("hello\n\n", "• two")).toBe("hello\n• two");
  });

  it("exports Markdown with a section per lesson", () => {
    const md = notesToMarkdown(
      [
        { title: "Part 1 · 2.5 Basis", note: { lessonId: "p1-basis", text: "Gift: tag travels", confidence: "shaky", updatedAt: null } },
        { title: "Part 3 · 1.2 Circular 230", note: { lessonId: "x", text: "", confidence: "", updatedAt: null } },
      ],
      new Date(2026, 10, 12),
    );
    expect(md).toContain("# My EASprint study notes");
    expect(md).toContain("Exported November 12, 2026");
    expect(md).toContain("## Part 1 · 2.5 Basis\n\nConfidence: Shaky\n\nGift: tag travels");
    expect(md).toContain("_No notes yet._");
  });
});

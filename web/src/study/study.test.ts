import { describe, expect, it } from "vitest";
import { getQuestions } from "../data";
import { PARTS } from "../data/exam";
import { SOURCES } from "../data/sources";
import { appendLine, notesToMarkdown } from "../lib/studyNotes";
import { LESSONS, lessonsInPart, nextLesson, questionnaireLink } from ".";
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

describe("Season 1, Unit 1", () => {
  const unit1 = ["p1-getting-started", "p1-who-files", "p1-dependents", "p1-paper-trail", "p1-foreign-aca"];

  it("has a lesson for every topic from 1.1 to 1.5, in order", () => {
    expect(STUDY_OUTLINE.part1[0].topics.map((t) => t.lessonId)).toEqual(unit1);
    expect(lessonsInPart("part1").slice(0, 5).map((l) => l.id)).toEqual(unit1);
    expect(nextLesson(LESSONS["p1-getting-started"])?.id).toBe("p1-who-files");
    expect(nextLesson(LESSONS["p1-foreign-aca"])?.id).toBe("p1-basis");
  });

  for (const id of unit1) {
    const l = LESSONS[id];
    it(`${id} is a full episode with plenty of cartoons, a game and a questionnaire`, () => {
      expect(l.comic.length).toBeGreaterThanOrEqual(5);
      expect(l.cards.length).toBeGreaterThanOrEqual(8);
      expect(l.stinger).toBeTruthy();
      expect(l.deck).toBeTruthy();
      expect(l.game?.rounds.length).toBeGreaterThanOrEqual(5);
      for (const b of l.stinger!.bubbles) expect(b.x + b.w).toBeLessThanOrEqual(100);
    });

    it(`${id} game rounds each have one right answer, three distinct wrong ones, and a reason for each`, () => {
      for (const r of l.game!.rounds) {
        expect(r.wrong).toHaveLength(3);
        const options = [r.answer, ...r.wrong.map(([w]) => w)];
        expect(new Set(options).size).toBe(4);
        for (const [, why] of r.wrong) expect(why.length).toBeGreaterThan(15);
        expect(r.rule.length).toBeGreaterThan(20);
      }
      // The cast take turns asking.
      expect(new Set(l.game!.rounds.map((r) => r.who)).size).toBeGreaterThanOrEqual(3);
    });

    it(`${id} questionnaire link fits the deck builder's limits and asks about rules, not the story`, () => {
      const url = new URL(questionnaireLink(l), "https://x.test");
      expect(url.pathname).toBe("/create");
      expect(url.searchParams.get("part")).toBe("part1");
      expect(url.searchParams.get("topic")!.length).toBeLessThanOrEqual(200);
      const notes = url.searchParams.get("notes")!;
      expect(notes.length).toBeLessThanOrEqual(600);
      expect(notes).toContain("Test only these rules");
      expect(notes).toContain("Never ask about the cartoon");
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

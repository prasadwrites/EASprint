import { describe, expect, it, vi } from "vitest";
import { getQuestions } from "../data";
import { PARTS } from "../data/exam";
import { SOURCES } from "../data/sources";
import { appendLine, notesToMarkdown } from "../lib/studyNotes";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { canOpenLesson, canOpenUnit, episodes, isFreeLesson, LESSONS, nextEpisode } from ".";
import { STUDY_OUTLINE, topicCount } from "./outline";
import { CAST_QUIZ_NOTES, quizLink, UNIT_QUIZ } from "./quiz";
import { castCard, SEASON_CAST } from "./seasonCast";
import { canPlayPodcast, lineAt, PODCASTS, podcastFor, podcastsFor, type Transcript } from "./podcasts";

// Pretend Firebase is configured, so plan checks apply (without it, the app opens everything).
vi.mock("../lib/firebase", () => ({ db: {}, auth: null }));

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

    it(`${l.id} has an Ace vs. Hoot game with one right answer per case`, () => {
      expect(l.cases.length).toBeGreaterThanOrEqual(4);
      for (const c of l.cases) {
        expect(c.choices).toContain(c.answer);
        expect(new Set(c.choices).size).toBe(c.choices.length);
        expect(c.why.length).toBeGreaterThan(20);
      }
      // Right answers shouldn't always sit in the same spot.
      expect(new Set(l.cases.map((c) => c.choices.indexOf(c.answer))).size).toBeGreaterThan(1);
    });

    it(`${l.id} quiz brief fits the deck builder's topic limit`, () => {
      expect(l.quizBrief.length).toBeGreaterThan(20);
      expect(l.quizBrief.length).toBeLessThanOrEqual(200);
    });

    it(`${l.id} checks itself with bank questions on each quiz topic`, () => {
      const qs = getQuestions(l.part);
      for (const topic of l.quizTopics) expect(qs.some((q) => q.topic === topic && q.domain === l.domainId)).toBe(true);
    });
  }
});

describe("quiz links", () => {
  it("fit the limits the deck builder keeps (200 topic, 600 notes)", () => {
    expect(CAST_QUIZ_NOTES.length).toBeLessThanOrEqual(600);
    for (const t of Object.values(UNIT_QUIZ)) expect(t.length).toBeLessThanOrEqual(200);
  });

  it("prefill the deck builder", () => {
    const url = new URL(quizLink("part1", "Kiddie tax"), "https://x");
    expect(url.pathname).toBe("/create");
    expect(url.searchParams.get("topic")).toBe("Kiddie tax");
    expect(url.searchParams.get("notes")).toBe(CAST_QUIZ_NOTES);
  });
});

describe("seasons", () => {
  it("lists Unit 1 of Season 1 as episodes 1.1 to 1.5 in order", () => {
    expect(episodes("part1").map((l) => l.number).slice(0, 5)).toEqual(["1.1", "1.2", "1.3", "1.4", "1.5"]);
    expect(nextEpisode(LESSONS["p1-getting-started"])?.id).toBe("p1-filing-status");
  });

  it("has all of Season 1: every Part 1 topic is an episode, numbered in order, ending with the finale", () => {
    const topics = STUDY_OUTLINE.part1.flatMap((d) => d.topics.map((t) => t.number));
    const season = episodes("part1");
    expect(season.map((l) => l.number)).toEqual(topics);
    expect(season).toHaveLength(29);
    expect(nextEpisode(season[season.length - 1])).toBeUndefined();
  });

  it("has a unit quiz for every domain in every season", () => {
    for (const d of [...STUDY_OUTLINE.part1, ...STUDY_OUTLINE.part2, ...STUDY_OUTLINE.part3]) expect(UNIT_QUIZ[d.id]).toBeTruthy();
  });

  it("has all of Season 2: every Part 2 topic is an episode, numbered in order, ending with the finale", () => {
    const topics = STUDY_OUTLINE.part2.flatMap((d) => d.topics.map((t) => t.number));
    const season = episodes("part2");
    expect(season.map((l) => l.number)).toEqual(topics);
    expect(season).toHaveLength(18);
    expect(season[season.length - 1].id).toBe("p2-rental-property");
    expect(nextEpisode(season[season.length - 1])).toBeUndefined();
  });

  it("has all of Season 3: every Part 3 topic is an episode, numbered in order, ending with the finale", () => {
    const topics = STUDY_OUTLINE.part3.flatMap((d) => d.topics.map((t) => t.number));
    const season = episodes("part3");
    expect(season.map((l) => l.number)).toEqual(topics);
    expect(season).toHaveLength(12);
    expect(season[season.length - 1].id).toBe("p3-records-security");
    expect(nextEpisode(season[season.length - 1])).toBeUndefined();
  });

  it("keeps every unit quiz brief to 200 characters", () => {
    for (const brief of Object.values(UNIT_QUIZ)) expect(brief.length).toBeLessThanOrEqual(200);
  });
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

describe("meet the cast", () => {
  it.each([
    ["part1", ["Penny", "Milo", "Lulu", "Dee", "Ace", "Hoot", "Rosa", "Walt", "Biscuit"]],
    ["part2", ["Rosa", "Penny", "Milo", "Ace", "Hoot", "Lulu", "Walt", "Biscuit"]],
    ["part3", ["Ace", "Hoot", "Milo", "Penny", "Rosa", "Lulu", "Dee", "Biscuit"]],
  ] as const)("introduces %s with every main character, linking only to real episodes", (part, main) => {
    const sc = SEASON_CAST[part]!;
    const numbers = new Set(episodes(part).map((l) => l.number));
    const who = sc.cast.map((m) => m.who);
    for (const w of main) expect(who).toContain(w);
    expect(new Set(who).size).toBe(who.length);
    for (const m of sc.cast) {
      const c = castCard(m);
      expect(c.name && c.role && c.line && c.arc).toBeTruthy();
      for (const n of m.spotlight) expect(numbers).toContain(n);
    }
    for (const g of sc.guests) for (const n of g.episodes) expect(numbers).toContain(n);
  });
});

describe("free plan", () => {
  const free = { plan: "free" } as unknown as Parameters<typeof canOpenLesson>[1];

  it("opens Season 1, Unit 1 in full and nothing else", () => {
    const open = Object.values(LESSONS).filter((l) => isFreeLesson(l)).map((l) => l.id).sort();
    expect(open).toEqual(STUDY_OUTLINE.part1[0].topics.map((t) => t.lessonId!).sort());
    expect(open).toHaveLength(5);
    for (const l of Object.values(LESSONS)) expect(canOpenLesson(l, free, false)).toBe(isFreeLesson(l));
    expect(canOpenUnit("part1", "p1d1", free, false)).toBe(true);
    expect(canOpenUnit("part1", "p1d2", free, false)).toBe(false);
    expect(canOpenUnit("part3", "p3d1", free, false)).toBe(false);
  });

  it("matches the free lessons listed in firestore.rules", () => {
    const rules = readFileSync(resolve(__dirname, "../../../firestore.rules"), "utf8");
    const listed = [...rules.match(/function freeLesson\(d\) \{[^}]*\}/)![0].matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]).sort();
    expect(listed).toEqual(Object.values(LESSONS).filter(isFreeLesson).map((l) => l.id).sort());
  });
});

describe("unit podcasts", () => {
  const free = { plan: "free" } as unknown as Parameters<typeof canOpenLesson>[1];
  const pro = { plan: "pro" } as unknown as Parameters<typeof canOpenLesson>[1];
  const root = resolve(__dirname, "../../..");

  it("has one Ledger Falls Unplugged and one Hot Seat podcast per unit, in every season", () => {
    const units = Object.values(STUDY_OUTLINE).flat().map((d) => d.id).sort();
    for (const show of ["unplugged", "hotseat"] as const) expect(PODCASTS.filter((pc) => pc.show === show).map((pc) => pc.domainId).sort()).toEqual(units);
    for (const pc of PODCASTS) {
      expect(STUDY_OUTLINE[pc.part].some((d) => d.id === pc.domainId)).toBe(true);
      expect(pc.id).toBe(pc.show === "hotseat" ? `${pc.domainId}-hotseat` : pc.domainId);
      expect(podcastFor(pc.id)).toBe(pc);
    }
    expect(podcastsFor("p1d1").map((pc) => pc.show)).toEqual(["unplugged", "hotseat"]);
  });

  it("plays only Season 1, Unit 1 on the free plan, and everything on Pro", () => {
    for (const pc of PODCASTS) {
      expect(canPlayPodcast(pc, free, false)).toBe(pc.domainId === "p1d1");
      expect(canPlayPodcast(pc, pro, false)).toBe(true);
    }
  });

  for (const pc of PODCASTS) {
    it(`${pc.id} has a script, audio and a transcript of at least 10 minutes`, () => {
      const script = readFileSync(resolve(root, `podcasts/scripts/${pc.id}.txt`), "utf8");
      const speakers = new Set([...script.matchAll(/^([A-Z+]+):/gm)].flatMap((m) => m[1].split("+")));
      expect(speakers.has("HOOT") && speakers.has("ACE")).toBe(true);
      const t: Transcript = JSON.parse(readFileSync(resolve(root, `web/public/podcasts/${pc.id}.json`), "utf8"));
      expect(t.seconds).toBeGreaterThanOrEqual(600);
      expect(Math.round(t.seconds / 60)).toBe(pc.minutes);
      expect(existsSync(resolve(root, `web/public/podcasts/${pc.id}.mp3`))).toBe(true);
      for (let i = 1; i < t.lines.length; i++) expect(t.lines[i].t).toBeGreaterThanOrEqual(t.lines[i - 1].t);
      if (pc.show === "hotseat") {
        // A quiz show: numbered questions, answered by the cast (not Ace or Hoot), with memory tricks.
        const questions = t.lines.filter((l) => l.q);
        expect(questions.length).toBeGreaterThanOrEqual(10);
        expect(questions.map((l) => l.q)).toEqual(questions.map((_, i) => i + 1));
        expect(t.lines.filter((l) => l.tip && /^Memory trick/.test(l.text ?? "")).length).toBeGreaterThanOrEqual(questions.length - 2);
        expect([...speakers].filter((w) => !["ACE", "HOOT"].includes(w)).length).toBeGreaterThanOrEqual(4);
      }
    });
  }

  it("finds the line playing at a given time", () => {
    const lines = [{ t: 0 }, { t: 5 }, { t: 9 }];
    expect(lineAt(lines, -1)).toBe(-1);
    expect(lineAt(lines, 0)).toBe(0);
    expect(lineAt(lines, 7)).toBe(1);
    expect(lineAt(lines, 100)).toBe(2);
  });
});

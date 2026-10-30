import { domainName, DECKS, getQuestions } from "./index";
import { SOURCES } from "./sources";

/** The built-in questions in the shape the daily Instagram reel (functions/reels.py) reads from functions/reel_bank.json. */
export function reelBank() {
  return DECKS.flatMap((d) =>
    getQuestions(d.id).map((q) => {
      const source = SOURCES[q.source.key as keyof typeof SOURCES];
      return {
        id: q.id,
        part: q.part,
        domain: domainName(q.domain),
        topic: q.topic,
        difficulty: q.difficulty,
        prompt: q.prompt,
        choices: q.choices,
        answer: q.answer,
        explanation: q.explanation,
        source: { title: source.title, url: source.url, section: q.source.section },
      };
    }),
  );
}

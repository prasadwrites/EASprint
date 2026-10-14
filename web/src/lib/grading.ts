import type { Question } from "./types";

/** Every exam question is multiple choice, so an answer is right when it is the keyed option. */
export function isCorrect(q: Pick<Question, "answer">, answer: string | undefined): boolean {
  return !!answer && answer === q.answer;
}

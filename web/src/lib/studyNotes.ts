import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "./firebase";

/**
 * A student's private notes for one Study lesson, plus how confident they feel about it.
 * Stored in Firestore at studyNotes/{uid}_{lessonId} (owner-only; writing needs a paid plan, see firestore.rules),
 * or in this browser when the app runs without Firebase.
 */
export type Confidence = "" | "got" | "shaky";

export interface StudyNote {
  lessonId: string;
  text: string;
  confidence: Confidence;
  updatedAt: Date | null;
}

/** Keep in step with firestore.rules. */
export const MAX_NOTE = 20000;

export const emptyNote = (lessonId: string): StudyNote => ({ lessonId, text: "", confidence: "", updatedAt: null });

const LOCAL_KEY = "eas.studyNotes";
type LocalNote = Omit<StudyNote, "updatedAt"> & { updatedAt: number };

function readLocal(): Record<string, LocalNote> {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
  } catch {
    return {};
  }
}

const noteId = (uid: string, lessonId: string) => `${uid}_${lessonId}`;
const toDate = (v: unknown) => (v instanceof Timestamp ? v.toDate() : null);
const fromData = (d: Record<string, unknown>): StudyNote => ({
  lessonId: String(d.lessonId ?? ""),
  text: String(d.text ?? ""),
  confidence: d.confidence === "got" || d.confidence === "shaky" ? d.confidence : "",
  updatedAt: toDate(d.updatedAt),
});

export async function loadNote(uid: string, lessonId: string): Promise<StudyNote> {
  if (!db) {
    const n = readLocal()[noteId(uid, lessonId)];
    return n ? { ...n, updatedAt: new Date(n.updatedAt) } : emptyNote(lessonId);
  }
  const snap = await getDoc(doc(db, "studyNotes", noteId(uid, lessonId)));
  return snap.exists() ? fromData(snap.data()) : emptyNote(lessonId);
}

export async function saveNote(uid: string, lessonId: string, text: string, confidence: Confidence): Promise<void> {
  const clipped = text.slice(0, MAX_NOTE);
  if (!db) {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify({ ...readLocal(), [noteId(uid, lessonId)]: { lessonId, text: clipped, confidence, updatedAt: Date.now() } }));
    } catch {
      /* storage unavailable */
    }
    return;
  }
  await setDoc(doc(db, "studyNotes", noteId(uid, lessonId)), { ownerId: uid, lessonId, text: clipped, confidence, updatedAt: serverTimestamp() });
}

export async function listNotes(uid: string): Promise<StudyNote[]> {
  if (!db) {
    const prefix = `${uid}_`;
    return Object.entries(readLocal())
      .filter(([k]) => k.startsWith(prefix))
      .map(([, n]) => ({ ...n, updatedAt: new Date(n.updatedAt) }));
  }
  const snap = await getDocs(query(collection(db, "studyNotes"), where("ownerId", "==", uid)));
  return snap.docs.map((d) => fromData(d.data()));
}

/** Appends a line to the notes, on its own line. */
export function appendLine(text: string, line: string): string {
  const t = text.replace(/\s+$/, "");
  return (t ? `${t}\n` : "") + line;
}

const CONFIDENCE_LABEL: Record<Confidence, string> = { "": "Not marked", got: "Got it", shaky: "Shaky" };

/** The notes as a Markdown file, one section per lesson. */
export function notesToMarkdown(notes: { title: string; note: StudyNote }[], exportedAt = new Date()): string {
  const lines = ["# My EASprint study notes", "", `Exported ${exportedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, ""];
  for (const { title, note } of notes) {
    lines.push(`## ${title}`, "", `Confidence: ${CONFIDENCE_LABEL[note.confidence]}`, "", note.text.trim() || "_No notes yet._", "");
  }
  return lines.join("\n");
}

/** Hands the browser a file to save. */
export function downloadText(filename: string, text: string, type = "text/markdown") {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

export type ReelStatus = "ready" | "posting" | "posted" | "skipped" | "failed";
export type ReelFormat = "clock" | "mythfact" | "whichpart" | "term" | "countdown";

/** One Instagram reel as the admin's Instagram page sees it. Mirrors admin_reels in functions/main.py. */
export interface AdminReel {
  id: string;
  /** The day it was made (New York time). */
  date: string;
  status: ReelStatus;
  format: ReelFormat | "";
  formatName: string;
  part: string;
  topic: string;
  questionId: string;
  hook: string;
  caption: string;
  seconds: number | null;
  videoUrl: string;
  coverUrl: string;
  permalink: string;
  error: string;
  createdAt: number | null;
  postedAt: number | null;
}

export interface InstagramStatus {
  connected: boolean;
  username: string;
  expiresAt: number | null;
  refreshError: string;
}

export interface ReelsPage {
  reels: AdminReel[];
  instagram: InstagramStatus;
  formats: Record<ReelFormat, string>;
}

// Making a reel writes a script and renders about 20 seconds of video, so give it time.
const LONG = 600_000;
const call = <I, O>(name: string, timeout?: number) => httpsCallable<I, O>(functions!, name, timeout ? { timeout } : undefined);

export async function adminReels(): Promise<ReelsPage> {
  return (await call<void, ReelsPage>("admin_reels")()).data;
}

type Action =
  | { action: "make"; format?: ReelFormat }
  | { action: "regenerate"; id: string; format?: ReelFormat }
  | { action: "caption"; id: string; caption: string }
  | { action: "skip" | "unskip" | "post"; id: string };

export async function reelAction(a: Action): Promise<{ ok: boolean; permalink?: string }> {
  return (await call<Action, { ok: boolean; permalink?: string }>("admin_reel_action", LONG)(a)).data;
}

export async function instagramSettings(change: { token: string } | { disconnect: true }): Promise<InstagramStatus> {
  return (await call<typeof change, InstagramStatus>("admin_instagram")(change)).data;
}

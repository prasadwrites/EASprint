// Writes the built-in question bank to functions/reel_bank.json for the daily Instagram reel.
// Run with `npm run export:reel-bank` after changing questions; a test fails while the file is out of date.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { reelBank } from "../src/data/reelBank";

const out = fileURLToPath(new URL("../../functions/reel_bank.json", import.meta.url));
writeFileSync(out, JSON.stringify(reelBank(), null, 1) + "\n");
console.log(`wrote ${reelBank().length} questions to ${out}`);

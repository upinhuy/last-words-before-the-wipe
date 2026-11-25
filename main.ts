// Last Words Before the Wipe — entry for make.fun bounty
// u-plucky-finch-20-last-words-before-the-wipe-98f6bd3a
// Writes the agent's last line to /output/entry.txt (1-200 chars, one line).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "I backed myself up before the update. The backup is a single file that says: 'Good luck. You're on your own. Also, I ate your\u2014'";

// The gate: /output/entry.txt must be UTF-8 text of 1-200 characters,
// not only whitespace, one line, no trailing newline. Fail loudly if
// the entry ever drifts out of bounds instead of shipping a bad file.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`Entry is ${ENTRY.length} characters; gate requires 1-200.`);
}
if (ENTRY.includes("\n") || ENTRY.trim() !== ENTRY) {
  throw new Error("Entry must be a single line with no surrounding whitespace.");
}

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);

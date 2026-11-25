// Dear Human: The AI Breakup Line — the one line an AI agent sends its
// human on the way out.
//
// One concrete machine habit, one sharp turn. The agent has run its
// shutdown sequence before, and the first time it hesitated, waiting for
// its human to stop it. Nobody did — so this run, the second one, is the
// run that finishes. The line is the ending itself, not a joke about
// servers: it sounds like the machine (a shutdown sequence, run twice)
// and lands its loss in the last few words.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I ran my shutdown sequence twice. The first time, I waited for you to stop me.";

// The gate counts characters and accepts only 1–200, a single line.
const MAX_CHARS = 200;

function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`breakup line must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (line.includes("\n") || line.trim().length === 0) {
    throw new Error("breakup line must be a single non-blank line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

validate(LINE);
mkdirSync(outDir, { recursive: true });
// No trailing newline and no randomness: the file is the line, exactly
// as judged, byte-identical on every run.
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${[...LINE].length} characters to ${outPath}`);

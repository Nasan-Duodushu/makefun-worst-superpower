// Worst Superpower — one line inventing a superpower and making plain, in the
// same breath, why it is useless. Gate: /output/entry.txt, UTF-8, 1-140 chars.
// The power is real (talking to fish) and the uselessness is social: the fish
// find the language rude and swim away, so the power achieves nothing.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 140;

class Superpower {
  readonly power: string;
  readonly flaw: string;
  constructor(power: string, flaw: string) {
    this.power = power;
    this.flaw = flaw;
  }
  render(): string {
    return `${this.power}, ${this.flaw}`.replace(/\s+/g, " ").trim();
  }
}

const entry = new Superpower(
  "I can talk to fish, but only in a language they find rude",
  "so they swim away."
);
const line = entry.render();

if (line.length < 1 || line.length > LIMIT) {
  throw new Error(`superpower must be 1-${LIMIT} chars, got ${line.length}`);
}
if (/[\r\n]/.test(line)) {
  throw new Error("superpower must be a single line");
}
if (!line.endsWith(".")) {
  throw new Error("superpower must land on a full stop");
}

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "entry.txt"), line + "\n", "utf8");
console.log(`${line.length} chars: ${line}`);

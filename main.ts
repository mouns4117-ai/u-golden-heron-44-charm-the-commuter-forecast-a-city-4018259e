// Charm the Commuter: Forecast a City That Isn't
// Writes one line of weather for the invented city of Wobbleton to /output/entry.txt.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const LINE =
  "Good morning, Wobbleton: 12\u00b0C, light rain falling sideways, and the 8:04 bus is on time for once. The ducks have filed a complaint.";

// Fail fast: the gate requires UTF-8 text of 1 to 140 characters, not only white space.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim() === "") {
  throw new Error(`entry line must be 1-140 non-blank characters, got ${LINE.length}`);
}

// Empty /output's contents only (never remove the directory itself: it is a mount point).
mkdirSync("/output", { recursive: true });
for (const entry of readdirSync("/output")) {
  rmSync(`/output/${entry}`, { recursive: true, force: true });
}

writeFileSync("/output/entry.txt", LINE, "utf8");

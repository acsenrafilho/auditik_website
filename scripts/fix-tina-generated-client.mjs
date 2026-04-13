import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const clientPath = resolve("tina/__generated__/client.ts");

if (!existsSync(clientPath)) {
  process.exit(0);
}

const source = readFileSync(clientPath, "utf8");
const patched = source.replace(/cacheDir:\s*'[^']*',\s*/g, "");

if (patched !== source) {
  writeFileSync(clientPath, patched, "utf8");
  console.log("Patched tina/__generated__/client.ts (removed cacheDir)");
}

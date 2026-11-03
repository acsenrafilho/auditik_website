/**
 * Optimize home / city-landing hero assets for static export (no Next image optimizer).
 * Usage: npm run optimize:hero-images
 * Requires: npm i -D sharp
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src =
  "public/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.jpg";
const outDir = path.dirname(path.join(root, src));

const jobs = [
  {
    out: "Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.webp",
    width: 1200,
    quality: 78,
  },
  {
    out: "Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_640x427px.webp",
    width: 640,
    quality: 76,
  },
];

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("Missing dependency: sharp. Run: npm i -D sharp");
  process.exit(1);
}

const input = path.join(root, src);
if (!fs.existsSync(input)) {
  console.error(`Missing source: ${src}`);
  process.exit(1);
}

for (const job of jobs) {
  const output = path.join(outDir, job.out);
  const info = await sharp(input)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(output);
  const kb = (info.size / 1024).toFixed(1);
  console.log(`✓ ${job.out} — ${info.width}x${info.height}, ${kb} KiB`);
}

/**
 * Optimize LP Americana assets for static export (no Next image optimizer).
 * Usage: npm run optimize:lp-images
 * Requires: npm i -D sharp
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public/images/auditik/lp/americana");

const jobs = [
  {
    src: "public/images/philips/optimized/background/PHS_HL50_miniRITE_In_hand1_orange_AS_399253071_MS_0063Expires_On2_14_2032.jpg",
    out: "hero-hand.webp",
    width: 1200,
    quality: 78,
  },
  {
    src: "public/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg",
    out: "cta-background.webp",
    width: 1400,
    quality: 75,
  },
  {
    src: "public/images/philips/optimized/aasi/Philips_HearLink50_miniRITE_H1-2024_Left_C090Beige_LEDgreen_Speaker60_OpenBassDome_1200x1200px_Original file.webp",
    out: "product-shot.webp",
    width: 800,
    quality: 80,
  },
  {
    src: "public/images/auditik/background/sala_atendimento.webp",
    out: "sala-atendimento.webp",
    width: 800,
    quality: 78,
  },
  {
    src: "public/images/logo-Philips.png",
    out: "logo-philips.webp",
    width: 400,
    quality: 85,
  },
  {
    src: "public/images/logo-auditik.png",
    out: "logo-auditik.webp",
    width: 240,
    quality: 85,
  },
];

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("Missing dependency: sharp. Run: npm i -D sharp");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

for (const job of jobs) {
  const input = path.join(root, job.src);
  const output = path.join(outDir, job.out);
  if (!fs.existsSync(input)) {
    console.error(`Missing source: ${job.src}`);
    process.exitCode = 1;
    continue;
  }

  const info = await sharp(input)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(output);

  const kb = (info.size / 1024).toFixed(1);
  console.log(`✓ ${job.out} — ${info.width}x${info.height}, ${kb} KiB`);
}

import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const hero = await readFile("public/art/compute-core.webp");
await sharp(hero)
  .resize(768)
  .avif({ quality: 54, effort: 7, chromaSubsampling: "4:4:4" })
  .toFile("public/art/compute-core-mobile.avif");
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#111416" />
  <defs><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#80908e" opacity=".16" /></pattern></defs>
  <rect x="640" y="40" width="540" height="540" fill="url(#dots)" />
  <path d="M65 76h24" stroke="#eea06d" stroke-width="2" />
  <text x="104" y="82" fill="#b0b8b8" font-family="sans-serif" font-size="17" letter-spacing="2">SOFTWARE ENGINEER</text>
  <text x="60" y="233" fill="#f3f1ec" font-family="sans-serif" font-weight="600" font-size="100" letter-spacing="-6">Yash</text>
  <text x="60" y="338" fill="#f3f1ec" font-family="sans-serif" font-weight="600" font-size="100" letter-spacing="-6">Roushan<tspan fill="#eea06d">.</tspan></text>
  <text x="65" y="405" fill="#d0d4d0" font-family="sans-serif" font-size="28" letter-spacing="-.5">From interface to infrastructure.</text>
  <text x="65" y="455" fill="#9fa9aa" font-family="sans-serif" font-size="20">Full-stack development · Halifax, Canada</text>
  <path d="M65 545h1070" stroke="#303638" />
  <text x="65" y="585" fill="#a9b0b1" font-family="monospace" font-size="15">React · TypeScript · Node.js · Python</text>
  <text x="1135" y="585" text-anchor="end" fill="#eea06d" font-family="monospace" font-size="15">YASH ROUSHAN</text>
</svg>`;
const core = await sharp(hero)
  .resize(600, 506, { fit: "contain", background: "transparent" })
  .png()
  .toBuffer();
await sharp(Buffer.from(social))
  .composite([{ input: core, left: 587, top: 38 }])
  .png({ compressionLevel: 9 })
  .toFile("public/social-card.png");
const favicon = await readFile("public/favicon.svg");
await sharp(favicon)
  .resize(180, 180)
  .png()
  .toFile("public/apple-touch-icon.png");
await writeFile(
  "artwork/README.md",
  "# Original artwork\n\nThe exploded assembly was modelled and rendered procedurally in Blender. Regeneration instructions are in `compute-core-source.py`. The project SVG illustrations are original, editable vector artwork in `public/art`. The mobile AVIF, Open Graph image and touch icon can be regenerated with `node scripts/generate-artwork.mjs` from the project root after `npm ci`.\n",
);
console.log("Generated mobile AVIF, social card and touch icon.");

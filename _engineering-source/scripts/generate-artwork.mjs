import sharp from "sharp";

const original = "public/portraits/yash-700.webp";
await sharp(original)
  .extract({ left: 175, top: 56, width: 294, height: 294 })
  .resize(240, 240)
  .webp({ quality: 87 })
  .toFile("public/portraits/yash-headshot.webp");

const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#192127" />
  <path d="M65 101h28" stroke="#f2ac7c" stroke-width="2" />
  <text x="111" y="107" fill="#f2ac7c" font-family="sans-serif" font-size="20" letter-spacing="2">HALIFAX, NOVA SCOTIA</text>
  <text x="60" y="267" fill="#f6f2e9" font-family="sans-serif" font-weight="600" font-size="100" letter-spacing="-5">Yash</text>
  <text x="60" y="365" fill="#f6f2e9" font-family="sans-serif" font-weight="600" font-size="100" letter-spacing="-5">Roushan<tspan fill="#f2ac7c">.</tspan></text>
  <text x="65" y="463" fill="#e2e3db" font-family="sans-serif" font-size="32">Full-stack engineer building</text>
  <text x="65" y="506" fill="#e2e3db" font-family="sans-serif" font-size="32">web apps and AI tools.</text>
</svg>`;
const portrait = await sharp(original)
  .extract({ left: 105, top: 50, width: 480, height: 610 })
  .resize(420, 534)
  .png()
  .toBuffer();
await sharp(Buffer.from(social))
  .composite([{ input: portrait, left: 730, top: 48 }])
  .png({ palette: true, colours: 256, compressionLevel: 9 })
  .toFile("public/social-card.png");

await sharp("public/favicon.svg")
  .resize(180, 180)
  .png()
  .toFile("public/apple-touch-icon.png");

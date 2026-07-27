import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brandDir = path.join(projectRoot, "public", "brand");
const fontPath = path.join(projectRoot, "public", "fonts", "PretendardVariable.woff2");
const logoPath = path.join(brandDir, "viore-logotype.png");

const cards = [
  {
    output: "viore-social-card-ko-v1.png",
    language: "ko-KR",
    headline: "바이오레,\n새로운 선형을 그리다.",
  },
  {
    output: "viore-social-card-en-v1.png",
    language: "en-US",
    headline: "Viore,\nDrawing a New Linearity\nin Medicine.",
  },
];

const logo = await sharp(logoPath)
  .resize({ width: 260, withoutEnlargement: true })
  .png()
  .toBuffer();

function textImage(text, width, size, weight, color) {
  return sharp({
    text: {
      text: `<span foreground="${color}" font_weight="${weight}">${text}</span>`,
      font: `Pretendard ${size}`,
      fontfile: fontPath,
      width,
      align: "left",
      rgba: true,
      dpi: 72,
      spacing: 0,
    },
  }).png().toBuffer();
}

for (const card of cards) {
  const headline = await textImage(card.headline, 900, 54, 650, "#1b1716");
  const kicker = await textImage(
    card.language === "ko-KR"
      ? "VIORE INC. · MEDICAL INTELLIGENCE"
      : "VIORE INC. · MEDICAL INTELLIGENCE",
    720,
    14,
    600,
    "#77706d",
  );

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: "#ffffff",
    },
  })
    .composite([
      { input: logo, left: 86, top: 66 },
      {
        input: {
          create: {
            width: 6,
            height: 258,
            channels: 4,
            background: "#f05a34",
          },
        },
        left: 86,
        top: 238,
      },
      { input: headline, left: 120, top: 228 },
      { input: kicker, left: 120, top: 548 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(brandDir, card.output));
}

console.log(`Generated ${cards.length} localized social cards.`);

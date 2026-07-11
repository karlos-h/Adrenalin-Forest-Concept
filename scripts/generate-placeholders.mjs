// Generates placeholder images for development. Replace with real
// photography (people mid-obstacle, canopy shots) before launch.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "..", "public", "images");
mkdirSync(OUT, { recursive: true });

const ACCENTS = {
  national: "#1E4D3B",
  christchurch: "#0F8B8D",
  wellington: "#E8A013",
  "bay-of-plenty": "#E45F2B",
  auckland: "#6E56A6",
};

function treeline(width, height, fill, opacity) {
  const points = [];
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const x = (width / n) * i;
    const y = height - 40 - Math.abs(Math.sin(i * 2.7)) * 90 - (i % 3) * 22;
    points.push(`${x},${y}`);
  }
  return `<polygon points="0,${height} ${points.join(" ")} ${width},${height}" fill="${fill}" opacity="${opacity}"/>`;
}

function svg(name, accent, label, width = 1600, height = 1000) {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#132A21"/>
      <stop offset="1" stop-color="#1E4D3B"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  ${treeline(width, height + 60, "#0d1f18", 0.9)}
  ${treeline(width, height, "#132A21", 0.8)}
  <line x1="0" y1="${height * 0.42}" x2="${width}" y2="${height * 0.38}" stroke="${accent}" stroke-width="6" opacity="0.85"/>
  <circle cx="${width * 0.55}" cy="${height * 0.395}" r="26" fill="${accent}"/>
  <text x="50%" y="90%" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" fill="#CFE3D4" opacity="0.65">${label} — placeholder, replace with photography</text>
</svg>`;
  writeFileSync(join(OUT, `${name}.svg`), content);
  console.log(`wrote ${name}.svg`);
}

svg("hero-home", ACCENTS.national, "Adrenalin Forest");
for (const slug of ["christchurch", "wellington", "bay-of-plenty", "auckland"]) {
  svg(`hero-${slug}`, ACCENTS[slug], slug);
  for (let i = 1; i <= 4; i++) {
    svg(`gallery-${slug}-${i}`, ACCENTS[slug], `${slug} gallery ${i}`, 1200, 900);
  }
  svg(`map-${slug}`, ACCENTS[slug], `${slug} park map`, 1200, 900);
}
svg("groups", ACCENTS.national, "Groups", 1200, 900);

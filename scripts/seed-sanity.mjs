/**
 * One-shot import of the local seed content into a Sanity dataset.
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local.
 *
 *   node scripts/seed-sanity.mjs
 *
 * Images are NOT uploaded (the seeds use generated placeholders) — add real
 * photography directly in the Studio. Prices/hours land exactly as seeded,
 * i.e. still placeholders: see CONTENT-SIGNOFF.md before launch.
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Minimal .env.local loader to avoid a dotenv dependency
const envPath = join(import.meta.dirname, "..", ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local first.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-07-01",
  token,
  useCdn: false,
});

// Seeds are TypeScript; register a lightweight transpile via tsx if present,
// otherwise instruct the user.
let seeds;
try {
  seeds = await import("../src/lib/seed/locations.ts");
} catch {
  console.error("Run with tsx to load TS seeds: npx tsx scripts/seed-sanity.mjs");
  process.exit(1);
}
const { SEED_LOCATIONS } = seeds;
const { SEED_FAQS } = await import("../src/lib/seed/faqs.ts");
const { SEED_GROUP_OFFERS } = await import("../src/lib/seed/groupOffers.ts");
const { SEED_SETTINGS } = await import("../src/lib/seed/settings.ts");

const tx = client.transaction();

const faqIds = new Map();
SEED_FAQS.forEach((faq, i) => {
  const id = `faq-seed-${i}`;
  faqIds.set(faq.question, id);
  tx.createOrReplace({
    _id: id,
    _type: "faq",
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    locations: faq.locations,
  });
});

for (const loc of SEED_LOCATIONS) {
  tx.createOrReplace({
    _id: `location-${loc.slug}`,
    _type: "location",
    name: loc.name,
    slug: { _type: "slug", current: loc.slug },
    accentKey: loc.accentKey,
    intro: loc.intro,
    courseCount: loc.courseCount,
    seasonalHours: loc.seasonalHours.map((s, i) => ({ _key: `season-${i}`, ...s })),
    prices: loc.prices.map((p, i) => ({ _key: `price-${i}`, ...p })),
    restrictions: loc.restrictions,
    appointeddBookingId: loc.appointeddBookingId ?? undefined,
    googleMapsEmbedUrl: loc.googleMapsEmbedUrl,
    directions: loc.directions,
    faqs: loc.faqs.map((f) => ({
      _key: faqIds.get(f.question),
      _type: "reference",
      _ref: faqIds.get(f.question),
    })),
    contactEmail: loc.contactEmail,
    contactPhone: loc.contactPhone,
  });
}

SEED_GROUP_OFFERS.forEach((offer, i) => {
  tx.createOrReplace({
    _id: `groupOffer-seed-${i}`,
    _type: "groupOffer",
    title: offer.title,
    description: offer.description,
    locations: offer.locations,
    groupSize: offer.groupSize,
    ageRange: offer.ageRange,
  });
});

tx.createOrReplace({
  _id: "globalSettings",
  _type: "globalSettings",
  siteNotice: SEED_SETTINGS.siteNotice ?? undefined,
  socialLinks: SEED_SETTINGS.socialLinks.map((s, i) => ({ _key: `social-${i}`, ...s })),
});

await tx.commit();
console.log("Seed content imported. Upload hero/gallery photography in the Studio.");

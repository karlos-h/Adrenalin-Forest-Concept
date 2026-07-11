import type { Location, SeasonalHours } from "@/lib/types";

const BASE = "https://www.adrenalin-forest.co.nz";
const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** "9:30am" / "3:00pm" → "09:30" / "15:00" for schema.org */
function to24h(time: string): string {
  const m = time.trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (!m) return time;
  let hours = Number(m[1]) % 12;
  if (m[3] === "pm") hours += 12;
  return `${String(hours).padStart(2, "0")}:${m[2] ?? "00"}`;
}

function openingHoursSpecification(seasons: SeasonalHours[]) {
  return seasons.map((season) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ALL_DAYS.filter((d) => !season.closedDays.includes(d)),
    opens: to24h(season.openTime),
    // Site copy communicates "last entry"; closes is the best schema fit.
    closes: to24h(season.lastEntry),
  }));
}

export function localBusinessJsonLd(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/locations/${location.slug}`,
    name: `Adrenalin Forest ${location.name}`,
    url: `${BASE}/locations/${location.slug}`,
    image: location.heroImage.src.startsWith("http")
      ? location.heroImage.src
      : `${BASE}${location.heroImage.src}`,
    description: location.intro,
    email: location.contactEmail,
    telephone: location.contactPhone,
    openingHoursSpecification: openingHoursSpecification(location.seasonalHours),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NZ",
      addressLocality: location.name,
    },
  };
}

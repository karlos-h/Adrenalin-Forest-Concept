import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";

const BASE = "https://www.adrenalin-forest.co.nz";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/groups", "/pricing", "/safety-faq", "/about", "/book", "/blog"];
  return [
    ...staticPages.map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...LOCATIONS.flatMap((loc) => [
      {
        url: `${BASE}/locations/${loc.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${BASE}/book/${loc.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ]),
  ];
}

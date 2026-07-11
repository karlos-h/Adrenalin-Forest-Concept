/**
 * Structural location constants — slugs, names, accent keys.
 * Prices, hours and restrictions are NOT defined here; they render only
 * from Sanity (single source of truth rule).
 */

export type AccentKey =
  | "christchurch"
  | "wellington"
  | "bay-of-plenty"
  | "auckland";

export interface LocationRef {
  slug: AccentKey;
  name: string;
  accentName: string;
  region: string;
}

export const LOCATIONS: LocationRef[] = [
  {
    slug: "christchurch",
    name: "Christchurch",
    accentName: "Lagoon Teal",
    region: "Spencer Park, Christchurch",
  },
  {
    slug: "wellington",
    name: "Wellington",
    accentName: "Harbour Gold",
    region: "Porirua, Wellington",
  },
  {
    slug: "bay-of-plenty",
    name: "Bay of Plenty",
    accentName: "Sunset Orange",
    region: "TECT Park, Bay of Plenty",
  },
  {
    slug: "auckland",
    name: "Auckland",
    accentName: "Volcanic Violet",
    region: "Woodhill Forest, Auckland",
  },
];

export function isAccentKey(value: string): value is AccentKey {
  return LOCATIONS.some((l) => l.slug === value);
}

export function getLocationRef(slug: string): LocationRef | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

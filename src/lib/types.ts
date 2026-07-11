import type { AccentKey } from "@/lib/locations";

/**
 * Content types shared by components, page queries and seed data.
 * Shapes mirror the Sanity schemas in /sanity/schemaTypes — prices, hours
 * and restrictions must only ever arrive through these (single source of
 * truth rule; never inline them in copy).
 */

export interface ImageRef {
  /** Sanity image URL or local /public path for seed data */
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SeasonalHours {
  /** e.g. "Summer (Oct–Apr)" */
  label: string;
  /** Recurring annual range, inclusive, as MM-DD strings */
  dateRange: { from: string; to: string };
  /** e.g. "9:00am" */
  openTime: string;
  /** Last entry to the course, e.g. "3:00pm" */
  lastEntry: string;
  /** e.g. ["Monday", "Tuesday"] — empty means open every day */
  closedDays: string[];
  notes?: string;
}

export interface Price {
  /** e.g. "Adult (16+)" */
  label: string;
  /** NZD */
  amount: number;
  note?: string;
}

export interface Faq {
  question: string;
  answer: string;
  category: "safety" | "booking" | "general" | "groups";
  /** Empty = applies to all locations */
  locations: AccentKey[];
}

export interface Restrictions {
  minHeightMetres: number;
  maxWeightKg: number;
  /** Plain-language extra rules, e.g. supervision requirements */
  notes: string[];
}

export interface Location {
  name: string;
  slug: AccentKey;
  accentKey: AccentKey;
  heroImage: ImageRef;
  gallery: ImageRef[];
  intro: string;
  courseCount: number;
  seasonalHours: SeasonalHours[];
  prices: Price[];
  restrictions: Restrictions;
  appointeddBookingId: string | null;
  mapImage: ImageRef | null;
  googleMapsEmbedUrl: string;
  directions: string;
  faqs: Faq[];
  contactEmail: string;
  contactPhone: string;
}

export interface GroupOffer {
  title: string;
  description: string;
  locations: AccentKey[];
  groupSize: string;
  ageRange: string;
  image: ImageRef | null;
}

export interface GlobalSettings {
  siteNotice: { enabled: boolean; message: string; id: string } | null;
  socialLinks: { label: string; url: string }[];
  conditionsOfEntryUrl: string | null;
}

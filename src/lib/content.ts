import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import type { Faq, GlobalSettings, GroupOffer, Location } from "@/lib/types";
import { SEED_LOCATIONS } from "@/lib/seed/locations";
import { SEED_FAQS } from "@/lib/seed/faqs";
import { SEED_GROUP_OFFERS } from "@/lib/seed/groupOffers";
import { SEED_SETTINGS } from "@/lib/seed/settings";

/**
 * Single content access layer. Pages call these — never the seed files or
 * the Sanity client directly. While no Sanity project is configured
 * (NEXT_PUBLIC_SANITY_PROJECT_ID unset) the local seed content renders
 * instead, so the site builds and previews without CMS credentials.
 *
 * ISR: pages pass `revalidate` via route segment config; queries use the
 * default fetch caching from next-sanity.
 */

const IMAGE_PROJECTION = `{ "src": asset->url, "alt": alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;

const LOCATION_PROJECTION = groq`{
  name,
  "slug": slug.current,
  accentKey,
  "heroImage": heroImage ${IMAGE_PROJECTION},
  "gallery": gallery[] ${IMAGE_PROJECTION},
  intro,
  courseCount,
  seasonalHours[]{ label, dateRange{ from, to }, openTime, lastEntry, closedDays, notes },
  prices[]{ label, amount, note },
  restrictions{ minHeightMetres, maxWeightKg, notes },
  appointeddBookingId,
  "mapImage": mapImage ${IMAGE_PROJECTION},
  googleMapsEmbedUrl,
  directions,
  "faqs": faqs[]->{ question, answer, category, "locations": coalesce(locations, []) },
  contactEmail,
  contactPhone
}`;

export async function getAllLocations(): Promise<Location[]> {
  if (!sanityClient) return SEED_LOCATIONS;
  return sanityClient.fetch(
    groq`*[_type == "location"] | order(name asc) ${LOCATION_PROJECTION}`
  );
}

export async function getLocation(slug: string): Promise<Location | null> {
  if (!sanityClient) {
    return SEED_LOCATIONS.find((l) => l.slug === slug) ?? null;
  }
  return sanityClient.fetch(
    groq`*[_type == "location" && slug.current == $slug][0] ${LOCATION_PROJECTION}`,
    { slug }
  );
}

export async function getFaqs(): Promise<Faq[]> {
  if (!sanityClient) return SEED_FAQS;
  return sanityClient.fetch(
    groq`*[_type == "faq"]{ question, answer, category, "locations": coalesce(locations, []) }`
  );
}

export async function getGroupOffers(): Promise<GroupOffer[]> {
  if (!sanityClient) return SEED_GROUP_OFFERS;
  return sanityClient.fetch(
    groq`*[_type == "groupOffer"]{
      title, description, "locations": coalesce(locations, []),
      groupSize, ageRange, "image": image ${IMAGE_PROJECTION}
    }`
  );
}

export async function getGlobalSettings(): Promise<GlobalSettings> {
  if (!sanityClient) return SEED_SETTINGS;
  const result = await sanityClient.fetch(
    groq`*[_type == "globalSettings"][0]{
      siteNotice{ enabled, message, id },
      socialLinks[]{ label, url },
      "conditionsOfEntryUrl": conditionsOfEntry.asset->url
    }`
  );
  return result ?? { siteNotice: null, socialLinks: [], conditionsOfEntryUrl: null };
}

import type { Location, Price, Restrictions, SeasonalHours } from "@/lib/types";
import { SEED_FAQS } from "@/lib/seed/faqs";

/**
 * Seed content for the four parks, used until the Sanity project is live
 * (and importable into it via scripts/seed-sanity.mjs).
 *
 * ⚠ CLIENT SIGN-OFF REQUIRED — see CONTENT-SIGNOFF.md. Hours, course
 * counts, phone numbers, addresses and the Auckland/BoP booking IDs are
 * placeholders pending confirmation. Prices were taken from
 * adrenalin-forest.co.nz/pricing on 12 Jul 2026 (Auckland had none listed
 * there and mirrors Wellington until confirmed).
 */

// Prices as published on the old site's pricing page, 12 Jul 2026.
function sitePrices(adult: number, student: number, child: number): Price[] {
  return [
    { label: "Adult", amount: adult },
    { label: "NZ University Student (with ID)", amount: student },
    { label: "Child (U18, over 1.4m)", amount: child, note: "Under-16s climb with an adult 18+" },
    { label: "10 Adult Concession Card", amount: 460, note: "Valid at all locations" },
    { label: "10 Child Concession Card", amount: 350, note: "Valid at all locations" },
  ];
}

// Shared placeholder seasonal hours — CONFIRM PER LOCATION before launch.
const PLACEHOLDER_HOURS: SeasonalHours[] = [
  {
    label: "Summer (1 Oct – 30 Apr)",
    dateRange: { from: "10-01", to: "04-30" },
    openTime: "9:30am",
    lastEntry: "3:30pm",
    closedDays: [],
    notes: "Open 7 days. Sessions can book out — reserve ahead in school holidays.",
  },
  {
    label: "Winter (1 May – 30 Sep)",
    dateRange: { from: "05-01", to: "09-30" },
    openTime: "10:00am",
    lastEntry: "2:00pm",
    closedDays: ["Monday", "Tuesday"],
    notes: "Open Monday and Tuesday for pre-booked groups of 10+.",
  },
];

const STANDARD_RESTRICTIONS: Restrictions = {
  minHeightMetres: 1.4,
  maxWeightKg: 125,
  notes: [
    "Under-16s must be accompanied on the course by an adult aged 18 or over.",
    "Closed shoes required. No jandals or bare feet.",
    "Maximum session length is 3 hours.",
    "Anyone under the influence of alcohol or drugs will not be permitted on the course.",
  ],
};

function faqsFor(slug: Location["slug"]) {
  return SEED_FAQS.filter(
    (f) => f.locations.length === 0 || f.locations.includes(slug)
  );
}

function gallery(slug: Location["slug"], name: string) {
  return [
    { src: `/images/gallery-${slug}-1.svg`, alt: `Climber crossing a high-wire obstacle at Adrenalin Forest ${name}` },
    { src: `/images/gallery-${slug}-2.svg`, alt: `The forest canopy course at Adrenalin Forest ${name}` },
    { src: `/images/gallery-${slug}-3.svg`, alt: `A group on the lower levels at Adrenalin Forest ${name}` },
    { src: `/images/gallery-${slug}-4.svg`, alt: `Flying fox at Adrenalin Forest ${name}` },
  ];
}

export const SEED_LOCATIONS: Location[] = [
  {
    name: "Christchurch",
    slug: "christchurch",
    accentKey: "christchurch",
    heroImage: {
      src: "/images/hero-christchurch.svg",
      alt: "High-wire course through the pines at Spencer Park, Christchurch",
    },
    // Photos from the old site (low-res, ~300px) — placeholder until real photography
    gallery: [
      { src: "/images/current-site/chch-drone.jpg", alt: "Aerial drone view over the Adrenalin Forest course at Spencer Park, Christchurch" },
      { src: "/images/current-site/chch-course.jpg", alt: "Climbers on the high-wire course at Adrenalin Forest Christchurch" },
      { src: "/images/current-site/chch-surf-combo.jpg", alt: "Adrenalin Max combo — high wire and surfing at Spencer Park beach" },
      { src: "/images/current-site/gopro.jpg", alt: "GoPro hire — capture your climb hands-free" },
    ],
    intro:
      "Six levels through the Spencer Park pines, 15–20 minutes north of the city. Finish your climb, then hit the beach next door.",
    courseCount: 6,
    seasonalHours: PLACEHOLDER_HOURS,
    prices: sitePrices(50, 42, 35),
    restrictions: STANDARD_RESTRICTIONS,
    appointeddBookingId: "621bd0783d3b8068043f5d59",
    mapImage: { src: "/images/current-site/map-chch.jpg", alt: "Park map of Adrenalin Forest Christchurch" },
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Spencer+Park,+Christchurch,+New+Zealand&output=embed",
    directions:
      "We're in Spencer Park, Heyders Road, Spencerville — a 15–20 minute drive north of central Christchurch. Follow the signs from the main Spencer Park entrance; parking is free.",
    faqs: faqsFor("christchurch"),
    contactEmail: "christchurch@adrenalin-forest.co.nz",
    contactPhone: "03 000 0000", // PLACEHOLDER — confirm with client
  },
  {
    name: "Wellington",
    slug: "wellington",
    accentKey: "wellington",
    heroImage: {
      src: "/images/hero-wellington.svg",
      alt: "Climber on the top level above the trees at Adrenalin Forest Wellington",
    },
    // Photos from the old site (low-res, ~300px) — placeholder until real photography
    gallery: [
      { src: "/images/current-site/wellington-drone.jpg", alt: "Aerial drone view over the Adrenalin Forest Wellington course" },
      { src: "/images/current-site/the-pulse.jpg", alt: "Climber crossing an obstacle high in the trees" },
      { src: "/images/current-site/course-clip.jpg", alt: "Climbers making their way along the high-wire course" },
      { src: "/images/current-site/course-ad.jpg", alt: "The forest canopy course at Adrenalin Forest" },
    ],
    intro:
      "The capital's biggest climb — 6 levels rising above Porirua, with harbour views for anyone game enough to look down.",
    courseCount: 6,
    seasonalHours: PLACEHOLDER_HOURS,
    prices: sitePrices(52, 44, 37),
    restrictions: STANDARD_RESTRICTIONS,
    appointeddBookingId: "65db8e9a116aec61c7068a7f",
    mapImage: { src: "/images/current-site/map-wgtn.png", alt: "Park map of Adrenalin Forest Wellington" },
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Adrenalin+Forest+Wellington,+Porirua,+New+Zealand&output=embed",
    directions:
      "Find us in Porirua, about 20 minutes north of Wellington city by car or train. Free parking on site.", // PLACEHOLDER address — confirm with client
    faqs: faqsFor("wellington"),
    contactEmail: "wellington@adrenalin-forest.co.nz",
    contactPhone: "04 000 0000", // PLACEHOLDER — confirm with client
  },
  {
    name: "Bay of Plenty",
    slug: "bay-of-plenty",
    accentKey: "bay-of-plenty",
    heroImage: {
      src: "/images/hero-bay-of-plenty.svg",
      alt: "High-wire obstacles through tall forest at Adrenalin Forest Bay of Plenty",
    },
    // Photos from the old site (low-res, ~300px) — placeholder until real photography
    gallery: [
      { src: "/images/current-site/bop-course.jpg", alt: "High-wire obstacles through tall forest at Adrenalin Forest Bay of Plenty" },
      { src: "/images/current-site/bop-course-2.jpg", alt: "Climbers on the Bay of Plenty course in TECT Park" },
      { src: "/images/current-site/bop-stix.jpg", alt: "The Stix ultimate tree climb at Bay of Plenty" },
      { src: "/images/current-site/gopro.jpg", alt: "GoPro hire — capture your climb hands-free" },
    ],
    intro:
      "Deep in TECT Park between Tauranga and Rotorua — 6 levels of real forest, real height and no shortage of stories for the drive home.",
    courseCount: 6,
    seasonalHours: PLACEHOLDER_HOURS,
    prices: sitePrices(50, 42, 35),
    restrictions: STANDARD_RESTRICTIONS,
    appointeddBookingId: null, // CONFIRM booking ID with client
    mapImage: { src: "/images/current-site/map-bop.jpg", alt: "Park map of Adrenalin Forest Bay of Plenty" },
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=TECT+All+Terrain+Park,+New+Zealand&output=embed",
    directions:
      "We're inside TECT All Terrain Park on Pyes Pa Road (SH36), roughly 35 minutes from Tauranga and 45 from Rotorua. Follow the park signs to the Adrenalin Forest car park.", // PLACEHOLDER — confirm with client
    faqs: faqsFor("bay-of-plenty"),
    contactEmail: "bayofplenty@adrenalin-forest.co.nz",
    contactPhone: "07 000 0000", // PLACEHOLDER — confirm with client
  },
  {
    name: "Auckland",
    slug: "auckland",
    accentKey: "auckland",
    heroImage: {
      src: "/images/hero-auckland.svg",
      alt: "Climber silhouetted against the canopy at Adrenalin Forest Auckland",
    },
    gallery: gallery("auckland", "Auckland"),
    intro:
      "Auckland's turn to look up — 6 levels of high-wire forest just out of the city. Bring your mates, leave your excuses.",
    courseCount: 6,
    seasonalHours: PLACEHOLDER_HOURS,
    // Old site listed no Auckland pricing — mirrors Wellington until confirmed
    prices: sitePrices(52, 44, 37),
    restrictions: STANDARD_RESTRICTIONS,
    appointeddBookingId: null, // CONFIRM booking ID with client
    mapImage: { src: "/images/map-auckland.svg", alt: "Park map of Adrenalin Forest Auckland" },
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Adrenalin+Forest+Auckland,+New+Zealand&output=embed",
    directions: "Directions to be confirmed.", // PLACEHOLDER — confirm site address with client
    faqs: faqsFor("auckland"),
    contactEmail: "auckland@adrenalin-forest.co.nz",
    contactPhone: "09 000 0000", // PLACEHOLDER — confirm with client
  },
];

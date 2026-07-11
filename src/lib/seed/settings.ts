import type { GlobalSettings } from "@/lib/types";

export const SEED_SETTINGS: GlobalSettings = {
  siteNotice: {
    enabled: true,
    id: "hours-winter-2026",
    message:
      "Winter hours are in effect and can change with the weather — check your park's page before you travel.",
  },
  socialLinks: [
    { label: "Facebook", url: "https://www.facebook.com/adrenalinforest" },
    { label: "Instagram", url: "https://www.instagram.com/adrenalinforest" },
  ],
  conditionsOfEntryUrl: null, // PDF uploaded via Sanity global settings
};

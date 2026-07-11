import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      // Sanity image CDN
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    // 301s from the old Joomla site. /pricing, /groups and /about keep
    // their paths on the new site, so they need no entries.
    const map: Record<string, string> = {
      "/christchurch": "/locations/christchurch",
      "/bay-of-plenty": "/locations/bay-of-plenty",
      "/wellington": "/locations/wellington",
      "/auckland-home": "/locations/auckland",
      "/vouchers": "/pricing",
      "/faq": "/safety-faq",
      "/safety": "/safety-faq",
      "/videos": "/",
      "/contact": "/about",
      "/adrenalin-forest-blog": "/blog",
      "/clic-it-home": "/safety-faq",
    };
    return Object.entries(map).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;

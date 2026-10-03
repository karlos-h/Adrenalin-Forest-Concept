# Adrenalin Forest website redesign (concept)

I built this redesign concept for a client, Adrenalin Forest NZ, to show how their website could look and work. It's a concept build only and was never published to the live site.

Built with Next.js (App Router), TypeScript, Tailwind CSS and Sanity CMS.

## What I focused on

- A cleaner, simpler layout that works well on mobile
- Content the client can edit themselves in Sanity CMS. Prices, opening hours and restrictions all come from the CMS, so each one is updated in one place.
- Online booking for each park through Appointedd embeds
- A design system built on tokens, with its own accent colour for each of the four parks (Christchurch, Wellington, Bay of Plenty, Auckland)
- An opening hours widget that shows the current season's hours based on today's date in NZ time
- SEO groundwork: page metadata, LocalBusiness structured data, a sitemap, and redirects from the old site's URLs

## Run it locally

```bash
npm install
npm run dev   # http://localhost:3000
```

It runs without any setup. Until a Sanity project is connected, content comes from the seed files in `src/lib/seed/`.

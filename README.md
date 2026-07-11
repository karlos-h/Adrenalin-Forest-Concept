# Adrenalin Forest NZ — website

Rebuild of adrenalin-forest.co.nz: Next.js (App Router, TypeScript),
Tailwind CSS v4, Sanity CMS, Appointedd booking embeds. Deploys to Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages static, ISR 1h)
npm run lint
```

The site runs with **no configuration** — until a Sanity project is set
up, content comes from the local seeds in `src/lib/seed/`.

## Before launch

1. **Client sign-off** — everything in [CONTENT-SIGNOFF.md](CONTENT-SIGNOFF.md)
   (prices, hours, phone numbers, Auckland address, booking IDs,
   testimonials, photography).
2. **Sanity** — create a project at sanity.io/manage, copy `.env.example`
   to `.env.local`, fill in the project ID, then:
   - `npx tsx scripts/seed-sanity.mjs` to import the seed content
   - `npx sanity dev` to run the Studio (schemas in `sanity/schemaTypes/`)
   - Upload real photography and the conditions-of-entry PDF in the Studio
3. **Appointedd** — see [docs/appointedd.md](docs/appointedd.md) for
   booking IDs and widget branding.
4. **Contact form** — currently opens the visitor's mail client; wire it
   to an email service if the client wants server-side sending.

## How it fits together

- **Design tokens** live in `src/app/globals.css` (Brand Reference v1,
  final). Components consume Tailwind theme classes (`bg-cta`,
  `text-ink-500`, `font-display`, `text-hero`) — never raw hex/px.
- **Location accents** — `LocationTheme` (or any `data-accent` attribute)
  flips the semantic tokens `--color-cta` / `--color-cta-hover` /
  `--color-highlight-bg` per location. National pages use the forest-700
  defaults. Never mix two accents on one page.
- **Content** — pages call `src/lib/content.ts` only. It queries Sanity
  when configured, otherwise the seeds. Prices, hours and restrictions
  render exclusively from CMS fields (single source of truth).
- **Seasonal hours** — `src/lib/hours.ts` picks the season matching
  today's date in NZ time; `HoursWidget` shows it as "Now".
- **Redirects** — the old Joomla URL map is in `next.config.ts`.
- **SEO** — per-page metadata, LocalBusiness JSON-LD on location pages,
  `sitemap.ts` / `robots.ts`.

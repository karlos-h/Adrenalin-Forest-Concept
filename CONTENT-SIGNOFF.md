# Content requiring client sign-off before launch

The single list of everything missing or unconfirmed. Placeholder values
are marked in `src/lib/seed/` with `PLACEHOLDER` / `CONFIRM` comments.
Last updated: 12 July 2026.

## ✅ Resolved (still worth a nod from the client)
- **Prices (Christchurch, Wellington, Bay of Plenty)** — taken from the
  live adrenalin-forest.co.nz/pricing page on 12 Jul 2026: Adult $50/$52,
  Student $42/$44, Child $35/$37 (Wellington the dearer), concession
  cards $460/$350 valid at all locations. Ask the client to confirm these
  are current before launch.
- **Park maps (Chch, Wgtn, BoP)** — real maps pulled from the old site.
- **Gallery photos (Chch, Wgtn, BoP)** — real photos from the old site,
  but only ~300px wide (video thumbnails). Fine as placeholders; too
  small for print-quality display.

## ❌ Still missing / unconfirmed

### Auckland — biggest gap
- **No pricing existed on the old site.** Seeded with Wellington's prices
  as the nearest cost-of-living analogue — client must supply the real
  rate card.
- **No site address, no directions, no photos, no park map.**
- **No Appointedd booking ID** — booking page shows a contact fallback.

### Opening hours (all four locations)
Seeded with a generic Summer (1 Oct–30 Apr, 9:30am–3:30pm last entry) /
Winter (1 May–30 Sep, 10am–2pm last entry, closed Mon–Tue) pattern.
Confirm per-location seasons, times, closed days and holiday variations.

### Contact details
- Phone numbers are placeholders (`0X 000 0000`) — confirm per park.
- Email addresses assumed as `<park>@adrenalin-forest.co.nz` — confirm.

### Addresses & directions
- Christchurch: Spencer Park, Heyders Road, Spencerville — confirm street address.
- Wellington: Porirua — confirm exact address and travel notes.
- Bay of Plenty: TECT All Terrain Park, Pyes Pa Road (SH36) — confirm.
- Google Maps embed URLs are search-based placeholders; replace with the
  client's preferred pinned embeds.

### Appointedd booking IDs
- Christchurch: `621bd0783d3b8068043f5d59` (supplied) ✓
- Wellington: `65db8e9a116aec61c7068a7f` (supplied) ✓
- **Bay of Plenty: unknown — confirm with client.**
- **Auckland: unknown — confirm with client.**

### Course counts
All four parks seeded as 6 courses/levels. Confirm per park (the parks
have differed historically).

### Photography
- Hero images are still generated SVG placeholders — the old site's
  photos are too low-res (300px) to fill a hero. Real photography
  (people mid-obstacle, canopy shots, min ~1600px wide) needed for:
  home hero, 4 location heroes, groups hero.
- Higher-res replacements for the gallery photos when available.

### Testimonials
The three home-page testimonials are **written placeholders**, not real
customer quotes. Replace with genuine reviews (with permission).

### Other
- GoPro hire price — mentioned on the site as available, no price listed.
- Social links (Facebook/Instagram URLs) are assumed — confirm handles.
- Conditions-of-entry PDF must be uploaded in Sanity global settings.
- Surf Max / Adrenalin Max combo details and pricing — confirm.
- Voucher purchase flow: seeded as "buy through the booking system" —
  confirm how vouchers are actually sold via Appointedd.
- Contact form currently opens the visitor's mail client — wire to an
  email service if server-side sending is wanted.

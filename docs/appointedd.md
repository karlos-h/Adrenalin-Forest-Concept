# Appointedd booking integration

Each location's "Book your climb" routes to `/book/[slug]`, which embeds
that location's Appointedd booking flow in an iframe
(`https://booking.appointedd.com/app/<bookingId>`). Booking IDs live in
Sanity on each location document (`appointeddBookingId`).

| Location | Booking ID | Status |
|---|---|---|
| Christchurch | `621bd0783d3b8068043f5d59` | supplied |
| Wellington | `65db8e9a116aec61c7068a7f` | supplied |
| Bay of Plenty | — | confirm with client |
| Auckland | — | confirm with client |

Locations without an ID show a contact fallback on their booking page
automatically — nothing breaks while IDs are pending.

## Matching the brand

The widget renders inside Appointedd's iframe, so page CSS cannot reach
it. Two levers:

1. **Appointedd branding configuration** (per organisation, in the
   Appointedd dashboard): set primary colour to the location accent —
   Christchurch `#0F8B8D`, Wellington `#E8A013`, Bay of Plenty `#E45F2B`,
   Auckland `#6E56A6` — body font Barlow, button shape rounded/pill.
2. **The `.af-booking` wrapper** in `AppointeddEmbed.tsx` handles
   everything outside the iframe: card, loading state, fallback link and
   the surrounding accent-themed page, so climbers never feel off-site.

## Failure handling

If the iframe hasn't loaded after 15s (or errors), the component swaps to
a highlighted panel with a direct link to the hosted Appointedd page —
booking is never a dead end.

import type { AccentKey } from "@/lib/locations";

/**
 * Sets the location accent for everything inside it by flipping the
 * semantic tokens (--color-cta, --color-cta-hover, --color-highlight-bg)
 * via the [data-accent] rules in globals.css. Omit `accent` on national
 * pages — the forest-700 defaults apply. Never nest two different accents.
 */
export function LocationTheme({
  accent,
  children,
}: {
  accent?: AccentKey;
  children: React.ReactNode;
}) {
  return <div data-accent={accent}>{children}</div>;
}

import Link from "next/link";
import { LOCATIONS } from "@/lib/locations";

const EXPLORE_LINKS = [
  { label: "Groups & Schools", href: "/groups" },
  { label: "Pricing & Vouchers", href: "/pricing" },
  { label: "Safety & FAQ", href: "/safety-faq" },
  { label: "About & Contact", href: "/about" },
];

// Blog and CLiC-iT Pro live in the footer only (per navigation rules)
const MORE_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "CLiC-iT Pro", href: "https://www.clic-it.eu/en/", external: true },
];

export function Footer() {
  return (
    <footer data-on-dark className="bg-forest-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold uppercase tracking-wide">
            Adrenalin Forest
          </p>
          <p className="mt-3 max-w-xs text-canopy-200">
            High-wire obstacle courses in real NZ forest. 6 levels, 20m up.
            Claim your bragging rights.
          </p>
        </div>

        <nav aria-label="Locations">
          <p className="text-caption font-semibold uppercase tracking-wider text-canopy-200">
            Locations
          </p>
          <ul className="mt-3 space-y-2">
            {LOCATIONS.map((loc) => (
              <li key={loc.slug}>
                <Link href={`/locations/${loc.slug}`} className="hover:text-canopy-200">
                  {loc.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Explore">
          <p className="text-caption font-semibold uppercase tracking-wider text-canopy-200">
            Explore
          </p>
          <ul className="mt-3 space-y-2">
            {EXPLORE_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-canopy-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="More">
          <p className="text-caption font-semibold uppercase tracking-wider text-canopy-200">
            More
          </p>
          <ul className="mt-3 space-y-2">
            {MORE_LINKS.map((item) =>
              item.external ? (
                <li key={item.href}>
                  <a
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-canopy-200"
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-canopy-200">
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      <div className="border-t border-forest-700">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-caption text-canopy-200 sm:px-6">
          <p>© {new Date().getFullYear()} Adrenalin Forest NZ. All rights reserved.</p>
          <p>Always connected — CLiC-iT keeps you clipped on 100% of the time.</p>
        </div>
      </div>
    </footer>
  );
}

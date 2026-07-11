"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCATIONS, isAccentKey, type AccentKey } from "@/lib/locations";

const NAV_ITEMS = [
  { label: "Groups & Schools", href: "/groups" },
  { label: "Pricing & Vouchers", href: "/pricing" },
  { label: "Safety & FAQ", href: "/safety-faq" },
  { label: "About", href: "/about" },
];

/** Accent for the current route, so the persistent Book button matches the page. */
function useRouteAccent(): AccentKey | undefined {
  const pathname = usePathname();
  const match = pathname.match(/^\/(?:locations|book)\/([^/]+)/);
  const slug = match?.[1];
  return slug && isAccentKey(slug) ? slug : undefined;
}

export function Header() {
  const accent = useRouteAccent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Menus close on navigation via closeMenus on every link
  function closeMenus() {
    setMobileOpen(false);
    setLocationsOpen(false);
  }

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    if (!locationsOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setLocationsOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLocationsOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [locationsOpen]);

  const bookHref = accent ? `/book/${accent}` : "/book";

  return (
    <header data-accent={accent} data-on-dark className="bg-forest-700 text-white sticky top-0 z-40">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <Link
          href="/"
          className="font-display text-2xl font-bold uppercase tracking-wide leading-none"
        >
          Adrenalin Forest
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-expanded={locationsOpen}
              aria-haspopup="true"
              onClick={() => setLocationsOpen((v) => !v)}
              className="flex items-center gap-1 py-2 font-medium hover:text-canopy-200"
            >
              Locations
              <svg
                aria-hidden="true"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                className={`transition-transform ${locationsOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            {locationsOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 rounded-lg bg-white py-2 text-ink-900 shadow-lg">
                {LOCATIONS.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    onClick={closeMenus}
                    className="block px-4 py-2 font-medium hover:bg-canopy-200"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 font-medium hover:text-canopy-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={bookHref}
            className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${
              accent
                ? "bg-cta text-white hover:bg-cta-hover"
                : "bg-white text-forest-700 hover:bg-canopy-200"
            }`}
          >
            Book your climb
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-forest-500 px-4 pb-6 pt-2 lg:hidden">
          <p className="pt-2 text-caption font-semibold uppercase tracking-wider text-canopy-200">
            Locations
          </p>
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              onClick={closeMenus}
              className="block py-2.5 pl-3 font-medium"
            >
              {loc.name}
            </Link>
          ))}
          <div className="mt-2 border-t border-forest-500 pt-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className="block py-2.5 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={bookHref}
            onClick={closeMenus}
            className={`mt-4 block rounded-full px-5 py-3 text-center font-semibold ${
              accent ? "bg-cta text-white" : "bg-white text-forest-700"
            }`}
          >
            Book your climb
          </Link>
        </div>
      )}
    </header>
  );
}

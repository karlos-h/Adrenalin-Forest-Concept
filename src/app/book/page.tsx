import type { Metadata } from "next";
import Link from "next/link";
import { getAllLocations } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Book your climb",
  description:
    "Pick your park — Christchurch, Wellington, Bay of Plenty or Auckland — and book your Adrenalin Forest session.",
};

/** Park chooser for the nav's Book button on national pages. */
export default async function BookIndexPage() {
  const locations = await getAllLocations();
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-hero font-bold uppercase leading-none">
        Book your climb
      </h1>
      <p className="mt-4 max-w-xl text-ink-500">
        First call: which forest? Pick your park and we'll take it from there.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {locations.map((location) => (
          <li key={location.slug} data-accent={location.accentKey}>
            <Link
              href={`/book/${location.slug}`}
              className="group flex items-center justify-between rounded-2xl bg-highlight px-6 py-5 transition-colors hover:bg-cta hover:text-white"
            >
              <span className="font-display text-h3 font-bold uppercase">
                {location.name}
              </span>
              <span aria-hidden="true" className="text-cta-hover transition-colors group-hover:text-white">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

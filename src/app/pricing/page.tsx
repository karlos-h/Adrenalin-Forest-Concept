import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { PriceTable } from "@/components/ui/PriceTable";
import { getAllLocations } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pricing & Vouchers",
  description:
    "Session prices for every Adrenalin Forest park, plus gift vouchers. Up to 3 hours on the courses per session.",
};

export default async function PricingPage() {
  const locations = await getAllLocations();

  return (
    <>
      <section data-on-dark className="bg-forest-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h1 className="font-display text-hero font-bold uppercase leading-none">
            Pricing &amp; vouchers
          </h1>
          <p className="mt-4 max-w-xl text-canopy-200">
            One ticket, up to 3 hours on the courses, as many levels as you can
            manage. Prices below are per park.
          </p>
        </div>
      </section>

      {/* Practical info: plain and clear. Prices come only from the CMS. */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          {locations.map((location) => (
            <div key={location.slug} data-accent={location.accentKey}>
              <h2 className="font-display text-h2 font-bold uppercase">
                {location.name}
              </h2>
              <div className="mt-4">
                <PriceTable
                  prices={location.prices}
                  caption={`Adrenalin Forest ${location.name} prices`}
                />
              </div>
              <p className="mt-4">
                <Link
                  href={`/locations/${location.slug}`}
                  className="font-semibold text-cta-hover underline"
                >
                  Hours and details for {location.name}
                </Link>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-caption text-ink-500">
          Groups of 20+ get special rates — see{" "}
          <Link href="/groups" className="font-semibold text-cta-hover underline">
            Groups &amp; Schools
          </Link>
          . Minimum height 1.4m, maximum weight 125kg, under-16s climb with an
          adult 18+.
        </p>
      </section>

      {/* Vouchers */}
      <section className="bg-canopy-200/50">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-h2 font-bold uppercase">
            Gift vouchers
          </h2>
          <p className="mt-4 max-w-2xl text-ink-500">
            Give someone 3 hours in the trees and a shot at level 6. Vouchers
            are valid at the park you choose, for 12 months from purchase, and
            are bought through each park's booking system.
          </p>
        </div>
      </section>

      <CTASection
        heading="Sorted on price?"
        support="Then there's only one question left. How far will you get?"
        ctaLabel="Book your climb"
        ctaHref="/book"
      />
    </>
  );
}

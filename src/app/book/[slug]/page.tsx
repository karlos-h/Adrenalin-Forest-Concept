import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppointeddEmbed } from "@/components/booking/AppointeddEmbed";
import { LocationTheme } from "@/components/theme/LocationTheme";
import { getLocation } from "@/lib/content";
import { LOCATIONS } from "@/lib/locations";

export const revalidate = 3600;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocation(slug);
  if (!location) return {};
  return {
    title: `Book your climb — Adrenalin Forest ${location.name}`,
    description: `Pick a session at Adrenalin Forest ${location.name}. Up to 3 hours on the courses, 6 levels, real forest.`,
  };
}

export default async function BookPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const location = await getLocation(slug);
  if (!location) notFound();

  return (
    <LocationTheme accent={location.accentKey}>
      <section data-on-dark className="bg-forest-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <p className="font-display font-semibold uppercase tracking-wider text-canopy-200">
            Adrenalin Forest {location.name}
          </p>
          <h1 className="mt-2 font-display text-hero font-bold uppercase leading-none">
            Book your climb
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-canopy-200">
            Pick a session below. Arrive 15 minutes early for your harness
            fit-out and briefing — then it's you versus the trees.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {location.appointeddBookingId ? (
          <AppointeddEmbed
            bookingId={location.appointeddBookingId}
            locationName={location.name}
          />
        ) : (
          <div className="rounded-xl bg-highlight p-8 text-center">
            <h2 className="font-display text-h3 font-bold uppercase">
              Online booking is on its way
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-500">
              Online booking for {location.name} isn't live yet. Email or call
              us and we will lock in your session.
            </p>
            <p className="mt-5 font-semibold">
              <a href={`mailto:${location.contactEmail}`} className="text-cta-hover underline">
                {location.contactEmail}
              </a>
              {" · "}
              <a
                href={`tel:${location.contactPhone.replace(/\s/g, "")}`}
                className="text-cta-hover underline"
              >
                {location.contactPhone}
              </a>
            </p>
          </div>
        )}

        <div className="mt-10 rounded-xl border border-ink-500/20 p-6">
          <h2 className="font-display text-h3 font-bold uppercase">
            The essentials
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-500">
            <li>Minimum height {location.restrictions.minHeightMetres}m · maximum weight {location.restrictions.maxWeightKg}kg</li>
            <li>Sessions run up to 3 hours</li>
            <li>Closed shoes required</li>
            <li>Under-16s climb with an adult 18+</li>
            <li>Groups of 20+? Email us for group rates instead of booking online.</li>
          </ul>
        </div>
      </section>
    </LocationTheme>
  );
}

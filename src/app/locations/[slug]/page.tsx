import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Gallery } from "@/components/ui/Gallery";
import { HoursWidget } from "@/components/ui/HoursWidget";
import { PriceTable } from "@/components/ui/PriceTable";
import { StatStrip } from "@/components/ui/StatStrip";
import { LocationTheme } from "@/components/theme/LocationTheme";
import { getLocation } from "@/lib/content";
import { LOCATIONS } from "@/lib/locations";
import { localBusinessJsonLd } from "@/lib/structuredData";

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
    title: `Adrenalin Forest ${location.name} — High-wire obstacle course`,
    description: location.intro,
    openGraph: {
      title: `Adrenalin Forest ${location.name}`,
      description: location.intro,
      images: [{ url: location.heroImage.src }],
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const location = await getLocation(slug);
  if (!location) notFound();

  const bookHref = `/book/${location.slug}`;

  return (
    <LocationTheme accent={location.accentKey}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd(location)),
        }}
      />
      {/* Hero */}
      <section data-on-dark className="relative bg-forest-900 text-white">
        <Image
          src={location.heroImage.src}
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 sm:py-32">
          <p className="rounded-full bg-cta px-4 py-1 font-display font-semibold uppercase tracking-wider">
            {location.name}
          </p>
          <h1 className="font-display text-hero font-bold uppercase leading-none">
            Your forest is waiting
          </h1>
          <p className="max-w-xl text-lg text-canopy-200">{location.intro}</p>
          <Button href={bookHref}>Book your climb</Button>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-b border-ink-500/10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <StatStrip
            stats={[
              { value: "20m", label: "Up" },
              { value: String(location.courseCount), label: "Levels" },
              { value: "100+", label: "Challenges" },
              { value: "3hr", label: "Sessions" },
            ]}
          />
        </div>
      </section>

      {/* Hours + pricing — practical info, plain and clear */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-h2 font-bold uppercase">
            Plan your climb
          </h2>
          <div className="mt-6">
            <HoursWidget seasons={location.seasonalHours} />
          </div>
          <div className="mt-6 rounded-xl border border-ink-500/20 p-6">
            <h3 className="font-display text-h3 font-bold uppercase">
              Before you book
            </h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-500">
              <li>Minimum height {location.restrictions.minHeightMetres}m</li>
              <li>Maximum weight {location.restrictions.maxWeightKg}kg</li>
              {location.restrictions.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="font-display text-h2 font-bold uppercase">Pricing</h2>
          <div className="mt-6">
            <PriceTable
              prices={location.prices}
              caption={`Adrenalin Forest ${location.name} prices`}
            />
          </div>
          <div className="mt-8">
            <Button href={bookHref}>Book your climb</Button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-highlight/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-h2 font-bold uppercase">
            Up in the {location.name} trees
          </h2>
          <div className="mt-8">
            <Gallery images={location.gallery} />
          </div>
        </div>
      </section>

      {/* Park map + directions */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-h2 font-bold uppercase">
            Finding us
          </h2>
          <p className="mt-4 text-ink-500">{location.directions}</p>
          {location.mapImage && (
            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={location.mapImage.src}
                alt={location.mapImage.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="sr-only">Map of Adrenalin Forest {location.name}</h2>
          <iframe
            src={location.googleMapsEmbedUrl}
            title={`Google map showing Adrenalin Forest ${location.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-80 w-full flex-1 rounded-xl border-0"
          />
          <p className="mt-4 text-caption text-ink-500">
            Questions on the day? Call{" "}
            <a href={`tel:${location.contactPhone.replace(/\s/g, "")}`} className="font-semibold text-cta-hover underline">
              {location.contactPhone}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${location.contactEmail}`} className="font-semibold text-cta-hover underline">
              {location.contactEmail}
            </a>
            .
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <h2 className="font-display text-h2 font-bold uppercase">
          Good questions
        </h2>
        <div className="mt-8">
          <FAQAccordion faqs={location.faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section data-on-dark className="bg-forest-900 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-h2 font-bold uppercase leading-tight">
            How far will you get?
          </h2>
          <p className="max-w-xl text-canopy-200">
            {location.courseCount} levels are waiting. Level 1 starts 1.5m up —
            the rest is on you.
          </p>
          <Button href={bookHref}>Book your climb</Button>
        </div>
      </section>
    </LocationTheme>
  );
}

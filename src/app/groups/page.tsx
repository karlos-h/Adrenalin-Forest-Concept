import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { getGroupOffers } from "@/lib/content";
import { getLocationRef } from "@/lib/locations";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Groups & Schools",
  description:
    "School programmes with NCEA alignment, corporate team building, birthdays and Christchurch surf combos. Groups of 20+ get special rates.",
};

export default async function GroupsPage() {
  const offers = await getGroupOffers();

  return (
    <>
      <section data-on-dark className="relative bg-forest-900 text-white">
        <Image src="/images/groups.svg" alt="" fill priority className="object-cover opacity-40" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6">
          <h1 className="font-display text-hero font-bold uppercase leading-none">
            Bring the whole crew
          </h1>
          <p className="mt-4 max-w-xl text-lg text-canopy-200">
            Schools, workmates, birthdays — a shared challenge 20m up beats
            anything you can do in a hall. Groups of 20+ get special rates.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="sr-only">Group options</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {offers.map((offer) => (
            <article key={offer.title} className="flex flex-col rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="font-display text-h3 font-bold uppercase">{offer.title}</h3>
              <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-caption text-ink-500">
                <div>
                  <dt className="inline font-semibold">Group size: </dt>
                  <dd className="inline">{offer.groupSize}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">Ages: </dt>
                  <dd className="inline">{offer.ageRange}</dd>
                </div>
                {offer.locations.length > 0 && (
                  <div>
                    <dt className="inline font-semibold">Where: </dt>
                    <dd className="inline">
                      {offer.locations
                        .map((slug) => getLocationRef(slug)?.name ?? slug)
                        .join(", ")}
                    </dd>
                  </div>
                )}
              </dl>
              <p className="mt-4 text-ink-500">{offer.description}</p>
            </article>
          ))}
        </div>

        {/* Outcomes-focused, professional but not stiff */}
        <div className="mt-16 rounded-2xl bg-canopy-200/50 p-8 md:p-12">
          <h2 className="font-display text-h2 font-bold uppercase">
            Why it works
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-h3 font-bold uppercase">Confidence</h3>
              <p className="mt-2 text-ink-500">
                Students and teams set their own limit, then beat it. That
                carries back to the classroom and the office.
              </p>
            </div>
            <div>
              <h3 className="font-display text-h3 font-bold uppercase">Teamwork</h3>
              <p className="mt-2 text-ink-500">
                The courses are individual, but nobody gets to level 6 without
                encouragement from below. You see who steps up.
              </p>
            </div>
            <div>
              <h3 className="font-display text-h3 font-bold uppercase">NCEA credits</h3>
              <p className="mt-2 text-ink-500">
                School programmes can align to NCEA achievement standards in
                outdoor education. Ask us for the current mapping.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="20 or more of you?"
        support="Email your nearest park with numbers and a date — we'll put together group rates and a run sheet."
        ctaLabel="Get in touch"
        ctaHref="/about#contact"
      />
    </>
  );
}

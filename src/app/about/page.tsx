import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/ContactForm";
import { getAllLocations } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "The story behind Adrenalin Forest's high-wire courses, plus contact details for every park — Christchurch, Wellington, Bay of Plenty and Auckland.",
};

export default async function AboutPage() {
  const locations = await getAllLocations();

  return (
    <>
      <section data-on-dark className="bg-forest-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h1 className="font-display text-hero font-bold uppercase leading-none">
            Real forest. Real height.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-canopy-200">
            We build high-wire obstacle courses in living NZ forest — and then
            dare you to climb them.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-4 py-20 sm:px-6">
        <h2 className="font-display text-h2 font-bold uppercase">
          Who we are
        </h2>
        <p>
          Adrenalin Forest started with a simple idea: the best climbing frame
          in the country was already here — the trees. No warehouse, no
          plastic rock, no queue for the one good wall. Just real forest, real
          height and a course that keeps asking whether you've got one more
          level in you.
        </p>
        <p>
          Today we run 4 parks — Christchurch, Wellington, Bay of Plenty and
          Auckland — each with 6 levels rising to 20m above the forest floor.
          Every climber is fitted with the CLiC-iT continuous-connection
          system, so you're clipped on 100% of the time from first step to
          last. Our teams check the courses daily, and independent inspectors
          check us annually.
        </p>
        <p>
          Anyone from 1.4m tall can start. Plenty of people surprise
          themselves with how far they get — that's rather the point.
        </p>
      </section>

      {/* Per-location contact — practical info, plain and clear */}
      <section id="contact" className="bg-canopy-200/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-h2 font-bold uppercase">
            Talk to your park
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((location) => (
              <div
                key={location.slug}
                data-accent={location.accentKey}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-h3 font-bold uppercase text-cta-hover">
                  {location.name}
                </h3>
                <p className="mt-3">
                  <a
                    href={`mailto:${location.contactEmail}`}
                    className="break-all font-medium underline"
                  >
                    {location.contactEmail}
                  </a>
                </p>
                <p className="mt-1">
                  <a
                    href={`tel:${location.contactPhone.replace(/\s/g, "")}`}
                    className="font-medium underline"
                  >
                    {location.contactPhone}
                  </a>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-h2 font-bold uppercase">
                Or drop us a line
              </h2>
              <p className="mt-3 max-w-md text-ink-500">
                Group bookings, school programmes, media, or a question the
                FAQ didn't cover — pick your park and send it through.
              </p>
            </div>
            <ContactForm
              locations={locations.map(({ slug, name, contactEmail }) => ({
                slug,
                name,
                contactEmail,
              }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}

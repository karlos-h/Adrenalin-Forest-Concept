import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { LevelProgress } from "@/components/ui/LevelProgress";
import { LocationCard } from "@/components/ui/LocationCard";
import { StatStrip } from "@/components/ui/StatStrip";
import { getAllLocations } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Adrenalin Forest — High-wire obstacle courses in real NZ forest",
  description:
    "Six levels. 20 metres up. 100+ challenges through real NZ forest at Christchurch, Wellington, Bay of Plenty and Auckland. How far will you get?",
};

const HOW_IT_WORKS = [
  {
    title: "Gear up",
    body: "Arrive 15 minutes early. Our team fits your CLiC-iT harness — it keeps you clipped on 100% of the time — and runs your safety briefing.",
  },
  {
    title: "Start low",
    body: "Level 1 starts 1.5m off the ground. Find your feet, learn the clips, get comfortable in the trees.",
  },
  {
    title: "Climb higher",
    body: "6 levels, each higher and harder than the last. Wobbly bridges, flying foxes, and 100+ challenges between you and the top.",
  },
  {
    title: "Claim it",
    body: "However far you get, it's yours. Up to 3 hours on the courses — and the top level is 20m up, waiting for next time.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Made it to level 5 on my first go. My teenage son made it to 6 and hasn't let me forget it.",
    name: "Sarah, Christchurch",
  },
  {
    quote:
      "Booked it for a team day expecting the usual eye-rolls. Six months later they're still talking about it.",
    name: "Mike, Wellington",
  },
  {
    quote:
      "Genuinely in the forest, genuinely high up. Nothing like the indoor stuff.",
    name: "Priya, Tauranga",
  },
];

export default async function HomePage() {
  const locations = await getAllLocations();

  return (
    <>
      {/* Hero */}
      <section data-on-dark className="relative bg-forest-900 text-white">
        <Image
          src="/images/hero-home.svg"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-28 text-center sm:px-6 sm:py-36">
          <h1 className="font-display text-hero font-bold uppercase leading-none">
            Six levels.
            <br />
            20 metres up.
            <br />
            How far will you get?
          </h1>
          <p className="max-w-xl text-lg text-canopy-200">
            High-wire obstacle courses through real NZ forest — not a
            warehouse. Claim your bragging rights.
          </p>
          <Button href="/book">Book your climb</Button>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-b border-ink-500/10 bg-paper-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <StatStrip />
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-h2 font-bold uppercase">
          Pick your forest
        </h2>
        <p className="mt-2 max-w-xl text-ink-500">
          4 parks. Same dare in every one of them.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-canopy-200/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-h2 font-bold uppercase">
                Higher. Harder. Yours to conquer.
              </h2>
              <p className="mt-2 max-w-xl text-ink-500">
                No experience needed — if you're 1.4m tall, you're in.
              </p>
            </div>
            <LevelProgress />
          </div>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title}>
                <span className="font-display text-stat font-bold text-cta">
                  {i + 1}
                </span>
                <h3 className="mt-1 font-display text-h3 font-bold uppercase">
                  {step.title}
                </h3>
                <p className="mt-2 text-ink-500">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Social proof */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-h2 font-bold uppercase">
          Bragging rights, claimed
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-white p-6 shadow-sm">
              <blockquote className="text-ink-900">“{t.quote}”</blockquote>
              <figcaption className="mt-4 font-semibold text-cta-hover">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CTASection
        heading="Think you'll make level 6?"
        support="One way to find out. Sessions run up to 3 hours — book ahead, especially on weekends."
        ctaLabel="Book your climb"
        ctaHref="/book"
      />
    </>
  );
}

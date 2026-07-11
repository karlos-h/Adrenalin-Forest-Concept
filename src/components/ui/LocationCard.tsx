import Image from "next/image";
import Link from "next/link";
import type { Location } from "@/lib/types";

/**
 * Home-page location card. Each card carries its own accent via
 * data-accent (the one place a national page shows location accents —
 * each card is self-contained, so accents never mix within a section).
 */
export function LocationCard({ location }: { location: Location }) {
  return (
    <div data-accent={location.accentKey} className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={location.heroImage.src}
          alt={location.heroImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <span className="w-fit rounded-full bg-highlight px-3 py-1 text-caption font-semibold uppercase tracking-wider text-cta-hover">
          {location.courseCount} courses
        </span>
        <h3 className="font-display text-h3 font-bold uppercase">
          <Link
            href={`/locations/${location.slug}`}
            className="after:absolute after:inset-0 group-hover:text-cta-hover"
          >
            {location.name}
          </Link>
        </h3>
        <p className="text-caption text-ink-500">{location.intro}</p>
        <span aria-hidden="true" className="mt-auto pt-2 font-semibold text-cta-hover">
          See the park →
        </span>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/Button";

/**
 * Standard end-of-section call to action. ONE CTA per section — this
 * component enforces it by taking exactly one link.
 */
export function CTASection({
  heading,
  support,
  ctaLabel,
  ctaHref,
}: {
  heading: string;
  support?: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section data-on-dark className="bg-forest-900 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-h2 font-bold uppercase leading-tight">
          {heading}
        </h2>
        {support && <p className="max-w-xl text-canopy-200">{support}</p>}
        <Button href={ctaHref}>{ctaLabel}</Button>
      </div>
    </section>
  );
}

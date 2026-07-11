import type { Metadata } from "next";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTASection } from "@/components/ui/CTASection";
import { getFaqs, getGlobalSettings } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Safety & FAQ",
  description:
    "How the CLiC-iT continuous-connection system keeps every climber clipped on 100% of the time, plus answers to common questions.",
};

const CATEGORY_LABELS: Record<string, string> = {
  safety: "Safety",
  booking: "Booking & what to bring",
  general: "On the course",
  groups: "Groups",
};

export default async function SafetyFaqPage() {
  const faqs = await getFaqs();
  const settings = await getGlobalSettings();
  const categories = ["safety", "booking", "general", "groups"] as const;

  return (
    <>
      {/* Safety content: calm, reassuring, warm. Never jokey. */}
      <section data-on-dark className="bg-forest-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h1 className="font-display text-hero font-bold uppercase leading-none">
            Safety &amp; FAQ
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-canopy-200">
            Height is the thrill. Safety is the system underneath it — and it
            starts before you leave the ground.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-h2 font-bold uppercase">
          Always connected
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-ink-900">
            <p>
              Every climber at Adrenalin Forest wears the CLiC-iT
              continuous-connection system. Its two connectors are
              mechanically linked: one can only open while the other is locked
              onto the safety line. From the moment you clip on at level 1 to
              the moment our team unclips you at the end, you are attached to
              the course 100% of the time.
            </p>
            <p>
              You don't need to take our word for how it feels — the first
              thing every climber does is a practice level close to the
              ground, with our team alongside. You head up when you're ready,
              not before.
            </p>
          </div>
          <div className="rounded-xl bg-canopy-200/60 p-6">
            <h3 className="font-display text-h3 font-bold uppercase">
              Before every session
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-500">
              <li>Harness fitted by our trained team</li>
              <li>Full safety briefing, every climber, every time</li>
              <li>Demonstration level near the ground before you climb</li>
              <li>Daily course checks, plus independent annual inspections</li>
            </ul>
            {settings.conditionsOfEntryUrl && (
              <p className="mt-4">
                <a
                  href={settings.conditionsOfEntryUrl}
                  className="font-semibold text-cta-hover underline"
                >
                  Read the full conditions of entry (PDF)
                </a>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <h2 className="font-display text-h2 font-bold uppercase">
          Your questions
        </h2>
        {categories.map((category) => {
          const items = faqs.filter((f) => f.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category} className="mt-10">
              <h3 className="font-display text-h3 font-bold uppercase text-forest-700">
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="mt-4">
                <FAQAccordion faqs={items} />
              </div>
            </div>
          );
        })}
      </section>

      <CTASection
        heading="Ready when you are"
        support="Clipped on from the first step to the last. The only thing left to worry about is level 6."
        ctaLabel="Book your climb"
        ctaHref="/book"
      />
    </>
  );
}

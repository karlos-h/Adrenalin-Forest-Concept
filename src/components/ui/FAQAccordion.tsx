import type { Faq } from "@/lib/types";

/**
 * Accessible accordion built on native details/summary — keyboard and
 * screen-reader support for free, no client JS.
 */
export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;
  return (
    <div className="divide-y divide-ink-500/20 border-y border-ink-500/20">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-1">
          <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
            {faq.question}
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="shrink-0 text-cta-hover transition-transform group-open:rotate-180"
            >
              <path d="M2 5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </summary>
          <p className="pb-5 pr-8 text-ink-500">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Location } from "@/lib/types";

/**
 * Contact form. Until an email service is wired up (see
 * CONTENT-SIGNOFF.md), submissions open the visitor's mail client with
 * the message pre-filled and addressed to the chosen park.
 */
export function ContactForm({
  locations,
}: {
  locations: Pick<Location, "slug" | "name" | "contactEmail">[];
}) {
  const [park, setPark] = useState<string>(locations[0]?.slug ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const to = locations.find((l) => l.slug === park)?.contactEmail ?? "";
    const subject = encodeURIComponent(
      `Website enquiry from ${data.get("name")}`
    );
    const body = encodeURIComponent(
      `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  const inputClasses =
    "w-full rounded-lg border border-ink-500/30 bg-white px-4 py-3 text-body focus:border-cta";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-park" className="mb-1.5 block font-semibold">
          Which park?
        </label>
        <select
          id="contact-park"
          name="park"
          value={park}
          onChange={(e) => setPark(e.target.value)}
          className={inputClasses}
        >
          {locations.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block font-semibold">
          Your name
        </label>
        <input id="contact-name" name="name" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block font-semibold">
          Your email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block font-semibold">
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={inputClasses}
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-cta px-7 py-3.5 font-semibold text-white transition-colors hover:bg-cta-hover"
      >
        Send your message
      </button>
    </form>
  );
}

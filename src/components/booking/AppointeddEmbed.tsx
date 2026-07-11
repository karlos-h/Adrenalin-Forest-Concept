"use client";

import { useEffect, useState } from "react";

/**
 * Appointedd booking flow, embedded so climbers never feel off-site.
 * The page around it carries the brand hero/header; Appointedd's own
 * branding configuration should be set to the location accent + Barlow
 * (see docs/appointedd.md). If the iframe fails to load, a fallback
 * link to the hosted booking page appears.
 */
export function AppointeddEmbed({
  bookingId,
  locationName,
}: {
  bookingId: string;
  locationName: string;
}) {
  const bookingUrl = `https://booking.appointedd.com/app/${bookingId}`;
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // If the widget hasn't rendered after a generous window, surface the
  // fallback link rather than leaving a blank frame.
  useEffect(() => {
    const timer = setTimeout(() => setFailed((f) => f || !loaded), 15000);
    return () => clearTimeout(timer);
  }, [loaded]);

  if (failed && !loaded) {
    return (
      <div className="rounded-xl bg-highlight p-8 text-center">
        <p className="font-semibold">
          The booking calendar didn't load.
        </p>
        <p className="mt-2 text-ink-500">
          No stress — you can book on our booking partner's site instead.
        </p>
        <a
          href={bookingUrl}
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-cta px-7 py-3.5 font-semibold text-white transition-colors hover:bg-cta-hover"
        >
          Book your climb at {locationName}
        </a>
      </div>
    );
  }

  return (
    <div className="af-booking overflow-hidden rounded-xl bg-white shadow-sm">
      {!loaded && (
        <p role="status" className="p-8 text-center text-ink-500">
          Loading the booking calendar…
        </p>
      )}
      <iframe
        src={bookingUrl}
        title={`Book your climb at Adrenalin Forest ${locationName}`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`w-full border-0 ${loaded ? "h-[900px]" : "h-0"}`}
      />
      <p className="border-t border-ink-500/10 p-4 text-center text-caption text-ink-500">
        Trouble booking?{" "}
        <a
          href={bookingUrl}
          rel="noopener noreferrer"
          className="font-semibold text-cta-hover underline"
        >
          Open the booking page in a new window
        </a>
      </p>
    </div>
  );
}

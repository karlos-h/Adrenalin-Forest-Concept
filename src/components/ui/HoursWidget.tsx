import type { SeasonalHours } from "@/lib/types";
import { currentSeason } from "@/lib/hours";

/**
 * Live opening hours. Picks the season that applies today (NZ time) and
 * shows it first; other seasons are listed below for planning ahead.
 * Renders only from CMS data — practical info voice: plain, no jokes.
 */
export function HoursWidget({ seasons }: { seasons: SeasonalHours[] }) {
  const active = currentSeason(seasons);

  return (
    <div className="rounded-xl bg-highlight p-6">
      <h3 className="font-display text-h3 font-bold uppercase text-ink-900">
        Opening hours
      </h3>
      {active ? (
        <dl className="mt-4 space-y-1.5">
          <div className="text-caption font-semibold uppercase tracking-wider text-cta-hover">
            Now: {active.label}
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-500">Open from</dt>
            <dd className="font-semibold">{active.openTime}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-500">Last entry</dt>
            <dd className="font-semibold">{active.lastEntry}</dd>
          </div>
          {active.closedDays.length > 0 && (
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Closed</dt>
              <dd className="font-semibold">{active.closedDays.join(", ")}</dd>
            </div>
          )}
          {active.notes && <p className="pt-2 text-caption text-ink-500">{active.notes}</p>}
        </dl>
      ) : (
        <p className="mt-4 text-ink-500">
          Hours for the current period are being confirmed. Check back soon or
          get in touch.
        </p>
      )}

      {seasons.filter((s) => s !== active).length > 0 && (
        <details className="mt-5 border-t border-ink-500/20 pt-4">
          <summary className="cursor-pointer font-semibold text-cta-hover">
            Planning ahead? All seasons
          </summary>
          <ul className="mt-3 space-y-3">
            {seasons
              .filter((s) => s !== active)
              .map((season) => (
                <li key={season.label} className="text-caption">
                  <span className="font-semibold text-ink-900">{season.label}:</span>{" "}
                  open {season.openTime}, last entry {season.lastEntry}
                  {season.closedDays.length > 0 &&
                    `, closed ${season.closedDays.join(" and ")}`}
                  {season.notes && ` — ${season.notes}`}
                </li>
              ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export interface Stat {
  value: string;
  label: string;
}

export const NATIONAL_STATS: Stat[] = [
  { value: "20m", label: "Up" },
  { value: "6", label: "Levels" },
  { value: "100+", label: "Challenges" },
  { value: "2km+", label: "Of course" },
];

/**
 * Recurring brand motif: condensed uppercase stat callouts separated by
 * dots, e.g. "20M UP · 6 LEVELS · 100+ CHALLENGES".
 */
export function StatStrip({
  stats = NATIONAL_STATS,
  onDark = false,
}: {
  stats?: Stat[];
  onDark?: boolean;
}) {
  return (
    <ul
      className={`flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 font-display uppercase sm:gap-x-8 ${
        onDark ? "text-white" : "text-forest-700"
      }`}
    >
      {stats.map((stat, i) => (
        <li key={stat.label} className="flex items-baseline gap-x-4 sm:gap-x-8">
          {i > 0 && (
            <span aria-hidden="true" className="text-cta">
              ·
            </span>
          )}
          <span className="text-stat font-bold tracking-wide">
            {stat.value}{" "}
            <span className={onDark ? "text-canopy-200" : "text-ink-500"}>
              {stat.label}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

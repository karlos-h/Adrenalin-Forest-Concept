const LEVELS = [1, 2, 3, 4, 5, 6];

/**
 * Recurring brand motif: the 1→6 level-progress device. Levels step up in
 * size to signal "each one higher and harder".
 */
export function LevelProgress({
  activeLevel,
  onDark = false,
}: {
  /** Highlight one level (1–6); omit to show the full ladder neutrally */
  activeLevel?: number;
  onDark?: boolean;
}) {
  return (
    <ol
      aria-label="Course levels 1 to 6, each higher and harder"
      className="flex items-end gap-2"
    >
      {LEVELS.map((level) => {
        const isActive = activeLevel !== undefined && level <= activeLevel;
        const height = 20 + level * 9;
        return (
          <li key={level} className="flex flex-col items-center gap-1.5">
            <span
              aria-hidden="true"
              style={{ height }}
              className={`w-7 rounded-t-md sm:w-9 ${
                activeLevel === undefined || isActive
                  ? "bg-cta"
                  : onDark
                    ? "bg-white/25"
                    : "bg-canopy-200"
              }`}
            />
            <span
              className={`font-display text-caption font-bold ${
                onDark ? "text-canopy-200" : "text-ink-500"
              }`}
            >
              {level}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

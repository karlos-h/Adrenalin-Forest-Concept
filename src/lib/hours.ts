import type { SeasonalHours } from "@/lib/types";

/** Today's "MM-DD" in New Zealand time. */
export function nzMonthDay(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-NZ", {
    timeZone: "Pacific/Auckland",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const month = parts.find((p) => p.type === "month")?.value ?? "01";
  const day = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${month}-${day}`;
}

/**
 * Whether an "MM-DD" falls in a recurring annual range (inclusive).
 * Ranges may wrap the year end, e.g. Oct→Apr ("10-01" → "04-30").
 */
export function inDateRange(
  monthDay: string,
  range: { from: string; to: string }
): boolean {
  if (range.from <= range.to) {
    return monthDay >= range.from && monthDay <= range.to;
  }
  return monthDay >= range.from || monthDay <= range.to;
}

/** The season that applies today (NZ time), if any. */
export function currentSeason(
  seasons: SeasonalHours[],
  now: Date = new Date()
): SeasonalHours | undefined {
  const today = nzMonthDay(now);
  return seasons.find((s) => inDateRange(today, s.dateRange));
}

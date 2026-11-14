// All times are stored in UTC. A tutor's weekly time is a weekday plus a wall-clock time in the
// tutor's own zone (default Asia/Dubai). Every time shown to a person is converted to THEIR zone and
// the zone is always named (for example "Tue 17:00 GST").

export const DEFAULT_TUTOR_TZ = "Asia/Dubai";

const ZONE_NAMES: Record<string, string> = {
  "Asia/Dubai": "GST",
  "Asia/Riyadh": "AST",
  "Asia/Qatar": "AST",
};

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Zone name for an instant, e.g. GST, GMT, BST, or GMT+5:30 as a fallback. */
export function zoneLabel(tz: string, at: Date = new Date()): string {
  if (ZONE_NAMES[tz]) return ZONE_NAMES[tz];
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: tz, timeZoneName: "short" }).formatToParts(at);
  return parts.find((p) => p.type === "timeZoneName")?.value ?? tz;
}

/** "Tue 17:00 GST" */
export function formatLessonTime(at: Date | string, tz: string): string {
  const d = typeof at === "string" ? new Date(at) : at;
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("weekday")} ${get("hour")}:${get("minute")} ${zoneLabel(tz, d)}`;
}

/** "Tue 24 Nov 2026" in the viewer's zone */
export function formatLessonDate(at: Date | string, tz: string): string {
  const d = typeof at === "string" ? new Date(at) : at;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

function offsetMinutes(tz: string, at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(at);
  const n = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(n("year"), n("month") - 1, n("day"), n("hour"), n("minute"), n("second"));
  return Math.round((asUtc - Math.floor(at.getTime() / 1000) * 1000) / 60000);
}

/** The UTC instant at which the wall clock in `tz` reads y-m-d hh:mm. Month is 1-12. */
export function zonedTimeToUtc(y: number, m: number, d: number, hh: number, mm: number, tz: string): Date {
  const guess = new Date(Date.UTC(y, m - 1, d, hh, mm));
  const first = new Date(guess.getTime() - offsetMinutes(tz, guess) * 60000);
  // second pass fixes cases where the offset differs at the corrected instant (daylight saving)
  return new Date(guess.getTime() - offsetMinutes(tz, first) * 60000);
}

/**
 * The 52 weekly lesson instants for a programme. `weekday` is 0 (Sun) to 6 (Sat) in the tutor's zone,
 * `time` is "HH:MM" in the tutor's zone, and the first lesson is the first matching weekday on or
 * after `startDate` (a "YYYY-MM-DD" string in the tutor's zone).
 */
export function lessonInstants(
  startDate: string,
  weekday: number,
  time: string,
  tz: string = DEFAULT_TUTOR_TZ,
  count = 52,
): Date[] {
  const [y, m, d] = startDate.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const startUtc = new Date(Date.UTC(y, m - 1, d));
  const delta = (weekday - startUtc.getUTCDay() + 7) % 7;
  const out: Date[] = [];
  for (let i = 0; i < count; i++) {
    const day = new Date(startUtc.getTime() + (delta + i * 7) * 86_400_000);
    out.push(zonedTimeToUtc(day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate(), hh, mm, tz));
  }
  return out;
}

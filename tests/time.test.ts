import { describe, expect, it } from "vitest";
import { formatLessonTime, lessonInstants, zonedTimeToUtc } from "@/lib/time";

describe("time zones", () => {
  it("converts Dubai wall time to UTC (UTC+4)", () => {
    expect(zonedTimeToUtc(2026, 11, 24, 17, 0, "Asia/Dubai").toISOString()).toBe("2026-11-24T13:00:00.000Z");
  });
  it("shows a Tuesday 17:00 Dubai lesson as 17:00 GST in Dubai and 13:00 GMT in London", () => {
    const at = new Date("2026-11-24T13:00:00Z");
    expect(formatLessonTime(at, "Asia/Dubai")).toBe("Tue 17:00 GST");
    expect(formatLessonTime(at, "Europe/London")).toBe("Tue 13:00 GMT");
  });
  it("makes 52 weekly lessons starting on the first matching weekday", () => {
    const lessons = lessonInstants("2026-11-14", 2, "17:00"); // Sat 14 Nov 2026 -> first Tuesday is 17 Nov
    expect(lessons).toHaveLength(52);
    expect(lessons[0].toISOString()).toBe("2026-11-17T13:00:00.000Z");
    expect(lessons[51].toISOString()).toBe("2027-11-09T13:00:00.000Z");
  });
});

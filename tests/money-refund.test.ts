import { describe, expect, it } from "vitest";
import { formatAed, splitVat, PACKAGE_PRICE_FILS } from "@/lib/money";
import { quoteRefund } from "@/lib/refund";

describe("money", () => {
  it("formats the package price", () => {
    expect(formatAed(PACKAGE_PRICE_FILS)).toBe("AED 20,000");
    expect(formatAed(1_615_385)).toBe("AED 16,153.85");
  });
  it("splits 5% VAT out of the total", () => {
    expect(splitVat(PACKAGE_PRICE_FILS)).toEqual({ netFils: 1_904_762, vatFils: 95_238 });
  });
});

describe("refund rule", () => {
  it("refunds everything when no lesson was taken", () => {
    const q = quoteRefund(0);
    expect(q.isFull).toBe(true);
    expect(q.refundFils).toBe(2_000_000);
  });
  it("refunds the unused lessons after 10 taken: AED 16,153.85", () => {
    const q = quoteRefund(10);
    expect(q.lessonsUnused).toBe(42);
    expect(q.refundFils).toBe(1_615_385);
    expect(q.perLessonFils).toBe(38_462);
  });
  it("refunds AED 18,461.54 after 4 taken", () => {
    expect(quoteRefund(4).refundFils).toBe(1_846_154);
  });
  it("refunds nothing when all 52 are taken", () => {
    expect(quoteRefund(52).refundFils).toBe(0);
  });
});

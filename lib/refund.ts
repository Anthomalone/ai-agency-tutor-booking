import { LESSONS_PER_PROGRAMME, PACKAGE_PRICE_FILS } from "./money";

export type RefundQuote = {
  lessonsTaken: number;
  lessonsUnused: number;
  perLessonFils: number; // rounded, for display only
  refundFils: number;
  isFull: boolean;
};

/**
 * Refund rule (decided by the owner):
 * - no lesson taken: full refund of the price paid
 * - otherwise: the price divided by 52, times the unused lessons
 * Example: 10 taken -> 42 unused -> AED 16,153.85.
 */
export function quoteRefund(
  lessonsTaken: number,
  paidFils: number = PACKAGE_PRICE_FILS,
  totalLessons: number = LESSONS_PER_PROGRAMME,
): RefundQuote {
  const taken = Math.min(Math.max(Math.trunc(lessonsTaken), 0), totalLessons);
  const unused = totalLessons - taken;
  const isFull = taken === 0;
  const refundFils = isFull ? paidFils : Math.round((paidFils * unused) / totalLessons);
  return {
    lessonsTaken: taken,
    lessonsUnused: unused,
    perLessonFils: Math.round(paidFils / totalLessons),
    refundFils,
    isFull,
  };
}

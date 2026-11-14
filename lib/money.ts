// Money is always stored as whole fils (1 AED = 100 fils). Never use floats for money.

export const PACKAGE_PRICE_FILS = 2_000_000; // AED 20,000.00, 5% VAT included
export const LESSONS_PER_PROGRAMME = 52;
export const VAT_RATE = 0.05;

/** 1,615,385 -> "AED 16,153.85" */
export function formatAed(fils: number, opts: { decimals?: boolean } = {}): string {
  const decimals = opts.decimals ?? fils % 100 !== 0;
  const aed = fils / 100;
  return (
    "AED " +
    aed.toLocaleString("en-US", {
      minimumFractionDigits: decimals ? 2 : 0,
      maximumFractionDigits: decimals ? 2 : 0,
    })
  );
}

/** Splits a VAT-inclusive total into net and VAT. 2,000,000 -> 1,904,762 + 95,238 */
export function splitVat(totalFils: number): { netFils: number; vatFils: number } {
  const netFils = Math.round(totalFils / (1 + VAT_RATE));
  return { netFils, vatFils: totalFils - netFils };
}

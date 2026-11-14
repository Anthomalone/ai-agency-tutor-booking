import Link from "next/link";

/** The AI agency mark and name. `onDark` is for the dark stage. */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className={`logo ${onDark ? "on-dark" : ""}`} aria-label="AI agency home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-mark.svg" width={30} height={30} alt="" />
      <span className="wm">AI agency</span>
    </Link>
  );
}

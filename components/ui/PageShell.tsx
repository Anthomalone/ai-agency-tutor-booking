import { Suspense, type ReactNode } from "react";
import { SiteHeader } from "@/components/nav/SiteHeader";

/**
 * The page frame from the design: a dark stage with the header and a title, then a white card that
 * overlaps the stage. Every route uses it. Lanes fill `children`.
 */
export function PageShell({ kicker, title, intro, children }: { kicker?: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <>
      <div className="stage">
        <Suspense fallback={<div className="hdr" style={{ height: 76 }} />}>
          <SiteHeader />
        </Suspense>
        <div className="wrap" style={{ paddingTop: 48, paddingBottom: 144 }}>
          {kicker ? <span className="kicker">{kicker}</span> : null}
          <h1 style={{ marginTop: kicker ? 20 : 0, fontSize: "clamp(32px, 6vw, 48px)", lineHeight: 1.08 }}>{title}</h1>
          {intro ? (
            <p style={{ marginTop: 16, maxWidth: 560, fontSize: 18, lineHeight: "28px", color: "var(--on-ink-muted)" }}>{intro}</p>
          ) : null}
        </div>
      </div>
      <main className="wrap lift">
        <div style={{ background: "var(--surface)", borderRadius: 18, boxShadow: "var(--sh-2)", padding: "32px 24px", minHeight: 240 }}>
          {children}
        </div>
      </main>
    </>
  );
}

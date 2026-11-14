import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Checkout" };

// Placeholder from the Chief Architect. Owned by Lane A: replace the body, keep the route and title.
export default function Page() {
  return (
    <PageShell title="Checkout" intro="Review your year programme and pay once.">
      <EmptyState title="Coming soon">This screen is being built by Lane A.</EmptyState>
    </PageShell>
  );
}

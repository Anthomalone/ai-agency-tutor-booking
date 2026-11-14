import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Tutor" };

// Placeholder from the Chief Architect. Owned by Lane A: replace the body, keep the route and title.
export default function Page() {
  return (
    <PageShell title="Tutor" intro="Choose a weekly time with this tutor.">
      <EmptyState title="Coming soon">This screen is being built by Lane A.</EmptyState>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Find your tutor" };

// Placeholder from the Chief Architect. Owned by Lane A: replace the body, keep the route and title.
export default function Page() {
  return (
    <PageShell title="Find your tutor" intro="Pick a tutor and a weekly time, pay once, and be booked for the year.">
      <EmptyState title="Coming soon">This screen is being built by Lane A.</EmptyState>
    </PageShell>
  );
}

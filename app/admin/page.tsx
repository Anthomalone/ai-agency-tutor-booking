import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Admin" };

// Placeholder from the Chief Architect. Owned by Lane B: replace the body, keep the route and title.
export default function Page() {
  return (
    <PageShell title="Admin" intro="Run the business: programmes, payments, tutors and reviews.">
      <EmptyState title="Coming soon">This screen is being built by Lane B.</EmptyState>
    </PageShell>
  );
}

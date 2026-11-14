import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Create your account" };

// Placeholder from the Chief Architect. Owned by Lane A: replace the body, keep the route and title.
export default function Page() {
  return (
    <PageShell title="Create your account" intro="Start your year with a tutor.">
      <EmptyState title="Coming soon">This screen is being built by Lane A.</EmptyState>
    </PageShell>
  );
}

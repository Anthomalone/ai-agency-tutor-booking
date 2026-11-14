import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "My programme" };

// Placeholder from the Chief Architect. Owned by Lane A: replace the body, keep the route and title.
export default function Page() {
  return (
    <PageShell title="My programme" intro="Your lessons, your tutor and your programme.">
      <EmptyState title="Coming soon">This screen is being built by Lane A.</EmptyState>
    </PageShell>
  );
}

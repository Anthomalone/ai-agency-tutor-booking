import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "My week" };

// Placeholder from the Chief Architect. Owned by Lane B: replace the body, keep the route and title.
export default function Page() {
  return (
    <PageShell title="My week" intro="Set your weekly times and see your students.">
      <EmptyState title="Coming soon">This screen is being built by Lane B.</EmptyState>
    </PageShell>
  );
}

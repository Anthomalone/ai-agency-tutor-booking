import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Chat" };

// Placeholder from the Chief Architect. Owned by Lane B: replace the body, keep the route and title.
export default function Page() {
  return (
    <PageShell title="Chat" intro="Talk with your tutor or your student.">
      <EmptyState title="Coming soon">This screen is being built by Lane B.</EmptyState>
    </PageShell>
  );
}

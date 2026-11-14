import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

type Status = "paid" | "up" | "done" | "cx" | "ref";
const LABELS: Record<Status, string> = { paid: "Paid", up: "Upcoming", done: "Done", cx: "Cancelled", ref: "Refunded" };

/** Status pill: Paid (green), Upcoming (violet), Done (grey), Refunded (amber), Cancelled (red). */
export function StatusPill({ status, label }: { status: Status; label?: string }) {
  return <span className={`pill-s ${status}`}>{label ?? LABELS[status]}</span>;
}

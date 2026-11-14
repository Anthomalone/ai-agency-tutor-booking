import type { ReactNode } from "react";
import { AlertTriangle, Inbox } from "lucide-react";

/** Empty and error states: one icon tile, a title, one helpful sentence, at most one action. */
export function EmptyState({
  title,
  children,
  tone = "empty",
  action,
}: {
  title: string;
  children?: ReactNode;
  tone?: "empty" | "error";
  action?: ReactNode;
}) {
  const Icon = tone === "error" ? AlertTriangle : Inbox;
  return (
    <div className={`es ${tone === "error" ? "err" : ""}`}>
      <span className="art">
        <Icon size={30} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
      {action}
    </div>
  );
}

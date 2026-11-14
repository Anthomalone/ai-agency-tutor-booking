import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "sm" | "lg";

const V: Record<Variant, string> = {
  primary: "btn-pri",
  secondary: "btn-sec",
  ghost: "btn-ghost-d", // for use on the dark stage
  danger: "btn-danger",
};

function cls(variant: Variant, size: Size, block?: boolean) {
  return ["btn", V[variant], size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "", block ? "btn-block" : ""]
    .filter(Boolean)
    .join(" ");
}

// Rule from the design: exactly one primary button per screen.
export function Button({
  variant = "secondary",
  size = "md",
  block,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; block?: boolean }) {
  return <button {...rest} className={[cls(variant, size, block), className].filter(Boolean).join(" ")} />;
}

export function ButtonLink({
  href,
  variant = "secondary",
  size = "md",
  block,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cls(variant, size, block)}>
      {children}
    </Link>
  );
}

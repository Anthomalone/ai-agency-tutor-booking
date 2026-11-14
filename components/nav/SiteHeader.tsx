import Link from "next/link";
import { Globe } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { getProfile } from "@/lib/auth";
import { ButtonLink } from "@/components/ui/Button";

// Links by role. Add a link here only through the Chief Architect: this file is shared.
const LINKS: Record<string, { href: string; label: string }[]> = {
  guest: [{ href: "/", label: "Tutors" }],
  student: [
    { href: "/", label: "Tutors" },
    { href: "/programme", label: "My programme" },
  ],
  tutor: [{ href: "/tutor", label: "My week" }],
  owner: [
    { href: "/", label: "Tutors" },
    { href: "/admin", label: "Admin" },
    { href: "/tutor", label: "Tutor view" },
  ],
};

/** Header shown on the dark stage of every page. Server component: it reads the signed-in person. */
export async function SiteHeader() {
  let role: string = "guest";
  let name = "";
  try {
    const profile = await getProfile();
    if (profile) {
      role = profile.role;
      name = profile.full_name;
    }
  } catch {
    // not configured yet (for example in CI): show the signed-out header
  }
  return (
    <header className="hdr dark">
      <div className="wrap hdr-in">
        <Logo onDark />
        <nav className="hdr-r" aria-label="Main">
          {LINKS[role].map((l) => (
            <Link key={l.href + l.label} href={l.href} className="link" style={{ color: "#fff" }}>
              {l.label}
            </Link>
          ))}
          <span className="tz">
            <Globe size={16} strokeWidth={1.75} aria-hidden="true" />
            Your time zone
          </span>
          {role === "guest" ? (
            <ButtonLink href="/sign-in" variant="ghost" size="sm">
              Sign in
            </ButtonLink>
          ) : (
            <form action="/auth/sign-out" method="post" style={{ display: "contents" }}>
              <button className="btn btn-ghost-d btn-sm" type="submit" title={name || undefined}>
                Sign out
              </button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}

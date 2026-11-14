import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile, Role } from "@/lib/types";

/** The signed-in person's profile, or null when signed out. */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", auth.user.id).single();
  return (data as Profile | null) ?? null;
}

/**
 * Use at the top of a page that needs a signed-in person with one of the given roles.
 * Signed out: goes to /sign-in. Wrong role: goes to the home page.
 * The owner can open every page.
 */
export async function requireRole(roles: Role[], next?: string): Promise<Profile> {
  const profile = await getProfile();
  if (!profile) redirect(`/sign-in${next ? `?next=${encodeURIComponent(next)}` : ""}`);
  if (profile.role !== "owner" && !roles.includes(profile.role)) redirect("/");
  return profile;
}

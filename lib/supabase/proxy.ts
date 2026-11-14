import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Paths that need a signed-in person. Role checks (tutor, owner) happen in the page with requireRole().
const PROTECTED = ["/checkout", "/programme", "/chat", "/tutor", "/admin"];

/** Refreshes the Supabase session cookie and sends signed-out visitors from protected paths to /sign-in. */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return response; // not configured yet (for example in CI)

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims);
  const path = request.nextUrl.pathname;
  const needsLogin = PROTECTED.some((p) => path === p || path.startsWith(p + "/"));

  if (!signedIn && needsLogin) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = "/sign-in";
    redirect.search = `?next=${encodeURIComponent(path)}`;
    return NextResponse.redirect(redirect);
  }
  return response;
}

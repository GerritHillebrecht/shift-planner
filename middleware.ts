import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const locales = ["de-DE", "de", "en-US", "en"] as const;

export type Locales = (typeof locales)[number];

function getLocale(request: NextRequest) {
  const headers = { "accept-language": request.headers.get("accept-language") };
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = "en";

  return match(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes("/favicon") || pathname.includes("manifest")) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return updateSession(request);

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return await NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

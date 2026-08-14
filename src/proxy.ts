import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const PUBLIC_ROUTES = ["/login", "/register", "/verify"];
const PROTECTED_ROUTES = [
  "/dashboard",
  "/overview",
  "/kanban",
  "/tasks",
  "/schedule",
];

const intlProxy = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = detectLocale(pathname);
  const cleanPath = stripLocale(pathname);

  const localePath = (path: string) =>
    locale === routing.defaultLocale ? path : `/${locale}${path}`;

  const accessToken = request.cookies.get("ac")?.value;
  const isAuthenticated = !!accessToken;

  if (!isAuthenticated && isProtectedRoute(cleanPath)) {
    const loginUrl = new URL(localePath("/login"), request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isPublicRoute(cleanPath)) {
    return NextResponse.redirect(new URL(localePath("/overview"), request.url));
  }

  if (cleanPath === "/") {
    const destination = isAuthenticated
      ? localePath("/overview")
      : localePath("/login");
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return intlProxy(request);
}

function detectLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] as (typeof routing.locales)[number];
  return routing.locales.includes(first) ? first : routing.defaultLocale;
}

function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const hasLocalePrefix = routing.locales.includes(
    segments[0] as (typeof routing.locales)[number],
  );
  const rest = hasLocalePrefix ? segments.slice(1) : segments;
  return "/" + rest.join("/");
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

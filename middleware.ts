import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n/config"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname has a valid locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect to default locale if no locale in pathname
  // Skip for assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // files with extensions
  ) {
    return NextResponse.next()
  }

  // Get preferred locale from Accept-Language header or use default
  const acceptLanguage = request.headers.get("accept-language")
  let detectedLocale = defaultLocale

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().substring(0, 2))
      .find((lang) => isValidLocale(lang))

    if (preferredLocale && isValidLocale(preferredLocale)) {
      detectedLocale = preferredLocale
    }
  }

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone()
  url.pathname = `/${detectedLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
}

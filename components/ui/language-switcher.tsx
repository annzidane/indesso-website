"use client"

import { usePathname, useRouter } from "next/navigation"
import { locales, localeNames, type Locale } from "@/lib/i18n/config"
import type { HeaderLang } from "@/types/strapi"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  locale: Locale
  languages?: HeaderLang[]
  variant?: "transparent" | "solid"
}

export function LanguageSwitcher({ locale, languages, variant = "transparent" }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isTransparent = variant === "transparent"

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname and add new locale
    const segments = pathname.split("/")
    segments[1] = newLocale
    router.push(segments.join("/"))
  }

  // Use languages from API if provided, otherwise fallback to config
  const langList = languages && languages.length > 0 
    ? languages 
    : locales.map((loc, index) => ({ id: index + 1, title: localeNames[loc], value: loc }))

  return (
    <div className="flex items-center gap-1">
      {langList.map((lang, index) => (
        <span key={lang.id} className="flex items-center">
          <button
            onClick={() => switchLocale(lang.value)}
            className={cn(
              "text-sm font-medium transition-colors px-1",
              isTransparent
                ? locale === lang.value ? "text-white" : "text-white/60 hover:text-white/80"
                : locale === lang.value ? "text-indesso-blue" : "text-indesso-blue/60 hover:text-indesso-blue/80",
            )}
          >
            {lang.title}
          </button>
          {index < langList.length - 1 && (
            <span className={cn("mx-1", isTransparent ? "text-white/40" : "text-indesso-blue/40")}>|</span>
          )}
        </span>
      ))}
    </div>
  )
}

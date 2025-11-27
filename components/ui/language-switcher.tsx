"use client"

import { usePathname, useRouter } from "next/navigation"
import { locales, localeNames, type Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from pathname and add new locale
    const segments = pathname.split("/")
    segments[1] = newLocale
    router.push(segments.join("/"))
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => switchLocale(loc)}
            className={cn(
              "text-sm font-medium transition-colors px-1",
              locale === loc ? "text-white" : "text-white/60 hover:text-white/80",
            )}
          >
            {localeNames[loc]}
          </button>
          {index < locales.length - 1 && <span className="text-white/40 mx-1">|</span>}
        </span>
      ))}
    </div>
  )
}

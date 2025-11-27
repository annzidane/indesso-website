export const locales = ["en", "id", "cn"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "EN",
  id: "ID",
  cn: "CN",
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  cn: "中文",
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

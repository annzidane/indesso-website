import type React from "react"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, Manrope } from "next/font/google"
import "@/app/globals.css"
import { isValidLocale, defaultLocale } from "@/lib/i18n/config"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Indesso - Crafting Natures Essence for the World",
  description:
    "A global ingredient and innovation company specializing in natural taste and aroma ingredients for food, beverage, and aromatic industries.",
  keywords: ["natural ingredients", "aroma", "flavor", "food ingredients", "essential oils", "Indonesia"],
  openGraph: {
    title: "Indesso - Crafting Natures Essence for the World",
    description: "A global ingredient and innovation company specializing in natural taste and aroma ingredients.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0A1628",
  width: "device-width",
  initialScale: 1,
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale

  return (
    <html lang={locale} className={`${plusJakartaSans.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

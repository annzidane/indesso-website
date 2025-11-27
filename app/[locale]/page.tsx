import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { StatsSection } from "@/components/sections/stats-section"
import { BusinessSection } from "@/components/sections/business-section"
import { getLandingPageData } from "@/lib/strapi/api"
import { isValidLocale, type Locale } from "@/lib/i18n/config"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const data = await getLandingPageData(locale)

  return (
    <>
      <Header navigation={data.navigation} locale={locale} />
      <main>
        <HeroSection data={data.hero} locale={locale} />
        <AboutSection data={data.about} locale={locale} />
        <StatsSection data={data.stats} locale={locale} />
        <BusinessSection data={data.business} locale={locale} />
      </main>
      <Footer data={data.footer} locale={locale} />
    </>
  )
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "cn" }]
}

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { StatsSection } from "@/components/sections/stats-section"
import { BusinessSection } from "@/components/sections/business-section"
import { getHomepageData, getHeaderData, getFooterData, getBanners } from "@/lib/strapi/api"
import { isValidLocale, type Locale } from "@/lib/i18n/config"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) return {}

  const locale = localeParam as Locale
  const homepage = await getHomepageData(locale)

  return {
    title: homepage.seo?.metaTitle || "Indesso - Ingredients for Life",
    description: homepage.seo?.metaDescription || "Indesso offers a wide variety of natural ingredients, aroma chemicals, and essential oils.",
    keywords: homepage.seo?.keywords ? homepage.seo.keywords.join(", ") : "indesso, aroma, ingredients",
    openGraph: {
      title: homepage.seo?.metaTitle || "Indesso - Ingredients for Life",
      description: homepage.seo?.metaDescription || "Indesso offers a wide variety of natural ingredients, aroma chemicals, and essential oils.",
      type: "website",
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const [homepage, headerData, footerData, banners] = await Promise.all([
    getHomepageData(locale),
    getHeaderData(locale),
    getFooterData(locale),
    getBanners(),
  ])

  return (
    <>
      <Header data={headerData} locale={locale} />
      <main className="overflow-visible">
        <HeroSection data={homepage.hero} banners={banners} locale={locale} />
        <AboutSection data={homepage.about} locale={locale} />
        <StatsSection data={homepage.reason} locale={locale} />
        <BusinessSection data={homepage.business} locale={locale} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "cn" }]
}

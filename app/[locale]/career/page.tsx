import type { Locale } from "@/lib/i18n/config"
import { getCareerPageData } from "@/lib/strapi/career-api"
import { getFooterData, getHeaderData } from "@/lib/strapi/api"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { CareerTabs } from "@/components/ui/career/career-tabs"
import { LifeAtIndesso } from "@/components/sections/career/life-at-indesso"
import { JoinUs } from "@/components/sections/career/join-us"
import { TestimonialSection } from "@/components/sections/career/testimonial-section"
import { GrowingTogether } from "@/components/sections/career/growing-together"

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const careerData = await getCareerPageData(locale)
  
  return {
    title: careerData.seo?.metaTitle || (locale === "id" ? "Karir - Indesso" : "Career - Indesso"),
    description: careerData.seo?.metaDescription || "Join Indesso and be part of our journey to create sustainable natural ingredients.",
    keywords: careerData.seo?.keywords?.join(", "),
  }
}

export default async function CareerPage({ params }: PageProps) {
  const { locale } = await params

  const [careerData, headerData, footerData] = await Promise.all([
    getCareerPageData(locale),
    getHeaderData(locale),
    getFooterData(locale),
  ])

  return (
    <>
      <Header data={headerData} locale={locale} variant="transparent" />
      <main>
        <PageHero 
          title={careerData.hero.title || "Career"} 
          backgroundImage={careerData.hero.backgroundImage}
        />
        <CareerTabs items={careerData.navItems} defaultActiveId={careerData.navItems[0]?.id} />
        <LifeAtIndesso data={careerData.lifeAtIndesso} />
        <JoinUs data={careerData.joinUs} locale={locale} />
        <TestimonialSection data={careerData.testimonial} />
        <GrowingTogether data={careerData.growingTogether} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

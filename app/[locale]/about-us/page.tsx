import type { Locale } from "@/lib/i18n/config"
import { getAboutPageData } from "@/lib/strapi/about-api"
import { getFooterData, getNavigation } from "@/lib/strapi/api"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/sections/about/about-hero"
import { OurStorySection } from "@/components/sections/about/our-story-section"
import { BoardSection } from "@/components/sections/about/board-section"
import { ResearchSection } from "@/components/sections/about/research-section"
import { ScientificMasterySection } from "@/components/sections/about/scientific-mastery-section"
import { ResponsibleOperationSection } from "@/components/sections/about/responsible-operation-section"

interface AboutPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params
  return {
    title: locale === "id" ? "Tentang Kami - Indesso" : "About Us - Indesso",
    description: "Learn about Indesso's journey, leadership, and commitment to innovation in natural ingredients.",
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const [aboutData, footerData, navigation] = await Promise.all([
    getAboutPageData(locale),
    getFooterData(locale),
    getNavigation(locale),
  ])

  return (
    <>
      <Header navigation={navigation} locale={locale} />
      <main>
        <AboutHero title={aboutData.heroTitle} backgroundImage={aboutData.heroImage} />
        <OurStorySection data={aboutData.ourStory} />
        <BoardSection data={aboutData.boards} />
        <ResearchSection data={aboutData.research} />
        <ScientificMasterySection data={aboutData.scientificMastery} />
        <ResponsibleOperationSection data={aboutData.responsibleOperation} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

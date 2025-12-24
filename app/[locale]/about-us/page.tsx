import type { Locale } from "@/lib/i18n/config"
import { getAboutPageData } from "@/lib/strapi/about-api"
import { getFooterData, getHeaderData } from "@/lib/strapi/api"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
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
  const aboutData = await getAboutPageData(locale)

  return {
    title: aboutData.seo?.metaTitle || (locale === "id" ? "Tentang Kami - Indesso" : "About Us - Indesso"),
    description: aboutData.seo?.metaDescription || "Learn about Indesso's journey, leadership, and commitment to innovation in natural ingredients.",
    keywords: aboutData.seo?.keywords?.join(", "),
    openGraph: {
      title: aboutData.seo?.metaTitle || (locale === "id" ? "Tentang Kami - Indesso" : "About Us - Indesso"),
      description: aboutData.seo?.metaDescription || "Learn about Indesso's journey, leadership, and commitment to innovation in natural ingredients.",
      type: "website",
    },
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const [aboutData, footerData, headerData] = await Promise.all([
    getAboutPageData(locale),
    getFooterData(locale),
    getHeaderData(locale),
  ])

  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <PageHero
          title={aboutData.hero.title}
          backgroundImage={aboutData.hero.backgroundImage}
        />
        <OurStorySection data={aboutData.story} />
        <BoardSection data={aboutData.boards} />
        <ResearchSection data={aboutData.research} />
        <ScientificMasterySection data={aboutData.scientificMastery} />
        <ResponsibleOperationSection data={aboutData.responsibleOperations} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

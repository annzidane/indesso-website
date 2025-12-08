import type { Locale } from "@/lib/i18n/config"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { StickyNav } from "@/components/ui/sticky-nav"
import { StrategySection } from "@/components/sections/sustainability/strategy-section"
import { InitiativeSection } from "@/components/sections/sustainability/initiative-section"
import { ResponsibleOperationsSection } from "@/components/sections/sustainability/responsible-operation"
import { CommitmentSection } from "@/components/sections/sustainability/commitment-section"
import { ReportSection } from "@/components/sections/sustainability/report-section"
import { getSustainabilityPageData, getReportsData } from "@/lib/strapi/sustainability-api"
import { getHeaderData, getFooterData } from "@/lib/strapi/api"

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const pageData = await getSustainabilityPageData(locale)
  
  return {
    title: pageData.seo?.metaTitle || (locale === "id" ? "Keberlanjutan - Indesso" : "Sustainability - Indesso"),
    description: pageData.seo?.metaDescription || "Learn about Indesso's commitment to sustainability and responsible business practices.",
    keywords: pageData.seo?.keywords?.join(", "),
  }
}

export default async function SustainabilityPage({ params }: PageProps) {
  const { locale } = await params
  
  // Fetch data from API
  const [pageData, reports, headerData, footerData] = await Promise.all([
    getSustainabilityPageData(locale),
    getReportsData(),
    getHeaderData(locale),
    getFooterData(locale),
  ])

  return (
    <>
      <Header data={headerData} locale={locale} variant="transparent" />
      <main>
        <PageHero 
          title={pageData.hero.title}
          backgroundImage={pageData.hero.backgroundImage}
        />
        <StickyNav items={pageData.navItems} />
        <StrategySection data={pageData.strategy} />
        <InitiativeSection data={pageData.initiative} />
        <ResponsibleOperationsSection data={pageData.responsibleOperations} />
        <CommitmentSection data={pageData.commitment} />
        <ReportSection data={pageData.report} reports={reports} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

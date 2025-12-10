import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { StickyNavLink } from "@/components/ui/sticky-nav-link"
import { notFound } from "next/navigation"
import { getHeaderData, getFooterData } from "@/lib/strapi/api"
import {
  getOurBusinessPage,
  getProductSubCategoryBySlug,
  getAllProductSubCategorySlugs,
  transformOurBusinessData,
  getBotanicals,
} from "@/lib/strapi/our-business-api"
import { BusinessSummarySection } from "@/components/sections/our-business/business-summary-section"
import { BusinessApplianceSection } from "@/components/sections/our-business/business-appliance-section"
import { BotanicalSourceSection } from "@/components/sections/our-business/botanical-source-section"
import { OurCatalogSection } from "@/components/sections/our-business/our-catalog-section"
import type { Locale } from "@/lib/i18n/config"
import type {
  BusinessSummarySectionData,
  BusinessApplianceSectionData,
  BotanicalSourceSectionData,
  OurCatalogSectionData,
} from "@/types/strapi"

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export default async function OurBusinessPage({ params }: PageProps) {
  const { locale, slug } = await params

  // Fetch all data in parallel
  const [pageData, subCategoryData, headerData, footerData, botanicals] = await Promise.all([
    getOurBusinessPage(locale),
    getProductSubCategoryBySlug(slug, locale),
    getHeaderData(locale),
    getFooterData(locale),
    getBotanicals(locale),
  ])

  // If no page data, show 404
  if (!pageData) {
    notFound()
  }

  // Transform data to component props
  const { heroSection, navItems, activeSubCategory } = transformOurBusinessData(
    pageData,
    subCategoryData
  )

  // If slug doesn't match any sub-category, show 404
  if (!navItems.some((item) => item.slug === slug)) {
    notFound()
  }

  // Transform navItems to StickyNavLink format
  const stickyNavItems = navItems.map((item) => ({
    id: item.slug,
    label: item.title,
    href: `/${locale}/our-business/${item.slug}`,
  }))

  // Get page sections from active sub-category
  const pageSections = activeSubCategory?.page_sections || []

  return (
    <>
      <Header data={headerData} locale={locale} variant="transparent" />
      <main>
        <PageHero 
          title={heroSection.title} 
          backgroundUrl={heroSection.backgroundImage}
        />
        <StickyNavLink 
          items={stickyNavItems} 
          activeId={slug} 
        />
        
        {/* Render page sections dynamically */}
        {pageSections.map((section) => {
          // Use component type + id for unique key
          const uniqueKey = `${section.__component}-${section.id}`
          
          switch (section.__component) {
            case "our-business.business-summary-section":
              return (
                <BusinessSummarySection
                  key={uniqueKey}
                  data={section as BusinessSummarySectionData}
                />
              )
            case "our-business.business-appliance-section":
              return (
                <BusinessApplianceSection
                  key={uniqueKey}
                  data={section as BusinessApplianceSectionData}
                  productCategories={activeSubCategory?.product_categories}
                />
              )
            case "our-business.botanical-source-section":
              return (
                <BotanicalSourceSection
                  key={uniqueKey}
                  data={section as BotanicalSourceSectionData}
                  botanicals={botanicals}
                />
              )
            case "our-business.our-catalog-section":
              return (
                <OurCatalogSection
                  key={uniqueKey}
                  data={section as OurCatalogSectionData}
                />
              )
            default:
              return null
          }
        })}
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

export async function generateStaticParams() {
  // Get all available slugs from API for both locales
  const [enSlugs, idSlugs] = await Promise.all([
    getAllProductSubCategorySlugs("en"),
    getAllProductSubCategorySlugs("id"),
  ])

  // Combine unique slugs
  const allSlugs = [...new Set([...enSlugs, ...idSlugs])]

  // Generate params for each locale and slug combination
  const params: { locale: string; slug: string }[] = []
  
  for (const locale of ["en", "id"]) {
    for (const slug of allSlugs) {
      params.push({ locale, slug })
    }
  }

  return params
}

import { getHeaderData, getFooterData, getStrapiMedia } from "@/lib/strapi/api"
import { getAllBotanicalSlugs, getBotanicalPageData, getProductsByBotanicalSlug } from "@/lib/strapi/our-business-api"
import { notFound } from "next/navigation"
import type { Locale } from "@/lib/i18n/config"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { RelatedProductsSection } from "@/components/sections/catalog/related-products-section"
import { BotanicalIntro } from "@/components/sections/botanical/intro-section"
import { BotanicalDetails } from "@/components/sections/botanical/detail-section"
import { BotanicalFAQ } from "@/components/sections/botanical/faq-section"
import { RequestSampleSection } from "@/components/sections/catalog/request-sample-section"
import { getTopicsData } from "@/lib/strapi/contact-us-api"

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const botanical = await getBotanicalPageData(slug, locale)

  if (!botanical) return {}

  return {
    title: botanical?.botanical.seo?.meta_title || `${botanical.botanical.name} - Indesso`,
    description: botanical?.botanical.seo?.meta_description || botanical.botanical.name,
    keywords: botanical?.botanical.seo?.keywords ? botanical.botanical.seo.keywords.map((k: any) => k.keywords).join(", ") : undefined,
    openGraph: {
      title: botanical?.botanical.seo?.meta_title || `${botanical.botanical.name} - Indesso`,
      description: botanical?.botanical.seo?.meta_description || botanical.botanical.name,
      type: "website",
    },
  }
}

export default async function BotanicalDetailPage({ params }: PageProps) {
  const { slug, locale } = await params

  const [headerData, footerData, pageData, relatedProductsData, topicsData] = await Promise.all([
    getHeaderData(locale),
    getFooterData(locale),
    getBotanicalPageData(slug, locale),
    getProductsByBotanicalSlug(slug, locale),
    getTopicsData(locale),
  ])

  if (!pageData) {
    notFound()
  }

  const {
    heroSection,
    faqSection,
    botanical,
    intro,
    details,
    faqs,
    contactUsSection,
    listProductSection,
  } = pageData
  console.log("botanical", botanical)
  // Prefer the explicit relatedProductsData fetched above; fallback to pageData.products
  const relatedProducts = (relatedProductsData || pageData.products || []).filter(
    (p) => p.id !== botanical.id
  )
  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <PageHero
          title={heroSection?.title || ""}
          backgroundUrl={heroSection?.backgroundImage.url || undefined}
        />
        <BotanicalIntro
          category={"Botanical"}
          title={botanical.name}
          subtitle={botanical.scientific_name}
          mainImage={botanical.image_1?.url}
          description={""} // This seems to be unused in the new design
          keyPlayerTitle={intro.keyPlayerTitle}
          keyPlayerText={intro.keyPlayerText}
          keyPlayerRich={intro.keyPlayerRich}
        />
        <BotanicalDetails
          whatIsImage={botanical.image_2?.url}
          expandableSections={details.expandableSections}
        />
        <RelatedProductsSection
          title={listProductSection?.title || "Related Products"}
          products={relatedProducts}
          button={listProductSection?.button || { title: "View Catalog", path: "/our-business/catalog" }}
          locale={locale}
        />
        <BotanicalFAQ title={faqSection?.title} eyebrow={faqSection?.eyebrow} questions={faqs} />
        <RequestSampleSection productName={botanical.name} data={contactUsSection} topicsData={topicsData} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  const slugs = await getAllBotanicalSlugs(locale)
  return slugs.map((slug) => ({ slug }))
}
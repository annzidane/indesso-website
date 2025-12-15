import { getHeaderData, getFooterData, getStrapiMedia } from "@/lib/strapi/api"
import { getAllBotanicalSlugs, getBotanicalPageData } from "@/lib/strapi/our-business-api"
import { notFound } from "next/navigation"
import type { Locale } from "@/lib/i18n/config"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { BotanicalIntro } from "@/components/sections/botanical/intro-section"
import { BotanicalDetails } from "@/components/sections/botanical/detail-section"
import { ProductSection } from "@/components/sections/botanical/product-section"
import { BotanicalFAQ } from "@/components/sections/botanical/faq-section"
import { ContactUsSection } from "@/components/sections/botanical/contact-us-section"
import { OurBusinessHeroSection } from "@/types/strapi"

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export default async function BotanicalDetailPage({ params }: PageProps) {
  const { slug, locale } = await params

  const [headerData, footerData, pageData] = await Promise.all([
    getHeaderData(locale),
    getFooterData(locale),
    getBotanicalPageData(slug, locale),
  ])

  if (!pageData) {
    notFound()
  }

  const {
    heroSection,
    listProductSection,
    faqSection,
    contactUsSection,
    botanical,
    intro,
    details,
    products,
    faqs,
  } = pageData
  console.log("Botanical Detail Page Data:", pageData)
  console.log("Hero Section:", heroSection?.title)
  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <PageHero
          title={heroSection?.title || ""}
          backgroundUrl={heroSection?.backgroundImage || undefined}
        />
        <BotanicalIntro
          category={"Botanical"}
          title={botanical.name}
          subtitle={botanical.scientific_name}
          mainImage={botanical.image_1?.url}
          description={""} // This seems to be unused in the new design
          keyPlayerTitle={intro.keyPlayerTitle}
          keyPlayerText={intro.keyPlayerText}
        />
        <BotanicalDetails
          whatIsImage={botanical.image_2?.url}
          expandableSections={details.expandableSections}
        />
        <ProductSection
          title={listProductSection?.title || ""}
          products={products}
          button={listProductSection?.button ?? { title: "", path: "" }}
          locale={locale}
        />
        <BotanicalFAQ title={faqSection?.title} eyebrow={faqSection?.eyebrow} questions={faqs} />
        <ContactUsSection data={contactUsSection?.contact_us_section} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  const slugs = await getAllBotanicalSlugs(locale)
  return slugs.map((slug) => ({ slug }))
}
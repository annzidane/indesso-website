import type { Locale } from "@/lib/i18n/config"
import { getFooterData, getHeaderData } from "@/lib/strapi/api"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { ContactUsContent } from "@/components/sections/contact/contact-us-content"
import { getContactUsData, getTopicsData } from "@/lib/strapi/contact-us-api"

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const contactData = await getContactUsData(locale)

  return {
    title: contactData.seo?.metaTitle || (locale === "id" ? "Hubungi Kami - Indesso" : "Contact Us - Indesso"),
    description: contactData.seo?.metaDescription || "Get in touch with Indesso. Find our office locations and contact information.",
    keywords: contactData.seo?.keywords ? contactData.seo.keywords.join(", ") : undefined,
  }
}

export default async function ContactUsPage({ params }: PageProps) {
  const { locale } = await params

  const [headerData, footerData, topicsData] = await Promise.all([
    getHeaderData(locale),
    getFooterData(locale),
    getTopicsData(locale),
  ])

  // fetch contact-us page data
  const contactData = await getContactUsData(locale)

  return (
    <>
      <Header data={headerData} locale={locale} variant="transparent" />
      <main>
        <PageHero
          title={contactData?.hero?.title ?? "Contact Us"}
          backgroundUrl={
            contactData?.hero?.backgroundImage?.url
          }
          objectPosition="center top"
        />
        <ContactUsContent data={contactData} topicsData={topicsData} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

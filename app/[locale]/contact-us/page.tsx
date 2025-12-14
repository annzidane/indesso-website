import type { Locale } from "@/lib/i18n/config"
import { getFooterData, getHeaderData } from "@/lib/strapi/api"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { ContactUsContent } from "@/components/sections/contact/contact-us-content"

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params

  return {
    title: locale === "id" ? "Hubungi Kami - Indesso" : "Contact Us - Indesso",
    description: "Get in touch with Indesso. Find our office locations and contact information.",
  }
}

export default async function ContactUsPage({ params }: PageProps) {
  const { locale } = await params

  const [headerData, footerData] = await Promise.all([
    getHeaderData(locale),
    getFooterData(locale),
  ])

  return (
    <>
      <Header data={headerData} locale={locale} variant="transparent" />
      <main>
        <PageHero
          title="Contact Us"
          backgroundUrl="/contact-us/contact-us-featured.png"
          objectPosition="center top"
        />
        <ContactUsContent />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

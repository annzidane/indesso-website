import type { Locale } from "@/lib/i18n/config"
import { getFooterData, getHeaderData } from "@/lib/strapi/api"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { CatalogContent } from "@/components/sections/catalog/catalog-content"

interface CatalogPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: CatalogPageProps) {
  const { locale } = await params

  return {
    title: locale === "id" ? "Katalog Kami - Indesso" : "Our Catalog - Indesso",
    description: locale === "id"
      ? "Jelajahi katalog lengkap produk aroma kimia dan bahan alami dari Indesso"
      : "Explore our comprehensive catalog of aroma chemicals and natural ingredients",
    keywords: "aroma chemicals, natural ingredients, catalog, products, indesso",
  }
}

export default async function OurCatalogPage({ params }: CatalogPageProps) {
  const { locale } = await params

  const [footerData, headerData] = await Promise.all([
    getFooterData(locale),
    getHeaderData(locale),
  ])

  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <PageHero
          title="Our Catalog"
          backgroundUrl="/our-catalog/our-catalog-header.png"
        />
        <CatalogContent locale={locale} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "id" },
    { locale: "cn" },
  ]
}

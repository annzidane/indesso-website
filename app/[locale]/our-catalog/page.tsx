import type { Locale } from "@/lib/i18n/config"
import { getFooterData, getHeaderData } from "@/lib/strapi/api"
import { getCatalogPage, getProducts } from "@/lib/strapi/catalog-api"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { CatalogContent } from "@/components/sections/catalog/catalog-content"

interface CatalogPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: CatalogPageProps) {
  const { locale } = await params
  const catalogPage = await getCatalogPage(locale)

  return {
    title: catalogPage?.seo?.meta_title || (locale === "id" ? "Katalog Kami - Indesso" : "Our Catalog - Indesso"),
    description: catalogPage?.seo?.meta_description || (locale === "id"
      ? "Jelajahi katalog lengkap produk aroma kimia dan bahan alami dari Indesso"
      : "Explore our comprehensive catalog of aroma chemicals and natural ingredients"),
    keywords: catalogPage?.seo?.keywords
      ? catalogPage.seo.keywords.map((k) => k.keywords).join(", ")
      : "aroma chemicals, natural ingredients, catalog, products, indesso",
    openGraph: {
      title: catalogPage?.seo?.meta_title || (locale === "id" ? "Katalog Kami - Indesso" : "Our Catalog - Indesso"),
      description: catalogPage?.seo?.meta_description || (locale === "id"
        ? "Jelajahi katalog lengkap produk aroma kimia dan bahan alami dari Indesso"
        : "Explore our comprehensive catalog of aroma chemicals and natural ingredients"),
      type: "website",
    },
  }
}

export default async function OurCatalogPage({ params }: CatalogPageProps) {
  const { locale } = await params

  const [footerData, headerData] = await Promise.all([
    getFooterData(locale),
    getHeaderData(locale),
  ])

  const [catalogPageData, productsResponse] = await Promise.all([
    getCatalogPage(locale),
    getProducts({ locale, page: 1 }),
  ])

  const mapProduct = (p: any) => ({
    id: p.id ?? p.slug ?? String(p.id),
    slug: p.slug ?? p.id ?? String(p.id),
    category: p.product_category?.name ?? p.category ?? "",
    title: p.name ?? p.title ?? p.attributes?.name ?? "",
    description: p.organoleptics?.map((o: any) => o.name).join(", ") || "",
    image: p.image?.url ?? p.attributes?.image?.url ?? "/placeholder.png",
    badge: p.badge ?? undefined,
  })

  const initialProducts = (productsResponse?.data || []).map(mapProduct)

  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <PageHero
          title={catalogPageData?.hero_section?.title || "Our Catalog"}
          backgroundUrl={catalogPageData?.hero_section?.background_image?.url || undefined}
        />
        <CatalogContent
          locale={locale}
          initialProducts={initialProducts}
          initialMeta={{
            pagination: productsResponse?.meta?.pagination || { page: 1, pageSize: 12, pageCount: 1, total: 0 }
          }}
        />
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

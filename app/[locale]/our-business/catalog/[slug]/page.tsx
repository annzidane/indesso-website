import { getHeaderData, getFooterData } from "@/lib/strapi/api"
import {
  getProductBySlug,
  getAllProductSlugs,
  getProducts,
  getProductDetailPage,
} from "@/lib/strapi/catalog-api"
import { notFound } from "next/navigation"
import { Locale } from "@/lib/i18n/config"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductDetailHero } from "@/components/sections/catalog/product-detail-hero"
import { GeneralInformation } from "@/components/sections/catalog/general-information"
import { CompatibilitySection } from "@/components/sections/catalog/compatibility-section"
import { ContactUsSection } from "@/components/sections/botanical/contact-us-section"
import { ProductSection } from "@/components/sections/botanical/product-section"
import { ProductDetailPageSection, ProductDetailSectionData } from "@/types/strapi"

interface ProductDetailPageProps {
  params: Promise<{ slug: string; locale: Locale }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug, locale } = await params
console.log("Fetching product detail page for slug:", slug, "and locale:", locale)
  const [headerData, footerData, product, pageData] = await Promise.all([
    getHeaderData(locale),
    getFooterData(locale),
    getProductBySlug(slug, locale),
    getProductDetailPage(locale),
  ])

  if (!product || !pageData) {
    notFound()
  }

  const detailSectionLabels = pageData.page_sections.find(
    (s: ProductDetailPageSection) => s.__component === "our-business.product-detail-section"
  ) as ProductDetailSectionData

  const contactUsSection = pageData.page_sections.find(
    (s: ProductDetailPageSection) => s.__component === "our-business.contact-us-section"
  )

  const listProductSection = pageData.page_sections.find(
    (s: ProductDetailPageSection) => s.__component === "our-business.list-product-section"
  )

  // Get related products (same botanical origin, excluding current product)
  const relatedProductsResponse = await getProducts({
    locale,
    botanicalSlug: product.botanical?.slug,
  })
  const relatedProducts = relatedProductsResponse.data
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
console.log("Related products:", relatedProducts)
console.log("product:", product)
console.log("contact us", contactUsSection)
  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <ProductDetailHero product={product} labels={detailSectionLabels} />
        <GeneralInformation
          info={product.general_information}
          labels={detailSectionLabels?.general_information_label}
        />
        <CompatibilitySection
          applications={product.industry_categories}
          labels={detailSectionLabels}
        />
        <ContactUsSection data={contactUsSection?.contact_us_section} />
        <ProductSection
          title={listProductSection?.title}
          products={relatedProducts}
          button={listProductSection?.button}
          locale={locale}
        />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: Locale } }) {
  const slugs = await getAllProductSlugs(locale)
  return slugs.map((slug) => ({ slug }))
}

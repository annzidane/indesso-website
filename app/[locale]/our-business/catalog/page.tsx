import { getHeaderData, getFooterData } from "@/lib/strapi/api"
import {
  getCatalogPage,
  getProducts,
} from "@/lib/strapi/catalog-api"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { CatalogSearch } from "@/components/sections/catalog/catalog-search"
import { CatalogGrid } from "@/components/sections/catalog/catalog-grid"
import { ServerPagination } from "@/components/ui/server-pagination"
import { Locale } from "@/lib/i18n/config"

interface PageProps {
  params: {
    locale: Locale
  }
  searchParams: {
    page?: string
    search?: string
    sort?: string
  }
}

export default async function CatalogPage({ params, searchParams }: PageProps) {
  const { locale } = params
  const page = Number(searchParams?.page) || 1
  const search = searchParams?.search || ""
  const sort = searchParams?.sort || "name:asc"

  const [headerData, footerData, pageData, productResponse] = await Promise.all([
    getHeaderData(locale),
    getFooterData(locale),
    getCatalogPage(locale),
    getProducts({
      locale,
      page,
      search,
      sortBy: sort,
    }),
  ])

  const products = productResponse.data
  const pagination = productResponse.meta.pagination

  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <PageHero
          title={pageData?.hero_section.title || "Our Catalog"}
          backgroundImage={pageData?.hero_section.background_image}
        />
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <CatalogSearch />
            <CatalogGrid products={products} />
            <ServerPagination currentPage={page} totalPages={pagination.pageCount} />
          </div>
        </section>
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  )
}
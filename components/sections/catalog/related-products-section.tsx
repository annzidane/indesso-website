import Link from "next/link"
import { ContentLink } from "@/components/ui/content-link"
import { ProductCard } from "@/components/ui/product-card"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { Product } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"

interface RelatedProductsSectionProps {
  title?: string
  products?: Product[]
  button?: {
    title: string
    path: string
  }
  locale?: Locale
  currentProductId?: string
}

export function RelatedProductsSection({
  title,
  products,
  button,
  locale,
}: RelatedProductsSectionProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <h2
            className="font-plus-bold text-indesso-dark-blue text-2xl md:text-3xl lg:text-5xl text-center"
          >
            {title}
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {products.map((product) => (
            <Link key={product.id} href={`/${locale}/our-catalog/${product.slug ?? product.id}`}>
              <ProductCard
                category={product.product_category?.name || ""}
                title={product.name}
                description={product.organoleptics?.map((o) => o.name).join(", ") || ""}
                image={getStrapiMedia(product.image?.url) || ""}
                badge={product.botanical?.name}
              />
            </Link>
          ))}
        </div>

        {/* View Full Catalog Button */}
        <div className="text-center">
          <ContentLink
            path={button?.path ?? "/our-business/catalog"}
            locale={locale}
            className="inline-block w-full py-4 rounded font-plus-bold text-sm md:text-base transition-all hover:opacity-90"
            style={{ border: "1px solid #00548B", color: "#00548B", background: "transparent" }}
            title={button?.title ?? "View Catalog"}
          />
        </div>
      </div>
    </section>
  )
}

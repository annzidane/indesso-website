import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getStrapiMedia } from "@/lib/strapi/client"
import { Product } from "@/types/strapi"
import Link from "next/link"
import { Locale } from "@/lib/i18n/config"

interface ProductSectionProps {
  title?: string 
  products: Product[]
  button?: {
    title: string
    path: string
  }
  locale?: Locale
}

export function ProductSection({ title, products, button, locale = "en" }: ProductSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003366] mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/${locale}/our-business/catalog/${product.slug}`}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square">
                <Image
                  src={getStrapiMedia(product.image?.url || null) || "/placeholder.svg"}
                  alt={product.image?.alternativeText || product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.product_category?.name || ''}</p>
                <h3 className="text-sm font-bold text-[#003366] mb-2">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white bg-transparent"
          >
            {button?.title}
          </Button>
        </div>
      </div>
    </section>
  )
}

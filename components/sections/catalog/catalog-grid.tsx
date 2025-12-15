import Image from "next/image"
import Link from "next/link"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { Product } from "@/types/strapi"

interface CatalogGridProps {
  products: Product[]
}

export function CatalogGrid({ products }: CatalogGridProps) {
  console.log("CatalogGrid products:", products)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/our-business/catalog/${product.slug}`} // Assuming product detail page is at this path
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative h-48 bg-gray-100">
            <Image
              src={getStrapiMedia(product.image?.url) || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4">
            <p className="text-xs font-semibold text-[#004080] uppercase mb-1">
              {product.product_category?.name}
            </p>
            <h3 className="text-base font-bold text-[#004080] mb-2">{product.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

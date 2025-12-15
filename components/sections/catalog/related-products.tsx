import type { Product } from "@/types/strapi"
import { CatalogGrid } from "./catalog-grid"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1a3353] mb-12">Related Products</h2>
        <CatalogGrid products={products} />
      </div>
    </section>
  )
}

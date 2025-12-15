import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CatalogProduct } from "@/lib/data/catalog-data"

interface RelatedProductsProps {
  products: CatalogProduct[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a3353] mb-8">Related Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/catalog/${product.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <Badge className="absolute top-3 left-3 bg-[#004080] text-white hover:bg-[#003366]">
                    {product.badge}
                  </Badge>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold text-[#004080] uppercase mb-1">{product.category}</p>
                  <h3 className="text-sm font-bold text-[#004080] mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              variant="outline"
              className="border-[#004080] text-[#004080] hover:bg-[#004080] hover:text-white bg-transparent"
            >
              <Link href="/catalog">Visit Our Product Catalog for More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

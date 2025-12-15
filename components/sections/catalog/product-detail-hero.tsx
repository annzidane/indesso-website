import Image from "next/image"
// import { Badge } from "@/components/ui/badge"
import type { Product, ProductDetailSectionData } from "@/types/strapi"
import { getStrapiMedia } from "@/lib/strapi/api"
import { Badge } from "lucide-react"

interface ProductDetailHeroProps {
  product: Product
  labels: ProductDetailSectionData
}

export function ProductDetailHero({ product, labels }: ProductDetailHeroProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={getStrapiMedia(product.image?.url) || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-3 bg-[#E8F4F8] text-[#004080] hover:bg-[#D0E8F0] uppercase text-xs font-semibold">
                {product.product_category?.name}
              </Badge>
              <h1 className="text-4xl font-bold text-[#1a3353] mb-8">{product.name}</h1>
            </div>

            {/* Botanical Origin */}
            <div>
              <h3 className="text-sm font-bold text-[#1a3353] mb-2">
                {labels?.title_botanical}
              </h3>
              <p className="text-[#004080] font-semibold">{product.botanical?.name}</p>
            </div>

            {/* Organoleptic */}
            <div>
              <h3 className="text-sm font-bold text-[#1a3353] mb-2">
                {labels?.title_organoleptic}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.organoleptics?.map((o) => o.name).join(", ")}
              </p>
            </div>

            {/* Product Format */}
            <div>
              <h3 className="text-sm font-bold text-[#1a3353] mb-2">{labels?.title_format}</h3>
              <p className="text-gray-700">{product.product_format?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

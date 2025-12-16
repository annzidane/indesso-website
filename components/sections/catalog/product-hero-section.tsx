import { SectionLabel } from "@/components/ui/section-label"
import Image from "next/image"

interface ProductHeroSectionProps {
  product: {
    category: string
    title: string
    botanicalOrigin: string
    organoleptic: string
    productFormat: string
    image: string
  }
  page: any
}

export function ProductHeroSection({ product, page }: ProductHeroSectionProps) {

  return (
    <section className="pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-[120px]">
          {/* Left: Product Image */}
          <div className="w-full flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[560px] aspect-square rounded-lg overflow-hidden bg-gray-50 mx-auto">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </div>

          {/* Right: Product Information */}
          <div className="flex flex-col justify-center">
            {/* Category Badge */}
            <div
              className="inline-flex items-center justify-center w-fit mb-2 md:mb-2 py-0 h-8"
            >
              <SectionLabel variant="bubble" className="mb-4">{product.category}</SectionLabel>
            </div>

            {/* Product Title */}
            <h1 className="font-plus-bold text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8">
              {product.title}
            </h1>

            {/* Product Details */}
            <div className="space-y-4 md:space-y-6">
              {/* Botanical Origin */}
              <div>
                <h3
                  className="font-plus-bold text-lg md:text-xl mb-2"
                  style={{ color: "#003557", lineHeight: "40px" }}
                >
                  {page.title_botanical}
                </h3>
                <p
                  className="font-manrope-regular text-sm md:text-base"
                  style={{ color: "#333333", lineHeight: "24px" }}
                >
                  {product.botanicalOrigin}
                </p>
              </div>

              {/* Organoleptic */}
              <div>
                <h3
                  className="font-plus-bold text-lg md:text-xl mb-2"
                  style={{ color: "#003557", lineHeight: "40px" }}
                >
                  {page.title_organoleptic}
                </h3>
                <p
                  className="font-manrope-regular text-sm md:text-base"
                  style={{ color: "#333333", lineHeight: "24px" }}
                >
                  {product.organoleptic}
                </p>
              </div>

              {/* Product Format */}
              <div>
                <h3
                  className="font-plus-bold text-lg md:text-xl mb-2"
                  style={{ color: "#003557", lineHeight: "40px" }}
                >
                  {page.title_format}
                </h3>
                <p
                  className="font-manrope-regular text-sm md:text-base"
                  style={{ color: "#333333", lineHeight: "24px" }}
                >
                  {product.productFormat}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

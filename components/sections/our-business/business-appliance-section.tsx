import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/client"
import type { BusinessApplianceSectionData, ProductCategory } from "@/types/strapi"
import { Check } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"

interface BusinessApplianceSectionProps {
  data: BusinessApplianceSectionData
  productCategories?: ProductCategory[]
}

export function BusinessApplianceSection({ data, productCategories = [] }: BusinessApplianceSectionProps) {
  const hasMoreThanFive = productCategories.length > 5

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        {hasMoreThanFive ? (
          // Layout for more than 5 categories - Image top right, 2-column list below
          <div className="space-y-12">
            {/* Top Section - Header Left, Image Right */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              {/* Left Content */}
              <div>
                <SectionLabel variant="bubble" className="mb-4">{data.eyebrow}</SectionLabel>
                <h2 className="text-3xl md:text-5xl font-plus-bold text-indesso-dark-blue mt-4 mb-6 leading-tight">
                  {data.title}
                </h2>
                <p className="text-dark-grey font-manrope-regular text-base md:text-[16px] leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Right Image - Smaller for this layout */}
              <div className="relative flex justify-end">
                <div className="relative w-[600px] h-[260px] rounded-lg overflow-hidden">
                  <Image
                    src={getStrapiMedia(data.image?.url || null)}
                    alt={data.image?.alternativeText || data.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section - 2-column categories list */}
            {productCategories.length > 0 && (
              <div className="grid md:grid-cols-2 gap-x-16">
                {/* Left Column */}
                <ul className="space-y-0">
                  {productCategories.slice(0, Math.ceil(productCategories.length / 2)).map((category, index, arr) => (
                    <li key={category.id}>
                      <div className="flex items-center gap-3 py-5">
                        <div className="w-6 h-6 rounded-full bg-indesso-blue flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-indesso-dark-blue font-plus-bold text-lg">{category.name}</span>
                      </div>
                      {index < arr.length - 1 && (
                        <div className="border-b border-gray-200" />
                      )}
                    </li>
                  ))}
                </ul>

                {/* Right Column */}
                <ul className="space-y-0">
                  {productCategories.slice(Math.ceil(productCategories.length / 2)).map((category, index, arr) => (
                    <li key={category.id}>
                      <div className="flex items-center gap-3 py-5">
                        <div className="w-6 h-6 rounded-full bg-indesso-blue flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-indesso-dark-blue font-plus-bold text-lg">{category.name}</span>
                      </div>
                      {index < arr.length - 1 && (
                        <div className="border-b border-gray-200" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          // Original layout for 5 or fewer categories
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content */}
            <div>
              <SectionLabel variant="bubble" className="mb-4">{data.eyebrow}</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-plus-bold text-indesso-dark-blue mt-4 mb-6 leading-tight">
                {data.title}
              </h2>
              <p className="text-dark-grey font-manrope-regular text-base md:text-[16px] leading-relaxed mb-8">
                {data.description}
              </p>

              {/* Product Categories List with separator lines */}
              {productCategories.length > 0 && (
                <ul className="space-y-0">
                  {productCategories.map((category, index) => (
                    <li key={category.id}>
                      <div className="flex items-center gap-3 py-5">
                        <div className="w-6 h-6 rounded-full bg-indesso-blue flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-indesso-dark-blue font-plus-bold text-lg">{category.name}</span>
                      </div>
                      {/* Separator line - not on last item */}
                      {index < productCategories.length - 1 && (
                        <div className="border-b border-gray-200" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right Image */}
            <div className="relative flex justify-end">
              <div className="relative w-[700px] h-[640px] rounded-lg overflow-hidden">
                <Image
                  src={getStrapiMedia(data.image?.url || null)}
                  alt={data.image?.alternativeText || data.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

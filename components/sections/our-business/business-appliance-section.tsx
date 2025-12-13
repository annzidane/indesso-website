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
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {hasMoreThanFive ? (
          // Layout for more than 5 categories - Image top right, 2-column list below
          <div className="space-y-8 md:space-y-12">
            {/* Top Section - Header Left, Image Right */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-start">
              {/* Left Content */}
              <div>
                <SectionLabel variant="bubble" className="mb-3 md:mb-4">{data.eyebrow}</SectionLabel>
                <h2 className="font-plus-bold text-[28px] md:text-4xl lg:text-5xl text-indesso-dark-blue leading-[36px] md:leading-tight tracking-[-1px] mb-4 md:mb-6">
                  {data.title}
                </h2>
                <p className="font-manrope-regular text-[14px] md:text-[16px] text-dark-grey leading-[24px] md:leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Right Image - Hidden on mobile, responsive on tablet+ */}
              <div className="relative hidden md:flex justify-end">
                <div className="relative w-full max-w-[600px] aspect-[600/260] rounded-[10px] overflow-hidden">
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
                      <div className="flex items-center gap-3 py-4 md:py-5">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-indesso-blue flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </div>
                        <span className="text-indesso-dark-blue font-plus-bold text-[16px] md:text-lg">{category.name}</span>
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
                      <div className="flex items-center gap-3 py-4 md:py-5">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-indesso-blue flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </div>
                        <span className="text-indesso-dark-blue font-plus-bold text-[16px] md:text-lg">{category.name}</span>
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
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <SectionLabel variant="bubble" className="mb-3 md:mb-4">{data.eyebrow}</SectionLabel>
              <h2 className="font-plus-bold text-[28px] md:text-4xl lg:text-5xl text-indesso-dark-blue leading-[36px] md:leading-tight tracking-[-1px] mb-4 md:mb-6">
                {data.title}
              </h2>
              <p className="font-manrope-regular text-[14px] md:text-[16px] text-dark-grey leading-[24px] md:leading-relaxed mb-6 md:mb-8">
                {data.description}
              </p>

              {/* Product Categories List with separator lines */}
              {productCategories.length > 0 && (
                <ul className="space-y-0">
                  {productCategories.map((category, index) => (
                    <li key={category.id}>
                      <div className="flex items-center gap-3 py-4 md:py-5">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-indesso-blue flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </div>
                        <span className="text-indesso-dark-blue font-plus-bold text-[16px] md:text-lg">{category.name}</span>
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

            {/* Right Image - Hidden on mobile */}
            <div className="relative hidden md:flex justify-end">
              <div className="relative w-full max-w-[700px] aspect-[700/640] rounded-[10px] overflow-hidden">
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

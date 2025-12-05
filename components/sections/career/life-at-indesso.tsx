import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"
import { FeatureSection } from "@/components/ui/feature-section"
import type { CareerPageProps } from "@/types/strapi"

interface LifeAtIndessoProps {
  data: CareerPageProps["lifeAtIndesso"]
}

export function LifeAtIndesso({ data }: LifeAtIndessoProps) {
  return (
    <section id="life-at-indesso" className="bg-white">
      {/* Main Content Grid - dengan background, padding sudah include di dalam */}
      <FeatureSection
        eyebrow={data.eyebrow}
        title={data.title}
        description={data.description}
        image={data.image}
        imagePosition="right"
        showBg={true}
      />

      {/* Values Grid */}
      <div className="container mx-auto px-4 pb-12 md:pb-16 lg:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {data.showcaseItems.map((item) => (
            <div 
              key={item.id} 
              className="w-full border border-[#F5F5F5] rounded-lg p-4 md:p-6 text-left"
            >
              <div className="flex justify-start mb-3 md:mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                  {item.image ? (
                    <Image
                      src={getStrapiMedia(item.image.url) || "/placeholder.png"}
                      alt={item.image.alternativeText || item.title}
                      width={72}
                      height={72}
                      className="object-contain w-10 h-10 md:w-[72px] md:h-[72px]"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-indesso-blue/10 rounded-full" />
                  )}
                </div>
              </div>
              <h3 className="font-plus-semibold text-sm md:text-base text-indesso-dark-blue mb-2">
                {item.title}
              </h3>
              <p className="font-manrope-regular text-xs md:text-sm text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
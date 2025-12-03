import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"
import { SectionLabel } from "@/components/ui/section-label"
import type { CareerPageProps } from "@/types/strapi"

interface LifeAtIndessoProps {
  data: CareerPageProps["lifeAtIndesso"]
}

export function LifeAtIndesso({ data }: LifeAtIndessoProps) {
  return (
    <section id="life-at-indesso" className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
          {/* Text Content */}
          <div>
            <SectionLabel variant="bubble" className="mb-4 md:mb-6">
              {data.eyebrow}
            </SectionLabel>
            <h2 className="font-plus-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-indesso-dark-blue mb-4 md:mb-6 leading-tight">
              {data.title}
            </h2>
            <div className="space-y-4 font-manrope-regular text-grey text-sm md:text-base leading-relaxed whitespace-pre-line">
              {data.description}
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] w-full rounded-lg overflow-hidden">
            <Image
              src={data.image ? data.image.url : ""}
              alt="Scientist at work"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Grid */}
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
import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"
import { SectionLabel } from "@/components/ui/section-label"
import type { CareerPageProps } from "@/types/strapi"

interface LifeAtIndessoProps {
  data: CareerPageProps["lifeAtIndesso"]
}

export function LifeAtIndesso({ data }: LifeAtIndessoProps) {
  return (
    <section id="life-at-indesso" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Text Content */}
          <div>
            <SectionLabel variant="bubble" className="mb-6">
              {data.eyebrow}
            </SectionLabel>
            <h2 className="font-plus-bold text-3xl md:text-4xl lg:text-5xl text-indesso-dark-blue mb-6 leading-tight">
              {data.title}
            </h2>
            <div className="space-y-4 font-manrope-regular text-grey text-sm md:text-base leading-relaxed whitespace-pre-line">
              {data.description}
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[560px] w-[600px] rounded-lg overflow-hidden">
            <Image
              src={data.image ? data.image.url : ""}
              alt="Scientist at work"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {data.showcaseItems.map((item) => (
            <div 
              key={item.id} 
              className="w-[286px] h-60 border border-[#F5F5F5] rounded-lg p-6 text-left"
            >
              <div className="flex justify-start mb-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  {item.image ? (
                    <Image
                      src={getStrapiMedia(item.image.url) || "/placeholder.png"}
                      alt={item.image.alternativeText || item.title}
                      width={72}
                      height={72}
                      className="object-contain"
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
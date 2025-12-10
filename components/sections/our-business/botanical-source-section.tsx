import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/client"
import type { BotanicalSourceSectionData, Botanical } from "@/types/strapi"
import { SectionLabel } from "@/components/ui/section-label"

interface BotanicalSourceSectionProps {
  data: BotanicalSourceSectionData
  botanicals: Botanical[]
}

export function BotanicalSourceSection({ data, botanicals }: BotanicalSourceSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-3">
        {/* Section Header */}
        <div className="text-center mb-12">
          <SectionLabel variant="bubble" className="mb-4">{data.eyebrow}</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-plus-bold text-indesso-dark-blue mt-4 max-w-3xl mx-auto">
            {data.title}
          </h2>
        </div>

        {/* Botanical Grid - gap-8 = 32px */}
        <div className="flex flex-wrap justify-start gap-8">
          {botanicals.map((botanical) => (
            <div
              key={botanical.id}
              className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow shrink-0"
              style={{
                width: '286px',
                height: '328px',
                border: '1.5px solid #EAEAEA',
              }}
            >
              {/* Botanical Image with gradient bottom border */}
              <div className="relative">
                {/* Image container */}
                <div 
                  className="relative bg-white"
                  style={{
                    width: '286px',
                    height: '196px',
                  }}
                >
                  {botanical.image_1 ? (
                    <Image
                      src={getStrapiMedia(botanical.image_1.url)}
                      alt={botanical.image_1.alternativeText || botanical.name}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                {/* Gradient bottom border - 4px height with curved left */}
                <svg
                width="286"
                height="20"
                viewBox="0 0 286 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <defs>
                    <linearGradient id="grad-border" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="29.8%" stopColor="#6EBE4A" />
                    <stop offset="38.73%" stopColor="#7CC24F" />
                    <stop offset="65.55%" stopColor="#A3D060" />
                    <stop offset="86.41%" stopColor="#BCD86A" />
                    <stop offset="99.32%" stopColor="#C5DC6E" />
                    </linearGradient>
                </defs>

                <path
                    d="
                    M 0 0
                    Q 0 20 20 20
                    H 286
                    V 16
                    H 20
                    Q 0 16 0 0
                    Z
                    "
                    fill="url(#grad-border)"
                />
                </svg>
              </div>
              
              {/* Botanical Info */}
              <div className="p-4">
                <h3 className="text-indesso-blue font-plus-bold text-[24px] mb-2 mt-2">
                  {botanical.name}
                </h3>
                <p className="text-indesso-grey text-sm font-manrope-regular">
                  {botanical.scientific_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

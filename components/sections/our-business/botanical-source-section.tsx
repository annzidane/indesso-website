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
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <SectionLabel variant="bubble" className="mb-3 md:mb-4">{data.eyebrow}</SectionLabel>
          <h2 className="font-plus-bold text-[28px] md:text-4xl lg:text-5xl text-indesso-dark-blue leading-[36px] md:leading-tight tracking-[-1px] max-w-3xl mx-auto">
            {data.title}
          </h2>
        </div>

        {/* Botanical Grid - 2 columns on mobile, flexible on desktop */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-start gap-4 md:gap-8">
          {botanicals.map((botanical) => (
            <div
              key={botanical.id}
              className="bg-white rounded-[10px] overflow-hidden hover:shadow-md transition-shadow"
              style={{
                border: '1.5px solid #EAEAEA',
              }}
            >
              {/* Botanical Image with gradient bottom border */}
              <div className="relative">
                {/* Image container - Responsive aspect ratio */}
                <div className="relative bg-white w-full aspect-[286/196]">
                  {botanical.image_1 ? (
                    <Image
                      src={getStrapiMedia(botanical.image_1.url)}
                      alt={botanical.image_1.alternativeText || botanical.name}
                      fill
                      className="object-contain p-3 md:p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                {/* Gradient bottom border - Responsive SVG */}
                <svg
                  className="w-full"
                  height="20"
                  viewBox="0 0 286 20"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={`grad-border-${botanical.id}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="29.8%" stopColor="#6EBE4A" />
                      <stop offset="38.73%" stopColor="#7CC24F" />
                      <stop offset="65.55%" stopColor="#A3D060" />
                      <stop offset="86.41%" stopColor="#BCD86A" />
                      <stop offset="99.32%" stopColor="#C5DC6E" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 0 0 Q 0 20 20 20 H 286 V 16 H 20 Q 0 16 0 0 Z"
                    fill={`url(#grad-border-${botanical.id})`}
                  />
                </svg>
              </div>

              {/* Botanical Info */}
              <div className="p-3 md:p-4">
                <h3 className="text-indesso-blue font-plus-bold text-[18px] md:text-[24px] mb-1 md:mb-2 mt-1 md:mt-2 leading-tight">
                  {botanical.name}
                </h3>
                <p className="text-indesso-grey font-manrope-regular text-[12px] md:text-sm">
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

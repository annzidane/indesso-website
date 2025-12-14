import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"
import { toSlug } from "@/lib/strapi/utils"
import type { CareerPageProps } from "@/types/strapi"

interface LifeAtIndessoProps {
  data: CareerPageProps["lifeAtIndesso"]
}

export function LifeAtIndesso({ data }: LifeAtIndessoProps) {
  const imgSrc = data.image ? getStrapiMedia(data.image.url) : "/placeholder.svg"

  return (
    <section id={toSlug(data.eyebrow)} className="bg-white">
      {/* Featured Section with Background */}
      <div className="relative">
        {/* Full-width Background Blur Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/media-bg-blur.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div>
              {/* Eyebrow - Figma: Manrope ExtraBold 14px, line-height 32px, letter-spacing 4px */}
              <p
                className="font-manrope-extrabold uppercase text-[#00548B] mb-3 md:mb-4"
                style={{
                  fontSize: "14px",
                  lineHeight: "32px",
                  letterSpacing: "4px",
                }}
              >
                {data.eyebrow}
              </p>

              {/* Title - Figma: Plus Jakarta Sans Bold 48px, line-height 56px, letter-spacing -2px */}
              <h2
                className="font-plus-bold text-[#003557] mb-4 md:mb-6"
                style={{
                  fontSize: "clamp(28px, 5vw, 48px)",
                  lineHeight: "1.17",
                  letterSpacing: "-2px",
                }}
              >
                {data.title}
              </h2>

              {/* Description */}
              <div className="space-y-4 font-manrope-regular text-[#555555] text-sm md:text-base leading-relaxed whitespace-pre-line">
                {data.description}
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] rounded-lg md:rounded-2xl overflow-hidden">
              <Image
                src={imgSrc || "/placeholder.svg"}
                alt={data.image?.alternativeText || data.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="container mx-auto px-4 pb-12 md:pb-16 lg:pb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
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
              <h3 className="font-plus-bold text-sm md:text-base text-[#003557] mb-2">
                {item.title}
              </h3>
              <p className="font-manrope-regular text-xs md:text-sm text-[#555555]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
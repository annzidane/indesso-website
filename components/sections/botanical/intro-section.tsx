import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"
import { renderRichTextToReact } from "@/lib/strapi/utils"
import type { StrapiRichText } from "@/types/strapi"

interface BotanicalIntroProps {
  category: string
  title: string
  subtitle: string
  mainImage?: string
  description: string
  keyPlayerTitle: string
  keyPlayerText: string
  keyPlayerRich?: StrapiRichText[]
}

export function BotanicalIntro({
  category,
  title,
  subtitle,
  mainImage,
  description,
  keyPlayerTitle,
  keyPlayerText,
  keyPlayerRich,
}: BotanicalIntroProps) {
  const imageOne = mainImage ? getStrapiMedia(mainImage) : "/placeholder-image.png"
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Image */}
          <div className="relative aspect-square w-[600px] h-[560px]">
            <Image
              src={imageOne}
              alt={title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Right: Content */}
          <div>
            <div className="mb-4">
              <h2 className="text-4xl md:text-5xl font-plus-bold text-indesso-dark-blue mt-6 mb-4">{title}</h2>
              <h3 className="text-[16px] font-manrope-semibold text-indesso-blue mb-4">{subtitle}</h3>
            </div>
            <div className="flex-1 h-px bg-indesso-blue/10" />
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              <div>
                <h4 className="text-3xl font-plus-bold italic text-indesso-blue mb-6">{keyPlayerTitle}</h4>
                {keyPlayerRich && keyPlayerRich.length > 0 ? (
                  <div className="text-indesso-dark-grey font-manrope-regular leading-relaxed pb-5">
                    {renderRichTextToReact(keyPlayerRich)}
                  </div>
                ) : (
                  (keyPlayerText || "").split(/\n+/).filter(Boolean).map((para, i) => (
                    <p key={i} className="text-indesso-dark-grey font-manrope-regular leading-relaxed pb-5">
                      {para}
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

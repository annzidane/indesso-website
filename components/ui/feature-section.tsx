import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"
import { SectionLabel } from "@/components/ui/section-label"
import { cn } from "@/lib/utils"
import type { StrapiImage } from "@/types/strapi"

interface FeatureSectionProps {
  /** Eyebrow text (small label above title) */
  eyebrow: string
  /** Main title */
  title: string
  /** Description text */
  description: string
  /** Image data from Strapi */
  image?: StrapiImage
  /** Position of the image */
  imagePosition?: "left" | "right"
  /** Alt text for the image */
  imageAlt?: string
  /** Custom height classes for the image container */
  imageHeight?: string
  /** Additional className for the container */
  className?: string
  /** Variant for the section label */
  labelVariant?: "bubble" | "default"
  /** Background image URL */
  bg?: string
  /** Show background image */
  showBg?: boolean
}

export function FeatureSection({
  eyebrow,
  title,
  description,
  image,
  imagePosition = "right",
  imageAlt,
  imageHeight = "h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px]",
  className,
  labelVariant = "bubble",
  bg = "/feature-bg.png",
  showBg = true,
}: FeatureSectionProps) {
  const imgSrc = image ? getStrapiMedia(image.url) : "/placeholder.svg"
  const altText = image?.alternativeText || imageAlt || title

  return (
    <div className={cn("relative", className)}>
      {/* Background Image - Full width, padding sudah include di dalam */}
      {showBg && bg && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src={bg}
            alt=""
            fill
            className="object-cover object-top"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Content Container dengan padding X dan Y */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Text Content */}
          <div className={cn(
            imagePosition === "left" ? "order-2 md:order-2" : "order-1"
          )}>
            <SectionLabel variant={labelVariant} className="mb-4 md:mb-6">
              {eyebrow}
            </SectionLabel>
            <h2 className="font-plus-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-indesso-dark-blue mb-4 md:mb-6 leading-tight">
              {title}
            </h2>
            <div className="space-y-4 font-manrope-regular text-grey text-sm md:text-base leading-relaxed whitespace-pre-line">
              {description}
            </div>
          </div>

          {/* Image */}
          <div className={cn(
            "relative w-full rounded-lg md:rounded-2xl overflow-hidden",
            imageHeight,
            imagePosition === "left" ? "order-1 md:order-1" : "order-2"
          )}>
            <Image
              src={imgSrc || "/placeholder.svg"}
              alt={altText}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

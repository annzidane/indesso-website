import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { BusinessSectionProps as BusinessSectionDataProps, StrapiImage } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface BusinessSectionProps {
  data: BusinessSectionDataProps
  locale: Locale
}

export function BusinessSection({ data, locale }: BusinessSectionProps) {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <SectionLabel variant="bubble" className="mb-4">{data.label}</SectionLabel>
          <h2 className="font-plus-extrabold text-3xl md:text-4xl lg:text-5xl text-center text-primary leading-tight tracking-tight text-balance">
            {data.title}
          </h2>
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {data.cards.map((card) => (
            <BusinessCard key={card.id} card={card} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface BusinessCardData {
  id: number
  title: string
  description: string
  ctaText: string
  ctaLink: string
  cardImage?: StrapiImage
  ingredientImage?: StrapiImage
}

interface BusinessCardProps {
  card: BusinessCardData
  locale: Locale
}

function BusinessCard({ card, locale }: BusinessCardProps) {
  const cardImageUrl = card.cardImage 
    ? getStrapiMedia(card.cardImage.url) 
    : "/placeholder.svg"
  const ingredientImageUrl = card.ingredientImage 
    ? getStrapiMedia(card.ingredientImage.url) 
    : null

  return (
    <div className="group w-full max-w-[600px] mx-auto h-auto min-h-[280px] md:min-h-80 lg:h-[360px] bg-white rounded-lg border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-visible">
      <div className="flex flex-col sm:flex-row h-full">
        {/* Left Side - Images */}
        <div className="relative w-full sm:w-40 md:w-[180px] lg:w-[200px] h-[200px] sm:h-full shrink-0 overflow-visible">
          {/* Card Image (Background Layer) */}
          <div className="relative h-full w-full sm:w-32 md:w-36 lg:w-40 overflow-hidden rounded-t-lg sm:rounded-t-none sm:rounded-l-lg">
            <Image
              src={cardImageUrl || "/placeholder.svg"}
              alt={card.cardImage?.alternativeText || card.title}
              fill
              className="object-cover"
            />
          </div>
          {/* Ingredient Image (Overlay Layer) */}
          {ingredientImageUrl && (
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 md:-top-8 md:-left-8 hidden sm:block">
              <div className="relative w-[150px] h-[200px] md:w-[180px] md:h-60 lg:w-[220px] lg:h-72">
                <Image
                  src={ingredientImageUrl}
                  alt={card.ingredientImage?.alternativeText || "Ingredient"}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 p-6 sm:py-6 sm:pr-6 md:py-8 md:pr-8 lg:py-10 lg:pr-8 flex flex-col justify-center">
          <h3 className="font-plus-semibold text-indesso-blue text-xl md:text-2xl lg:text-[32px] mb-3 md:mb-4">{card.title}</h3>
          <p className="font-manrope-regular text-xs md:text-sm lg:text-[14px] text-indesso-grey mb-4 md:mb-6 leading-relaxed">{card.description}</p>
          <Button
            asChild
            className="w-fit h-10 md:h-12 lg:h-14 px-4 md:px-6 rounded-sm bg-indesso-blue hover:bg-indesso-blue/90 text-white text-sm md:text-base"
          >
            <Link href={`/${locale}${card.ctaLink}`}>
              {card.ctaText}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

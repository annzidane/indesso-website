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
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionLabel variant="bubble" className="mb-4">{data.label}</SectionLabel>
          <h2 className="text-about-us-title text-5xl text-center text-primary leading-tight text-balance">
            {data.title}
          </h2>
        </div>

        {/* Business Cards Grid */}
        <div className="grid md:grid-cols-2 gap-10">
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
    <div className="group w-[600px] h-[360px] bg-white rounded-lg border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-visible">
      <div className="flex flex-row h-full">
        {/* Left Side - Images */}
        <div className="relative w-[200px] shrink-0 overflow-visible">
          {/* Card Image (Background Layer) */}
          <div className="relative h-full w-40 overflow-hidden rounded-l-lg">
            <Image
              src={cardImageUrl || "/placeholder.svg"}
              alt={card.cardImage?.alternativeText || card.title}
              fill
              className="object-cover"
            />
          </div>
          {/* Ingredient Image (Overlay Layer) */}
          {ingredientImageUrl && (
            <div className="absolute -top-8 -left-8">
              <div className="relative w-[220px] h-72">
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
        <div className="flex-1 py-10 pr-8 flex flex-col justify-center">
          <h3 className="text-section-label text-indesso-blue text-[32px] mb-4">{card.title}</h3>
          <p className="text-body text-[14px] color-grey mb-6 leading-relaxed">{card.description}</p>
          <Button
            asChild
            className="w-fit h-14 px-6 rounded-sm bg-indesso-blue hover:bg-indesso-blue/90 text-white"
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

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { BusinessSection as BusinessSectionType, BusinessCard as BusinessCardType } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface BusinessSectionProps {
  data: BusinessSectionType
  locale: Locale
}

export function BusinessSection({ data, locale }: BusinessSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionLabel className="mb-4">{data.label}</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight text-balance">
            {data.title}
          </h2>
        </div>

        {/* Business Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {data.businessCards.map((card) => (
            <BusinessCard key={card.id} card={card} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface BusinessCardProps {
  card: BusinessCardType
  locale: Locale
}

function BusinessCard({ card, locale }: BusinessCardProps) {
  return (
    <div className="group">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image */}
        <div className="relative w-full sm:w-40 h-48 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={getStrapiMedia(card.image.url) || "/placeholder.svg"}
            alt={card.image.alternativeText || card.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-serif text-xl lg:text-2xl text-primary mb-3">{card.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{card.description}</p>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="group/btn border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          >
            <Link href={`/${locale}${card.ctaLink}`}>
              {card.ctaText}
              <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

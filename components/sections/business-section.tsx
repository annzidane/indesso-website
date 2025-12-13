import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { getStrapiMedia } from "@/lib/strapi/api";
import type {
  BusinessSectionProps as BusinessSectionDataProps,
  StrapiImage,
} from "@/types/strapi";
import type { Locale } from "@/lib/i18n/config";

interface BusinessSectionProps {
  data: BusinessSectionDataProps;
  locale: Locale;
}

export function BusinessSection({ data, locale }: BusinessSectionProps) {
  return (
    <section className="py-8 md:py-16 lg:py-24 bg-background overflow-visible">
      <div className="container mx-auto px-4 overflow-visible">
        {/* Header */}
        <div className="md:text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <SectionLabel variant="bubble" className="mb-3 md:mb-4">
            {data.label}
          </SectionLabel>
          <h2 className="font-plus-bold text-[28px] md:text-4xl lg:text-5xl md:text-center text-primary leading-[36px] md:leading-tight tracking-[-1px] text-balance">
            {data.title}
          </h2>
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 overflow-visible">
          {data.cards.map((card, index) => (
            <BusinessCard
              key={card.id}
              card={card}
              locale={locale}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BusinessCardData {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  cardImage?: StrapiImage;
  ingredientImage?: StrapiImage;
}

interface BusinessCardProps {
  card: BusinessCardData;
  locale: Locale;
  index: number;
}

function BusinessCard({ card, locale, index }: BusinessCardProps) {
  const cardImageUrl = card.cardImage
    ? getStrapiMedia(card.cardImage.url)
    : "/placeholder.svg";
  const ingredientImageUrl = card.ingredientImage
    ? getStrapiMedia(card.ingredientImage.url)
    : null;

  // Static floating images by card index
  const floatingImages = [
    "/img-business-1.png",
    "/img-business-2.png",
    "/img-business-3.png",
    "/img-business-4.png",
  ];

  const floatingImage = floatingImages[index];

  return (
    <div className="group w-full mx-auto h-auto min-h-[200px] md:min-h-[280px] bg-white rounded-[8px] md:rounded-lg border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-visible relative">
      <div className="flex h-full min-h-[200px] md:min-h-[280px]">
        {/* Left - Image with floating ingredient */}
        <div className="relative w-[90px] md:w-[140px] lg:w-[180px] shrink-0 overflow-visible">
          {/* Floating ingredient image - larger, splashing out effect, positioned at top */}
          {floatingImage && (
            <div className="absolute z-20 pointer-events-none -top-4 -left-4 w-[128px] h-[171px] md:-top-10 md:-left-7 md:w-[190px] md:h-[270px] lg:w-[240px] lg:h-[320px]">
              <Image
                src={floatingImage}
                alt="Ingredient"
                fill
                className="object-contain drop-shadow-2xl"
                unoptimized
              />
            </div>
          )}

          {/* Card Image - background */}
          <div className="absolute inset-0 overflow-hidden rounded-l-[8px] md:rounded-l-lg">
            <Image
              src={cardImageUrl || "/placeholder.svg"}
              alt={card.cardImage?.alternativeText || card.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex-1 p-6 py-5 md:py-8 md:px-6 lg:py-10 lg:px-8 flex flex-col justify-between overflow-hidden">
          <div>
            <h3 className="font-plus-semibold text-indesso-blue text-[24px] md:text-2xl lg:text-[32px] mb-2 md:mb-4 leading-[24px] md:leading-tight tracking-[-1px]">
              {card.title}
            </h3>
            <p className="font-manrope-regular text-[12px] md:text-sm lg:text-[14px] text-indesso-grey mb-3 md:mb-6 leading-[18px] md:leading-relaxed">
              {card.description}
            </p>
          </div>
          <Button
            asChild
            className="w-fit h-12 md:h-12 lg:h-14 px-6 md:px-6 rounded-[2px] bg-indesso-blue hover:bg-indesso-blue/90 text-white text-[11px] md:text-sm lg:text-base border border-transparent"
          >
            <Link href={`/${locale}${card.ctaLink}`} className="gap-[10px]">
              {card.ctaText}
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

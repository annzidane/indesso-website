"use client"

import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"
import { AccordionGlass } from "@/components/ui/accordion-glass"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { AboutUsPageProps } from "@/types/strapi"
import { toSlug } from "@/lib/strapi/utils"

export type AboutUsResponsibleOperationsProps = AboutUsPageProps["responsibleOperations"]

interface ResponsibleOperationSectionProps {
  data: AboutUsResponsibleOperationsProps
}

export function ResponsibleOperationSection({ data }: ResponsibleOperationSectionProps) {
  return (
    <section id={toSlug(data?.eyebrow)} className="relative min-h-[600px] md:min-h-[700px] lg:h-[812px] overflow-hidden">
      {/* Background Image */}
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={getStrapiMedia(data.backgroundImage.url) || ""}
            alt={data.backgroundImage.alternativeText || "Background"}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Image - Positioned at left with offset - Hidden on mobile */}
      {data.image && (
        <div className="absolute bottom-0 left-4 md:left-16 lg:left-32 z-10 hidden md:block">
          <Image
            src={getStrapiMedia(data.image.url) || ""}
            alt={data.image.alternativeText || "Responsible Operations"}
            width={457}
            height={602}
            className="object-contain w-[280px] md:w-[350px] lg:w-[457px] h-auto"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-12 md:py-16 lg:py-24">
        {/* Header - Centered */}
        <div className="text-center mb-8 md:mb-14">
          <SectionLabel variant="bubble-light" className="mb-4 font-manrope-extrabold text-xs md:text-[14px]">{data.eyebrow}</SectionLabel>
          <h2 className="font-plus-bold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.1]">
            {data.title}
          </h2>
        </div>

        {/* Accordion - Full width on mobile, right side on desktop */}
        <div className="flex justify-center md:justify-end">
          <AccordionGlass 
            items={data.items} 
            defaultOpenIndex={0}
            className="w-full md:max-w-[560px]"
          />
        </div>
      </div>
    </section>
  )
}
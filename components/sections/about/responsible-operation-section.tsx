"use client"

import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"
import { AccordionGlass } from "@/components/ui/accordion-glass"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { AboutUsPageProps } from "@/types/strapi"

export type AboutUsResponsibleOperationsProps = AboutUsPageProps["responsibleOperations"]

interface ResponsibleOperationSectionProps {
  data: AboutUsResponsibleOperationsProps
}

export function ResponsibleOperationSection({ data }: ResponsibleOperationSectionProps) {
  return (
    <section className="relative h-[812px] overflow-hidden">
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

      {/* Image - Positioned at left with offset */}
      {data.image && (
        <div className="absolute bottom-0 left-32 z-10">
          <Image
            src={getStrapiMedia(data.image.url) || ""}
            alt={data.image.alternativeText || "Responsible Operations"}
            width={457}
            height={602}
            className="object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-16 md:py-24">
        {/* Header - Centered */}
        <div className="text-center mb-14">
          <SectionLabel variant="bubble-light" className="mb-4 font-manrope-extrabold text-[14px]">{data.eyebrow}</SectionLabel>
          <h2 className="font-plus-bold text-5xl md:text-5xl lg:text-[56px] text-white leading-[1.1]">
            {data.title}
          </h2>
        </div>

        {/* Accordion - Right Side */}
        <div className="flex justify-end">
          <AccordionGlass 
            items={data.items} 
            defaultOpenIndex={0}
            className="w-full max-w-[560px]"
          />
        </div>
      </div>
    </section>
  )
}
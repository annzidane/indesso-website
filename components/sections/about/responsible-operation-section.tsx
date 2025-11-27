"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { ResponsibleOperationSection as ResponsibleOperationSectionType } from "@/types/about"
import { cn } from "@/lib/utils"

interface ResponsibleOperationSectionProps {
  data: ResponsibleOperationSectionType
}

export function ResponsibleOperationSection({ data }: ResponsibleOperationSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={
            getStrapiMedia(data.backgroundImage.url) ||
            "/placeholder.svg?height=800&width=1920&query=green agricultural field aerial view nature"
          }
          alt={data.backgroundImage.alternativeText || "Responsible Operation background"}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <SectionLabel variant="light" className="mb-4">
            {data.label}
          </SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white">{data.title}</h2>
        </div>

        {/* Accordion */}
        <div className="max-w-2xl mx-auto space-y-4">
          {data.items.map((item, index) => (
            <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold">{item.title}</span>
                <ChevronDown className={cn("h-5 w-5 transition-transform", openIndex === index && "rotate-180")} />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96 pb-4" : "max-h-0",
                )}
              >
                <p className="px-4 text-white/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

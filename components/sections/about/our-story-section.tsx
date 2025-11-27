"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { OurStorySection as OurStorySectionType } from "@/types/about"
import { cn } from "@/lib/utils"

interface OurStorySectionProps {
  data: OurStorySectionType
}

export function OurStorySection({ data }: OurStorySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = data.timeline[activeIndex]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : data.timeline.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < data.timeline.length - 1 ? prev + 1 : 0))
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionLabel className="mb-4">{data.label}</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">{data.title}</h2>
        </div>

        {/* Timeline Content */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image with Navigation */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={
                    getStrapiMedia(activeItem.image.url) ||
                    "/placeholder.svg?height=400&width=500&query=scientist researching plants in laboratory"
                  }
                  alt={activeItem.image.alternativeText || activeItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{activeItem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{activeItem.description}</p>
            </div>
          </div>

          {/* Timeline Tabs */}
          <div className="flex justify-center gap-2 mt-8">
            {data.timeline.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  index === activeIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

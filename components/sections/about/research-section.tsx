import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { ResearchSection as ResearchSectionType } from "@/types/about"

interface ResearchSectionProps {
  data: ResearchSectionType
}

export function ResearchSection({ data }: ResearchSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <SectionLabel className="mb-4">{data.label}</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">{data.title}</h2>
          <p className="text-muted-foreground">{data.description}</p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-12">
          <Image
            src={
              getStrapiMedia(data.heroImage.url) ||
              "/placeholder.svg?height=400&width=1200&query=scientist in laboratory conducting research"
            }
            alt={data.heroImage.alternativeText || "Research and Innovation"}
            fill
            className="object-cover"
          />
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {data.features.map((feature) => (
            <div key={feature.id} className="relative rounded-xl overflow-hidden group">
              <div className="aspect-[4/3] relative">
                <Image
                  src={
                    getStrapiMedia(feature.image.url) ||
                    "/placeholder.svg?height=300&width=400&query=scientific research laboratory equipment"
                  }
                  alt={feature.image.alternativeText || feature.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-white/80 line-clamp-3">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

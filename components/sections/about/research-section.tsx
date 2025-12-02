import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { AboutUsPageProps } from "@/types/strapi"

export type AboutUsResearchProps = AboutUsPageProps["research"]

interface ResearchSectionProps {
  data: AboutUsResearchProps
}

export function ResearchSection({ data }: ResearchSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-5xl mx-auto">
          <SectionLabel variant="bubble" className="mb-4">{data.eyebrow}</SectionLabel>
          <h2 className="font-plus-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">{data.title}</h2>
          <p className="font-manrope-regular text-[16px]">{data.description}</p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {data.cards.map((card) => (
            <div 
              key={card.id} 
              className="relative rounded overflow-hidden group"
              style={{ width: '392px', height: '480px' }}
            >
              {/* Background Image */}
              <Image
                src={
                  getStrapiMedia(card.image?.url ?? null) ||
                  "/placeholder.svg?height=480&width=392"
                }
                alt={card.image?.alternativeText || card.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 53, 87, 0) 25%, #003557 100%)',
                }}
              />
              {/* Content with glassmorphism */}
              <div 
                className="absolute bottom-0 left-0 right-0 px-8 py-6 text-white glass-card"
                style={{
                  height: '236px',
                  borderTopRightRadius: '40px',
                  borderBottomRightRadius: '4px',
                  borderBottomLeftRadius: '4px',
                }}
              >
                <h3 className="font-plus-extrabold italic text-2xl mb-3">{card.title}</h3>
                <p className="font-manrope-regular text-sm text-white/90 leading-relaxed">{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

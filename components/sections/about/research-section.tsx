import Image from "next/image";
import { SectionLabel } from "@/components/ui/section-label";
import { getStrapiMedia } from "@/lib/strapi/api";
import type { AboutUsPageProps } from "@/types/strapi";
import { toSlug } from "@/lib/strapi/utils";

export type AboutUsResearchProps = AboutUsPageProps["research"];

interface ResearchSectionProps {
  data: AboutUsResearchProps;
}

export function ResearchSection({ data }: ResearchSectionProps) {
  return (
    <section
      id={toSlug(data?.eyebrow)}
      className="py-12 md:py-16 lg:py-24 bg-background"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="md:text-center mb-8 md:mb-12 max-w-5xl mx-auto">
          <SectionLabel variant="bubble" className="mb-4">
            {data.eyebrow}
          </SectionLabel>
          <h2 className="font-plus-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {data.title}
          </h2>
          <p className="font-manrope-regular text-sm md:text-[16px]">
            {data.description}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.cards.map((card) => (
            <div
              key={card.id}
              className="relative rounded overflow-hidden group w-full aspect-[392/480]"
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
                  background:
                    "linear-gradient(180deg, rgba(0, 53, 87, 0) 25%, #003557 100%)",
                }}
              />
              {/* Content with glassmorphism */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-8 py-4 md:py-6 text-white glass-card"
                style={{
                  minHeight: "40%",
                  borderTopRightRadius: "40px",
                  borderBottomRightRadius: "4px",
                  borderBottomLeftRadius: "4px",
                }}
              >
                <h3 className="font-plus-extrabold italic text-[18px] md:text-2xl leading-[28px] md:leading-tight tracking-[-0.5px] mb-2 md:mb-3">
                  {card.title}
                </h3>
                <p className="font-manrope-regular text-[14px] md:text-sm text-white/90 leading-[24px] md:leading-relaxed">
                  {card.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

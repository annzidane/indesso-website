"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FeatureSection } from "@/components/ui/feature-section"
import type { SustainabilityPageProps } from "@/types/strapi"

interface StrategySectionProps {
  data: SustainabilityPageProps["strategy"]
}

export function StrategySection({ data }: StrategySectionProps) {
  const { eyebrow, title, description, image, accordionItems } = data
  return (
    <section id="sustainability-strategy" className="bg-white">
      {/* Header with Image */}
      <FeatureSection
        eyebrow={eyebrow}
        title={title}
        description={description}
        image={image}
        imagePosition="left"
        showBg={true}
      />

      {/* Accordion */}
      <div className="container mx-auto px-4 sm:px-6 pb-12 md:pb-16 lg:pb-24">
        <div className="max-w-8xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {accordionItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={`item-${item.id}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="text-left">
                  <span className="flex items-center gap-3 md:gap-4">
                    <img
                      src="/sustainability/icon-check.png"
                      alt=""
                      className="w-5 h-5 md:w-6 md:h-6 object-contain"
                    />
                    <span
                      className="text-left font-plus-semibold text-[#003557]"
                      style={{
                        fontSize: "14px",
                        lineHeight: "24px",
                      }}
                    >
                      {item.title}
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="whitespace-pre-line">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

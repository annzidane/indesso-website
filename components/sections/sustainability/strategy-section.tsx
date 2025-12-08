"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FeatureSection } from "@/components/ui/feature-section"
import { toSlug } from "@/lib/strapi/utils"
import type { SustainabilityPageProps } from "@/types/strapi"

interface StrategySectionProps {
  data: SustainabilityPageProps["strategy"]
}

export function StrategySection({ data }: StrategySectionProps) {
  const { eyebrow, title, description, image, accordionItems } = data
  return (
    <section id={toSlug(eyebrow)} className="bg-white">
      {/* Header with Image - dengan background, padding sudah include di dalam */}
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
          <Accordion type="single" collapsible className="w-full">
            {accordionItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={`item-${item.id}`}
                className="border-b border-gray-200"
              >
                <AccordionTrigger
                  className="accordion-trigger-custom text-left text-sm md:text-base lg:text-lg font-plus-semibold text-indesso-very-dark-grey hover:no-underline py-4 px-4 md:py-5"
                >
                  <span className="flex items-center gap-3">
                    <img
                      src="/accordion-icon.png"
                      alt=""
                      className="w-5 h-5 md:w-6 md:h-6 object-contain"
                    />
                    <span className="text-left">
                      {item.title}
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent
                  className="accordion-content-custom text-sm md:text-base text-indesso-grey leading-relaxed py-4 px-10 md:pb-5 whitespace-pre-line"
                >
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

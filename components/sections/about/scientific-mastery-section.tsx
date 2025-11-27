"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { ScientificMasterySection as ScientificMasterySectionType } from "@/types/about"
import { cn } from "@/lib/utils"

interface ScientificMasterySectionProps {
  data: ScientificMasterySectionType
}

export function ScientificMasterySection({ data }: ScientificMasterySectionProps) {
  const [activeTab, setActiveTab] = useState(0)
  const activeItem = data.tabs[activeTab]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <SectionLabel className="mb-4">{data.label}</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">{data.title}</h2>
          </div>
          <div className="md:text-right">
            <Button className="bg-primary hover:bg-primary/90">{activeItem.label}</Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          {data.tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-t-md",
                index === activeTab
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{activeItem.title}</h3>
            <p className="text-muted-foreground mb-6">{activeItem.description}</p>
            {activeItem.bulletPoints && activeItem.bulletPoints.length > 0 && (
              <ul className="space-y-2">
                {activeItem.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
            <Image
              src={
                getStrapiMedia(activeItem.image.url) ||
                "/placeholder.svg?height=400&width=500&query=laboratory scientific equipment technology"
              }
              alt={activeItem.image.alternativeText || activeItem.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

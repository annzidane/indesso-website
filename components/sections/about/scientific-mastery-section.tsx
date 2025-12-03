"use client"

import { useState } from "react"
import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"
import { TabsNavigation } from "@/components/ui/tabs-navigation"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { AboutUsPageProps } from "@/types/strapi"

export type AboutUsScientificMasteryProps = AboutUsPageProps["scientificMastery"]

interface ScientificMasterySectionProps {
  data: AboutUsScientificMasteryProps
}

export function ScientificMasterySection({ data }: ScientificMasterySectionProps) {
  const [activeTab, setActiveTab] = useState(0)
  const activeItem = data.tabs[activeTab]

  // Transform tabs data for TabsNavigation component
  const tabItems = data.tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
  }))

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-end mb-8 md:mb-10">
          {/* Left Column - Eyebrow & Title */}
          <div>
            <SectionLabel variant="bubble" className="mb-4 md:mb-6">{data.eyebrow}</SectionLabel>
            <h2 className="font-plus-bold text-3xl sm:text-4xl md:text-5xl text-indesso-dark-blue">
              {data.title}
            </h2>
          </div>
          {/* Right Column - Description */}
          <div>
            <p className="font-manrope-regular text-sm md:text-[16px] text-grey">
              {data.description}
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <TabsNavigation
          tabs={tabItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-8 md:mb-16"
        />

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 md:order-1">
            <h3 className="font-plus-bold text-xl sm:text-2xl md:text-[28px] text-indesso-dark-blue mb-4 md:mb-6">
              {activeItem.blockTitle}
            </h3>
            <div className="font-manrope-regular text-grey text-xs md:text-[14px] whitespace-pre-line">
              {activeItem.blockContent}
            </div>
          </div>
          {/* Right Column - Image */}
          <div className="relative w-full aspect-[560/424] rounded overflow-hidden order-1 md:order-2">
            <Image
              src={
                getStrapiMedia(activeItem.image?.url ?? null) ||
                "/placeholder.svg?height=424&width=560"
              }
              alt={activeItem.image?.alternativeText || activeItem.blockTitle}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

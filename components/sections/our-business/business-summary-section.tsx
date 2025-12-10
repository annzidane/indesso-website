"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStrapiMedia } from "@/lib/strapi/client"
import type { BusinessSummarySectionData } from "@/types/strapi"
import { SectionLabel } from "@/components/ui/section-label"
import { BadgeGlass } from "@/components/ui/badge-glass"

interface BusinessSummarySectionProps {
  data: BusinessSummarySectionData
}

export function BusinessSummarySection({ data }: BusinessSummarySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHotSpotVisible, setIsHotSpotVisible] = useState(false)
  const slides = data.slidder || []
  const currentSlide = slides[currentIndex]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
    setIsHotSpotVisible(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
    setIsHotSpotVisible(false)
  }

  // Check if has subsidiary content (text or logo)
  const hasSubsidiaryContent = currentSlide?.Subsidiary_text?.length || currentSlide?.partner_logo

  return (
    <section className="bg-[url('/feature-bg.png')] object-cover object-top bg-no-repeat">
      {/* Summary Header */}
      <div className="relative container mx-auto px-4 sm:px-6 pt-12 md:pt-16 lg:pt-24">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 lg:mb-16">
          <div>
            <SectionLabel variant="bubble" className="mb-4">{data.eyebrow}</SectionLabel>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-plus-bold text-indesso-dark-blue leading-tight">
              {data.title}
            </h2>
          </div>
          <div className="lg:flex lg:items-center">
            <p className="text-sm font-manrope-regular md:text-[16px] text-dark-grey leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* Slider - 1240x520 with 100px margins */}
      {slides.length > 0 && currentSlide && (
        <div className="relative px-[100px] pb-12 md:pb-16">
          <div 
            className="relative w-full max-w-[1240px] mx-auto rounded-lg overflow-hidden"
            style={{ aspectRatio: "1240/520" }}
          >
            {/* Background Image */}
            <Image
              src={getStrapiMedia(currentSlide.image?.url || null)}
              alt={currentSlide.title}
              fill
              className="object-cover"
            />
            
            {/* Gradient Overlay - only on left side for glass effect */}
            <div className="absolute inset-y-0 left-0 w-2/5 bg-linear-to-r from-black/60 to-transparent" />

            {/* Glass Content Panel - Bottom Left */}
            <div className="absolute bottom-0 left-0 w-full max-w-[480px] glass-dark m-0 rounded-tr-lg">
              <div className="p-6 md:p-8">
                {/* Title with italic style like design */}
                <h3 className="text-2xl md:text-[28px] font-plus-bold italic text-white mb-4">
                  {currentSlide.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/75 text-sm md:text-base font-manrope-regular leading-relaxed">
                  {currentSlide.description}
                </p>

                {/* Divider - only show if has subsidiary content */}
                {hasSubsidiaryContent && (
                  <div className="border-t border-white/20 my-4" />
                )}

                {/* Subsidiary Section */}
                {hasSubsidiaryContent && (
                  <div className="flex items-center justify-between gap-4">
                    {/* Subsidiary Text */}
                    {currentSlide.Subsidiary_text && currentSlide.Subsidiary_text.length > 0 && (
                      <div className="text-white/80 text-sm">
                        {currentSlide.Subsidiary_text.map((block, idx) => (
                          <p key={idx}>
                            {block.children?.map((child, cidx) => (
                              <span key={cidx} className={child.bold ? "font-bold" : ""}>
                                {child.text}
                              </span>
                            ))}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Partner Logo */}
                    {currentSlide.partner_logo && (
                      <Image
                        src={getStrapiMedia(currentSlide.partner_logo.url)}
                        alt="Partner Logo"
                        width={currentSlide.partner_logo.width || 123}
                        height={currentSlide.partner_logo.height || 32}
                        className="h-8 w-auto object-contain"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Center Icon with Pulse Effect - using data.icon */}
            {data.icon && (
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                onMouseEnter={() => setIsHotSpotVisible(true)}
                onMouseLeave={() => setIsHotSpotVisible(false)}
              >
                {/* Pulse rings animation */}
                <div className="relative flex items-center justify-center w-16 h-16">
                  {/* Outer pulse ring - subtle */}
                  <div className="absolute rounded-full bg-white/15 animate-ping w-14 h-14" style={{ animationDuration: '2s' }} />
                  {/* Middle pulse ring */}
                  <div className="absolute rounded-full bg-white/20 animate-pulse w-12 h-12" />
                  
                  {/* Icon - directly without shadow */}
                  <Image
                    src={getStrapiMedia(data.icon.url)}
                    alt={data.icon.alternativeText || "Feature Icon"}
                    width={64}
                    height={64}
                    className="relative w-16 h-16 object-contain hover:scale-110 transition-transform"
                  />
                </div>

                {/* Hot Spot Badge - shows on hover */}
                {isHotSpotVisible && currentSlide.hot_spot && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 ml-[250px] z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                    <BadgeGlass
                      title={currentSlide.hot_spot.feature_title}
                      description={currentSlide.hot_spot.feature_desc}
                      image={currentSlide.hot_spot.feature_icon || undefined}
                      className="w-[500px] max-w-[500px]"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Navigation Arrows - Bottom Right */}
            {slides.length > 1 && (
              <div className="absolute bottom-6 right-6 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full w-12 h-12 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="rounded-full w-12 h-12 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

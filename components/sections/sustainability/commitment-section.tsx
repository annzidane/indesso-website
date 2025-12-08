"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getStrapiMedia } from "@/lib/strapi/api"
import { toSlug } from "@/lib/strapi/utils"
import { SectionLabel } from "@/components/ui/section-label"
import type { SustainabilityPageProps } from "@/types/strapi"

interface CommitmentSectionProps {
  data: SustainabilityPageProps["commitment"]
}

export function CommitmentSection({ data }: CommitmentSectionProps) {
  const { eyebrow, title, description, assessments } = data
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Responsive card dimensions
  const [cardDimensions, setCardDimensions] = useState({ width: 400, gap: 32 })
  const [visibleCards, setVisibleCards] = useState(3)

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setCardDimensions({ width: 280, gap: 16 })
          setVisibleCards(1)
        } else if (window.innerWidth < 768) {
          setCardDimensions({ width: 320, gap: 24 })
          setVisibleCards(1)
        } else if (window.innerWidth < 1024) {
          setCardDimensions({ width: 360, gap: 32 })
          setVisibleCards(2)
        } else {
          setCardDimensions({ width: 400, gap: 32 })
          setVisibleCards(3)
        }
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const cardTotalWidth = cardDimensions.width + cardDimensions.gap
  const maxIndex = Math.max(0, assessments.length - visibleCards)
  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < maxIndex

  const scrollTo = useCallback((index: number) => {
    const newIndex = Math.max(0, Math.min(index, maxIndex))
    setCurrentIndex(newIndex)
    
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: newIndex * cardTotalWidth,
        behavior: 'smooth'
      })
    }
  }, [maxIndex, cardTotalWidth])

  // Sync scroll position with currentIndex (for manual swipe)
  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft
      const newIndex = Math.round(scrollLeft / cardTotalWidth)
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= maxIndex) {
        setCurrentIndex(newIndex)
      }
    }
  }, [cardTotalWidth, currentIndex, maxIndex])

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scrollend', handleScroll)
      return () => carousel.removeEventListener('scrollend', handleScroll)
    }
  }, [handleScroll])

  const handlePrev = () => {
    if (canScrollLeft) {
      scrollTo(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (canScrollRight) {
      scrollTo(currentIndex + 1)
    }
  }

  return (
    <section id={toSlug(eyebrow)} className="py-12 md:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <SectionLabel variant="bubble" className="mb-4">{eyebrow}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-plus-bold text-indesso-dark-blue mb-4 md:mb-6 leading-tight max-w-4xl mx-auto">
            {title}
          </h2>
          {description && (
            <p className="text-[16px] md:text-base text-indesso-dark-grey max-w-5xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Cards Carousel - Full width untuk center snap */}
      <div 
        ref={carouselRef}
        className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth px-[calc(50vw-140px)] sm:px-[calc(50vw-160px)] md:px-4 lg:px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {assessments.map((item) => (
          <div 
            key={item.id} 
            className="relative shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-80 sm:h-[340px] md:h-[360px] lg:h-96 rounded p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col bg-cover bg-center bg-no-repeat border border-gray-200 snap-center"
            style={{ backgroundImage: "url('/card-sustainability-bg.jpg')" }}
          >
              {/* Logo */}
              {item.image && (
                <div className="relative w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 mb-4 md:mb-6">
                  <Image
                    src={getStrapiMedia(item.image.url) || "/placeholder.svg"}
                    alt={item.image.alternativeText || "Assessment logo"}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              )}
              
              {/* Description */}
              <p className="text-sm md:text-base text-indesso-dark-grey leading-relaxed flex-1 italic">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      {/* Navigation Controls */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mt-6 md:mt-8">
          {/* Dots Indicator - Left */}
          <div className="flex items-center gap-2">
            {assessments.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-indesso-dark-blue' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Buttons - Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={!canScrollLeft}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft 
                  ? 'border-indesso-dark-blue text-indesso-dark-blue hover:bg-indesso-dark-blue hover:text-white cursor-pointer' 
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollRight 
                  ? 'border-indesso-dark-blue text-indesso-dark-blue hover:bg-indesso-dark-blue hover:text-white cursor-pointer' 
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

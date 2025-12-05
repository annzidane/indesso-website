"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { StrapiImage } from "@/types/strapi"
import { SectionLabel } from "@/components/ui/section-label"

interface AssessmentItem {
  id: number
  description: string
  image?: StrapiImage
}

interface CommitmentSectionProps {
  eyebrow: string
  title: string
  description: string
  assessments: AssessmentItem[]
}

export function CommitmentSection({ 
  eyebrow, 
  title, 
  description, 
  assessments 
}: CommitmentSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const cardWidth = 400
  const gap = 32
  const cardTotalWidth = cardWidth + gap

  // Calculate how many cards are visible
  const [visibleCards, setVisibleCards] = useState(3)

  useEffect(() => {
    const updateVisibleCards = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setVisibleCards(1)
        } else if (window.innerWidth < 1024) {
          setVisibleCards(2)
        } else {
          setVisibleCards(3)
        }
      }
    }
    
    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [])

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
    <section id="commitment" className="py-12 md:py-16 lg:py-24 bg-white">
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

        {/* Cards Carousel */}
        <div 
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {assessments.map((item) => (
            <div 
              key={item.id} 
              className="relative shrink-0 w-[320px] sm:w-[360px] md:w-[400px] h-[340px] sm:h-[360px] md:h-96 rounded p-6 sm:p-7 md:p-8 flex flex-col bg-cover bg-center bg-no-repeat border border-gray-200"
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

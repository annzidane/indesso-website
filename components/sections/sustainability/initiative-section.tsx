"use client"

import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import { getStrapiMedia } from "@/lib/strapi/api"
import { toSlug } from "@/lib/strapi/utils"
import { SectionLabel } from "@/components/ui/section-label"
import { useState, useRef, useCallback, useEffect } from "react"
import type { SustainabilityPageProps } from "@/types/strapi"

type InitiativeCard = SustainabilityPageProps["initiative"]["cards"][number]

interface InitiativeSectionProps {
  data: SustainabilityPageProps["initiative"]
}

export function InitiativeSection({ data }: InitiativeSectionProps) {
  const { eyebrow, title, description, cards } = data
  const [selectedCard, setSelectedCard] = useState<InitiativeCard | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isResettingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const duplicatedCards = [...cards, ...cards, ...cards, ...cards, ...cards]

  // Responsive card dimensions
  const [cardDimensions, setCardDimensions] = useState({ width: 392, gap: 24 })
  
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setCardDimensions({ width: 280, gap: 16 })
        } else if (window.innerWidth < 768) {
          setCardDimensions({ width: 320, gap: 16 })
        } else if (window.innerWidth < 1024) {
          setCardDimensions({ width: 360, gap: 24 })
        } else {
          setCardDimensions({ width: 392, gap: 24 })
        }
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const cardTotalWidth = cardDimensions.width + cardDimensions.gap

  // Initialize carousel to middle section for infinite scroll
  useEffect(() => {
    if (carouselRef.current && cards.length > 0) {
      const scrollTo = cardTotalWidth * cards.length * 2
      carouselRef.current.scrollLeft = scrollTo
    }
  }, [cards.length, cardTotalWidth])

  // Handle infinite scroll reset - only after scroll ends
  const handleScrollEnd = useCallback(() => {
    if (!carouselRef.current || isResettingRef.current || cards.length === 0) return

    const carousel = carouselRef.current
    const singleSetWidth = cardTotalWidth * cards.length
    const scrollLeft = carousel.scrollLeft

    // Calculate boundaries - wider safe zone
    const minBoundary = singleSetWidth * 0.8
    const maxBoundary = singleSetWidth * 3.2

    // Only reset if we're outside the safe zone
    if (scrollLeft < minBoundary || scrollLeft > maxBoundary) {
      isResettingRef.current = true
      
      // Calculate equivalent position in the middle section
      let newScrollLeft = scrollLeft
      while (newScrollLeft < singleSetWidth * 1.8) {
        newScrollLeft += singleSetWidth
      }
      while (newScrollLeft > singleSetWidth * 2.2) {
        newScrollLeft -= singleSetWidth
      }

      // Instantly jump without animation
      carousel.scrollLeft = newScrollLeft
      
      // Small delay before allowing next reset
      requestAnimationFrame(() => {
        isResettingRef.current = false
      })
    }
  }, [cards.length, cardTotalWidth])

  // Debounced scroll handler - waits for scroll to stop
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Only trigger reset after scroll stops (200ms delay)
    scrollTimeoutRef.current = setTimeout(() => {
      handleScrollEnd()
    }, 200)
  }, [handleScrollEnd])

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        carousel.removeEventListener('scroll', handleScroll)
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
      }
    }
  }, [handleScroll])

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const currentScroll = carouselRef.current.scrollLeft
      
      const newScroll = direction === 'left' 
        ? currentScroll - cardTotalWidth 
        : currentScroll + cardTotalWidth

      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      })
    }
  }

  const openModal = (card: InitiativeCard) => {
    setSelectedCard(card)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedCard(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      <section id={toSlug(eyebrow)} className="py-12 md:py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <SectionLabel variant="bubble" className="mb-4">{eyebrow}</SectionLabel>
            <h2 className="max-w-3xl mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-plus-bold text-indesso-dark-blue mb-4 md:mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-sm md:text-base text-monochrome max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-indesso-dark-blue" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-indesso-dark-blue" />
          </button>

          {/* Cards Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-4 md:px-16 py-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {duplicatedCards.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => openModal(item)}
                className="group relative shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[392px] h-[380px] sm:h-[420px] md:h-[450px] lg:h-[480px] rounded-b overflow-hidden cursor-pointer snap-center"
              >
                {/* Background Image */}
                {item.image && (
                  <Image
                    src={getStrapiMedia(item.image.url) || "/placeholder.svg"}
                    alt={item.image.alternativeText || item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Glass Effect Content Area */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  {/* Glassmorphism Background */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-t-2xl" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg md:text-xl font-plus-bold text-white mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <button className="inline-flex items-center text-white font-plus-medium text-sm group-hover:gap-2 transition-all">
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[800px] pt-10 md:pt-16 lg:pt-[82px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="
                relative
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-2xl
                flex
                flex-col
                w-full
                max-h-[90vh]
                lg:h-[646px]
                animate-in fade-in zoom-in-95 duration-300
              "
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Modal Image */}
              <div
                className="
                  relative
                  w-full
                  flex-none
                  h-[220px]
                  sm:h-[260px]
                  md:h-80
                  lg:h-[450px]
                "
              >
                {selectedCard.image && (
                  <Image
                    src={getStrapiMedia(selectedCard.image.url) || "/placeholder.svg"}
                    alt={selectedCard.image.alternativeText || selectedCard.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Modal Content (scrollable text only) */}
              <div
                className="w-full flex-1 overflow-y-auto"
                style={{
                  paddingTop: 24,
                  paddingRight: 40,
                  paddingBottom: 32,
                  paddingLeft: 40,
                  background: "#FFFFFF",
                  borderTopWidth: 2,
                  borderTopStyle: "solid",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(260.7deg, rgba(255, 255, 255, 0.32) 0%, rgba(153, 153, 153, 0.32) 100%)",
                }}
              >
                <div className="space-y-3">
                  <h3 className="text-xl italic sm:text-2xl md:text-3xl font-plus-bold text-indesso-dark-blue">
                    {selectedCard.title}
                  </h3>
                  <p className="text-[14px] text-indesso-grey leading-relaxed">
                    {selectedCard.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

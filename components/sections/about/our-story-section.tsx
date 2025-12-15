"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { StrapiImage } from "@/types/strapi"
import { cn } from "@/lib/utils"
import { toSlug } from "@/lib/strapi/utils"

interface StoryItemData {
  id: number
  title: string
  content: string
  sliderTitle: string
  image?: StrapiImage
}

interface OurStorySectionData {
  eyebrow: string
  title: string
  stories: StoryItemData[]
}

interface OurStorySectionProps {
  data: OurStorySectionData
}

export function OurStorySection({ data }: OurStorySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null)
  const activeItem = data.stories[activeIndex]

  // Infinite loop navigation with slide effect
  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection('right') // Slide right when going to previous
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + data.stories.length) % data.stories.length)
      setSlideDirection(null)
      setIsAnimating(false)
    }, 300)
  }, [data.stories.length, isAnimating])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection('left') // Slide left when going to next
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % data.stories.length)
      setSlideDirection(null)
      setIsAnimating(false)
    }, 300)
  }, [data.stories.length, isAnimating])

  if (!activeItem) {
    return null
  }

  const imageUrl = activeItem.image 
    ? getStrapiMedia(activeItem.image.url) 
    : "/placeholder.svg"

  // Get slider items excluding active one - order them so next items appear first
  const getOrderedSliderItems = () => {
    const items = []
    // Start from the next item after active, wrap around
    for (let i = 1; i < data.stories.length; i++) {
      const index = (activeIndex + i) % data.stories.length
      items.push({ ...data.stories[index], originalIndex: index })
    }
    return items
  }
  const sliderItems = getOrderedSliderItems()

  return (
    <section id={toSlug(data?.eyebrow)} className="relative py-12 md:py-16 lg:py-24 overflow-hidden">
      {/* Background Image - Sky/Clouds */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/our-story-bg.png"
          alt="Background"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <SectionLabel variant="bubble" className="mb-4">{data.eyebrow}</SectionLabel>
          <h2 className="font-plus-bold text-3xl md:text-4xl lg:text-5xl text-foreground">{data.title}</h2>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Navigation Arrow Left */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 md:-left-4 lg:-left-16 top-[200px] md:top-1/2 md:-translate-y-1/2 z-20 bg-white hover:bg-white/90 rounded-full shadow-lg w-10 h-10 md:w-12 md:h-12"
              onClick={handlePrev}
              disabled={isAnimating}
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
            </Button>

            {/* Navigation Arrow Right */}
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 md:-right-4 lg:-right-16 top-[200px] md:top-1/2 md:-translate-y-1/2 z-20 bg-white hover:bg-white/90 rounded-full shadow-lg w-10 h-10 md:w-12 md:h-12"
              onClick={handleNext}
              disabled={isAnimating}
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start px-8 md:px-0">
              {/* Large Active Image - Left Side with slide animation */}
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[560px] overflow-visible">
                <div 
                  className={cn(
                    "absolute inset-0 rounded-[10px] overflow-hidden shadow-xl",
                    "transition-all duration-300",
                    slideDirection === 'left' && "-translate-x-full opacity-0",
                    slideDirection === 'right' && "translate-x-full opacity-0",
                    !slideDirection && "translate-x-0 opacity-100"
                  )}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={activeItem.image?.alternativeText || activeItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content - Right Side */}
              <div className="relative flex flex-col pt-0 md:pt-4">
                {/* Watermark - sliderTitle behind title - Hidden on mobile */}
                <div 
                  className={cn(
                    "absolute -top-4 right-0 font-plus-watermark select-none pointer-events-none hidden md:block",
                    slideDirection && "opacity-0",
                    !slideDirection && "opacity-100"
                  )}
                  style={{
                    transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {activeItem.sliderTitle}
                </div>

                {/* Text Content with fade animation */}
                <div 
                  className={cn(
                    "relative z-10",
                    slideDirection && "opacity-0 translate-y-4",
                    !slideDirection && "opacity-100 translate-y-0"
                  )}
                  style={{
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <h3 className="font-plus-bold indesso-dark-blue text-xl sm:text-2xl md:text-3xl italic mb-4 md:mb-9">
                    {activeItem.title}
                  </h3>
                  <div className="font-manrope-regular text-grey text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-line">
                    {activeItem.content}
                  </div>
                </div>

                {/* Thumbnail Slider - Bottom with slide animation */}
                <div className="relative z-10 mt-6 md:mt-auto pt-4 md:pt-8">
                  <div 
                    className="relative overflow-x-auto md:overflow-visible scrollbar-hide"
                    style={{
                      marginLeft: '0',
                    }}
                  >
                    <div 
                      className={cn(
                        "flex gap-3 md:gap-4 md:-ml-28",
                        slideDirection === 'left' && "md:-translate-x-60",
                        slideDirection === 'right' && "md:translate-x-60",
                        !slideDirection && "translate-x-0"
                      )}
                      style={{
                        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {sliderItems.map((item) => {
                        const thumbUrl = item.image 
                          ? getStrapiMedia(item.image.url) 
                          : "/placeholder.svg"
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              if (!isAnimating) {
                                const diff = item.originalIndex - activeIndex
                                if (diff > 0 || (diff < 0 && Math.abs(diff) > data.stories.length / 2)) {
                                  setSlideDirection('left')
                                } else {
                                  setSlideDirection('right')
                                }
                                setIsAnimating(true)
                                setTimeout(() => {
                                  setActiveIndex(item.originalIndex)
                                  setSlideDirection(null)
                                  setIsAnimating(false)
                                }, 300)
                              }
                            }}
                            className="relative shrink-0 w-[140px] h-[95px] sm:w-40 sm:h-[110px] md:w-[180px] md:h-[120px] lg:w-[220px] lg:h-[150px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
                          >
                            <Image
                              src={thumbUrl || "/placeholder.svg"}
                              alt={item.image?.alternativeText || item.title}
                              fill
                              className="object-cover"
                            />
                            {/* Glassmorphism label with sliderTitle */}
                            <div 
                              className="absolute bottom-0 left-0 px-4 md:px-8 py-2 md:py-3"
                              style={{
                                borderTopRightRadius: '40px',
                                borderBottomLeftRadius: '4px',
                                background: 'linear-gradient(99.03deg, rgba(255, 255, 255, 0.304) 0%, rgba(255, 255, 255, 0.152) 100%)',
                                borderTop: '2px solid rgba(255, 255, 255, 0.1)',
                                borderRight: '2px solid rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(50px)',
                                WebkitBackdropFilter: 'blur(50px)',
                              }}
                            >
                              <span className="font-plus-semibold text-white text-xs md:text-sm uppercase tracking-wide">
                                {item.sliderTitle}
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { toSlug } from "@/lib/strapi/utils"
import type { CareerPageProps } from "@/types/strapi/career"

interface GrowingTogetherProps {
  data: CareerPageProps["growingTogether"]
}

export function GrowingTogether({ data }: GrowingTogetherProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slides = data?.slides || []

  const nextSlide = () => {
    if (slides.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    if (slides.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const currentSlide = slides[currentIndex]

  return (
    <section id={toSlug(data?.eyebrow || "growing-together")} className="py-12 md:py-16 lg:py-24 bg-[url('/growing-together-bg.png')] bg-cover bg-no-repeat bg-center">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <SectionLabel variant="bubble" className="mb-4">
            {data?.eyebrow || "Growing Together"}
          </SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-plus-bold text-indesso-dark-blue mb-4 md:mb-6">
            {data?.title || "Celebrating Every Milestone"}
          </h2>
          <p className="text-indesso-dark-grey max-w-5xl mx-auto text-sm md:text-[16px] leading-relaxed font-manrope-regular">
            {data?.description}
          </p>
        </div>

        {/* Carousel */}
        {slides.length > 0 && currentSlide && (
          <div className="relative">
            <div className="overflow-hidden rounded-xl md:rounded-2xl">
              <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[675px]">
                <Image
                  src={currentSlide.image?.url || "/placeholder.png"}
                  alt={currentSlide.title || "Milestone celebration"}
                  fill
                  className="object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                {/* Slide Content */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-16 sm:right-20 md:right-24 text-white">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-plus-bold italic mb-1 md:mb-2">
                    {currentSlide.title}
                  </h3>
                  <p className="text-light-grey text-xs md:text-sm max-w-4xl font-manrope-regular line-clamp-2 md:line-clamp-none">
                    {currentSlide.description}
                  </p>
                </div>

                {/* Navigation */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 flex items-center gap-2 md:gap-3">
                  <button
                    onClick={prevSlide}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-indesso-dark-blue transition-colors text-white"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors ${
                        index === currentIndex ? "bg-white" : "bg-white/40"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

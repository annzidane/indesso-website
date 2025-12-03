"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
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
    <section id="growing-together" className="py-16 md:py-24 bg-[url('/growing-together-bg.png')] bg-cover bg-no-repeat bg-center">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionLabel variant="bubble" className="mb-4">
            {data?.eyebrow || "Growing Together"}
          </SectionLabel>
          <h2 className="text-5xl md:text-4xl lg:text-5xl font-plus-bold text-indesso-dark-blue mb-6">
            {data?.title || "Celebrating Every Milestone"}
          </h2>
          <p className="text-indesso-dark-grey max-w-5xl mx-auto text-[16px] md:text-base leading-relaxed font-manrope-regular">
            {data?.description}
          </p>
        </div>

        {/* Carousel */}
        {slides.length > 0 && currentSlide && (
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[675px]">
                <Image
                  src={currentSlide.image?.url || "/placeholder.png"}
                  alt={currentSlide.title || "Milestone celebration"}
                  fill
                  className="object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                {/* Slide Content */}
                <div className="absolute bottom-8 left-8 right-24 text-white">
                  <h3 className="text-[28px] md:text-3xl font-plus-bold italic mb-2">
                    {currentSlide.title}
                  </h3>
                  <p className="text-light-grey text-sm max-w-4xl font-manrope-regular">
                    {currentSlide.description}
                  </p>
                </div>

                {/* Navigation */}
                <div className="absolute bottom-8 right-8 flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-indesso-dark-blue transition-colors text-white"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
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

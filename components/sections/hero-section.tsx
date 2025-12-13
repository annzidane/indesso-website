"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { getStrapiMedia } from "@/lib/strapi/api"
import { BadgeGlass } from "@/components/ui/badge-glass"
import type { HeroSectionProps as HeroSectionDataProps, BannerData } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface HeroSectionProps {
  data: HeroSectionDataProps
  banners: BannerData[]
  locale: Locale
}

export function HeroSection({ data, banners, locale }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Use banners for slideshow
  const slides = banners.length > 0 
    ? banners.map(banner => ({
        id: banner.id,
        url: getStrapiMedia(banner.image.url) || "/placeholder.png",
        alt: banner.image.alternativeText || banner.title || "Banner image",
      }))
    : [{
        id: 0,
        url: "/placeholder.png",
        alt: "Hero background",
      }]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return

    const interval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, slides.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Carousel Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => {
              prevSlide()
              setIsAutoPlaying(false)
              setTimeout(() => setIsAutoPlaying(true), 5000)
            }}
            className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={() => {
              nextSlide()
              setIsAutoPlaying(false)
              setTimeout(() => setIsAutoPlaying(true), 5000)
            }}
            className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-plus-extrabold text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] xl:text-[88px] 2xl:text-[104px] leading-none tracking-tight text-white mb-6 md:mb-8 text-balance">
            {data.title}
          </h1>

          {/* CTA Button */}
          <Link href={`/${locale}${data.ctaLink}`} className="inline-flex items-center gap-2 md:gap-3 text-white group">
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Play className="h-4 w-4 md:h-5 md:w-5 ml-0.5 md:ml-1" fill="currentColor" />
            </span>
            <span className="text-xs md:text-sm font-medium tracking-wider uppercase flex items-center gap-2">
              <span className="w-6 md:w-8 h-px bg-white" />
              {data.ctaText}
            </span>
          </Link>
        </div>
      </div>

      {/* Badge */}
      {data.badge && (
        <div className="absolute bottom-20 sm:bottom-12 right-4 lg:bottom-16 lg:right-16 z-10">
          <BadgeGlass
            title={data.badge.title}
            description={data.badge.description}
            image={data.badge.image}
          />
        </div>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "w-6 md:w-8 bg-white" 
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator - only show if single slide */}
      {slides.length <= 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
            <div className="w-1 h-2 md:w-1.5 md:h-3 bg-white/70 rounded-full animate-bounce" />
          </div>
        </div>
      )}
    </section>
  )
}

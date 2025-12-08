"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { getStrapiMedia } from "@/lib/strapi/api"
import { toSlug } from "@/lib/strapi/utils"
import { SectionLabel } from "@/components/ui/section-label"
import type { SustainabilityPageProps } from "@/types/strapi"

type PartnerCard = SustainabilityPageProps["responsibleOperations"]["cards"][number]

interface ResponsibleOperationsSectionProps {
  data: SustainabilityPageProps["responsibleOperations"]
}

export function ResponsibleOperationsSection({ data }: ResponsibleOperationsSectionProps) {
  const { eyebrow, title, description, ctaText, cards } = data
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cards.length)
    setIsPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length)
    setIsPlaying(false)
  }

  const current = cards[currentSlide]
  const prevCard = cards[(currentSlide - 1 + cards.length) % cards.length]
  const nextCard = cards[(currentSlide + 1) % cards.length]

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        // Reset video to start if needed
        videoRef.current.load()
        videoRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch((error) => {
          console.error("Video playback failed:", error)
          setIsPlaying(false)
        })
      }
    }
  }

  if (!current) {
    return null
  }

  return (
    <section id={toSlug(eyebrow)} className="relative">
      {/* Background Image */}
      <div 
        className="relative min-h-[700px] md:min-h-[800px] lg:min-h-[900px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/responsible-operations-bg.png')" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-indesso-dark-blue/80 via-indesso-dark-blue/40 to-transparent" />

        <div className="relative container mx-auto px-4 sm:px-6 pt-12 md:pt-16 lg:pt-24">
          {/* Header Section */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 lg:mb-16">
            <div className="text-white">
              <SectionLabel variant="bubble-light" className="mb-4">{eyebrow}</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-plus-bold leading-tight">
                {title}
              </h2>
            </div>
            <div className="text-white lg:flex lg:items-center">
              <p className="text-sm md:text-base text-white/90 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Section - Full Width */}
        <div className="relative px-4 md:px-0">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 lg:left-47 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>

            {/* Cards Container */}
            <div className="flex items-center justify-center gap-4 md:gap-22 w-full max-w-full mx-auto overflow-hidden">
              {/* Previous Card (Left) - Partially Visible */}
              <div className="hidden md:block shrink-0 w-[120px] lg:w-[180px] h-[300px] lg:h-[400px] rounded-lg overflow-hidden transition-all duration-500 relative">
                {prevCard?.image ? (
                  <Image
                    src={getStrapiMedia(prevCard.image.url) || "/placeholder.svg"}
                    alt={prevCard.image.alternativeText || prevCard.title}
                    fill
                    className="object-cover"
                  />
                ) : prevCard?.videoUrl ? (
                  <video
                    src={`${prevCard.videoUrl}#t=0.1`}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted
                    playsInline
                  />
                ) : null}
              </div>

              {/* Current Card (Center) */}
              <div className="relative shrink-0 w-full max-w-[960px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[960px] rounded-xl overflow-hidden shadow-2xl transition-all duration-500">
                {/* Media Container */}
                <div className="relative aspect-16/10 md:aspect-video">
                  {current.videoUrl ? (
                    <>
                      {/* Video element */}
                      <video
                        ref={videoRef}
                        src={current.videoUrl}
                        className={`w-full h-full object-cover ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                        onEnded={() => setIsPlaying(false)}
                        playsInline
                        preload="metadata"
                      />
                      {/* Video preview (first frame) as thumbnail */}
                      {!isPlaying && (
                        <video
                          src={`${current.videoUrl}#t=0.1`}
                          className="absolute inset-0 w-full h-full object-cover"
                          preload="metadata"
                          muted
                          playsInline
                        />
                      )}
                      {/* Play Button Overlay - only for video */}
                      {!isPlaying && (
                        <button
                          onClick={handlePlayVideo}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors z-10"
                          aria-label="Play video"
                        >
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 md:w-8 md:h-8 text-indesso-dark-blue ml-1" fill="currentColor" />
                          </div>
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Image only - no play button */}
                      {current.image && (
                        <Image
                          src={getStrapiMedia(current.image.url) || "/placeholder.svg"}
                          alt={current.image.alternativeText || current.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </>
                  )}
                </div>

                {/* Content Overlay - Glass Effect at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-indesso-dark-blue/80 glass-video p-4 md:p-6">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-plus-bold text-white mb-2">
                    {current.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed line-clamp-2">
                    {current.text}
                  </p>
                </div>

                {/* Card Border Glow Effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-white/20 pointer-events-none" />
              </div>

              {/* Next Card (Right) - Partially Visible */}
              <div className="hidden md:block shrink-0 w-[120px] lg:w-[180px] h-[300px] lg:h-[400px] rounded-lg overflow-hidden transition-all duration-500 relative">
                {nextCard?.image ? (
                  <Image
                    src={getStrapiMedia(nextCard.image.url) || "/placeholder.svg"}
                    alt={nextCard.image.alternativeText || nextCard.title}
                    fill
                    className="object-cover"
                  />
                ) : nextCard?.videoUrl ? (
                  <video
                    src={`${nextCard.videoUrl}#t=0.1`}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted
                    playsInline
                  />
                ) : null}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 lg:right-47 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsPlaying(false)
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white w-6 md:w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Text */}
      <div className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="inline-block border border-indesso-dark-blue text-indesso-dark-blue px-6 sm:px-8 md:px-100 py-4 text-sm md:text-base rounded-[2px] font-manrope-bold">
            {ctaText}
          </p>
        </div>
      </div>
    </section>
  )
}

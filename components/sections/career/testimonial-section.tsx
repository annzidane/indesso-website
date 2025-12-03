"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import type { CareerPageProps } from "@/types/strapi"

interface TestimonialSectionProps {
  data: CareerPageProps["testimonial"]
}

export function TestimonialSection({ data }: TestimonialSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = data.testimonials

  if (testimonials.length === 0) {
    return null
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonial" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <SectionLabel variant="bubble" className="mb-6">
              {data.eyebrow}
            </SectionLabel>
            <h2 className="font-plus-bold text-5xl md:text-4xl lg:text-5xl text-indesso-dark-blue mb-12">
              {data.title}
            </h2>

            <blockquote className="font-plus-semibold text-[28px] italic md:text-2xl text-indesso-blue mb-6 leading-relaxed">
              "...{currentTestimonial.quoteTitle}..."
            </blockquote>

            <p className="font-manrope-regular text-grey text-[16px] md:text-base leading-relaxed mb-8">
              {currentTestimonial.quote}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-indesso-blue/10 flex items-center justify-center">
                {currentTestimonial.profileImage ? (
                  <Image
                    src={currentTestimonial.profileImage.url}
                    alt={currentTestimonial.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="font-plus-bold text-indesso-blue">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="font-plus-bold text-indesso-dark-blue">{currentTestimonial.name}</p>
                <p className="font-manrope-medium text-sm text-indesso-blue">{currentTestimonial.position}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm text-gray-500">
                  {String(currentIndex + 1).padStart(2, "0")}/{String(testimonials.length).padStart(2, "0")}
                </span>
                <div className="relative w-[416px] h-1 bg-gray-200 rounded overflow-hidden">
                  <div 
                    className="absolute top-0 h-full bg-indesso-dark-blue rounded transition-all duration-300"
                    style={{ 
                      width: `${(1 / testimonials.length) * 100}%`,
                      left: `${(currentIndex / testimonials.length) * 100}%`
                    }}
                  />
                </div>
              </div>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-indesso-dark-blue flex items-center justify-center hover:bg-indesso-dark-blue hover:text-white transition-colors text-indesso-dark-blue"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-[600px] h-[400px] md:h-[640px] rounded-lg overflow-hidden">
            <Image
              src={currentTestimonial.image ? currentTestimonial.image.url : "/placeholder.svg"}
              alt="Employee at work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

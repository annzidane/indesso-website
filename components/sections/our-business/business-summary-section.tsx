"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStrapiMedia } from "@/lib/strapi/client";
import type { BusinessSummarySectionData } from "@/types/strapi";
import { SectionLabel } from "@/components/ui/section-label";
import { BadgeGlass } from "@/components/ui/badge-glass";

interface BusinessSummarySectionProps {
  data: BusinessSummarySectionData;
}

export function BusinessSummarySection({ data }: BusinessSummarySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHotSpotVisible, setIsHotSpotVisible] = useState(false);
  const slides = data.slidder || [];
  const currentSlide = slides[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsHotSpotVisible(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsHotSpotVisible(false);
  };

  // Check if has subsidiary content (text or logo)
  const hasSubsidiaryContent =
    currentSlide?.Subsidiary_text?.length || currentSlide?.partner_logo;

  return (
    <section className="bg-[url('/feature-bg.png')] object-cover object-top bg-no-repeat">
      {/* Summary Header */}
      <div className="relative container mx-auto px-4 pt-12 md:pt-16 lg:pt-24">
        {/* Header Section */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <SectionLabel
            variant="bubble"
            className="mb-3 md:mb-4 !tracking-[2px] sm:!tracking-[4px]"
          >
            {data.eyebrow}
          </SectionLabel>
          <h2 className="font-plus-bold text-[28px] md:text-4xl lg:text-5xl text-indesso-dark-blue leading-[36px] md:leading-tight tracking-[-1px] mb-4 md:mb-6">
            {data.title}
          </h2>
          <p className="font-manrope-regular text-[14px] md:text-[16px] text-dark-grey leading-[24px] md:leading-relaxed max-w-2xl">
            {data.description}
          </p>
        </div>
      </div>

      {/* Slider - Responsive with proper mobile padding */}
      {slides.length > 0 && currentSlide && (
        <div className="relative px-4 md:px-[100px] pb-12 md:pb-16">
          {/* Mobile: 328/520 aspect ratio from Figma, Desktop: 16/9 */}
          <div className="relative w-full max-w-[1240px] mx-auto rounded-[10px] overflow-hidden aspect-[328/520] md:aspect-[16/9]">
            {/* Background Image */}
            <Image
              src={getStrapiMedia(currentSlide.image?.url || null)}
              alt={currentSlide.title}
              fill
              className="object-cover"
            />

            {/* Gradient Overlay - bottom gradient on mobile, left on desktop */}
            <div className="absolute inset-0 md:inset-y-0 md:left-0 md:right-auto md:w-2/5 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            {/* Glass Content Panel - Full width bottom on mobile, left side on desktop */}
            <div className="absolute bottom-0 left-0 right-0 md:right-auto w-full md:max-w-[480px] glass-dark m-0 md:rounded-tr-lg">
              <div className="p-3 md:p-6 lg:p-8">
                {/* Title with italic style like design */}
                <h3 className="font-plus-bold italic text-[18px] md:text-2xl lg:text-[28px] text-white mb-1.5 md:mb-4 leading-[24px] md:leading-tight tracking-[-1px]">
                  {currentSlide.title}
                </h3>

                {/* Description */}
                <p className="text-white/80 font-manrope-regular text-[12px] md:text-base leading-[16px] md:leading-relaxed">
                  {currentSlide.description}
                </p>

                {/* Divider - only show if has subsidiary content */}
                {hasSubsidiaryContent && (
                  <div className="border-t border-white/20 my-2 md:my-4" />
                )}

                {/* Subsidiary Section */}
                {hasSubsidiaryContent && (
                  <div className="flex items-center justify-between gap-4">
                    {/* Subsidiary Text */}
                    {currentSlide.Subsidiary_text &&
                      currentSlide.Subsidiary_text.length > 0 && (
                        <div className="text-white/80 text-[11px] md:text-sm">
                          {currentSlide.Subsidiary_text.map((block, idx) => (
                            <p key={idx}>
                              {block.children?.map((child, cidx) => (
                                <span
                                  key={cidx}
                                  className={child.bold ? "font-bold" : ""}
                                >
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
                        className="h-6 md:h-8 w-auto object-contain"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Arrows - Inside glass panel at bottom right on mobile */}
              {slides.length > 1 && (
                <div className="flex md:hidden items-center justify-end gap-2 px-4 pb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="rounded-full w-10 h-10 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="rounded-full w-10 h-10 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Center Icon with Pulse Effect - Hidden on mobile, visible on desktop */}
            {data.icon && (
              <div
                className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                onMouseEnter={() => setIsHotSpotVisible(true)}
                onMouseLeave={() => setIsHotSpotVisible(false)}
              >
                {/* Pulse rings animation */}
                <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16">
                  {/* Outer pulse ring - subtle */}
                  <div
                    className="absolute rounded-full bg-white/15 animate-ping w-10 h-10 md:w-14 md:h-14"
                    style={{ animationDuration: "2s" }}
                  />
                  {/* Middle pulse ring */}
                  <div className="absolute rounded-full bg-white/20 animate-pulse w-9 h-9 md:w-12 md:h-12" />

                  {/* Icon - directly without shadow */}
                  <Image
                    src={getStrapiMedia(data.icon.url)}
                    alt={data.icon.alternativeText || "Feature Icon"}
                    width={64}
                    height={64}
                    className="relative w-12 h-12 md:w-16 md:h-16 object-contain hover:scale-110 transition-transform"
                  />
                </div>

                {/* Hot Spot Badge - shows on hover - Desktop only */}
                {isHotSpotVisible && currentSlide.hot_spot && (
                  <div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 mt-4 ml-[250px] z-20 animate-in fade-in slide-in-from-top-2 duration-300">
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

            {/* Navigation Arrows - Desktop only - Bottom Right */}
            {slides.length > 1 && (
              <div className="hidden md:flex absolute bottom-6 right-6 items-center gap-2">
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
  );
}

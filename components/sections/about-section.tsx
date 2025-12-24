"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { getStrapiMedia } from "@/lib/strapi/api";
import type { AboutSectionProps as AboutSectionDataProps } from "@/types/strapi";
import type { Locale } from "@/lib/i18n/config";

interface AboutSectionProps {
  data: AboutSectionDataProps;
  locale: Locale;
}

export function AboutSection({ data, locale }: AboutSectionProps) {
  const featureImageUrl = data.featureImage
    ? getStrapiMedia(data.featureImage.url)
    : "/placeholder.svg";

  const backgroundImageUrl = data.backgroundImage
    ? getStrapiMedia(data.backgroundImage.url)
    : null;

  // Split description into subtitle (first paragraph) and body text (rest)
  const paragraphs = data.description.split("\n\n");
  // const subtitle = paragraphs[0] || "";
  const bodyParagraphs = paragraphs.slice(0);

  return (
    <>
      <style jsx>{`
        @media (max-width: 767px) {
          .about-section-bg {
            background-position: 52% -60% !important;
          }
        }
      `}</style>
      <section
        className="about-section-bg bg-white relative bg-no-repeat md:bg-cover md:bg-center min-h-[600px] md:min-h-[700px] lg:h-[836px] py-0 md:py-16 lg:py-12"
        style={
          backgroundImageUrl
            ? {
              backgroundImage: `url(${backgroundImageUrl})`,
            }
            : undefined
        }
      >
        <div className="container mx-auto px-0 md:px-4">
          <div className="grid lg:grid-cols-2 gap-0 md:gap-12 lg:gap-16 md:items-center">
            {/* Content */}
            <div className="order-2 lg:order-1 px-4 md:px-0 py-8 md:py-0">
              <SectionLabel variant="bubble" className="mb-3 md:mb-4">
                {data.label}
              </SectionLabel>
              <h2 className="font-plus-bold text-[28px] md:text-4xl lg:text-5xl text-primary leading-[36px] md:leading-tight tracking-[-1px] mb-4 md:mb-6">
                {data.title}
              </h2>
              {/* Subtitle - First paragraph with italic bold styling */}
              {/* {subtitle && (
                <h3 className="md:text-2xl lg:text-3xl text-primary leading-[32px] md:leading-tight tracking-[-1px] mb-3 md:mb-4">
                  {subtitle}
                </h3>
              )} */}
              {/* Body text - Remaining paragraphs */}
              <div className="flex flex-col gap-3 md:gap-4 text-muted-foreground font-manrope-regular text-[14px] md:text-base leading-[24px] md:leading-normal mb-4 md:mb-8">
                {bodyParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <Button
                asChild
                variant="outline"
                className="group bg-transparent h-10 md:h-14 px-4 md:px-6 py-2 md:py-[18px] gap-1 md:gap-2.5 rounded-sm border border-indesso-blue text-indesso-blue hover:bg-indesso-blue hover:text-white text-sm md:text-base"
              >
                <Link href={`/${locale}${data.ctaLink}`}>
                  {data.ctaText}
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* Highlight */}
              <div className="mt-6 md:mt-12 w-full max-w-[600px] h-auto md:h-[204px] bg-white p-4 md:p-8">
                <p className="font-manrope-regular text-muted-foreground text-xs md:text-base mb-1 md:mb-2">
                  {data.highlight.prefix}
                </p>
                <p className="font-plus-extrabold text-5xl md:text-5xl lg:text-6xl xl:text-7xl text-primary tracking-tight">
                  {data.highlight.value}
                </p>
                <p className="text-indesso-grey mt-1 md:mt-2 text-xs md:text-base">
                  {data.highlight.suffix}
                </p>
              </div>
            </div>

            {/* Feature Image */}
            <div className="order-1 lg:order-2 mt-4 h-[280px] sm:h-[320px] md:h-[500px] lg:h-[676px] w-full lg:w-[560px] mt-0 lg:mt-20 flex items-center justify-center">
              <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-full md:h-full md:aspect-4/5 rounded-none md:rounded-2xl overflow-hidden">
                <Image
                  src={featureImageUrl || "/placeholder.svg"}
                  alt={data.featureImage?.alternativeText || "About us"}
                  fill
                  className="object-contain md:object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

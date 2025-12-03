import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { AboutSectionProps as AboutSectionDataProps } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface AboutSectionProps {
  data: AboutSectionDataProps
  locale: Locale
}

export function AboutSection({ data, locale }: AboutSectionProps) {
  const featureImageUrl = data.featureImage 
    ? getStrapiMedia(data.featureImage.url) 
    : "/placeholder.svg"
  
  const backgroundImageUrl = data.backgroundImage 
    ? getStrapiMedia(data.backgroundImage.url) 
    : null

  return (
    <section 
      className="bg-background relative bg-cover bg-center bg-no-repeat min-h-[600px] md:min-h-[700px] lg:h-[836px] py-12 md:py-16 lg:py-0"
      style={backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : undefined}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <SectionLabel variant="bubble" className="mb-4">{data.label}</SectionLabel>
            <h2 className="font-plus-extrabold text-3xl md:text-4xl lg:text-5xl text-primary leading-tight tracking-tight mb-4 md:mb-6">
              {data.title}
            </h2>
            <div className="flex flex-col gap-3 md:gap-4 text-muted-foreground text-sm md:text-base mb-6 md:mb-8">
              {data.description.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Button 
              asChild 
              variant="outline" 
              className="group bg-transparent h-12 md:h-14 px-4 md:px-6 py-3 md:py-[18px] gap-2.5 rounded-sm border border-indesso-blue text-indesso-blue hover:bg-indesso-blue hover:text-white"
            >
              <Link href={`/${locale}${data.ctaLink}`}>
                {data.ctaText}
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {/* Highlight */}
            <div className="mt-8 md:mt-12 w-full max-w-[600px] h-auto md:h-[204px] bg-white p-6 md:p-8">
              <p className="font-manrope-regular text-muted-foreground text-sm md:text-base mb-2">{data.highlight.prefix}</p>
              <p className="font-plus-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary tracking-tight">{data.highlight.value}</p>
              <p className="color-grey mt-2 text-sm md:text-base">{data.highlight.suffix}</p>
            </div>
          </div>

          {/* Feature Image */}
          <div className="order-1 lg:order-2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[676px] w-full lg:w-[560px] mt-0 lg:mt-20">
            <div className="relative aspect-4/5 h-full rounded-2xl overflow-hidden">
              <Image
                src={featureImageUrl || "/placeholder.svg"}
                alt={data.featureImage?.alternativeText || "About us"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

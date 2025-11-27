import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { AboutSection as AboutSectionType } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface AboutSectionProps {
  data: AboutSectionType
  locale: Locale
}

export function AboutSection({ data, locale }: AboutSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <SectionLabel className="mb-4">{data.label}</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight mb-6 text-balance">
              {data.title}
            </h2>
            <div className="prose prose-lg text-muted-foreground mb-8">
              {data.description.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Button asChild variant="outline" className="group bg-transparent">
              <Link href={`/${locale}${data.ctaLink}`}>
                {data.ctaText}
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {/* Highlight */}
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-2">{data.highlight.prefix}</p>
              <p className="font-serif text-6xl lg:text-7xl text-primary font-bold">{data.highlight.value}</p>
              <p className="text-muted-foreground mt-2">{data.highlight.suffix}</p>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={getStrapiMedia(data.image.url) || "/placeholder.svg"}
                alt={data.image.alternativeText || "About us"}
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

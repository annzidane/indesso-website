import Image from "next/image"
import Link from "next/link"
import { Play, Award } from "lucide-react"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { HeroSection as HeroSectionType } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface HeroSectionProps {
  data: HeroSectionType
  locale: Locale
}

export function HeroSection({ data, locale }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          // src={getStrapiMedia(data.backgroundImage.url) || "/placeholder.png"}
          src={"/placeholder.png"}
          alt={data.backgroundImage.alternativeText || "Hero background"}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-8 text-balance">
            {data.headline}
          </h1>

          {/* CTA Button */}
          <Link href={`/${locale}${data.ctaLink}`} className="inline-flex items-center gap-3 text-white group">
            <span className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Play className="h-5 w-5 ml-1" fill="currentColor" />
            </span>
            <span className="text-sm font-medium tracking-wider uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-white" />
              {data.ctaText}
            </span>
          </Link>
        </div>
      </div>

      {/* Badge */}
      {data.badge && (
        <div className="absolute b-[48px] t-[584px] r-[100px] l-[878px] lg:bottom-16 lg:right-16">
          <div 
            className="w-[462px] h-32 p-6 shadow-2xl flex items-center gap-6 shrink-0"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)', 
              backdropFilter: 'blur(20px)',
              border: '2px solid transparent',
              borderImageSource: 'linear-gradient(124.41deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.4) 100%)',
              borderImageSlice: 1,
              borderRadius: '10px',
            }}
          >
            <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center shrink-0 border border-white/50">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-xl">{data.badge.title}</p>
              <p className="text-sm text-white/80 mt-1">{data.badge.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

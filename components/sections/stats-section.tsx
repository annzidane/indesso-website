import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import { cn } from "@/lib/utils"
import type { StatsSection as StatsSectionType, StatItem } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface StatsSectionProps {
  data: StatsSectionType
  locale: Locale
}

export function StatsSection({ data, locale }: StatsSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <SectionLabel className="mb-4">{data.label}</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight mb-4 text-balance">
            {data.title}
          </h2>
          <p className="text-muted-foreground">{data.description}</p>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Row 1: 3 stat cards */}
          <StatCard stat={data.stats[0]} variant="default" />
          <StatCard stat={data.stats[1]} variant="default" />
          <StatCard stat={data.stats[2]} variant="highlight" className="bg-accent text-white" />

          {/* Row 2: small stat + 2 image cards */}
          <StatCard stat={data.stats[3]} variant="small" />
          <StatCard stat={data.stats[4]} variant="image" className="row-span-2" />
          <StatCard stat={data.stats[5]} variant="image" />

          {/* Row 3: large image card with stat overlay */}
          <StatCard stat={data.stats[6]} variant="image-overlay" className="col-span-2 md:col-span-1" />
        </div>
      </div>
    </section>
  )
}

interface StatCardProps {
  stat: StatItem
  variant?: "default" | "highlight" | "small" | "image" | "image-overlay"
  className?: string
}

function StatCard({ stat, variant = "default", className }: StatCardProps) {
  if (variant === "image" && stat.image) {
    return (
      <div className={cn("relative rounded-xl overflow-hidden min-h-[200px]", className)}>
        <Image
          src={getStrapiMedia(stat.image.url) || "/placeholder.svg"}
          alt={stat.image.alternativeText || stat.label}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-3xl font-bold">{stat.value}</p>
          <p className="text-sm font-medium">{stat.label}</p>
          {stat.description && <p className="text-xs text-white/70 mt-1">{stat.description}</p>}
        </div>
      </div>
    )
  }

  if (variant === "image-overlay" && stat.image) {
    return (
      <div className={cn("relative rounded-xl overflow-hidden min-h-[250px]", className)}>
        <Image
          src={getStrapiMedia(stat.image.url) || "/placeholder.svg"}
          alt={stat.image.alternativeText || stat.label}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs uppercase tracking-wider mb-1">Embracing more than</p>
          <p className="text-4xl font-bold">{stat.value}</p>
          <p className="text-sm font-medium">{stat.label}</p>
          {stat.description && <p className="text-xs text-white/80 mt-1">{stat.description}</p>}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-xl p-6",
        variant === "highlight" ? "bg-accent text-white" : "bg-white border border-border",
        variant === "small" && "flex flex-col justify-center",
        className,
      )}
    >
      <p
        className={cn(
          "font-bold",
          variant === "small" ? "text-2xl" : "text-3xl lg:text-4xl",
          variant === "highlight" ? "text-white" : "text-primary",
        )}
      >
        {stat.value}
      </p>
      <p className={cn("text-sm font-medium mt-1", variant === "highlight" ? "text-white/90" : "text-foreground")}>
        {stat.label}
      </p>
      {stat.description && (
        <p className={cn("text-xs mt-2", variant === "highlight" ? "text-white/70" : "text-muted-foreground")}>
          {stat.description}
        </p>
      )}
    </div>
  )
}

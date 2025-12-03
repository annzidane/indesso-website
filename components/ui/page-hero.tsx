import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { StrapiImage } from "@/types/strapi"
import { cn } from "@/lib/utils"

interface PageHeroProps {
  title: string
  backgroundImage?: StrapiImage
  backgroundUrl?: string
  className?: string
}

export function PageHero({ title, backgroundImage, backgroundUrl, className }: PageHeroProps) {
  const bgUrl = backgroundImage 
    ? getStrapiMedia(backgroundImage.url) 
    : backgroundUrl || "/placeholder.svg?height=400&width=1920"

  return (
    <section className={cn(
      "relative h-[40vh] min-h-[480px] flex items-center overflow-hidden",
      className
    )}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bgUrl || "/placeholder.svg"}
          alt={backgroundImage?.alternativeText || "Page hero background"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 from-primary/80 to-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <h1 className="font-plus-semibold text-4xl sm:text-5xl md:text-6xl text-white">{title}</h1>
      </div>
    </section>
  )
}

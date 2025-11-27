import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { StrapiImage } from "@/types/strapi"

interface AboutHeroProps {
  title: string
  backgroundImage: StrapiImage
}

export function AboutHero({ title, backgroundImage }: AboutHeroProps) {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={
            getStrapiMedia(backgroundImage.url) ||
            "/placeholder.svg?height=400&width=1920&query=green tea plantation aerial view"
          }
          alt={backgroundImage.alternativeText || "About Us hero"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">{title}</h1>
      </div>
    </section>
  )
}

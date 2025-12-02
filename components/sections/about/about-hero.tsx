import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { StrapiImage } from "@/types/strapi"

interface AboutHeroData {
  title: string
  backgroundImage?: StrapiImage
}

interface AboutHeroProps {
  data: AboutHeroData
}

export function AboutHero({ data }: AboutHeroProps) {
  const backgroundUrl = data.backgroundImage 
    ? getStrapiMedia(data.backgroundImage.url) 
    : "/placeholder.svg?height=400&width=1920"

  return (
    <section className="relative h-[40vh] min-h-[480px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundUrl || "/placeholder.svg"}
          alt={data.backgroundImage?.alternativeText || "About Us hero"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <h1 className="font-plus-semibold text-4xl sm:text-5xl md:text-6xl text-white">{data.title}</h1>
      </div>
    </section>
  )
}

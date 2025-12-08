import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import { toSlug } from "@/lib/strapi/utils"
import type { CareerPageProps } from "@/types/strapi"

interface JoinUsProps {
  data: CareerPageProps["joinUs"]
  locale: string
}

export function JoinUs({ data, locale }: JoinUsProps) {
  const imageUrl = data.image 
    ? getStrapiMedia(data.image.url) 
    : "/hands-planting-seedling-in-soil-close-up-nature.jpg"

  return (
    <section id={toSlug(data.eyebrow)} className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-indesso-dark-blue/90 to-indesso-dark-blue z-0" />
          
          {/* Wave decoration - top right */}
          <div className="absolute top-0 right-0 z-20 hidden sm:block">
            <Image
              src="/border-right.png"
              alt=""
              width={272}
              height={150}
              className="object-contain mix-blend-soft-light opacity-50 w-[150px] md:w-[200px] lg:w-[272px]"
            />
          </div>
          
          {/* Wave decoration - bottom left */}
          <div className="absolute bottom-0 left-0 z-20 hidden sm:block">
            <Image
              src="/border-left.png"
              alt=""
              width={384}
              height={151}
              className="object-contain mix-blend-soft-light opacity-50 w-[200px] md:w-[280px] lg:w-[384px]"
            />
          </div>

          {/* Content Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[500px]">
            {/* Image Side */}
            <div className="relative h-[200px] sm:h-[250px] md:h-auto">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={data.image?.alternativeText || "Join Us"}
                fill
                className="object-cover"
              />
            </div>

            {/* Text Content Side */}
            <div className="flex glass-card flex-col justify-center items-start p-6 sm:p-8 md:p-12 lg:p-16">
              <SectionLabel variant="bubble-light" className="mb-4 md:mb-6">
                {data.eyebrow}
              </SectionLabel>
              <h2 className="font-plus-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 leading-tight">
                {data.title}
              </h2>
              <p className="font-manrope-regular text-white/80 text-sm md:text-base mb-6 md:mb-8 leading-relaxed max-w-lg">
                {data.description}
              </p>
              {data.button && (
                <div>
                  <Link href={`/${locale}${data.button.path}`}>
                    <Button
                      variant="outline"
                      className="
                        bg-transparent
                        text-white text-sm md:text-[16px]
                        border border-white
                        hover:bg-white hover:text-indesso-dark-blue
                        transition-colors
                        w-full sm:w-[233px] h-12 md:h-14
                        rounded-[2px]
                        px-4 md:px-6 py-3 md:py-[18px]
                        flex items-center justify-center gap-2.5
                      "
                    >
                      {data.button.title}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

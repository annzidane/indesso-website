import Image from "next/image"
import Link from "next/link"
import { getStrapiMedia } from "@/lib/strapi/client"
import { Button } from "@/components/ui/button"
import type { OurCatalogSectionData } from "@/types/strapi"
import { SectionLabel } from "@/components/ui/section-label"

interface OurCatalogSectionProps {
  data: OurCatalogSectionData
}

export function OurCatalogSection({ data }: OurCatalogSectionProps) {
  const backgroundUrl = getStrapiMedia(data.background_image?.url || null)
  const imageUrl = getStrapiMedia(data.image?.url || null)

  // Extract text from rich text blocks
  const paragraphs = data.text?.map((block) =>
    block.children?.map((child) => child.text).join("") || ""
  ) || []

  return (
    <section 
        className="relative mx-auto my-16 rounded-3xl overflow-hidden"
        style={{ width: "1240px", height: "600px" }}
    >
    {/* Background Image */}
        <div className="absolute inset-0">
            <Image
            src={backgroundUrl}
            alt="Background"
            fill
            className="object-cover"
            />
        </div>

        {/* FULL LEFT GLASS PANEL */}
        <div
            className="
            absolute 
            inset-y-0 
            left-0 
            w-[55%] 
            glass-dark
            overflow-hidden
            "
            style={{
                borderTopLeftRadius: "24px",
                borderBottomLeftRadius: "24px",
                borderBottomRightRadius: "80px",
                borderTopRightRadius: "0px",
                overflow: "hidden",
            }}
        />

        {/* CONTENT */}
        <div className="relative z-10 h-full px-12 md:px-16 py-10 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full items-center">

            {/* LEFT CONTENT */}
            <div className="max-w-xl text-white">
                <SectionLabel variant="bubble-light" className="mb-4">
                {data.eyebrow}
                </SectionLabel>

                <h2 className="text-4xl md:text-5xl font-plus-bold leading-tight mb-6">
                {data.title}
                </h2>

                <div className="space-y-4 mb-8">
                    {paragraphs.map((text, idx) => (
                        <p 
                        key={idx}
                        className="text-white/80 text-base font-manrope-regular leading-relaxed"
                        >
                        {text}
                        </p>
                    ))}
                </div>

                {data.button && (
                    <Button
                    asChild
                    className="
                        bg-transparent
                        border border-white 
                        text-white
                        hover:bg-white/10
                        hover:text-white
                        rounded-[1px]
                        px-6 py-6
                        transition-colors
                    "
                    >
                    <Link href={data.button.path || "/"}>
                        {data.button.title}
                    </Link>
                    </Button>
                )}
            </div>

            {/* RIGHT IMAGE */}
            <div className="hidden md:flex justify-end items-center">
                <div className="relative w-[520px] h-[520px] -mr-10">
                <Image
                    src={imageUrl}
                    alt={data.image?.alternativeText || 'Catalog Image'}
                    fill
                    className="object-contain object-right"
                />
                </div>
            </div>

            </div>
        </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"

interface VisitorCenterProps {
  data?: any
}

function richTextToParagraphs(richText: any): string[] {
  if (!richText || !Array.isArray(richText)) return []
  return richText.map((block: any) => {
    return (block.children || []).map((c: any) => c.text).join("")
  }).filter(Boolean)
}

export function VisitorCenterSection({ data }: VisitorCenterProps) {
  const paragraphs = richTextToParagraphs(data?.description)

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <div className="relative w-full aspect-[4/3] md:aspect-auto md:w-[600px] md:h-[560px] rounded-lg overflow-hidden">
            <Image
              src={data?.image?.url ?? "/contact-us/visitor-center-featured.png"}
              alt={data?.title ?? "A Gateway to Science and Creativity"}
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Content */}
          <div>
            <SectionLabel variant="bubble" className="mb-4 md:mb-6">
              {data?.eyebrow ?? "INDESSO VISITOR CENTER"}
            </SectionLabel>
            <h2
              className="font-plus-bold text-indesso-dark-blue text-[28px] md:text-[32px] lg:text-[48px] mb-4 md:mb-6"
            >
              {data?.title ?? "A Gateway to Science and Creativity"}
            </h2>
            <div className="space-y-4 font-manrope-regular text-[14px] md:text-[16px] text-indesso-dark-grey leading-[24px] md:leading-relaxed">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <>
                  <p>
                    Located within the largest essential oil manufacturing complex in Indonesia, the Indesso Visitor Center is open to anyone in the aroma or essential oil industry. Visitors can discover essential information on aromatics, plants, sustainable sourcing, production processes, and product applications.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

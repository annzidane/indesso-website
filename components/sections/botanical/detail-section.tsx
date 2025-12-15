"use client"

import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"

interface BotanicalDetailsProps {
  whatIsImage?: string
  expandableSections: { title: string; content: string }[]
}

export function BotanicalDetails({
  whatIsImage,
  expandableSections,
}: BotanicalDetailsProps) {
  const imageTwo = whatIsImage ? getStrapiMedia(whatIsImage) : "/placeholder-image.png"
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Text Content (long scroll, no accordion) */}
          <div>
            {/* Render all expandable sections as continuous content */}
            <div className="space-y-6">
              {expandableSections.map((section, index) => (
                <div key={index}>
                  <h4 className="text-3xl font-plus-bold text-indesso-blue italic mb-6">{section.title}</h4>
                  {(section.content || "").split(/\n+/).filter(Boolean).map((p, i) => (
                    <p key={i} className="text-indesso-dark-grey leading-relaxed font-manrope-regular mb-4">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image — sticky on md+ so it stays visible while text scrolls */}
          <div className="md:sticky md:top-24 self-start">
            <div className="relative w-full lg:w-[520px] aspect-4/3">
              <Image src={imageTwo} alt="" fill className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

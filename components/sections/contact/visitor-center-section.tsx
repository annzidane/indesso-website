"use client"

import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"

export function VisitorCenterSection() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/contact-us/visitor-center-featured.png"
              alt="A Gateway to Science and Creativity"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Content */}
          <div>
            <SectionLabel variant="bubble" className="mb-4 md:mb-6">
              INDESSO VISITOR CENTER
            </SectionLabel>
            <h2
              className="font-plus-bold text-[28px] md:text-[32px] lg:text-[40px] mb-4 md:mb-6"
              style={{
                color: "#003557",
                lineHeight: "36px",
                letterSpacing: "-1px",
              }}
            >
              A Gateway to Science and Creativity
            </h2>
            <div className="space-y-4 font-manrope-regular text-[14px] md:text-[16px] text-[#555555] leading-[24px] md:leading-relaxed">
              <p>
                Indesso began developing the Indesso Visitor Center in December 2017 as a learning facility for students, partners, and the wider public to explore the world of essential oils. Built on the former Indesso office building that has stood steadily for over 5 years, it was given a new identity. The facade, finished with traditional Kudus wooden motifs, honors Gunawan, co-ring to his ties to Blitarian.
              </p>
              <p>
                Located within the largest essential oil manufacturing complex in Indonesia, the Indesso Visitor Center is open to anyone in the aroma or essential oil industry. Visitors can discover essential information on aromatics, plants, sustainable sourcing, production processes, and product applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

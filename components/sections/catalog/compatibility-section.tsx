"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { Product, ProductDetailSectionData } from "@/types/strapi"

interface CompatibilitySectionProps {
  applications: Product["industry_categories"]
  labels: ProductDetailSectionData
}

export function CompatibilitySection({ applications, labels }: CompatibilitySectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a3353] mb-4">{labels?.title_application}</h2>
          <p className="text-gray-600">{labels?.description_application}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#004080] text-white px-6 py-4 rounded-t-lg">
            <h3 className="font-bold">{labels?.title_accordion}</h3>
          </div>

          <div className="border border-gray-200 rounded-b-lg">
            {applications?.map((app, index) => (
              <div key={app.id} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#E8F4F8] flex items-center justify-center text-[#004080] text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-[#1a3353]">{app.name}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    <p className="ml-11">
                      This application utilizes the unique properties of this ingredient to enhance
                      product performance and sensory experience.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

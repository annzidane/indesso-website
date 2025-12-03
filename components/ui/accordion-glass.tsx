"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AccordionItem {
  id: number
  title: string
  content: string
}

interface AccordionGlassProps {
  items: AccordionItem[]
  defaultOpenIndex?: number | null
  className?: string
}

export function AccordionGlass({ items, defaultOpenIndex = 0, className }: AccordionGlassProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  return (
    <div className={cn("rounded-xl overflow-hidden glass divide-y divide-white/20", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="transition-all duration-300"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left gap-2"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <span
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center shrink-0 border-indesso-blue bg-indesso-blue"
              >
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </span>
              <span className="font-plus-extrabold text-lg sm:text-xl md:text-[28px] italic text-white">{item.title}</span>
            </div>
            {openIndex === index ? (
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-white shrink-0" />
            )}
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openIndex === index ? "max-h-[500px]" : "max-h-0",
            )}
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pl-12 sm:pl-16 font-manrope-regular text-xs sm:text-sm md:text-[14px] text-white/90 leading-[1.7] whitespace-pre-line">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

export interface TabItem {
  id: string | number
  label: string
}

interface TabsNavigationProps {
  tabs: TabItem[]
  activeTab: number
  onTabChange: (index: number) => void
  className?: string
}

export function TabsNavigation({ tabs, activeTab, onTabChange, className }: TabsNavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Tabs Container */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex items-stretch gap-1.5 sm:gap-2.5 rounded p-1 overflow-x-auto scrollbar-hide"
        )}
        style={{
          background: "#F5F5F5",
          boxShadow: "inset 0px 4px 4px 0px rgba(0, 0, 0, 0.04)",
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(index)}
            className={cn(
              "flex-1 shrink-0 min-w-max py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm font-plus-semibold tracking-wider sm:tracking-widest uppercase transition-all duration-300 whitespace-nowrap",
              index === 0 ? "pl-12 pr-4 sm:pr-6 md:pr-8" : "px-4 sm:px-6 md:px-8",
              index === activeTab
                ? "bg-[#00548B] text-white rounded"
                : "text-[#A1A1A1] hover:text-[#003557]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Previous Button - Absolute overlay, only on mobile */}
      <button
        onClick={() => handleScroll('left')}
        className={cn(
          "md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-10",
          "w-10 h-10 flex items-center justify-center rounded-full",
          "text-white transition-all duration-300"
        )}
        style={{
          background: "linear-gradient(171.61deg, rgba(119, 119, 119, 0.168) 12.86%, rgba(228, 228, 228, 0.196) 87.14%)",
          border: "1px solid rgba(255, 255, 255, 0.32)",
        }}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next Button - Absolute overlay, only on mobile */}
      <button
        onClick={() => handleScroll('right')}
        className={cn(
          "md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-10",
          "w-10 h-10 flex items-center justify-center rounded-full",
          "text-white transition-all duration-300"
        )}
        style={{
          background: "linear-gradient(171.61deg, rgba(119, 119, 119, 0.168) 12.86%, rgba(228, 228, 228, 0.196) 87.14%)",
          border: "1px solid rgba(255, 255, 255, 0.32)",
        }}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

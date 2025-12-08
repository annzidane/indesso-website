"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface StickyNavItem {
  id: string
  label: string
}

interface StickyNavProps {
  items: StickyNavItem[]
  defaultActiveId?: string
  className?: string
}

export function StickyNav({ items, defaultActiveId, className }: StickyNavProps) {
  const [activeSection, setActiveSection] = useState(defaultActiveId || items[0]?.id || "")

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }))

      const scrollPosition = window.scrollY + 100 // Slightly above sticky nav height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className={cn("sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm", className)}>
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-[50px]">
        {/* Scrollable container for mobile/tablet */}
        <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex items-center justify-start lg:justify-center gap-0 min-w-max lg:min-w-0">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative shrink-0 h-12 sm:h-14 md:h-16 lg:h-20 px-3 sm:px-4 md:px-5 lg:px-6 py-2 md:py-4 text-[11px] sm:text-xs md:text-sm lg:text-base transition-colors flex items-center justify-center text-center whitespace-nowrap",
                  activeSection === item.id 
                    ? "font-plus-extrabold text-indesso-blue" 
                    : "font-plus-medium text-monochrome hover:text-indesso-blue",
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-indesso-blue" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

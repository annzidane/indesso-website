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

      // Account for header height + sticky nav height
      const scrollPosition = window.scrollY + 168

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
      // Responsive offset: header + sticky nav height
      // Mobile: 64px + 48px = 112px
      // Tablet/Desktop: 80px + 80px = 160px
      const isMobile = window.innerWidth < 768
      const offset = isMobile ? 120 : 168
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav 
      className={cn(
        "sticky z-40 bg-white border-b-2 border-gray-200 shadow-sm",
        // Position below header
        "top-16 md:top-20 lg:top-20",
        className
      )}
    >
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-[50px]">
        {/* Scrollable container for mobile/tablet */}
        <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div 
            className="
              flex 
              items-center 
              justify-start
              lg:justify-between
              gap-0
              w-full
            "
          >
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative shrink-0 px-3 sm:px-4 md:px-5 lg:px-6 py-2 md:py-4",
                  "text-center whitespace-normal wrap-break-words",
                  "max-w-[120px] sm:max-w-[140px] md:max-w-50",
                  "h-auto min-h-12 sm:min-h-14 md:min-h-16 lg:min-h-20",
                  activeSection === item.id 
                    ? 'font-plus-extrabold text-indesso-blue'
                    : 'font-plus-medium text-monochrome hover:text-indesso-blue'
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

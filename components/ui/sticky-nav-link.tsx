"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"

export interface StickyNavLinkItem {
  id: string
  label: string
  href: string
}

interface StickyNavLinkProps {
  items: StickyNavLinkItem[]
  activeId?: string
  className?: string
  basePath?: string // e.g., "/our-business" - will auto-generate href if not provided in items
}

export function StickyNavLink({ items, activeId, className, basePath }: StickyNavLinkProps) {
  const params = useParams()
  const locale = params.locale as string || "en"

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
            {items.map((item) => {
              const isActive = activeId === item.id
              // Use provided href or generate from basePath
              const href = item.href || (basePath ? `/${locale}${basePath}/${item.id}` : `/${locale}/${item.id}`)
              
              return (
                <Link
                  key={item.id}
                  href={href}
                  className={cn(
                    "relative shrink-0 px-3 sm:px-4 md:px-5 lg:px-6 py-2 md:py-4",
                    "text-center whitespace-normal wrap-break-words",
                    "max-w-[120px] sm:max-w-[140px] md:max-w-50",
                    "h-auto min-h-12 sm:min-h-14 md:min-h-16 lg:min-h-20",
                    "flex items-center justify-center",
                    "transition-colors duration-200",
                    isActive 
                      ? 'font-plus-extrabold text-indesso-blue'
                      : 'font-plus-medium text-monochrome hover:text-indesso-blue'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-indesso-blue" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

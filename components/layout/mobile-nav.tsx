"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { toSlug } from "@/lib/strapi/utils"
import type { HeaderMenu } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

export interface MobileNavProps {
  menus: HeaderMenu[]
  locale: Locale
  variant?: "transparent" | "solid"
  logo?: string
}

export function MobileNav({ menus, locale, variant = "transparent", logo }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<number | null>(null)
  const router = useRouter()
  const isTransparent = variant === "transparent"

  const toggleMenu = (menuId: number) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId)
  }

  // Calculate offset based on whether page has sticky nav (mobile values)
  const getScrollOffset = () => {
    const stickyNav = document.querySelector('nav.sticky')
    // Mobile header is 64px (h-16), sticky nav is ~56px on mobile
    if (stickyNav) {
      return 120 // header (64px) + sticky nav (~56px)
    }
    return 64 // header only (64px)
  }

  // Handle navigation with proper scroll offset
  const handleNavigation = (path: string, sectionSlug: string) => {
    setOpen(false)
    
    // Check if this is Our Business page - use subpage navigation instead of hash
    const isOurBusinessPage = path === "/our-business"
    
    if (isOurBusinessPage) {
      // For Our Business, navigate to subpage
      router.push(`/${locale}${path}/${sectionSlug}`)
      return
    }
    
    const fullPath = `/${locale}${path}`
    const currentPath = window.location.pathname

    if (currentPath === fullPath || currentPath === `${fullPath}/`) {
      // Same page - just scroll to section
      setTimeout(() => {
        const offset = getScrollOffset()
        const element = document.getElementById(sectionSlug)
        if (element) {
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 300)
    } else {
      // Different page - navigate then scroll
      router.push(`${fullPath}#${sectionSlug}`)
      
      setTimeout(() => {
        const offset = getScrollOffset()
        const element = document.getElementById(sectionSlug)
        if (element) {
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 400)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "lg:hidden transition-colors duration-300",
            isTransparent 
              ? "text-white/80 hover:text-white hover:bg-white/10" 
              : "text-indesso-blue hover:text-indesso-dark-blue hover:bg-indesso-blue/10"
          )}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        showCloseButton={false}
        className="w-full sm:w-[350px] p-0 border-0 bg-white overflow-y-auto"
      >
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <Link href={`/${locale}`} onClick={() => setOpen(false)}>
            <Image 
              src={logo || "/placeholder.svg"} 
              alt="Indesso Logo" 
              width={120} 
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button 
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-indesso-dark-grey hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col">
          {menus.map((item) => {
            const hasDetails = item.menu_detail && item.menu_detail.length > 0
            const isExpanded = expandedMenu === item.id

            return (
              <div key={item.id} className="border-b border-gray-200">
                {hasDetails ? (
                  <>
                    {/* Menu with accordion */}
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-6 py-4 text-left transition-colors",
                        isExpanded 
                          ? "text-indesso-blue border-b-4 border-indesso-blue bg-[#F7FCFF]" 
                          : "text-indesso-dark-blue"
                      )}
                    >
                      <span className="text-sm font-plus-semibold text-indesso-dark-blue uppercase">
                        {item.title}
                      </span>
                      <ChevronDown 
                        className={cn(
                          "h-5 w-5 text-indesso-blue transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )} 
                      />
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="bg-white">
                        {/* Description & Visit button */}
                        {item.description && (
                          <div className="px-6 py-4 border-b border-gray-100">
                            <p className="text-sm text-indesso-dark-grey mb-4 leading-relaxed">
                              {item.description}
                            </p>
                            {item.button && (
                              <Link
                                href={`/${locale}${item.path}`}
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center justify-center px-4 py-2 border border-indesso-dark-blue text-indesso-dark-blue font-plus-medium text-sm hover:bg-indesso-dark-blue hover:text-white transition-colors"
                              >
                                {item.button}
                              </Link>
                            )}
                          </div>
                        )}

                        {/* Menu detail items */}
                        <div className="bg-indesso-light-grey">
                          {item.menu_detail?.map((detail) => {
                            const sectionSlug = detail.slug || toSlug(detail.title)
                            return (
                              <button
                                key={detail.id}
                                onClick={() => handleNavigation(item.path, sectionSlug)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-70 transition-colors border-b border-gray-300"
                              >
                                <span className="text-sm font-plus-medium text-indesso-dark-blue">
                                  {detail.title}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Menu without details - direct link */
                  <Link
                    href={`/${locale}${item.path}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-6 py-4 text-indesso-dark-blue hover:text-indesso-blue transition-colors"
                  >
                    <span className="text-sm font-plus-semibold uppercase">
                      {item.title}
                    </span>
                    <ChevronRight className="h-5 w-5 text-indesso-blue" />
                  </Link>
                )}
              </div>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

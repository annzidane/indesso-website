"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X, ArrowRight } from "lucide-react"
import { getStrapiMedia } from "@/lib/strapi/api"
import { toSlug } from "@/lib/strapi/utils"
import type { HeaderMenu } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface MegaMenuProps {
  menu: HeaderMenu
  locale: Locale
  isOpen: boolean
  onClose: () => void
  isTransparent: boolean
}

export function MegaMenu({ menu, locale, isOpen, onClose, isTransparent }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Calculate offset based on whether page has sticky nav
  const getScrollOffset = () => {
    // Check if sticky nav exists on the page
    const stickyNav = document.querySelector('nav.sticky')
    if (stickyNav) {
      // Header (80px) + sticky nav (~80px) + padding
      return 160
    }
    // Header only (80px) + padding
    return 80
  }

  // Handle navigation with proper scroll offset
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string, sectionSlug: string) => {
    e.preventDefault()
    onClose()
    
    const fullPath = `/${locale}${path}`
    const currentPath = window.location.pathname

    if (currentPath === fullPath || currentPath === `${fullPath}/`) {
      // Same page - just scroll to section
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
    } else {
      // Different page - navigate then scroll
      router.push(`${fullPath}#${sectionSlug}`)
      
      // Wait for navigation and scroll with offset
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
      }, 100)
    }
  }

  if (!isOpen) return null

  const hasDetails = menu.menu_detail && menu.menu_detail.length > 0

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        style={{ top: "80px" }}
      />

      {/* Mega Menu Panel */}
      <div
        ref={menuRef}
        className={cn(
          "fixed left-0 right-0 z-50 bg-white shadow-2xl",
          "animate-in slide-in-from-top-2 fade-in duration-300"
        )}
        style={{ top: "80px" }}
      >
        <div className="w-full">
          <div className="flex">
            {/* Left Side - Menu Info with Image */}
            <div className="w-[560px] shrink-0 relative overflow-hidden">
              {/* Full Background Image */}
              {menu.image && (
                <div className="absolute inset-0">
                  <Image
                    src={getStrapiMedia(menu.image.url) || "/placeholder.svg"}
                    alt={menu.image.alternativeText || menu.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="relative z-10 h-[300px] glass">
                <div className="p-10 h-full flex flex-col justify-center">
                  <h2 className="text-[48px] font-plus-bold text-white mb-4">
                    {menu.title}
                  </h2>
                  <p className="text-indesso-light-grey text-[16px] text-manrope-regular leading-relaxed mb-6 max-w-md">
                    {menu.description}
                  </p>
                  
                  {menu.button && (
                    <Link
                      href={`/${locale}${menu.path}`}
                      onClick={onClose}
                      className="inline-flex items-center justify-center px-6 py-4 border border-white text-white font-plus-medium text-sm hover:bg-white hover:text-indesso-dark-blue transition-colors w-fit"
                    >
                      {menu.button}
                    </Link>
                  )}
                </div>
              </div>

              {/* Bottom Image Section - No glass overlay */}
              <div className="relative h-[calc(100%-304px)] min-h-[200px]">
                {/* Image shows through without overlay */}
              </div>
            </div>

            {/* Right Side - Menu Details */}
            <div className="flex-1 py-10 pl-10 pr-16 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-indesso-dark-grey" />
              </button>

              {/* Menu Detail Grid */}
              {hasDetails && (
                <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                  {menu.menu_detail?.map((detail) => {
                    // Use slug if provided, otherwise generate from title
                    const sectionSlug = detail.slug || toSlug(detail.title)
                    return (
                      <a
                        key={detail.id}
                        href={`/${locale}${menu.path}#${sectionSlug}`}
                        onClick={(e) => handleNavigation(e, menu.path, sectionSlug)}
                        className="group block cursor-pointer"
                      >
                        <h3 className="text-lg font-plus-semibold text-indesso-dark-blue mb-2 group-hover:text-indesso-blue transition-colors">
                          {detail.title}
                        </h3>
                        <p className="text-manrope-regular text-[14px] text-indesso-dark-grey mb-3 leading-relaxed">
                          {detail.description}
                        </p>
                        <span className="inline-flex items-center text-indesso-blue font-plus-medium text-sm group-hover:gap-2 transition-all">
                          {detail.button}
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </a>
                    )
                  })}
                </div>
              )}

              {/* Fallback if no details */}
              {!hasDetails && (
                <div className="flex items-center justify-center h-full">
                  <Link
                    href={`/${locale}${menu.path}`}
                    onClick={onClose}
                    className="text-lg font-plus-semibold text-indesso-blue hover:text-indesso-dark-blue"
                  >
                    Go to {menu.title} →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { MobileNav } from "@/components/layout/mobile-nav"
import { MegaMenu } from "@/components/layout/mega-menu"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { HeaderData, HeaderMenu } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface HeaderProps {
  data: HeaderData
  locale: Locale
  variant?: "transparent" | "solid"
}

export function Header({ data, locale, variant = "transparent" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<HeaderMenu | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleScroll = () => {
      // Trigger solid background after scrolling 50px
      setIsScrolled(window.scrollY > 50)
    }
    
    // Check initial scroll position
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mega menu when clicking outside header area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        // Don't close if clicking inside mega menu (handled by MegaMenu component)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Determine if header should be transparent based on variant and scroll
  const isTransparent = variant === "transparent" && !isScrolled && !activeMenu

  const handleMenuClick = (menu: HeaderMenu) => {
    // If menu has details, toggle mega menu; otherwise navigate directly
    if (menu.menu_detail && menu.menu_detail.length > 0) {
      setActiveMenu(activeMenu?.id === menu.id ? null : menu)
    } else {
      // For menus without details, let the Link handle navigation
      setActiveMenu(null)
    }
  }

  const closeMegaMenu = () => {
    setActiveMenu(null)
  }
  
  return (
    <>
      <header 
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 md:h-20 lg:h-20",
          "transition-all duration-300 ease-in-out",
          isScrolled || activeMenu
            ? "bg-white shadow-lg backdrop-blur-none" 
            : variant === "transparent" 
              ? "" 
              : "bg-white shadow-sm"
        )}
        style={!isScrolled && !activeMenu && variant === "transparent" ? {
          background: 'var(--navbar-background-style)',
          backdropFilter: 'var(--navbar-backdrop-filter-style)',
        } : undefined}
      >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo - with smooth transition */}
          <Link href={`/${locale}`} className="flex items-center relative">
            {/* White logo (for transparent state) */}
            <Image 
              src={getStrapiMedia(data.logo?.url)} 
              alt={data.logo?.alternativeText || "Indesso Logo"} 
              width={data.logo?.width || 179} 
              height={data.logo?.height || 64}
              className={cn(
                "w-[120px] md:w-[150px] lg:w-[179px] h-10 md:h-12 lg:h-16 object-contain transition-opacity duration-300",
                isTransparent ? "opacity-100" : "opacity-0 absolute"
              )}
              priority
            />
            {/* Full color logo (for solid state) */}
            <Image 
              src={getStrapiMedia(data.logo_fullcolor?.url)} 
              alt={data.logo_fullcolor?.alternativeText || "Indesso Logo"} 
              width={data.logo_fullcolor?.width || 179} 
              height={data.logo_fullcolor?.height || 64}
              className={cn(
                "w-[120px] md:w-[150px] lg:w-[179px] h-10 md:h-12 lg:h-16 object-contain transition-opacity duration-300",
                isTransparent ? "opacity-0 absolute" : "opacity-100"
              )}
              priority
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-12">
            {data.menus.map((item) => {
              const hasDetails = item.menu_detail && item.menu_detail.length > 0
              const isActive = activeMenu?.id === item.id

              if (hasDetails) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item)}
                    className={cn(
                      "font-plus-semibold text-[16px] transition-colors duration-300 flex items-center gap-1 uppercase",
                      isActive
                        ? "text-indesso-dark-blue"
                        : isTransparent 
                          ? "text-[#FFFFFFBF] hover:text-white" 
                          : "text-indesso-blue hover:text-indesso-dark-blue"
                    )}
                  >
                    {item.title}
                    {/* <ChevronDown 
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isActive && "rotate-180"
                      )} 
                    /> */}
                  </button>
                )
              }

              return (
                <Link
                  key={item.id}
                  href={`/${locale}${item.path}`}
                  className={cn(
                    "font-plus-semibold text-sm transition-colors duration-300",
                    isTransparent 
                      ? "text-[#FFFFFFBF] hover:text-white" 
                      : "text-indesso-blue hover:text-indesso-dark-blue"
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* Language Switcher & Mobile Nav */}
          <div className={cn(
            "font-plus-semibold flex items-center gap-2 md:gap-4 transition-colors duration-300",
            isTransparent ? "text-[#FFFFFFBF]" : "text-indesso-blue hover:text-indesso-dark-blue"
          )}>
            <LanguageSwitcher 
              locale={locale} 
              languages={data.lang} 
              variant={isTransparent ? "transparent" : "solid"} 
            />
            <MobileNav 
              logo={data.logo_fullcolor.url}
              menus={data.menus} 
              locale={locale} 
              variant={isTransparent ? "transparent" : "solid"}
            />
          </div>
        </div>
      </div>
    </header>

    {/* Mega Menu */}
    {activeMenu && (
      <MegaMenu
        menu={activeMenu}
        locale={locale}
        isOpen={!!activeMenu}
        onClose={closeMegaMenu}
        isTransparent={isTransparent}
      />
    )}
    </>
  )
}

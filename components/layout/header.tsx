import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { MobileNav } from "@/components/layout/mobile-nav"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { HeaderData } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface HeaderProps {
  data: HeaderData
  locale: Locale
  variant?: "transparent" | "solid"
}

export function Header({ data, locale, variant = "transparent" }: HeaderProps) {
  const isTransparent = variant === "transparent"
  const logo = isTransparent ? data.logo : data.logo_fullcolor
  const logoUrl = getStrapiMedia(logo?.url)
  
  return (
    <header 
      className={cn(
        "absolute top-0 left-0 right-0 z-50 h-[88px]",
        !isTransparent && "bg-white shadow-sm"
      )}
      style={isTransparent ? {
        background: 'var(--navbar-background-style)',
        backdropFilter: 'var(--navbar-backdrop-filter-style)',
      } : undefined}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image 
              src={logoUrl} 
              alt={logo?.alternativeText || "Indesso Logo"} 
              width={logo?.width || 179} 
              height={logo?.height || 64}
              className="w-[179px] h-16 object-contain"
              priority
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {data.menus.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}${item.path}`}
                className={cn(
                  "font-plus-semibold text-sm transition-colors",
                  isTransparent 
                    ? "text-[#FFFFFFBF] hover:text-white" 
                    : "text-indesso-blue hover:text-indesso-dark-blue"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Nav */}
          <div className={cn(
            "font-plus-semibold flex items-center gap-4",
            isTransparent ? "text-[#FFFFFFBF]" : "text-indesso-blue hover:text-indesso-dark-blue"
          )}>
            <LanguageSwitcher locale={locale} languages={data.lang} variant={variant} />
            <MobileNav menus={data.menus} locale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
}

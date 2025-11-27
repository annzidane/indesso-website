import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { MobileNav } from "@/components/layout/mobile-nav"
import type { NavigationItem } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface HeaderProps {
  navigation: NavigationItem[]
  locale: Locale
}

export function Header({ navigation, locale }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 h-[88px]"
      style={{
          background: 'var(--navbar-background-style)',
          backdropFilter: 'var(--navbar-backdrop-filter-style)',
        }}
      >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image 
              src="/logo-indesso.png" 
              alt="Indesso Logo" 
              width={179} 
              height={64}
              className="w-[179px] h-16 object-contain"
              priority
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}${item.href}`}
                className="text-section-label text-sm font-medium text-[#FFFFFFBF] hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Nav */}
          <div className="text-section-label flex items-center gap-4 text-[#FFFFFFBF]">
            <LanguageSwitcher locale={locale} />
            <MobileNav navigation={navigation} locale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
}

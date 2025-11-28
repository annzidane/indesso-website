import Link from "next/link"
import Image from "next/image"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { FooterData } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface FooterProps {
  data: FooterData
  locale: Locale
}

export function Footer({ data, locale }: FooterProps) {
  const logoUrl = data.logo ? getStrapiMedia(data.logo.url) : "/logo-indesso.png"

  // Split menu groups: first 4 for top row, rest for bottom row
  const topMenuGroups = data.footer_menus.slice(0, 4)
  const bottomMenuGroups = data.footer_menus.slice(4)

  return (
    <footer className="relative text-white h-[528px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background_footer.png')" }}
      />
    
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="container mx-auto px-4 py-10 flex-1">
          {/* Top Section: Company Info + First 4 Menu Groups */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-6">
            {/* Company Info - Logo & Description */}
            <div className="lg:col-span-2">
              <Link href={`/${locale}`} className="inline-block mb-4">
                <Image 
                  src={logoUrl}
                  alt={data.logo?.alternativeText || "Indesso Logo"}
                  width={data.logo?.width || 179}
                  height={data.logo?.height || 64}
                  className="h-16 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-white/70 max-w-xs">{data.description}</p>
            </div>

            {/* First 4 Menu Groups - Horizontal */}
            {topMenuGroups.map((menuGroup) => (
              <div key={menuGroup.id}>
                <h3 className="text-base font-semibold mb-4">
                  <Link 
                    href={`/${locale}${menuGroup.path}`}
                    className="hover:text-white/80 transition-colors"
                  >
                    {menuGroup.title}
                  </Link>
                </h3>
                <ul className="space-y-2">
                  {menuGroup.menus
                    .filter((menu) => menu.title && menu.path)
                    .map((menu) => (
                      <li key={menu.id}>
                        <Link
                          href={`/${locale}${menu.path}`}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {menu.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section: Contact Info + Remaining Menu Groups */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-6 mt-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Phone */}
              {data.contact_phone && (
                <div className="space-y-1">
                  <p className="text-base font-semibold">{data.contact_phone.phone_title}</p>
                  <p className="text-sm text-white/70">{data.contact_phone.phone_number}</p>
                </div>
              )}
              
              {/* Separator */}
              <div className="w-[280px] h-px bg-white/20" />
              
              {/* Contact Email */}
              {data.contact_email && (
                <div className="space-y-1">
                  <p className="text-base font-semibold">{data.contact_email.email_title}</p>
                  <p className="text-sm text-white/70">{data.contact_email.email}</p>
                </div>
              )}
            </div>
            
            {/* Remaining Menu Groups */}
            {bottomMenuGroups.map((menuGroup) => (
              <div key={menuGroup.id}>
                <h3 className="text-base font-semibold mb-4">
                  <Link 
                    href={`/${locale}${menuGroup.path}`}
                    className="hover:text-white/80 transition-colors"
                  >
                    {menuGroup.title}
                  </Link>
                </h3>
                <ul className="space-y-2">
                  {menuGroup.menus
                    .filter((menu) => menu.title && menu.path)
                    .map((menu) => (
                      <li key={menu.id}>
                        <Link
                          href={`/${locale}${menu.path}`}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {menu.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 bg-indesso-dark-blue">
          <div className="container mx-auto px-4 py-4">
            <p className="text-sm text-white text-center">{data.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

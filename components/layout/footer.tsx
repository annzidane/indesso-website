import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import type { FooterData } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface FooterProps {
  data: FooterData
  locale: Locale
}

export function Footer({ data, locale }: FooterProps) {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <svg viewBox="0 0 120 32" className="h-8 w-auto text-white" fill="currentColor">
                <text x="0" y="24" className="font-serif text-2xl font-bold">
                  indesso
                </text>
              </svg>
            </Link>
            <p className="text-sm text-white/70 mb-6 max-w-xs">{data.description}</p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Contact Us</p>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4" />
                {data.contactPhone}
              </div>
              <p className="text-sm font-medium mt-4">Email Address</p>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="h-4 w-4" />
                {data.contactEmail}
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          {data.columns.map((column) => (
            <div key={column.id}>
              <h3 className="text-sm font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-white/50 text-center">{data.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

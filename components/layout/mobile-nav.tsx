"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import type { HeaderMenu } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface MobileNavProps {
  menus: HeaderMenu[]
  locale: Locale
}

export function MobileNav({ menus, locale }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-inherit hover:bg-white/10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        showCloseButton={false}
        className="w-full sm:w-[350px] p-0 border-0 bg-indesso-dark-blue/95 backdrop-blur-md"
      >
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link href={`/${locale}`} onClick={() => setOpen(false)}>
            <Image 
              src="/indesso-logo-white.jpg" 
              alt="Indesso Logo" 
              width={120} 
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button 
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col px-6 py-6">
          {menus.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}${item.path}`}
              onClick={() => setOpen(false)}
              className="text-lg font-plus-medium text-white/80 hover:text-white transition-colors py-4 border-b border-white/10 last:border-0"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

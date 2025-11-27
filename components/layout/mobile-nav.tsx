"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import type { NavigationItem } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface MobileNavProps {
  navigation: NavigationItem[]
  locale: Locale
}

export function MobileNav({ navigation, locale }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-primary">
        <SheetTitle className="text-white">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-4 mt-8">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}${item.href}`}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-white/90 hover:text-white transition-colors py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

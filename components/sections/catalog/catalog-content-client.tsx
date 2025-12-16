"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Search, ChevronDown } from "lucide-react"
import { ProductCard } from "@/components/ui/product-card"
import type { Locale } from "@/lib/i18n/config"

interface Product {
  id: string
  category: string
  title: string
  description: string
  image: string
  badge?: string
}

interface Meta {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

interface CatalogContentClientProps {
  locale: Locale
  initialProducts: Product[]
  initialMeta: Meta
}

export function CatalogContentClient({ locale, initialProducts, initialMeta }: CatalogContentClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [currentPage, setCurrentPage] = useState(initialMeta?.pagination?.page || 1)
  const [products, setProducts] = useState<Product[]>(initialProducts || [])
  const [meta, setMeta] = useState<Meta>(initialMeta)
  const itemsPerPage = meta?.pagination?.pageSize || 12

  // Fetch products from server API when page/sort/search changes
  useEffect(() => {
    let active = true

    async function load() {
      const params = new URLSearchParams()
      params.set("locale", String(locale))
      params.set("page", String(currentPage))
      if (sortBy && sortBy !== "default") params.set("sortBy", sortBy)
      if (searchQuery) params.set("search", searchQuery)

      try {
        const res = await fetch(`/api/catalog/products?${params.toString()}`)
        if (!res.ok) return
        const body = await res.json()
        if (!active) return
        setProducts(body.data || [])
        setMeta(body.meta || { pagination: { page: 1, pageSize: itemsPerPage, pageCount: 1, total: 0 } })
      } catch (e) {
        // ignore
      }
    }

    load()
    return () => {
      active = false
    }
  }, [locale, currentPage, sortBy, searchQuery])

  const totalPages = meta ? Math.ceil(meta.pagination.total / meta.pagination.pageSize) : 1

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 300, behavior: "smooth" })
  }

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 md:mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555555]" />
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
              className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-[#EAEAEA] text-[#555555] placeholder:text-[#555555] border-0 rounded-[7px] focus:outline-none focus:ring-2 focus:ring-[#003557] focus:border-transparent font-manrope-regular text-sm md:text-base"
            />
          </div>

          <div className="relative w-full md:w-64">
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1) }}
              className="w-full appearance-none px-4 py-3 md:py-3.5 pr-10 bg-[#EAEAEA] text-[#555555] border-0 rounded-[7px] focus:outline-none focus:ring-2 focus:ring-[#003557] focus:border-transparent font-manrope-regular text-sm md:text-base cursor-pointer"
            >
              <option value="default">Sort by</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="category">Category</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555555] pointer-events-none" />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-manrope-regular text-sm md:text-base text-[#555555]">
            Showing {(meta?.pagination?.page - 1) * meta?.pagination?.pageSize + 1} - {Math.min((meta?.pagination?.page || 1) * (meta?.pagination?.pageSize || itemsPerPage), meta?.pagination?.total || 0)} of {meta?.pagination?.total || 0} products
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/our-catalog/${product.id}`}
                className="block transition-transform hover:scale-105"
              >
                <ProductCard
                  category={product.category}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  badge={product.badge}
                  className="cursor-pointer h-full"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-manrope-regular text-lg text-[#555555]">No products found matching your search.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <button
              onClick={() => goToPage((meta?.pagination?.page || 1) - 1)}
              disabled={(meta?.pagination?.page || 1) === 1}
              className="px-3 md:px-4 py-2 border border-[#EAEAEA] rounded-lg font-plus-bold text-sm md:text-base text-[#003557] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Prev
            </button>

            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number
                const tp = totalPages
                const cp = meta?.pagination?.page || 1
                if (tp <= 5) {
                  pageNum = i + 1
                } else if (cp <= 3) {
                  pageNum = i + 1
                } else if (cp >= tp - 2) {
                  pageNum = tp - 4 + i
                } else {
                  pageNum = cp - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-plus-bold text-sm md:text-base transition-colors cursor-pointer ${
                      (meta?.pagination?.page || 1) === pageNum
                        ? "bg-[#003557] text-white"
                        : "border border-[#EAEAEA] text-[#003557] hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => goToPage((meta?.pagination?.page || 1) + 1)}
              disabled={(meta?.pagination?.page || 1) === totalPages}
              className="px-3 md:px-4 py-2 border border-[#EAEAEA] rounded-lg font-plus-bold text-sm md:text-base text-[#003557] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

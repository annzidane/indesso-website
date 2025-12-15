"use client"

import { useState } from "react"
import { CatalogSearch } from "./catalog-search"
import { CatalogGrid } from "./catalog-grid"
import { CatalogPagination } from "./catalog-pagination"
import { catalogProducts } from "@/lib/data/catalog-data"

const ITEMS_PER_PAGE = 12

export function CatalogContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter products based on search
  const filteredProducts = catalogProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name)
    if (sortBy === "name-desc") return b.name.localeCompare(a.name)
    if (sortBy === "category") return a.category.localeCompare(b.category)
    return 0
  })

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <CatalogSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <CatalogGrid products={paginatedProducts} />

        <CatalogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </section>
  )
}

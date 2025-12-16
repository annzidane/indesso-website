"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import { Pagination } from "@/components/ui/pagination";
import type { Locale } from "@/lib/i18n/config";

interface Product {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
}

interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface CatalogContentProps {
  locale: Locale;
  initialProducts?: Product[];
  initialMeta?: Meta;
}

export function CatalogContent({ locale, initialProducts = [], initialMeta }: CatalogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(initialMeta?.pagination?.page || 1);
  const itemsPerPage = initialMeta?.pagination?.pageSize || 12;

  // Filter and sort based on initialProducts (client-side filtering)
  const filteredProducts = useMemo(() => {
    let products = [...initialProducts];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (product) =>
          product.title.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === "name-asc") {
      products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "name-desc") {
      products.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "category") {
      products.sort((a, b) => a.category.localeCompare(b.category));
    }

    return products;
  }, [initialProducts, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

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
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-[#EAEAEA] text-[#555555] placeholder:text-[#555555] border-0 rounded-[7px] focus:outline-none focus:ring-2 focus:ring-[#003557] focus:border-transparent font-manrope-regular text-sm md:text-base"
            />
          </div>

          <div className="relative w-full md:w-64">
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
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
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </p>
        </div>

        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/our-catalog/${product.slug}`}
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

        {/* Pagination (uses shared Pagination UI component) */}
        <div className="mt-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </div>
      </div>
    </section>
  );
}

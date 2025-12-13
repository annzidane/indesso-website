"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import type { Locale } from "@/lib/i18n/config";

interface Product {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
}

// Static catalog data
const catalogData: Product[] = [
  {
    id: "1",
    category: "Aroma Chemicals",
    title: "ALPHA CARYOPHYLLENE 900008",
    description: "Woody, Spicy, Clove, Oceanic-watery, slightly green",
    image: "/our-catalog/our-catalog-product-1.png",
    badge: "Cloves",
  },
  {
    id: "2",
    category: "Aroma Chemicals",
    title: "ALPHA CARYOPHYLLENE 900009",
    description: "Woody, Spicy, Clove, Oceanic-watery, slightly green",
    image: "/our-catalog/our-catalog-product-2.png",
    badge: "Cloves",
  },
  {
    id: "3",
    category: "Essential Oils",
    title: "BENZOIN SUMATRA ABSOLUTE PG 803105",
    description: "Sweet, Resinous, Balsamic, Vanilla-like, slightly woody",
    image: "/our-catalog/our-catalog-product-3.png",
    badge: "Benzoin",
  },
  {
    id: "4",
    category: "Essential Oils",
    title: "BENZOIN SUMATRA RESINOID SOAP 803103",
    description: "Sweet, Resinous, Balsamic, Vanilla-like, slightly woody",
    image: "/our-catalog/our-catalog-product-4.png",
    badge: "Benzoin",
  },
  {
    id: "5",
    category: "Essential Oils",
    title: "BLACK PEPPER OIL 488",
    description: "Spicy, Fresh, Pungent, Warm, slightly woody",
    image: "/our-catalog/our-catalog-product-5.png",
    badge: "Pepper",
  },
  {
    id: "6",
    category: "Aroma Chemicals",
    title: "CAMPHOR OIL LIGHT 802057",
    description: "Fresh, Camphoraceous, Penetrating, Minty, slightly woody",
    image: "/our-catalog/our-catalog-product-1.png",
    badge: "Camphor",
  },
  {
    id: "7",
    category: "Aroma Chemicals",
    title: "CAMPHOR OIL SAFROL 800045",
    description: "Fresh, Camphoraceous, Penetrating, Minty, slightly woody",
    image: "/our-catalog/our-catalog-product-2.png",
    badge: "Camphor",
  },
  {
    id: "8",
    category: "Essential Oils",
    title: "CAMPHOR FCC",
    description: "Fresh, Camphoraceous, Penetrating, Minty, slightly woody",
    image: "/our-catalog/our-catalog-product-3.png",
    badge: "Camphor",
  },
  {
    id: "9",
    category: "Aroma Chemicals",
    title: "CARYOPHYLLENE OXIDE 800045",
    description: "Woody, Spicy, Dry, Earthy, slightly sweet",
    image: "/our-catalog/our-catalog-product-4.png",
    badge: "Cloves",
  },
  {
    id: "10",
    category: "Essential Oils",
    title: "CINNAMON OIL 800001",
    description: "Sweet, Spicy, Warm, Cinnamon, slightly woody",
    image: "/our-catalog/our-catalog-product-5.png",
    badge: "Cinnamon",
  },
  {
    id: "11",
    category: "Aroma Chemicals",
    title: "ALPHA CARYOPHYLLENE 900010",
    description: "Woody, Spicy, Clove, Oceanic-watery, slightly green",
    image: "/our-catalog/our-catalog-product-1.png",
    badge: "Cloves",
  },
  {
    id: "12",
    category: "Essential Oils",
    title: "BENZOIN SUMATRA ABSOLUTE 803106",
    description: "Sweet, Resinous, Balsamic, Vanilla-like, slightly woody",
    image: "/our-catalog/our-catalog-product-2.png",
    badge: "Benzoin",
  },
];

interface CatalogContentProps {
  locale: Locale;
}

export function CatalogContent({ locale }: CatalogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = catalogData.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort products
    if (sortBy === "name-asc") {
      products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "name-desc") {
      products.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "category") {
      products.sort((a, b) => a.category.localeCompare(b.category));
    }

    return products;
  }, [searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when search or sort changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of catalog
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 md:mb-12">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555555]" />
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-[#EAEAEA] text-[#555555] placeholder:text-[#555555] border-0 rounded-[7px] focus:outline-none focus:ring-2 focus:ring-[#003557] focus:border-transparent font-manrope-regular text-sm md:text-base"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full md:w-64">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-manrope-regular text-sm md:text-base text-[#555555]">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
        </div>

        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
            {currentProducts.map((product) => (
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
            <p className="font-manrope-regular text-lg text-[#555555]">
              No products found matching your search.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 md:gap-3">
            {/* Previous Button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 md:px-4 py-2 border border-[#EAEAEA] rounded-lg font-plus-bold text-sm md:text-base text-[#003557] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Prev
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-plus-bold text-sm md:text-base transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#003557] text-white"
                        : "border border-[#EAEAEA] text-[#003557] hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 md:px-4 py-2 border border-[#EAEAEA] rounded-lg font-plus-bold text-sm md:text-base text-[#003557] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

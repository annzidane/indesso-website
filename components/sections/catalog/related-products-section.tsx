"use client"

import Link from "next/link"
import { ProductCard } from "@/components/ui/product-card"

interface RelatedProductsSectionProps {
  currentProductId: string
}

// Static related products data
const relatedProductsData = [
  {
    id: "2",
    category: "Aroma Chemicals",
    title: "ALPHA CARYOPHYLLENE 900009",
    description: "Woody, Spicy, Clove, Oceanic-watery, slightly green",
    image: "/our-catalog/our-catalog-product-1.png",
    badge: "Cloves",
  },
  {
    id: "3",
    category: "Aroma Chemicals",
    title: "ALPHA CARYOPHYLLENE 900010",
    description: "Woody, Spicy, Clove, Oceanic-watery, slightly green",
    image: "/our-catalog/our-catalog-product-2.png",
    badge: "Cloves",
  },
  {
    id: "4",
    category: "Essential Oils",
    title: "BENZOIN SUMATRA 803103",
    description: "Sweet, Resinous, Balsamic, Vanilla-like, slightly woody",
    image: "/our-catalog/our-catalog-product-3.png",
    badge: "Benzoin",
  },
  {
    id: "5",
    category: "Aroma Chemicals",
    title: "CARYOPHYLLENE 907",
    description: "Woody, Spicy, Dry, Earthy, slightly sweet",
    image: "/our-catalog/our-catalog-product-4.png",
    badge: "Cloves",
  },
  {
    id: "6",
    category: "Aroma Chemicals",
    title: "CARYOPHYLLENE 922",
    description: "Woody, Spicy, Dry, Earthy, slightly sweet",
    image: "/our-catalog/our-catalog-product-5.png",
    badge: "Cloves",
  },
  {
    id: "7",
    category: "Aroma Chemicals",
    title: "CARYOPHYLLENE ACETATE 924",
    description: "Woody, Fruity, slightly spicy, light earthy",
    image: "/our-catalog/our-catalog-product-1.png",
    badge: "Cloves",
  },
  {
    id: "8",
    category: "Aroma Chemicals",
    title: "CARYOPHYLLENE ACETATE 926",
    description: "Woody, Fruity, slightly spicy, light earthy",
    image: "/our-catalog/our-catalog-product-2.png",
    badge: "Cloves",
  },
  {
    id: "9",
    category: "Aroma Chemicals",
    title: "CARYOPHYLLENE 900011",
    description: "Woody, Spicy, Clove, Oceanic-watery, slightly green",
    image: "/our-catalog/our-catalog-product-3.png",
    badge: "Cloves",
  },
]

export function RelatedProductsSection({ currentProductId }: RelatedProductsSectionProps) {
  // Filter out current product and limit to 8 products
  const relatedProducts = relatedProductsData
    .filter((product) => product.id !== currentProductId)
    .slice(0, 8)

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <h2
            className="font-plus-bold text-2xl md:text-3xl lg:text-4xl text-center"
            style={{
              color: "#003557",
              letterSpacing: "-1px",
            }}
          >
            Related Products
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={`/en/our-catalog/${product.id}`}>
              <ProductCard
                category={product.category}
                title={product.title}
                description={product.description}
                image={product.image}
                badge={product.badge}
                className="cursor-pointer"
              />
            </Link>
          ))}
        </div>

        {/* View Full Catalog Button */}
        <div className="text-center">
          <Link
            href="/en/our-catalog"
            className="inline-block px-8 py-4 rounded font-plus-bold text-sm md:text-base transition-all hover:opacity-90"
            style={{
              border: "1px solid #00548B",
              color: "#00548B",
              background: "transparent",
            }}
          >
            Visit Our Product Catalog for More
          </Link>
        </div>
      </div>
    </section>
  )
}

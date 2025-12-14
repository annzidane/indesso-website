"use client";

import { useState } from "react";
import { getMediaByType } from "@/lib/data/media-data";
import { ProductCatalogCard } from "@/components/ui/media/product-catalog-card";

export function ProductCatalogContent() {
  const [visibleItems, setVisibleItems] = useState(8);

  // Get all product catalog items
  const catalogItems = getMediaByType("product-catalog");
  const displayedItems = catalogItems.slice(0, visibleItems);
  const hasMore = visibleItems < catalogItems.length;

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 8);
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Grid of Product Catalogs - 4 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {displayedItems.map((item) => (
          <ProductCatalogCard
            key={item.id}
            title={item.title}
            image={item.image}
            downloadUrl={item.downloadUrl}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="flex items-center justify-center w-full h-14 px-6 rounded-sm border border-[#003557] text-[#003557] hover:bg-[#003557] hover:text-white transition-colors font-manrope-bold text-base leading-5 text-center bg-white"
        >
          Load More
        </button>
      )}

      {/* Empty State */}
      {catalogItems.length === 0 && (
        <div className="text-center py-16">
          <p className="font-manrope-regular text-lg text-[#555555]">
            No product catalogs available yet.
          </p>
        </div>
      )}
    </div>
  );
}

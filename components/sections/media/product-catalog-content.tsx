"use client";

import { useState, useEffect } from "react";
import { ProductCatalogCard } from "@/components/ui/media/product-catalog-card";

export function ProductCatalogContent({ buttonLabel }: { buttonLabel?: string }) {
  const [visibleItems, setVisibleItems] = useState(8);

  // Fetch product catalog items from reports API; do not rely on local dummy data
  const [catalogItems, setCatalogItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/sustainability/reports');

        if (!res.ok) throw new Error('Failed to fetch reports');
        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : [];

        if (mounted && data.length > 0) {
          // Map ReportItem -> product catalog item shape expected by the card
          const mapped = data.map((r: any) => ({
            id: r.id,
            title: r.title || `Report ${r.year}`,
            image: r.image || undefined,
            downloadUrl: r.fileUrl || r.file_url || undefined,
          }));

          setCatalogItems(mapped);
        }
      } catch (e) {
        // Keep fallback local data
        console.error('Error fetching reports for product catalog', e);
      } finally {
        setLoading(false);
      }
    }
    load()
    return () => { mounted = false }
  }, [])

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
          {buttonLabel || "Load More"}
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

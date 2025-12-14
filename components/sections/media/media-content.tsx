"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MediaCard } from "@/components/ui/media/media-card";
import { getMediaByType } from "@/lib/data/media-data";
import { InsightsContent } from "@/components/sections/media/insights-content";
import { ProductCatalogContent } from "@/components/sections/media/product-catalog-content";
import { VideosContent } from "@/components/sections/media/videos-content";
import { MediaTabsMobile } from "@/components/ui/media/media-tabs-mobile";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

interface MediaContentProps {
  locale: Locale;
  defaultTab?: TabType;
}

type TabType =
  | "press-release"
  | "story"
  | "insight"
  | "product-catalog"
  | "video";

const tabs: { id: TabType; label: string; slug: string }[] = [
  { id: "press-release", label: "Press Release", slug: "press-release" },
  { id: "story", label: "Stories", slug: "stories" },
  { id: "insight", label: "Insights", slug: "insights" },
  { id: "product-catalog", label: "Product Catalog", slug: "product-catalog" },
  { id: "video", label: "Videos", slug: "videos" },
];

export function MediaContent({
  locale,
  defaultTab = "press-release",
}: MediaContentProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [visibleItems, setVisibleItems] = useState(6);

  // Update active tab when defaultTab changes
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Get media items based on active tab
  const mediaItems = getMediaByType(activeTab);
  const displayedItems = mediaItems.slice(0, visibleItems);
  const hasMore = visibleItems < mediaItems.length;

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  const handleTabChange = (tabId: TabType, slug: string) => {
    setActiveTab(tabId);
    setVisibleItems(6); // Reset to initial count when changing tabs

    // Navigate to the slug URL
    router.push(`/${locale}/media/${slug}`);

    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <section className="pb-8 md:pb-12 lg:pb-16">
      {/* Desktop Tabs - Full Width */}
      <div className="hidden md:block w-full border-b-2 border-[#EAEAEA] mb-6 md:pt-3">
        <div className="container mx-auto px-4">
          <div className="flex w-full gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id, tab.slug)}
                className={cn(
                  "flex-1 pb-3 md:pb-4 px-2 md:px-4 transition-all text-center",
                  activeTab === tab.id
                    ? "text-[#00548B] border-b-2 border-[#00548B] font-plus-extrabold"
                    : "text-[#A1A1A1] hover:text-[#00548B] font-plus-medium"
                )}
                style={{
                  fontSize: "16px",
                  lineHeight: "40px",
                  letterSpacing: "0px",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <MediaTabsMobile
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId, slug) => handleTabChange(tabId as TabType, slug)}
        className="mb-4"
      />

      {/* Insights Tab - Custom Layout */}
      {activeTab === "insight" && <InsightsContent locale={locale} />}

      {/* Product Catalog Tab - Custom Layout */}
      {activeTab === "product-catalog" && (
        <div className="container mx-auto px-4">
          <ProductCatalogContent />
        </div>
      )}

      {/* Videos Tab - Custom Layout */}
      {activeTab === "video" && <VideosContent />}

      {/* Other Tabs - Default Layout (Press Release & Stories) */}
      {activeTab !== "insight" &&
        activeTab !== "product-catalog" &&
        activeTab !== "video" && (
          <>
            {/* Featured Item with Full-Width Background */}
            {displayedItems.length > 0 && (
              <div className="relative mb-8 md:mb-12">
                {/* Full-width Background Blur Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/media/media-bg-blur.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Container */}
                <div className="relative z-10 container mx-auto px-4">
                  <Link
                    href={`/${locale}/media/detail/${displayedItems[0].id}`}
                    className="block group"
                  >
                    <div className="relative w-full aspect-[4/3] md:aspect-[31/15] overflow-hidden rounded-b-[4px] cursor-pointer transition-transform hover:scale-[1.02]">
                      <Image
                        src={displayedItems[0].image}
                        alt={displayedItems[0].title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Tags */}
                      {displayedItems[0].tags &&
                        displayedItems[0].tags.length > 0 && (
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                            {displayedItems[0].tags.map((tag, index) => (
                              <span
                                key={index}
                                className="font-plus-bold text-sm px-3 py-1 rounded bg-[rgba(16,153,214,0.1)] text-[#003557]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* Blur Overlay Container */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col gap-1 glass-media-card">
                        <p className="font-manrope-regular text-sm md:text-base leading-6 text-[#EAEAEA]">
                          {displayedItems[0].date}
                        </p>
                        <h3 className="font-plus-bold text-lg md:text-xl lg:text-2xl leading-7 tracking-tight text-white line-clamp-2">
                          {displayedItems[0].title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Section Title */}
            <div className="container mx-auto px-4 pt-3 md:pt-[12px]">
              {displayedItems.length > 1 && (
                <div className="flex items-center gap-6 mb-6 md:mb-8">
                  <h2
                    className="font-plus-bold text-2xl md:text-3xl whitespace-nowrap"
                    style={{
                      color: "#003557",
                      fontStyle: "italic",
                    }}
                  >
                    Older{" "}
                    {activeTab === "press-release"
                      ? "Press Release"
                      : "Stories"}
                  </h2>
                  <div className="flex-1 h-[2px] bg-[#EAEAEA]" />
                </div>
              )}

              {/* Grid of Remaining Items */}
              {displayedItems.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                  {displayedItems.slice(1).map((item) => (
                    <Link
                      key={item.id}
                      href={`/${locale}/media/detail/${item.id}`}
                      className="block"
                    >
                      <MediaCard
                        title={item.title}
                        date={item.date}
                        image={item.image}
                        tags={item.tags}
                      />
                    </Link>
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  className="w-full h-14 px-6 rounded-sm border border-[#003557] text-[#003557] hover:bg-[#003557] hover:text-white transition-colors font-manrope-bold text-base leading-5 text-center bg-transparent"
                >
                  Load More
                </button>
              )}

              {/* Empty State */}
              {displayedItems.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-manrope-regular text-lg text-[#555555]">
                    No items available in this category yet.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
    </section>
  );
}

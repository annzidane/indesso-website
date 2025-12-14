"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { getMediaByType } from "@/lib/data/media-data";
import { InsightFilterSidebar } from "./insight-filter-sidebar";
import { InsightTag } from "@/components/ui/media/insight-tag";
import type { Locale } from "@/lib/i18n/config";

interface ExploreInsightsContentProps {
  locale: Locale;
}

// Define available topics/tags for filtering
const INSIGHT_TOPICS = [
  "Bakery",
  "Beverage",
  "Snack",
  "Food Service",
  "Dairy",
  "Essential Oil",
  "Flavor & Fragrance",
  "Pharmaceutical",
  "Perfumery",
  "Skin Care",
];

export function ExploreInsightsContent({ locale }: ExploreInsightsContentProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState(6);

  // Get all insight items
  const allInsights = getMediaByType("insight");

  // Filter insights based on selected topic
  const filteredInsights = useMemo(() => {
    if (!selectedTopic) return allInsights;
    return allInsights.filter((item) =>
      item.tags?.some((tag) =>
        tag.toLowerCase().includes(selectedTopic.toLowerCase()) ||
        selectedTopic.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }, [allInsights, selectedTopic]);

  const displayedInsights = filteredInsights.slice(0, visibleItems);
  const hasMore = visibleItems < filteredInsights.length;

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  const handleTopicSelect = (topic: string | null) => {
    setSelectedTopic(topic);
    setVisibleItems(6); // Reset visible items when changing filter
  };

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <InsightFilterSidebar
            topics={INSIGHT_TOPICS}
            selectedTopic={selectedTopic}
            onTopicSelect={handleTopicSelect}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <p className="font-manrope-regular text-sm text-[#555555] mb-6">
              Showing {displayedInsights.length} of {filteredInsights.length} insights
              {selectedTopic && ` for "${selectedTopic}"`}
            </p>

            {/* Insight Cards */}
            <div className="flex flex-col gap-6 md:gap-8">
              {displayedInsights.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/media/detail/${item.id}`}
                  className="block group"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Image */}
                    <div className="relative w-full sm:w-[200px] md:w-[240px] lg:w-[280px] flex-shrink-0 aspect-[4/3] overflow-hidden rounded">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2 flex-1 py-1">
                      {/* Date */}
                      <p className="font-manrope-regular text-sm text-[#555555]">
                        {item.date}
                      </p>

                      {/* Title */}
                      <h3
                        className="font-plus-bold text-lg md:text-xl lg:text-[22px] leading-7 lg:leading-8 text-[#001932] line-clamp-2 group-hover:text-[#00548B] transition-colors capitalize"
                        style={{
                          letterSpacing: "-0.5px",
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-manrope-regular text-sm md:text-base text-[#555555] line-clamp-2 hidden sm:block">
                        {item.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto pt-2">
                          {item.tags.map((tag, index) => (
                            <InsightTag key={index} tag={tag} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {displayedInsights.length === 0 && (
              <div className="text-center py-16">
                <p className="font-manrope-regular text-lg text-[#555555]">
                  No insights found for this topic.
                </p>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <button
                onClick={handleLoadMore}
                className="w-full h-14 px-6 mt-8 rounded-sm border border-[#003557] text-[#003557] hover:bg-[#003557] hover:text-white transition-colors font-manrope-bold text-base leading-5 text-center bg-transparent"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toSlug } from "@/lib/strapi/utils";
import { getStrapiMedia } from "@/lib/strapi/client";
import { InsightFilterSidebar } from "./insight-filter-sidebar";
import { InsightTag } from "@/components/ui/media/insight-tag";
import type { Locale } from "@/lib/i18n/config";

interface ExploreInsightsContentProps {
  locale: Locale;
  pageConfig?: any;
}

interface InsightTopic {
  title: string;
  slug: string;
}

export function ExploreInsightsContent({ locale, pageConfig }: ExploreInsightsContentProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null); // slug
  const [visibleItems, setVisibleItems] = useState(6);

  const [allInsights, setAllInsights] = useState<any[]>([]);
  const [topics, setTopics] = useState<InsightTopic[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/media-insights?category=${encodeURIComponent("Insights")}&locale=${encodeURIComponent(locale)}&start=0&limit=200`);
        if (!res.ok) throw new Error(`Failed to fetch insights: ${res.status}`);
        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : [];
        const mapped = data.map((a: any) => {
          const dateStr = a?.date || a?.publishedAt || a?.createdAt || null;
          const date = dateStr
            ? new Date(dateStr).toLocaleDateString(locale === "id" ? "id" : "en", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "";
          const imageUrl = a?.image?.data?.attributes?.url || a?.image?.url || a?.image || null;
          const image = getStrapiMedia(imageUrl);
          const content = (() => {
            if (!a?.description) return "";
            if (typeof a.description === "string") return a.description;
            try {
              if (Array.isArray(a.description) && a.description.length > 0) {
                const first = a.description[0];
                if (first?.children && Array.isArray(first.children)) {
                  return first.children.map((c: any) => c.text || "").join(" ");
                }
                if (first?.text) return first.text;
              }
            } catch (e) {}
            return "";
          })();
          return {
            id: String(a.id),
            slug: a?.slug || a?.attributes?.slug || toSlug(a?.title || a?.name || String(a.id)),
            title: a?.title || a?.name || "",
            date,
            image,
            content,
            tags: a?.tags || null,
            categories:
              a?.insight_categories?.data
                ? a.insight_categories.data.map((c: any) => ({ title: c?.attributes?.title || c?.title, slug: c?.attributes?.slug || c?.slug }))
                : a?.insight_categories || [],
          };
        });
        if (mounted) setAllInsights(mapped);
      } catch (e) {
        console.error('Error fetching explore insights', e);
        if (mounted) setAllInsights([]);
      }
    })();
    return () => { mounted = false };
  }, [locale]);

  // fetch categories for sidebar
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/insight-categories?locale=${encodeURIComponent(locale)}`);
        if (!res.ok) throw new Error(`Failed to fetch insight categories: ${res.status}`);
        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : [];
        const mapped = data.map((c: any) => {
          const attrs = c?.attributes || c;
          return { title: attrs?.title || attrs?.name || '', slug: attrs?.slug || '' };
        });
        if (mounted) setTopics(mapped);
      } catch (e) {
        console.error('Error fetching insight categories', e);
        if (mounted) setTopics([]);
      }
    })();
    return () => { mounted = false };
  }, [locale]);

  // Filter insights based on selected topic (slug)
  const filteredInsights = useMemo(() => {
    if (!selectedTopic) return allInsights;
    return allInsights.filter((item) =>
      (item.categories || []).some((cat: any) => String(cat.slug) === String(selectedTopic))
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
            topics={topics}
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
                  href={`/${locale}/media/detail/${(item as any).slug || item.id}`}
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
                          {item.tags.map((tag: string, index: number) => (
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
                {pageConfig?.lable_button || 'Load More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

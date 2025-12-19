import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toSlug } from "@/lib/strapi/utils";
import { getStrapiMedia } from "@/lib/strapi/client";
// Server-side proxy at /api/media-insights will call Strapi with the token.
import { InsightFeaturedCard } from "@/components/ui/media/insight-featured-card";
import { InsightListCard } from "@/components/ui/media/insight-list-card";
import type { Locale } from "@/lib/i18n/config";

interface InsightsContentProps {
  locale: Locale;
  tab?: {
    articleGridTitle?: string;
    buttonLabel?: string;
  };
}

export function InsightsContent({ locale, tab }: InsightsContentProps) {
  const [insightItems, setInsightItems] = useState<any[]>([]);
  const [meta, setMeta] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
  // initial fetch: 8 items (3 featured + 5 list) via server API proxy
  const res = await fetch(`/api/media-insights?start=0&limit=8&locale=${encodeURIComponent(locale)}`)
  if (!res.ok) throw new Error(`Failed to fetch insights: ${res.status}`)
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
            } catch (e) {
              // ignore
            }
            return "";
          })();

          return {
            id: String(a.id),
            slug: a?.slug || a?.attributes?.slug || toSlug(a?.title || a?.name || String(a.id)),
            title: a?.title || a?.name || "",
            date,
            image,
            content,
            // For insights, prefer insight_categories as tags
            tags: Array.isArray(a?.insight_categories) && a.insight_categories.length > 0
              ? a.insight_categories.map((c: any) => c.title || c.name || c.slug)
              : a?.tags || null,
          };
        });
        if (mounted) {
          setInsightItems(mapped);
          setMeta(json?.meta || null);
        }
      } catch (e: any) {
        console.error("Error fetching insights", e);
        if (mounted) setError(e?.message || "Error fetching insights");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, [locale]);

  // Featured items (first 3)
  const featuredItems = insightItems.slice(0, 3);

  // Older items (the rest). Initial fetch yields 5 older items. Load more appends 5 each time.
  const olderItems = insightItems.slice(3);
  const displayedOlderItems = olderItems; // show all we have fetched so far

  const canLoadMore = !!(meta?.pagination && insightItems.length < meta.pagination.total);

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Featured Insights Section with Full-Width Background */}
      {featuredItems.length >= 3 && (
        <div className="relative">
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
            {/* Featured Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[500px] lg:h-[560px]">
              {/* Large Card - Left */}
              <InsightFeaturedCard
                id={featuredItems[0].id}
                slug={(featuredItems[0] as any).slug}
                title={featuredItems[0].title}
                date={featuredItems[0].date}
                image={featuredItems[0].image}
                tags={featuredItems[0].tags}
                locale={locale}
                variant="large"
                className="h-full"
              />

              {/* Right Column - 2 Smaller Cards */}
              <div className="flex flex-col gap-4 md:gap-6 h-full">
                <InsightFeaturedCard
                  id={featuredItems[1].id}
                  slug={(featuredItems[1] as any).slug}
                  title={featuredItems[1].title}
                  date={featuredItems[1].date}
                  image={featuredItems[1].image}
                  tags={featuredItems[1].tags}
                  locale={locale}
                  variant="small"
                  className="flex-1"
                />
                <InsightFeaturedCard
                  id={featuredItems[2].id}
                  slug={(featuredItems[2] as any).slug}
                  title={featuredItems[2].title}
                  date={featuredItems[2].date}
                  image={featuredItems[2].image}
                  tags={featuredItems[2].tags}
                  locale={locale}
                  variant="small"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Older Reports & Insights Section */}
      {olderItems.length > 0 && (
        <div className="container mx-auto px-4 space-y-8 md:space-y-12">
          {/* Section Title */}
          <div className="flex items-center gap-6">
            <h2
              className="font-plus-bold text-xl md:text-2xl lg:text-3xl whitespace-nowrap"
              style={{
                color: "#003557",
                fontStyle: "italic",
              }}
            >
              {tab?.articleGridTitle || "Older Insights"}
            </h2>
            <div className="flex-1 h-[2px] bg-[#EAEAEA]" />
          </div>

          {/* List of Older Insights */}
          <div className="flex flex-col gap-6 md:gap-8">
            {displayedOlderItems.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/media/detail/${(item as any).slug || item.id}`}
                className="block"
              >
                <InsightListCard
                  title={item.title}
                  date={item.date}
                  image={item.image}
                  description={(item.content || "").replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                  tags={item.tags}
                />
              </Link>
            ))}
          </div>

          {/* Load more / Explore */}
          <div className="flex flex-col items-center gap-4">
            {canLoadMore ? (
              <button
                onClick={async () => {
                  if (loading) return;
                  setLoading(true);
                  setError(null);
                  try {
                    const start = insightItems.length;
                    const res = await fetch(`/api/media-insights?start=${start}&limit=5&locale=${encodeURIComponent(locale)}`)
                    if (!res.ok) throw new Error(`Failed to load more insights: ${res.status}`)
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
                        } catch (e) {
                          // ignore
                        }
                        return "";
                      })();
                      return {
                        id: String(a.id),
                        slug: a?.slug || a?.attributes?.slug || toSlug(a?.title || a?.name || String(a.id)),
                        title: a?.title || a?.name || "",
                        date,
                        image,
                        content,
                        tags: Array.isArray(a?.insight_categories) && a.insight_categories.length > 0
                          ? a.insight_categories.map((c: any) => c.title || c.name || c.slug)
                          : a?.tags || null,
                      };
                    });
                    setInsightItems((prev) => [...prev, ...mapped]);
                    setMeta(json?.meta || null);
                  } catch (e: any) {
                    console.error("Error loading more insights", e);
                    setError(e?.message || "Error loading more insights");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full md:w-1/2 h-14 px-6 rounded-sm border border-[#003557] text-[#003557] hover:bg-[#003557] hover:text-white transition-colors font-manrope-bold text-base leading-5 text-center bg-white"
              >
                {loading ? "Loading..." : "Load more"}
              </button>
            ) : (
              <Link
                href={`/${locale}/media/explore-insights`}
                className="flex items-center justify-center w-full h-14 px-6 rounded-sm border border-[#003557] text-[#003557] hover:bg-[#003557] hover:text-white transition-colors font-manrope-bold text-base leading-5 text-center bg-white"
              >
                {tab?.buttonLabel || "Explore All Insights"}
              </Link>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      )}

      {/* Empty State */}
      {insightItems.length === 0 && (
        <div className="container mx-auto px-4 text-center py-16">
          <p className="font-manrope-regular text-lg text-[#555555]">
            No insights available yet.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MediaCard } from "@/components/ui/media/media-card";
import { getStrapiMedia } from "@/lib/strapi/client";
import { InsightsContent } from "@/components/sections/media/insights-content";
import { ProductCatalogContent } from "@/components/sections/media/product-catalog-content";
import { VideosContent } from "@/components/sections/media/videos-content";
import { MediaTabsMobile } from "@/components/ui/media/media-tabs-mobile";
import { cn } from "@/lib/utils";
import { toSlug } from "@/lib/strapi/utils";
import type { Locale } from "@/lib/i18n/config";

interface MediaContentProps {
  locale: Locale;
  defaultTab?: string;
  nav?: any[];
  initialArticles?: any[]; // server-provided initial articles (raw Strapi entries)
  initialMeta?: any; // server-provided meta (pagination)
}

type TabType =
  | "press-release"
  | "story"
  | "insight"
  | "product-catalog"
  | "video";

// helper slugify
function slugify(s: string) {
  return String(s ?? "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "")
}

// Default tabs use the route slugs (these must match the valid slugs defined in the media slug page)
const defaultTabs: { id: string; label: string; slug: string }[] = [
  { id: "press-release", label: "Press Release", slug: "press-release" },
  { id: "stories", label: "Stories", slug: "stories" },
  { id: "insight", label: "Insights", slug: "insight" },
  { id: "product-sheets", label: "Product Sheets", slug: "product-sheets" },
  { id: "video", label: "Videos", slug: "video" },
];

export function MediaContent({
  locale,
  defaultTab = "press-release",
  nav,
  initialArticles,
  initialMeta,
}: MediaContentProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  // default to 7: 1 featured + 6 grid items
  const [visibleItems, setVisibleItems] = useState(7);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  // helper to convert CMS title -> canonical route slug used by the media slug page
  function titleToRouteSlug(title: string) {
    const s = String(title ?? "").toLowerCase();
    if (s.includes("press")) return "press-release";
    if (s.includes("story")) return "stories";
    if (s.includes("insight")) return "insight";
    if (s.includes("product")) return "product-sheets";
    if (s.includes("video")) return "video";
    return slugify(title);
  }

  // build tabs from nav if provided. Use canonical route slug for both id and slug so router.push matches app routes.
  const computedTabs = (nav && Array.isArray(nav) && nav.length > 0)
    ? nav.map((n) => {
        const routeSlug = titleToRouteSlug(n.title);
        return {
          id: routeSlug,
          label: n.title,
          slug: routeSlug,
          articleGridTitle: n.article_grid_title,
          buttonLabel: n.button_label,
        };
      })
    : defaultTabs.map(t => ({ ...t, articleGridTitle: null, buttonLabel: null }))

  // Update active tab when defaultTab changes
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Initialize mediaItems from server-provided initialArticles when available.
  useEffect(() => {
    const cat = slugToCategory(activeTab);

    // If server provided initialArticles for this tab, use them (mapped)
    if (initialArticles && Array.isArray(initialArticles) && initialArticles.length > 0) {
      const mapped = initialArticles.map((a: any) => mapArticleToMedia(a, slugToType(activeTab)));
      setMediaItems(mapped);
      setVisibleItems(7);
      const meta = (initialMeta as any) || null;
      const total = meta?.pagination?.total ?? null;
      if (total !== null) {
        setTotalCount(Number(total));
        setHasMore(mapped.length < Number(total));
      } else {
        setHasMore(mapped.length === 7);
      }
      return;
    }

    // If this tab maps to an articles category, fetch initial articles from the articles API
    if (cat) {
      // client-side fetch initial batch
      (async () => {
        try {
          const url = `/api/articles?category=${encodeURIComponent(cat)}&locale=${encodeURIComponent(
            locale
          )}&start=0&limit=7`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Failed to load articles: ${res.status}`);
          const json = await res.json();
          const newArticles = json.data || [];
          const meta = json.meta || null;
          const mapped = newArticles.map((a: any) => mapArticleToMedia(a, slugToType(activeTab)));
          setMediaItems(mapped);
          setVisibleItems(7);
          const totalFromMeta = meta?.pagination?.total ?? null;
          if (totalFromMeta !== null && totalFromMeta !== undefined) {
            setTotalCount(Number(totalFromMeta));
            setHasMore(mapped.length < Number(totalFromMeta));
          } else {
            setHasMore(mapped.length === 7);
          }
        } catch (e) {
          console.error('Error loading initial articles for tab', e);
          setMediaItems([]);
          setVisibleItems(7);
          setHasMore(false);
        }
      })();
      return;
    }

    // If no category mapping and no server data, show empty list (avoid using local dummy data)
    setMediaItems([]);
    setVisibleItems(7);
    setHasMore(false);
  }, [activeTab, locale, initialArticles]);

  // Helper to map tab slug -> data type expected by getMediaByType
  function slugToType(slug: string): TabType {
    const s = String(slug ?? "").toLowerCase();
    if (s.includes("press")) return "press-release";
    if (s.includes("story")) return "story";
    if (s.includes("stories")) return "story";
    if (s.includes("insight")) return "insight";
    if (s.includes("product")) return "product-catalog";
    if (s.includes("video")) return "video";
    return "press-release";
  }

  // Map slug to human readable Strapi category
  function slugToCategory(slug: string) {
    const s = String(slug ?? "").toLowerCase();
    if (s.includes("press")) return "Press Release";
    if (s.includes("story") || s.includes("stories")) return "Corporate Events";
    if (s.includes("insight")) return "Insights";
    return null;
  }

  // Map Strapi article -> local media item shape used by this component
  function mapArticleToMedia(a: any, type: TabType) {
    const dateStr = a?.date || a?.publishedAt || a?.createdAt || null;
    const date = dateStr
      ? new Date(dateStr).toLocaleDateString(locale === "id" ? "id" : "en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

    const imageUrl =
      a?.image?.data?.attributes?.url || a?.image?.url || a?.image || null;

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
      // Prefer explicit slug if provided by CMS, otherwise build one from title
      slug: a?.slug || a?.attributes?.slug || toSlug(a?.title || a?.name || String(a.id)),
      type,
      title: a.title || a.name || "",
      date,
      image,
      content,
      category: a.article_category || a.category || null,
      tags: a.tags || null,
    };
  }

  const displayedItems = mediaItems.slice(0, visibleItems);

  const handleLoadMore = async () => {
    const cat = slugToCategory(activeTab);
    if (cat) {
      setLoading(true);
      try {
        const start = mediaItems.length;
        const limit = 6;
        const url = `/api/articles?category=${encodeURIComponent(cat)}&locale=${encodeURIComponent(
          locale
        )}&start=${start}&limit=${limit}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load articles: ${res.status}`);
        const json = await res.json();
        const newArticles = json.data || [];
        const meta = json.meta || null;
        const mapped = newArticles.map((a: any) => mapArticleToMedia(a, slugToType(activeTab)));
        setMediaItems((prev) => [...prev, ...mapped]);
        setVisibleItems((prev) => prev + mapped.length);
        // update totalCount if provided by meta
        const totalFromMeta = meta?.pagination?.total ?? null;
        if (totalFromMeta !== null && totalFromMeta !== undefined) {
          setTotalCount(Number(totalFromMeta));
          const loaded = (mediaItems.length || 0) + newArticles.length;
          setHasMore(loaded < Number(totalFromMeta));
        } else if (totalCount !== null) {
          const loaded = (mediaItems.length || 0) + newArticles.length;
          setHasMore(loaded < (totalCount as number));
        } else {
          // fallback heuristic
          setHasMore(newArticles.length === limit);
        }
      } catch (e) {
        console.error("Error loading more articles", e);
      } finally {
        setLoading(false);
      }
    } else {
      setVisibleItems((prev) => prev + 6);
    }
  };

  const handleTabChange = (tabId: string, slug: string) => {
    setActiveTab(tabId);
    setVisibleItems(7); // Reset to initial count when changing tabs (1 featured + 6 grid)

    // Navigate to the slug URL
    router.push(`/${locale}/media/${slug}`);

    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // helpers to detect special tabs by CMS label/slug (keeps default behavior working too)
  const currentTab = computedTabs.find((t) => t.id === activeTab);
  const activeLabel = (currentTab?.label || activeTab).toLowerCase();
  const isInsight = activeLabel.includes("insight");
  const isProduct = activeLabel.includes("product");
  const isVideo = activeLabel.includes("video");

  // Sticky tabs fallback (desktop + mobile)
  const [tabsPinned, setTabsPinned] = useState(false);
  const tabsBarRef = useRef<HTMLDivElement | null>(null);
  const tabsOriginalTopRef = useRef<number | null>(null);
  const tabsPlaceholderHeightRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = tabsBarRef.current;
    if (typeof window === "undefined" || !el) return;

    const parseHeaderHeight = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')?.trim() || '';
      if (!raw) return 64;
      if (raw.endsWith('px')) return parseFloat(raw);
      if (raw.endsWith('rem')) {
        const val = parseFloat(raw);
        const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize || '16');
        return val * rootFont;
      }
      return parseFloat(raw) || 64;
    }

    let headerHeight = parseHeaderHeight();

    const computeOriginalTop = () => {
      const r = el.getBoundingClientRect();
      tabsOriginalTopRef.current = r.top + window.scrollY;
      tabsPlaceholderHeightRef.current = el.offsetHeight || undefined;
    }

    const onScroll = () => {
      if (tabsOriginalTopRef.current == null) computeOriginalTop();
      const currentScroll = window.scrollY;
      const pinned = (currentScroll + headerHeight) >= (tabsOriginalTopRef.current ?? 0);
      setTabsPinned(pinned);
    }

    const onResize = () => {
      headerHeight = parseHeaderHeight();
      requestAnimationFrame(() => computeOriginalTop());
      onScroll();
    }

    requestAnimationFrame(() => {
      headerHeight = parseHeaderHeight();
      computeOriginalTop();
      onScroll();
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return (
    <section className="pb-8 md:pb-12 lg:pb-16">
      {/* Tabs (desktop + mobile) with sticky/fallback pinning */}
      {/* placeholder to preserve layout when pinned */}
      <div aria-hidden className={tabsPinned ? "" : "hidden"} style={tabsPinned ? { height: tabsPlaceholderHeightRef.current || undefined } : undefined} />

      <div
        ref={tabsBarRef}
        className={"w-full z-40 bg-white " + (tabsPinned ? "fixed left-0 right-0" : "sticky")}
        style={{ top: 'var(--site-header-height, 4rem)' }}
      >
        {/* Desktop Tabs - Full Width */}
        <div className="hidden md:block w-full border-b-2 border-[#EAEAEA] mb-6 md:pt-3">
          <div className="container mx-auto px-4">
            <div className="flex w-full gap-0">
              {computedTabs.map((tab) => (
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
        <div className="md:hidden">
          <MediaTabsMobile
            tabs={computedTabs}
            activeTab={activeTab}
            onTabChange={(tabId, slug) => handleTabChange(tabId, slug)}
            className="mb-4"
          />
        </div>
      </div>

      {/* Insights Tab - Custom Layout */}
      {isInsight && <InsightsContent locale={locale} tab={currentTab} />}

      {/* Product Catalog Tab - Custom Layout */}
      {isProduct && (
        <div className="container mx-auto px-4">
          <ProductCatalogContent buttonLabel={currentTab?.buttonLabel} />
        </div>
      )}

      {/* Videos Tab - Custom Layout */}
      {isVideo && <VideosContent label={currentTab?.articleGridTitle} />}

      {/* Other Tabs - Default Layout (Press Release & Stories) */}
      {(!isInsight && !isProduct && !isVideo) && (
          <>
            {/* Featured Item with Full-Width Background */}
            {displayedItems.length > 0 && (
              <div className="relative mb-8 md:mb-12">
                {/* Full-width Background Blur Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/feature-bg.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Container */}
                <div className="relative z-10 container mx-auto px-4">
                  <Link
                    href={`/${locale}/media/detail/${displayedItems[0].slug || displayedItems[0].id}`}
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
                            {displayedItems[0].tags.map((tag: string, index: number) => (
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
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col gap-1 glass-dark-media">
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
                    {/** Use articleGridTitle from CMS when available, otherwise fallback to label or default */}
                    {currentTab?.articleGridTitle}
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
                      href={`/${locale}/media/detail/${item.slug || item.id}`}
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
                  {currentTab?.buttonLabel ?? "Load More"}
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

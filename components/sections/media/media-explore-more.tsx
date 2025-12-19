import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { MediaItem } from "@/lib/data/media-data";
import { fetchStrapi } from "@/lib/strapi/client";
import { getStrapiMedia } from "@/lib/strapi/client";

interface MediaExploreMoreProps {
  items?: MediaItem[];
  locale: Locale;
  exploreSectionPage?: any;
  // optional: if items not provided, use these to fetch related items server-side
  mediaType?: string; // 'article' | 'insight' | 'story' | etc
  mediaCategory?: any; // for article: category string; for insight: category slug or array
  mediaSlug?: string; // to exclude current item
  limit?: number;
}

export async function MediaExploreMore({
  items = [],
  locale,
  exploreSectionPage,
  mediaType,
  mediaCategory,
  mediaSlug,
  limit = 3,
}: MediaExploreMoreProps) {
  let renderedItems: MediaItem[] = Array.isArray(items) ? items : [];

  // If no items provided, try to fetch related items server-side based on mediaType
  if (renderedItems.length === 0 && mediaType) {
    try {
      if (mediaType === "insight") {
        let catSlugs: string[] = [];
        if (Array.isArray(mediaCategory)) {
          catSlugs = mediaCategory
            .map((c: any) => c?.slug || c?.title || c)
            .filter((s: any) => !!s)
            .map((s: any) => String(s));
        } else if (mediaCategory) {
          const s = mediaCategory?.slug || mediaCategory;
          if (s) catSlugs = [String(s)];
        }

        if (catSlugs.length > 0) {
          const resp: any = await fetchStrapi("media-insights", {
            locale,
            // match any insight that has at least one category with a slug in catSlugs
            filters: { insight_categories: { slug: { $in: catSlugs } } },
            query: { ["pagination[limit]"]: limit, sort: "date:desc", pLevel: 5 },
            revalidate: 60,
          });
          const data = Array.isArray(resp?.data) ? resp.data.filter((r: any) => r?.slug !== mediaSlug) : [];
          renderedItems = data.map((r: any) => ({
            id: String(r.id),
            slug: r?.slug || r?.attributes?.slug,
            type: "insight",
            title: r.title || r.name || "",
            date: r?.date ? new Date(r.date).toLocaleDateString(locale === "id" ? "id" : "en", { day: "numeric", month: "long", year: "numeric" }) : "",
            image: getStrapiMedia(r?.image?.data?.attributes?.url || r?.image?.url || r?.image || null),
            content: (() => {
              if (!r?.description) return "";
              if (typeof r.description === "string") return r.description;
              try {
                if (Array.isArray(r.description) && r.description.length > 0) {
                  const first = r.description[0];
                  if (first?.children && Array.isArray(first.children)) return first.children.map((c: any) => c.text || "").join(" ");
                  if (first?.text) return first.text;
                }
              } catch (e) {}
              return "";
            })(),
            tags: Array.isArray(r?.insight_categories) ? r.insight_categories.map((c: any) => c.title || c.name || c.slug) : [],
          }));
        }
      } else {
        // treat as article-like: mediaCategory is expected to be a category string (article_category)
        const resp: any = await fetchStrapi("articles", {
          locale,
          filters: mediaCategory ? { article_category: { $eq: mediaCategory }, slug: { $ne: mediaSlug } } : undefined,
          query: { ["pagination[limit]"]: limit, sort: "date:desc", pLevel: 3 },
          revalidate: 60,
        });
        const data = Array.isArray(resp?.data) ? resp.data : [];
        renderedItems = data.map((r: any) => ({
          id: String(r.id),
          slug: r?.slug || r?.attributes?.slug,
          type: r.article_category || r.category || "",
          title: r.title || r.name || "",
          date: r?.date ? new Date(r.date).toLocaleDateString(locale === "id" ? "id" : "en", { day: "numeric", month: "long", year: "numeric" }) : "",
          image: getStrapiMedia(r?.image?.data?.attributes?.url || r?.image?.url || r?.image || null),
          content: (() => {
            if (!r?.description) return "";
            if (typeof r.description === "string") return r.description;
            try {
              if (Array.isArray(r.description) && r.description.length > 0) {
                const first = r.description[0];
                if (first?.children && Array.isArray(first.children)) return first.children.map((c: any) => c.text || "").join(" ");
                if (first?.text) return first.text;
              }
            } catch (e) {}
            return "";
          })(),
        }));
      }
    } catch (err) {
      console.error("Error fetching related items in MediaExploreMore:", err);
    }
  }

  if (renderedItems.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/explore-more-bg.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 md:mb-12">
          <h2 className="font-plus-bold text-2xl md:text-4xl lg:text-[48px] lg:leading-[56px] tracking-tight text-[#FEFEFE]">
            {exploreSectionPage?.title}
          </h2>

          <Link
            href={exploreSectionPage?.button.path || `/${locale}/media`}
            className="w-full md:w-auto h-14 px-6 flex items-center justify-center font-manrope-bold text-base rounded-sm border border-[#FEFEFE] text-[#FEFEFE] bg-transparent hover:bg-white hover:text-[#003557] transition-colors"
          >
            {exploreSectionPage?.button.title || "Explore More"}
          </Link>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {renderedItems.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/media/detail/${(item as any).slug || item.id}`}
              className="block group"
            >
              <div className="relative overflow-hidden rounded-b-[4px] transition-transform hover:scale-[1.02]">
                {/* Image Container - Card ratio 392x464 */}
                <div className="relative w-full aspect-[392/464] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Blur Overlay Container */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-1 glass-dark">
                    {/* Date */}
                    <p className="font-manrope-regular text-sm md:text-base leading-6 text-[#EAEAEA] mt-2">
                      {item.date}
                    </p>

                    {/* Title */}
                    <h3 className="font-plus-bold text-base md:text-lg leading-7 tracking-tight text-white line-clamp-3">
                      {item.title}
                    </h3>

                    {/* Tags - Top of image (for insights) */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="top-4 left-4 flex flex-wrap gap-2 z-10 mt-2">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="font-plus-bold text-sm leading-6 px-3 p-2 rounded bg-[rgba(16,153,214,0.1)] text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

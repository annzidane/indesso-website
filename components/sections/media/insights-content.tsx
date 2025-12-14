import Link from "next/link";
import Image from "next/image";
import { getMediaByType } from "@/lib/data/media-data";
import { InsightFeaturedCard } from "@/components/ui/media/insight-featured-card";
import { InsightListCard } from "@/components/ui/media/insight-list-card";
import type { Locale } from "@/lib/i18n/config";

interface InsightsContentProps {
  locale: Locale;
}

export function InsightsContent({ locale }: InsightsContentProps) {
  // Get all insight items
  const insightItems = getMediaByType("insight");

  // Featured items (first 3)
  const featuredItems = insightItems.slice(0, 3);

  // Older items (show max 4, rest available on explore page)
  const olderItems = insightItems.slice(3);
  const displayedOlderItems = olderItems.slice(0, 4);

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
              Older Reports & Insights
            </h2>
            <div className="flex-1 h-[2px] bg-[#EAEAEA]" />
          </div>

          {/* List of Older Insights */}
          <div className="flex flex-col gap-6 md:gap-8">
            {displayedOlderItems.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/media/detail/${item.id}`}
                className="block"
              >
                <InsightListCard
                  title={item.title}
                  date={item.date}
                  image={item.image}
                  description={item.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                  tags={item.tags}
                />
              </Link>
            ))}
          </div>

          {/* Explore All Insights Button */}
          <Link
            href={`/${locale}/media/explore-insights`}
            className="flex items-center justify-center w-full h-14 px-6 rounded-sm border border-[#003557] text-[#003557] hover:bg-[#003557] hover:text-white transition-colors font-manrope-bold text-base leading-5 text-center bg-white"
          >
            Explore All Insights
          </Link>
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

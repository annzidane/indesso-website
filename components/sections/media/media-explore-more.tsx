import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { MediaItem } from "@/lib/data/media-data";

interface MediaExploreMoreProps {
  items: MediaItem[];
  locale: Locale;
  sectionTitle?: string;
}

export function MediaExploreMore({
  items,
  locale,
  sectionTitle = "Explore More Insights",
}: MediaExploreMoreProps) {
  if (items.length === 0) return null;

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
            {sectionTitle}
          </h2>

          <Link
            href={`/${locale}/media`}
            className="w-full md:w-auto h-14 px-6 flex items-center justify-center font-manrope-bold text-base rounded-sm border border-[#FEFEFE] text-[#FEFEFE] bg-transparent hover:bg-white hover:text-[#003557] transition-colors"
          >
            See More Insights
          </Link>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/media/detail/${item.id}`}
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

                  {/* Tags - Top of image (for insights) */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="font-plus-bold text-sm leading-6 px-3 py-1 rounded bg-[rgba(16,153,214,0.1)] text-[#003557]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Blur Overlay Container */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-1 glass-media-card">
                    {/* Date */}
                    <p className="font-manrope-regular text-sm md:text-base leading-6 text-[#EAEAEA]">
                      {item.date}
                    </p>

                    {/* Title */}
                    <h3 className="font-plus-bold text-base md:text-lg leading-7 tracking-tight text-white line-clamp-3">
                      {item.title}
                    </h3>
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

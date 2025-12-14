import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InsightFeaturedCardProps {
  id: string;
  title: string;
  date: string;
  image: string;
  tags?: string[];
  locale: string;
  variant?: "large" | "small";
  className?: string;
}

export function InsightFeaturedCard({
  id,
  title,
  date,
  image,
  tags,
  locale,
  variant = "small",
  className
}: InsightFeaturedCardProps) {
  const isLarge = variant === "large";

  return (
    <Link
      href={`/${locale}/media/detail/${id}`}
      className={cn(
        "block relative w-full h-full overflow-hidden rounded-[4px] group cursor-pointer",
        className
      )}
    >
      <div className={cn(
        "relative w-full h-full overflow-hidden",
        isLarge ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-[16/9] md:aspect-auto md:h-full"
      )}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Glass Blur Overlay at Bottom - contains date, title, and tags */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 flex flex-col glass-media-card",
          isLarge ? "p-4 md:p-6 lg:p-8 gap-1 md:gap-2" : "p-3 md:p-4 lg:p-5 gap-1 md:gap-1.5"
        )}>
          {/* Date - Manrope Regular 14px/24px #EAEAEA */}
          <p
            className="font-manrope-regular text-[#EAEAEA] text-xs md:text-sm"
            style={{
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            {date}
          </p>

          {/* Title - Plus Jakarta Sans Bold 28px/36px -0.5px #FFFFFF */}
          <h3
            className={cn(
              "font-plus-bold text-white",
              isLarge
                ? "text-base md:text-xl lg:text-[28px] line-clamp-3"
                : "text-sm md:text-base lg:text-lg line-clamp-2"
            )}
            style={{
              lineHeight: isLarge ? "36px" : "28px",
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </h3>

          {/* Tags - Plus Jakarta Sans Bold 14px/24px, bg: #A1E2FF1A, color: #FEFEFE */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 md:gap-2.5 mt-1 md:mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="font-plus-bold text-[#FEFEFE] text-xs md:text-sm"
                  style={{
                    borderRadius: "4px",
                    padding: "4px 12px",
                    background: "#A1E2FF1A",
                    lineHeight: "24px",
                    letterSpacing: "0%",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils";
import { InsightTag } from "./insight-tag";

interface InsightListCardProps {
  title: string;
  date: string;
  image: string;
  description?: string;
  tags?: string[];
  className?: string;
}

export function InsightListCard({
  title,
  date,
  image,
  description,
  tags,
  className
}: InsightListCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-4 sm:gap-6 group cursor-pointer",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative w-full sm:w-[200px] md:w-[240px] lg:w-[280px] flex-shrink-0 aspect-[4/3] sm:aspect-[4/3] overflow-hidden rounded">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1 py-1">
        {/* Date */}
        <p className="font-manrope-regular text-sm text-[#555555]">
          {date}
        </p>

        {/* Title */}
        <h3
          className="font-plus-bold text-lg md:text-xl lg:text-[22px] leading-7 lg:leading-8 tracking-tight text-[#001932] line-clamp-2 group-hover:text-[#00548B] transition-colors capitalize"
          style={{
            letterSpacing: "-0.5px",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="font-manrope-regular text-sm md:text-base text-[#555555] line-clamp-2 hidden sm:block">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {tags.map((tag, index) => (
              <InsightTag key={index} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

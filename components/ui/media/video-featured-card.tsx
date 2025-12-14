"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface VideoFeaturedCardProps {
  title: string;
  subtitle?: string;
  thumbnail: string;
  videoUrl?: string;
  variant?: "large" | "small";
  className?: string;
  onPlay?: () => void;
}

export function VideoFeaturedCard({
  title,
  subtitle,
  thumbnail,
  videoUrl,
  variant = "small",
  className,
  onPlay,
}: VideoFeaturedCardProps) {
  const isLarge = variant === "large";

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden rounded-[4px] group cursor-pointer",
        className
      )}
      onClick={onPlay}
    >
      <div
        className={cn(
          "relative w-full h-full overflow-hidden",
          isLarge
            ? "aspect-[4/5] md:aspect-auto md:h-full"
            : "aspect-[16/9] md:aspect-auto md:h-full"
        )}
      >
        {/* Thumbnail Image */}
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Play Button - Centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-transform group-hover:scale-110">
            <Image
              src="/media/play-btn.png"
              alt="Play"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Glass Blur Overlay at Bottom */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 flex flex-col glass-media-card",
            isLarge ? "p-4 md:p-6 lg:p-8 gap-1" : "p-3 md:p-4 gap-1"
          )}
        >
          {/* Subtitle */}
          {subtitle && (
            <p className="font-manrope-regular text-xs md:text-sm text-[#EAEAEA] uppercase tracking-wider">
              {subtitle}
            </p>
          )}

          {/* Title */}
          <h3
            className={cn(
              "font-plus-bold text-white",
              isLarge
                ? "text-base md:text-lg lg:text-xl line-clamp-2"
                : "text-sm md:text-base line-clamp-2"
            )}
            style={{
              lineHeight: "1.3",
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

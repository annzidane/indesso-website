"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface VideoGalleryCardProps {
  title: string;
  thumbnail: string;
  videoUrl?: string;
  className?: string;
  onPlay?: () => void;
}

export function VideoGalleryCard({
  title,
  thumbnail,
  videoUrl,
  className,
  onPlay,
}: VideoGalleryCardProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[4px] group cursor-pointer",
        className
      )}
      onClick={onPlay}
    >
      {/* Thumbnail with 16:9 aspect ratio */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Play Button - Centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform group-hover:scale-110">
            <Image
              src="/media/play-btn.png"
              alt="Play"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Glass Blur Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 lg:p-6 glass-media-card">
          <h3
            className="font-plus-bold text-sm md:text-base lg:text-lg text-white line-clamp-1"
            style={{
              lineHeight: "1.4",
              letterSpacing: "-0.3px",
            }}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaCardProps {
  title: string;
  date: string;
  image: string;
  className?: string;
  tags?: string[]; // For insights
}

export function MediaCard({ title, date, image, className, tags }: MediaCardProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden rounded-b-[4px] group cursor-pointer transition-transform hover:scale-[1.02]",
        className
      )}
    >
      {/* Image Container - 4:5 aspect ratio */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Tags - Top of image (for insights) */}
        {tags && tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="font-plus-bold text-sm px-3 py-1 rounded"
                style={{
                  background: "rgba(16, 153, 214, 0.1)",
                  color: "#003557",
                  fontSize: "14px",
                  lineHeight: "24px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Blur Overlay Container */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-1 glass-dark">
          {/* Date */}
          <p className="font-manrope-regular text-sm md:text-base leading-6 text-[#EAEAEA]">
            {date}
          </p>

          {/* Title */}
          <h3 className="font-plus-bold text-base md:text-lg leading-7 tracking-tight text-white line-clamp-3">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi/api";
import { cn } from "@/lib/utils";
import type { StrapiImage } from "@/types/strapi";

interface BadgeGlassProps {
  title: string;
  description?: string;
  image?: StrapiImage;
  className?: string;
}

export function BadgeGlass({
  title,
  description,
  image,
  className,
}: BadgeGlassProps) {
  return (
    <div
      className={cn(
        "glass w-full max-w-full md:max-w-[462px] h-auto min-h-[88px] md:min-h-32 p-4 md:p-6 shadow-2xl flex items-center gap-3 md:gap-6 shrink-0 rounded-[10px]",
        className
      )}
    >
      {image ? (
        <Image
          src={getStrapiMedia(image.url) || "/placeholder.png"}
          alt={image.alternativeText || "Badge icon"}
          width={72}
          height={72}
          className="object-contain w-12 h-12 md:w-[72px] md:h-[72px]"
        />
      ) : (
        <div className="w-8 h-8 bg-white/50 rounded-full" />
      )}
      <div>
        <p className="font-bold text-white text-base md:text-xl">{title}</p>
        {description && (
          <p className="text-xs md:text-sm text-white/80 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

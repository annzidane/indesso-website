import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  category: string
  title: string
  description: string
  image: string
  badge?: string
  className?: string
}

export function ProductCard({
  category,
  title,
  description,
  image,
  badge,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[10px] overflow-hidden hover:shadow-lg transition-all duration-300 group",
        className
      )}
      style={{ border: "1.5px solid #EAEAEA" }}
    >
      {/* Image Container */}
      <div className="relative bg-white w-full aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />

        {/* Category Badge with Glass Effect */}
        {badge && (
          <div
            className="absolute top-2 left-2"
            style={{
              background: "linear-gradient(95.9deg, rgba(0, 84, 139, 0.8) 4.83%, rgba(0, 84, 139, 0.4) 95.46%)",
              border: "2px solid rgba(0, 53, 87, 0.05)",
              borderRadius: "4px",
              padding: "2px 12px",
              backdropFilter: "blur(4px)",
            }}
          >
            <span className="font-plus-bold text-white text-xs md:text-sm leading-tight">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 md:p-4">
        {/* Category */}
        <p className="font-plus-bold text-[#003557] text-xs md:text-sm leading-5 md:leading-6 mb-1 md:mb-2">
          {category}
        </p>

        {/* Title */}
        <h3 className="font-plus-bold text-[#003557] text-base md:text-lg leading-6 mb-1 md:mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="font-manrope-regular text-[#555555] text-xs md:text-sm leading-[18px] md:leading-6">
          {description}
        </p>
      </div>
    </div>
  )
}

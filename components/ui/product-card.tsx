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

export function ProductCard({ category, title, description, image, badge, className }: ProductCardProps) {
  return (
    <div className={cn("mx-auto", className)}>
      <div
        className="w-full max-w-[292px] sm:w-[292px] h-auto sm:h-[416px] bg-white rounded-[10px] overflow-hidden shadow-sm"
        style={{ transform: "rotate(0deg)", opacity: 1 }}
      >
        {/* Top: Image area with bottom-left radius */}
        <div
          className="relative w-full h-[200px] sm:h-[220px] bg-white overflow-hidden"
          style={{ borderBottomLeftRadius: 20 }}
        >
          <Image src={image} alt={title} fill className="object-cover" />

          {badge && (
            <div
              className="absolute top-2 left-2"
              style={{
                background:
                  "linear-gradient(95.9deg, rgba(0, 84, 139, 0.8) 4.83%, rgba(0, 84, 139, 0.4) 95.46%)",
                border: "2px solid rgba(0, 53, 87, 0.05)",
                borderRadius: 4,
                padding: "2px 12px",
                backdropFilter: "blur(4px)",
              }}
            >
              <span className="font-plus-bold text-white text-xs md:text-sm leading-tight">{badge}</span>
            </div>
          )}
        </div>

        {/* Bottom: content area */}
        <div className="p-3 md:p-4 h-[216px] sm:h-[196px] relative" style={{ border: "1.5px solid #EAEAEA", borderTop: "none" }}>
          <p className="font-plus-bold text-indesso-dark-blue text-xs md:text-sm leading-5 md:leading-6 mb-1 md:mb-3">{category}</p>
          <h3 className="font-plus-bold text-indesso-blue text-base md:text-lg leading-6 mb-1 md:mb-4">{title}</h3>

          <div className="absolute left-3 right-3 h-1 bg-indesso-blue/10" style={{ top: 90 }} aria-hidden />

          <p className="
              font-manrope-regular text-indesso-dark-grey
              text-xs sm:text-sm leading-5 sm:leading-6
              mt-3 sm:mt-4
              line-clamp-3 sm:line-clamp-4
          "
          style={{ marginTop: 40 }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
    
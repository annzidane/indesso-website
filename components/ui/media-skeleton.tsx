import { cn } from "@/lib/utils"
interface MediaSkeletonProps {
    count?: number
    className?: string
}
export function MediaSkeleton({ count = 6, className }: MediaSkeletonProps) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8", className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4 animate-pulse">
                    {/* Image Placeholder */}
                    <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg" />

                    {/* Content Placeholders */}
                    <div className="flex flex-col gap-2">
                        {/* Date */}
                        <div className="w-24 h-4 bg-gray-200 rounded" />

                        {/* Title */}
                        <div className="w-full h-6 bg-gray-200 rounded" />
                        <div className="w-2/3 h-6 bg-gray-200 rounded" />

                        {/* Tags */}
                        <div className="flex gap-2 mt-2">
                            <div className="w-16 h-6 bg-gray-200 rounded-full" />
                            <div className="w-16 h-6 bg-gray-200 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
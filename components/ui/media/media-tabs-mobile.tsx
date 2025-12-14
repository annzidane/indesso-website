"use client";

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MediaTab {
  id: string;
  label: string;
  slug: string;
}

interface MediaTabsMobileProps {
  tabs: MediaTab[];
  activeTab: string;
  onTabChange: (tabId: string, slug: string) => void;
  className?: string;
}

export function MediaTabsMobile({
  tabs,
  activeTab,
  onTabChange,
  className,
}: MediaTabsMobileProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active tab when it changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
      if (activeIndex >= 0) {
        const scrollPosition = activeIndex * 180; // 180px per tab
        scrollContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [activeTab, tabs]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 180;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("relative md:hidden", className)}>
      {/* Tabs Container */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch overflow-x-auto scrollbar-hide bg-white"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id, tab.slug)}
            className={cn(
              "shrink-0 transition-all duration-300 text-center",
              index === 0 ? "ml-10" : "",
              activeTab === tab.id
                ? "text-[#00548B] font-plus-extrabold border-b-4 border-[#00548B]"
                : "text-[#A1A1A1] font-plus-extrabold border-b-4 border-transparent hover:text-[#003557]"
            )}
            style={{
              minWidth: "180px",
              height: "64px",
              padding: "16px",
              gap: "10px",
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-[#00548B] bg-white border border-[#00548B] rounded-full transition-all duration-300"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-[#00548B] bg-white border border-[#00548B] rounded-full transition-all duration-300"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SustainabilityTabItem {
  id: string;
  label: string;
}

interface SustainabilityTabsProps {
  items: SustainabilityTabItem[];
  defaultActiveId?: string;
  className?: string;
}

export function SustainabilityTabs({ items, defaultActiveId, className }: SustainabilityTabsProps) {
  const [activeSection, setActiveSection] = useState(defaultActiveId || items[0]?.id || "");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll position to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  // Auto-scroll tabs container to show active tab
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeIndex = items.findIndex((item) => item.id === activeSection);
      if (activeIndex >= 0) {
        const scrollPosition = activeIndex * 180;
        scrollContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [activeSection, items]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 140 : 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScrollTabs = (direction: "left" | "right") => {
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
    <nav
      className={cn(
        "sticky z-40 bg-white border-b-2 border-[#EAEAEA] shadow-sm",
        "top-16 md:top-20",
        className
      )}
    >
      {/* Desktop Tabs */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex w-full gap-0">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "flex-1 pb-3 md:pb-4 px-2 md:px-4 pt-3 md:pt-4 transition-all text-center",
                  activeSection === item.id
                    ? "text-[#00548B] border-b-[3px] border-[#00548B] font-plus-extrabold -mb-[2px]"
                    : "text-[#A1A1A1] hover:text-[#00548B] font-plus-medium border-b-[3px] border-transparent -mb-[2px]"
                )}
                style={{
                  fontSize: "16px",
                  lineHeight: "40px",
                  letterSpacing: "0px",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="relative md:hidden">
        <div
          ref={scrollContainerRef}
          className="flex items-stretch overflow-x-auto scrollbar-hide bg-white"
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "shrink-0 transition-all duration-300 text-center",
                index === 0 ? "ml-10" : "",
                activeSection === item.id
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
              {item.label}
            </button>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={() => handleScrollTabs("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-[#00548B] bg-white border border-[#00548B] rounded-full transition-all duration-300"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => handleScrollTabs("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-[#00548B] bg-white border border-[#00548B] rounded-full transition-all duration-300"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}

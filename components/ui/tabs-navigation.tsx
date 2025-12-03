"use client"

import { cn } from "@/lib/utils"

export interface TabItem {
  id: string | number
  label: string
}

interface TabsNavigationProps {
  tabs: TabItem[]
  activeTab: number
  onTabChange: (index: number) => void
  className?: string
}

export function TabsNavigation({ tabs, activeTab, onTabChange, className }: TabsNavigationProps) {
  return (
    <div 
      className={cn(
        "flex items-stretch gap-1.5 sm:gap-2.5 rounded p-1 overflow-x-auto scrollbar-hide",
        className
      )}
      style={{
        background: "#F5F5F5",
        boxShadow: "inset 0px 4px 4px 0px rgba(0, 0, 0, 0.04)",
      }}
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(index)}
          className={cn(
            "flex-1 shrink-0 min-w-max px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm font-plus-semibold tracking-wider sm:tracking-widest uppercase transition-all duration-300 whitespace-nowrap",
            index === activeTab
              ? "bg-[#00548B] text-white rounded"
              : "text-[#BDBDBD] hover:text-[#003557]",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

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
        "flex items-stretch gap-2.5 rounded p-1",
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
            "flex-1 px-8 py-4 text-sm font-plus-semibold tracking-widest uppercase transition-all duration-300",
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

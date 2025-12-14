"use client"

import { cn } from "@/lib/utils"

export interface ContactTabItem {
  id: string
  label: string
}

interface ContactTabsProps {
  tabs: ContactTabItem[]
  activeTab: number
  onTabChange: (index: number) => void
  className?: string
}

export function ContactTabs({ tabs, activeTab, onTabChange, className }: ContactTabsProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Desktop Tabs - Media style with border-bottom */}
      <div className="hidden md:block border-b-2 border-[#EAEAEA]">
        <div className="flex items-stretch">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(index)}
              className={cn(
                "flex-1 transition-all duration-300 text-center py-4",
                activeTab === index
                  ? "text-[#00548B] font-plus-extrabold border-b-[3px] border-[#00548B] -mb-[2px]"
                  : "text-[#A1A1A1] font-plus-medium border-b-[3px] border-transparent -mb-[2px] hover:text-[#003557]"
              )}
              style={{
                fontSize: "16px",
                lineHeight: "40px",
                letterSpacing: "0px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Tabs - Same style */}
      <div className="md:hidden border-b-2 border-[#EAEAEA]">
        <div className="flex items-stretch">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(index)}
              className={cn(
                "flex-1 transition-all duration-300 text-center",
                activeTab === index
                  ? "text-[#00548B] font-plus-extrabold border-b-[3px] border-[#00548B] -mb-[2px]"
                  : "text-[#A1A1A1] font-plus-extrabold border-b-[3px] border-transparent -mb-[2px] hover:text-[#003557]"
              )}
              style={{
                height: "56px",
                padding: "16px",
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "0px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

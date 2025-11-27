import type React from "react"
import { cn } from "@/lib/utils"

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "light"
}

export function SectionLabel({ children, className, variant = "default" }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "text-xs font-semibold tracking-[0.2em] uppercase",
        variant === "default" ? "text-primary" : "text-white/70",
        className,
      )}
    >
      {children}
    </span>
  )
}

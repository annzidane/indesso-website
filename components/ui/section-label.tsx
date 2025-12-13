import type React from "react"
import { cn } from "@/lib/utils"

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "light" | "bubble" | "bubble-light" | "line"
}

export function SectionLabel({ children, className, variant = "default" }: SectionLabelProps) {
  if (variant === "bubble") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center font-manrope-extrabold text-[12px] md:text-xs leading-[18px] tracking-[4px] md:tracking-[0.2em] uppercase text-primary h-8 px-4 gap-2.5",
          className,
        )}
        style={{
          borderRadius: "4px 16px 16px 16px",
          background: "linear-gradient(274.93deg, rgba(181, 214, 102, 0.1) 0%, rgba(0, 84, 139, 0.1) 100%)",
        }}
      >
        {children}
      </span>
    )
  }

  if (variant === "bubble-light") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center text-xs font-semibold tracking-[0.2em] uppercase text-white h-8 px-4 gap-2.5",
          className,
        )}
        style={{
          borderRadius: "4px 16px 16px 16px",
          background: "linear-gradient(274.93deg, rgba(181, 214, 102, 0.29) 0%, rgba(0, 84, 139, 0.29) 100%)",
        }}
      >
        {children}
      </span>
    )
  }

  if (variant === "line") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="w-1 h-6 bg-accent rounded-full" />
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
          {children}
        </span>
      </div>
    )
  }

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

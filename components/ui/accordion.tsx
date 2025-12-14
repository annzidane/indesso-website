"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  openItems: string[]
  toggleItem: (value: string) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

interface AccordionProps {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  className?: string
  children: React.ReactNode
}

export function Accordion({
  type = "single",
  collapsible = false,
  defaultValue,
  className,
  children,
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    }
    return []
  })

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (type === "single") {
          if (prev.includes(value)) {
            return collapsible ? [] : prev
          }
          return [value]
        } else {
          if (prev.includes(value)) {
            return prev.filter((item) => item !== value)
          }
          return [...prev, value]
        }
      })
    },
    [type, collapsible]
  )

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  className?: string
  children: React.ReactNode
}

const AccordionItemContext = React.createContext<string | undefined>(undefined)

export function AccordionItem({ value, className, children }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={cn("", className)}>{children}</div>
    </AccordionItemContext.Provider>
  )
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext)
  const itemValue = React.useContext(AccordionItemContext)

  if (!context || !itemValue) {
    throw new Error("AccordionTrigger must be used within Accordion and AccordionItem")
  }

  const isOpen = context.openItems.includes(itemValue)

  return (
    <button
      type="button"
      onClick={() => context.toggleItem(itemValue)}
      className={cn(
        "flex flex-1 w-full items-center justify-between transition-all",
        "[&>svg]:transition-transform [&>svg]:duration-200",
        className
      )}
      style={{
        minHeight: "70px",
        gap: "16px",
        paddingTop: "24px",
        paddingRight: "16px",
        paddingBottom: "24px",
        paddingLeft: "16px",
        background: isOpen ? "linear-gradient(90deg, #EBFAFF 0%, #FAFFF7 100%)" : "transparent",
      }}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 text-[#003557] transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

interface AccordionContentProps {
  className?: string
  children: React.ReactNode
}

export function AccordionContent({ className, children }: AccordionContentProps) {
  const context = React.useContext(AccordionContext)
  const itemValue = React.useContext(AccordionItemContext)

  if (!context || !itemValue) {
    throw new Error("AccordionContent must be used within Accordion and AccordionItem")
  }

  const isOpen = context.openItems.includes(itemValue)

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div
        className={cn("bg-[#F9F9F9] font-manrope-medium", className)}
        style={{
          fontSize: "16px",
          lineHeight: "29px",
          letterSpacing: "0px",
          color: "#555555",
          padding: "16px",
        }}
      >
        {children}
      </div>
    </div>
  )
}

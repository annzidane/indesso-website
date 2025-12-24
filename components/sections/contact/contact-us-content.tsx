"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { ContactTabs } from "@/components/ui/contact/contact-tabs"
import { GlobalPresenceSection } from "@/components/sections/contact/global-presence-section"
import { RequestSampleSection } from "@/components/sections/catalog/request-sample-section"
import { VisitorCenterSection } from "@/components/sections/contact/visitor-center-section"
import { VisitorVideoSection } from "@/components/sections/contact/visitor-video-section"
import { VisitorFormSection } from "@/components/sections/contact/visitor-form-section"

const tabs = [
  { id: "contact-us", label: "Contact Us" },
  { id: "visitor-center", label: "Visitor Center" },
]

interface ContactUsContentProps {
  data?: any
  topicsData?: Array<{
    topic: string;
    slug: string;
    destination_email: string
  }>
}

export function ContactUsContent({ data, topicsData }: ContactUsContentProps) {
  const [activeTab, setActiveTab] = useState(0)
  console.log("data pusat", data)

  // helper to create URL-friendly slugs from titles
  const slugify = (s: any) =>
    String(s ?? "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "")

  // build tabs from API if available; each tab gets a slug id used for the URL hash
  const computedTabs = useMemo(() => {
    if (data?.page_nav) {
      return data.page_nav.map((p: any, idx: number) => {
        const label = p.title || p.__component || `Tab ${idx + 1}`
        return { id: slugify(label) || `tab-${idx + 1}`, label }
      })
    }

    return [
      { id: "contact-us", label: "Contact Us" },
      { id: "visitor-center", label: "Visitor Center" },
    ]
  }, [data])

  const initializedRef = useRef(false)

  const [isPinned, setIsPinned] = useState(false)
  const barRef = useRef<HTMLDivElement | null>(null)
  const originalTopRef = useRef<number | null>(null)
  const placeholderHeightRef = useRef<number | undefined>(undefined)

  // Fallback pinning: measure bar and toggle fixed positioning when scrolled past.
  useEffect(() => {
    if (typeof window === "undefined") return
    const el = barRef.current
    if (!el) return

    const parseHeaderHeight = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')?.trim() || ''
      if (!raw) return 64
      // px value
      if (raw.endsWith('px')) return parseFloat(raw)
      // rem value -> convert to px using root font-size
      if (raw.endsWith('rem')) {
        const val = parseFloat(raw)
        const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize || '16')
        return val * rootFont
      }
      // fallback: try parseFloat
      return parseFloat(raw) || 64
    }

    let headerHeight = parseHeaderHeight()

    // compute the element's document top (stable) and measured height for placeholder
    const computeOriginalTop = () => {
      const r = el.getBoundingClientRect()
      originalTopRef.current = r.top + window.scrollY
      placeholderHeightRef.current = el.offsetHeight || undefined
    }

    const onScroll = () => {
      if (originalTopRef.current == null) computeOriginalTop()
      const currentScroll = window.scrollY
      const pinned = (currentScroll + headerHeight) >= (originalTopRef.current ?? 0)
      setIsPinned(pinned)
    }

    const onResize = () => {
      headerHeight = parseHeaderHeight()
      // recompute original top after layout changes
      requestAnimationFrame(() => computeOriginalTop())
      onScroll()
    }

    // initial measurement after layout
    requestAnimationFrame(() => {
      headerHeight = parseHeaderHeight()
      computeOriginalTop()
      onScroll()
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const rawHash = window.location.hash.replace(/^#/, "")
    // flexible matching: try exact id, label slug, or substring matches
    if (rawHash) {
      const idx = computedTabs.findIndex((t: any) => {
        const labelSlug = slugify(t.label)
        return (
          t.id === rawHash ||
          labelSlug === rawHash ||
          t.id.includes(rawHash) ||
          rawHash.includes(t.id) ||
          labelSlug.includes(rawHash) ||
          rawHash.includes(labelSlug)
        )
      })
      if (idx >= 0) {
        setActiveTab(idx)
        initializedRef.current = true
        return
      }
    }

    // no matching hash -> default to 'contact-us' if present, else first tab
    const defaultIdx = computedTabs.findIndex((t: any) => t.id === "contact-us")
    const startIdx = defaultIdx >= 0 ? defaultIdx : 0
    setActiveTab(startIdx)

    // ensure URL contains the default hash without adding a new history entry
    const defaultHash = computedTabs[startIdx]?.id
    if (defaultHash && window.location.hash.replace(/^#/, "") !== defaultHash) {
      window.history.replaceState(null, "", `#${defaultHash}`)
    }

    initializedRef.current = true
  }, [computedTabs])

  useEffect(() => {
    if (typeof window === "undefined") return

    const onHashChange = () => {
      const rawHash = window.location.hash.replace(/^#/, "")
      if (!rawHash) return
      const idx = computedTabs.findIndex((t: any) => {
        const labelSlug = slugify(t.label)
        return (
          t.id === rawHash ||
          labelSlug === rawHash ||
          t.id.includes(rawHash) ||
          rawHash.includes(t.id) ||
          labelSlug.includes(rawHash) ||
          rawHash.includes(labelSlug)
        )
      })

      if (idx >= 0) {
        setActiveTab(idx)
      }
    }

    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [computedTabs])

  return (
    <>
      {/* Tabs Section */}
      <section className="bg-white">
        {/* placeholder to preserve layout when pinned */}
        <div aria-hidden className={isPinned ? "h-auto" : "hidden"} style={isPinned ? { height: barRef.current?.offsetHeight || undefined } : undefined} />
        <div
          ref={barRef}
          className={"w-full z-40 bg-white" + (isPinned ? " fixed left-0 right-0" : " sticky")}
          style={{ top: 'var(--site-header-height, 4rem)' }}
        >
          <div className="w-full">
            <div className="mx-auto px-0">
              <ContactTabs
                tabs={computedTabs}
                activeTab={activeTab}
                onTabChange={(idx: number) => {
                  setActiveTab(idx)
                  if (typeof window !== "undefined") {
                    const id = computedTabs[idx]?.id
                    if (id) window.history.replaceState(null, "", `#${id}`)
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 0 ? (
        <>
          <GlobalPresenceSection data={data?.contactSection?.location} />
          <RequestSampleSection
            productName={data?.contactSection?.form?.title}
            data={data?.contactSection?.form}
            topicsData={topicsData}
          />
        </>
      ) : (
        <>
          <VisitorCenterSection data={data?.visitorSection?.center} />
          <VisitorVideoSection data={data?.visitorSection?.video} />
          <VisitorFormSection data={data?.visitorSection?.form} />
        </>
      )}
    </>
  )
}

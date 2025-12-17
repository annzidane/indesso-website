"use client"

import { useState } from "react"
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
}

export function ContactUsContent({ data }: ContactUsContentProps) {
  const [activeTab, setActiveTab] = useState(0)

  // build tabs from API if available
  const computedTabs = data?.page_nav
    ? data.page_nav.map((p: any, idx: number) => ({ id: String(idx), label: p.title || p.__component || `Tab ${idx + 1}` }))
    : [
        { id: "0", label: "Contact Us" },
        { id: "1", label: "Visitor Center" },
      ]

  return (
    <>
      {/* Tabs Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <ContactTabs tabs={computedTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 0 ? (
        <>
          <GlobalPresenceSection data={data?.page_nav?.find((p: any) => p.__component?.includes("contact-us-page"))?.our_location_section} />
          <RequestSampleSection
            productName={data?.page_nav?.find((p: any) => p.__component?.includes("contact-us-page"))?.contact_us_section?.title ?? ""}
            data={data?.page_nav?.find((p: any) => p.__component?.includes("contact-us-page"))?.contact_us_section}
          />
        </>
      ) : (
        <>
          <VisitorCenterSection data={data?.page_nav?.find((p: any) => p.__component?.includes("visitor-center-page"))?.visitor_center_section} />
          <VisitorVideoSection data={data?.page_nav?.find((p: any) => p.__component?.includes("visitor-center-page"))?.visitor_center_section} />
          <VisitorFormSection data={data?.page_nav?.find((p: any) => p.__component?.includes("visitor-center-page"))?.visitor_form_section} />
        </>
      )}
    </>
  )
}

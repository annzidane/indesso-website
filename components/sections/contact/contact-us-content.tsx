"use client"

import { useState } from "react"
import { ContactTabs } from "@/components/ui/contact/contact-tabs"
import { GlobalPresenceSection } from "@/components/sections/contact/global-presence-section"
import { ConnectFormSection } from "@/components/sections/contact/connect-form-section"
import { VisitorCenterSection } from "@/components/sections/contact/visitor-center-section"
import { VisitorVideoSection } from "@/components/sections/contact/visitor-video-section"
import { VisitorFormSection } from "@/components/sections/contact/visitor-form-section"

const tabs = [
  { id: "contact-us", label: "Contact Us" },
  { id: "visitor-center", label: "Visitor Center" },
]

export function ContactUsContent() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      {/* Tabs Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <ContactTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 0 ? (
        <>
          <GlobalPresenceSection />
          <ConnectFormSection />
        </>
      ) : (
        <>
          <VisitorCenterSection />
          <VisitorVideoSection />
          <VisitorFormSection />
        </>
      )}
    </>
  )
}

"use client"

import { useState } from "react"
import { SectionLabel } from "@/components/ui/section-label"
import { TabsNavigation } from "@/components/ui/tabs-navigation"

interface Office {
  type: string
  city: string
  location: string
  phone: string
}

interface CountryData {
  id: string
  label: string
  offices: Office[]
}

const countriesData: CountryData[] = [
  {
    id: "indonesia",
    label: "Indonesia",
    offices: [
      {
        type: "HEAD OFFICE",
        city: "Jakarta",
        location: "Jalan Tanah Abang 2 No.78 Jakarta, DKI Jakarta, 10150",
        phone: "+62 21 386 3974",
      },
      {
        type: "PLANT",
        city: "Purwodadi",
        location: "Jalan Raya Semarang Purwodadi km.77, Penawangan, Grobogan, Jawa Tengah",
        phone: "+62 8112 600 003",
      },
      {
        type: "OFFICE & WAREHOUSE",
        city: "Sidoarjo",
        location: "Jalan Bypass Juanda Kav.P1 Sedati, Sidoarjo, Jawa Timur, 61253",
        phone: "+62 31 890 6277",
      },
      {
        type: "PLANT & WAREHOUSE",
        city: "Cileungsi",
        location: "Jalan HM.Tabun no.11A, Cileungsi, Bogor, Jawa Barat, 16820",
        phone: "+62 21 823 800",
      },
      {
        type: "PLANT",
        city: "Ungaran",
        location: "Jalan Pataran IV, Pegunungan, Karangjati, Ungaran Timur, Semarang, Jawa Tengah",
        phone: "",
      },
      {
        type: "PLANT",
        city: "Klapanunggal",
        location: "Kampung Pasir Angin RT.01/RW.05, Kelurahan Bojong Kulur, Kecamatan Klapanunggal, Kabupaten Bogor",
        phone: "+62 21 29 93 923",
      },
      {
        type: "OFFICE",
        city: "Semarang",
        location: "Jalan Kaliwungu No.45 Semarang, Jawa Tengah, 50243",
        phone: "+62 24 764 0500",
      },
      {
        type: "OFFICE",
        city: "Surabaya",
        location: "Jalan Raya Darmo 54 KAV. A Surabaya, Jawa Timur, 60264",
        phone: "+62 31 561 9986",
      },
    ],
  },
  {
    id: "malaysia",
    label: "Malaysia",
    offices: [
      {
        type: "OFFICE",
        city: "Kuala Lumpur",
        location: "Level 8, Pavilion KL, 168 Jalan Bukit Bintang, 55100 Kuala Lumpur",
        phone: "+60 3 2110 5000",
      },
    ],
  },
  {
    id: "singapore",
    label: "Singapore",
    offices: [
      {
        type: "OFFICE",
        city: "Singapore",
        location: "8 Marina Boulevard, Marina Bay Financial Centre Tower 1, Singapore 018981",
        phone: "+65 6123 4567",
      },
    ],
  },
  {
    id: "tanzania",
    label: "Tanzania",
    offices: [
      {
        type: "OFFICE",
        city: "Dar es Salaam",
        location: "Plot No. 123, Industrial Area, Dar es Salaam, Tanzania",
        phone: "+255 22 123 4567",
      },
    ],
  },
]

function OfficeCard({ office }: { office: Office }) {
  return (
    <div className="rounded-[10px] overflow-hidden border border-[#00548B1A]">
      {/* Card Header */}
      <div
        className="px-4 py-4 md:px-6 md:py-5"
        style={{
          background: "linear-gradient(270deg, #FFFFFF 0%, #EFF9FF 100%)",
          borderBottom: "1px solid rgba(0, 84, 139, 0.1)",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <p
          className="font-manrope-extrabold uppercase mb-1"
          style={{
            fontSize: "12px",
            lineHeight: "18px",
            letterSpacing: "4px",
            color: "#006A90",
          }}
        >
          {office.type}
        </p>
        <h3
          className="font-plus-bold"
          style={{
            fontSize: "18px",
            lineHeight: "28px",
            color: "#003557",
          }}
        >
          {office.city}
        </h3>
      </div>

      {/* Card Body */}
      <div className="px-4 py-4 md:px-6 md:py-5 bg-white">
        <div className="mb-4">
          <p
            className="font-plus-bold mb-1"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#003557",
            }}
          >
            Location
          </p>
          <p
            className="font-manrope-regular"
            style={{
              fontSize: "14px",
              lineHeight: "22px",
              color: "#555555",
            }}
          >
            {office.location}
          </p>
        </div>

        {office.phone && (
          <div>
            <p
              className="font-plus-bold mb-1"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#003557",
              }}
            >
              Phone
            </p>
            <p
              className="font-manrope-regular"
              style={{
                fontSize: "14px",
                lineHeight: "22px",
                color: "#555555",
              }}
            >
              {office.phone}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export function GlobalPresenceSection() {
  const [activeCountry, setActiveCountry] = useState(0)
  const currentCountry = countriesData[activeCountry]

  const countryTabs = countriesData.map((country) => ({
    id: country.id,
    label: country.label,
  }))

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-end mb-8 md:mb-12">
          {/* Left Column - Eyebrow & Title */}
          <div>
            <SectionLabel variant="bubble" className="mb-4 md:mb-6">
              OUR LOCATION
            </SectionLabel>
            <h2 className="font-plus-bold text-[28px] md:text-4xl lg:text-5xl text-[#003557] leading-[36px] md:leading-tight tracking-[-1px]">
              Global Presence Through Our Wide Network
            </h2>
          </div>
          {/* Right Column - Description */}
          <div>
            <p className="font-manrope-regular text-[14px] md:text-[16px] text-[#555555] leading-[24px] md:leading-relaxed">
              Our facilities operate across locations, helping us stay closer to partners and maintain an efficient flow of communication.
            </p>
          </div>
        </div>

        {/* Country Tabs */}
        <TabsNavigation
          tabs={countryTabs}
          activeTab={activeCountry}
          onTabChange={setActiveCountry}
          className="mb-8 md:mb-12"
        />

        {/* Office Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {currentCountry.offices.map((office, index) => (
            <OfficeCard key={index} office={office} />
          ))}
        </div>
      </div>
    </section>
  )
}

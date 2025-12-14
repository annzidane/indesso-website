"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"

const rules = [
  {
    icon: "/contact-us/icon-rule-18+.png",
    text: "Minimum Age is 18+",
  },
  {
    icon: "/contact-us/icon-pants.png",
    text: "Wear closed-toe shoes, no sandals",
  },
  {
    icon: "/contact-us/icon-shoes.png",
    text: "Wear long pants",
  },
  {
    icon: "/contact-us/icon-flag.png",
    text: "Contact tour guide for company",
  },
]

export function VisitorFormSection() {
  const [formData, setFormData] = useState({
    yourName: "",
    institution: "",
    dateOfVisit: "",
    visitTime: "",
    numberOfVisitors: "",
    agreeToRules: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <SectionLabel variant="bubble" className="mb-4 md:mb-6 mx-auto">
            VISITOR FORM
          </SectionLabel>
          <h2
            className="font-plus-bold text-[28px] md:text-[32px] lg:text-[40px] max-w-3xl mx-auto"
            style={{
              color: "#003557",
              lineHeight: "36px",
              letterSpacing: "-1px",
            }}
          >
            Discover What Awaits You at the Indesso Visitor Center
          </h2>
          <p className="font-manrope-regular text-[14px] md:text-[16px] text-[#555555] leading-[24px] md:leading-relaxed mt-4 max-w-2xl mx-auto">
            The Indesso Visitor Center has officially been opened to the public since August 12, 2019. There is no admission fee, but any visitor should make a preferring booking by filling out the below Visitor Form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left: Image */}
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/contact-us/form-human-2.png"
              alt="Visitor Center"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Form */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Your Name */}
              <div className="relative">
                <input
                  type="text"
                  id="visitorName"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleChange}
                  placeholder="Write Your Name"
                  className="w-full h-12 md:h-14 px-4 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
                  style={{
                    borderColor: "#00548B",
                    borderWidth: "0.5px",
                    backgroundColor: "#FAFDFF",
                    color: "#333333",
                  }}
                  required
                />
                <label
                  htmlFor="visitorName"
                  className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                  style={{
                    color: "#00548B",
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "2px",
                  }}
                >
                  YOUR NAME
                </label>
              </div>

              {/* Institution */}
              <div className="relative">
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Write your institution"
                  className="w-full h-12 md:h-14 px-4 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
                  style={{
                    borderColor: "#00548B",
                    borderWidth: "0.5px",
                    backgroundColor: "#FAFDFF",
                    color: "#333333",
                  }}
                  required
                />
                <label
                  htmlFor="institution"
                  className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                  style={{
                    color: "#00548B",
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "2px",
                  }}
                >
                  INSTITUTION
                </label>
              </div>

              {/* Date and Time - Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Date of Visit */}
                <div className="relative">
                  <input
                    type="date"
                    id="dateOfVisit"
                    name="dateOfVisit"
                    value={formData.dateOfVisit}
                    onChange={handleChange}
                    className="w-full h-12 md:h-14 px-4 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
                    style={{
                      borderColor: "#00548B",
                      borderWidth: "0.5px",
                      backgroundColor: "#FAFDFF",
                      color: formData.dateOfVisit ? "#333333" : "#A1A1A1",
                    }}
                    required
                  />
                  <label
                    htmlFor="dateOfVisit"
                    className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                    style={{
                      color: "#00548B",
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "2px",
                    }}
                  >
                    DATE OF VISIT
                  </label>
                </div>

                {/* Visit Time */}
                <div className="relative">
                  <input
                    type="time"
                    id="visitTime"
                    name="visitTime"
                    value={formData.visitTime}
                    onChange={handleChange}
                    className="w-full h-12 md:h-14 px-4 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
                    style={{
                      borderColor: "#00548B",
                      borderWidth: "0.5px",
                      backgroundColor: "#FAFDFF",
                      color: formData.visitTime ? "#333333" : "#A1A1A1",
                    }}
                    required
                  />
                  <label
                    htmlFor="visitTime"
                    className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                    style={{
                      color: "#00548B",
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "2px",
                    }}
                  >
                    VISIT TIME
                  </label>
                </div>
              </div>

              {/* Number of Visitors */}
              <div className="relative">
                <select
                  id="numberOfVisitors"
                  name="numberOfVisitors"
                  value={formData.numberOfVisitors}
                  onChange={handleChange}
                  className="w-full h-12 md:h-14 px-4 pr-10 rounded border font-manrope-regular text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all cursor-pointer"
                  style={{
                    borderColor: "#00548B",
                    borderWidth: "0.5px",
                    backgroundColor: "#FAFDFF",
                    color: formData.numberOfVisitors ? "#333333" : "#A1A1A1",
                  }}
                  required
                >
                  <option value="" style={{ color: "#A1A1A1" }}>
                    Choose number of visitors
                  </option>
                  <option value="1-5" style={{ color: "#333333" }}>1-5 people</option>
                  <option value="6-10" style={{ color: "#333333" }}>6-10 people</option>
                  <option value="11-20" style={{ color: "#333333" }}>11-20 people</option>
                  <option value="21-50" style={{ color: "#333333" }}>21-50 people</option>
                  <option value="50+" style={{ color: "#333333" }}>More than 50 people</option>
                </select>
                <label
                  htmlFor="numberOfVisitors"
                  className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                  style={{
                    color: "#00548B",
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "2px",
                  }}
                >
                  NUMBER OF VISITORS
                </label>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Rules Section */}
              <div className="py-4">
                <p
                  className="font-plus-bold uppercase mb-4"
                  style={{
                    color: "#00548B",
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "2px",
                  }}
                >
                  RULES
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {rules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-6 h-6 relative shrink-0">
                        <Image
                          src={rule.icon}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="font-manrope-regular text-xs text-[#555555]">
                        {rule.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToRules"
                  name="agreeToRules"
                  checked={formData.agreeToRules}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-[#00548B] text-[#00548B] focus:ring-[#00548B]"
                  required
                />
                <label
                  htmlFor="agreeToRules"
                  className="font-manrope-regular text-sm text-[#555555]"
                >
                  I have read and agree to all{" "}
                  <a href="#" className="text-[#00548B] underline">
                    the rules and policies
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-4 md:py-[18px] md:px-6 rounded font-plus-bold text-sm md:text-base text-white transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(90deg, #00548B 0%, rgba(0, 84, 139, 0.8) 100%)",
                    borderRadius: "2px",
                    border: "1px solid #00548B",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

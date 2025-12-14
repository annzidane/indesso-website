"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"

export function ConnectFormSection() {
  const [formData, setFormData] = useState({
    yourName: "",
    companyName: "",
    email: "",
    inquiryTopic: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#F8F8F8]">
      <div className="container mx-auto px-4">
        {/* Card Container */}
        <div
          className="bg-white rounded-lg p-6 md:p-10 lg:p-12 max-w-6xl mx-auto"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
            {/* Left: Image with border frame */}
            <div className="w-full">
              <div
                className="relative w-full rounded-lg overflow-hidden"
                style={{
                  aspectRatio: "560 / 736",
                  border: "8px solid #E0F4FF",
                }}
              >
                <Image
                  src="/contact-us/form-human-1.png"
                  alt="Connect With Indesso"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex flex-col justify-start">
              {/* Form Header */}
              <div className="mb-6">
                <SectionLabel variant="bubble" className="mb-3">
                  CONTACT US
                </SectionLabel>
                <h2
                  className="font-plus-bold text-2xl md:text-3xl lg:text-[36px] italic"
                  style={{
                    color: "#003557",
                    lineHeight: "1.2",
                  }}
                >
                  Connect With Indesso
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Your Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="contactYourName"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleChange}
                    placeholder="Write Your Name"
                    className="w-full h-12 px-4 rounded border font-manrope-regular text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
                    style={{
                      borderColor: "#00548B",
                      borderWidth: "0.5px",
                      backgroundColor: "#FAFDFF",
                      color: "#333333",
                    }}
                    required
                  />
                  <label
                    htmlFor="contactYourName"
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

                {/* Company Name and Email - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Company Name */}
                  <div className="relative">
                    <input
                      type="text"
                      id="contactCompanyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Write your company name"
                      className="w-full h-12 px-4 rounded border font-manrope-regular text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
                      style={{
                        borderColor: "#00548B",
                        borderWidth: "0.5px",
                        backgroundColor: "#FAFDFF",
                        color: "#333333",
                      }}
                      required
                    />
                    <label
                      htmlFor="contactCompanyName"
                      className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                      style={{
                        color: "#00548B",
                        fontSize: "12px",
                        lineHeight: "16px",
                        letterSpacing: "2px",
                      }}
                    >
                      COMPANY NAME
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      id="contactEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Write your email"
                      className="w-full h-12 px-4 rounded border font-manrope-regular text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
                      style={{
                        borderColor: "#00548B",
                        borderWidth: "0.5px",
                        backgroundColor: "#FAFDFF",
                        color: "#333333",
                      }}
                      required
                    />
                    <label
                      htmlFor="contactEmail"
                      className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                      style={{
                        color: "#00548B",
                        fontSize: "12px",
                        lineHeight: "16px",
                        letterSpacing: "2px",
                      }}
                    >
                      EMAIL
                    </label>
                  </div>
                </div>

                {/* Inquiry Topics */}
                <div className="relative">
                  <select
                    id="contactInquiryTopic"
                    name="inquiryTopic"
                    value={formData.inquiryTopic}
                    onChange={handleChange}
                    className="w-full h-12 px-4 pr-10 rounded border font-manrope-regular text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all cursor-pointer"
                    style={{
                      borderColor: "#00548B",
                      borderWidth: "0.5px",
                      backgroundColor: "#FAFDFF",
                      color: formData.inquiryTopic ? "#333333" : "#A1A1A1",
                    }}
                    required
                  >
                    <option value="" style={{ color: "#A1A1A1" }}>
                      Choose your inquiry topics
                    </option>
                    <option value="product-sample" style={{ color: "#333333" }}>
                      Product Sample Request
                    </option>
                    <option value="technical-inquiry" style={{ color: "#333333" }}>
                      Technical Inquiry
                    </option>
                    <option value="pricing" style={{ color: "#333333" }}>
                      Pricing Information
                    </option>
                    <option value="partnership" style={{ color: "#333333" }}>
                      Partnership Opportunity
                    </option>
                    <option value="other" style={{ color: "#333333" }}>
                      Other
                    </option>
                  </select>
                  <label
                    htmlFor="contactInquiryTopic"
                    className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                    style={{
                      color: "#00548B",
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "2px",
                    }}
                  >
                    INQUIRY TOPICS
                  </label>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#003557] pointer-events-none" />
                </div>

                {/* Your Notes */}
                <div className="relative">
                  <textarea
                    id="contactNotes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Write your notes"
                    rows={4}
                    className="w-full px-4 py-3 rounded border font-manrope-regular text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all resize-none"
                    style={{
                      borderColor: "#00548B",
                      borderWidth: "0.5px",
                      backgroundColor: "#FAFDFF",
                      color: "#333333",
                    }}
                  />
                  <label
                    htmlFor="contactNotes"
                    className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                    style={{
                      color: "#00548B",
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "2px",
                    }}
                  >
                    YOUR NOTES
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 font-plus-bold text-sm text-white transition-all hover:opacity-90"
                    style={{
                      background: "#003557",
                      borderRadius: "2px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface RequestSampleSectionProps {
  productName: string;
}

export function RequestSampleSection({
  productName,
}: RequestSampleSectionProps) {
  const [formData, setFormData] = useState({
    yourName: "",
    companyName: "",
    email: "",
    inquiryTopic: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      className="py-12 md:py-16 lg:py-20 relative"
      style={{
        backgroundImage: "url('/our-catalog/Rectangle-App-Background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/90" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left: Image */}
          <div className="w-full flex items-center">
            <div className="relative w-full rounded-lg overflow-hidden">
              <Image
                src="/our-catalog/humulene.png"
                alt="Request a Sample"
                width={600}
                height={450}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col justify-center">
            {/* Form Header */}
            <div className="mb-6 md:mb-8">
              <p
                className="font-manrope-extrabold text-xs md:text-sm uppercase tracking-[2px] mb-2"
                style={{ color: "#00548B" }}
              >
                CONTACT US
              </p>
              <h2
                className="font-plus-bold text-2xl md:text-3xl lg:text-4xl"
                style={{
                  color: "#003557",
                  letterSpacing: "-1px",
                }}
              >
                Request a Sample
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Your Name */}
              <div className="relative">
                <input
                  type="text"
                  id="yourName"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleChange}
                  placeholder="Write Your Name"
                  className="w-full h-12 md:h-14 px-4 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all peer"
                  style={{
                    borderColor: "#00548B",
                    borderWidth: "0.5px",
                    backgroundColor: "#FAFDFF",
                    color: "#333333",
                  }}
                  required
                />
                <label
                  htmlFor="yourName"
                  className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                  style={{
                    color: "#00548B",
                    fontSize: "14px",
                    lineHeight: "16px",
                    letterSpacing: "2px",
                  }}
                >
                  YOUR NAME
                </label>
              </div>

              {/* Company Name and Email - Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Write your company name"
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
                    htmlFor="companyName"
                    className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                    style={{
                      color: "#00548B",
                      fontSize: "14px",
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
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Write your email"
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
                    htmlFor="email"
                    className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                    style={{
                      color: "#00548B",
                      fontSize: "14px",
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
                  id="inquiryTopic"
                  name="inquiryTopic"
                  value={formData.inquiryTopic}
                  onChange={handleChange}
                  className="w-full h-12 md:h-14 px-4 pr-10 rounded border font-manrope-regular text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all cursor-pointer"
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
                  htmlFor="inquiryTopic"
                  className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                  style={{
                    color: "#00548B",
                    fontSize: "14px",
                    lineHeight: "16px",
                    letterSpacing: "2px",
                  }}
                >
                  INQUIRY TOPICS
                </label>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Your Notes */}
              <div className="relative">
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Write your notes"
                  rows={4}
                  className="w-full px-4 py-3 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all resize-none"
                  style={{
                    borderColor: "#00548B",
                    borderWidth: "0.5px",
                    backgroundColor: "#FAFDFF",
                    color: "#333333",
                  }}
                />
                <label
                  htmlFor="notes"
                  className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                  style={{
                    color: "#00548B",
                    fontSize: "14px",
                    lineHeight: "16px",
                    letterSpacing: "2px",
                  }}
                >
                  YOUR NOTES
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-4 md:py-[18px] md:px-6 rounded font-plus-bold text-sm md:text-base text-white transition-all hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(90deg, #00548B 0%, rgba(0, 84, 139, 0.8) 100%)",
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
  );
}

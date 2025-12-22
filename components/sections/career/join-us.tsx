"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { getStrapiMedia } from "@/lib/strapi/api";
import { toSlug } from "@/lib/strapi/utils";
import type { CareerPageProps } from "@/types/strapi";

interface JoinUsProps {
  data: CareerPageProps["joinUs"];
  locale: string;
}

export function JoinUs({ data, locale }: JoinUsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    yourName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    address: "",
    position: "",
    cv: null as File | null,
  });

  const imageUrl = data.image
    ? getStrapiMedia(data.image.url)
    : "/hands-planting-seedling-in-soil-close-up-nature.jpg";

  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // reset previous error
    setFormError(null)

    // Validate all required fields
    if (!formData.yourName || !formData.email || !formData.phoneNumber || !formData.address || !formData.position || !formData.cv) {
      setFormError('Please fill all required fields and attach your CV.')
      return
    }

    try {
      setSubmitting(true)
      const body = new FormData()
      body.append('yourName', formData.yourName)
      body.append('email', formData.email)
      if (formData.countryCode) body.append('countryCode', formData.countryCode)
      body.append('phoneNumber', formData.phoneNumber)
      body.append('address', formData.address)
      body.append('position', formData.position)
      if (formData.cv) body.append('cv', formData.cv)

      const res = await fetch('/api/applicants', { method: 'POST', body })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        console.error('Submit error', json)

        // Extract a human-friendly message from server response
        let message = 'Failed to submit your application. Please try again later.'
        if (json) {
          if (json.details) {
            // details may be a JSON string from Strapi; try to parse it
            try {
              const parsed = typeof json.details === 'string' ? JSON.parse(json.details) : json.details
              // prefer a top-level message or Strapi's error.message
              message = parsed?.error?.message || parsed?.message || JSON.stringify(parsed)
            } catch (e) {
              message = String(json.details)
            }
          } else if (json.error) {
            message = String(json.error)
          }
        }

        setFormError(message)
      } else {
        const successJson = await res.json().catch(() => ({}))
        // clear on success
        setFormError(null)
        alert('Application submitted — thank you!')
        setIsModalOpen(false)
        setFormData({ yourName: '', email: '', countryCode: '', phoneNumber: '', address: '', position: '', cv: null })
      }
    } catch (err) {
      console.error('Error submitting applicant', err)
      alert('Failed to submit your application. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        cv: e.target.files[0],
      });
    }
  };

  return (
    <>
      <section
        id={toSlug(data.eyebrow)}
        className="py-12 md:py-16 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="relative rounded-[10px] overflow-hidden">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#003557] to-[#00548B] z-0" />

            {/* Content Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[500px] lg:min-h-[560px]">
              {/* Image Side */}
              <div className="relative h-[200px] sm:h-[250px] md:h-auto rounded-tl-[10px] rounded-bl-[10px] overflow-hidden">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={data.image?.alternativeText || "Join Us"}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Content Side - Glass Effect */}
              <div
                className="flex flex-col justify-center items-start p-6 sm:p-8 md:p-12 lg:p-16 rounded-tr-[10px] rounded-br-[10px]"
                style={{
                  background:
                    "linear-gradient(92.19deg, rgba(0, 84, 139, 0.16) 0%, rgba(0, 84, 139, 0.2) 100%)",
                  backdropFilter: "blur(100px)",
                  WebkitBackdropFilter: "blur(100px)",
                  borderLeft: "2px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <SectionLabel variant="bubble-light" className="mb-4 md:mb-6">
                  {data.eyebrow}
                </SectionLabel>
                <h2 className="font-plus-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 leading-tight">
                  {data.title}
                </h2>
                <p className="font-manrope-regular text-white/80 text-sm md:text-base mb-6 md:mb-8 leading-relaxed max-w-lg">
                  {data.description}
                </p>
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {data.opportunitiesButton && (
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(true)}
                      className="
                        bg-transparent
                        text-white text-sm md:text-[16px]
                        border border-white
                        hover:bg-white hover:text-indesso-dark-blue
                        transition-colors
                        w-full sm:w-auto h-12 md:h-14
                        rounded-[2px]
                        px-4 md:px-6 py-3 md:py-[18px]
                        flex items-center justify-center gap-2
                      "
                    >
                      {data.opportunitiesButton}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}

                  {/* Visit Our LinkedIn Button */}
                  <a
                    href={data.urlVisitButton || "https://www.linkedin.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      flex items-center justify-center gap-2
                      h-12 md:h-14
                      px-4 md:px-6
                      rounded-[2px]
                      border border-transparent
                      font-manrope-bold
                      text-sm md:text-[16px]
                      text-[#00548B]
                      bg-[#FEFEFE]
                      hover:bg-white hover:shadow-md
                      transition-all
                      cursor-pointer
                    "
                    style={{
                      lineHeight: "20px",
                    }}
                  >
                      {data.logoVisitButton?.url ? (
                        <Image
                          src={getStrapiMedia(data.logoVisitButton.url)}
                          alt={data.labelVisitButton || 'LinkedIn'}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.0391 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4844 7.25781 17.0391 9.23438 17.0391 11.8047V17.043ZM4.44922 6.19141C3.49219 6.19141 2.72266 5.41406 2.72266 4.46484C2.72266 3.51562 3.49219 2.74219 4.44922 2.74219C5.39844 2.74219 6.17578 3.51562 6.17578 4.46484C6.17578 5.41406 5.39844 6.19141 4.44922 6.19141ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043Z"
                            fill="#00548B"
                          />
                        </svg>
                      )}
                    {data.labelVisitButton || "Visit Us"}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg w-full max-w-[480px] md:max-w-[600px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#003557] text-white flex items-center justify-center hover:bg-[#00548B] transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Title */}
              <h2
                className="font-plus-bold text-indesso-dark-blue text-2xl md:text-3xl mb-6"
              >
                {data.join_us_modal?.title || "Join Indesso"}
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inline error message (server or client validation) */}
                {formError && (
                  <div className="rounded border border-red-200 bg-red-50 text-red-800 px-4 py-2 text-sm">
                    {formError}
                  </div>
                )}
                {/* Your Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="yourName"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleChange}
                    placeholder= {data.join_us_modal?.field_name?.placeholder || "Write Your Name"}
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
                    htmlFor="yourName"
                    className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                    style={{
                      color: "#00548B",
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "2px",
                    }}
                  >
                    {data.join_us_modal?.field_name?.title || "YOUR NAME"}
                  </label>
                </div>

                {/* Email and Phone - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={data.join_us_modal?.field_email?.placeholder || "Write your email"}
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
                        fontSize: "12px",
                        lineHeight: "16px",
                        letterSpacing: "2px",
                      }}
                    >
                      {data.join_us_modal?.field_email?.title || "EMAIL"}
                    </label>
                  </div>

                  {/* Phone Number */}
                  <div className="relative">
                    <div className="flex h-12 md:h-14">
                      <input
                        type="text"
                        id="countryCode"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        placeholder="+62"
                        disabled
                        aria-disabled={true}
                        className="w-14 h-full px-2 rounded-l border-y border-l font-manrope-regular text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all opacity-50"
                        style={{
                          borderColor: "#00548B",
                          borderWidth: "0.5px",
                          backgroundColor: "#FAFDFF",
                          color: "#A1A1A1",
                        }}
                      />
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder={data.join_us_modal?.field_contact?.placeholder || "81234567890"}
                        className="flex-1 h-full px-4 rounded-r border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
                        style={{
                          borderColor: "#00548B",
                          borderWidth: "0.5px",
                          backgroundColor: "#FAFDFF",
                          color: "#333333",
                        }}
                        required
                      />
                    </div>
                    <label
                      htmlFor="countryCode"
                      className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                      style={{
                        color: "#00548B",
                        fontSize: "12px",
                        lineHeight: "16px",
                        letterSpacing: "2px",
                      }}
                    >
                      {data.join_us_modal?.field_contact?.title || "CONTACT NUMBER"}
                    </label>
                  </div>
                </div>

                {/* Address */}
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={data.join_us_modal?.field_address?.placeholder || "Write your address"}
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
                    htmlFor="address"
                    className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                    style={{
                      color: "#00548B",
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "2px",
                    }}
                  >
                    {data.join_us_modal?.field_address?.title || "ADDRESS"}
                  </label>
                </div>

                {/* Position */}
                <div className="relative">
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full h-12 md:h-14 px-4 pr-10 rounded border font-manrope-regular text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all cursor-pointer"
                    style={{
                      borderColor: "#00548B",
                      borderWidth: "0.5px",
                      backgroundColor: "#FAFDFF",
                      color: formData.position ? "#333333" : "#A1A1A1",
                    }}
                    required
                  >
                    <option value="" style={{ color: "#A1A1A1" }}>
                      {data.join_us_modal?.field_position?.placeholder || "Select a position"}
                    </option>
                    {data.join_us_modal?.field_position?.option && data.join_us_modal.field_position.option.length > 0 ? (
                      data.join_us_modal.field_position.option.map((opt) => (
                        <option key={opt.id} value={toSlug(opt.option)} style={{ color: "#333333" }}>
                          {opt.option}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="software-engineer" style={{ color: "#333333" }}>
                          Software Engineer
                        </option>
                        <option value="marketing" style={{ color: "#333333" }}>
                          Marketing
                        </option>
                        <option value="sales" style={{ color: "#333333" }}>
                          Sales
                        </option>
                        <option value="hr" style={{ color: "#333333" }}>
                          Human Resources
                        </option>
                        <option value="other" style={{ color: "#333333" }}>
                          Other
                        </option>
                      </>
                    )}
                  </select>
                  <label
                    htmlFor="position"
                    className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                    style={{
                      color: "#00548B",
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "2px",
                    }}
                  >
                    {data.join_us_modal?.field_position?.title || "POSITION"}
                  </label>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                {/* CV Upload */}
                <div className="relative">
                  <div
                    className="w-full h-14 rounded border flex items-center overflow-hidden"
                    style={{
                      borderColor: "#00548B",
                      borderWidth: "0.5px",
                      backgroundColor: "#FAFDFF",
                    }}
                  >
                    <p className="font-manrope-regular text-xs text-[#A1A1A1] flex-1 px-4 truncate">
                      {formData.cv
                        ? formData.cv.name
                        : data.join_us_modal?.field_file?.placeholder || "No file chosen"}
                    </p>
                    <label
                      htmlFor="cv"
                      className="shrink-0 h-full px-6 font-plus-bold text-xs text-white cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap flex items-center"
                      style={{
                        background: "#003557",
                        letterSpacing: "1px",
                      }}
                    >
                      {data.join_us_modal?.field_file?.button || "CHOOSE FILE"}
                    </label>
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <label
                    className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
                    style={{
                      color: "#00548B",
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "2px",
                    }}
                  >
                    {data.join_us_modal?.field_file?.title || "UPLOAD CV"}
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full md:w-auto px-8 py-3 font-plus-bold text-sm text-white transition-all ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                    style={{
                      background: "#00548B",
                      borderRadius: "2px",
                      letterSpacing: "1px",
                    }}
                  >
                    {submitting ? (data.join_us_modal?.submit_button ? `${data.join_us_modal.submit_button}...` : 'Submitting...') : (data.join_us_modal?.submit_button || "SUBMIT CV")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

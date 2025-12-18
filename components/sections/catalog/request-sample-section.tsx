"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi/client";
import { submitConnectionForm } from "@/lib/strapi/connection-forms-api";
import { SectionLabel } from "@/components/ui/section-label";

interface RequestSampleSectionProps {
  productName: string;
  data?: any;
}

export function RequestSampleSection({
  productName,
  data,
}: RequestSampleSectionProps) {
  const [formData, setFormData] = useState({
    yourName: "",
    companyName: "",
    email: "",
    inquiryTopic: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null)

  // auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if (successMessage || errorMessage) {
      timerRef.current = window.setTimeout(() => {
        setSuccessMessage(null)
        setErrorMessage(null)
        timerRef.current = null
      }, 5000)
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [successMessage, errorMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const form = e.currentTarget as HTMLFormElement;
    // Use browser validation first
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // All fields required
    if (!formData.yourName || !formData.companyName || !formData.email || !formData.inquiryTopic || !formData.notes) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
      const pathname = typeof window !== "undefined" ? window.location.pathname : ""

      let formPageValue: string | undefined = undefined

      try {
        const p = pathname || ""
        // product page
        if (p.includes("/our-catalog/")) {
          formPageValue = productName || data?.title
        }

        // botanical detail page
        if (!formPageValue && (p.includes("botanical-detail") || p.includes("/our-business/botanical"))) {
          formPageValue = data?.botanical_name ?? data?.botanical?.name ?? data?.title ?? productName
        }

        // contact page
        if (!formPageValue && (p.includes("/contact") || (data?.title && String(data.title).toLowerCase().includes("contact")))) {
          formPageValue = data?.title ?? "Contact Us"
        }

        // final fallbacks
        formPageValue = formPageValue ?? productName ?? data?.form_page ?? p ?? ""
      } catch (e) {
        formPageValue = productName ?? data?.form_page ?? ""
      }

    // Submit via helper
    const payload = {
      name: formData.yourName,
      company_name: formData.companyName,
      email: formData.email,
      inquiry_topics: formData.inquiryTopic,
      your_notes: formData.notes,
      form_page: String(formPageValue),
    }
    console.log("Submitting form with payload:", payload)

    setSubmitting(true)
    try {
      const json = await submitConnectionForm(payload)
      setSuccessMessage(json?.message ?? data?.success_message ?? "Thank you — your request has been submitted.")
      setFormData({ yourName: "", companyName: "", email: "", inquiryTopic: "", notes: "" })
    } catch (err: any) {
      setErrorMessage(err?.message ?? "Failed to submit. Please try again later.")
    } finally {
      setSubmitting(false)
    }
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

  const imageSrc = data?.image?.url ? getStrapiMedia(data.image.url) : "/our-catalog/humulene.png"

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
                src={imageSrc}
                alt={data?.image?.alternativeText || "Request a Sample"}
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
              <SectionLabel variant="bubble" className="mb-4">{data?.eyebrow}</SectionLabel>
              <h2
                className="font-plus-bold text-2xl md:text-3xl lg:text-4xl"
                style={{
                  color: "#003557",
                  letterSpacing: "-1px",
                }}
              >
                {data?.title ?? "Request a Sample"}
              </h2>
            </div>

            {/* Feedback messages (same style as VisitorForm) */}
            {successMessage && (
              <div role="status" className="mb-6 p-4 rounded border border-green-200 bg-green-50 text-green-800">
                <strong className="block font-plus-bold">{successMessage}</strong>
              </div>
            )}
            {errorMessage && (
              <div role="alert" className="mb-6 p-4 rounded border border-red-200 bg-red-50 text-red-800">
                <strong className="block font-plus-bold">{errorMessage}</strong>
              </div>
            )}

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
                  placeholder={data?.field_name?.placeholder ?? "Write Your Name"}
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
                  {String(data?.field_name?.title ?? "YOUR NAME").toUpperCase()}
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
                    placeholder={data?.field_company_name?.placeholder ?? "Write your company name"}
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
                    {String(data?.field_company_name?.title ?? "COMPANY NAME").toUpperCase()}
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
                    placeholder={data?.field_email?.placeholder ?? "Write your email"}
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
                    {String(data?.field_email?.title ?? "EMAIL").toUpperCase()}
                  </label>
                </div>
              </div>

              {/* Inquiry Topics */}
              <div className="relative">
                {/* Build options from CMS data if provided */}
                {(() => {
                  const topicOptions = (data?.field_topic?.option as any[]) || []
                  const placeholderText = data?.field_topic?.placeholder || "Choose your inquiry topics"
                  return (
                    <>
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
                          {placeholderText}
                        </option>
                        {topicOptions.length > 0
                          ? topicOptions.map((opt) => {
                              // Prefer human-readable string fields for the label (e.g. size, option, value, label)
                              let label: string | undefined = undefined
                              if (opt?.size && typeof opt.size === "string") label = opt.size
                              if (!label && opt?.label && typeof opt.label === "string") label = opt.label
                              if (!label && opt?.option && typeof opt.option === "string") label = opt.option
                              if (!label && opt?.value && typeof opt.value === "string") label = opt.value
                              // Fallback: try to find any string property besides id
                              if (!label) {
                                for (const k in opt) {
                                  if (k !== "id" && typeof (opt as any)[k] === "string") {
                                    label = (opt as any)[k]
                                    break
                                  }
                                }
                              }
                              const val = label ?? String(opt?.id ?? "")
                              const key = String(opt?.id ?? val)
                              return (
                                <option key={key} value={val} style={{ color: "#333333" }}>
                                  {label ?? key}
                                </option>
                              )
                            })
                          : (
                            // fallback static options
                            <>
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
                            </>
                          )}
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
                        {data?.field_topic?.title ?? "INQUIRY TOPICS"}
                      </label>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </>
                  )
                })()}
              </div>

              {/* Your Notes */}
              <div className="relative">
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={data?.field_note?.placeholder ?? "Write your notes"}
                  rows={4}
                  required
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
                  {String(data?.field_note?.title ?? "YOUR NOTES").toUpperCase()}
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto px-6 py-4 md:py-[18px] md:px-6 rounded font-plus-bold text-sm md:text-base text-white transition-all hover:opacity-90 disabled:opacity-60"
                  style={{
                    background:
                      "linear-gradient(90deg, #00548B 0%, rgba(0, 84, 139, 0.8) 100%)",
                    borderRadius: "2px",
                    border: "1px solid #00548B",
                  }}
                >
                  {submitting ? (data?.submitting_text ?? "Sending...") : (data?.button ?? "Submit")}
                </button>

                {/* messages handled above and auto-dismiss */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

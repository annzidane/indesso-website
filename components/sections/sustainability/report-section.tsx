"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { StrapiImage, SustainabilityPageProps, ReportItem } from "@/types/strapi"
import { SectionLabel } from "@/components/ui/section-label"

interface ReportSectionProps {
  data: SustainabilityPageProps["report"]
  reports?: ReportItem[]
}

const ITEMS_PER_PAGE = 5

export function ReportSection({ data, reports = [] }: ReportSectionProps) {
  const { eyebrow, title, description, subTitle, buttonText, image, titleReport = "Older Reports" } = data
  const [currentPage, setCurrentPage] = useState(1)
  
  // Get latest report (first item, assuming sorted by year desc)
  const latestReport = reports.length > 0 ? reports[0] : null
  const olderReports = reports.slice(1)
  
  // Pagination for older reports
  const totalPages = Math.ceil(olderReports.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleReports = olderReports.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleDownload = (fileUrl?: string) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank")
    }
  }

  // SubTitle with latest year
  const subTitleWithYear = latestReport 
    ? `${subTitle} ${latestReport.year}` 
    : subTitle

  return (
    <section id="report" className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 ">
        {/* Main Report Section */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-20 lg:gap-28 items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          {/* Report Preview */}
          <div className="relative order-2 lg:order-1">
            <Image
              src={image ? getStrapiMedia(image.url) : "/sustainability-report-placeholder.png"}
              alt={image?.alternativeText || title}
              width={560}
              height={470}
              className="w-full h-auto max-w-md mx-auto lg:max-w-none"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <SectionLabel variant="bubble" className="mb-4">{eyebrow}</SectionLabel>
            <h2 className="text-indesso-dark-blue text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-plus-bold mb-4 md:mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-indesso-grey text-sm md:text-base leading-relaxed mb-6 md:mb-8">
              {description}
            </p>

            <div className="mb-6 md:mb-8">
              <h3 className="text-indesso-dark-blue text-lg md:text-xl font-plus-semibold mb-3 md:mb-4">
                {subTitleWithYear}
              </h3>
              <Button
                variant="outline"
                className="
                  border-indesso-blue text-indesso-blue bg-transparent
                  hover:bg-white hover:text-indesso-dark-blue
                  text-sm sm:text-[16px] md:text-base
                  rounded-[2px]
                  px-4 sm:px-6 py-3 sm:py-[25px]
                  w-full sm:w-auto
                "
                onClick={() => handleDownload(latestReport?.fileUrl)}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>

        {/* Older Reports Section */}
        {olderReports.length > 0 && (
          <div>
            {/* Header with line */}
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl italic sm:text-2xl md:text-3xl font-plus-bold text-indesso-dark-blue shrink-0">
                {titleReport}
              </h3>
              <div className="flex-1 h-1 bg-indesso-blue opacity-20" />
            </div>

            {/* Reports List */}
            <div className="space-y-0">
              {visibleReports.map((report) => (
                <div
                  key={report.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200 gap-3 sm:gap-4"
                >
                  <div>
                    <p className="text-base md:text-lg font-plus-bold text-indesso-blue">
                      {report.year}
                    </p>
                    <p className="text-sm sm:text-[16px] text-indesso-grey py-1 sm:py-2">
                      {report.title || "Sustainability Report"}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="
                      border-indesso-blue text-indesso-blue bg-transparent
                      hover:bg-indesso-blue hover:text-white
                      text-sm sm:text-[16px] md:text-base
                      rounded-[2px]
                      px-4 sm:px-6 py-3 sm:py-[25px]
                      w-full sm:w-auto
                    "
                    onClick={() => handleDownload(report.fileUrl)}
                  >
                    {buttonText}
                  </Button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-8"
            />
          </div>
        )}
      </div>
    </section>
  )
}

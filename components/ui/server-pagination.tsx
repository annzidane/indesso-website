"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ServerPaginationProps {
  currentPage: number
  totalPages: number
  className?: string
}

export function ServerPagination({
  currentPage,
  totalPages,
  className = "",
}: ServerPaginationProps) {
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `?${params.toString()}`
  }

  const effectiveTotalPages = Math.max(1, totalPages)
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < effectiveTotalPages

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (effectiveTotalPages <= 7) {
      for (let i = 1; i <= effectiveTotalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", effectiveTotalPages)
      } else if (currentPage >= effectiveTotalPages - 2) {
        pages.push(
          1,
          "...",
          effectiveTotalPages - 3,
          effectiveTotalPages - 2,
          effectiveTotalPages - 1,
          effectiveTotalPages
        )
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          effectiveTotalPages
        )
      }
    }
    return pages
  }

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      <Link
        href={canGoPrev ? createPageURL(currentPage - 1) : "#"}
        className={`p-2 transition-colors ${
          canGoPrev
            ? "text-gray-600 hover:text-indesso-dark-blue cursor-pointer"
            : "text-gray-300 cursor-not-allowed"
        }`}
        aria-disabled={!canGoPrev}
        tabIndex={canGoPrev ? undefined : -1}
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>

      <span className={`text-sm px-2 ${canGoPrev ? "text-gray-600" : "text-gray-300"}`}>
        Prev
      </span>

      <div className="flex items-center gap-1 mx-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createPageURL(page)}
              className={`min-w-8 h-8 rounded text-sm font-plus-medium transition-colors flex items-center justify-center ${
                currentPage === page
                  ? "text-indesso-dark-blue font-plus-bold"
                  : "text-gray-500 hover:text-indesso-dark-blue"
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      <span className={`text-sm px-2 ${canGoNext ? "text-gray-600" : "text-gray-300"}`}>
        Next
      </span>

      <Link
        href={canGoNext ? createPageURL(currentPage + 1) : "#"}
        className={`p-2 transition-colors ${
          canGoNext
            ? "text-gray-600 hover:text-indesso-dark-blue cursor-pointer"
            : "text-gray-300 cursor-not-allowed"
        }`}
        aria-disabled={!canGoNext}
        tabIndex={canGoNext ? undefined : -1}
      >
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  )
}

"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ""
}: PaginationProps) {
  // Always show pagination, even with 0 or 1 page
  const effectiveTotalPages = Math.max(1, totalPages)
  
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < effectiveTotalPages

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    if (effectiveTotalPages <= 7) {
      // Show all pages if 7 or less
      for (let i = 1; i <= effectiveTotalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first, last, current and surrounding pages
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', effectiveTotalPages)
      } else if (currentPage >= effectiveTotalPages - 2) {
        pages.push(1, '...', effectiveTotalPages - 3, effectiveTotalPages - 2, effectiveTotalPages - 1, effectiveTotalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', effectiveTotalPages)
      }
    }
    
    return pages
  }

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {/* Prev Button */}
      <button
        onClick={() => canGoPrev && onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className={`p-2 transition-colors ${
          canGoPrev 
            ? 'text-gray-600 hover:text-indesso-dark-blue cursor-pointer' 
            : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <span className={`text-sm px-2 ${
        canGoPrev ? 'text-gray-600' : 'text-gray-300'
      }`}>
        Prev
      </span>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 mx-2">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`min-w-[32px] h-8 rounded text-sm font-plus-medium transition-colors ${
                currentPage === page 
                  ? "text-indesso-dark-blue font-plus-bold" 
                  : "text-gray-500 hover:text-indesso-dark-blue"
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <span className={`text-sm px-2 ${
        canGoNext ? 'text-gray-600' : 'text-gray-300'
      }`}>
        Next
      </span>

      {/* Next Button */}
      <button
        onClick={() => canGoNext && onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`p-2 transition-colors ${
          canGoNext 
            ? 'text-gray-600 hover:text-indesso-dark-blue cursor-pointer' 
            : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CatalogSearch() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  const handleSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")
    if (sortValue !== "default") {
      params.set("sort", sortValue)
    } else {
      params.delete("sort")
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search Ingredients"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("search")?.toString()}
          className="pl-10 bg-white"
        />
      </div>

      <Select
        onValueChange={handleSort}
        defaultValue={searchParams.get("sort")?.toString() || "default"}
      >
        <SelectTrigger className="w-full md:w-[180px] bg-white">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Sort by</SelectItem>
          <SelectItem value="name:asc">Name (A-Z)</SelectItem>
          <SelectItem value="name:desc">Name (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

type FetchOptions = {
  locale?: string
  populate?: string | Record<string, unknown>
  filters?: Record<string, unknown>
  revalidate?: number
  query?: Record<string, string | number | boolean>
}

/**
 * Convert nested filter object to Strapi v5 bracket notation
 * Example: { slug: { $eq: 'test' } } => 'filters[slug][$eq]=test'
 */
function buildFilterParams(filters: Record<string, unknown>, prefix = 'filters'): URLSearchParams {
  const params = new URLSearchParams()
  
  function addParams(obj: Record<string, unknown>, currentPrefix: string) {
    for (const [key, value] of Object.entries(obj)) {
      const newPrefix = `${currentPrefix}[${key}]`
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        addParams(value as Record<string, unknown>, newPrefix)
      } else {
        params.set(newPrefix, String(value))
      }
    }
  }
  
  addParams(filters, prefix)
  return params
}

export async function fetchStrapi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const {
    locale = "en",
    populate,
    filters,
    revalidate = 60,
    query,
  } = options

  const params = new URLSearchParams()

  if (locale) {
    params.set("locale", locale)
  }

  if (typeof populate === "string") {
    params.set("populate", populate)
  } else if (populate) {
    params.set("populate", JSON.stringify(populate))
  }

  // Use bracket notation for filters (Strapi v5 format)
  if (filters) {
    const filterParams = buildFilterParams(filters)
    filterParams.forEach((value, key) => {
      params.set(key, value)
    })
  }

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        params.set(key, String(value))
      }
    }
  }

  const url = `${STRAPI_URL}/api/${endpoint}?${params.toString()}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
  }

  return response.json()
}

export function getStrapiMedia(url: string | null): string {
  if (!url) return "/abstract-geometric-sculpture.png"
  if (url.startsWith("http")) return url
  return `${STRAPI_URL}${url}`
}

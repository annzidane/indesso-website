const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

export class StrapiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public url: string
  ) {
    super(`Strapi Error ${status}: ${message} (${url})`)
    this.name = "StrapiError"
  }
}

type FetchOptions = {
  locale?: string
  populate?: string | Record<string, unknown>
  filters?: Record<string, unknown>
  revalidate?: number
  query?: Record<string, string | number | boolean | undefined | null>
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
      // If the value is an array, serialize as JSON so complex filters (e.g. $in) are preserved
      if (Array.isArray(value)) {
        // Encode arrays using indexed bracket notation so Strapi receives multiple values:
        // e.g. filters[insight_categories][slug][$in][0]=bakery
        for (let i = 0; i < value.length; i++) {
          const val = value[i]
          const indexedKey = `${newPrefix}[${i}]`
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            addParams(val as Record<string, unknown>, indexedKey)
          } else {
            params.set(indexedKey, String(val))
          }
        }
      } else if (typeof value === 'object' && value !== null) {
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

  // Ensure endpoint doesn't start with /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  const url = `${STRAPI_URL}/api/${cleanEndpoint}?${params.toString()}`

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate },
    })

    if (!response.ok) {
      // Try to parse error message from Strapi if available
      let errorMessage = response.statusText;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody?.error?.message || errorMessage;
      } catch {
        // ignore JSON parse error
      }
      throw new StrapiError(response.status, errorMessage, url)
    }

    return response.json()
  } catch (error) {
    // If it's already a StrapiError, rethrow it
    if (error instanceof StrapiError) {
      throw error
    }
    // Network errors or other fetch issues
    throw new StrapiError(500, error instanceof Error ? error.message : "Unknown error", url)
  }
}

export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return ""
  if (url.startsWith("http")) return url
  return `${STRAPI_URL}${url}`
}

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

type FetchOptions = {
  locale?: string
  populate?: string | Record<string, unknown>
  filters?: Record<string, unknown>
  revalidate?: number
  query?: Record<string, string | number | boolean>
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

  if (filters) {
    params.set("filters", JSON.stringify(filters))
  }

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        params.set(key, String(value))
      }
    }
  }

  const url = `${STRAPI_URL}/api/${endpoint}?${params.toString()}`
  console.log("Fetching Strapi URL:", url)

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

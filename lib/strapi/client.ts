const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

interface FetchOptions {
  locale?: string
  populate?: string | object
  filters?: object
  revalidate?: number
}

export async function fetchStrapi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { locale = "en", populate = "*", filters, revalidate = 60 } = options

  const params = new URLSearchParams()
  params.set("locale", locale)

  if (typeof populate === "string") {
    params.set("populate", populate)
  } else if (populate) {
    params.set("populate", JSON.stringify(populate))
  }

  if (filters) {
    params.set("filters", JSON.stringify(filters))
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

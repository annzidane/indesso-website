import { fetchStrapi } from "./client"
import type { InsightsApiResponse, InsightData } from "@/types/strapi/insights"

/**
 * Fetch media insights (matches the articles-api style)
 * Returns the raw Strapi response { data, meta }
 */
export async function getMediaInsights(
  locale: string = "en",
  start: number = 0,
  limit: number = 8,
  pLevel: number = 5
): Promise<InsightsApiResponse> {
  const resp = await fetchStrapi<InsightsApiResponse>("media-insights", {
    locale,
    query: {
      sort: "date:desc",
      ["pagination[start]"]: start,
      ["pagination[limit]"]: limit,
      pLevel,
    },
    revalidate: 60,
  })

  // We return the full response here as per original implementation (logic likely depends on meta)
  // But we ensure data exists effectively by the type system and fetchStrapi's check if we added one (we did throw in fetchStrapi for non-2xx, but empty data is valid empty array)
  return resp
}

export async function getMediaInsightBySlug(
  slug: string,
  locale: string = "en",
  pLevel: number = 5
): Promise<InsightData | null> {
  const resp = await fetchStrapi<InsightsApiResponse>("media-insights", {
    locale,
    filters: { slug: { $eq: slug } },
    query: { pLevel },
    revalidate: 60,
  })

  return resp.data?.[0] || null
}

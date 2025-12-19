import { fetchStrapi } from "./client";

/**
 * Fetch media insights (matches the articles-api style)
 * Returns the raw Strapi response { data, meta }
 */
export async function getMediaInsights(
  locale: string = "en",
  start: number = 0,
  limit: number = 8,
  pLevel: number = 5
) {
  try {
    const resp = await fetchStrapi<any>("media-insights", {
      locale,
      query: {
        sort: "date:desc",
        ["pagination[start]"]: start,
        ["pagination[limit]"]: limit,
        pLevel,
      },
      revalidate: 60,
    });
    console.log("Fetched media insights:", resp);
    return resp;
  } catch (err) {
    console.error("Error fetching media insights:", err);
    return { data: [], meta: { pagination: { page: 1, pageSize: limit, pageCount: 1, total: 0 } } };
  }
}

export async function getMediaInsightBySlug(slug: string, locale: string = "en", pLevel: number = 5) {
  try {
    const resp: any = await fetchStrapi("media-insights", {
      locale,
      filters: { slug: { $eq: slug } },
      query: { pLevel },
      revalidate: 60,
    });
    const data = Array.isArray(resp?.data) ? resp.data : [];
    return data[0] ?? null;
  } catch (err) {
    console.error("Error fetching media insight by slug:", err);
    return null;
  }
}

import { fetchStrapi } from "./client";

/**
 * Fetch articles from Strapi filtered by category with pagination and sort by date desc.
 * Returns the full Strapi response object { data, meta } so callers can use pagination meta.
 */
export async function getArticles(
  category: string,
  locale: string = "en",
  start: number = 0,
  limit: number = 6
) {
  try {
    const resp = await fetchStrapi<any>("articles", {
      locale,
      filters: {
        article_category: {
          $eq: category,
        },
      },
      query: {
        sort: "date:desc",
        ["pagination[start]"]: start,
        ["pagination[limit]"]: limit,
        pLevel: 3,
      },
      revalidate: 60,
    });

    return resp;
  } catch (err) {
    console.error("Error fetching articles:", err);
    return { data: [], meta: { pagination: { page: 1, pageSize: limit, pageCount: 1, total: 0 } } };
  }
}

import { MediaDetailApiResponse } from "@/types/strapi/media";
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
// /api/media-detail

/**
 * Fetch Media Detail Page data
 */
export async function getMediaDetailPage(
  locale: string = "en"
): Promise<MediaDetailApiResponse["data"] | null> {
  try {
    const response = await fetchStrapi<MediaDetailApiResponse>("media-detail", {
      locale,
      query: { pLevel: 5 },
      revalidate: 60,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching product detail page:", error)
    return null
  }
}

/**
 * Fetch a single article by slug. Returns the first matching article or null.
 */
export async function getArticleBySlug(
  slug: string,
  locale: string = "en",
  pLevel: number = 3
) {
  try {
    const resp: any = await fetchStrapi("articles", {
      locale,
      filters: { slug: { $eq: slug } },
      query: { pLevel },
      revalidate: 60,
    })
    const data = Array.isArray(resp?.data) ? resp.data : []
    return data[0] ?? null
  } catch (err) {
    console.error("Error fetching article by slug:", err)
    return null
  }
}

/**
 * Fetch related articles by article_category, excluding a specific slug.
 * Returns an array of articles (raw Strapi items).
 */
export async function getRelatedArticlesByCategory(
  category: string,
  excludeSlug: string | null,
  locale: string = "en",
  limit: number = 3
) {
  try {
    const filters: any = {
      article_category: { $eq: category },
    }
    if (excludeSlug) filters.slug = { $ne: excludeSlug }

    const resp: any = await fetchStrapi("articles", {
      locale,
      filters,
      query: {
        sort: "date:desc",
        ["pagination[limit]"]: limit,
        pLevel: 3,
      },
      revalidate: 60,
    })
    return Array.isArray(resp?.data) ? resp.data : []
  } catch (err) {
    console.error("Error fetching related articles:", err)
    return []
  }
}

/**
 * Convenience helper to fetch an article and its related articles together.
 * Returns { article, related } where `article` is the raw Strapi article object
 * and `related` is an array of raw Strapi article objects.
 */
export async function getArticlePageData(
  slug: string,
  locale: string = "en",
  pLevel: number = 3,
  relatedLimit: number = 3
) {
  try {
    const article = await getArticleBySlug(slug, locale, pLevel)
    if (!article) return { article: null, related: [] }

    const category = article.article_category || article.category || null
    const related = category
      ? await getRelatedArticlesByCategory(category, slug, locale, relatedLimit)
      : []

    return { article, related }
  } catch (err) {
    console.error("Error building article page data:", err)
    return { article: null, related: [] }
  }
}
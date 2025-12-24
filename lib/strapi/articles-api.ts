import type { MediaDetailApiResponse } from "@/types/strapi/media"
import type { ArticlesApiResponse, Article } from "@/types/strapi/articles"
import { fetchStrapi } from "./client"

/**
 * Fetch articles from Strapi filtered by category with pagination and sort by date desc.
 * Returns the full Strapi response object { data, meta } so callers can use pagination meta.
 */
export async function getArticles(
  category: string,
  locale: string = "en",
  start: number = 0,
  limit: number = 6
): Promise<ArticlesApiResponse> {
  const resp = await fetchStrapi<ArticlesApiResponse>("articles", {
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
  })

  // We return the full response to allow access to meta pagination
  return resp
}

/**
 * Fetch Media Detail Page data
 */
export async function getMediaDetailPage(
  locale: string = "en"
): Promise<MediaDetailApiResponse["data"] | null> {
  const response = await fetchStrapi<MediaDetailApiResponse>("media-detail", {
    locale,
    query: { pLevel: 5 },
    revalidate: 60,
  })
  return response.data
}


/**
 * Fetch Media Explore Insight Page data
 */
export async function getMediaExploreInsight(
  locale: string = "en"
): Promise<MediaDetailApiResponse["data"] | null> {
  const response = await fetchStrapi<MediaDetailApiResponse>("media-explore-insight", {
    locale,
    query: { pLevel: 3 },
    revalidate: 60,
  })
  return response.data
}
/**
 * Fetch a single article by slug. Returns the first matching article or null.
 */
export async function getArticleBySlug(
  slug: string,
  locale: string = "en",
  pLevel: number = 3
): Promise<Article | null> {
  const resp = await fetchStrapi<ArticlesApiResponse>("articles", {
    locale,
    filters: { slug: { $eq: slug } },
    query: { pLevel },
    revalidate: 60,
  })

  return resp.data?.[0] || null
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
): Promise<Article[]> {
  const filters: any = {
    article_category: { $eq: category },
  }
  if (excludeSlug) filters.slug = { $ne: excludeSlug }

  const resp = await fetchStrapi<ArticlesApiResponse>("articles", {
    locale,
    filters,
    query: {
      sort: "date:desc",
      ["pagination[limit]"]: limit,
      pLevel: 3,
    },
    revalidate: 60,
  })

  return resp.data || []
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
): Promise<{ article: Article | null; related: Article[] }> {
  try {
    const article = await getArticleBySlug(slug, locale, pLevel)
    if (!article) return { article: null, related: [] }

    const category = article.article_category || null
    const related = category
      ? await getRelatedArticlesByCategory(category, slug, locale, relatedLimit)
      : []

    return { article, related }
  } catch (err) {
    console.error("Error building article page data:", err)
    // Here we can choose to propagate error or return null/empty, but typical page data fetch might prefer returning null if main article fails
    // However, getArticleBySlug now might throw if fetchStrapi throws (on 404/500).
    // If we want fail-loud for page generation, we should rethrow.
    throw err
  }
}
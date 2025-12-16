/**
 * Catalog API Functions
 */

import { fetchStrapi } from "./client"
import type {
  CatalogPageApiResponse,
  CatalogPageData,
  Product,
  ProductApiResponse,
  ProductCategoryApiResponse,
  ProductCategory,
  ProductDetailPageApiResponse,
  ProductDetailPageData,
} from "@/types/strapi"

const ITEMS_PER_PAGE = 12

/**
 * Fetch Catalog page data (hero)
 */
export async function getCatalogPage(locale: string = "en"): Promise<CatalogPageData | null> {
  try {
    const response = await fetchStrapi<CatalogPageApiResponse>("our-business-catalog", {
      locale,
      query: { pLevel: 3 },
      revalidate: 60,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching catalog page:", error)
    return null
  }
}

/**
 * Fetch Products with filters, search, sort, and pagination
 */
export async function   getProducts(params: {
  locale?: string
  categorySlug?: string
  botanicalSlug?: string
  search?: string
  sortBy?: string
  page?: number
}): Promise<ProductApiResponse> {
  const {
    locale = "en",
    categorySlug,
    botanicalSlug,
    search,
    sortBy = "name:asc",
    page = 1,
  } = params

  const filters: any = {}
  if (categorySlug) {
    filters.product_category = { slug: { $eq: categorySlug } }
  }
  if (botanicalSlug) {
    filters.botanical = { slug: { $eq: botanicalSlug } }
  }
  if (search) {
    filters.name = { $containsi: search }
  }

  try {
    const response = await fetchStrapi<ProductApiResponse>("products", {
      locale,
      filters,
      query: {
        "pagination[page]": page,
        "pagination[pageSize]": ITEMS_PER_PAGE,
        sort: sortBy,
        "populate[product_category][fields][0]": "name",
        "populate[product_category][fields][1]": "slug",
        "populate[botanical][fields][0]": "slug",
        pLevel: 2,
      },
      revalidate: 60,
    })

    return response
  } catch (error) {
    console.error("Error fetching products:", error)
    return { data: [], meta: { pagination: { page: 1, pageSize: ITEMS_PER_PAGE, pageCount: 1, total: 0 } } }
  }
}

/**
 * Fetch all product categories
 */
export async function getProductCategories(
  locale: string = "en"
): Promise<ProductCategory[]> {
  try {
    const response = await fetchStrapi<ProductCategoryApiResponse>("product-categories", {
      locale,
      revalidate: 60,
    })
    return response.data || []
  } catch (error) {
    console.error("Error fetching product categories:", error)
    return []
  }
}

/**
 * Fetch Product Detail page data (static sections)
 */
export async function getProductDetailPage(
  locale: string = "en"
): Promise<ProductDetailPageData | null> {
  try {
    const response = await fetchStrapi<ProductDetailPageApiResponse>("our-business-product-detail", {
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
 * Get all product category slugs for static params
 */
export async function getAllProductCategorySlugs(locale: string = "en"): Promise<string[]> {
  try {
    const categories = await getProductCategories(locale)
    return categories.map((cat) => cat.slug)
  } catch (error) {
    console.error("Error fetching all product category slugs:", error)
    return []
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string, locale: string = "en"): Promise<Product | null> {
  try {
    const response = await fetchStrapi<ProductApiResponse>("products", {
      locale,
      filters: { slug: { $eq: slug } },
      query: {
        "populate[botanical][fields][0]": "slug",
        pLevel: 3,
      }, // Ensure relations are populated
      revalidate: 60,
    })
    
    return response.data?.[0] || null
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error)
    return null
  }
}

/**
 * Get all product slugs for static params
 */
export async function getAllProductSlugs(locale: string = "en"): Promise<string[]> {
  try {
    // This fetches all products, which could be inefficient.
    // A dedicated endpoint for slugs would be better if available.
    const response = await fetchStrapi<ProductApiResponse>("products", {
      locale,
      query: { "fields[0]": "slug" },
      revalidate: 60,
    })
    return response.data?.map((p) => p.slug) || []
  } catch (error) {
    console.error("Error fetching all product slugs:", error)
    return []
  }
}

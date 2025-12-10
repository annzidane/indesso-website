/**
 * Our Business API Functions
 */

import { fetchStrapi, getStrapiMedia } from "./client"
import type {
  OurBusinessApiResponse,
  OurBusinessData,
  OurBusinessHeroProps,
  OurBusinessNavItem,
  OurBusinessPageProps,
  ProductSubCategory,
  ProductSubCategoryApiResponse,
} from "@/types/strapi"

// ============================================
// Our Business Page API
// ============================================

/**
 * Fetch Our Business page data (hero, sticky nav)
 */
export async function getOurBusinessPage(locale: string = "en"): Promise<OurBusinessData | null> {
  try {
    const response = await fetchStrapi<OurBusinessApiResponse>("our-business", {
      locale,
      query: { pLevel: 5 },
      revalidate: 60,
    })

    return response.data
  } catch (error) {
    console.error("Error fetching our-business page:", error)
    return null
  }
}

/**
 * Fetch Product Sub Category by slug
 */
export async function getProductSubCategoryBySlug(
  slug: string,
  locale: string = "en"
): Promise<ProductSubCategory | null> {
  try {
    const response = await fetchStrapi<ProductSubCategoryApiResponse>("product-sub-categories", {
      locale,
      filters: {
        slug: {
          $eq: slug,
        },
      },
      query: { pLevel: 5 },
      revalidate: 60,
    })
    console.log("Product Sub Category fetched:", response)

    return response.data?.[0] || null
  } catch (error) {
    console.error("Error fetching product-sub-category:", error)
    return null
  }
}

/**
 * Get all product sub-category slugs for static params
 */
export async function getAllProductSubCategorySlugs(locale: string = "en"): Promise<string[]> {
  try {
    const pageData = await getOurBusinessPage(locale)
    if (!pageData?.sticky_nav?.product_sub_categories) {
      return []
    }
    return pageData.sticky_nav.product_sub_categories.map((cat) => cat.slug)
  } catch (error) {
    console.error("Error fetching product sub-category slugs:", error)
    return []
  }
}

/**
 * Get the default/first product sub-category slug
 */
export async function getDefaultProductSubCategorySlug(locale: string = "en"): Promise<string | null> {
  try {
    const pageData = await getOurBusinessPage(locale)
    if (!pageData?.sticky_nav?.product_sub_categories?.length) {
      return null
    }
    return pageData.sticky_nav.product_sub_categories[0].slug
  } catch (error) {
    console.error("Error fetching default sub-category slug:", error)
    return null
  }
}

// ============================================
// Botanicals API
// ============================================

import type { Botanical, BotanicalsApiResponse } from "@/types/strapi"

/**
 * Fetch all botanicals
 */
export async function getBotanicals(locale: string = "en"): Promise<Botanical[]> {
  try {
    const response = await fetchStrapi<BotanicalsApiResponse>("botanicals", {
      locale,
      query: {
        "fields[0]": "name",
        "fields[1]": "slug",
        "fields[2]": "scientific_name",
        "populate[image_1][fields][0]": "url",
        "populate[image_1][fields][1]": "alternativeText",
        "populate[image_1][fields][2]": "width",
        "populate[image_1][fields][3]": "height",
      },
      revalidate: 60,
    })

    return response.data || []
  } catch (error) {
    console.error("Error fetching botanicals:", error)
    return []
  }
}

// ============================================
// Transform functions
// ============================================

/**
 * Transform Our Business data to component props
 */
export function transformOurBusinessData(
  pageData: OurBusinessData,
  activeSubCategory: ProductSubCategory | null
): OurBusinessPageProps {
  // Transform hero section
  const heroSection: OurBusinessHeroProps = {
    title: pageData.hero_section?.title || "Our Business",
    backgroundImage: getStrapiMedia(pageData.hero_section?.background_image?.url || null),
  }

  // Transform nav items from sticky_nav
  const navItems: OurBusinessNavItem[] = (pageData.sticky_nav?.product_sub_categories || []).map((cat) => ({
    id: cat.id,
    title: cat.title,
    slug: cat.slug,
  }))

  return {
    heroSection,
    navItems,
    activeSubCategory,
  }
}

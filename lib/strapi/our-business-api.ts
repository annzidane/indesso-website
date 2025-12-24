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
/**
 * Fetch Our Business page data (hero, sticky nav)
 */
export async function getOurBusinessPage(locale: string = "en"): Promise<OurBusinessData> {
  const response = await fetchStrapi<OurBusinessApiResponse>("our-business", {
    locale,
    query: { pLevel: 5 },
    revalidate: 60,
  })

  if (!response?.data) {
    throw new Error("No data returned from Our Business API")
  }

  return response.data
}

/**
 * Fetch Product Sub Category by slug
 */
export async function getProductSubCategoryBySlug(
  slug: string,
  locale: string = "en"
): Promise<ProductSubCategory | null> {
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

  return response.data?.[0] || null
}

/**
 * Get all product sub-category slugs for static params
 */
export async function getAllProductSubCategorySlugs(locale: string = "en"): Promise<string[]> {
  const pageData = await getOurBusinessPage(locale)
  if (!pageData?.sticky_nav?.product_sub_categories) {
    return []
  }
  return pageData.sticky_nav.product_sub_categories.map((cat) => cat.slug)
}

/**
 * Get the default/first product sub-category slug
 */
export async function getDefaultProductSubCategorySlug(locale: string = "en"): Promise<string | null> {
  const pageData = await getOurBusinessPage(locale)
  if (!pageData?.sticky_nav?.product_sub_categories?.length) {
    return null
  }
  return pageData.sticky_nav.product_sub_categories[0].slug
}

// ============================================
// Botanicals API
// ============================================

import type {
  Botanical,
  BotanicalFaq,
  BotanicalFaqApiResponse,
  BotanicalsApiResponse,
  OurBusinessBotanicalApiResponse,
  OurBusinessBotanicalData,
  Product,
  ProductApiResponse,
} from "@/types/strapi"
import { extractTextFromRichText } from "./utils"

/**
 * Fetch all botanicals
 */
/**
 * Fetch all botanicals
 */
export async function getBotanicals(locale: string = "en"): Promise<Botanical[]> {
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
}

export async function getOurBusinessBotanicalPage(
  locale: string = "en"
): Promise<OurBusinessBotanicalData> {
  const response = await fetchStrapi<OurBusinessBotanicalApiResponse>("our-business-botanical", {
    locale,
    query: { pLevel: 5 },
    revalidate: 60,
  })

  if (!response?.data) {
    throw new Error("No data returned from Our Business Botanical Page API")
  }

  return response.data
}

export async function getBotanicalBySlug(slug: string, locale: string = "en"): Promise<Botanical | null> {
  const response = await fetchStrapi<BotanicalsApiResponse>("botanicals", {
    locale,
    filters: {
      slug: {
        $eq: slug,
      },
    },
    query: { pLevel: 2 },
    revalidate: 60,
  })

  return response.data?.[0] || null
}

export async function getFaqsByBotanicalSlug(
  slug: string,
  locale: string = "en"
): Promise<BotanicalFaq[]> {
  const response = await fetchStrapi<BotanicalFaqApiResponse>("faq-botanicals", {
    locale,
    filters: {
      botanical: {
        slug: {
          $eq: slug,
        },
      },
    },
    query: { pLevel: 1 },
    revalidate: 60,
  })

  return response.data || []
}

export async function getProductsByBotanicalSlug(
  slug: string,
  locale: string = "en"
): Promise<Product[]> {
  const response = await fetchStrapi<ProductApiResponse>("products", {
    locale,
    filters: {
      botanical: {
        slug: {
          $eq: slug,
        },
      },
    },
    // limit products per page to 8
    query: { pLevel: 2, "pagination[pageSize]": 8 },
    revalidate: 60,
  })

  return response.data || []
}

export async function getAllBotanicalSlugs(locale: string = "en"): Promise<string[]> {
  const botanicals = await getBotanicals(locale)
  return botanicals.map((botanical) => botanical.slug)
}

export async function getBotanicalPageData(slug: string, locale: string) {
  const [pageData, botanicalData, faqData, productData] = await Promise.all([
    getOurBusinessBotanicalPage(locale),
    getBotanicalBySlug(slug, locale),
    getFaqsByBotanicalSlug(slug, locale),
    getProductsByBotanicalSlug(slug, locale),
  ])

  if (!pageData || !botanicalData) {
    return null
  }

  return transformBotanicalPageData(pageData, botanicalData, faqData, productData)
}

// ============================================
// Transform functions
// ============================================

export function transformBotanicalPageData(
  pageData: OurBusinessBotanicalData,
  botanicalData: Botanical,
  faqData: BotanicalFaq[],
  productData: Product[]
) {
  const heroSection = pageData.page_sections.find((section: any) =>
    section?.__component === "our-business.hero-section"
  )
  const listProductSection = pageData.page_sections.find((section: any) =>
    section?.__component === "our-business.list-product-section"
  )
  const faqSection = pageData.page_sections.find((section: any) =>
    section?.__component === "our-business.faq-section"
  )
  const contactUsSection = pageData.page_sections.find((section: any) =>
    section?.__component === "our-business.contact-us-section"
  )

  // Parse content: Simplified rules
  // - The FIRST heading encountered and its following paragraphs => main text (keyPlayer)
  // - All subsequent headings => expandable sections (each heading with its following paragraphs)
  const content = botanicalData.content || []
  let keyPlayerTitle = ""
  const keyPlayerTextParts: string[] = []
  const keyPlayerRichBlocks: any[] = []
  const expandableSections: { title: string; content: string; richBlocks?: any[] }[] = []

  let seenFirstHeading = false
  let currentExpandable: { title: string; content: string; richBlocks: any[] } | null = null

  for (const block of content) {
    if (block.type === "heading") {
      const text = block.children.map((c) => c.text).join("")
      if (!seenFirstHeading) {
        // first heading -> main text title
        keyPlayerTitle = text
        seenFirstHeading = true
        // ensure any pending expandable is pushed (shouldn't be)
        if (currentExpandable) {
          expandableSections.push(currentExpandable)
          currentExpandable = null
        }
      } else {
        // subsequent headings -> start new expandable
        if (currentExpandable) {
          expandableSections.push(currentExpandable)
        }
        currentExpandable = { title: text, content: "", richBlocks: [] }
      }
    } else if (block.type === "paragraph") {
      const text = block.children.map((c) => c.text).join("")
      if (!seenFirstHeading) {
        // no heading seen yet, treat as main text
        keyPlayerTextParts.push(text)
        keyPlayerRichBlocks.push(block)
      } else if (currentExpandable) {
        // append paragraph to current expandable
        currentExpandable.content += (currentExpandable.content ? "\n" : "") + text
        currentExpandable.richBlocks.push(block)
      } else {
        // after first heading but before any second heading: this belongs to main text
        keyPlayerTextParts.push(text)
        keyPlayerRichBlocks.push(block)
      }
    }
  }

  if (currentExpandable) {
    expandableSections.push(currentExpandable)
  }

  const faqs = faqData.map((faq) => ({
    question: faq.quesion,
    answer: extractTextFromRichText(faq.answer),
  }))
  // Transform hero section to match PageHero props (title, backgroundImage)
  const hero = heroSection
    ? {
      title: (heroSection as any).hero_section.title || "",
      backgroundImage: (heroSection as any).hero_section.background_image,
    }
    : undefined

  const listProduct = listProductSection
    ? {
      title: (listProductSection as any).title || "",
      button: {
        title: (listProductSection as any).button?.title || "",
        path: (listProductSection as any).button?.path || "",
      },
    }
    : undefined

  return {
    heroSection: hero,
    listProductSection: listProduct,
    faqSection: faqSection as any,
    contactUsSection: contactUsSection ? (contactUsSection as any).contact_us_section : undefined,
    botanical: botanicalData,
    intro: {
      keyPlayerTitle,
      keyPlayerText: keyPlayerTextParts.join("\n"),
      keyPlayerRich: keyPlayerRichBlocks,
    },
    details: {
      whatIsTitle: "",
      whatIsText: "",
      expandableSections,
    },
    products: productData,
    faqs,
  }
}

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

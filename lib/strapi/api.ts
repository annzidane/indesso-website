import { fetchStrapi, getStrapiMedia } from "./client"
import { 
  defaultHeaderData, 
  defaultFooterData,
  defaultHomepageProps,
} from "./defaults"
import type {
  FooterData,
  FooterApiResponse,
  HeaderData,
  HeaderApiResponse,
  BannerData,
  BannerApiResponse,
  HomepageApiResponse,
  HomepageData,
  HeroSectionData,
  AboutUsSectionData,
  ReasonSectionData,
  BusinessSectionData,
  HeroSectionProps,
  AboutSectionProps,
  ReasonSectionProps,
  BusinessSectionProps,
  StrapiRichText,
  SeoProps,
} from "@/types/strapi"

// ============================================
// Homepage API
// ============================================

export interface HomepageProps {
  hero: HeroSectionProps
  about: AboutSectionProps
  reason: ReasonSectionProps
  business: BusinessSectionProps
  seo: SeoProps
}

// Helper to extract text from Strapi Rich Text
function extractTextFromRichText(richText: StrapiRichText[] | undefined | null): string {
  if (!richText || !Array.isArray(richText)) {
    return ""
  }
  return richText
    .map(block => block.children?.map(child => child.text).join("") || "")
    .filter(text => text.length > 0)
    .join("\n\n")
}

// Transform API response to component props
function transformHomepageData(data: HomepageData): HomepageProps {
  const sections = data.page_sections
  
  // Find each section by component type
  const heroData = sections.find(s => s.__component === "home-page.hero-section") as HeroSectionData | undefined
  const aboutData = sections.find(s => s.__component === "home-page.about-us-section") as AboutUsSectionData | undefined
  const reasonData = sections.find(s => s.__component === "home-page.reason-section") as ReasonSectionData | undefined
  const businessData = sections.find(s => s.__component === "home-page.business-section") as BusinessSectionData | undefined

  return {
    hero: heroData ? {
      title: heroData.title,
      ctaText: heroData.button.title,
      ctaLink: heroData.button.path,
      badge: {
        title: heroData.title_badge,
        description: heroData.description_badge,
        image: heroData.image_badge,
      },
    } : defaultHomepageProps.hero,

    about: aboutData ? {
      label: aboutData.title,
      title: aboutData.main_title,
      description: extractTextFromRichText(aboutData.text),
      ctaText: aboutData.button.title,
      ctaLink: aboutData.button.path,
      featureImage: aboutData.feature_image,
      backgroundImage: aboutData.background_image,
      highlight: {
        prefix: aboutData.card.title,
        value: String(aboutData.card.number),
        suffix: aboutData.card.description,
      },
    } : defaultHomepageProps.about,

    reason: reasonData ? {
      label: reasonData.title,
      title: reasonData.main_title,
      description: reasonData.description,
      matric: {
        employeeTitle: reasonData.matric_card.title_employee,
        employeeDescription: reasonData.matric_card.description_employee,
        peopleTitle: reasonData.matric_card.title_people,
        peopleDescription: reasonData.matric_card.description_people,
        image: reasonData.matric_card.image,
      },
      statistics: reasonData.statistic_card.map(stat => ({
        id: stat.id,
        title: stat.title,
        description: stat.description,
        image: stat.image,
      })),
      impact: {
        opener: reasonData.impact_card.opener,
        value: reasonData.impact_card.number,
        title: reasonData.impact_card.title,
        description: reasonData.impact_card.description,
        image: reasonData.impact_card.image,
      },
    } : defaultHomepageProps.reason,

    business: businessData ? {
      label: businessData.title,
      title: businessData.main_title,
      cards: businessData.business_card.map(card => ({
        id: card.id,
        title: card.title,
        description: card.description,
        ctaText: card.title_button,
        ctaLink: card.path,
        cardImage: card.card_image,
        ingredientImage: card.ingredient_image,
      })),
    } : defaultHomepageProps.business,

    seo: data.seo ? {
      metaTitle: data.seo.meta_title,
      metaDescription: data.seo.meta_description,
      keywords: data.seo.keywords?.map(k => k.keywords) || [],
    } : defaultHomepageProps.seo,
  }
}

export async function getHomepageData(locale: string): Promise<HomepageProps> {
  try {
    const response = await fetchStrapi<HomepageApiResponse>("homepage", {
      locale,
      query: {
        pLevel: 6,
      },
    })

    return transformHomepageData(response.data)
  } catch (error) {
    console.error("Failed to fetch homepage data:", error)
    return defaultHomepageProps
  }
}

// ============================================
// Header API
// ============================================

export async function getHeaderData(locale: string): Promise<HeaderData> {
  try {
    const response = await fetchStrapi<HeaderApiResponse>("header", {
      locale,
      query: {
        pLevel: 5,
      },
    })
    return response.data
  } catch (error) {
    console.error("Failed to fetch header data:", error)
    return defaultHeaderData
  }
}

// ============================================
// Footer API
// ============================================

export async function getFooterData(locale: string): Promise<FooterData> {
  try {
    const response = await fetchStrapi<FooterApiResponse>("footer", {
      locale,
      query: {
        pLevel: 5,
      },
    })

    return response.data
  } catch (error) {
    console.error("Failed to fetch footer data:", error)
    return defaultFooterData
  }
}

// ============================================
// Banners API
// ============================================

export async function getBanners(): Promise<BannerData[]> {
  try {
    const response = await fetchStrapi<BannerApiResponse>("banners", {
      populate: "*",
    })
    // Sort by order_number if available
    return response.data.sort((a, b) => {
      const orderA = a.order_number ?? 999
      const orderB = b.order_number ?? 999
      return orderA - orderB
    })
  } catch (error) {
    console.error("Failed to fetch banners:", error)
    return []
  }
}

// ============================================
// Exports
// ============================================

export { getStrapiMedia }

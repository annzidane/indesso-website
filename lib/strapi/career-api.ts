/**
 * Career Page API
 * Functions for fetching career page data from Strapi
 */

import { fetchStrapi } from "./client"
import { extractTextFromRichText, generateNavItemsFromSections } from "./utils"
import type {
  CareerApiResponse,
  CareerData,
  CareerLifeAtIndessoSectionData,
  CareerJoinUsSectionData,
  CareerTestimonialSectionData,
  CareerGrowingTogetherSectionData,
  CareerPageProps,
  CareerHeroSectionData,
} from "@/types/strapi"

// Transform API response to component props
function transformCareerData(data: CareerData): CareerPageProps {
  const sections = data.page_sections

  // Generate nav items from sections (excluding hero)
  const navItems = generateNavItemsFromSections(sections, "hero-section")

  // Find each section by component type
  const heroData = sections.find(s => s.__component === "career.hero-section") as CareerHeroSectionData | undefined
  const lifeAtIndessoData = sections.find(s => s.__component === "career.life-at-indesso") as CareerLifeAtIndessoSectionData | undefined
  const joinUsData = sections.find(s => s.__component === "career.career-joinus") as CareerJoinUsSectionData | undefined
  const testimonialData = sections.find(s => s.__component === "career.testimonial") as CareerTestimonialSectionData | undefined
  const growingTogetherData = sections.find(s => s.__component === "career.growing-together") as CareerGrowingTogetherSectionData | undefined

  return {
    pageInfo: {
      title: data.page_info?.title || "Career",
      slug: data.page_info?.slug || "career",
      path: data.page_info?.path || "/career",
    },

    navItems,

    hero: {
      title: heroData?.hero?.title || "About Us",
      backgroundImage: heroData?.hero?.background_image,
    },

    lifeAtIndesso: {
      eyebrow: lifeAtIndessoData?.eyebrow || "LIFE AT INDESSO",
      title: lifeAtIndessoData?.title || "A Workplace that Inspires Better Tomorrows",
      description: extractTextFromRichText(lifeAtIndessoData?.description),
      image: lifeAtIndessoData?.image,
      showcaseItems: lifeAtIndessoData?.career_showcase?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
      })) || [],
    },

    joinUs: {
      eyebrow: joinUsData?.eyebrow || "JOIN US",
      title: joinUsData?.title || "Shape Your Future with Indesso",
      description: joinUsData?.description || "",
      image: joinUsData?.image,
      opportunitiesButton: joinUsData?.opportunities_button || "Explore Opportunities",
      labelVisitButton: joinUsData?.label_visit_button || "Visit Us",
      logoVisitButton: joinUsData?.logo_visit_button,
      urlVisitButton: joinUsData?.url_visit_button || "https://www.linkedin.com/",
      join_us_modal: joinUsData?.join_us_modal
    },

    testimonial: {
      eyebrow: testimonialData?.eyebrow || "TESTIMONIAL",
      title: testimonialData?.title || "Stories from Our People",
      testimonials: testimonialData?.testimonials?.map(item => ({
        id: item.id,
        name: item.name,
        position: item.position,
        quoteTitle: item.quote_title,
        quote: extractTextFromRichText(item.quote),
        image: item.image,
        profileImage: item.profile_image,
      })) || [],
    },

    growingTogether: {
      eyebrow: growingTogetherData?.eyebrow || "GROWING TOGETHER",
      title: growingTogetherData?.title || "Celebrating Every Milestone",
      description: extractTextFromRichText(growingTogetherData?.description),
      slides: growingTogetherData?.growing_together_slide?.map(slide => ({
        id: slide.id,
        title: slide.title,
        description: slide.description,
        image: slide.image,
      })) || [],
    },

    seo: data.seo ? {
      metaTitle: data.seo.meta_title,
      metaDescription: data.seo.meta_description,
      keywords: data.seo.keywords?.map(k => k.keywords) || [],
    } : undefined,
  }
}

// Fetch Career page data
export async function getCareerPageData(locale: string): Promise<CareerPageProps> {
  try {
    const response = await fetchStrapi<CareerApiResponse>("career", {
      locale,
      query: {
        pLevel: 6,
      },
    })
    
    if (!response?.data) {
      console.error("No data returned from Career API")
      return getDefaultCareerData()
    }
    console.log("Career data fetched:", response)
    return transformCareerData(response.data)
  } catch (error) {
    console.error("Error fetching Career page data:", error)
    return getDefaultCareerData()
  }
}

export async function getPositionData(locale: string): Promise<Array<{ id: number; name: string; slug: string }>> {
  try {
    const response = await fetchStrapi<CareerApiResponse>("positions-opportunities", {
      locale,
      query: {
        pLevel: 4,
        limit: 100,
      },
    })

    if (!response?.data || !Array.isArray(response.data)) {
      console.error("No data returned from Positions API")
      return []
    }
    const items = response.data.map((pos: any) => {
      const id = pos.id
      const name = (pos.attributes?.name ?? pos.name ?? pos.attributes?.title ?? '').toString()
      const slug = (pos.attributes?.slug ?? pos.slug ?? '').toString()
      return { id, name, slug }
    })

    // Optionally filter out empty names
    return items.filter(i => i.name && i.name.trim().length > 0)
  } catch (error) {
    console.error("Error fetching Positions data:", error)
    return []
  }
}

// Default data for fallback
function getDefaultCareerData(): CareerPageProps {
  return {
    pageInfo: {
      title: "Career",
      slug: "career",
      path: "/career",
    },
    navItems: [
      { id: "life-at-indesso", label: "Life at Indesso" },
      { id: "join-us", label: "Join Us" },
      { id: "testimonial", label: "Testimonial" },
      { id: "growing-together", label: "Growing Together" },
    ],
    hero: {
      title: "Career",
    },
    lifeAtIndesso: {
      eyebrow: "LIFE AT INDESSO",
      title: "A Workplace that Inspires Better Tomorrows",
      description: "",
      image: undefined,
      showcaseItems: [],
    },
    joinUs: {
      eyebrow: "JOIN US",
      title: "Shape Your Future with Indesso",
      description: "",
      image: undefined,
      opportunitiesButton: "Explore Opportunities",
      labelVisitButton: "Visit Us",
      logoVisitButton: undefined,
      urlVisitButton: "https://www.linkedin.com/",
    },
    testimonial: {
      eyebrow: "TESTIMONIAL",
      title: "Stories from Our People",
      testimonials: [],
    },
    growingTogether: {
      eyebrow: "GROWING TOGETHER",
      title: "Celebrating Every Milestone",
      description: "",
      slides: [],
    },
  }
}

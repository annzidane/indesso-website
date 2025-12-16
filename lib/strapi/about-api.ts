/**
 * About Us Page API
 * Functions for fetching about-us page data from Strapi
 */

import { fetchStrapi } from "./client"
import type {
  AboutUsApiResponse,
  AboutUsData,
  AboutUsHeroSectionData,
  AboutUsStorySectionData,
  AboutUsBoardSectionData,
  AboutUsResearchSectionData,
  AboutUsScientificMasterySectionData,
  AboutUsResponsibleOperationsSectionData,
  AboutUsPageProps,
  StrapiRichText,
} from "@/types/strapi"

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
function transformAboutUsData(data: AboutUsData): AboutUsPageProps {
  const sections = data.page_sections

  // Find each section by component type
  const heroData = sections.find(s => s.__component === "about-us.hero-section") as AboutUsHeroSectionData | undefined
  const storyData = sections.find(s => s.__component === "about-us.story-section") as AboutUsStorySectionData | undefined
  const boardData = sections.find(s => s.__component === "about-us.board-section") as AboutUsBoardSectionData | undefined
  const researchData = sections.find(s => s.__component === "about-us.research-innovation-section") as AboutUsResearchSectionData | undefined
  const scientificData = sections.find(s => s.__component === "about-us.scientific-mastery-section") as AboutUsScientificMasterySectionData | undefined
  const responsibleData = sections.find(s => s.__component === "about-us.responsible-operations-section") as AboutUsResponsibleOperationsSectionData | undefined

  return {
    hero: {
      title: heroData?.hero?.title || "About Us",
      backgroundImage: heroData?.hero?.background_image,
    },

    story: {
      eyebrow: storyData?.eyebrow || "OUR STORY",
      title: storyData?.title || "Long Journey to The Greatness",
      stories: storyData?.stories?.map(story => ({
        id: story.id,
        title: story.title,
        content: extractTextFromRichText(story.text),
        sliderTitle: story.title_slider,
        image: story.image,
      })) || [],
    },

    boards: {
      eyebrow: boardData?.eyebrow || "MEET THE BOARDS",
      title: boardData?.title || "Meet the People Behind Our Innovation",
      sections: boardData?.sections?.map(section => ({
        id: section.id,
        title: section.title,
        members: section.members
          ?.sort((a, b) => a.order_number - b.order_number)
          ?.map(member => ({
            id: member.id,
            orderNumber: member.order_number,
            firstName: member.first_name,
            lastName: member.last_name,
            fullName: member.first_name + (member.last_name ? " " + member.last_name : ""),
            position: member.position?.name || "",
            image: member.image,
          })) || [],
      })) || [],
    },

    research: {
      eyebrow: researchData?.eyebrow || "RESEARCH & INNOVATION",
      title: researchData?.title || "Inspiring Solutions Through Nature",
      description: extractTextFromRichText(researchData?.description),
      cards: researchData?.card?.map(card => ({
        id: card.id,
        title: card.title,
        content: extractTextFromRichText(card.text),
        image: card.image,
      })) || [],
    },

    scientificMastery: {
      eyebrow: scientificData?.eyebrow || "SCIENTIFIC MASTERY",
      title: scientificData?.title || "Technology that Brings Nature Closer",
      description: extractTextFromRichText(scientificData?.description),
      tabs: scientificData?.tabs?.map(tab => ({
        id: tab.id,
        label: tab.label,
        slug: tab.slug,
        blockTitle: tab.left_block_title,
        blockContent: extractTextFromRichText(tab.left_block_text),
        image: tab.main_image,
      })) || [],
    },

    responsibleOperations: {
      eyebrow: responsibleData?.eyebrow || "RESPONSIBLE OPERATIONS",
      title: responsibleData?.title || "Committed to Sustainability",
      description: extractTextFromRichText(responsibleData?.description),
      image: responsibleData?.image,
      backgroundImage: responsibleData?.background_image,
      items: responsibleData?.accordion_items?.map(item => ({
        id: item.id,
        title: item.title,
        content: extractTextFromRichText(item.description),
      })) || [],
    },

    seo: data.seo ? {
      metaTitle: data.seo.meta_title,
      metaDescription: data.seo.meta_description,
      keywords: data.seo.keywords?.map(k => k.keywords) || [],
    } : undefined,
  }
}

// Fetch About Us page data
export async function getAboutPageData(locale: string): Promise<AboutUsPageProps> {
  try {
    const response = await fetchStrapi<AboutUsApiResponse>("about-us", {
      locale,
      query: {
        pLevel: 6,
      },
    })
    
    if (!response?.data) {
      console.error("No data returned from About Us API")
      return getDefaultAboutUsData()
    }
    
    return transformAboutUsData(response.data)
  } catch (error) {
    console.error("Error fetching About Us page data:", error)
    return getDefaultAboutUsData()
  }
}

// Default data for fallback
function getDefaultAboutUsData(): AboutUsPageProps {
  return {
    hero: {
      title: "About Us",
    },
    story: {
      eyebrow: "OUR STORY",
      title: "Long Journey to The Greatness",
      stories: [],
    },
    boards: {
      eyebrow: "MEET THE BOARDS",
      title: "Meet the People Behind Our Innovation",
      sections: [],
    },
    research: {
      eyebrow: "RESEARCH & INNOVATION",
      title: "Inspiring Solutions Through Nature",
      description: "",
      cards: [],
    },
    scientificMastery: {
      eyebrow: "SCIENTIFIC MASTERY",
      title: "Technology that Brings Nature Closer",
      description: "",
      tabs: [],
    },
    responsibleOperations: {
      eyebrow: "RESPONSIBLE OPERATIONS",
      title: "Committed to Sustainability",
      description: "",
      image: undefined,
      backgroundImage: undefined,
      items: [],
    },
  }
}

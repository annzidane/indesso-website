/**
 * Sustainability Page API
 * Functions for fetching sustainability page data from Strapi
 */

import { fetchStrapi } from "./client"
import { extractTextFromRichText, generateNavItemsFromSections } from "./utils"
import { getStrapiMedia } from "./api"
import type {
  SustainabilityApiResponse,
  SustainabilityData,
  SustainabilityHeroSectionData,
  SustainabilityStrategySectionData,
  SustainabilityInitiativeSectionData,
  SustainabilityResponsibleOperationsSectionData,
  SustainabilityCommitmentSectionData,
  SustainabilityReportSectionData,
  SustainabilityPageProps,
  ReportsApiResponse,
  ReportItem,
  StrapiImage,
} from "@/types/strapi"

// Helper function to check if media is video
function isVideo(media?: StrapiImage): boolean {
  if (!media?.mime) return false
  return media.mime.startsWith("video/")
}

// Helper function to get video URL from media
function getVideoUrl(media?: StrapiImage): string | undefined {
  if (!media || !isVideo(media)) return undefined
  return getStrapiMedia(media.url) || undefined
}

// Transform API response to component props
function transformSustainabilityData(data: SustainabilityData): SustainabilityPageProps {
  const sections = data.page_sections

  // Generate nav items from sections (excluding hero)
  const navItems = generateNavItemsFromSections(sections, "hero-section")

  // Find each section by component type
  const heroData = sections.find(s => s.__component === "sustainability.hero-section") as SustainabilityHeroSectionData | undefined
  const strategyData = sections.find(s => s.__component === "sustainability.sustainability-strategy-section") as SustainabilityStrategySectionData | undefined
  const initiativeData = sections.find(s => s.__component === "sustainability.sustainability-initiative-section") as SustainabilityInitiativeSectionData | undefined
  const responsibleOpsData = sections.find(s => s.__component === "sustainability.responsible-operations-section") as SustainabilityResponsibleOperationsSectionData | undefined
  const commitmentData = sections.find(s => s.__component === "sustainability.commitment-section") as SustainabilityCommitmentSectionData | undefined
  const reportData = sections.find(s => s.__component === "sustainability.sustainability-report-section") as SustainabilityReportSectionData | undefined

  return {
    pageInfo: {
      title: data.page_info?.title || "Sustainability",
      slug: data.page_info?.slug || "sustainability",
      path: data.page_info?.path || "/sustainability",
    },

    navItems,

    hero: {
      title: heroData?.hero?.title || "Sustainability",
      backgroundImage: heroData?.hero?.background_image,
    },

    strategy: {
      eyebrow: strategyData?.feature?.eyebrow || "Sustainability Strategy",
      title: strategyData?.feature?.title || "A Bright Future Guided by Responsible Governance",
      description: extractTextFromRichText(strategyData?.feature?.text),
      image: strategyData?.feature?.image,
      accordionItems: strategyData?.accordion_items?.map(item => ({
        id: item.id,
        title: item.title,
        description: extractTextFromRichText(item.description),
      })) || [],
    },

    initiative: {
      eyebrow: initiativeData?.eyebrow || "Sustainability Initiative",
      title: initiativeData?.title || "Building Long Term Value Through Responsible Actions",
      description: initiativeData?.description || "",
      cards: initiativeData?.card_image?.map(card => ({
        id: card.id,
        title: card.title,
        text: extractTextFromRichText(card.text),
        image: card.image,
      })) || [],
    },

    responsibleOperations: {
      eyebrow: responsibleOpsData?.eyebrow || "Responsible Operations",
      title: responsibleOpsData?.title || "Partnering for Positive Impact",
      description: extractTextFromRichText(responsibleOpsData?.description),
      ctaText: responsibleOpsData?.text || "Partner With Us and Create Positive Impact Together",
      cards: responsibleOpsData?.card_image?.map(card => ({
        id: card.id,
        title: card.title,
        text: extractTextFromRichText(card.text),
        // If media is video, set videoUrl; otherwise set image
        image: isVideo(card.image) ? undefined : card.image,
        videoUrl: getVideoUrl(card.image),
      })) || [],
    },

    commitment: {
      eyebrow: commitmentData?.eyebrow || "Commitment & Assessments",
      title: commitmentData?.title || "Achievements That Strengthen Our Sustainability Journey",
      description: commitmentData?.description || "",
      assessments: commitmentData?.assessments_card?.map(item => ({
        id: item.id,
        description: item.description,
        image: item.image,
      })) || [],
    },

    report: {
      eyebrow: reportData?.eyebrow || "Sustainability Report",
      title: reportData?.title || "Our Path of Continuous Improvement",
      description: reportData?.description || "",
      subTitle: reportData?.sub_title || "Access our Sustainability Report",
      buttonText: reportData?.button || "See Our Report",
      image: reportData?.image,
      titleReport: reportData?.title_report || "Older Reports",
    },

    seo: data.seo ? {
      metaTitle: data.seo.meta_title,
      metaDescription: data.seo.meta_description,
      keywords: data.seo.keywords?.map(k => k.keywords) || [],
    } : undefined,
  }
}

// Fetch Sustainability page data
// Fetch Sustainability page data
export async function getSustainabilityPageData(locale: string): Promise<SustainabilityPageProps> {
  const response = await fetchStrapi<SustainabilityApiResponse>("sustainability", {
    locale,
    query: {
      pLevel: 6,
    },
  })

  if (!response?.data) {
    throw new Error("No data returned from Sustainability API")
  }

  return transformSustainabilityData(response.data)
}

// Fetch Reports data
export async function getReportsData(): Promise<ReportItem[]> {
  const response = await fetchStrapi<ReportsApiResponse>("reports", {
    query: {
      pLevel: 2,
      sort: "year:desc",
    },
  })

  if (!response?.data) {
    return []
  }

  return response.data.map((report) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r: any = report;

    const imageUrlFromReport = r?.image?.data?.attributes?.url || r?.image?.url || r?.file?.formats?.thumbnail?.url || null;
    return {
      id: report.id,
      year: report.year,
      fileUrl: report.file?.url,
      fileName: report.file?.name,
      title: r?.title, // title is optional in ReportData
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      image: (getStrapiMedia(imageUrlFromReport) || undefined),
    }
  })
}

// Default data for fallback
function getDefaultSustainabilityData(): SustainabilityPageProps {
  return {
    pageInfo: {
      title: "Sustainability",
      slug: "sustainability",
      path: "/sustainability",
    },
    navItems: [
      { id: "sustainability-strategy", label: "Sustainability Strategy test" },
      { id: "sustainability-initiative", label: "Sustainability Initiative" },
      { id: "responsible-operations", label: "Responsible Operations" },
      { id: "commitment-and-assessments", label: "Commitment & Assessments" },
      { id: "sustainability-report", label: "Sustainability Report" },
    ],
    hero: {
      title: "Sustainability",
    },
    strategy: {
      eyebrow: "Sustainability Strategy",
      title: "A Bright Future Guided by Responsible Governance",
      description: "",
      accordionItems: [],
    },
    initiative: {
      eyebrow: "Sustainability Initiative",
      title: "Building Long Term Value Through Responsible Actions",
      description: "",
      cards: [],
    },
    responsibleOperations: {
      eyebrow: "Responsible Operations",
      title: "Partnering for Positive Impact",
      description: "",
      ctaText: "Partner With Us",
      cards: [],
    },
    commitment: {
      eyebrow: "Commitment & Assessments",
      title: "Achievements That Strengthen Our Sustainability Journey",
      description: "",
      assessments: [],
    },
    report: {
      eyebrow: "Sustainability Report",
      title: "Our Path of Continuous Improvement",
      description: "",
      subTitle: "Access our Sustainability Report",
      buttonText: "See Our Report",
      titleReport: "Older Reports",
    },
  }
}

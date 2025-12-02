/**
 * About Us Page Types
 * Types specific to the about-us API
 */

import type { StrapiImage, StrapiRichText } from "./common"

// ============================================
// API Response Types (Raw from Strapi)
// ============================================

export interface AboutUsApiResponse {
  data: AboutUsData
  meta: object
}

export interface AboutUsData {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  page_info: {
    id: number
    title: string
    slug: string
    path: string
  }
  page_sections: AboutUsSection[]
  seo?: {
    id: number
    meta_title: string
    meta_description: string
    keywords?: { id: number; keywords: string }[]
  }
}

export type AboutUsSection =
  | AboutUsHeroSectionData
  | AboutUsStorySectionData
  | AboutUsBoardSectionData
  | AboutUsResearchSectionData
  | AboutUsScientificMasterySectionData
  | AboutUsResponsibleOperationsSectionData

// ============================================
// Hero Section
// ============================================

export interface AboutUsHeroSectionData {
  __component: "about-us.hero-section"
  id: number
  hero: {
    id: number
    title: string
    background_image?: StrapiImage
  }
}

// ============================================
// Story Section
// ============================================

export interface AboutUsStorySectionData {
  __component: "about-us.story-section"
  id: number
  eyebrow: string
  title: string
  stories: StoryItem[]
}

export interface StoryItem {
  id: number
  title: string
  text: StrapiRichText[]
  title_slider: string
  image?: StrapiImage
}

// ============================================
// Board Section
// ============================================

export interface AboutUsBoardSectionData {
  __component: "about-us.board-section"
  id: number
  eyebrow: string
  title: string
  sections: BoardGroup[]
}

export interface BoardGroup {
  id: number
  title: string
  members: BoardMember[]
}

export interface BoardMember {
  id: number
  order_number: number
  first_name: string
  last_name: string | null
  image?: StrapiImage
  position?: {
    id: number
    name: string
  }
}

// ============================================
// Research & Innovation Section
// ============================================

export interface AboutUsResearchSectionData {
  __component: "about-us.research-innovation-section"
  id: number
  eyebrow: string
  title: string
  description: StrapiRichText[]
  card: ResearchCard[]
}

export interface ResearchCard {
  id: number
  title: string
  text: StrapiRichText[]
  image?: StrapiImage
}

// ============================================
// Scientific Mastery Section
// ============================================

export interface AboutUsScientificMasterySectionData {
  __component: "about-us.scientific-mastery-section"
  id: number
  eyebrow: string
  title: string
  description: StrapiRichText[]
  tabs: ScientificMasteryTab[]
}

export interface ScientificMasteryTab {
  id: number
  label: string
  slug: string
  left_block_title: string
  left_block_text: StrapiRichText[]
  main_image?: StrapiImage
}

// ============================================
// Responsible Operations Section
// ============================================

export interface AboutUsResponsibleOperationsSectionData {
  __component: "about-us.responsible-operations-section"
  id: number
  eyebrow: string
  title: string
  description: StrapiRichText[]
  image?: StrapiImage
  background_image?: StrapiImage
  accordion_items: AccordionItem[]
}

export interface AccordionItem {
  id: number
  title: string
  description: StrapiRichText[]
}

// ============================================
// Transformed Types for Components
// ============================================

export interface AboutUsPageProps {
  hero: {
    title: string
    backgroundImage?: StrapiImage
  }
  story: {
    eyebrow: string
    title: string
    stories: Array<{
      id: number
      title: string
      content: string
      sliderTitle: string
      image?: StrapiImage
    }>
  }
  boards: {
    eyebrow: string
    title: string
    sections: Array<{
      id: number
      title: string
      members: Array<{
        id: number
        orderNumber: number
        firstName: string
        lastName: string | null
        fullName: string
        position: string
        image?: StrapiImage
      }>
    }>
  }
  research: {
    eyebrow: string
    title: string
    description: string
    cards: Array<{
      id: number
      title: string
      content: string
      image?: StrapiImage
    }>
  }
  scientificMastery: {
    eyebrow: string
    title: string
    description: string
    tabs: Array<{
      id: number
      label: string
      slug: string
      blockTitle: string
      blockContent: string
      image?: StrapiImage
    }>
  }
  responsibleOperations: {
    eyebrow: string
    title: string
    description: string
    image?: StrapiImage
    backgroundImage?: StrapiImage
    items: Array<{
      id: number
      title: string
      content: string
    }>
  }
  seo?: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

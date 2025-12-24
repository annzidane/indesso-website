/**
 * Homepage Types
 * Types specific to the homepage API response
 */

import type { StrapiImage, StrapiButton, StrapiRichText, StrapiResponse, SeoData, SeoKeyword } from "./common"

// ============================================
// API Response Types
// ============================================

export type HomepageApiResponse = StrapiResponse<HomepageData>

export interface HomepageData {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  page_sections: HomepageSection[]
  seo?: SeoData
}

// ============================================
// SEO
// ============================================

// ============================================
// SEO
// ============================================

// SeoData Imported from common


// ============================================
// SEO Props for Components
// ============================================

export interface SeoProps {
  metaTitle: string
  metaDescription: string
  keywords: string[]
}

// Union type for all page sections
export type HomepageSection =
  | HeroSectionData
  | AboutUsSectionData
  | ReasonSectionData
  | BusinessSectionData

// ============================================
// Hero Section
// ============================================

export interface HeroSectionData {
  __component: "home-page.hero-section"
  id: number
  title: string
  button: StrapiButton
  title_badge: string
  description_badge: string
  image_badge: StrapiImage
}

// ============================================
// About Us Section
// ============================================

export interface AboutUsSectionData {
  __component: "home-page.about-us-section"
  id: number
  title: string
  main_title: string
  text: StrapiRichText[]
  feature_image: StrapiImage
  background_image: StrapiImage
  card: AboutCard
  button: StrapiButton
}

export interface AboutCard {
  id: number
  title: string
  number: number
  description: string
}

// ============================================
// Reason/Why Choose Us Section
// ============================================

export interface ReasonSectionData {
  __component: "home-page.reason-section"
  id: number
  title: string
  main_title: string
  description: string
  matric_card: MatricCard
  statistic_card: StatisticCard[]
  impact_card: ImpactCard
}

export interface MatricCard {
  id: number
  title_employee: string
  description_employee: string
  title_people: string
  description_people: string
  image?: StrapiImage
}

export interface StatisticCard {
  id: number
  title: string
  description: string
  image?: StrapiImage
}

export interface ImpactCard {
  id: number
  opener: string
  number: number
  title: string
  description: string
  image?: StrapiImage
}

// ============================================
// Business Section
// ============================================

export interface BusinessSectionData {
  __component: "home-page.business-section"
  id: number
  title: string
  main_title: string
  business_card: BusinessCard[]
}

export interface BusinessCard {
  id: number
  title: string
  description: string
  title_button: string
  path: string
  card_image?: StrapiImage
  ingredient_image?: StrapiImage
}

// ============================================
// Transformed Types for Components
// These are the types used by frontend components
// ============================================

export interface HeroSectionProps {
  title: string
  ctaText: string
  ctaLink: string
  badge?: {
    title: string
    description: string
    image: StrapiImage
  }
}

export interface AboutSectionProps {
  label: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  featureImage?: StrapiImage
  backgroundImage?: StrapiImage
  highlight: {
    prefix: string
    value: string
    suffix: string
  }
}

export interface ReasonSectionProps {
  label: string
  title: string
  description: string
  matric: {
    employeeTitle: string
    employeeDescription: string
    peopleTitle: string
    peopleDescription: string
    image?: StrapiImage
  }
  statistics: Array<{
    id: number
    title: string
    description: string
    image?: StrapiImage
  }>
  impact: {
    opener: string
    value: number
    title: string
    description: string
    image?: StrapiImage
  }
}

export interface BusinessSectionProps {
  label: string
  title: string
  cards: Array<{
    id: number
    title: string
    description: string
    ctaText: string
    ctaLink: string
    cardImage?: StrapiImage
    ingredientImage?: StrapiImage
  }>
}

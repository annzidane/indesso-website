/**
 * Career Page Types
 * Types specific to the career API
 */

import type { StrapiImage, StrapiRichText } from "./common"

// ============================================
// API Response Types (Raw from Strapi)
// ============================================

export interface CareerApiResponse {
  data: CareerData
  meta: object
}

export interface CareerData {
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
  page_sections: CareerSection[]
  seo?: {
    id: number
    meta_title: string
    meta_description: string
    keywords?: { id: number; keywords: string }[]
  }
}

export type CareerSection =
  | CareerHeroSectionData
  | CareerLifeAtIndessoSectionData
  | CareerJoinUsSectionData
  | CareerTestimonialSectionData
  | CareerGrowingTogetherSectionData


export interface CareerHeroSectionData {
  __component: "career.hero-section"
  id: number
  hero: {
    id: number
    title: string
    background_image?: StrapiImage
  }
}

// ============================================
// Life at Indesso Section
// ============================================

export interface CareerLifeAtIndessoSectionData {
  __component: "career.life-at-indesso"
  id: number
  eyebrow: string
  title: string
  image?: StrapiImage
  description: StrapiRichText[]
  career_showcase: CareerShowcaseItem[]
}

export interface CareerShowcaseItem {
  id: number
  title: string
  description: string
  image?: StrapiImage
}

// ============================================
// Join Us Section
// ============================================

export interface CareerJoinUsSectionData {
  __component: "career.career-joinus"
  id: number
  eyebrow: string
  title: string
  description: string
  image?: StrapiImage
  button?: {
    id: number
    title: string
    path: string
  }
}

// ============================================
// Testimonial Section
// ============================================

export interface CareerTestimonialSectionData {
  __component: "career.testimonial"
  id: number
  eyebrow: string
  title: string
  testimonials: TestimonialItem[]
}

export interface TestimonialItem {
  id: number
  documentId: string
  name: string
  position: string
  quote_title: string
  quote: StrapiRichText[]
  image?: StrapiImage
  profile_image?: StrapiImage
}

// ============================================
// Growing Together Section
// ============================================

export interface CareerGrowingTogetherSectionData {
  __component: "career.growing-together"
  id: number
  eyebrow: string
  title: string
  description: StrapiRichText[]
  growing_together_slide: GrowingTogetherSlide[]
}

export interface GrowingTogetherSlide {
  id: number
  title: string
  description: string
  image?: StrapiImage
}

// ============================================
// Transformed Types for Components
// ============================================

export interface CareerPageProps {
  pageInfo: {
    title: string
    slug: string
    path: string
  }
  hero: {
    title: string
    backgroundImage?: StrapiImage
  }
  lifeAtIndesso: {
    eyebrow: string
    title: string
    description: string
    image?: StrapiImage
    showcaseItems: Array<{
      id: number
      title: string
      description: string
      image?: StrapiImage
    }>
  }
  joinUs: {
    eyebrow: string
    title: string
    description: string
    image?: StrapiImage
    button?: {
      title: string
      path: string
    }
  }
  testimonial: {
    eyebrow: string
    title: string
    testimonials: Array<{
      id: number
      name: string
      position: string
      quoteTitle: string
      quote: string
      image?: StrapiImage
      profileImage?: StrapiImage
    }>
  }
  growingTogether: {
    eyebrow: string
    title: string
    description: string
    slides: Array<{
      id: number
      title: string
      description: string
      image?: StrapiImage
    }>
  }
  seo?: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

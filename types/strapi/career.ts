/**
 * Career Page Types
 * Types specific to the career API
 */

import type { field, fieldFile, fieldOption, StrapiImage, StrapiRichText, StrapiResponse } from "./common"

// ============================================
// API Response Types (Raw from Strapi)
// ============================================

export type CareerApiResponse = StrapiResponse<CareerData>

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
  opportunities_button: string
  label_visit_button: string
  logo_visit_button?: StrapiImage
  url_visit_button: string
  join_us_modal?: JoinUsModal
}

export interface JoinUsModal {
  title: string
  field_name: field
  field_email: field
  field_contact: field
  field_address: field
  field_position: fieldOption
  field_file: fieldFile
  submit_button: string
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
  navItems: Array<{
    id: string
    label: string
  }>
  hero: {
    title: string
    backgroundImage?: StrapiImage
  }
  lifeAtIndesso: {
    eyebrow: string
    title: string
    description: string
    image?: StrapiImage // Changed from undefined to StrapiImage | undefined to match
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
    opportunitiesButton: string
    labelVisitButton: string
    logoVisitButton?: StrapiImage
    urlVisitButton: string
    join_us_modal?: JoinUsModal
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

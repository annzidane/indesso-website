/**
 * Sustainability Page Types
 * Types specific to the sustainability API
 */

import type { StrapiImage, StrapiRichText } from "./common"

// ============================================
// API Response Types (Raw from Strapi)
// ============================================

export interface SustainabilityApiResponse {
  data: SustainabilityData
  meta: object
}

export interface SustainabilityData {
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
  page_sections: SustainabilitySection[]
  seo?: {
    id: number
    meta_title: string
    meta_description: string
    keywords?: { id: number; keywords: string }[]
  }
}

export type SustainabilitySection =
  | SustainabilityHeroSectionData
  | SustainabilityStrategySectionData
  | SustainabilityInitiativeSectionData
  | SustainabilityResponsibleOperationsSectionData
  | SustainabilityCommitmentSectionData
  | SustainabilityReportSectionData

// ============================================
// Hero Section
// ============================================

export interface SustainabilityHeroSectionData {
  __component: "sustainability.hero-section"
  id: number
  hero: {
    id: number
    title: string
    background_image?: StrapiImage
  }
}

// ============================================
// Strategy Section
// ============================================

export interface SustainabilityStrategySectionData {
  __component: "sustainability.sustainability-strategy-section"
  id: number
  feature: {
    id: number
    eyebrow: string
    title: string
    text: StrapiRichText[]
    image?: StrapiImage
  }
  accordion_items: Array<{
    id: number
    title: string
    description: StrapiRichText[]
  }>
}

// ============================================
// Initiative Section
// ============================================

export interface SustainabilityInitiativeSectionData {
  __component: "sustainability.sustainability-initiative-section"
  id: number
  eyebrow: string
  title: string
  description: string
  card_image: Array<{
    id: number
    title: string
    text: StrapiRichText[]
    image?: StrapiImage
  }>
}

// ============================================
// Responsible Operations Section
// ============================================

export interface SustainabilityResponsibleOperationsSectionData {
  __component: "sustainability.responsible-operations-section"
  id: number
  eyebrow: string
  title: string
  description: StrapiRichText[]
  text: string
  card_image: Array<{
    id: number
    title: string
    text: StrapiRichText[]
    image?: StrapiImage
  }>
}

// ============================================
// Commitment Section
// ============================================

export interface SustainabilityCommitmentSectionData {
  __component: "sustainability.commitment-section"
  id: number
  eyebrow: string
  title: string
  description: string
  assessments_card: Array<{
    id: number
    description: string
    image?: StrapiImage
  }>
}

// ============================================
// Report Section
// ============================================

export interface SustainabilityReportSectionData {
  __component: "sustainability.sustainability-report-section"
  id: number
  eyebrow: string
  title: string
  description: string
  sub_title: string
  button: string
  image?: StrapiImage
  title_report?: string
}

// ============================================
// Reports API Types
// ============================================

export interface ReportsApiResponse {
  data: ReportData[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface ReportData {
  id: number
  documentId: string
  year: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  file?: {
    id: number
    documentId: string
    name: string
    url: string
    ext: string
    mime: string
    size: number
  }
}

// ============================================
// Transformed Types for Components
// ============================================

export interface SustainabilityPageProps {
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
  strategy: {
    eyebrow: string
    title: string
    description: string
    image?: StrapiImage
    accordionItems: Array<{
      id: number
      title: string
      description: string
    }>
  }
  initiative: {
    eyebrow: string
    title: string
    description: string
    cards: Array<{
      id: number
      title: string
      text: string
      image?: StrapiImage
    }>
  }
  responsibleOperations: {
    eyebrow: string
    title: string
    description: string
    ctaText: string
    cards: Array<{
      id: number
      title: string
      text: string
      image?: StrapiImage
      videoUrl?: string
    }>
  }
  commitment: {
    eyebrow: string
    title: string
    description: string
    assessments: Array<{
      id: number
      description: string
      image?: StrapiImage
    }>
  }
  report: {
    eyebrow: string
    title: string
    description: string
    subTitle: string
    buttonText: string
    image?: StrapiImage
    titleReport?: string
  }
  seo?: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export interface ReportItem {
  id: number
  year: string
  fileUrl?: string
  fileName?: string
  title?: string
}

/**
 * Our Business Page - Strapi Types
 */

import type { StrapiImage, StrapiResponse, StrapiRichText, StrapiButton } from "./common"

// Product Category
export interface ProductCategory {
  id: number
  documentId: string
  name: string
  slug: string
  description: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// ============================================
// Page Sections Types
// ============================================

// Hot Spot for slider
export interface SliderHotSpot {
  id: number
  feature_title: string
  feature_desc: string
  feature_icon: StrapiImage | null
}

// Slider item for business summary
export interface BusinessSliderItem {
  id: number
  title: string
  description: string
  Subsidiary_text: StrapiRichText[] | null
  image: StrapiImage
  partner_logo: StrapiImage | null
  hot_spot: SliderHotSpot | null
}

// Business Summary Section (with slider)
export interface BusinessSummarySectionData {
  __component: "our-business.business-summary-section"
  id: number
  eyebrow: string
  title: string
  description: string
  icon: StrapiImage | null
  slidder: BusinessSliderItem[]
}

// Business Appliance Section
export interface BusinessApplianceSectionData {
  __component: "our-business.business-appliance-section"
  id: number
  eyebrow: string
  title: string
  description: string
  image: StrapiImage
}

// Botanical Source Section
export interface BotanicalSourceSectionData {
  __component: "our-business.botanical-source-section"
  id: number
  eyebrow: string
  title: string
}

// Our Catalog Section
export interface OurCatalogSectionData {
  __component: "our-business.our-catalog-section"
  id: number
  eyebrow: string
  title: string
  text: StrapiRichText[]
  image: StrapiImage
  background_image: StrapiImage
  button: StrapiButton
}

// Union type for all page sections
export type OurBusinessPageSection =
  | BusinessSummarySectionData
  | BusinessApplianceSectionData
  | BotanicalSourceSectionData
  | OurCatalogSectionData

// ============================================
// Botanical Types
// ============================================

export interface Botanical {
  id: number
  documentId: string
  name: string
  slug: string
  scientific_name: string
  image_1: StrapiImage | null
}

export interface BotanicalsApiResponse {
  data: Botanical[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// ============================================
// Product Sub Category with page_sections
// ============================================

// Product Sub Category with nested product_categories
export interface ProductSubCategory {
  id: number
  documentId: string
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  product_categories: ProductCategory[]
  page_sections: OurBusinessPageSection[]
  seo: unknown | null
}

// Hero Section for Our Business page
export interface OurBusinessHeroSection {
  id: number
  title: string
  background_image: StrapiImage
}

// Sticky Nav with product sub categories
export interface OurBusinessStickyNav {
  id: number
  product_sub_categories: ProductSubCategory[]
}

// Page Info
export interface OurBusinessPageInfo {
  id: number
  title: string
  slug: string
  path: string
}

// Our Business Page Data
export interface OurBusinessData {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  page_info: OurBusinessPageInfo
  hero_section: OurBusinessHeroSection
  sticky_nav: OurBusinessStickyNav
}

// API Response types
export interface OurBusinessApiResponse {
  data: OurBusinessData
  meta: Record<string, unknown>
}

export interface ProductSubCategoryApiResponse {
  data: ProductSubCategory[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Props for components
export interface OurBusinessHeroProps {
  title: string
  backgroundImage: string
}

export interface OurBusinessNavItem {
  id: number
  title: string
  slug: string
}

export interface OurBusinessNavProps {
  items: OurBusinessNavItem[]
  activeSlug: string
}

export interface OurBusinessPageProps {
  heroSection: OurBusinessHeroProps
  navItems: OurBusinessNavItem[]
  activeSubCategory: ProductSubCategory | null
}

/**
 * Our Business Page - Strapi Types
 */

import type { StrapiImage, StrapiResponse, StrapiRichText, StrapiButton, SeoData } from "./common"

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

export interface ProductCategoryApiResponse {
  data: ProductCategory[]
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

export interface Product {
  id: number
  name: string
  slug: string
  image: StrapiImage
  product_category: {
    name: string
    slug: string
  }
  botanical: {
    name: string
    slug: string
  }
  organoleptics: {
    name: string
  }[]
  product_format: {
    name: string
  }
  industry_categories: {
    id: number
    name: string
  }[]
  general_information: {
    cas_number: string
    inci_name: string
    moq: string
    ec_number: string
    shelf_life: string
    fema_number: string
  }
}

export type ProductApiResponse = StrapiResponse<Product[]>

export interface Botanical {
  id: number
  documentId: string
  name: string
  slug: string
  scientific_name: string
  image_1: StrapiImage | null
  image_2: StrapiImage | null
  content: StrapiRichText[] | null
  products: {
    id: number
    name: string
  }[]
  seo: SeoData | null
}

export type BotanicalsApiResponse = StrapiResponse<Botanical[]>

export interface BotanicalFaq {
  id: number
  quesion: string
  answer: StrapiRichText[]
}
export type BotanicalFaqApiResponse = StrapiResponse<BotanicalFaq[]>

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
  seo: SeoData | null
}

// Hero Section for Our Business page
export interface OurBusinessHeroSection {
  __component?: "our-business.hero-section"
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
export type OurBusinessApiResponse = StrapiResponse<OurBusinessData>

export type ProductSubCategoryApiResponse = StrapiResponse<ProductSubCategory[]>

// ============================================
// Our Business Botanical Page
// ============================================

export interface ListProductSectionData {
  __component: "our-business.list-product-section"
  id: number
  title: string
  button: StrapiButton
}

export interface FaqSectionData {
  __component: "our-business.faq-section"
  id: number
  eyebrow: string
  title: string
}

export interface ContactUsSectionData {
  __component: "our-business.contact-us-section"
  id: number
  contact_us_section: any // Define this more accurately if needed
}

export type OurBusinessBotanicalPageSection =
  | OurBusinessHeroSection
  | ListProductSectionData
  | FaqSectionData
  | ContactUsSectionData

export interface OurBusinessBotanicalData {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  page_info: OurBusinessPageInfo
  page_sections: OurBusinessBotanicalPageSection[]
}

export type OurBusinessBotanicalApiResponse = StrapiResponse<OurBusinessBotanicalData>

// ============================================
// Our Business Catalog Page
// ============================================

export interface CatalogPageData {
  id: number
  page_info: OurBusinessPageInfo
  hero_section: OurBusinessHeroSection
  seo: SeoData | null
}

export type CatalogPageApiResponse = StrapiResponse<CatalogPageData>

// ============================================
// Our Business Product Detail Page
// ============================================

export interface ProductDetailSectionData {
  __component: "our-business.product-detail-section"
  id: number
  title_botanical: string
  title_organoleptic: string
  title_format: string
  title_application: string
  description_application: string
  title_accordion: string
  general_information_label: {
    id: number
    title: string
    cas_label: string
    certification_label: string
    inci_label: string
    moq_label: string
    ec_label: string
    shelf_life_label: string
    fema_label: string
    packaging_label: string
  }
}

export type ProductDetailPageSection =
  | ProductDetailSectionData
  | ContactUsSectionData
  | ListProductSectionData

export interface ProductDetailPageData {
  id: number
  page_info: OurBusinessPageInfo
  page_sections: ProductDetailPageSection[]
}

export type ProductDetailPageApiResponse = StrapiResponse<ProductDetailPageData>

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

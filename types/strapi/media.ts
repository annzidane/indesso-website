// types/strapi/media.ts

import type { StrapiImage, StrapiResponse } from "./common"

// ============================================
// Media Detail (Article) Types
// ============================================

export type MediaDetailApiResponse = StrapiResponse<MediaDetailRecord>

export interface MediaDetailRecord {
  id: number
  documentId?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  publishedAt?: string | null
  page_info?: PageInfo | null
  media_detail?: MediaDetail | null
  seo?: Seo | null
}

export interface PageInfo {
  id: number
  title: string
  slug: string
  path: string
}

export interface MediaDetail {
  id: number
  title_socmed?: string | null
  title_explore?: string | null
  background_image?: StrapiImage | null
  social_media?: SocialMediaItem[] | null
  button?: LinkButton | null
}

export interface SocialMediaItem {
  id: number
  url?: string | null
  icon?: StrapiImage | null
}

export interface LinkButton {
  id: number
  title?: string | null
  path?: string | null
}

export interface Seo {
  id: number
  meta_title?: string | null
  meta_description?: string | null
  keywords?: SeoKeyword[] | null
}

export interface SeoKeyword {
  id: number
  keywords?: string | null
}

// ============================================
// Media Page Types (Landing)
// ============================================

export interface MediaPageHeroSection {
  id: number
  title: string
  background_image: StrapiImage
}

export interface MediaPageNavItem {
  id: number
  title: string
  article_grid_title: string | null
  button_label: string | null
}

export interface MediaPageData {
  id: number
  documentId: string
  page_info: PageInfo
  hero_section: MediaPageHeroSection
  page_nav: MediaPageNavItem[]
  seo?: Seo
}

export type MediaPageApiResponse = StrapiResponse<MediaPageData>
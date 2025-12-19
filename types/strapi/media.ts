// types/strapi/media-detail.ts

import type { StrapiImage } from "./common" // sesuaikan path jika perlu

// Top-level API response wrapper
export interface MediaDetailApiResponse {
  data: MediaDetailRecord
  meta?: Record<string, any>
}

export interface MediaDetailRecord {
  id: number
  documentId?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  publishedAt?: string | null
  page_info?: PageInfo | null
  media_detail?: MediaDetail | null
  seo?: Seo | null
  // tambahan: jika response mengandung field lain, tambahkan di sini
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
  // jika ada properti lain di media_detail, tambahkan di sini
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

/** SEO block shape found in the payload */
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
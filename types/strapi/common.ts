/**
 * Common/Global Strapi Types
 * Types that are reusable across multiple features
 */

// Strapi API Response wrapper
export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: StrapiPagination
  }
}

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

// Strapi Media/Image types
export interface StrapiImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: StrapiImageFormats | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface StrapiImageFormats {
  thumbnail?: StrapiImageFormat
  small?: StrapiImageFormat
  medium?: StrapiImageFormat
  large?: StrapiImageFormat
}

export interface StrapiImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

// Common reusable components
export interface StrapiButton {
  id: number
  title: string
  path: string
}

export interface StrapiRichText {
  type: string
  children: StrapiRichTextChild[]
}

export interface StrapiRichTextChild {
  type: string
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

// Navigation types (used globally)
export interface NavigationItem {
  id: number
  label: string
  href: string
  children?: NavigationItem[]
}

export interface field {
  id: number
  title: string
  placeholder: string
}

export interface fieldOption {
  id: number
  title: string
  placeholder: string
  option: Array<{
    id: number
    option: string
  }>
}

export interface fieldFile {
  id: number
  title: string
  placeholder: string
  button: string
}

// SEO Types
export interface SeoData {
  id: number
  meta_title: string
  meta_description: string
  keywords?: SeoKeyword[]
}

export interface SeoKeyword {
  id: number
  keywords: string
}
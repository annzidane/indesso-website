// Strapi API Response Types
export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiImage {
  id: number
  url: string
  alternativeText: string | null
  width: number
  height: number
  formats?: {
    thumbnail?: StrapiImageFormat
    small?: StrapiImageFormat
    medium?: StrapiImageFormat
    large?: StrapiImageFormat
  }
}

export interface StrapiImageFormat {
  url: string
  width: number
  height: number
}

// Landing Page Types
export interface HeroSection {
  id: number
  headline: string
  subheadline?: string
  ctaText: string
  ctaLink: string
  badge?: {
    title: string
    description: string
  }
  backgroundImage: StrapiImage
}

export interface AboutSection {
  id: number
  label: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  image: StrapiImage
  highlight: {
    prefix: string
    value: string
    suffix: string
  }
}

export interface StatItem {
  id: number
  value: string
  label: string
  description?: string
  image?: StrapiImage
}

export interface StatsSection {
  id: number
  label: string
  title: string
  description: string
  stats: StatItem[]
}

export interface BusinessCard {
  id: number
  title: string
  description: string
  ctaText: string
  ctaLink: string
  image: StrapiImage
}

export interface BusinessSection {
  id: number
  label: string
  title: string
  businessCards: BusinessCard[]
}

export interface FooterLink {
  id: number
  label: string
  href: string
}

export interface FooterColumn {
  id: number
  title: string
  links: FooterLink[]
}

export interface FooterData {
  id: number
  logo: StrapiImage
  description: string
  contactPhone: string
  contactEmail: string
  columns: FooterColumn[]
  copyright: string
}

export interface NavigationItem {
  id: number
  label: string
  href: string
  children?: NavigationItem[]
}

export interface LandingPageData {
  hero: HeroSection
  about: AboutSection
  stats: StatsSection
  business: BusinessSection
  footer: FooterData
  navigation: NavigationItem[]
}

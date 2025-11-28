/**
 * Footer Types
 * Types specific to the footer API
 */

import type { StrapiImage } from "./common"

export interface FooterSubMenu {
  id: number
  title: string | null
  path: string | null
}

export interface FooterMenuGroup {
  id: number
  title: string
  path: string
  menus: FooterSubMenu[]
}

export interface FooterContactPhone {
  id: number
  phone_title: string
  phone_number: string
}

export interface FooterContactEmail {
  id: number
  email_title: string
  email: string
}

export interface FooterData {
  id: number
  documentId: string
  logo?: StrapiImage
  description: string
  copyright: string
  contact_phone?: FooterContactPhone
  contact_email?: FooterContactEmail
  footer_menus: FooterMenuGroup[]
}

export interface FooterApiResponse {
  data: FooterData
  meta: object
}

// Legacy types (for backward compatibility)
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

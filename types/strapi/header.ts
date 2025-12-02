/**
 * Header Types
 * Types specific to the header/navigation API
 */

import type { StrapiImage } from "./common"

export interface HeaderMenu {
  id: number
  title: string
  path: string
}

export interface HeaderLang {
  id: number
  title: string
  value: string
}

export interface HeaderData {
  id: number
  documentId: string
  logo: StrapiImage
  logo_fullcolor: StrapiImage
  menus: HeaderMenu[]
  lang: HeaderLang[]
}

export interface HeaderApiResponse {
  data: HeaderData
  meta: object
}

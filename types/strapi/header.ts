/**
 * Header Types
 * Types specific to the header/navigation API
 */

import type { StrapiImage, StrapiResponse } from "./common"

export interface HeaderMenuDetail {
  id: number
  title: string
  description: string
  button: string
  slug?: string | null
}

export interface HeaderMenu {
  id: number
  title: string
  path: string
  description?: string
  button?: string | null
  image?: StrapiImage
  menu_detail?: HeaderMenuDetail[]
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

export type HeaderApiResponse = StrapiResponse<HeaderData>

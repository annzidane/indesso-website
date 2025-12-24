/**
 * Banner Types
 * Types specific to the banner/carousel API
 */

import type { StrapiImage, StrapiResponse } from "./common"

export interface BannerData {
  id: number
  documentId: string
  title: string | null
  order_number: number | null
  image: StrapiImage
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type BannerApiResponse = StrapiResponse<BannerData[]>

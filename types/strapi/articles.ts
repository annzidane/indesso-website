/**
 * Articles (News/Media) Types
 */

import type { StrapiImage, StrapiResponse, StrapiRichText } from "./common"

export interface Article {
    id: number
    documentId: string
    title: string
    slug: string
    article_category: string
    date: string
    description: StrapiRichText[]
    createdAt: string
    updatedAt: string
    publishedAt: string
    image?: StrapiImage
}

export type ArticlesApiResponse = StrapiResponse<Article[]>

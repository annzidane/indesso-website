/**
 * Insights (Media Insights) Types
 */

import type { StrapiImage, StrapiResponse, StrapiRichText } from "./common"

export interface InsightCategory {
    id: number
    documentId: string
    title: string
    slug: string
    locale: string
}

export interface InsightData {
    id: number
    documentId: string
    title: string
    slug: string
    date: string
    description: StrapiRichText[]
    image: StrapiImage
    insight_categories: InsightCategory[]
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export type InsightsApiResponse = StrapiResponse<InsightData[]>

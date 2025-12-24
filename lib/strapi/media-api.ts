import { fetchStrapi } from "./client"
import type { MediaPageApiResponse, MediaPageData } from "@/types/strapi/media"

/**
 * Fetch Media Page data (Hero, Nav, etc.)
 */
export async function getMediaPage(locale: string = "en"): Promise<MediaPageData> {
    try {
        const response = await fetchStrapi<MediaPageApiResponse>("media", {
            locale,
            query: { pLevel: 5 },
            revalidate: 60,
        })

        if (!response?.data) {
            throw new Error("No data returned from Media Page API")
        }

        return response.data
    } catch (error) {
        if (locale !== "en") {
            console.warn(`[getMediaPage] Failed to fetch for locale '${locale}', falling back to 'en'.`)
            return getMediaPage("en")
        }
        throw error
    }
}

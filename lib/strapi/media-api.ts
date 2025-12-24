import { fetchStrapi } from "./client"
import type { MediaPageApiResponse, MediaPageData } from "@/types/strapi/media"

/**
 * Fetch Media Page data (Hero, Nav, etc.)
 */
export async function getMediaPage(locale: string = "en"): Promise<MediaPageData | null> {
    const response = await fetchStrapi<MediaPageApiResponse>("media", {
        locale,
        query: { pLevel: 3 },
        revalidate: 60,
    })

    return response.data
}

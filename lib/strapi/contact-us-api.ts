import { fetchStrapi } from "./client"

export async function getContactUsData(locale: string): Promise<any> {
  try {
    const response = await fetchStrapi<any>("contact-us", {
      locale,
      query: {
        pLevel: 5,
      },
    })

    return response.data
  } catch (error) {
    console.error("Failed to fetch contact-us data:", error)
    return null
  }
}

export async function getTopicsData(locale: string): Promise<Array<{
  documentId?: string;
  topic: string;
  slug: string;
  destination_email: string;
}>> {
  try {
    const response = await fetchStrapi<any>("topics", {
      locale,
      query: {
        pLevel: 4,
        limit: 100,
      },
    })

    if (!response?.data || !Array.isArray(response.data)) {
      console.error("No data returned from Topics API")
      return []
    }
    const items: Array<{ topic: string; slug: string; destination_email: string }> = response.data.map((topic: any) => {
      const topicName = (topic.attributes?.topic ?? topic.attributes?.name ?? topic.topic ?? topic.name ?? topic.attributes?.title ?? '').toString()
      const slug = (topic.attributes?.slug ?? topic.slug ?? '').toString()
      const destination_email = (topic.attributes?.destination_email ?? topic.destination_email ?? '').toString()

      return { topic: topicName, slug, destination_email }
    })
console.log("Fetched topics:", items);
    // Optionally filter out empty topics
    return items.filter(i => i.topic && i.topic.trim().length > 0)
  } catch (error) {
    console.error("Failed to fetch contact topics data:", error)
    return []
  }
}
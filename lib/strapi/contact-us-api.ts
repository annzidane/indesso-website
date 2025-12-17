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
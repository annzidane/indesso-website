import { fetchStrapi } from "./client"
import { extractTextFromRichText } from "./utils"
import type {
  ContactUsApiResponse,
  ContactUsData,
  ContactUsPageSectionData,
  VisitorCenterPageSectionData,
  ContactUsPageProps,
  TopicsApiResponse,
  TopicItem,
} from "@/types/strapi/contact-us"
import type { StrapiRichText } from "@/types/strapi/common"

// Transform API response to component props
function transformContactUsData(data: ContactUsData): ContactUsPageProps {
  const contactSectionData = data.page_nav.find(s => s.__component === "contact-us.contact-us-page") as ContactUsPageSectionData | undefined
  const visitorSectionData = data.page_nav.find(s => s.__component === "contact-us.visitor-center-page") as VisitorCenterPageSectionData | undefined

  return {
    pageInfo: {
      title: data.page_info?.title || "Contact Us",
      slug: data.page_info?.slug || "contact-us",
      path: data.page_info?.path || "/contact-us",
    },
    hero: {
      title: data.hero_section?.title || "Contact Us",
      backgroundImage: data.hero_section?.background_image,
    },

    // Transform Contact Us Section if present
    contactSection: contactSectionData ? {
      location: {
        eyebrow: contactSectionData.our_location_section?.eyebrow || "OUR LOCATION",
        title: contactSectionData.our_location_section?.title || "Global Presence",
        description: contactSectionData.our_location_section?.description || "",
        tabs: contactSectionData.our_location_section?.country_tab?.map(tab => ({
          id: tab.id,
          country: tab.title,
          cards: tab.location_card?.map(card => ({
            id: card.id,
            officeType: card.office_type,
            cityName: card.city_name,
            address: card.address,
            phone: card.phone_number,
          })) || [],
        })) || [],
      },
      form: {
        eyebrow: contactSectionData.contact_us_section?.eyebrow || "Contact Us",
        title: contactSectionData.contact_us_section?.title || "Connect With Indesso",
        buttonText: contactSectionData.contact_us_section?.button || "Submit",
        image: contactSectionData.contact_us_section?.image,
        fields: {
          name: contactSectionData.contact_us_section?.field_name,
          companyName: contactSectionData.contact_us_section?.field_company_name,
          email: contactSectionData.contact_us_section?.field_email,
          topic: {
            ...contactSectionData.contact_us_section?.field_topic,
            options: contactSectionData.contact_us_section?.field_topic?.option?.map(o => o.size) || [],
          },
          note: contactSectionData.contact_us_section?.field_note,
        },
      },
    } : undefined,

    // Transform Visitor Center Section if present
    visitorSection: visitorSectionData ? {
      center: {
        eyebrow: visitorSectionData.visitor_center_section?.eyebrow || "Indesso Visitor Center",
        title: visitorSectionData.visitor_center_section?.title || "A Gateway to Science and Creativity",
        // Using Type Assertion as StrapiRichText[] because structure matches
        description: extractTextFromRichText(visitorSectionData.visitor_center_section?.description as unknown as StrapiRichText[]),
        videoLink: visitorSectionData.visitor_center_section?.link,
        image: visitorSectionData.visitor_center_section?.image,
        media: visitorSectionData.visitor_center_section?.media,
      },
      form: {
        eyebrow: visitorSectionData.visitor_form_section?.eyebrow || "Visitor Form",
        title: visitorSectionData.visitor_form_section?.title || "Discover What Awaits You",
        description: visitorSectionData.visitor_form_section?.description || "",
        // Using Type Assertion for minimal rich text structure
        terms: extractTextFromRichText(visitorSectionData.visitor_form_section?.terms_agreement as unknown as StrapiRichText[]),
        buttonText: visitorSectionData.visitor_form_section?.button || "Submit",
        image: visitorSectionData.visitor_form_section?.image,
        fields: {
          name: visitorSectionData.visitor_form_section?.field_name,
          institution: visitorSectionData.visitor_form_section?.field_institution,
          date: visitorSectionData.visitor_form_section?.field_date,
          time: visitorSectionData.visitor_form_section?.field_time,
          visitor: visitorSectionData.visitor_form_section?.field_visitor,
        },
        rules: visitorSectionData.visitor_form_section?.rules_card?.map(rule => ({
          id: rule.id,
          text: rule.rules,
          icon: rule.icon,
        })) || [],
      },
    } : undefined,

    seo: data.seo ? {
      metaTitle: data.seo.meta_title,
      metaDescription: data.seo.meta_description,
      keywords: data.seo.keywords?.map(k => k.keywords) || [],
    } : undefined,
  }
}

export async function getContactUsData(locale: string): Promise<ContactUsPageProps> {
  const response = await fetchStrapi<ContactUsApiResponse>("contact-us", {
    locale,
    query: {
      pLevel: 5,
    },
  })

  if (!response?.data) {
    throw new Error("No data returned from Contact Us API")
  }

  return transformContactUsData(response.data)
}

export async function getTopicsData(locale: string): Promise<TopicItem[]> {
  const response = await fetchStrapi<TopicsApiResponse>("topics", {
    locale,
    query: {
      pLevel: 4,
      limit: 100,
    },
  })

  if (!response?.data) {
    return []
  }

  return response.data.map(topic => ({
    id: topic.id,
    topic: topic.topic,
    slug: topic.slug,
    destination_email: topic.destination_email,
  }))
}
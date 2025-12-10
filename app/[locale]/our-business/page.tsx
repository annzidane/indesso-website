import { redirect } from "next/navigation"
import { getDefaultProductSubCategorySlug } from "@/lib/strapi/our-business-api"

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function OurBusinessRedirect({ params }: PageProps) {
  const { locale } = await params
  
  // Get the default (first) product sub-category slug from API
  const defaultSlug = await getDefaultProductSubCategorySlug(locale)
  
  // Redirect to the first sub-category, or fallback to a hardcoded slug
  const targetSlug = defaultSlug || "natural-aroma-ingredients-and-extracts"
  
  redirect(`/${locale}/our-business/${targetSlug}`)
}

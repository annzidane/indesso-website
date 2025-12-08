/**
 * Strapi Utilities
 * Shared helper functions for Strapi data transformation
 */

import type { StrapiRichText } from "@/types/strapi"

/**
 * Extract plain text from Strapi Rich Text format
 */
export function extractTextFromRichText(richText: StrapiRichText[] | undefined | null): string {
  if (!richText || !Array.isArray(richText)) {
    return ""
  }
  return richText
    .map(block => block.children?.map(child => child.text).join("") || "")
    .filter(text => text.length > 0)
    .join("\n\n")
}

/**
 * Convert text to Title Case (capitalize first letter of each word)
 * Handles: "LIFE AT INDESSO" -> "Life At Indesso"
 * Handles: "life at indesso" -> "Life At Indesso"
 * Handles: "Life At Indesso" -> "Life At Indesso" (unchanged)
 */
export function toTitleCase(text: string): string {
  if (!text) return ""
  
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * Mapping of component names to section IDs
 */
const COMPONENT_TO_SECTION_ID: Record<string, string> = {
  // Career sections
  "career.life-at-indesso": "life-at-indesso",
  "career.career-joinus": "join-us",
  "career.testimonial": "testimonial",
  "career.growing-together": "growing-together",
  // Sustainability sections
  "sustainability.sustainability-strategy-section": "strategy",
  "sustainability.sustainability-initiative-section": "initiative",
  "sustainability.responsible-operations-section": "responsible-operations",
  "sustainability.commitment-section": "commitment",
  "sustainability.sustainability-report-section": "report",
}

/**
 * Convert Strapi component name to navigation section ID
 */
export function componentToSectionId(component: string): string | null {
  return COMPONENT_TO_SECTION_ID[component] || null
}

/**
 * Convert text to slug format (lowercase, spaces to dashes)
 * Handles: "LIFE AT INDESSO" -> "life-at-indesso"
 * Handles: "Our Strategy" -> "our-strategy"
 */
export function toSlug(text: string): string {
  if (!text) return ""
  
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
}

/**
 * Generic interface for sections with eyebrow
 */
interface SectionWithEyebrow {
  __component: string
  eyebrow?: string
  feature?: {
    eyebrow?: string
  }
}

/**
 * Get eyebrow text from a section
 * Checks both direct eyebrow and nested feature.eyebrow
 */
export function getSectionEyebrow(section: SectionWithEyebrow): string | null {
  // Check direct eyebrow first
  if (section.eyebrow) {
    return section.eyebrow
  }
  // Check nested feature.eyebrow (for strategy section)
  if (section.feature?.eyebrow) {
    return section.feature.eyebrow
  }
  return null
}

/**
 * Generate navigation items from page sections
 * Excludes hero sections and transforms eyebrow to Title Case
 * ID is generated from eyebrow (lowercase, spaces to dashes)
 */
export function generateNavItemsFromSections<T extends SectionWithEyebrow>(
  sections: T[],
  heroComponentName: string = "hero-section"
): Array<{ id: string; label: string }> {
  return sections
    .filter(s => !s.__component.includes(heroComponentName))
    .map(s => {
      const eyebrow = getSectionEyebrow(s)
      if (eyebrow) {
        return { id: toSlug(eyebrow), label: toTitleCase(eyebrow) }
      }
      return null
    })
    .filter((item): item is { id: string; label: string } => item !== null)
}

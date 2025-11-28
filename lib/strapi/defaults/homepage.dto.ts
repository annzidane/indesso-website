/**
 * Homepage Default Data
 * Fallback data when API fails
 */

import type {
  HomepageData,
  HeroSectionProps,
  AboutSectionProps,
  ReasonSectionProps,
  BusinessSectionProps,
  SeoProps,
} from "@/types/strapi"

// Default Hero Section Props
export const defaultHeroSection: HeroSectionProps = {
  title: "Crafting Natures Essence for the World",
  ctaText: "LEARN MORE",
  ctaLink: "/about",
  badge: {
    title: "One of Few Company in The World",
    description: "Mastering The Entire Clove Derivative Spectrum",
    image: {
      id: 3,
      documentId: "zodhsa4g0pndp56i5b2iheu5",
      name: "badge.png",
      alternativeText: null,
      caption: null,
      width: 72,
      height: 72,
      formats: null,
      hash: "badge_605dbd9f55",
      ext: ".png",
      mime: "image/png",
      size: 1.66,
      url: "/uploads/badge_605dbd9f55.png",
      previewUrl: null,
      provider: "local",
      provider_metadata: null,
      createdAt: "2025-11-26T07:55:24.549Z",
      updatedAt: "2025-11-26T07:55:24.549Z",
      publishedAt: "2025-11-26T07:55:24.549Z"
    }
  },
}

// Default About Section Props
export const defaultAboutSection: AboutSectionProps = {
  label: "ABOUT US",
  title: "Specialist in Natural Taste & Aroma Ingredients",
  description:
    "We create nature based solutions that elevate taste, aroma, and sensory experiences for brands and creators in the food, beverage, and aromatic industries.\n\nWith strong manufacturing expertise rooted in Indonesia and trusted across international markets, we combine scientific excellence with a passion for sustainability to enrich quality of life through the best of nature.",
  ctaText: "Learn More >",
  ctaLink: "/about",
  highlight: {
    prefix: "Since",
    value: "1968",
    suffix: "Indonesia's most experienced natural ingredients company",
  },
}

// Default Reason/Stats Section Props
export const defaultReasonSection: ReasonSectionProps = {
  label: "WHY CHOOSE US",
  title: "Our Innovation Story in Powerful Numbers",
  description:
    "We create nature based solutions that elevate taste, aroma, and sensory experiences for brands and creators in the food, beverage, and aromatic industries.",
  matric: {
    employeeTitle: "700+ Employees",
    employeeDescription: "Powering innovation and excellence",
    peopleTitle: "15% of Our People",
    peopleDescription: "Work directly in scientific & technical roles",
  },
  statistics: [
    {
      id: 1,
      title: "2800+ solar panels across 3 sites",
      description: "Pioneering renewable energy in our industry",
    },
    {
      id: 2,
      title: "One of few companies in the world",
      description: "Mastering the Entire Clove Derivative Spectrum",
    },
    {
      id: 3,
      title: "150,000 Tonnes of Essential Oils & Aroma",
      description: "Ingredients produced - shaping the scent and flavor of billions products",
    },
    {
      id: 4,
      title: "59 Countries Served",
      description: "Bringing the essence of nature to global industries",
    },
  ],
  impact: {
    opener: "Embracing more than",
    value: 100000,
    title: "Farmers & Biomass Collectors",
    description: "for raw material sourcing, touching people's lives and enhancing their livelihoods",
  },
}

// Default Business Section Props
export const defaultBusinessSection: BusinessSectionProps = {
  label: "OUR BUSINESS",
  title: "Shaping Sensory Journeys for Everyday Life",
  cards: [
    {
      id: 1,
      title: "Natural Aroma Ingredients & Extracts",
      description:
        "We transform the best of nature into inspiration for broader product innovations, empowering development in Flavor and Fragrance, Food, and the Pharmaceutical industry while helping creators craft products that enrich everyday life.",
      ctaText: "Learn More >",
      ctaLink: "/business/natural-aroma",
      cardImage: undefined,
      ingredientImage: undefined,
    },
    {
      id: 2,
      title: "Food & Beverage Solutions",
      description:
        "We craft experiences that bring joy to every bite, from savory ingredients, meat extracts, and cheese powders to beverages, desserts, and sauces. More than flavor, we aim to season life with delight.",
      ctaText: "Learn More >",
      ctaLink: "/business/food-beverage",
      cardImage: undefined,
      ingredientImage: undefined,
    },
    {
      id: 3,
      title: "Taste & Scent",
      description:
        "We believe every taste carries a story and every scent stirs a feeling. Through our Taste and Scent solutions, we bring these moments to life, helping brands shape experiences that stay long after the first bite or the first breath.",
      ctaText: "Learn More >",
      ctaLink: "/business/taste-scent",
      cardImage: undefined,
      ingredientImage: undefined,
    },
    {
      id: 4,
      title: "Specialty Food Ingredients",
      description:
        "Our curated collection of Specialty Ingredients, ranging from natural colors and stevia to stabilizers, dairy ingredients, and nutraceuticals, empowers brands to elevate both product performance and the overall consumer experience.",
      ctaText: "Learn More >",
      ctaLink: "/business/specialty-food",
      cardImage: undefined,
      ingredientImage: undefined,
    },
  ],
}

// Default SEO Props
export const defaultSeoProps: SeoProps = {
  metaTitle: "Indesso - Crafting Nature's Essence for the World",
  metaDescription: "We create nature based solutions that elevate taste, aroma, and sensory experiences for brands and creators in the food, beverage, and aromatic industries.",
  keywords: ["indesso", "natural ingredients", "aroma", "flavor", "essential oils"],
}

// Combined default homepage data
export const defaultHomepageProps = {
  hero: defaultHeroSection,
  about: defaultAboutSection,
  reason: defaultReasonSection,
  business: defaultBusinessSection,
  seo: defaultSeoProps,
}

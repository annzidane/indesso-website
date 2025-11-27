import { getStrapiMedia } from "./client"
import type {
  LandingPageData,
  HeroSection,
  AboutSection,
  StatsSection,
  BusinessSection,
  FooterData,
  NavigationItem,
} from "@/types/strapi"

export async function getLandingPageData(locale: string): Promise<LandingPageData> {
  // In production, these would be actual Strapi API calls
  // For now, returning mock data structure
  const [hero, about, stats, business, footer, navigation] = await Promise.all([
    getHeroSection(locale),
    getAboutSection(locale),
    getStatsSection(locale),
    getBusinessSection(locale),
    getFooterData(locale),
    getNavigation(locale),
  ])

  return { hero, about, stats, business, footer, navigation }
}

export async function getHeroSection(locale: string): Promise<HeroSection> {
  // Mock data - replace with actual Strapi call
  return {
    id: 1,
    headline: "Crafting Natures Essence for the World",
    ctaText: "LEARN MORE",
    ctaLink: "/about",
    badge: {
      title: "One of Few Company in The World",
      description: "Mastering The Entire Clove Derivative Spectrum",
    },
    backgroundImage: {
      id: 1,
      url: "/green-tea-plantation-mountains.jpg",
      alternativeText: "Tea plantation",
      width: 1920,
      height: 800,
    },
  }
}

export async function getAboutSection(locale: string): Promise<AboutSection> {
  return {
    id: 1,
    label: "ABOUT US",
    title: "Specialist in Natural Taste & Aroma Ingredients",
    description:
      "We create nature based solutions that elevate taste, aroma, and sensory experiences for brands and creators in the food, beverage, and aromatic industries.\n\nWith strong manufacturing expertise rooted in Indonesia and trusted across international markets, we combine scientific excellence with a passion for sustainability to enrich quality of life through the best of nature.",
    ctaText: "Learn More",
    ctaLink: "/about",
    image: {
      id: 2,
      url: "/scientist-with-plant-research-laboratory.jpg",
      alternativeText: "Scientist researching plants",
      width: 400,
      height: 500,
    },
    highlight: {
      prefix: "Since",
      value: "1968",
      suffix: "Indonesia's most experienced natural ingredients company",
    },
  }
}

export async function getStatsSection(locale: string): Promise<StatsSection> {
  return {
    id: 1,
    label: "WHY CHOOSE US",
    title: "Our Innovation Story in Powerful Numbers",
    description:
      "We create nature based solutions that elevate taste, aroma, and sensory experiences for brands and creators in the food, beverage, and aromatic industries.",
    stats: [
      {
        id: 1,
        value: "700+",
        label: "Employees",
        description: "Powering innovation and excellence",
      },
      {
        id: 2,
        value: "2800+",
        label: "solar panels across 3 sites",
        description: "Harnessing renewable energy in our industry",
      },
      {
        id: 3,
        value: "One",
        label: "of few companies in the world",
        description: "Mastering the Entire Clove Derivative Spectrum",
      },
      {
        id: 4,
        value: "15%",
        label: "of Our People",
        description: "Work directly in scientific & technical roles",
      },
      {
        id: 5,
        value: "150,000",
        label: "Tonnes of Essential Oils & Aroma",
        description: "Ingredients produced - shaping the scent and flavor of billions products",
        image: {
          id: 3,
          url: "/essential-oils-bottles-aroma.jpg",
          alternativeText: "Essential oils",
          width: 300,
          height: 200,
        },
      },
      {
        id: 6,
        value: "59",
        label: "Countries Served",
        description: "Bringing the essence of nature to global industries",
        image: {
          id: 4,
          url: "/spices-herbs-colorful.jpg",
          alternativeText: "Spices and herbs",
          width: 300,
          height: 200,
        },
      },
      {
        id: 7,
        value: "100,000",
        label: "Farmers & Biomass Collectors",
        description: "for raw material sourcing, touching people's lives and enhancing their livelihoods",
        image: {
          id: 5,
          url: "/farmers-harvesting-crops-field.jpg",
          alternativeText: "Farmers harvesting",
          width: 300,
          height: 200,
        },
      },
    ],
  }
}

export async function getBusinessSection(locale: string): Promise<BusinessSection> {
  return {
    id: 1,
    label: "OUR BUSINESS",
    title: "Shaping Sensory Journeys for Everyday Life",
    businessCards: [
      {
        id: 1,
        title: "Natural Aroma Ingredients & Extracts",
        description:
          "We transform the best of nature into inspiration for broader product innovations, empowering development in Flavor and Fragrance, Food, and the Pharmaceutical industry while helping creators craft products that enrich everyday life.",
        ctaText: "Learn More",
        ctaLink: "/business/natural-aroma",
        image: {
          id: 6,
          url: "/mint-leaves-fresh-herbs-green.jpg",
          alternativeText: "Natural aroma ingredients",
          width: 400,
          height: 300,
        },
      },
      {
        id: 2,
        title: "Food & Beverage Solutions",
        description:
          "We craft experiences that bring joy to every bite, from savory ingredients, meat extracts, and cheese powders to beverages, desserts, and sauces. More than flavor, we aim to season life with delight.",
        ctaText: "Learn More",
        ctaLink: "/business/food-beverage",
        image: {
          id: 7,
          url: "/fresh-vegetables-tomatoes-colorful-food.jpg",
          alternativeText: "Food and beverage",
          width: 400,
          height: 300,
        },
      },
      {
        id: 3,
        title: "Taste & Scent",
        description:
          "We believe every taste carries a story and every scent stirs a feeling. Through our Taste and Scent solutions, we bring these moments to life, helping brands shape experiences that stay long after the first bite or the first breath.",
        ctaText: "Learn More",
        ctaLink: "/business/taste-scent",
        image: {
          id: 8,
          url: "/lemon-citrus-fresh-yellow.jpg",
          alternativeText: "Taste and scent",
          width: 400,
          height: 300,
        },
      },
      {
        id: 4,
        title: "Specialty Food Ingredients",
        description:
          "Our curated collection of Specialty Ingredients, ranging from natural colors and stevia to stabilizers, dairy ingredients, and nutraceuticals, empowers brands to elevate both product performance and the overall consumer experience.",
        ctaText: "Learn More",
        ctaLink: "/business/specialty-food",
        image: {
          id: 9,
          url: "/corn-kernels-yellow-golden-food.jpg",
          alternativeText: "Specialty food ingredients",
          width: 400,
          height: 300,
        },
      },
    ],
  }
}

export async function getFooterData(locale: string): Promise<FooterData> {
  return {
    id: 1,
    logo: {
      id: 10,
      url: "/indesso-logo-white.jpg",
      alternativeText: "Indesso Logo",
      width: 120,
      height: 40,
    },
    description:
      "A global ingredient and innovation company committed to delivering quality, reliability, and sustainable value for every partner.",
    contactPhone: "+62 1234567890",
    contactEmail: "contact@indesso.co.id",
    columns: [
      {
        id: 1,
        title: "Our Business",
        links: [
          { id: 1, label: "Natural Aroma Ingredients & Extracts", href: "/business/natural-aroma" },
          { id: 2, label: "Taste & Wellness", href: "/business/taste-wellness" },
          { id: 3, label: "Food & Beverage Solutions", href: "/business/food-beverage" },
          { id: 4, label: "Specialty Ingredients Distributor", href: "/business/specialty" },
        ],
      },
      {
        id: 2,
        title: "About Indesso",
        links: [
          { id: 5, label: "Our Journey", href: "/about/journey" },
          { id: 6, label: "Meet The Boards", href: "/about/boards" },
          { id: 7, label: "Research & Innovation", href: "/about/research" },
          { id: 8, label: "Scientific Mastery", href: "/about/scientific" },
          { id: 9, label: "Responsible Operation", href: "/about/responsible" },
        ],
      },
      {
        id: 3,
        title: "Media",
        links: [
          { id: 10, label: "Press Release", href: "/media/press" },
          { id: 11, label: "Corporate News", href: "/media/news" },
          { id: 12, label: "Report & Insights", href: "/media/reports" },
          { id: 13, label: "Product Sheets", href: "/media/products" },
          { id: 14, label: "Videos", href: "/media/videos" },
        ],
      },
      {
        id: 4,
        title: "Careers",
        links: [
          { id: 15, label: "Life at Indesso", href: "/careers/life" },
          { id: 16, label: "Join Our Team", href: "/careers/join" },
          { id: 17, label: "Voices of Indesso", href: "/careers/voices" },
          { id: 18, label: "Growing Together", href: "/careers/growing" },
        ],
      },
    ],
    copyright: "Copyright © 2025 PT Indesso Aroma All Rights Reserved.",
  }
}

export async function getNavigation(locale: string): Promise<NavigationItem[]> {
  return [
    { id: 1, label: "Our Business", href: "/business" },
    { id: 2, label: "About Us", href: "/about-us" },
    { id: 3, label: "Media", href: "/media" },
    { id: 4, label: "Career", href: "/career" },
    { id: 5, label: "Contact Us", href: "/contact" },
    { id: 6, label: "Sustainability", href: "/sustainability" },
  ]
}

export { getStrapiMedia }

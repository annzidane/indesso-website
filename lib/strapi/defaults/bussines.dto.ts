export type BusinessSlug =
  | "natural-aroma-ingredients"
  | "food-beverage-solutions"
  | "taste-scent"
  | "specialty-food-ingredients"

export interface BusinessIntroData {
  label: string
  title: string
  description: string
}

export interface ProductData {
  title: string
  description: string
  image: string
}

export interface ApplianceData {
  label: string
  title: string
  description: string
  items: string[]
  image: string
}

export interface BotanicalItem {
  name: string
  description: string
  image: string
}

export interface BusinessPageData {
  intro: BusinessIntroData
  products: ProductData[]
  appliance: ApplianceData
  botanicals: BotanicalItem[]
}

export const businessData: Record<BusinessSlug, BusinessPageData> = {
  "natural-aroma-ingredients": {
    intro: {
      label: "NATURAL AROMA INGREDIENTS & EXTRACTS",
      title: "Bring Nature Flavor to Your Senses",
      description:
        "We provide aroma ingredients, plant-based extracts, and specialty solutions that enhance flavor and support healthier lifestyles. Our expertise helps brands develop food and beverage products that deliver both enjoyment and purpose.",
    },
    products: [
      {
        title: "Flavor & Fragrance",
        description:
          "Indesso supports many of the world's leading brands with natural ingredients that shape the flavors you enjoy every day. Quiet, upstream, and essential, our work helps bring familiar tastes to life in countless products around you.",
        image: "/scientist-working-laboratory-research.jpg",
      },
      {
        title: "Personal Care",
        description:
          "Our natural extracts and essential oils form the foundation of premium personal care products, delivering authentic scents and beneficial properties that consumers love.",
        image: "/personal-care-products-natural.jpg",
      },
      {
        title: "Aromatherapy",
        description:
          "Pure essential oils and botanical extracts carefully sourced from Indonesia's rich biodiversity for wellness and therapeutic applications.",
        image: "/aromatherapy-essential-oils.jpg",
      },
    ],
    appliance: {
      label: "EVERYDAY APPLIANCE",
      title: "Shaping Moments in Everyday Life",
      description:
        "Our ingredients support the taste, scent, and functional qualities found in many everyday products, helping create experiences that feel familiar and enjoyable.",
      items: ["Essential Oils", "Aroma Chemicals", "Functional Extracts", "Aromatherapy Blends", "Functional Extract"],
      image: "/woman-applying-skincare-product.jpg",
    },
    botanicals: [
      { name: "Clove", description: "Sub Description", image: "/botanical-clove.jpg" },
      { name: "Patchouli", description: "Sub Description", image: "/botanical-patchouli.jpg" },
      { name: "Citronella", description: "Sub Description", image: "/botanical-citronella.jpg" },
      { name: "Nutmeg", description: "Sub Description", image: "/botanical-nutmeg.jpg" },
      { name: "Vetiver", description: "Sub Description", image: "/botanical-vetiver.jpg" },
      { name: "Cubeb", description: "Sub Description", image: "/botanical-cubeb.jpg" },
      { name: "Cananga", description: "Sub Description", image: "/botanical-cananga.jpg" },
      { name: "Cajuput", description: "Sub Description", image: "/botanical-cajuput.jpg" },
      { name: "Ginger", description: "Sub Description", image: "/botanical-ginger.jpg" },
      { name: "Cassia Bark", description: "Sub Description", image: "/botanical-cassia-bark.jpg" },
    ],
  },
  "food-beverage-solutions": {
    intro: {
      label: "FOOD & BEVERAGE SOLUTIONS",
      title: "Crafting Taste Excellence",
      description:
        "We deliver innovative food and beverage solutions that help brands create products with exceptional taste profiles. Our expertise spans flavoring systems, natural extracts, and functional ingredients.",
    },
    products: [
      {
        title: "Beverage Flavoring",
        description:
          "Premium flavoring solutions for beverages ranging from soft drinks to functional health drinks, ensuring consistent taste and quality.",
        image: "/beverage-production-line.jpg",
      },
      {
        title: "Food Ingredients",
        description:
          "Natural and nature-identical ingredients that enhance the taste, aroma, and appeal of food products across all categories.",
        image: "/food-ingredients-production.jpg",
      },
    ],
    appliance: {
      label: "APPLICATION AREAS",
      title: "Versatile Solutions for Every Need",
      description:
        "Our food and beverage solutions find applications across diverse product categories, helping brands deliver consistent quality.",
      items: ["Soft Drinks & Juices", "Dairy Products", "Confectionery", "Baked Goods", "Savory Foods"],
      image: "/food-beverage-applications.jpg",
    },
    botanicals: [
      { name: "Vanilla", description: "Premium extract", image: "/botanical-vanilla.jpg" },
      { name: "Cinnamon", description: "Aromatic spice", image: "/botanical-cinnamon.jpg" },
      { name: "Cardamom", description: "Exotic flavor", image: "/botanical-cardamom.jpg" },
      { name: "Turmeric", description: "Golden spice", image: "/botanical-turmeric.jpg" },
      { name: "Lemongrass", description: "Fresh citrus", image: "/botanical-lemongrass.jpg" },
      { name: "Galangal", description: "Aromatic root", image: "/botanical-galangal.jpg" },
      { name: "Star Anise", description: "Sweet licorice", image: "/botanical-star-anise.jpg" },
      { name: "Black Pepper", description: "Bold spice", image: "/botanical-black-pepper.jpg" },
    ],
  },
  "taste-scent": {
    intro: {
      label: "TASTE & SCENT",
      title: "The Art of Sensory Experience",
      description:
        "We specialize in creating taste and scent profiles that evoke emotions and memories. Our sensory expertise helps brands connect with consumers on a deeper level.",
    },
    products: [
      {
        title: "Flavor Creation",
        description:
          "Custom flavor development that captures the essence of natural ingredients while meeting modern consumer preferences.",
        image: "/flavor-creation-lab.jpg",
      },
      {
        title: "Fragrance Design",
        description:
          "Sophisticated fragrance compositions that tell a story and create lasting impressions across product categories.",
        image: "/fragrance-design-studio.jpg",
      },
    ],
    appliance: {
      label: "SENSORY APPLICATIONS",
      title: "Creating Memorable Experiences",
      description:
        "Our taste and scent solutions enhance products across industries, creating sensory experiences that consumers remember.",
      items: ["Fine Fragrances", "Home Care", "Oral Care", "Hair Care", "Skin Care"],
      image: "/sensory-testing-lab.jpg",
    },
    botanicals: [
      { name: "Rose", description: "Floral elegance", image: "/botanical-rose.jpg" },
      { name: "Jasmine", description: "Sweet floral", image: "/botanical-jasmine.jpg" },
      { name: "Ylang Ylang", description: "Exotic bloom", image: "/botanical-ylang-ylang.jpg" },
      { name: "Sandalwood", description: "Woody warmth", image: "/botanical-sandalwood.jpg" },
      { name: "Lavender", description: "Calming scent", image: "/botanical-lavender.jpg" },
      { name: "Eucalyptus", description: "Fresh green", image: "/botanical-eucalyptus.jpg" },
    ],
  },
  "specialty-food-ingredients": {
    intro: {
      label: "SPECIALTY FOOD INGREDIENTS",
      title: "Innovation in Every Ingredient",
      description:
        "We provide specialty food ingredients that address modern dietary needs and preferences. From plant-based solutions to functional ingredients, we help brands innovate.",
    },
    products: [
      {
        title: "Functional Ingredients",
        description:
          "Ingredients that deliver specific health benefits while maintaining excellent taste and texture in food applications.",
        image: "/functional-ingredients-lab.jpg",
      },
      {
        title: "Plant-Based Solutions",
        description:
          "Innovative plant-based ingredients that help brands develop sustainable and delicious alternative food products.",
        image: "/plant-based-solutions.jpg",
      },
    ],
    appliance: {
      label: "SPECIALTY APPLICATIONS",
      title: "Meeting Modern Food Demands",
      description:
        "Our specialty ingredients support the development of products that meet evolving consumer expectations for health and sustainability.",
      items: ["Health Foods", "Sports Nutrition", "Plant-Based Foods", "Clean Label Products", "Functional Beverages"],
      image: "/specialty-food-applications.jpg",
    },
    botanicals: [
      { name: "Moringa", description: "Superfood leaf", image: "/botanical-moringa.jpg" },
      { name: "Spirulina", description: "Blue-green algae", image: "/botanical-spirulina.jpg" },
      { name: "Ashwagandha", description: "Adaptogenic herb", image: "/botanical-ashwagandha.jpg" },
      { name: "Maca", description: "Energy root", image: "/botanical-maca.jpg" },
      { name: "Goji Berry", description: "Antioxidant rich", image: "/botanical-goji.jpg" },
      { name: "Chia", description: "Omega-3 seeds", image: "/botanical-chia.jpg" },
    ],
  },
}

export const businessNavItems = [
  { slug: "natural-aroma-ingredients", label: "Natural Aroma Ingredients & Extracts" },
  { slug: "food-beverage-solutions", label: "Food & Beverage Solutions" },
  { slug: "taste-scent", label: "Taste & Scent" },
  { slug: "specialty-food-ingredients", label: "Specialty Food Ingredients" },
]

export interface CatalogProduct {
  id: string
  name: string
  category: string
  badge: string
  description: string
  image: string
  slug: string
}

export interface CatalogProductDetail extends CatalogProduct {
  botanicalOrigin: string
  organoleptic: string
  format: string
  specifications: {
    casNumber?: string
    eincName?: string
    ecNumber?: string
    femaNumber?: string
    certification?: string
    hlg2?: string
    shelfLife?: string
    packagingSize?: string
  }
  applications: string[]
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: "1",
    name: "ALPHA CARYOPHYLLENE 900008",
    category: "Aroma Chemicals",
    badge: "Cloves",
    description: "Woody, Spicy, Clove, Oceanic-watery, slightly green",
    image: "/clove-dried-spice.jpg",
    slug: "alpha-caryophyllene-900008",
  },
  {
    id: "2",
    name: "ALPHA CARYOPHYLLENE 900021",
    category: "Aroma Chemicals",
    badge: "Cloves",
    description: "Woody, Spicy, Clove, Oceanic-watery, slightly green",
    image: "/clove-dried-spice.jpg",
    slug: "alpha-caryophyllene-900021",
  },
  {
    id: "3",
    name: "BENZOIN SUMATRA ABSOLUTE BB 851306",
    category: "Essential Oils",
    badge: "Benzoin",
    description: "Styrax, sweet, fruity, balsamic and vanilla odour",
    image: "/benzoin-resin-white.jpg",
    slug: "benzoin-sumatra-absolute-bb-851306",
  },
  {
    id: "4",
    name: "BENZOIN SUMATRA ABSOLUTE MD 745",
    category: "Essential Oils",
    badge: "Benzoin",
    description: "Styrax, balsamic, powdery and vanilla odour",
    image: "/benzoin-resin-white.jpg",
    slug: "benzoin-sumatra-absolute-md-745",
  },
  {
    id: "5",
    name: "BENZOIN SUMATRA ABSOLUTE MD 851305",
    category: "Essential Oils",
    badge: "Benzoin",
    description: "Styrax, balsamic, powdery and vanilla odour",
    image: "/benzoin-resin-white.jpg",
    slug: "benzoin-sumatra-absolute-md-851305",
  },
  {
    id: "6",
    name: "BENZOIN SUMATRA RESINOID SOAPY 851300",
    category: "Essential Oils",
    badge: "Benzoin",
    description: "Sweet, floral, balsamic and powdery odour",
    image: "/benzoin-resin-white.jpg",
    slug: "benzoin-sumatra-resinoid-soapy-851300",
  },
  {
    id: "7",
    name: "BENZOIN SUMATRA RESINOID SOBB 851304",
    category: "Essential Oils",
    badge: "Benzoin",
    description: "Sweet, floral, balsamic and powdery odour",
    image: "/benzoin-resin-white.jpg",
    slug: "benzoin-sumatra-resinoid-sobb-851304",
  },
  {
    id: "8",
    name: "BENZYL ISOEUGENOL 903",
    category: "Aroma Chemicals",
    badge: "Cloves",
    description: "Sweet, Balsamic, Floral, Spicy",
    image: "/clove-dried-spice.jpg",
    slug: "benzyl-isoeugenol-903",
  },
  {
    id: "9",
    name: "BLACK PEPPER OIL 858",
    category: "Essential Oils",
    badge: "Black Pepper",
    description: "Pungent, typical pepper odour, mild pepper taste",
    image: "/black-pepper-dried.jpg",
    slug: "black-pepper-oil-858",
  },
  {
    id: "10",
    name: "CAJEPUT OIL 850030",
    category: "Essential Oils",
    badge: "Cajeput",
    description: "Camphor odor, pungent, strong",
    image: "/cajeput-leaves-green.jpg",
    slug: "cajeput-oil-850030",
  },
  {
    id: "11",
    name: "CAJEPUT OIL CMM1012 850045",
    category: "Essential Oils",
    badge: "Cajeput",
    description: "Fresh, Camphoraceous, Pungent, Sweet, Woody, floral",
    image: "/cajeput-leaves-green.jpg",
    slug: "cajeput-oil-cmm1012-850045",
  },
  {
    id: "12",
    name: "CAJEPUT OIL CS 850052",
    category: "Essential Oils",
    badge: "Cajeput",
    description: "Fresh, Camphoraceous, Pungent, Strong",
    image: "/cajeput-leaves-green.jpg",
    slug: "cajeput-oil-cs-850052",
  },
  {
    id: "13",
    name: "CAJEPUT OIL LIGHT 850057",
    category: "Essential Oils",
    badge: "Cajeput",
    description: "Fresh, Camphoraceous, Pungent, Strong",
    image: "/cajeput-leaves-green.jpg",
    slug: "cajeput-oil-light-850057",
  },
  {
    id: "14",
    name: "CAJEPUT OIL SUPER 850042",
    category: "Essential Oils",
    badge: "Cajeput",
    description: "Champhoraceous, pungent, strong",
    image: "/cajeput-leaves-green.jpg",
    slug: "cajeput-oil-super-850042",
  },
  {
    id: "15",
    name: "CAMPHENE 950",
    category: "Aroma Chemicals",
    badge: "Turpentine",
    description: "Harsh, Camphoraceous, Woody, terpene like",
    image: "/turpentine-resin-amber.jpg",
    slug: "camphene-950",
  },
  {
    id: "16",
    name: "CANANGA OIL 850011",
    category: "Essential Oils",
    badge: "Ylang Ylang",
    description: "Sweet, green, floral, balsam, woody, leather",
    image: "/ylang-ylang-flower-yellow.jpg",
    slug: "cananga-oil-850011",
  },
]

const productDetails: Record<string, CatalogProductDetail> = {
  "alpha-caryophyllene-900008": {
    ...catalogProducts[0],
    botanicalOrigin: "Clove",
    organoleptic:
      "Woody, spicy, clove, opaenic watery, slightly green, nervous, balsamic, soft, mineral fresh, metallic dirty, scent herbal, light earthy",
    format: "Liquid",
    specifications: {
      casNumber: "6753-98-6",
      ecNumber: "229-819-7",
      certification: "Halal Kosher",
      hlg2: "20 Kg",
      shelfLife: "24 MONTH",
      packagingSize: "20 Kg (HDPE Jerrycan) 180 Kg (Hybrid Drum)",
    },
    applications: ["Flavor & Fragrance"],
  },
}

export function getProductDetail(slug: string): CatalogProductDetail | undefined {
  // Return detailed product if available, otherwise create a basic detail from catalog
  if (productDetails[slug]) {
    return productDetails[slug]
  }

  const product = catalogProducts.find((p) => p.slug === slug)
  if (!product) return undefined

  // Return a basic detail structure for products without full details
  return {
    ...product,
    botanicalOrigin: product.badge,
    organoleptic: product.description,
    format: "Liquid",
    specifications: {
      certification: "Halal Kosher",
      shelfLife: "24 MONTH",
      packagingSize: "20 Kg (HDPE Jerrycan)",
    },
    applications: ["Flavor & Fragrance"],
  }
}

export interface NaturalElement {
  name: string
  chemicalName: string
  ingredients: string
  image: string
}

export interface FAQQuestion {
  question: string
  answer: string
}

export interface ExpandableSection {
  title: string
  content: string
}

export interface BotanicalDetailData {
  title: string
  category: string
  subtitle: string
  heroImage: string
  mainImage: string
  description: string
  keyPlayerTitle: string
  keyPlayerText: string
  whatIsTitle: string
  whatIsText: string
  whatIsImage: string
  expandableSections: ExpandableSection[]
  naturalElements: NaturalElement[]
  faqQuestions: FAQQuestion[]
}

export const botanicalDetailData: Record<string, BotanicalDetailData> = {
  clove: {
    title: "Clove",
    category: "Natural Aroma Ingredients",
    subtitle: "A Key Player in the Global Spice Trade",
    heroImage: "/green-plants-nature-field.jpg",
    mainImage: "/clove-botanical-detailed.jpg",
    description:
      "Clove, sourced by expert oil traders from leading oil producers around the world, holds a rich history in culinary, medicinal, and aromatic traditions. From enhancing flavor to supporting healthier lifestyles, our expertise helps brands develop products that deliver both enjoyment and purpose.",
    keyPlayerTitle: "A Leading player in the iconic era of spice trade",
    keyPlayerText:
      "As a leading player in the iconic era of spice trade, indesso is committed to producing clove leaf oil with the highest grade in East Java. This aromatic blend is a mixture of clove buds, clove leaves, and clove stems, with unique, characteristic taste that has become key supply for industrial management, for markets the highest standards.",
    whatIsTitle: "What is Clove?",
    whatIsText:
      "Clove, Syzygium aromaticum is an aromatic flower bud native Asian to Indonesia and used as a spice. Cloves have been used for centuries as a flavoring in medicine, spices, food, and beverages. The whole clove is often used for cooking and can be picked from a freshly prepared sauce or broth. In its spice form, it is similar to the taste of cinnamon and star anise.",
    whatIsImage: "/clove-plant-growing.jpg",
    expandableSections: [
      {
        title: "Tortor nunc purus amet nam orci diam.",
        content:
          "Production is done in Gresik, Pasuruan, where Indesso's partner farmers work hand in hand with the company. It allows for controlled production of clove leaf oil that supports the highest environmental standards. The method prioritizes the long-term cultivation and ensures more sustainable supply.",
      },
      {
        title: "Tortor nunc purus amet nam orci diam.",
        content:
          "Our clove sourcing follows sustainable farming practices that benefit local communities while maintaining the highest quality standards for our global partners.",
      },
      {
        title: "Tortor nunc purus amet nam orci diam.",
        content:
          "Through careful selection and processing, we ensure that each batch of clove meets strict quality requirements for industrial applications worldwide.",
      },
      {
        title: "Tortor nunc purus amet nam orci diam.",
        content:
          "The versatile applications of clove extend from food and beverage to pharmaceutical and cosmetic industries, making it a valuable ingredient for diverse product formulations.",
      },
    ],
    naturalElements: [
      {
        name: "Aroma Chemicals",
        chemicalName: "ALCOHOL CINNAMIC LINE",
        ingredients: "Woody, Spicy, Green, Floral, cinnamon",
        image: "/clove-dried-spice.jpg",
      },
      {
        name: "Aroma Chemicals",
        chemicalName: "MENTHOL BORNEADIOL 903",
        ingredients: "Woody, herbal, Green",
        image: "/clove-dried-spice.jpg",
      },
      {
        name: "Aroma Chemicals",
        chemicalName: "CARYOPHYLLENE 974",
        ingredients: "Sweet, Spiciness, woody, clove",
        image: "/clove-dried-spice.jpg",
      },
      {
        name: "Aroma Chemicals",
        chemicalName: "CARYOPHYLLENE ACETATE 977",
        ingredients: "Woody, Spiciness, woody clr",
        image: "/clove-dried-spice.jpg",
      },
      {
        name: "Aroma Chemicals",
        chemicalName: "CARYOPHYLLENE 974",
        ingredients: "Sweet, Spiciness, woody, clove",
        image: "/clove-dried-spice.jpg",
      },
      {
        name: "Aroma Chemicals",
        chemicalName: "CARYOPHYLLENE ACETATE 977",
        ingredients: "Woody, Spiciness, woody clr",
        image: "/clove-dried-spice.jpg",
      },
      {
        name: "Aroma Chemicals",
        chemicalName: "MENTHOL BORNEADIOL 903",
        ingredients: "Woody, herbal, Green",
        image: "/clove-dried-spice.jpg",
      },
      {
        name: "Aroma Chemicals",
        chemicalName: "ALCOHOL CINNAMIC LINE",
        ingredients: "Woody, Spicy, Green, Floral, cinnamon",
        image: "/clove-dried-spice.jpg",
      },
    ],
    faqQuestions: [
      {
        question: "Where does clove originate and how is it sourced?",
        answer:
          "Clove originates mainly from the Maluku Islands in Indonesia and is sourced from both wild-grown trees and cultivated farms. The clove buds, leaves and stems are harvested at specific times to ensure optimal quality and aroma compounds and fundamental spectra.",
      },
      {
        question: "What are the key aromatic and functional characteristics of clove?",
        answer:
          "Clove is known for its warm, spicy, and slightly sweet aroma profile. It contains eugenol as the main compound, providing antiseptic and analgesic properties. The functional characteristics include flavor enhancement, preservation qualities, and therapeutic benefits.",
      },
      {
        question: "How is clove commonly used in food, beverage, and flavor applications?",
        answer:
          "Clove is widely used in culinary applications including spice blends, marinades, baked goods, and beverages like chai and mulled wine. In the flavor industry, clove extracts and essential oils are used to create warm, spicy flavor profiles in various food and beverage products.",
      },
      {
        question: "What factors influence the quality and consistency of clove extracts or ingredients?",
        answer:
          "Quality factors include the harvest timing, drying methods, storage conditions, and extraction techniques. Consistency is maintained through rigorous quality control, standardized processing methods, and testing for key compounds like eugenol content. Origin, climate, and soil conditions also play crucial roles.",
      },
    ],
  },
  patchouli: {
    title: "Patchouli",
    category: "Natural Aroma Ingredients",
    subtitle: "Earthy Elegance in Every Drop",
    heroImage: "/green-plants-nature-field.jpg",
    mainImage: "/patchouli-botanical-detailed.jpg",
    description:
      "Patchouli, renowned for its distinctive earthy aroma, is a cornerstone ingredient in perfumery and personal care products. Sourced from sustainable farms across Indonesia, our patchouli oil meets the highest international standards.",
    keyPlayerTitle: "A timeless ingredient in fragrance creation",
    keyPlayerText:
      "Patchouli essential oil has been used for centuries in traditional medicine and perfumery. Its complex scent profile and fixative properties make it an indispensable ingredient in modern fragrance formulations.",
    whatIsTitle: "What is Patchouli?",
    whatIsText:
      "Patchouli (Pogostemon cablin) is a tropical plant native to Southeast Asia. The essential oil is extracted from its dried leaves through steam distillation, producing a dark amber oil with a rich, earthy, and woody aroma.",
    whatIsImage: "/patchouli-plant-growing.jpg",
    expandableSections: [
      {
        title: "Sustainable cultivation practices",
        content:
          "Our patchouli is grown using sustainable farming methods that support local communities and protect biodiversity in Indonesia's fertile regions.",
      },
    ],
    naturalElements: [
      {
        name: "Essential Oil",
        chemicalName: "PATCHOULI ALCOHOL",
        ingredients: "Earthy, woody, musky",
        image: "/patchouli-dried-leaves.jpg",
      },
    ],
    faqQuestions: [
      {
        question: "What makes patchouli unique in perfumery?",
        answer:
          "Patchouli's complex aroma profile and excellent fixative properties make it essential for creating long-lasting fragrances with depth and character.",
      },
    ],
  },
  citronella: {
    title: "Citronella",
    category: "Natural Aroma Ingredients",
    subtitle: "Fresh Protection from Nature",
    heroImage: "/green-plants-nature-field.jpg",
    mainImage: "/citronella-botanical-detailed.jpg",
    description:
      "Citronella, known for its fresh lemony scent and natural insect-repelling properties, is sourced from premium Indonesian farms. Our citronella oil serves diverse applications from fragrances to functional products.",
    keyPlayerTitle: "Nature's protective essence",
    keyPlayerText:
      "Citronella has been traditionally used for its aromatic and protective qualities. Today, it remains a popular choice for natural insect repellents and fresh, uplifting fragrances.",
    whatIsTitle: "What is Citronella?",
    whatIsText:
      "Citronella (Cymbopogon nardus) is a tropical grass native to Asia. The essential oil is extracted from its leaves and stems, producing a clear to pale yellow oil with a fresh, citrusy aroma.",
    whatIsImage: "/citronella-plant-growing.jpg",
    expandableSections: [
      {
        title: "Natural insect-repelling properties",
        content:
          "Citronella oil contains compounds that naturally deter insects, making it a preferred ingredient in eco-friendly pest control products.",
      },
    ],
    naturalElements: [
      {
        name: "Essential Oil",
        chemicalName: "CITRONELLAL",
        ingredients: "Fresh, citrus, green",
        image: "/citronella-oil.jpg",
      },
    ],
    faqQuestions: [
      {
        question: "How does citronella repel insects?",
        answer:
          "Citronella contains compounds like citronellal and geraniol that mask scents attractive to insects, effectively keeping them at bay without harmful chemicals.",
      },
    ],
  },
  nutmeg: {
    title: "Nutmeg",
    category: "Natural Aroma Ingredients",
    subtitle: "Warm Spice with Global Appeal",
    heroImage: "/green-plants-nature-field.jpg",
    mainImage: "/nutmeg-botanical-detailed.jpg",
    description:
      "Nutmeg, a prized spice with a warm, sweet aroma, is sourced from Indonesia's Banda Islands. Our nutmeg products are used in culinary, fragrance, and therapeutic applications worldwide.",
    keyPlayerTitle: "The spice that shaped history",
    keyPlayerText:
      "Nutmeg was once among the world's most valuable spices. Today, Indonesian nutmeg remains highly sought after for its superior quality and aromatic properties.",
    whatIsTitle: "What is Nutmeg?",
    whatIsText:
      "Nutmeg (Myristica fragrans) is the seed of an evergreen tree native to the Banda Islands. Both the seed (nutmeg) and its covering (mace) are valuable spices with distinct flavor profiles.",
    whatIsImage: "/nutmeg-plant-growing.jpg",
    expandableSections: [
      {
        title: "Dual spice from one source",
        content:
          "The nutmeg tree uniquely provides two distinct spices: nutmeg from the seed and mace from the seed covering, each with its own flavor characteristics.",
      },
    ],
    naturalElements: [
      {
        name: "Essential Oil",
        chemicalName: "MYRISTICIN",
        ingredients: "Warm, spicy, sweet",
        image: "/nutmeg-dried-spice.jpg",
      },
    ],
    faqQuestions: [
      {
        question: "What are the main uses of nutmeg?",
        answer:
          "Nutmeg is used extensively in cooking, baking, beverage flavoring, and as a fragrance component in perfumes and personal care products.",
      },
    ],
  },
  vetiver: {
    title: "Vetiver",
    category: "Natural Aroma Ingredients",
    subtitle: "Grounding Essence of the Earth",
    heroImage: "/green-plants-nature-field.jpg",
    mainImage: "/vetiver-botanical-detailed.jpg",
    description:
      "Vetiver, with its deep, earthy, and smoky aroma, is extracted from the roots of a resilient grass. Our Indonesian vetiver oil is prized in fine perfumery and aromatherapy.",
    keyPlayerTitle: "The perfumer's base note",
    keyPlayerText:
      "Vetiver oil is essential in perfumery as a base note fixative. Its complex scent profile and grounding properties make it invaluable in creating sophisticated fragrances.",
    whatIsTitle: "What is Vetiver?",
    whatIsText:
      "Vetiver (Chrysopogon zizanioides) is a perennial grass whose roots are distilled to produce a thick, amber oil with a distinctive earthy, woody aroma that improves with age.",
    whatIsImage: "/vetiver-plant-growing.jpg",
    expandableSections: [
      {
        title: "Environmental benefits",
        content:
          "Vetiver's extensive root system helps prevent soil erosion and improves soil quality, making it an environmentally beneficial crop.",
      },
    ],
    naturalElements: [
      {
        name: "Essential Oil",
        chemicalName: "VETIVEROL",
        ingredients: "Earthy, woody, smoky",
        image: "/vetiver-roots.jpg",
      },
    ],
    faqQuestions: [
      {
        question: "Why is vetiver so valued in perfumery?",
        answer:
          "Vetiver provides exceptional longevity and depth to fragrances. Its complex aroma and fixative properties make it a staple in high-end perfumery.",
      },
    ],
  },
}

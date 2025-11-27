import { getStrapiMedia } from "./client"
import type { AboutPageData } from "@/types/about"

export async function getAboutPageData(locale: string): Promise<AboutPageData> {
  // Mock data - replace with actual Strapi API calls
  return {
    heroTitle: "About Us",
    heroImage: {
      id: 1,
      url: "/about-hero-tea-plantation.jpg",
      alternativeText: "Tea plantation aerial view",
      width: 1920,
      height: 400,
    },
    ourStory: {
      id: 1,
      label: "OUR STORY",
      title: "Long Journey to The Greatness",
      subtitle: "A Legacy of Unlocking Nature",
      timeline: [
        {
          id: 1,
          year: "1960s",
          title: "A Legacy of Unlocking Nature",
          description:
            "It began in 1968 when Robert Gunawan in Semarang started as clove trader. Just three years later, the business flourished and established as an exporting company. It was initiated as a family-run and self-funded operation and continues to thrive to be managed in ownership.\n\nAs Indesso continued to invest, ideas and exploration towards Indonesia's aromatic diversity. A modern approach and production of aromatics today shapes the essence of Indesso. From that pure, a legacy was born.",
          image: {
            id: 1,
            url: "/timeline-1960s-founder.jpg",
            alternativeText: "Founder researching plants",
            width: 500,
            height: 400,
          },
        },
        {
          id: 2,
          year: "1980s",
          title: "Expanding Horizons",
          description:
            "The 1980s marked a period of significant expansion for Indesso. We began diversifying our product portfolio and establishing partnerships with international companies.",
          image: {
            id: 2,
            url: "/timeline-1980s-expansion.jpg",
            alternativeText: "Company expansion",
            width: 500,
            height: 400,
          },
        },
        {
          id: 3,
          year: "PRESENT",
          title: "Leading Innovation",
          description:
            "Today, Indesso stands as one of the world's leading natural ingredient companies, continuing our legacy of excellence while embracing sustainable practices for the future.",
          image: {
            id: 3,
            url: "/timeline-present-innovation.jpg",
            alternativeText: "Modern innovation",
            width: 500,
            height: 400,
          },
        },
      ],
    },
    boards: {
      id: 1,
      label: "MEET THE BOARDS",
      title: "Meet the People Behind Our Innovation",
      commissioners: [
        {
          id: 1,
          name: "Budi Setiadharma",
          position: "Chairman",
          image: { id: 1, url: "/board-placeholder.jpg", alternativeText: "Budi Setiadharma", width: 200, height: 200 },
        },
        {
          id: 2,
          name: "Diyah Sasanti R.",
          position: "Vice Chairman",
          image: { id: 2, url: "/board-placeholder.jpg", alternativeText: "Diyah Sasanti R.", width: 200, height: 200 },
        },
        {
          id: 3,
          name: "Wim P. Dulawan",
          position: "Vice Chairman",
          image: { id: 3, url: "/board-placeholder.jpg", alternativeText: "Wim P. Dulawan", width: 200, height: 200 },
        },
        {
          id: 4,
          name: "Brian Chang",
          position: "Vice Chairman",
          image: { id: 4, url: "/board-placeholder.jpg", alternativeText: "Brian Chang", width: 200, height: 200 },
        },
        {
          id: 5,
          name: "Henny Gunawan",
          position: "Vice Chairman",
          image: { id: 5, url: "/board-placeholder.jpg", alternativeText: "Henny Gunawan", width: 200, height: 200 },
        },
        {
          id: 6,
          name: "Tatsuya Onitsuka",
          position: "Vice Chairman",
          image: { id: 6, url: "/board-placeholder.jpg", alternativeText: "Tatsuya Onitsuka", width: 200, height: 200 },
        },
        {
          id: 7,
          name: "Harris Rajak",
          position: "Vice Chairman",
          image: { id: 7, url: "/board-placeholder.jpg", alternativeText: "Harris Rajak", width: 200, height: 200 },
        },
        {
          id: 8,
          name: "Leo Seno Bruno",
          position: "Vice Chairman",
          image: { id: 8, url: "/board-placeholder.jpg", alternativeText: "Leo Seno Bruno", width: 200, height: 200 },
        },
        {
          id: 9,
          name: "Monica Salchian",
          position: "Vice Chairman",
          image: { id: 9, url: "/board-placeholder.jpg", alternativeText: "Monica Salchian", width: 200, height: 200 },
        },
      ],
      directors: [
        {
          id: 10,
          name: "Robby Dulawan",
          position: "Chief Executive Officer",
          image: { id: 10, url: "/board-placeholder.jpg", alternativeText: "Robby Dulawan", width: 200, height: 200 },
        },
        {
          id: 11,
          name: "Tracy Ducrup",
          position: "Chief Financial Officer",
          image: { id: 11, url: "/board-placeholder.jpg", alternativeText: "Tracy Ducrup", width: 200, height: 200 },
        },
        {
          id: 12,
          name: "Efendi",
          position: "Chief Marketing Officer",
          image: { id: 12, url: "/board-placeholder.jpg", alternativeText: "Efendi", width: 200, height: 200 },
        },
        {
          id: 13,
          name: "Rosalina Pinta",
          position: "Chief Operations Officer",
          image: { id: 13, url: "/board-placeholder.jpg", alternativeText: "Rosalina Pinta", width: 200, height: 200 },
        },
      ],
    },
    research: {
      id: 1,
      label: "RESEARCH & INNOVATION",
      title: "Inspiring Solutions Through Nature",
      description:
        "PT Indesso innovation engine is a collaboration of deep research for nature-derived raw resources, guided by a sense of pure sustainability purpose. With a philosophy of translating nature's intelligence into solutions, we support self being and more complete human cycle purpose.",
      heroImage: {
        id: 1,
        url: "/research-hero-scientist.jpg",
        alternativeText: "Scientist conducting research",
        width: 1200,
        height: 400,
      },
      features: [
        {
          id: 1,
          title: "Advanced Research Expertise",
          description:
            "Our research team transforms creative market demands into highly functional aromatics through our research, ensuring blending, and preserving with quality ingredients.",
          image: {
            id: 1,
            url: "/research-feature-1.jpg",
            alternativeText: "Advanced Research",
            width: 400,
            height: 300,
          },
        },
        {
          id: 2,
          title: "Science Driven Development",
          description:
            "We innovate with the best products that blend aroma, systems with crafted stability of properties in meeting regulation requirements.",
          image: {
            id: 2,
            url: "/research-feature-2.jpg",
            alternativeText: "Science Driven Development",
            width: 400,
            height: 300,
          },
        },
        {
          id: 3,
          title: "Collaborative Co-Creation",
          description:
            "We collaborate with world-class ingredient experts through our sensory panel to create sensorial and emotional high impact products for global markets.",
          image: {
            id: 3,
            url: "/research-feature-3.jpg",
            alternativeText: "Collaborative Co-Creation",
            width: 400,
            height: 300,
          },
        },
      ],
    },
    scientificMastery: {
      id: 1,
      label: "SCIENTIFIC MASTERY",
      title: "Technology that Brings Nature Closer",
      tabs: [
        {
          id: 1,
          label: "DELIVERY SYSTEM",
          slug: "delivery-system",
          title: "Delivery System that Preserves Freshness",
          description:
            "We bring quality that transcends as the next step into modern encapsulation with therapeutic and sensory benefits. Fully micro particles serve as capsule, your content with flavor.",
          bulletPoints: [
            "For spray dried encapsulation: Vitamins, Protein granulating natural extracts or flavors",
            "For melt spray granules in an easy to use granular form: food ingredients",
          ],
          image: {
            id: 1,
            url: "/tech-delivery-system.jpg",
            alternativeText: "Delivery System technology",
            width: 500,
            height: 400,
          },
        },
        {
          id: 2,
          label: "EXTRACTION",
          slug: "extraction",
          title: "Advanced Extraction Technology",
          description:
            "Our state-of-the-art extraction facilities utilize cutting-edge technology to preserve the natural essence of botanical ingredients.",
          bulletPoints: ["Supercritical CO2 extraction for pure compounds", "Steam distillation for essential oils"],
          image: {
            id: 2,
            url: "/tech-extraction.jpg",
            alternativeText: "Extraction technology",
            width: 500,
            height: 400,
          },
        },
        {
          id: 3,
          label: "FORMULATION",
          slug: "formulation",
          title: "Expert Formulation Services",
          description:
            "Our team of experienced flavorists and perfumers create custom formulations tailored to your specific needs.",
          bulletPoints: ["Custom flavor profiles", "Fragrance development"],
          image: {
            id: 3,
            url: "/tech-formulation.jpg",
            alternativeText: "Formulation services",
            width: 500,
            height: 400,
          },
        },
      ],
    },
    responsibleOperation: {
      id: 1,
      label: "RESPONSIBLE OPERATION",
      title: "Integrity at the Core of Progress",
      backgroundImage: {
        id: 1,
        url: "/responsible-operation-bg.jpg",
        alternativeText: "Green agricultural field",
        width: 1920,
        height: 800,
      },
      items: [
        {
          id: 1,
          title: "Ethics And Integrity",
          description:
            "At Indesso, Responsible Operation With Standards is the essence of our total operations to always do more of what we have done in our market making yet with sustainable standards. We believe ethical conduct creates sustainable business growth. Our policies reinforce integrity, fair competition and full governance of anti-corruption. Having a strong foundation by commitment to code of conduct, every decision that is made.",
        },
        {
          id: 2,
          title: "Compliance",
          description:
            "We maintain strict compliance with all local and international regulations governing our industry, ensuring our products meet the highest standards of quality and safety.",
        },
        {
          id: 3,
          title: "Sustainability",
          description:
            "Our commitment to sustainability drives every aspect of our operations, from sourcing raw materials responsibly to minimizing our environmental footprint through innovative practices.",
        },
      ],
    },
  }
}

export { getStrapiMedia }

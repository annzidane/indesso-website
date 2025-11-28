/**
 * Default Data Exports
 * Central export for all default/fallback data
 */

import type { HeaderData, FooterData } from "@/types/strapi"

// Re-export homepage defaults
export {
  defaultHeroSection,
  defaultAboutSection,
  defaultReasonSection,
  defaultBusinessSection,
  defaultHomepageProps,
} from "./defaults/homepage.dto"

// Header default data
export const defaultHeaderData: HeaderData = {
  id: 0,
  documentId: "",
  logo: {
    id: 0,
    documentId: "",
    name: "logo-indesso.png",
    alternativeText: "Indesso Logo",
    caption: null,
    width: 179,
    height: 64,
    formats: null,
    hash: "",
    ext: ".png",
    mime: "image/png",
    size: 0,
    url: "/logo-indesso.png",
    previewUrl: null,
    provider: "local",
    provider_metadata: null,
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
  },
  menus: [
    { id: 1, title: "OUR BUSINESS", path: "/our-business" },
    { id: 2, title: "ABOUT US", path: "/about-us" },
    { id: 3, title: "MEDIA", path: "/media" },
    { id: 4, title: "CAREER", path: "/career" },
    { id: 5, title: "CONTACT US", path: "/contact-us" },
    { id: 6, title: "SUSTAINABILITY", path: "/sustainability" },
  ],
  lang: [
    { id: 1, title: "EN", value: "en" },
    { id: 2, title: "ID", value: "id" },
    { id: 3, title: "CN", value: "zh" },
  ],
}

// Footer default data
export const defaultFooterData: FooterData = {
  id: 0,
  documentId: "",
  description: "A global ingredient and innovation company committed to delivering quality, reliability, and sustainable value for every partner.",
  copyright: "Copyright © 2025 PT Indesso Aroma All Rights Reserved.",
  footer_menus: [
    { 
      id: 1, 
      title: "Our Business", 
      path: "/our-business",
      menus: [
        { id: 1, title: "Natural Aroma Ingredients & Extracts", path: "/" },
        { id: 2, title: "Taste & Wellness", path: "/" },
      ]
    },
    { 
      id: 2, 
      title: "About Indesso", 
      path: "/about-us",
      menus: [
        { id: 3, title: "Our Journey", path: "/" },
        { id: 4, title: "Meet The Boards", path: "/" },
      ]
    },
    { 
      id: 3, 
      title: "Media", 
      path: "/media",
      menus: [
        { id: 5, title: "Press Release", path: "/" },
        { id: 6, title: "Corporate News", path: "/" },
      ]
    },
    { 
      id: 4, 
      title: "Careers", 
      path: "/career",
      menus: [
        { id: 7, title: "Life at Indesso", path: "/" },
        { id: 8, title: "Join Our Team", path: "/" },
      ]
    },
    { 
      id: 5, 
      title: "Sustainability", 
      path: "/sustainability",
      menus: [
        { id: 9, title: "Sustainability Strategy", path: "/" },
        { id: 10, title: "Responsible Sourcing", path: "/" },
      ]
    },
    { 
      id: 6, 
      title: "Contact Us", 
      path: "/contact-us",
      menus: [
        { id: 11, title: "Sites & Subsidiaries", path: "/" },
        { id: 12, title: "Contact Form", path: "/" },
      ]
    },
  ],
}

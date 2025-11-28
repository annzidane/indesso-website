/**
 * Strapi Types - Central Export
 * Re-exports all Strapi types from their respective modules
 */

// Common/Global types
export type {
  StrapiResponse,
  StrapiPagination,
  StrapiImage,
  StrapiImageFormats,
  StrapiImageFormat,
  StrapiButton,
  StrapiRichText,
  StrapiRichTextChild,
  NavigationItem,
} from "./common"

// Header types
export type {
  HeaderMenu,
  HeaderLang,
  HeaderData,
  HeaderApiResponse,
} from "./header"

// Footer types
export type {
  FooterSubMenu,
  FooterMenuGroup,
  FooterContactPhone,
  FooterContactEmail,
  FooterData,
  FooterApiResponse,
  FooterLink,
  FooterColumn,
} from "./footer"

// Banner types
export type {
  BannerData,
  BannerApiResponse,
} from "./banner"

// Homepage types
export type {
  HomepageApiResponse,
  HomepageData,
  HomepageSection,
  HeroSectionData,
  AboutUsSectionData,
  // AboutFeature,
  AboutCard,
  ReasonSectionData,
  MatricCard,
  StatisticCard,
  ImpactCard,
  BusinessSectionData,
  BusinessCard,
  // SEO types
  SeoData,
  SeoKeyword,
  SeoProps,
  // Transformed props types
  HeroSectionProps,
  AboutSectionProps,
  ReasonSectionProps,
  BusinessSectionProps,
} from "./homepage"

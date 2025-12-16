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

// About Us Page types
export type {
  AboutUsApiResponse,
  AboutUsData,
  AboutUsSection,
  AboutUsHeroSectionData,
  AboutUsStorySectionData,
  StoryItem,
  AboutUsBoardSectionData,
  BoardGroup,
  BoardMember,
  AboutUsResearchSectionData,
  ResearchCard,
  AboutUsScientificMasterySectionData,
  ScientificMasteryTab,
  AboutUsResponsibleOperationsSectionData,
  AccordionItem,
  AboutUsPageProps,
} from "./about-us"

// Career Page types
export type {
  CareerApiResponse,
  CareerData,
  CareerSection,
  CareerHeroSectionData,
  CareerLifeAtIndessoSectionData,
  CareerShowcaseItem,
  CareerJoinUsSectionData,
  CareerTestimonialSectionData,
  TestimonialItem,
  CareerGrowingTogetherSectionData,
  GrowingTogetherSlide,
  CareerPageProps,
} from "./career"

// Sustainability Page types
export type {
  SustainabilityApiResponse,
  SustainabilityData,
  SustainabilitySection,
  SustainabilityHeroSectionData,
  SustainabilityStrategySectionData,
  SustainabilityInitiativeSectionData,
  SustainabilityResponsibleOperationsSectionData,
  SustainabilityCommitmentSectionData,
  SustainabilityReportSectionData,
  ReportsApiResponse,
  ReportData,
  SustainabilityPageProps,
  ReportItem,
} from "./sustainability"

// Our Business Page types
export type {
  ProductCategory,
  ProductCategoryApiResponse,
  ProductSubCategory,
  OurBusinessHeroSection,
  OurBusinessStickyNav,
  OurBusinessPageInfo,
  OurBusinessData,
  OurBusinessApiResponse,
  ProductSubCategoryApiResponse,
  OurBusinessHeroProps,
  OurBusinessNavItem,
  OurBusinessNavProps,
  OurBusinessPageProps,
  // Page section types
  SliderHotSpot,
  BusinessSliderItem,
  BusinessSummarySectionData,
  BusinessApplianceSectionData,
  BotanicalSourceSectionData,
  OurCatalogSectionData,
  OurBusinessPageSection,
  // Botanical types
  Botanical,
  BotanicalsApiResponse,
  // Botanical FAQ + page types
  BotanicalFaq,
  BotanicalFaqApiResponse,
  // Product + API response
  Product,
  ProductApiResponse,
  // Our Business Botanical page sections and page data
  ListProductSectionData,
  FaqSectionData,
  ContactUsSectionData,
  OurBusinessBotanicalPageSection,
  OurBusinessBotanicalData,
  OurBusinessBotanicalApiResponse,
  // Our Business Catalog page
  CatalogPageData,
  CatalogPageApiResponse,
  // Our Business Product Detail page
  ProductDetailSectionData,
  ProductDetailPageSection,
  ProductDetailPageData,
  ProductDetailPageApiResponse,
} from "./our-business"

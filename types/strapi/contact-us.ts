/**
 * Contact Us Page Types
 * Types specific to the contact-us API
 */

import type { StrapiImage, StrapiResponse } from "./common"

// ============================================
// API Response Types (Raw from Strapi)
// ============================================

export type ContactUsApiResponse = StrapiResponse<ContactUsData>

export interface ContactUsData {
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    page_info: {
        id: number
        title: string
        slug: string
        path: string
    }
    hero_section: {
        id: number
        title: string
        background_image?: StrapiImage
    }
    page_nav: ContactUsSection[]
    seo?: {
        id: number
        meta_title: string
        meta_description: string
        keywords?: { id: number; keywords: string }[]
    }
}

export type ContactUsSection =
    | ContactUsPageSectionData
    | VisitorCenterPageSectionData

// ============================================
// Contact Us Page Section
// ============================================

export interface ContactUsPageSectionData {
    __component: "contact-us.contact-us-page"
    id: number
    title: string
    our_location_section: {
        id: number
        eyebrow: string
        title: string
        description: string
        country_tab: CountryTab[]
    }
    contact_us_section: {
        id: number
        eyebrow: string
        title: string
        button: string
        image?: StrapiImage
        field_name: FormField
        field_company_name: FormField
        field_email: FormField
        field_topic: FormField & { option: Array<{ id: number; size: string }> }
        field_note: FormField
    }
}

export interface CountryTab {
    id: number
    title: string
    location_card: LocationCard[]
}

export interface LocationCard {
    id: number
    office_type: string
    city_name: string
    location_label: string
    address: string
    phone_label: string
    phone_number: string
}

export interface FormField {
    id: number
    title: string
    placeholder: string
}

// ============================================
// Visitor Center Page Section
// ============================================

export interface VisitorCenterPageSectionData {
    __component: "contact-us.visitor-center-page"
    id: number
    title: string
    visitor_center_section: {
        id: number
        eyebrow: string
        title: string
        description: Array<{ type: string; children: Array<{ text: string; type: string }> }>
        link: string
        image?: StrapiImage
        media?: StrapiImage
    }
    visitor_form_section: {
        id: number
        eyebrow: string
        title: string
        description: string
        terms_agreement: Array<{ type: string; children: Array<{ text: string; type: string }> }>
        button: string
        image?: StrapiImage
        field_name: FormField
        field_institution: FormField
        field_date: FormField
        field_time: FormField
        field_visitor: FormField
        rules_card: Array<{
            id: number
            rules: string
            icon?: StrapiImage
        }>
    }
}

// ============================================
// Topics API Types
// ============================================

export type TopicsApiResponse = StrapiResponse<TopicData[]>

export interface TopicData {
    id: number
    documentId: string
    topic: string
    slug: string
    destination_email: string
}


// ============================================
// Transformed Types for Components
// ============================================

export interface ContactUsPageProps {
    pageInfo: {
        title: string
        slug: string
        path: string
    }
    hero: {
        title: string
        backgroundImage?: StrapiImage
    }
    contactSection?: {
        location: {
            eyebrow: string
            title: string
            description: string
            tabs: Array<{
                id: number
                country: string
                cards: Array<{
                    id: number
                    officeType: string
                    cityName: string
                    address: string
                    phone: string
                }>
            }>
        }
        form: {
            eyebrow: string
            title: string
            buttonText: string
            image?: StrapiImage
            fields: {
                name: FormField
                companyName: FormField
                email: FormField
                topic: FormField & { options: string[] }
                note: FormField
            }
        }
    }
    visitorSection?: {
        center: {
            eyebrow: string
            title: string
            description: string
            videoLink: string
            image?: StrapiImage
            media?: StrapiImage
        }
        form: {
            eyebrow: string
            title: string
            description: string
            terms: string
            buttonText: string
            image?: StrapiImage
            fields: {
                name: FormField
                institution: FormField
                date: FormField
                time: FormField
                visitor: FormField
            }
            rules: Array<{
                id: number
                text: string
                icon?: StrapiImage
            }>
        }
    }
    seo?: {
        metaTitle: string
        metaDescription: string
        keywords: string[]
    }
}

export interface TopicItem {
    id: number
    topic: string
    slug: string
    destination_email: string
}

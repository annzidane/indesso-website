import type { Locale } from "./config"

// Static dictionaries for UI elements not from CMS
const dictionaries = {
  en: {
    common: {
      learnMore: "Learn More",
      contactUs: "Contact Us",
      readMore: "Read More",
    },
    navigation: {
      ourBusiness: "Our Business",
      aboutUs: "About Us",
      media: "Media",
      career: "Career",
      contactUs: "Contact Us",
      sustainability: "Sustainability",
    },
    footer: {
      copyright: "© 2025 PT Indesso Aroma. All Rights Reserved.",
    },
  },
  id: {
    common: {
      learnMore: "Pelajari Lebih Lanjut",
      contactUs: "Hubungi Kami",
      readMore: "Baca Selengkapnya",
    },
    navigation: {
      ourBusiness: "Bisnis Kami",
      aboutUs: "Tentang Kami",
      media: "Media",
      career: "Karir",
      contactUs: "Hubungi Kami",
      sustainability: "Keberlanjutan",
    },
    footer: {
      copyright: "© 2025 PT Indesso Aroma. Hak Cipta Dilindungi.",
    },
  },
  cn: {
    common: {
      learnMore: "了解更多",
      contactUs: "联系我们",
      readMore: "阅读更多",
    },
    navigation: {
      ourBusiness: "我们的业务",
      aboutUs: "关于我们",
      media: "媒体",
      career: "职业",
      contactUs: "联系我们",
      sustainability: "可持续发展",
    },
    footer: {
      copyright: "© 2025 PT Indesso Aroma. 版权所有。",
    },
  },
}

export type Dictionary = typeof dictionaries.en

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en
}

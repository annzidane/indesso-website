import type { Locale } from "@/lib/i18n/config";
import { getFooterData, getHeaderData } from "@/lib/strapi/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { MediaContent } from "@/components/sections/media/media-content";
import { notFound } from "next/navigation";

interface MediaPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

// Valid media slugs
const validSlugs = ["press-release", "stories", "insights", "product-catalog", "videos"] as const;
type MediaSlug = (typeof validSlugs)[number];

// Map slugs to types
const slugToType: Record<MediaSlug, string> = {
  "press-release": "press-release",
  stories: "story",
  insights: "insight",
  "product-catalog": "product-catalog",
  videos: "video",
};

// Map slugs to display titles
const slugToTitle: Record<MediaSlug, string> = {
  "press-release": "Press Release",
  stories: "Stories",
  insights: "Insights",
  "product-catalog": "Product Catalog",
  videos: "Videos",
};

export async function generateMetadata({ params }: MediaPageProps) {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug as MediaSlug)) {
    return {
      title: "Media Not Found - Indesso",
    };
  }

  const title = slugToTitle[slug as MediaSlug];

  return {
    title:
      locale === "id"
        ? `${title} - Media - Indesso`
        : `${title} - Media - Indesso`,
    description:
      locale === "id"
        ? `Berita terbaru ${title.toLowerCase()} dari Indesso`
        : `Latest ${title.toLowerCase()} from Indesso`,
    keywords: `media, ${slug}, ${title.toLowerCase()}, indesso`,
  };
}

export default async function MediaSlugPage({ params }: MediaPageProps) {
  const { locale, slug } = await params;

  // Validate slug
  if (!validSlugs.includes(slug as MediaSlug)) {
    notFound();
  }

  const mediaType = slugToType[slug as MediaSlug];

  const [footerData, headerData] = await Promise.all([
    getFooterData(locale),
    getHeaderData(locale),
  ]);

  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <PageHero title="Media" backgroundUrl="/media/media-bg.png" />
        <MediaContent locale={locale} defaultTab={mediaType as any} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  );
}

export async function generateStaticParams() {
  const params = [];
  for (const locale of ["en", "id", "cn"]) {
    for (const slug of validSlugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

import type { Locale } from "@/lib/i18n/config";
import { getFooterData, getHeaderData } from "@/lib/strapi/api";
import { fetchStrapi } from "@/lib/strapi/client";
import { getArticles } from "@/lib/strapi/articles-api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { MediaContent } from "@/components/sections/media/media-content";
import { notFound } from "next/navigation";

interface MediaPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

// Valid media slugs
const validSlugs = ["press-release", "stories", "insight", "product-sheets", "video"] as const;
type MediaSlug = (typeof validSlugs)[number];

// Map slugs to types
const slugToType: Record<MediaSlug, string> = {
  "press-release": "press-release",
  stories: "story",
  insight: "insight",
  "product-sheets": "product-catalog",
  video: "video",
};

// Map slugs to display titles
const slugToTitle: Record<MediaSlug, string> = {
  "press-release": "Press Release",
  stories: "Stories",
  insight: "Insights",
  "product-sheets": "Product Sheets",
  video: "Videos",
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

  // fetch media page content from Strapi to get nav labels/buttons
  let mediaPage: any = null
  try {
    const resp = (await fetchStrapi("media", { locale, query: { pLevel: 3 } })) as any
    mediaPage = resp?.data ?? null
    console.log("Fetched media page data:", mediaPage)
  } catch (e) {
    // ignore and allow page to render with defaults
    mediaPage = null
  }

  // Fetch initial articles server-side for press-release and stories to avoid exposing token to client
  let initialArticles: any[] = [];
  let initialArticlesMeta: any = null;
  try {
    if (slug === "press-release" || slug === "stories") {
      const category = slug === "press-release" ? "Press Release" : "Corporate Events";
      const resp = await getArticles(category, locale, 0, 7);
      initialArticles = resp?.data || [];
      initialArticlesMeta = resp?.meta || null;
    }
  } catch (e) {
    console.error("Error fetching initial articles in page.tsx", e);
    initialArticles = [];
    initialArticlesMeta = null;
  }

  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <PageHero title="Media" backgroundUrl="/media/media-bg.png" />
      <MediaContent locale={locale} defaultTab={slug as string} nav={mediaPage?.page_nav} initialArticles={initialArticles} initialMeta={initialArticlesMeta} />
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

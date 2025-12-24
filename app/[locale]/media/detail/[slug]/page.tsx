import type { Locale } from "@/lib/i18n/config";
import { getFooterData, getHeaderData } from "@/lib/strapi/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MediaDetailHero } from "@/components/sections/media/media-detail-hero";
import { MediaDetailContent } from "@/components/sections/media/media-detail-content";
import { MediaExploreMore } from "@/components/sections/media/media-explore-more";
import { fetchStrapi } from "@/lib/strapi/client";
import { getStrapiMedia } from "@/lib/strapi/client";
import { getArticleBySlug, getRelatedArticlesByCategory, getArticlePageData, getMediaDetailPage } from "@/lib/strapi/articles-api";
import { getMediaInsightBySlug } from "@/lib/strapi/insights-api";
import { notFound } from "next/navigation";

interface MediaDetailPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({ params }: MediaDetailPageProps) {
  const { locale } = await params
  const mediaPageData = await getMediaDetailPage(locale)

  return {
    title: mediaPageData?.seo?.meta_title || (locale === "id" ? "Media - Indesso" : "Media - Indesso"),
    description: mediaPageData?.seo?.meta_description || "Indesso Media Center",
    keywords: mediaPageData?.seo?.keywords?.map((k: any) => k.keywords).join(", "),
    openGraph: {
      title: mediaPageData?.seo?.meta_title || (locale === "id" ? "Media - Indesso" : "Media - Indesso"),
      description: mediaPageData?.seo?.meta_description || "Indesso Media Center",
      type: "website",
    },
  }
}

export default async function MediaDetailPage({
  params,
}: MediaDetailPageProps) {
  const { locale, slug } = await params;
  // Fetch header/footer, page settings and article+related in parallel (like botanical page)
  const [footerData, headerData, mediaPageData] = await Promise.all([
    getFooterData(locale),
    getHeaderData(locale),
    getMediaDetailPage(locale),
  ]);

  // Try to fetch an insight by slug first (server-side). If not found, fall back to articles.
  const insight: any = await getMediaInsightBySlug(slug, locale, 5);
  let a: any = null;
  let relatedRaw: any[] = [];
  let isInsight = false;

  if (insight) {
    a = insight;
    isInsight = true;
    // related items will be fetched by MediaExploreMore component (server-side) using mediaType/mediaCategory
  } else {
    // fallback to articles
    const articlePage = await getArticlePageData(slug, locale, 3, 3);
    a = articlePage?.article ?? null;
    relatedRaw = articlePage?.related ?? [];
  }

  if (!a) {
    notFound();
  }

  const dateStr = a?.date || a?.publishedAt || a?.createdAt || null;
  const date = dateStr ? new Date(dateStr).toLocaleDateString(locale === "id" ? "id" : "en", { day: "numeric", month: "long", year: "numeric" }) : "";
  const imageUrl = a?.image?.data?.attributes?.url || a?.image?.url || a?.image || null;
  const image = getStrapiMedia(imageUrl);
  const content = a?.description ?? "";

  // Build media object. For insights, category field differs (insight_categories)
  const media = {
    id: String(a.id),
    slug: a?.slug || a?.attributes?.slug,
    type: isInsight ? "insight" : (a.article_category || a.category || "article"),
    title: a.title || a.name || "",
    date,
    image,
    content,
    category: isInsight ? a.insight_categories : (a.article_category || a.category),
    raw: a,
  }

  const tags = isInsight && Array.isArray(a?.insight_categories) ? a.insight_categories.map((c: any) => c.title || c.name || c.slug) : []

  // Helper to normalize type for title generation
  const normalizedType = (() => {
    const t = (media.type || "").toLowerCase();
    if (t.includes("press")) return "press-release";
    if (t.includes("event") || t.includes("story") || t.includes("stories")) return "story";
    if (t.includes("insight")) return "insight";
    if (t.includes("video")) return "video";
    return "other";
  })();

  const sectionTitle =
    normalizedType === "press-release"
      ? "Explore More Press Releases"
      : normalizedType === "story"
        ? "Explore More Stories"
        : normalizedType === "insight"
          ? "Explore More Insights"
          : "Explore More Articles";

  const exploreSectionPage = {
    title: sectionTitle,
    button: mediaPageData?.media_detail?.button,
  }
  return (
    <>
      <Header data={headerData} locale={locale} variant="solid" />
      <main>
        <MediaDetailHero
          title={media.title}
          date={media.date}
          image={media.image}
          pageData={mediaPageData ?? undefined}
          tags={tags}
        />
        <MediaDetailContent content={media.content} title={media.title} />
        <MediaExploreMore
          locale={locale}
          exploreSectionPage={exploreSectionPage}
          mediaType={media.type}
          mediaCategory={media.category}
          mediaSlug={media.slug}
          limit={3}
          items={!isInsight ? relatedRaw.map(r => ({
            id: String(r.id),
            slug: r.slug || r.attributes?.slug,
            type: r.article_category || r.category || "article",
            title: r.title || r.name || "",
            date: r.date ? new Date(r.date).toLocaleDateString(locale === "id" ? "id" : "en", { day: "numeric", month: "long", year: "numeric" }) : "",
            image: getStrapiMedia(r.image?.data?.attributes?.url || r.image?.url || r.image?.formats?.medium?.url || r.image || null),
            content: r.description ? (typeof r.description === 'string' ? r.description : "") : "",
            tags: []
          })) : undefined}
        />
        {/* hero already rendered above */}
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  );
}

export async function generateStaticParams() {
  const locales = ["en", "id", "cn"];
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    try {
      // fetch a reasonably large page of articles and extract slugs
      const resp: any = await fetchStrapi("articles", {
        locale,
        query: {
          ["pagination[limit]"]: 100,
          pLevel: 1,
        },
        revalidate: 60,
      });
      const data = Array.isArray(resp?.data) ? resp.data : [];
      for (const a of data) {
        const s = a?.slug || a?.attributes?.slug || null;
        if (s) params.push({ locale, slug: s });
      }
    } catch (e) {
      // If fetching slugs fails for a locale, skip it
      console.error("Error fetching slugs for locale", locale, e);
    }
  }

  return params;
}

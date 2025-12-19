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
  const { locale, slug } = await params;
  // Fetch article by slug from Strapi
  try {
    // Try insight first
    const insight: any = await getMediaInsightBySlug(slug, locale, 5);
    const a: any = insight ?? (await getArticleBySlug(slug, locale, 3));
    if (!a) {
      return { title: "Media Not Found - Indesso" };
    }

    const content = (() => {
      if (!a?.description) return "";
      if (typeof a.description === "string") return a.description;
      try {
        if (Array.isArray(a.description) && a.description.length > 0) {
          const first = a.description[0];
          if (first?.children && Array.isArray(first.children)) {
            return first.children.map((c: any) => c.text || "").join(" ");
          }
          if (first?.text) return first.text;
        }
      } catch (e) {}
      return "";
    })();

    const title = a?.title || a?.name || "";
    const imageUrl = a?.image?.data?.attributes?.url || a?.image?.url || a?.image || null;
    const image = getStrapiMedia(imageUrl);

    return {
      title: `${title} - Indesso`,
      description: String(content).substring(0, 160).replace(/<[^>]*>/g, ""),
      keywords: `${a.article_category || a.category || ""}, indesso, media`,
      openGraph: {
        images: image ? [{ url: image }] : undefined,
      },
    };
  } catch (e) {
    return { title: "Media - Indesso" };
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

  if (insight) {
    a = insight;
    // related items will be fetched by MediaExploreMore component (server-side) using mediaType/mediaCategory
  } else {
    // fallback to articles
    const articlePage = await getArticlePageData(slug, locale, 3, 3);
    a = articlePage?.article ?? null;
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
    type: a.article_category || a.category || (a.insight_categories ? "insight" : ""),
    title: a.title || a.name || "",
    date,
    image,
    content,
    category: a.article_category || a.category || (a.insight_categories ? a.insight_categories : null),
    raw: a,
  }

  const exploreSectionPage = {
    title: mediaPageData?.media_detail?.title_explore,
    button: mediaPageData?.media_detail?.button,

  }

  const tags = media.type === "insight" && Array.isArray(a?.insight_categories) ? a.insight_categories.map((c: any) => c.title || c.name || c.slug) : []

  const sectionTitle =
    media.type === "press-release"
      ? "Explore More Press Releases"
      : media.type === "story"
      ? "Explore More Stories"
      : media.type === "insight"
      ? "Explore More Insights"
      : "Explore More Videos";
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

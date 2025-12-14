import type { Locale } from "@/lib/i18n/config";
import { getFooterData, getHeaderData } from "@/lib/strapi/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MediaDetailHero } from "@/components/sections/media/media-detail-hero";
import { MediaDetailContent } from "@/components/sections/media/media-detail-content";
import { MediaExploreMore } from "@/components/sections/media/media-explore-more";
import { getMediaById, getRelatedMedia } from "@/lib/data/media-data";
import { notFound } from "next/navigation";

interface MediaDetailPageProps {
  params: Promise<{ locale: Locale; id: string }>;
}

export async function generateMetadata({ params }: MediaDetailPageProps) {
  const { locale, id } = await params;
  const media = getMediaById(id);

  if (!media) {
    return {
      title: "Media Not Found - Indesso",
    };
  }

  return {
    title: `${media.title} - Indesso`,
    description: media.content.substring(0, 160).replace(/<[^>]*>/g, ""),
    keywords: `${media.type}, ${media.category || ""}, indesso, media`,
  };
}

export default async function MediaDetailPage({
  params,
}: MediaDetailPageProps) {
  const { locale, id } = await params;
  const media = getMediaById(id);

  if (!media) {
    notFound();
  }

  // Get related media items (same type, different ID)
  const relatedItems = getRelatedMedia(id, media.type, 3);

  const [footerData, headerData] = await Promise.all([
    getFooterData(locale),
    getHeaderData(locale),
  ]);

  // Determine section title based on media type
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
        />
        <MediaDetailContent content={media.content} title={media.title} />
        <MediaExploreMore
          items={relatedItems}
          locale={locale}
          sectionTitle={sectionTitle}
        />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  );
}

export async function generateStaticParams() {
  // Generate static paths for all media items (1-39)
  const mediaIds = Array.from({ length: 39 }, (_, i) => String(i + 1));

  const params = [];
  for (const locale of ["en", "id", "cn"]) {
    for (const id of mediaIds) {
      params.push({ locale, id });
    }
  }

  return params;
}

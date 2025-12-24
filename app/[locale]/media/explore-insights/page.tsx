import type { Locale } from "@/lib/i18n/config";
import { getFooterData, getHeaderData } from "@/lib/strapi/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ExploreInsightsHero } from "@/components/sections/media/explore-insights-hero";
import { ExploreInsightsContent } from "@/components/sections/media/explore-insights-content";
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi/client";
import { getMediaExploreInsight } from "@/lib/strapi/articles-api";

interface ExploreInsightsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ExploreInsightsPageProps) {
  const { locale } = await params
  const exploreInsightData = await getMediaExploreInsight(locale)

  return {
    title: exploreInsightData?.seo?.meta_title || (locale === "id" ? "Jelajahi Insights - Media - Indesso" : "Explore Insights - Media - Indesso"),
    description: exploreInsightData?.seo?.meta_description || "Indesso Media Center",
    keywords: exploreInsightData?.seo?.keywords?.map((k: any) => k.keywords).join(", "),
    openGraph: {
      title: exploreInsightData?.seo?.meta_title || (locale === "id" ? "Jelajahi Insights - Media - Indesso" : "Explore Insights - Media - Indesso"),
      description: exploreInsightData?.seo?.meta_description || "Indesso Media Center",
      type: "website",
    },
  }
}

export default async function ExploreInsightsPage({
  params,
}: ExploreInsightsPageProps) {
  const { locale } = await params;

  // Fetch header/footer and the explore-insights page data from Strapi
  const [footerData, headerData, exploreResp] = await Promise.all([
    getFooterData(locale),
    getHeaderData(locale),
    getMediaExploreInsight(locale),
  ]);

  const exploreData = (exploreResp as any)?.data ?? null;
  const hero = exploreData?.hero_section ?? null;
  const pageConfig = exploreData?.media_insight ?? null;

  // resolve hero background image URL
  const heroImage = hero?.background_image ? getStrapiMedia(hero.background_image?.formats?.large?.url || hero.background_image?.url || null) : "/media/explore-insight-bg-top.png";

  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <ExploreInsightsHero title={hero?.title || "Explore Insights"} backgroundImage={heroImage} />
        <ExploreInsightsContent locale={locale} pageConfig={pageConfig} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "cn" }];
}

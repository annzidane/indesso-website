import type { Locale } from "@/lib/i18n/config";
import { getFooterData, getHeaderData } from "@/lib/strapi/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ExploreInsightsHero } from "@/components/sections/media/explore-insights-hero";
import { ExploreInsightsContent } from "@/components/sections/media/explore-insights-content";

interface ExploreInsightsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ExploreInsightsPageProps) {
  const { locale } = await params;

  return {
    title:
      locale === "id"
        ? "Jelajahi Insights - Media - Indesso"
        : "Explore Insights - Media - Indesso",
    description:
      locale === "id"
        ? "Jelajahi insights dan laporan terbaru dari Indesso berdasarkan topik"
        : "Explore the latest insights and reports from Indesso by topic",
    keywords: "insights, reports, analysis, indesso, media",
  };
}

export default async function ExploreInsightsPage({
  params,
}: ExploreInsightsPageProps) {
  const { locale } = await params;

  const [footerData, headerData] = await Promise.all([
    getFooterData(locale),
    getHeaderData(locale),
  ]);

  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>
        <ExploreInsightsHero />
        <ExploreInsightsContent locale={locale} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "cn" }];
}

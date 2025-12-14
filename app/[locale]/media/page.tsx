import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

interface MediaPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { locale } = await params;

  // Redirect to the default tab (press-release)
  redirect(`/${locale}/media/press-release`);
}

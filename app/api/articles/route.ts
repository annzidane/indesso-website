import { NextResponse } from "next/server";
import { getArticles } from "@/lib/strapi/articles-api";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") || "";
    const locale = url.searchParams.get("locale") || "en";
    const start = Number(url.searchParams.get("start") || "0");
    const limit = Number(url.searchParams.get("limit") || "6");

    if (!category) {
      return NextResponse.json({ data: [], meta: null });
    }

    const resp = await getArticles(category, locale, start, limit);

    return NextResponse.json(resp);
  } catch (err) {
    console.error("/api/articles error:", err);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

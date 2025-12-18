import { NextResponse } from "next/server";
import { fetchStrapi } from "@/lib/strapi/client";

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

    const resp = await fetchStrapi<any>("articles", {
      locale,
      filters: {
        article_category: {
          $eq: category,
        },
      },
      query: {
        sort: "date:desc",
        ["pagination[start]"]: start,
        ["pagination[limit]"]: limit,
        pLevel: 3,
      },
      revalidate: 60,
    });

    return NextResponse.json(resp);
  } catch (err) {
    console.error("/api/articles error:", err);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

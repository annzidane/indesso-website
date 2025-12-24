import { NextResponse } from "next/server"
import { getFooterData, getHeaderData } from "@/lib/strapi/api"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get("locale") || "en"

    try {
        const [header, footer] = await Promise.all([
            getHeaderData(locale),
            getFooterData(locale),
        ])

        return NextResponse.json({ header, footer })
    } catch (error) {
        console.error("Error fetching layout data:", error)
        return NextResponse.json(
            { error: "Failed to fetch layout data" },
            { status: 500 }
        )
    }
}

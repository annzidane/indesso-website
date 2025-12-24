import { NextResponse } from "next/server"
import type { VisitorFormPayload } from "@/lib/types/visitor-form"

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // basic server-side validation
    if (!body?.name || !body?.institution || !body?.date_of_visit || !body?.visit_time || !body?.number_of_visitors) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const payload: { data: VisitorFormPayload } = {
      data: {
        name: String(body.name),
        institution: String(body.institution),
        date_of_visit: String(body.date_of_visit),
        visit_time: String(body.visit_time),
        number_of_visitors: parseInt(String(body.number_of_visitors), 10) || 1,
      },
    }

    // Helper to POST to Strapi; accepts headers override
    const doPost = async (useAuth: boolean) => {
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (useAuth && STRAPI_API_TOKEN) headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`
      return fetch(`${STRAPI_URL}/api/visitor-forms`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })
    }

    let res = await doPost(Boolean(STRAPI_API_TOKEN))
    let text = await res.text()

    // If token was provided but returns 403 (token may be scoped without create permission),
    // retry once without Authorization header to allow public-role handling (if enabled).
    if (res.status === 403 && STRAPI_API_TOKEN) {
      console.warn("Strapi returned 403 with API token; retrying without Authorization header to use public role as fallback.")
      res = await doPost(false)
      text = await res.text()
    }

    let parsed: any = null
    try {
      parsed = JSON.parse(text)
    } catch {
      // leave parsed null
    }

    if (!res.ok) {
      const errorBody = parsed ?? text ?? `Strapi returned ${res.status}`
      // eslint-disable-next-line no-console
      console.error("Visitor-form forward failed:", { status: res.status, errorBody })
      // include Strapi response in Next.js logs to help debug 400 errors
      return NextResponse.json({ error: errorBody }, { status: res.status })
    }

    return NextResponse.json({ message: parsed?.message ?? "Submitted", data: parsed ?? null }, { status: 200 })
  } catch (err: any) {
    console.error("Visitor-form route error:", err)
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import type { ConnectionFormPayload } from "@/lib/types/connection-forms"

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // basic server-side validation
    if (!body?.name || !body?.company_name || !body?.email || !body?.inquiry_topics || !body?.your_notes) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const payload: { data: ConnectionFormPayload } = { data: {
      name: String(body.name),
      company_name: String(body.company_name),
      email: String(body.email),
      inquiry_topics: String(body.inquiry_topics),
      your_notes: String(body.your_notes),
      form_page: body.form_page ? String(body.form_page) : undefined,
    }}

    // Helper to POST to Strapi; accepts headers override
    const doPost = async (useAuth: boolean) => {
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (useAuth && STRAPI_API_TOKEN) headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`
      return fetch(`${STRAPI_URL}/api/connection-forms`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })
    }

    // First attempt: use STRAPI_API_TOKEN if available
    let res = await doPost(Boolean(STRAPI_API_TOKEN))
    let text = await res.text()

    // If token was provided but returns 403 (token may be scoped without create permission),
    // retry once without Authorization header to allow public-role handling (if enabled).
    if (res.status === 403 && STRAPI_API_TOKEN) {
      console.warn("Strapi returned 403 with API token; retrying without Authorization header to use public role as fallback.")
      res = await doPost(false)
      text = await res.text()
    }

    // Try to parse JSON body from Strapi
    let parsed: any = null
    try {
      parsed = JSON.parse(text)
    } catch {
      // leave parsed null
    }

    if (!res.ok) {
      // Return parsed error if available, otherwise string body
      const errorBody = parsed ?? text ?? `Strapi returned ${res.status}`
      console.error("Connection-forms forward failed:", { status: res.status, errorBody })
      return NextResponse.json({ error: errorBody }, { status: res.status })
    }

    // Success — return parsed JSON if available or a generic message
    return NextResponse.json({ message: parsed?.message ?? "Submitted", data: parsed ?? null }, { status: 200 })
  } catch (err: any) {
    console.error("Connection-forms route error:", err)
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 })
  }
}

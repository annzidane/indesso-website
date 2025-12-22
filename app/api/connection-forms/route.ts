import { NextResponse } from "next/server"
import type { ConnectionFormPayload } from "@/lib/types/connection-forms"
import nodemailer from "nodemailer"
import buildInquiryEmail from "@/lib/email/inquiry-template"

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // basic server-side validation
    if (!body?.name || !body?.company_name || !body?.email || !body?.inquiry_topics || !body?.your_notes) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const payload: { data: ConnectionFormPayload & { log?: any } } = { data: {
      name: String(body.name),
      company_name: String(body.company_name),
      email: String(body.email),
      inquiry_topics: String(body.inquiry_topics),
      your_notes: String(body.your_notes),
      form_page: body.form_page ? String(body.form_page) : undefined,
      // log will be appended below with email send status
    }}

    // Find destination_email for the selected topic (best-effort)
    let destinationEmail: string | null = null
    try {
      const headers: Record<string, string> = {}
      if (STRAPI_API_TOKEN) headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`
      const topicsRes = await fetch(`${STRAPI_URL}/api/topics?pagination[limit]=100`, { headers })
      if (topicsRes.ok) {
        const topicsJson = await topicsRes.json()
        const topicsArray = Array.isArray(topicsJson?.data) ? topicsJson.data : []
        // each item might be { id, attributes: { topic, slug, destination_email, ... } }
        const found = topicsArray.find((t: any) => {
          const attrs = t.attributes ?? {}
          const slug = attrs.slug ?? t.slug
          const name = attrs.topic ?? attrs.name ?? t.topic ?? t.name
          return String(slug) === String(payload.data.inquiry_topics) || String(name) === String(payload.data.inquiry_topics)
        })
        if (found) {
          destinationEmail = (found.attributes?.destination_email ?? found.destination_email ?? null)
        }
      }
    } catch (e) {
      console.warn('Failed to fetch topics for destination email lookup', e)
    }

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

    // Send email first (if we have a destinationEmail). Build a log entry object.
    const emailLog: any = {
      timestamp: new Date().toISOString(),
      to: destinationEmail,
      subject: null,
      success: false,
      info: null,
    }

    if (destinationEmail && SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: SMTP_PORT,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        })

        const { subject, html, text, attachments } = buildInquiryEmail(payload.data)

        const mailOptions = {
          from: `Indesso Website <no-reply@indesso.com>`,
          to: destinationEmail,
          replyTo: payload.data.email,
          subject,
          text,
          html,
          attachments: attachments.length > 0 ? attachments : undefined,
        }

        const info = await transporter.sendMail(mailOptions)
        emailLog.subject = mailOptions.subject
        emailLog.success = true
        // Keep only serializable, relevant fields
        emailLog.info = {
          messageId: info.messageId,
          accepted: info.accepted,
          rejected: info.rejected,
          response: info.response,
        }
      } catch (err: any) {
        emailLog.success = false
        emailLog.info = { message: err?.message ?? String(err) }
        console.error('Failed to send inquiry email:', err)
      }
    } else if (destinationEmail) {
      // Missing SMTP config
      emailLog.success = false
      emailLog.info = { message: 'SMTP configuration missing' }
      console.warn('SMTP configuration missing; cannot send email')
    } else {
      emailLog.success = false
      emailLog.info = { message: 'No destination email found for topic' }
      console.warn('No destination email found for selected topic; skipping email send')
    }

    // Attach log entry to payload.data.log (as array)
    payload.data.log = [emailLog]

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

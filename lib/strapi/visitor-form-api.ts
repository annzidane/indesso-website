import type { VisitorFormPayload } from "@/lib/types/visitor-form"

export async function submitVisitorForm(payload: VisitorFormPayload) {
  // normalize payload to match Strapi expectations
  const normalized = {
    name: String(payload.name ?? "").trim(),
    institution: String(payload.institution ?? "").trim(),
    date_of_visit: String(payload.date_of_visit ?? ""),
    // ensure time has seconds (Strapi time type expects HH:mm:ss)
    visit_time: ((): string => {
      const t = String(payload.visit_time ?? "").trim()
      if (!t) return ""
      // if already HH:mm:ss, return as-is; if HH:mm add :00
      if (/^\d{2}:\d{2}:\d{2}$/.test(t)) return t
      if (/^\d{1,2}:\d{2}$/.test(t)) {
        const parts = t.split(":").map((p) => p.padStart(2, "0"))
        return `${parts[0]}:${parts[1]}:00`
      }
      return t
    })(),
    number_of_visitors: Number.isFinite(Number(payload.number_of_visitors)) ? parseInt(String(payload.number_of_visitors), 10) : 1,
  }

  // send normalized payload to our Next.js API route
  const res = await fetch("/api/visitor-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalized),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => null)
    const err: any = new Error(text || `Request failed with status ${res.status}`)
    err.status = res.status
    throw err
  }

  try {
    return await res.json()
  } catch {
    return null
  }
}

export default submitVisitorForm

import type { ConnectionFormPayload } from "@/lib/types/connection-forms"

export async function submitConnectionForm(payload: ConnectionFormPayload) {
  const res = await fetch("/api/connection-forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => null)
    const err: any = new Error(text || `Request failed with status ${res.status}`)
    err.status = res.status
    throw err
  }

  // Try to parse JSON, but tolerate empty responses
  try {
    return await res.json()
  } catch {
    return null
  }
}

export default submitConnectionForm

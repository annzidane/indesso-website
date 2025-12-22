import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status });
}

function onlyDigits(v: string) {
  return (v || "").replace(/\D/g, "");
}

export async function POST(req: Request) {
  try {
    if (!STRAPI_API_TOKEN) {
      return jsonError("Missing STRAPI_API_TOKEN env", 500);
    }

    const formData = await req.formData();

    // ====== Ambil field dari form ======
    // Catatan: saya tetap support key lama kamu (yourName, phoneNumber) biar tidak breaking.
    const name = (formData.get("name") ?? formData.get("yourName") ?? "").toString().trim();
    const email = (formData.get("email") ?? "").toString().trim();

    const countryCode = (formData.get("countryCode") ?? "").toString().trim();
    const phoneNumber = (formData.get("phone_number") ?? formData.get("phoneNumber") ?? "").toString().trim();

    const address = (formData.get("address") ?? "").toString().trim();
    const position = (formData.get("position") ?? "").toString().trim();

    const cv = formData.get("cv") as File | null;

    // ====== Validasi required (sesuai schema) ======
    if (!name || !email || !phoneNumber || !address || !position || !cv) {
      return jsonError("Missing required fields: name, email, phone_number, address, position, cv", 400);
    }

    // ====== Validasi panjang karakter (sesuai schema) ======
    if (name.length > 100) return jsonError("name maxLength is 100", 400);
    if (email.length > 50) return jsonError("email maxLength is 50", 400);
    if (address.length > 250) return jsonError("address maxLength is 250", 400);

    // ====== Normalisasi phone_number (10-15 digit) ======
    const ccDigits = onlyDigits(countryCode);
    const pnDigits = onlyDigits(phoneNumber);
    let normalizedPhone = (ccDigits ? `${ccDigits}${pnDigits}` : pnDigits).slice(0, 15);

    if (normalizedPhone.length < 10) {
      return jsonError("phone_number minLength is 10 digits", 400);
    }

    // ====== 1) Upload CV ke Strapi Upload ======
    // Strapi upload expects key: "files"
    const uploadForm = new FormData();
    uploadForm.append("files", cv, (cv as any)?.name || "cv");

    const uploadResp = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: uploadForm as any,
    });

    if (!uploadResp.ok) {
      const txt = await uploadResp.text().catch(() => "No response body");
      return jsonError("Failed to upload CV to Strapi", uploadResp.status, txt);
    }

    const uploaded = await uploadResp.json().catch(() => null);

    // Strapi biasanya balikin array file: [{ id, ... }]
    const mediaId: number | null =
      uploaded?.[0]?.id ??
      uploaded?.data?.[0]?.id ??
      uploaded?.data?.id ??
      null;

    if (!mediaId) {
      return jsonError("Upload succeeded but mediaId not found in Strapi response", 500, uploaded);
    }

    // ====== 2) Create applicant entry ======
    const payload = {
      data: {
        name,
        email,
        phone_number: normalizedPhone,
        address,
        position,
        cv: mediaId, // relasi media (single)
      },
    };

    const createResp = await fetch(`${STRAPI_URL}/api/applicants?populate=*`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!createResp.ok) {
      const txt = await createResp.text().catch(() => "No response body");
      return jsonError("Failed to create applicant in Strapi", createResp.status, txt);
    }

    const created = await createResp.json();
    return NextResponse.json(created, { status: 200 });
  } catch (err: any) {
    return jsonError(err?.message || "Server error", 500);
  }
}

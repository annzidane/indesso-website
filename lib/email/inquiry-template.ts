// Email template builder for inquiry emails
import fs from "fs"
import path from "path"

function escapeHtml(input: any) {
  if (input === null || input === undefined) return ''
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildInquiryEmail(data: any) {
  const logoLocalPath = path.join(process.cwd(), 'public', 'logo-indesso.png')
  const attachments: any[] = []
  let logoCid: string | null = null
  if (fs.existsSync(logoLocalPath)) {
    logoCid = 'logo_indesso'
    attachments.push({ filename: 'logo-indesso.png', path: logoLocalPath, cid: logoCid })
  }

  const displayTopic = data.inquiry_topics_label ?? data.inquiry_topics
  const subject = `New inquiry: ${displayTopic}`

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f3f5f7; padding:32px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e6e9eb;">
        <div style="padding:24px 24px 0 24px; text-align:center; background:linear-gradient(90deg,#00548B 0%, rgba(0,84,139,0.9) 100%); color:#fff;">
          ${logoCid ? `<img src="cid:${logoCid}" alt="Indesso" style="height:48px;object-fit:contain;display:block;margin:0 auto 12px;"/>` : `<h1 style="margin:0;font-size:20px">Indesso</h1>`}
          <div style="font-size:14px;opacity:0.95; padding-bottom: 10px;">New inquiry received</div>
        </div>
        <div style="padding:24px;color:#102027;font-size:14px;line-height:1.5;">
          <p style="margin:0 0 12px">You have a new inquiry submitted via the website.</p>
          <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:8px;">
            <tr><td style="padding:6px 0;font-weight:600;width:160px;color:#333">Name</td><td style="padding:6px 0">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;color:#333">Company</td><td style="padding:6px 0">${escapeHtml(data.company_name ?? '-')}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;color:#333">Email</td><td style="padding:6px 0">${escapeHtml(data.email)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;color:#333">Topic</td><td style="padding:6px 0">${escapeHtml(displayTopic)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;color:#333">Form page</td><td style="padding:6px 0">${escapeHtml(data.form_page ?? '-')}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eef2f4;margin:16px 0" />
          <div style="white-space:pre-wrap;color:#334">${escapeHtml(data.your_notes)}</div>
          <p style="margin-top:20px;color:#657579;font-size:12px">This message was sent automatically from your website.</p>
        </div>
      </div>
    </div>
  `

  const text = `You have a new inquiry from ${data.name} (${data.email})\n\nCompany: ${data.company_name}\nTopic: ${displayTopic}\n\nNotes:\n${data.your_notes}\n\nForm page: ${data.form_page || '-'} `

  return { subject, html, text, attachments }
}

export default buildInquiryEmail

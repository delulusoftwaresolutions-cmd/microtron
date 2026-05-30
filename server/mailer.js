import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

const serverDir = path.dirname(fileURLToPath(import.meta.url))
const logoPath = path.resolve(serverDir, '..', 'src', 'assets', 'microtron-logo.png')
const logoExists = fs.existsSync(logoPath)

function getEnv(name, fallback = '') {
  return String(globalThis['process']?.env?.[name] || fallback).trim()
}

function getBooleanEnv(name, fallback = false) {
  const value = getEnv(name)
  if (!value) return fallback
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
}

function createTransporter() {
  const host = getEnv('SMTP_HOST')
  const user = getEnv('SMTP_USER')
  const pass = getEnv('SMTP_PASS')

  if (!host || !user || !pass) return null

  return nodemailer.createTransport({
    host,
    port: Number(getEnv('SMTP_PORT', '587')),
    secure: getBooleanEnv('SMTP_SECURE', false),
    auth: {
      user,
      pass,
    },
  })
}

const transporter = createTransporter()
const companyName = getEnv('COMPANY_NAME', 'Microtron')
const mailFrom = getEnv('MAIL_FROM', `Microtron <sales@microtron.co.in>`)
const ownerMailTo = getEnv('MAIL_TO', 'sales@microtron.co.in')
const supportReplyTo = getEnv('MAIL_REPLY_TO', ownerMailTo)

function formatDisplayValue(value, fallback = '-') {
  const text = value === null || value === undefined ? '' : String(value).trim()
  return text || fallback
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildRows(items) {
  return items
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #d8e3ef;color:#5b728d;width:210px;font-weight:700;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #d8e3ef;color:#1c3147;white-space:pre-line;word-break:break-word;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join('')
}

function buildSection(title, items) {
  const rows = buildRows(items)
  if (!rows) return ''

  return `
    <div style="margin-top:22px;">
      <div style="font-size:13px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#0d6b3a;margin-bottom:10px;">${escapeHtml(title)}</div>
      <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;border:1px solid #d8e3ef;border-radius:10px;overflow:hidden;">
        ${rows}
      </table>
    </div>
  `
}

function buildAttachment() {
  if (!logoExists) return []

  return [
    {
      filename: 'microtron-logo.png',
      path: logoPath,
      cid: 'microtron-logo',
    },
  ]
}

function buildTemplate({ title, subtitle, intro, sections, footerNote, accent = '#0d6b3a' }) {
  const sectionHtml = sections.filter(Boolean).join('')
  return `
    <div style="margin:0;padding:0;background:#eef5f0;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:760px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #d8e3ef;border-radius:16px;overflow:hidden;">
          <div style="padding:28px 28px 20px;text-align:center;background:linear-gradient(180deg,#ffffff 0%,#f6faf7 100%);">
            ${logoExists ? '<img src="cid:microtron-logo" alt="Microtron" style="display:block;margin:0 auto 16px;max-width:220px;width:100%;height:auto;" />' : ''}
            <div style="margin-bottom:8px;color:#0d6b3a;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(companyName)}</div>
            <div style="display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(13,107,58,0.1);color:${accent};font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;">${escapeHtml(title)}</div>
            <h1 style="margin:16px 0 10px;font-size:28px;line-height:1.2;color:#13283f;">${escapeHtml(subtitle)}</h1>
            <p style="margin:0;color:#4f6780;font-size:15px;line-height:1.7;">${escapeHtml(intro)}</p>
          </div>
          <div style="padding:0 28px 28px;">
            ${sectionHtml}
            ${footerNote ? `<div style="margin-top:22px;padding:14px 16px;background:#f4f8fb;border:1px solid #d8e3ef;border-radius:10px;color:#51667d;font-size:13px;line-height:1.6;">${escapeHtml(footerNote)}</div>` : ''}
          </div>
        </div>
      </div>
    </div>
  `
}

function buildQuoteEmailTemplates(quote) {
  const reference = formatDisplayValue(quote?.id)
  const customerName = formatDisplayValue(quote?.contact?.name, 'Customer')
  const company = formatDisplayValue(quote?.contact?.company, 'No company provided')
  const email = formatDisplayValue(quote?.contact?.email)
  const subject = formatDisplayValue(quote?.contact?.company || quote?.contact?.name || 'PCB Project', 'PCB Project')
  const size = `${formatDisplayValue(quote?.pcb?.width)} x ${formatDisplayValue(quote?.pcb?.height)} mm`
  const fileNames = Array.isArray(quote?.gerber?.files) && quote.gerber.files.length > 0
    ? quote.gerber.files.map((file) => `${formatDisplayValue(file?.name)}${file?.size ? ` (${Math.round(Number(file.size) / 1024)} KB)` : ''}`).join(', ')
    : ''

  const ownerHtml = buildTemplate({
    title: 'New Quote Request',
    subtitle: `Quote request received from ${customerName}`,
    intro: `A new PCB quote request has been submitted. Review the details below and reply to the customer using the dashboard or by email.`,
    sections: [
      buildSection('Contact Details', [
        ['Reference ID', reference],
        ['Company', company],
        ['Name', customerName],
        ['Email', email],
        ['Phone', quote?.contact?.phone],
        ['Country', quote?.contact?.country],
      ]),
      buildSection('PCB Details', [
        ['Layers', quote?.pcb?.layers],
        ['Board Size', size],
        ['Quantity', quote?.pcb?.qty],
        ['Thickness', quote?.pcb?.thickness],
        ['Surface Finish', quote?.pcb?.surface],
        ['Solder Mask', quote?.pcb?.soldermask],
        ['Silkscreen', quote?.pcb?.silkscreen],
      ]),
      buildSection('Assembly', [
        ['Required', quote?.assembly?.assembly ? 'Yes' : 'No'],
        ['Assembly Type', quote?.assembly?.assemblyType],
        ['Component Supply', quote?.assembly?.supply],
        ['Unique Components', quote?.assembly?.uniqueComps],
        ['Special Requirements', quote?.assembly?.specialReq],
      ]),
      buildSection('Files & Notes', [
        ['Gerber Files', fileNames || 'No files uploaded'],
        ['Additional Notes', quote?.gerber?.notes],
      ]),
    ],
    footerNote: `Reply-to is set to the customer's email address so your team can respond directly to this request.`,
  })

  const userHtml = buildTemplate({
    title: 'Quote Submitted',
    subtitle: 'We have received your request',
    intro: `Hello ${customerName}, your quote request for ${subject} has been submitted successfully. Our team will review it and get back to you shortly.`,
    sections: [
      buildSection('Reference', [
        ['Reference ID', reference],
        ['Submitted For', subject],
        ['Submitted At', quote?.createdAt],
      ]),
      buildSection('Summary', [
        ['Board Size', size],
        ['Layers', quote?.pcb?.layers],
        ['Quantity', quote?.pcb?.qty],
        ['Assembly Required', quote?.assembly?.assembly ? 'Yes' : 'No'],
      ]),
    ],
    footerNote: 'If you need to add more details, just reply to this email and our team will pick it up.',
    accent: '#0a7b4a',
  })

  return {
    owner: {
      to: ownerMailTo,
      from: mailFrom,
      replyTo: email || supportReplyTo,
      subject: `New Quote Request - ${reference}`,
      html: ownerHtml,
      text: [
        'New quote request received',
        `Reference ID: ${reference}`,
        `Company: ${company}`,
        `Name: ${customerName}`,
        `Email: ${email}`,
        `Phone: ${quote?.contact?.phone || '-'}`,
        `Country: ${quote?.contact?.country || '-'}`,
        `Board Size: ${size}`,
        `Layers: ${quote?.pcb?.layers || '-'}`,
        `Quantity: ${quote?.pcb?.qty || '-'}`,
        `Thickness: ${quote?.pcb?.thickness || '-'}`,
        `Surface Finish: ${quote?.pcb?.surface || '-'}`,
        `Assembly: ${quote?.assembly?.assembly ? 'Yes' : 'No'}`,
        `Gerber Files: ${fileNames || 'No files uploaded'}`,
        `Notes: ${quote?.gerber?.notes || '-'}`,
      ].join('\n'),
      attachments: buildAttachment(),
    },
    user: email
      ? {
          to: email,
          from: mailFrom,
          replyTo: supportReplyTo,
          subject: `Quote Request Submitted - ${reference}`,
          html: userHtml,
          text: [
            'Quote request submitted successfully.',
            `Reference ID: ${reference}`,
            `Project: ${subject}`,
            `Board Size: ${size}`,
            `Layers: ${quote?.pcb?.layers || '-'}`,
            `Quantity: ${quote?.pcb?.qty || '-'}`,
            `Assembly: ${quote?.assembly?.assembly ? 'Yes' : 'No'}`,
            'Our team will review your request and respond shortly.',
          ].join('\n'),
          attachments: buildAttachment(),
        }
      : null,
  }
}

function buildEnquiryEmailTemplates(enquiry) {
  const reference = formatDisplayValue(enquiry?.id)
  const customerName = formatDisplayValue(enquiry?.contactName || enquiry?.name, 'Customer')
  const company = formatDisplayValue(enquiry?.company, 'No company provided')
  const email = formatDisplayValue(enquiry?.email)

  const ownerHtml = buildTemplate({
    title: 'New Contact Message',
    subtitle: `Message received from ${customerName}`,
    intro: 'A new contact form submission has been received. The details are below.',
    sections: [
      buildSection('Contact Details', [
        ['Reference ID', reference],
        ['Company', company],
        ['Name', customerName],
        ['Email', email],
        ['Phone', enquiry?.phone],
        ['Subject', enquiry?.subject],
      ]),
      buildSection('Message', [
        ['Message', enquiry?.message],
      ]),
    ],
    footerNote: `Reply-to is set to the sender's email address for a direct response.`,
  })

  const userHtml = buildTemplate({
    title: 'Message Submitted',
    subtitle: 'We received your message',
    intro: `Hello ${customerName}, your message has been submitted successfully. Our team will review it and get back to you soon.`,
    sections: [
      buildSection('Reference', [
        ['Reference ID', reference],
        ['Subject', enquiry?.subject],
        ['Submitted At', enquiry?.createdAt],
      ]),
    ],
    footerNote: 'If you want to add more context, simply reply to this email.',
    accent: '#0a7b4a',
  })

  return {
    owner: {
      to: ownerMailTo,
      from: mailFrom,
      replyTo: email || supportReplyTo,
      subject: `New Contact Message - ${reference}`,
      html: ownerHtml,
      text: [
        'New contact message received',
        `Reference ID: ${reference}`,
        `Company: ${company}`,
        `Name: ${customerName}`,
        `Email: ${email}`,
        `Phone: ${enquiry?.phone || '-'}`,
        `Subject: ${enquiry?.subject || '-'}`,
        `Message: ${enquiry?.message || '-'}`,
      ].join('\n'),
      attachments: buildAttachment(),
    },
    user: email
      ? {
          to: email,
          from: mailFrom,
          replyTo: supportReplyTo,
          subject: `Message Received - ${reference}`,
          html: userHtml,
          text: [
            'Your message has been received successfully.',
            `Reference ID: ${reference}`,
            `Subject: ${enquiry?.subject || '-'}`,
            'Our team will review it and respond shortly.',
          ].join('\n'),
          attachments: buildAttachment(),
        }
      : null,
  }
}

async function safeSend(mailOptions) {
  if (!transporter) {
    return { skipped: true, reason: 'SMTP is not configured.' }
  }

  await transporter.sendMail(mailOptions)
  return { skipped: false }
}

export async function sendQuoteSubmissionEmails(quote) {
  const templates = buildQuoteEmailTemplates(quote)
  const deliveries = await Promise.allSettled([
    safeSend(templates.owner),
    templates.user ? safeSend(templates.user) : Promise.resolve({ skipped: true, reason: 'Customer email unavailable.' }),
  ])

  return {
    owner: deliveries[0].status === 'fulfilled' ? deliveries[0].value : { skipped: false, error: deliveries[0].reason?.message || 'Owner email failed.' },
    user: deliveries[1].status === 'fulfilled' ? deliveries[1].value : { skipped: false, error: deliveries[1].reason?.message || 'User email failed.' },
  }
}

export async function sendEnquirySubmissionEmails(enquiry) {
  const templates = buildEnquiryEmailTemplates(enquiry)
  const deliveries = await Promise.allSettled([
    safeSend(templates.owner),
    templates.user ? safeSend(templates.user) : Promise.resolve({ skipped: true, reason: 'Customer email unavailable.' }),
  ])

  return {
    owner: deliveries[0].status === 'fulfilled' ? deliveries[0].value : { skipped: false, error: deliveries[0].reason?.message || 'Owner email failed.' },
    user: deliveries[1].status === 'fulfilled' ? deliveries[1].value : { skipped: false, error: deliveries[1].reason?.message || 'User email failed.' },
  }
}

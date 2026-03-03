import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactRequestBody {
  name: string
  email: string
  message: string
}

function isValidContactBody(body: unknown): body is ContactRequestBody {
  if (typeof body !== 'object' || body === null) return false
  const obj = body as Record<string, unknown>
  return (
    typeof obj.name === 'string' &&
    obj.name.trim().length > 0 &&
    typeof obj.email === 'string' &&
    obj.email.trim().length > 0 &&
    typeof obj.message === 'string' &&
    obj.message.trim().length > 0
  )
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()

    if (!isValidContactBody(body)) {
      return NextResponse.json(
        { error: 'Please fill in all fields: name, email, and message.' },
        { status: 400 }
      )
    }

    const { name, email, message } = body

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      )
    }

    const resend = new Resend(resendApiKey)

    const { error } = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      subject: `Dope Kicks Contact: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111; border-bottom: 2px solid #7c3aed; padding-bottom: 8px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 100px;">Name:</td>
              <td style="padding: 8px 12px; color: #111;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 12px; color: #111;">
                <a href="mailto:${escapeHtml(email)}" style="color: #7c3aed;">${escapeHtml(email)}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f9fafb; border-radius: 8px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #555;">Message:</p>
            <p style="margin: 0; color: #111; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Sent from the Dope Kicks contact form
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
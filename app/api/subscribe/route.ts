import { store } from '@/lib/store'

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}))
  const clean = String(email ?? '').trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return Response.json({ ok: false, message: 'Please enter a valid email address.' }, { status: 400 })

  const apiKey = process.env.NEWSLETTER_API_KEY
  // TODO: get a key from Mailchimp, ConvertKit or Resend (audiences), then add `clean` to your list here.
  if (apiKey) {
    // Real provider call goes here.
  }
  // Demo mode / local fallback: keep the address in the mock data layer.
  if (!store.subscribers.includes(clean)) store.subscribers.push(clean)
  return Response.json({ ok: true })
}

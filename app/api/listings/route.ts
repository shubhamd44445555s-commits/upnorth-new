import { store, type Submission } from '@/lib/store'

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}))
  const s = (k: string) => String(b?.[k] ?? '').trim().slice(0, 2000)
  if (!s('name') || !s('town') || s('description').length < 10) {
    return Response.json({ ok: false, message: 'Name, town and a short description are required.' }, { status: 400 })
  }
  const entry: Submission = {
    id: `sub_${Date.now()}`, status: 'pending review', createdAt: new Date().toISOString(),
    name: s('name'), category: s('category'), subtype: s('subtype'), town: s('town'), address: s('address'),
    phone: s('phone'), website: s('website'), description: s('description'), tier: s('tier') || 'free', claim: s('claim') || undefined,
  }
  // TODO: replace with a Supabase insert, e.g. supabase.from('submissions').insert(entry)
  store.submissions.push(entry)

  const emailKey = process.env.EMAIL_API_KEY
  // TODO: get a key from resend.com or sendgrid.com, then email hello@upnorth.org about this new submission.
  if (emailKey) {
    // Real notification email goes here.
  }
  return Response.json({ ok: true, id: entry.id })
}

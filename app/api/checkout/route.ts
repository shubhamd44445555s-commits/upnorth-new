const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const priceIds: Record<string, string | undefined> = { enhanced: process.env.STRIPE_PRICE_ENHANCED, featured: process.env.STRIPE_PRICE_FEATURED }
// TODO before launch: create real Products/Prices in dashboard.stripe.com, paste the price IDs above,
// and replace the mock checkout below with a real stripe.checkout.sessions.create() call.

export async function POST(req: Request) {
  const { tier } = await req.json().catch(() => ({}))
  if (tier !== 'enhanced' && tier !== 'featured') return Response.json({ demo: true })
  const key = process.env.STRIPE_SECRET_KEY ?? stripeSecretKey
  const price = priceIds[tier] ?? process.env[`STRIPE_PRICE_${tier.toUpperCase()}`]
  if (!key || !price) return Response.json({ demo: true }) // Demo mode: the UI shows the friendly "almost ready" modal.
  try {
    const origin = new URL(req.url).origin
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ mode: 'subscription', 'line_items[0][price]': price, 'line_items[0][quantity]': '1', success_url: `${origin}/list-your-business?paid=${tier}`, cancel_url: `${origin}/pricing` }),
    })
    const s = await r.json()
    if (s?.url) return Response.json({ url: s.url })
  } catch {}
  return Response.json({ demo: true })
}

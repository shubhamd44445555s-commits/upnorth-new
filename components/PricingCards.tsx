'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { tiers, CONTACT_EMAIL, type TierId } from '@/config/pricing'

const look: Record<TierId, { card: string; btn: string }> = {
  free: { card: 'border border-mist-200 bg-white/60', btn: 'bg-pine-900 text-birch-100' },
  enhanced: { card: 'bg-lake-700 text-birch-100', btn: 'bg-birch-100 text-ink-900' },
  featured: { card: 'bg-pine-900 text-birch-100', btn: 'bg-amber-500 text-ink-900' },
}

export default function PricingCards() {
  const [busy, setBusy] = useState<TierId | null>(null)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (!modal) return
    const f = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(false) }
    window.addEventListener('keydown', f)
    return () => window.removeEventListener('keydown', f)
  }, [modal])

  async function start(tier: TierId) {
    setBusy(tier)
    try {
      const r = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tier }) })
      const j = await r.json()
      if (j.url) { window.location.assign(j.url); return }
    } catch {}
    setBusy(null)
    setModal(true)
  }

  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.id} className={`flex flex-col p-6 ${look[t.id].card}`}>
            {t.id === 'featured' && <span className="mb-3 self-start bg-amber-500 px-2.5 py-0.5 text-sm font-semibold text-ink-900">Most visible</span>}
            <h2 className="text-h3 font-semibold">{t.name}</h2>
            <p className="mt-2"><span className="font-display text-4xl font-semibold">{t.price}</span> /mo</p>
            <p className="mt-2 text-sm">{t.blurb}</p>
            <ul className="mt-5 flex-1 space-y-2 text-sm">
              {t.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="mt-0.5 shrink-0" />{f}</li>)}
            </ul>
            {t.id === 'free' ? (
              <Link href="/list-your-business?tier=free" className={`mt-6 block rounded-full py-3 text-center font-semibold ${look.free.btn}`}>Get Started</Link>
            ) : (
              <button disabled={busy === t.id} onClick={() => start(t.id)} className={`mt-6 rounded-full py-3 font-semibold ${look[t.id].btn}`}>Get Started</button>
            )}
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-5" onClick={() => setModal(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="pay-title" onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-birch-100 p-6">
            <h2 id="pay-title" className="text-h3 font-semibold">Almost ready</h2>
            <p className="mt-3">Online payment setup is almost ready — contact us to get listed today.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('List my business on UpNorth.org')}`} className="rounded-full bg-pine-900 px-5 py-3 font-semibold text-birch-100">Email us</a>
              <button autoFocus onClick={() => setModal(false)} className="rounded-full border border-mist-200 px-5 py-3 font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

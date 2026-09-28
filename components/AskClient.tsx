'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { ListingCard } from './ListingCard'
import { getListing, type Listing } from '@/data/listings'

const examples = ['Find me a lakefront cabin for 8 near Minocqua with a dock', 'Plan a 3-day fall weekend around Presque Isle', 'Where are the fish biting this week?']
type Result = { reply: string; picks: Listing[]; demo: boolean }

export default function AskClient({ initialQuery }: { initialQuery: string }) {
  const [q, setQ] = useState(initialQuery)
  const [busy, setBusy] = useState(false)
  const [res, setRes] = useState<Result | null>(null)

  async function ask(text: string) {
    const query = text.trim()
    if (!query) return
    setBusy(true)
    try {
      const r = await fetch('/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) })
      const j = await r.json()
      const picks = ((j.slugs ?? []) as string[]).map((s) => getListing(s)).filter((l): l is Listing => !!l)
      setRes({ reply: String(j.reply ?? ''), picks, demo: j.mode !== 'live' })
    } catch {
      setRes({ reply: 'I couldn’t reach the concierge just now. Try again in a moment, or browse the categories.', picks: [], demo: false })
    }
    setBusy(false)
  }
  useEffect(() => { if (initialQuery) ask(initialQuery) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); ask(q) }} className="flex items-center rounded-full border border-mist-200 bg-white/70 p-1.5 pl-5">
        <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Ask UpNorth" placeholder="Where to, what for, how many of you?" className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none" />
        <button disabled={busy} className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 font-semibold text-ink-900"><Search size={18} /> Ask</button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {examples.map((e) => <button key={e} onClick={() => { setQ(e); ask(e) }} className="rounded-full border border-mist-200 bg-white/60 px-4 py-2 text-left text-sm">{e}</button>)}
      </div>

      {busy && <p className="mt-8" aria-live="polite">Checking the lake reports…</p>}
      {res && !busy && (
        <div className="mt-8">
          <p className="max-w-prose border-l-4 border-amber-500 bg-white/60 p-5 text-lead">{res.reply}</p>
          {res.demo && <p className="mt-2 text-sm">Demo mode: picks are matched from the UpNorth.org listings.</p>}
          {res.picks.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{res.picks.map((l) => <ListingCard key={l.id} l={l} />)}</div>
          ) : (
            <p className="mt-6">Try the <Link href="/stay" className="text-lake-700 underline">Stay</Link>, <Link href="/eat-drink" className="text-lake-700 underline">Eat &amp; Drink</Link> or <Link href="/things-to-do" className="text-lake-700 underline">Things to Do</Link> pages.</p>
          )}
        </div>
      )}
    </div>
  )
}

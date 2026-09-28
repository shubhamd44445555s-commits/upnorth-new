'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X, ChevronDown } from 'lucide-react'
import { handleAskUpNorth } from '@/lib/actions'

const headerLinks = [
  ['Things To Do', '/things-to-do'],
  ['Places to Stay', '/stay'],
  ['Eat & Drink', '/eat-drink'],
  ['Towns', '/explore'],
  ['Events', '/events'],
  ['Guides', '/explore'],
  ['Real Estate', '/real-estate'],
] as const

export default function Header() {
  const [drawer, setDrawer] = useState(false)
  const [ask, setAsk] = useState(false)
  const [q, setQ] = useState('')

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">▲▲</span>
          <span className="brand-copy"><strong>UpNorth<span>.org</span></strong><small>EXPLORE · STAY · DO · BELONG</small></span>
        </Link>

        <nav aria-label="Main" className="site-nav">
          {headerLinks.map(([label, href]) => <Link key={href + label} href={href}>{label}</Link>)}
          <Link href="/pricing" className="more-link">More <ChevronDown size={13} /></Link>
        </nav>

        <div className="site-header-actions">
          <button aria-label="Open Ask UpNorth" onClick={() => setAsk(!ask)} className="header-search-button"><Search size={17} /></button>
          <Link href="/ask" className="plan-trip-button">Plan Your Trip</Link>
          <button aria-label="Open menu" onClick={() => setDrawer(true)} className="menu-button"><Menu size={21} /></button>
        </div>
      </div>

      {ask && (
        <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) handleAskUpNorth(q.trim()) }} className="site-ask-panel">
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} aria-label="Ask UpNorth" placeholder="Ask UpNorth: cabins, fish fry, fall color…" />
        </form>
      )}

      {drawer && (
        <div className="mobile-drawer-wrap">
          <div className="mobile-drawer-backdrop" onClick={() => setDrawer(false)} />
          <aside className="mobile-drawer">
            <button aria-label="Close menu" onClick={() => setDrawer(false)} className="drawer-close"><X /></button>
            {headerLinks.map(([label, href]) => <Link key={href + label} href={href} onClick={() => setDrawer(false)}>{label}</Link>)}
            <Link href="/pricing" onClick={() => setDrawer(false)}>More</Link>
            <Link href="/ask" onClick={() => setDrawer(false)} className="drawer-plan">Plan Your Trip</Link>
          </aside>
        </div>
      )}
    </header>
  )
}

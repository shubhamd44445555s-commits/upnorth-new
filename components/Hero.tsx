'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BedDouble, Utensils, Compass, CalendarDays, MapPin, Home } from 'lucide-react'
import Link from 'next/link'
import { handleAskUpNorth } from '@/lib/actions'
import { Photo } from './Photo'
import { HERO } from '@/data/photos'

const quickLinks = [
  ['Outdoors', '/things-to-do', Compass],
  ['Places to Stay', '/stay', BedDouble],
  ['Eat & Drink', '/eat-drink', Utensils],
  ['Events', '/events', CalendarDays],
  ['Towns', '/explore', MapPin],
  ['Real Estate', '/real-estate', Home],
] as const

export default function Hero() {
  const [q, setQ] = useState('')
  return (
    <section className="hero-section">
      <Photo src={HERO} alt="Sunrise over a still Northwoods lake ringed with white pine" className="hero-media" />
      <div className="hero-shade" />
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="hero-content"
      >
        <h1>Life&rsquo;s Better Up North.</h1>
        <p className="hero-subtitle">Lakes. Forests. Small Towns. Big Memories.</p>
        <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) handleAskUpNorth(q.trim()) }} className="hero-search">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search towns, lakes, activities, cabins, events..." aria-label="Search UpNorth" />
          <button><Search size={15} />Search</button>
        </form>
        <div className="hero-quick-links">
          {quickLinks.map(([label, href, Icon]) => <Link key={href} href={href}><span><Icon size={17} /></span>{label}</Link>)}
        </div>
        <p className="hero-script" aria-hidden="true">Explore<br />Unwind<br />Reconnect</p>
      </motion.div>
    </section>
  )
}

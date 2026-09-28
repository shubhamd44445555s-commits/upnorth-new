import Link from 'next/link'
import { Photo } from './Photo'
import { townPhotos } from '@/data/photos'

import type { Highlight } from '@/data/content'
import type { EventItem } from '@/data/events'
import { townName, type Town } from '@/data/towns'

export function EventCard({ e }: { e: EventItem }) {
  const d = new Date(`${e.date}T12:00:00Z`)
  return (
    <Link href={`/events?town=${e.town}`} className="group block w-full">
      <div className="relative">
        <Photo src={e.image} alt={e.title} className="h-40 w-full rounded-t-3xl" />
        <div className="absolute -bottom-6 left-3 bg-amber-500 px-3 py-1 text-center leading-tight text-ink-900">
          <span className="block text-xs font-semibold">{d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })}</span>
          <span className="block font-display text-2xl font-semibold">{d.getUTCDate()}</span>
        </div>
      </div>
      <h3 className="mt-9 text-lg font-semibold leading-snug group-hover:underline">{e.title}</h3>
      <p className="text-sm text-lake-700">{e.venue}, {townName(e.town)}</p>
    </Link>
  )
}

export function TownCard({ t }: { t: Town }) {
  return (
    <Link href={`/towns/${t.slug}`} className="group relative block h-72 overflow-hidden lg:h-96">
      <Photo src={townPhotos[t.slug]} alt={`${t.name}, Wisconsin`} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute bottom-0 p-4 text-birch-100">
        <h3 className="text-h3 font-semibold group-hover:underline">{t.name}</h3>
        <p className="text-sm">{t.tagline}</p>
      </div>
    </Link>
  )
}

const tones = {
  lake: 'bg-lake-700 text-birch-100',
  pine: 'bg-pine-900 text-birch-100',
  amber: 'bg-amber-500 text-ink-900',
  birch: 'border border-mist-200 bg-birch-100',
  photo: 'text-birch-100',
}

export function Tile({ h }: { h: Highlight }) {
  return (
    <Link href={h.href} className={`relative flex flex-col justify-end overflow-hidden p-4 ${tones[h.tone]} ${h.wide ? 'col-span-2' : ''} ${h.tall ? 'row-span-2' : ''}`}>
      {h.image && (
        <>
          <Photo src={h.image} alt="" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </>
      )}
      <div className="relative">
        <h3 className={`font-semibold ${h.tall ? 'text-h3' : 'text-xl'}`}>{h.title}</h3>
        <p className="mt-1 text-sm">{h.body}</p>
      </div>
    </Link>
  )
}

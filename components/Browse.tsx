'use client'
import { useMemo, useState } from 'react'
import FilterBar from './FilterBar'
import { ListingCard } from './ListingCard'
import { EventCard } from './Cards'
import { sortListings, type Listing } from '@/data/listings'
import type { EventItem } from '@/data/events'

const PAGE = 12

type Props = { listings?: Listing[]; events?: EventItem[]; types: [string, string, string][]; initialType: string; initialTown: string }

export default function Browse({ listings, events, types, initialType, initialTown }: Props) {
  const [type, setType] = useState(initialType)
  const [town, setTown] = useState(initialTown)
  const [shown, setShown] = useState(PAGE)

  const ls = useMemo(
    () => sortListings((listings ?? []).filter((l) => (!town || l.town === town) && (!type || l.subtype === type))),
    [listings, town, type],
  )
  const es = useMemo(() => {
    const now = Date.now()
    const span = (type === 'week' ? 7 : type === 'month' ? 30 : Infinity) * 864e5
    return (events ?? []).filter((e) => {
      const t = new Date(`${e.date}T23:59:59`).getTime()
      return (!town || e.town === town) && t >= now && t - now <= span
    })
  }, [events, town, type])
  const total = listings ? ls.length : es.length

  return (
    <>
      <FilterBar town={town} type={type} types={types} onTown={(v) => { setTown(v); setShown(PAGE) }} onType={(v) => { setType(v); setShown(PAGE) }} />
      <p className="mt-4 text-sm" aria-live="polite">{total} {total === 1 ? 'result' : 'results'}</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ls.slice(0, shown).map((l) => <ListingCard key={l.id} l={l} />)}
        {es.slice(0, shown).map((e) => <EventCard key={e.id} e={e} />)}
      </div>
      {total === 0 && <p className="mt-8 max-w-prose">Nothing matches those filters yet. Try another town or clear the filter.</p>}
      {total > shown && (
        <button onClick={() => setShown(shown + PAGE)} className="mt-8 rounded-full bg-pine-900 px-6 py-3 font-semibold text-birch-100">Load more</button>
      )}
    </>
  )
}

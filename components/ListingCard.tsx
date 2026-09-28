import Link from 'next/link'
import { Star } from 'lucide-react'
import { Photo } from './Photo'
import { ratingOf, type Listing } from '@/data/listings'
import { townName } from '@/data/towns'
import { subtypeLabel } from '@/data/site'

export function ListingCard({ l }: { l: Listing }) {
  return (
    <Link href={`/listing/${l.slug}`} className="group block h-full border border-mist-200 bg-white/60">
      <div className="relative">
        <Photo src={l.images[0]} alt={l.name} className="h-44 w-full" />
        {l.isFeatured ? (
          <span className="absolute left-3 top-3 bg-amber-500 px-2.5 py-0.5 text-sm font-semibold text-ink-900">Featured</span>
        ) : l.isEnhanced ? (
          <span className="absolute left-3 top-3 bg-birch-100 px-2 py-0.5 text-xs font-medium text-lake-700">Enhanced</span>
        ) : null}
      </div>
      <div className="p-4">
        <p className="text-sm text-lake-700">{subtypeLabel(l.subtype)} in {townName(l.town)}</p>
        <h3 className="mt-1 text-xl font-semibold group-hover:underline">{l.name}</h3>
        <p className="mt-2 flex items-center gap-1 text-sm">
          <Star size={14} className="fill-amber-500 text-amber-500" />{ratingOf(l)}
          {l.priceRange && <span className="ml-2">{l.priceRange}</span>}
        </p>
      </div>
    </Link>
  )
}

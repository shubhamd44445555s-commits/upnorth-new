import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Globe, Clock } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Gallery from '@/components/Gallery'
import MapPlaceholder from '@/components/MapPlaceholder'
import SectionHeader from '@/components/SectionHeader'
import { ListingCard } from '@/components/ListingCard'
import { listings, getListing, nearbyTo, ratingOf, type Listing } from '@/data/listings'
import { townName } from '@/data/towns'
import { nav, subtypeLabel, siteUrl } from '@/data/site'

export const dynamicParams = false
export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const l = getListing(slug)
  if (!l) return {}
  return pageMeta({ title: `${l.name} — ${subtypeLabel(l.subtype)} in ${townName(l.town)}, WI`, description: l.description, path: `/listing/${l.slug}`, image: l.images[0] })
}

const hours: Record<Listing['category'], string> = {
  stay: 'Check-in 3 pm, check-out 11 am',
  'eat-drink': 'Wed–Sun, 4–9 pm; fish fry on Fridays',
  'things-to-do': 'Daily, 8 am–5 pm (seasonal)',
  'real-estate': 'Mon–Fri, 9 am–5 pm; weekends by appointment',
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const l = getListing(slug)
  if (!l) notFound()
  const cat = nav.find((n) => n.href === `/${l.category}`)!
  const rows: [typeof MapPin, string, string?][] = [
    [MapPin, l.address!], [Phone, l.phone!, `tel:${l.phone}`], [Globe, 'Visit website', l.website], [Clock, hours[l.category]],
  ]

  // No aggregateRating: ratings here are mock values and must not be published as structured data.
  const ld = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', name: l.name, description: l.description,
    url: `${siteUrl}/listing/${l.slug}`, image: l.images.map((i) => `${siteUrl}${i}`), telephone: l.phone, priceRange: l.priceRange,
    address: { '@type': 'PostalAddress', streetAddress: l.address?.split(',')[0], addressLocality: townName(l.town), addressRegion: 'WI', addressCountry: 'US' },
  }
  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: cat.label, href: cat.href }, { label: l.name }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <Gallery images={l.images} alt={l.name} />
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <span className="bg-lake-700 px-3 py-0.5 text-birch-100">{subtypeLabel(l.subtype)}</span>
            <Link href={`/towns/${l.town}`} className="text-lake-700 underline">{townName(l.town)}</Link>
            <span>{ratingOf(l)} stars</span>
            {l.priceRange && <span className="font-medium">{l.priceRange}</span>}
          </div>
          <h1 className="mt-3 text-4xl font-semibold">{l.name}</h1>
          <p className="mt-4 max-w-prose text-lead">{l.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {l.tags.map((t) => <li key={t} className="rounded-full border border-mist-200 bg-white/60 px-3 py-1 text-sm">{t}</li>)}
          </ul>
        </div>

        <aside className="space-y-6 lg:self-start">
          <div className="border border-mist-200 bg-white/60 p-5">
            <ul className="space-y-3 text-sm">
              {rows.map(([Icon, text, href], i) => (
                <li key={i} className="flex gap-3">
                  <Icon size={18} className="mt-0.5 shrink-0 text-lake-700" />
                  {href ? <a href={href} className="text-lake-700 underline">{text}</a> : <span>{text}</span>}
                </li>
              ))}
            </ul>
            <Link href={`/list-your-business?claim=${l.slug}`} className="mt-5 block rounded-full bg-pine-900 py-3 text-center font-semibold text-birch-100">Claim this listing</Link>
          </div>
          <MapPlaceholder label={l.name} query={l.address} />
        </aside>
      </div>

      <section className="mt-16">
        <SectionHeader title={`Nearby listings in ${townName(l.town)}`} />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{nearbyTo(l).map((x) => <ListingCard key={x.id} l={x} />)}</div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Photo } from '@/components/Photo'
import { townPhotos } from '@/data/photos'

import Breadcrumbs from '@/components/Breadcrumbs'
import SectionHeader from '@/components/SectionHeader'
import MapPlaceholder from '@/components/MapPlaceholder'
import { ListingCard } from '@/components/ListingCard'
import { EventCard } from '@/components/Cards'
import { towns, townName } from '@/data/towns'
import { forTown } from '@/data/listings'
import { eventsFor } from '@/data/events'

export const dynamicParams = false
export function generateStaticParams() {
  return towns.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const t = towns.find((x) => x.slug === slug)
  if (!t) return {}
  return pageMeta({ absolute: true, title: `${t.name}, WI — Lodging, Dining & Things to Do | UpNorth.org`, description: `${t.tagline} Plan your stay in ${t.name}: cabins, supper clubs, fishing, trails and local events.`, path: `/towns/${t.slug}`, image: townPhotos[t.slug] })
}

const sections = [
  ['Where to Stay', 'stay', '/stay'],
  ['Where to Eat', 'eat-drink', '/eat-drink'],
  ['Things to Do', 'things-to-do', '/things-to-do'],
] as const

export default async function TownPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = towns.find((x) => x.slug === slug)
  if (!t) notFound()
  const facts: [string, string][] = [['Nearest lakes', t.lakes.join(', ')], ['Known for', t.knownFor], ['Nearest larger town', t.nearest], ['County', t.county]]

  return (
    <>
      <header className="relative flex min-h-[22rem] items-end pt-16 text-birch-100 sm:min-h-[26rem]">
        <Photo src={townPhotos[t.slug]} alt={`${t.name}, Wisconsin`} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-8">
          <h1 className="text-4xl font-semibold sm:text-display">{t.name}</h1>
          <p className="mt-1 max-w-prose text-lead">{t.tagline}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-14">
          <div>
            <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: 'Explore', href: '/explore' }, { label: t.name }]} />
            <h2 className="mt-8 text-h2 font-semibold">Welcome to {t.name}</h2>
            <p className="mt-3 max-w-prose text-lead">{t.intro}</p>
          </div>

          {sections.map(([title, cat, href]) => (
            <section key={cat}>
              <SectionHeader title={title} href={`${href}?town=${t.slug}`} />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">{forTown(cat, t.slug).map((l) => <ListingCard key={l.id} l={l} />)}</div>
            </section>
          ))}

          <section>
            <SectionHeader title="Upcoming Events" href={`/events?town=${t.slug}`} />
            <div className="mt-6 grid gap-5 sm:grid-cols-2">{eventsFor(t.slug).map((e) => <EventCard key={e.id} e={e} />)}</div>
          </section>

          <MapPlaceholder label={t.name} query={`${t.name}, WI`} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-mist-200 bg-white/60 p-5">
            <h2 className="text-h3 font-semibold">Quick facts</h2>
            <dl className="mt-4 space-y-4 text-sm">
              {facts.map(([k, v]) => (
                <div key={k}><dt className="font-semibold">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <section className="border-t border-mist-200">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <h2 className="text-h3 font-semibold">Nearby towns</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {t.nearby.map((s) => (
              <li key={s}><Link href={`/towns/${s}`} className="block rounded-full border border-mist-200 bg-white/60 px-4 py-2 font-medium text-lake-700 hover:underline">{townName(s)}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

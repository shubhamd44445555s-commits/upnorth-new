import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { notFound } from 'next/navigation'
import { Photo } from '@/components/Photo'
import { sectionPhotos } from '@/data/photos'

import Breadcrumbs from '@/components/Breadcrumbs'
import Browse from '@/components/Browse'
import { TownCard } from '@/components/Cards'
import { categories, nav } from '@/data/site'
import { towns } from '@/data/towns'
import { listings } from '@/data/listings'
import { events } from '@/data/events'

export const dynamicParams = false
export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }))
}

type Props = { params: Promise<{ category: string }>; searchParams: Promise<Record<string, string | undefined>> }

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const { category } = await params
  const item = nav.find((n) => n.href === `/${category}`)
  return item ? pageMeta({ title: `${item.label} in the Northwoods`, description: item.blurb, path: `/${category}`, image: sectionPhotos[category] }) : {}
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const sp = await searchParams
  const cfg = categories[category]
  const item = nav.find((n) => n.href === `/${category}`)
  if (!cfg || !item) notFound()

  const type = cfg.types.some(([v]) => v === sp.type) ? sp.type! : ''
  const town = towns.some((t) => t.slug === sp.town) ? sp.town! : ''

  return (
    <>
      <header className="relative flex min-h-[20rem] items-end pt-16 text-birch-100">
        <Photo src={sectionPhotos[category]} alt={item.label} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-8">
          <h1 className="text-4xl font-semibold sm:text-display">{item.label}</h1>
          <p className="mt-1 max-w-prose text-lead">{item.blurb}</p>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8">
        <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: item.label }]} />
        <div className="mt-6">
          {category === 'explore' ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{towns.map((t) => <TownCard key={t.slug} t={t} />)}</div>
          ) : (
            <Browse
              key={`${type}|${town}`}
              listings={category === 'events' ? undefined : listings.filter((l) => l.category === cfg.cat)}
              events={category === 'events' ? events : undefined}
              types={cfg.types}
              initialType={type}
              initialTown={town}
            />
          )}
        </div>
      </div>
    </>
  )
}

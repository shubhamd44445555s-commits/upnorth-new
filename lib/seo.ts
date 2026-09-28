import type { Metadata } from 'next'
import type { Listing } from '@/data/listings'
import { townName } from '@/data/towns'
import { OG_IMAGE } from '@/data/photos'

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://upnorth.org'

export function pageMeta({ title, description, path, image = OG_IMAGE, absolute = false }: { title: string; description: string; path: string; image?: string; absolute?: boolean }): Metadata {
  const full = absolute ? title : `${title} | UpNorth.org`
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, siteName: 'UpNorth.org', type: 'website', images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title: full, description, images: [image] },
  }
}

export function jsonLd(l: Listing) {
  const data = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    name: l.name, description: l.description, url: `${SITE}/listing/${l.slug}`,
    image: l.images.map((i) => `${SITE}${i}`), telephone: l.phone, priceRange: l.priceRange,
    address: { '@type': 'PostalAddress', streetAddress: (l.address ?? '').split(',')[0], addressLocality: townName(l.town).split(' / ')[0], addressRegion: 'WI', addressCountry: 'US' },
  }
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

import type { MetadataRoute } from 'next'
import { categories } from '@/data/site'
import { towns } from '@/data/towns'
import { listings } from '@/data/listings'
import { SITE } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...Object.keys(categories).map((c) => `/${c}`), '/pricing', '/ask', '/list-your-business', ...towns.map((t) => `/towns/${t.slug}`), ...listings.map((l) => `/listing/${l.slug}`)]
  return paths.map((p) => ({ url: `${SITE}${p}`, lastModified: new Date() }))
}

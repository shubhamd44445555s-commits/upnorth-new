import { listings, sortListings, type Listing } from '@/data/listings'
import { towns } from '@/data/towns'

const words: Record<Listing['category'], string[]> = {
  stay: ['stay', 'lodging', 'cabin', 'resort', 'hotel', 'motel', 'camp', 'room', 'sleep', 'dock', 'lakefront'],
  'eat-drink': ['eat', 'dinner', 'lunch', 'breakfast', 'food', 'restaurant', 'supper', 'fish fry', 'brewery', 'beer', 'bar', 'coffee', 'drink'],
  'things-to-do': ['fish', 'muskie', 'walleye', 'boat', 'paddle', 'kayak', 'canoe', 'atv', 'utv', 'snowmobile', 'sled', 'hike', 'golf', 'activit', 'things to do', 'bite'],
  'real-estate': ['buy', 'real estate', 'realtor', 'land', 'lot', 'for sale', 'agent'],
}

// Demo-mode concierge: keyword match against town, category, tags and text of the local listings.
export function mockAsk(query: string) {
  const q = query.toLowerCase()
  const town = towns.find((t) => [t.name, t.slug.replace(/-/g, ' '), ...t.name.split(' / ')].some((n) => q.includes(n.toLowerCase())))
  const hits = (Object.keys(words) as Listing['category'][]).filter((c) => words[c].some((w) => q.includes(w)))
  const terms = q.split(/[^a-z0-9']+/).filter((w) => w.length > 3)
  const score = (l: Listing) =>
    (town ? (l.town === town.slug ? 5 : town.nearby.includes(l.town) ? 2 : 0) : 0) +
    (hits.includes(l.category) ? 3 : 0) +
    l.tags.filter((t) => q.includes(t.toLowerCase())).length * 2 +
    terms.filter((w) => `${l.name} ${l.description} ${l.subtype}`.toLowerCase().includes(w)).length +
    (l.isFeatured ? 0.5 : l.isEnhanced ? 0.25 : 0)
  const ranked = sortListings(listings).sort((a, b) => score(b) - score(a))
  let picks = ranked.slice(0, 5)
  if (!hits.length) {
    // No clear category: one or two picks each from lodging, dining and activities.
    picks = (['stay', 'eat-drink', 'things-to-do'] as const).flatMap((c, i) => ranked.filter((l) => l.category === c).slice(0, i === 0 ? 2 : 1)).slice(0, 5)
  }
  const [a, b] = picks
  const reply = `${town ? `${town.name} is a great home base: ${town.tagline}` : 'Happy to help you plan a trip Up North.'} I'd start with ${a.name}${b ? ` and ${b.name}` : ''}. Tap any pick below for photos, details and contact info.`
  return { reply, slugs: picks.map((l) => l.slug) }
}

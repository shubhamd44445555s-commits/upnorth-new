export type NavItem = {
  label: string
  href: string
  icon: 'stay' | 'eat' | 'do' | 'events' | 'explore' | 'realestate'
  blurb: string
  links: [label: string, href: string][]
}
type Opt = [value: string, label: string, singular: string]

// Filter options per category page. Nav links below are generated from these.
export const categories: Record<string, { cat: string; types: Opt[] }> = {
  stay: { cat: 'stay', types: [['cabin', 'Cabins', 'Cabin'], ['resort', 'Resorts', 'Resort'], ['hotel', 'Hotels & Motels', 'Hotel'], ['bb', 'B&Bs', 'B&B'], ['campground', 'Campgrounds', 'Campground']] },
  'eat-drink': { cat: 'eat-drink', types: [['restaurant', 'Restaurants', 'Restaurant'], ['supper-club', 'Supper Clubs', 'Supper club'], ['bar', 'Bars', 'Bar'], ['brewery', 'Breweries', 'Brewery'], ['coffee', 'Coffee', 'Coffee shop']] },
  'things-to-do': { cat: 'things-to-do', types: [['fishing', 'Fishing', 'Fishing'], ['boating', 'Boating', 'Boating'], ['atv-utv', 'ATV / UTV', 'ATV / UTV'], ['snowmobiling', 'Snowmobiling', 'Snowmobiling'], ['hiking', 'Hiking', 'Hiking'], ['golf', 'Golf', 'Golf']] },
  events: { cat: 'events', types: [['week', 'This week', 'Event'], ['month', 'This month', 'Event']] },
  explore: { cat: 'explore', types: [] },
  'real-estate': { cat: 'real-estate', types: [['for-sale', 'For sale', 'For sale'], ['land', 'Land', 'Land'], ['agent', 'Agents', 'Agent']] },
}
export const subtypeLabel = (s: string) => Object.values(categories).flatMap((c) => c.types).find(([v]) => v === s)?.[2] ?? s
const q = (slug: string) => categories[slug].types.map(([v, l]) => [l, `/${slug}?type=${v}`] as [string, string])

export const nav: NavItem[] = [
  { label: 'Stay', href: '/stay', icon: 'stay', blurb: 'Knotty-pine cabins, family resorts and campsites where the loons wake you.', links: q('stay') },
  { label: 'Eat & Drink', href: '/eat-drink', icon: 'eat', blurb: 'Relish trays, brandy old fashioneds and a Friday fish fry in every town.', links: q('eat-drink') },
  { label: 'Things to Do', href: '/things-to-do', icon: 'do', blurb: 'Muskie on the weed edge, a quiet paddle, a groomed trail at dawn.', links: q('things-to-do') },
  { label: 'Events', href: '/events', icon: 'events', blurb: 'Fish boils, muskie tournaments, harvest markets and polka nights.', links: [['All Events', '/events'], ...q('events'), ['Submit an Event', '/list-your-business?type=event']] },
  { label: 'Explore', href: '/explore', icon: 'explore', blurb: 'Chains of lakes, county forests and the back roads between.', links: [['All Towns', '/explore'], ['Minocqua', '/towns/minocqua'], ['Eagle River', '/towns/eagle-river'], ['Boulder Junction', '/towns/boulder-junction']] },
  { label: 'Real Estate', href: '/real-estate', icon: 'realestate', blurb: 'Lake homes, weekend cabins and wooded lots for the long haul.', links: [['All Real Estate', '/real-estate'], ...q('real-estate')] },
]

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://upnorth.org'

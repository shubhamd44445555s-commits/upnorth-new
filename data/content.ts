// Mock content — swap these exports for Supabase queries later.
export type Highlight = { id: string; title: string; body: string; href: string; tone: 'lake' | 'pine' | 'amber' | 'birch' | 'photo'; image?: string; wide?: boolean; tall?: boolean }

export const highlights: Highlight[] = [
  { id: 'fishing', title: 'Fishing report', body: 'Walleye are stacking on mid-lake humps at dusk. Muskie hold on the weed edges, water in the mid-50s. Slow down your presentation.', href: '/things-to-do?type=fishing', tone: 'lake', wide: true, tall: true },
  { id: 'fall-color', title: 'Fall color and trail conditions', body: 'Maples near peak around Presque Isle; tamaracks turn gold next week. Hiking trails firm and dry.', href: '/explore', tone: 'photo', image: '/img/library/fall-hiker.jpg', wide: true },
  { id: 'event', title: 'Fall Color Paddle', body: 'Saturday, Eagle River', href: '/events?town=eagle-river', tone: 'amber' },
  { id: 'restaurant', title: 'Norway Pines Supper Club', body: 'Friday walleye fry', href: '/listing/norway-pines-supper-club', tone: 'birch' },
  { id: 'cabin', title: 'Loon Song, Cabin 4', body: 'Two bedrooms, dock and fire ring, open this weekend.', href: '/listing/loon-song-cabins', tone: 'photo', image: '/img/library/log-cabin.jpg', wide: true },
  { id: 'sleds', title: 'Snowmobile trails', body: 'Still closed. Clubs start brushing trails in October; grooming reports follow the first snow.', href: '/things-to-do?type=snowmobiling', tone: 'pine', wide: true },
]

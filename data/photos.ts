// Photo library: files live in public/img/library/. To add photos, drop them there and list them below.
const p = (n: string) => `/img/library/${n}.jpg`
export const OG_IMAGE = '/img/og.jpg' // brand image with the logo baked in; used for social sharing
export const HERO = p('lake-aerial-docks')

export const sectionPhotos: Record<string, string> = {
  stay: p('log-cabin'), 'eat-drink': p('lodge-interior'), 'things-to-do': p('fall-lake-rowing'),
  events: p('dogsled'), explore: p('lake-shore-park'), 'real-estate': p('house-craftsman'),
}
export const townPhotos: Record<string, string> = {
  minocqua: p('boathouses-canal'), 'eagle-river': p('snowmobile-sunset'), 'boulder-junction': p('boat-sunset'),
  'presque-isle': p('lake-shore-park'), 'manitowish-waters': p('fall-lake-rowing'), 'land-o-lakes': p('atv-trail'),
  rhinelander: p('house-craftsman'), mercer: p('forest-road'), 'hurley-ironwood': p('house-victorian'),
}
export const eventPhotos: Record<string, string> = {
  'fish-fry-polka': p('lodge-interior'), 'fall-color-paddle': p('fall-lake-rowing'), 'dark-sky-night': p('lake-shore-park'),
  'muskie-classic': p('boat-sunset'), 'harvest-market': p('pastry-coffee'), 'fall-bike-ride': p('fall-hiker'),
  'loon-bonfire': p('boathouses-canal'), 'sled-kickoff': p('snowmobile-sunset'), 'pasty-supper': p('lodge-interior'),
  'sled-swap': p('dogsled'), 'tree-lighting': p('house-craftsman'),
}
const pools: Record<string, string[]> = {
  cabin: ['log-cabin', 'lake-aerial-docks', 'boathouses-canal', 'forest-road'],
  resort: ['lake-aerial-docks', 'boathouses-canal', 'log-cabin', 'fall-lake-rowing'],
  hotel: ['house-craftsman', 'house-victorian', 'lake-shore-park'],
  bb: ['house-victorian', 'log-cabin', 'pastry-coffee', 'house-craftsman'],
  campground: ['forest-road', 'fall-hiker', 'lake-shore-park', 'log-cabin'],
  restaurant: ['lodge-interior', 'pastry-coffee', 'lake-aerial-docks'],
  'supper-club': ['lodge-interior', 'boathouses-canal', 'lake-aerial-docks', 'fall-lake-rowing'],
  bar: ['lodge-interior', 'boathouses-canal', 'lake-shore-park'],
  brewery: ['lodge-interior', 'boathouses-canal', 'lake-aerial-docks', 'log-cabin'],
  coffee: ['pastry-coffee', 'lodge-interior', 'house-craftsman'],
  fishing: ['boat-sunset', 'fall-lake-rowing', 'lake-aerial-docks', 'lake-shore-park'],
  boating: ['fall-lake-rowing', 'boat-sunset', 'lake-aerial-docks', 'boathouses-canal'],
  'atv-utv': ['utv-rally', 'atv-trail', 'forest-road', 'fall-hiker'],
  snowmobiling: ['snowmobile-sunset', 'dogsled'],
  hiking: ['fall-hiker', 'forest-road', 'fall-lake-rowing', 'lake-shore-park'],
  golf: ['golf-sunset', 'golf-aerial'],
  'for-sale': ['house-craftsman', 'house-victorian', 'log-cabin', 'waterfront-homes'],
  land: ['forest-road', 'lake-shore-park', 'fall-hiker', 'lake-aerial-docks'],
  agent: ['house-craftsman', 'house-victorian', 'waterfront-homes', 'log-cabin'],
}
export const listingPhotos = (subtype: string, i: number) => {
  const a = pools[subtype] ?? pools.cabin
  return Array.from({ length: Math.min(4, a.length) }, (_, k) => p(a[(i + k) % a.length]))
}

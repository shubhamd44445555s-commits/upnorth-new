import { towns } from './towns'
import { eventPhotos, HERO } from './photos'

export type EventItem = { id: string; title: string; date: string; venue: string; town: string; image: string }

const rows: [string, string, string, string, string][] = [
  ['fish-fry-polka', 'Friday Fish Fry & Polka Night', '2026-09-25', 'Norway Pines Supper Club', 'minocqua'],
  ['fall-color-paddle', 'Fall Color Paddle on the Chain', '2026-09-26', "Chain O'Lakes Landing", 'eagle-river'],
  ['dark-sky-night', 'Dark Sky Stargazing Night', '2026-09-30', 'Pine Point Beach', 'presque-isle'],
  ['muskie-classic', 'Muskie Fall Classic', '2026-10-03', 'Trout Lake Landing', 'boulder-junction'],
  ['harvest-market', 'Harvest Market on the Square', '2026-10-04', 'Downtown Square', 'rhinelander'],
  ['fall-bike-ride', 'Fall Color Bike Ride', '2026-10-11', 'Community Center', 'manitowish-waters'],
  ['loon-bonfire', 'Loon Festival Bonfire', '2026-10-10', 'Mercer Town Park', 'mercer'],
  ['sled-kickoff', 'Snowmobile Club Kickoff Dinner', '2026-10-17', 'Legion Hall', 'land-o-lakes'],
  ['pasty-supper', 'Pasty Supper & Polka', '2026-10-24', 'Silver Street Hall', 'hurley-ironwood'],
  ['sled-swap', 'Snowmobile Show & Swap', '2026-11-07', 'Expo Hall', 'eagle-river'],
  ['tree-lighting', 'Holiday Tree Lighting', '2026-11-27', 'Torpy Park', 'minocqua'],
]

export const events: EventItem[] = rows
  .map(([id, title, date, venue, town]) => ({ id, title, date, venue, town, image: eventPhotos[id] ?? HERO }))
  .sort((a, b) => a.date.localeCompare(b.date))

export const eventsFor = (slug: string, n = 4) => {
  const near = towns.find((t) => t.slug === slug)?.nearby ?? []
  const rank = (t: string) => (t === slug ? 0 : near.includes(t) ? 1 : 2)
  return [...events].sort((a, b) => rank(a.town) - rank(b.town) || a.date.localeCompare(b.date)).slice(0, n)
}

// Single source of truth for business tiers. Visitors are never charged.
export type TierId = 'free' | 'enhanced' | 'featured'
export type Tier = { id: TierId; name: string; price: string; blurb: string; features: string[] }

export const CONTACT_EMAIL = 'hello@upnorth.org'

export const tiers: Tier[] = [
  { id: 'free', name: 'Free', price: '$0', blurb: 'A basic listing so visitors can find you.', features: ['Business name, category and town', 'One photo', 'Short description'] },
  { id: 'enhanced', name: 'Enhanced', price: '$29–$49', blurb: 'Stand out inside your category.', features: ['Full photo gallery', 'Priority placement within your category', 'Contact and website links'] },
  { id: 'featured', name: 'Featured', price: '$99–$199', blurb: 'The most visibility we offer.', features: ['Everything in Enhanced', 'Homepage carousel', 'Top-of-category placement', '“Featured” badge'] },
]

// Mock data. Contact details and image paths are generated from the slug; replace with real records later.
import { towns, townName } from './towns'
import { listingPhotos } from './photos'

export type Listing = {
  id: string; slug: string; name: string; category: 'stay' | 'eat-drink' | 'things-to-do' | 'real-estate'
  subtype: string; town: string; priceRange?: string; tags: string[]
  description: string; images: string[]; isFeatured: boolean; isEnhanced: boolean
  phone?: string; website?: string; address?: string
}
type Row = [slug: string, name: string, cat: Listing['category'], subtype: string, town: string, price: string, tags: string, description: string, flag?: 'F' | 'E']

const rows: Row[] = [
  ['loon-song-cabins', 'Loon Song Cabins', 'stay', 'cabin', 'minocqua', '$$$', 'Dock|Waterfront|Fire Ring|Pet Friendly', 'Eight knotty-pine cabins on Lake Minocqua with private docks, fire rings and a shared cedar sauna.', 'F'],
  ['pine-point-cabins', 'Pine Point Cabins', 'stay', 'cabin', 'presque-isle', '$$', 'Dock|Waterfront|Kayaks|Dark Skies', 'Quiet lakefront cabins where the loons wake you and the Milky Way shows up by nine.', 'E'],
  ['birchwood-resort-on-the-chain', 'Birchwood Resort on the Chain', 'stay', 'resort', 'eagle-river', '$$$', 'Pontoon Rentals|Beach|Kids Activities|Waterfront', 'Family resort with pontoon rentals, a sandy swim beach and a lakeside bonfire every night.', 'F'],
  ['rest-lake-resort-marina', 'Rest Lake Resort & Marina', 'stay', 'resort', 'manitowish-waters', '$$', 'Marina|Boat Rental|Waterfront|Screened Porch', 'Old-school resort with a full marina, boat slips and a screened porch on every unit.', 'E'],
  ['hodag-country-inn', 'Hodag Country Inn', 'stay', 'hotel', 'rhinelander', '$$', 'Indoor Pool|Pet Friendly|Sled Parking', 'Downtown hotel with an indoor pool and heated trailer parking for snowmobilers.'],
  ['tamarack-house-bb', 'Tamarack House B&B', 'stay', 'bb', 'boulder-junction', '$$', 'Breakfast Included|Wood Stove|Quiet Hours', 'Three-room bed and breakfast in the pines with wild-blueberry pancakes and a wood-stove common room.'],
  ['flambeau-forest-campground', 'Flambeau Forest Campground', 'stay', 'campground', 'mercer', '$', 'Tent Sites|RV Hookups|Fire Rings|Lake Access', 'Wooded sites on the edge of the Turtle-Flambeau Flowage, steps from a canoe landing.'],
  ['cisco-chain-campground', 'Cisco Chain Campground', 'stay', 'campground', 'land-o-lakes', '$', 'Tent Sites|Boat Launch|Showers|Pet Friendly', 'Family campground on the Cisco Chain with a boat launch and hot showers.'],
  ['iron-range-motor-lodge', 'Iron Range Motor Lodge', 'stay', 'hotel', 'hurley-ironwood', '$', 'Sled Parking|Kitchenettes|Pet Friendly', 'Straightforward motel a block off Silver Street, with kitchenettes and trail-side parking.'],

  ['norway-pines-supper-club', 'Norway Pines Supper Club', 'eat-drink', 'supper-club', 'minocqua', '$$', 'Friday Fish Fry|Relish Tray|Old Fashioneds|Lake View', 'Relish tray, brandy old fashioned and a Friday walleye fry with a view of the lake.', 'F'],
  ['sandbar-supper-club', 'The Sandbar Supper Club', 'eat-drink', 'supper-club', 'manitowish-waters', '$$', 'Prime Rib|Patio|Live Music', 'Saturday prime rib, a lakeside patio and polka on summer weekends.', 'E'],
  ['northern-lights-tap-grill', 'Northern Lights Tap & Grill', 'eat-drink', 'bar', 'eagle-river', '$', 'Sled Parking|Live Music|Cheese Curds', 'Trailside bar with fresh curds, cold taps and a bonfire pit that stays lit all winter.'],
  ['nine-mile-brewing', 'Nine Mile Brewing Company', 'eat-drink', 'brewery', 'rhinelander', '$$', 'Taproom|Food Trucks|Growlers', 'Small-batch amber, stout and a seasonal cranberry ale in a converted downtown creamery.', 'E'],
  ['trout-lake-dining-room', 'Trout Lake Dining Room', 'eat-drink', 'restaurant', 'boulder-junction', '$$', 'Walleye|Reservations|Lake View', 'Wild-rice soup, pan-fried walleye and pie made that morning.'],
  ['loon-point-coffee', 'Loon Point Coffee & Bakery', 'eat-drink', 'coffee', 'presque-isle', '$', 'Espresso|Pastries|Wifi', 'Cardamom rolls, strong coffee and a wall of hand-drawn fishing maps.'],
  ['cisco-chain-taproom', 'Cisco Chain Taproom', 'eat-drink', 'brewery', 'land-o-lakes', '$', 'Deck|Sunset View|Small Batch', 'Small-batch amber ale and a deck that faces the sunset.'],
  ['loon-landing-cafe', 'Loon Landing Cafe', 'eat-drink', 'restaurant', 'mercer', '$$', 'Breakfast|Family Friendly|Dog-Friendly Patio', 'Big breakfasts for early paddlers and burgers named after local lakes.'],
  ['silver-street-supper-club', 'Silver Street Supper Club', 'eat-drink', 'supper-club', 'hurley-ironwood', '$$', 'Fish Fry|Steaks|Historic Building', 'Steaks, a Friday fish fry and pasties on the specials board in a Silver Street landmark.', 'F'],

  ['northern-reach-guide-service', 'Northern Reach Guide Service', 'things-to-do', 'fishing', 'boulder-junction', '$$$', 'Guided Trips|Muskie|Walleye|Gear Provided', 'Half-day muskie and walleye trips with a guide who knows every weed edge.', 'F'],
  ['chain-country-guides', 'Chain Country Guides', 'things-to-do', 'fishing', 'eagle-river', '$$', 'Guided Trips|Bass|Walleye|Kid Friendly', 'Walleye and smallmouth trips across the Eagle River Chain, licenses sorted for you.'],
  ['flambeau-outfitters', 'Turtle-Flambeau Outfitters', 'things-to-do', 'boating', 'mercer', '$', 'Canoe Rental|Kayak Rental|Shuttles', 'Canoe and kayak rentals with shuttles into the flowage.', 'E'],
  ['dark-sky-paddle-co', 'Dark Sky Paddle Co.', 'things-to-do', 'boating', 'presque-isle', '$$', 'Night Paddle|Guided|Stargazing', 'Evening paddles to a quiet bay for stargazing, with hot cocoa in the cooler.'],
  ['trail-country-utv', 'Trail Country UTV', 'things-to-do', 'atv-utv', 'land-o-lakes', '$$', 'UTV Rentals|Trail Maps|Helmets Provided', 'UTV rentals with maps to the county-forest routes and a picnic-lunch option.', 'E'],
  ['island-city-sled-rentals', 'Island City Sled Rentals', 'things-to-do', 'snowmobiling', 'minocqua', '$$', 'Rentals|Trail Passes|Helmets Provided', 'Late-model sleds, trail passes and a quick lesson before you head out.'],
  ['gogebic-range-snow-tours', 'Gogebic Range Snow Tours', 'things-to-do', 'snowmobiling', 'hurley-ironwood', '$$$', 'Guided Rides|Sleds Included|Gear Included', 'Guided rides along the Range ridgeline into the U.P., sleds and suits included.'],
  ['boardwalk-bog-hikes', 'Boardwalk & Bog Guided Hikes', 'things-to-do', 'hiking', 'manitowish-waters', '$', 'Guided Hikes|Birding|Family Friendly', 'Naturalist-led marsh and boardwalk hikes with loon and sandhill crane spotting.'],
  ['northwoods-pines-golf-club', 'Northwoods Pines Golf Club', 'things-to-do', 'golf', 'rhinelander', '$$', 'Public|Cart Rental|Driving Range', 'Rolling public course cut through red pine, with a friendly clubhouse grill.', 'E'],

  ['big-musky-lakefront-cabin', 'Lakefront Log Cabin on Big Muskellunge', 'real-estate', 'for-sale', 'boulder-junction', '$$$', 'Waterfront|Dock|Fireplace', 'Three-bedroom log cabin with 150 feet of sandy frontage and a boathouse.', 'F'],
  ['chain-lake-home-pontoon-lift', 'Chain Lake Home with Pontoon Lift', 'real-estate', 'for-sale', 'eagle-river', '$$$', 'Waterfront|Boat Lift|Sauna', 'Year-round lake home with a sauna, screened porch and covered pontoon lift.'],
  ['downtown-minocqua-bungalow', 'Two-Bed Bungalow Near Downtown Minocqua', 'real-estate', 'for-sale', 'minocqua', '$$', 'Walk to Town|Wood Stove|Garage', 'Cozy bungalow a short walk from the shops and the public beach.'],
  ['forty-acres-presque-isle', '40 Wooded Acres Near Presque Isle', 'real-estate', 'land', 'presque-isle', '$', 'Wooded|Trails|Private Road', 'Mixed hardwood and pine with a logging road already cut.', 'E'],
  ['cisco-chain-lake-view-lot', 'Lake-View Lot on the Cisco Chain', 'real-estate', 'land', 'land-o-lakes', '$$', 'Lake View|Electric at Road|Buildable', 'Gently sloped building lot with a water view and deeded lake access.'],
  ['flambeau-hunting-land', 'Hunting Land Near the Flambeau', 'real-estate', 'land', 'mercer', '$', 'Wooded|Deer Stand|Trails', 'Eighty quiet acres bordering county forest, with a stand already in place.'],
  ['northwoods-lakes-realty', 'Northwoods Lakes Realty', 'real-estate', 'agent', 'minocqua', '$$', 'Lake Specialists|Second Homes|Free Valuation', 'Lake-home specialists who know which bays freeze late and which docks flood.', 'E'],
  ['vilas-land-cabin-co', 'Vilas Land & Cabin Co.', 'real-estate', 'agent', 'eagle-river', '$$', 'Vacant Land|Cabins|Local Knowledge', 'Small local team focused on cabins and vacant land across Vilas County.'],
  ['hodag-realty-group', 'Hodag Realty Group', 'real-estate', 'agent', 'rhinelander', '$$', 'Residential|Relocation|Local Knowledge', 'Full-service agents for in-town homes and relocations.'],
]

export const listings: Listing[] = rows.map(([slug, name, category, subtype, town, priceRange, tags, description, flag], i) => ({
  id: `l${i + 1}`, slug, name, category, subtype, town, priceRange, tags: tags.split('|'), description,
  images: listingPhotos(subtype, i),
  isFeatured: flag === 'F', isEnhanced: flag === 'E',
  phone: `(715) 555-01${String(i + 10).padStart(2, '0')}`,
  website: `https://${slug}.example.com`,
  address: `${100 + i * 17} County Rd ${'ABCDEFGHJK'[i % 10]}, ${townName(town)}, WI`,
}))

export const getListing = (slug: string) => listings.find((l) => l.slug === slug)
export const ratingOf = (l: Listing) => (4 + ([...l.slug].reduce((a, c) => a + c.charCodeAt(0), 0) % 10) / 10).toFixed(1)

// Featured first, then Enhanced, then free listings (alphabetical within each tier).
export const sortListings = (a: Listing[]) =>
  [...a].sort((x, y) => +y.isFeatured - +x.isFeatured || +y.isEnhanced - +x.isEnhanced || x.name.localeCompare(y.name))

const rank = (town: string, target: string) => {
  const near = towns.find((t) => t.slug === target)?.nearby ?? []
  return town === target ? 0 : near.includes(town) ? 1 : 2
}
export const forTown = (category: Listing['category'], slug: string, n = 4) =>
  sortListings(listings.filter((l) => l.category === category)).sort((a, b) => rank(a.town, slug) - rank(b.town, slug)).slice(0, n)
export const nearbyTo = (l: Listing, n = 4) =>
  sortListings(listings.filter((x) => x.slug !== l.slug)).sort((a, b) => rank(a.town, l.town) - rank(b.town, l.town)).slice(0, n)

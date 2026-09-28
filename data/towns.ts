export type Town = { slug: string; name: string; county: string; tagline: string; intro: string; lakes: string[]; knownFor: string; nearest: string; nearby: string[] }

export const towns: Town[] = [
  { slug: 'minocqua', name: 'Minocqua', county: 'Oneida', tagline: 'The island town: water on every side, a fish fry on every corner.',
    intro: 'Minocqua sits on an island in a chain of lakes, and locals still call it the Island City. Docks, pontoons and a busy main street make it the friendliest hub in the Northwoods.',
    lakes: ['Lake Minocqua', 'Lake Kawaguesaga', 'Tomahawk Lake'], knownFor: 'Island City, water-ski shows, supper clubs', nearest: 'Rhinelander, about 30 miles', nearby: ['manitowish-waters', 'rhinelander', 'boulder-junction'] },
  { slug: 'eagle-river', name: 'Eagle River', county: 'Vilas', tagline: 'A 28-lake chain and the snowmobile capital of the world.',
    intro: 'Eagle River claims the title of snowmobile capital of the world, with hundreds of miles of groomed trail meeting the 28-lake Eagle River Chain. Summer means pontoons and muskie; winter means sleds and a bonfire at every trailside bar.',
    lakes: ['Eagle River Chain', 'Catfish Lake', 'Cranberry Lake'], knownFor: 'Snowmobile trails, the 28-lake chain', nearest: 'Rhinelander, about 25 miles', nearby: ['land-o-lakes', 'boulder-junction', 'rhinelander'] },
  { slug: 'boulder-junction', name: 'Boulder Junction', county: 'Vilas', tagline: 'Muskie country, with trout-stream quiet in the woods.',
    intro: 'Boulder Junction calls itself the Musky Capital of the World, and the lakes packed around it make a fair case. Hushed pine forest, cold trout streams and a small-town main street round it out.',
    lakes: ['Trout Lake', 'Boulder Lake', 'Big Muskellunge Lake'], knownFor: 'Musky Capital of the World, guides, trout streams', nearest: 'Minocqua, about 30 miles', nearby: ['manitowish-waters', 'presque-isle', 'minocqua'] },
  { slug: 'presque-isle', name: 'Presque Isle', county: 'Vilas', tagline: 'Wilderness lakes, loons and the quiet end of the county.',
    intro: 'Presque Isle sits at the far northern edge of Vilas County, ringed by lakes and forest with almost no light pollution. Come for loons at dawn and a sky full of stars after dark.',
    lakes: ['Presque Isle Lake', 'Pardee Lake', 'Van Vliet Lake'], knownFor: 'Dark skies, loons, quiet lakes', nearest: 'Boulder Junction, about 25 miles', nearby: ['boulder-junction', 'land-o-lakes', 'mercer'] },
  { slug: 'manitowish-waters', name: 'Manitowish Waters', county: 'Vilas', tagline: 'A chain of lakes made for drifting in a pontoon.',
    intro: 'Manitowish Waters strings ten lakes together with channels, so you can boat from a supper-club dock to a sandy beach without trailering. Fall brings tamarack gold and glassy mornings.',
    lakes: ['Rest Lake', 'Manitowish Lake', 'Spider Lake'], knownFor: 'Chain-of-lakes boating, supper clubs', nearest: 'Minocqua, about 20 miles', nearby: ['minocqua', 'boulder-junction', 'mercer'] },
  { slug: 'land-o-lakes', name: "Land O'Lakes", county: 'Vilas', tagline: 'Cisco Chain water on the Michigan line.',
    intro: "Land O'Lakes sits right on the Michigan line, where the Cisco Chain meets quiet county roads and the U.P. Locals swear the walleye run on both sides of the border.",
    lakes: ['Cisco Lake', 'Lake Mamie', 'Lac Vieux Desert'], knownFor: 'Cisco Chain, border-country quiet, ATV trails', nearest: 'Eagle River, about 30 miles', nearby: ['eagle-river', 'presque-isle', 'boulder-junction'] },
  { slug: 'rhinelander', name: 'Rhinelander', county: 'Oneida', tagline: 'Home of the Hodag, with a proper downtown.',
    intro: 'Rhinelander is the Oneida County seat and home of the legendary Hodag, with a real downtown, breweries and a dozen lakes at the edge of town. It is where the Northwoods goes for supplies and a good night out.',
    lakes: ['Lake George', 'Boom Lake', 'Thunder Lake'], knownFor: 'The Hodag, breweries, golf', nearest: 'Wausau, about 60 miles', nearby: ['minocqua', 'eagle-river', 'boulder-junction'] },
  { slug: 'mercer', name: 'Mercer', county: 'Iron', tagline: 'Loon capital of the world, at the edge of the Turtle-Flambeau.',
    intro: 'Mercer is the Loon Capital of the World, with a giant loon statue to prove it and the Turtle-Flambeau Flowage on its doorstep. Expect wild-rice beds, campfires and long quiet paddles.',
    lakes: ['Turtle-Flambeau Flowage', 'Lake Mercer', 'Echo Lake'], knownFor: 'Loons, paddling, camping', nearest: 'Hurley, about 25 miles', nearby: ['manitowish-waters', 'presque-isle', 'hurley-ironwood'] },
  { slug: 'hurley-ironwood', name: 'Hurley / Ironwood', county: 'Iron / Gogebic', tagline: 'Old mining towns split by the state line.',
    intro: 'Hurley and Ironwood face each other across the Wisconsin–Michigan line, two old iron-range towns with Gogebic Range ridgelines and big-hearted bars. Winter here means real snow and trails that run straight into the U.P.',
    lakes: ['Gile Flowage', 'Lake of the Falls', 'Lake Superior, an hour north'], knownFor: 'Silver Street, mining history, deep snow', nearest: 'Ashland, about 45 miles', nearby: ['mercer', 'manitowish-waters', 'presque-isle'] },
]

export const townName = (slug: string) => towns.find((t) => t.slug === slug)?.name ?? slug

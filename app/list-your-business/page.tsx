import ListingForm from '@/components/ListingForm'
import { getListing } from '@/data/listings'
import { pageMeta } from '@/lib/seo'
import type { TierId } from '@/config/pricing'

export const metadata = pageMeta({ title: 'List Your Business', description: 'Add your Northwoods lodge, restaurant, guide service or real estate office to UpNorth.org.', path: '/list-your-business' })

export default async function ListYourBusiness({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const l = sp.claim ? getListing(sp.claim) : undefined
  const isEvent = sp.type === 'event'
  const tier: TierId = sp.tier === 'enhanced' || sp.tier === 'featured' ? sp.tier : 'free'
  const heading = l ? 'Claim this listing' : isEvent ? 'Submit an event' : 'List your business'
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-28">
      <h1 className="text-4xl font-semibold">{heading}</h1>
      <p className="mt-3 max-w-prose text-lead">{l ? `Confirm the details for ${l.name} and we’ll verify you before handing over the listing.` : 'Tell us about your place. Every submission is reviewed by a person before it goes live.'}</p>
      <div className="mt-8">
        <ListingForm
          key={l?.slug ?? 'new'}
          initial={l ? { name: l.name, category: l.category, subtype: l.subtype, town: l.town, address: l.address, phone: l.phone, website: l.website, description: l.description } : {}}
          claim={l?.slug}
          isEvent={isEvent}
          tier={tier}
        />
      </div>
    </div>
  )
}

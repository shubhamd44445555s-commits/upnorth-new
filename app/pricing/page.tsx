import PricingCards from '@/components/PricingCards'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({ title: 'Pricing for Northwoods Businesses', description: 'List your Northwoods business on UpNorth.org for free, or upgrade for a full gallery, priority placement and the homepage carousel.', path: '/pricing' })

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-28">
      <h1 className="text-4xl font-semibold sm:text-display">Get your business found Up North</h1>
      <p className="mt-3 max-w-prose text-lead">Visitors never pay. Businesses choose how much visibility they want, and can change tiers any month.</p>
      <div className="mt-10"><PricingCards /></div>
    </div>
  )
}

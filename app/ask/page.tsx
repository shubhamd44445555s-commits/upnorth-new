import AskClient from '@/components/AskClient'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({ title: 'Ask UpNorth: Northwoods Trip Concierge', description: 'Describe your Northwoods trip and get cabins, supper clubs and activities picked from local UpNorth.org listings.', path: '/ask' })

export default async function AskPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 pt-28">
      <h1 className="text-4xl font-semibold sm:text-display">Ask UpNorth</h1>
      <p className="mt-3 max-w-prose text-lead">Tell us what you&rsquo;re planning and we&rsquo;ll point you to the right lodging, dinner and days on the water.</p>
      <div className="mt-8"><AskClient initialQuery={sp.q ?? ''} /></div>
    </div>
  )
}

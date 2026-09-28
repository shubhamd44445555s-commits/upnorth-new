'use client'
import Link from 'next/link'
import { useState } from 'react'
import { categories } from '@/data/site'
import { towns } from '@/data/towns'
import { tiers, CONTACT_EMAIL, type TierId } from '@/config/pricing'

type Init = Partial<Record<'name' | 'category' | 'subtype' | 'town' | 'address' | 'phone' | 'website' | 'description', string>>
const cats: [string, string][] = [['stay', 'Stay'], ['eat-drink', 'Eat & Drink'], ['things-to-do', 'Things to Do'], ['real-estate', 'Real Estate']]
const field = 'mt-1 w-full border border-mist-200 bg-white/60 px-4 py-3 text-base'

export default function ListingForm({ initial, claim, isEvent, tier }: { initial: Init; claim?: string; isEvent: boolean; tier: TierId }) {
  const [v, setV] = useState({ name: '', category: isEvent ? 'events' : 'stay', subtype: '', town: '', address: '', phone: '', website: '', description: '', ...initial })
  const [tierSel, setTier] = useState<TierId>(tier)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value })
  const types = isEvent ? [] : categories[v.category]?.types ?? []

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    try {
      const r = await fetch('/api/listings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...v, tier: tierSel, claim }) })
      setState(r.ok ? 'done' : 'error')
    } catch { setState('error') }
  }

  if (state === 'done') {
    return (
      <div className="border border-mist-200 bg-white/60 p-6">
        <h2 className="text-h3 font-semibold">Thanks, {v.name} is pending review</h2>
        <p className="mt-3 max-w-prose">We read every submission by hand, usually within two business days. Status: pending review. We&rsquo;ll email you at the contact details you gave once it&rsquo;s live.</p>
        <div className="mt-5 flex flex-wrap gap-4"><Link href="/" className="font-medium text-lake-700 underline">Back to the homepage</Link><Link href="/pricing" className="font-medium text-lake-700 underline">Compare tiers</Link></div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block font-medium">{isEvent ? 'Event name' : 'Business name'}<input required value={v.name} onChange={set('name')} className={field} /></label>
      {!isEvent && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block font-medium">Category
            <select value={v.category} onChange={(e) => setV({ ...v, category: e.target.value, subtype: '' })} className={field}>{cats.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
          </label>
          <label className="block font-medium">Type
            <select required value={v.subtype} onChange={set('subtype')} className={field}><option value="">Choose one</option>{types.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
          </label>
        </div>
      )}
      <label className="block font-medium">Town
        <select required value={v.town} onChange={set('town')} className={field}><option value="">Choose a town</option>{towns.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}</select>
      </label>
      <label className="block font-medium">Address<input value={v.address} onChange={set('address')} className={field} /></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block font-medium">Phone<input type="tel" value={v.phone} onChange={set('phone')} className={field} /></label>
        <label className="block font-medium">Website<input type="url" placeholder="https://" value={v.website} onChange={set('website')} className={field} /></label>
      </div>
      <label className="block font-medium">Description<textarea required minLength={10} rows={5} value={v.description} onChange={set('description')} className={field} /></label>

      <fieldset>
        <legend className="font-medium">Listing tier</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {tiers.map((t) => (
            <label key={t.id} className={`block cursor-pointer border p-4 ${tierSel === t.id ? 'border-pine-900 bg-white' : 'border-mist-200 bg-white/60'}`}>
              <input type="radio" name="tier" className="mr-2" checked={tierSel === t.id} onChange={() => setTier(t.id)} />
              <span className="font-semibold">{t.name}</span> <span className="text-sm">{t.price}/mo</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Photo upload placeholder: TODO connect storage (e.g. Supabase Storage or Cloudflare R2). */}
      <label className="block font-medium">Photos
        <input type="file" accept="image/*" disabled className={`${field} opacity-60`} />
        <span className="mt-1 block text-sm font-normal">Uploads open soon. Email photos to {CONTACT_EMAIL} and we&rsquo;ll add them.</span>
      </label>

      {state === 'error' && <p role="alert" className="text-sm">We couldn&rsquo;t send that just now. Check the required fields, or email {CONTACT_EMAIL}.</p>}
      <button disabled={state === 'sending'} className="rounded-full bg-pine-900 px-6 py-3 font-semibold text-birch-100">{state === 'sending' ? 'Sending…' : claim ? 'Submit claim' : 'Submit for review'}</button>
    </form>
  )
}

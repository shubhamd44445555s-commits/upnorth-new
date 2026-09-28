'use client'
import { useState } from 'react'
import { handleNewsletterSignup } from '@/lib/actions'

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  if (state === 'done') return <p className="font-medium">Thanks, see you Up North.</p>
  return (
    <form
      onSubmit={async (e) => { e.preventDefault(); setState('sending'); setState((await handleNewsletterSignup(email)) ? 'done' : 'error') }}
      className={`flex flex-col gap-2 ${compact ? '' : 'sm:flex-row'}`}
    >
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email address"
        className="min-w-0 flex-1 rounded-full bg-birch-100 px-5 py-3 text-base text-ink-900" />
      <button disabled={state === 'sending'} className="rounded-full bg-amber-500 px-6 py-3 font-semibold text-ink-900">Subscribe</button>
      {state === 'error' && <p role="alert" className="text-sm sm:basis-full">That didn&rsquo;t go through. Check the address and try again.</p>}
    </form>
  )
}

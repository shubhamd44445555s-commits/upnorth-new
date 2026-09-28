// Ask UpNorth: send the visitor to the concierge page, which calls /api/ask.
export function handleAskUpNorth(query: string) {
  window.location.assign(`/ask?q=${encodeURIComponent(query)}`)
}

// Newsletter: /api/subscribe stores the address locally until NEWSLETTER_API_KEY is set.
export async function handleNewsletterSignup(email: string): Promise<boolean> {
  try {
    const r = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
    return r.ok
  } catch {
    return false
  }
}

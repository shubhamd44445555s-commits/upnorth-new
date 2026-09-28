import { listings, getListing } from '@/data/listings'
import { townName } from '@/data/towns'
import { mockAsk } from '@/lib/ask'

const SYSTEM = "You are the UpNorth.org Northwoods travel concierge for Northern Wisconsin. Given the visitor's request, recommend specific lodging, dining, and activities from the provided UpNorth.org listings data — matching town, group size, dates, and stated preferences. Reply conversationally in 2–4 sentences, then list 3–5 specific picks."
const FORMAT = '\nAfter the picks, end with one final line exactly like: PICKS: slug-one, slug-two, slug-three (use only slugs from the data).'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const query = String(body?.query ?? '').trim().slice(0, 500)
  if (!query) return Response.json({ reply: 'Tell me what you are planning: a town, a group size, a season, a craving.', slugs: [], mode: 'demo' })

  const apiKey = process.env.AI_API_KEY
  // TODO: set AI_API_KEY in .env.local — get a key from console.anthropic.com (Claude) or platform.openai.com (GPT)
  if (apiKey && apiKey.trim()) {
    try {
      const live = await askLive(apiKey.trim(), query)
      if (live) return Response.json({ ...live, mode: 'live' })
    } catch {
      // Fall through to demo mode: the visitor never sees an error.
    }
  }
  return Response.json({ ...mockAsk(query), mode: 'demo' })
}

async function askLive(key: string, query: string) {
  const data = listings.map((l) => `${l.slug} | ${l.name} | ${l.category}/${l.subtype} | ${townName(l.town)} | ${l.priceRange ?? ''} | ${l.tags.join(', ')} | ${l.description}`).join('\n')
  const system = `${SYSTEM}${FORMAT}\n\nLISTINGS:\n${data}`
  let text = ''
  if (key.startsWith('sk-ant-')) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 600, system, messages: [{ role: 'user', content: query }] }),
    })
    text = (await r.json())?.content?.[0]?.text ?? ''
  } else {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: system }, { role: 'user', content: query }] }),
    })
    text = (await r.json())?.choices?.[0]?.message?.content ?? ''
  }
  const slugs = (text.match(/PICKS:\s*([^\n]+)/i)?.[1] ?? '').split(/[,\s]+/).filter((s) => getListing(s)).slice(0, 5)
  const reply = text.replace(/PICKS:[\s\S]*$/i, '').trim()
  return reply && slugs.length ? { reply, slugs } : null
}

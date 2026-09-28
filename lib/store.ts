// Local mock data layer (in memory; resets on restart).
// TODO: replace with Supabase tables, e.g. `submissions` and `subscribers`, when a database is connected.
export type Submission = Record<string, string | undefined> & { id: string; status: 'pending review'; createdAt: string }
type Store = { submissions: Submission[]; subscribers: string[] }
const g = globalThis as unknown as { __upnorth?: Store }
export const store: Store = (g.__upnorth ??= { submissions: [], subscribers: [] })

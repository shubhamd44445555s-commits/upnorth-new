import { towns } from '@/data/towns'

type Props = {
  town: string; type: string; types: [string, string, string][]
  onTown: (v: string) => void; onType: (v: string) => void
}

export default function FilterBar({ town, type, types, onTown, onType }: Props) {
  const chip = (on: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium ${on ? 'border-pine-900 bg-pine-900 text-birch-100' : 'border-mist-200 bg-white/60'}`
  return (
    <div className="flex flex-col gap-4 border-b border-mist-200 pb-5 md:flex-row md:items-center">
      <select aria-label="Filter by town" value={town} onChange={(e) => onTown(e.target.value)} className="rounded-full border border-mist-200 bg-white/60 px-4 py-3 text-base">
        <option value="">All towns</option>
        {towns.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
      </select>
      <div className="flex gap-2 overflow-x-auto">
        <button className={chip(!type)} onClick={() => onType('')}>All</button>
        {types.map(([v, l]) => <button key={v} className={chip(type === v)} onClick={() => onType(v)}>{l}</button>)}
      </div>
    </div>
  )
}

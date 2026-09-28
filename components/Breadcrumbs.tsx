import Link from 'next/link'

export default function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap gap-x-2">
        {trail.map((c, i) => (
          <li key={c.label}>
            {c.href ? <Link href={c.href} className="inline-block py-1.5 text-lake-700 hover:underline">{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            {i < trail.length - 1 && <span className="ml-2" aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

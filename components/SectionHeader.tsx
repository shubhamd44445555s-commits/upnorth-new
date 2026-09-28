import Link from 'next/link'

export default function SectionHeader({ title, href, linkLabel = 'See all' }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="text-h2 font-semibold">{title}</h2>
      {href && <Link href={href} className="shrink-0 font-medium text-lake-700 underline">{linkLabel}</Link>}
    </div>
  )
}

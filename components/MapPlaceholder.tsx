export default function MapPlaceholder({ label, query }: { label?: string; query?: string }) {
  const key = process.env.GOOGLE_MAPS_API_KEY // TODO: get a key at console.cloud.google.com (enable the Maps Embed API)
  if (key && query) {
    return <iframe title={`Map of ${label ?? query}`} loading="lazy" className="h-56 w-full border-0" src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${encodeURIComponent(query)}`} />
  }
  return (
    <div className="flex h-56 items-center justify-center border-2 border-dashed border-mist-200 bg-white/50 p-4 text-center text-sm">
      Map — Google Maps API key needed{label ? ` (${label})` : ''}
    </div>
  )
}

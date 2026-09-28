// Photo with a pine-to-lake gradient fallback until real images are added under /public/img.
export function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${src}), linear-gradient(160deg, var(--lake-700), var(--pine-900))` }}
    />
  )
}

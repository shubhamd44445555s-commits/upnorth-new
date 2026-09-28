'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Photo } from './Photo'

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0)
  const go = (d: number) => setI((i + d + images.length) % images.length)
  const btn = 'absolute top-1/2 -translate-y-1/2 rounded-full bg-birch-100 p-3 text-ink-900'
  return (
    <div>
      <div className="relative">
        <Photo src={images[i]} alt={`${alt}, photo ${i + 1} of ${images.length}`} className="h-72 w-full sm:h-[26rem]" />
        <button aria-label="Previous photo" onClick={() => go(-1)} className={`${btn} left-3`}><ChevronLeft size={20} /></button>
        <button aria-label="Next photo" onClick={() => go(1)} className={`${btn} right-3`}><ChevronRight size={20} /></button>
      </div>
      <div className="mt-2 flex gap-2 overflow-x-auto p-1">
        {images.map((s, k) => (
          <button key={s} aria-label={`Show photo ${k + 1}`} onClick={() => setI(k)} className={`shrink-0 ${k === i ? 'ring-2 ring-amber-500' : ''}`}>
            <Photo src={s} alt="" className="h-16 w-24" />
          </button>
        ))}
      </div>
    </div>
  )
}

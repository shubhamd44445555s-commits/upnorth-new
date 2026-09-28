import type { Metadata } from 'next'
import { Fraunces, Work_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { OG_IMAGE } from '@/data/photos'
import { siteUrl } from '@/data/site'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const work = Work_Sans({ subsets: ['latin'], variable: '--font-work' })

const description = 'Lakes, supper clubs, trails and cabins across the Northwoods of Northern Wisconsin.'
const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://upnorth.org'
const desc = 'Lakes, supper clubs, trails and cabins across Vilas and Oneida counties.'
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: 'UpNorth.org — Discover the Northwoods', template: '%s | UpNorth.org' },
  description: desc,
  openGraph: { type: 'website', siteName: 'UpNorth.org', title: 'UpNorth.org — Discover the Northwoods', description: desc, url: '/', images: [{ url: OG_IMAGE }] },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${work.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

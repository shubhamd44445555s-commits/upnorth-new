import Link from 'next/link'
import { Facebook, Instagram, Youtube } from 'lucide-react'

const footerLinks = [
  ['About', '/explore'],
  ['Contact', 'mailto:hello@upnorth.org'],
  ['Advertise', '/pricing'],
  ['Add Your Business', '/list-your-business'],
  ['Privacy', '/privacy'],
] as const

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="reference-container footer-inner">
        <Link href="/" className="footer-brand"><span className="brand-mark" aria-hidden="true">▲▲</span><span><strong>UpNorth<span>.org</span></strong><small>EXPLORE · STAY · DO · BELONG</small></span></Link>
        <nav aria-label="Footer" className="footer-links">{footerLinks.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav>
        <div className="footer-social" aria-label="Social media">
          <a href="#" aria-label="Facebook"><Facebook size={15} /></a>
          <a href="#" aria-label="Instagram"><Instagram size={15} /></a>
          <a href="#" aria-label="YouTube"><Youtube size={15} /></a>
        </div>
        <p className="footer-tagline">The Northwoods<br />Are Calling</p>
      </div>
      <div className="reference-container footer-bottom"><span>© UpNorth.org</span><span>Made for the Northwoods.</span></div>
    </footer>
  )
}

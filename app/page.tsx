import Link from 'next/link'
import Hero from '@/components/Hero'
import { Photo } from '@/components/Photo'
import { sectionPhotos, townPhotos } from '@/data/photos'
import NewsletterForm from '@/components/NewsletterForm'

const destinationCards = [
  { title: 'Explore the Outdoors', body: 'Fishing, boating, hiking, snowmobiling and more. Adventure is always in season.', href: '/things-to-do', image: sectionPhotos['things-to-do'], link: 'See Activities' },
  { title: 'Find a Place to Stay', body: 'Cabins, resorts, vacation rentals and unique stays across the Northwoods.', href: '/stay', image: sectionPhotos.stay, link: 'Browse Stays' },
  { title: 'Great Food & Local Flavor', body: 'From lakeside bars to fine dining, find your next favorite spot.', href: '/eat-drink', image: sectionPhotos['eat-drink'], link: 'View Restaurants' },
  { title: 'Charming Towns', body: 'Discover unique shops, events and friendly communities.', href: '/explore', image: townPhotos.minocqua, link: 'Explore Towns' },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="discover-section">
        <div className="reference-container">
          <h2 className="reference-section-title">Discover the Northwoods</h2>
          <p className="reference-section-subtitle">Your guide to everything Up North — from weekend getaways to year-round living.</p>
          <div className="discover-grid">
            {destinationCards.map((card) => (
              <Link key={card.href} href={card.href} className="discover-card">
                <Photo src={card.image} alt={card.title} className="discover-card-media" />
                <div className="discover-card-copy">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <span>{card.link} <span aria-hidden>→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lifestyle-section">
        <Photo src={sectionPhotos.explore} alt="Lake, pines and a Northwoods campfire at sunset" className="lifestyle-media" />
        <div className="lifestyle-scrim" />
        <div className="reference-container lifestyle-grid">
          <div className="lifestyle-copy">
            <h2>More Than a Destination.<br />A Way of Life.</h2>
            <p>Whether you&rsquo;re visiting, investing, or making it home, UpNorth.org connects you to the people, places and opportunities that make the Northwoods special.</p>
            <Link href="/explore" className="outline-button">Learn More About UpNorth.org</Link>
          </div>
          <div className="newsletter-panel">
            <h2>Stay in the Know</h2>
            <p>Get the latest events, trail ideas, real estate listings and Northwoods stories.</p>
            <NewsletterForm />
            <small>No spam. Just great North content.</small>
          </div>
        </div>
      </section>
    </>
  )
}

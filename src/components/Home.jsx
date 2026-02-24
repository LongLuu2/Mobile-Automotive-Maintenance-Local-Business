import React from 'react'
import Brand from './Brand.jsx'
import Services from './Services.jsx'
import Hero from './Hero.jsx'

export default function Home() {
  return (
    <div>
      <Hero
        title="SAINT MOBILE MAINTENANCE"
        subtitle="Certified Automotive Technician — We Come to You."
        cta="Schedule Service"
      />

      <main className="page">
        <section className="info">
          <div>
            <Services />
          </div>
        </section>

        <aside className="why">
          <h2>Why Choose Our Mobile Service</h2>
          <div className="card">
            <p>
              Save money compared to dealer service — our labor rates are lower and we focus on what
              matters.
            </p>
            <p>
              Convenience — we come to your home or workplace so you don't lose a day waiting at the
              shop.
            </p>
            <p>We use high-quality, OEM-equivalent or better oils and parts to protect your vehicle.</p>
          </div>
        </aside>
      </main>
    </div>
  )
}

import React from 'react'
import Card from '../components/Card'

const sampleCards = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: 'Nandi Hills Sunrise',
  location: 'Bangalore',
  description:
    'Curated small-group experience. Certified guide. Safety first with gear included.',
  price: '₹899',
}))

function MainPage() {
  return (
    <main className="container mx-auto px-12 py-8">
      <h1 className="text-2xl font-semibold mb-6">Experiences</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sampleCards.map((c) => (
          <Card key={c.id} title={c.title} location={c.location} description={c.description} price={c.price} />
        ))}
      </section>
    </main>
  )
}

export default MainPage
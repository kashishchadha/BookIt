import mongoose from 'mongoose'
import connectDB from '../utils/connectDB.js'
import Experience from '../models/Experience.js'
import Promo from '../models/Promo.js'

const experiences = [
  {
    title: 'Kayaking Through Mangroves',
    location: 'Goa',
    description:
      'Experience the serene beauty of mangrove forests while kayaking through calm waters. Guided tour includes safety equipment and expert instruction.',
    image: 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7',
    price: 999,
    category: 'Adventure',
    duration: '2-3 hours',
    included: ['Certified guide', 'Kayaking equipment', 'Safety gear', 'Insurance'],
    minAge: 12,
    maxGroupSize: 10,
    slots: [
      { date: new Date('2025-11-05'), time: '07:00 AM', capacity: 10, booked: 3 },
      { date: new Date('2025-11-05'), time: '09:00 AM', capacity: 10, booked: 5 },
      { date: new Date('2025-11-06'), time: '07:00 AM', capacity: 10, booked: 0 },
      { date: new Date('2025-11-06'), time: '11:00 AM', capacity: 8, booked: 2 },
      { date: new Date('2025-11-07'), time: '09:00 AM', capacity: 10, booked: 0 },
    ],
  },
  {
    title: 'Nandi Hills Sunrise Trek',
    location: 'Bangalore',
    description:
      'Early morning trek to witness a breathtaking sunrise from Nandi Hills. Perfect for nature lovers and photography enthusiasts.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    price: 899,
    category: 'Nature',
    duration: '4-5 hours',
    included: ['Certified guide', 'Transportation', 'Breakfast', 'Photography tips'],
    minAge: 10,
    maxGroupSize: 15,
    slots: [
      { date: new Date('2025-11-05'), time: '05:00 AM', capacity: 15, booked: 8 },
      { date: new Date('2025-11-06'), time: '05:00 AM', capacity: 15, booked: 4 },
      { date: new Date('2025-11-07'), time: '05:00 AM', capacity: 15, booked: 0 },
      { date: new Date('2025-11-08'), time: '05:00 AM', capacity: 12, booked: 0 },
    ],
  },
  {
    title: 'Scuba Diving Adventure',
    location: 'Andaman Islands',
    description:
      'Dive into crystal clear waters and explore vibrant coral reefs. Suitable for beginners with professional PADI certified instructors.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    price: 4999,
    category: 'Adventure',
    duration: '3-4 hours',
    included: ['PADI instructor', 'All diving equipment', 'Underwater photos', 'Insurance'],
    minAge: 14,
    maxGroupSize: 6,
    slots: [
      { date: new Date('2025-11-05'), time: '09:00 AM', capacity: 6, booked: 4 },
      { date: new Date('2025-11-05'), time: '02:00 PM', capacity: 6, booked: 2 },
      { date: new Date('2025-11-06'), time: '09:00 AM', capacity: 6, booked: 0 },
      { date: new Date('2025-11-07'), time: '09:00 AM', capacity: 6, booked: 1 },
    ],
  },
  {
    title: 'Paragliding Experience',
    location: 'Bir Billing',
    description:
      'Soar through the skies with an experienced pilot. Enjoy panoramic views of the Himalayas in this unforgettable adventure.',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e',
    price: 2499,
    category: 'Adventure',
    duration: '1-2 hours',
    included: ['Certified pilot', 'Safety equipment', 'GoPro video', 'Insurance'],
    minAge: 16,
    maxGroupSize: 8,
    slots: [
      { date: new Date('2025-11-05'), time: '10:00 AM', capacity: 8, booked: 6 },
      { date: new Date('2025-11-05'), time: '01:00 PM', capacity: 8, booked: 3 },
      { date: new Date('2025-11-06'), time: '10:00 AM', capacity: 8, booked: 0 },
      { date: new Date('2025-11-07'), time: '10:00 AM', capacity: 8, booked: 0 },
    ],
  },
  {
    title: 'Wildlife Safari',
    location: 'Jim Corbett',
    description:
      'Experience the thrill of spotting tigers and other wildlife in their natural habitat. Expert naturalist guides included.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615',
    price: 1899,
    category: 'Nature',
    duration: '4-5 hours',
    included: ['Expert naturalist', 'Safari jeep', 'Binoculars', 'Refreshments'],
    minAge: 8,
    maxGroupSize: 12,
    slots: [
      { date: new Date('2025-11-05'), time: '06:00 AM', capacity: 12, booked: 7 },
      { date: new Date('2025-11-05'), time: '03:00 PM', capacity: 12, booked: 4 },
      { date: new Date('2025-11-06'), time: '06:00 AM', capacity: 12, booked: 0 },
      { date: new Date('2025-11-07'), time: '06:00 AM', capacity: 12, booked: 2 },
    ],
  },
  {
    title: 'River Rafting',
    location: 'Rishikesh',
    description:
      'Navigate through thrilling rapids on the Ganges River. Perfect for adventure seekers looking for an adrenaline rush.',
    image: 'https://images.unsplash.com/photo-1594077623058-3e45c2e47e77',
    price: 1499,
    category: 'Adventure',
    duration: '3-4 hours',
    included: ['Expert guide', 'Safety equipment', 'Life jackets', 'Insurance'],
    minAge: 14,
    maxGroupSize: 10,
    slots: [
      { date: new Date('2025-11-05'), time: '08:00 AM', capacity: 10, booked: 5 },
      { date: new Date('2025-11-05'), time: '12:00 PM', capacity: 10, booked: 8 },
      { date: new Date('2025-11-06'), time: '08:00 AM', capacity: 10, booked: 0 },
      { date: new Date('2025-11-07'), time: '08:00 AM', capacity: 10, booked: 0 },
    ],
  },
  {
    title: 'Hot Air Balloon Ride',
    location: 'Jaipur',
    description:
      'Float above the pink city and witness stunning aerial views of historic forts and palaces during sunrise.',
    image: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21',
    price: 8999,
    category: 'Adventure',
    duration: '2-3 hours',
    included: ['Certified pilot', 'Champagne breakfast', 'Flight certificate', 'Insurance'],
    minAge: 12,
    maxGroupSize: 4,
    slots: [
      { date: new Date('2025-11-05'), time: '05:30 AM', capacity: 4, booked: 3 },
      { date: new Date('2025-11-06'), time: '05:30 AM', capacity: 4, booked: 0 },
      { date: new Date('2025-11-07'), time: '05:30 AM', capacity: 4, booked: 1 },
      { date: new Date('2025-11-08'), time: '05:30 AM', capacity: 4, booked: 0 },
    ],
  },
  {
    title: 'Mountain Biking Trail',
    location: 'Manali',
    description:
      'Ride through challenging mountain trails with stunning Himalayan views. Suitable for intermediate to advanced riders.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    price: 1299,
    category: 'Adventure',
    duration: '3-4 hours',
    included: ['Mountain bike', 'Helmet & gear', 'Guide', 'Refreshments'],
    minAge: 15,
    maxGroupSize: 8,
    slots: [
      { date: new Date('2025-11-05'), time: '07:00 AM', capacity: 8, booked: 4 },
      { date: new Date('2025-11-05'), time: '02:00 PM', capacity: 8, booked: 2 },
      { date: new Date('2025-11-06'), time: '07:00 AM', capacity: 8, booked: 0 },
      { date: new Date('2025-11-07'), time: '07:00 AM', capacity: 8, booked: 0 },
    ],
  },
]

const promos = [
  {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    minPurchase: 500,
    maxDiscount: 500,
    validFrom: new Date('2025-10-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 100,
    isActive: true,
  },
  {
    code: 'DISCOUNT10',
    type: 'percentage',
    value: 10,
    minPurchase: 1000,
    maxDiscount: 1000,
    validFrom: new Date('2025-10-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 50,
    isActive: true,
  },
  {
    code: 'FLAT100',
    type: 'fixed',
    value: 100,
    minPurchase: 500,
    validFrom: new Date('2025-10-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 200,
    isActive: true,
  },
  {
    code: 'FIRSTBOOKING',
    type: 'percentage',
    value: 15,
    minPurchase: 0,
    maxDiscount: 1500,
    validFrom: new Date('2025-10-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: null,
    isActive: true,
  },
  {
    code: 'ADVENTURE20',
    type: 'percentage',
    value: 20,
    minPurchase: 2000,
    maxDiscount: 2000,
    validFrom: new Date('2025-10-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 30,
    isActive: true,
  },
]

async function seed() {
  try {
    await connectDB()
    console.log('Connected to MongoDB')

    // Clear existing data
    await Experience.deleteMany({})
    await Promo.deleteMany({})
    console.log('Cleared existing data')

    // Insert experiences
    const insertedExperiences = await Experience.insertMany(experiences)
    console.log(`✅ Inserted ${insertedExperiences.length} experiences`)

    // Insert promos
    const insertedPromos = await Promo.insertMany(promos)
    console.log(`✅ Inserted ${insertedPromos.length} promo codes`)

    console.log('\n🎉 Database seeded successfully!')
    console.log('\nAvailable promo codes:')
    promos.forEach((p) => {
      console.log(`  - ${p.code}: ${p.value}${p.type === 'percentage' ? '%' : '₹'} off`)
    })

    mongoose.disconnect()
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    mongoose.disconnect()
    process.exit(1)
  }
}

seed()

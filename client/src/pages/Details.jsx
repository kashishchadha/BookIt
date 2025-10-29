import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExperienceById } from '../services/api'

function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [experience, setExperience] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true)
        const data = await getExperienceById(id)
        setExperience(data.data)
        const availableSlots = data.data.slots.filter(s => s.isAvailable && s.capacity > s.booked)
        if (availableSlots.length > 0) {
          setSelectedSlot(availableSlots[0])
        }
      } catch (err) {
        console.error('Failed to fetch experience:', err)
        setError('Failed to load experience details.')
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [id])

  const pricePer = experience?.price || 0
  const taxesRate = 0.06

  const subtotal = useMemo(() => pricePer * quantity, [pricePer, quantity])
  const taxes = useMemo(() => Math.round(subtotal * taxesRate), [subtotal])
  const total = useMemo(() => subtotal + taxes, [subtotal, taxes])

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert('Please select a time slot')
      return
    }

    const bookingData = {
      experienceId: experience._id,
      slotId: selectedSlot._id,
      experienceTitle: experience.title,
      experienceLocation: experience.location,
      date: new Date(selectedSlot.date).toLocaleDateString('en-US'),
      time: selectedSlot.time,
      quantity,
      pricePerPerson: pricePer,
      subtotal,
      taxes,
      total,
    }

    localStorage.setItem('pendingBooking', JSON.stringify(bookingData))
    navigate('/checkout')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error || 'Experience not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const availableSlots = experience.slots.filter(s => s.isAvailable && s.capacity > s.booked)
  const uniqueDates = Array.from(new Set(availableSlots.map(s => new Date(s.date).toLocaleDateString())))

  return (
    <main className="container mx-auto px-4 py-8 max-w-[70%]">
      <div className="mb-6 ">
        <button onClick={() => navigate('/')} className="text-sm text-gray-600 flex items-center gap-2">
          <span className="inline-block">←</span>
          <span className='font-bold cursor-pointer'>Details</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-gray-900">{experience.title}</h2>
          <p className="mt-3 text-gray-600">{experience.description}</p>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700">Choose date</h3>
            <div className="mt-3 flex gap-3 flex-wrap">
              {uniqueDates.map((dateStr) => {
                const isSelected = selectedSlot && new Date(selectedSlot.date).toLocaleDateString() === dateStr
                return (
                  <button
                    key={dateStr}
                    onClick={() => {
                      const slot = availableSlots.find(s => new Date(s.date).toLocaleDateString() === dateStr)
                      setSelectedSlot(slot)
                    }}
                    className={`px-3 py-2 rounded-md text-sm border ${
                      isSelected ? 'bg-yellow-400 border-yellow-400' : 'bg-white border-gray-200'
                    }`}
                  >
                    {dateStr}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700">Choose time</h3>
            <div className="mt-3 flex gap-3 flex-wrap items-center">
              {availableSlots
                .filter(s => !selectedSlot || new Date(s.date).toLocaleDateString() === new Date(selectedSlot.date).toLocaleDateString())
                .map((slot) => {
                  const available = slot.capacity - slot.booked
                  const isSelected = selectedSlot?._id === slot._id
                  return (
                    <button
                      key={slot._id}
                      onClick={() => setSelectedSlot(slot)}
                      disabled={available === 0}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm border ${
                        isSelected 
                          ? 'bg-yellow-400 border-yellow-400' 
                          : available === 0 
                          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <span>{slot.time}</span>
                      {available > 0 && <span className="ml-2 text-xs text-gray-500">{available} left</span>}
                    </button>
                  )
                })}
            </div>

            <p className="mt-2 text-xs text-gray-400">All times are in IST (GMT +5:30)</p>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700">About</h3>
            <div className="mt-3 bg-gray-100 p-3 rounded-md text-sm text-gray-500">
              <p><strong>Duration:</strong> {experience.duration}</p>
              <p><strong>Category:</strong> {experience.category}</p>
              <p><strong>Min Age:</strong> {experience.minAge} years</p>
              <p><strong>Group Size:</strong> Up to {experience.maxGroupSize} people</p>
              <div className="mt-2">
                <p className="font-semibold">Included:</p>
                <ul className="list-disc list-inside">
                  {experience.included.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-5 border border-gray-100">
            <div className="text-sm text-gray-500 mb-4 flex justify-between">
              <span>Starts at</span>
              <span>₹{pricePer}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Quantity</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded border border-gray-200 text-gray-700"
                >
                  −
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 rounded border border-gray-200 text-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-2 flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="text-sm text-gray-500 mb-4 flex justify-between">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>

            <div className="flex items-center justify-between font-semibold text-gray-900 mb-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-md font-medium"
            >
              Confirm
            </button>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Details
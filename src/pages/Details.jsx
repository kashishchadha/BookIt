import React, { useState, useMemo } from 'react'

const DATES = [
  'Oct 22',
  'Oct 23',
  'Oct 24',
  'Oct 25',
  'Oct 26',
]

const TIMES = [
  { label: '07:00 am', avail: 4 },
  { label: '09:00 am', avail: 2 },
  { label: '11:00 am', avail: 5 },
  { label: '01:00 pm', avail: 0 },
]

function Details() {
  const [selectedDate, setSelectedDate] = useState(DATES[0])
  const [selectedTime, setSelectedTime] = useState(TIMES[1].label)
  const [quantity, setQuantity] = useState(1)

  const pricePer = 999
  const taxesRate = 0.06

  const subtotal = useMemo(() => pricePer * quantity, [pricePer, quantity])
  const taxes = useMemo(() => Math.round(subtotal * taxesRate), [subtotal])
  const total = useMemo(() => subtotal + taxes, [subtotal, taxes])

  return (
    <main className="container mx-auto px-4 py-8 max-w-[85%]">
      <div className="mb-6">
        <button className="text-sm text-gray-600 flex items-center gap-2">
          <span className="inline-block">←</span>
          <span>Details</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=1400&q=80"
              alt="activity"
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-gray-900">Kayaking</h2>
          <p className="mt-3 text-gray-600">
            Curated small-group experience. Certified guide. Safety first with gear included.
            Helmet and Life jackets along with an expert will accompany in kayaking.
          </p>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700">Choose date</h3>
            <div className="mt-3 flex gap-3 flex-wrap">
              {DATES.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`px-3 py-2 rounded-md text-sm border ${
                    d === selectedDate ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700">Choose time</h3>
            <div className="mt-3 flex gap-3 flex-wrap items-center">
              {TIMES.map((t) => (
                <button
                  key={t.label}
                  onClick={() => t.avail > 0 && setSelectedTime(t.label)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm border ${
                    selectedTime === t.label ? 'bg-yellow-100 border-yellow-400' : t.avail === 0 ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-gray-200'
                  }`}
                >
                  <span>{t.label}</span>
                  {t.avail > 0 && <span className="ml-2 text-xs text-gray-500">{t.avail} left</span>}
                </button>
              ))}
            </div>

            <p className="mt-2 text-xs text-gray-400">All times are in IST (GMT +5:30)</p>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700">About</h3>
            <div className="mt-3 bg-gray-100 p-3 rounded-md text-sm text-gray-500">
              Scenic routes, trained guides, and safety briefing. Minimum age 10.
            </div>
          </div>
        </section>

        {/* right column - summary box */}
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
              onClick={() => alert(`Confirmed: ${quantity} x ₹${pricePer} = ₹${total}`)}
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
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const generateRef = () => Math.random().toString(36).slice(2, 8).toUpperCase()

export default function Confirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    if (state && state.refId) {
      setBooking({ refId: state.refId })
      return
    }

    try {
      const raw = localStorage.getItem('booking')
      if (raw) {
        const data = JSON.parse(raw)
        setBooking(data)
        return
      }
    } catch {
      // ignore
    }

    navigate('/', { replace: true })
  }, [state, navigate])

  if (!booking) return null

  const { refId = generateRef(), experience, date, time, qty, total } = booking

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Booking Confirmed</h1>
          <p className="text-sm text-gray-500 mb-6">Ref ID: {refId}</p>

          <div className="mb-6 text-sm text-gray-600">
            {experience && <div>Experience: <strong className="text-gray-900">{experience}</strong></div>}
            {date && <div>Date: <strong className="text-gray-900">{date}</strong></div>}
            {time && <div>Time: <strong className="text-gray-900">{time}</strong></div>}
            {qty != null && <div>Qty: <strong className="text-gray-900">{qty}</strong></div>}
            {total != null && <div>Total: <strong className="text-gray-900">₹{total}</strong></div>}
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  )
}


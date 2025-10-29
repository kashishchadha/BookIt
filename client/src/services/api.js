import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getExperiences = async () => {
  const response = await api.get('/experiences')
  return response.data
}

export const getExperienceById = async (id) => {
  const response = await api.get(`/experiences/${id}`)
  return response.data
}

export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData)
  return response.data
}

export const getBookingByRefId = async (refId) => {
  const response = await api.get(`/bookings/${refId}`)
  return response.data
}

export const validatePromo = async (promoData) => {
  const response = await api.post('/promo/validate', promoData)
  return response.data
}

export default api

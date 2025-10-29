import axios from 'axios'


const api = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL,
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

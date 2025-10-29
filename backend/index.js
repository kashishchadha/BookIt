import express from 'express'
import cors from 'cors'
import connectDB from './utils/connectDB.js'
import experiencesRouter from './routes/experiences.js'
import bookingsRouter from './routes/bookings.js'
import promoRouter from './routes/promo.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/experiences', experiencesRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/promo', promoRouter)

app.get('/', (req, res) => {
  res.json({ message: 'BookIt API is running' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on port ${PORT}`)
})
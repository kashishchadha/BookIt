import express from 'express'
import Booking from '../models/Booking.js'
import Experience from '../models/Experience.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const {
      experienceId,
      slotId,
      quantity,
      customerName,
      customerEmail,
      promoCode,
      discount,
      taxes,
      total,
    } = req.body

    // Validate required fields
    if (!experienceId || !slotId || !quantity || !customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      })
    }

    const experience = await Experience.findById(experienceId)
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found',
      })
    }

    const slot = experience.slots.id(slotId)
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found',
      })
    }

    const availableSpots = slot.capacity - slot.booked
    if (availableSpots < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${availableSpots} spot(s) available`,
      })
    }

    if (!slot.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'This slot is not available',
      })
    }

    const pricePerPerson = slot.price || experience.price
    const subtotal = pricePerPerson * quantity

    const refId = await Booking.generateRefId()

    const booking = await Booking.create({
      refId,
      experienceId,
      slotId,
      experienceTitle: experience.title,
      experienceLocation: experience.location,
      date: slot.date,
      time: slot.time,
      quantity,
      pricePerPerson,
      subtotal,
      discount: discount || 0,
      taxes: taxes || 0,
      total: total || subtotal,
      customerName,
      customerEmail,
      promoCode: promoCode || null,
      status: 'confirmed',
      paymentStatus: 'completed',
    })

    slot.booked += quantity
    await experience.save()

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        refId: booking.refId,
        booking,
      },
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message,
    })
  }
})

router.get('/:refId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ refId: req.params.refId }).lean()

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      })
    }

    res.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    console.error('Error fetching booking:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message,
    })
  }
})

export default router

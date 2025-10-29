import express from 'express'
import Experience from '../models/Experience.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true })
      .select('title location description image price category duration')
      .lean()

    res.json({
      success: true,
      count: experiences.length,
      data: experiences,
    })
  } catch (error) {
    console.error('Error fetching experiences:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experiences',
      error: error.message,
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id).lean()

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found',
      })
    }

    experience.availableSlots = experience.slots.filter(
      (slot) => slot.isAvailable && slot.booked < slot.capacity
    )

    res.json({
      success: true,
      data: experience,
    })
  } catch (error) {
    console.error('Error fetching experience:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experience',
      error: error.message,
    })
  }
})

export default router

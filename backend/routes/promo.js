import express from 'express'
import Promo from '../models/Promo.js'

const router = express.Router()

router.post('/validate', async (req, res) => {
  try {
    const { code, subtotal } = req.body

    if (!code || subtotal === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Promo code and subtotal are required',
      })
    }

    const promo = await Promo.findOne({ code: code.toUpperCase() })

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Invalid promo code',
      })
    }

    const validation = promo.isValid(subtotal)
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      })
    }

    const discount = promo.calculateDiscount(subtotal)

    res.json({
      success: true,
      message: 'Promo code applied successfully',
      data: {
        code: promo.code,
        type: promo.type,
        value: promo.value,
        discount,
      },
    })
  } catch (error) {
    console.error('Error validating promo:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to validate promo code',
      error: error.message,
    })
  }
})

export default router

import mongoose from 'mongoose'

const PromoSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    minPurchase: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxDiscount: {
      type: Number,
      min: 0,
    },
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    usageLimit: {
      type: Number,
      default: null,
    },
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// Method to validate promo code
PromoSchema.methods.isValid = function (subtotal) {
  const now = new Date()

  // Check if active
  if (!this.isActive) {
    return { valid: false, message: 'Promo code is inactive' }
  }

  // Check date validity
  if (now < this.validFrom || now > this.validUntil) {
    return { valid: false, message: 'Promo code has expired' }
  }

  // Check usage limit
  if (this.usageLimit && this.usedCount >= this.usageLimit) {
    return { valid: false, message: 'Promo code usage limit reached' }
  }

  // Check minimum purchase
  if (subtotal < this.minPurchase) {
    return {
      valid: false,
      message: `Minimum purchase of ₹${this.minPurchase} required`,
    }
  }

  return { valid: true }
}

// Method to calculate discount
PromoSchema.methods.calculateDiscount = function (subtotal) {
  let discount = 0

  if (this.type === 'percentage') {
    discount = (subtotal * this.value) / 100
    // Apply max discount cap if set
    if (this.maxDiscount && discount > this.maxDiscount) {
      discount = this.maxDiscount
    }
  } else if (this.type === 'fixed') {
    discount = this.value
    // Don't let discount exceed subtotal
    if (discount > subtotal) {
      discount = subtotal
    }
  }

  return Math.round(discount)
}

export default mongoose.model('Promo', PromoSchema)

import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema(
  {
    refId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experience',
      required: true,
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    experienceTitle: {
      type: String,
      required: true,
    },
    experienceLocation: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    pricePerPerson: {
      type: Number,
      required: true,
      min: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    taxes: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    promoCode: {
      type: String,
      uppercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'confirmed',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
)

BookingSchema.index({ customerEmail: 1 })
BookingSchema.index({ experienceId: 1, date: 1 })

BookingSchema.statics.generateRefId = async function () {
  let refId
  let exists = true

  while (exists) {
    refId = Math.random().toString(36).substring(2, 10).toUpperCase()
    exists = await this.findOne({ refId })
  }

  return refId
}

export default mongoose.model('Booking', BookingSchema)

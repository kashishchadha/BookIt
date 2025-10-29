import mongoose from 'mongoose'

const SlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  booked: {
    type: Number,
    default: 0,
    min: 0,
  },
  price: {
    type: Number,
    min: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
})

const ExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      default: 'Adventure',
    },
    duration: {
      type: String,
      default: '2-3 hours',
    },
    included: {
      type: [String],
      default: ['Certified guide', 'Safety equipment', 'Insurance'],
    },
    minAge: {
      type: Number,
      default: 12,
    },
    maxGroupSize: {
      type: Number,
      default: 15,
    },
    slots: [SlotSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

ExperienceSchema.virtual('availableSlots').get(function () {
  return this.slots.filter((slot) => slot.isAvailable && slot.booked < slot.capacity)
})

ExperienceSchema.methods.isSlotAvailable = function (slotId, quantity = 1) {
  const slot = this.slots.id(slotId)
  if (!slot) return false
  return slot.isAvailable && slot.booked + quantity <= slot.capacity
}

export default mongoose.model('Experience', ExperienceSchema)

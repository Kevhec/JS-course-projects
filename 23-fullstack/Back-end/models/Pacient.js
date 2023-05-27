import mongoose from 'mongoose'
const { Schema } = mongoose

const pacientSchema = new Schema({
  petName: {
    type: String,
    required: true
  },
  petOwner: {
    type: String,
    required: true
  },
  petOwnerEmail: {
    type: String,
    required: true
  },
  dischargeDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  symptoms: {
    type: String,
    required: true
  },
  veterinarian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinarian',
    required: true
  }
}, {
  timestamps: true
})

const Pacient = mongoose.model('Pacient', pacientSchema)

export default Pacient

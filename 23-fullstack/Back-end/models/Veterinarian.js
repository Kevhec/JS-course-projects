import mongoose from 'mongoose'
import { randomUUID } from 'crypto'
import bcrypt from 'bcrypt'
const { Schema } = mongoose

const veterinarianSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  tel: {
    type: String,
    default: null,
    trim: true
  },
  website: {
    type: String,
    default: null,
    trim: true
  },
  token: {
    type: String,
    default: randomUUID()
  },
  confirmed: {
    type: Boolean,
    default: false
  }
})

// Execute function previous to model upload
veterinarianSchema.pre('save', async function (next) {
  // Avoid hashing for already processed passwords
  if (!this.isModified('password')) next()

  // Generate hashed password using bcrypt dependency
  const salt = await bcrypt.genSalt(10)

  // Assign hashed password to current model instance
  this.password = await bcrypt.hash(this.password, salt)
})

// Create new Schema method (mongoose)
veterinarianSchema.methods.checkPassword = async function (formPassword) {
  // Compare method checks if provided password is equal to hashed password
  return await bcrypt.compare(formPassword, this.password)
}

// Define model, first is model name, second it's schema
const Veterinarian = mongoose.model('Veterinarian', veterinarianSchema)

export default Veterinarian

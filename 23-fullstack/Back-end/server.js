import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import veterinarianRoutes from './router/veterinarianRoutes.js'
import pacientRoutes from './router/pacientRoutes.js'

const app = express()
// Enable json parser
app.use(express.json())

// Save .env variables on process.env obj
dotenv.config()

connectDB()

// Handle CORS
const allowedDomains = [process.env.FRONTEND_URL]
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedDomains.indexOf(origin) !== -1) {
      // Allow request origin
      callback(null, true)
    } else {
      callback(new Error('Petition not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.use('/api/veterinarian', veterinarianRoutes)
app.use('/api/pacient', pacientRoutes)

const port = process.env.PORT || 4000

// Initialize server on defined port
app.listen(port, () => {
  console.log(`[server]: Server is running on port ${port}`)
})

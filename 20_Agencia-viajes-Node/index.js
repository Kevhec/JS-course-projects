import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'

const app = express()
// Connect database
db.authenticate()
  .then(() => {
    console.log('Database Connected')
  })
  .catch(e => console.log(e))

// Define port
const port = process.env.PORT | 4000

// Enable pug
app.set('view engine', 'pug')

// Get current year
app.use((_, res, next) => {
  // Add local (internal variable)
  const currentYear = new Date().getFullYear()
  res.locals.currentYear = currentYear

  // Continue middleware flow
  next()
})

// Add body parser to read form data
app.use(express.urlencoded({ extended: true }))

// Define public folder
app.use(express.static('public'))

// Add router
app.use('/', router)

app.listen(port, () => {
  console.log(`Server running on ${port} port`)
})

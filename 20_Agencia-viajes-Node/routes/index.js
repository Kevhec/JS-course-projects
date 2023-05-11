import express from 'express'
import { aboutPage, homePage, testimonialsPage, tripsPage, destinationPage } from '../controllers/pagesController.js'
import { saveTestimonial } from '../controllers/testimonialController.js'

const router = express.Router()

router.get('/', homePage)

router.get('/about', aboutPage)

router.get('/trips', tripsPage)

router.get('/trips/:destinationQuery', destinationPage)

router.get('/testimonials', testimonialsPage)

router.post('/testimonials', saveTestimonial)

export default router
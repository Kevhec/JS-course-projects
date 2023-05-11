import { Trip } from '../models/Trip.js'
import { Testimonial } from '../models/Testimonials.js'

const homePage = async (_, res) => {
  
  try {
    // Get three elements from Trip and Testimonial models
    const [trips, testimonials] = await Promise.all([
      Trip.findAll({ limit: 3 }),
      Testimonial.findAll({ limit: 3 })
    ])
  
    res.render('home', {
      page: 'Inicio',
      title: 'Agencia de Viajes',
      bodyClass: 'home',
      trips,
      testimonials
    })  
  } catch (error) {
    console.error(error)
  }
}

const aboutPage = (_, res) => {
  res.render('about', {
    page: 'Nosotros'
  })
}

const tripsPage = async (_, res) => {
  try {
    // Consult Database
    const trips = await Trip.findAll()
  
    res.render('trips', {
      page: 'Próximos Viajes',
      trips
    })
  } catch (error) {
    console.error(error)
  }
}

const destinationPage = async (req, res) => {
  const { destinationQuery } = req.params

  try {
    const destination = await Trip.findOne({ where: { slug: destinationQuery } })
    res.render('destination', {
      page: destination.titulo,
      destination
    })  
  } catch (error) {
    console.error(error)
  }
}

const testimonialsPage = async (_, res) => {
  try {
    const testimonials = await Testimonial.findAll()

    res.render('testimonials', {
      page: 'Testimoniales',
      testimonials
    })
  } catch (error) {
    console.error(error)
  }
}

export { homePage, aboutPage, tripsPage, destinationPage, testimonialsPage }
import { Testimonial } from '../models/Testimonials.js'

const saveTestimonial = async (req, res) => {
  // Validate data
  const { name, email, message } =  req.body

  const errors = []

  if (name.trim() === '') errors.push({message: 'El nombre está vacío'})
  if (email.trim() === '') errors.push({message: 'El email está vacío'})
  if (message.trim() === '') errors.push({message: 'El mensaje está vacío'})

  if (errors.length > 0) {
    // Check existing testimonials
    const testimonials = await Testimonial.findAll()

    // Show view errors
    res.render('testimonials', {
      page: 'Testimoniales',
      errors,
      name,
      email,
      message,
      testimonials
    })
  } else {
    // Store on database
    try {
      await Testimonial.create({
        name,
        email,
        message
      })
      res.redirect('/testimonials')
    } catch (error) {
      console.error(error)
    }

  }
}

export { saveTestimonial }
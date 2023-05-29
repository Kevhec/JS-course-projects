import Pacient from '../models/Pacient.js'

const addPacient = async (req, res) => {
  try {
    // Fill model with req body
    const pacient = new Pacient(req.body)
    // Get veterinarian id and assign to pacient
    pacient.veterinarian = req.veterinarian._id
    // Add new pacient to DB
    const newPacient = await pacient.save()
    // Return new pacient
    res.status(200).json({ newPacient })
  } catch (error) {
    console.error(`[server]: Error creating new pacient. Error Data: ${error.message}`)
  }
}

const getAllPacients = async (req, res) => {
  const pacients = await Pacient.find()
    .where('veterinarian')
    .equals(req.veterinarian._id)

  res.status(200).json(pacients)
}

const getSpecificPacient = async (req, res) => {
  try {
    const pacient = await Pacient.findById(req.params.id)

    if (!pacient) {
      const pacientNotFoundError = new Error('Pacient not found, please try again or contact tech department')
      return res.status(404).json({ message: pacientNotFoundError.message })
    }

    if (
      pacient.veterinarian._id.toString() !==
      req.veterinarian._id.toString()
    ) {
      return res.status(401).json({ message: 'Access Denied: Your account does not have permission to access this patient\'s information' })
    }

    res.status(200).json(pacient)
  } catch (error) {
    const idError = new Error('Internal error: Invalid ID')
    res.status(500).json({ message: idError.message })
  }
}

const updatePacient = async (req, res) => {
  try {
    const pacient = await Pacient.findById(req.params.id)

    if (!pacient) {
      const pacientNotFoundError = new Error('Pacient not found, please try again or contact tech support')
      return res.status(404).json({ message: pacientNotFoundError.message })
    }

    if (
      pacient.veterinarian._id.toString() !==
      req.veterinarian._id.toString()
    ) {
      return res.status(401).json({ message: 'Access Denied: Your account does not have permission to access this patient\'s information' })
    }

    // Update Pacient
    const updatedFields = req.body
    Object.keys(updatedFields).forEach(key => {
      if (!updatedFields[key]) return
      pacient[key] = updatedFields[key]
    })

    const updatedPacient = await pacient.save()
    res.status(200).json(updatedPacient)
  } catch (error) {
    const idError = new Error('Internal error: Invalid ID')
    res.status(500).json({ message: idError.message })
  }
}

const deletePacient = async (req, res) => {
  try {
    const pacient = await Pacient.findById(req.params.id)

    if (!pacient) {
      const pacientNotFoundError = new Error('Pacient not found, please try again or contact tech department')
      return res.status(404).json({ message: pacientNotFoundError.message })
    }

    if (
      pacient.veterinarian._id.toString() !==
      req.veterinarian._id.toString()
    ) {
      return res.status(401).json({ message: 'Access Denied: Your account does not have permission to access this patient\'s information' })
    }

    await pacient.deleteOne()
    res.status(200).json({ message: 'Pacient succesfully deleted' })
  } catch (error) {
    const idError = new Error('Internal error: Invalid ID')
    res.status(500).json({ message: idError.message })
  }
}

export {
  addPacient,
  getAllPacients,
  getSpecificPacient,
  updatePacient,
  deletePacient
}

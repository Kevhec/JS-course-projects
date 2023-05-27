import express from 'express'
import {
  addPacient,
  getAllPacients,
  getSpecificPacient,
  updatePacient,
  deletePacient
} from '../controllers/pacientController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .post(checkAuth, addPacient)
  .get(checkAuth, getAllPacients)

router.route('/:id')
  .get(checkAuth, getSpecificPacient)
  .patch(checkAuth, updatePacient)
  .delete(checkAuth, deletePacient)

export default router

import express from 'express'
import {
  profile,
  signUp,
  confirm,
  authenticate,
  forgottenPassword,
  checkPasswordToken,
  newPassword
} from '../controllers/veterinarianController.js'
import checkAuth from '../middleware/authMiddleware.js'

// Initialize express router
const router = express.Router()

// PUBLIC AREA - This endpoint is equivalent to http://domain.ext/veterinarian/
router.post('/', signUp)

router.get('/confirm/:token', confirm)

router.post('/login', authenticate)

router.post('/forgotten-password', forgottenPassword)

// Route chaining. Useful when pointing to same endpoint multiple time, methods are chained after it
router.route('/forgotten-password/:token')
  .get(checkPasswordToken)
  .post(newPassword)

// PRIVATE AREA - Custom middleware, first executes checkAuth then profile
router.get('/profile', checkAuth, profile)

export default router

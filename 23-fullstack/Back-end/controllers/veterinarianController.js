import { randomUUID } from 'crypto'
import Veterinarian from '../models/Veterinarian.js'
import generateJWT from '../utils/generateJWT.js'
import signUpEmail from '../utils/signupEmail.js'
import forgotPasswordEmail from '../utils/forgotPasswordEmail.js'

const signUp = async (req, res) => {
  try {
    // Read req body, first enable json parser on main file server.js
    const { email, name } = req.body

    // Handle existing users
    const isAlreadyRegistered = await Veterinarian.findOne({ email })
    if (isAlreadyRegistered) {
      const isRegisteredError = new Error('User is already registered, please try logging in or use a different email to sign up')
      return res.status(409).json({ message: isRegisteredError.message })
    }

    // Create model instance with req.body data
    const veterinarian = new Veterinarian(req.body)

    // Use save method to send new data to database
    await veterinarian.save()

    // Send confirmation email
    signUpEmail({
      email,
      name,
      token: veterinarian.token
    })

    res.status(200).json({ message: 'Everything ok! Please check your mailbox for your confirmation link.' })
  } catch (error) {
    console.error(`[server]: Error uploading data to DB. Error Data: ${error.message}`)
  }
}

const profile = (req, res) => {
  const { veterinarian } = req
  res.json(veterinarian)
}

const confirm = async (req, res) => {
  try {
    // Read token from req url params
    const { token } = req.params

    // Consult DB for token asociated user, this is an instance of the user
    const userToConfirm = await Veterinarian.findOne({ token })

    // Handle invalid token
    if (!userToConfirm) {
      const notUserFoundError = new Error('Invalid or expired confirmation token')
      return res.status(404).json({ message: notUserFoundError.message })
    }

    // Expire token and confirm user
    userToConfirm.token = null
    userToConfirm.confirmed = true

    // Upload user on DB
    await userToConfirm.save()

    // Response for successful confirmation
    res.json({ message: 'Congratulations! Your account has been successfully confirmed.' })
  } catch (error) {
    console.error(`[server]: Error on user account confirmation. Error Data: ${error.message}`)
  }
}

const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body
    const userToAuthenticate = await Veterinarian.findOne({ email })

    // Check if user exists
    if (!userToAuthenticate) {
      const userDontExistsError = new Error('Account not found, verify your email address or create a new account')
      return res.status(403).json({ message: userDontExistsError.message })
    }

    // Check if account is active
    if (!userToAuthenticate.confirmed) {
      const userNotActivatedError = new Error('This account is not activated, please check your mailbox')
      return res.status(403).json({ message: userNotActivatedError.message })
    }

    // Check if password is correct
    const isPasswordCorrect = await userToAuthenticate.checkPassword(password.trim())
    if (!isPasswordCorrect) {
      const incorrectPasswordError = new Error('Incorrect password, please check provided info')
      return res.status(403).json({ message: incorrectPasswordError.message })
    }

    // Respond with user JWT
    const user = {
      id: userToAuthenticate._id,
      name: userToAuthenticate.name,
      email: userToAuthenticate.email,
      tel: userToAuthenticate.tel,
      website: userToAuthenticate.website
    }
    res.json({ token: generateJWT(userToAuthenticate.id), user })
  } catch (error) {
    console.error(`[server]: Error on user authentication. Error Data: ${error.message}`)
  }
}

// Password recovery handlers
// ForgottenPassword endpoint
const forgottenPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const registeredUser = await Veterinarian.findOne({ email })

    if (!registeredUser) {
      const nonExistingUserError = new Error('There\'s no user registered with this email address, please verify provided data')
      return res.status(403).json({ message: nonExistingUserError.message })
    }

    // Generate token that'll be send to user's email address
    if (registeredUser.token === null) {
      registeredUser.token = randomUUID()

      await registeredUser.save()

      // Send recovery email
      forgotPasswordEmail({
        email,
        name: registeredUser.name,
        token: registeredUser.token
      })
    }

    res.json({ message: 'Good news! Password recovery instructions have been emailed to you. If you don\'t see it in your inbox, please check your spam or junk folder.' })
  } catch (error) {
    console.error(`[server]: Error getting user from DB. Error Data: ${error.message}`)
  }
}

// Check password recovery token
const checkPasswordToken = async (req, res) => {
  try {
    const { token } = req.params

    const isTokenValid = await Veterinarian.findOne({ token })

    if (!isTokenValid) {
      const invalidTokenError = new Error('There was a problem validating your request, please try again on "Reset my password"')
      return res.status(403).json({ message: invalidTokenError.message })
    }

    res.json({ message: 'User validated, please enter your new password' })
  } catch (error) {
    console.error(`[server]: Error getting user from DB. Error Data: ${error.message}`)
  }
}

// Set new Password
const newPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { newPassword } = req.body
    const user = await Veterinarian.findOne({ token })

    user.token = null
    user.password = newPassword
    await user.save()

    if (!user) {
      const userNotFoundError = new Error('There was an error')
      return res.status(403).json({ message: userNotFoundError.message })
    }

    res.json({ message: 'Password changed successfully!' })
  } catch (error) {
    console.error(`[server]: Error getting user from DB. Error Data: ${error.message}`)
  }
}

export {
  signUp,
  profile,
  confirm,
  authenticate,
  forgottenPassword,
  checkPasswordToken,
  newPassword
}

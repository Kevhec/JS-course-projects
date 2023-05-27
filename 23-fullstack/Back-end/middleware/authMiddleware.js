import jwt from 'jsonwebtoken'
import Veterinarian from '../models/Veterinarian.js'

export default async function checkAuth (req, res, next) {
  let token
  // Auth
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from req.headers and remove 'Bearer' from it
      token = req.headers.authorization.split(' ')[1]
      // Decode JWT, returns object with user info
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Find user using id from decoded obj, select -field ignores it on response
      req.veterinarian = await Veterinarian.findById(decoded.id).select(
        '-password -token -confirmed'
      )
      next()
    } catch (error) {
      const authError = new Error('Error when logging in, please try again')
      res.status(403).json({ message: authError.message })
    }
  } else {
    // Validate token
    if (!token) {
      const invalidTokenError = new Error('Invalid or token not found')
      res.status(403).json({ message: invalidTokenError.message })
    } else {
      next()
    }
  }
}

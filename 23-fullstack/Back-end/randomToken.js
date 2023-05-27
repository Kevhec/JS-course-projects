import { randomBytes } from 'crypto'

export default function generateToken () {
  return randomBytes(20).toString('base64')
}

import { filtered } from './findInputError'

export default function isFormInvalid (err: filtered): boolean {
  if (Object.keys(err).length > 0) return true
  return false
}

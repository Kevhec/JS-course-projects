import { HTMLInputTypeAttribute } from 'react'
import { FieldErrors, FieldError } from 'react-hook-form'

interface InputErrors {
  errors: FieldErrors
  name: HTMLInputTypeAttribute
}

export interface filtered {
  error?: FieldError
}

export default function findInputErrors ({ errors, name }: InputErrors): filtered {
  const filtered = Object.keys(errors)
    .filter(key => key.includes(name.toString()))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] })
    }, { })
  return filtered
}

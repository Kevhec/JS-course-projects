import { HTMLInputTypeAttribute } from 'react'
import { InputProps } from '../components/Input'

export interface Validations extends InputProps {
  label: string
  name: HTMLInputTypeAttribute
  type: HTMLInputTypeAttribute
  id: HTMLInputTypeAttribute
  placeholder?: HTMLInputTypeAttribute
  multiline?: boolean
  validation?: {
    required?: {
      value: boolean
      message: string
    }
    maxLenght?: {
      value: number
      message: string
    }
    validate?: (arg1: string, arg2: number) => void
  }
}

function formValidations (passwordValue?: string | null): {
  nameValidation: Validations
  passwordValidation: Validations
  repeatPasswordValidation: Validations
  emailValidation: Validations
  petNameValidation: Validations
  petOwnerNameValidation: Validations
  petOwnerEmailValidation: Validations
  petDischargeDateValidation: Validations
  textAreaValidation: Validations
} {
  const nameValidation = {
    label: 'Name',
    name: 'name',
    type: 'text',
    id: 'name',
    placeholder: 'John Doe',
    validation: {
      required: {
        value: true,
        message: 'Required'
      },
      maxLenght: {
        value: 30,
        message: '30 characters max'
      }
    }
  }

  const passwordValidation = {
    label: 'Password',
    name: 'password',
    type: 'password',
    id: 'signUpPassword',
    placeholder: '•••••••••••••••••••••••',
    autoComplete: 'new-password',
    validation: {
      required: {
        value: true,
        message: 'Required'
      },
      minLength: {
        value: 6,
        message: 'min 6 characters'
      }
    }
  }

  const repeatPasswordValidation = {
    label: 'Repeat Password',
    name: 'repeatPassword',
    type: 'password',
    id: 'signUpPasswordRepeat',
    placeholder: '•••••••••••••••••••••••',
    autoComplete: 'new-password',
    validation: {
      required: {
        value: true,
        message: 'Required'
      },
      validate: (value: string) => {
        if (passwordValue !== value) {
          return 'Passwords do not match'
        }
      }
    }
  }

  const emailValidation = {
    label: 'Email',
    name: 'email',
    type: 'email',
    id: 'signUpEmail',
    placeholder: 'your@email.com',
    autoComplete: 'email',
    validation: {
      required: {
        value: true,
        message: 'Required'
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'invalid email address'
      }
    }
  }

  const petOwnerEmailValidation = {
    ...emailValidation,
    name: 'petOwnerEmail'
  }

  const petNameValidation = {
    label: 'Pet Name',
    name: 'petName',
    type: 'text',
    id: 'adminPetName',
    placeholder: 'Bruno',
    validation: {
      required: {
        value: true,
        message: 'Required'
      }
    }
  }

  const petOwnerNameValidation = {
    label: 'Owner Name',
    name: 'petOwner',
    type: 'text',
    id: 'adminPetOwnerName',
    placeholder: 'John Doe',
    validation: {
      required: {
        value: true,
        message: 'Required'
      }
    }
  }

  const petDischargeDateValidation = {
    label: 'Discharge Date',
    name: 'dischargeDate',
    type: 'date',
    id: 'dischargeDate'
  }

  const textAreaValidation = {
    label: 'Symptoms',
    name: 'symptoms',
    id: 'symptoms',
    type: 'textarea',
    multiline: true,
    validation: {
      required: {
        value: true,
        message: 'Required'
      }
    }
  }

  return {
    nameValidation,
    passwordValidation,
    repeatPasswordValidation,
    emailValidation,
    petNameValidation,
    petOwnerNameValidation,
    petDischargeDateValidation,
    textAreaValidation,
    petOwnerEmailValidation
  }
}

export default formValidations

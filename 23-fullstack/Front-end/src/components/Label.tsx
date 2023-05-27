import { AnimatePresence } from 'framer-motion'
import cn from 'classnames'

import { filtered } from '../utils/findInputError'
import isFormInvalid from '../utils/isFormValid'

import InputError from './InputError'
import { HTMLInputTypeAttribute } from 'react'

interface Props {
  id: string
  label: string | undefined
  disabled?: boolean | undefined
  small?: boolean | undefined
  name?: HTMLInputTypeAttribute
  inputError: filtered
}
export default function Label ({ id, label, disabled, inputError, small, name }: Props): JSX.Element {
  const isInvalid = isFormInvalid(inputError)
  const labelClasses = cn(
    'uppercase', 'text-gray-600', 'block', 'text-base', 'md:text-lg', 'lg:text-xl', 'font-bold', {
      'text-slate-400': disabled,
      'md:text-base': small
    }
  )

  return (
    <div className='flex justify-between'>
      <label
        htmlFor={id}
        className={labelClasses}
      >
        {label}
      </label>
      <AnimatePresence mode='wait' initial={false}>
        {(isInvalid && name === inputError.error?.ref?.name) && (
          <InputError
            message={inputError?.error?.message}
            key={inputError?.error?.message}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

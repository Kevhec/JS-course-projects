import { HTMLInputTypeAttribute, useEffect } from 'react'
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import cn from 'classnames'

import findInputErrors from '../utils/findInputError'

import Label from './Label'

export interface InputProps {
  label?: string
  hasLabel?: boolean
  name: HTMLInputTypeAttribute
  type: HTMLInputTypeAttribute
  id: HTMLInputTypeAttribute
  disabled?: boolean
  placeholder?: HTMLInputTypeAttribute | undefined
  autoComplete?: HTMLInputTypeAttribute
  validation?: any
  handleErrorsChange?: (errors: FieldErrors<FieldValues>) => any
  multiline?: boolean
  small?: boolean
  className?: string
  containerClasses?: string
}

export default function Input ({
  label,
  hasLabel,
  name,
  type,
  id,
  placeholder,
  validation,
  autoComplete,
  disabled,
  handleErrorsChange,
  multiline,
  small,
  className,
  containerClasses
}: InputProps): JSX.Element {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const inputError = findInputErrors({ errors, name })

  useEffect(() => {
    if (handleErrorsChange !== undefined) {
      handleErrorsChange(errors)
    }
  }, [errors])

  const textAreaTailwind =
    'p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60 mt-3'

  const inputTailwind = twMerge(
    'border w-full p-3 mt-3 bg-gray-50 rounded-md disabled:text-slate-500 disabled:border-slate-200',
    className
  )

  const cClasses = twMerge('mb-5', containerClasses)

  return (
    <div className={cClasses}>
      {
        !(hasLabel === undefined) || hasLabel === false
          ? ''
          : <Label id={id} disabled={disabled} label={label} inputError={inputError} small={small} name={name} />
      }
      {multiline === true
        ? (
          <textarea
            id={id}
            className={cn(textAreaTailwind, 'min-h-[10rem] max-h-[20rem] resize-y')}
            placeholder={placeholder}
            {...register(`${name}`, validation)}
          />
          )
        : (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={cn(inputTailwind)}
            disabled={disabled}
            autoComplete={autoComplete}
            {...register(name, validation)}
          />
          )}
    </div>
  )
}

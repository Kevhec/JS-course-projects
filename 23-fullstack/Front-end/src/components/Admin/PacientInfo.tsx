import { Control, Controller, useFormContext } from 'react-hook-form'
import { DatePicker } from 'antd'
import { IconContext } from 'react-icons'
import { BsInfoCircle } from 'react-icons/bs'
import { AnimatePresence } from 'framer-motion'
import cn from 'classnames'
import Input from '../Input'
import dayjs from 'dayjs'

import { Validations } from '../../utils/inputValidations'
import { PacientType } from '../../context/PacientsProvider'
import isFormInvalid from '../../utils/isFormValid'
import findInputErrors from '../../utils/findInputError'

import InputError from '../InputError'

interface Props {
  index: string
  value: string
  typeOfValidation: Validations
  id: string | undefined
  editMode: boolean
  typeOfInput?: string
  title?: string
  indexClasses?: string[]
  valueClasses?: string[]
  onClick?: () => void
  control?: Control<PacientType, any>
}

export default function PacientInfo ({
  index,
  value,
  title,
  onClick,
  indexClasses,
  valueClasses,
  typeOfValidation,
  typeOfInput,
  control,
  editMode,
  id
}: Props): JSX.Element {
  const {
    formState: { errors }
  } = useFormContext()

  const inputError = findInputErrors({
    errors,
    name:
      typeOfInput === 'date'
        ? `dischargeDate-${id !== undefined ? id : ''}`
        : `${typeOfValidation.name}-${id !== undefined ? id : ''}`
  })
  const isInvalid = isFormInvalid(inputError)

  const containerClasses = cn(
    'mb-5 md:mb-4 last:mb-0 flex flex-col md:gap-2 md:grid md:grid-cols-2 md:place-items-start overflow-hidden'
  )

  const iClasses = cn(
    'font-bold',
    'text-indigo-700',
    indexClasses
  )

  const vClasses = cn(
    'font-normal',
    'normal-case',
    'text-black',
    'w-full',
    valueClasses
  )

  let content

  if (editMode) {
    switch (typeOfInput) {
      case 'date':
        content = (
          <>
            <Controller
              defaultValue={new Date().getTime()}
              control={control}
              name='dischargeDate'
              rules={{ required: 'Required' }}
              render={({ field }) => (
                <DatePicker
                  id={`dischargeDate-${id !== undefined ? id : ''}`}
                  name={`${field.name}-${id !== undefined ? id : ''}`}
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-md disabled:text-slate-500 disabled:border-slate-200'
                  disabledDate={d => d.startOf('day').isBefore(dayjs().startOf('day'))}
                  // eslint-disable-next-line react/jsx-handler-names
                  onBlur={field.onBlur}
                  onChange={(date) => {
                    field.onChange(date !== null ? date.valueOf() : null)
                  }}
                />
              )}
            />
            <IconContext.Provider value={{ size: '1.4em', className: 'inline-block' }}>
              <p className='text-gray-400 flex items-center gap-3 leading-none mt-2 text-sm md:col-start-2'>
                <BsInfoCircle /> If no date is provided, today will be used instead
              </p>
            </IconContext.Provider>
          </>
        )
        break
      default:
        content = (
          <Input
            {...typeOfValidation}
            name={`${typeOfValidation.name}-${id !== undefined ? id : ''}`}
            id={`${typeOfValidation.name}-${id !== undefined ? id : ''}`}
            hasLabel={false}
            className={`mt-3 py-2 md:mt-0 ${isInvalid ? 'mb-2' : ''}`}
            containerClasses='mb-0 md:w-full'
          />
        )
    }
  } else {
    content = <p className={vClasses}> {value}</p>
  }

  return (
    <div
      className={containerClasses}
      title={title}
      onClick={onClick}
    >
      {
        editMode
          ? (
            <label
              htmlFor={
                typeOfInput === 'date'
                  ? `dischargeDate-${id !== undefined ? id : ''}`
                  : `${typeOfValidation.name}-${id !== undefined ? id : ''}`
              }
              className={iClasses}
            >
              {index}:
            </label>
            )
          : (
            <p className={iClasses}>
              {index}:
            </p>
            )
      }
      {content}
      <div className='md:col-start-2'>
        <AnimatePresence mode='wait' initial={false}>
          {(isInvalid && editMode) && (
            <InputError
              message={inputError?.error?.message}
              key={inputError?.error?.message}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

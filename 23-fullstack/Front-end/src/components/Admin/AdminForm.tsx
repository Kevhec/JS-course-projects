import { Controller, FieldErrors, FieldValues, FormProvider, useForm } from 'react-hook-form'
import { DatePicker } from 'antd'
import { useState } from 'react'
import dayjs from 'dayjs'

import { PacientType } from '../../context/PacientsProvider'
import formValidations from '../../utils/inputValidations'
import findInputErrors from '../../utils/findInputError'
import usePacients from '../../hooks/usePacients'

import Input from '../Input'
import Button from '../Button'
import Label from '../Label'
import Loader from '../Loader/Loader'

export default function AdminForm (): JSX.Element {
  const [errors, setErrors] = useState<FieldErrors<FieldValues>>({})
  const methods = useForm<PacientType>()
  const {
    petNameValidation,
    petOwnerNameValidation,
    emailValidation,
    textAreaValidation
  } = formValidations()
  const { newPacient, loading } = usePacients()

  const onSubmit = methods.handleSubmit(formData => {
    methods.reset()
    void newPacient(formData)
  })

  const handleErrorsChange = (errors: FieldErrors<FieldValues>): void => {
    setErrors(errors)
  }

  const dischargeDateError = findInputErrors({ errors, name: 'dischargeDate' })

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={evt => evt.preventDefault()}
          noValidate
        >
          <Input {...petNameValidation} handleErrorsChange={handleErrorsChange} small />
          <Input {...petOwnerNameValidation} small />
          <Input {...emailValidation} placeholder='owner@email.com' id='petOwnerEmail' name='petOwnerEmail' small />
          <div className='mb-5'>
            <Label id='dischargeDate' label='Discharge Date' inputError={dischargeDateError} small />
            <Controller
              defaultValue={new Date().getTime()}
              control={methods.control}
              name='dischargeDate'
              rules={{ required: 'Required' }}
              render={({ field }) => (
                <DatePicker
                  id='dischargeDate'
                  name={field.name}
                  value={field.value !== null ? dayjs(field.value) : null}
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
          </div>
          <Input {...textAreaValidation} small />
          {
            loading && <Loader />
          }
          <Button value='Add pacient' onClick={onSubmit} />
        </form>
      </FormProvider>
    </>
  )
}

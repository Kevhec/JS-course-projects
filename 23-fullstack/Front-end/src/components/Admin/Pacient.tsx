import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import dayjs from 'dayjs'

import { PacientType } from '../../context/PacientsProvider'
import formValidations from '../../utils/inputValidations'

import Button from '../Button'
import PacientInfo from './PacientInfo'
import usePacients from '../../hooks/usePacients'

interface Props {
  pacient: PacientType
}

export default function Pacient ({
  pacient: {
    dischargeDate,
    petName,
    petOwner,
    petOwnerEmail,
    symptoms,
    id
  }
}: Props): JSX.Element {
  const [editMode, setEditMode] = useState(false)

  const methods = useForm<PacientType>()

  const {
    petNameValidation,
    petOwnerNameValidation,
    petOwnerEmailValidation,
    textAreaValidation
  } = formValidations()

  const handleEditClick = (): void => {
    setEditMode(true)
  }

  const { editPacient, deletePacient } = usePacients()

  const onSubmit = methods.handleSubmit(formData => {
    void editPacient({ ...formData, id })
    setEditMode(false)
  })

  const handleSecondaryButton = async (): Promise<void> => {
    switch (true) {
      case editMode:
        if (confirm('Are you sure? changes won\'t be saved')) {
          setEditMode(false)
        }
        break
      default:
        try {
          if (confirm('Are you sure you want to delete this pacient? This action can\'t be reversed.')) {
            const { data, status } = await deletePacient(id)
            if (status === 200) {
              console.log(data)
            } else {
              console.log(data)
            }
          }
        } catch (error: any) {
          console.error(error)
        }
    }
  }

  const copyText = (): void => {
    if (editMode) return
    void navigator.clipboard.writeText(petOwnerEmail)
    alert('Copied')
  }

  return (
    <li className='mx-5 my-6 md:my-7 bg-white shadow-md px-5 py-10 rounded-xl first:mt-0'>
      <FormProvider {...methods}>
        <form
          onSubmit={evt => evt.preventDefault()}
          noValidate
        >
          <PacientInfo
            index='Name'
            value={petName}
            typeOfValidation={petNameValidation}
            id={id}
            editMode={editMode}
            setValue={methods.setValue}
          />
          <PacientInfo
            index='Owner'
            value={petOwner}
            typeOfValidation={petOwnerNameValidation}
            id={id}
            editMode={editMode}
            setValue={methods.setValue}
          />
          <PacientInfo
            index='Contact Email'
            value={petOwnerEmail}
            title={`Click to copy - ${petOwnerEmail}`}
            onClick={copyText}
            indexClasses={['overflow-hidden']}
            valueClasses={['truncate']}
            typeOfValidation={petOwnerEmailValidation}
            id={id}
            editMode={editMode}
            setValue={methods.setValue}
          />
          <PacientInfo
            index='Discharge Date'
            value={dayjs(dischargeDate).format('DD MMM YYYY')}
            typeOfInput='date'
            control={methods.control}
            typeOfValidation={petOwnerEmailValidation}
            id={id}
            editMode={editMode}
            setValue={methods.setValue}
          />
          <PacientInfo
            index='Symptoms'
            value={symptoms}
            typeOfValidation={textAreaValidation}
            id={id}
            editMode={editMode}
            setValue={methods.setValue}
          />

          <div className='my-5 grid grid-cols-2 gap-2'>
            <Button
              value={editMode ? 'Save' : 'Edit'}
              onClick={editMode ? onSubmit : handleEditClick}
              className='px-0 pt-2 pb-2 mt-0'
              dataset={{ 'data-id': id }}
            />
            <Button
              value={editMode ? 'Cancel' : 'Remove'}
              onClick={handleSecondaryButton}
              className='px-0 pt-2 pb-2 mt-0 bg-red-500 hover:bg-red-700 active:bg-red-800'
              dataset={{ 'data-id': id }}
            />
          </div>
        </form>
      </FormProvider>
    </li>
  )
}

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import formValidations from '../../utils/inputValidations'
import useAuth from '../../hooks/useAuth'

import AdminNav from '../../components/Admin/AdminNav'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import Loader from '../../components/Loader/Loader'

export default function EditProfile (): JSX.Element {
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const {
    nameValidation,
    emailValidation,
    websiteValidation,
    telValidation
  } = formValidations()
  const methods = useForm()

  const {
    auth: {
      email,
      name,
      tel,
      website
    },
    auth,
    updateProfile
  } = useAuth()

  const onSubmit = methods.handleSubmit(async (formData) => {
    setLoadingUpdate(true)
    setHasError(false)
    setSuccess(false)
    try {
      if (
        formData.name === name &&
        formData.email === email &&
        formData.tel === tel &&
        formData.website === website
      ) {
        setHasError(true)
        setSuccess(true)
        setMessage('Please modify your info before submitting')
        return
      }
      console.log(auth)

      const updatedProfile = ({ ...auth, ...formData })
      const { message, hasErrorRes } = await updateProfile(updatedProfile)
      setMessage(message)
      setHasError(hasErrorRes)
      setSuccess(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingUpdate(false)
    }
  })

  useEffect(() => {
    methods.setValue('name', name)
    methods.setValue('email', email)
    methods.setValue('website', website)
    methods.setValue('tel', tel)
  }, [])

  return (
    <>
      <AdminNav />
      <h2 className='text-center text-lg font-bold my-5 md:mb-5'>
        Modify Your
        <span className='text-indigo-600 block'>Info</span>
      </h2>
      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          <FormProvider {...methods}>
            {
              loadingUpdate
                ? <Loader />
                : success && (
                  <>
                    <Alert isError={hasError}>
                      {message}
                    </Alert>
                  </>
                )
            }
            <form
              onSubmit={e => e.preventDefault()}
              noValidate
            >
              <Input {...nameValidation} />
              <Input {...emailValidation} />
              <Input {...websiteValidation} />
              <Input {...telValidation} />
              <Button value='Save Data' onClick={onSubmit} />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}

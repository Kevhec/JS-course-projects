import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import formValidations from '../../utils/inputValidations'

import AdminNav from '../../components/Admin/AdminNav'
import Loader from '../../components/Loader/Loader'
import Alert from '../../components/Alert'
import Input from '../../components/Input'
import Button from '../../components/Button'
import useAuth from '../../hooks/useAuth'

export default function ChangePassword (): JSX.Element {
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [passwordValue, setPasswordValue] = useState(null)

  const {
    passwordValidation,
    repeatPasswordValidation
  } = formValidations(passwordValue)

  const { changePassword } = useAuth()

  const methods = useForm()

  const onSubmit = methods.handleSubmit(async ({ currentPassword, password }) => {
    setLoadingUpdate(true)
    setSuccess(false)
    setHasError(false)
    try {
      const response = await changePassword({ currentPassword, password })
      if (response.hasErrorRes === true) {
        setHasError(true)
      }
      setMessage(response.message)
      setSuccess(true)
      methods.reset()
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoadingUpdate(false)
    }
  })

  useEffect(() => {
    const subscription = methods.watch(passwordValidation.name)
    setPasswordValue(subscription)
    return () => subscription.unsubscribe
  }, [passwordValidation])

  return (
    <>
      <AdminNav />
      <h2 className='text-center text-lg font-bold my-5 md:mb-5'>
        Change Your
        <span className='text-indigo-600 block'>Password</span>
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
              <Input {...passwordValidation} label='Current Password' id='currentPassword' name='currentPassword' />
              <Input {...passwordValidation} label='New Password' />
              <Input {...repeatPasswordValidation} label='Repeat New Password' />
              <Button value='Save Data' onClick={onSubmit} />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}
